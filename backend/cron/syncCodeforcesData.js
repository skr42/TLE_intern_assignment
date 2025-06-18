const cron = require('node-cron');
const Student = require('../models/Student');
const { fetchCFData } = require('../services/codeforcesService');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
});

cron.schedule('0 2 * * *', async () => {
    const students = await Student.find();
    for (const student of students) {
        const data = await fetchCFData(student.cfHandle);
        const lastSubmission = data.problems.reduce((latest, p) => {
            return p.creationTimeSeconds > latest ? p.creationTimeSeconds : latest;
        }, 0);

        const inactive = (Date.now() / 1000 - lastSubmission) > 7 * 24 * 3600;

        if (inactive && !student.emailReminderDisabled) {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: student.email,
                subject: 'Get back to problem solving!',
                text: `Hi ${student.name},

We noticed you haven’t submitted any problems recently. Get back on track with your Codeforces practice!`
            });
            student.remindersSent += 1;
        }

        Object.assign(student, {
            currentRating: data.currentRating,
            maxRating: data.maxRating,
            contestHistory: data.contests,
            problemStats: data.problems,
            lastSynced: new Date()
        });
        await student.save();
    }
});
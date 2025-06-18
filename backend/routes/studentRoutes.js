const express = require('express');
const Student = require('../models/Student');
const { fetchCFData } = require('../services/codeforcesService');
const router = express.Router();

router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

router.post('/', async (req, res) => {
    const { name, email, phone, cfHandle } = req.body;
    const data = await fetchCFData(cfHandle);
    const newStudent = new Student({
        name, email, phone, cfHandle,
        currentRating: data.currentRating,
        maxRating: data.maxRating,
        contestHistory: data.contests,
        problemStats: data.problems,
        lastSynced: new Date()
    });
    await newStudent.save();
    res.json(newStudent);
});

router.put('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (req.body.cfHandle && req.body.cfHandle !== student.cfHandle) {
        const data = await fetchCFData(req.body.cfHandle);
        Object.assign(student, {
            cfHandle: req.body.cfHandle,
            currentRating: data.currentRating,
            maxRating: data.maxRating,
            contestHistory: data.contests,
            problemStats: data.problems,
            lastSynced: new Date()
        });
    }
    Object.assign(student, req.body);
    await student.save();
    res.json(student);
});

router.delete('/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
const axios = require('axios');

async function fetchCFData(handle) {
    const userRes = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
    const contestRes = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const statusRes = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);

    const user = userRes.data.result[0];
    const contests = contestRes.data.result;
    const submissions = statusRes.data.result;

    const problemsSolved = new Map();
    submissions.forEach(sub => {
        if (sub.verdict === 'OK') {
            const key = `${sub.problem.contestId}-${sub.problem.index}`;
            problemsSolved.set(key, sub.problem);
        }
    });

    return {
        currentRating: user.rating || 0,
        maxRating: user.maxRating || 0,
        contests,
        problems: Array.from(problemsSolved.values())
    };
}

module.exports = { fetchCFData };

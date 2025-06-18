import React, { useState } from 'react';
import RatingGraph from './RatingGraph';
import ProblemStats from './ProblemStats';

function StudentProfile({ student }) {
  const [contestRange, setContestRange] = useState(90);
  const [problemRange, setProblemRange] = useState(30);

  const filteredContests = student.contestHistory.filter(c => Date.now()/1000 - c.ratingUpdateTimeSeconds <= contestRange * 24 * 3600);

  return (
    <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Profile: {student.name}</h2>

      <div className="mb-6">
        <label className="font-semibold">Contest History (Days): </label>
        <select
          value={contestRange}
          onChange={(e) => setContestRange(Number(e.target.value))}
          className="ml-2 p-1 rounded border dark:bg-gray-700"
        >
          <option value={30}>30</option>
          <option value={90}>90</option>
          <option value={365}>365</option>
        </select>
        <RatingGraph contests={filteredContests} />
        <ul className="mt-2 space-y-1">
          {filteredContests.map((c, i) => (
            <li key={i} className="text-sm">[{new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString()}] <strong>{c.contestName}</strong> → Δ{c.newRating - c.oldRating}</li>
          ))}
        </ul>
      </div>

      <div>
        <label className="font-semibold">Problem Stats (Days): </label>
        <select
          value={problemRange}
          onChange={(e) => setProblemRange(Number(e.target.value))}
          className="ml-2 p-1 rounded border dark:bg-gray-700"
        >
          <option value={7}>7</option>
          <option value={30}>30</option>
          <option value={90}>90</option>
        </select>
        <ProblemStats problems={student.problemStats} range={problemRange} />
      </div>
    </div>
  );
}

export default StudentProfile;
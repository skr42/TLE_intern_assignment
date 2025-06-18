import React from 'react';

function ProblemStats({ problems, range }) {
  const cutoff = Date.now()/1000 - range * 24 * 3600;
  const filtered = problems.filter(p => p.creationTimeSeconds > cutoff);
  const total = filtered.length;
  const avgRating = total > 0 ? filtered.reduce((a, p) => a + (p.rating || 0), 0) / total : 0;

  const bucket = {};
  filtered.forEach(p => {
    const r = Math.floor((p.rating || 800)/100)*100;
    bucket[r] = (bucket[r] || 0) + 1;
  });

  return (
    <div className="mt-4 bg-white dark:bg-gray-900 p-4 rounded shadow">
      <p>Total: <strong>{total}</strong></p>
      <p>Average Rating: <strong>{avgRating.toFixed(1)}</strong></p>
      <p>Average per Day: <strong>{(total / range).toFixed(2)}</strong></p>
      <h4 className="mt-4 font-bold">Problems Solved by Rating:</h4>
      <ul className="ml-4 list-disc">
        {Object.entries(bucket).map(([r, c]) => (
          <li key={r}>{r}: {c}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemStats;

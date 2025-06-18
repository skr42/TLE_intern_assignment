
import React from 'react';

function DownloadCSV({ students }) {
  const handleDownload = () => {
    const headers = ["Name", "Email", "Phone", "Handle", "Rating", "Max", "Last Sync"];
    const rows = students.map(s => [
      s.name, s.email, s.phone, s.cfHandle, s.currentRating, s.maxRating, new Date(s.lastSynced).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      ⬇️ Download CSV
    </button>
  );
}





export default DownloadCSV;

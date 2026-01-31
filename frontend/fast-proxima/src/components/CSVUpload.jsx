/* Input + User Action
Responsibilities
1. File selection
2. “Generate Report” button
3. Calls graphs
*/

export default function CSVUpload({ onReportGenerated }) {
  const handleGenerateReport = () => {
    const graphs = [
      {
        title: 'Daily Spending',
        image: '/reports/spending_per_day.svg',
      },
      {
        title: 'Monthly Spending',
        image: '/reports/spending_per_month.svg',
      },
      {
        title: 'Yearly Spending',
        image: '/reports/spending_per_year.svg',
      },
    ];
    onReportGenerated(graphs);
  };

  return (
    // Outer wrapper: vertical + horizontal centering
    <div
      className="csv-upload reveal"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',   // center horizontally
        justifyContent: 'center', // center vertically in container
        gap: '1rem',             // space between buttons
        marginTop: '1rem',
      }}
    >
      <input
        type="file"
        accept=".csv"
        style={{
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #0b4a0b, #3fa73f)', // only button background
            color: 'white', // text inside the button
            fontWeight: 600,
            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',        
        }}
      />
      <button
        onClick={handleGenerateReport}
        style={{
          padding: '0.6rem 1rem',
          borderRadius: '12px',
          border: 'none',
          fontWeight: 600,
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #0b4a0b, #3fa73f)',
          color: 'white',
          textShadow: '2px 2px 6px rgba(11, 74, 11, 0.645)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
        }}
      >
        Generate Report
      </button>
    </div>
  );
}

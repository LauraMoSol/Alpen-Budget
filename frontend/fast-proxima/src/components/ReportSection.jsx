import { useState, useEffect, useRef } from 'react';
import CSVUpload from './CSVUpload.jsx';
import '../styles/global.css';

export default function ReportSection() {
  const [graphs, setGraphs] = useState([]); // all generated graphs
  const [currentIndex, setCurrentIndex] = useState(0); // current carousel index
  const [visible, setVisible] = useState(false); // show reports
  const [chartType, setChartType] = useState('Total Spending'); // dropdown selection
  const reportsRef = useRef(null);

  // ----------------------------
  // Handle new graphs from CSV upload
  // ----------------------------
  const handleReportGenerated = (newGraphs) => {
    if (!newGraphs || newGraphs.length === 0) {
      newGraphs = [{ title: 'Placeholder', image: '/reports/placeholder_graph.jpeg' }];
    }

    setGraphs((prev) => {
      const updated = [...prev];
      newGraphs.forEach((g) => {
        if (!updated.find((x) => x.title === g.title)) updated.push(g);
      });
      return updated;
    });

    setVisible(true);
    setCurrentIndex(0); // start at first chart
  };

  // ----------------------------
  // Smooth scroll to reports
  // ----------------------------
  useEffect(() => {
    if (visible && reportsRef.current) {
      const yOffset = -20;
      const y = reportsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [visible]);

  const prev = () => setCurrentIndex((i) => (i === 0 ? graphs.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === graphs.length - 1 ? 0 : i + 1));

  const currentGraph = graphs[currentIndex] || { title: 'Placeholder', image: '/reports/placeholder_graph.jpeg' };

  return (
    <>
      {/* --- LANDING: CSV Upload --- */}
      <div className="landing">
        <CSVUpload onReportGenerated={handleReportGenerated} />
      </div>

      {/* --- SCREEN 2: Reports / Graphs --- */}
      {visible && (
        <section
          ref={reportsRef}
          className="reports-section"
        >
          {/* Dropdown: chart type */}
          <select
            className="chart-type-dropdown"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option>Total Spending</option>
            <option>Spending per Category</option>
            <option>Cumulative Balance</option>
          </select>

          {/* Carousel */}
          <div className="carousel-wrapper">
            {/* Left Arrow */}
            <button className="carousel-arrow left" onClick={prev} aria-label="Previous chart">
              ‹
            </button>

            {/* Graph Card */}
            <div className="graph-card">
              <h3>{currentGraph.title} ({chartType})</h3>
              <img src={currentGraph.image} alt={currentGraph.title} />
            </div>

            {/* Right Arrow */}
            <button className="carousel-arrow right" onClick={next} aria-label="Next chart">
              ›
            </button>
          </div>
        </section>
      )}
    </>
  );
}

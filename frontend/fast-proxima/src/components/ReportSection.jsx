/* State + Scroll Controller (Core Logic)
Responsibilities:
1. Owns application state:
2. Graphs visible (reports shown or not)
3. Handles CSV upload callback
4. Controls scroll behavior
5. Controls when reports appear

Key behaviors
→ Receives graph data from CSVUpload
→ Injects placeholder graph if none exist
→ Scrolls to reports section only when visible becomes true
→ Ensures reports section is exactly 100vh
*/


import { useState, useEffect, useRef } from 'react';
import GraphCarousel from './GraphCarousel';
import CSVUpload from './CSVUpload.jsx';

export default function ReportSection() {
  const [graphs, setGraphs] = useState([]);
  const [visible, setVisible] = useState(false);
  const carouselRef = useRef(null);

  const handleReportGenerated = (newGraphs) => {
    setGraphs(
      newGraphs.length > 0
        ? newGraphs
        : [{ title: 'Placeholder', image: '/placeholder_graph.jpeg' }]
    );
    setVisible(true);
  };

  useEffect(() => {
    if (visible && carouselRef.current) {
      carouselRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [visible]);

  return (
    <>
      {/* BUTTONS — no positioning tricks here */}
      <div className="csv-upload">
        <CSVUpload onReportGenerated={handleReportGenerated} />
      </div>

      {/* REPORTS */}
      <section
        ref={carouselRef}
        className="carousel"
        style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          paddingTop: '2rem',
        }}
      >
        <h2 className="carousel-title">Your Reports</h2>
        <GraphCarousel graphs={graphs} />
      </section>
    </>
  );
}

import { useState, useEffect, useRef } from 'react';
import GraphCarousel from './GraphCarousel';
import CSVUpload from './CSVUpload.jsx';

export default function ReportSection() {
  const [graphs, setGraphs] = useState([]);
  const [visible, setVisible] = useState(false);
  const carouselRef = useRef(null);

  // Callback for CSVUpload
  const handleReportGenerated = (newGraphs) => {
    setGraphs(
      newGraphs.length > 0
        ? newGraphs
        : [{ title: 'Placeholder', image: '/placeholder_graph.jpeg' }]
    );
    setVisible(true);
  };

  // Scroll smoothly to carousel when visible changes
  useEffect(() => {
    if (visible && carouselRef.current) {
      carouselRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [visible]);

  return (
    <div style={{ width: '100%' }}>
      {/* CSV Upload buttons centered */}
      <div
        className="csv-upload reveal"
        style={{
          display: 'flex',
          flexDirection: 'column',   // stack file input and generate button
          alignItems: 'center',      // horizontal centering
          justifyContent: 'center',  // vertical centering
          height: '60vh',            // take ~60% of viewport height
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <CSVUpload client:load onReportGenerated={handleReportGenerated} />
      </div>

      {/* Carousel Section */}
      <section
        id="carousel-section"
        ref={carouselRef}
        className="carousel reveal"
        style={{
          display: visible ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '100%',
          minHeight: '100vh',  // ensures it fills viewport height
          padding: '1rem',
          marginTop: '1rem',   // smaller gap between "Your Reports" and graphs
        }}
      >
        <h2
          className="carousel-title"
          style={{ marginBottom: '0.5rem', fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          Your Reports
        </h2>
        <GraphCarousel graphs={graphs} />
      </section>
    </div>
  );
}

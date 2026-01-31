/* Responsive Graph Display
Responsibilities
1. Display graphs OR placeholder
2.Responsive layout:
2.1 Wraps on small screens
2.2 Centers content
2.3 Maintains proportions on resize/zoom
*/

export default function GraphCarousel({ graphs }) {
  return (
    <div
      className="carousel reveal"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%',
        padding: '1rem',
      }}
    >
      {graphs.map((g, i) => (
        <div
          key={i}
          style={{
            flex: '0 0 auto',
            width: 'clamp(280px, 60vw, 700px)', // ← responsive magic
            background: 'rgba(0,0,0,0.6)',
            borderRadius: '12px',
            padding: '1rem',
          }}
        >
          <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'white', marginBottom: '0.5rem' }}>
            {g.title}
          </h3>
          <img
            src={g.image}
            alt={g.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70vh',   // responsive, not fixed
              objectFit: 'contain',
            }}
          />
        </div>
      ))}
    </div>
  );
}

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
            flex: '1 1 clamp(250px, 30%, 400px)',
            textAlign: 'center',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            background: 'rgba(0,0,0,0.6)',
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
              borderRadius: '4px',
              objectFit: 'contain',
            }}
          />
        </div>
      ))}

      {graphs.length === 0 && (
        <div
          style={{
            flex: '1 1 clamp(250px, 50%, 600px)',
            textAlign: 'center',
            borderRadius: '8px',
            padding: '1rem',
            background: 'rgba(0,0,0,0.6)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src="/placeholder_graph.jpeg"
            alt="Placeholder Graph"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}
    </div>
  );
}

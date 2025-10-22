const GameExplainer = () => (
  <div
    style={{
      position: 'relative',
      boxSizing: 'content-box',
      maxHeight: '80vh',
      width: '90%',
      aspectRatio: '1.2357723577235773',
      padding: '0',
      contain: "paint layout",
    }}
  >
    <iframe
      src="https://app.supademo.com/embed/cmgzdzlh30tf96nxtlut6ycpy?embed_v=2&utm_source=embed"
      loading="lazy"
      title="Sudoku Demo"
      allow="clipboard-write"
      allowFullScreen={false}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  </div>
);

export default GameExplainer;

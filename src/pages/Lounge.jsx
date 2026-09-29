import React, { useState, useEffect } from 'react';

export const Lounge = ({ setView }) => {
  // --- GAME 1: CULINARY PAIRS MATCH ---
  const ICONS = ['🍬', '🍭', '🍷', '🍰', '🍤', '☕'];
  const [deck, setDeck] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  const initMemoryGame = () => {
    const doubled = [...ICONS, ...ICONS];
    const shuffled = doubled.sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index) => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedPairs.includes(deck[index])
    ) {
      return;
    }

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = nextFlipped;

      if (deck[firstIdx] === deck[secondIdx]) {
        // Matched!
        setMatchedPairs((prev) => [...prev, deck[firstIdx]]);
        setFlippedIndices([]);
      } else {
        // No match, flip back after 600ms
        setTimeout(() => {
          setFlippedIndices([]);
        }, 600);
      }
    }
  };

  const isMemoryWon = matchedPairs.length === ICONS.length && ICONS.length > 0;

  // --- GAME 2: 8-TILE PUZZLE ---
  const SOLVED_PUZZLE = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  const [puzzle, setPuzzle] = useState(SOLVED_PUZZLE);
  const [puzzleMoves, setPuzzleMoves] = useState(0);

  const shufflePuzzle = () => {
    let curr = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    for (let k = 0; k < 80; k++) {
      const emptyIdx = curr.indexOf(0);
      const r = Math.floor(emptyIdx / 3);
      const c = emptyIdx % 3;
      const neighbors = [];
      if (r > 0) neighbors.push(emptyIdx - 3);
      if (r < 2) neighbors.push(emptyIdx + 3);
      if (c > 0) neighbors.push(emptyIdx - 1);
      if (c < 2) neighbors.push(emptyIdx + 1);
      const chosen = neighbors[Math.floor(Math.random() * neighbors.length)];
      [curr[emptyIdx], curr[chosen]] = [curr[chosen], curr[emptyIdx]];
    }
    setPuzzle([...curr]);
    setPuzzleMoves(0);
  };

  const handleTileClick = (index) => {
    const emptyIdx = puzzle.indexOf(0);
    const r = Math.floor(index / 3);
    const c = index % 3;
    const er = Math.floor(emptyIdx / 3);
    const ec = emptyIdx % 3;

    // Must be adjacent
    if (Math.abs(r - er) + Math.abs(c - ec) !== 1) return;

    const next = [...puzzle];
    [next[index], next[emptyIdx]] = [next[emptyIdx], next[index]];
    setPuzzle(next);
    setPuzzleMoves((m) => m + 1);
  };

  const isPuzzleWon = puzzle.every((val, idx) => val === SOLVED_PUZZLE[idx]) && puzzleMoves > 0;

  // --- GALLERY MODAL ---
  const [lightboxImg, setLightboxImg] = useState(null);

  const galleryImages = [
    { name: 'gallery-real-1.jpg', title: 'The Royal Sovereign Dining Chamber' },
    { name: 'gallery-real-2.jpg', title: 'Acoustic Candlelit Garden Terrace' },
    { name: 'gallery-real-3.jpg', title: 'Private Sommelier Wine Cellar' },
    { name: 'gallery-real-4.jpg', title: 'The Grand European Patisserie Bar' },
    { name: 'about-aesthetic-dessert.jpg', title: 'Master Chef Artisan Plating' }
  ];

  const getImageUrl = (imgName) => {
    try {
      return new URL(`../assets/images/${imgName}`, import.meta.url).href;
    } catch {
      return '';
    }
  };

  return (
    <div className="lounge-view animate-fade-in">
      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">WAITING LOUNGE & ENTERTAINMENT</span>
          <h1 className="section-title">The Aurelia Guest Lounge</h1>
          <p className="section-subtitle">
            Unwind while your courses are prepared. Enjoy our interactive culinary games and explore our architectural dining gallery.
          </p>
        </div>

        {/* --- INTERACTIVE GAMES GRID --- */}
        <div className="games-grid">
          {/* Game 1: Memory Pairs Match */}
          <div className="game-card-container luxury-card">
            <div className="game-card-header">
              <div>
                <h3 className="game-title">🍬 Culinary Memory Match</h3>
                <span className="game-subtitle">Find all 6 gourmet ingredient pairs</span>
              </div>
              <button className="btn btn-outline btn-sm" onClick={initMemoryGame}>
                ↻ Restart
              </button>
            </div>

            <div className="game-meta-row">
              <span>Moves: <b>{moves}</b></span>
              <span>Matched: <b>{matchedPairs.length} / {ICONS.length}</b></span>
            </div>

            {isMemoryWon ? (
              <div className="game-win-banner">
                <span className="win-icon">🎉</span>
                <h4>Magnificent! All Pairs Matched!</h4>
                <p>Completed in {moves} moves. You have an exceptional palate.</p>
                <button className="btn btn-primary btn-sm" onClick={initMemoryGame}>
                  Play Again
                </button>
              </div>
            ) : (
              <div className="memory-board">
                {deck.map((icon, idx) => {
                  const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(icon);
                  const isMatched = matchedPairs.includes(icon);

                  return (
                    <button
                      key={idx}
                      className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
                      onClick={() => handleCardClick(idx)}
                      disabled={isMatched}
                    >
                      <span className="card-face card-back">⚜️</span>
                      <span className="card-face card-front">{icon}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Game 2: 8-Tile Slider Puzzle */}
          <div className="game-card-container luxury-card">
            <div className="game-card-header">
              <div>
                <h3 className="game-title">🧩 Royal Sliding 8-Puzzle</h3>
                <span className="game-subtitle">Order numbers 1 through 8 sequentially</span>
              </div>
              <button className="btn btn-outline btn-sm" onClick={shufflePuzzle}>
                🔀 Shuffle
              </button>
            </div>

            <div className="game-meta-row">
              <span>Moves: <b>{puzzleMoves}</b></span>
              <span>{isPuzzleWon ? 'Status: 🏆 Solved!' : 'Slide tiles into order'}</span>
            </div>

            {isPuzzleWon ? (
              <div className="game-win-banner">
                <span className="win-icon">🏆</span>
                <h4>Brilliant! Puzzle Solved!</h4>
                <p>You arranged the royal tiles in {puzzleMoves} moves.</p>
                <button className="btn btn-primary btn-sm" onClick={shufflePuzzle}>
                  Shuffle & Replay
                </button>
              </div>
            ) : (
              <div className="puzzle-board">
                {puzzle.map((val, idx) => (
                  <button
                    key={idx}
                    className={`puzzle-tile ${val === 0 ? 'empty-tile' : ''}`}
                    onClick={() => handleTileClick(idx)}
                    disabled={val === 0}
                  >
                    {val !== 0 && val}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- ARCHITECTURAL GALLERY --- */}
        <div className="gallery-section">
          <div className="section-header" style={{ marginTop: '4rem' }}>
            <span className="section-tag">ATMOSPHERE & ARCHITECTURE</span>
            <h2 className="section-title">The Aurelia Visual Sanctuary</h2>
            <p className="section-subtitle">Click any photograph to view in high definition.</p>
          </div>

          <div className="gallery-grid">
            {galleryImages.map((g, idx) => (
              <div
                key={idx}
                className="gallery-item luxury-card"
                onClick={() => setLightboxImg(g)}
              >
                <img
                  src={getImageUrl(g.name)}
                  alt={g.title}
                  className="gallery-img"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="zoom-icon">🔍</span>
                  <span className="gallery-title">{g.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="modal-overlay" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setLightboxImg(null)}>✕</button>
            <img
              src={getImageUrl(lightboxImg.name)}
              alt={lightboxImg.title}
              className="lightbox-full-img"
            />
            <p className="lightbox-caption">{lightboxImg.title}</p>
          </div>
        </div>
      )}

      <style>{`
        .games-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .game-card-container {
          background: #14171f;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
        }
        .game-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }
        .game-title {
          font-size: 1.15rem;
          color: var(--primary-gold-light);
        }
        .game-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .game-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: var(--text-secondary);
          padding: 0.5rem 0.75rem;
          background: var(--bg-surface);
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
        }
        .memory-board {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          max-width: 380px;
          margin: 0 auto;
        }
        .memory-card {
          aspect-ratio: 1 / 1;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s, background 0.2s;
        }
        .memory-card:hover:not(:disabled) {
          border-color: var(--primary-gold);
          transform: translateY(-2px);
        }
        .card-face {
          position: absolute;
          font-size: 1.8rem;
          transition: opacity 0.2s;
        }
        .card-back { opacity: 1; }
        .card-front { opacity: 0; }
        .memory-card.flipped .card-back { opacity: 0; }
        .memory-card.flipped .card-front { opacity: 1; }
        .memory-card.matched {
          background: rgba(39, 174, 96, 0.2);
          border-color: #2ecc71;
          cursor: default;
        }
        .puzzle-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.65rem;
          max-width: 320px;
          margin: 0 auto;
        }
        .puzzle-tile {
          aspect-ratio: 1 / 1;
          background: var(--bg-surface);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-md);
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--primary-gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .puzzle-tile:hover:not(.empty-tile) {
          background: rgba(212, 175, 55, 0.15);
          border-color: var(--primary-gold);
          transform: scale(1.03);
        }
        .puzzle-tile.empty-tile {
          background: transparent;
          border-color: transparent;
          cursor: default;
        }
        .game-win-banner {
          text-align: center;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          background: var(--bg-surface);
          border-radius: var(--radius-md);
        }
        .win-icon {
          font-size: 3rem;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .gallery-item {
          padding: 0;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          height: 240px;
        }
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .gallery-item:hover .gallery-img {
          transform: scale(1.08);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(11, 13, 17, 0.7);
          opacity: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1.5rem;
          text-align: center;
          transition: opacity var(--transition-fast);
        }
        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }
        .zoom-icon {
          font-size: 1.6rem;
        }
        .gallery-title {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: var(--primary-gold-light);
        }
        .lightbox-content {
          max-width: 800px;
          width: 100%;
          background: #14171f;
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .lightbox-full-img {
          width: 100%;
          max-height: 70vh;
          object-fit: contain;
          border-radius: var(--radius-md);
        }
        .lightbox-caption {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          color: var(--primary-gold-light);
          margin-top: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

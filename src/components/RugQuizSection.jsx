export default function RugQuizSection({ onOpenQuiz }) {
  return (
    <section className="pk-quiz-teaser-section">
      <div className="container">
        <div className="pk-quiz-teaser-card">
          <div className="pk-quiz-teaser-card__left">
            <span className="pk-quiz-teaser-badge">
              <span className="sparkle">✨</span> PERSONALIZED DISCOVERY
            </span>
            <h2 className="pk-quiz-teaser-title">
              Find Your<br />
              <em>Perfect Rug</em>
            </h2>
            <p className="pk-quiz-teaser-desc">
              Answer 4 simple questions about your room, color preferences, and dimension needs to find your ideal heirloom piece.
            </p>
            <button className="pk-quiz-teaser-btn" onClick={onOpenQuiz}>
              START THE QUIZ
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div className="pk-quiz-teaser-card__right">
            <div className="pk-quiz-preview-box">
              <img src="/rugs/rug-7.jpeg" alt="Pakiza Rug Matcher" className="pk-quiz-preview-img" />
              <div className="pk-quiz-preview-floating-tag">
                <span>98% Style Match</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';

export default function FloatingAIConcierge({ onOpenQuiz }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    setShowTooltip(false);
    if (onOpenQuiz) {
      onOpenQuiz();
    } else {
      const el = document.getElementById('ai-concierge');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="pk-ai-floating">
      {showTooltip && (
        <div className="pk-ai-floating__tooltip">
          <div className="pk-ai-floating__tooltip-text">
            <strong>Pakiza AI</strong>
            <span>Need a rug? I'll match style, budget &amp; room.</span>
          </div>
          <button
            className="pk-ai-floating__tooltip-close"
            onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
            aria-label="Close tooltip"
          >
            ×
          </button>
        </div>
      )}

      <button
        className="pk-ai-floating__btn"
        onClick={handleClick}
        aria-label="Ask Pakiza AI Rug Concierge"
      >
        <span className="pk-ai-floating__pulse" />
        <span className="pk-ai-floating__icon">✨</span>
        <span className="pk-ai-floating__badge">AI</span>
      </button>
    </div>
  );
}

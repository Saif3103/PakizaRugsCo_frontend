import { useState } from 'react';
import GeminiAIChatModal, { GeminiSparkleIcon } from './GeminiAIChatModal';

export default function FloatingAIConcierge({ onOpenQuiz }) {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleClick = () => {
    setShowTooltip(false);
    if (onOpenQuiz) {
      onOpenQuiz();
    } else {
      setIsChatOpen(true);
    }
  };

  return (
    <>
      <GeminiAIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      <div className="pk-ai-floating">
        {showTooltip && (
          <div className="pk-ai-floating__tooltip">
            <div className="pk-ai-floating__tooltip-text">
              <strong>Pakiza Gemini AI</strong>
              <span>Need rug advice? Ask Gemini or upload your room photo.</span>
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
          aria-label="Ask Pakiza Gemini AI Rug Concierge"
        >
          <span className="pk-ai-floating__pulse" />
          <span className="pk-ai-floating__icon" style={{ display: 'grid', placeItems: 'center' }}>
            <GeminiSparkleIcon size={22} />
          </span>
          <span className="pk-ai-floating__badge">1.5</span>
        </button>
      </div>
    </>
  );
}

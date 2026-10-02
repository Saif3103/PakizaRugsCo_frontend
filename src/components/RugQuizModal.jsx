import { useState } from 'react';

const questions = [
  {
    id: 'room',
    title: 'Which room is this rug for?',
    options: ['Living Room', 'Master Bedroom', 'Dining Room', 'Foyer & Hallway'],
  },
  {
    id: 'style',
    title: 'What style defines your home?',
    options: ['Persian Heritage', 'Modern Abstract', 'Moroccan Tribal', 'Vintage Kilim'],
  },
  {
    id: 'color',
    title: 'What is your preferred color palette?',
    options: ['Warm Ivory & Beige', 'Royal Navy & Blue', 'Emerald & Forest Green', 'Terracotta & Rust'],
  },
  {
    id: 'size',
    title: 'What size fits your space best?',
    options: ['Small (4×6 ft)', 'Medium (5×8 ft)', 'Large (8×10 ft)', 'Custom Bespoke Size'],
  },
];

const mockMatches = [
  {
    name: 'Isfahan Heritage Medallion',
    category: 'Persian Silk & Wool',
    price: '₹34,500',
    image: '/rugs/rug-7.jpeg',
    matchScore: '98% Match',
  },
  {
    name: 'Emerald Royal Kashan',
    category: 'Hand-Knotted New Zealand Wool',
    price: '₹28,000',
    image: '/rugs/rug-3.jpeg',
    matchScore: '95% Match',
  },
  {
    name: 'Anatolian Geometric Kilim',
    category: 'Pure Wool Flatweave',
    price: '₹19,500',
    image: '/rugs/rug-5.jpeg',
    matchScore: '92% Match',
  },
];

export default function RugQuizModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const currentQ = questions[step];

  const handleSelect = (option) => {
    const updated = { ...answers, [currentQ.id]: option };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Pick best match based on step
      const matchedRug = mockMatches[Math.floor(Math.random() * mockMatches.length)];
      setResult(matchedRug);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="pk-quiz-overlay" onClick={onClose}>
      <div className="pk-quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pk-quiz-modal__close" onClick={onClose} aria-label="Close Quiz">
          ✕
        </button>

        {!result ? (
          <div className="pk-quiz-step">
            <div className="pk-quiz-progress">
              <span className="pk-quiz-progress__bar" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
            </div>

            <div className="pk-quiz-header">
              <span className="pk-quiz-step-count">Step {step + 1} of {questions.length}</span>
              <h3 className="pk-quiz-title">{currentQ.title}</h3>
            </div>

            <div className="pk-quiz-options">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  className="pk-quiz-option-btn"
                  onClick={() => handleSelect(opt)}
                >
                  <span>{opt}</span>
                  <span className="pk-quiz-option-arrow">→</span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button className="pk-quiz-back-btn" onClick={() => setStep(step - 1)}>
                ← Previous question
              </button>
            )}
          </div>
        ) : (
          <div className="pk-quiz-result">
            <div className="pk-quiz-result__badge">✨ {result.matchScore}</div>
            <h3 className="pk-quiz-result__heading">Your Perfect Match</h3>
            <p className="pk-quiz-result__sub">Based on your room &amp; style preference</p>

            <div className="pk-quiz-result__card">
              <img src={result.image} alt={result.name} className="pk-quiz-result__img" />
              <div className="pk-quiz-result__info">
                <span className="pk-quiz-result__cat">{result.category}</span>
                <h4 className="pk-quiz-result__name">{result.name}</h4>
                <span className="pk-quiz-result__price">{result.price}</span>
              </div>
            </div>

            <div className="pk-quiz-result__actions">
              <a
                href="#collections"
                className="pk-quiz-result__shop-btn"
                onClick={onClose}
              >
                VIEW IN COLLECTION →
              </a>
              <button className="pk-quiz-result__retry-btn" onClick={handleReset}>
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

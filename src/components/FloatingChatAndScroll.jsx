import { useState, useEffect } from 'react';
import GeminiAIChatModal from './GeminiAIChatModal';

export default function FloatingChatAndScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isGeminiChatOpen, setIsGeminiChatOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setIsVisible(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG Circular progress math
  const radius = 19;
  const circumference = 2 * Math.PI * radius; // ~119.38
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* ── Pakiza Rugs Co. AI Chat Modal ── */}
      <GeminiAIChatModal
        isOpen={isGeminiChatOpen}
        onClose={() => setIsGeminiChatOpen(false)}
      />

      {/* ── Floating Controls (Message Chat Pill + Scroll Circle) ── */}
      <div className="rug-floating-container">
        {/* Chat Pill Button */}
        <button
          className="rug-chat-pill"
          onClick={() => setIsGeminiChatOpen(true)}
          aria-label="Open Pakiza Rugs Chat"
          id="rug-floating-chat-btn"
        >
          <svg
            className="rug-chat-pill__icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="rug-chat-pill__text">Chat</span>
        </button>

        {/* Scroll To Top with Dynamic Circular Progress Fill */}
        <button
          className={`rug-scroll-indicator ${isVisible ? 'visible' : ''}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title={`Scroll to top (${Math.round(scrollProgress)}%)`}
        >
          {/* SVG Progress Circle */}
          <svg className="rug-scroll-indicator__svg" width="46" height="46" viewBox="0 0 46 46">
            {/* Background Track */}
            <circle
              cx="23"
              cy="23"
              r={radius}
              className="rug-scroll-indicator__track"
            />
            {/* Dynamic Fill Path (fills on scroll) */}
            <circle
              cx="23"
              cy="23"
              r={radius}
              className="rug-scroll-indicator__fill"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset
              }}
            />
          </svg>

          {/* Upward Chevron Icon */}
          <div className="rug-scroll-indicator__arrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}

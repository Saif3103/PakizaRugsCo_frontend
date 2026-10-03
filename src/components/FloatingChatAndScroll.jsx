import { useState, useEffect } from 'react';

export default function FloatingChatAndScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

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

  const handleSendWhatsApp = (msg) => {
    const textToSend = msg || chatMessage || 'Hello Pakiza Rugs Co., I have an inquiry.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/917007626680?text=${encoded}`, '_blank');
    setIsChatOpen(false);
    setChatMessage('');
  };

  // SVG Circular progress math
  const radius = 19;
  const circumference = 2 * Math.PI * radius; // ~119.38
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* ── Chat Modal Popup (Non-AI Direct Customer Support) ── */}
      {isChatOpen && (
        <div className="chat-popup-overlay" onClick={() => setIsChatOpen(false)}>
          <div className="chat-popup" onClick={(e) => e.stopPropagation()}>
            <div className="chat-popup__header">
              <div className="chat-popup__agent">
                <div className="chat-popup__avatar">
                  <span>PR</span>
                  <span className="chat-popup__online-dot" />
                </div>
                <div>
                  <h4 className="chat-popup__title">Pakiza Rugs Support</h4>
                  <span className="chat-popup__status">Online · Replies in 5 mins</span>
                </div>
              </div>
              <button
                className="chat-popup__close"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close Chat"
              >
                ×
              </button>
            </div>

            <div className="chat-popup__body">
              <p className="chat-popup__welcome">
                Hello! How can we help you create your perfect handcrafted space today?
              </p>

              <div className="chat-popup__quick-prompts">
                <button
                  className="chat-popup__quick-btn"
                  onClick={() =>
                    handleSendWhatsApp('Hi! I want to inquire about custom rug sizing and designs.')
                  }
                >
                  ✂️ Custom Size / Design Inquiry
                </button>
                <button
                  className="chat-popup__quick-btn"
                  onClick={() =>
                    handleSendWhatsApp('Hello, can you help me choose the best carpet for my living room?')
                  }
                >
                  🛋️ Need Help Choosing Rug Style
                </button>
                <button
                  className="chat-popup__quick-btn"
                  onClick={() =>
                    handleSendWhatsApp('Hi, I want to track my carpet order / check delivery status.')
                  }
                >
                  📦 Track Order / Delivery Status
                </button>
              </div>
            </div>

            <form
              className="chat-popup__footer"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendWhatsApp();
              }}
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="chat-popup__input"
                autoFocus
              />
              <button type="submit" className="chat-popup__send-btn" aria-label="Send message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Floating Controls (Chat Pill + Scroll Circle) ── */}
      <div className="rug-floating-container">
        {/* Chat Pill Button */}
        <button
          className="rug-chat-pill"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Chat"
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

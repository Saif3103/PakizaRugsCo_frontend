import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../utils/toast';
import {
  chatWithGeminiAssistant,
  FEATURED_RECOMMENDATIONS
} from '../services/geminiRugService';
import './geminiChat.css';

// Legacy export retained for backwards compatibility
export function GeminiSparkleIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z"
        fill="#c5a059"
      />
    </svg>
  );
}

// Legacy export retained for backwards compatibility
export function GoogleGeminiBrand({ size = 16 }) {
  return (
    <span style={{ fontWeight: 700, fontSize: `${size}px`, letterSpacing: '0.02em', color: '#ffffff' }}>
      Pakiza Rugs Co.
    </span>
  );
}

// Quick starter prompt suggestions
const QUICK_PROMPTS = [
  {
    icon: '🛍️',
    label: 'What collections do you offer?',
    query: 'Pakiza Rugs me kitni categories hain aur kya kya available hai? Show me all collections.'
  },
  {
    icon: '🚚',
    label: 'Shipping & Delivery Policy',
    query: 'Shipping kitne din me hoti hai? Return policy kya hai? International delivery available hai?'
  },
  {
    icon: '📐',
    label: 'Room Size & Placement Guide',
    query: 'Living room, bedroom, aur dining room ke liye konsa rug size best hai? Layout tips batao.'
  },
  {
    icon: '💳',
    label: 'Payment & Cash on Delivery',
    query: 'Order kaise karein? COD available hai? Payment options kya hain?'
  },
  {
    icon: '✂️',
    label: 'Custom Rug Design',
    query: 'How can I design a custom bespoke rug with my own colors and size? Tell me about the AI Atelier.'
  },
  {
    icon: '🧼',
    label: 'Care & Stain Cleaning',
    query: 'Carpet par chai ya daag gir jaye to kaise saaf karein? Regular cleaning tips batao.'
  },
  {
    icon: '🏆',
    label: 'Best Seller Recommendations',
    query: 'Sabse acche aur popular rugs konse hain? Top bestselling carpets dikhao with prices.'
  },
  {
    icon: '🏛️',
    label: 'About Pakiza & Heritage',
    query: 'Pakiza Rugs ka founder kaun hai? Company ki history aur Bhadohi ke baare me batao.'
  }
];

export default function GeminiAIChatModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      role: 'assistant',
      text: `Hello! Welcome to **Pakiza Rugs Co.** 👋\n\nHow can I help you today? Ask me any questions about our handcrafted rugs, collections, room sizing, custom orders, delivery, or care tips!`,
      recommendations: [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0]],
      followUpChips: [
        'What collections do you offer?',
        'Shipping & Return Policy',
        'Living Room Sizing Guide',
        'Custom Rug Studio'
      ],
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [attachedImage, setAttachedImage] = useState(null); // base64
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isThinking, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Voice recognition setup (Web Speech API)
  const toggleVoiceRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.warning('Speech recognition is not supported in your browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputVal((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = (err) => {
        console.warn('Speech error:', err);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Could not start recognition:', err);
      setIsRecording(false);
    }
  };

  // Image Upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result);
      toast.success('Room photo attached! Ask for matching rug advice.');
    };
    reader.readAsDataURL(file);
  };

  // Send message
  const handleSendMessage = async (textToSend = inputVal) => {
    const prompt = (textToSend || '').trim();
    if (!prompt && !attachedImage) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      role: 'user',
      text: prompt || 'Analyze this room photo and recommend matching handcrafted rugs.',
      image: attachedImage,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputVal('');
    const tempImage = attachedImage;
    setAttachedImage(null);
    setIsThinking(true);

    try {
      const result = await chatWithGeminiAssistant({
        messages: updatedMessages,
        userImage: tempImage
      });

      const aiMsg = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: result.text,
        recommendations: result.recommendations || [],
        followUpChips: result.followUpChips || [],
        isLive: result.isGeminiLive,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        text: `Main sirf **Pakiza Rugs Co.** aur hamari website se jude sawaalo me aapki madad kar sakta hoon. Kripya collections, rug sizes, delivery ya custom orders ke baare me poochein!`,
        recommendations: [FEATURED_RECOMMENDATIONS[0]],
        followUpChips: ['Explore Collections', 'Shipping & Delivery', 'WhatsApp Support'],
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Response copied to clipboard!');
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg-init-reset',
        role: 'assistant',
        text: `Conversation restarted. Welcome to **Pakiza Rugs Co.**! How can I assist you with our rugs or website today?`,
        recommendations: [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0]],
        timestamp: new Date()
      }
    ]);
    toast.info('Chat history cleared.');
  };

  const handleWhatsAppDirect = (customMsg = '') => {
    const text = encodeURIComponent(customMsg || 'Hello Pakiza Rugs Co., I would like an artisan rug consultation.');
    window.open(`https://wa.me/917007626680?text=${text}`, '_blank');
  };

  // Simple Markdown Formatter Helper
  const formatMarkdown = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return lines.map((line, idx) => {
      // Table check
      if (line.startsWith('|')) {
        return (
          <div key={idx} style={{ overflowX: 'auto', margin: '4px 0' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#a4b6ad' }}>{line}</span>
          </div>
        );
      }
      // Heading 3
      if (line.startsWith('### ')) {
        return <h3 key={idx}>{line.replace('### ', '').replace(/\*\*/g, '')}</h3>;
      }
      // Heading 4
      if (line.startsWith('#### ')) {
        return <h4 key={idx}>{line.replace('#### ', '').replace(/\*\*/g, '')}</h4>;
      }
      // Bullet list
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const bulletText = line.trim().substring(2);
        return (
          <li key={idx}>
            <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(bulletText) }} />
          </li>
        );
      }
      // Numbered list
      if (/^\d+\.\s/.test(line.trim())) {
        const numText = line.trim().replace(/^\d+\.\s/, '');
        return (
          <li key={idx} style={{ listStyleType: 'decimal' }}>
            <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(numText) }} />
          </li>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} style={{ height: '6px' }} />;
      }
      // Regular paragraph
      return (
        <p key={idx} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
      );
    });
  };

  const renderInlineMarkdown = (str) => {
    if (!str) return '';
    return str
      // Markdown links: [Label](url)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, href) => {
        const isInternal = href.startsWith('/');
        return `<a href="${href}" class="gemini-chat-link" data-internal="${isInternal}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'}>${label}</a>`;
      })
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code class="gemini-chat-inline-code">$1</code>');
  };

  const handleMessageBubbleClick = (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="gemini-chat-backdrop" onClick={onClose}>
      <div
        className={`gemini-chat-modal ${isExpanded ? 'is-expanded' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Clean Header: Pakiza Rugs Co. ── */}
        <div className="gemini-chat-header">
          <div className="gemini-header-brand">
            <div className="pk-chat-avatar-badge">
              <span>P</span>
              <span className="gemini-online-pulse" />
            </div>
            <div className="gemini-title-group">
              <span className="gemini-title">Pakiza Rugs Co.</span>
              <span className="gemini-subtitle">Website Assistant</span>
            </div>
          </div>

          <div className="gemini-header-actions">
            <button
              className="gemini-icon-btn"
              onClick={handleClearHistory}
              title="Restart Chat"
              aria-label="Restart Chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>

            <button
              className="gemini-icon-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse' : 'Expand window'}
              aria-label="Toggle Expand"
            >
              {isExpanded ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 14 10 14 10 20" />
                  <polyline points="20 10 14 10 14 4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              )}
            </button>

            <button
              className="gemini-icon-btn"
              onClick={onClose}
              title="Close"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Quick Topic Shortcuts Carousel ── */}
        <div className="gemini-quick-bar">
          {[
            { label: '🛍️ Collections', query: 'Pakiza Rugs me kitni categories hain aur kya kya available hai? Show all collections.' },
            { label: '📐 Sizing Guide', query: 'Living room, bedroom, aur dining room ke liye rug size guide batao.' },
            { label: '🚚 Shipping & COD', query: 'Shipping kitne din me hoti hai? COD available hai?' },
            { label: '🔄 Returns', query: 'Return policy aur refund process kya hai?' },
            { label: '✂️ Custom Rug', query: 'How can I design a custom rug in the AI Atelier Studio?' },
            { label: '🧼 Care Tips', query: 'Carpet par chai ya daag gir jaye to kaise saaf karein?' },
            { label: '🎁 Discounts', query: 'What are the current discount coupons and offers?' },
            { label: '👑 Bestsellers', query: 'Sabse popular best-selling carpets konse hain with prices?' },
            { label: '💬 WhatsApp', query: 'Connect with Master Weaver on WhatsApp' }
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="gemini-quick-pill"
              onClick={() => handleSendMessage(item.query)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* ── Messages Stream ── */}
        <div className="gemini-messages-body">
          {/* Welcome Card */}
          <div className="gemini-welcome-card">
            <h3 className="gemini-welcome-heading">
              Pakiza Rugs Co.
            </h3>
            <p className="gemini-welcome-desc">
              Ask anything about our handcrafted rugs, collections, room sizing, custom orders, or delivery.
            </p>

            {/* Quick Starters */}
            <div className="gemini-starter-prompts">
              <span className="gemini-starter-title">Explore Suggestions</span>
              <div className="gemini-chips-grid">
                {QUICK_PROMPTS.slice(0, isExpanded ? 6 : 4).map((prompt, i) => (
                  <button
                    key={i}
                    className="gemini-chip-btn"
                    onClick={() => handleSendMessage(prompt.query)}
                  >
                    <span className="gemini-chip-icon">{prompt.icon}</span>
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Conversation List */}
          {messages.map((msg) => (
            <div key={msg.id} className={`gemini-msg-row ${msg.role}`}>
              <div className={`gemini-msg-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
                {msg.role === 'user' ? 'You' : 'P'}
              </div>

              <div className="gemini-msg-content-wrap">
                <div
                  className={`gemini-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}
                  onClick={msg.role === 'assistant' ? handleMessageBubbleClick : undefined}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="User room upload"
                      className="gemini-user-attached-img"
                    />
                  )}
                  {formatMarkdown(msg.text)}
                </div>

                {/* In-Chat Interactive Follow-up Suggestion Chips */}
                {msg.role === 'assistant' && msg.followUpChips && msg.followUpChips.length > 0 && (
                  <div className="gemini-followup-chips-wrap">
                    {msg.followUpChips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="gemini-followup-chip-btn"
                        onClick={() => handleSendMessage(chip)}
                      >
                        <span>{chip}</span>
                        <span className="gemini-followup-arrow">↗</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* In-Chat Rug Recommendation Cards */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="gemini-rug-cards-carousel">
                    {msg.recommendations.map((rug) => (
                      <div key={rug.id} className="gemini-rug-card">
                        <img src={rug.image} alt={rug.name} className="gemini-rug-thumb" />
                        <div className="gemini-rug-details">
                          <div>
                            <div className="gemini-rug-top-meta">
                              <span className="gemini-rug-badge">{rug.badge || 'Handmade'}</span>
                              <span className="gemini-rug-match">{rug.match || '96%'} Match</span>
                            </div>
                            <h4 className="gemini-rug-name">{rug.name}</h4>
                            <span className="gemini-rug-mat">{rug.material}</span>
                          </div>

                          <div className="gemini-rug-footer-row">
                            <span className="gemini-rug-price">{rug.price}</span>
                            <div className="gemini-rug-actions">
                              <Link
                                to={rug.href || '/collections'}
                                className="gemini-rug-action-btn primary"
                                onClick={onClose}
                              >
                                View Rug →
                              </Link>
                              <button
                                className="gemini-rug-action-btn secondary"
                                onClick={() =>
                                  handleWhatsAppDirect(`Hi, I saw the ${rug.name} (${rug.price}) on Pakiza Rugs and would like to inquire/order.`)
                                }
                              >
                                WhatsApp
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                {msg.role === 'assistant' && (
                  <div className="gemini-msg-actions">
                    <button
                      className="gemini-action-link"
                      onClick={() => handleCopyText(msg.text)}
                      title="Copy response"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      Copy
                    </button>
                    <button
                      className="gemini-action-link"
                      onClick={() => handleSendMessage(messages[messages.length - 2]?.text || 'Tell me more about Pakiza rugs')}
                      title="Regenerate"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                      </svg>
                      Retry
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking / Typing Shimmer */}
          {isThinking && (
            <div className="gemini-typing-row">
              <div className="gemini-msg-avatar ai">P</div>
              <div className="gemini-shimmer-box">
                <span className="gemini-shimmer-text">
                  Pakiza Rugs Co. is typing
                  <span className="gemini-loading-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Voice Recording Active Bar ── */}
        {isRecording && (
          <div className="gemini-voice-indicator-bar">
            <div className="gemini-voice-status">
              <div className="gemini-wave-eq">
                <span />
                <span />
                <span />
                <span />
              </div>
              Listening... Speak your rug inquiry
            </div>
            <button className="gemini-voice-stop-btn" onClick={toggleVoiceRecording}>
              Done
            </button>
          </div>
        )}

        {/* ── Uploaded Image Preview Tag ── */}
        {attachedImage && (
          <div className="gemini-upload-preview-tag">
            <img src={attachedImage} alt="Preview" className="gemini-upload-preview-thumb" />
            <span className="gemini-upload-preview-text">Room photo attached</span>
            <button
              className="gemini-upload-preview-remove"
              onClick={() => setAttachedImage(null)}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        )}

        {/* ── Footer Input Bar ── */}
        <div className="gemini-chat-footer">
          <form
            className="gemini-input-pill-container"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <textarea
              className="gemini-chat-textarea"
              placeholder="Ask a question about Pakiza Rugs..."
              rows={1}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              autoFocus
            />

            <div className="gemini-input-actions">
              {/* Hidden File Input for Room Photo */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />

              {/* Attach Photo Button */}
              <button
                type="button"
                className="gemini-tool-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Attach Room Photo"
                aria-label="Attach Photo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </button>

              {/* Voice Mic Button */}
              <button
                type="button"
                className={`gemini-tool-btn ${isRecording ? 'recording' : ''}`}
                onClick={toggleVoiceRecording}
                title={isRecording ? 'Stop Recording' : 'Voice Input'}
                aria-label="Voice Input"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>

              {/* Send Button */}
              <button
                type="submit"
                className="gemini-send-btn"
                disabled={(!inputVal.trim() && !attachedImage) || isThinking}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </form>

          <div className="gemini-footer-footnote">
            <span>Pakiza Rugs Co. • Handcrafted in Bhadohi</span>
            <Link to="/collections" className="gemini-footnote-link" onClick={onClose}>
              View All Rugs →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

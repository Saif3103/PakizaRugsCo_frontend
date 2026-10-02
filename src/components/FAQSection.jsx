import { useState } from 'react';

const faqs = [
  {
    q: 'Are your carpets genuinely handmade?',
    a: 'Yes, every single carpet at Pakiza Rugs & Co. is 100% hand-knotted or hand-woven by master weavers in Bhadohi and Kashmir, carrying generations of authentic craft heritage. We never sell machine-made imitations.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 7-day hassle-free inspection and return period. If your rug does not match your home aesthetics, you can initiate a complimentary return or exchange with insured courier pickup.',
  },
  {
    q: 'Do you offer custom carpet sizes and colors?',
    a: 'Absolutely! Our bespoke studio crafts custom dimensions, colors, and patterns tailored to your floor plan. We provide complimentary digital renders and yarn swatches before weaving begins.',
  },
  {
    q: 'How do I care for and clean my handmade rug?',
    a: 'We recommend gentle vacuuming without a stiff beater bar once or twice a week. Rotate your rug every 6 months for even wear. In case of accidental spills, blot immediately with a clean, damp cotton cloth. Professional rug washing is recommended every 2–3 years.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major Credit and Debit Cards (Visa, MasterCard, Amex), UPI (Google Pay, PhonePe, Paytm), Net Banking, flexible EMI options, Cash on Delivery (COD), and direct bank wire transfers.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (i) => {
    setOpenIdx(openIdx === i ? -1 : i);
  };

  return (
    <section id="faq" className="pk-faq-section">
      <div className="container">
        <div className="pk-faq-header">
          <span className="eyebrow eyebrow--gold">FREQUENTLY ASKED</span>
          <h2 className="pk-faq-title">
            Have Questions? <em>We're Here to Help</em>
          </h2>
          <p className="pk-faq-desc">
            Everything you need to know about our heirloom carpets, bespoke ordering, shipping, and care.
          </p>
        </div>

        <div className="pk-faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`pk-faq-item ${openIdx === i ? 'open' : ''}`}
              onClick={() => toggle(i)}
            >
              <div className="pk-faq-question">
                <span className="pk-faq-q-text">{faq.q}</span>
                <span className="pk-faq-icon">
                  {openIdx === i ? '−' : '+'}
                </span>
              </div>
              {openIdx === i && (
                <div className="pk-faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

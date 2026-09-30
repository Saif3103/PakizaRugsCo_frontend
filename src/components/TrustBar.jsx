const TRUST_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/>
      </svg>
    ),
    title: 'Free Delivery',
    desc: 'Pan India — No extra charge',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
      </svg>
    ),
    title: 'COD Available',
    desc: 'Pay on delivery, hassle-free',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: '1 Year Warranty',
    desc: 'Against manufacturing defects',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    title: 'Custom Sizes',
    desc: 'Tailor-made to fit your space',
  },
];

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="container trust-bar__inner">
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="trust-bar__item">
            <span className="trust-bar__icon">{item.icon}</span>
            <div className="trust-bar__text">
              <strong className="trust-bar__title">{item.title}</strong>
              <span className="trust-bar__desc">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

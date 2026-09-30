/* ── Announcement Ticker (top bar) ── */
export default function AnnouncementBar() {
  const items = [
    '🚚 Free Shipping All Over India',
    '💳 COD Available — Order with ease',
    '✂️ Custom Sizes Available on Request',
    '🛡️ 100% Authentic Hand-Knotted Rugs',
    '🎁 Use code PAKIZA10 for 10% off your first order',
    '⭐ Premium Quality · Woven with Care',
  ];
  // Duplicate for seamless loop
  const track = [...items, ...items];

  return (
    <div className="ann-bar" role="marquee" aria-label="Announcements">
      <div className="ann-bar__track">
        {track.map((item, i) => (
          <span key={i} className="ann-bar__item">
            {item}
            <span className="ann-bar__sep" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

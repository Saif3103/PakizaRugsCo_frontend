const ROOMS = [
  {
    label: 'Living Room',
    sub: 'Carpets',
    img: '/rugs/rug-16.jpeg',
    id: 'room-living',
  },
  {
    label: 'Bedroom',
    sub: 'Carpets',
    img: '/rugs/rug-18.jpeg',
    id: 'room-bedroom',
  },
  {
    label: 'Dining Room',
    sub: 'Carpets',
    img: '/rugs/rug-7.jpeg',
    id: 'room-dining',
  },
  {
    label: 'Kids Room',
    sub: 'Carpets',
    img: '/rugs/rug-13.jpeg',
    id: 'room-kids',
  },
];

export default function ShopByRoom() {
  return (
    <section className="sbr" id="shop-by-room">
      <div className="container sbr__header">
        <span className="eyebrow eyebrow--gold">Find Your Perfect Match</span>
        <h2 className="sbr__title">Shop by <em>Room</em></h2>
      </div>
      <div className="sbr__grid">
        {ROOMS.map((room) => (
          <a href="#collections" key={room.id} id={room.id} className="sbr__card">
            <div className="sbr__card-img-wrap">
              <img src={room.img} alt={room.label} className="sbr__card-img" loading="lazy" />
              <div className="sbr__card-overlay" />
            </div>
            <div className="sbr__card-body">
              <span className="sbr__card-sub">{room.sub}</span>
              <h3 className="sbr__card-label">{room.label}</h3>
              <span className="sbr__card-cta">View All →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

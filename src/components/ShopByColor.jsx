const COLORS = [
  { name: 'Deep Red',    img: '/rugs/rug-5.jpeg',  id: 'clr-red' },
  { name: 'Midnight',   img: '/rugs/rug-16.jpeg', id: 'clr-dark' },
  { name: 'Ocean Blue', img: '/rugs/rug-12.jpeg', id: 'clr-blue' },
  { name: 'Forest',     img: '/rugs/rug-8.jpeg',  id: 'clr-green' },
  { name: 'Sand & Tan', img: '/rugs/rug-17.jpeg', id: 'clr-tan' },
  { name: 'Ivory',      img: '/rugs/rug-19.jpeg', id: 'clr-ivory' },
];

export default function ShopByColor() {
  return (
    <section className="sbc" id="shop-by-color">
      <div className="container sbc__header">
        <span className="eyebrow eyebrow--gold">Find Your Tone</span>
        <h2 className="sbc__title">Shop by <em>Color</em></h2>
      </div>
      <div className="sbc__track-wrap">
        <div className="sbc__track">
          {COLORS.map((c) => (
            <a href="#collections" key={c.id} id={c.id} className="sbc__card">
              <div className="sbc__card-img-wrap">
                <img src={c.img} alt={c.name} className="sbc__card-img" loading="lazy" />
              </div>
              <span className="sbc__card-name">{c.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

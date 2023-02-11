import "./BirdCardLayout.scss";

const BirdCard = (bird) => {
  return (
    <div className="card">
      <img className="preview-img" src={bird.img} alt="bird" />
      <p className="bird-name">{bird.name}</p>
      <p className="bird-price">{bird.price}</p>
    </div>
  );
};

export default BirdCard;

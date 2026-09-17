function Card({ titulo, texto }) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </div>
  );
}

export default Card;
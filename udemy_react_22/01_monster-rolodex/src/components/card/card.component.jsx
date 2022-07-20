import "./card.styles.css";

const Card = ({ monsters }) => {
  const { name, email } = monsters;

  return (
    <div className='card-container' key={monsters.id}>
      <img
        src={`https://robohash.org/${monsters.id}?set=set2&size=180x180`}
        alt={name}
      />
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default Card;

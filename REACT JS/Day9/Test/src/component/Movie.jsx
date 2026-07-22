const Movie = ({ actor }) => {
  return (
    <div className="border p-5 rounded bg-blue-200">
      <h2 className="font-bold mb-2">Actors</h2>

      {actor.map((item, index) => (
        <h3 key={index}>{item}</h3>
      ))}
    </div>
  );
};

export default Movie;
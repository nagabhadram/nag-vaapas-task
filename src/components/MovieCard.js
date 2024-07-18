import './MovieCard.css'

function MovieCard({movie}) {
  return (
    <div className="movie-card">
      <img src={movie.image} alt="Dog" />
      <h3>{movie.title}</h3>
      <p>Author: {movie.author}</p>
      <p>Published: {movie.publishDate}</p>
    </div>
  )
}

export default MovieCard

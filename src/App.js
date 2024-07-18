import {useState} from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchMovies = async query => {
    setLoading(true)
    setError('')
    setMovies([])
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`,
      )
      const data = await response.json()
      const movieResults = data.docs.slice(0, 10) // Limit results to 10
      const moviesWithImages = await Promise.all(
        movieResults.map(async movie => {
          const imgResponse = await fetch(
            'https://dog.ceo/api/breeds/image/random',
          )
          const imgData = await imgResponse.json()
          return {
            id: movie.key, // Use a unique identifier from the API data
            title: movie.title,
            author: movie.author_name
              ? movie.author_name.join(', ')
              : 'Unknown Author',
            publishDate: movie.first_publish_year || 'Unknown Year',
            image: imgData.message,
          }
        }),
      )
      setMovies(moviesWithImages)
    } catch (err) {
      setError('Failed to fetch data. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="App">
      <h1>Movie Search</h1>
      <SearchBar onSearch={fetchMovies} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default App

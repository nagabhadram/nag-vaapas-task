import {useState} from 'react'
import './SearchBar.css'

function SearchBar({onSearch}) {
  const [query, setQuery] = useState('')
  const [error, setError] = useState('')

  const handleInputChange = e => {
    setQuery(e.target.value)
    setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (query.trim() === '') {
      setError('Please enter a movie name.')
      return
    }
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default SearchBar

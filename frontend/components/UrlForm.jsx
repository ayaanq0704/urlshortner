import { useState } from 'react'
import axios from 'axios'

const UrlForm = ({ onUrlShortened, onError }) => {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!url.trim()) {
      onError('Please enter a URL')
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      onError('Please enter a valid URL (include http:// or https://)')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await axios.post('http://localhost:5000/api/shorten', {
        original_url: url
      })
      
      onUrlShortened(response.data.short_url)
      setUrl('')
    } catch (error) {
      if (error.response?.data?.error) {
        onError(error.response.data.error)
      } else if (error.code === 'ERR_NETWORK') {
        onError('Unable to connect to server. Please make sure the backend is running.')
      } else {
        onError('An error occurred while shortening the URL')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="url-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your long URL here..."
            className="url-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="shorten-btn"
            disabled={isLoading || !url.trim()}
          >
            {isLoading ? '⏳ Shortening...' : '✂️ Shorten URL'}
          </button>
        </div>
      </form>
      
      <div className="form-help">
        <p>💡 Tip: Make sure to include http:// or https:// in your URL</p>
      </div>
    </div>
  )
}

export default UrlForm

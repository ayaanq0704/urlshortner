import { useState } from 'react'
import UrlForm from '../components/UrlForm'
import './App.css'

function App() {
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleUrlShortened = (url) => {
    setShortUrl(url)
    setError('')
  }

  const handleError = (err) => {
    setError(err)
    setShortUrl('')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔗 URL Shortener</h1>
        <p>Shorten your long URLs into manageable links</p>
      </header>
      
      <main className="app-main">
        <UrlForm 
          onUrlShortened={handleUrlShortened}
          onError={handleError}
        />
        
        {shortUrl && (
          <div className="result-section">
            <h3>Your shortened URL:</h3>
            <div className="short-url-display">
              <input 
                type="text" 
                value={shortUrl} 
                readOnly 
                className="short-url-input"
              />
              <button 
                onClick={() => navigator.clipboard.writeText(shortUrl)}
                className="copy-btn"
              >
                📋 Copy
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <div className="error-section">
            <p className="error-message">❌ {error}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

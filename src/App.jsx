import { useState } from 'react'
import { AppProvider } from './context/AppContext.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SessionsPage from './pages/SessionsPage.jsx'
import MatchesPage from './pages/MatchesPage.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('profile');

  return (
    <AppProvider>
      <div className="app">
        <header>
          <h1>Study Buddy</h1>
          <nav>
            <button 
              className={currentPage === 'profile' ? 'active' : ''}
              onClick={() => setCurrentPage('profile')}
            >
              Profile
            </button>
            <button 
              className={currentPage === 'sessions' ? 'active' : ''}
              onClick={() => setCurrentPage('sessions')}
            >
              Sessions
            </button>
            <button 
              className={currentPage === 'matches' ? 'active' : ''}
              onClick={() => setCurrentPage('matches')}
            >
              Matches
            </button>
          </nav>
        </header>
        
        <main>
          {currentPage === 'profile' && <ProfilePage />}
          {currentPage === 'sessions' && <SessionsPage />}
          {currentPage === 'matches' && <MatchesPage />}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
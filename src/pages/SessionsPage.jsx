import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const SessionsPage = () => {
    const {user, sessions, createSession, joinSession } = useApp();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newSession, setNewSession] = useState({
        courseCode: '',
        date: '',
        time: '',
        location: '',
        description: ''
    });

    const handleCreateSession = () => {
        if(!user.name){
            alert('Please set your name in your profile before creating a session.');
            return;
        }

        if (!newSession.courseCode || !newSession.date || !newSession.time || !newSession.location) {
            alert('Please fill in all required fields');
        return;
        }

        const course = user.courses.find(c => c.courseCode === newSession.courseCode);
        if(!course){
            alert('You must be enrolled in the course to create a session for it.');
            return;
        }
        createSession({
            ...newSession,
            courseName: course.courseName
        });

        setNewSession({
            courseCode: '',
            date: '',
            time: '',
            location: '',
            description: ''
        });
        setShowCreateForm(false);
    };

    const handleJoinSession = (sessionId) => {
        if(!user.name){
            alert('Please set your name in your profile before joining a session.');
            return;
        }
        const session = sessions.find(s => s.id === sessionId);
        if((!user.courses.some(c => c.courseCode === session.courseCode))){
            alert('You must be enrolled in the course to join this session.');
            return;
        }
        joinSession(sessionId);
    };

    return (
        <div className="sessions-page">
      <h2>Study Sessions</h2>
      
      <button 
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="create-btn"
      >
        {showCreateForm ? 'Cancel' : 'Create New Session'}
      </button>
      
      {showCreateForm && (
        <div className="form-container session-form">
          <select
            value={newSession.courseCode}
            onChange={(e) => setNewSession({...newSession, courseCode: e.target.value})}
          >
            <option value="">Select a course</option>
            {user.courses.map(course => (
              <option key={course.id} value={course.courseCode}>
                {course.courseCode} - {course.courseName}
              </option>
            ))}
          </select>
          
          <input
            type="date"
            value={newSession.date}
            onChange={(e) => setNewSession({...newSession, date: e.target.value})}
          />
          
          <input
            type="time"
            value={newSession.time}
            onChange={(e) => setNewSession({...newSession, time: e.target.value})}
          />
          
          <input
            type="text"
            placeholder="Location (e.g., Cooper Library)"
            value={newSession.location}
            onChange={(e) => setNewSession({...newSession, location: e.target.value})}
          />
          
          <textarea
            placeholder="Description (optional)"
            value={newSession.description}
            onChange={(e) => setNewSession({...newSession, description: e.target.value})}
          />
          
          <button onClick={handleCreateSession}>Create Session</button>
        </div>
      )}
      
      <div className="sessions-list">
        <h3>Available Sessions</h3>
        {sessions.length === 0 ? (
          <p>No sessions available</p>
        ) : (
          sessions.map(session => (
            <div key={session.id} className="session-card">
              <h4>{session.courseCode} - {session.courseName}</h4>
              <p><strong>Host:</strong> {session.hostName}</p>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.time}</p>
              <p><strong>Location:</strong> {session.location}</p>
              {session.description && <p><strong>Description:</strong> {session.description}</p>}
              <p><strong>Participants:</strong> {session.participants.length > 0 ? session.participants.join(', ') : 'None yet'}</p>
              
              {session.hostName !== user.name && (
                <button 
                  onClick={() => handleJoinSession(session.id)}
                  disabled={session.participants.includes(user.name)}
                >
                  {session.participants.includes(user.name) ? 'Joined' : 'Join Session'}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};export default SessionsPage;

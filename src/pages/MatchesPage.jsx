import { useApp } from '../context/AppContext.jsx';

const MatchesPages = () => {
    const{user, sessions} = useApp();

    const findMatches = () => {
        const matches = [];
        const matchedUsers = new Set(); // sets do not store duplciates
        sessions.forEach(session => {
            // check if user is a part of course
            if(user.courses.some(c => c.courseCode === session.courseCode)){
                if(session.hostName !== user.name && !matchedUsers.has(session.hostName)){
                    matchedUsers.add(session.hostName);
                    matches.push({
                        name: session.hostName,
                        course: session.courseCode,
                        sessionCount: sessions.filter(s => s.hostName === session.hostName).length
                    });
                }
                // adding students
                session.participants.forEach(participant => {
                    if(participant !== user.name && !matchedUsers.has(participant)){
                        matchedUsers.add(participant);
                        matches.push({
                            name: participant,
                            course: session.courseCode,
                            sessionCount: 1
                        });
                    }
                });
            }
        });
        return matches;
    };
    const matches = findMatches();

    return (
        <div className="matches-page">
      <h2>Study Buddy Matches</h2>
      <p>People in your courses who are looking for study partners:</p>
      
      {matches.length === 0 ? (
        <p>No matches found. Join or create sessions to find study buddies!</p>
      ) : (
        <div className="matches-list">
          {matches.map((match, index) => (
            <div key={index} className="match-card">
              <h4>{match.name}</h4>
              <p>Common course: {match.course}</p>
              <p>Active in {match.sessionCount} session(s)</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MatchesPages;
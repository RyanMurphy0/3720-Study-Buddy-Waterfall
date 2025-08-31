import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

const ProfilePage = () => {
    const { user, setUser, addCourse, removeCourse, addAvailability, removeAvailability } = useApp();
    const [activeTab, setActiveTab] = useState('info');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        major: user.major || ''
  });

  const [newCourse, setNewCourse] = useState({
    courseCode: '',
    courseName: ''
  });

  const [newAvailability, setNewAvailability] = useState({
    day: '',
    startTime: '',
    endTime: ''
  });

  const handleUpdateProfile = () => {
    setUser(prev => ({
        ...prev,
        name: formData.name,
        major: formData.major
    }));
    setEditMode(false);
};

const handleAddCourse = () => {
    const coursePattern = /^[A-Z]{2,4}\s\d{4}$/; // regex pattern for course codes
    if(!coursePattern.test(newCourse.courseCode)) {
        alert('Invalid course code format. Use format like "CS 1010".');
        return;
    }

    // duplicate checking
    if(user.courses.some(c => c.courseCode === newCourse.courseCode)) {
        alert('Course already added.');
        return;
    }
    addCourse(newCourse);
    setNewCourse({ courseCode: '', courseName: '' });
};

const handleAddAvailability = () => {
    if(!newAvailability.startTime || !newAvailability.endTime){
        alert('Please select both start and end times.');
        return;
    }
    if(newAvailability.startTime >= newAvailability.endTime){
        alert('End time must be after start time.');
        return;
    }
    addAvailability(newAvailability);
    setNewAvailability({ day: '', startTime: '', endTime: '' });
};

return(
    <div className="profile-page">
      <h2>My Profile</h2>
      
      <div className="tabs">
        <button 
          className={activeTab === 'info' ? 'active' : ''}
          onClick={() => setActiveTab('info')}
        >
          Basic Info
        </button>
        <button 
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button 
          className={activeTab === 'availability' ? 'active' : ''}
          onClick={() => setActiveTab('availability')}
        >
          Availability
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'info' && (
          <div>
            {!editMode ? (
              <div className="info-display">
                <p><strong>Name:</strong> {user.name || 'Not set'}</p>
                <p><strong>Major:</strong> {user.major || 'Not set'}</p>
                <button onClick={() => setEditMode(true)}>Edit Profile</button>
              </div>
            ) : (
              <div className="form-container">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Major"
                  value={formData.major}
                  onChange={(e) => setFormData({...formData, major: e.target.value})}
                />
                <div className="button-group">
                  <button onClick={handleUpdateProfile}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'courses' && (
          <div>
            <div className="form-container">
              <h3>Add Course</h3>
              <input
                type="text"
                placeholder="Course Code (e.g., CPSC 3720)"
                value={newCourse.courseCode}
                onChange={(e) => setNewCourse({...newCourse, courseCode: e.target.value.toUpperCase()})}
              />
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.courseName}
                onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})}
              />
              <button onClick={handleAddCourse}>Add Course</button>
            </div>
            
            <div className="course-list">
              <h3>My Courses</h3>
              {user.courses.length === 0 ? (
                <p>No courses added yet</p>
              ) : (
                user.courses.map(course => (
                  <div key={course.id} className="course-item">
                    <span>{course.courseCode} - {course.courseName}</span>
                    <button className="remove-btn" onClick={() => removeCourse(course.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'availability' && (
          <div>
            <div className="form-container">
              <h3>Add Availability</h3>
              <select
                value={newAvailability.day}
                onChange={(e) => setNewAvailability({...newAvailability, day: e.target.value})}
              >
                <option value="">Select a day</option>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </select>
              <input
                type="time"
                value={newAvailability.startTime}
                onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
              />
              <input
                type="time"
                value={newAvailability.endTime}
                onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
              />
              <button onClick={handleAddAvailability}>Add Availability</button>
            </div>
            
            <div className="availability-list">
              <h3>My Availability</h3>
              {user.availability.length === 0 ? (
                <p>No availability added yet</p>
              ) : (
                user.availability.map(slot => (
                  <div key={slot.id} className="availability-item">
                    <span>{slot.day}: {slot.startTime} - {slot.endTime}</span>
                    <button className="remove-btn" onClick={() => removeAvailability(slot.id)}>Remove</button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
import { createContext, useContext, useState, useEffect } from 'react';
import { Storage } from '../utils/Storage.js';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(() => Storage.load('user', {
        name: '',
        major: '',
        courses: [],
        availability: []
    }));
    const [sessions, setSessions] = useState(() => Storage.load('sessions', []));

    useEffect(() => {
        Storage.save('user', user);
    }, [user]);
    
    useEffect(() => {
        Storage.save('sessions', sessions);
    }, [sessions]);

    const addCourse = (course) => {
        setUser(prev => ({
            ...prev,
            courses: [...prev.courses, { ...course, id: Date.now() }]
        }));
    };

    const removeCourse = (courseId) => {
        setUser(prev => ({
            ...prev,
            courses: prev.courses.filter(c => c.id !== courseId)
        }));
    };

    const addAvailability = (slot) => {
        setUser(prev => ({
            ...prev,
            availability: [...prev.availability, { ...slot, id: Date.now() }]
        }));
    };

    
    const removeAvailability = (slotId) => {
        setUser(prev => ({
            ...prev,
            availability: prev.availability.filter(a => a.id !== slotId)
        }));
    };

    const createSession = (session) => {
        const newSession = {
            ...session,
            id: Date.now(),
            hostName: user.name,
            participants: [],
            status: 'open',
            createdAt: new Date().toISOString()
        };
        setSessions(prev => [...prev, newSession]);
        return newSession;
    };


    const joinSession = (sessionId) => {
        setSessions(prev => prev.map(session => {
            if(session.id === sessionId && !session.participants.includes(user.name)){
                return {
                    ...session,
                    participants: [...session.participants, user.name]
                };
            }
            return session;
        }));
    };

    const value = {
        user,
        setUser,
        sessions,
        addCourse,
        removeCourse,
        addAvailability,
        removeAvailability,
        createSession,
        joinSession
    };
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
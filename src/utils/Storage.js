export const Storage = {
    // saves data to localStorage with a key
    save: (key, data) => {
        try{
            localStorage.setItem(key, JSON.stringify(data)); // converts content to JSON string
        } catch (error) {
            console.error("Error saving to localStorage", error);
        }
    },
    load: (key, defaultValue = null) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue; // if data exists, parse JSON string to JS value
        } catch (error) {
            console.error("Error loading from localStorage", error);
            return defaultValue;
        }
    },
    clear: (key) => {
        try{
            localStorage.removeItem(key);
        }catch (error) {
            console.error("Error removing from localStorage", error);
        }
    }
};
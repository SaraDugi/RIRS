import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        return [];
    }
};

export const addUser = async (user) => {
    try {
        const response = await axios.post(API_URL, { user });
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
        return null;
    }
};
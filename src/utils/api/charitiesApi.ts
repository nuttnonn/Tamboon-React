import axios from 'axios';

export const fetchCharities = async () => {
    try {
        return await axios.get('/charities');
    } catch (error) {
        console.error('Error fetching charities:', error);
        throw error;
    }
};
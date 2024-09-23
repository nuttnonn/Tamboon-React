import axios from 'axios';
import { CrateCharityRequestData } from '../../types';

export const fetchCharities = async () => {
    try {
        return await axios.get('/charities');
    } catch (error) {
        console.error('Error fetching charities:', error);
        throw error;
    }
};

export const createCharity = async (requestData: CrateCharityRequestData) => {
    try {
        return await axios.post('/charities', requestData)
    } catch (error) {
        console.error('Error creating charity:', error)
        throw error;
    }
}
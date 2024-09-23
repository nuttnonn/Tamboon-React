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
};

export const editCharity = async (charityId: number, requestData: CrateCharityRequestData) => {
    try {
        return await axios.patch(`/charities/${charityId}`, requestData)
    } catch (error) {
        console.error('Error editing charity:', error)
        throw error;
    }
};

export const deleteCharity = async (charityId: number,) => {
    try {
        return await axios.delete(`/charities/${charityId}`)
    } catch (error) {
        console.error('Error deleting charity:', error)
        throw error;
    }
};
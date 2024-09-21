import axios from 'axios';

export const fetchPayments = async () => {
    try {
        return await axios.get('/payments');
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw error;
    }
};

export const makePayment = async (id: number, amount: number, currency: string) => {
    try {
        return await axios.post('/payments', {
            charitiesId: id,
            amount,
            currency,
        });
    } catch (error) {
        console.error('Error making payment:', error);
        throw error;
    }
};
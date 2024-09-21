import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { summaryDonations } from './utils/helpers';
import { RootState } from './types';
import { updateTotalDonate } from './redux/actions/donateActions';
import Card from './components/Card';
import Message from './components/Message';
import axios from 'axios';
import './configs/axiosConfig'

interface Charity {
    id: number;
    name: string;
    currency: string;
}

const App = () => {
    const dispatch = useDispatch();
    const donate = useSelector((state: RootState) => state.donate.donate);
    const message = useSelector((state: RootState) => state.message.message);

    const [charities, setCharities] = useState<Charity[]>([]);
    const [selectedAmount, setSelectedAmount] = useState<number>(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const charityResponse = await axios.get('/charities');
                setCharities(charityResponse.data);

                const paymentResponse = await axios.get('/payments');
                const totalDonation = summaryDonations(paymentResponse.data.map((item: { amount: number }) => item.amount));
                dispatch(updateTotalDonate(totalDonation));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleAmountChange = (amount: number) => {
        setSelectedAmount(amount);
    }

    const handlePay = (id: number, amount: number, currency: string) => {
        axios.post('/payments', {
            charitiesId: id,
            amount,
            currency,
        });
    };

    return (
        <div>
            <h1>Tamboon React</h1>
            <p>All donations: {donate}</p>
            <Message message={message} />
            {charities.map((charity) => (
                <Card
                    key={charity.id}
                    charity={charity}
                    selectedAmount={selectedAmount}
                    onAmountChange={handleAmountChange}
                    onPay={handlePay}
                />
            ))}
        </div>
    );
};

export default App;
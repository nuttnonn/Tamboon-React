import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { useSelector, useDispatch } from 'react-redux';
import { summaryDonations } from './utils/helpers';
import { RootState } from './types';
import { updateTotalDonate } from './redux/actions/donateActions';
import Card from './components/Card';
import Message from './components/Message';

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
            const charityResponse = await fetch('http://localhost:3001/charities');
            const charityData = await charityResponse.json();
            setCharities(charityData);

            const paymentResponse = await fetch('http://localhost:3001/payments');
            const paymentData = await paymentResponse.json();
            const totalDonation = summaryDonations(paymentData.map((item: { amount: number }) => item.amount));
            dispatch(updateTotalDonate(totalDonation));
        };

        fetchData();
    }, [dispatch]);

    const handleAmountChange = (amount: number) => {
        setSelectedAmount(amount);
    }

    const handlePay = (id: number, amount: number, currency: string) => {};

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
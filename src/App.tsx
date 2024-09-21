import React, { useState, useEffect, CSSProperties } from 'react';
import fetch from 'isomorphic-fetch';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { summaryDonations } from './utils/helpers';
import { RootState } from './types';
import { updateTotalDonate } from './redux/actions/donateActions';

const Card = styled.div`
    margin: 10px;
    border: 1px solid #ccc;
`;

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

    const handlePay = (id: number, amount: number, currency: string) => {};

    const cards = charities.map((item, i) => {
        const payments = [10, 20, 50, 100, 500].map((amount, j) => (
            <label key={j}>
                <input
                    type="radio"
                    name="payment"
                    onClick={() => setSelectedAmount(amount)}
                />
                {amount}
            </label>
        ));

        return (
            <Card key={i}>
                <p>{item.name}</p>
                {payments}
                <button onClick={() => handlePay(item.id, selectedAmount, item.currency)}>
                    Pay
                </button>
            </Card>
        );
    });

    const style: CSSProperties = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
    };

    return (
        <div>
            <h1>Tamboon React</h1>
            <p>All donations: {donate}</p>
            <p style={style}>{message}</p>
            {cards}
        </div>
    );
};

export default App;
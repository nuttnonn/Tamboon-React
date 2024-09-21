import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { summaryDonations } from './utils/helpers';
import { RootState } from './types';
import { updateTotalDonate } from './redux/actions/donateActions';
import Card from './components/Card';
import Message from './components/Message';
import './configs/axiosConfig'
import { fetchCharities } from './utils/api/charitiesApi';
import { fetchPayments, makePayment } from './utils/api/paymentApi';

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
                const charity = await fetchCharities();
                setCharities(charity.data);

                const payment = await fetchPayments();
                const totalDonation = summaryDonations(payment.data.map((item: { amount: number }) => item.amount));
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

    const handlePay = async (id: number, amount: number, currency: string) => {
        try {
            await makePayment(id, amount, currency);
        } catch (error) {
            console.error('Error making payment:', error);
        }
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
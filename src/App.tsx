import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { summaryDonations } from './utils/helpers';
import { Charity, RootState } from './types';
import {
    clearPaymentStatus,
    paymentFailure,
    paymentRequest,
    paymentSuccess,
    updateTotalDonate,
} from './redux/actions/donateActions';
import { updateMessage } from './redux/actions/messageActions';
import Card from './components/Card';
import './configs/axiosConfig'
import { fetchCharities } from './utils/api/charitiesApi';
import { fetchPayments, makePayment } from './utils/api/paymentApi';
import GlobalStyles from './styles/GlobalStyles';
import { CardContainer, Container } from './components/StyledContainer';

const App = () => {
    const dispatch = useDispatch();
    const donate = useSelector((state: RootState) => state.donate.donate);

    const [charities, setCharities] = useState<Charity[]>([]);

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

    const clearStatus = (id: number) => {
        setTimeout(() => {
            dispatch(clearPaymentStatus(id));
            dispatch(updateMessage(id, ''));
        }, 5000);
    }

    const handlePay = async (id: number, amount: number, currency: string) => {
        dispatch(paymentRequest());
        try {
            await makePayment(id, amount, currency);
            const payment = await fetchPayments();
            const totalDonation = summaryDonations(payment.data.map((item: { amount: number }) => item.amount));
            dispatch(updateTotalDonate(totalDonation));

            dispatch(updateMessage(id,`Successfully donated ${amount} ${currency}!`));
            dispatch(paymentSuccess(id));
            clearStatus(id);
        } catch (error) {
            console.error('Error making payment:', error);
            dispatch(paymentFailure(id));
            dispatch(updateMessage(id,'Payment failed. Please try again.'));
            clearStatus(id);
        }
    };

    return (
        <>
            <GlobalStyles />
            <Container>
                <h1>Omise Tamboon React</h1>
                <p>All donations: {donate}</p>
                <CardContainer>
                    {charities.map((charity) => (
                        <Card
                            key={charity.id}
                            charity={charity}
                            onPay={handlePay}
                        />
                    ))}
                </CardContainer>
            </Container>
        </>
    );
};

export default App;
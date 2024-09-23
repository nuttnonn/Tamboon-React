import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { summaryDonations, summaryDonationsByCharity } from './utils/helpers';
import { Charity, Payment } from './types';
import {
    clearPaymentStatus,
    paymentFailure,
    paymentRequest,
    paymentSuccess, updateCharityDonate,
    updateTotalDonate,
} from './redux/actions/donateActions';
import { updateMessage } from './redux/actions/messageActions';
import Card from './components/Card';
import './configs/axiosConfig'
import { fetchCharities } from './utils/api/charitiesApi';
import { fetchPayments, makePayment } from './utils/api/paymentApi';
import GlobalStyles from './styles/GlobalStyles';
import { CardContainer, Container, NotFoundContainer, SearchInput } from './components/StyledComponents';
import { SearchOutlined } from '@ant-design/icons';
import AllDonationAmount from './components/AllDonationAmount';
import { Empty } from 'antd';
import AddCharity from './components/AddCharity';

const App = () => {
    const dispatch = useDispatch();

    const [charities, setCharities] = useState<Charity[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchData = async () => {
        try {
            const [charityData, paymentData] = await Promise.all([
                fetchCharities(),
                fetchPayments(),
            ]);

            setCharities(charityData.data);
            setPayments(paymentData.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (charities.length && payments.length) {
            const totalDonation = summaryDonations(payments.map((item: { amount: number }) => item.amount));
            const totalCharityDonations = summaryDonationsByCharity(charities, payments);

            dispatch(updateTotalDonate(totalDonation));
            dispatch(updateCharityDonate(totalCharityDonations));
        }
    }, [charities, payments, dispatch]);

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

            const paymentData = await fetchPayments();
            setPayments(paymentData.data);

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const filteredCharities = charities.filter(charity =>
        charity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <GlobalStyles />
            <Container>
                <h1>Omise Tamboon React</h1>
                <SearchInput
                    placeholder="Search by charity name"
                    prefix={<SearchOutlined style={{ color: '#bfbfbf', marginBottom: '1px', marginRight: '4px' }} />}
                    allowClear={true}
                    onChange={handleSearch}
                />
                {filteredCharities.length ? (
                    <CardContainer>
                        {filteredCharities.map((charity) => (
                            <Card
                                key={charity.id}
                                charity={charity}
                                onPay={handlePay}
                            />
                        ))}
                        <AddCharity onCharityCreated={fetchData} />
                    </CardContainer>
                ) : (
                    <NotFoundContainer>
                        <Empty />
                    </NotFoundContainer>
                )}
                <AllDonationAmount />
            </Container>
        </>
    );
};

export default App;
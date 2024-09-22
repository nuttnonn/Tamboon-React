import React, { useState } from 'react';
import { Charity, RootState } from '../types';
import { Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearPaymentStatus } from '../redux/actions/donateActions';
import { updateMessage } from '../redux/actions/messageActions';
import { AmountContainer, CardWrapper, CloseButton, Image, MessageContainer, TitleContainer } from './StyledComponents';

interface CardProps {
    charity: Charity,
    onPay: (id: number, amount: number, currency: string) => void,
}

const Card: React.FC<CardProps> = ({ charity, onPay }) => {
    const { id, name, image, currency } = charity;

    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.donate.isLoading);
    const message = useSelector((state: RootState) => state.message.messages[id]);
    const isPaymentSuccess = useSelector((state: RootState) => state.donate.isPaymentSuccess[id]);

    const [selectedAmount, setSelectedAmount] = useState<number>(10);
    const [isSelectAmountOpened, setIsSelectAmountOpened] = useState<boolean>(false);

    const imageUrl = `/images/${image}`
    const donationAmounts: number[] = [10, 20, 50, 100, 500];

    const handleDonateButtonClick = () => {
        setIsSelectAmountOpened(true)
    }

    const handleCloseButtonClick = () => {
        setIsSelectAmountOpened(false)
    }

    const handleAmountChange = (amount: number) => {
        setSelectedAmount(amount);
    }

    const handlePayButtonClick = async () => {
        await onPay(id, selectedAmount, currency)
        setIsSelectAmountOpened(false);
    }

    const clearStatus = () => {
        dispatch(clearPaymentStatus(id));
        dispatch(updateMessage(id, ''));
        setIsSelectAmountOpened(false);
    }

    return (
        <CardWrapper>
            <Image src={imageUrl} alt={`${name}-image`} />
            <TitleContainer>
                <h2>{name}</h2>
                <Button
                    type="primary"
                    ghost
                    onClick={handleDonateButtonClick}
                    disabled={isLoading}
                >
                    Donate
                </Button>
            </TitleContainer>
            {(isSelectAmountOpened && !message) && (
                <AmountContainer>
                    <p>Select the amount to donate ({currency})</p>
                    <Radio.Group
                        options={donationAmounts}
                        onChange={(event) => handleAmountChange(event.target.value)}
                        value={selectedAmount}
                        optionType="button"
                        disabled={isLoading}
                    />
                    <CloseButton
                        onClick={handleCloseButtonClick}
                    />
                    <Button
                        type="primary"
                        ghost
                        onClick={handlePayButtonClick}
                        loading={isLoading}
                    >
                        Pay
                    </Button>
                </AmountContainer>
            )}
            {message && (
                <MessageContainer isSuccess={isPaymentSuccess}>
                    {message}
                    <Button
                        type="text"
                        onClick={clearStatus}
                    >
                        Continue
                    </Button>
                    <CloseButton onClick={clearStatus} />
                </MessageContainer>
            )}
        </CardWrapper>
    );
};

export default Card;
import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
    margin: 10px;
    border: 1px solid #ccc;
`;

interface Charity {
    id: number;
    name: string;
    currency: string;
}

interface CardProps {
    charity: Charity,
    selectedAmount: number,
    onAmountChange: (amount: number) => void,
    onPay: (id: number, amount: number, currency: string) => void,
}

const Card: React.FC<CardProps> = ({
    charity,
    selectedAmount,
    onAmountChange,
    onPay,
}) => {
    const donationAmounts: number[] = [10, 20, 50, 100, 500];

    return (
        <CardWrapper>
            <p>{charity.name}</p>
            {donationAmounts.map((amount, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="payment"
                        onClick={() => onAmountChange(amount)}
                    />
                    {amount}
                </label>
            ))}
            <button onClick={() => onPay(charity.id, selectedAmount, charity.currency)}>
                Pay
            </button>
        </CardWrapper>
    );
};

export default Card;
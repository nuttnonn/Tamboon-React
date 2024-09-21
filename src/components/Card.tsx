import React, { useState } from 'react';
import styled from 'styled-components';
import { Charity } from '../types';
import { Button, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const CardWrapper = styled.div`
    width: 100%;
    height: 340px;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0.1rem 0.1rem 0.8rem #b6b5b5;
    overflow: hidden;
    
    @media screen and (max-width: 440px) {
        height: 560px;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 78%;
    object-fit: cover;
    object-position: center;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 22%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
`;

const AmountContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.95);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
`;

const CloseButton = styled(CloseCircleOutlined)`
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    transition: color 200ms ease-in-out;

    &:hover {
        color: red;
        scale: 110%;
    }
`;

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
    const [isSelectAmountOpened, setIsSelectAmountOpened] = useState<boolean>(false);

    const { id, name, image, currency } = charity;
    const imageUrl = `/images/${image}`
    const donationAmounts: number[] = [10, 20, 50, 100, 500];

    const handleDonateButtonClick = () => {
        setIsSelectAmountOpened(true)
    }

    const handleCloseButtonClick = () => {
        setIsSelectAmountOpened(false)
    }

    const handleAmountChange = (amount: number) => {
        onAmountChange(amount)
    }

    const handlePayButtonClick = () => {
        onPay(id, selectedAmount, currency)
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
                >
                    Donate
                </Button>
            </TitleContainer>
            {isSelectAmountOpened && (
                <AmountContainer>
                    <p>Select the amount to donate ({currency})</p>
                    <Radio.Group
                        options={donationAmounts}
                        onChange={(event) => handleAmountChange(event.target.value)}
                        value={selectedAmount}
                        optionType="button"
                    />
                    <CloseButton
                        onClick={handleCloseButtonClick}
                    />
                    <Button
                        type="primary"
                        ghost
                        onClick={handlePayButtonClick}
                    >
                        Pay
                    </Button>
                </AmountContainer>
            )}
        </CardWrapper>
    );
};

export default Card;
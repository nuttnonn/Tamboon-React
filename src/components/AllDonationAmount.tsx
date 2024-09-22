import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Payment, RootState } from '../types';
import { DonationsDetailContainer, ExpandButton, FooterBar, FooterTitleContainer } from './StyledComponents';
import { hundredsDivider } from '../utils/helpers';
import { FaCheckCircle, FaChevronUp } from 'react-icons/fa';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const AllDonationAmount = () => {
    const donate = useSelector((state: RootState) => state.donate.donate);
    const charityDonations = useSelector((state: RootState) => state.donate.charityDonations);

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleExpand = () => {
        setIsOpened(prev => !prev);
    };

    const textColor: string = '#fee5db';

    const donationItems = Object.entries(charityDonations).map(([charityId, donation]) => ({
        key: charityId,
        label: (
            <span style={{ color: textColor }}>
                {donation.name}: (Total {hundredsDivider(donation.total)} THB)
            </span>
        ),
        children: (
            <ul style={{ listStyle: 'none', padding: '0 0 0 32px' }}>
                {donation.donations.map((payment: Payment, index: number) => (
                    <li key={index} style={{ color: textColor, display: 'flex', alignItems: 'center' }}>
                        <FaCheckCircle style={{ marginRight: '8px', color: textColor }} />
                        {hundredsDivider(payment.amount)} {payment.currency}
                    </li>
                ))}
            </ul>
        ),
        style: {
            marginBottom: 16,
        },
    }));

    return (
        <FooterBar expanded={isOpened}>
            <FooterTitleContainer>
                <p>Total all donations: {hundredsDivider(donate)} THB</p>
                <ExpandButton onClick={handleExpand}>
                    <FaChevronUp
                        style={{
                            fontSize: '1.75em',
                            color: textColor,
                            transform: isOpened ? 'rotate(-180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                </ExpandButton>
            </FooterTitleContainer>
            <DonationsDetailContainer>
                <h4><u>Donations Detail</u></h4>
                <Collapse
                    ghost
                    accordion
                    expandIcon={({ isActive }) => (
                        <CaretRightOutlined
                            rotate={isActive ? 90 : 0}
                            style={{ color: textColor }}
                        />
                    )}
                    style={{ padding: '20px 0' }}
                    items={donationItems}
                />
            </DonationsDetailContainer>
        </FooterBar>
    );
};

export default AllDonationAmount;
import React from 'react';
import styled from 'styled-components';

const DonateWrapper = styled.p`
    color: red;
    margin: 1em 0;
    font-weight: bold;
    font-size: 16px;
    text-align: 'center';
`;

interface MessageProps {
    message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <DonateWrapper>
            {message}
        </DonateWrapper>
    );
};

export default Message;
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { InputProps } from 'antd/lib/input';

const devices = {
    mobile: '440px',
    tablet: '768px',
    smallLaptop: '1024px',
    desktop: '1440px',
    largeDesktop: '1920px',
};

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 160px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: ${devices.tablet}) {
        padding: 0 14px 120px 14px;
    }

    @media screen and (max-width: ${devices.mobile}) {
        padding: 0 10px 90px 10px;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media screen and (max-width: ${devices.smallLaptop}) {
        gap: 1.25rem;
    }

    @media screen and (max-width: ${devices.tablet}) {
        grid-template-columns: 1fr;
    }

    @media screen and (max-width: ${devices.mobile}) {
        gap: 0.75rem;
    }
`;

export const CardWrapper = styled.div`
    width: 100%;
    height: 340px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0.1rem 0.1rem 0.8rem #b6b5b5;
    overflow: hidden;
    
    @media screen and (max-width: ${devices.mobile}) {
        height: 260px;
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 78%;
    object-fit: cover;
    object-position: center;
`;

export const TitleContainer = styled.div`
    width: 100%;
    height: 22%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;

    @media screen and (max-width: ${devices.mobile}) {
        padding: 0.5rem;
        
        h2 {
            font-size: 14px;
        };
    }
    
    div {
        display: flex;
        justify-content: end;
        align-items: center;
    };
`;

export const AmountContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    color: #1F76FF;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
`;

export const CloseButton = styled(CloseCircleOutlined)`
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

export const MessageContainer = styled.div<{ isSuccess: boolean | null }>`
    width: 100%;
    height: 100%;
    position: absolute;
    color: ${({ isSuccess }) => (isSuccess ? '#1F76FF' : '#FFF')};
    background-color: ${({ isSuccess }) => (isSuccess ? 'rgba(199, 255, 218, 0.8)' : 'rgba(255, 61, 93, 0.8)')};
    backdrop-filter: blur(2px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
`;

export const SearchInput = styled(Input)<InputProps>`
    width: 400px;
    padding: 4px 12px;
    font-size: 16px;
    margin-bottom: 1.5em;
    
    @media screen and (max-width: ${devices.mobile}) {
        width: 80%;
        margin-bottom: 0.75rem;
    }
`;

export const NotFoundContainer = styled.p`
    text-align: center;
    margin: 52px 0;
`;

export const FooterBar = styled.div<{ expanded: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${({ expanded }) => (expanded ? '80%' : '90px')};
    color: #fee5db;
    background-color: rgb(31, 118 , 255, 0.82);
    backdrop-filter: blur(4px);
    padding: 0 40px 40px 40px;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.25);
    z-index: 1000;
    transition: height 0.5s ease, padding 0.5s ease-in-out;
    
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    p {
        margin: 0;
        font-size: 22px;
        font-weight: 500;
    }

    @media screen and (max-width: ${devices.tablet}) {
        height: ${({ expanded }) => (expanded ? '80%' : '70px')};
    }
    
    @media screen and (max-width: ${devices.mobile}) {
        height: ${({ expanded }) => (expanded ? '90%' : '52px')};
        padding: 0 16px 16px 16px;
    }
`;

export const FooterTitleContainer = styled.div`
    width: 100%;
    margin: 33px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: ${devices.tablet}) {
        margin: 24px 0;
    }
    
    @media screen and (max-width: ${devices.mobile}) {
        margin: 14px 0;
        
        h3 {
            font-size: 14px;
        };
    }
`;

export const ExpandButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.25);
    }
`;

export const DonationsDetailContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    
    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
    
    h3 {
        font-size: 16px;
    }
    
    @media screen and (max-width: ${devices.mobile}) {
        h3 {
            font-size: 14px;
        }
    }
`;

export const CharityModal = styled(Modal)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const UploadImageContainer = styled.div`
    width: 100%;
    height: 280px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    
    @media screen and (max-width: ${devices.mobile}) {
        height: 200px;
    }
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
    
    div {
        position: absolute;
        right: 10px;
        top: 10px;
    }
`;

export const EditButton = styled(Button)`
    position: absolute;
    left: 10px;
    top: 10px;
`;

export const ModalFooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    div {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 0.5rem;
    }
`;
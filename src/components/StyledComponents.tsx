import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 160px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 440px) {
        padding: 40px;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const CardWrapper = styled.div`
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
    
    div {
        display: flex;
        justify-content: end;
        align-items: center;
    }
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
`;

export const FooterTitleContainer = styled.div`
    width: 100%;
    margin: 33px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    
    h4 {
        font-size: 16px;
    }
`;
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px 160px 20px;

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
`;

export const AmountContainer = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(255, 255, 255, 0.95);
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
    background-color: ${({ isSuccess }) => (isSuccess ? 'rgba(143,206,143,0.8)' : 'rgba(208,102,102,0.8)')};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    gap: 1.5rem;
    text-align: center;
`;

export const SearchInput = styled(Input)<InputProps>`
    width: 300px;
    padding: 4px 12px;
    font-size: 16px;
`;

export const NotFoundContainer = styled.p`
    text-align: center;
    margin: 52px 0;
`;
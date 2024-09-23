import React, { useEffect, useState } from 'react';
import { Charity, RootState } from '../types';
import { Button, Form, message, Modal, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearPaymentStatus } from '../redux/actions/donateActions';
import { updateMessage } from '../redux/actions/messageActions';
import {
    AmountContainer,
    CardWrapper,
    CharityModal,
    CloseButton, EditButton,
    Image,
    MessageContainer, ModalFooterContainer,
    TitleContainer,
} from './StyledComponents';
import { hundredsDivider } from '../utils/helpers';
import CharityForm from './CharityForm';
import { deleteCharity, editCharity } from '../utils/api/charitiesApi';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';

interface CardProps {
    charity: Charity,
    onPay: (id: number, amount: number, currency: string) => void,
    onCharityEdited: () => void;
}

const donationAmounts: number[] = [10, 20, 50, 100, 500];

const Card: React.FC<CardProps> = ({ charity, onPay, onCharityEdited }) => {
    const { id, name, image, currency } = charity;
    const charityDonations = useSelector((state: RootState) => state.donate.charityDonations);
    const [form] = Form.useForm<{ name: string; image: string; currency: string; }>();

    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.donate.isLoading);
    const donateMessage = useSelector((state: RootState) => state.message.messages[id]);
    const isPaymentSuccess = useSelector((state: RootState) => state.donate.isPaymentSuccess[id]);

    const [selectedAmount, setSelectedAmount] = useState<number>(10);
    const [isSelectAmountOpened, setIsSelectAmountOpened] = useState<boolean>(false);
    const [totalAmount, setTotalAmount] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        form.setFieldsValue({
            name: charity.name,
            image: charity.image,
            currency: charity.currency,
        });
    }, []);

    useEffect(() => {
        if (charityDonations && charityDonations[charity.id]) {
            setTotalAmount(hundredsDivider(charityDonations[charity.id].total));
        }
    }, [charityDonations]);

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

    const handleOk = async () => {
        try {
            const formData = await form.validateFields();
            await editCharity(charity.id, formData);
            message.success('Edit charity successfully');
            onCharityEdited();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.log('Validate Failed:', error);
            message.error('Failed to edit charity');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const removeCharity = async () => {
        try {
            await deleteCharity(charity.id);
            message.success('Charity removed successfully');
            onCharityEdited();
        } catch (error) {
            console.error('Failed to delete charity:', error);
            message.error('Failed to remove charity');
        }
    }

    const showConfirm = () => {
        Modal.confirm({
            title: 'Do you want to remove this charity?',
            icon: <ExclamationCircleFilled />,
            onOk () {
                removeCharity();
            },
            centered: true,
        });
    };

    return (
        <CardWrapper>
            <Image src={`/images/${image}`} alt={`${name}-image`} />
            <TitleContainer>
                <h2>{name} (Total {totalAmount} {currency})</h2>
                <Button
                    type="primary"
                    ghost
                    onClick={handleDonateButtonClick}
                    disabled={isLoading}
                >
                    Donate
                </Button>
            </TitleContainer>
            {(isSelectAmountOpened && !donateMessage) && (
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
            {donateMessage && (
                <MessageContainer isSuccess={isPaymentSuccess}>
                    {donateMessage}
                    <Button
                        type="text"
                        onClick={clearStatus}
                    >
                        Continue
                    </Button>
                    <CloseButton onClick={clearStatus} />
                </MessageContainer>
            )}
            <EditButton
                size="large"
                icon={<EditOutlined />}
                onClick={() => setIsModalOpen(true)}
            />
            <CharityModal
                title="Edit Charity Information"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                footer={(_, { OkBtn, CancelBtn }) => (
                    <ModalFooterContainer>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={showConfirm}
                        >
                            Remove Charity
                        </Button>
                        <div>
                            <CancelBtn />
                            <OkBtn />
                        </div>
                    </ModalFooterContainer>
                )}
            >
                <CharityForm form={form} formName={`${name}-form`} />
            </CharityModal>
        </CardWrapper>
    );
};

export default Card;
import React, { useState } from 'react';
import { CardWrapper, CharityModal } from './StyledComponents';
import CharityForm from './CharityForm';
import { createCharity } from '../utils/api/charitiesApi';
import { Button, Form, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

interface AddCharityProps {
    onCharityCreated: () => void;
}

const AddCharity: React.FC<AddCharityProps> = ({ onCharityCreated }) => {
    const [form] = Form.useForm<{ name: string; image: string; currency: string; }>();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleOk = async () => {
        try {
            const formData = await form.validateFields();
            await createCharity(formData);
            message.success('Create charity successfully');
            onCharityCreated();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.log('Validate Failed:', error);
            message.error('Failed to create charity');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false)
        form.resetFields();
    }

    return (
        <CardWrapper>
            <Button
                onClick={() => setIsModalOpen(true)}
                type="dashed"
                icon={<PlusCircleOutlined />}
            >
                Create new charity
            </Button>
            <CharityModal
                title="Create New Charity"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
            >
                <CharityForm form={form} formName="create-charity-form" />
            </CharityModal>
        </CardWrapper>
    );
};

export default AddCharity;
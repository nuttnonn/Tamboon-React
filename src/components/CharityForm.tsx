import React, { useRef } from 'react';
import { Button, Empty, Form, FormInstance, Input, Select, Typography } from 'antd';
import { UploadImageContainer } from './StyledComponents';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CharityFormProps {
    form: FormInstance;
    formName: string;
}

const currencyOptions = [
    { label: 'United States Dollar (USD)', value: 'USD' },
    { label: 'Euro (EUR)', value: 'EUR' },
    { label: 'Japanese Yen (JPY)', value: 'JPY' },
    { label: 'British Pound (GBP)', value: 'GBP' },
    { label: 'Thai Baht (THB)', value: 'THB' },
    { label: 'Australian Dollar (AUD)', value: 'AUD' },
    { label: 'Canadian Dollar (CAD)', value: 'CAD' },
];

const CharityForm: React.FC<CharityFormProps> = ({ form, formName }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageValues = Form.useWatch('image', form);

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            if ('click' in fileInputRef.current) {fileInputRef.current.click();}
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileName = file.name.toString();
            form.setFieldsValue({ ...form, image: fileName });
        }
    };

    const handleRemoveFile = () => {
        form.setFieldsValue({ ...form, image: null });
    }

    return (
        <Form
            form={form}
            name={formName}
            layout="vertical"
        >
            {imageValues ? (
                <UploadImageContainer>
                    <img src={`/images/${imageValues}`} alt="new-charity-image" />
                    <div>
                        <Button
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={handleRemoveFile}
                        />
                    </div>
                </UploadImageContainer>
            ) : (
                <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 60 }}
                    description={
                        <Typography.Text style={{ color: 'grey' }}>
                            No image selected.
                            <br/>
                            Please select an image ("/public/images").
                        </Typography.Text>
                    }
                >
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                    <Button
                        icon={<UploadOutlined />}
                        style={{ marginBottom: 10 }}
                        onClick={triggerFileInput}
                    >
                        Upload Image
                    </Button>
                </Empty>
            )}
            <Form.Item
                label="Image"
                name="image"
                rules={[{ required: true, message: 'Please input your username!' }]}
                style={{ marginTop: 16 }}
            >
                <Input disabled placeholder="Please only select an image from '/public/images' directory" />
            </Form.Item>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter charity name!' }]}
            >
                <Input placeholder="Charity name" />
            </Form.Item>
            <Form.Item
                label="Currency"
                name="currency"
                rules={[{ required: true, message: 'Please enter currency' }]}
            >
                <Select placeholder="Select a currency">
                    {currencyOptions.map((currency) => (
                        <Option key={currency.value} value={currency.value}>
                            {currency.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default CharityForm;
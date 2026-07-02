import { STATUS_ACTIVE } from '@constants';
import { statusCarOptions } from '@constants/masterData';
import useBasicForm from '@hooks/useBasicForm';
import useTranslate from '@hooks/useTranslate';
import { BaseForm, SelectField } from '@itz/react-cms-element';
import { commonMessage } from '@locales/intl';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import apiConfig from '@constants/apiConfig';
import { CopyOutlined } from '@ant-design/icons';
import { copyToClipboard } from '@itz/react-utils';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import useFetch from '@hooks/useFetch';
import DefaultAvatar from '@assets/images/avatar-default.png';
import { AppConstants, UploadFileTypes } from '@constants';
import { CropImageField } from '@itz/react-cms-element';
import TextArea from 'antd/es/input/TextArea';

const CarBrandForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;

    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusCarOptions, ['label']);
    const [logoUrl, setLogoUrl] = useState(null);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError) => {
        const formData = new FormData();
        formData.append('type', 'LOGO');
        formData.append('file', file);
        executeUpFile({
            data: formData,
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setLogoUrl(response.data.filePath);
                    setIsChangedFormValues(true);
                    showSuccessMessage('Upload file thành công !');
                }
            },
            onError: (error) => {
                if (error.code == 'ERROR-FILE-FORMAT-INVALID') {
                    showErrorMessage('File upload không hợp lệ !');
                }
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, logoUrl: logoUrl });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            status: isEditing ? dataDetail.status : STATUS_ACTIVE,
        });
        setLogoUrl(dataDetail?.logoUrl || dataDetail?.logo || dataDetail?.avatarPath);
    }, [dataDetail]);

    return (
        <BaseForm id={formId} form={form} onFinish={handleSubmit} layout="vertical" onValuesChange={onValuesChange}>
            <Card className="card-form" variant={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label={translate.formatMessage(commonMessage.avatar)}
                            name="logoUrl"
                            imageUrl={logoUrl ? `${AppConstants.logoUrl}${logoUrl}` : DefaultAvatar}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    {isEditing && (
                        <Col span={12}>
                            <Form.Item label={translate.formatMessage(commonMessage.carBrandId)} name="id">
                                <Space.Compact
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Input disabled={true} value={dataDetail?.id} />
                                    <Button
                                        icon={<CopyOutlined />}
                                        onClick={() => copyToClipboard(dataDetail?.id)}
                                        type="primary"
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderColor: 'gray',
                                            color: 'black',
                                        }}
                                    />
                                </Space.Compact>
                            </Form.Item>
                        </Col>
                    )}
                    <Col span={12}>
                        <Form.Item
                            label={translate.formatMessage(commonMessage.carBrandName)}
                            name="name"
                            required
                            placeholder={translate.formatMessage(commonMessage.carBrandName)}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <SelectField
                            required
                            disabled={!isEditing}
                            label={translate.formatMessage(commonMessage.status)}
                            name="status"
                            allowClear={false}
                            options={statusValues}
                        />
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label={translate.formatMessage(commonMessage.description)}
                            required
                            name="description"
                        >
                            <TextArea placeholder={translate.formatMessage(commonMessage.description)} rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default CarBrandForm;

import { STATUS_ACTIVE } from '@constants';
import { statusCarOptions } from '@constants/masterData';
import useBasicForm from '@hooks/useBasicForm';
import useTranslate from '@hooks/useTranslate';
import { BaseForm, SelectField } from '@itz/react-cms-element';
import { commonMessage } from '@locales/intl';
import { Card, Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';

const CarModelForm = (props) => {
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;

    const translate = useTranslate();
    const statusValues = translate.formatKeys(statusCarOptions, ['label']);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values });
    };

    useEffect(() => {
        form.setFieldsValue({
            ...dataDetail,
            status: isEditing ? dataDetail.status : STATUS_ACTIVE,
        });
    }, [dataDetail]);

    return (
        <BaseForm id={formId} form={form} onFinish={handleSubmit} layout="vertical" onValuesChange={onValuesChange}>
            <Card className="card-form" variant={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label={translate.formatMessage(commonMessage.carModelName)}
                            name="name"
                            required
                            placeholder={translate.formatMessage(commonMessage.carModelName)}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={translate.formatMessage(commonMessage.carModelNumber)}
                            name="seatCount"
                            required
                            placeholder={translate.formatMessage(commonMessage.carModelNumber)}
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
                </Row>
                <div className="footer-card-form">{actions}</div>
            </Card>
        </BaseForm>
    );
};

export default CarModelForm;

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { ADMIN_LOGIN_TYPE, appAccount, brandName, KIND_ADMIN, KIND_OWNER, KIND_STAFF, storageKeys } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import useTranslate from '@hooks/useTranslate';
import { setData } from '@itz/react-utils';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { setCacheAccessToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { Button, Form } from 'antd';
import Title from 'antd/es/typography/Title';
import { Buffer } from 'buffer';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import styles from './index.module.scss';
import { TextField } from '@itz/react-cms-element';
window.Buffer = window.Buffer || Buffer;
const message = defineMessages({
    copyRight: '{brandName} - © Copyright {year}. All Rights Reserved',
    loginFail: 'Sai tên đăng nhập hoặc mật khẩu !!!',
    loginNoAccess: 'Loại tài khoản không phù hợp!!!',
    username: 'Username',
    otp: 'OTP',
    password: 'Password',
    cancel: 'Hủy',
});

const LoginPage = () => {
    const [form] = Form.useForm();
    const intl = useIntl();
    const translate = useTranslate();
    const base64Credentials = Buffer.from(`${appAccount.APP_USERNAME}:${appAccount.APP_PASSWORD}`).toString('base64');

    const { execute, loading } = useFetch({
        ...apiConfig.auth.login,
        authorization: `Basic ${base64Credentials}`,
    });

    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });

    const onFinish = (values) => {
        execute({
            data: {
                ...values,
                grant_type: ADMIN_LOGIN_TYPE,
            },
            onCompleted: (res) => {
                const allowedKinds = [KIND_ADMIN, KIND_STAFF, KIND_OWNER];
                if (!allowedKinds.includes(Number(res?.user_kind))) {
                    showErrorMessage(translate.formatMessage(message.loginNoAccess));
                    form.setFieldsValue({
                        username: "",
                        password: "",
                    });
                    return;
                }

                handleLoginSuccess(res);
            },
            onError: (err) => {
                form.setFieldsValue({
                    username: "",
                    password: "",
                });
                showErrorMessage(translate.formatMessage(message.loginFail));
            },
        });
    };

    const handleLoginSuccess = (res) => {
        setCacheAccessToken(res?.access_token);
        setData(storageKeys.USER_KIND, res?.user_kind);
        executeGetProfile();
    };

    const checkUserName = (_, value) => {
        if (value) {
            const usernameRegex = /^[a-zA-Z0-9_]{2,20}$/;
            if (!usernameRegex.test(value)) {
                return Promise.reject('Username invalid !');
            }
        } else return Promise.reject('Username invalid !');

        return Promise.resolve();
    };
    const checkPassword = (_, value) => {
        if (value) {
            const passwordRegex = /^[A-Za-z\d!@#$%^&*()_+\-=]{6,}$/;
            if (!passwordRegex.test(value)) {
                return Promise.reject('Password invalid !');
            }
        } else return Promise.reject('Password invalid !');

        return Promise.resolve();
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <Title level={3}>{intl.formatMessage(commonMessage.login).toUpperCase()}</Title>
                <Form form={form} name="login-form" onFinish={onFinish} layout="vertical">
                    <TextField
                        name="username"
                        fieldProps={{ prefix: <UserOutlined /> }}
                        label={intl.formatMessage(message.username)}
                        placeholder={intl.formatMessage(commonMessage.username)}
                        size="large"
                        rules={[
                            {
                                required: true,
                                validator: checkUserName,
                            },
                        ]}
                    />
                    <TextField
                        name="password"
                        fieldProps={{ prefix: <LockOutlined /> }}
                        label={intl.formatMessage(message.password)}
                        placeholder={intl.formatMessage(commonMessage.password)}
                        size="large"
                        type="password"
                        rules={[
                            {
                                required: true,
                                validator: checkPassword,
                            },
                        ]}
                    />
                    <Button
                        type="primary"
                        size="large"
                        loading={loading}
                        htmlType="submit"
                        style={{ width: '100%' }}
                    >
                        {intl.formatMessage(commonMessage.login)}
                    </Button>
                    <center className="s-mt4px">
                        <small>
                            {intl.formatMessage(message.copyRight, { brandName, year: new Date().getFullYear() })}
                        </small>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;

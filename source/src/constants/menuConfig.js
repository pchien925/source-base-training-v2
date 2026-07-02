import { UsergroupAddOutlined, CarOutlined } from '@ant-design/icons';
import routes from '@routes';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import apiConfig from './apiConfig';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý người dùng" />,
        key: 'user-management',
        icon: <UsergroupAddOutlined />,
        permission: [apiConfig.account.getList.permissionCode],
        children: [
            {
                label: <FormattedMessage defaultMessage="Nhân viên" />,
                key: 'staff',
                path: routes.staffListPage.path,
                permission: [apiConfig.account.getList.permissionCode],
            },
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý hãng xe" />,
        key: 'car-brand-management',
        icon: <CarOutlined />,
        permission: [apiConfig.carBrand.getList.permissionCode],
        children: [
            {
                label: <FormattedMessage defaultMessage="Hãng xe" />,
                key: 'car-brand',
                path: routes.carBrandListPage.path,
                permission: [apiConfig.carBrand.getList.permissionCode],
            },
        ],
    },
];

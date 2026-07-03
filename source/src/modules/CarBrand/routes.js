import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import CarBrandListPage from '.';
import CarBrandSavePage from './CarBrandSavePage';
import CarModelListPage from './Model';
import CarModelSavePage from './Model/CarModelSavePage';

const paths = {
    carBrandListPage: '/car-brand',
    carBrandSavePage: '/car-brand/:id',
    carModelListPage: '/car-brand/:brandId/car-model',
    carModelSavePage: '/car-brand/:brandId/car-model/:id',
};

export default {
    carBrandListPage: {
        path: paths.carBrandListPage,
        auth: true,
        permission: [apiConfig.carBrand.getList.permissionCode],
        component: CarBrandListPage,
        pageOptions: {
            objectName: commonMessage.carBrand,
            renderBreadcrumb: (messages, t, title = {}) => {
                return [
                    {
                        breadcrumbName: t.formatMessage(messages.carBrand),
                    },
                ];
            },
        },
    },
    carBrandSavePage: {
        path: paths.carBrandSavePage,
        auth: true,
        permission: [apiConfig.carBrand.create.permissionCode, apiConfig.carBrand.update.permissionCode],
        component: CarBrandSavePage,
        separateCheck: true,
        pageOptions: {
            getListUrl: paths.carBrandListPage,
            objectName: commonMessage.carBrand,
            renderBreadcrumb: (messages, t, title = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.carBrand), path: paths.carBrandListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
    carModelListPage: {
        path: paths.carModelListPage,
        auth: true,
        permission: [apiConfig.carModel.getList.permissionCode],
        component: CarModelListPage,
        pageOptions: {
            objectName: commonMessage.carModel,
            renderBreadcrumb: (messages, t, title, option = {}) => {
                const carBrandName = option.carBrandName;
                return [
                    {
                        breadcrumbName: t.formatMessage(messages.carBrand),
                        path: paths.carBrandListPage,
                    },
                    {
                        breadcrumbName: carBrandName,
                    },
                ];
            },
        },
    },
    carModelSavePage: {
        path: paths.carModelSavePage,
        auth: true,
        permission: [apiConfig.carModel.create.permissionCode, apiConfig.carModel.update.permissionCode],
        component: CarModelSavePage,
        pageOptions: {
            getListUrl: paths.carModelListPage,
            objectName: commonMessage.carModel,
            renderBreadcrumb: (messages, t, title, option = {}) => {
                const carBrandName = option.carBrandName;
                return [
                    { breadcrumbName: t.formatMessage(messages.carBrand), path: paths.carBrandListPage },
                    { breadcrumbName: carBrandName, path: paths.carModelListPage.replace(':brandId', option.brandId) + `?carBrandName=${carBrandName}` },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};

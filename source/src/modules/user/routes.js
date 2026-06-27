import { KIND_STAFF } from '@constants';
import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import StaffListPage from '.';
import UserAdminSavePage from './UserAdminSavePage';

const paths = {
    staffsListPage: '/staffs',
    staffsSavePage: '/staffs/:id',
};

export default {
    staffListPage: {
        path: paths.staffsListPage,
        auth: true,
        component: StaffListPage,
        permission: [apiConfig.user.getList.permissionCode],
        pageOptions: {
            objectName: commonMessage.user,
            kind: KIND_STAFF,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.user) }];
            },
        },
    },
    staffSavePage: {
        path: paths.staffsSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.permissionCode, apiConfig.user.update.permissionCode],
        pageOptions: {
            objectName: commonMessage.user,
            listPageUrl: paths.staffsListPage,
            kind: KIND_STAFF,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.user), path: paths.staffsListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
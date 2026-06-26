import { KIND_STAFF } from '@constants';
import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import UserAdminListPage from '.';
import UserAdminSavePage from './UserAdminSavePage';
const paths = {
    adminsListPage: '/admins',
    adminsSavePage: '/admins/:id',
};
export default {
    adminListPage: {
        path: paths.adminsListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.user.getList.permissionCode],
        pageOptions: {
            objectName: commonMessage.user,
            kind: KIND_STAFF,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.user) }];
            },
        },
    },
    adminSavePage: {
        path: paths.adminsSavePage,
        component: UserAdminSavePage,
        separateCheck: true,
        auth: true,
        permission: [apiConfig.user.create.permissionCode, apiConfig.user.update.permissionCode],
        pageOptions: {
            objectName: commonMessage.user,
            listPageUrl: paths.adminsListPage,
            kind: KIND_STAFF,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.user), path: paths.adminsListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};

import { useSelector } from 'react-redux';

import { UserTypes } from '@constants';
import accountSelectors from '@selectors/account';
import { getCacheAccessToken, removeCacheToken } from '@services/userService';
import { accountActions } from '@store/actions';
import { useCallback } from 'react';
import useActionLoading from './useActionLoading';
import useFetchAction from './useFetchAction';

const useAuth = () => {
    const profile = useSelector(accountSelectors.selectProfile);
    const token = getCacheAccessToken();
    const immediate = !!token && !profile;

    useFetchAction(
        accountActions.getProfile,
        { immediate },
        {
            onError: (err) => {
                if (err?.response?.data?.result === false) {
                    const errCode = err?.response?.data?.code;
                    if (errCode === 'ERROR-USER-0000') {
                        removeCacheToken();
                    }
                }
            },
        },
    );

    const { loading } = useActionLoading(accountActions.getProfile.type);

    const permissions = profile?.role?.permissions?.map((permission) => permission.action);
    // console.log('permission',permissions);

    const permissionCodes = (profile?.permissions || profile?.role?.permissions)?.map((permission) => {
        return typeof permission === 'object' ? permission.pcode : permission;
    });
    // console.log('PC',profile);

    const kind = profile?.kind;
    const isSuperAdmin = profile?.isSuperAdmin;
    const isAdmin = useCallback(() => {
        if (kind === UserTypes.ADMIN) return true;
        return false;
    }, [kind]);

    const isStaff = useCallback(() => {
        if (kind === UserTypes.STAFF) return true;
        return false;
    }, [kind]);

    const isOwner = useCallback(() => {
        if (kind === UserTypes.OWNER) return true;
        return false;
    }, [kind]);

    return {
        isAdmin,
        isStaff,
        isOwner,
        isAuthenticated: !!profile,
        profile,
        kind,
        permissions,
        permissionCodes,
        token,
        loading: immediate || loading,
        isSuperAdmin,
    };
};

export default useAuth;

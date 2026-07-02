import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { PageWrapper } from '@itz/react-cms-element';
import React from 'react';
import { useParams } from 'react-router-dom';
import CarBrandForm from './CarBrandForm';

const CarBrandSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.carBrand.getById,
            create: apiConfig.carBrand.create,
            update: apiConfig.carBrand.update,
        },
        options: {
            getListUrl: pageOptions.getListUrl,
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    logoUrl: data.logoUrl,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    logoUrl: data.logoUrl,
                };
            };
            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
            funcs.handleShowErrorMessage = (err, showErrorMessage) => {
                if (err?.response?.data?.result === false) {
                    if (err.response.data.code === 'ERROR-CAR-BRAND-EXISTED') {
                        showErrorMessage('Tên hãng xe đã tồn tại', translate);
                    } else {
                        showErrorMessage(err.response.data.message);
                    }
                }
            };
        },
    });
    return (
        <PageWrapper loading={loading} routes={pageOptions.renderBreadcrumb(commonMessage, translate, title)}>
            <CarBrandForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default CarBrandSavePage;

import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { PageWrapper } from '@itz/react-cms-element';
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CarModelForm from './CarModelForm';

const CarModelSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id, brandId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carBrandName = searchParams.get('carBrandName') || '';

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.carModel.getById,
            create: apiConfig.carModel.create,
            update: apiConfig.carModel.update,
        },
        options: {
            getListUrl: pageOptions.getListUrl.replace(':brandId', brandId),
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
        override: (funcs) => {
            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    brandId: brandId,
                };
            };
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    brandId: brandId,
                };
            };
            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };
            funcs.handleShowErrorMessage = (err, showErrorMessage) => {
                if (err?.response?.data?.result === false) {
                    if (err.response.data.code === 'ERROR-CAR-MODEL-EXISTED') {
                        showErrorMessage('Tên model xe đã tồn tại', translate);
                    } else {
                        showErrorMessage(err.response.data.message);
                    }
                }
            };
        },
    });
    return (
        <PageWrapper loading={loading} routes={pageOptions.renderBreadcrumb(commonMessage, translate, title, { carBrandName, brandId })}>
            <CarModelForm
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

export default CarModelSavePage;

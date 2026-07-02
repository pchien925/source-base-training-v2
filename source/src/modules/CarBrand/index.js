import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import React from 'react';
import apiConfig from '@constants/apiConfig';
import { useNavigate } from 'react-router-dom';
import { AppConstants, DEFAULT_FORMAT, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import { AvatarField, BaseTable, BaseTooltip, ListPage, PageWrapper } from '@itz/react-cms-element';
import routes from './routes';
import { commonMessage } from '@locales/intl';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { orderNumber } from '@itz/react-utils';
import dayjs from 'dayjs';

const CarBrandListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const navigate = useNavigate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.carBrand,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(pageOptions.objectName)?.toLowerCase(),
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };

            funcs.additionalActionColumnButtons = () => ({
                model: (record) => {
                    const hasPerm = funcs.hasPermission([apiConfig.carModel.getList.permissionCode]);
                    return (
                        <BaseTooltip title="Xem model xe">
                            <Button
                                type="link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                        `${routes.carModelListPage.path.replace(':brandId', record.id)}?carBrandName=${record.name}`,
                                    );
                                }}
                                disabled={!hasPerm}
                                style={{ padding: 0 }}
                            ></Button>
                        </BaseTooltip>
                    );
                },
                deleteCarBrand: (record) => {
                    const hasPerm = funcs.hasPermission([apiConfig.carBrand.delete.permissionCode]);
                    return (
                        <BaseTooltip type="delete" objectName={translate.formatMessage(commonMessage.carBrand)}>
                            <Button
                                type="link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    mixinFuncs.showDeleteItemConfirm(record.id);
                                }}
                                disabled={!hasPerm}
                                style={{ padding: 0 }}
                            >
                                <DeleteOutlined style={{ color: !hasPerm ? 'gray' : 'red' }} />
                            </Button>
                        </BaseTooltip>
                    );
                },
                editcarBrand: (dataRow) => {
                    const hasPerm = funcs.hasPermission([apiConfig.carBrand.update.permissionCode]);
                    return (
                        <BaseTooltip>
                            <Button
                                type="link"
                                style={{ padding: 0, verticalAlign: 'middle', marginBottom: '7px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(mixinFuncs.getItemDetailLink(dataRow), {
                                        state: { action: 'edit', prevPath: location.pathname },
                                    });
                                }}
                                disabled={!hasPerm}
                            >
                                <EditOutlined style={{ color: !hasPerm ? '#ccc' : 'blue' }} />
                            </Button>
                        </BaseTooltip>
                    );
                },
            });
        },
    });

    const columns = [
        {
            title: '#',
            dataIndex: 'logoUrl',
            align: 'center',
            render: (logoUrl) => {
                return <AvatarField size="large" src={logoUrl ? `${AppConstants.logoUrl}${logoUrl}` : null} />;
            },
            width: 70,
        },
        {
            title: translate.formatMessage(commonMessage.carBrandName),
            dataIndex: 'name',
            render: (name, record) => {
                const hasPerm = mixinFuncs.hasPermission([apiConfig.carModel.getList.permissionCode]);
                return hasPerm ? (
                    <BaseTooltip>
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                    `${routes.carModelListPage.path.replace(':brandId', record.id)}?carBrandName=${record?.name}`,
                                );
                            }}
                        >
                            {name}
                        </Button>
                    </BaseTooltip>
                ) : (
                    <span style={{ display: 'inline-block' }}>{name}</span>
                );
            },
        },
        mixinFuncs.renderStatusColumn({ width: 100 }),
        mixinFuncs.renderActionColumn(
            {
                // model: true
                editcarBrand: true,
                deleteCarBrand: true,
            },
            { width: 120 },
        ),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.carBrandName),
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumb(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                        locale={{ emptyText: <Empty description={translate.formatMessage(commonMessage.noData)} /> }}
                    />
                }
            />
        </PageWrapper>
    );
};

export default CarBrandListPage;

import useListBase from '@hooks/useListBase';
import useTranslate from '@hooks/useTranslate';
import React from 'react';
import apiConfig from '@constants/apiConfig';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import { BaseTable, BaseTooltip, ListPage, PageWrapper } from '@itz/react-cms-element';
import routes from '../routes';
import { commonMessage } from '@locales/intl';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';

const CarModelListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const location = useLocation();
    const { brandId } = useParams();
    const searchParams = new URLSearchParams(location.search);
    const carBrandName = searchParams.get('carBrandName') || '';

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.carModel,
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

            funcs.getList = () => {
                const params = mixinFuncs.prepareGetListParams(queryFilter);
                mixinFuncs.handleFetchList({ ...params, brandId });
            };
            const changeFilter = funcs.changeFilter;
            funcs.changeFilter = (filter) => {
                changeFilter({ ...filter, brandId });
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
                deleteCarModel: (record) => {
                    const hasPerm = funcs.hasPermission([apiConfig.carModel.delete.permissionCode]);
                    return (
                        <BaseTooltip type="delete" objectName={translate.formatMessage(commonMessage.carModel)}>
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
                editcarModel: (dataRow) => {
                    const hasPerm = funcs.hasPermission([apiConfig.carModel.update.permissionCode]);
                    return (
                        <BaseTooltip>
                            <Button
                                type="link"
                                style={{ padding: 0, verticalAlign: 'middle', marginBottom: '7px' }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(mixinFuncs.getItemDetailLink(dataRow) + `?carBrandName=${carBrandName}`, {
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
            dataIndex: 'index',
            key: 'index',
            render: (_,__,index) => {
                return pagination.pageSize * (pagination.current - 1) + index + 1;
            },
            width: 70,
        },
        {
            title: translate.formatMessage(commonMessage.carModelName),
            dataIndex: 'name',
        },
        {
            title: translate.formatMessage(commonMessage.carModelNumber),
            align: 'center',
            dataIndex: 'seatCount',
            width: 150,
        },
        mixinFuncs.renderStatusColumn({ width: 100 }),
        mixinFuncs.renderActionColumn(
            {
                // model: true
                editcarModel: true,
                deleteCarModel: true,
            },
            { width: 120 },
        ),
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: translate.formatMessage(commonMessage.carModelName),
        },
        {
            key: 'seatNumber',
            placeholder: translate.formatMessage(commonMessage.carModelNumber),
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumb(commonMessage, translate, null, { carBrandName })}>
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

export default CarModelListPage;

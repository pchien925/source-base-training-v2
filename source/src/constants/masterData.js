import {
    DATE_DISPLAY_FORMAT,
    DATE_FORMAT_BASIC,
    DATE_FORMAT_VALUE,
    DATE_SHORT_MONTH_FORMAT,
    DEFAULT_FORMAT,
    DEFAULT_FORMAT_BASIC,
    DEFAULT_FORMAT_ZERO,
    DEFAULT_FORMAT_ZERO_SECOND,
    DISTRICT_KIND,
    PROVINCE_KIND,
    ROLE_KIND_ADMIN,
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_PENDING,
    VILLAGE_KIND,
} from '@constants';
import { defineMessages } from 'react-intl';
import { nationKindMessage } from './intl';

const commonMessage = defineMessages({
    statusActive: 'Hoạt động',
    statusLock: 'Khóa',
    statusPending: 'Đang chờ',
    statusInactive: 'Không hoạt động',
    statusDelete: 'Đã xóa',
    income: 'Thu',
    expenditure: 'Chi',
    superAdmin: 'Super Admin',
    admin: 'Admin',
    customer: 'Customer',
    member: 'Member',
    user: 'User',
});

const deviceMessage = defineMessages({
    pi: 'Pi',
    kitplay: 'Kitplay',
    orderDisplay: 'Order display',
    restaurant: 'Restaurant',
});

export const languageOptions = [
    { value: 1, label: 'EN' },
    { value: 2, label: 'VN' },
    { value: 3, label: 'Other' },
];

export const orderOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
];

export const kindOption = [
    { value: 1, label: 'ADMIN' },
    { value: 2, label: 'MODERATOR' },
    { value: 3, label: 'STUDENT' },
    // { value: 4, label: 'INTERNAL' },
    // { value: 5, label: 'COMPANY ' },
];

export const commonStatus = [
    { value: STATUS_ACTIVE, label: 'Active', color: 'green' },
    { value: STATUS_PENDING, label: 'Pending', color: 'warning' },
    { value: STATUS_INACTIVE, label: 'Inactive', color: 'red' },
];

export const statusOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_PENDING, label: commonMessage.statusPending, color: '#FFBF00' },
    { value: STATUS_INACTIVE, label: commonMessage.statusInactive, color: '#CC0000' },
];

export const statusUserOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_INACTIVE, label: commonMessage.statusLock, color: '#CC0000' },
];

export const statusCarOptions = [
    { value: STATUS_ACTIVE, label: commonMessage.statusActive, color: '#00A648' },
    { value: STATUS_INACTIVE, label: commonMessage.statusLock, color: '#CC0000' },
];

export const formSize = {
    small: '700px',
    normal: '800px',
    big: '900px',
    bigXl: '1200px',
    full: '70vw',
};

export const nationKindOptions = [
    {
        value: PROVINCE_KIND,
        label: nationKindMessage.province,
    },
    {
        value: DISTRICT_KIND,
        label: nationKindMessage.district,
    },
    {
        value: VILLAGE_KIND,
        label: nationKindMessage.village,
    },
];

export const settingGroups = {
    GENERAL: 'general',
    PAGE: 'page_config',
    REVENUE: 'revenue_config',
    TRAINING: 'training_config',
    BBB: 'bbb_config',
};

export const dataTypeSetting = {
    INT: 'int',
    STRING: 'string',
    BOOLEAN: 'boolean',
    DOUBLE: 'double',
    RICHTEXT: 'richtext',
    DATE: 'date',
    SELECT: 'select',
    UPLOAD: 'upload',
};

export const settingKeyName = {
    MONEY_UNIT: 'money_unit',
    DATE_UNIT: 'date_format',
    DATE_TIME_UNIT: 'date_time_format',
    DECIMAL_SEPARATOR: 'decimal_separator',
    GROUP_SEPARATOR: 'group_separator',
};

export const dateTimeOptions = [
    { value: DEFAULT_FORMAT_BASIC, label: DEFAULT_FORMAT_BASIC },
    { value: DATE_DISPLAY_FORMAT, label: DATE_DISPLAY_FORMAT },
    { value: DEFAULT_FORMAT, label: DEFAULT_FORMAT },
    { value: DEFAULT_FORMAT_ZERO_SECOND, label: DEFAULT_FORMAT_ZERO_SECOND },
    { value: DEFAULT_FORMAT_ZERO, label: DEFAULT_FORMAT_ZERO },
];

export const dateOptions = [
    { value: DATE_FORMAT_BASIC, label: DATE_FORMAT_BASIC },
    { value: DATE_FORMAT_VALUE, label: DATE_FORMAT_VALUE },
    { value: DATE_SHORT_MONTH_FORMAT, label: DATE_SHORT_MONTH_FORMAT },
];

export const daysTimeLabel = [{ label: commonMessage.morning }, { label: commonMessage.afternoon }];

export const dayOfWeek = defineMessages({
    monday: 'Thứ 2',
    tuesday: 'Thứ 3',
    wednesday: 'Thứ 4',
    thursday: 'Thứ 5',
    friday: 'Thứ 6',
    saturday: 'Thứ 7',
    sunday: 'Chủ nhật',
});

export const groupPermissionKinds = [
    {
        value: ROLE_KIND_ADMIN,
        label: commonMessage.admin,
    },
];

export const daysOfWeekSchedule = [
    { value: 'monday', label: dayOfWeek.monday },
    { value: 'tuesday', label: dayOfWeek.tuesday },
    { value: 'wednesday', label: dayOfWeek.wednesday },
    { value: 'thursday', label: dayOfWeek.thursday },
    { value: 'friday', label: dayOfWeek.friday },
    { value: 'saturday', label: dayOfWeek.saturday },
    { value: 'sunday', label: dayOfWeek.sunday },
];

export const settingKeysOptions = {
    ALLOW_ANONYMOUS: 'allowAnonymous',
};

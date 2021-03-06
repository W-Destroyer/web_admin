/// <reference types="react" />
import React from 'react';
import moment from 'moment';
import { TimePickerProps } from '../time-picker';
export interface PickerProps {
    prefixCls?: string;
    inputPrefixCls?: string;
    format?: string;
    disabled?: boolean;
    allowClear?: boolean;
    style?: React.CSSProperties;
    popupStyle?: React.CSSProperties;
    locale?: any;
    size?: 'large' | 'small' | 'default';
    getCalendarContainer?: (trigger: any) => React.ReactNode;
    open?: boolean;
    onOpenChange?: (status: boolean) => void;
    disabledDate?: (current: moment.Moment) => boolean;
}
export interface SinglePickerProps {
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    defaultPickerValue?: moment.Moment;
    onChange?: (date: moment.Moment, dateString: string) => void;
}
export interface DatePickerProps extends PickerProps, SinglePickerProps {
    showTime?: TimePickerProps | boolean;
    showToday?: boolean;
    open?: boolean;
    toggleOpen?: (e: {
        open: boolean;
    }) => void;
    disabledTime?: (current: moment.Moment) => {
        disabledHours?: () => [number, number];
        disabledMinutes?: () => [number, number];
        disabledSeconds?: () => [number, number];
    };
    onOpenChange?: (status: boolean) => void;
    placeholder?: string;
}
export interface MonthPickerProps extends PickerProps, SinglePickerProps {
    placeholder?: string;
}
export interface RangePickerProps extends PickerProps {
    value?: [moment.Moment, moment.Moment];
    defaultValue?: [moment.Moment, moment.Moment];
    defaultPickerValue?: [moment.Moment, moment.Moment];
    onChange?: (dates: [moment.Moment, moment.Moment], dateStrings: [string, string]) => void;
    showTime?: TimePickerProps | boolean;
    ranges?: {
        [range: string]: moment.Moment[];
    };
    placeholder?: [string, string];
    disabledTime?: (current: moment.Moment, type: string) => {
        disabledHours?: () => [number, number];
        disabledMinutes?: () => [number, number];
        disabledSeconds?: () => [number, number];
    };
}
export interface DatePickerDecorator extends React.ClassicComponentClass<DatePickerProps> {
    RangePicker: React.ClassicComponentClass<RangePickerProps>;
    MonthPicker: React.ClassicComponentClass<MonthPickerProps>;
}
declare var _default: DatePickerDecorator;
export default _default;

import React from 'react';
interface ActivityData {
    date: string;
    count: number;
    level: number;
}
interface CustomActivityCalendarProps {
    data: ActivityData[];
    size: 'small' | 'medium' | 'large' | 'xl' | {
        width: number;
        height: number;
    };
    labels: {
        months: string[];
        weekdays: string[];
        totalCount: string;
        legend: {
            less: string;
            more: string;
        };
    };
    colors: {
        noActivity: string;
        activity: string[];
        text: string;
        legend: string;
        totalCount: string;
    };
}
declare const CustomActivityCalendar: React.FC<CustomActivityCalendarProps>;
export default CustomActivityCalendar;

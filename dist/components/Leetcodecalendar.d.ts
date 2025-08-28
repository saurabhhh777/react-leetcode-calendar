type LeetcodecalendarProps = {
    username: string;
    graph?: string;
    showTitle?: boolean;
    size?: 'small' | 'medium' | 'large' | 'xl' | {
        width: number;
        height: number;
    };
    startDate?: string;
    ui?: 'default' | 'purple-cyan' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'candy' | 'matrix' | 'masculine' | 'deep-forest';
    colors?: {
        noActivity?: string;
        activity?: string[];
        text?: string;
        title?: string;
        months?: string;
        weekdays?: string;
        totalCount?: string;
        legend?: string;
        background?: string;
        calendarBackground?: string;
        border?: string;
        hover?: string;
        loading?: string;
        error?: string;
        noData?: string;
    };
    labels?: {
        months?: string[];
        weekdays?: string[];
        totalCount?: string;
        legend?: {
            less?: string;
            more?: string;
        };
    };
};
declare const Leetcodecalendar: (props: LeetcodecalendarProps) => import("react/jsx-runtime").JSX.Element;
export default Leetcodecalendar;

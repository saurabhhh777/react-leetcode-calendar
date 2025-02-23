'use strict';

var jsxRuntime = require('react/jsx-runtime');
var reactQuery = require('@tanstack/react-query');
var axios = require('axios');
var react = require('react');
var ActivityCalendar = require('react-activity-calendar');

const queryClient = new reactQuery.QueryClient();
const LeetcodecalendarComponent = ({ username, graph = "default" }) => {
    react.useEffect(() => {
        console.log("Graph prop received:", graph);
    }, [graph]);
    const { data = [], isLoading, isError, error } = reactQuery.useQuery({
        queryKey: ["leetcodeData", username, graph],
        queryFn: () => handlegetdata(username, graph),
        staleTime: 0,
        refetchOnMount: true,
    });
    const getTotalSubmissions = (leetdata) => {
        return leetdata.reduce((total, data) => total + data.count, 0);
    };
    const generateInitialYearData = (startDate, endDate) => {
        const currentDate = new Date(startDate);
        const end = new Date(endDate);
        const result = [];
        while (currentDate <= end) {
            result.push({
                date: currentDate.toISOString().split("T")[0],
                count: 0,
                level: 0,
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return result;
    };
    const filteredData = graph === "yearly"
        ? (() => {
            const today = new Date();
            const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));
            const startDate = lastYear.toISOString().split("T")[0];
            const endDate = new Date(lastYear.setFullYear(lastYear.getFullYear() + 1) - 1)
                .toISOString()
                .split("T")[0];
            const initialYearData = generateInitialYearData(startDate, endDate);
            return initialYearData.map((item) => {
                const matchingApiData = data.find((apiData) => apiData.date === item.date);
                return matchingApiData
                    ? {
                        ...item,
                        count: matchingApiData.count,
                        level: matchingApiData.level,
                    }
                    : item;
            });
        })()
        : data;
    if (isLoading)
        return jsxRuntime.jsx("div", { children: "Loading..." });
    if (isError)
        return jsxRuntime.jsxs("div", { children: ["Error: ", error?.message] });
    return (jsxRuntime.jsx("div", { className: "bg-[#101828] text-white p-4", children: jsxRuntime.jsxs("div", { className: "flex flex-col items-center", children: [jsxRuntime.jsx("h2", { className: "text-lg font-semibold mb-2", children: graph === "yearly" ? "Last Year's LeetCode Submissions" : "LeetCode Submissions" }), filteredData.length > 0 ? (jsxRuntime.jsx(ActivityCalendar, { data: filteredData, labels: {
                        months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                        totalCount: `Total submissions: ${getTotalSubmissions(filteredData)}`,
                        legend: {
                            less: "Few submissions",
                            more: "Many submissions",
                        },
                    }, theme: {
                        light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
                        dark: ["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"],
                    } })) : (jsxRuntime.jsx("p", { children: "No data available for the given username." }))] }) }));
};
// Fetch LeetCode data using axios (Fixed the TypeScript error)
const handlegetdata = async (username, graph) => {
    if (!username || username === "string") {
        console.log("Invalid username or missing username");
        return [];
    }
    console.log(graph);
    try {
        const res = await axios.get(`https://leetcode-sub-endpoint.vercel.app/leetcode/${username}`);
        if (!res.data || typeof res.data !== "object") {
            console.error("Unexpected response format:", res.data);
            return [];
        }
        // Ensure TypeScript correctly understands res.data as an object with string keys and number values
        const submissionCalendar = res.data;
        const formattedData = Object.entries(submissionCalendar).map(([date, submission]) => ({
            date,
            count: submission,
            level: submission > 0 ? Math.min(submission, 4) : 0,
        }));
        return formattedData;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
const Leetcodecalendar = (props) => {
    return (jsxRuntime.jsx(reactQuery.QueryClientProvider, { client: queryClient, children: jsxRuntime.jsx(LeetcodecalendarComponent, { ...props }) }));
};

exports.Leetcodecalendar = Leetcodecalendar;
//# sourceMappingURL=index.cjs.js.map

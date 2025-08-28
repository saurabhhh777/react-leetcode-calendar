import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useMemo } from "react";
import CustomActivityCalendar from "./CustomActivityCalendar";

// Define the structure for LeetCode data
interface Leet {
  date: string;
  count: number;
  level: number;
}

type LeetcodecalendarProps = {
  username: string;
  graph?: string; // Optional, default is 'default'
  showTitle?: boolean; // Optional, default is true
  size?: 'small' | 'medium' | 'large' | 'xl' | { width: number; height: number }; // Calendar size - can be preset or custom dimensions
  startDate?: string; // Optional, format: 'YYYY-MM-DD', default is one year ago
  ui?: 'default' | 'purple-cyan' | 'rainbow' | 'ocean' | 'sunset' | 'forest' | 'midnight' | 'candy' | 'matrix' | 'masculine' | 'deep-forest'; // UI theme
  colors?: {
    // Activity square colors
    noActivity?: string; // Color for no activity squares
    activity?: string[]; // Array of colors for activity levels (1-4+ submissions)
    
    // Text colors
    text?: string; // General text color
    title?: string; // Title text color
    months?: string; // Month labels color
    weekdays?: string; // Weekday labels color
    totalCount?: string; // Total count text color
    legend?: string; // Legend text color
    
    // Background colors
    background?: string; // Main background color
    calendarBackground?: string; // Calendar container background
    
    // Border and hover colors
    border?: string; // Border color
    hover?: string; // Hover effect color
    
    // Loading and error states
    loading?: string; // Loading text color
    error?: string; // Error text color
    noData?: string; // No data text color
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

const queryClient = new QueryClient();

// Predefined UI themes
const UI_THEMES = {
  default: {
    noActivity: "#161B22",
    activity: ["#0E4429", "#006D32", "#26A641", "#39D353"],
    text: "#ffffff",
    title: "#ffffff",
    months: "#ffffff",
    weekdays: "#ffffff",
    totalCount: "#ffffff",
    legend: "#ffffff",
    background: "#101828",
    calendarBackground: "#101828",
    border: "transparent",
    hover: "#ffffff",
    loading: "#ffffff",
    error: "#ff6b6b",
    noData: "#ffffff"
  },
  'purple-cyan': {
    noActivity: "#2d1b69",
    activity: ["#8b5cf6", "#a855f7", "#c084fc", "#f87171"],
    text: "#00d4ff",
    title: "#00d4ff",
    months: "#00d4ff",
    weekdays: "#00d4ff",
    totalCount: "#00d4ff",
    legend: "#00d4ff",
    background: "#1a1a2e",
    calendarBackground: "#16213e",
    border: "#0f3460",
    hover: "#e94560",
    loading: "#00d4ff",
    error: "#ff6b6b",
    noData: "#00d4ff"
  },
  rainbow: {
    noActivity: "#2d1b69",
    activity: ["#ff6b6b", "#ffa726", "#66bb6a", "#42a5f5"],
    text: "#f7f1e3",
    title: "#ffd93d",
    months: "#4caf50",
    weekdays: "#2196f3",
    totalCount: "#f44336",
    legend: "#ff9800",
    background: "#1a1a2e",
    calendarBackground: "#16213e",
    border: "#0f3460",
    hover: "#e94560",
    loading: "#ff6b6b",
    error: "#ff4757",
    noData: "#ffa502"
  },

  ocean: {
    noActivity: "#0f1419",
    activity: ["#006994", "#0099cc", "#00bfff", "#87ceeb"],
    text: "#e0f6ff",
    title: "#00bfff",
    months: "#87ceeb",
    weekdays: "#00bfff",
    totalCount: "#e0f6ff",
    legend: "#87ceeb",
    background: "#0a0f14",
    calendarBackground: "#0f1419",
    border: "#006994",
    hover: "#00bfff",
    loading: "#00bfff",
    error: "#ff6b6b",
    noData: "#87ceeb"
  },
  sunset: {
    noActivity: "#2c1810",
    activity: ["#ff6b35", "#f7931e", "#ffd23f", "#ff6b9d"],
    text: "#fff5e6",
    title: "#ff6b35",
    months: "#f7931e",
    weekdays: "#ffd23f",
    totalCount: "#ff6b9d",
    legend: "#ff6b35",
    background: "#1a0f0a",
    calendarBackground: "#2c1810",
    border: "#ff6b35",
    hover: "#f7931e",
    loading: "#ff6b35",
    error: "#ff4757",
    noData: "#ffd23f"
  },
  forest: {
    noActivity: "#1a2f1a",
    activity: ["#2d5016", "#4a7c59", "#6b8e23", "#9acd32"],
    text: "#e8f5e8",
    title: "#9acd32",
    months: "#6b8e23",
    weekdays: "#4a7c59",
    totalCount: "#2d5016",
    legend: "#9acd32",
    background: "#0f1a0f",
    calendarBackground: "#1a2f1a",
    border: "#2d5016",
    hover: "#6b8e23",
    loading: "#9acd32",
    error: "#ff6b6b",
    noData: "#6b8e23"
  },
  midnight: {
    noActivity: "#0a0a0a",
    activity: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
    text: "#e0e0e0",
    title: "#533483",
    months: "#0f3460",
    weekdays: "#16213e",
    totalCount: "#1a1a2e",
    legend: "#533483",
    background: "#000000",
    calendarBackground: "#0a0a0a",
    border: "#1a1a2e",
    hover: "#533483",
    loading: "#533483",
    error: "#ff6b6b",
    noData: "#0f3460"
  },
  candy: {
    noActivity: "#2d1b3d",
    activity: ["#ff69b4", "#ff1493", "#ff69b4", "#ff1493"],
    text: "#ffe6f2",
    title: "#ff69b4",
    months: "#ff1493",
    weekdays: "#ff69b4",
    totalCount: "#ff1493",
    legend: "#ff69b4",
    background: "#1a0f1a",
    calendarBackground: "#2d1b3d",
    border: "#ff69b4",
    hover: "#ff1493",
    loading: "#ff69b4",
    error: "#ff6b6b",
    noData: "#ff1493"
  },
  matrix: {
    noActivity: "#0a0a0a",
    activity: ["#00ff00", "#00cc00", "#009900", "#006600"],
    text: "#00ff00",
    title: "#00ff00",
    months: "#00ff00",
    weekdays: "#00ff00",
    totalCount: "#00ff00",
    legend: "#00ff00",
    background: "#000000",
    calendarBackground: "#0a0a0a",
    border: "#00ff00",
    hover: "#00cc00",
    loading: "#00ff00",
    error: "#ff0000",
    noData: "#00ff00"
  },
  masculine: {
    noActivity: "#E9DFD3", // Quartz
    activity: ["#ABBAAF", "#667F91", "#D8DCDB", "#14293C", "#000000"], // Slate, Steel, Iron, Ink, Coal
    text: "#14293C", // Ink
    title: "#000000", // Coal
    months: "#14293C", // Ink
    weekdays: "#667F91", // Steel
    totalCount: "#000000", // Coal
    legend: "#667F91", // Steel
    background: "#E9DFD3", // Quartz
    calendarBackground: "#F5F1EB", // Lighter Quartz
    border: "#ABBAAF", // Slate
    hover: "#14293C", // Ink
    loading: "#667F91", // Steel
    error: "#8B0000", // Dark red for errors
    noData: "#667F91" // Steel
  },
  "deep-forest": {
    noActivity: "#BDD1BD", // Light sage green
    activity: ["#85B093", "#568F7C", "#326D6C", "#173C4C", "#07142B"], // Forest green progression
    text: "#07142B", // Dark navy
    title: "#000009", // Almost black
    months: "#07142B", // Dark navy
    weekdays: "#173C4C", // Dark teal-blue
    totalCount: "#000009", // Almost black
    legend: "#173C4C", // Dark teal-blue
    background: "#BDD1BD", // Light sage green
    calendarBackground: "#E8F0E8", // Lighter sage green
    border: "#85B093", // Medium green
    hover: "#07142B", // Dark navy
    loading: "#173C4C", // Dark teal-blue
    error: "#8B0000", // Dark red for errors
    noData: "#173C4C" // Dark teal-blue
  }
};

// Size configurations
const SIZE_CONFIGS = {
  small: {
    squareSize: 12,
    fontSize: 10,
    padding: 12,
    gap: 2,
    titleSize: 14,
    legendGap: 6
  },
  medium: {
    squareSize: 16,
    fontSize: 12,
    padding: 16,
    gap: 3,
    titleSize: 16,
    legendGap: 8
  },
  large: {
    squareSize: 20,
    fontSize: 14,
    padding: 20,
    gap: 4,
    titleSize: 18,
    legendGap: 10
  },
  xl: {
    squareSize: 24,
    fontSize: 16,
    padding: 24,
    gap: 5,
    titleSize: 20,
    legendGap: 12
  }
};

const LeetcodecalendarComponent = ({ 
  username, 
  graph = "default",
  showTitle = false,
  size = "medium" as 'small' | 'medium' | 'large' | 'xl' | { width: number; height: number },
  startDate,
  ui = "default",
  colors,
  labels
}: LeetcodecalendarProps) => {
  useEffect(() => {
    console.log("Graph prop received:", graph);
  }, [graph]);

  const { data = [] as Leet[], isLoading, isError, error } = useQuery<Leet[]>({
    queryKey: ["leetcodeData", username, graph],
    queryFn: () => handlegetdata(username, graph),
    staleTime: 0,
    refetchOnMount: true,
  });

  const generateInitialYearData = (startDate: string, endDate: string): Leet[] => {
    const currentDate = new Date(startDate);
    const end = new Date(endDate);
    const result: Leet[] = [];

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

  const filteredData = useMemo(() => {
    if (graph === "yearly") {
      const today = new Date();
      let startDateStr: string;
      let endDateStr: string;

      if (startDate) {
        // Validate custom start date
        const parsed = Date.parse(startDate);
        if (!isNaN(parsed)) {
          const customStart = new Date(parsed);
          const customEnd = new Date(customStart);
          customEnd.setFullYear(customEnd.getFullYear() + 1);
          customEnd.setDate(customEnd.getDate() - 1); // Subtract one day to get exactly one year

          startDateStr = customStart.toISOString().split("T")[0];
          endDateStr = customEnd.toISOString().split("T")[0];
        } else {
          console.warn("Invalid startDate provided to Leetcodecalendar. Expected YYYY-MM-DD. Falling back to last year from today.", startDate);
          // Default: last year from today
          const lastYear = new Date(today);
          lastYear.setFullYear(lastYear.getFullYear() - 1);
          startDateStr = lastYear.toISOString().split("T")[0];
          
          const endYear = new Date(lastYear);
          endYear.setFullYear(endYear.getFullYear() + 1);
          endYear.setDate(endYear.getDate() - 1);
          endDateStr = endYear.toISOString().split("T")[0];
        }
      } else {
        // Default: last year from today
        const lastYear = new Date(today);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        startDateStr = lastYear.toISOString().split("T")[0];
        
        const endYear = new Date(lastYear);
        endYear.setFullYear(endYear.getFullYear() + 1);
        endYear.setDate(endYear.getDate() - 1);
        endDateStr = endYear.toISOString().split("T")[0];
      }

      console.log('Yearly date range:', { startDateStr, endDateStr, dataLength: data.length });

      const initialYearData = generateInitialYearData(startDateStr, endDateStr);
      console.log('Generated year data length:', initialYearData.length);

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
    }
    return data;
  }, [data, graph, startDate]);

  const getTotalSubmissions = useMemo(() => {
    return filteredData.reduce((total, data) => total + data.count, 0);
  }, [filteredData]);

  // Get theme colors based on UI prop
  const themeColors = UI_THEMES[ui] || UI_THEMES.default;

  if (isLoading) return <div style={{ color: colors?.loading || themeColors.loading }}>Loading...</div>;
  if (isError) return <div style={{ color: colors?.error || themeColors.error }}>Error: {error?.message}</div>;

  // Default labels
  const defaultLabels = {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    totalCount: `Total submissions: ${getTotalSubmissions}`,
    legend: {
      less: "Few submissions",
      more: "Many submissions",
    },
  };

  // Merge custom colors and labels with defaults
  // Debug logging
  if (colors) {
    console.log('Custom colors received:', colors);
  }
  console.log('Theme colors:', themeColors);

  const mergedColors = {
    // Activity square colors
    noActivity: colors?.noActivity || themeColors.noActivity,
    activity: colors?.activity || themeColors.activity,
    
    // Text colors
    text: colors?.text || themeColors.text,
    title: colors?.title || themeColors.title,
    months: colors?.months || themeColors.months,
    weekdays: colors?.weekdays || themeColors.weekdays,
    totalCount: colors?.totalCount || themeColors.totalCount,
    legend: colors?.legend || themeColors.legend,
    
    // Background colors
    background: colors?.background || themeColors.background,
    calendarBackground: colors?.calendarBackground || themeColors.calendarBackground,
    
    // Border and hover colors
    border: colors?.border || themeColors.border,
    hover: colors?.hover || themeColors.hover,
    
    // Loading and error states
    loading: colors?.loading || themeColors.loading,
    error: colors?.error || themeColors.error,
    noData: colors?.noData || themeColors.noData
  };

  const mergedLabels = {
    months: labels?.months || defaultLabels.months,
    weekdays: labels?.weekdays || defaultLabels.weekdays,
    totalCount: labels?.totalCount || defaultLabels.totalCount,
    legend: {
      less: labels?.legend?.less || defaultLabels.legend.less,
      more: labels?.legend?.more || defaultLabels.legend.more,
    },
  };

  return (
    <div 
      className="p-4" 
      style={{ 
        backgroundColor: mergedColors.background,
        color: mergedColors.text,
        border: 'none',
        borderRadius: '16px',
        maxWidth: 960,
        margin: '0 auto'
      }}
    >
      <div className="flex flex-col items-center">
        {showTitle && (
          <h2 
            className="text-lg font-semibold mb-2"
            style={{ color: mergedColors.title }}
          >
            {graph === "yearly" ? "Last Year's LeetCode Submissions" : "LeetCode Submissions"}
          </h2>
        )}
        {filteredData.length > 0 ? (
          <div style={{ backgroundColor: mergedColors.calendarBackground }}>
            <CustomActivityCalendar
              data={filteredData}
              size={size}
              labels={mergedLabels}
              colors={{
                noActivity: mergedColors.noActivity,
                activity: mergedColors.activity,
                text: mergedColors.text,
                legend: mergedColors.legend,
                totalCount: mergedColors.totalCount
              }}
            />
          </div>
        ) : (
          <p style={{ color: mergedColors.noData }}>
            No data available for the given username.
          </p>
        )}
      </div>
    </div>
  );
};

// Fetch LeetCode data using axios (Fixed the TypeScript error)
const handlegetdata = async (username: string, graph: string): Promise<Leet[]> => {
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
    const submissionCalendar = res.data as Record<string, number>;

    const formattedData: Leet[] = Object.entries(submissionCalendar).map(([date, submission]) => ({
      date,
      count: submission,
      level: submission > 0 ? Math.min(submission, 4) : 0,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const Leetcodecalendar = (props: LeetcodecalendarProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LeetcodecalendarComponent {...props} />
    </QueryClientProvider>
  );
};

export default Leetcodecalendar;

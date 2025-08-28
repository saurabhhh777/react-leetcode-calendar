import React from 'react';

interface ActivityData {
  date: string;
  count: number;
  level: number;
}

interface CustomActivityCalendarProps {
  data: ActivityData[];
  size: 'small' | 'medium' | 'large' | 'xl' | { width: number; height: number };
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

const CustomActivityCalendar: React.FC<CustomActivityCalendarProps> = ({ data, size, labels, colors }) => {
  // Group data by weeks
  const weeks: ActivityData[][] = [];
  let currentWeek: ActivityData[] = [];
  
  data.forEach((item, index) => {
    currentWeek.push(item);
    if (currentWeek.length === 7 || index === data.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  // Get color for activity level
  const getColor = (level: number) => {
    if (level === 0) return colors.noActivity;
    return colors.activity[Math.min(level - 1, colors.activity.length - 1)];
  };

  // Size configuration
  const getSizeConfig = () => {
    if (typeof size === 'string') {
      const presetConfigs = {
        small: { squareSize: 12, fontSize: 10, padding: 12, gap: 2, titleSize: 14, legendGap: 6 },
        medium: { squareSize: 16, fontSize: 12, padding: 16, gap: 3, titleSize: 16, legendGap: 8 },
        large: { squareSize: 20, fontSize: 14, padding: 20, gap: 4, titleSize: 18, legendGap: 10 },
        xl: { squareSize: 24, fontSize: 16, padding: 24, gap: 5, titleSize: 20, legendGap: 12 }
      };
      return presetConfigs[size];
    } else {
      // Custom dimensions - calculate proportional sizes based on width/height
      const baseSize = Math.min(size.width, size.height) / 50; // Scale factor
      return {
        squareSize: Math.max(8, Math.min(32, Math.round(baseSize * 16))), // Between 8-32px
        fontSize: Math.max(8, Math.min(18, Math.round(baseSize * 12))), // Between 8-18px
        padding: Math.max(8, Math.min(32, Math.round(baseSize * 16))), // Between 8-32px
        gap: Math.max(1, Math.min(6, Math.round(baseSize * 3))), // Between 1-6px
        titleSize: Math.max(10, Math.min(24, Math.round(baseSize * 16))), // Between 10-24px
        legendGap: Math.max(4, Math.min(16, Math.round(baseSize * 8))) // Between 4-16px
      };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      fontSize: `${sizeConfig.fontSize}px`,
      padding: `${sizeConfig.padding}px`,
      borderRadius: '6px',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Month labels */}
      <div style={{ 
        display: 'flex', 
        marginBottom: `${sizeConfig.gap * 4}px`, 
        color: colors.text,
        fontSize: `${sizeConfig.fontSize - 2}px`,
        fontWeight: '500'
      }}>
        {labels.months.map((month, index) => (
          <div key={month} style={{ 
            flex: 1, 
            textAlign: 'center',
            color: colors.text,
            opacity: 0.8
          }}>
            {month}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'flex', gap: `${sizeConfig.gap}px` }}>
        {/* Weekday labels */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: `${sizeConfig.gap}px`, 
          marginRight: `${sizeConfig.gap * 3}px`,
          fontSize: `${sizeConfig.fontSize - 1}px`,
          fontWeight: '500'
        }}>
          {labels.weekdays.map(day => (
            <div key={day} style={{ 
              height: `${sizeConfig.squareSize}px`, 
              display: 'flex', 
              alignItems: 'center',
              color: colors.text,
              opacity: 0.6
            }}>
              {day}
            </div>
          ))}
        </div>

        {/* Activity squares */}
        <div style={{ display: 'flex', gap: `${sizeConfig.gap}px` }}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} style={{ display: 'flex', flexDirection: 'column', gap: `${sizeConfig.gap}px` }}>
              {week.map((day, dayIndex) => (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  style={{
                    width: `${sizeConfig.squareSize}px`,
                    height: `${sizeConfig.squareSize}px`,
                    backgroundColor: getColor(day.level),
                    borderRadius: '3px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                  }}
                  title={`${day.date}: ${day.count} submissions`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.2)';
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginTop: `${sizeConfig.gap * 5}px`,
        padding: `${sizeConfig.padding}px`,
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '4px'
      }}>
        <span style={{ 
          color: colors.totalCount, 
          fontSize: `${sizeConfig.fontSize + 2}px`,
          fontWeight: '600'
        }}>
          {labels.totalCount}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: `${sizeConfig.legendGap}px` }}>
          <span style={{ 
            color: colors.legend, 
            fontSize: `${sizeConfig.fontSize}px`,
            opacity: 0.8
          }}>
            {labels.legend.less}
          </span>
          <div style={{ display: 'flex', gap: `${sizeConfig.gap}px` }}>
            {[0, 1, 2, 3, 4].map(level => (
              <div
                key={level}
                style={{
                  width: `${sizeConfig.squareSize}px`,
                  height: `${sizeConfig.squareSize}px`,
                  backgroundColor: getColor(level),
                  borderRadius: '3px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                }}
              />
            ))}
          </div>
          <span style={{ 
            color: colors.legend, 
            fontSize: `${sizeConfig.fontSize}px`,
            opacity: 0.8
          }}>
            {labels.legend.more}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomActivityCalendar; 
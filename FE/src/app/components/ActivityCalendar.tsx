import { JSX, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DayActivity {
  date: string; // YYYY-MM-DD
  exerciseCount: number;
  totalQuestions: number;
  accuracy: number;
}

interface ActivityCalendarProps {
  activities: DayActivity[];
  onDayClick: (date: string) => void;
  selectedDate?: string;
}

export function ActivityCalendar({ activities, onDayClick, selectedDate }: ActivityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get days in previous month
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  // Month names in Vietnamese
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];
  
  // Day names
  const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  
  // Navigate to previous month
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Get activity for a specific date
  const getActivityForDate = (dateStr: string): DayActivity | undefined => {
    return activities.find(a => a.date === dateStr);
  };
  
  // Get color based on activity level
  const getActivityColor = (activity?: DayActivity): string => {
    if (!activity || activity.exerciseCount === 0) return 'bg-gray-100';
    
    const { accuracy } = activity;
    if (accuracy >= 80) return 'bg-green-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const days: JSX.Element[] = [];
    
    // Previous month days
    const prevMonthStart = daysInPrevMonth - firstDayOfMonth + 1;
    for (let i = prevMonthStart; i <= daysInPrevMonth; i++) {
      days.push(
        <div key={`prev-${i}`} className="aspect-square p-1">
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            {i}
          </div>
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const activity = getActivityForDate(dateStr);
      const isSelected = selectedDate === dateStr;
      const hasActivity = activity && activity.exerciseCount > 0;
      
      days.push(
        <div key={`current-${day}`} className="aspect-square p-1">
          <button
            onClick={() => onDayClick(dateStr)}
            className={`
              w-full h-full rounded-lg text-sm font-medium transition-all duration-200
              flex flex-col items-center justify-center gap-0.5
              ${isSelected 
                ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                : 'hover:scale-105'
              }
              ${hasActivity 
                ? `${getActivityColor(activity)} text-white hover:opacity-90 cursor-pointer` 
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <span>{day}</span>
            {hasActivity && (
              <span className="text-[10px] opacity-90">
                {activity.exerciseCount}
              </span>
            )}
          </button>
        </div>
      );
    }
    
    // Next month days to fill the grid
    const totalDays = days.length;
    const remainingDays = 42 - totalDays; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div key={`next-${i}`} className="aspect-square p-1">
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
            {i}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-900 text-lg">
          {monthNames[month]} {year}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tháng trước"
          >
            <ChevronLeft className="size-5 text-gray-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Tháng sau"
          >
            <ChevronRight className="size-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Chưa làm</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>&lt;60%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>60-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>≥80%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

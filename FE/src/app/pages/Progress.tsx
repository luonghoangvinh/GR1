import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';
import { getUserAnswers } from '../utils/storage';
import { calculateProgressStats, getTypeTitle, getAccuracyColor } from '../utils/analytics';
import { getActivityByDate, getExercisesForDate, generateMockActivityData } from '../utils/activityUtils';
import { ProgressStats } from '../types';
import { ActivityCalendar } from '../components/ActivityCalendar';
import { DayActivityDetail } from '../components/DayActivityDetail';
import { data } from 'react-router-dom';

export function Progress() {
  const [stats, setStats] = useState<ProgressStats[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [overallAccuracy, setOverallAccuracy] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);

  const userStr = localStorage.getItem('user');
  const userData = userStr ? JSON.parse(userStr) : null;
  const userId = userData ? userData.id : null;
  useEffect(() => {
    // Get real answers or use mock data for demo
    const getAnswers = async () => {
      const res = await getUserAnswers(userId);
      const answers =await res.json();

      // If no real data, use mock data for demonstration
      /*if (answers.length === 0) {
        answers = generateMockActivityData();
      }*/

      const calculatedStats = calculateProgressStats(answers);
      setStats(calculatedStats);

      const total = answers.length;
      const correct = answers.filter((a: { isCorrect: any; }) => a.isCorrect).length;
      setTotalQuestions(total);
      setOverallAccuracy(total > 0 ? (correct / total) * 100 : 0);
    }
    getAnswers();
  }, []);

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
  };

  /*const activities = getActivityByDate(
    getUserAnswers(userId).length > 0 ? getUserAnswers(userId) : generateMockActivityData()
  );

  const selectedDayExercises = selectedDate
    ? getExercisesForDate(
      getUserAnswers().length > 0 ? getUserAnswers() : generateMockActivityData(),
      selectedDate
    )
    : [];*/

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tiến độ học tập</h2>
          <p className="text-sm text-gray-600 mt-1">Theo dõi kết quả và phân tích điểm mạnh/yếu</p>
        </div>


        {/* phần này cần phải xem lại, nếu còn thời gian phát triển thì làm sau
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            showCalendar
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-500'
          }`}
        >
          <CalendarIcon className="size-5" />
          {showCalendar ? 'Ẩn lịch' : 'Xem lịch'}
        </button> */}
      </div>

      {/* Overall stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Tổng câu hỏi</span>
            <CheckCircle className="size-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalQuestions}</div>
          <div className="text-xs text-gray-500 mt-1">Đã hoàn thành</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Độ chính xác</span>
            {overallAccuracy >= 70 ? (
              <TrendingUp className="size-5 text-green-600" />
            ) : (
              <TrendingDown className="size-5 text-red-600" />
            )}
          </div>
          <div className={`text-3xl font-bold ${getAccuracyColor(overallAccuracy)}`}>
            {overallAccuracy.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 mt-1">Trung bình</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Thời gian TB</span>
            <Clock className="size-5 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {stats.length > 0
              ? (stats.reduce((sum, s) => sum + s.averageTime, 0) / stats.filter(s => s.total > 0).length).toFixed(1)
              : '0'
            }s
          </div>
          <div className="text-xs text-gray-500 mt-1">Mỗi câu hỏi</div>
        </div>
      </div>

      {/* Stats by type */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Phân tích theo dạng bài</h3>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.type} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{getTypeTitle(stat.type)}</h4>
                <span className={`text-lg font-semibold ${getAccuracyColor(stat.accuracy)}`}>
                  {stat.accuracy.toFixed(1)}%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{stat.total}</div>
                  <div className="text-xs text-gray-500">Tổng số</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stat.correct}</div>
                  <div className="text-xs text-gray-500">Đúng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stat.incorrect}</div>
                  <div className="text-xs text-gray-500">Sai</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${stat.accuracy}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Thời gian TB: {stat.averageTime.toFixed(1)}s</span>
                {stat.accuracy >= 80 ? (
                  <span className="text-green-600 font-medium">✓ Điểm mạnh</span>
                ) : stat.accuracy < 60 ? (
                  <span className="text-red-600 font-medium">⚠ Cần cải thiện</span>
                ) : (
                  <span className="text-yellow-600 font-medium">~ Trung bình</span>
                )}
              </div>
            </div>
          ))}

          {stats.every(s => s.total === 0) && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-600">Chưa có dữ liệu</p>
              <p className="text-sm text-gray-500 mt-1">Hãy bắt đầu làm bài tập để xem tiến độ của bạn</p>
            </div>
          )}
        </div>
      </div>

      {/* Recommendations */}
      {/*<div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>💡</span>
          Gợi ý cải thiện
        </h3>
        <ul className="space-y-2">
          {stats
            .filter(s => s.accuracy < 70 && s.total > 0)
            .map(s => (
              <li key={s.type} className="text-sm text-gray-700">
                • Tập trung luyện tập <strong>{getTypeTitle(s.type)}</strong> để nâng cao độ chính xác
              </li>
            ))
          }
          {stats.every(s => s.accuracy >= 70 || s.total === 0) && (
            <li className="text-sm text-gray-700">
              • Tuyệt vời! Hãy tiếp tục duy trì và thử thách bản thân với cấp độ cao hơn
            </li>
          )}
        </ul>
      </div>
      */}

      {/* Activity Calendar */}
      {/*
      {showCalendar && (
        <div className="mt-6">
          <ActivityCalendar
            activities={activities}
            onDayClick={handleDayClick}
            selectedDate={selectedDate}
          />
        </div>
      )} */}

      {/* Day Activity Detail */}
      {/*}
      {selectedDate && (
        <div className="mt-6">
          <DayActivityDetail
            date={selectedDate}
            exercises={selectedDayExercises}
          />
        </div> 
      )}*/}

    </div>
  );
}
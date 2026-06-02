import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Calendar, Trophy, Target, Zap, TrendingUp,
  Award, BookOpen, Settings, Edit2, Camera
} from 'lucide-react';
import { getUserAnswers } from '../utils/storage';
import { calculateProgressStats } from '../utils/analytics';

export function Profile() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    streak: 7,
    points: 1250,
    studyDays: 45,
    currentLevel: 'N4'
  });

  const [userInfo, setUserInfo] = useState({
    name: 'Học viên JLPT',
    email: 'student@jlpt.com',
    joinDate: new Date('2024-01-15'),
    avatar: ''
  });

  useEffect(() => {
    const answers = getUserAnswers();
    const total = answers.length;
    const correct = answers.filter(a => a.isCorrect).length;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    setStats(prev => ({
      ...prev,
      totalQuestions: total,
      correctAnswers: correct,
      accuracy
    }));
  }, []);

  const achievements = [
    { id: 1, name: 'Người mới bắt đầu', description: 'Hoàn thành 10 câu hỏi đầu tiên', icon: '🎯', unlocked: true },
    { id: 2, name: 'Streak Master', description: 'Học liên tục 7 ngày', icon: '🔥', unlocked: true },
    { id: 3, name: 'Từ vựng Guru', description: 'Hoàn thành 100 câu từ vựng', icon: '📚', unlocked: true },
    { id: 4, name: 'Ngữ pháp Pro', description: 'Đạt 90% độ chính xác ngữ pháp', icon: '✏️', unlocked: false },
    { id: 5, name: 'Siêu sao JLPT', description: 'Hoàn thành 500 câu hỏi', icon: '⭐', unlocked: false },
    { id: 6, name: 'Bậc thầy N1', description: 'Đạt level N1', icon: '👑', unlocked: false }
  ];

  const quickStats = [
    {
      label: 'Tổng câu hỏi',
      value: stats.totalQuestions,
      icon: BookOpen,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Độ chính xác',
      value: `${stats.accuracy.toFixed(1)}%`,
      icon: Target,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Streak hiện tại',
      value: `${stats.streak} ngày`,
      icon: Zap,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      label: 'Tổng điểm',
      value: stats.points,
      icon: Trophy,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  const joinDuration = Math.floor((new Date().getTime() - userInfo.joinDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="size-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-4 border-white/30">
                  {userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="Avatar" className="size-full rounded-full object-cover" />
                  ) : (
                    <User className="size-12" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 size-8 bg-white rounded-full flex items-center justify-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Camera className="size-4" />
                </button>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{userInfo.name}</h2>
                  <button className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                    <Edit2 className="size-4" />
                  </button>
                </div>
                <div className="space-y-1.5 text-blue-100">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <span className="text-sm">{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    <span className="text-sm">Tham gia {joinDuration} ngày trước</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              <Settings className="size-5" />
              Cài đặt
            </Link>
          </div>

          
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className={`${stat.bgColor} rounded-lg p-3 inline-flex mb-3`}>
                <Icon className={`size-6 ${stat.textColor}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Two column layout */}
      
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Award className="size-5 text-yellow-600" />
                Thành tích ({achievements.filter(a => a.unlocked).length}/{achievements.length})
              </h3>
              <Link to="/profile" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Xem tất cả →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-3xl ${achievement.unlocked ? 'scale-110' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Study Goals & Stats */}
        <div className="space-y-6">
          {/* Study Goal */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="size-5 text-blue-600" />
              Mục tiêu học tập
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Câu hỏi hôm nay</span>
                  <span className="text-sm font-semibold text-gray-900">12/20</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Thời gian học tuần này</span>
                  <span className="text-sm font-semibold text-gray-900">4.5/7h</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="size-5 text-purple-600" />
              Hoạt động gần đây
            </h3>
            <div className="space-y-3">
              {[
                { type: 'Từ vựng', score: 95, time: '2 giờ trước', color: 'blue' },
                { type: 'Ngữ pháp', score: 87, time: '5 giờ trước', color: 'green' },
                { type: 'Nghe hiểu', score: 92, time: 'Hôm qua', color: 'purple' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`size-10 rounded-lg flex items-center justify-center text-white bg-${activity.color}-500`}>
                    <span className="font-bold text-sm">{activity.score}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{activity.type}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

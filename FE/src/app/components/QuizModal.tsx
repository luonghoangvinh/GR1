import { useState } from 'react';
import { X } from 'lucide-react';
import { JLPTLevel, QuestionType } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (level: JLPTLevel, type: QuestionType) => void;
}

export function QuizModal({ isOpen, onClose, onStart }: QuizModalProps) {
  const [level, setLevel] = useState<JLPTLevel>('N5');
  const [selectedType, setSelectedType] = useState<QuestionType>('vocabulary');
  
  if (!isOpen) return null;
  
  const quizTypes = [
    { type: 'vocabulary' as QuestionType, label: 'Từ vựng', icon: '📚', color: 'blue' },
    { type: 'grammar' as QuestionType, label: 'Ngữ pháp', icon: '✏️', color: 'green' },
    { type: 'listening' as QuestionType, label: 'Nghe hiểu', icon: '🎧', color: 'purple' },
    { type: 'reading' as QuestionType, label: 'Đọc hiểu', icon: '📖', color: 'orange' },
  ];
  
  const handleStart = () => {
    onStart(level, selectedType);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Quiz</h3>
              <p className="text-sm opacity-90 mt-1">Luyện tập theo dạng câu hỏi</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Level selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Chọn trình độ
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    level === lvl
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quiz type selector */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Chọn loại quiz
            </label>
            <div className="grid grid-cols-2 gap-3">
              {quizTypes.map((quiz) => (
                <button
                  key={quiz.type}
                  onClick={() => setSelectedType(quiz.type)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedType === quiz.type
                      ? `border-${quiz.color}-500 bg-${quiz.color}-50 shadow-md scale-105`
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{quiz.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{quiz.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Lưu ý:</strong> Quiz không tính vào thành tích. Đây là chế độ luyện tập tự do.
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleStart}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
            >
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { X } from 'lucide-react';
import { JLPTLevel } from '../types';

interface JLPTTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (level: JLPTLevel) => void;
}

export function JLPTTestModal({ isOpen, onClose, onStart }: JLPTTestModalProps) {
  const [level, setLevel] = useState<JLPTLevel>('N5');
  
  if (!isOpen) return null;
  
  const handleStart = () => {
    onStart(level);
    onClose();
  };
  
  const levelInfo = {
    N5: { questions: 50, duration: '100 phút', difficulty: 'Cơ bản' },
    N4: { questions: 70, duration: '120 phút', difficulty: 'Sơ cấp' },
    N3: { questions: 90, duration: '140 phút', difficulty: 'Trung cấp' },
    N2: { questions: 110, duration: '155 phút', difficulty: 'Trung cấp cao' },
    N1: { questions: 120, duration: '170 phút', difficulty: 'Nâng cao' },
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">JLPT Test</h3>
              <p className="text-sm opacity-90 mt-1">Thi thử JLPT đầy đủ</p>
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
              Chọn trình độ thi
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['N5', 'N4', 'N3', 'N2', 'N1'] as JLPTLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`py-3 rounded-lg font-bold transition-all ${
                    level === lvl
                      ? 'bg-orange-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          {/* Test info */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-5 border border-orange-200">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Thông tin bài thi {level}</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Độ khó</span>
                <span className="font-semibold text-gray-900">{levelInfo[level].difficulty}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Số câu hỏi</span>
                <span className="font-semibold text-gray-900">{levelInfo[level].questions} câu</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Thời gian</span>
                <span className="font-semibold text-gray-900">{levelInfo[level].duration}</span>
              </div>
            </div>
          </div>
          
          {/* Test sections */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
            <h5 className="font-semibold text-gray-900 mb-3 text-sm">Phần thi bao gồm:</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Từ vựng (Vocabulary)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Ngữ pháp (Grammar)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Nghe hiểu (Listening)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Đọc hiểu (Reading)</span>
              </div>
            </div>
          </div>
          
          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Lưu ý:</strong> Bài thi không tính vào thành tích. Đây là chế độ luyện tập tự do.
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-colors shadow-md"
            >
              Bắt đầu thi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

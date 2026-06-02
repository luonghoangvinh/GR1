import { useState } from 'react';
import { X, Shuffle } from 'lucide-react';
import { JLPTLevel } from '../types';

interface RandomExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (level: JLPTLevel) => void;
}

export function RandomExerciseModal({ isOpen, onClose, onStart }: RandomExerciseModalProps) {
  const [level, setLevel] = useState<JLPTLevel>('N5');
  
  if (!isOpen) return null;
  
  const handleStart = () => {
    onStart(level);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                <Shuffle className="size-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Bài tập ngẫu nhiên</h3>
                <p className="text-sm opacity-90 mt-1">Luyện tập tổng hợp</p>
              </div>
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
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Shuffle className="size-5 text-purple-600" />
              Bài tập ngẫu nhiên
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              Hệ thống sẽ tự động chọn ngẫu nhiên các câu hỏi từ tất cả dạng bài tập (Từ vựng, Ngữ pháp, Nghe hiểu, Đọc hiểu) ở cấp độ <strong className="text-purple-700">{level}</strong>.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="mt-1">✓</div>
              <p className="text-sm text-gray-700">20 câu hỏi ngẫu nhiên đa dạng</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1">✓</div>
              <p className="text-sm text-gray-700">Kết hợp tất cả dạng câu hỏi</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1">✓</div>
              <p className="text-sm text-gray-700">Luyện tập toàn diện kỹ năng</p>
            </div>
          </div>
          
          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Lưu ý:</strong> Bài tập không tính vào thành tích. Đây là chế độ luyện tập tự do.
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors shadow-md"
            >
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

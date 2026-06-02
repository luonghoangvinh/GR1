import { useState } from 'react';
import { X } from 'lucide-react';
import { JLPTLevel } from '../types';

interface MiniTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (level: JLPTLevel, percentages: { vocabulary: number; grammar: number; listening: number; reading: number }) => void;
}

export function MiniTestModal({ isOpen, onClose, onStart }: MiniTestModalProps) {
  const [level, setLevel] = useState<JLPTLevel>('N5');
  const [vocabulary, setVocabulary] = useState(25);
  const [grammar, setGrammar] = useState(25);
  const [listening, setListening] = useState(25);
  const [reading, setReading] = useState(25);
  
  if (!isOpen) return null;
  
  // Auto-adjust percentages to sum to 100
  const handlePercentageChange = (type: string, value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    
    switch (type) {
      case 'vocabulary':
        setVocabulary(newValue);
        break;
      case 'grammar':
        setGrammar(newValue);
        break;
      case 'listening':
        setListening(newValue);
        break;
      case 'reading':
        setReading(newValue);
        break;
    }
  };
  
  const totalPercentage = vocabulary + grammar + listening + reading;
  const isValid = Math.abs(totalPercentage - 100) < 0.1; // Allow small floating point errors
  
  const handleStart = () => {
    if (isValid) {
      onStart(level, { vocabulary, grammar, listening, reading });
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Mini Test</h3>
              <p className="text-sm opacity-90 mt-1">Cấu hình bài kiểm tra ngắn</p>
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
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
          
          {/* Percentages */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Điểm thành phần (%)
            </label>
            <div className="space-y-4">
              {/* Vocabulary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">📚 Từ vựng</span>
                  <span className="text-sm font-bold text-blue-600">{vocabulary}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={vocabulary}
                  onChange={(e) => handlePercentageChange('vocabulary', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              
              {/* Grammar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">✏️ Ngữ pháp</span>
                  <span className="text-sm font-bold text-green-600">{grammar}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={grammar}
                  onChange={(e) => handlePercentageChange('grammar', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>
              
              {/* Listening */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">🎧 Nghe hiểu</span>
                  <span className="text-sm font-bold text-purple-600">{listening}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={listening}
                  onChange={(e) => handlePercentageChange('listening', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              
              {/* Reading */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">📖 Đọc hiểu</span>
                  <span className="text-sm font-bold text-orange-600">{reading}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={reading}
                  onChange={(e) => handlePercentageChange('reading', Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>
            </div>
            
            {/* Total percentage indicator */}
            <div className={`mt-4 p-3 rounded-lg ${isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between text-sm font-medium">
                <span className={isValid ? 'text-green-700' : 'text-red-700'}>
                  Tổng
                </span>
                <span className={`font-bold ${isValid ? 'text-green-700' : 'text-red-700'}`}>
                  {totalPercentage.toFixed(0)}%
                </span>
              </div>
              {!isValid && (
                <p className="text-xs text-red-600 mt-1">
                  Tổng phần trăm phải bằng 100%
                </p>
              )}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleStart}
              disabled={!isValid}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

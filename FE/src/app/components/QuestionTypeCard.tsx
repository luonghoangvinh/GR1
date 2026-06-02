import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { QuestionCategory } from '../types';

interface QuestionTypeCardProps {
  category: QuestionCategory;
}

export function QuestionTypeCard({ category }: QuestionTypeCardProps) {
  return (
    <Link
      to={`/practice/${category.type}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className={`${category.color} rounded-lg p-3 text-white text-3xl`}>
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <ChevronRight className="size-5 text-gray-400 flex-shrink-0" />
        </div>
      </div>
      
      {/* Level indicators */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <div className="flex gap-2">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map((level) => (
            <span
              key={level}
              className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700"
            >
              {level}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

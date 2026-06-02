import { UserAnswer, ProgressStats, QuestionType } from '../types';

export function calculateProgressStats(answers: UserAnswer[]): ProgressStats[] {
  const types: QuestionType[] = ['vocabulary', 'grammar', 'listening', 'reading'];
  
  return types.map(type => {
    const typeAnswers = answers.filter(a => a.type === type);
    const total = typeAnswers.length;
    const correct = typeAnswers.filter(a => a.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const averageTime = total > 0 
      ? typeAnswers.reduce((sum, a) => sum + a.timeSpent, 0) / total 
      : 0;
    
    return {
      type,
      total,
      correct,
      incorrect,
      accuracy,
      averageTime
    };
  });
}

export function getTypeTitle(type: QuestionType): string {
  const titles: Record<QuestionType, string> = {
    vocabulary: 'Từ vựng',
    grammar: 'Ngữ pháp',
    listening: 'Nghe hiểu',
    reading: 'Đọc hiểu'
  };
  return titles[type];
}

export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return 'text-green-600';
  if (accuracy >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

export function getRecentAnswers(answers: UserAnswer[], count: number = 10): UserAnswer[] {
  return answers
    .sort((a, b) => b.answeredAt.getTime() - a.answeredAt.getTime())
    .slice(0, count);
}

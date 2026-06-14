import React from 'react';
import { Trophy, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizResultCard = ({ quiz }) => {
    return (
        <div className="flex flex-col bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Trophy size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1">
                            {quiz.title || `Quiz ${quiz._id?.slice(-4)}`}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                            Score: {quiz.score}% ({quiz.questions?.length || 0} Questions)
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500">
                <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(quiz.completedAt).toLocaleDateString()}</span>
                <Link to={`/quizzes/${quiz._id}/results`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                    View Results
                </Link>
            </div>
        </div>
    );
};

export default QuizResultCard;

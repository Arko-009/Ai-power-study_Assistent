import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizCard = ({ quiz, onDelete }) => {
    return (
        <div className="flex flex-col bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-neutral-900 text-sm line-clamp-1">
                            {quiz.title || `Quiz ${quiz._id?.slice(-4)}`}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                            {quiz.questions?.length || 0} Questions
                        </p>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(quiz);
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete Quiz"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            
            <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-500">
                <span>{new Date(quiz.createdAt || Date.now()).toLocaleDateString()}</span>
                <Link to={`/quizzes/${quiz._id}`} className="text-blue-600 hover:text-blue-700 font-medium">
                    Take Quiz
                </Link>
            </div>
        </div>
    );
};

export default QuizCard;

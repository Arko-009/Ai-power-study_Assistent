import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import quizService from '../../services/quizService';
import Spinner from '../common/Spinner';
import QuizResultCard from './QuizResultCard';
import EmptyState from '../common/EmptyState';

const QuizResultsManager = ({ documentId }) => {

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const data = await quizService.getQuizzesForDocument(documentId);
            // Filter only quizzes that have been completed
            const completedQuizzes = data.data.filter(q => q.completedAt);
            
            // Flatten attempts so each attempt gets its own card
            const flattenedResults = [];
            completedQuizzes.forEach(quiz => {
                if (quiz.attempts && quiz.attempts.length > 0) {
                    quiz.attempts.forEach((attempt, index) => {
                        flattenedResults.push({
                            ...quiz,
                            score: attempt.score,
                            completedAt: attempt.completedAt,
                            title: `${quiz.title} (Attempt ${index + 1})`,
                            _uniqueId: `${quiz._id}-attempt-${index}`
                        });
                    });
                } else {
                    flattenedResults.push({
                        ...quiz,
                        _uniqueId: quiz._id
                    });
                }
            });
            
            // Sort by most recently completed
            flattenedResults.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
            
            setResults(flattenedResults);
        } catch (error) {
            toast.error('Failed to fetch quiz results.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (documentId) {
            fetchResults();
        }
    }, [documentId]);


    if (loading) {
        return <Spinner />;
    }

    if (results.length === 0) {
        return (
            <div className="bg-white border border-neutral-200 rounded-lg p-6">
                <EmptyState
                    title="No Results Yet"
                    description="Take a quiz to see your results here."
                />
            </div>
        );
    }

    return (
        <div className="bg-white border border-neutral-200 rounded-lg p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((quiz) => (
                    <QuizResultCard key={quiz._uniqueId} quiz={quiz} />
                ))}
            </div>
        </div>
    );
}

export default QuizResultsManager;

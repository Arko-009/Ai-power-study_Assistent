import React, { useState, useEffect } from 'react';
import { useParams, Link} from 'react-router-dom';
import quizService from '../../services/quizService';
import PageHeader from '../../components/common/PageHeader';
import Spinner from '../../components/common/Spinner';
import toast from 'react-hot-toast';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Target, BookOpen} from 'lucide-react';
const QuizResultPage = ()=>{

const { quizId }= useParams();
const [results, setResults] = useState(null);
const [loading, setLoading] = useState(true);
useEffect(()=>{
    const fetchResults = async ()=>{
        try{
            const data = await quizService.getQuizResults(quizId);
            setResults(data);
        } catch (error){
            toast.error('Failed to fetch results');
            console.error(error);
        } finally{
            setLoading(false);
        } 
    };
    fetchResults();
},[quizId]);
if(loading){
    return (
         <div className="">
            <Spinner/>
         </div>
    )
}
if(!results || !results.data){
    return(
        <div className="">
            <div className="">
                <p className="">Quiz results not found</p>
            </div>
        </div>
    );
}
const {data:{quiz,result: detailedResults}} =results;
const score =quiz.score;
const totalQuestions =detailedResults.length;
const correctAnswer = detailedResults.filter(r => r.isCorrect).length;
const incorrectAnswers = totalQuiostions - correctAnswers ;
const getScoreColor = (score) => {
    if(score >= 80) return 'from-emerald-500 to-teal-500';
    if(score >= 60) return 'from-amber-500 to-orange-500';
    return 'from-rose-500 to-red-500';
};
const getScoreMessage =(score)=>{
      if(score >= 90) return 'Outstanding';
      if(score >= 80) return 'Great Job';
      if(score >= 70) return 'Good work';
      if(score >= 60) return 'Not bad';
      return 'Keep Practicing 👍🤔👀';
}
return(
    <div>QuizResultPage</div>
) 
}
export default QuizResultPage;
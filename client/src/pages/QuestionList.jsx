import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import axios from 'axios';
import "./LoginSignup.css";

export const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading indicator
    const [error, setError] = useState(null); // State to manage error

    const { LogoutUser } = useAuth();

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleLogout = (event) => {
        LogoutUser();
        navigate("/");
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/question/questions',{
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                    }
                });
                
                setQuestions(response.data); // Assuming response.data is an array
                setLoading(false); // Update loading state to false after fetching
            } catch (error) {
                if(error.request.status == 403){
                    setError('Authentication Error'); 
                }
                else{
                    console.error('Error fetching questions:', error);
                    setError('Error fetching questions. Please try again later.'); // Set error message
                    setLoading(false); // Update loading state to false on error
                }
            }
        };

        fetchQuestions();
    }, []); // Empty dependency array to run effect only once on mount

    // Handle loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Handle error state
    if (error) {
        return <p>{error}</p>;
    }

    // Ensure questions is an array before mapping over it
    if (!Array.isArray(questions) || questions.length === 0) {
        return <p>No questions found.</p>; // Handle case where no questions are fetched
    }

    return (
        <>
            <button className='logout-button' onClick={handleLogout}>Logout</button>
            <div className='container'>
                <div>
                    <div className='header'>
                        <div className='text'>Questions</div>
                        <div className='underline'></div>
                    </div>
                    <ul>
                        {questions.map((question, index) => (
                            <li key={question._id}>
                            <Link to={`/question/${question.questionId}`}>
                                <p>{index + 1}: {question.title}</p>
                            </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

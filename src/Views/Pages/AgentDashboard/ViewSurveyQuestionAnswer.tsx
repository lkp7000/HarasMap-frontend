import React, { useEffect, useState } from 'react';
import { getAllQuestionsAnswer } from '../../../services/api';
import AgentDashBoardLayout from './AgentDashboardLayout';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ViewSurveyQuestionAnswer: React.FC = () => {
    const { agentSurveyID } = useParams();

    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const token = localStorage.getItem("token");
    const agentsurveyId = localStorage.getItem("surveyID");
    const navigate = useNavigate();
    const {t} = useTranslation();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllQuestionsAnswer(agentsurveyId, token);
                setQuestionsData(response.data);

            } catch (error) {
                console.error('Error fetching data from the API:', error);
            }
        };

        fetchData();
    }, [agentsurveyId]);

    const handleBackClick = () => {
        navigate('/AgentDashboard');
    };


    return (

        <div>

            <AgentDashBoardLayout>
                <div style={{
                    maxHeight: "600px",
                    overflow: "auto",
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" // Adding shadow
                }}>
                    {questionsData.length > 0 ? (
                         <><h2 style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            fontSize: "1.5em",
                            fontFamily: "Arial, sans-serif", // Change fontFamily
                            textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)" // Adding text shadow
                        }}>
                            {t('Questions and Answers')}
                        </h2><div> <ul style={{ listStyle: "none", padding: 0 }}>
                            {questionsData.map((question: any, index: number) => (
                                <li key={question.questionId} style={{ marginBottom: "15px" }}>
                                    <p style={{ fontSize: "1.2em", margin: 0 }}><strong>ID:</strong> {question.questionId}</p>
                                    <p style={{ fontSize: "1.2em", margin: 0 }}><strong>Question:</strong> {question.questionText}</p>
                                    <p style={{ fontSize: "1.2em", margin: 0 }}><strong>{t('Answer')}:</strong> {question.questionAnswerText}</p>
                                    {index < questionsData.length - 1 && <hr style={{ margin: '15px 0' }} />} {/* Add space after each item except the last one */}
                                </li>
                            ))}
                        </ul></div></>

                    ) : (
                        <p className='text-center pt-2' style={{ fontSize: "1.2em", fontFamily: "Arial, sans-serif" }}>{t('Loading')}...</p>
                    )}
                </div>

                <button
                    style={{
                        marginTop: '10px',
                        padding: '8px 16px',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={handleBackClick}
                >
                    {t('Back')}
                </button>


            </AgentDashBoardLayout>
        </div>

    );
};

export default ViewSurveyQuestionAnswer;

import React, { useEffect, useState } from 'react';
import { AllQuestionsAnswer } from '../../../services/api';
import AdminDashBoardLayout from '../AdminDashboard/AdminDashBoardLayout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ViewQuestionAnswer: React.FC = () => {
    const { agentSurveyId } = useParams();
    const [questionsData, setQuestionsData] = useState<any[]>([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AllQuestionsAnswer(Number(agentSurveyId), token);
                setQuestionsData(response.data);
            } catch (error) {
                console.error('Error fetching data from the API:', error);
            }
        };

        fetchData();
    }, [agentSurveyId]);

    const handleBackClick = () => {
        navigate('/listsurvey');
    };


    return (

        <div>

            <AdminDashBoardLayout>
                <div style={{
                    maxHeight: "600px",
                    overflow: "auto",
                    border: "1px solid #ccc",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" // Adding shadow
                }}>
                    {questionsData.length > 0 ? (
                        <div>
                            <h2 style={{
                                textAlign: "center",
                                marginBottom: "20px",
                                fontSize: "1.5em",
                                fontFamily: "Arial, sans-serif", // Change fontFamily
                                textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)" // Adding text shadow
                            }}>
                                {t('Questions and Answers')}
                            </h2>
                            <ul style={{ listStyle: "none", padding: 0 }}>
                                {questionsData.map((question: any, index: number) => (
                                    <li key={question.questionId} style={{ marginBottom: "15px" }}>
                                        <p style={{ fontSize: "1.2em", margin: 0 }}><strong>Question :</strong> {question.questionText}</p>
                                        <p style={{ fontSize: "1.2em", margin: 0 }}><strong>{t('Answer')} :</strong> {question.questionAnswerText}</p>
                                        {index < questionsData.length - 1 && <hr style={{ margin: '15px 0' }} />} {/* Add space after each item except the last one */}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className='text-center pt-2' style={{ fontSize: "1.2em", fontFamily: "Arial, sans-serif" }}>{t('Loading')}...</p>
                    )}
                </div>




                <button
                    style={{
                        marginTop: '10px',
                        padding: '8px 20px',
                        backgroundColor: 'blue',
                        opacity: '10',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={handleBackClick}
                >
                    {t('Back')}
                </button>
            </AdminDashBoardLayout>
        </div>
    );
};

export default ViewQuestionAnswer;

import Layout from "../Component/Layout/Layout";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { getDataAPI, surveySubmit } from "../../services/api";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

const Employment = () => {
  const [questions, setQuestions] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});
  const BASE_URL = process.env.REACT_APP_MAP_KEY;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [filterQuestions, setFilterQuestions] = useState([]);

  const surveyID = localStorage.getItem("surveyID");
  const {t}= useTranslation()

  const [formData, setFormData] = useState<any>({});

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, question: { questionID: any; }) => {
    const selectedOptionID = e.target.value;
    setSelectedQuestion((prev: any) => ({
      ...prev,
      [question?.questionID]: {
        questionAnswerID: prev?.[question?.questionID]?.questionAnswerID,
        questionID: question?.questionID,
        questionOptionID: selectedOptionID,
        agentSurveyID: surveyID,
      },
    }));
  };

  useEffect(() => {
    const response = localStorage.getItem('questions');
    if (response) {
      const parsedResponse = JSON.parse(response);
      const mappedQuestions: any = []
      parsedResponse.filter((item: any) => {
        if (item?.questionGroupID?.questionGroupName === "Sexual Harassment Victim") {
          mappedQuestions.push(item)
        }
      })
      setQuestions(mappedQuestions);
      questionHider(mappedQuestions, selectedQuestion)
    }
  }, []);

  const fetchQuestionsAnswer = async (cancel: any) => {
    try {
      const response = await getDataAPI(token, surveyID);
      console.log(response)
      if (response) {
        let obj: any = {}
        response?.map((item: any) => {
          obj = {
            ...obj,
            [item?.questionID]: {
              questionID: item?.questionID,
              questionOptionID: item?.selectedQuestionOptionID,
              agentSurveyID: item?.agentSurveyID,
              optionText: item?.questionAnswerText,
              questionAnswerID: item?.questionAnswerID,
            }
          }
        })
        setSelectedQuestion(obj);
      } else {
        console.error("Error submitting the form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    if (cancel) {
      navigate(-1);
    }
  }

  useEffect(() => {
    fetchQuestionsAnswer(false)
  }, [])

  const optionHandler = (e: any, selectedOption: any, currentQuestionData: any) => {
    let curSelected = {
      ...selectedQuestion,
      [selectedOption?.questionID]: {
        questionID: selectedOption?.questionID,
        questionOptionID: selectedOption?.questionOptionID,
        agentSurveyID: currentQuestionData?.surveyID,
        questionAnswerID: selectedQuestion?.[selectedOption?.questionID]?.questionAnswerID,
        shortKey: currentQuestionData?.shortKey,
        optionText: null,
      }
    }
    setSelectedQuestion(curSelected)
    questionHider(questions, curSelected)
  }

  const inputHandler = (e: any, selectedInput: any) => {
    let curSelected = {
      ...selectedQuestion,
      [selectedInput?.questionID]: {
        questionAnswerID: selectedQuestion?.[selectedInput?.questionID]?.questionAnswerID,
        questionID: selectedInput?.questionID,
        optionText: e.target.value,
        agentSurveyID: selectedInput?.surveyID,
        shortKey: selectedInput?.shortKey,
      }
    }
    setSelectedQuestion(curSelected)
    questionHider(questions, curSelected)
  }

  const handleCancel = () => {
    navigate("/family");
  };

  const ageConditionalCheckerNew = (currentQuestion: any, selectedQuestion: any) => {
    let result = []
    if (currentQuestion?.shortKey === 'employment_whereWork') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'employment_workingNow') {
          if (questionItem?.optionText == "Employeed") {
            result = currentQuestion
          }
        }
      })
    } else if (currentQuestion?.shortKey === 'employment_weeklyEarnings') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'employment_workingNow') {
          if (questionItem?.optionText == 'Unemployed') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    } else if (currentQuestion?.shortKey === 'started_work') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'employment_workingNow') {
          if (questionItem?.optionText == 'Unemployed') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    } else if (currentQuestion?.shortKey === 'transfers_people') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'transfers_family') {
          if (questionItem?.optionText == 'No') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    } else if (currentQuestion?.shortKey === 'who_harass') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'harasser_harassedBefore') {
          if (questionItem?.optionText == 'No') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    } else if (currentQuestion?.shortKey === 'lost_job') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'harasser_harassedBefore') {
          if (questionItem?.optionText == 'No') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    } else {
      result = currentQuestion
    }
    return result
  }

  const questionHider = (question: any, curSelected: any) => {
    let FilteredQuestions: any = []
    question.map((item: any) => {
      let result = ageConditionalCheckerNew(item, curSelected)
      if (Object.entries(result)?.length > 0) {
        FilteredQuestions.push(result)
      }
    })
    setFilterQuestions(FilteredQuestions)
  }

  const ageConditionalChecker = (currentQuestion: any) => {
    let result = false
    if (currentQuestion?.shortKey === 'personal_married') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'personal_age') {
          if (questionItem?.optionText >= 18) {
            result = true
          }
        }
      })

    } else if (currentQuestion?.shortKey === 'who_harass') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'harasser_harassedBefore') {
          if (questionItem?.optionText == 'No') {
            result = false
          } else {
            result = true
          }
        }
      })
    }
    else if (currentQuestion?.shortKey === 'lost_job') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'harasser_harassedBefore') {
          if (questionItem?.optionText == 'No') {
            result = false
          } else {
            result = true
          }
        }
      })
    }
    else {
      result = true
    }
    return result
  }

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   navigate('/sexualHarrasmentHarraser');
  // };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payloadGenerator = (selectedQuestions: any) => {
      const payload: any = [];
      for (let key in selectedQuestion) {
        if (selectedQuestion[key]?.optionText) {
          let selectedObj = {
            questionAnswerText: selectedQuestion[key].optionText,
            questionID: selectedQuestion[key]?.questionID,
            agentSurveyID: selectedQuestion[key]?.agentSurveyID,
            questionAnswerID: selectedQuestion[key]?.questionAnswerID,
          };
          payload.push(selectedObj);
        } else {
          let selectedObj = {
            selectedQuestionOptionID: selectedQuestion[key].questionOptionID,
            questionID: selectedQuestion[key]?.questionID,
            agentSurveyID: selectedQuestion[key]?.agentSurveyID,
            questionAnswerID: selectedQuestion[key]?.questionAnswerID,
          };
          payload.push(selectedObj);
        }
      }
      return payload;
    };
    const payloadForAPI = payloadGenerator(selectedQuestion);
    try {
      const response = await surveySubmit(payloadForAPI, token);
      if (response.status == 200) {
        navigate('/sexualHarrasmentHarraser');
      } else {
        console.error("Error submitting the form:", response?.data?.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div style={{ height: "620px", overflow: "auto" }}>
        <h5 className="bg-[#fa9859] text-center font-semibold font-sans text-2xl">
        {t('Sexual Harassment Victim')}        </h5>
        <form className="w-full" onSubmit={handleSubmit}>
          {filterQuestions.map((question: any, index: number) => (
            <div key={question.questionID}>
              <div>
                <fieldset className="border-2 border-gray-300 p-3 mr-4 bg-gray-100">
                  <legend className="text-xs sm:text-lg font-semibold leading-6 text-gray-900 ">
                    {`${index + 1}. ${question?.questionText}`}
                  </legend>
                  <div className="mt-2 space-y-2">
                    <>
                      {question?.questionOptionsID?.length > 0 && (
                        <>
                          {question?.questionOptionsID.map((option: any) => (
                            <div className="flex items-center gap-x-3" key={option?.questionOptionID}>
                              <input
                                id={option?.questionOptionID}
                                type="radio"
                                className="w-3 h-3 text-black-600 border-2 border-black-600 focus:ring-black checked:border-black checked:bg-black focus:outline-none focus:border-black-600"
                                checked={
                                  selectedQuestion[option?.questionID]
                                    ?.questionOptionID ===
                                  option?.questionOptionID
                                }
                                onChange={(e) => optionHandler(e, option, question)}
                              />
                              <label
                                htmlFor={option?.questionOptionID}
                                className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                              >
                                {option?.optionText}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                      {question?.questionOptionsID?.length === 0 && (
                        <input
                          id={question?.questionID}
                          name={question?.questionText}
                          type="text"
                          className="border-1 border-neutral-600 text-black-600 focus:ring-black focus:border-black-600 w-[30%] p-1 sm:max-w-sm"
                          value={selectedQuestion[question?.questionID]?.questionOptionID ? selectedQuestion[question?.questionID]?.questionOptionID : selectedQuestion[question?.questionID]?.optionText}
                          onChange={(e) => inputHandler(e, question)}
                        />
                      )}
                    </>
                  </div>
                </fieldset>
                {index !== questions.length - 1 && <hr className="my-4 border-t border-gray-300" />}
              </div>
            </div>
          ))}
          <div className="mt-6 flex px-4 items-center justify-end gap-x-6">
            <button onClick={handleCancel} type="button" style={{ marginBottom: '10px' }} className="text-sm font-semibold leading-6 text-gray-900 bg-red-400 hover:bg-red-200 px-6 py-2 rounded-md">
              {t('Back')}
            </button>
            <button type="submit" className="rounded-md bg-indigo-600 px-4 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" style={{ marginBottom: '15px' }}>
              {t('Next')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Employment;

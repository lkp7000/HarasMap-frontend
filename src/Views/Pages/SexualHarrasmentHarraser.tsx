import Layout from "../Component/Layout/Layout";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { getDataAPI, surveySubmit } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SexualHarassmentHarasser = () => {
  const [questions, setQuestions] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<any>({});
  const BASE_URL = process.env.REACT_APP_MAP_KEY;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const {t}= useTranslation();
  const surveyID = localStorage.getItem("surveyID");

  const [hideQuestion48, setHideQuestion48] = useState(false);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>, question: { questionID: any }) => {
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
    const mappedQuestions: any = ['questions'];
    const response = localStorage.getItem('questions');

    if (response) {
      const parsedResponse = JSON.parse(response);
      const mappedQuestions: any = [];

      parsedResponse.filter((item: any) => {
        if (item?.questionGroupID?.questionGroupName === "Sexual Harassment Harasser") {
          mappedQuestions.push(item);
        }
      });

      setQuestions(mappedQuestions);

    }
  }, []);

  const fetchQuestionsAnswer = async (cancel: any) => {
    try {
      const response = await getDataAPI(token, surveyID);

      if (response) {
        let obj: any = {};
        response?.map((item: any) => {
          obj = {
            ...obj,
            [item?.questionID]: {
              questionID: item?.questionID,
              questionOptionID: item?.selectedQuestionOptionID,
              agentSurveyID: item?.agentSurveyID,
              optionText: item?.questionAnswerText,
              questionAnswerID: item?.questionAnswerID,
            },
          };
        });

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
  };

  useEffect(() => {
    fetchQuestionsAnswer(false);

  }, []);

  const optionHandler = (e: any, selectedOption: any, currentQuestionData: any) => {
    setSelectedQuestion({
      ...selectedQuestion,
      [selectedOption?.questionID]: {
        questionID: selectedOption?.questionID,
        questionOptionID: selectedOption?.questionOptionID,
        agentSurveyID: currentQuestionData?.surveyID,
        questionAnswerID: selectedQuestion?.[selectedOption?.questionID]?.questionAnswerID,

      },
    });

    if (selectedOption?.questionID === 47 && e.target.value === 'no') {
      setHideQuestion48(true);
    } else {
      setHideQuestion48(false);
    }
  };

  const inputHandler = (e: any, selectedInput: any) => {
    setSelectedQuestion({
      ...selectedQuestion,
      [selectedInput?.questionID]: {
        questionAnswerID: selectedQuestion?.[selectedInput?.questionID]?.questionAnswerID,
        questionID: selectedInput?.questionID,
        optionText: e.target.value,
        agentSurveyID: selectedInput?.surveyID,
      },
    });
  };

  const handleCancel = () => {
    navigate("/SexualHarrasmentVictim");


  };

  
  //   event.preventDefault();
  //   // navigate('/Health');

  //   const payloadGenerator = (selectedQuestions: any) => {
  //     const payload: any = [];

  //     for (let key in selectedQuestion) {
  //       if (selectedQuestion[key]?.optionText) {
  //         let selectedObj = {
  //           questionAnswerText: selectedQuestion[key].optionText,
  //           questionID: selectedQuestion[key]?.questionID,
  //           agentSurveyID: selectedQuestion[key]?.agentSurveyID,
  //           questionAnswerID: selectedQuestion[key]?.questionAnswerID,
  //         };
  //         payload.push(selectedObj);
  //       } else {
  //         let selectedObj = {
  //           selectedQuestionOptionID: selectedQuestion[key].questionOptionID,
  //           questionID: selectedQuestion[key]?.questionID,
  //           agentSurveyID: selectedQuestion[key]?.agentSurveyID,
  //           questionAnswerID: selectedQuestion[key]?.questionAnswerID,
  //         };
  //         payload.push(selectedObj);
  //       }
  //     }
  //     return payload;
  //   };
  //   const payloadForAPI = payloadGenerator(selectedQuestion);
  //   try {
  //     const response = await surveySubmit(payloadForAPI, token);
  //     if (response.status === 200) {
  //       window.alert("Survey Submitted Successfully");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   console.log(selectedQuestion);
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
       navigate('/Health');
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
          {t('Sexual Harassment Harasser')}
        </h5>
        <form className="w-full" onSubmit={handleSubmit}>
          {questions.map((question: any, index: number) => (
            <div key={index}>
              <fieldset className="border-2 border-gray-300 p-3 mr-4 bg-gray-100">
                <legend className="text-xs sm:text-lg font-semibold leading-6 text-gray-900">
                  {` ${index + 1}. ${question?.questionText}`}
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
                        value={selectedQuestion[question?.questionID]?.questionOptionID
                          ? selectedQuestion[question?.questionID]?.questionOptionID
                          : selectedQuestion[question?.questionID]?.optionText}
                        onChange={(e) => inputHandler(e, question)}
                      />
                    )}
                  </>
                </div>
              </fieldset>
              {index !== questions.length - 1 && <hr className="my-4 border-t border-gray-300" />}
            </div>
          ))}

          <div className="mt-6 flex  px-4 items-center justify-end gap-x-6">
            <button onClick={handleCancel} type="button" style={{ marginBottom: '10px' }}
              className="text-sm font-semibold leading-6 text-gray-900 bg-red-400 hover:bg-red-200 px-6 py-2 rounded-md ">

              {t('Back')}
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style={{ marginBottom: '15px' }}
            >
              {t('Next')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default SexualHarassmentHarasser;

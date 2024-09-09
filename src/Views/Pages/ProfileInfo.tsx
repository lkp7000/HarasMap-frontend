import Layout from "../Component/Layout/Layout";
import { useState, useEffect, FormEvent, useRef, ChangeEvent } from "react";
import axios from "axios";
import { getDataAPI, surveySubmit } from "../../services/api";
import { useNavigate } from "react-router-dom";
import L from "leaflet";
import { useTranslation } from 'react-i18next';

const ProfileInfo = () => {
  const { t } = useTranslation();
  const mapRef = useRef(null);
  let marker: L.Layer | null = null;
  const cityCoordinates: { [key: string]: [number, number] } = {
    "Select your City": [18.533333, -72.333336],
    "Port-au-Prince": [18.5392, -72.335],
    "Les Cayes": [18.1906, -73.7468],
    "Port-de-Paix": [19.9389, -72.8295],
    "Cap-Haïtien": [19.7592, -72.2125],
    Jacmel: [18.2347, -72.5342],
    Gonaïves: [19.4515, -72.6812],
    Léogâne: [18.5096, -72.6318],
    Hinche: [19.1448, -72.0023],
    Miragoâne: [18.4441, -73.0887],
    Jérémie: [18.6504, -74.1163],
    "Fond Parisien": [18.4958, -71.9959],
    Thomassique: [19.0454, -71.8259],
    Verrettes: [19.0467, -72.4654],
    "Anse-à-Veau": [18.5153, -73.4602],
    "Petit-Goâve": [18.4313, -72.8628],
    Dessalines: [19.2833, -72.5],
    "Saint-Marc": [19.1082, -72.6936],
    Belladère: [18.9342, -71.9452],
    Maïssade: [19.1667, -72.0167],
    Aquin: [18.2795, -73.3989],
    "Belle-Anse": [18.2325, -72.0867],
    Thomonde: [19.0322, -71.8353],
    "Acul-du-Nord": [19.6451, -72.1789],
    Mirebalais: [18.8191, -72.1054],
    "Croix-des-Bouquets": [18.575, -72.2248],
    "Saint-Louis-du-Nord": [19.9317, -72.3447],
  };
  const [selectedCity, setSelectedCity] = useState("Select your City");
  const [, setMapPayload] = useState<[]>([]);
  const [questions, setQuestions] = useState<[]>([]);
  const [filterQuestions, setFilterQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState<any>(
    {});
  const BASE_URL = process.env.REACT_APP_MAP_KEY;
  const token = localStorage.getItem("token");
  const agentID = localStorage.getItem("agentID");
  const surveyID = localStorage.getItem("surveyID");
  const navigate = useNavigate();
  const [questionLoading, setQuestionLoading] = useState(false);

  const [formData, setFormData] = useState<any>({});
  const handleSelect = (
    e: ChangeEvent<HTMLSelectElement>,
    question: { questionID: any }
  ) => {
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
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    if (cityCoordinates[selectedCity]) {
      const [latitude, longitude] = cityCoordinates[selectedCity];
      setFormData((prev: any) => ({
        ...prev,
        latitude: String(latitude),
        longitude: String(longitude),
      }));
    }
  };
  useEffect(() => {
    if (cityCoordinates[selectedCity]) {
      const [latitude, longitude] = cityCoordinates[selectedCity];
      setFormData((prev: any) => ({
        ...prev,
        latitude: String(latitude),
        longitude: String(longitude),
      }));
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedCity) return;

    const [latitude, longitude] = cityCoordinates[selectedCity];
    const map = L.map(mapRef.current).setView([latitude, longitude], 12);
    const layer = L.tileLayer(
      "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
    map.addLayer(layer);

    const customIcon = L.icon({
      iconUrl:
        "https://www.freeiconspng.com/uploads/blue-location-icon-png-19.png",
      iconSize: [40, 40], // Adjust the size of your icon
      iconAnchor: [20, 32],
    });
    let marker: L.Layer | null = null;

    map.on("click", (event) => {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([event.latlng.lat, event.latlng.lng], {
        icon: customIcon,
      }).addTo(map);

      const { lat, lng } = event.latlng;

      const storedQuestions = localStorage.getItem("questions");
      let questionID: any = null;
      let surveyID: any = null;

      if (storedQuestions) {
        const questionsArray = JSON.parse(storedQuestions);
        console.log(questionsArray);

        const addressQuestion = questionsArray.find(
          (item: any) =>
            item.shortKey === "personal_address" &&
            item.questionGroupID.questionGroupName === "Personal"
        );

        if (addressQuestion) {
          questionID = addressQuestion.questionID;
          surveyID = addressQuestion.surveyID;
        } else {
          console.log("Address question not found in Personal group");
        }
      } else {
        console.log("No 'questions' item found in localStorage");
      }

      setSelectedQuestion((prev: any) => ({
        ...prev,
        [questionID]: {
          questionID: questionID,
          optionText: `{${lat},${lng}}`,
          agentSurveyID: surveyID,
        },
      }));
    });

    return () => {
      map.off("click");
      map.remove();
    };
  }, [selectedCity]);

  useEffect(() => {
    const response = localStorage.getItem("questions");
    if (response) {
      const parsedResponse = JSON.parse(response);
      const mappedQuestions: any = [];
      parsedResponse.filter((item: any) => {
        if (item?.questionGroupID?.questionGroupName === "Personal") {
          mappedQuestions.push(item);
        }
      });
      setQuestions(mappedQuestions);
      questionHider(mappedQuestions, selectedQuestion)
    }
  }, []);

  const fetchQuestionsAnswer = async (cancel: any) => {
    try {
      const response = await getDataAPI(token, surveyID);
      console.log("response",response);
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
    // console.log('selectedOption :>> ', selectedOption);
    let curSelected = {
      ...selectedQuestion,
      [selectedOption?.questionID]: {
        questionID: selectedOption?.questionID,
        questionOptionID: selectedOption?.questionOptionID,
        agentSurveyID: currentQuestionData?.surveyID,
        questionAnswerID: selectedQuestion?.[selectedOption?.questionID]?.questionAnswerID,
        shortKey: currentQuestionData?.shortKey,
        // optionText: selectedOption?.optionText,
        optionText: null,
      }
    }
    setSelectedQuestion(curSelected)
    // console.log('object curSelected :>> ', curSelected);
    questionHider(questions, curSelected)

  }

  const inputHandler = (e: any, selectedInput: any) => {
    // console.log('object selectedInput:>> ', selectedInput);
    let curSelected = {
      ...selectedQuestion,
      [selectedInput?.questionID]: {
        questionAnswerID:
          selectedQuestion?.[selectedInput?.questionID]?.questionAnswerID,
        questionID: selectedInput?.questionID,
        optionText: e.target.value,
        agentSurveyID: selectedInput?.surveyID,
        shortKey: selectedInput?.shortKey,
      }
    }
    setSelectedQuestion(curSelected)
    questionHider(questions, curSelected)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    debugger
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
            selectedQuestionOptionID: selectedQuestion[key]?.questionOptionID,
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
    // console.log({ payloadForAPI });
    console.log("payloadForAPIhai",payloadForAPI)
    try {
      // debugger
      const response = await surveySubmit(payloadForAPI, token);
      if (response.status == 200) {
        // window.alert("Survey Submitted Successfully");
        navigate("/employment");
      } else {
        console.error("Error submitting the form:", response?.data?.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const ageConditionalCheckerNew = (currentQuestion: any, selectedQuestion: any) => {
    let result = []
    if (currentQuestion?.shortKey === 'family_ifNoWhy') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'family_childrenInSchool') {
          if (questionItem?.optionText == "yes") {
            result = currentQuestion
          }
        }
      })

    } else if (currentQuestion?.shortKey === 'personal_phonenumber') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
       
        if (questionItem?.shortKey == 'NUM') {
          if (questionItem?.optionText == 'No') {
            result = []
          } else {
            result = currentQuestion
          }
        }
      })
    }

    else {
      result = currentQuestion
    }
    return result
  }

  useEffect(() => {
  }, []);
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
    if (currentQuestion?.shortKey === 'family_ifNoWhy') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'family_childrenInSchool') {
          if (questionItem?.optionText == "yes") {
            result = true
          }
        }
      })

    } else if (currentQuestion?.shortKey === 'personal_phonenumber') {
      selectedQuestion && Object?.entries(selectedQuestion)?.map(([questionId, questionItem]: any) => {
        if (questionItem?.shortKey == 'NUM') {
          if (questionItem?.optionText == 'Yes') {
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
    return result;
  };

  return (
    <Layout>
      <div style={{ height: "620px", overflow: "auto" }}>
        <h5 className="bg-[#fa9859] font-semibold flex items-center justify-between font-sans text-2xl p-2">
          <span className="text-sm">Survey ID = {surveyID}</span>
          <span className="text-center block mx-auto">{t('Profile Info')}</span>
        </h5>

        <form className="w-full" onSubmit={handleSubmit}>
          {questionLoading ? (
            <div className="flex justify-center items-center h-screen">
              <img
                src={"images/spinner.png"}
                className="animate-spin w-12 h-12"
              />
            </div>
          ) : (
            filterQuestions.map((question: any, index: number) => (
              <div key={question.questionID}>
                {
                  <div>
                    <fieldset className="border-2 border-gray-300 p-3 mr-4 bg-gray-100">
                      <legend className="text-xs sm:text-lg font-semibold leading-6 text-gray-900">
                        {` ${index + 1}. ${question?.questionText}`}
                      </legend>
                      <div className="mt-2 space-y-2">
                        {question?.questionID === 80 ? (
                          <select
                            value={
                              selectedQuestion[question?.questionID]
                                ?.questionOptionID || ""
                            }
                            onChange={(e) => handleSelect(e, question)}
                            className="border-1 border-neutral-600 text-black-600 focus:ring-black focus:border-black-600 w-[30%] p-1 sm:max-w-sm"
                          >
                            <option value="">{t('Select an option')}</option>
                            {question?.questionOptionsID?.map((option: any) => (
                              <option
                                key={option?.questionOptionID}
                                value={option?.questionOptionID}
                              >
                                {option?.optionText}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <>
                            {question?.questionOptionsID.map((option: any) => (
                              <div
                                className="flex items-center gap-x-3"
                                key={option?.questionOptionID}
                              >
                                {/* <>{console.log('option :>> ', option)}</> */}
                                <input
                                  id={option?.questionOptionID}
                                  type="radio"
                                  className="w-3 h-3 text-black-600 border-2 border-black-600 focus:ring-black checked:border-black checked:bg-black focus:outline-none focus:border-black-600"
                                  checked={
                                    selectedQuestion[option?.questionID]
                                      ?.questionOptionID ===
                                    option?.questionOptionID
                                  }
                                  onChange={(e) =>
                                    optionHandler(e, option, question)
                                  }
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
                        {question?.questionOptionsID?.length === 0 && question?.questionID !== 81 && (
                          <input
                            id={question?.questionID}
                            name={question?.questionText}
                            type="text"
                            className="border-1 border-neutral-600 text-black-600 focus:ring-black focus:border-black-600 w-[30%] p-1 sm:max-w-sm"
                            value={
                              selectedQuestion[question?.questionID]?.questionOptionID
                                ? selectedQuestion[question?.questionID]?.questionOptionID
                                : selectedQuestion[question?.questionID]?.optionText
                            }
                            onChange={(e) => inputHandler(e, question)}
                          />
                        )}
                      </div>
                    </fieldset>
                    {index !== questions.length - 1 && <hr className="my-4 border-t border-gray-300" />}
                  </div>
                }  </div>
            ))
          )}
          <div className="mb-6 ">
            <br />
            <select
              id="city"
              name="city"
              defaultValue={"Port-au-Prince"}
              value={selectedCity || "Port-au-Prince"}
              onChange={handleCityChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[98.5%] pl-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            >
              {Object.keys(cityCoordinates).map((city) => (
                <option key={city} value={city}>
                  {t(city)}
                </option>
              ))}
            </select>
          </div>

          {/* Map display */}
          <div
            id="map"
            style={{ height: "400px", width: "98%", zIndex: "40" }}
            ref={mapRef}
          ></div>

          {/* Next button */}
          <div
            className="mt-4 flex justify-end pt-4 px-4"
            style={{ marginTop: "auto", marginBottom: "15px" }}
          >
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style={{ marginBottom: "10px" }}
            >
              {t('Next')}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default ProfileInfo;

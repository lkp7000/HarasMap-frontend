import React, { useState } from "react";
import axios from "axios";
import AgentDashBoardLayout from "./AgentDashboardLayout";
import { useNavigate } from "react-router-dom";
//import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const AgentDashboard: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_MAP_KEY;
  const token = localStorage.getItem("token");
  const agentID = localStorage.getItem("agentID");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleApi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true); 
      setQuestionLoading(true);
      const apiUrl = `${BASE_URL}/api/v1/survey/getallquestions/${agentID}`;
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      if (response.data && Array.isArray(response.data)) {
        localStorage.setItem("questions", JSON.stringify(response.data));
        const mappedQuestions = response.data.map((item: any) => item);
        localStorage.setItem("surveyID", mappedQuestions[0]?.surveyID);
        setQuestions(mappedQuestions);
        setLoading(false); // Set loading to false after receiving the response
        navigate("/ProfileInfo");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setQuestionLoading(false);
    }
  };

  return (
    <>
      <AgentDashBoardLayout>
        <section style={{ height: "620px" }} className="bg-[#e2e8f0]  w-full">
          <div className="max-w-screen-xl lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-4xl font-extrabold sm:text-6xl">
                {t('Welcome to Agent')}
                <strong className="font-extrabold text-red-700 sm:block">
                  {t('DashBoard')}
                </strong>
              </h1>
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-bold font-bold py-6 px-16 rounded-full text-xl text-white"
                onClick={handleApi}
                disabled={loading} 
              >
                {t('Start Survey')}{'      '} {/* Adding space here */}
                {loading && <CircularProgress color='inherit' thickness={8} size={20} />}
              </button>


            </div>
          </div>
        </section>
      </AgentDashBoardLayout>
    </>
  );
};

export default AgentDashboard;

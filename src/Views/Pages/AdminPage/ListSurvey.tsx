import React, { useEffect, useState } from "react";
import { getAllAgentList, getAllSurvey, getAllSurveyByAgentID } from "../../../services/api";
import AdminDashBoardLayout from "../AdminDashboard/AdminDashBoardLayout";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useTranslation } from 'react-i18next';



interface Agent {
  agentID: number;
  agentName: string;
  email: string;
  password: string;
  role: string;
}
interface Survey {
  id: number;
  userName: string;
  email: string;
  // Add more properties as needed
}

const ListSurvey: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<any>("");
  const [agentNames, setAgentNames] = useState<any>([{}]);
  const [currentPage, setCurrentPage] = useState(0); // Current page
  const [itemsPerPage] = useState(10); // Number of items per page
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Initialize navigate
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response: any = await getAllAgentList(token);
        const AgentName: Agent[] = response.data;

        const list: [] = response?.data?.map((val: any) => {
          return ({
            label: val?.agentName,
            value: val?.agentID
          })
        })

        setAgentNames(list);

        const surveysResponse: any = await getAllSurvey(token);
        const fetchedSurveys: any = surveysResponse.data;
        setUsers(fetchedSurveys?.listAgentSurveyDTOS);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false if there's an error
        console.error('Error fetching agent names from the API:', error);
      }
    };

    fetchData();
  }, [token]);

  // const handleAgentChange = async (selectedAgent: any) => {
  //   setSelectedAgent(selectedAgent);
  //   try {
  //     setLoading(true); // Set loading to true before fetching data
  //     const surveysResponse: any = await getAllSurveyByAgentID(selectedAgent, token);
  //     const fetchedSurveys: any = surveysResponse.data;
  //     setUsers(fetchedSurveys?.listAgentSurveyDTOS);
  //     setLoading(false); // Set loading to false after data is fetched
  //   } catch (error) {
  //     setLoading(false); // Set loading to false if there's an error
  //     console.error('Error fetching data for the selected agent from the API:', error);
  //   }
  // };

  const handleAgentChange = async (selectedAgent: any) => {
    setSelectedAgent(selectedAgent);
    try {
      setLoading(true); // Set loading to true before fetching data
      if (selectedAgent === "") {
         const surveysResponse: any = await getAllSurvey(token);
        const fetchedSurveys: any = surveysResponse.data;
        setUsers(fetchedSurveys?.listAgentSurveyDTOS);
      } else {
        // Otherwise, fetch surveys by agent ID
        const surveysResponse: any = await getAllSurveyByAgentID(selectedAgent, token);
        const fetchedSurveys: any = surveysResponse.data;
        setUsers(fetchedSurveys?.listAgentSurveyDTOS);
      }
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setLoading(false); // Set loading to false if there's an error
      console.error('Error fetching data for the selected agent from the API:', error);
    }
  };
  

  const handleSelect = (agentSurveyId: number) => {
    localStorage.setItem('agentsurveyId', String(agentSurveyId));
    navigate(`/ViewQuestionAnswer/${agentSurveyId}`);
  };

  const pageCount = Math.ceil(users.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount - 1));
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, users.length);
  const currentPageData = users.slice(startIndex, endIndex);

  return (
    <>
      <AdminDashBoardLayout>
        <div className="w-full border-collapse border border-gray-300 my-5 shadow-lg px-8 py-4 rounded-lg">
          <div className="flex justify-between font-bold text-red-800">
            <p>{t('Total User')}: {users.length}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="agentNameDropdown" className="mr-2">
              {t('Select Agent Name:')}
            </label>
            <select
              id="agentNameDropdown"
              onChange={(e) => handleAgentChange(e.target.value)}
              value={selectedAgent}
            >
              <option value="">{t('All Agents')}</option>
              {agentNames?.map((val: any, index: number) => (
                <option key={val?.value} value={val?.value}>
                  {val?.label}
                </option>
              ))}
            </select>
          </div>
          <table className="w-full border-collapse border border-gray-300 my-4 shadow-lg">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2" style={{ width: '20%' }}>{t('User ID')}</th>
                <th className="border border-gray-300 p-2" style={{ width: '20%' }}>{t('Agent Name')}</th>
                <th className="border border-gray-300 p-2" style={{ width: '20%' }}>{t('Agent Survey ID')}</th>
                <th className="border border-gray-300 p-2" style={{ width: '20%' }}>{t('Date')}</th>
                <th className="border border-gray-300 p-2" style={{ width: '20%' }}>{('Action')}</th>
              </tr>
            </thead>



            <tbody>

              {currentPageData?.map((item: any) => (
                <tr key={item?.agentId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2 text-center">{item?.agentId}</td>
                  <td className="border border-gray-300 p-2 text-center">{item?.agentName}</td>
                  <td className="border border-gray-300 p-2 text-center">{item?.agentSurveyId}</td>
                  <td className="border border-gray-300 p-2 text-center">{item?.date}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      onClick={() => handleSelect(item?.agentSurveyId)}
                      className="border border-blue-500 mt-2 display: 'flex', justifyContent: 'center' text-center cursor-pointer bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                    >
                      {t('Select')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            {loading && <CircularProgress color="inherit" thickness={7} size={32} />} {/* Conditional rendering of CircularProgress */}
          </div>          <div className="flex justify-center mt-4">
            <button onClick={prevPage} disabled={currentPage === 0} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l">
              {t('Previous')}
            </button>
            <button onClick={nextPage} disabled={currentPage === pageCount - 1} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r">
              {t('Next')}
            </button>
          </div>
        </div>
      </AdminDashBoardLayout>
    </>
  );
};

export default ListSurvey;

import axios from 'axios';
import { AnyCnameRecord } from 'dns';
const BASE_URL = process.env.REACT_APP_MAP_KEY;
export const login = async (email: any, password: any) => {
    try {
        const response = await axios.post(`${BASE_URL}${"/api/v1/login/authenticate"}`, { username: email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addAgent = async (formData: any, token: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/v1/api/addagent`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        throw error;
    }
};



export const addnews = async (formData: FormData, token: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/News/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const newsview = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/News/all`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const deleteAgent = async (agentid: any, token: any) => {
    try {
        const response = await axios.delete(`${BASE_URL}/v1/api/deleteagent/${agentid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting agent with ID ${agentid}:`, error);
        throw error;
    }
};

export const surveySubmit = async (formData: any, token: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/survey/submitanswers`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;

    } catch (error) {
        throw error;
    }
};

export const getMapDataAPI = async (token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/survey/getallanswers`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const getDataAPI = async (token: any, agentsurveyID: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/survey/getanswer/${agentsurveyID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        throw error;
    }
};

export const getallquestions = async (token: any, agentid: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/survey/getallquestions/${agentid}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        if (response && Array.isArray(response.data)) {
            localStorage.setItem('questions', JSON.stringify(response.data));
        }
        return response;
    } catch (error) {
        throw error;
    }
};

export const createViolence = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/v1/api/domestic/createViolence`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
};

export const Intervention = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/intervention/intervention`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
};

export const addorganisation = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/helpcenter/addorganisation`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
};


export const filterVariousApi = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/filter/filterAllByVariousSelections`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
};



export const getallMapData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/filter/getalldata`, {
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

//////contact form api//////


export const getcontact = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/contactus/getcontact`, {
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const addcontact = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/contactus/addcontact`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};














export const getallChartDataByYear = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/Chart/getAllByYear`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getallChartDataByMonth = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/Chart/getAllByMonth`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};



export const updateAgent = async (agentid: any, token: any, formData: any) => {
    try {
        const response = await axios.put(`${BASE_URL}/v1/api/updateagent/${agentid}`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getAgentByID = async (token: any, param: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/getAgent/${param}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getallagent = async (token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/getallagent`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getallChartDataByWeek = async (payload?: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/Chart/getAllByDay`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getallTableData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/filter/getalltabledata`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};
export const getAllSurveyByAgentID = async (agentId: any, token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/getAllSurveyByAgentID/${agentId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllQuestionsAnswer = async (agentsurveyID: any, token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/survey/getAllQuestionsAnswer/${agentsurveyID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const AllQuestionsAnswer = async (agentsurveyID: any, token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/survey/getAllQuestionsAnswer/${agentsurveyID}`, {
            params: { agentsurveyID },

            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};



export const getAllAgentList = async (token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/getAllAgentList`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllSurvey = async (token: any) => {
    try {
        const response = await axios.get(`${BASE_URL}/v1/api/getAllSurvey`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};



export const getFilterByDomesticDate = async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/filter/filterbydomesticdate`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const getFilterByDate = async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/filter/filtertablebydate`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};



export const getFilterCharts = async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/v1/api/Chart/chartfilter`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const filterhelpcenterbytype = async (payload: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/v1/helpcenter/filterhelpcenterbytype`, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};


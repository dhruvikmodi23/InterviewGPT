import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/interviews';

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    return { 'Authorization': 'Bearer ' + user.token };
  } else {
    return {};
  }
};

export const startInterview = async () => {
  const response = await axios.post(`${API_URL}/start`, {}, {
    headers: authHeader()
  });
  return response.data;
};

export const submitInterview = async (interviewId, code, language, audioData) => {
  const response = await axios.post(`${API_URL}/submit`, {
    interviewId,
    code,
    language,
    audioData
  }, {
    headers: authHeader()
  });
  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await axios.get(`${API_URL}/history`, {
    headers: authHeader()
  });
  return response.data;
};

export const getInterview = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: authHeader()
  });
  return response.data;
};
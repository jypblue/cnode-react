import axios from '@/http.js';

export const getTopics = (params) => {
  return axios.get(`/topics`, { params });
};

export const getTopicById = (id, params) => {
  return axios.get(`/topic/${id}`, { params });
};

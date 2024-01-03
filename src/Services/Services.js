import axios from "axios";

const api_URL = "http://localhost:4300"; 


export const addTaskk = async (body) => {
  console.log(body);
  return await axios.post(api_URL+"/tasks", body);
};

export const getTask = async () => {
  return await axios.get(api_URL+"/tasks");
};

export const deleteTask =  (id) => {
  console.log('delete' , id);
  return  axios.delete(api_URL + "/tasks/" + id);
};




export const createUser = async (body) => {
  return await axios.post(api_URL+"/contacts", body);
};
export const getUser = async () => {
  return await axios.get(api_URL+"/contacts");
};
import axios from "axios";

export const getUserData = async () => {
  const response = await axios.get(`/api/user`);
  return response;
};


export const fetchCreateTrip = async (tripData: any) => {
  const response = await axios.post(`/api/create-trip`, tripData);
  return response;
}
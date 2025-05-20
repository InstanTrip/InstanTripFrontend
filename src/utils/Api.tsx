import axios from "axios";

export const getUserData = async () => {
  const response = await axios.get(`/api/user`);
  return response;
};

export const fetchCreateTrip = async (tripData: any) => {
  const response = await axios.post(`/api/create-trip`, tripData);
  return response;
}

export const fetchTripList = async () => {
  const response = await axios.get(`/api/trip-list`);
  return response;
}

export const rmTrip = async (tripId: string) => {
  const response = await axios.post(`/api/delete-trip`, { id: tripId });
  return response;
}

export const logout = async () => {
  const response = await axios.get(`/back/logout`);
  return response;
}
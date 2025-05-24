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



export const getLocationData = async (loc_list: any[]) => {
  const response = await axios.post(`/pyapi/get-location-data`, { ids: loc_list });
  return response;
}

export const searchLocation = async (lat: number, lon: number, location: string, keyword: string) => {
  if (keyword.length < 2) {
    return [];
  }
  const response = await axios.post(`/pyapi/search-location`, { lat: lat, lon: lon, location: location, query: keyword });
  return response.data;
}
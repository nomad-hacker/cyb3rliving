import axios from "axios";

export const getPlaceDetails = async (placeId: string) => {
  const axiosResponse = await axios.get(
    "/api/place/details?place_id=" + placeId
  );

  if (axiosResponse.status !== 200) {
    throw new Error(axiosResponse.statusText);
  }

  const result = axiosResponse.data.data.result;
  return {
    address: result.formatted_address,
    coordinates: result.geometry.location,
  };
};

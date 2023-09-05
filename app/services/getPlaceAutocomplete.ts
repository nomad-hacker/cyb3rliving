import axios from "axios";

export const getPlaceAutocomplete = async (search: string) => {
  const axiosResponse = await axios.get(
    "/api/place/autocomplete?input=" + search
  );

  if (axiosResponse.status !== 200) {
    throw new Error(axiosResponse.statusText);
  }

  return axiosResponse.data.data.predictions.map((prediction: any) => ({
    name: prediction.description,
    id: prediction.place_id,
  }));
};

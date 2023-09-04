import axios from "axios";

export const uploadImage = async (imageData: string) => {
  const axiosResponse = await axios.post("/api/images", {
    imageData,
  });
  return axiosResponse.data.url as string;
};

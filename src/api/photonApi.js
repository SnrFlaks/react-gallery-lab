import axios from "axios";

export const fetchPhotos = async (page, limit) => {
  const response = await axios.get(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );
  return response.data;
};

import axios from 'axios';

const API_KEY = '39289578-81c44a31b0c9c16ae76a18111';
const API_BASE_URL = 'https://pixabay.com/api/';
const pageLimit = 12;

export const fetchPhoto = async (search, numberPage) => {
  const { data } = await axios.get(API_BASE_URL, {
    method: 'get',
    params: {
      key: API_KEY,
      q: search,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: pageLimit,
      page: numberPage,
    },
  });
  return data;
};
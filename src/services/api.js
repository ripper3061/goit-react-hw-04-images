import axios from 'axios';

const API_KEY = '29990970-06612ee6e4c4cb458b77f15de';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImagesByName = async (searchQuery, page = 1) => {
  const response = await axios.get('', {
    params: {
      q: searchQuery,
      page: page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response.data;
};

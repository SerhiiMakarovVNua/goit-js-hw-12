import axios from 'axios';

const API_KEY = '45301554-42ab9bd7e2b914874aa400849';
const BASE_URL = 'https://pixabay.com/api/';

export async function searchImages(searchField, perPage, page) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchField,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page: page,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${urlParams}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return { hits: [], totalHits: 0 };
  }
}

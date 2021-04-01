const axios = require('axios');

const pixabayService = {
  BASIC_URL: 'https://pixabay.com/api/',
  SECRET_KEY: 'FGHJDFG3434',
  async get() {
    const { data } = await axios.get(
      `${BASIC_URL}?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=${SECRET_KEY}`,
    );
    return data;
  },
};

export default pixabayService;

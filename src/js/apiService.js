const axios = require('axios');

const pixabayService = {
  BASIC_URL: 'https://pixabay.com/api/',
  SECRET_KEY: '20959957-b9492bab45f9d57ca357dcb04',
  pageNumber: 1,
  perPage: 12,
  async get(item) {
    const { data } = await axios.get(
      `${this.BASIC_URL}?image_type=photo&orientation=horizontal&q=${item}&page=${this.pageNumber}&per_page=${this.perPage}&key=${this.SECRET_KEY}`,
    );
    console.log(data);
    return data;
  },
};

export default pixabayService;

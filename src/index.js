import './styles.css';
import pixabayService from './js/apiService.js';

const photos = pixabayService.get();
photos.then(result => {});

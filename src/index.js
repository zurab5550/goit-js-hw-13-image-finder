import './styles.css';
import pixabayService from './js/apiService.js';
import cardPhoto from './templates/photo.hbs';

export const refs = {
  ulGallery: document.querySelector('.gallery'),
  searchButton: document.querySelector('#search-form-button'),
  loadMoreButton: document.querySelector('.load-more'),
  searchForm: document.querySelector('#search-form'),
  searchFormInput: document.querySelector('[name=query]'),
};

refs.searchForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const photos = await pixabayService.get(refs.searchFormInput.value);
  refs.ulGallery.innerHTML = cardPhoto(photos.hits);
  refs.loadMoreButton.classList.remove('d-none');
  formGalleryCleaner();
});

refs.loadMoreButton.addEventListener('click', loadMore);

async function loadMore(e) {
  e.preventDefault();
  pixabayService.pageNumber++;
  const lastVisiblePhoto = document.querySelector('.photo-card:last-child');
  const scrollValue =
    lastVisiblePhoto.offsetTop + lastVisiblePhoto.clientHeight + 20;
  const photos = await pixabayService.get(refs.searchFormInput.value);
  refs.ulGallery.insertAdjacentHTML('beforeend', cardPhoto(photos.hits));
  window.scrollTo({
    top: scrollValue,
    behavior: 'smooth',
  });
}

export function formGalleryCleaner() {
  refs.searchForm.reset();
}

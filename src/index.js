import './styles.css';
import pixabayService from './js/apiService.js';
import cardPhoto from './templates/photo.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

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
  const lastVisiblePhoto = document.querySelector(
    '.list-photo-card:last-child',
  );
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

refs.ulGallery.addEventListener('click', function (e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  if (e.target.dataset.largeimage) {
    const instance = basicLightbox.create(`
        <img src="${e.target.dataset.largeimage}" width="800" height="600">
    `);

    instance.show();
  }
});

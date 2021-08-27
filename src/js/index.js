import photoCardTpl from '../templates/photo-card.hbs';
import PhotosApiService from './apiService';

import * as basicLightbox from 'basiclightbox';

const refs = {
  searchFormElt: document.querySelector('#search-form'),
  loadMoreButtonElt: document.querySelector('#load-more-button'),
  galleryElt: document.querySelector('.gallery'),
};

const photosApiService = new PhotosApiService();

refs.searchFormElt.addEventListener('submit', onSearch);
refs.loadMoreButtonElt.addEventListener('click', fetchCards);
refs.galleryElt.addEventListener('click', viewImage);

function onSearch(e) {
  e.preventDefault();
  const queryValue = e.currentTarget.elements.query.value.trim();

  if (queryValue === '') {
    return alert('life is shit');
  }

  photosApiService.query = queryValue;
  photosApiService.page = 1;
  refs.loadMoreButtonElt.classList.remove('is-hidden');

  removePhotoCardMarkup();
  fetchCards();
}

// function onLoadMore(e) {}

function fetchCards() {
  refs.loadMoreButtonElt.disabled = true;
  refs.loadMoreButtonElt.textContent = 'Loading...';

  photosApiService.fetchPhotos().then(card => {
    createPhotoCardMarkup(card);
    refs.loadMoreButtonElt.disabled = false;
    refs.loadMoreButtonElt.textContent = 'Load more';
    scrollOnLoadMoreButton();
  });
}

function createPhotoCardMarkup(hits) {
  refs.galleryElt.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}

function removePhotoCardMarkup() {
  refs.galleryElt.innerHTML = '';
}

function scrollOnLoadMoreButton() {
  refs.loadMoreButtonElt.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function viewImage(e) {
  const targetImage = e.target;
  //   console.dir(targetImage);
  if (targetImage.classList.contains('image')) {
    const instance = basicLightbox.create(
      `<img src="${targetImage.dataset.source}" alt="${targetImage.alt}" class="image"/>`,
    );
    instance.show();
  }
}

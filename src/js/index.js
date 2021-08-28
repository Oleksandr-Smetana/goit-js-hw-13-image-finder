import photoCardTpl from '../templates/photo-card.hbs';
import PhotosApiService from './api-service';
import refs from './refs';

// plugins import
import viewPhoto from './view-photo';
import scrollOnLoadMoreButton from './scroll-on';

// pnotify import
import { success, notice, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const photosApiService = new PhotosApiService();

refs.searchFormElt.addEventListener('submit', onSearch);
refs.loadMoreButtonElt.addEventListener('click', fetchCards);
refs.galleryElt.addEventListener('click', viewPhoto);

function onSearch(e) {
  e.preventDefault();
  const queryValue = e.currentTarget.elements.query.value.trim();
  photosApiService.page = 1;
  photosApiService.query = queryValue;
  removePhotoCardMarkup();

  if (queryValue === '') {
    removeLoadMoreButton();
    return notice({
      text: 'Please, enter your request!',
      delay: 2000,
    });
  } else {
    fetchCards();
    // console.log(fetchCards);
  }
}

// fetch data
function fetchCards() {
  refs.loadMoreButtonElt.disabled = true;
  refs.loadMoreButtonElt.textContent = 'Loading...';

  photosApiService
    .fetchPhotos()
    .then(cards => {
      // console.log(cards);
      if (cards.hits.length === 0) {
        removeLoadMoreButton();
        return error({
          text: 'Please, enter more specific request!',
          delay: 2000,
        });
      }
      if (cards.hits.length === 10) {
        createPhotoCardMarkup(cards.hits);
        addLoadMoreButton();
        scrollOnLoadMoreButton();
        refs.loadMoreButtonElt.disabled = false;
        refs.loadMoreButtonElt.textContent = 'Load more';
      }
      if (cards.hits.length > 0 && cards.hits.length < 10) {
        createPhotoCardMarkup(cards.hits);
        scrollOnLoadMoreButton();
        removeLoadMoreButton();

        success({
          text: 'All photos were downloaded.',
          delay: 2000,
        });
      }
    })
    .catch(error => console.log(error));
}

function createPhotoCardMarkup(hits) {
  refs.galleryElt.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}

function removePhotoCardMarkup() {
  refs.galleryElt.innerHTML = '';
}

function addLoadMoreButton() {
  refs.loadMoreButtonElt.classList.remove('is-hidden');
}

function removeLoadMoreButton() {
  refs.loadMoreButtonElt.classList.add('is-hidden');
}

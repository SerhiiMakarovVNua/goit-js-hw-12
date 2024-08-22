import { searchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');
let lightbox = new SimpleLightbox('.gallery a');
let page = 1;
const perPage = 15;
let searchField = '';
let totalHits = 0;
let totalPages = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchField = form.querySelector('.search-input').value.trim();
  
  if (searchField === '') {
    return;
  }
  
  gallery.innerHTML = '';
  page = 1;
  loader.classList.remove('is-hidden');
  loadMoreButton.classList.add('is-hidden'); 

  try {
    const response = await searchImages(searchField, perPage, page);
    const images = response.hits;
    totalHits = response.totalHits;
    totalPages = Math.ceil(totalHits / perPage);
    
    if (totalHits === 0) {
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        titleColor: '#fff',
        messageColor: '#fff',
        color: '#ef4040',
        icon: null
      });
    } else {
      renderGallery(images);
      lightbox.refresh();
      page += 1;
      loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      titleColor: '#fff',
      messageColor: '#fff',
      color: '#ef4040',
      icon: null
    });
  } finally {
    form.reset();
    loader.classList.add('is-hidden');
  }
});

loadMoreButton.addEventListener('click', async () => {
  if (page >= totalPages) {
    loadMoreButton.classList.add('is-hidden');
    iziToast.info({
      title: 'Info',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomRight',
      titleColor: '#fff',
      messageColor: '#fff',
      color: '#2196F3',
      icon: null
    });
  }

  loader.classList.remove('is-hidden');

  try {
    const response = await searchImages(searchField, perPage, page);
    const images = response.hits;
    renderGallery(images);
    lightbox.refresh();
    page += 1; 
 
    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth'
    });

  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      titleColor: '#fff',
      messageColor: '#fff',
      color: '#ef4040',
      icon: null
    });
  } finally {
      loader.classList.add('is-hidden');
  }
});

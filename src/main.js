import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const inputElText = getInputText();
  if (inputElText === '') {
    return;
  }
  galleryEl.innerHTML = '';
  loader.style.display = 'inline-block';

  fetchImg(inputElText)
    .then(images => renderImg(images))
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
    });
  e.target.reset();
}

function getInputText() {
  return document.querySelector('input').value.trim();
}

function fetchImg(inputElText) {
  const searchParams = new URLSearchParams({
    key: '42110229-d56f9063956695e15527c98fc',
    q: inputElText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderImg(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FAFAFB',
      messageSize: '16px',
      messageLineHeight: '24px',
      backgroundColor: '#B51B1B',
      color: '#FAFAFB',
      position: 'topRight',
    });
  } else {
    const galleryMarkup = images.hits
      .map(
        image =>
          `<li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          src="${image.webformatURL}"
              alt="${image.tags}"
        />
      </a>
      <div class="img-info">
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
      </div>
      </li>`
      )
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

    let lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionDelay: 250,
      captionsData: 'alt',
    });
    lightbox.refresh();
  }
  loader.style.display = 'none';
}

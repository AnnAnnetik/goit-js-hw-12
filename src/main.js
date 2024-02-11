// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const formEl = document.querySelector('.form');
// const galleryEl = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');
// loader.style.display = 'none';
// let lightbox = new SimpleLightbox('.gallery a', {
//   captions: true,
//   captionDelay: 250,
//   captionsData: 'alt',
// });

// formEl.addEventListener('submit', onSubmitForm);

// async function onSubmitForm(e) {
//   e.preventDefault();

//   const inputElText = getInputText();
//   if (!inputElText) return;

//   galleryEl.innerHTML = '';
//   loader.style.display = 'inline-block';

//   fetchImg(inputElText)
//     .then(images => renderImg(images))
//     .catch(error => {
//       console.log(error);
//       loader.style.display = 'none';
//     });
//   e.target.reset();
// }

// function getInputText() {
//   return document.querySelector('input').value.trim();
// }

// function fetchImg(inputElText) {
//   const searchParams = new URLSearchParams({
//     key: '42110229-d56f9063956695e15527c98fc',
//     q: inputElText,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: 'true',
//   });
//   return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function renderImg(images) {
//   if (images.hits.length === 0) {
//     iziToast.show({
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       messageColor: '#FAFAFB',
//       messageSize: '16px',
//       messageLineHeight: '24px',
//       backgroundColor: '#B51B1B',
//       color: '#FAFAFB',
//       position: 'topRight',
//     });
//   } else {
//     const galleryMarkup = images.hits
//       .map(
//         image =>
//           `<li class="gallery-item">
//       <a class="gallery-link" href="${image.largeImageURL}">
//         <img
//           class="gallery-image"
//           src="${image.webformatURL}"
//               alt="${image.tags}"
//         />
//       </a>
//       <div class="img-info">
//       <p>Likes: ${image.likes}</p>
//       <p>Views: ${image.views}</p>
//       <p>Comments: ${image.comments}</p>
//       <p>Downloads: ${image.downloads}</p>
//       </div>
//       </li>`
//       )
//       .join('');

//     galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

//     lightbox.refresh();
//   }
//   loader.style.display = 'none';
// }

// ===============================================
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.form');
const galleryEl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');
let currentPage = 1;
let searchQuery = '';
let totalHits = 0;
let cardHeight = 0;

loader.style.display = 'none';
loadMoreBtn.style.display = 'none';

formEl.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmitForm(e) {
  e.preventDefault();
  searchQuery = getInputText();
  if (searchQuery === '') {
    return;
  }
  galleryEl.innerHTML = '';
  loader.style.display = 'inline-block';
  currentPage = 1;
  await fetchAndRenderImages();
  loadMoreBtn.style.display = 'inline-block';
}

function getInputText() {
  return document.querySelector('input').value.trim();
}

async function fetchAndRenderImages() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '42110229-d56f9063956695e15527c98fc',
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: 15,
      },
    });
    totalHits = response.data.totalHits;
    renderImages(response.data.hits);
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Failed to fetch images. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
}

function renderImages(images) {
  if (images.length === 0) {
    iziToast.warning({
      message: 'No images found. Please try a different search query.',
    });
    loadMoreBtn.style.display = 'none';
    return;
  }

  const galleryMarkup = images.hits
    .map(
      image =>
        `<li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
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

  currentPage++;

  if (cardHeight === 0) {
    const firstCard = document.querySelector('.gallery-item');
    const cardRect = firstCard.getBoundingClientRect();
    cardHeight = cardRect.height;
  }

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (totalHits <= galleryEl.children.length) {
    loadMoreBtn.style.display = 'none';
    endMessage.style.display = 'block';
  }
}

async function onLoadMore() {
  loader.style.display = 'inline-block';
  await fetchAndRenderImages();
}

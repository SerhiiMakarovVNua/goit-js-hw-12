export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map((hits) =>
      `<a class="gallery-item" href="${hits.largeImageURL}">
        <img class="gallery-image" src="${hits.webformatURL}" alt="${hits.tags}" title="${hits.tags}" width="360" />
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${hits.likes}</p>
          <p class="info-item"><b>Views:</b> ${hits.views}</p>
          <p class="info-item"><b>Comments:</b> ${hits.comments}</p>
          <p class="info-item"><b>Downloads:</b> ${hits.downloads}</p>
        </div>
      </a>`)
    .join('');
   gallery.insertAdjacentHTML('beforeend', markup);
}
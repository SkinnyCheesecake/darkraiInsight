document.addEventListener('DOMContentLoaded', () => {
    createGallery();
})

function createGallery() {
    const galleryField = document.querySelector('.gallery__hero--container');
    const TOTAL_IMAGES = 43;
    for(let i = 1; i <= TOTAL_IMAGES; i++) {
        const image = document.createElement('IMG');
        image.loading = "lazy";
        image.classList.add('image');
        image.src = `src/imgs/${i}.png`;
        image.alt = `Image ${i}`;
        galleryField.appendChild(image);

        image.onclick = function () {
            fullImage(i);
        };
    }
}

function fullImage(i) {
    // BUG FIX: a fast double click used to append a second modal on top of the
    // first one, and closeModal() then removed the wrong (first) overlay.
    // Only allow one modal to exist at a time.
    if (document.querySelector('.modal')) return;

    const image = document.createElement('IMG');
    image.classList.add('full-image');
    image.src = `src/imgs/${i}.png`;
    const modal = document.createElement('DIV');
    const body = document.querySelector('body');
    const close = document.createElement('P');
    close.classList.add('close');
    close.textContent = 'X';
    modal.classList.add('modal');
    body.classList.add('overflow-hidden');

    body.appendChild(modal);
    modal.appendChild(image);
    modal.appendChild(close);

    modal.onclick = closeModal;
}

function closeModal(event) {
    // BUG FIX: always close the modal that received the click instead of the
    // first `.modal`/`.close` found in the document. This keeps the overlay and
    // the `overflow-hidden` class on <body> in sync, so the page is scrollable
    // again after closing. The close button lives inside the modal, so it is
    // removed together with its parent (no separate `close.remove()` needed).
    const modal = event?.currentTarget ?? document.querySelector('.modal');
    if (!modal) return;

    const body = document.querySelector('body');
    modal.classList.add('fade-out');
    setTimeout( () => {
        modal.remove();
        body.classList.remove('overflow-hidden');
    }, 400)
}
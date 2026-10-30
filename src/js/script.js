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

function closeModal() {
    const close = document.querySelector('.close');
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    modal.classList.add('fade-out');
    setTimeout( () => {
        modal?.remove();
        body.classList.remove('overflow-hidden');
        close.remove();
    }, 400)
}
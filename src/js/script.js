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

function closeModal() {
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');
    modal.classList.add('fade-out');
    setTimeout( () => {
        modal.remove();
        body.classList.remove('overflow-hidden');
    }, 400)
}

const nameField = document.querySelector('.nameField');
const phoneField = document.querySelector('.phoneField');
const emailField = document.querySelector('.emailField');
const passwordField = document.querySelector('.passwordField');
const rpassField = document.querySelector('.rpassField');
const submitButton = document.createElement('INPUT');
const formField = document.querySelector('.form__hero');

const successAlert = document.createElement('P');
successAlert.classList.add('success');
successAlert.textContent = "Your form has been submitted successfully";

const mistakeAlert = document.createElement('P');
mistakeAlert.classList.add('mistake');
mistakeAlert.textContent = "Please fill the form as required";

const passwordAlert = document.createElement('P');
passwordAlert.classList.add('password');
passwordAlert.textContent = "Passwords do not match";


submitButton.value = "Submit your form!";
submitButton.type = 'submit';
formField.appendChild(submitButton);

const formData = {
    nameField: '',
    phoneField: '',
    emailField: '',
    passwordField: '',
    rpassField: ''
}

nameField.addEventListener('input', debugInput);
phoneField.addEventListener('input', debugInput);
emailField.addEventListener('input', debugInput);
passwordField.addEventListener('input', debugInput);
rpassField.addEventListener('input', debugInput);

formField.addEventListener('submit', submitForm);
submitButton.addEventListener('click', submitForm)

function debugInput ( event ) {
    formData[event.target.id] = event.target.value;
    console.log(formData);
}

function submitForm ( event ) {
    event.preventDefault();
    const { nameField, phoneField, emailField, passwordField, rpassField } = formData;
    if( nameField === "" || phoneField  === "" || emailField === "" || passwordField === "" || rpassField === "" || rpassField === "" ) {
        formField.appendChild(mistakeAlert);
        setTimeout( () => {
            mistakeAlert.remove();
        }, 3000)
    } else if ( passwordField !== rpassField ) {
        formField.appendChild(passwordAlert);
        setTimeout( () => {
            passwordAlert.remove();
        }, 3000)
    } else {
        formField.appendChild(successAlert);
        setTimeout( () => {
            successAlert.remove();
        }, 3000)
    }
}

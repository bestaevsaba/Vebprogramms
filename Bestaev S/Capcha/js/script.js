const rotatableImage = document.getElementById('rotatable-image');
const staticImage = document.getElementById('static-image');
const compareButton = document.getElementById('compare-button');
const refreshButton = document.getElementById('refresh-captcha');
const rotationValueDisplay = document.getElementById('rotation-value');
const loginForm = document.getElementById('login-form');

let currentRotationRotatable = getRandomRotation();
let currentRotationStatic = getRandomRotation();

rotatableImage.style.transform = `rotate(${currentRotationRotatable}deg)`;
staticImage.style.transform = `rotate(${currentRotationStatic}deg)`;

rotatableImage.addEventListener('click', () => {
    rotateImage(rotatableImage);
});

function rotateImage(image) {
    currentRotationRotatable = (currentRotationRotatable + 40) % 360;
    image.style.transform = `rotate(${currentRotationRotatable}deg)`;
    updateRotationValue();
}

function updateRotationValue() {
    rotationValueDisplay.textContent = currentRotationRotatable;
}

compareButton.addEventListener('click', () => {
    if (currentRotationRotatable === currentRotationStatic) {
        alert('Капча собрана!');
    } else {
        alert('Попробуйте еще раз.');
    }
});

refreshButton.addEventListener('click', () => {
    do {
        currentRotationRotatable = getRandomRotation();
        currentRotationStatic = getRandomRotation();
    } while (currentRotationRotatable === currentRotationStatic);
    
    rotatableImage.style.transform = `rotate(${currentRotationRotatable}deg)`;
    staticImage.style.transform = `rotate(${currentRotationStatic}deg)`;
    
    updateRotationValue();
});

function getRandomRotation() {
    return Math.floor(Math.random() * 9) * 40;
}
/*
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(`Логин: ${username}, Пароль: ${password}`);
});
*/
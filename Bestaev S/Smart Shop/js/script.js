document.addEventListener("DOMContentLoaded", function() {
    loadProfile();
    loadProducts();
});

let products = [
    { name: "Товар 1", height: 170, shoeSize: 40, preferredColor: "красный" },
    { name: "Товар 2", height: 160, shoeSize: 38, preferredColor: "синий" },
    { name: "Товар 3", height: 180, shoeSize: 42, preferredColor: "зеленый" },
    { name: "Товар 4", height: 175, shoeSize: 39, preferredColor: "желтый" },
    { name: "Товар 5", height: 165, shoeSize: 37, preferredColor: "оранжевый" },
    { name: "Товар 6", height: 185, shoeSize: 43, preferredColor: "фиолетовый" },
    { name: "Товар 7", height: 172, shoeSize: 41, preferredColor: "черный" },
    { name: "Товар 8", height: 168, shoeSize: 36, preferredColor: "белый" },
    { name: "Товар 9", height: 178, shoeSize: 44, preferredColor: "серый" },
    { name: "Товар 10", height: 162, shoeSize: 38, preferredColor: "розовый" },
    { name: "Товар 11", height: 190, shoeSize: 46, preferredColor: "сливочный" },
    { name: "Товар 12", height: 184, shoeSize: 43, preferredColor: "бирюзовый" },
];

function saveProfile() {
    const profileForm = document.getElementById("profileForm");
    const formData = new FormData(profileForm);

    const profile = {};
    formData.forEach((value, key) => {
        if (value.trim() !== "") {
            profile[key] = value.trim();
        }
    });

    localStorage.setItem("userProfile", JSON.stringify(profile));
}

function loadProfile() {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
        const profile = JSON.parse(storedProfile);

        for (const key in profile) {
            if (Object.hasOwnProperty.call(profile, key)) {
                document.getElementById(key).value = profile[key];
            }
        }
    }
}

function loadProducts() {
    const productGrid = document.getElementById("productGrid");
    
    products.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `<h3>${product.name}</h3><p>Рост: ${product.height} см<br>Размер обуви: ${product.shoeSize}<br>Цвет: ${product.preferredColor}</p>`;
    return card;
}

function filterProducts() {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        const userHeight = parseInt(profile.height, 10);
        const userShoeSize = parseInt(profile.shoeSize, 10);
        const userPreferredColor = profile.preferredColor ? profile.preferredColor.toLowerCase() : null;

        const productGrid = document.getElementById("productGrid");
        productGrid.innerHTML = "";

        const filteredProducts = products.filter(product => {
            const productColor = product.preferredColor ? product.preferredColor.toLowerCase() : null;
            return (!profile.height || product.height === userHeight) &&
                    (!profile.shoeSize || product.shoeSize === userShoeSize) &&
                    (!userPreferredColor || productColor === userPreferredColor);
        });

        filteredProducts.forEach(product => {
            const card = createProductCard(product);
            productGrid.appendChild(card);
        });
    }
}

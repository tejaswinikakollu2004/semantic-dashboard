import { fetchProducts } from "./api.js";

const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const statusMessage = document.getElementById("statusMessage");

let products = [];
let filteredProducts = [];


// ===============================
// 1. Load Products from API
// ===============================

async function loadProducts() {

    try {

        statusMessage.textContent = "Loading products...";

        products = await fetchProducts();

        filteredProducts = [...products];

        populateCategories();

        displayProducts(filteredProducts);

        statusMessage.textContent =
            `${filteredProducts.length} products found`;

        return true;

    } catch (error) {

        console.error(error);

        statusMessage.textContent =
            "Unable to load products.";

        productContainer.innerHTML = `
            <div class="error">
                <h2>Something went wrong</h2>

                <p>
                    We could not load products from the API.
                </p>

                <button onclick="location.reload()">
                    Try Again
                </button>
            </div>
        `;

        return false;
    }
}


// ===============================
// 2. Display Products
// ===============================

function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {

        productContainer.innerHTML = `
            <div class="no-results">
                <h2>No products found</h2>

                <p>
                    Try another search or category.
                </p>
            </div>
        `;

        return;
    }

    productList.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.title}"
            >

            <div class="product-info">

                <h2>${product.title}</h2>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    $${product.price.toFixed(2)}
                </p>

                <button
                    class="add-button"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });

    addCartEvents();
}


// ===============================
// 3. Create Categories
// ===============================

function populateCategories() {

    const categories = [
        ...new Set(
            products.map(product => product.category)
        )
    ];

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);
    });
}


// ===============================
// 4. Search + Category Filter
// ===============================

function filterProducts() {

    const searchTerm =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    filteredProducts = products.filter(product => {

        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    sortProducts();

    saveSearchState();

    displayProducts(filteredProducts);

    statusMessage.textContent =
        `${filteredProducts.length} products found`;
}


// ===============================
// 5. Sort Products
// ===============================

function sortProducts() {

    const sortValue = sortFilter.value;

    if (sortValue === "price-low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    } else if (sortValue === "price-high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    } else if (sortValue === "name") {

        filteredProducts.sort(
            (a, b) =>
                a.title.localeCompare(b.title)
        );
    }
}


// ===============================
// 6. Save State to localStorage
// ===============================

function saveSearchState() {

    const state = {

        search: searchInput.value,

        category: categoryFilter.value,

        sort: sortFilter.value
    };

    localStorage.setItem(
        "productExplorerState",
        JSON.stringify(state)
    );
}


// ===============================
// 7. Restore Previous State
// ===============================

function restoreSearchState() {

    const savedState =
        localStorage.getItem(
            "productExplorerState"
        );

    if (!savedState) {
        return;
    }

    const state =
        JSON.parse(savedState);

    searchInput.value =
        state.search || "";

    categoryFilter.value =
        state.category || "all";

    sortFilter.value =
        state.sort || "default";
}


// ===============================
// 8. Add Cart Events
// ===============================

function addCartEvents() {

    const buttons =
        document.querySelectorAll(".add-button");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    Number(button.dataset.id);

                addToCart(productId);
            }
        );
    });
}


// ===============================
// 9. Save Cart
// ===============================

function addToCart(productId) {

    const cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

    const existingProduct =
        cart.find(
            item => item.id === productId
        );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert("Product added to cart!");
}


// ===============================
// 10. Event Listeners
// ===============================

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

sortFilter.addEventListener(
    "change",
    filterProducts
);


// ===============================
// 11. Start Application
// ===============================

async function init() {

    const success = await loadProducts();

    if (!success) {
        return;
    }

    restoreSearchState();

    filterProducts();
}

init();

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displayCategories(json.categories));
};

const loadTreesContainer = (id) => {
  const url = `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreesContainer(data.plants));
};

const loadCategoryPlants = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTreesContainer(data.plants));

  const catBtns = document.querySelectorAll(".btn-category");
  catBtns.forEach((btn) => btn.classList.remove("active"));
  const currentBtn = document.getElementById(`cat-btn-${id}`);
  currentBtn.classList.add("active");

  document.getElementById("trees-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");
};

const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlantDetails(data.plants));
};

const displayCategories = (categories) => {
  // get the container & empty
  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";
  // get into every element
  for (let category of categories) {
    // creat element
    const ctgDiv = document.createElement("div");
    ctgDiv.innerHTML = `
    <button id="cat-btn-${category.id}" onclick = "loadCategoryPlants(${category.id})"
    class="btn btn-outline hover:text-white hover:bg-[#4fa06c] border-0 rounded-full w-full justify-center md:justify-start btn-category">
    ${category.category_name}
    </button>
`;
    // append into container
    categoriesContainer.append(ctgDiv);
  }
};

const displayTreesContainer = (trees) => {
  const treesContainer = document.getElementById("trees-container");
  treesContainer.innerHTML = "";
  trees.forEach((tree) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <img class=" max-h-[250px] w-full object-cover rounded-lg" src="${tree.image}" alt="" />
        <div class="bg-white p-5 space-y-2 rounded-lg">
          
          <h1 onclick = "loadPlantDetails(${tree.id})" class="tree-name font-bold text-xl">${tree.name}</h1>
          <p>
            ${tree.description}
          </p>
          <div class="flex justify-between items-center">
            <span class="bg-[#DCFCE7] text-[#15803D] rounded-full btn px-3 py-1">
              ${tree.category}
            </span>
            <p class="font-bold">৳<span  class="tree-price">${tree.price}</span></p>
          </div>
          <button onclick ="addToCart(this)" class="btn w-full rounded-full bg-[#15803D] text-white">
            Add to Cart
          </button>
         </div>
        </div>
    `;
    treesContainer.append(card);
  });
  document.getElementById("trees-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

const displayPlantDetails = (details) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
              <h1 class="font-bold text-xl">${details.name}</h1>
              <img class=" rounded-lg  max-h-[250px] w-full object-cover" src="${details.image}" alt="" />
              <p>
                <span class="font-bold">Category: </span><span>${details.category}</span>
              </p>
              <p>
                <span class="font-bold">Price: </span><span>৳${details.price}</span>
              </p>
              <p>
                <span class="font-bold">Description: </span>${details.description}
              </p>
  `;
  document.getElementById("my_modal_5").showModal();
};

let cart = [];
let total = 0;

const addToCart = (btn) => {
  const card = btn.parentNode;
  const treeName = card.querySelector(".tree-name").innerText;
  const treePrice = card.querySelector(".tree-price").innerText;
  const treePriceNum = Number(treePrice);
  const selectedItems = {
    treeName: treeName,
    treePrice: treePriceNum,
  };
  cart.push(selectedItems);
  total = total + treePriceNum;
  displayCart(cart);
  displayTotal(total);
};

const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val;
};

const displayCart = (carts) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  for (const cart of carts) {
    const newCart = document.createElement("div");
    newCart.innerHTML = `
    <div
            class="flex justify-between items-center bg-[#F0FDF4] p-2 rounded-lg my-2 gap-4"
          >
            <div>
              <h1 class="font-semibold tree-name">${cart.treeName}</h1>
              <p class="font-light">৳<span class="tree-price">${cart.treePrice}</span> X 1</p>
            </div>
            <button onclick="removeCart(this)" class="">❎</button>
          </div>
    `;
    cartContainer.append(newCart);
  }
};

const removeCart = (btn) => {
  const item = btn.parentNode;
  const treeName = item.querySelector(".tree-name").innerText;
  const treePrice = Number(item.querySelector(".tree-price").innerText);
  cart = cart.filter((item) => item.treeName != treeName);
  total = 0;
  cart.forEach((item) => (total += item.treePrice));
  displayCart(cart);
  displayTotal(total);
};

loadCategories();
loadTreesContainer();

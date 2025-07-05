const productData = {
  "PERFUME": [
    { name: "퍼퓸 원 (50ML)", price: 119000, image: "image/perfume/WON.png" },
    { name: "퍼퓸 테오 (50ML)", price: 119000, image: "image/perfume/TEO.png" },
    { name: "퍼퓸 엘 (50ML)", price: 119000, image: "image/perfume/EL.png" },
    { name: "퍼퓸 킴 (50ML)", price: 119000, image: "image/perfume/KIM.png" },
    { name: "퍼퓸 하니 (50ML)", price: 119000, image: "image/perfume/HANI.png" }
  ],
  "TRAVEL-SIZE PERFUME": [
    { name: "트래블 퍼퓸 1 (10ML)", price: 48000, image: "img/travel1.jpg" }
  ]
};

let cart = [];
let globalIndex = 0;

function createProductItem(name, price, image, index) {
  cart[index] = 0;
  return `
    <div class="product-item" id="item-${index}" onclick="toggleSelection(${index})">
      <img class="product-img" src="${image}" />
      <div class="product-info">
        <div class="product-name">${name}</div>
        <div class="product-price">${price.toLocaleString()} ₩</div>
      </div>
      <div class="qty-controls" id="qty-${index}"></div>
    </div>
  `;
}

function renderAllCategories() {
  const container = document.getElementById("productContainer");
  for (const category in productData) {
    container.innerHTML += `<h3 class="section-title">${category}</h3>`;
    productData[category].forEach((item, idx) => {
      const index = globalIndex++;
      container.innerHTML += createProductItem(item.name, item.price, item.image, index);
    });
  }
  updateAllQtyViews();
}

function changeQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  updateQtyView(index);
  updateTotal();
}

function updateQtyView(index) {
  const qtyEl = document.getElementById(`qty-${index}`);
  const qty = cart[index];

  if (qty > 0) {
    qtyEl.innerHTML = `
      <button onclick="changeQty(${index}, -1); event.stopPropagation()">-</button>
      <span>${qty}</span>
      <button onclick="changeQty(${index}, 1); event.stopPropagation()">+</button>
    `;
  } else {
    qtyEl.innerHTML = `
      <button onclick="changeQty(${index}, 1); event.stopPropagation()">+</button>
    `;
  }
}


function updateAllQtyViews() {
  for (let i = 0; i < cart.length; i++) {
    updateQtyView(i);
  }
}

function updateTotal() {
  let totalQty = 0;
  let totalPrice = 0;
  let i = 0;
  for (const category in productData) {
    productData[category].forEach((item) => {
      totalQty += cart[i];
      totalPrice += cart[i] * item.price;
      i++;
    });
  }
  document.getElementById("totalCount").textContent = totalQty;
  document.getElementById("totalPrice").textContent = totalPrice.toLocaleString() + " 원";
}

function goToNext() {
  alert("선택된 상품 수: " + cart.reduce((a, b) => a + b, 0));
}

renderAllCategories();

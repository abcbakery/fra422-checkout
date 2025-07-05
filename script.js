
const productData = {
  "PERFUME": [
    { name: "퍼퓸 원", price: 119000 },
    { name: "퍼퓸 투", price: 125000 },
    { name: "퍼퓸 쓰리", price: 109000 }
  ]
};

let cart = [];
let globalIndex = 0;

function createProductItem(name, price, index) {
  cart[index] = 0;
  return `
    <div class="product-item">
      <div>
        <div class="product-name">${name}</div>
        <div class="product-price">${price.toLocaleString()} ₩</div>
      </div>
      <div class="qty-controls">
        <button onclick="updateQty(${index}, -1)">-</button>
        <span id="qty-${index}">0</span>
        <button onclick="updateQty(${index}, 1)">+</button>
      </div>
    </div>
  `;
}

function renderAllCategories() {
  const container = document.getElementById("productContainer");
  for (const category in productData) {
    container.innerHTML += `<h3 class="section-title">${category}</h3>`;
    productData[category].forEach((item, idx) => {
      const index = globalIndex++;
      container.innerHTML += createProductItem(item.name, item.price, index);
    });
  }
}

function updateQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  document.getElementById(`qty-${index}`).textContent = cart[index];
  updateTotal();
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
  alert("장바구니 정보: " + cart.map((qty, i) => qty > 0 ? `#${i}: ${qty}` : "").filter(Boolean).join(", "));
}

renderAllCategories();

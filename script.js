const products = [
  { name: "퍼퓸 원 (50ML)", price: 119000 },
  { name: "퍼퓸 원 (50ML)", price: 119000 },
  { name: "퍼퓸 원 (50ML)", price: 119000 }
];

let cart = Array(products.length * 2).fill(0);

function renderList() {
  const perfumeList = document.getElementById("perfumeList");
  const travelList = document.getElementById("travelPerfumeList");

  products.forEach((p, idx) => {
    perfumeList.innerHTML += createProductItem(p.name, p.price, idx);
    travelList.innerHTML += createProductItem(p.name, p.price, idx + products.length);
  });
}

function createProductItem(name, price, index) {
  return \`
    <div class="product-item">
      <div>
        <div class="product-name">\${name}</div>
        <div class="product-price">\${price.toLocaleString()} ₩</div>
      </div>
      <div class="qty-controls">
        <button onclick="updateQty(\${index}, -1)">-</button>
        <span id="qty-\${index}">0</span>
        <button onclick="updateQty(\${index}, 1)">+</button>
      </div>
    </div>
  \`;
}

function updateQty(index, delta) {
  cart[index] = Math.max(0, cart[index] + delta);
  document.getElementById("qty-" + index).textContent = cart[index];
  updateTotal();
}

function updateTotal() {
  const total = cart.reduce((acc, qty, i) => acc + qty * (i < products.length ? products[i].price : products[i - products.length].price), 0);
  const count = cart.reduce((a, b) => a + b, 0);
  document.getElementById("totalCount").textContent = count;
  document.getElementById("totalPrice").textContent = total.toLocaleString() + " 원";
}

function goToDelivery() {
  alert("다음 페이지로 이동합니다 (예: 배송 정보 입력)");
}

renderList();

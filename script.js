const productData = {
  "PERFUME": [
    { name: "퍼퓸 원 (50ML)", price: 119000, image: "image/perfume/WON.png" },
    { name: "퍼퓸 테오 (50ML)", price: 119000, image: "image/perfume/TEO.png" },
    { name: "퍼퓸 엘 (50ML)", price: 119000, image: "image/perfume/EL.png" },
    { name: "퍼퓸 킴 (50ML)", price: 119000, image: "image/perfume/KIM.png" },
    { name: "퍼퓸 하니 (50ML)", price: 119000, image: "image/perfume/HANI.png" }
  ],
  "TRAVEL-SIZE PERFUME": [
    { name: "퍼퓸 원 (15ML)", price: 58000, image: "image/travel perfume/WON.png" },
    { name: "퍼퓸 테오 (15ML)", price: 58000, image: "image/travel perfume/TEO.png" },
    { name: "퍼퓸 엘 (15ML)", price: 58000, image: "image/travel perfume/EL.png" },
    { name: "퍼퓸 킴 (15ML)", price: 58000, image: "image/travel perfume/KIM.png" },
    { name: "퍼퓸 하니 (15ML)", price: 58000, image: "image/travel perfume/HANI.png" }
  ],
  "ANTI-WRINKLE PERFUME HAND CREAM": [
    { name: "퍼퓸 핸드크림 엘 (30ML)", price: 23000, image: "image/handcream/EL.png" },
    { name: "퍼퓸 핸드크림 킴 (30ML)", price: 23000, image: "image/handcream/KIM.png" },
    { name: "퍼퓸 핸드크림 하니 (30ML)", price: 23000, image: "image/handcream/HANI.png" }
  ],
  "SACHET": [
    { name: "퍼퓸 샤쉐 원 (20G)", price: 29000, image: "image/sachet/WON.png" },
    { name: "퍼퓸 샤쉐 킴 (20G)", price: 29000, image: "image/sachet/KIM.png" }
  ],
  "CONCENTRATED DIFFUSER": [
    { name: "베르가못 (15ML)", price: 24000, image: "image/diffuser/bergamot.png" },
    { name: "시더우드 (15ML)", price: 19000, image: "image/diffuser/cedarwood.png" },
    { name: "로즈 제라늄 (15ML)", price: 39000, image: "image/diffuser/geranium.png" },
    { name: "그레이프프룻 (15ML)", price: 19000, image: "image/diffuser/grapefruit.png" },
    { name: "라벤더 (15ML)", price: 29000, image: "image/diffuser/lavender.png" },
    { name: "레몬 (15ML)", price: 19000, image: "image/diffuser/lemon.png" },
    { name: "네롤리 (15ML)", price: 55000, image: "image/diffuser/neroli.png" },
    { name: "파인 (15ML)", price: 19000, image: "image/diffuser/pine.png" },
    { name: "로즈 (15ML)", price: 159000, image: "image/diffuser/rose.png" },
    { name: "로즈마리 (15ML)", price: 19000, image: "image/diffuser/rosemary.png" },
    { name: "지속가능한, 422로즈우드 (15ML)", price: 42000, image: "image/diffuser/422 rosewood.png" },
    { name: "지속가능한, 422샌달우드 (15ML)", price: 42000, image: "image/diffuser/422샌달우드.png" },
    { name: "지속가능한, 422가이악 (15ML)", price: 42000, image: "image/diffuser/422 guaiac.png" }
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

  // 선택 해제 시 전체 상태도 리셋
  if (cart[index] === 0) {
    document.getElementById(`item-${index}`).classList.remove("selected");
  }

  updateQtyView(index);
  updateTotal();
}

function toggleSelection(index) {
  if (cart[index] === 0) {
    cart[index] = 1;
    document.getElementById(`item-${index}`).classList.add("selected");
  } else {
    cart[index] = 0;
    document.getElementById(`item-${index}`).classList.remove("selected");
  }
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
    qtyEl.innerHTML = ``; // 아무것도 안 보여줌
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

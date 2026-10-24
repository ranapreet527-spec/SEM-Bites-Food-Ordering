// ══════════════════════════════════════
//   Menu Data
// ══════════════════════════════════════
const menuData = [
  {
    id: 1,
    name: "Veg Thali",
    emoji: "🍛",
    price: 70,
    cat: "meals",
    desc: "Rice, 2 sabzi, dal, roti & pickle",
    type: "veg",
  },
  {
    id: 2,
    name: "Egg Biryani",
    emoji: "🍚",
    price: 90,
    cat: "meals",
    desc: "Flavourful basmati with boiled egg",
    type: "nonveg",
  },
  {
    id: 3,
    name: "Paneer Wrap",
    emoji: "🌯",
    price: 60,
    cat: "meals",
    desc: "Spicy paneer tikka in a whole wheat wrap",
    type: "veg",
  },
  {
    id: 4,
    name: "Chicken Sandwich",
    emoji: "🥪",
    price: 55,
    cat: "snacks",
    desc: "Grilled chicken, lettuce & mayo",
    type: "nonveg",
  },
  {
    id: 5,
    name: "Samosa (2 pcs)",
    emoji: "🥟",
    price: 20,
    cat: "snacks",
    desc: "Crispy potato-stuffed golden samosas",
    type: "veg",
  },
  {
    id: 6,
    name: "Pav Bhaji",
    emoji: "🧇",
    price: 50,
    cat: "meals",
    desc: "Butter-rich bhaji with 2 soft pavs",
    type: "veg",
  },
  {
    id: 7,
    name: "Masala Chai",
    emoji: "☕",
    price: 15,
    cat: "drinks",
    desc: "Ginger & cardamom adrak chai",
    type: "veg",
  },
  {
    id: 8,
    name: "Cold Coffee",
    emoji: "🧋",
    price: 45,
    cat: "drinks",
    desc: "Thick, sweet & chilled dalgona coffee",
    type: "veg",
  },
  {
    id: 9,
    name: "Nimbu Pani",
    emoji: "🍋",
    price: 20,
    cat: "drinks",
    desc: "Refreshing lime water with masala",
    type: "veg",
  },
  {
    id: 10,
    name: "Gulab Jamun",
    emoji: "🍮",
    price: 30,
    cat: "desserts",
    desc: "2 pieces drenched in rose sugar syrup",
    type: "veg",
  },
  {
    id: 11,
    name: "Ice Cream Cup",
    emoji: "🍨",
    price: 40,
    cat: "desserts",
    desc: "Vanilla & chocolate swirl cup",
    type: "veg",
  },
  {
    id: 12,
    name: "Vada Pav",
    emoji: "🍔",
    price: 25,
    cat: "snacks",
    desc: "Mumbai-style spicy potato vada in pav",
    type: "veg",
  },
];
// ══════════════════════════════════════
//   State
// ══════════════════════════════════════
let cart = {}; // { itemId: quantity }
// ══════════════════════════════════════
//   Render Menu Cards
// ══════════════════════════════════════
function renderMenu(filter = "all") {
  const grid = document.getElementById("food-grid");
  const items =
    filter === "all" ? menuData : menuData.filter((i) => i.cat === filter);

  grid.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.className = "food-card";
    card.innerHTML = `
      <div class="badge ${item.type === "veg" ? "veg" : ""}">
        ${item.type === "veg" ? "🟢 VEG" : "🔴 NON-VEG"}
      </div>
      <div class="food-img">${item.emoji}</div>
      <div class="food-info">
        <div class="food-name">${item.name}</div>
        <div class="food-desc">${item.desc}</div>
        <div class="food-footer">
          <div class="food-price">₹${item.price}</div>
          <button class="add-btn" onclick="addToCart(${item.id})">+ Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
// ══════════════════════════════════════
//   Filter by Category
// ══════════════════════════════════════
function filterMenu(cat, clickedEl) {
  // Update active pill
  document
    .querySelectorAll(".pill")
    .forEach((p) => p.classList.remove("active"));
  clickedEl.classList.add("active");

  renderMenu(cat);
}
// ══════════════════════════════════════
//   Add Item to Cart
// ══════════════════════════════════════
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
  renderCartItems();

  const item = menuData.find((i) => i.id === id);
  showToast(`${item.emoji} ${item.name} added to cart!`);
}
// ══════════════════════════════════════
//   Update Item Quantity
// ══════════════════════════════════════
function updateQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
  renderCartItems();
}
// ══════════════════════════════════════
//   Update Cart Badge & Total
// ══════════════════════════════════════
function updateCartUI() {
  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuData.find((i) => i.id == id);
    return sum + item.price * qty;
  }, 0);

  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);

  document.getElementById("cart-count").textContent = totalCount;
  document.getElementById("cart-total").textContent = `₹${totalAmount}`;
  document.getElementById("checkout-btn").disabled = totalCount === 0;
}
// ══════════════════════════════════════
//   Render Cart Items List
// ══════════════════════════════════════
function renderCartItems() {
  const list = document.getElementById("cart-items-list");
  const entries = Object.entries(cart);

  if (entries.length === 0) {
    list.innerHTML = `
      <div class="empty-cart">
        <div class="empty-icon">🍽️</div>
        <p>Your cart is empty.<br>Add something delicious!</p>
      </div>
    `;
    return;
  }

  list.innerHTML = entries
    .map(([id, qty]) => {
      const item = menuData.find((i) => i.id == id);
      return `
      <div class="cart-item">
        <div class="cart-item-icon">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price} × ${qty} = ₹${item.price * qty}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${id}, -1)">−</button>
          <span class="qty-num">${qty}</span>
          <button class="qty-btn" onclick="updateQty(${id}, 1)">+</button>
        </div>
      </div>
    `;
    })
    .join("");
}
// ══════════════════════════════════════
//   Open / Close Cart Sidebar
// ══════════════════════════════════════
function openCart() {
  document.getElementById("cart-sidebar").classList.add("open");
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("open");
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
}
// ══════════════════════════════════════
//   Place Order
// ══════════════════════════════════════
function placeOrder() {
  const orderId = "#SEM" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById("order-id-txt").textContent = orderId;
  closeCart();
  document.getElementById("success-modal").classList.add("open");

  // Clear cart
  cart = {};
  updateCartUI();
  renderCartItems();
}
// ══════════════════════════════════════
//   Close Success Modal
// ══════════════════════════════════════
function closeModal() {
  document.getElementById("success-modal").classList.remove("open");
}
// ══════════════════════════════════════
//   Toast Notification
// ══════════════════════════════════════
let toastTimer;

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}
// ══════════════════════════════════════
//   Smooth Scroll to Menu
// ══════════════════════════════════════
function scrollToMenu() {
  document
    .getElementById("menu-section")
    .scrollIntoView({ behavior: "smooth" });
}
// ══════════════════════════════════════
//   Init
// ══════════════════════════════════════
renderMenu();

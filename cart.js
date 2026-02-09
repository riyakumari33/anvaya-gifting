/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  window.location.href = "cart.html";
}

/* =========================
   ADD TO WISHLIST
========================= */
function addToWishlist(name, price) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.some((item) => item.name === name)) {
    alert("Already in Wishlist ❤️");
    return;
  }

  wishlist.push({ name, price });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  alert("Added to Wishlist ❤️");
}

/* =========================
   SHOW WISHLIST ITEMS
========================= */
const wishlistContent = document.getElementById("wishlistContent");

if (wishlistContent) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContent.innerHTML = `<p class="empty-wishlist">Your wishlist is empty ❤️</p>`;
  } else {
    wishlist.forEach((item, index) => {
      wishlistContent.innerHTML += `
        <div class="wishlist-item">
          <div class="wishlist-info">
            <h4>${item.name}</h4>
            <p>₹${item.price}</p>
          </div>

          <div class="wishlist-actions">
            <button class="move-cart" onclick="moveToCart(${index})">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>

            <button class="remove-wish" onclick="removeWishlist(${index})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      `;
    });
  }
}

/* =========================
   MOVE WISHLIST → CART
========================= */
function moveToCart(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(wishlist[index]);
  wishlist.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  updateCartCount();
  updateWishlistCount();
  location.reload();
}

/* =========================
   REMOVE WISHLIST ITEM
========================= */
function removeWishlist(index) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
  location.reload();
}

/* =========================
   NAV COUNTS
========================= */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.innerText = cart.length;
}

function updateWishlistCount() {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wishCount = document.getElementById("wish-count");
  if (wishCount) wishCount.innerText = wishlist.length;
}

/* =========================
   ON LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateWishlistCount();
});

// Search by name
var inp = document.getElementById("searchInput");
inp.addEventListener("input", function () {
  var searchValue = inp.value.toLowerCase();
  var productCards = document.querySelectorAll(".product-card");
  for (var i = 0; i < productCards.length; i++) {
    var cart = productCards[i];
    var productName = cart.querySelector("h3").textContent.toLowerCase();
    if (productName.includes(searchValue)) {
      cart.style.display = "block";
    } else {
      cart.style.display = "none";
    }
  }
});

// Filter by price
var priceFilter = document.getElementById("priceFilter");
priceFilter.addEventListener("change", function () {
  var selectedValue = priceFilter.value;
  var productCards = document.querySelectorAll(".product-card");
  for (var i = 0; i < productCards.length; i++) {
    var card = productCards[i];
    var priceText = card.querySelector("p").textContent;
    var price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    if (selectedValue === "all" || (selectedValue === "120" && price < 120)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
});

// ADD ON CART
var cart = document.getElementById("cart");

var item = 0;
var Total = 0;
var products = [];

if (localStorage.getItem("cartData")) {
  var cartData = JSON.parse(localStorage.getItem("cartData"));
  item = cartData.item || 0;
  Total = cartData.Total || 0;
  products = cartData.products || [];
  cart.innerHTML = `<a href="/cartp.html" target="_self">🛒Cart: ${item} items</a> - Total: ${Total} EGP`;
}

var addButtons = document.querySelectorAll(".product-card button");
for (var i = 0; i < addButtons.length; i++) {
  var btn = addButtons[i];
  btn.addEventListener("click", function () {
    item++;
    var productCard = this.parentElement;
    var name = productCard.querySelector("h3").textContent;
    var priceText = productCard.querySelector("p").textContent;
    var price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
    var imgSrc = productCard.querySelector("img").src;

    Total += price;

    products.push({ name: name, price: price, img: imgSrc });

    cart.innerHTML = `<a href="/cartp.html" target="_self">🛒Cart: ${item} items</a> - Total: ${Total} EGP`;

    localStorage.setItem(
      "cartData",
      JSON.stringify({ item: item, Total: Total, products: products })
    );
  });
}

// Clear cart
document.getElementById("clearCart").addEventListener("click", function () {
  item = 0;
  Total = 0;
  products = [];
  cart.innerHTML = `<a href="/cartp.html" target="_self">🛒Cart: ${item} items</a> - Total: ${Total} EGP`;
  localStorage.removeItem("cartData");
});
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

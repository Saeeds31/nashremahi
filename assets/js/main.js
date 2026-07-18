const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
});
const swiper = new Swiper(".heroSwiper", {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    effect: "slide",
    speed: 800,
});
function showMenu() {
    var menuBar = document.getElementsByClassName("menu")[0];
    menuBar.style.display = "block";
    var menuBar = document.getElementsByClassName("menuBar")[0];
    menuBar.style.display = "none";
}
function closeMenu() {
    var menuBar = document.getElementsByClassName("menu")[0];
    menuBar.style.display = "none";
    var menuBar = document.getElementsByClassName("menuBar")[0];
    menuBar.style.display = "block";

}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const sidebar = document.getElementById("cartSidebar");

const cartItems = document.getElementById("cartItems");

const totalPrice = document.getElementById("totalPrice");

const closeCart = document.getElementById("closeCart");

document.querySelectorAll(".add-cart").forEach(btn => {

    btn.addEventListener("click", function (e) {

        e.preventDefault();

        const card = this.closest(".product-cart");

        const product = {

            image: card.querySelector("img").src,

            title: card.querySelector(".productTitle").innerText,

            author: card.querySelectorAll("strong")[0].innerText,

            translator: card.querySelectorAll("strong")[1].innerText,

            price: card.querySelector(".price").innerText

        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        showCart();

        sidebar.classList.add("active");

    });

});

function showCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += parseInt(item.price.replace(/\D/g, ""));

        cartItems.innerHTML += `

        <div class="cart-item">

          

            <img style="height: 100px;" src="${item.image}">

            <div class="item-ditaile">

                <h4  class="font500 item-title">${item.title}</h4>

                

                <div style="height: 100px; class="d-flex justify-content-center align-items-center">
                <div class="price_item" style="color:#e3e1e1;display:flex;">x1<p style="color:black;">${item.price}</p></div>
                  <span class="remove" onclick="removeItem(${index})">✕</span>
                  <div/>

            </div>

        </div>

        `;

    });

    totalPrice.innerHTML = total.toLocaleString() + " تومان";

}

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

}

closeCart.onclick = function () {

    sidebar.classList.remove("active");

}

// نمایش سبد خرید
showCart();

const searchBtn = document.querySelector(".searchSvg");
const searchWrapper = document.querySelector(".search-wrapper");
const searchInput = document.getElementById("searchInput");

// تابع بستن جستجو
function closeSearch() {
    searchWrapper.classList.remove("active");
    searchInput.blur();
    // حذف کامل border-bottom
    searchWrapper.style.borderBottom = "0 !important";
    searchWrapper.style.border = "0 !important";
    searchWrapper.style.outline = "0 !important";
}

// تابع باز کردن جستجو
function openSearch() {
    searchWrapper.classList.add("active");
    searchInput.focus();
    // وقتی باز هست هم border رو حذف میکنیم
    searchWrapper.style.borderBottom = "0 !important";
    searchWrapper.style.border = "0 !important";
    searchWrapper.style.outline = "0 !important";
}

// کلیک روی دکمه جستجو
searchBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (searchWrapper.classList.contains("active")) {
        closeSearch();
    } else {
        openSearch();
    }
});

// کلیک روی هر جای صفحه
document.addEventListener("click", (e) => {
    // اگر کلیک خارج از باکس جستجو و دکمه بود
    if (!searchWrapper.contains(e.target) && !searchBtn.contains(e.target)) {
        closeSearch();
    }
});

// جلوگیری از بسته شدن وقتی داخل باکس کلیک میشه
searchWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
});

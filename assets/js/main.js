(function () {
  "use strict";

  // ===== 1. مدیریت Header (فقط یک بار) =====
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    });
    console.log("✅ Header فعال شد");
  } else {
    console.warn("⚠️ Header در این صفحه وجود ندارد");
  }

  // ===== 2. منو (Menu) =====
  function showMenu() {
    const menu = document.querySelector(".menu");
    const menuBar = document.querySelector(".menuBar");

    if (menu) menu.style.display = "block";
    if (menuBar) menuBar.style.display = "none";
  }
  const menuBtn = document.querySelector(".menuBar");
  if (menuBtn) {
    menuBtn.addEventListener("click", showMenu);
  }
  function closeMenu() {
    const menu = document.querySelector(".menu");
    const menuBar = document.querySelector(".menuBar");

    if (menu) menu.style.display = "none";
    if (menuBar) menuBar.style.display = "block";
  }
  const closeBtn = document.querySelector(".closeMenuBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeMenu);
  }
  // ===== 3. سبد خرید (Cart) =====
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const sidebar = document.getElementById("cartSidebar");
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  const closeCart = document.getElementById("closeCart");

  // فقط اگر عناصر سبد خرید وجود دارند
  if (sidebar && cartItems && totalPrice && closeCart) {
    // دکمه‌های افزودن به سبد خرید
    document.querySelectorAll(".add-cart").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const card = this.closest(".product-cart");
        if (!card) return;

        const product = {
          image: card.querySelector("img")?.src || "",
          title: card.querySelector(".productTitle")?.innerText || "بدون عنوان",
          author: card.querySelectorAll("strong")[0]?.innerText || "",
          translator: card.querySelectorAll("strong")[1]?.innerText || "",
          price: card.querySelector(".price")?.innerText || "0",
        };

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        showCart();
        sidebar.classList.add("active");
      });
    });

    // نمایش سبد خرید
    function showCart() {
      if (!cartItems || !totalPrice) return;

      cartItems.innerHTML = "";
      let total = 0;

      cart.forEach((item, index) => {
        const priceNum = parseInt(item.price.replace(/\D/g, "")) || 0;
        total += priceNum;

        cartItems.innerHTML += `
          <div class="cart-item">
            <img style="height: 100px;" src="${item.image}" alt="${item.title}">
            <div class="item-ditaile">
              <h4 class="font500 item-title">${item.title}</h4>
              <div style="height: 100px;" class="d-flex justify-content-center align-items-center">
                <div class="price_item" style="color:#e3e1e1;display:flex;">
                  x1 <p style="color:black;">${item.price}</p>
                </div>
                <span class="remove" onclick="removeItem(${index})">✕</span>
              </div>
            </div>
          </div>
        `;
      });

      totalPrice.innerHTML = total.toLocaleString() + " تومان";
    }

    // حذف آیتم از سبد خرید
    window.removeItem = function (index) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();
    };

    // بستن سبد خرید
    closeCart.onclick = function () {
      sidebar.classList.remove("active");
    };

    // نمایش اولیه سبد خرید
    showCart();

    console.log("✅ سبد خرید فعال شد");
  } else {
    console.warn("⚠️ عناصر سبد خرید در این صفحه وجود ندارد");
  }

  // ===== 4. جستجو (Search) =====
  const searchBtn = document.querySelector(".searchSvg");
  const searchWrapper = document.querySelector(".search-wrapper");
  const searchInput = document.getElementById("searchInput");

  if (searchBtn && searchWrapper && searchInput) {
    function closeSearch() {
      searchWrapper.classList.remove("active");
      searchInput.blur();
      searchWrapper.style.borderBottom = "0 !important";
      searchWrapper.style.border = "0 !important";
      searchWrapper.style.outline = "0 !important";
    }

    function openSearch() {
      searchWrapper.classList.add("active");
      searchInput.focus();
      searchWrapper.style.borderBottom = "0 !important";
      searchWrapper.style.border = "0 !important";
      searchWrapper.style.outline = "0 !important";
    }

    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (searchWrapper.classList.contains("active")) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    document.addEventListener("click", (e) => {
      if (!searchWrapper.contains(e.target) && !searchBtn.contains(e.target)) {
        closeSearch();
      }
    });

    searchWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    console.log("✅ جستجو فعال شد");
  } else {
    console.warn("⚠️ عناصر جستجو در این صفحه وجود ندارد");
  }

  // ===== 5. Bootstrap Carousel =====
  const heroCarousel = document.getElementById("heroCarousel");
  if (heroCarousel && typeof bootstrap !== "undefined") {
    new bootstrap.Carousel(heroCarousel, {
      interval: 3000,
      wrap: true,
      
      ride: "carousel",
    });
    console.log("✅ Bootstrap Carousel فعال شد");
  } else {
    console.warn("⚠️ Carousel در این صفحه وجود ندارد یا Bootstrap لود نشده");
  }
})(); // پایان IIFE

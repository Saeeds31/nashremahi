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
          quantity: 1, // اضافه کردن تعداد
        };

        // بررسی کنید که آیا محصول قبلاً در سبد وجود دارد
        const existingItem = cart.find((item) => item.title === product.title);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push(product);
        }

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
        const itemTotal = priceNum * (item.quantity || 1);
        total += itemTotal;

        cartItems.innerHTML += `
          <div class="cart-item">
            <img class="cartItemImage" src="${item.image}" alt="${item.title}">
            <div class="item-ditaile">
              <h4 class="font500 item-title">${item.title}</h4>
              <div class="cartItemMainDiv d-flex justify-content-center align-items-center">
                <div class="qty-controls">
                  <button class="qty-btn qty-minus" data-index="${index}">−</button>
                  <span class="qty-number">${item.quantity || 1}</span>
                  <button class="qty-btn qty-plus" data-index="${index}">+</button>
                </div>
                <div class="price_item priceCartItem">
                  <p class="d-block">${itemTotal.toLocaleString()} تومان</p>
                </div>
                <span class="remove" onclick="removeItem(${index})">✕</span>
              </div>
            </div>
          </div>
        `;
      });

      // اضافه کردن رویدادهای دکمه‌های + و -
      document.querySelectorAll(".qty-minus").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const index = parseInt(this.dataset.index);
          changeQuantity(index, -1);
        });
      });

      document.querySelectorAll(".qty-plus").forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          const index = parseInt(this.dataset.index);
          changeQuantity(index, 1);
        });
      });

      totalPrice.innerHTML = total.toLocaleString() + " تومان";
    }

    // ===== تغییر تعداد =====
    function changeQuantity(index, delta) {
      if (index < 0 || index >= cart.length) return;

      const newQuantity = (cart[index].quantity || 1) + delta;

      if (newQuantity < 1) {
        // اگر تعداد به صفر رسید، آیتم را حذف کن
        cart.splice(index, 1);
      } else {
        cart[index].quantity = newQuantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();

      // اگر سبد خالی شد، ببند
      if (cart.length === 0) {
        setTimeout(() => {
          sidebar.classList.remove("active");
        }, 500);
      }
    }

    // حذف آیتم از سبد خرید
    window.removeItem = function (index) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      showCart();

      if (cart.length === 0) {
        setTimeout(() => {
          sidebar.classList.remove("active");
        }, 500);
      }
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
  const searchSpan = document.getElementById("searchSpan");

  if (searchBtn && searchWrapper && searchInput) {
    // ===== توابع باز و بسته کردن =====
    function closeSearch() {
      searchWrapper.classList.remove("active");
      searchInput.blur();
      searchInput.value = ""; // خالی کردن اینپوت
    }

    function openSearch() {
      searchWrapper.classList.add("active");
      setTimeout(() => {
        searchInput.focus();
      }, 400);
    }

    // ===== کلیک روی دکمه جستجو =====
    searchBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (searchWrapper.classList.contains("active")) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    // ===== کلیک روی دکمه "جستجو" =====
    if (searchSpan) {
      searchSpan.addEventListener("click", (e) => {
        e.stopPropagation();
        const query = searchInput.value.trim();
        if (query) {
          console.log("جستجو برای:", query);
          // اینجا کد جستجوی شما
          // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        } else {
          searchInput.focus();
          searchInput.style.borderColor = "#ef4444";
          setTimeout(() => {
            searchInput.style.borderColor = "";
          }, 1000);
        }
      });
    }

    // ===== کلیک روی پس‌زمینه (خارج از باکس) =====
    searchWrapper.addEventListener("click", (e) => {
      if (e.target === searchWrapper) {
        closeSearch();
      }
    });

    // ===== کلیک روی خود باکس (جلوگیری از بسته شدن) =====
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer) {
      searchContainer.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // ===== کلیک با دکمه ESC =====
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchWrapper.classList.contains("active")) {
        closeSearch();
      }
    });

    // ===== کلیک روی هر جای صفحه (بکاپ) =====
    document.addEventListener("click", (e) => {
      if (
        searchWrapper.classList.contains("active") &&
        !searchWrapper.contains(e.target) &&
        !searchBtn.contains(e.target)
      ) {
        closeSearch();
      }
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

  // ===== 6. باز کردن سبد خرید با آیکون cartSvgIcon =====
  const cartSvgIcon = document.getElementById("cartSvgIcon");
  if (cartSvgIcon && sidebar) {
    cartSvgIcon.addEventListener("click", function (e) {
      e.preventDefault();
      sidebar.classList.add("active");
    });
    console.log("✅ آیکون سبد خرید (cartSvgIcon) فعال شد");
  }
})(); // پایان IIFE

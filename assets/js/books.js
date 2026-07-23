(function () {
  "use strict";
  const booksData = [
    {
      id: 1,
      title: "کارل مارکس و سنت اندیشهٔ سیاسی در غرب",
      author: "هانا ارنت",
      translator: "عزت الله فولادوند",
      price: 340000,
      category: "فلسفه",
      inStock: true,
      image: "../../assets/images/sonat_co1-300x450.jpg",
    },
    {
      id: 2,
      title: "بشنو از باران",
      author: "میشل ابر",
      translator: "قاسم مؤمنی",
      price: 110000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/baran_co1-300x450.jpg",
    },
    {
      id: 3,
      title: "غوطه در آب",
      author: "لیدیا چوکوفسکایا",
      translator: "آبتین گلکار",
      price: 0,
      category: "ادبیات",
      inStock: false,
      image: "../../assets/images/ghute_co1-300x450.jpg",
    },
    {
      id: 4,
      title: "فلسفه‌ی مواجهه با دیگری",
      author: "شارل چین",
      translator: "قاسم مؤمنی",
      price: 330000,
      category: "فلسفه",
      inStock: true,
      image: "../../assets/images/flsfmvjh_co1-300x450.jpg",
    },
    {
      id: 5,
      title: "فساد",
      author: "لزلی هولمز",
      translator: "مصطفی رضایی",
      price: 420000,
      category: "علوم اجتماعی",
      inStock: true,
      image: "../../assets/images/fesad_co1-300x450.jpg",
    },
    {
      id: 6,
      title: "زیبایی شناسی",
      author: "بنس نانی",
      translator: "محمد رضا ابولقاسمی",
      price: 350000,
      category: "هنر",
      inStock: true,
      image: "../../assets/images/zibamm_co1-300x450.jpg",
    },
    {
      id: 7,
      title: "خیابانی دنج در قلب مسکو",
      author: "میخاییل آسارگین",
      translator: "آبتین گلکار",
      price: 340000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/denj_co1-300x450.jpg",
    },
    {
      id: 8,
      title: "آرمان",
      author: "امانوئل بوو",
      translator: "قاسم مؤمنی",
      price: 240000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/arman_co1-300x450.jpg",
    },
    {
      id: 9,
      title: "سه اکسیر",
      author: "آرتور شنیتسلر",
      translator: "علی اصغر حداد",
      price: 110000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/Exir_co1-300x450.jpg",
    },
    {
      id: 10,
      title: "رقیب",
      author: "امانوئل کارر",
      translator: "احمد پرهیزی",
      price: 285000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/raqib_co1-300x450.jpg",
    },
    {
      id: 11,
      title: "فلسفه‌ی اعتماد به نفس",
      author: "شارل پین",
      translator: "عزت الله فولادوند",
      price: 340000,
      category: "فلسفه",
      inStock: true,
      image: "../../assets/images/etemad_co1-300x450.jpg",
    },
    {
      id: 12,
      title: "سوموی گاو",
      author: "یاسوشی اینوئه",
      translator: "علیرضا شفیعی‌نسب",
      price: 340000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/sumo_co1-300x450.jpg",
    },
    {
      id: 13,
      title: "بازگشت فرزند و بِکُن-لبرویِر",
      author: "امانوئل بوو",
      translator: "قاسم مؤمنی",
      price: 340000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/frznd_co1-300x450.jpg",
    },
    {
      id: 14,
      title: "درباره‌ی پیچیدگی",
      author: "نیل تایس",
      translator: "محمدابراهیم محجوب",
      price: 340000,
      category: "علوم اجتماعی",
      inStock: true,
      image: "../../assets/images/darpch_co1-300x450.jpg",
    },
    {
      id: 15,
      title: "پزشک دهکده",
      author: "فرانتس کافکا",
      translator: "علی‌اصغر حداد",
      price: 340000,
      category: "ادبیات",
      inStock: true,
      image: "../../assets/images/dehkde_co1-300x450.jpg",
    },
    {
      id: 16,
      title: "تاریخ ایران باستان",
      author: "والتر هینتس",
      translator: "محمدعلی موحد",
      price: 450000,
      category: "تاریخ",
      inStock: true,
      image: "../../assets/images/sonat_co1-300x450.jpg",
    },
    {
      id: 17,
      title: "روانشناسی رشد",
      author: "ژان پیاژه",
      translator: "مژده دقیقی",
      price: 280000,
      category: "روانشناسی",
      inStock: true,
      image: "../../assets/images/baran_co1-300x450.jpg",
    },
    {
      id: 18,
      title: "شعر و زمان",
      author: "احمد شاملو",
      translator: null,
      price: 180000,
      category: "شعر",
      inStock: true,
      image: "../../assets/images/ghute_co1-300x450.jpg",
    },
  ];

  const container = document.getElementById("productsContainer");
  const searchInput = document.getElementById("bookSearch");
  const searchBtn = document.getElementById("searchBtn");
  const clearSearch = document.getElementById("clearSearch");
  const categoryTags = document.querySelectorAll(".filter-tag");
  const sortSelect = document.getElementById("sortSelect");
  const resetBtn = document.getElementById("resetFilters");
  const showingCount = document.getElementById("showingCount");
  const totalCount = document.getElementById("totalCount");
  const allResult = document.getElementById("allResult");
  const paginationContainer = document.getElementById("paginationContainer");

  const priceMin = document.getElementById("priceMin");
  const priceMax = document.getElementById("priceMax");
  const priceApplyBtn = document.getElementById("priceApplyBtn");

  let currentCategory = "all";
  let currentSearch = "";
  let currentSort = "default";
  let currentPage = 1;
  let priceMinVal = "";
  let priceMaxVal = "";
  const itemsPerPage = 8;

  function renderBooks(books) {
    if (!books || books.length === 0) {
      container.innerHTML = `
                <li class="no-result">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <h4>هیچ کتابی یافت نشد</h4>
                    <p class="text-muted">لطفاً جستجوی خود را تغییر دهید یا فیلترها را بازنشانی کنید.</p>
                </li>
            `;
      return;
    }

    let html = "";
    books.forEach((book) => {
      const priceDisplay = book.inStock
        ? `${book.price.toLocaleString()} تومان`
        : "اتمام چاپ";
      const isOutOfStock = !book.inStock;

      html += `   <li
              class="product-cart hasDiscount position-relative d-flex flex-column gap-3 rounded-3"
            >
              <a href="">
                <img
                  class="bookImage"
                  src="${book.image}"
                  alt=""
                />
              </a>
              <div>
                <a class="text-decoration-none productTitle mainText" href="">
                  پزشک دهکده</a
                >
              </div>
              <div>
                <div>
                  <span class="bookTitle">نویسنده:</span>
                  <strong> فرانتس کافکا</strong>
                </div>
                <div>
                  <span class="font300 translaterText">مترجم:</span>
                  <strong> علی‌اصغر حداد</strong>
                </div>
              </div>
              <p class="d-flex flex-column align-items-end discountBox">
                <del class="text-secondary">420,000 تومان</del>
                <span class="fw-bold mainText" class="price"
                  >340,000 تومان</span
                >
              </p>
              <span
                class="addToCartBtn d-none shopping rounded-3 d-flex justify-content-center align-items-center"
                ><a class="text-decoration-none text-white add-cart" href=""
                  >افزودن به سبد خرید</a
                ></span
              >
              <div
                class="heartSvg bg-white px-2 py-2 d-none justify-content-center align-items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="32"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M256 448l-35-32C118 322 48 259 48 176 48 114 98 64 160 64c35 0 69 17 96 44 27-27 61-44 96-44 62 0 112 50 112 112 0 83-70 146-173 240l-35 32z"
                  />
                </svg>
              </div>
            </li>
            `;
    });

    container.innerHTML = html;
    document.querySelectorAll(".heartSvg").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle("liked");
      });
    });
    document.querySelectorAll(".product-cart").forEach((cart) => {
      cart.addEventListener("mouseenter", function () {
        const btn = this.querySelector(".addToCartBtn");
        if (btn) btn.classList.remove("d-none");
      });
      cart.addEventListener("mouseleave", function () {
        const btn = this.querySelector(".addToCartBtn");
        if (btn) btn.classList.add("d-none");
      });
    });
  }

  function filterBooks() {
    let filtered = [...booksData];

    if (currentSearch.trim()) {
      const search = currentSearch.trim().toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search) ||
          b.author.toLowerCase().includes(search) ||
          (b.translator && b.translator.toLowerCase().includes(search)),
      );
    }

    if (currentCategory !== "all") {
      filtered = filtered.filter((b) => b.category === currentCategory);
    }

    if (priceMinVal !== "" || priceMaxVal !== "") {
      const min = priceMinVal !== "" ? parseInt(priceMinVal) : 0;
      const max = priceMaxVal !== "" ? parseInt(priceMaxVal) : Infinity;
      filtered = filtered.filter((b) => {
        if (!b.inStock) return false;
        return b.price >= min && b.price <= max;
      });
    }
    switch (currentSort) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title, "fa"));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "author":
        filtered.sort((a, b) => a.author.localeCompare(b.author, "fa"));
        break;
      default:
        break;
    }

    return filtered;
  }
  function updatePage() {
    const filtered = filterBooks();
    const total = filtered.length;

    const totalPages = Math.ceil(total / itemsPerPage);
    if (currentPage > totalPages) currentPage = Math.max(1, totalPages);

    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, total);
    const pageItems = filtered.slice(start, end);

    renderBooks(pageItems);

    showingCount.textContent = total > 0 ? start + 1 : 0;
    totalCount.textContent = total;
    allResult.textContent =
      total > 0
        ? `نمایش ${start + 1}-${end} از ${total} نتیجه`
        : "هیچ نتیجه‌ای یافت نشد";

    renderPagination(totalPages, currentPage);

    clearSearch.classList.toggle("visible", currentSearch.length > 0);
  }

  function renderPagination(totalPages, current) {
    if (totalPages <= 1) {
      paginationContainer.innerHTML = "";
      return;
    }

    let html = "";
    html += `
            <a href="#" class="arrow" data-page="${current > 1 ? current - 1 : 1}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </a>
        `;

    const maxVisible = 5;
    let startPage = Math.max(1, current - 2);
    let endPage = Math.min(totalPages, current + 2);

    if (endPage - startPage < maxVisible - 1) {
      if (startPage === 1)
        endPage = Math.min(totalPages, startPage + maxVisible - 1);
      else startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<a href="#" data-page="1">1</a>`;
      if (startPage > 2) html += `<span class="dots">…</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `<a href="#" data-page="${i}" ${i === current ? 'class="active"' : ""}>${i}</a>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span class="dots">…</span>`;
      html += `<a href="#" data-page="${totalPages}">${totalPages}</a>`;
    }

    html += `
            <a href="#" class="arrow" data-page="${current < totalPages ? current + 1 : totalPages}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
            </a>
        `;

    paginationContainer.innerHTML = html;

    paginationContainer.querySelectorAll("a[data-page]").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const page = parseInt(this.dataset.page);
        if (page !== currentPage) {
          currentPage = page;
          updatePage();
          window.scrollTo({
            top: container.offsetTop - 120,
            behavior: "smooth",
          });
        }
      });
    });
  }

  searchBtn.addEventListener("click", function () {
    currentSearch = searchInput.value.trim();
    currentPage = 1;
    updatePage();
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBtn.click();
    }
  });
  clearSearch.addEventListener("click", function () {
    searchInput.value = "";
    currentSearch = "";
    currentPage = 1;
    updatePage();
    searchInput.focus();
  });

  priceApplyBtn.addEventListener("click", function () {
    priceMinVal = priceMin.value.trim();
    priceMaxVal = priceMax.value.trim();
    currentPage = 1;
    updatePage();
  });

  priceMin.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      priceApplyBtn.click();
    }
  });

  priceMax.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      priceApplyBtn.click();
    }
  });
  categoryTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      categoryTags.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.dataset.category;
      currentPage = 1;
      updatePage();
    });
  });

  sortSelect.addEventListener("change", function () {
    currentSort = this.value;
    currentPage = 1;
    updatePage();
  });

  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    currentSearch = "";
    currentCategory = "all";
    currentSort = "default";
    currentPage = 1;
    priceMin.value = "";
    priceMax.value = "";
    priceMinVal = "";
    priceMaxVal = "";

    categoryTags.forEach((t) => t.classList.remove("active"));
    document
      .querySelector('.filter-tag[data-category="all"]')
      .classList.add("active");
    sortSelect.value = "default";

    updatePage();
  });

  updatePage();
})();

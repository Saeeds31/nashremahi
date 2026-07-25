(function () {
  "use strict";

  // صبر کردن برای بارگذاری کامل صفحه
  document.addEventListener("DOMContentLoaded", function () {
    // ===== ایجاد ساختار مودال =====
    function createModal() {
      // اگر مودال قبلاً ساخته شده، برمی‌گردیم
      if (document.getElementById("imageModal")) return;

      const modal = document.createElement("div");
      modal.id = "imageModal";
      modal.className = "image-modal";
      const closeBtn = document.createElement("button");
      closeBtn.id = "modalCloseBtn";
      closeBtn.innerHTML = "✕";

      closeBtn.addEventListener("mouseenter", function () {
        this.style.background = "rgba(255, 255, 255, 0.25)";
        this.style.transform = "scale(1.1)";
      });

      closeBtn.addEventListener("mouseleave", function () {
        this.style.background = "rgba(255, 255, 255, 0.15)";
        this.style.transform = "scale(1)";
      });

      // تصویر داخل مودال
      const img = document.createElement("img");
      img.id = "modalImage";
      // کانتینر تصویر
      const imgContainer = document.createElement("div");
      imgContainer.id = "modalImagediv";
      imgContainer.appendChild(img);

      // متن راهنما
      const hint = document.createElement("div");
      hint.id = "modalTabTitle";
      hint.textContent = "برای باز شدن در تب جدید کلیک کنید";

      modal.appendChild(closeBtn);
      modal.appendChild(imgContainer);
      modal.appendChild(hint);

      document.body.appendChild(modal);

      // ===== رویدادها =====

      // بستن مودال با کلیک روی پس‌زمینه یا دکمه بستن
      function closeModal(e) {
        // اگر کلیک روی خود تصویر بود، باز شدن در تب جدید انجام می‌شود
        if (e && e.target === img) return;

        modal.style.opacity = "0";
        setTimeout(function () {
          modal.style.display = "none";
        }, 300);
      }

      modal.addEventListener("click", function (e) {
        // اگر کلیک روی تصویر نبود، مودال بسته شود
        if (e.target !== img) {
          closeModal(e);
        }
      });

      closeBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        closeModal(e);
      });

      // دکمه Escape برای بستن
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.style.display === "flex") {
          closeModal(e);
        }
      });

      // کلیک روی تصویر برای باز شدن در تب جدید
      img.addEventListener("click", function (e) {
        e.stopPropagation();
        const src = this.getAttribute("src");
        if (src) {
          window.open(src, "_blank");
        }
      });

      return modal;
    }

    // ===== نمایش تصویر در مودال =====
    function showImageInModal(imgSrc) {
      const modal = document.getElementById("imageModal") || createModal();
      const modalImg = document.getElementById("modalImage");

      if (!modalImg) return;

      // تنظیم تصویر
      modalImg.setAttribute("src", imgSrc);
      modalImg.setAttribute("alt", "تصویر بزرگ شده");

      // نمایش مودال
      modal.style.display = "flex";
      // کوچک‌ترین تاخیر برای اجرای انیمیشن
      requestAnimationFrame(function () {
        modal.style.opacity = "1";
      });

      // قفل کردن اسکرول
      document.body.style.overflow = "hidden";
    }

    // ===== بستن مودال با بازگشت اسکرول =====
    const originalCloseModal = function () {
      const modal = document.getElementById("imageModal");
      if (modal) {
        modal.style.opacity = "0";
        setTimeout(function () {
          modal.style.display = "none";
          document.body.style.overflow = "";
        }, 300);
      }
    };

    // ===== اتصال به تصاویر کاروسل =====
    function attachToCarouselImages() {
      // تصاویر اصلی داخل کاروسل
      const carouselImages = document.querySelectorAll(
        ".carousel-inner .carousel-item img",
      );

      carouselImages.forEach(function (img) {
        // حذف رویدادهای قبلی برای جلوگیری از تکرار
        img.removeEventListener("click", carouselClickHandler);
        img.addEventListener("click", carouselClickHandler);
      });
    }

    // هندلر کلیک روی تصاویر کاروسل
    function carouselClickHandler(e) {
      e.stopPropagation();
      e.preventDefault();

      const img = this;
      const src = img.getAttribute("src");

      // تصویر بزرگتر را پیدا کنیم (همان تصویر یا تصویر مشابه)
      // بعضی از تصاویر ممکن است از قبل بارگذاری شده باشند
      let fullSrc = src;

      // سعی می‌کنیم تصویر با کیفیت بهتر پیدا کنیم
      // در صورت وجود data-full یا srcset
      if (img.dataset.full) {
        fullSrc = img.dataset.full;
      } else if (img.srcset) {
        const srcsetParts = img.srcset.split(",");
        if (srcsetParts.length > 0) {
          const lastSrc = srcsetParts[srcsetParts.length - 1]
            .trim()
            .split(" ")[0];
          if (lastSrc) fullSrc = lastSrc;
        }
      }

      showImageInModal(fullSrc);
    }

    // هندلر کلیک روی تصاویر کوچک (thumbnail)
    function thumbnailClickHandler(e) {
      e.stopPropagation();
      e.preventDefault();

      const img = this;
      let src = img.getAttribute("src");

      // برای تصاویر کوچک، سعی می‌کنیم تصویر بزرگتر را از کاروسل پیدا کنیم
      const index = img.getAttribute("data-bs-slide-to");
      if (index !== null) {
        const carouselItems = document.querySelectorAll(
          ".carousel-inner .carousel-item",
        );
        const targetItem = carouselItems[parseInt(index)];
        if (targetItem) {
          const targetImg = targetItem.querySelector("img");
          if (targetImg) {
            src = targetImg.getAttribute("src");
          }
        }
      }

      showImageInModal(src);
    }

    // ===== فعال‌سازی thumbnail ها هنگام تغییر اسلاید =====
    function updateActiveThumbnail() {
      const carouselElement = document.getElementById("bookCarousel");
      if (!carouselElement) return;

      const activeIndex = document.querySelector(
        ".carousel-inner .carousel-item.active",
      );
      if (!activeIndex) return;

      // پیدا کردن index اسلاید فعال
      const allItems = document.querySelectorAll(
        ".carousel-inner .carousel-item",
      );
      let currentIndex = 0;
      allItems.forEach(function (item, index) {
        if (item.classList.contains("active")) {
          currentIndex = index;
        }
      });

      // به‌روزرسانی کلاس active در thumbnail ها
      const thumbnails = document.querySelectorAll(".carousel-thumbnails img");
      thumbnails.forEach(function (thumb, index) {
        thumb.classList.remove("active");
        if (index === currentIndex) {
          thumb.classList.add("active");
        }
      });
    }

    // ===== مشاهده تغییرات در DOM (برای تصاویر داینامیک) =====
    let observer = null;

    function startObserving() {
      // اگر MutationObserver پشتیبانی شود
      if (window.MutationObserver) {
        observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (
              mutation.type === "childList" ||
              mutation.type === "attributes"
            ) {
              attachToCarouselImages();
            }
          });
        });

        const target =
          document.querySelector(".carousel-inner") || document.body;
        observer.observe(target, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["src", "srcset", "data-full"],
        });
      }
    }

    // ===== مقداردهی اولیه =====
    function init() {
      createModal();
      attachToCarouselImages();
      startObserving();

      
      // همچنین روی تغییر اسلاید کاروسل، تصاویر رو دوباره متصل کنیم
      const carouselElement = document.getElementById("bookCarousel");
      if (carouselElement) {
        carouselElement.addEventListener("slid.bs.carousel", function () {
          attachToCarouselImages();
          updateActiveThumbnail(); // ← این خط اضافه شده
        });

        // یک بار هم در ابتدا اجرا کن
        setTimeout(updateActiveThumbnail, 100);
      }
    }

    // اجرا پس از بارگذاری کامل صفحه
    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init);
    }
  });
})();

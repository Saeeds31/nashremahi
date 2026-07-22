
(function() {
    'use strict';

    // متغیرهای اصلی
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const SHIPPING_COST = 70000;

    // المنت‌ها
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const confirmDetailsEl = document.getElementById('confirmDetails');

    // المنت‌های مرحله 2
    const subtotal2El = document.getElementById('subtotal2');
    const total2El = document.getElementById('total2');
    const orderItemsEl = document.getElementById('orderItems');

    // ===== نمایش سبد خرید =====
    window.showCart = function() {
        if (!cartItemsEl) return;

        // اگر سبد خالی است
        if (cart.length === 0) {
            cartItemsEl.innerHTML = '';
            if (emptyCartMessage) emptyCartMessage.style.display = 'block';
            calculateTotal();
            return;
        }

        // سبد پر است
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';

        // ساخت آیتم‌های سبد
        let html = '';
        cart.forEach((item, index) => {
            const price = Number(String(item.price).replace(/,/g, '').replace(/[^0-9]/g, ''));
            html += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="main-item">
                        <h4 class="item-title">${item.title}</h4>
                        <div class="item-number">
                            <input type="number" value="1" min="1" data-index="${index}">
                            <div class="price">${price.toLocaleString()} تومان</div>
                        </div>
                    </div>
                </div>
            `;
        });

        cartItemsEl.innerHTML = html;
        calculateTotal();
        updateOrderItems();
    };

    // ===== بروزرسانی آیتم‌های سفارش در مرحله 2 =====
    window.updateOrderItems = function() {
        if (!orderItemsEl) return;

        if (cart.length === 0) {
            orderItemsEl.innerHTML = '<p class="empty-cart-text">سبد خرید خالی است</p>';
            return;
        }

        let html = '';
        cart.forEach((item) => {
            const price = Number(String(item.price).replace(/,/g, '').replace(/[^0-9]/g, ''));
            html += `
                <div class="cardBookCart">
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.image}" alt="${item.title}">
                        <h4 class="item-title">${item.title}</h4>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <input type="number" value="1" min="1">
                        <div class="price">${price.toLocaleString()} تومان</div>
                    </div>
                </div>
            `;
        });

        orderItemsEl.innerHTML = html;
    };

    // ===== محاسبه قیمت =====
    window.calculateTotal = function() {
        let subtotal = 0;
        cart.forEach((item) => {
            let price = String(item.price)
                .replace(/,/g, '')
                .replace(/[^0-9]/g, '');
            subtotal += parseInt(price) || 0;
        });

        // مرحله 1
        const shippingRadio1 = document.querySelector('input[name="shipping"]:checked');
        const shipping1 = (shippingRadio1 && shippingRadio1.value === 'post') ? SHIPPING_COST : 0;
        const total1 = subtotal + shipping1;

        if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString() + ' تومان';
        if (totalEl) totalEl.textContent = total1.toLocaleString() + ' تومان';

        const shippingDisplay = document.getElementById('shippingCostDisplay');
        if (shippingDisplay) {
            shippingDisplay.textContent = (shippingRadio1 && shippingRadio1.value === 'post') ?
                SHIPPING_COST.toLocaleString() + ' تومان' :
                '۰ تومان';
        }

        // مرحله 2
        const shippingRadio2 = document.querySelector('input[name="shipping2"]:checked');
        const shipping2 = (shippingRadio2 && shippingRadio2.value === 'post') ? SHIPPING_COST : 0;
        const total2 = subtotal + shipping2;

        if (subtotal2El) subtotal2El.textContent = subtotal.toLocaleString() + ' تومان';
        if (total2El) total2El.textContent = total2.toLocaleString() + ' تومان';

        const shippingDisplay2 = document.getElementById('shippingCostDisplay2');
        if (shippingDisplay2) {
            shippingDisplay2.textContent = (shippingRadio2 && shippingRadio2.value === 'post') ?
                SHIPPING_COST.toLocaleString() + ' تومان' :
                '۰ تومان';
        }
    };

    // ===== جابجایی بین مراحل =====
    window.goToStep = function(step) {
        // مخفی کردن همه مراحل
        document.querySelectorAll('.step-content').forEach((el) => {
            el.classList.remove('active');
            el.style.display = 'none';
        });

        // نمایش مرحله مورد نظر
        const targetStep = document.querySelector(`.step-content[data-step="${step}"]`);
        if (targetStep) {
            targetStep.classList.add('active');
            targetStep.style.display = 'block';
        }

        // بروزرسانی استپ‌های بالا
        document.querySelectorAll('.step-item').forEach((el) => {
            el.classList.remove('active', 'done');
            const num = parseInt(el.dataset.step);
            if (num === step) {
                el.classList.add('active');
            } else if (num < step && num >= 1) {
                el.classList.add('done');
            }
        });

        // بروزرسانی خطوط
        document.querySelectorAll('.step-line').forEach((el, index) => {
            el.classList.toggle('active', index < step - 1);
        });

        // اگر مرحله 3 هست، اطلاعات رو نمایش بده
        if (step === 3) {
            showConfirmDetails();
        }

        // محاسبه مجدد قیمت‌ها
        calculateTotal();

        // اسکرول به بالای صفحه
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // ===== نمایش اطلاعات تاییدیه =====
    window.showConfirmDetails = function() {
        let subtotal = 0;
        cart.forEach((item) => {
            let price = String(item.price)
                .replace(/,/g, '')
                .replace(/[^0-9]/g, '');
            subtotal += parseInt(price) || 0;
        });

        const shippingRadio2 = document.querySelector('input[name="shipping2"]:checked');
        const shipping = (shippingRadio2 && shippingRadio2.value === 'post') ? SHIPPING_COST : 0;
        const total = subtotal + shipping;
        const shippingText = (shippingRadio2 && shippingRadio2.value === 'post') ?
            `پست پیشتاز (${SHIPPING_COST.toLocaleString()} تومان)` :
            'ارسال با پیک (هزینه برعهده مشتری)';

        const province = document.getElementById('province');
        const city = document.getElementById('city');
        const address = `${province ? province.value : 'تهران'} - ${city ? city.value : 'تهران'}`;

        if (confirmDetailsEl) {
            confirmDetailsEl.innerHTML = `
                <div class="cartPageBox">
                    <div class="confirm-row">
                        <span class="label">تعداد محصولات</span>
                        <span class="value">${cart.length} عدد</span>
                    </div>
                    <div class="confirm-row">
                        <span class="label">قیمت کل</span>
                        <span class="value">${subtotal.toLocaleString()} تومان</span>
                    </div>
                    <div class="confirm-row">
                        <span class="label">روش ارسال</span>
                        <span class="value">${shippingText}</span>
                    </div>
                    <div class="confirm-row">
                        <span class="label">آدرس</span>
                        <span class="value addressValue">${address}</span>
                    </div>
                    <div class="confirm-total">
                        <span class="label">مبلغ قابل پرداخت</span>
                        <span class="value">${total.toLocaleString()} تومان</span>
                    </div>
                </div>
            `;
        }
    };

    // ===== ثبت نهایی سفارش =====
    window.finalizeOrder = function() {
        if (cart.length === 0) {
            alert('سبد خرید شما خالی است!');
            return;
        }
        alert('✅ سفارش شما با موفقیت ثبت شد!');
        localStorage.removeItem('cart');
        cart = [];
        showCart();
        goToStep(1);
    };

    // ===== رویداد تغییر روش حمل و نقل =====
    document.addEventListener('change', function(e) {
        if (e.target.name === 'shipping' || e.target.name === 'shipping2') {
            calculateTotal();
        }
    });

    // ===== اجرای اولیه =====
    // مخفی کردن همه مراحل به جز مرحله 1
    document.querySelectorAll('.step-content').forEach((el) => {
        const stepNum = parseInt(el.dataset.step);
        if (stepNum === 1) {
            el.style.display = 'block';
            el.classList.add('active');
        } else {
            el.style.display = 'none';
            el.classList.remove('active');
        }
    });

    showCart();

    // دکمه‌های مرحله 1
    document.querySelector('#discount')?.addEventListener('click', function() {
        const input = this.closest('.coupon-box').querySelector('input');
        if (input && input.value.trim()) {
            alert('کد تخفیف "' + input.value.trim() + '" اعمال شد!');
        } else {
            alert('لطفاً کد تخفیف را وارد کنید.');
        }
    });

    document.querySelector('#updateShop')?.addEventListener('click', function() {
        alert('سبد خرید به‌روزرسانی شد!');
    });

})();


// متغیرهای اصلی
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const SHIPPING_COST = 70000;
let currentStep = 1;

// المنت‌ها
const cartItemsEl = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartSummary = document.getElementById('cartSummary');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const confirmDetailsEl = document.getElementById('confirmDetails');

// ===== توابع اصلی =====

// نمایش سبد خرید
function showCart() {
    if (!cartItemsEl) return;
    
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartSummary.classList.add('hidden');
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    cartSummary.classList.remove('hidden');
    
    cart.forEach((item, index) => {
        cartItemsEl.innerHTML += `
            <div class="cart-item">
                <button class="remove-btn" onclick="removeItem(${index})">✖</button>
                <img src="${item.image}" alt="${item.title}">
                
                    <h4 class="font500 item-title">${item.title}</h4>
                   
                    <div class="price">${item.price}</div>
                
            </div>
        `;
    });
    
    calculateTotal();
}

// حذف آیتم
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

// محاسبه قیمت
function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        let price = String(item.price).replace(/,/g, '').replace(/[^0-9]/g, '');
        subtotal += parseInt(price) || 0;
    });
    
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    const shipping = shippingMethod && shippingMethod.value === 'post' ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    
    if (subtotalEl) subtotalEl.textContent = subtotal.toLocaleString() + ' تومان';
    if (totalEl) totalEl.textContent = total.toLocaleString() + ' تومان';
    const shippingDisplay = document.getElementById('shippingCostDisplay');
    if (shippingDisplay) shippingDisplay.textContent = SHIPPING_COST.toLocaleString() + ' تومان';
}

// جابجایی بین مراحل
function goToStep(step) {
    currentStep = step;
    
    // بروزرسانی استپ‌ها
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active', 'completed');
        const num = parseInt(el.dataset.step);
        if (num === step) el.classList.add('active');
        else if (num < step) el.classList.add('completed');
    });
    
    // بروزرسانی محتوا
    document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.step) === step) el.classList.add('active');
    });
    
    // اگر مرحله 3 هست، اطلاعات رو نمایش بده
    if (step === 3) {
        showConfirmDetails();
    }
}

// نمایش اطلاعات تاییدیه
function showConfirmDetails() {
    let subtotal = 0;
    cart.forEach(item => {
        let price = String(item.price).replace(/,/g, '').replace(/[^0-9]/g, '');
        subtotal += parseInt(price) || 0;
    });
    
    const shippingMethod = document.querySelector('input[name="shipping"]:checked');
    const shipping = shippingMethod && shippingMethod.value === 'post' ? SHIPPING_COST : 0;
    const total = subtotal + shipping;
    const shippingText = shippingMethod && shippingMethod.value === 'post' ? 
        `پست پیشتاز (${SHIPPING_COST.toLocaleString()} تومان)` : 
        'ارسال با پیک (هزینه برعهده مشتری)';
    
    const province = document.getElementById('province');
    const city = document.getElementById('city');
    const address = `${province ? province.value : 'تهران'} - ${city ? city.value : 'تهران'}`;
    
    if (confirmDetailsEl) {
        confirmDetailsEl.innerHTML = `
            <div class="row"><span>تعداد محصولات</span><span>${cart.length} عدد</span></div>
            <div class="row"><span>قیمت کل</span><span>${subtotal.toLocaleString()} تومان</span></div>
            <div class="row"><span>روش ارسال</span><span>${shippingText}</span></div>
            <div class="row"><span>آدرس</span><span>${address}</span></div>
            <div class="row finalRow">
                <span>مبلغ قابل پرداخت</span>
                <span class="mainText">${total.toLocaleString()} تومان</span>
            </div>
        `;
    }
}

// ثبت نهایی سفارش
function finalizeOrder() {
    if (cart.length === 0) {
        alert('سبد خرید شما خالی است!');
        return;
    }
    alert('✅ سفارش شما با موفقیت ثبت شد!');
    localStorage.removeItem('cart');
    cart = [];
    showCart();
    goToStep(1);
}

// ===== دکمه افزودن به سبد =====
document.addEventListener('click', function(e) {
    const button = e.target.closest('.add-cart');
    if (!button) return;
    
    e.preventDefault();
    const card = button.closest('.product-cart');
    if (!card) return;
    
    const product = {
        image: card.querySelector('img')?.src || '',
        title: card.querySelector('.productTitle')?.innerText || 'عنوان نامشخص',
        author: card.querySelectorAll('strong')[0]?.innerText || 'نامشخص',
        translator: card.querySelectorAll('strong')[1]?.innerText || 'نامشخص',
        price: card.querySelector('.price')?.innerText || '۰'
    };
    
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    cart = currentCart;
    showCart();
    goToStep(1);
});

// ===== رویداد تغییر روش حمل و نقل =====
document.querySelectorAll('input[name="shipping"]').forEach(input => {
    input.addEventListener('change', function() {
        calculateTotal();
    });
});

// ===== اجرای اولیه =====
showCart();

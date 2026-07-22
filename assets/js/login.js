(function () {
  "use strict";

  // ========== عناصر DOM ==========
  const stepPhone = document.getElementById("stepPhone");
  const stepCode = document.getElementById("stepCode");
  const stepSuccess = document.getElementById("stepSuccess");

  const phoneInput = document.getElementById("phoneInput");
  const sendCodeBtn = document.getElementById("sendCodeBtn");
  const displayPhone = document.getElementById("displayPhone");
  const changePhoneBtn = document.getElementById("changePhoneBtn");
  const resendCodeBtn = document.getElementById("resendCodeBtn");
  const verifyBtn = document.getElementById("verifyBtn");

  const otpInputs = [
    document.getElementById("otp1"),
    document.getElementById("otp2"),
    document.getElementById("otp3"),
    document.getElementById("otp4"),
    document.getElementById("otp5"),
    document.getElementById("otp6"),
  ];

  const stepDots = [
    document.getElementById("stepDot1"),
    document.getElementById("stepDot2"),
    document.getElementById("stepDot3"),
  ];
  const stepLines = [
    document.getElementById("stepLine1"),
    document.getElementById("stepLine2"),
  ];

  const timerCount = document.getElementById("timerCount");
  const resendTimer = document.getElementById("resendTimer");

  let timerInterval = null;
  let remainingSeconds = 60;
  let isTimerRunning = false;
  function showStep(stepNumber) {
    [stepPhone, stepCode, stepSuccess].forEach((el) =>
      el.classList.remove("active"),
    );

    if (stepNumber === 1) stepPhone.classList.add("active");
    else if (stepNumber === 2) stepCode.classList.add("active");
    else if (stepNumber === 3) stepSuccess.classList.add("active");

    stepDots.forEach((dot, index) => {
      dot.classList.remove("active", "done");
      if (index + 1 === stepNumber) dot.classList.add("active");
      else if (index + 1 < stepNumber) dot.classList.add("done");
    });

    stepLines.forEach((line, index) => {
      line.classList.remove("active");
      if (index + 1 < stepNumber) line.classList.add("active");
    });
  }

  function getOTPCode() {
    let code = "";
    otpInputs.forEach((input) => {
      code += input.value || "";
    });
    return code;
  }
  function clearOTP() {
    otpInputs.forEach((input) => {
      input.value = "";
      input.classList.remove("filled");
    });
    otpInputs[0].focus();
  }

  function focusNextOTP(currentIndex) {
    if (currentIndex < otpInputs.length - 1) {
      otpInputs[currentIndex + 1].focus();
    }
  }

  function focusPrevOTP(currentIndex) {
    if (currentIndex > 0) {
      otpInputs[currentIndex - 1].focus();
    }
  }

  function startResendTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    remainingSeconds = 60;
    resendTimer.style.display = "inline";
    resendCodeBtn.style.pointerEvents = "none";
    resendCodeBtn.style.opacity = "0.5";

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      remainingSeconds--;
      timerCount.textContent = remainingSeconds;
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        resendTimer.style.display = "none";
        resendCodeBtn.style.pointerEvents = "auto";
        resendCodeBtn.style.opacity = "1";
      }
    }, 1000);
  }

  function simulateSendCode(phone) {
    return true;
  }

  function simulateVerifyCode(code) {
    return code === "123456";
  }

  sendCodeBtn.addEventListener("click", function () {
    const phone = phoneInput.value.trim();
    if (phone.length < 11 || phone.length > 11 || !/^[0-9]+$/.test(phone)) {
      alert("لطفاً یک شماره موبایل ۱۱ رقمی معتبر وارد کنید.");
      phoneInput.focus();
      return;
    }

    // شبیه‌سازی ارسال کد
    if (simulateSendCode(phone)) {
      displayPhone.textContent = phone;
      clearOTP();
      showStep(2);
      startResendTimer();
    }
  });

  phoneInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendCodeBtn.click();
    }
  });

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 11);
  });
  otpInputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 1);
      if (this.value.length === 1) {
        this.classList.add("filled");
        focusNextOTP(index);
      } else {
        this.classList.remove("filled");
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value === "") {
        e.preventDefault();
        focusPrevOTP(index);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusNextOTP(index);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusPrevOTP(index);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const code = getOTPCode();
        if (code.length === 6) {
          verifyBtn.click();
        }
      }
    });
    input.addEventListener("focus", function () {
      this.select();
    });
    input.addEventListener("paste", function (e) {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData("text");
      const digits = pasted.replace(/\D/g, "").slice(0, 6);
      if (digits.length > 0) {
        otpInputs.forEach((otp, i) => {
          if (i < digits.length) {
            otp.value = digits[i] || "";
            otp.classList.add("filled");
          } else {
            otp.value = "";
            otp.classList.remove("filled");
          }
        });
        const nextIndex = Math.min(digits.length, otpInputs.length - 1);
        if (nextIndex < otpInputs.length) {
          otpInputs[nextIndex].focus();
        }
        if (digits.length === 6) {
          setTimeout(() => verifyBtn.click(), 300);
        }
      }
    });
  });

  verifyBtn.addEventListener("click", function () {
    const code = getOTPCode();

    if (code.length !== 6) {
      alert("لطفاً کد ۶ رقمی را کامل وارد کنید.");
      return;
    }

    if (simulateVerifyCode(code)) {
      showStep(3);
      setTimeout(() => {
        window.location.href = "/pages/dashboard/index.html";
      }, 2000);
    } else {
      alert("❌ کد وارد شده صحیح نیست. لطفاً مجدداً تلاش کنید.");
      clearOTP();
    }
  });

  changePhoneBtn.addEventListener("click", function () {
    clearInterval(timerInterval);
    isTimerRunning = false;
    resendTimer.style.display = "none";
    resendCodeBtn.style.pointerEvents = "auto";
    resendCodeBtn.style.opacity = "1";
    showStep(1);
    phoneInput.focus();
  });

  resendCodeBtn.addEventListener("click", function () {
    if (isTimerRunning) return;

    const phone = displayPhone.textContent.trim();
    if (simulateSendCode(phone)) {
      clearOTP();
      startResendTimer();
      alert("📨 کد جدید به شماره " + phone + " ارسال شد.");
    }
  });

  showStep(1);
  phoneInput.focus();
  resendTimer.style.display = "none";
})();

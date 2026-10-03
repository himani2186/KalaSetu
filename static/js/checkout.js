/* =========================================================
   LOCALART — CHECKOUT JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const checkoutForm = document.getElementById("checkout-form");
    const placeOrderBtn = document.getElementById("place-order-btn");


    /* =====================================================
       PAYMENT METHOD SELECTION
       ===================================================== */

    const paymentOptions =
        document.querySelectorAll(".payment-option");

    paymentOptions.forEach(function (option) {

        const radio = option.querySelector(
            'input[type="radio"]'
        );

        option.addEventListener("click", function () {

            paymentOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            option.classList.add("active");

            radio.checked = true;

        });

    });


    /* =====================================================
       MOBILE NUMBER — ONLY NUMBERS
       ===================================================== */

    const mobileInput =
        document.getElementById("shipping_mobile");

    if (mobileInput) {

        mobileInput.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

        });

    }


    /* =====================================================
       PINCODE — ONLY NUMBERS
       ===================================================== */

    const pincodeInput =
        document.getElementById("shipping_pincode");

    if (pincodeInput) {

        pincodeInput.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 6);

        });

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener("submit", function (event) {

            /*
             * Let normal HTML required validation
             * handle empty fields first.
             */

            if (!checkoutForm.checkValidity()) {

                event.preventDefault();

                checkoutForm.reportValidity();

                return;
            }


            /* =============================================
               MOBILE VALIDATION
               ============================================= */

            if (mobileInput) {

                const mobile =
                    mobileInput.value.trim();

                if (!/^[6-9]\d{9}$/.test(mobile)) {

                    event.preventDefault();

                    showCheckoutToast(
                        "Please enter a valid 10-digit mobile number.",
                        "error"
                    );

                    mobileInput.focus();

                    return;
                }

            }


            /* =============================================
               PINCODE VALIDATION
               ============================================= */

            if (pincodeInput) {

                const pincode =
                    pincodeInput.value.trim();

                if (!/^\d{6}$/.test(pincode)) {

                    event.preventDefault();

                    showCheckoutToast(
                        "Please enter a valid 6-digit pincode.",
                        "error"
                    );

                    pincodeInput.focus();

                    return;
                }

            }


            /* =============================================
               PLACE ORDER LOADING STATE
               ============================================= */

            if (placeOrderBtn) {

                placeOrderBtn.disabled = true;

                placeOrderBtn.innerHTML = `
                    <span>
                        Processing Order...
                    </span>

                    <i class="ri-loader-4-line checkout-spinner"></i>
                `;

            }

        });

    }


    /* =====================================================
       TOAST
       ===================================================== */

    function showCheckoutToast(message, type = "success") {

        const oldToast =
            document.querySelector(".checkout-toast");

        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");

        toast.className =
            "checkout-toast";


        if (type === "error") {
            toast.classList.add("error");
        }


        toast.innerHTML = `
            <i class="${
                type === "error"
                    ? "ri-error-warning-line"
                    : "ri-check-line"
            }"></i>

            <span>${message}</span>
        `;


        document.body.appendChild(toast);


        setTimeout(function () {

            toast.classList.add("show");

        }, 10);


        setTimeout(function () {

            toast.classList.remove("show");

            setTimeout(function () {

                toast.remove();

            }, 300);

        }, 2800);

    }

});
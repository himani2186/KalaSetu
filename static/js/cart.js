/* =========================================================
   LOCALART — CART JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       QUANTITY — DECREASE
       ===================================================== */

    document.querySelectorAll(".decrease-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const artworkId = Number(this.dataset.artworkId);

            const cartItem = this.closest(".cart-item");
            const quantityValue = cartItem.querySelector(".quantity-value");

            let quantity = Number(quantityValue.textContent);

            if (quantity > 1) {
                quantity--;

                updateCartItem(
                    artworkId,
                    quantity,
                    cartItem
                );
            }
        });

    });


    /* =====================================================
       QUANTITY — INCREASE
       ===================================================== */

    document.querySelectorAll(".increase-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const artworkId = Number(this.dataset.artworkId);

            const cartItem = this.closest(".cart-item");
            const quantityValue = cartItem.querySelector(".quantity-value");

            let quantity = Number(quantityValue.textContent);

            quantity++;

            updateCartItem(
                artworkId,
                quantity,
                cartItem
            );

        });

    });


    /* =====================================================
       REMOVE CART ITEM
       ===================================================== */

    document.querySelectorAll(".remove-cart-item").forEach(function (button) {

        button.addEventListener("click", function () {

            const artworkId = Number(this.dataset.artworkId);

            const cartItem = this.closest(".cart-item");

            removeCartItem(
                artworkId,
                cartItem
            );

        });

    });


    /* =====================================================
       UPDATE CART ITEM
       ===================================================== */

    function updateCartItem(artworkId, quantity, cartItem) {

        fetch("/api/cart/update", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                artwork_id: artworkId,
                quantity: quantity
            })
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            if (data.success) {

                /* Update quantity on screen */
                const quantityValue =
                    cartItem.querySelector(".quantity-value");

                quantityValue.textContent = quantity;


                /* Update item total */
                const priceText =
                    cartItem.querySelector(".unit-price").textContent;

                const price =
                    parseFloat(
                        priceText.replace("₹", "").replace(/,/g, "")
                    );

                const itemTotal =
                    cartItem.querySelector(".item-total");

                if (itemTotal) {
                    itemTotal.textContent =
                        "₹" + (price * quantity).toFixed(2);
                }


                /*
                   Reload page so subtotal and total
                   always match the backend.
                */
                location.reload();

            } else {

                showToast(
                    data.message || "Unable to update cart.",
                    "error"
                );

            }

        })

        .catch(function (error) {

            console.error("Cart update error:", error);

            showToast(
                "Something went wrong. Please try again.",
                "error"
            );

        });

    }


    /* =====================================================
       REMOVE CART ITEM
       ===================================================== */

    function removeCartItem(artworkId, cartItem) {

        fetch("/api/cart/remove", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                artwork_id: artworkId
            })
        })

        .then(function (response) {
            return response.json();
        })

        .then(function (data) {

            if (data.success) {

                /* Small animation before removing */
                cartItem.style.transition =
                    "opacity 0.3s ease, transform 0.3s ease";

                cartItem.style.opacity = "0";

                cartItem.style.transform =
                    "translateX(25px)";

                setTimeout(function () {

                    cartItem.remove();

                    /*
                       Reload to update subtotal,
                       item count and empty state.
                    */
                    location.reload();

                }, 300);

            } else {

                showToast(
                    data.message || "Unable to remove item.",
                    "error"
                );

            }

        })

        .catch(function (error) {

            console.error("Cart remove error:", error);

            showToast(
                "Something went wrong. Please try again.",
                "error"
            );

        });

    }


    /* =====================================================
       TOAST MESSAGE
       ===================================================== */

    function showToast(message, type = "success") {

        /* Remove old toast */
        const oldToast = document.querySelector(".cart-toast");

        if (oldToast) {
            oldToast.remove();
        }


        const toast = document.createElement("div");

        toast.className = "cart-toast";


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


        /* Show */
        setTimeout(function () {
            toast.classList.add("show");
        }, 10);


        /* Hide */
        setTimeout(function () {

            toast.classList.remove("show");

            setTimeout(function () {
                toast.remove();
            }, 300);

        }, 2500);

    }

});
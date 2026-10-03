// ======================================================
// LOCALART - ARTWORK DETAILS JAVASCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------------------------
    // ELEMENTS
    // --------------------------------------------------

    const artworkId = Number(
        document.querySelector("[data-artwork-id]")?.dataset.artworkId ||
        document.body.dataset.artworkId ||
        0
    );

    const mainImage = document.getElementById("mainArtworkImage");
    const thumbnails = document.querySelectorAll(".art-thumb");

    const quantityInput = document.getElementById("quantityInput");
    const minusBtn = document.getElementById("qtyMinus");
    const plusBtn = document.getElementById("qtyPlus");

    const addCartBtn = document.getElementById("addToCartBtn");
    const buyNowBtn = document.getElementById("buyNowBtn");
    const wishlistBtn = document.getElementById("wishlistBtn");

    const tabButtons = document.querySelectorAll(".detail-tab");
    const tabPanels = document.querySelectorAll(".detail-panel");


    // --------------------------------------------------
    // IMAGE GALLERY
    // --------------------------------------------------

    thumbnails.forEach((thumbnail) => {

        thumbnail.addEventListener("click", () => {

            const imageUrl = thumbnail.dataset.image;

            if (!imageUrl || !mainImage) return;

            mainImage.src = imageUrl;

            thumbnails.forEach((item) => {
                item.classList.remove("active");
            });

            thumbnail.classList.add("active");
        });

    });


    // --------------------------------------------------
    // QUANTITY
    // --------------------------------------------------

    function getQuantity() {

        if (!quantityInput) return 1;

        let quantity = parseInt(quantityInput.value, 10);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        const maxStock = parseInt(
            quantityInput.dataset.stock || "999",
            10
        );

        if (quantity > maxStock) {
            quantity = maxStock;
        }

        quantityInput.value = quantity;

        return quantity;
    }


    if (minusBtn) {

        minusBtn.addEventListener("click", () => {

            let quantity = getQuantity();

            if (quantity > 1) {
                quantity--;
            }

            quantityInput.value = quantity;
        });

    }


    if (plusBtn) {

        plusBtn.addEventListener("click", () => {

            let quantity = getQuantity();

            const maxStock = parseInt(
                quantityInput.dataset.stock || "999",
                10
            );

            if (quantity < maxStock) {
                quantity++;
                quantityInput.value = quantity;
            } else {
                showMessage("Only limited stock is available.", "warning");
            }

        });

    }


    if (quantityInput) {

        quantityInput.addEventListener("input", () => {
            getQuantity();
        });

    }


    // --------------------------------------------------
    // MESSAGE / TOAST
    // --------------------------------------------------

    function showMessage(message, type = "success") {

        const oldToast = document.querySelector(".la-toast");

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className = `la-toast ${type}`;

        toast.innerHTML = `
            <span>${message}</span>
            <button type="button" class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        toast.querySelector(".toast-close")
            .addEventListener("click", () => {
                toast.classList.remove("show");

                setTimeout(() => {
                    toast.remove();
                }, 250);
            });

        setTimeout(() => {

            if (!toast.isConnected) return;

            toast.classList.remove("show");

            setTimeout(() => {
                if (toast.isConnected) {
                    toast.remove();
                }
            }, 250);

        }, 3000);
    }


    // --------------------------------------------------
    // WISHLIST
    // --------------------------------------------------

    if (wishlistBtn) {

        wishlistBtn.addEventListener("click", async () => {

            if (!artworkId) {
                showMessage("Artwork information is missing.", "error");
                return;
            }

            wishlistBtn.disabled = true;

            try {

                const response = await fetch(
                    "/api/wishlist/toggle",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            artwork_id: artworkId
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || data.error || "Something went wrong."
                    );
                }

                const icon = wishlistBtn.querySelector("i");

                if (data.wishlisted) {

                    wishlistBtn.classList.add("active");

                    if (icon) {
                        icon.className = "ri-heart-fill";
                    }

                    wishlistBtn.setAttribute(
                        "aria-label",
                        "Remove from wishlist"
                    );

                    showMessage(
                        "Artwork added to your wishlist ❤️",
                        "success"
                    );

                } else {

                    wishlistBtn.classList.remove("active");

                    if (icon) {
                        icon.className = "ri-heart-line";
                    }

                    wishlistBtn.setAttribute(
                        "aria-label",
                        "Add to wishlist"
                    );

                    showMessage(
                        "Artwork removed from wishlist.",
                        "success"
                    );
                }

            } catch (error) {

                console.error("Wishlist error:", error);

                showMessage(
                    error.message || "Please login to use wishlist.",
                    "error"
                );

            } finally {

                wishlistBtn.disabled = false;

            }

        });

    }


    // --------------------------------------------------
    // ADD TO CART
    // --------------------------------------------------

    if (addCartBtn) {

        addCartBtn.addEventListener("click", async () => {

            if (!artworkId) {
                showMessage("Artwork information is missing.", "error");
                return;
            }

            const quantity = getQuantity();

            addCartBtn.disabled = true;

            const originalHTML = addCartBtn.innerHTML;

            addCartBtn.innerHTML = `
                <i class="ri-loader-4-line"></i>
                Adding...
            `;

            try {

                const response = await fetch(
                    "/api/cart/add",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            artwork_id: artworkId,
                            quantity: quantity
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || data.error || "Unable to add artwork."
                    );
                }

                showMessage(
                    quantity > 1
                        ? `${quantity} artworks added to your cart 🛒`
                        : "Artwork added to your cart 🛒",
                    "success"
                );

                // Update cart count if navbar has one
                updateCartCount(data.cart_count);

                // Small visual feedback
                addCartBtn.classList.add("added");

                addCartBtn.innerHTML = `
                    <i class="ri-check-line"></i>
                    Added to Cart
                `;

                setTimeout(() => {

                    if (!addCartBtn.isConnected) return;

                    addCartBtn.classList.remove("added");
                    addCartBtn.innerHTML = originalHTML;

                }, 1800);

            } catch (error) {

                console.error("Cart error:", error);

                showMessage(
                    error.message || "Please login to add items to cart.",
                    "error"
                );

                addCartBtn.innerHTML = originalHTML;

            } finally {

                addCartBtn.disabled = false;

            }

        });

    }


    // --------------------------------------------------
    // BUY NOW
    // --------------------------------------------------

    if (buyNowBtn) {

        buyNowBtn.addEventListener("click", () => {

            if (!artworkId) {
                showMessage("Artwork information is missing.", "error");
                return;
            }

            const quantity = getQuantity();

            window.location.href =
                `/checkout?buy_now=${artworkId}&quantity=${quantity}`;

        });

    }


    // --------------------------------------------------
    // DETAIL TABS
    // --------------------------------------------------

    tabButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const targetId = button.dataset.tab;

            if (!targetId) return;

            tabButtons.forEach((tab) => {
                tab.classList.remove("active");
            });

            tabPanels.forEach((panel) => {
                panel.classList.remove("active");
            });

            button.classList.add("active");

            const targetPanel =
                document.getElementById(targetId);

            if (targetPanel) {
                targetPanel.classList.add("active");
            }

        });

    });


    // --------------------------------------------------
    // UPDATE CART COUNT
    // --------------------------------------------------

    function updateCartCount(count) {

        if (count === undefined || count === null) return;

        const cartCounters = document.querySelectorAll(
            ".cart-count, [data-cart-count]"
        );

        cartCounters.forEach((counter) => {

            counter.textContent = count;

            if (Number(count) > 0) {
                counter.classList.remove("hidden");
            }

        });

    }


    // --------------------------------------------------
    // ESCAPE KEY FOR TOASTS
    // --------------------------------------------------

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            const toast = document.querySelector(".la-toast");

            if (toast) {
                toast.remove();
            }

        }

    });

});
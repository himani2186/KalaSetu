document.addEventListener("DOMContentLoaded", () => {

    const artGrid = document.getElementById("artGrid");
    const moreArtworks = document.getElementById("moreArtworks");
    const viewMoreBtn = document.getElementById("viewMoreBtn");

    // =====================================================
    // TOAST
    // =====================================================

    function showToast(message, type = "success") {

        let toast = document.getElementById("shopToast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "shopToast";
            toast.className = "shop-toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = `shop-toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }


    // =====================================================
    // UPDATE CART COUNT
    // =====================================================

    function updateCartCount(count) {

        document.querySelectorAll(
            ".cart-count, #cartCount, [data-cart-count]"
        ).forEach(element => {

            element.textContent = count;

        });
    }


    // =====================================================
    // WISHLIST BUTTON
    // =====================================================

    document.querySelectorAll(".wishlist-btn").forEach(button => {

        button.addEventListener("click", async function (event) {

            event.preventDefault();
            event.stopPropagation();

            const artworkId = this.dataset.artworkId;

            if (!artworkId) {
                showToast("Artwork ID missing.", "error");
                return;
            }

            try {

                const response = await fetch(
                    "/api/wishlist/toggle",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            artwork_id: Number(artworkId)
                        })
                    }
                );

                const data = await response.json();

                // -----------------------------------------
                // LOGIN REQUIRED
                // -----------------------------------------

                if (response.status === 401) {

                    showToast(
                        "Please login to use wishlist.",
                        "error"
                    );

                    setTimeout(() => {
                        window.location.href = "/auth";
                    }, 1000);

                    return;
                }


                // -----------------------------------------
                // SUCCESS
                // -----------------------------------------

                if (data.success) {

                    if (data.wishlisted) {

                        this.classList.add("active");

                        this.innerHTML =
                            '<i class="ri-heart-fill"></i>';

                        this.setAttribute(
                            "aria-label",
                            "Remove from wishlist"
                        );

                        showToast(
                            "Added to wishlist ❤️"
                        );

                    } else {

                        this.classList.remove("active");

                        this.innerHTML =
                            '<i class="ri-heart-line"></i>';

                        this.setAttribute(
                            "aria-label",
                            "Add to wishlist"
                        );

                        showToast(
                            "Removed from wishlist"
                        );
                    }

                } else {

                    showToast(
                        data.message || "Something went wrong.",
                        "error"
                    );
                }

            } catch (error) {

                console.error(
                    "Wishlist error:",
                    error
                );

                showToast(
                    "Unable to update wishlist.",
                    "error"
                );
            }

        });

    });


    // =====================================================
    // ADD TO CART
    // =====================================================

    document.querySelectorAll(".cart-btn, .add-cart-btn").forEach(button => {

        button.addEventListener("click", async function (event) {

            event.preventDefault();
            event.stopPropagation();

            const artworkId = this.dataset.artworkId;

            if (!artworkId) {

                showToast(
                    "Artwork ID missing.",
                    "error"
                );

                return;
            }

            try {

                const response = await fetch(
                    "/api/cart/add",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            artwork_id: Number(artworkId),
                            quantity: 1
                        })
                    }
                );

                const data = await response.json();


                if (response.status === 401) {

                    showToast(
                        "Please login to add items to cart.",
                        "error"
                    );

                    setTimeout(() => {
                        window.location.href = "/auth";
                    }, 1000);

                    return;
                }


                if (data.success) {

                    updateCartCount(
                        data.cart_count
                    );

                    showToast(
                        "Added to cart 🛒"
                    );

                } else {

                    showToast(
                        data.message ||
                        "Unable to add to cart.",
                        "error"
                    );
                }

            } catch (error) {

                console.error(
                    "Cart error:",
                    error
                );

                showToast(
                    "Unable to add to cart.",
                    "error"
                );
            }

        });

    });


    // =====================================================
    // ORDER NOW
    // =====================================================

    document.querySelectorAll(".order-now-btn").forEach(button => {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const artworkId =
                this.dataset.artworkId;

            if (!artworkId) {

                showToast(
                    "Artwork ID missing.",
                    "error"
                );

                return;
            }

            window.location.href =
                `/checkout?buy_now=${Number(artworkId)}&quantity=1`;

        });

    });


    // =====================================================
    // VIEW ARTWORK
    // =====================================================

    document.querySelectorAll(".artwork-card").forEach(card => {

        card.addEventListener("click", function (event) {

            // Don't redirect when clicking buttons
            if (
                event.target.closest(".wishlist-btn") ||
                event.target.closest(".cart-btn") ||
                event.target.closest(".add-cart-btn") ||
                event.target.closest(".order-now-btn")
            ) {
                return;
            }

            const artworkId =
                this.dataset.artworkId;

            if (!artworkId) return;

            window.location.href =
                `/artwork/${Number(artworkId)}`;

        });

    });


    // =====================================================
    // VIEW MORE
    // =====================================================

    if (viewMoreBtn && moreArtworks) {

        viewMoreBtn.addEventListener(
            "click",
            function () {

                const isHidden =
                    moreArtworks.style.display === "none" ||
                    moreArtworks.style.display === "";

                if (isHidden) {

                    moreArtworks.style.display =
                        "grid";

                    this.innerHTML =
                        'Show Less <i class="ri-arrow-up-line"></i>';

                } else {

                    moreArtworks.style.display =
                        "none";

                    this.innerHTML =
                        'View More <i class="ri-arrow-down-line"></i>';
                }

            }
        );

    }

});
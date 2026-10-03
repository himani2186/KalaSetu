/* =========================================
   LOCALART - WISHLIST JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       REMOVE FROM WISHLIST
       ===================================== */

    const removeButtons = document.querySelectorAll(".remove-wishlist");

    removeButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const artworkId = Number(
                button.dataset.artworkId
            );

            if (!artworkId) {
                return;
            }

            button.disabled = true;

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

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Unable to update wishlist."
                    );
                }

                const card = document.querySelector(
                    `.wishlist-card[data-artwork-id="${artworkId}"]`
                );

                if (card) {

                    card.style.transition =
                        "opacity 0.25s ease, transform 0.25s ease";

                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";

                    setTimeout(() => {

                        card.remove();

                        checkEmptyWishlist();

                    }, 250);
                }

                showWishlistMessage(
                    "Removed from wishlist",
                    "success"
                );

            } catch (error) {

                console.error(error);

                button.disabled = false;

                showWishlistMessage(
                    error.message || "Something went wrong.",
                    "error"
                );
            }

        });

    });


    /* =====================================
       ADD TO CART
       ===================================== */

    const cartButtons = document.querySelectorAll(".add-cart-btn");

    cartButtons.forEach(button => {

        button.addEventListener("click", async () => {

            const artworkId = Number(
                button.dataset.artworkId
            );

            if (!artworkId || button.disabled) {
                return;
            }

            const originalHTML = button.innerHTML;

            button.disabled = true;

            button.innerHTML = `
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
                            quantity: 1
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message || "Unable to add to cart."
                    );
                }

                button.innerHTML = `
                    <i class="ri-check-line"></i>
                    Added to Cart
                `;

                showWishlistMessage(
                    "Artwork added to cart",
                    "success"
                );

                setTimeout(() => {

                    button.disabled = false;

                    button.innerHTML = originalHTML;

                }, 1400);

            } catch (error) {

                console.error(error);

                button.disabled = false;
                button.innerHTML = originalHTML;

                showWishlistMessage(
                    error.message || "Something went wrong.",
                    "error"
                );
            }

        });

    });


    /* =====================================
       EMPTY STATE
       ===================================== */

    function checkEmptyWishlist() {

        const cards = document.querySelectorAll(
            ".wishlist-card"
        );

        if (cards.length !== 0) {
            return;
        }

        const grid = document.querySelector(
            ".wishlist-grid"
        );

        if (grid) {
            grid.remove();
        }

        const page = document.querySelector(
            ".wishlist-page"
        );

        if (!page) {
            return;
        }

        const emptyState = document.createElement("div");

        emptyState.className = "empty-wishlist";

        emptyState.innerHTML = `
            <div class="empty-icon">
                <i class="ri-heart-3-line"></i>
            </div>

            <h2>Your wishlist is empty</h2>

            <p>
                You haven't saved any artwork yet.
                Explore LocalArt and discover something special.
            </p>

            <a href="/shop" class="explore-btn">
                <i class="ri-compass-3-line"></i>
                Explore Artworks
            </a>
        `;

        page.appendChild(emptyState);
    }


    /* =====================================
       TOAST MESSAGE
       ===================================== */

    function showWishlistMessage(message, type) {

        const oldToast = document.querySelector(
            ".wishlist-toast"
        );

        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement("div");

        toast.className =
            `wishlist-toast ${type}`;

        const icon =
            type === "success"
                ? "ri-check-line"
                : "ri-error-warning-line";

        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add("show");
        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 250);

        }, 2200);
    }

});
/* =========================================================
   LOCALART — MY ORDERS JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ORDER CARD ENTRANCE ANIMATION
    ----------------------------------------------------- */

    const orderCards = document.querySelectorAll(".order-card");

    orderCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(18px)";

        setTimeout(() => {

            card.style.transition =
                "opacity 0.45s ease, transform 0.45s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, index * 100);
    });


    /* -----------------------------------------------------
       BUTTON LOADING STATE
    ----------------------------------------------------- */

    const navigationButtons = document.querySelectorAll(
        ".view-order-btn, .track-order-btn, .shop-btn, .explore-btn"
    );

    navigationButtons.forEach(button => {

        button.addEventListener("click", function () {

            // Prevent changing already processed buttons
            if (this.classList.contains("loading")) {
                return;
            }

            this.classList.add("loading");

            const icon = this.querySelector("i");

            if (icon) {
                icon.className = "ri-loader-4-line";
                icon.style.animation = "ordersSpin 0.8s linear infinite";
            }

        });

    });


    /* -----------------------------------------------------
       ORDER CARD HOVER EFFECT
    ----------------------------------------------------- */

    orderCards.forEach(card => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("order-hover");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("order-hover");
        });

    });


    /* -----------------------------------------------------
       PREVENT DOUBLE CLICK
    ----------------------------------------------------- */

    navigationButtons.forEach(button => {

        button.addEventListener("dblclick", event => {
            event.preventDefault();
        });

    });

});


/* =========================================================
   SPINNER ANIMATION
   ========================================================= */

const ordersSpinnerStyle = document.createElement("style");

ordersSpinnerStyle.textContent = `
    @keyframes ordersSpin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    .order-card.order-hover {
        box-shadow:
            0 17px 42px rgba(69, 39, 24, 0.13);
    }

    .order-card .loading {
        pointer-events: none;
        opacity: 0.75;
    }
`;

document.head.appendChild(ordersSpinnerStyle);
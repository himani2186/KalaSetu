/* =========================================================
   REGIONAL ART PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------------------------------
    // ART CARD REVEAL ANIMATION
    // -----------------------------------------------------

    const cards = document.querySelectorAll(".state-art-card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        cards.forEach(function (card, index) {

            card.style.transitionDelay = `${index * 0.08}s`;

            observer.observe(card);

        });

    } else {

        cards.forEach(function (card) {
            card.classList.add("show");
        });

    }


    // -----------------------------------------------------
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // -----------------------------------------------------

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // -----------------------------------------------------
    // BUTTON CLICK FEEDBACK
    // -----------------------------------------------------

    const exploreButtons =
        document.querySelectorAll(".explore-art-btn");

    exploreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            this.classList.add("clicked");

            setTimeout(() => {
                this.classList.remove("clicked");
            }, 300);

        });

    });

});
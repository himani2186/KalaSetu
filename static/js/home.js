/* =========================================================
   LOCALART — HOME PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(".hero-slide");

    const dots =
        document.querySelectorAll(".dot");

    const nextBtn =
        document.getElementById("heroNext");

    const prevBtn =
        document.getElementById("heroPrev");

    const heroSlider =
        document.querySelector(".hero-slider");


    let currentSlide = 0;

    let sliderTimer;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showSlide(index) {

        if (!slides.length) {
            return;
        }


        if (index >= slides.length) {

            currentSlide = 0;

        }

        else if (index < 0) {

            currentSlide =
                slides.length - 1;

        }

        else {

            currentSlide = index;

        }


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }


    /* =====================================================
       PREVIOUS SLIDE
    ===================================================== */

    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                restartSlider();

            }
        );

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();

                restartSlider();

            }
        );

    }


    /* =====================================================
       DOT NAVIGATION
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showSlide(index);

                restartSlider();

            }
        );

    });


    /* =====================================================
       START AUTOMATIC SLIDER
    ===================================================== */

    function startSlider() {

        clearInterval(sliderTimer);


        sliderTimer = setInterval(
            () => {

                nextSlide();

            },
            5000
        );

    }


    /* =====================================================
       RESTART SLIDER
    ===================================================== */

    function restartSlider() {

        clearInterval(sliderTimer);

        startSlider();

    }


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showSlide(0);

    startSlider();


    /* =====================================================
       PAUSE SLIDER ON HOVER
    ===================================================== */

    if (heroSlider) {

        heroSlider.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    sliderTimer
                );

            }
        );


        heroSlider.addEventListener(
            "mouseleave",
            () => {

                startSlider();

            }
        );

    }


    /* =====================================================
       SEARCH OVERLAY
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");

    const mainSearch =
        document.getElementById("mainSearch");

    const searchButton =
        document.getElementById("mainSearchBtn");


    /* =====================================================
       OPEN SEARCH
    ===================================================== */

    if (searchBtn && searchOverlay) {

        searchBtn.addEventListener(
            "click",
            () => {

                searchOverlay.classList.add(
                    "active"
                );


                setTimeout(
                    () => {

                        if (mainSearch) {

                            mainSearch.focus();

                        }

                    },
                    100
                );

            }
        );

    }


    /* =====================================================
       CLOSE SEARCH BUTTON
    ===================================================== */

    if (closeSearch && searchOverlay) {

        closeSearch.addEventListener(
            "click",
            () => {

                searchOverlay.classList.remove(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE SEARCH BOX
    ===================================================== */

    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    searchOverlay.classList.remove(
                        "active"
                    );

                }

            }
        );

    }


    /* =====================================================
       PERFORM SEARCH
    ===================================================== */

    function performSearch() {

        if (!mainSearch) {
            return;
        }


        const query =
            mainSearch.value
                .trim()
                .toLowerCase();


        /* Empty search */

        if (!query) {

            mainSearch.focus();

            return;

        }


        /* Cards that can be searched */

        const searchableCards =
            document.querySelectorAll(
                ".region-card, .artist-card, .event-card"
            );


        let found = false;


        searchableCards.forEach(card => {

            const text =
                card.innerText.toLowerCase();


            if (text.includes(query)) {

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });


                card.style.outline =
                    "3px solid #df6532";

                card.style.outlineOffset =
                    "4px";


                setTimeout(
                    () => {

                        card.style.outline = "";

                        card.style.outlineOffset =
                            "";

                    },
                    2000
                );


                found = true;

            }

        });


        /* No result */

        if (!found) {

            alert(
                "No matching art, artist or event found."
            );

        }


        /* Close search */

        if (searchOverlay) {

            searchOverlay.classList.remove(
                "active"
            );

        }

    }


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    /* =====================================================
       SEARCH USING ENTER
    ===================================================== */

    if (mainSearch) {

        mainSearch.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                if (searchOverlay) {

                    searchOverlay.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* =====================================================
       NAV ACTIVE STATE
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                link.classList.add(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                function(event) {

                    const target =
                        document.querySelector(
                            this.getAttribute(
                                "href"
                            )
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                function() {

                    this.style.display =
                        "none";


                    if (this.parentElement) {

                        this.parentElement.classList.add(
                            "image-missing"
                        );

                    }

                }
            );

        });


});
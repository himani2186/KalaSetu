document.addEventListener("DOMContentLoaded", function () {

    console.log("Regional Detail JS Loaded");

    const slider = document.getElementById("artGallerySlider");

    const slides = document.querySelectorAll(".gallery-slide");

    const dots = document.querySelectorAll(".gallery-dot");

    const nextButton = document.getElementById("galleryNext");

    const prevButton = document.getElementById("galleryPrev");


    console.log("Slides found:", slides.length);


    /* =========================================
       IF NO SLIDES
    ========================================= */

    if (!slider || slides.length === 0) {

        console.log("No slideshow found.");

        return;

    }


    let currentIndex = 0;

    let autoPlay = null;


    /* =========================================
       SHOW SLIDE
    ========================================= */

    function showSlide(index) {

        if (index >= slides.length) {

            index = 0;

        }

        if (index < 0) {

            index = slides.length - 1;

        }


        currentIndex = index;


        slides.forEach(function (slide, i) {

            slide.classList.toggle(
                "active",
                i === currentIndex
            );

        });


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentIndex
            );

        });


        console.log(
            "Current slide:",
            currentIndex + 1
        );

    }


    /* =========================================
       NEXT
    ========================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                showSlide(currentIndex + 1);

                restartAutoPlay();

            }
        );

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    if (prevButton) {

        prevButton.addEventListener(
            "click",
            function () {

                showSlide(currentIndex - 1);

                restartAutoPlay();

            }
        );

    }


    /* =========================================
       DOTS
    ========================================= */

    dots.forEach(function (dot) {

        dot.addEventListener(
            "click",
            function () {

                const index = parseInt(
                    this.dataset.index
                );


                if (!isNaN(index)) {

                    showSlide(index);

                    restartAutoPlay();

                }

            }
        );

    });


    /* =========================================
       AUTOPLAY
    ========================================= */

    function startAutoPlay() {

        clearInterval(autoPlay);


        autoPlay = setInterval(
            function () {

                showSlide(currentIndex + 1);

            },
            3000
        );

    }


    /* =========================================
       RESTART AUTOPLAY
    ========================================= */

    function restartAutoPlay() {

        clearInterval(autoPlay);

        startAutoPlay();

    }


    /* =========================================
       PAUSE ON HOVER
    ========================================= */

    slider.addEventListener(
        "mouseenter",
        function () {

            clearInterval(autoPlay);

        }
    );


    slider.addEventListener(
        "mouseleave",
        function () {

            startAutoPlay();

        }
    );


    /* =========================================
       TOUCH SWIPE
    ========================================= */

    let startX = 0;

    let endX = 0;


    slider.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            endX =
                event.changedTouches[0].screenX;


            const distance =
                endX - startX;


            if (distance < -50) {

                showSlide(currentIndex + 1);

                restartAutoPlay();

            }


            if (distance > 50) {

                showSlide(currentIndex - 1);

                restartAutoPlay();

            }

        },
        { passive: true }
    );


    /* =========================================
       INITIAL SLIDE
    ========================================= */

    showSlide(0);

    startAutoPlay();

});
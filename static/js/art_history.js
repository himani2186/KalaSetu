document.addEventListener("DOMContentLoaded", function () {

    /* Image reveal animation */

    const images = document.querySelectorAll(
        ".history-hero-image, .history-image-card, .technique-art, .today-image"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    images.forEach(image => {
        observer.observe(image);
    });

});
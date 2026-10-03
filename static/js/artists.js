document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dot");
    const nextBtn = document.getElementById("sliderNext");
    const prevBtn = document.getElementById("sliderPrev");

    let currentSlide = 0;
    let sliderInterval;


    function showSlide(index) {

        if (!slides.length) return;

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        currentSlide = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function previousSlide() {
        showSlide(currentSlide - 1);
    }


    function startSlider() {

        clearInterval(sliderInterval);

        sliderInterval = setInterval(() => {
            nextSlide();
        }, 5000);

    }


    if (nextBtn) {

        nextBtn.addEventListener("click", function () {
            nextSlide();
            startSlider();
        });

    }


    if (prevBtn) {

        prevBtn.addEventListener("click", function () {
            previousSlide();
            startSlider();
        });

    }


    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
            startSlider();
        });

    });


    if (slides.length) {
        showSlide(0);
        startSlider();
    }


    /* =====================================================
       ARTIST FILTERING
    ===================================================== */

    const searchInput = document.getElementById("artistSearch");
    const cityFilter = document.getElementById("cityFilter");
    const artFilter = document.getElementById("artFilter");

    const artistCards = document.querySelectorAll(".artist-card");
    const artistCount = document.getElementById("artistCount");
    const noArtists = document.getElementById("noArtists");

    const viewMoreButton = document.getElementById("viewMoreArtists");
    const artistsGrid = document.getElementById("artistsGrid");

    let showingAllArtists = false;


    function filterArtists() {

        const searchValue = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        const selectedCity = cityFilter
            ? cityFilter.value.toLowerCase()
            : "all";

        const selectedArt = artFilter
            ? artFilter.value.toLowerCase()
            : "all";


        let visibleCount = 0;


        artistCards.forEach(card => {

            const name = card.dataset.name || "";
            const city = card.dataset.city || "";
            const art = card.dataset.art || "";

            const matchesSearch =
                name.includes(searchValue);

            const matchesCity =
                selectedCity === "all" ||
                city === selectedCity;

            const matchesArt =
                selectedArt === "all" ||
                art === selectedArt;


            const matches =
                matchesSearch &&
                matchesCity &&
                matchesArt;


            if (matches) {

                card.classList.remove("hidden-by-filter");

                /*
                 * When filters are active, show matching cards
                 * even if they were originally extra cards.
                 */

                if (
                    searchValue !== "" ||
                    selectedCity !== "all" ||
                    selectedArt !== "all"
                ) {
                    card.style.display = "block";
                }

                visibleCount++;

            } else {

                card.classList.add("hidden-by-filter");
                card.style.display = "none";

            }

        });


        /*
         * Reset normal View More behavior when
         * there are no active filters.
         */

        const filtersActive =
            searchValue !== "" ||
            selectedCity !== "all" ||
            selectedArt !== "all";


        if (!filtersActive) {

            artistCards.forEach(card => {

                card.classList.remove("hidden-by-filter");

                if (
                    card.classList.contains("extra-artist") &&
                    !showingAllArtists
                ) {
                    card.style.display = "none";
                } else {
                    card.style.display = "block";
                }

            });

            visibleCount = showingAllArtists
                ? artistCards.length
                : Math.min(3, artistCards.length);

            if (viewMoreButton) {
                viewMoreButton.style.display = "inline-flex";
            }

        } else {

            if (viewMoreButton) {
                viewMoreButton.style.display = "none";
            }

        }


        if (artistCount) {
            artistCount.textContent = visibleCount;
        }


        if (noArtists) {

            if (visibleCount === 0) {
                noArtists.classList.add("show");
            } else {
                noArtists.classList.remove("show");
            }

        }

    }


    if (searchInput) {
        searchInput.addEventListener("input", filterArtists);
    }


    if (cityFilter) {

        cityFilter.addEventListener("change", function () {

            filterArtists();
            filterNearbyArtists();

        });

    }


    if (artFilter) {

        artFilter.addEventListener("change", function () {

            filterArtists();
            filterNearbyArtists();

        });

    }


    /* =====================================================
       VIEW MORE / SHOW LESS
    ===================================================== */

    if (viewMoreButton) {

        viewMoreButton.addEventListener("click", function () {

            showingAllArtists = !showingAllArtists;

            if (showingAllArtists) {

                artistsGrid.classList.add("show-all");

                viewMoreButton.innerHTML = `
                    <span>Show Less Artists</span>
                    <i class="ri-arrow-up-line"></i>
                `;

            } else {

                artistsGrid.classList.remove("show-all");

                viewMoreButton.innerHTML = `
                    <span>View More Artists</span>
                    <i class="ri-arrow-down-line"></i>
                `;

                document.getElementById("all-artists")
                    .scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

            }

            filterArtists();

        });

    }


    /* =====================================================
       ART FORM QUICK FILTER
    ===================================================== */

    const artFormCards =
        document.querySelectorAll(".art-form-card");


    artFormCards.forEach(card => {

        card.addEventListener("click", function () {

            const selectedArt =
                this.dataset.art;

            if (artFilter) {
                artFilter.value = selectedArt;
            }

            artFormCards.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            filterArtists();
            filterNearbyArtists();

            document
                .getElementById("all-artists")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    /* =====================================================
       CITY QUICK FILTER
    ===================================================== */

    const cityCards =
        document.querySelectorAll(".city-card");


    cityCards.forEach(card => {

        card.addEventListener("click", function () {

            const selectedCity =
                this.dataset.city;

            if (cityFilter) {
                cityFilter.value = selectedCity;
            }

            cityCards.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            filterArtists();
            filterNearbyArtists();

            document
                .getElementById("all-artists")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


    /* =====================================================
       FOLLOW BUTTON
    ===================================================== */

    const followButtons =
        document.querySelectorAll(".follow-btn");


    followButtons.forEach(button => {

        button.addEventListener("click", function () {

            const icon = this.querySelector("i");
            const text = this.querySelector("span");

            const isFollowing =
                this.classList.contains("following");


            if (!isFollowing) {

                this.classList.add("following");

                if (icon) {
                    icon.className =
                        "ri-user-follow-line";
                }

                if (text) {
                    text.textContent =
                        "Following";
                }

            } else {

                this.classList.remove("following");

                if (icon) {
                    icon.className =
                        "ri-user-add-line";
                }

                if (text) {
                    text.textContent =
                        "Follow";
                }

            }

        });

    });


    /* =====================================================
       WISHLIST BUTTON
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(".wishlist-btn");


    wishlistButtons.forEach(button => {

        button.addEventListener("click", function () {

            const icon =
                this.querySelector("i");


            this.classList.toggle("liked");


            if (this.classList.contains("liked")) {

                icon.className =
                    "ri-heart-fill";

            } else {

                icon.className =
                    "ri-heart-line";

            }

        });

    });


    /* =====================================================
       LEAFLET MAP
    ===================================================== */

    let artistMap = null;

    const mapElement =
        document.getElementById("artistMap");


    if (
        mapElement &&
        typeof L !== "undefined"
    ) {

        artistMap = L.map("artistMap").setView(
            [18.5204, 73.8567],
            12
        );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution:
                    "&copy; OpenStreetMap contributors"
            }
        ).addTo(artistMap);


        const nearbyArtists =
            document.querySelectorAll(".nearby-artist");


        nearbyArtists.forEach(artist => {

            const lat =
                parseFloat(artist.dataset.lat);

            const lng =
                parseFloat(artist.dataset.lng);

            const name =
                artist.querySelector("h3")
                    ?.textContent || "Artist";

            const art =
                artist.querySelector("p")
                    ?.textContent || "";

            const city =
                artist.querySelector("span")
                    ?.textContent || "";


            if (
                Number.isNaN(lat) ||
                Number.isNaN(lng)
            ) {
                return;
            }


            const marker =
                L.circleMarker(
                    [lat, lng],
                    {
                        radius: 9,
                        color: "#704026",
                        fillColor: "#df6532",
                        fillOpacity: .95,
                        weight: 2
                    }
                ).addTo(artistMap);


            marker.bindPopup(`
                <div class="map-popup">
                    <h4>${name}</h4>
                    <p>${art}</p>
                    <p>${city}</p>
                </div>
            `);


            artist._mapMarker = marker;


            /*
             * Click nearby artist card
             * -> move map to artist
             */

            artist.addEventListener(
                "click",
                function (event) {

                    /*
                     * Don't trigger twice when
                     * clicking the map button.
                     */

                    artistMap.setView(
                        [lat, lng],
                        14,
                        {
                            animate: true
                        }
                    );

                    marker.openPopup();

                }
            );

        });

    }


    /* =====================================================
       NEARBY FILTER
    ===================================================== */

    function filterNearbyArtists() {

        const nearbyArtists =
            document.querySelectorAll(".nearby-artist");


        const selectedCity =
            cityFilter
                ? cityFilter.value.toLowerCase()
                : "all";

        const selectedArt =
            artFilter
                ? artFilter.value.toLowerCase()
                : "all";


        nearbyArtists.forEach(artist => {

            const artistCity =
                artist.dataset.nearbyCity;

            const artistArt =
                artist.dataset.nearbyArt;


            const cityMatch =
                selectedCity === "all" ||
                artistCity === selectedCity;

            const artMatch =
                selectedArt === "all" ||
                artistArt === selectedArt;


            if (cityMatch && artMatch) {

                artist.style.display = "grid";

                if (artist._mapMarker) {
                    artist._mapMarker.addTo(artistMap);
                }

            } else {

                artist.style.display = "none";

                if (
                    artist._mapMarker &&
                    artistMap
                ) {
                    artistMap.removeLayer(
                        artist._mapMarker
                    );
                }

            }

        });

    }


    /* =====================================================
       MAP VIEW BUTTON
    ===================================================== */

    const mapButtons =
        document.querySelectorAll(".map-view-btn");


    mapButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            event.stopPropagation();

            const artist =
                this.closest(".nearby-artist");


            if (!artist || !artistMap) {
                return;
            }


            const lat =
                parseFloat(artist.dataset.lat);

            const lng =
                parseFloat(artist.dataset.lng);


            if (
                Number.isNaN(lat) ||
                Number.isNaN(lng)
            ) {
                return;
            }


            artistMap.setView(
                [lat, lng],
                15,
                {
                    animate: true
                }
            );


            if (artist._mapMarker) {
                artist._mapMarker.openPopup();
            }

        });

    });

});


/* =========================================================
   LOCALART — ARTIST INITIAL AVATARS
   Replaces images with artist initials
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ALL ARTIST CARDS
       Example: Meera Deshmukh → MD
    ===================================================== */

    const artistCards = document.querySelectorAll(".artist-card");

    artistCards.forEach(card => {

        const nameElement = card.querySelector(
            ".artist-card-content h3"
        );

        const imageBox = card.querySelector(".artist-image");
        const image = imageBox?.querySelector("img");

        if (!nameElement || !imageBox) return;

        const fullName = nameElement.textContent.trim();

        const initials = getInitials(fullName);

        /* Remove original image */
        if (image) {
            image.remove();
        }

        /* Avoid duplicate initials */
        if (!imageBox.querySelector(".artist-initials")) {

            const initialsElement = document.createElement("div");

            initialsElement.className = "artist-initials";
            initialsElement.textContent = initials;

            imageBox.prepend(initialsElement);
        }

    });


    /* =====================================================
       NEARBY ARTISTS
       Example: Aarohi Patil → AP
    ===================================================== */

    const nearbyArtists = document.querySelectorAll(
        ".nearby-artist"
    );

    nearbyArtists.forEach(artist => {

        const nameElement = artist.querySelector(
            ".nearby-info h3"
        );

        const image = artist.querySelector("img");

        if (!nameElement) return;

        const fullName = nameElement.textContent.trim();

        const initials = getInitials(fullName);

        /* Remove original image */
        if (image) {
            image.remove();
        }

        /* Avoid duplicate initials */
        if (!artist.querySelector(".nearby-initials")) {

            const initialsElement =
                document.createElement("div");

            initialsElement.className = "nearby-initials";
            initialsElement.textContent = initials;

            artist.prepend(initialsElement);
        }

    });

});


/* =========================================================
   GET ARTIST INITIALS
   First name + Last name
   ========================================================= */

function getInitials(fullName) {

    const nameParts = fullName
        .split(/\s+/)
        .filter(Boolean);

    if (nameParts.length >= 2) {

        return (
            nameParts[0].charAt(0) +
            nameParts[nameParts.length - 1].charAt(0)
        ).toUpperCase();

    }

    return nameParts[0]
        .substring(0, 2)
        .toUpperCase();
}
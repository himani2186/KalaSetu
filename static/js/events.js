document.addEventListener("DOMContentLoaded", function () {

    console.log("🔥 LocalArt Events JS Loaded");

    /* =====================================================
       VIEW MORE / SHOW LESS
    ===================================================== */

    const viewMoreButtons =
        document.querySelectorAll(".view-more-btn");


    viewMoreButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const section =
                button.closest(".events-section");

            if (!section) {
                console.log("❌ Section not found");
                return;
            }


            const expanded =
                section.classList.toggle("expanded");


            const text =
                button.querySelector("span");

            const icon =
                button.querySelector("i");


            if (expanded) {

                if (text) {
                    text.textContent =
                        button.dataset.target === "live-events"
                            ? "Show Less Live Events"
                            : button.dataset.target === "workshops"
                                ? "Show Less Workshops"
                                : "Show Less Upcoming Events";
                }

                if (icon) {
                    icon.className =
                        "ri-arrow-up-line";
                }

                console.log(
                    "✅ Expanded:",
                    button.dataset.target
                );

            } else {

                if (text) {
                    text.textContent =
                        button.dataset.target === "live-events"
                            ? "View More Live Events"
                            : button.dataset.target === "workshops"
                                ? "View More Workshops"
                                : "View More Upcoming Events";
                }

                if (icon) {
                    icon.className =
                        "ri-arrow-down-line";
                }

                console.log(
                    "⬆️ Collapsed:",
                    button.dataset.target
                );

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("eventSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const cards =
        document.querySelectorAll(".event-card");


    function filterCards() {

        if (!searchInput) return;

        const searchValue =
            searchInput.value
                .trim()
                .toLowerCase();


        cards.forEach(function (card) {

            const title =
                card.dataset.title
                    ? card.dataset.title.toLowerCase()
                    : "";

            const category =
                card.dataset.category
                    ? card.dataset.category.toLowerCase()
                    : "";

            const content =
                card.innerText.toLowerCase();


            const matches =
                title.includes(searchValue) ||
                category.includes(searchValue) ||
                content.includes(searchValue);


            if (searchValue && !matches) {

                card.classList.add("search-hidden");

            } else {

                card.classList.remove("search-hidden");

            }

        });


        /* Automatically expand sections during search */

        if (searchValue) {

            document
                .querySelectorAll(".events-section")
                .forEach(function (section) {

                    section.classList.add("expanded");

                });

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCards
        );

    }


    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                    filterCards();
                    searchInput.focus();
                }

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            const category =
                button.dataset.category;


            cards.forEach(function (card) {

                const cardCategories =
                    card.dataset.category
                        ? card.dataset.category.toLowerCase()
                        : "";


                if (
                    category === "all" ||
                    cardCategories.includes(category)
                ) {

                    card.classList.remove(
                        "search-hidden"
                    );

                } else {

                    card.classList.add(
                        "search-hidden"
                    );

                }

            });


            /* Show matching cards even if section collapsed */

            document
                .querySelectorAll(".events-section")
                .forEach(function (section) {

                    if (category !== "all") {

                        section.classList.add(
                            "expanded"
                        );

                    }

                });

        });

    });

/* =====================================================
   EVENT DETAILS
===================================================== */

document.querySelectorAll(".event-view-btn").forEach(function (button) {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        const card = button.closest(".event-card");

        if (!card) return;

        const section = card.closest(".events-section");

        if (!section) return;

        const cards = section.querySelectorAll(".event-card");

        const index = Array.from(cards).indexOf(card);

        let prefix = "";

        if (section.id === "live-events") {
            prefix = "live";
        }
        else if (section.id === "workshops") {
            prefix = "workshop";
        }
        else if (section.id === "upcoming-events") {
            prefix = "upcoming";
        }

        if (prefix && index !== -1) {

            const eventId = prefix + (index + 1);

            window.location.href = "/event/" + eventId;
        }

    });

});

    /* =====================================================
       LEAFLET MAP
    ===================================================== */

    let eventsMap = null;


    const mapElement =
        document.getElementById("eventsMap");


    if (mapElement && typeof L !== "undefined") {

        eventsMap = L.map("eventsMap", {
            zoomControl: true,
            scrollWheelZoom: true
        }).setView(
            [18.5204, 73.8567],
            12
        );


        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 19,
                attribution:
                    '&copy; OpenStreetMap contributors'
            }
        ).addTo(eventsMap);


        const eventLocations = [

            {
                name: "Art & Culture Exhibition",
                location: "Hadapsar",
                lat: 18.4967,
                lng: 73.9417,
                type: "Exhibition"
            },

            {
                name: "Watercolor Workshop",
                location: "Kothrud",
                lat: 18.5074,
                lng: 73.8077,
                type: "Workshop"
            },

            {
                name: "Clay Art Workshop",
                location: "Baner",
                lat: 18.5590,
                lng: 73.7868,
                type: "Workshop"
            },

            {
                name: "Contemporary Art Showcase",
                location: "Koregaon Park",
                lat: 18.5362,
                lng: 73.8958,
                type: "Exhibition"
            },

            {
                name: "Warli Art Experience",
                location: "Aundh",
                lat: 18.5590,
                lng: 73.8075,
                type: "Culture"
            },

            {
                name: "Young Artists Exhibition",
                location: "Camp",
                lat: 18.5158,
                lng: 73.8847,
                type: "Exhibition"
            },

            {
                name: "Handmade Art Bazaar",
                location: "Wakad",
                lat: 18.5970,
                lng: 73.7898,
                type: "Culture"
            },

            {
                name: "Art Storytelling",
                location: "Deccan",
                lat: 18.5175,
                lng: 73.8400,
                type: "Culture"
            }

        ];


        eventLocations.forEach(function (event) {

            let markerColor = "#d87b42";


            if (event.type === "Exhibition") {
                markerColor = "#8a6bb8";
            }

            if (event.type === "Culture") {
                markerColor = "#4c9b82";
            }


            const icon =
                L.divIcon({

                    className:
                        "localart-map-marker",

                    html: `
                        <div style="
                            width:18px;
                            height:18px;
                            border-radius:50%;
                            background:${markerColor};
                            border:3px solid white;
                            box-shadow:0 3px 12px rgba(0,0,0,.35);
                        "></div>
                    `,

                    iconSize: [18, 18],
                    iconAnchor: [9, 9]

                });


            L.marker(
                [event.lat, event.lng],
                { icon: icon }
            )
            .addTo(eventsMap)
            .bindPopup(`
                <div style="
                    min-width:180px;
                    font-family:Arial,sans-serif;
                ">

                    <strong style="
                        font-size:15px;
                        color:#2d2520;
                    ">
                        ${event.name}
                    </strong>

                    <br>

                    <span style="
                        color:#777;
                        font-size:12px;
                    ">
                        📍 ${event.location}
                    </span>

                    <br>

                    <span style="
                        display:inline-block;
                        margin-top:7px;
                        font-size:11px;
                        font-weight:bold;
                        color:${markerColor};
                    ">
                        ${event.type}
                    </span>

                </div>
            `);

        });


        setTimeout(function () {

            eventsMap.invalidateSize();

        }, 400);


        console.log("🗺️ Events map loaded");

    } else {

        console.log(
            "❌ Leaflet/map element not found"
        );

    }


    /* =====================================================
       FIND NEARBY
    ===================================================== */

    const nearbyButton =
        document.getElementById(
            "findNearbyBtn"
        );

    const locationStatus =
        document.getElementById(
            "locationStatus"
        );


    if (nearbyButton) {

        nearbyButton.addEventListener(
            "click",
            function () {

                if (!navigator.geolocation) {

                    if (locationStatus) {
                        locationStatus.textContent =
                            "Location is not supported by your browser.";
                    }

                    return;
                }


                nearbyButton.disabled = true;


                if (locationStatus) {
                    locationStatus.textContent =
                        "Finding your location...";
                }


                navigator.geolocation.getCurrentPosition(

                    function (position) {

                        const lat =
                            position.coords.latitude;

                        const lng =
                            position.coords.longitude;


                        if (eventsMap) {

                            eventsMap.setView(
                                [lat, lng],
                                13
                            );


                            L.circleMarker(
                                [lat, lng],
                                {
                                    radius: 8,
                                    fillOpacity: .9,
                                    weight: 3,
                                    color: "#ffffff"
                                }
                            )
                            .addTo(eventsMap)
                            .bindPopup(
                                "You are here"
                            )
                            .openPopup();

                        }


                        if (locationStatus) {

                            locationStatus.textContent =
                                "Showing events around your current location.";

                        }


                        nearbyButton.disabled =
                            false;

                    },

                    function () {

                        if (locationStatus) {

                            locationStatus.textContent =
                                "Location permission was not granted. Showing Pune events instead.";

                        }


                        if (eventsMap) {

                            eventsMap.setView(
                                [18.5204, 73.8567],
                                12
                            );

                        }


                        nearbyButton.disabled =
                            false;

                    }

                );

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth"
                        });

                    }

                }
            );

        });


});



document.addEventListener("DOMContentLoaded", function () {

    const sections = [
        {
            id: "live-events",
            prefix: "live"
        },
        {
            id: "workshops",
            prefix: "workshop"
        },
        {
            id: "upcoming-events",
            prefix: "upcoming"
        }
    ];

    sections.forEach(function (sectionData) {

        const section = document.getElementById(sectionData.id);

        if (!section) return;

        const cards = section.querySelectorAll(".event-card");

        cards.forEach(function (card, index) {

            const button = card.querySelector(".event-view-btn");

            if (!button) return;

            button.addEventListener("click", function () {

                const eventId = sectionData.prefix + (index + 1);

                window.location.href = "/event/" + eventId;

            });

        });

    });

});


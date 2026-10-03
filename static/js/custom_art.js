/* =========================================================
   LOCALART — CUSTOM ART JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const artistSearch =
        document.getElementById("artistSearch");

    const cityFilter =
        document.getElementById("cityFilter");

    const artFilter =
        document.getElementById("artFilter");

    const artistCards =
        document.querySelectorAll(".artist-card");

    const selectedArtist =
        document.getElementById("selectedArtist");

    const selectedArtistBox =
        document.getElementById("selectedArtistBox");

    const artistName =
        document.getElementById("artistName");

    const customArtForm =
        document.getElementById("customArtForm");

    const referenceImage =
        document.getElementById("referenceImage");


    /* =====================================================
       ARTIST SELECTION
    ====================================================== */

    const selectButtons =
        document.querySelectorAll(".select-artist-btn");


    selectButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                this.getAttribute("data-artist");


            /* Remove previous selection */

            artistCards.forEach(function (card) {

                card.classList.remove("selected");

                const cardButton =
                    card.querySelector(".select-artist-btn");

                if (cardButton) {
                    cardButton.textContent =
                        "Select Artist";
                }

            });


            /* Select current card */

            const currentCard =
                this.closest(".artist-card");

            currentCard.classList.add("selected");


            this.textContent =
                "✓ Selected";


            /* Update form */

            selectedArtist.textContent =
                name;

            artistName.value =
                name;


            selectedArtistBox.classList.add("selected");


            /* Scroll to form */

            document.querySelector(".request-section")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    });


    /* =====================================================
       ARTIST FILTER
    ====================================================== */

    function filterArtists() {

        const searchValue =
            artistSearch.value
                .toLowerCase()
                .trim();

        const cityValue =
            cityFilter.value;

        const artValue =
            artFilter.value;


        artistCards.forEach(function (card) {

            const name =
                card.dataset.name.toLowerCase();

            const city =
                card.dataset.city;

            const art =
                card.dataset.art;


            const matchesSearch =
                name.includes(searchValue);

            const matchesCity =
                cityValue === "" ||
                city === cityValue;

            const matchesArt =
                artValue === "" ||
                art === artValue;


            if (
                matchesSearch &&
                matchesCity &&
                matchesArt
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }


    if (artistSearch) {

        artistSearch.addEventListener(
            "input",
            filterArtists
        );

    }


    if (cityFilter) {

        cityFilter.addEventListener(
            "change",
            filterArtists
        );

    }


    if (artFilter) {

        artFilter.addEventListener(
            "change",
            filterArtists
        );

    }


    /* =====================================================
       REFERENCE IMAGE
    ====================================================== */

    if (referenceImage) {

        referenceImage.addEventListener(
            "change",
            function () {

                const uploadBox =
                    this.closest(".upload-box");

                const strongText =
                    uploadBox.querySelector("strong");


                if (this.files.length > 0) {

                    strongText.textContent =
                        this.files[0].name;

                } else {

                    strongText.textContent =
                        "Upload Reference Image";

                }

            }
        );

    }


    /* =====================================================
       FORM SUBMIT
    ====================================================== */

    if (customArtForm) {

        customArtForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* Artist validation */

                if (!artistName.value) {

                    alert(
                        "Please select an artist first."
                    );

                    document
                        .getElementById("custom-request")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                    return;

                }


                /* Description validation */

                const description =
                    document
                        .getElementById("description")
                        .value
                        .trim();


                if (description.length < 10) {

                    alert(
                        "Please describe your artwork idea in a little more detail."
                    );

                    return;

                }


                /* Success message */

                const name =
                    artistName.value;


                alert(
                    "Your custom art request has been prepared for " +
                    name +
                    "!\n\nThe artist will be able to review your request and respond."
                );


                /*
                 * BACKEND INTEGRATION WILL GO HERE
                 *
                 * Later we will send:
                 *
                 * artist_name
                 * art_type
                 * style
                 * size
                 * budget
                 * colors
                 * deadline
                 * description
                 * reference_image
                 *
                 * to Flask + MySQL.
                 */


                console.log(
                    "Custom request artist:",
                    name
                );

            }
        );

    }

});
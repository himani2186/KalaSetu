/* =========================================================
   LOCALART FEEDBACK PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const feedbackForm =
        document.getElementById("feedbackForm");

    const feedbackRating =
        document.getElementById("feedbackRating");

    const ratingButtons =
        document.querySelectorAll(".rating-btn");

    const feedbackMessage =
        document.getElementById("feedbackMessage");

    const charCount =
        document.getElementById("charCount");

    const feedbackSuccess =
        document.getElementById("feedbackSuccess");

    const sendAnotherFeedback =
        document.getElementById("sendAnotherFeedback");


    /* =====================================================
       RATING
       ===================================================== */

    ratingButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            ratingButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            feedbackRating.value =
                button.dataset.rating;

        });

    });


    /* =====================================================
       CHARACTER COUNT
       ===================================================== */

    if (feedbackMessage && charCount) {

        feedbackMessage.addEventListener(
            "input",
            function () {

                if (feedbackMessage.value.length > 500) {

                    feedbackMessage.value =
                        feedbackMessage.value.substring(0, 500);

                }

                charCount.textContent =
                    feedbackMessage.value.length;

            }
        );

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    if (feedbackForm) {

        feedbackForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document
                        .getElementById("feedbackName")
                        .value
                        .trim();

                const email =
                    document
                        .getElementById("feedbackEmail")
                        .value
                        .trim();

                const type =
                    document
                        .getElementById("feedbackType")
                        .value;

                const message =
                    feedbackMessage.value.trim();


                /* BASIC VALIDATION */

                if (!name) {

                    alert("Please enter your name.");

                    document
                        .getElementById("feedbackName")
                        .focus();

                    return;

                }


                if (!email) {

                    alert("Please enter your email.");

                    document
                        .getElementById("feedbackEmail")
                        .focus();

                    return;

                }


                if (!type) {

                    alert("Please select a feedback type.");

                    document
                        .getElementById("feedbackType")
                        .focus();

                    return;

                }


                if (!feedbackRating.value) {

                    alert("Please select your experience rating.");

                    return;

                }


                if (!message) {

                    alert("Please write your feedback.");

                    feedbackMessage.focus();

                    return;

                }


                /* BUTTON LOADING */

                const submitButton =
                    document.getElementById("submitFeedback");

                submitButton.disabled = true;

                submitButton.innerHTML = `
                    <i class="ri-loader-4-line"></i>
                    Submitting...
                `;


                /* DEMO SUBMISSION */

                setTimeout(function () {

                    feedbackForm.style.display =
                        "none";

                    feedbackSuccess.classList.add(
                        "show"
                    );

                    submitButton.disabled = false;

                }, 800);

            }
        );

    }


    /* =====================================================
       SEND ANOTHER FEEDBACK
       ===================================================== */

    if (sendAnotherFeedback) {

        sendAnotherFeedback.addEventListener(
            "click",
            function () {

                feedbackSuccess.classList.remove(
                    "show"
                );

                feedbackForm.style.display =
                    "block";

                feedbackForm.reset();

                feedbackRating.value = "";

                ratingButtons.forEach(function (btn) {

                    btn.classList.remove("active");

                });

                charCount.textContent = "0";

            }
        );

    }

});
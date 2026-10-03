document.addEventListener("DOMContentLoaded", function () {

    const navItems =
        document.querySelectorAll(".settings-nav-item");

    const sections =
        document.querySelectorAll(".settings-section");

    const saveBtn =
        document.getElementById("saveSettings");

    const saveMessage =
        document.getElementById("saveMessage");

    const themeButtons =
        document.querySelectorAll(".theme-btn");

    const feedbackBtn =
        document.getElementById("submitFeedback");

    const feedbackText =
        document.getElementById("feedbackText");

    const deleteAccountBtn =
        document.getElementById("deleteAccountBtn");

    const newChatBtn =
        document.getElementById("newChatBtn");


    /* =========================================
       SECTION NAVIGATION
       ========================================= */

    navItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const sectionId =
                this.dataset.section;

            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            sections.forEach(function (section) {
                section.classList.remove("active");
            });

            this.classList.add("active");

            const target =
                document.getElementById(sectionId);

            if (target) {
                target.classList.add("active");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       THEME
       ========================================= */

    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add(
                "localart-dark"
            );

        } else {

            document.body.classList.remove(
                "localart-dark"
            );

        }

        localStorage.setItem(
            "localartTheme",
            theme
        );

    }


    const savedTheme =
        localStorage.getItem("localartTheme");

    if (savedTheme) {

        applyTheme(savedTheme);

        themeButtons.forEach(function (button) {

            button.classList.toggle(
                "active",
                button.dataset.theme === savedTheme
            );

        });

    }


    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const theme =
                this.dataset.theme;

            themeButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            applyTheme(theme);

        });

    });


    /* =========================================
       REDUCE ANIMATIONS
       ========================================= */

    const reduceAnimations =
        document.getElementById("reduceAnimations");

    if (reduceAnimations) {

        const savedPreference =
            localStorage.getItem(
                "localartReduceAnimations"
            );

        reduceAnimations.checked =
            savedPreference === "true";

        reduceAnimations.addEventListener(
            "change",
            function () {

                localStorage.setItem(
                    "localartReduceAnimations",
                    this.checked
                );

                if (this.checked) {

                    document.body.classList.add(
                        "reduce-motion"
                    );

                } else {

                    document.body.classList.remove(
                        "reduce-motion"
                    );

                }

            }
        );

    }


    /* =========================================
       SAVE SETTINGS
       ========================================= */

    if (saveBtn) {

        saveBtn.addEventListener(
            "click",
            function () {

                saveBtn.innerHTML = `
                    <i class="ri-check-line"></i>
                    Saved
                `;

                saveMessage.innerHTML = `
                    <i class="ri-check-line"></i>
                    Your settings have been saved.
                `;

                setTimeout(function () {

                    saveBtn.innerHTML = `
                        <i class="ri-save-3-line"></i>
                        Save Changes
                    `;

                }, 1800);

            }
        );

    }


    /* =========================================
       FEEDBACK
       ========================================= */

    if (feedbackBtn) {

        feedbackBtn.addEventListener(
            "click",
            function () {

                const feedback =
                    feedbackText.value.trim();

                if (!feedback) {

                    feedbackText.focus();

                    return;
                }

                feedbackBtn.innerHTML = `
                    <i class="ri-check-line"></i>
                    Feedback Submitted
                `;

                feedbackText.value = "";

                setTimeout(function () {

                    feedbackBtn.innerHTML = `
                        <i class="ri-send-plane-line"></i>
                        Submit Feedback
                    `;

                }, 2000);

            }
        );

    }


    /* =========================================
       DELETE ACCOUNT DEMO
       ========================================= */

    if (deleteAccountBtn) {

        deleteAccountBtn.addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Are you sure you want to delete your account?"
                    );

                if (!confirmed) {
                    return;
                }

                alert(
                    "Account deletion will be connected to the backend later."
                );

            }
        );

    }


    /* =========================================
       LOAD REDUCED MOTION
       ========================================= */

    if (
        localStorage.getItem(
            "localartReduceAnimations"
        ) === "true"
    ) {

        document.body.classList.add(
            "reduce-motion"
        );

    }

});
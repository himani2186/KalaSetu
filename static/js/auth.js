/* =========================================================
   LOCALART AUTH JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= ELEMENTS ================= */

    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    const switchToSignup = document.getElementById("switchToSignup");
    const switchToLogin = document.getElementById("switchToLogin");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");


    /* =====================================================
       LOGIN / SIGN UP SWITCHING
    ===================================================== */

    function showLogin() {

        loginForm.style.display = "block";
        signupForm.style.display = "none";

        loginTab.classList.add("active");
        signupTab.classList.remove("active");

        authTitle.textContent = "Welcome back";
        authSubtitle.textContent =
            "Login to continue exploring local art.";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    function showSignup() {

        loginForm.style.display = "none";
        signupForm.style.display = "block";

        signupTab.classList.add("active");
        loginTab.classList.remove("active");

        authTitle.textContent = "Join LocalArt";
        authSubtitle.textContent =
            "Create an account and become part of our art community.";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    /* Tab buttons */

    loginTab.addEventListener("click", showLogin);

    signupTab.addEventListener("click", showSignup);


    /* Form switch buttons */

    if (switchToSignup) {
        switchToSignup.addEventListener("click", showSignup);
    }

    if (switchToLogin) {
        switchToLogin.addEventListener("click", showLogin);
    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggles =
        document.querySelectorAll(".password-toggle");

    passwordToggles.forEach(toggle => {

        toggle.addEventListener("click", () => {

            const targetId = toggle.getAttribute("data-target");
            const passwordInput = document.getElementById(targetId);

            if (!passwordInput) return;

            const icon = toggle.querySelector("i");

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                if (icon) {
                    icon.classList.remove("ri-eye-line");
                    icon.classList.add("ri-eye-off-line");
                }

                toggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                if (icon) {
                    icon.classList.remove("ri-eye-off-line");
                    icon.classList.add("ri-eye-line");
                }

                toggle.setAttribute(
                    "aria-label",
                    "Show password"
                );
            }
        });

    });


    /* =====================================================
       MOBILE NUMBER
       Only digits + maximum 10 numbers
    ===================================================== */

    const mobileInput = document.getElementById("signupMobile");

    if (mobileInput) {

        mobileInput.addEventListener("input", () => {

            mobileInput.value =
                mobileInput.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        });

    }


    /* =====================================================
       SIGNUP PASSWORD MATCH
    ===================================================== */

    if (signupForm) {

        signupForm.addEventListener("submit", (event) => {

            const password =
                document.getElementById("signupPassword");

            const confirmPassword =
                document.getElementById("confirmPassword");

            const mobile =
                document.getElementById("signupMobile");

            if (!password || !confirmPassword) {
                return;
            }


            /* Password match */

            if (password.value !== confirmPassword.value) {

                event.preventDefault();

                alert("Passwords do not match.");

                confirmPassword.focus();

                return;
            }


            /* Password length */

            if (password.value.length < 6) {

                event.preventDefault();

                alert(
                    "Password must contain at least 6 characters."
                );

                password.focus();

                return;
            }


            /* Mobile validation */

            if (mobile && mobile.value.length !== 10) {

                event.preventDefault();

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                mobile.focus();

                return;
            }

        });

    }


    /* =====================================================
       LOGIN FORM BASIC VALIDATION
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            const email =
                document.getElementById("loginEmail");

            const password =
                document.getElementById("loginPassword");

            if (!email || !password) {
                return;
            }

            if (!email.value.trim() ||
                !password.value.trim()) {

                event.preventDefault();

                alert(
                    "Please enter your email and password."
                );

                return;
            }

        });

    }


    /* =====================================================
       SOCIAL BUTTONS
       Placeholder for future backend integration
    ===================================================== */

    const googleLogin =
        document.getElementById("googleLogin");

    const githubLogin =
        document.getElementById("githubLogin");


    if (googleLogin) {

        googleLogin.addEventListener("click", () => {

            alert(
                "Google login will be connected later."
            );

        });

    }


    if (githubLogin) {

        githubLogin.addEventListener("click", () => {

            alert(
                "GitHub login will be connected later."
            );

        });

    }


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    const forgotPassword =
        document.querySelector(".forgot-password");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (event) => {

            event.preventDefault();

            alert(
                "Password recovery will be added in the next backend step."
            );

        });

    }


    /* =====================================================
       INITIAL STATE
    ===================================================== */

   const params = new URLSearchParams(window.location.search);

if (params.get("mode") === "signup") {
    showSignup();
} else {
    showLogin();
}

});
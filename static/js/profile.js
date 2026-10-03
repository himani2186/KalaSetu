/* =========================================
   LOCALART PROFILE JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PROFILE DATA
       ===================================== */

    const profileData = (window.currentUserData && window.currentUserData.name) ? window.currentUserData : {
        name: "Your Name",
        username: "@username",
        email: "your@email.com",
        mobile: "+91 XXXXX XXXXX",
        city: "Pune",
        role: "customer",
        bio: ""
    };

    let currentProfile = { ...profileData };


    /* =====================================
       ELEMENTS
       ===================================== */

    const profileName =
        document.getElementById("profileName");

    const profileUsername =
        document.getElementById("profileUsername");

    const profileCity =
        document.getElementById("profileCity");

    const profileRole =
        document.getElementById("profileRole");

    const fullName =
        document.getElementById("fullName");

    const username =
        document.getElementById("username");

    const email =
        document.getElementById("email");

    const mobile =
        document.getElementById("mobile");

    const city =
        document.getElementById("city");

    const userBio =
        document.getElementById("userBio");

    const accountType =
        document.getElementById("accountType");

    const avatarLetter =
        document.getElementById("avatarLetter");

    const customerSection =
        document.getElementById("customerSection");

    const artistSection =
        document.getElementById("artistSection");


    /* =====================================
       LOAD PROFILE
       ===================================== */

    function loadProfile(data) {

        profileName.textContent = data.name || "Your Name";

        profileUsername.textContent =
            (data.username || "").startsWith("@")
                ? data.username
                : "@" + (data.username || "username");

        profileCity.textContent = data.city || "Not set";

        fullName.textContent = data.name || "Your Name";

        username.textContent =
            (data.username || "").startsWith("@")
                ? data.username
                : "@" + (data.username || "username");

        email.textContent = data.email || "";

        mobile.textContent = data.mobile || "Not set";

        city.textContent = data.city || "Not set";

        if (userBio) {
            userBio.textContent = (data.bio && data.bio.trim().length > 0) ? data.bio : "No bio added yet";
        }


        /* Role */

        if (data.role === "artist") {

            profileRole.textContent = "Artist";

            accountType.textContent = "Artist";

            customerSection.classList.add("hidden");

            artistSection.classList.remove("hidden");

        } else {

            profileRole.textContent = "Art Lover";

            accountType.textContent = "Art Lover";

            customerSection.classList.remove("hidden");

            artistSection.classList.add("hidden");
        }


        /* Avatar */

        const profileAvatarContainer = document.getElementById("profileAvatarContainer");
        let existingImg = profileAvatarContainer ? profileAvatarContainer.querySelector("img.user-avatar-img") : null;

        if (data.profile_image && data.profile_image.trim().length > 0) {
            if (!existingImg && profileAvatarContainer) {
                existingImg = document.createElement("img");
                existingImg.className = "user-avatar-img";
                profileAvatarContainer.insertBefore(existingImg, avatarLetter);
            }
            if (existingImg) existingImg.src = data.profile_image;
            if (avatarLetter) avatarLetter.style.display = "none";
        } else {
            if (existingImg) existingImg.remove();
            if (avatarLetter) avatarLetter.style.display = "block";
            if (data.name && data.name.length > 0) {
                avatarLetter.textContent =
                    data.name.charAt(0).toUpperCase();
            }
        }
    }


    loadProfile(currentProfile);


    /* =====================================
       EDIT PROFILE MODAL & LOGIC
       ===================================== */

    const editProfileBtn =
        document.getElementById("editProfileBtn");

    const editInfoBtn =
        document.getElementById("editInfoBtn");

    const editModalOverlay =
        document.getElementById("editModalOverlay");

    const closeEditModal =
        document.getElementById("closeEditModal");

    const cancelEditModal =
        document.getElementById("cancelEditModal");

    const editProfileForm =
        document.getElementById("editProfileForm");

    const editModalAlert =
        document.getElementById("editModalAlert");

    const inputFullName =
        document.getElementById("inputFullName");

    const inputMobile =
        document.getElementById("inputMobile");

    const inputCity =
        document.getElementById("inputCity");

    const inputBio =
        document.getElementById("inputBio");

    const saveProfileBtn =
        document.getElementById("saveProfileBtn");

    const saveBtnText =
        document.getElementById("saveBtnText");


    function openEditModal() {
        if (inputFullName) inputFullName.value = currentProfile.name || "";
        if (inputMobile) inputMobile.value = currentProfile.mobile || "";
        if (inputCity) inputCity.value = currentProfile.city || "";
        if (inputBio) inputBio.value = currentProfile.bio || "";
        if (editModalAlert) {
            editModalAlert.style.display = "none";
            editModalAlert.className = "modal-alert";
            editModalAlert.textContent = "";
        }
        if (editModalOverlay) {
            editModalOverlay.classList.add("active");
        }
    }

    function closeEditModalDialog() {
        if (editModalOverlay) {
            editModalOverlay.classList.remove("active");
        }
    }

    if (editProfileBtn) editProfileBtn.addEventListener("click", openEditModal);
    if (editInfoBtn) editInfoBtn.addEventListener("click", openEditModal);
    if (closeEditModal) closeEditModal.addEventListener("click", closeEditModalDialog);
    if (cancelEditModal) cancelEditModal.addEventListener("click", closeEditModalDialog);
    if (editModalOverlay) {
        editModalOverlay.addEventListener("click", (e) => {
            if (e.target === editModalOverlay) closeEditModalDialog();
        });
    }

    function showModalError(msg) {
        if (editModalAlert) {
            editModalAlert.textContent = msg;
            editModalAlert.className = "modal-alert error";
            editModalAlert.style.display = "block";
        }
    }

    if (editProfileForm) {
        editProfileForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const full_name = inputFullName.value.trim();
            const mobile = inputMobile.value.trim();
            const city = inputCity.value.trim();
            const bio = inputBio.value.trim();

            if (!full_name) {
                showModalError("Full name is required.");
                return;
            }

            if (mobile && !/^\d{10}$/.test(mobile)) {
                showModalError("Please enter a valid 10-digit mobile number.");
                return;
            }

            if (saveProfileBtn) saveProfileBtn.disabled = true;
            if (saveBtnText) saveBtnText.textContent = "Saving...";

            try {
                const res = await fetch("/api/profile/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ full_name, mobile, city, bio })
                });

                const data = await res.json();
                if (data.success && data.user) {
                    currentProfile.name = data.user.full_name;
                    currentProfile.mobile = data.user.mobile;
                    currentProfile.city = data.user.city;
                    currentProfile.bio = data.user.bio;

                    loadProfile(currentProfile);
                    closeEditModalDialog();
                } else {
                    showModalError(data.message || "Failed to update profile.");
                }
            } catch (err) {
                showModalError("Network error. Please try again.");
            } finally {
                if (saveProfileBtn) saveProfileBtn.disabled = false;
                if (saveBtnText) saveBtnText.textContent = "Save Changes";
            }
        });
    }


    /* =====================================
       AVATAR UPLOAD
       ===================================== */

    const avatarEdit = document.getElementById("avatarEdit");
    const avatarFileInput = document.getElementById("avatarFileInput");

    if (avatarEdit && avatarFileInput) {
        avatarEdit.addEventListener("click", (e) => {
            e.preventDefault();
            avatarFileInput.click();
        });

        avatarFileInput.addEventListener("change", async () => {
            if (!avatarFileInput.files || avatarFileInput.files.length === 0) return;

            const file = avatarFileInput.files[0];
            const formData = new FormData();
            formData.append("avatar", file);

            try {
                const res = await fetch("/api/profile/upload-avatar", {
                    method: "POST",
                    body: formData
                });

                const result = await res.json();
                if (result.success && result.profile_image) {
                    currentProfile.profile_image = result.profile_image;
                    loadProfile(currentProfile);
                } else {
                    alert(result.message || "Failed to upload avatar.");
                }
            } catch (err) {
                console.error("[AVATAR UPLOAD ERROR]", err);
                alert("Error uploading profile photo.");
            } finally {
                avatarFileInput.value = "";
            }
        });
    }


    /* =====================================
       SEARCH OVERLAY
       ===================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");

    const mainSearch =
        document.getElementById("mainSearch");

    const mainSearchBtn =
        document.getElementById("mainSearchBtn");


    function openSearch() {

        searchOverlay.classList.add("active");

        setTimeout(() => {
            mainSearch.focus();
        }, 100);

    }


    function closeSearchOverlay() {

        searchOverlay.classList.remove("active");

        mainSearch.value = "";

    }


    searchBtn.addEventListener(
        "click",
        openSearch
    );


    closeSearch.addEventListener(
        "click",
        closeSearchOverlay
    );


    searchOverlay.addEventListener(
        "click",
        (event) => {

            if (event.target === searchOverlay) {
                closeSearchOverlay();
            }

        }
    );


    /* =====================================
       SEARCH
       ===================================== */

    function performSearch() {

        const query =
            mainSearch.value.trim().toLowerCase();

        if (!query) {

            alert("Please enter something to search.");

            return;
        }


        /*
           Later this will search real artworks
           and artists from SQLite.
        */

        alert(
            `Search for "${query}" will be connected to the Shop and Artists pages.`
        );

    }


    mainSearchBtn.addEventListener(
        "click",
        performSearch
    );


    mainSearch.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                performSearch();
            }

            if (event.key === "Escape") {
                closeSearchOverlay();
            }

        }
    );


    /* =====================================
       ACTIVE SIDEBAR LINK
       ===================================== */

    const sidebarLinks =
        document.querySelectorAll(".sidebar-nav a");

    sidebarLinks.forEach(link => {

        if (
            link.getAttribute("href") ===
            window.location.pathname
        ) {

            link.classList.add("active");

        }

    });


    /* =====================================
       MOBILE SIDEBAR
       ===================================== */

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    /*
       No menu button is present in the current
       navbar, so this remains prepared for later.
    */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            () => {

                sidebar.classList.remove("open");

            }
        );

    }

});
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SIDEBAR
    ===================================================== */

    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener("click", function () {

            sidebar.classList.add("open");
            sidebarOverlay.classList.add("active");

        });

    }


    function closeSidebar() {

        if (sidebar) {
            sidebar.classList.remove("open");
        }

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

    }


    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    document.querySelectorAll(".sidebar-link").forEach(link => {

        link.addEventListener("click", function () {

            closeSidebar();

        });

    });


    /* =====================================================
       SEARCH OVERLAY
    ===================================================== */

    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const closeSearch = document.getElementById("closeSearch");
    const mainSearch = document.getElementById("mainSearch");
    const mainSearchBtn = document.getElementById("mainSearchBtn");


    function openSearch() {

        if (!searchOverlay) return;

        searchOverlay.classList.add("active");

        setTimeout(() => {

            if (mainSearch) {
                mainSearch.focus();
            }

        }, 100);

    }


    function hideSearch() {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("active");

    }


    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            openSearch
        );

    }


    if (closeSearch) {

        closeSearch.addEventListener(
            "click",
            hideSearch
        );

    }


    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            function (event) {

                if (event.target === searchOverlay) {
                    hideSearch();
                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                hideSearch();
                closeSidebar();

            }

        }
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    function performSearch() {

        const query = mainSearch
            ? mainSearch.value.trim()
            : "";

        if (!query) {

            if (mainSearch) {
                mainSearch.focus();
            }

            return;

        }

        window.location.href =
            "/shop?search=" +
            encodeURIComponent(query);

    }


    if (mainSearchBtn) {

        mainSearchBtn.addEventListener(
            "click",
            performSearch
        );

    }


    if (mainSearch) {

        mainSearch.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    performSearch();
                }

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        ".desktop-nav .nav-link"
    ).forEach(link => {

        link.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".desktop-nav .nav-link")
                    .forEach(item => {
                        item.classList.remove("active");
                    });

                this.classList.add("active");

            }
        );

    });


    /* =====================================================
       CARD HOVER MICRO EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".quick-card, .featured-card, .artist-mini-card"
    ).forEach(card => {

        card.addEventListener(
            "mouseenter",
            function () {

                this.style.transition =
                    "transform .3s ease, box-shadow .3s ease";

            }
        );

    });

});
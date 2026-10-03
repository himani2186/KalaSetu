/* =========================================================
   LOCALART COMMON JAVASCRIPT
   Mobile Sidebar
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar =
        document.getElementById("sidebar");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    /* ==========================================
       OPEN SIDEBAR
    ========================================== */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        document.body.style.overflow = "hidden";
    }


    /* ==========================================
       CLOSE SIDEBAR
    ========================================== */

    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        document.body.style.overflow = "";
    }


    /* ==========================================
       MOBILE MENU BUTTON
    ========================================== */

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener(
            "click",
            function () {

                if (sidebar.classList.contains("open")) {
                    closeSidebar();
                } else {
                    openSidebar();
                }

            }
        );

    }


    /* ==========================================
       OVERLAY CLICK
    ========================================== */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* ==========================================
       CLOSE SIDEBAR AFTER CLICKING LINK
       ON MOBILE
    ========================================== */

    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");


    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (window.innerWidth <= 900) {
                    closeSidebar();
                }

            }
        );

    });


    /* ==========================================
       ESC KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeSidebar();
            }

        }
    );


    /* ==========================================
       WINDOW RESIZE
    ========================================== */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 900) {
                closeSidebar();
            }

        }
    );

});
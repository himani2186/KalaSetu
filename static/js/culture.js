document.addEventListener("DOMContentLoaded", function () {

    /* ================= ART FILTER ================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const artCards = document.querySelectorAll(".art-form-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", function () {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            this.classList.add("active");

            const filter = this.dataset.filter;

            artCards.forEach(card => {

                const categories = card.dataset.category;

                if (
                    filter === "all" ||
                    categories.includes(filter)
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });


    /* ================= TIMELINE ================= */

    const timelineItems =
        document.querySelectorAll(".timeline-item");

    const timelineData = {

        ancient: {
            number: "01",
            label: "ANCIENT INDIA",
            title: "The Beginning of Visual Storytelling",
            text: "Early artistic traditions show how people used visual expression to communicate experiences, beliefs and observations of the world.",
            tags: ["Symbols", "Nature", "Storytelling"]
        },

        medieval: {
            number: "02",
            label: "MEDIEVAL INDIA",
            title: "Art & Regional Traditions",
            text: "Different regions developed distinctive artistic traditions influenced by communities, courts, religion, local materials and cultural practices.",
            tags: ["Miniatures", "Architecture", "Manuscripts"]
        },

        traditional: {
            number: "03",
            label: "TRADITIONAL ART",
            title: "Stories Passed Through Generations",
            text: "Folk and community art became an important way of preserving stories, celebrations, beliefs and relationships with nature.",
            tags: ["Folk Art", "Craft", "Community"]
        },

        modern: {
            number: "04",
            label: "MODERN & CONTEMPORARY",
            title: "New Ideas & New Expressions",
            text: "Artists continue to experiment with materials, technology and ideas while creating new ways to express themselves.",
            tags: ["Digital Art", "Experimentation", "New Media"]
        }

    };


    timelineItems.forEach(item => {

        item.addEventListener("click", function () {

            timelineItems.forEach(i =>
                i.classList.remove("active")
            );

            this.classList.add("active");

            const data =
                timelineData[this.dataset.period];

            document.getElementById("timeline-number")
                .textContent = data.number;

            document.getElementById("timeline-label")
                .textContent = data.label;

            document.getElementById("timeline-title")
                .textContent = data.title;

            document.getElementById("timeline-text")
                .textContent = data.text;

            const tags =
                document.getElementById("timeline-tags");

            tags.innerHTML = "";

            data.tags.forEach(tag => {

                const span = document.createElement("span");

                span.textContent = tag;

                tags.appendChild(span);

            });

        });

    });

});


/* ================= SMOOTH SCROLL ================= */

function scrollToSection(id) {

    const section = document.getElementById(id);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}
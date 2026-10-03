/* =========================================================
   LOCALART — COMMUNITY & ART EXCHANGE JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const feedGrid =
        document.getElementById("feedGrid");

    const searchInput =
        document.getElementById("communitySearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const filterToggle =
        document.getElementById("filterToggle");

    const categoryFilters =
        document.getElementById("categoryFilters");

    const noPosts =
        document.getElementById("noPosts");

    const resetSearch =
        document.getElementById(
            "resetCommunitySearch"
        );


    /* =====================================================
       MODALS
       ===================================================== */

    const createPostModal =
        document.getElementById(
            "createPostModal"
        );

    const commentModal =
        document.getElementById(
            "commentModal"
        );

    const exchangeModal =
        document.getElementById(
            "exchangeModal"
        );


    /* =====================================================
       BUTTONS
       ===================================================== */

    const openCreatePost =
        document.getElementById(
            "openCreatePost"
        );

    const openCreatePostTop =
        document.getElementById(
            "openCreatePostTop"
        );

    const openCreatePostBottom =
        document.getElementById(
            "openCreatePostBottom"
        );


    /* =====================================================
       STATE
       ===================================================== */

    let activeCategory = "all";

    let currentCommentPost = null;

    let currentExchangeType = null;


    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(
        message,
        type = "success"
    ) {

        const oldToast =
            document.querySelector(
                ".community-toast"
            );

        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement("div");

        toast.className =
            `community-toast ${type}`;


        let icon =
            "ri-checkbox-circle-line";

        if (type === "error") {
            icon =
                "ri-error-warning-line";
        }

        if (type === "info") {
            icon =
                "ri-information-line";
        }


        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${escapeHTML(message)}</span>
        `;


        document.body.appendChild(toast);


        requestAnimationFrame(() => {
            toast.classList.add("show");
        });


        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);

        }, 2600);
    }


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        if (value === null ||
            value === undefined) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    /* =====================================================
       OPEN MODAL
       ===================================================== */

    function openModal(modal) {

        if (!modal) return;

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    /* =====================================================
       CLOSE MODAL
       ===================================================== */

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        const anyOpenModal =
            document.querySelector(
                ".community-modal.active"
            );

        if (!anyOpenModal) {

            document.body.style.overflow =
                "";

        }
    }


    /* =====================================================
       CREATE POST MODAL
       ===================================================== */

    function openCreatePostModal() {

        openModal(createPostModal);

    }


    if (openCreatePost) {

        openCreatePost.addEventListener(
            "click",
            openCreatePostModal
        );

    }


    if (openCreatePostTop) {

        openCreatePostTop.addEventListener(
            "click",
            openCreatePostModal
        );

    }


    if (openCreatePostBottom) {

        openCreatePostBottom.addEventListener(
            "click",
            openCreatePostModal
        );

    }


    /* =====================================================
       CLOSE MODALS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const modalId =
                        button.dataset.closeModal;

                    closeModal(
                        document.getElementById(
                            modalId
                        )
                    );

                }
            );

        });


    /* =====================================================
       CLICK OUTSIDE MODAL
       ===================================================== */

    document
        .querySelectorAll(
            ".community-modal"
        )
        .forEach(modal => {

            const overlay =
                modal.querySelector(
                    ".modal-overlay"
                );

            if (overlay) {

                overlay.addEventListener(
                    "click",
                    () => {
                        closeModal(modal);
                    }
                );

            }

        });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            const openModalElement =
                document.querySelector(
                    ".community-modal.active"
                );


            if (openModalElement) {

                closeModal(
                    openModalElement
                );

            }

        }
    );


    /* =====================================================
       SEARCH + CATEGORY FILTER
       ===================================================== */

    function filterPosts() {

        if (!feedGrid) return;


        const posts =
            feedGrid.querySelectorAll(
                ".community-post"
            );


        const searchTerm =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visiblePosts = 0;


        posts.forEach(post => {

            const category =
                (
                    post.dataset.category ||
                    "general"
                ).toLowerCase();


            const searchableText =
                (
                    post.dataset.search ||
                    post.textContent ||
                    ""
                ).toLowerCase();


            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;


            const searchMatch =
                !searchTerm ||
                searchableText.includes(
                    searchTerm
                );


            const shouldShow =
                categoryMatch &&
                searchMatch;


            if (shouldShow) {

                post.classList.remove(
                    "search-hidden"
                );

                visiblePosts++;

            } else {

                post.classList.add(
                    "search-hidden"
                );

            }

        });


        if (noPosts) {

            noPosts.style.display =
                visiblePosts === 0
                    ? "block"
                    : "none";

        }


        if (clearSearch && searchInput) {

            clearSearch.style.display =
                searchInput.value.trim()
                    ? "block"
                    : "none";

        }

    }


    /* =====================================================
       SEARCH INPUT
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterPosts
        );

    }


    /* =====================================================
       CLEAR SEARCH
       ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value =
                        "";

                    searchInput.focus();

                }

                filterPosts();

            }
        );

    }


    /* =====================================================
       RESET SEARCH
       ===================================================== */

    if (resetSearch) {

        resetSearch.addEventListener(
            "click",
            () => {

                if (searchInput) {
                    searchInput.value =
                        "";
                }


                activeCategory =
                    "all";


                categoryButtons
                    .forEach(button => {

                        button.classList.toggle(
                            "active",
                            button.dataset.category ===
                                "all"
                        );

                    });


                filterPosts();

            }
        );

    }


    /* =====================================================
       CATEGORY BUTTONS
       ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    button.dataset.category ||
                    "all";


                categoryButtons
                    .forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                filterPosts();

            }
        );

    });


    /* =====================================================
       MOBILE FILTER TOGGLE
       ===================================================== */

    if (filterToggle &&
        categoryFilters) {

        filterToggle.addEventListener(
            "click",
            () => {

                categoryFilters.classList.toggle(
                    "filter-visible"
                );

            }
        );

    }


    /* =====================================================
       LIKE SYSTEM
       ===================================================== */

    const likedPosts =
        new Set(
            JSON.parse(
                localStorage.getItem(
                    "localartLikedPosts"
                ) || "[]"
            )
        );


    function updateLikeButton(button) {

        const postId =
            button.dataset.postId ||
            getPostIdentifier(button);


        if (!postId) return;


        const icon =
            button.querySelector("i");


        if (likedPosts.has(postId)) {

            button.classList.add(
                "liked"
            );


            if (icon) {

                icon.className =
                    "ri-heart-fill";

            }

        } else {

            button.classList.remove(
                "liked"
            );


            if (icon) {

                icon.className =
                    "ri-heart-line";

            }

        }

    }


    function getPostIdentifier(element) {

        const post =
            element.closest(
                ".community-post"
            );


        if (!post) {
            return null;
        }


        if (post.dataset.postId) {

            return `db-${post.dataset.postId}`;

        }


        return `static-${Array.from(
            document.querySelectorAll(
                ".community-post"
            )
        ).indexOf(post)}`;

    }


    function toggleLike(button) {

        const post =
            button.closest(
                ".community-post"
            );


        if (!post) return;


        const postId =
            button.dataset.postId
                ? `db-${button.dataset.postId}`
                : getPostIdentifier(button);


        if (!postId) return;


        const countElement =
            button.querySelector(
                "span"
            );


        let count =
            parseInt(
                countElement
                    ? countElement.textContent
                    : "0",
                10
            ) || 0;


        if (likedPosts.has(postId)) {

            likedPosts.delete(
                postId
            );

            count = Math.max(
                0,
                count - 1
            );


            showToast(
                "Removed your like.",
                "info"
            );

        } else {

            likedPosts.add(
                postId
            );

            count++;


            showToast(
                "You liked this artwork ❤️"
            );

        }


        if (countElement) {

            countElement.textContent =
                count;

        }


        localStorage.setItem(
            "localartLikedPosts",
            JSON.stringify(
                Array.from(likedPosts)
            )
        );


        updateLikeButton(
            button
        );

    }


    document
        .querySelectorAll(
            ".like-btn"
        )
        .forEach(button => {

            const postId =
                button.dataset.postId
                    ? `db-${button.dataset.postId}`
                    : getPostIdentifier(button);


            if (
                postId &&
                likedPosts.has(postId)
            ) {

                updateLikeButton(
                    button
                );

            }


            button.addEventListener(
                "click",
                () => {
                    toggleLike(button);
                }
            );

        });


    /* =====================================================
       SAVE SYSTEM
       ===================================================== */

    const savedPosts =
        new Set(
            JSON.parse(
                localStorage.getItem(
                    "localartSavedPosts"
                ) || "[]"
            )
        );


    function toggleSave(button) {

        const post =
            button.closest(
                ".community-post"
            );


        if (!post) return;


        const postId =
            button.dataset.postId
                ? `db-${button.dataset.postId}`
                : getPostIdentifier(button);


        if (!postId) return;


        const icon =
            button.querySelector("i");


        if (savedPosts.has(postId)) {

            savedPosts.delete(
                postId
            );

            button.classList.remove(
                "saved"
            );


            if (icon) {

                icon.className =
                    "ri-bookmark-line";

            }


            showToast(
                "Removed from saved posts.",
                "info"
            );

        } else {

            savedPosts.add(
                postId
            );

            button.classList.add(
                "saved"
            );


            if (icon) {

                icon.className =
                    "ri-bookmark-fill";

            }


            showToast(
                "Post saved! 🔖"
            );

        }


        localStorage.setItem(
            "localartSavedPosts",
            JSON.stringify(
                Array.from(savedPosts)
            )
        );

    }


    document
        .querySelectorAll(
            ".save-btn"
        )
        .forEach(button => {

            const postId =
                button.dataset.postId
                    ? `db-${button.dataset.postId}`
                    : getPostIdentifier(button);


            if (
                postId &&
                savedPosts.has(postId)
            ) {

                button.classList.add(
                    "saved"
                );


                const icon =
                    button.querySelector("i");


                if (icon) {

                    icon.className =
                        "ri-bookmark-fill";

                }

            }


            button.addEventListener(
                "click",
                () => {
                    toggleSave(button);
                }
            );

        });


    /* =====================================================
       SHARE
       ===================================================== */

    document
        .querySelectorAll(
            ".share-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    const post =
                        button.closest(
                            ".community-post"
                        );


                    if (!post) return;


                    const title =
                        post.querySelector(
                            ".post-content h3"
                        )?.textContent
                            .trim()
                        || "LocalArt Community Post";


                    const shareData = {

                        title:
                            "LocalArt Community",

                        text:
                            title,

                        url:
                            window.location.href

                    };


                    try {

                        if (
                            navigator.share
                        ) {

                            await navigator.share(
                                shareData
                            );

                            return;

                        }


                        await navigator.clipboard.writeText(
                            window.location.href
                        );


                        showToast(
                            "Post link copied!"
                        );

                    } catch (error) {

                        if (
                            error.name !==
                            "AbortError"
                        ) {

                            showToast(
                                "Unable to share this post.",
                                "error"
                            );

                        }

                    }

                }
            );

        });


    /* =====================================================
       COMMENTS
       ===================================================== */

    const commentsStore =
        JSON.parse(
            localStorage.getItem(
                "localartComments"
            ) || "{}"
        );


    function getComments(postId) {

        if (!commentsStore[postId]) {

            commentsStore[postId] = [];

        }

        return commentsStore[postId];

    }


    function saveComments() {

        localStorage.setItem(
            "localartComments",
            JSON.stringify(
                commentsStore
            )
        );

    }


    function renderComments(postId) {

        const commentsList =
            document.getElementById(
                "commentsList"
            );


        if (!commentsList) return;


        const comments =
            getComments(postId);


        if (!comments.length) {

            commentsList.innerHTML = `
                <div class="comment-empty">
                    <i class="ri-chat-3-line"></i>
                    <p>Start the conversation.</p>
                </div>
            `;

            return;

        }


        commentsList.innerHTML =
            comments.map(comment => {

                return `
                    <div class="community-comment">

                        <div class="comment-avatar">
                            ${escapeHTML(
                                comment.initials
                            )}
                        </div>

                        <div class="comment-body">

                            <strong>
                                ${escapeHTML(
                                    comment.name
                                )}
                            </strong>

                            <p>
                                ${escapeHTML(
                                    comment.text
                                )}
                            </p>

                        </div>

                    </div>
                `;

            }).join("");

    }


    document
        .querySelectorAll(
            ".comment-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const post =
                        button.closest(
                            ".community-post"
                        );


                    if (!post) return;


                    currentCommentPost =
                        button.dataset.postId
                            ? `db-${button.dataset.postId}`
                            : getPostIdentifier(button);


                    renderComments(
                        currentCommentPost
                    );


                    openModal(
                        commentModal
                    );

                }
            );

        });


    /* =====================================================
       ADD COMMENT
       ===================================================== */

    const commentForm =
        document.getElementById(
            "commentForm"
        );

    const commentInput =
        document.getElementById(
            "commentInput"
        );


    if (commentForm) {

        commentForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (!currentCommentPost) {
                    return;
                }


                const text =
                    commentInput
                        ? commentInput.value.trim()
                        : "";


                if (!text) {

                    showToast(
                        "Please write a comment.",
                        "error"
                    );

                    return;

                }


                const comments =
                    getComments(
                        currentCommentPost
                    );


                comments.push({

                    name: "You",

                    initials: "YO",

                    text: text

                });


                saveComments();


                renderComments(
                    currentCommentPost
                );


                if (commentInput) {

                    commentInput.value =
                        "";

                }


                updateCommentCount(
                    currentCommentPost
                );


                showToast(
                    "Comment added! 💬"
                );

            }
        );

    }


    function updateCommentCount(
        postId
    ) {

        const post =
            findPostByIdentifier(
                postId
            );


        if (!post) return;


        const count =
            getComments(postId).length;


        const commentButton =
            post.querySelector(
                ".comment-btn"
            );


        const countElement =
            commentButton?.querySelector(
                ".comment-count"
            );


        if (countElement) {

            countElement.textContent =
                count;

        }

    }


    function findPostByIdentifier(
        identifier
    ) {

        const posts =
            document.querySelectorAll(
                ".community-post"
            );


        for (
            const post of posts
        ) {

            if (
                post.dataset.postId &&
                `db-${post.dataset.postId}` ===
                    identifier
            ) {

                return post;

            }

        }


        const staticPosts =
            Array.from(posts)
                .filter(
                    post =>
                        !post.dataset.postId
                );


        const index =
            parseInt(
                String(identifier)
                    .replace(
                        "static-",
                        ""
                    ),
                10
            );


        return staticPosts[index] || null;

    }


    /* =====================================================
       INITIAL COMMENT COUNTS
       ===================================================== */

    document
        .querySelectorAll(
            ".community-post"
        )
        .forEach(post => {

            const button =
                post.querySelector(
                    ".comment-btn"
                );


            if (!button) return;


            const postId =
                button.dataset.postId
                    ? `db-${button.dataset.postId}`
                    : getPostIdentifier(button);


            if (postId) {

                const countElement =
                    button.querySelector(
                        ".comment-count"
                    );


                if (countElement) {

                    countElement.textContent =
                        getComments(
                            postId
                        ).length;

                }

            }

        });


    /* =====================================================
       IMAGE PREVIEW
       ===================================================== */

    const postImage =
        document.getElementById(
            "postImage"
        );

    const postImagePreview =
        document.getElementById(
            "postImagePreview"
        );


    if (
        postImage &&
        postImagePreview
    ) {

        postImage.addEventListener(
            "change",
            () => {

                const file =
                    postImage.files[0];


                if (!file) {

                    postImagePreview.innerHTML =
                        "";

                    postImagePreview.style.display =
                        "none";

                    return;

                }


                const allowedTypes = [
                    "image/png",
                    "image/jpeg",
                    "image/webp"
                ];


                if (
                    !allowedTypes.includes(
                        file.type
                    )
                ) {

                    showToast(
                        "Please select a PNG, JPG or WEBP image.",
                        "error"
                    );


                    postImage.value =
                        "";


                    postImagePreview.innerHTML =
                        "";

                    postImagePreview.style.display =
                        "none";

                    return;

                }


                const maxSize =
                    5 * 1024 * 1024;


                if (file.size > maxSize) {

                    showToast(
                        "Image must be smaller than 5 MB.",
                        "error"
                    );


                    postImage.value =
                        "";


                    postImagePreview.innerHTML =
                        "";

                    postImagePreview.style.display =
                        "none";

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    event => {

                        postImagePreview.innerHTML = `
                            <img
                                src="${event.target.result}"
                                alt="Selected artwork preview"
                            >
                        `;

                        postImagePreview.style.display =
                            "block";

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }


    /* =====================================================
       CREATE POST FORM
       ===================================================== */

    const createPostForm =
        document.getElementById(
            "createPostForm"
        );


    if (createPostForm) {

        createPostForm.addEventListener(
            "submit",
            event => {

                const content =
                    document.getElementById(
                        "postContent"
                    );


                if (
                    !content ||
                    !content.value.trim()
                ) {

                    event.preventDefault();

                    showToast(
                        "Please write something before publishing.",
                        "error"
                    );

                    return;

                }


                const submitButton =
                    document.getElementById(
                        "publishPostBtn"
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.innerHTML = `
                        <i class="ri-loader-4-line ri-spin"></i>
                        Publishing...
                    `;

                }


                /*
                 * IMPORTANT:
                 *
                 * DO NOT use preventDefault()
                 * here when validation succeeds.
                 *
                 * Flask will receive:
                 *
                 * POST /community/create
                 *
                 * and save the post + image
                 * in SQLite.
                 */

            }
        );

    }


    /* =====================================================
       RESET CREATE FORM WHEN MODAL OPENS
       ===================================================== */

    function resetCreatePostForm() {

        if (!createPostForm) return;


        createPostForm.reset();


        if (postImagePreview) {

            postImagePreview.innerHTML =
                "";

            postImagePreview.style.display =
                "none";

        }


        const submitButton =
            document.getElementById(
                "publishPostBtn"
            );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.innerHTML = `
                <i class="ri-send-plane-line"></i>
                Publish Post
            `;

        }

    }


    [
        openCreatePost,
        openCreatePostTop,
        openCreatePostBottom
    ]
        .filter(Boolean)
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    resetCreatePostForm();

                }
            );

        });


    /* =====================================================
       ART EXCHANGE
       ===================================================== */

    const exchangeTitle =
        document.getElementById(
            "exchangeModalTitle"
        );

    const exchangeText =
        document.getElementById(
            "exchangeModalText"
        );


    const exchangeData = {

        artwork: {

            title:
                "Offer an Artwork",

            text:
                "Tell the community about the artwork you would like to exchange."

        },

        looking: {

            title:
                "Looking for Artwork",

            text:
                "Tell the community what kind of artwork you are looking for."

        },

        skill: {

            title:
                "Skill Exchange",

            text:
                "Share a skill you can teach and a skill you would like to learn."

        },

        supplies: {

            title:
                "Art Supplies Exchange",

            text:
                "Tell the community about the art supplies you want to exchange."

        }

    };


    document
        .querySelectorAll(
            ".exchange-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    currentExchangeType =
                        button.dataset.exchange ||
                        "artwork";


                    const data =
                        exchangeData[
                            currentExchangeType
                        ];


                    if (data) {

                        if (exchangeTitle) {

                            exchangeTitle.textContent =
                                data.title;

                        }


                        if (exchangeText) {

                            exchangeText.textContent =
                                data.text;

                        }

                    }


                    openModal(
                        exchangeModal
                    );

                }
            );

        });


    /* =====================================================
       EXCHANGE FORM
       ===================================================== */

    const exchangeForm =
        document.getElementById(
            "exchangeForm"
        );


    if (exchangeForm) {

        exchangeForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const title =
                    document.getElementById(
                        "exchangeTitle"
                    )?.value.trim();


                const description =
                    document.getElementById(
                        "exchangeDescription"
                    )?.value.trim();


                if (!title ||
                    !description) {

                    showToast(
                        "Please fill in the required fields.",
                        "error"
                    );

                    return;

                }


                showToast(
                    "Exchange request submitted! 🎨"
                );


                exchangeForm.reset();


                closeModal(
                    exchangeModal
                );

            }
        );

    }


    /* =====================================================
       FIND COMMUNITY
       ===================================================== */

    const findCommunityBtn =
        document.getElementById(
            "findCommunityBtn"
        );


    if (findCommunityBtn) {

        findCommunityBtn.addEventListener(
            "click",
            () => {

                const city =
                    document.getElementById(
                        "communityCity"
                    )?.value.trim();


                const artType =
                    document.getElementById(
                        "communityArtType"
                    )?.value;


                const interest =
                    document.getElementById(
                        "communityInterest"
                    )?.value.trim();


                if (
                    !city &&
                    !artType &&
                    !interest
                ) {

                    showToast(
                        "Enter at least one detail to find a community.",
                        "error"
                    );

                    return;

                }


                let message =
                    "Searching LocalArt communities";


                if (city) {

                    message +=
                        ` in ${city}`;

                }


                if (artType) {

                    message +=
                        ` for ${artType}`;

                }


                showToast(
                    message + "..."
                );


                /*
                 * For now this is frontend interaction.
                 *
                 * Later this button can connect
                 * to a Flask route/database query.
                 */

            }
        );

    }


    /* =====================================================
       CREATIVE DISCUSSIONS
       ===================================================== */

    document
        .querySelectorAll(
            ".discussion-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const topic =
                        card.dataset.discussion ||
                        "art";


                    showToast(
                        `Opening ${topic} discussion...`
                    );

                }
            );

        });


    /* =====================================================
       CHALLENGES
       ===================================================== */

    document
        .querySelectorAll(
            ".challenge-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const challenge =
                        button.dataset.challenge ||
                        "challenge";


                    button.textContent =
                        "Joined";


                    button.disabled =
                        true;


                    showToast(
                        `You joined the ${challenge} challenge! 🎨`
                    );

                }
            );

        });


    /* =====================================================
       POST MENU
       ===================================================== */

    document
        .querySelectorAll(
            ".post-menu"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showToast(
                        "More post options coming soon.",
                        "info"
                    );

                }
            );

        });


    /* =====================================================
       LOAD MORE / INITIAL FILTER
       ===================================================== */

    filterPosts();


    /* =====================================================
       PAGE LOAD ANIMATION
       ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".community-post, .exchange-card, .discussion-card, .challenge-card"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .08
                }
            );


        animatedElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


});
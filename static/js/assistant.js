/* =========================================
   LOCALART AI ASSISTANT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const sendBtn = document.getElementById("sendBtn");
    const typingIndicator = document.getElementById("typingIndicator");
    const clearChatBtn = document.getElementById("clearChatBtn");
    const newChatBtn = document.getElementById("newChatBtn");

    if (!chatMessages || !chatInput || !sendBtn) {
        return;
    }


    /* =========================================
       DEMO AI RESPONSES
       ========================================= */

    const responses = {

        warli: `
            <h3>Warli Art 🎨</h3>
            <p>
                Warli is a traditional tribal art form associated with
                Maharashtra. It is known for simple geometric shapes,
                especially circles, triangles and lines.
            </p>
            <p>
                Warli paintings often represent village life, farming,
                celebrations, animals and people.
            </p>
        `,

        madhubani: `
            <h3>Madhubani Art 🖌️</h3>
            <p>
                Madhubani, also known as Mithila painting, is a traditional
                Indian art style associated with the Mithila region.
            </p>
            <p>
                It is recognised for detailed patterns, bold outlines,
                nature-inspired elements and vibrant compositions.
            </p>
        `,

        artist: `
            <h3>Discover Local Artists 👩‍🎨</h3>
            <p>
                LocalArt can help you explore artists based on their artwork,
                location and artistic style.
            </p>
            <p>
                You can use the Artists section to discover creators and
                explore their profiles and artworks.
            </p>
        `,

        event: `
            <h3>Art Workshops & Events 🎭</h3>
            <p>
                You can explore workshops, exhibitions, cultural events and
                local art experiences through the Events section.
            </p>
            <p>
                Try filtering events based on your interests to discover
                something creative near you.
            </p>
        `,

        technique: `
            <h3>Art Techniques 🖌️</h3>
            <p>
                If you're a beginner, start with basic sketching, watercolor,
                acrylic painting or simple traditional art techniques.
            </p>
            <p>
                Pick one technique and practise small artworks regularly
                before moving to more advanced projects.
            </p>
        `,

        idea: `
            <h3>Creative Ideas 💡</h3>
            <p>
                Here are some ideas you can try:
            </p>
            <p>
                • Create a local-culture inspired painting.<br>
                • Make a modern version of traditional art.<br>
                • Draw your favourite Pune landmark.<br>
                • Combine Warli patterns with a contemporary composition.
            </p>
        `,

        indian: `
            <h3>Indian Traditional Art 🇮🇳</h3>
            <p>
                India has many regional art traditions including Warli,
                Madhubani, Pattachitra, Kalamkari, Phad, Gond, Tanjore and
                many others.
            </p>
            <p>
                Each tradition has its own visual language, materials,
                cultural background and regional identity.
            </p>
        `

    };


    /* =========================================
       FIND RESPONSE
       ========================================= */

    function getResponse(question) {

        const text = question.toLowerCase();

        if (
            text.includes("warli") ||
            text.includes("warli art")
        ) {
            return responses.warli;
        }

        if (
            text.includes("madhubani") ||
            text.includes("mithila")
        ) {
            return responses.madhubani;
        }

        if (
            text.includes("artist") ||
            text.includes("artists") ||
            text.includes("creator")
        ) {
            return responses.artist;
        }

        if (
            text.includes("workshop") ||
            text.includes("event") ||
            text.includes("exhibition")
        ) {
            return responses.event;
        }

        if (
            text.includes("technique") ||
            text.includes("painting technique") ||
            text.includes("how to paint")
        ) {
            return responses.technique;
        }

        if (
            text.includes("idea") ||
            text.includes("inspiration") ||
            text.includes("creative")
        ) {
            return responses.idea;
        }

        if (
            text.includes("indian art") ||
            text.includes("traditional art") ||
            text.includes("indian traditional")
        ) {
            return responses.indian;
        }

        return `
            <h3>That's a creative question! 🎨</h3>
            <p>
                I can help you explore Indian art, local artists,
                workshops, art techniques, cultural traditions and
                creative ideas.
            </p>
            <p>
                Try asking me something specific, such as
                <strong>"What is Warli art?"</strong> or
                <strong>"How can I find local artists?"</strong>
            </p>
        `;
    }


    /* =========================================
       ESCAPE HTML
       ========================================= */

    function escapeHTML(text) {

        const div = document.createElement("div");
        div.textContent = text;

        return div.innerHTML;
    }


    /* =========================================
       ADD USER MESSAGE
       ========================================= */

    function addUserMessage(text) {

        const message = document.createElement("div");

        message.className = "message user-message";

        message.innerHTML = `
            <div class="message-avatar">
                <i class="ri-user-3-line"></i>
            </div>

            <div class="message-content">

                <div class="message-name">
                    You
                </div>

                <div class="message-bubble">
                    <p>${escapeHTML(text)}</p>
                </div>

            </div>
        `;

        chatMessages.appendChild(message);

        scrollToBottom();
    }


    /* =========================================
       ADD AI MESSAGE
       ========================================= */

    function addAIMessage(content) {

        const message = document.createElement("div");

        message.className = "message ai-message";

        message.innerHTML = `
            <div class="message-avatar">
                <i class="ri-sparkling-2-line"></i>
            </div>

            <div class="message-content">

                <div class="message-name">
                    LocalArt AI
                </div>

                <div class="message-bubble">
                    ${content}
                </div>

            </div>
        `;

        chatMessages.appendChild(message);

        scrollToBottom();
    }


    /* =========================================
       TYPING
       ========================================= */

    function showTyping() {

        typingIndicator.classList.add("active");

        scrollToBottom();
    }


    function hideTyping() {

        typingIndicator.classList.remove("active");
    }


    /* =========================================
       SEND MESSAGE
       ========================================= */

    function sendMessage() {

        const text = chatInput.value.trim();

        if (!text) {
            return;
        }

        addUserMessage(text);

        chatInput.value = "";
        chatInput.style.height = "auto";

        showTyping();

        setTimeout(function () {

            hideTyping();

            const response = getResponse(text);

            addAIMessage(response);

        }, 900);
    }


    /* =========================================
       SCROLL
       ========================================= */

    function scrollToBottom() {

        setTimeout(function () {

            chatMessages.scrollTo({
                top: chatMessages.scrollHeight,
                behavior: "smooth"
            });

        }, 50);
    }


    /* =========================================
       SEND BUTTON
       ========================================= */

    sendBtn.addEventListener("click", sendMessage);


    /* =========================================
       ENTER TO SEND
       ========================================= */

    chatInput.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    });


    /* =========================================
       AUTO RESIZE TEXTAREA
       ========================================= */

    chatInput.addEventListener("input", function () {

        this.style.height = "auto";

        this.style.height =
            Math.min(this.scrollHeight, 100) + "px";

    });


    /* =========================================
       SUGGESTION BUTTONS
       ========================================= */

    const suggestionButtons =
        document.querySelectorAll(
            ".suggestion-card, .side-question"
        );

    suggestionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const question =
                this.dataset.question;

            if (!question) {
                return;
            }

            chatInput.value = question;

            sendMessage();
        });

    });


    /* =========================================
       CLEAR CHAT
       ========================================= */

    function clearChat() {

        chatMessages.innerHTML = `
            <div class="message ai-message">

                <div class="message-avatar">
                    <i class="ri-sparkling-2-line"></i>
                </div>

                <div class="message-content">

                    <div class="message-name">
                        LocalArt AI
                    </div>

                    <div class="message-bubble">

                        <h3>Namaste! 👋</h3>

                        <p>
                            I'm ready for a new conversation.
                            Ask me anything about art, artists,
                            culture or creative ideas.
                        </p>

                    </div>

                </div>

            </div>
        `;

        scrollToBottom();
    }


    clearChatBtn.addEventListener(
        "click",
        clearChat
    );


    newChatBtn.addEventListener(
        "click",
        clearChat
    );


});
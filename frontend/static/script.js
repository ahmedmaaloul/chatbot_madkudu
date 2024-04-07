document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userText = userInput.value.trim();

    if (userText) {
        createMessageBubble(userText, 'user-message');
        userInput.value = '';

        fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userText, sender: "test_user" }),
        })
        .then(response => response.json())
        .then(data => {
            const botText = data[0].text;
            createMessageBubble(botText, 'bot-message');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

function createMessageBubble(text, className) {
    const div = document.createElement("div");
    div.textContent = text;
    div.classList.add("message", className);
    const chatBox = document.getElementById('chat-box');
    chatBox.insertBefore(div, chatBox.firstChild);
}

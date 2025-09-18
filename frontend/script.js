// script.js

async function generateContent() {
    const prompt = document.getElementById('prompt').value.trim();
    const outputDiv = document.getElementById('output');

    if (!prompt) {
        outputDiv.innerText = "Please enter a topic.";
        return;
    }

    outputDiv.innerText = "Generating...";

    try {
        // --- THIS IS THE UPDATED LINE ---
        const response = await fetch('https://bloggenius-backend.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (response.ok) {
            outputDiv.innerText = data.blog || "No content generated.";
        } else {
            // Display the specific error message from the backend
            outputDiv.innerText = `Error: ${data.error || "Unknown error occurred."}`;
        }
    } catch (error) {
        outputDiv.innerText = "Network error. Could not connect to the server.";
        console.error("Error:", error);
    }
}

function copyContent() {
    const outputDiv = document.getElementById('output');
    navigator.clipboard.writeText(outputDiv.innerText);
    alert("Copied to clipboard!");
}

function downloadContent() {
    const outputDiv = document.getElementById('output');
    const blob = new Blob([outputDiv.innerText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'blog.txt';
    link.click();
}
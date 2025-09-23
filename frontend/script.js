// script.js

async function generateContent() {
    const prompt = document.getElementById('prompt').value.trim();
    const outputDiv = document.getElementById('output');
    const spinner = document.getElementById('spinner-container');

    if (!prompt) {
        outputDiv.innerText = "Please enter a topic.";
        return;
    }

    // Show the spinner and clear previous output
    spinner.classList.remove('hidden');
    outputDiv.innerText = "";

    try {
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
            outputDiv.innerText = `Error: ${data.error || "Unknown error occurred."}`;
        }
    } catch (error) {
        outputDiv.innerText = "Network error. Could not connect to the server.";
        console.error("Error:", error);
    } finally {
        // Hide the spinner regardless of success or failure
        spinner.classList.add('hidden');
    }
}

// Keep the copyContent and downloadContent functions as they are
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
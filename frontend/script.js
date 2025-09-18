async function generateContent() {
    const prompt = document.getElementById('prompt').value.trim();
    const outputDiv = document.getElementById('output');

    if (!prompt) {
        outputDiv.innerText = "Please enter a topic.";
        return;
    }

    outputDiv.innerText = "Generating...";

    try {
        const response = await fetch('http://localhost:5000/generate', {
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
            outputDiv.innerText = data.error || "Error generating content.";
        }
    } catch (error) {
        outputDiv.innerText = "Network error. Is the backend running on port 5000?";
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

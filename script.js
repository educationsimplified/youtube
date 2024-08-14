document.getElementById('video-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const videoUrl = document.getElementById('video-url').value;
    const platform = document.getElementById('platform').value;

    if (videoUrl && platform) {
        // Call your backend service to handle the video download and splitting
        fetch('/download-and-split', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoUrl, platform })
        })
        .then(response => response.json())
        .then(data => {
            // Display the results or download link
            document.getElementById('results-section').innerHTML = `
                <p>Video has been processed. You can <a href="${data.downloadLink}" download>download your video here</a>.</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('results-section').innerHTML = '<p>An error occurred. Please try again.</p>';
        });
    }
});

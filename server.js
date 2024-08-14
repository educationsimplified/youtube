const express = require('express');
const bodyParser = require('body-parser');
const videoProcessingService = require('./videoProcessingService'); // Your custom video processing logic

const app = express();
app.use(bodyParser.json());

app.post('/download-and-split', async (req, res) => {
    const { videoUrl, platform } = req.body;

    try {
        const videoPath = await videoProcessingService.downloadVideo(videoUrl);
        const splitFilePath = await videoProcessingService.splitVideo(videoPath, platform);
        
        res.json({ downloadLink: splitFilePath });
    } catch (error) {
        console.error('Error processing video:', error);
        res.status(500).json({ error: 'Error processing video' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

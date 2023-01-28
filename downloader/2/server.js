const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const path = require('path')

app.use(cors());
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
	res.sendFile('index.html')
})

app.get('/downloadmp3', async (req, res, next) => {
	try {
		var url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'audio';
		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			if (err) throw err;
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});
		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).pipe(res);
	} catch (err) {
		console.error(err);
	}
});
app.get('/downloadmp4', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'video';
		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
		});
		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, {
			format: 'mp4',
		}).pipe(res);
	} catch (err) {
		console.error(err);
	}
});

app.listen(3000, () => {
	console.log(`Server is running...`);
});
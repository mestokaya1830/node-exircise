const fs = require("fs");
const ytdl = require("ytdl-core");
const async = require("async");
const cliProgress = require("cli-progress");
const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
const videos = fs.readFileSync("./videos.txt", "utf8").split(/\r?\n/);

async.eachLimit(videos, 1, function (url, callback) {
  try {
    const filename = `./${url.split("=")[1]}.mp4`;
    let downloadStarted = false;
    ytdl(url)
      .on("progress", (_, totalDownloaded, total) => {
        if (!downloadStarted) {
          bar1.start(total, 0);
          downloadStarted = true;
        }
        bar1.update(totalDownloaded);
      })
      .on("end", (_, totalDownloaded, total) => {
        bar1.stop();
        callback();
      })
      .pipe(fs.createWriteStream(filename));
  } catch (error) {
    console.error(error);
  }
});

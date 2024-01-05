const canvas = require("@napi-rs/canvas");
const { colorFetch } = require("../functions/colorFetch");


//canvas.GlobalFonts.registerFromPath(`build/structures/font/circularstd-black.otf`, "circular-std");
 //canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-jp-black.ttf`, "noto-sans-jp");
 //canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-black.ttf`, "noto-sans");
 //canvas.GlobalFonts.registerFromPath(`build/structures/font/notoemoji-bold.ttf`, "noto-emoji");
 //canvas.GlobalFonts.registerFromPath(`build/structures/font/notosans-kr-black.ttf`, "noto-sans-kr");
 //canvas.GlobalFonts.registerFromPath(`build/structures/font/Chewy-Regular.ttf`, "chewy");

canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/circularstd-black.otf`, "circular-std");
canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/notosans-jp-black.ttf`, "noto-sans-jp");
canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/notosans-black.ttf`, "noto-sans");
canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/notoemoji-bold.ttf`, "noto-emoji");
canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/notosans-kr-black.ttf`, "noto-sans-kr");
canvas.GlobalFonts.registerFromPath(`node_modules/topggcard/build/structures/font/Chewy-Regular.ttf`, "chewy");

class TopGGCard {
    constructor(options) {
        this.name = options?.name ?? null;
        this.votes = options?.votes ?? null;
        this.color = options?.color ?? null;
        this.brightness = options?.brightness ?? null;
        this.avatar = options?.avatar ?? null;
        this.progress = options?.progress ?? null;
        this.streak = options?.streak ?? null;
        this.requiredStreak = options?.requiredStreak ?? null;
        this.currentStreak = options?.currentStreak ?? null;
        this.showStreak = options?.showStreak ?? true;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setVotes(votes) {
        this.votes = votes;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setBrightness(brightness) {
        this.brightness = brightness;
        return this;
    }

    setAvatar(avatar) {
        this.avatar = avatar;
        return this;
    }

    setProgress(progress) {
        this.progress = progress;
        return this;
    }
    setStreak(streak) {
        this.streak = streak;
        return this;
    }
    setRequiredStreak(requiredStreak) {
        this.requiredStreak = requiredStreak;
        return this;
    }
    setCurrentStreak(currentStreak) {
        this.currentStreak = currentStreak;
        return this;
    }
    setShowStreak(showStreak) {
        this.showStreak = showStreak;
        return this;
    }


    async build() {
        if (!this.name) throw new Error('Missing name parameter');
        if (!this.votes) this.setVotes("00");
        if (!this.color) this.setColor('ff0000');
        if (!this.brightness) this.setBrightness(0);
        if (!this.avatar) this.setAvatar('https://s6.imgcdn.dev/Opo4a.jpg');
        if (!this.progress) this.setProgress(0);
        if (!this.streak) this.setStreak("00")
        if (!this.requiredStreak) this.setRequiredStreak("00")
        if (!this.currentStreak) this.setCurrentStreak("00");


        let validatedProgress = parseFloat(this.progress);
        if (Number.isNaN(validatedProgress) || validatedProgress < 0 || validatedProgress > 100) throw new Error('Invalid progress parameter, must be between 0 to 100');


        if (validatedProgress < 2) validatedProgress = 2;
        if (validatedProgress > 99) validatedProgress = 99;

        const validatedColor = await colorFetch(
            this.color || 'ff0000',
            parseInt(this.brightness) || 0,
            this.avatar
        );

        if (this.name.length > 10) this.name = `${this.name.slice(0, 10)}...`;
        if (this.votes.length > 10) this.votes = `${this.votes.slice(0, 10)}...`;
        if (this.streak.length > 10000) this.streak = `9999`;


            const frame = canvas.createCanvas(1280, 450);
            const ctx = frame.getContext("2d");

                let background = await canvas.loadImage(`https://s6.imgcdn.dev/fw6DK.png`);

            ctx.drawImage(background, 0, 0, frame.width, frame.height)

            const thumbnailCanvas = canvas.createCanvas(650, 650);
            const thumbnailCtx = thumbnailCanvas.getContext('2d');

            let thumbnailImage;

            thumbnailImage = await canvas.loadImage(this.avatar, {
                requestOptions: {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                    }
                }
            }).catch(() => {
                thumbnailImage = canvas.loadImage(`https://cdn.discordapp.com/attachments/1163071862146859089/1180532188438077450/00ea394f-6336-45d0-b96c-712fc621ec4d.png`);
            })

            const thumbnailSize = Math.min(thumbnailImage.width, thumbnailImage.height);
            const thumbnailX = (thumbnailImage.width - thumbnailSize) / 2;
            const thumbnailY = (thumbnailImage.height - thumbnailSize) / 2;

            const cornerRadius2 = 45;

            thumbnailCtx.beginPath();
            thumbnailCtx.moveTo(0 + cornerRadius2, 0);
            thumbnailCtx.arcTo(thumbnailCanvas.width, 0, thumbnailCanvas.width, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(thumbnailCanvas.width, thumbnailCanvas.height, 0, thumbnailCanvas.height, cornerRadius2);
            thumbnailCtx.arcTo(0, thumbnailCanvas.height, 0, 0, cornerRadius2);
            thumbnailCtx.arcTo(0, 0, thumbnailCanvas.width, 0, cornerRadius2);
            thumbnailCtx.closePath();
            thumbnailCtx.clip();

            thumbnailCtx.drawImage(thumbnailImage, thumbnailX, thumbnailY, thumbnailSize, thumbnailSize, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

           
            ctx.save();
         ctx.drawImage(thumbnailCanvas, 60, 69, 308, 313);
            ctx.font = "bold 90px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
            ctx.fillStyle = `#${validatedColor}`;
            ctx.fillText(this.name, 431, 200);

            ctx.font = "bold 60px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
            ctx.fillStyle = "#787878";
            ctx.fillText(`Votes: ${this.votes}`, 431, 270);




            if(this.streak.length == 1) {
                ctx.font = "bold 60px chewy";
                ctx.fillStyle = "#787878";
                ctx.fillText(`#${this.streak}`, 1080, 250);
            } else  if(this.streak.length == 2) {
                ctx.font = "bold 60px chewy";
                ctx.fillStyle = "#787878";
                ctx.fillText(`#${this.streak}`, 1060, 250);
            } else  if(this.streak.length == 3) {
                ctx.font = "bold 60px chewy";
                ctx.fillStyle = "#787878";
                ctx.fillText(`#${this.streak}`, 1050, 250);
            } else  if(this.streak.length == 4) {
                ctx.font = "bold 55px chewy";
                ctx.fillStyle = "#787878";
                ctx.fillText(`#${this.streak}`, 1040, 250);
            } else  if(this.streak.length == 5) {
                ctx.font = "bold 50px chewy";
                ctx.fillStyle = "#787878";
                ctx.fillText(`#${this.streak}`, 1035, 250);
            }
            const abbreviateNumber = (value) => {

                const suffixes = ['', 'K', 'M', 'B', 'T', 'Tr'];
                let suffixNum = 0;
              
                while (value >= 1000) {
                  suffixNum++;
                  value /= 1000;
                }
              
                let shortValue = Math.floor(value);
                
                if (shortValue % 1 != 0) {
                  shortValue = shortValue.toFixed(1);
                }
              
                if (suffixNum > 0) {
                  shortValue += suffixes[suffixNum]; 
                }
              
                return shortValue;
              }
            

              if(this.showStreak) {
            ctx.font = "thin 55px circular-std, noto-emoji, noto-sans-jp, noto-sans, noto-sans-kr";
            ctx.fillStyle = "#787878";
            ctx.fillText(`Streak: `, 440, 350);


            ctx.font = "thin 55px chewy";
            ctx.fillStyle = "#787878";
            ctx.fillText(`${abbreviateNumber(`${this.currentStreak}`)} / ${abbreviateNumber(`${this.requiredStreak}`)}`, 640, 350);


              }
            ctx.beginPath();
            ctx.arc(1115, 235, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.lineWidth = 20;
            ctx.strokeStyle = "#242323";
            ctx.stroke();

            const progress = validatedProgress;
            const angle = (progress / 100) * Math.PI * 2;

            ctx.beginPath();
            ctx.arc(1115, 235, 100, -Math.PI / 2, -Math.PI / 2 + angle, false);
            ctx.lineWidth = 20;
            ctx.strokeStyle = `#${validatedColor}`;
            ctx.stroke();

            return frame.toBuffer("image/png");
        
    }
}

module.exports = { TopGGCard };

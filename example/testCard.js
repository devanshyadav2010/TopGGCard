(async () => {
    const { TopGGCard } = require("../build/index.js");
    const fs = require("fs");

    const card = new TopGGCard()
        .setName("Devansh")
        .setVotes("7")
        .setColor("auto")
        .setBrightness(100)
        .setAvatar("https://static.qobuz.com/images/covers/ga/ua/rmk2cpqliuaga_600.jpg")
        .setProgress(50)
        .setStreak("7")
        .setCurrentStreak("7")
        .setRequiredStreak("14")
        .setShowStreak(true);
     

    const cardBuffer = await card.build();

    fs.writeFileSync(`TopGGCard.png`, cardBuffer);
    console.log("Done!");
})()
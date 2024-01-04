# TopGGCard

TopGGCard is a powerful Node.js package designed to create visually appealing cards displaying user votes, username with avatar, and additional customizable features. Elevate your user experience by showcasing engagement metrics in a stylish manner.

## Repository Stats

![GitHub Repo Stars](https://img.shields.io/github/stars/devanshyadav2010/topggcard?style=for-the-badge)
![GitHub Repo Forks](https://img.shields.io/github/forks/devanshyadav2010/topggcard?style=for-the-badge)
![GitHub Issues](https://img.shields.io/github/issues/devanshyadav2010/topggcard?style=for-the-badge)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/devanshyadav2010/topggcard?style=for-the-badge)

## NPM Stats

![NPM Version](https://img.shields.io/npm/v/topggcard?style=for-the-badge)
![NPM Downloads](https://img.shields.io/npm/dt/topggcard?style=for-the-badge)
![NPM License](https://img.shields.io/npm/l/topggcard?style=for-the-badge)

## Installation

```bash
npm install topggcard
```

## Usage

```javascript
const { TopGGCard } = require("topggcard");
const fs = require("fs");

const card = new TopGGCard()
    .setName("Devansh")
    .setVotes("7")
    .setColor("auto")
    .setBrightness(100)
    .setAvatar("https://link-to-avatar-image.jpg")
    .setProgress(50)
    .setStreak("7")
    .setCurrentStreak("7")
    .setRequiredStreak("14")
    .setShowStreak(true);

const cardBuffer = await card.build();

fs.writeFileSync(`TopGGCard.png`, cardBuffer);
console.log("Done!");
```

## Preview

![TopGGCard Preview](https://i.imgur.com/7GC3bdl.png)

## Credits

- [Devansh](https://github.com/devanshyadav2010) - Creator of TopGGCard
- [Ayush](https://github.com/grdAyush) - Contributor

Feel free to contribute, report issues, or suggest enhancements. Your feedback is highly appreciated!

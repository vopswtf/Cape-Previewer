const puppeteer = require('puppeteer');
const fs = require('fs');
const readlineSync = require('readline-sync');

var hex = readlineSync.question('Enter Background Color Hex (no hashtag, leave empty for green screen): \n', {
    hideEchoBack: false
});

if (hex.length === 0) {
    hex = "00b140"
};

(async() => {    
    const browser = await puppeteer.launch({headless: true,args:["--disable-web-security"]});
    const page = await browser.newPage(); 
    const url = `file://${process.cwd()}/assets/preview.html`
    await page.goto(url)
    setTimeout(async () => {
        await page.evaluate(hex => {
            skinViewer.background = parseInt("0x" + hex);
        }, hex);
        const imageBuffer = await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: 1024, height: 1024 } });
        fs.writeFileSync('render.png', imageBuffer)
        await browser.close();    
    }, 100)
})();
    
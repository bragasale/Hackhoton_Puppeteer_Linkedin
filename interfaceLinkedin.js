const puppeteer = require('puppeteer');

const BASE_URL = 'https://www.linkedin.com'

const linkedin = {
    browser: null,
    page: null,

    initialize: async () => {
        
        linkedin.browser = await puppeteer.launch({
            headless: false
        })
    
        linkedin.page = await linkedin.browser.newPage()

        await linkedin.page.goto(BASE_URL, {waitUntil: 'networkidle2'})

        await linkedin.page.$eval('.search__placeholder--search', el => el.click());

        await linkedin.page.type('input[name="keywords"]', 'Desenvolvedor', {delay: 50})

        await linkedin.page.evaluate(() => {
            let elements = document.getElementsByClassName('switcher-tabs__button');
            for (let element of elements)
                console.log(element.nodeValue)
        })

        await linkedin.page.keyboard.press('Tab', {delay: 100})
        
        await linkedin.page.keyboard.press('Tab', {delay: 100})

       // console.log(await linkedin.page.$x('//a[contains(text(), "Vagas")]'))

        //console.log(await linkedin.page.$eval('.switcher-tabs__button', al => al.click()))

        await linkedin.page.type('input[name="location"]', 'United States', {delay: 50})

        //Pesquise vagas
        await linkedin.page.keyboard.press('Tab', {delay: 100})
        
        await linkedin.page.keyboard.press('Tab', {delay: 100})

        await linkedin.page.evaluate(() =>{
            let el = document.getElementsByClassName('search__button');
            el[1].click();
        })        
    }
}

module.exports = linkedin
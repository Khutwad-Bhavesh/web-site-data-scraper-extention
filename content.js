chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "scrape") {

    const extractElements = (selector, attribute) => 
        Array.from(document.querySelectorAll(selector)).map(el => el[attribute]);

    const title = document.title;
    const headings = extractElements("h1,h2,h3,h4,h5,h6", "innerText");
    const links = extractElements("a", "href");

    sendResponse({
        title,
        headings,
        links
    });
    }


});
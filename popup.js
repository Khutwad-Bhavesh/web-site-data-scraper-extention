let scrapedData = {};

const exportData = (filename, mime, content) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const formatData = () => {
  return `Title: ${scrapedData.title||""}\n\nHeadings:\n${(scrapedData.headings||[]).join("\n")}\n\nLinks:\n${(scrapedData.links||[]).join("\n")}`;
};

document.getElementById("scrapeBtn").addEventListener("click", () => {

    chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs) => {

            chrome.tabs.sendMessage(
                tabs[0].id,
                { action: "scrape" },
                (response) => {

                    if (!response) {
                        alert("Unable to scrape this page.");
                        return;
                    }

                    scrapedData = response;

                    document.getElementById("title").textContent =
                        response.title;

                    document.getElementById("headingCount").textContent =
                        response.headings.length;

                    document.getElementById("linkCount").textContent =
                        response.links.length;

                    const headingsList =
                        document.getElementById("headings");

                    headingsList.innerHTML = "";

                    response.headings.forEach(h => {
                        const li = document.createElement("li");
                        li.textContent = h;
                        headingsList.appendChild(li);
                    });

                    const linksList =
                        document.getElementById("links");

                    linksList.innerHTML = "";

                    response.links.slice(0, 30).forEach(link => {
                        const li = document.createElement("li");
                        li.textContent = link;
                        linksList.appendChild(li);
                    });
                }
            );
        }
    );
});

document.getElementById("jsonBtn").addEventListener("click", () => {
  const content = JSON.stringify(scrapedData, null, 2);
  exportData("scraped_data.json", "application/json", content);
});

document.getElementById("csvBtn").addEventListener("click", () => {
  let csv = "Type,Value\n";
  csv += `Title,"${scrapedData.title}"\n`;
  scrapedData.headings.forEach(h => { csv += `Heading,"${h}"\n`; });
  scrapedData.links.forEach(link => { csv += `Link,"${link}"\n`; });
  exportData("scraped_data.csv", "text/csv", csv);
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const text = formatData();
  navigator.clipboard.writeText(text);
  alert("Copied Successfully!");
});

document.getElementById("txtBtn").addEventListener("click", () => {
  const text = formatData();
  exportData("scraped-data.txt", "text/plain", text);
});

document.getElementById("clearBtn").addEventListener("click", () => {
 scrapedData={};
 document.getElementById("title").textContent="";
 document.getElementById("headings").innerHTML="";
 document.getElementById("links").innerHTML="";
 document.getElementById("headingCount").textContent="0";
 document.getElementById("linkCount").textContent="0";
});

document.getElementById("refreshBtn").addEventListener("click", () => {
 document.getElementById("scrapeBtn").click();
});
// Dark mode toggle (use data-theme attribute)
document.getElementById('darkToggle').addEventListener('click', () => {
  const html = document.documentElement;
  if (html.dataset.theme === 'dark') {
    delete html.dataset.theme;
  } else {
    html.dataset.theme = 'dark';
  }
});


document.addEventListener('DOMContentLoaded', function () {
    const shuffleBtn = document.getElementById('shuffle-btn');

    shuffleBtn.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: shuffleImages
            });
        });
    });
});

function shuffleImages() {
    console.info("shuffle images executed");
    
    // Remove all source elements from the DOM
    const sources = document.querySelectorAll('source');
    sources.forEach(source => source.remove());

    // Select all img elements and extract their src attributes
    const images = Array.from(document.querySelectorAll('img'));
    const imageSrcs = images.map(img => img.src);

    // Fisher-Yates shuffle algorithm
    for (let i = imageSrcs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageSrcs[i], imageSrcs[j]] = [imageSrcs[j], imageSrcs[i]];
    }

    // Reassign the shuffled src attributes back to the img elements
    images.forEach((img, index) => {
        img.src = imageSrcs[index];
    });
}
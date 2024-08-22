// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getVideoUrl") {
    const videoUrl = window.location.href; // Get the current URL of the page
    sendResponse({ videoUrl }); // Send the URL back to the popup script
  }
});

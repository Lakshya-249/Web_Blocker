chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    chrome.storage.sync.get(["blocklist", "enable"], function (result) {
      if (!result.enable) {
        return;
      }
      const blocklist = result.blocklist || [];
      const url = new URL(details.url);
      if (blocklist.includes(url.hostname)) {
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL("blocked.html"),
        });
      }
    });
  },
  { url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }] }
);

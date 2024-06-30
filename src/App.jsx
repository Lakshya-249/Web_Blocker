import React, { useState, useEffect } from "react";
import "./App.css";
import ToggleSwitch from "./switch";

function App() {
  const [blocklist, setBlocklist] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Load blocklist from Chrome storage on component mount
    chrome.storage.sync.get(["blocklist"], function (result) {
      setBlocklist(result.blocklist || []);
    });
  }, []);

  const addToBlocklist = () => {
    if (input && !blocklist.includes(input)) {
      const newBlocklist = [...blocklist, input];
      setBlocklist(newBlocklist);
      setInput("");
      // Save updated blocklist to Chrome storage
      chrome.storage.sync.set({ blocklist: newBlocklist });
    }
  };

  const addToBlocklistCurrentPage = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentUrl = tabs[0].url;
      const hostname = new URL(currentUrl).hostname;
      if (hostname && !blocklist.includes(hostname)) {
        const newBlocklist = [...blocklist, hostname];
        setBlocklist(newBlocklist);
        // Save updated blocklist to Chrome storage
        chrome.storage.sync.set({ blocklist: newBlocklist });
      }
    });
    alert("This site is blocked now...");
  };

  const removefromBlockedList = (hostname) => {
    chrome.storage.sync.get(["blocklist"], (data) => {
      const blockdata = data.blocklist || [];
      if (blockdata.length > 0) {
        const updatedBlocklist = blockdata.filter((b) => b !== hostname);
        chrome.storage.sync.set({ blocklist: updatedBlocklist });
        setBlocklist(updatedBlocklist);
      }
    });
  };

  return (
    <div className="App">
      <ToggleSwitch />
      <h1>Web Blocker</h1>
      <div className="Cont Margin">
        <input
          className="INP"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a website to block"
        />
        <button onClick={addToBlocklist}>Add</button>
      </div>
      <button className="FullWidth Margin" onClick={addToBlocklistCurrentPage}>
        Block Current Page
      </button>
      {blocklist.map((site, index) => (
        <div className="Cont" key={index}>
          <p>{site}</p>
          <button
            onClick={() => removefromBlockedList(site)}
            className="Text-red"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;

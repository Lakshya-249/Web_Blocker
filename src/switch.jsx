import React, { useEffect, useState } from "react";
import "./switch.css";

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    chrome.storage.sync.set({ enable: !isOn });
  };

  useEffect(() => {
    chrome.storage.sync.get(["enable"], (result) => {
      setIsOn(result.enable);
    });
  }, []);

  return (
    <div className="toggle-switch" onClick={toggleSwitch}>
      <div className={`switch ${isOn ? "on" : "off"}`}>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;

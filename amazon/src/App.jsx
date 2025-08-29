
import { useState } from "react";
import "./App.css";

function extractASIN(url) {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i);
  return match ? match[1] : "";
}

export default function App() {
  const [input, setInput] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");

  const handleGenerate = () => {
    const asin = extractASIN(input);
    if (asin) {
      setAffiliateLink(`https://www.amazon.in/dp/${asin}?tag=getcartamzn-21`);
    } else {
      setAffiliateLink("");
      alert("Invalid Amazon link or ASIN not found.");
    }
  };

  const handleCopy = () => {
    if (affiliateLink) {
      navigator.clipboard.writeText(affiliateLink);
    }
  };

  const handleOpen = () => {
    if (affiliateLink) {
      window.open(affiliateLink, "_blank");
    }
  };

  const handleReset = () => {
    setInput("");
    setAffiliateLink("");
  };

  return (
    <div className="affiliate-app-bg">
      <div className="affiliate-app-container">
        <h1 className="affiliate-title">Amazon Affiliate Link Generator</h1>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Paste full Amazon product link here..."
          className="affiliate-input"
        />
        <button
          onClick={handleGenerate}
          className="affiliate-btn generate-btn"
        >
          Generate
        </button>
        {affiliateLink && (
          <div className="affiliate-output-box">
            <span className="affiliate-link">{affiliateLink}</span>
            <div className="affiliate-btn-group">
              <button
                onClick={handleCopy}
                className="affiliate-btn copy-btn"
              >
                Copy Link
              </button>
              <button
                onClick={handleOpen}
                className="affiliate-btn open-btn"
              >
                Open Link
              </button>
              <button
                onClick={handleReset}
                className="affiliate-btn reset-btn"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

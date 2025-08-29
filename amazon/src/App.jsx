
import { useState } from "react";
import "./App.css";
import { db } from "./firebase";
import { collection, setDoc, Timestamp, getDocs, doc } from "firebase/firestore";

function extractASIN(url) {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i);
  return match ? match[1] : "";
}

export default function App() {
  const [input, setInput] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");

  const handleGenerate = async () => {
    const asin = extractASIN(input);
    if (asin) {
      const link = `https://www.amazon.in/dp/${asin}?tag=getcartamzn-21`;
      setAffiliateLink(link);
      try {
        // Get all docs to determine next serial number
        const linksCol = collection(db, "Links");
        const snapshot = await getDocs(linksCol);
        const nextId = (snapshot.size + 1).toString();
        await setDoc(doc(db, "Links", nextId), {
          serial: nextId,
          originalUrl: input,
          asin,
          affiliateLink: link,
          created: Timestamp.now()
        });
      } catch (err) {
        console.error("Error saving to Firestore:", err);
      }
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

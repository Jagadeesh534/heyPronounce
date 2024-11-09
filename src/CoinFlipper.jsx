import { useState } from "react";
import React from "react";
import headsImage from "./assets/heads.png";
import tailsImage from "./assets/tails.png";
function CoinFlipper() {
  const [result, setResult] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipImage, setFlipImage] = useState("heads");
  const flipCoin = () => {
    setResult("");
    setIsFlipping(true);
    let count = 0;
    const interval = setInterval(() => {
      if (count < 4) {
        setFlipImage(count % 2 === 0 ? "heads" : "tails");
        count++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "Heads" : "Tails";
      setResult(outcome);
      setIsFlipping(false);
    }, 4000);
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Toss It</h1>
      <button
        onClick={flipCoin}
        style={{ padding: "10px 20px", fontSize: "16px" }}
        disabled={isFlipping}
        className="btn btn-info"
      >
        {isFlipping ? "Tossing..." : "Toss"}
      </button>
      <div
        className={`coin-container ${isFlipping ? "spinning" : ""}`}
        style={{ marginTop: "20px" }}
      >
        {(result === "" && flipImage === 'heads') && (<img
            src={headsImage}
            alt="Coin"
            style={{ width: "150px" }}
          />)
        }
         {(result === "" && flipImage === 'tails') && (<img
            src={tailsImage}
            alt="Coin"
            style={{ width: "150px" }}
          />)
        }
        {result && result === "Heads" && (
          <img src={headsImage} alt={result} style={{ width: "150px" }} />
        )}
        {result && result === "Tails" && (
          <img src={tailsImage} alt={result} style={{ width: "150px" }} />
        )}
      </div>
    </div>
  );
}

export default CoinFlipper;

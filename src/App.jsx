import { useState } from "react";
import "./index.css";
import noGif from "./assets/no.gif";
import mainGif from "./assets/main.gif";
import yes1 from "./assets/yes1.gif";
import yes2 from "./assets/yes2.gif";
import yes3 from "./assets/yes3.gif";
import yes4 from "./assets/yes4.gif";

import anji1 from "./assets/Anji/0547dc9e-9fdf-4291-9e69-7f5c778c7502.JPG";
import anji2 from "./assets/Anji/39c42485-619a-4197-ac00-f853ac324086.JPG";
import anji3 from "./assets/Anji/666325a8-13d7-4a24-ac28-458bb48a8758.JPG";
import anji4 from "./assets/Anji/b2238e33-20e5-403c-98d1-4ecbfb3f622c.JPG";
import anji5 from "./assets/Anji/d5fa7e1e-2944-47bb-bed7-615f81024bd8.JPG";
import anji6 from "./assets/Anji/dde95595-de0a-4aea-a93f-d57933869af2.JPG";

const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Pookie please",
    "Don't do this to me",
    "I'm gonna cry...",
    "You're breaking my heart ;(",
];

const yesGifs = [yes1, yes2, yes3, yes4];
const anjiPhotos = [anji1, anji2, anji3, anji4, anji5, anji6];

export default function App() {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const [noPressed, setNoPressed] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState(null);

    // State for random assets, initialized with a random value
    const [randomYesGif, setRandomYesGif] = useState(() => yesGifs[Math.floor(Math.random() * yesGifs.length)]);
    const [randomAnjiPhoto, setRandomAnjiPhoto] = useState(() => anjiPhotos[Math.floor(Math.random() * anjiPhotos.length)]);

    const yesButtonSize = noCount * 20 + 16;

    function handleNoClick() {
        if (noCount >= 5) {
            setNoPressed(true);
        } else {
            setNoCount(noCount + 1);
        }
    }

    function handleNoHover() {
        if (noCount >= 5) return; // Stop moving after 5 misses

        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 50);
        setNoButtonPosition({ x, y });
        setNoCount(noCount + 1);
    }

    function getNoButtonText() {
        return phrases[Math.min(noCount, phrases.length - 1)];
    }

    function handleReset() {
        setYesPressed(false);
        setNoPressed(false);
        setNoCount(0);
        setNoButtonPosition(null);
        // Re-randomize assets
        setRandomYesGif(yesGifs[Math.floor(Math.random() * yesGifs.length)]);
        setRandomAnjiPhoto(anjiPhotos[Math.floor(Math.random() * anjiPhotos.length)]);
    }

    return (
        <div className="container relative">
            {(yesPressed || noPressed) && (
                <button
                    onClick={handleReset}
                    style={{ position: 'absolute', top: 10, left: 10, padding: '10px', fontSize: '14px' }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Start Over
                </button>
            )}
            {yesPressed ? (
                <>
                    <div className="flex-row items-center justify-center gap-4">
                        <img src={randomYesGif} alt="yes-gif" className="h-[200px] object-cover" />
                        <img src={randomAnjiPhoto} alt="anji-photo" className="h-[200px] object-cover" />
                    </div>
                    <div className="text-4xl font-bold my-4">Ok Yay!!!</div>
                </>
            ) : noPressed ? (
                <>
                    <img src={noGif} alt="no-gif" className="h-[200px]" />
                    <div className="text-4xl font-bold my-4">Ok bye... :(</div>
                </>
            ) : (
                <>
                    <img
                        className="h-[200px]"
                        src={mainGif}
                        alt="bear with roses"
                    />
                    <h1 className="text-4xl my-4">Will you be my Valentine?</h1>
                    <div className="flex-row">
                        <button
                            className="yes-button"
                            style={{ fontSize: yesButtonSize }}
                            onClick={() => setYesPressed(true)}
                        >
                            Yes
                        </button>
                        <button
                            onClick={handleNoClick}
                            onMouseEnter={handleNoHover}
                            className="no-button"
                            style={noButtonPosition ? { position: 'absolute', top: noButtonPosition.y, left: noButtonPosition.x } : {}}
                        >
                            {noCount === 0 ? "No" : getNoButtonText()}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import DropdownSelect from "react-dropdown-select";
import {voices,voiceCodes} from '../src/util';
import { GiSoundWaves } from "react-icons/gi";
import ClipLoader from 'react-spinners/ClipLoader';
const Pronounce = () => {
  const [word, setWord] = useState("");
  const API_KEY = "AIzaSyBrAbbBAIJeZGAK-g5u7mLFRUJYV0SQcbo";
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState();
  const [accentName, seetAccentName] = useState();
  
  const handleChange = (values) => {
    setSelectedAccent(values[0]?.value);
  };
  const convertTextToSpeech = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
        {
          input: { text: word },
          voice: { languageCode: selectedAccent, name: voiceCodes.find((x)=>x.languageCodes[0] == selectedAccent).name},
          audioConfig: { audioEncoding: "MP3" },
        }
      );
      const audioContent = response.data.audioContent;
      setAudioUrl();
      const audioInstance = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audioInstance.onplay=()=>{
        setIsPlaying(true)
      }
      audioInstance.onended=()=>{
        setIsPlaying(false)
      }
      audioInstance.play();
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mt-5">
      {isLoading && (
        <ClipLoader color={"#36D7B7"} loading={isLoading} size={150} />
      )}
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Stylish Input Field */}
          <div className="form-group position-relative">
            <input
              type="text"
              className="form-control form-control-lg  shadow-sm"
              placeholder="Enter a word or name"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />
          </div>

          {/* Button with Sound Icon */}
          <div className="d-flex">
            <div className="form-group mt-4" style={{ width: '80%' }}>
              <DropdownSelect
                options={voices}
                values={selectedAccent}
                className="form-control form-control-lg  shadow-sm"
                onChange={handleChange}
                placeholder="Select accent..."
                search
                backspaceDelete
              />
            </div>
            <div className="form-group  m-4">
            <button
              className={`${isLoading || word === ''? 'disabled btn btn btn-outline-warning form-control button-warn btn-md rounded-pill shadow ' : 'btn btn btn-outline-warning form-control button-warn btn-md rounded-pill shadow '}`}
              onClick={convertTextToSpeech}
            >
              <GiSoundWaves size="30" color="gold" className={`${isPlaying ? 'animted-icon': ''}`}/>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pronounce;

/* eslint-disable no-lone-blocks */
import React from "react";
import "../App.css";
import MicNoneIcon from "@mui/icons-material/MicNone";
import VideocamIcon from "@mui/icons-material/Videocam";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
const MainPage = () => {
  const [tracks, setTracks] = useState();

  const videoRef = useRef();

  const isAudioOn = () => {
    let result = false;

    if (tracks) {
      tracks.getAudioTracks().forEach((track) => {
        if (track.readyState === "live" && track.enabled) {
          result = true;
        }
      });
    }

    return result;
  };

  const isVideoOn = () => {
    let result = false;

    if (tracks) {
      tracks.getVideoTracks().forEach((track) => {
        if (track.readyState === "live" && track.enabled) {
          result = true;
        }
      });
    }

    return result;
  };

  const handleAudioButtonClick = () => {
    if (isAudioOn()) {
      tracks.getAudioTracks().forEach((track) => {
        track.stop();
      });
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: isVideoOn() })
        .then((stream) => {
          tracks?.getTracks().forEach((track) => track.stop());

          setTracks(stream);
          videoRef.current.srcObject = stream;
        });
    }
  };

  const handleVideoButtonClick = () => {
    if (isVideoOn()) {
      tracks.getVideoTracks().forEach((track) => {
        track.stop();
      });
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: isAudioOn(), video: true })
        .then((stream) => {
          tracks?.getTracks().forEach((track) => track.stop());

          setTracks(stream);
          videoRef.current.srcObject = stream;
        });
    }
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <video ref={videoRef} autoPlay playsInline></video>
          <div className="button">
            <button
              className="button1"
              onClick={() => handleAudioButtonClick()}
            >
              <MicNoneIcon />
            </button>
            <button
              className="button1"
              onClick={() => handleVideoButtonClick()}
            >
              <VideocamIcon />
            </button>
          </div>
          <Link to="/newpage">
            {" "}
            <button className="buttonJoin">Join</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MainPage;

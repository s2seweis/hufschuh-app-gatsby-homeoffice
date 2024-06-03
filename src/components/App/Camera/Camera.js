import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import {
  CameraContainer,
  CameraMenu,
  CameraWrapper,
  HelpButton,
} from "./styled";
import routes from "../../../constants/routes";
import { parsePos } from "../PhotoGuide/parse";
import ImageWithSkeleton from "../Misc/ImageWithSkeleton";
import SpiritLevel from "./SpiritLevel2";
import { HelpModal } from "./HelpModal";
import { getHelpPageNumber } from "./getHelpParams";
import { CameraStyle } from "../../Layout/GlobalStyle";
import { RotatePhone } from "../../../assets/icons/rotatePhone";
import { Button } from "../Misc/Button";
import * as Sentry from "@sentry/gatsby";
import { isImage } from "./functions";
import { PermissionModal } from "../SpiritLevel/PermissionModal";

export default function CameraComponent({ horse, target, pos, addImage, cms }) {
  // only pictures of the foot from the side are taken in portrait mode
  const landscapeMode = pos !== "torso";
  // eslint-disable-next-line
  const [orientation, setOrientation] = useState();
  // Todo check this ternary, had to add to build
  const [ios] = useState(
    new RegExp("iPhone|iPad|iPod").test(
      typeof window !== "undefined" ? navigator.userAgent : ""
    )
  );
  const [orientPermissionGranted, setOrientPermissionGranted] = useState(true);

  // stream / camera internals
  // eslint-disable-next-line no-unused-vars
  const [mediaRecorder, setMediaRecorder] = useState({});
  const [stream, setStream] = useState();
  const recorderRef = useRef();
  const canvasRef = useRef();

  console.log("POS", pos);

  // com

  // pictures taken
  const [pictures, setPictures] = useState([]);

  // spirit level
  const [horizonzal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);

  // thumbnail to display
  const thumbnail = !target
    ? null
    : target?.startsWith("leg")
    ? cms.Thumbnails[parsePos(pos)].localFile.childImageSharp.gatsbyImageData
    : cms.Thumbnails["Koerper"].localFile.childImageSharp.gatsbyImageData;

  // help modal toggle
  const [showHelpModal, setShowHelpModal] = useState(true);

  // error messages
  const [message, setMessage] = useState("");
  // 0: includes a back button
  // 1: includes an ok button
  const [messageType] = useState(0);

  // initialize
  // sets up event listeners for orientation
  useEffect(() => {
    // only on iOS, we need to ask for permission to access the deviceOrientationEvent

    if (!ios || (ios && orientPermissionGranted)) {
      Screen.orientation?.addEventListener("change", () => {
        setOrientation(Screen.orientation.type);
      });
      setOrientation(Screen.orientation?.type);
    }
  }, [orientPermissionGranted]);

  /**
   * Initialize the MediaRecorder on component mount
   */
  useEffect(() => {
    initializeMediaRecorder()
      .then((r) => {
        setMediaRecorder(r.mediaRecorder);
        setStream(r.stream);
      })
      .catch((e) => {
        // TODO source from strapi
        setMessage(
          "Du hast den Zugriff auf deine Kamera (temporär) verweigert. Bitte erlaube uns die Nutzung" +
            " der Kamera, damit du Bilder von deinem Pferd aufnehmen kannst."
        );
        console.error(e);
      });
  }, []);

  useEffect(() => {
    // unmount
    return () => {
      try {
        stream.getTracks()[0].stop();
        // const tracks = stream.getTracks();
        // tracks.forEach((track) => track.stop());

        // stream.getTracks()[0].stop();
      } catch (err) {
        console.log(err);
      }
    };
  }, [stream]);

  /**
   * Upon MedaRecorder being set, monitor the following events
   */
  // useEffect(() => {
  //   mediaRecorder.onerror = (e) => {};
  // }, [mediaRecorder]);

  /**
   * Helper function to console out change in state of the MediaRecorder
   */
  // useEffect(() => {
  //   console.log(`MediaRecorder state: ${mediaRecorder.state}`);
  // }, [mediaRecorder.state]);

  /*
  count pictures
  stop camera after 3 pictures are taken and take auth back
   */
  useEffect(() => {
    if (pictures.length >= 3) {
      try {
        stream.getTracks()[0].stop();
      } catch (err) {
        // console.log("could not dismount camera", err);
        // happens for ex. if permission is not given
      }
      navigate(routes.photoGuide({ id: horse.id, pos, target }));
    }
  }, [pictures]);

  /**
   * Get a media device stream (webcam)
   */
  const getStream = () => {
    return new Promise(async (resolve, reject) => {
      try {
        // cancel if there is no rear camera?
        // can't take those pictures with a notebook webcam..
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
          },
        });
        // console.log("Stream fetched");
        resolve(stream);
      } catch (err) {
        // console.log("Error in fetching stream");
        // auth probably denied
        reject(err);
      }
    });
  };

  /**
   * Set the live stream retrieved from the media device
   * to the designated player to preview
   * @param {object} stream
   */
  const setRecordingStreamPreview = (stream) => {
    if (!recorderRef.current) return;
    recorderRef.current.srcObject = stream;
  };

  /**
   * Create MediaRecorder object from a given stream
   * @param {object} stream
   */
  const createMediaRecorder = (stream) => {
    return new Promise((resolve, reject) => {
      try {
        const mediaRecorder = new MediaRecorder(stream);
        console.log("New MediaRecorder created");
        resolve(mediaRecorder);
      } catch (err) {
        console.log("Error in creating new MediaRecorder");
        reject(err);
      }
    });
  };

  /**
   * Initialize MediaRecorder
   */
  const initializeMediaRecorder = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await getStream().catch((err) => console.error(err));
        setRecordingStreamPreview(stream);
        const mediaRecorder = await createMediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        resolve({ mediaRecorder: mediaRecorder, stream: stream });
      } catch (err) {
        Sentry.captureException(err);
        console.log(
          "Error in initializing MediaRecorder of fetching media devices stream"
        );
        reject(err);
      }
    });
  };

  // save a picture from the canvas
  function takePicture() {
    // if (Math.abs(vertical) > 0.15 || Math.abs(horizonzal) > 0.15) {
    //   setMessageType(1);
    //   setMessage(
    //     "Abweichung: " + horizonzal.toString() + ", " + vertical.toString()
    //   );
    //   return;
    // }

    console.log(vertical, horizonzal);
    try {
      const canvas = canvasRef.current;
      const video = recorderRef.current;
      const { width, height } = videoDimensions(video);
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      context.drawImage(video, 0, 0, width, height);

      const newImage = canvas.toDataURL("image/png");

      if (!isImage(newImage)) {
        // invalid image
        // (camera not working or not full loaded)
        // this happend, when permission was denied but auth still clicked the trigger
        // should now be stopped by the modal which is shown when permission is denied
        Sentry.captureMessage("image is not valid");
        return;
      }

      // add image to redux
      // addImage(horse.id, target, pos, newImage);
      console.log(newImage);
      console.log(pictures);

      addImage(newImage);

      // add image to array for previews
      setPictures((p) => p.concat(newImage));
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  function videoDimensions(video) {
    // Ratio of the video's intrisic dimensions
    var videoRatio = video.videoWidth / video.videoHeight;
    // The width and height of the video element
    var width = video.offsetWidth,
      height = video.offsetHeight;
    // The ratio of the element's width to its height
    var elementRatio = width / height;
    // If the video element is short and wide
    if (elementRatio > videoRatio) width = height * videoRatio;
    // It must be tall and thin, or exactly equal to the original ratio
    else height = width / videoRatio;
    return {
      width: width,
      height: height,
    };
  }

  // useEffect(() => {
  //   console.log(DeviceOrientationEvent);
  // }, [DeviceOrientationEvent]);

  return (
    <CameraContainer
      landscape={landscapeMode}
      orientSupport={!!window.Screen.orientation}
    >
      <CameraStyle />

      <div
        className={"message-block"}
        style={{ display: message ? "flex" : "none" }}
      >
        <div className={"message"}>
          {message}{" "}
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className={"primary"}
            style={{
              display: messageType === 0 ? "flex" : "none",
            }}
          >
            Zurück
          </Button>
          <Button
            onClick={() => {
              setMessage("");
            }}
            className={"primary"}
            style={{
              display: messageType === 1 ? "flex" : "none",
            }}
          >
            Okay
          </Button>
        </div>
      </div>

      <div className={"orientation-block"}>
        <RotatePhone />
        <p className={"title"}>Bitte drehe dein Smartphone.</p>
        <p className={"hint"}>
          Falls das automatische Drehen auf deinem Smartphone deaktiviert ist,
          kannst du es in den Einstellungen unter "Bedienungshilfen" aktivieren.
          Oder in den{" "}
          <a href={"https://support.google.com/android/answer/9083864?hl=de"}>
            Schnelleinstellungen
          </a>
          .
        </p>
      </div>

      <HelpButton
        onClick={() => {
          setShowHelpModal(true);
        }}
      >
        ?
      </HelpButton>
      <HelpModal
        cms={cms}
        pages={getHelpPageNumber(pos)}
        show={showHelpModal}
        close={() => {
          setShowHelpModal(false);
        }}
        pos={pos}
        target={target}
      />

      <CameraWrapper landscape={landscapeMode}>
        <video
          className="recorder"
          ref={recorderRef}
          autoPlay
          playsInline
          muted
        />
        {ios && !orientPermissionGranted ? (
          // &&  typeof DeviceOrientationEvent.requestPermission === "function"
          <PermissionModal
            setPermissionGranted={setOrientPermissionGranted}
            setMessage={setMessage}
          />
        ) : (
          <SpiritLevel
            landscapeMode={landscapeMode}
            setHorizontal={setHorizontal}
            setVertical={setVertical}
          />
        )}
      </CameraWrapper>

      <CameraMenu landscape={landscapeMode}>
        <ImageWithSkeleton image={thumbnail} className={"thumbnail"} />
        <button onClick={takePicture} className={"takePictureButton"} />

        <div className={"picture-preview"}>
          <span className={"picture-count"}>{pictures.length}</span>
          <div className={"picture-container"}>
            {pictures.map((pic, index) => {
              if (index !== pictures.length - 1) return;
              return (
                <img
                  src={pic}
                  alt={"Previews of the taken pictures"}
                  key={"picture-preview" + index}
                />
              );
            })}
          </div>
        </div>
      </CameraMenu>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </CameraContainer>
  );
}

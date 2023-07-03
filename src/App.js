import './App.css';
import { useEffect, useRef } from 'react';
import { createHandLandmarker } from './handlandmarker';
import { DrawingUtils ,HandLandmarker} from '@mediapipe/tasks-vision'; 
/*import React, { useEffect, useRef } from 'react';
import { createHandLandmarker } from '@mediapipe/hands';*/
//import { DrawingUtils, HandLandmark } from '@mediapipe/drawing_utils';

// function App() {
//   const canvasRef = useRef(null);
//   const videoRef = useRef(null);
//   const contextRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     if (canvas && video) {
//       const context = canvas.getContext('2d');
//       contextRef.current = context;
//     }

//     if (contextRef.current && canvas && video) {
//       const drawingUtils = new DrawingUtils(contextRef.current);
//       let handLandmarker = null;

//       const loadHandLandmarker = async () => {
//         handLandmarker = await createHandLandmarker();
//         handLandmarker.setOptions({
//           maxNumHands: 1,
//           minDetectionConfidence: 0.5,
//           minTrackingConfidence: 0.5,
//         });
//         handLandmarker.onResults(onHandLandmarkResults);
//       };

//       const onHandLandmarkResults = (results) => {
//         contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
//         if (results.multiHandLandmarks) {
//           for (const landmarks of results.multiHandLandmarks) {
//             drawingUtils.drawConnectors(landmarks, HandLandmarker.CONNECTIONS, {
//               color: '#FF0000',
//               lineWidth: 5,
//             });
//             drawingUtils.drawLandmarks(landmarks, { color: '#00FF00', lineWidth: 2 });

//             // Add your logic to detect letters based on the hand landmarks
//             // Example: Check the position of specific landmarks to recognize a letter
//             const thumbTip = landmarks[4];
//             const indexFingerTip = landmarks[8];
//             const middleFingerTip = landmarks[12];
//             // ...

//             // Perform letter detection based on the positions of landmarks
//             // Example: If thumbTip is above indexFingerTip and middleFingerTip, recognize letter 'A'
//             if (
//               thumbTip.y < indexFingerTip.y &&
//               thumbTip.y < middleFingerTip.y
//             ) {
//               console.log('Letter A detected');
//             }
//             // ...
//           }
//         }
//       };

//       navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//         video.srcObject = stream;
//         video.addEventListener('loadedmetadata', () => {
//           video.play();
//           loadHandLandmarker();
//         });
//       });
//     }
//   }, []);

//   return (
//     <div>
//       <video
//         ref={videoRef}
//         style={{ display: 'none' }}
//         playsInline
//         muted
//       ></video>
//       <canvas
//         ref={canvasRef}
//         style={{ position: 'absolute', top: 0, left: 0 }}
//       ></canvas>
//     </div>
//   );
// }

// export default App;


function App() {
  const canvasRef = useRef(null);
  const inputVideoRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {

  })

  useEffect(() => {
    const canvas = canvasRef.current;
    const videoRef = inputVideoRef.current;

    if (canvas) {
      contextRef.current = canvas.getContext('2d');
    }
    if (contextRef.current && canvas && videoRef) {
      createHandLandmarker().then((handLandmarker) => {
        const drawingUtils = new DrawingUtils(contextRef.current);
        let lastVideoTime = -1;
        let results = undefined;
        function predict() {
          console.log("aditi");
          canvas.style.width = videoRef.videoWidth;
          canvas.style.height = videoRef.videoHeight;
          canvas.width = videoRef.videoWidth;
          canvas.height = videoRef.videoHeight;
          let startTimeMs=performance.now();
          if(lastVideoTime!==videoRef.currentTime){
            lastVideoTime=videoRef.currentTime;
            results=handLandmarker.detectForVideo(videoRef,startTimeMs);
            console.log(results);
          }
          contextRef.current.save();
          contextRef.current.clearRect(0,0,canvas.width,canvas.height);
          if(results.landmarks){
            for(const landmarks of results.landmarks){
              drawingUtils.drawConnectors(landmarks,HandLandmarker.HAND_CONNECTIONS,{color:'red',lineWidth:5});
              drawingUtils.drawLandmarks(landmarks,{color:'blue',lineWidth:2});
            }
          }


          window.requestAnimationFrame(predict);
        }
        
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          videoRef.srcObject = stream;
          videoRef.addEventListener('loadeddata', predict)
        })
      })
    }
  }, [])

  //   useEffect(()=>{
  //     navigator.mediaDevices.getUserMedia(constraints).then((stream)=>{
  //       videoRef.srcObject = stream;
  //       videoRef.addEventListener('loadeddata',()=>{
  //   })
  // },[])
  return (
    <div>
      <video id="webcam"
        style={{ position: "absolute" }}
        autoPlay
        playsInline
        ref={inputVideoRef}
      ></video>
      <canvas
        ref={canvasRef}
        id="output_canvas"
        style={{
          position: "absolute",
          left: "0px",
          top: "0px"
        }}
      ></canvas>
    </div>
  );
}

export default App;






















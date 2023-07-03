// import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";
// export const createHandLandmarker = async () => {
//   const vision = await FilesetResolver.forVisionTasks(
//     // path/to/wasm/root
//     "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//   );
//   const handLandmarker = await handLandmarker.createFromOptions(vision, {
//     baseOptions: {
//       modelAssetPath: "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
//       delegate:"GPU",
//     },
//     RunningMode:"Video",
//     numHands: 2,
//   });
//   return handLandmarker;
// };




import { FilesetResolver,HandLandmarker} from "@mediapipe/tasks-vision";
export const createHandLandmarker = async () => {
const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );
  const handLandmarker = await HandLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numHands: 2,
      });
      return handLandmarker;
    };
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../Data/data.json'; // Adjust the path to your JSON file
const LottieAnimation = () => {
  const defaultOptions = {
    loop: true, // Set to true if you want the animation to loop
    autoplay: true, // Set to true to start playing the animation immediately
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust as needed
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
export default LottieAnimation;
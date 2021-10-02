window.onload = () => {
  const video = document.getElementById('video');

  window.onscroll = () => {
    video.currentTime = 0;
  };
};

window.onload = () => {
  const video = document.getElementById('video');
  let timer;

  video.onmouseenter = () => {
    clearTimeout(timer);
    video.play();
  };

  video.onmouseleave = () => {
    video.pause();
    timer = window.setTimeout(() => video.currentTime = 0, 5000);
  };
};

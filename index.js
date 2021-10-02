window.onload = () => {
  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animating');
      } else {
        entry.target.classList.remove('animating');
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect);

  document.querySelectorAll('.image-grid > *').forEach((element) => {
    observer.observe(element);
  });
};

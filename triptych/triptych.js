window.onload = () => {
  let raindropCount = 12

  document.querySelectorAll('.rain').forEach(frame => {
    for (let i = 0; i < raindropCount; i++) {
      const raindrop = document.createElement('div')
      const height = Math.random() * 8 + 8
      const left = Math.random() * 450 - 50
      const width = Math.random() * (450 - left)
      const delay = Math.random() * 500
      const alpha = Math.random() * 0.4 + 0.1

      raindrop.classList = 'raindrop'
      raindrop.style.height = `${height}px`
      raindrop.style.left = `${left}px`
      raindrop.style.width = `${width}px`
      raindrop.style.animationDelay = `${delay}ms`
      raindrop.style.borderColor = `rgba(255, 255, 255, ${alpha})`
      frame.appendChild(raindrop)
    }

    raindropCount *= 3
  })
}

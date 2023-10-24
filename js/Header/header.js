window.addEventListener('keydown', (e) => {
  const slash = document.querySelector(`input[data-key = ${e.code}]`)
  if (!slash) return;

  slash.focus();
  slash.addEventListener('transitionstart', () => {
    slash.value = ''
  })
})

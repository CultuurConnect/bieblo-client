const nextAnimation = ({title, nextButton, keyboard, usernameContainer, username, afterNextAnimationCallback}) => {
  const events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  events.split(' ').forEach(
    event => usernameContainer.addEventListener(event, () => {
      afterNextAnimationCallback()
    })
  )
  if (username) {
    usernameContainer.className = 'animated tada'
  } else {
    usernameContainer.className = 'animated zoomOutDown'
  }
  title.className = 'written align-center animated zoomOutDown'
  nextButton.className = 'action-button blue icon animated bounceOutDown'
  keyboard.className = 'animated zoomOutDown'
}

export {
  nextAnimation,
}

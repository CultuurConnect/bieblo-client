const homeAnimationState = {
  running: true,
  timedOutEvent: null,
}

const animationStart = (element) => {
  if (homeAnimationState.running) {
    element.innerHTML = 'Op zoek naar een boek?'
    element.className = 'align-center animated fadeIn'
    element.setAttribute('data-step', 1)
    element.setAttribute('data-timeout', 3000)
  }
}

const animationNoIdea = (element) => {
  if (homeAnimationState.running) {
    element.innerHTML = 'Maar geen idee wat te kiezen?'
    element.className = 'align-center animated fadeIn'
    element.setAttribute('data-step', 3)
    element.setAttribute('data-timeout', 3000)
  }
}

const animationUseBieblo = (element) => {
  if (homeAnimationState.running) {
    element.innerHTML = 'Swipe met bieblo!'
    element.className = 'align-center animated slideInLeft'
    element.setAttribute('data-step', 5)
    element.setAttribute('data-timeout', 200)
  }
}

const animationWobbleBieblo = (element) => {
  if (homeAnimationState.running) {
    element.className = 'align-center animated wobble'
    element.setAttribute('data-step', 6)
    element.setAttribute('data-timeout', 1500)
  }
}

const animationAndDiscover = (element) => {
  if (homeAnimationState.running) {
    element.innerHTML = 'En ontdek nieuwe boeken!'
    element.className = 'align-center animated tada'
    element.setAttribute('data-step', 8)
    element.setAttribute('data-timeout', 1500)
  }
}

const hideAnimation = (element, nextStep, className) => {
  if (homeAnimationState.running) {
    element.className = 'align-center animated ' + (className || 'fadeOut')
    element.setAttribute('data-step', nextStep)
    element.setAttribute('data-timeout', 200)
  }
}

const getAnimationAttribute = (element, attrName, defaultValue) => {
  const attrValue = element.getAttribute(attrName)
  return attrValue ? parseInt(attrValue, 10) : defaultValue
}

const executeAnimationStep = (element) => {
  if (homeAnimationState.running) {
    const timeout = getAnimationAttribute(element, 'data-timeout', 1000)
    homeAnimationState.timedOutEvent = setTimeout(() => {
      const step = getAnimationAttribute(element, 'data-step', 1)
      switch (step) {
        case 1:
          hideAnimation(element, 2)
          break
        case 2:
          animationNoIdea(element)
          break
        case 3:
          hideAnimation(element, 4)
          break
        case 4:
          animationUseBieblo(element)
          break
        case 5:
          animationWobbleBieblo(element)
          break
        case 6:
          hideAnimation(element, 7, 'slideOutRight')
          break
        case 7:
          animationAndDiscover(element)
          break
        case 8:
          hideAnimation(element, 9)
          break
        default:
          animationStart(element)
          break
      }
    }, timeout)
  }
}

const addAnimationEventListener = (element) => {
  const events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  events.split(' ').forEach(
    event => element.addEventListener(event, () => {
      executeAnimationStep(element)
    })
  )
}

const startAnimation = ({logo, startButton, animation, owl, startAnimationEndedCallback}) => {
  homeAnimationState.running = false
  owl.className = 'owl animated bounceOut'
  clearTimeout(homeAnimationState.timedOutEvent)
  const events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  events.split(' ').forEach(
    event => logo.addEventListener(event, () => {
      startAnimationEndedCallback()
    })
  )
  logo.className = 'written align-center animated bounceOutUp'
  startButton.className += ' animated bounceOut'
  animation.className = 'align-center animated bounceOut'
}

export {
  addAnimationEventListener,
  executeAnimationStep,
  startAnimation,
}

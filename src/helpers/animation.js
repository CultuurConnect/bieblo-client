const EVENT_NAMES_ANIMATION_END = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'

const addEventAnimationEndEventListener = (element, callbackFunc) => {
  EVENT_NAMES_ANIMATION_END.split(' ').forEach(
    event => element.addEventListener(event, callbackFunc)
  )
}

const removeEventAnimationEndEventListener = (element, callbackFunc) => {
  EVENT_NAMES_ANIMATION_END.split(' ').forEach(
    event => element.removeEventListener(event, callbackFunc)
  )
}

export {
  addEventAnimationEndEventListener,
  removeEventAnimationEndEventListener,
}

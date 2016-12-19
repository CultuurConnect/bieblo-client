import {addEventAnimationEndEventListener} from '../../helpers/animation'

const exitAnimation = ({contentWrap, animationEndCallback}) => {
  addEventAnimationEndEventListener(contentWrap, animationEndCallback)
  contentWrap.className = 'animated fadeOut'
}

export {
  exitAnimation,
}

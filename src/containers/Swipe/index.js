import React from 'react'
import {connect} from 'react-redux'

import * as biebloActions from 'redux/modules/bieblo'

const panState = {
  started: false,
  offset: 0,
  container: {
    width: 0,
  },
  x: {
    center: 0,
    start: {
      min: 0,
      max: 0,
    },
  },
}

const getFirstNewIllustration = (illustrations) => {
  return [...illustrations].reverse().find(i => i.cls === 'new')
}

const changeIllustrationCls = (id, cls, illustrations) => {
  const idx = illustrations.findIndex(illustration => illustration.id === id)
  const illustration = illustrations[idx]
  illustration.cls = cls
  return [
    ...illustrations.slice(0, idx),
    illustration,
    ...illustrations.slice(idx + 1),
  ]
}

// const getDistance = (el, ev) => ev.distance > el.clientWidth ? el.clientWidth : ev.distance;

const getEl = (illustration) => illustration ? document.getElementById(`illustration-${illustration.id}`) : null

const getFirstNewIllustrationEl = (illustrations) => {
  const illustration = getFirstNewIllustration(illustrations)
  return getEl(illustration)
}

const validStartPan = (centerX) => {
  const {min, max} = panState.x.start
  return centerX >= min && centerX <= max
}

const handlePanStart = (ev) => {
  const centerX = ev.center.x
  if (validStartPan(centerX)) {
    panState.started = true
    panState.offset = panState.x.center - centerX
  }
}

const handlePanLeft = (distance, illustrations) => {
  const illustrationEl = getFirstNewIllustrationEl(illustrations)
  if (illustrationEl) {
    const {width} = panState.container
    if (distance <= (width / 2)) {
      illustrationEl.style.left = `${(width - distance)}px`
      illustrationEl.style.transform = null
    } else {
      let percentage = distance / panState.container.width
      if (percentage > 1) {
        percentage = 1
      }
      const origin = Math.round(percentage * 100)
      const skew = 20 * percentage
      const scale = 1 - (0.20 * percentage)
      const degree = 75 * percentage
      illustrationEl.style['transform-origin'] = (distance <= width) ? `${origin}% bottom` : 'bottom right'
      illustrationEl.style.transform = `scale(${scale}) rotate3d(1,0,0,${degree}deg) skewX(${skew}deg) skewY(-${skew}deg)`
      illustrationEl.style.left = (distance <= width) ? `${(width - distance)}px` : 0
    }
  }
}

const handlePanRight = (distance, illustrations) => {
  const illustrationEl = getFirstNewIllustrationEl(illustrations)
  if (illustrationEl) {
    const {width} = panState.container
    const {center} = panState.x
    if (distance <= (width / 4)) {
      illustrationEl.style.left = `${(center + distance)}px`
      illustrationEl.style.transform = null
    } else {
      let percentage = distance / panState.container.width
      if (percentage > 1) {
        percentage = 1
      }
      const origin = Math.round(percentage * 100)
      const skew = 20 * percentage
      const scale = 1 - (0.20 * percentage)
      const degree = 75 * percentage
      illustrationEl.style['transform-origin'] = (distance <= width) ? `${origin}% bottom` : 'bottom left'
      illustrationEl.style.transform = `scale(${scale}) rotate3d(1,0,0,${degree}deg) skewX(-${skew}deg) skewY(${skew}deg)`
      illustrationEl.style.left = (distance <= width) ? `${(center + (distance / 2))}px` : (width * 2)
    }
  }
}

const handlePanMove = (ev, illustrations) => {
  if (panState.started) {
    const { center } = panState.x
    const { x } = ev.center
    const xPosition = x + panState.offset
    if (xPosition < center) {
      // To The left
      const distance = center - xPosition
      handlePanLeft(distance, illustrations)
    } else {
      // To the right
      const distance = xPosition - center
      handlePanRight(distance, illustrations)
    }
  }
}

const handlePanEnd = (ev, illustrations, updateIllustrations) => {
  const illustrationObj = getFirstNewIllustration(illustrations)
  const illustrationEl = getFirstNewIllustrationEl(illustrations)
  if (illustrationEl) {
    const style = require('./style.scss')
    const { x } = ev.center
    const xPosition = x + panState.offset
    const percentage = Math.ceil((xPosition / (panState.container.width * 3)) * 100)
    if (percentage <= 25) {
      // To the left
      illustrationEl.className = style.illustration + ' ' + style.left
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'left', illustrations)
      updateIllustrations(newIllustrations)
    } else if (percentage >= 75) {
      // To the right
      illustrationEl.className = style.illustration + ' ' + style.right
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'right', illustrations)
      updateIllustrations(newIllustrations)
    } else {
      // reset
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'new', illustrations)
      updateIllustrations(newIllustrations)
    }
  }
  panState.started = false
}

const renderIllustration = (illustrationObj) => {
  const style = require('./style.scss')
  const {id, cls, img, label} = illustrationObj
  const imgStyleObj = {
    backgroundImage: `url(${img})`,
  }
  return (
    <div
      key={`illustration-${id}`}
      id={`illustration-${id}`}
      className={`${style.illustration} ${style[cls]}`}
    >
      <div className={style.img} style={imgStyleObj} />
      <div className={style.label}>{label}</div>
    </div>
  )
}

const initWindow = (wrapper) => {
  const innerW = window.innerWidth
  const centerX = innerW / 2
  const containerW = wrapper.clientWidth / 3
  panState.container = {
    ...panState.container,
    width: containerW,
  }
  panState.x = {
    ...panState.x,
    center: centerX,
    start: {
      min: centerX - (containerW / 2),
      max: centerX + (containerW / 2),
    },
  }
}

// const updateIllustrations = (illustrations) => {
//   illustrations.forEach(({id}) => {
//     const el = document.getElementById(`illustration-${id}`);
//     if (el) {
//       el.style.width = panState.container.width;
//     }
//   });
// };

const filterNotNew = item => item.cls !== 'new'

const filterNew = item => item.cls === 'new'

const filterLeft = item => item.cls === 'left'

const filterRight = item => item.cls === 'right'

const sortOrder = (itemA, itemB) => itemA.order > itemB.order ? -1 : 1

@connect(
  state => ({
    illustrations: state.bieblo.illustrations,
  }),
  {...biebloActions}
)

class Swipe extends React.Component {

  static propTypes = {
    illustrations: React.PropTypes.array,
    updateIllustrations: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {illustrations, updateIllustrations} = this.props
    const wrapper = this.refs.biebloWrapper
    initWindow(wrapper)
    const Hammer = require('hammerjs')
    const mc = new Hammer(document)
    // noinspection JSUnresolvedFunction
    mc.on('panstart',
      (ev) => handlePanStart(ev, illustrations)
    )
    // noinspection JSUnresolvedFunction
    mc.on('panmove',
      (ev) => handlePanMove(ev, illustrations)
    )
    // noinspection JSUnresolvedFunction
    mc.on('panend',
      (ev) => handlePanEnd(ev, illustrations, updateIllustrations)
    )
  }

  render() {
    const style = require('./style.scss')
    const { illustrations } = this.props

    const newItems = illustrations.filter(filterNew)
    const dislikeItems = illustrations.filter(filterLeft).sort(sortOrder)
    const likeItems = illustrations.filter(filterRight).sort(sortOrder)

    const arrowLeuk = require('./wel_leuk.png')
    const arrowNietLeuk = require('./niet_leuk.png')

    const styleLeft = {
      backgroundImage: `url(${arrowNietLeuk})`,
      height: 400,
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right top',
    }

    const styleRight = {
      backgroundImage: `url(${arrowLeuk})`,
      height: 400,
      backgroundSize: '70%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'left top',
    }

    return (
      <div ref="biebloWrapper" className={style.biebloWrapper}>
        <div className={style.background} />
        {
          illustrations && illustrations.filter(filterNotNew).sort(sortOrder).map(renderIllustration)
        }
        {
          newItems && newItems.map(renderIllustration)
        }
        <div className="row" style={{height: 400}}>
          <div className="col-md-4" style={styleLeft}>
          </div>
          <div className="col-md-4">
            &nbsp;
          </div>
          <div className="col-md-4" style={styleRight}>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="col-md-12" style={{textAlign: 'center'}}>
              <em className="fa fa-4x fa-thumbs-o-down" />
            </div>
            {
              dislikeItems && dislikeItems.map(item => <div className="col-md-3">{item.label}</div>)
            }
          </div>
          <div className="col-md-4">
            <p>Slepen...</p>
          </div>
          <div className="col-md-4">
            <div className="col-md-12" style={{textAlign: 'center'}}>
              <em className="fa fa-4x fa-thumbs-o-up" />
            </div>
            {
              likeItems && likeItems.map(item => <div className="col-md-3">{item.label}</div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Swipe

import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Hammer from 'react-hammerjs'
import {Owl, Home} from '../../components'

import * as biebloActions from 'redux/modules/bieblo'

import Theme from './Theme'
import ThemeDisliked from './ThemeDisliked'
import ThemeLiked from './ThemeLiked'

const MAX_SWIPE_LIKE = 5

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

const getNextTheme = (themes) => {
  const nextTheme = [...themes].pop()
  return nextTheme
}
//
// const changeIllustrationCls = (id, cls, illustrations) => {
//   const idx = illustrations.findIndex(illustration => illustration.id === id)
//   const illustration = illustrations[idx]
//   illustration.cls = cls
//   return [
//     ...illustrations.slice(0, idx),
//     illustration,
//     ...illustrations.slice(idx + 1),
//   ]
// }

// const getDistance = (el, ev) => ev.distance > el.clientWidth ? el.clientWidth : ev.distance;

const getTeamElement = (theme) => theme ? document.getElementById(`theme-${theme.id}`) : null

const getNextThemeElement = (themes) => {
  const theme = getNextTheme(themes)
  return getTeamElement(theme)
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
  } else {
    panState.started = false
  }
}

const handlePanLeft = (distance, themes) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
    // const SWIDTH = 1080
    const WIDTH = 496
    const HEIGHT = 644

    const FONT_SIZE_DEFAULT = 30
    const FONT_SIZE_MIN = 8

    const perc = distance < (WIDTH / 2) ? (distance / (WIDTH / 2)) * 100 : 100

    const fontSizeDiff = (FONT_SIZE_DEFAULT - FONT_SIZE_MIN) * (perc / 100)
    const fontSize = FONT_SIZE_DEFAULT - fontSizeDiff

    const MARGIN_LEFT_DEFAULT = 292
    const MARGIN_LEFT_MAX = 80

    const marginLeftDiff = (MARGIN_LEFT_DEFAULT - MARGIN_LEFT_MAX) * (perc / 100)
    const marginLeft = MARGIN_LEFT_DEFAULT - marginLeftDiff


    // const pLeft = 50 - (perc / 2)
    // const left = pLeft >= 20 ? pLeft : 20
    // const pMarginLeft = (SWIDTH / 2) - (WIDTH / 2) - ((WIDTH / 2) * (perc / 100) * 2)
    // const marginLeft = pMarginLeft >= 80 ? pMarginLeft : 80

    const top = 30 * (perc / 100)

    const width = WIDTH - ((WIDTH - WIDTH * 0.25) * (perc / 100))
    const height = HEIGHT - ((HEIGHT - HEIGHT * 0.25) * (perc / 100))

    nextTeamElement.style.top = `${top}%`
    // nextTeamElement.style.left = `${left}%`
    // nextTeamElement.style.right = `100%`
    nextTeamElement.style.width = `${width}px`
    nextTeamElement.style.height = `${height}px`
    nextTeamElement.style.marginLeft = `${marginLeft}px`
    nextTeamElement.style.fontSize = `${fontSize}px`

    // if (distance <= (250 / 2)) {
    //   nextTeamElement.style.transform = null
    // } else {
    //   let percentage = distance / panState.container.width
    //   if (percentage > 1) {
    //     percentage = 1
    //   }
    //   const origin = Math.round(percentage * 100)
    //   const skew = 20 * percentage
    //   const scale = 1 - (0.20 * percentage)
    //   const degree = 75 * percentage
    //   nextTeamElement.style['transform-origin'] = (distance <= 250) ? `${origin}% bottom` : 'bottom right'
    //   nextTeamElement.style.transform = `scale(${scale}) rotate3d(1,0,0,${degree}deg) skewX(${skew}deg) skewY(-${skew}deg)`
    // }
  }
}

const handlePanRight = (distance, themes) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
    // const SWIDTH = 1080
    const WIDTH = 496
    const HEIGHT = 644

    const FONT_SIZE_DEFAULT = 30
    const FONT_SIZE_MIN = 8

    const perc = distance < (WIDTH / 2) ? (distance / (WIDTH / 2)) * 100 : 100

    const fontSizeDiff = (FONT_SIZE_DEFAULT - FONT_SIZE_MIN) * (perc / 100)
    const fontSize = FONT_SIZE_DEFAULT - fontSizeDiff


    const MARGIN_LEFT_DEFAULT = 292
    const MARGIN_LEFT_MAX = 870

    const marginLeftDiff = (MARGIN_LEFT_DEFAULT - MARGIN_LEFT_MAX) * (perc / 100)
    const marginLeft = MARGIN_LEFT_DEFAULT - marginLeftDiff

    //
    // const pMarginLeft = ((SWIDTH / 2) - (WIDTH / 2)) + ((WIDTH) * (perc / 75))
    // const marginLeft = pMarginLeft <= 870 ? pMarginLeft : 870

    const top = 30 * (perc / 100)

    const width = WIDTH - ((WIDTH - WIDTH * 0.25) * (perc / 100))
    const height = HEIGHT - ((HEIGHT - HEIGHT * 0.25) * (perc / 100))

    nextTeamElement.style.top = `${top}%`
    nextTeamElement.style.width = `${width}px`
    nextTeamElement.style.height = `${height}px`
    nextTeamElement.style.marginLeft = `${marginLeft}px`
    nextTeamElement.style.fontSize = `${fontSize}px`
  }
}

const handlePanMove = (ev, themes) => {
  if (panState.started) {
    const { center } = panState.x
    const { x } = ev.center
    const xPosition = x + panState.offset
    if (xPosition < center) {
      // To The left
      const distance = center - xPosition
      handlePanLeft(distance, themes)
    } else {
      // To the right
      const distance = xPosition - center
      handlePanRight(distance, themes)
    }
  }
}

const savePanResult = (themes, themesLiked, themesDisliked, setThemes, goPathResults, direction) => {
  const theme = {...themes[themes.length - 1]}
  const newThemes = [...themes.slice(0, -1)]
  const newThemesLiked = (direction === 'like')
    ? [...themesLiked, theme]
    : themesLiked
  const newThemesDisliked = (direction !== 'like')
    ? [...themesDisliked, theme]
    : themesDisliked
  setThemes(newThemes, newThemesLiked, newThemesDisliked)

  if (newThemesLiked.length >= MAX_SWIPE_LIKE || !newThemes.length) {
    goPathResults()
  }
}

const handlePanEnd = (ev, themes, themesLiked, themesDisliked, setThemes, goPathResults) => {
  if (panState.started) {
    const nextTeamElement = getNextThemeElement(themes)
    if (nextTeamElement) {
      // const style = require('./style.scss')
      const { x } = ev.center
      const { center } = panState.x
      const xPosition = x + panState.offset
      const direction = (xPosition < center) ? 'dislike' : 'like'
      const distance = direction === 'dislike' ? center - xPosition : xPosition - center
      const percentage = distance < 250 ? (distance / 250) * 100 : 100

      if ( percentage >= 60 ) {
        savePanResult( themes, themesLiked, themesDisliked, setThemes, goPathResults, direction )
      }

      /**
       if (percentage <= 25) {
      // To the left
      nextTeamElement.className = style.illustration + ' ' + style.left
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'left', illustrations)
      updateIllustrations(newIllustrations)
      if (![...newIllustrations].filter(el => el.cls === 'new').length) {
        goPathResults()
      }
    } else if (percentage >= 75) {
      // To the right
      illustrationEl.className = style.illustration + ' ' + style.right
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'rhandlePanLeftight', illustrations)
      updateIllustrations(newIllustrations)
      if (
        [...newIllustrations].filter(el => el.cls === 'right').length >= MAX_SWIPE_LIKE
        ||
        ![...newIllustrations].filter(el => el.cls === 'new').length
      ) {
        goPathResults()
      }
    } else {
      // reset
      illustrationEl.style = null
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'new', illustrations)
      updateIllustrations(newIllustrations)
    }
       }
       panState.started = false
       */
    }
  }
}

const initWindow = () => {
  const innerW = window.innerWidth
  const centerX = innerW / 2
  const containerW = 496
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

const doDislike = (themes, themesLiked, themesDisliked, setThemes, goPathResults, distance = 0) => {
  if (distance < 260) {
    handlePanLeft(distance, themes)
    const newDistance = distance + 2.5
    setTimeout(() => {
      doDislike(themes, themesLiked, themesDisliked, setThemes, goPathResults, newDistance)
    }, 1)
  } else {
    savePanResult(themes, themesLiked, themesDisliked, setThemes, goPathResults, 'dislike')
  }
}

const doLike = (themes, themesLiked, themesDisliked, setThemes, goPathResults, distance = 0) => {
  if (distance < 260) {
    handlePanRight(distance, themes)
    const newDistance = distance + 2.5
    setTimeout(() => {
      doLike(themes, themesLiked, themesDisliked, setThemes, goPathResults, newDistance)
    }, 1)
  } else {
    savePanResult(themes, themesLiked, themesDisliked, setThemes, goPathResults, 'like')
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

// const sortOrder = (itemA, itemB) => itemA.order > itemB.order ? -1 : 1

@connect(
  state => ({
    swiping: state.bieblo.swiping,
    themes: state.bieblo.themes,
    themesLiked: state.bieblo.themesLiked,
    themesDisliked: state.bieblo.themesDisliked,
  }),
  {
    ...biebloActions,
    goPathResults: () => push('/resultaten'),
  }
)

class Swipe extends React.Component {

  static propTypes = {
    themes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    themesLiked: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    themesDisliked: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    swiping: React.PropTypes.bool.isRequired,
    setSwiping: React.PropTypes.func.isRequired,
    setThemes: React.PropTypes.func.isRequired,
    goPathResults: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    const wrapper = this.refs.biebloWrapper
    initWindow(wrapper)
  }

  render() {
    const style = require('./style.scss')
    const {themes, themesLiked, themesDisliked, setThemes, goPathResults, swiping, setSwiping} = this.props

    const classNameBtn = 'action-button' + (swiping ? ' swiping' : '')

    const clickLike = () => {
      if (!swiping) {
        setSwiping(true)
        doLike(themes, themesLiked, themesDisliked, setThemes, goPathResults, 0)
      }
    }

    const clickDislike = () => {
      if (!swiping) {
        setSwiping(true)
        doDislike(themes, themesLiked, themesDisliked, setThemes, goPathResults, 0)
      }
    }

    return (
      <div id="swipe">
        <Hammer
          onPanStart={(ev) => handlePanStart(ev, themes)}
          onPan={(ev) => handlePanMove(ev, themes)}
          onPanEnd={(ev) => handlePanEnd(ev, themes, themesLiked, themesDisliked, setThemes, goPathResults)}
        >
          <div ref="biebloWrapper" className="swipe-wrapper">
            <div className={style.background} />
            { themes && themes.map(theme => <Theme key={`theme-${theme.id}`} theme={theme} />) }
            { themesDisliked && themesDisliked.map(theme => <ThemeDisliked key={`theme-${theme.id}`} theme={theme} />) }
            { themesLiked && themesLiked.map(theme => <ThemeLiked key={`theme-${theme.id}`} theme={theme} />) }

            <div id="btn-like" ref="startButton" className={classNameBtn} onClick={clickLike}>
              wel leuk
            </div>
            <div id="btn-dislike" className={classNameBtn} onClick={clickDislike}>
              niet leuk
            </div>
            <Owl />
            <Home />
          </div>
        </Hammer>
      </div>
    )
  }
}

export default Swipe

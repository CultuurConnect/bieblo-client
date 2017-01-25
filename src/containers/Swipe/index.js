import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Hammer from 'react-hammerjs'

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
  }
}

const handlePanLeft = (distance, themes) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
    const perc = distance < 250 ? (distance / 250) * 100 : 100

    const left = 50 - (perc / 2)
    const marginLeft = -125 + (125 * (perc / 100) * 2)

    nextTeamElement.style.left = `${left}%`
    nextTeamElement.style.marginLeft = `${marginLeft}px`

    if (distance <= (250 / 2)) {
      nextTeamElement.style.transform = null
    } else {
      let percentage = distance / panState.container.width
      if (percentage > 1) {
        percentage = 1
      }
      const origin = Math.round(percentage * 100)
      const skew = 20 * percentage
      const scale = 1 - (0.20 * percentage)
      const degree = 75 * percentage
      nextTeamElement.style['transform-origin'] = (distance <= 250) ? `${origin}% bottom` : 'bottom right'
      nextTeamElement.style.transform = `scale(${scale}) rotate3d(1,0,0,${degree}deg) skewX(${skew}deg) skewY(-${skew}deg)`
    }
  }
}

const handlePanRight = (distance, themes) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
    const perc = distance < 250 ? (distance / 250) * 100 : 100

    const right = (perc / 2)
    const marginRight = -(125 - (125 * (perc / 100) * 2))

    nextTeamElement.style.right = `${right}%`
    nextTeamElement.style.marginLeft = `${marginRight}px`

    const width = 250

    if (distance <= (width / 2)) {
      nextTeamElement.style.transform = null
    } else {
      const percentage = perc / 100

      const origin = Math.round(percentage * 100)
      const skew = 20 * percentage
      const scale = 1 - (0.20 * percentage)
      const degree = 75 * percentage
      nextTeamElement.style['transform-origin'] = (distance <= width) ? `-${origin}% bottom` : 'bottom left'
      nextTeamElement.style.transform = `scale(${scale}) rotate3d(1,0,0,${degree}deg) skewX(-${skew}deg) skewY(${skew}deg)`
    }
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

const handleClick = (direction, themes, themesLiked, themesDisliked, setThemes, goPathResults) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
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
}

const handleClickLike = (themes, themesLiked, themesDisliked, setThemes, goPathResults) => {
  handleClick('like', themes, themesLiked, themesDisliked, setThemes, goPathResults)
}

const handleClickDislike = (themes, themesLiked, themesDisliked, setThemes, goPathResults) => {
  handleClick('dislike', themes, themesLiked, themesDisliked, setThemes, goPathResults)
}

const handlePanEnd = (ev, themes, themesLiked, themesDisliked, setThemes, goPathResults) => {
  const nextTeamElement = getNextThemeElement(themes)
  if (nextTeamElement) {
    // const style = require('./style.scss')
    const {x} = ev.center
    const {center} = panState.x
    const xPosition = x + panState.offset
    const direction = (xPosition < center) ? 'dislike' : 'like'
    const distance = direction === 'dislike' ? center - xPosition : xPosition - center
    const percentage = distance < 250 ? (distance / 250) * 100 : 100


    if (percentage >= 60) {
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
      const newIllustrations = changeIllustrationCls(illustrationObj.id, 'right', illustrations)
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

const initWindow = () => {
  const innerW = window.innerWidth
  const centerX = innerW / 2
  const containerW = 250
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

// const sortOrder = (itemA, itemB) => itemA.order > itemB.order ? -1 : 1

@connect(
  state => ({
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
    setThemes: React.PropTypes.func.isRequired,
    goPathResults: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    const wrapper = this.refs.biebloWrapper
    initWindow(wrapper)
  }

  render() {
    const style = require('./style.scss')
    const {themes, themesLiked, themesDisliked, setThemes, goPathResults} = this.props

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
      <Hammer
        onPanStart={(ev) => handlePanStart(ev, themes)}
        onPan={(ev) => handlePanMove(ev, themes)}
        onPanEnd={(ev) => handlePanEnd(ev, themes, themesLiked, themesDisliked, setThemes, goPathResults)}
      >
        <div id="testttt" ref="biebloWrapper" className="swipe-wrapper">
          <div className={style.background} />
          { themes && themes.map(theme => <Theme theme={theme} />) }
          { themesDisliked && themesDisliked.map(theme => <ThemeDisliked theme={theme} />) }
          { themesLiked && themesLiked.map(theme => <ThemeLiked theme={theme} />) }

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
                <em className="fa fa-4x fa-thumbs-o-down"
                    onClick={() => handleClickDislike(themes, themesLiked, themesDisliked, setThemes, goPathResults)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <p>&nbsp;</p>
            </div>
            <div className="col-md-4">
              <div className="col-md-12" style={{textAlign: 'center'}}>
                <em className="fa fa-4x fa-thumbs-o-up"
                    onClick={() => handleClickLike(themes, themesLiked, themesDisliked, setThemes, goPathResults)} />
              </div>
            </div>
          </div>
        </div>
      </Hammer>
    )
  }
}

export default Swipe

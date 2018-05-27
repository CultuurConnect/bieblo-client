import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  }

  render () {
    const {assets, component, store} = this.props
    const content = component ? ReactDOM.renderToString(component) : ''
    const head = Helmet.rewind()

    return (
      <html lang="en-us">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="shortcut icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link href={assets.styles[style]} key={key} media="screen, projection"
                rel="stylesheet" type="text/css" charSet="UTF-8"/>
        )}

        {/* (will be present only in development mode) */}
        {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
        {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
        {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
        {Object.keys(assets.styles).length === 0 ? <style
          dangerouslySetInnerHTML={{__html: require('../theme/bootstrap.config.js') + require('../containers/App/App.scss')._style}}/> : null}

        {/* Hotjar */}
        <script
          dangerouslySetInnerHTML={{
            __html:
            '(function(h,o,t,j,a,r){' +
            '    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};' +
            '    h._hjSettings={hjid:895097,hjsv:6};' +
            '    a=o.getElementsByTagName("head")[0];' +
            '    r=o.createElement("script");r.async=1;' +
            '    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;' +
            '    a.appendChild(r);' +
            '})(window,document,"https://static.hotjar.com/c/hotjar-",".js?sv=");'
          }}
        />
      </head>
      <body>
      <div id="app-wrap">
        <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
        <script src={assets.javascript.main} charSet="UTF-8"/>
        <script src="/theme/bieblo-forest/pixies.js"/>
      </div>
      </body>
      </html>
    )
  }
}

import React, {Component} from 'react'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)


export default class Owl extends Component {
  constructor(props) {
    super(props)
    this.state = {eyesClosed: false}
  }

  componentDidMount() {
    this.timeout = setTimeout(() => { this.winkEyes() }, randomIntFromInterval(500, 1000))
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  openEyes() {
    this.setState({
      eyesClosed: false,
    })
  }

  closeEyes() {
    this.setState({
      eyesClosed: true,
    })
  }

  winkEyes() {
    this.closeEyes()
    this.timeout = setTimeout(() => {
      this.openEyes()
      this.timeout = setTimeout(() => {
        this.closeEyes()
        this.timeout = setTimeout(() => {
          this.openEyes()
          this.timeout = setTimeout(() => {
            this.winkEyes()
          }, randomIntFromInterval(3000, 6000))
        }, randomIntFromInterval(175, 350))
      })
    }, randomIntFromInterval(175, 350))
  }

  render() {
    const {eyesClosed} = this.state
    const className = 'owl' + (eyesClosed ? ' closed' : '')
    return (
      <div className={className} />
    )
  }
}

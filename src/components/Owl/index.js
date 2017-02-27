import React, {Component} from 'react'

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export default class Owl extends Component {
  constructor(props) {
    super(props)
    this.state = {eyesClosed: false}
  }

  componentDidMount() {
    setTimeout(() => { this.winkEyes() }, randomIntFromInterval(500, 1000))
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
    setTimeout(() => {
      this.openEyes()
      setTimeout(() => {
        this.closeEyes()
        setTimeout(() => {
          this.openEyes()
          setTimeout(() => {
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

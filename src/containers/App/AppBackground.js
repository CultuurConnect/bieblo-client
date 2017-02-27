import React, { Component } from 'react'

const draw = (con, pxs, width, height) => {
  con.clearRect(0, 0, width, height)
  for (let i = 0; i < pxs.length; i++) {
    pxs[i].fade()
    pxs[i].move()
    pxs[i].draw(con)
  }
}

class Circle {
  s = {ttl: 8000, xmax: 5, ymax: 2, rmax: 10, rt: 1, xdef: 960, ydef: 540, xdrift: 4, ydrift: 4, random: true, blink: true}

  reset() {
    this.x = (this.s.random ? 1080 * Math.random() : this.s.xdef)
    this.y = (this.s.random ? 810 * Math.random() : this.s.ydef)
    this.r = ((this.s.rmax - 1) * Math.random()) + 1
    this.dx = (Math.random() * this.s.xmax) * (Math.random() < 0.5 ? -1 : 1)
    this.dy = (Math.random() * this.s.ymax) * (Math.random() < 0.5 ? -1 : 1)
    this.hl = (this.s.ttl / 50) * (this.r / this.s.rmax)
    this.rt = Math.random() * this.hl
    this.s.rt = Math.random() + 1
    this.stop = Math.random() * 0.2 + 0.4
    this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1)
    this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1)
  }

  fade() {
    this.rt += this.s.rt
  }

  draw(con) {
    if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) {
      this.s.rt = this.s.rt * -1
    } else if (this.rt >= this.hl) {
      this.reset()
    }
    const newo = 1 - (this.rt / this.hl)
    con.beginPath()
    con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true)
    con.closePath()
    const cr = this.r * newo
    const g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr))
    g.addColorStop(0.0, 'rgba(238,180,28,' + newo + ')')
    g.addColorStop(this.stop, 'rgba(238,180,28,' + (newo * 0.2) + ')')
    g.addColorStop(1.0, 'rgba(238,180,28,0)')
    con.fillStyle = g
    con.fill()
  }

  move() {
    this.x += (this.rt / this.hl) * this.dx
    this.y += (this.rt / this.hl) * this.dy
    if (this.x > 1080 || this.x < 0) this.dx *= -1
    if (this.y > 810 || this.y < 0) this.dy *= -1
  }

  getX() {
    return this.x
  }

  getY() {
    return this.y
  }
}

class AppLoading extends Component {
  // const backgroundImg = require('./background_bw.png')
  // const back#content-inner groundStyle = {
  //   backgroundImage: `url(${backgroundImg})`,
  //
  // }
  componentDidMount() {
    const canvas = document.getElementById('appBackground')
    const con = canvas.getContext('2d')
    const pxs = []
    for (let i = 0; i <= 60; i++) {
      pxs[i] = new Circle()
      pxs[i].reset()
    }
    setInterval(() => {
      draw(con, pxs, 1080, 810)
    }, 50)
  }

  render() {
    return (
      <canvas id="appBackground" />
    )
  }
}

export default AppLoading

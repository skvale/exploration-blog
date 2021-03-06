import React from 'react'
import Collisions from 'collisions'

const width = 800
const height = 600
const result = Collisions.createResult()

export default class Tank extends React.Component {
	collisions = new Collisions()

	updateKeys = (e) => {
		const keydown = e.type === 'keydown'
		const key = e.key.toLowerCase()

		key === 'w' && (this.up = keydown)
		// key === 'arrowup' && (this.up = keydown)

		key === 's' && (this.down = keydown)
		// key === 'arrowdown' && (this.down = keydown)

		key === 'a' && (this.left = keydown)
		// key === 'arrowleft' && (this.left = keydown)

		key === 'd' && (this.right = keydown)
		// key === 'arrowright' && (this.right = keydown)
	}

	componentDidMount() {
		document.addEventListener('keydown', this.updateKeys)
		document.addEventListener('keyup', this.updateKeys)
		this.canvas = document.createElement('canvas')
		this.canvas.width = width
		this.canvas.height = height
		this.element.appendChild(this.canvas)
		this.context = this.canvas.getContext('2d')
		this.createPlayer(10, 300)
		this.createMap()

		const frame = () => {
			this.update()
			requestAnimationFrame(frame)
		}

		frame()
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.updateKeys)
		document.removeEventListener('keyup', this.updateKeys)
	}

	update() {
		this.handleInput()
		this.processGameLogic()
		this.handleCollisions()
		this.renderCollisions()
		this.createWords()
	}

	handleInput() {
		this.up && (this.player.velocity += 0.1)
		this.down && (this.player.velocity -= 0.1)
		this.left && (this.player.angle -= 0.04)
		this.right && (this.player.angle += 0.04)
	}

	processGameLogic() {
		const x = Math.cos(this.player.angle)
		const y = Math.sin(this.player.angle)

		if (this.player.velocity > 0) {
			this.player.velocity -= 0.05

			if (this.player.velocity > 3.5) {
				this.player.velocity = 3.5
			}
		} else if (this.player.velocity < 0) {
			this.player.velocity += 0.05

			if (this.player.velocity < -2) {
				this.player.velocity = -2
			}
		}

		if (!Math.round(this.player.velocity * 100)) {
			this.player.velocity = 0
		}

		this.updatePlayer(x, y)
	}

	handleCollisions() {
		this.collisions.update()

		const potentials = this.player.potentials()

		for (const body of potentials) {
			if (this.player.collides(body, result)) {
				this.player.x -= result.overlap * result.overlap_x
				this.player.y -= result.overlap * result.overlap_y

				this.player.velocity *= 0.9
				if (result.b.href) {
					this.addItem(result.b.href)
				}
			}
		}
	}

	addItem(href) {
		const items = JSON.parse(localStorage.getItem('p-paper-blog-items')) || []
		if (!items.includes(href)) {
			items.push(href)
			if (items.length === 4) {
				items.push('/bonus')
			}
		}
		localStorage.setItem('p-paper-blog-items', [JSON.stringify(items)])
		window.location = href
	}

	renderCollisions() {
		this.context.fillStyle = '#3f2514'
		this.context.fillRect(0, 0, 800, 600)

		this.context.strokeStyle = '#fff'
		this.context.beginPath()
		this.collisions.draw(this.context)
		this.context.stroke()
	}

	updatePlayer(x, y) {
		if (this.player.velocity) {
			this.player.x += x * this.player.velocity
			this.player.y += y * this.player.velocity
		}
	}

	createPlayer(x, y) {
		const size = 3
		const doubleSize = 2 * size
		const angle = 0.2

		this.player = this.collisions.createPolygon(x, y, [
			[-doubleSize, -size],
			[doubleSize, -size],
			[doubleSize, size],
			[-doubleSize, size],
		], angle)
		this.player.velocity = 0
	}

	createWords() {
		this.context.fillStyle = "#fff"
		this.context.fillText("About", 385, 500)
		this.context.fillText("Posts", 520, 130)
		this.context.fillText("* You are here", this.player.x, this.player.y)
		this.context.fillText("Resources", 80, 100)
		this.context.fillText("Home", 100, 500)
	}

	createMap() {
		this.collisions.createPolygon(0, 0, [
			[0, 0],
			[width, 0]
		])
		this.collisions.createPolygon(0, 0, [
			[width, 0],
			[width, height]
		])
		this.collisions.createPolygon(0, 0, [
			[width, height],
			[0, height]
		])
		this.collisions.createPolygon(0, 0, [
			[0, height],
			[0, 0]
		])

		const resources = this.collisions.createPolygon(100, 100, [
			[-50, -50],
			[50, -50],
			[50, 50],
			[-50, 50],
		], 0.4)
		resources.href = '/resources'
		this.collisions.createPolygon(190, 105, [
			[-20, -20],
			[20, -20],
			[20, 20],
			[-20, 20],
		], 0.4)
		this.collisions.createCircle(170, 140, 8)
		this.collisions.createCircle(185, 155, 8)
		this.collisions.createCircle(165, 165, 8)
		this.collisions.createCircle(145, 165, 8)

		const home = this.collisions.createPolygon(100, 500, [
			[-40, -50],
			[40, -50],
			[50, 50],
			[-50, 50],
		], 0.2)
		home.href = '/home'
		this.collisions.createCircle(180, 490, 20)
		this.collisions.createCircle(175, 540, 20)

		const about = this.collisions.createPolygon(400, 500, [
			[-60, -20],
			[60, -20],
			[60, 20],
			[-60, 20]
		], 1.7)
		about.href = '/about'

		this.collisions.createPolygon(750, 0, [
			[0, 0],
			[-20, 100]
		])
		this.collisions.createPolygon(750, 0, [
			[-20, 100],
			[30, 250]
		])
		this.collisions.createPolygon(750, 0, [
			[30, 250],
			[20, 300]
		])
		this.collisions.createPolygon(750, 0, [
			[20, 300],
			[-50, 320]
		])
		this.collisions.createPolygon(750, 0, [
			[-50, 320],
			[-90, 500]
		])
		this.collisions.createPolygon(750, 0, [
			[-90, 500],
			[-200, 600]
		])

		const posts = this.collisions.createPolygon(550, 100, [
			[-60, -20],
			[-20, -40],
			[30, -30],
			[60, 20],
			[40, 70],
			[10, 100],
			[-30, 110],
			[-80, 90],
			[-110, 50],
			[-100, 20],
		])
		posts.href = '/posts'
	}

	render() {
		return (
			<div ref={el => {this.element = el}} >
				<div><b>W</b> to Accelerate</div>
				<div><b>A or D</b> to Turn</div>
				<div>Collide to navigate</div>
			</div>
		)
	}
}
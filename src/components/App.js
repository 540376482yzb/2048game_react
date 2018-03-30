import React from 'react'
import './App.css'
import Grid from './Grid'
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gridData: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
		}
		// this.handleKeyPress = this.handleKeyPress.bind(this)
		// this.myApp = React.createRef()
	}
	initGame() {
		let gridData = this.state.gridData
		gridData = this.addNumber(gridData)
		gridData = this.addNumber(gridData)
		this.setState({
			gridData
		})
	}
	// handleKeyPress(app) {
	// 	console.log(app)
	// }
	addNumber(gridData) {
		const availableSpot = []
		gridData.map((rowData, x) =>
			rowData.map((data, y) => {
				if (!data) availableSpot.push({ x, y })
			})
		)
		const randomSpot = availableSpot[Math.floor(Math.random() * availableSpot.length)]
		gridData[randomSpot.x][randomSpot.y] = Math.random() < 0.2 ? 4 : 2
		return gridData
	}
	slide(row) {
		const newRow = row.filter(data => data)
		const zerosArr = Array(4 - newRow.length).fill(0)
		return [...zerosArr, ...newRow]
	}

	combine(row) {
		let a, b
		for (let i = 3; i > 0; i--) {
			a = row[i]
			b = row[i - 1]
			if (a === b) {
				row[i] = a + b
				row[i - 1] = 0
			}
		}
		return row
	}

	slideAndCombine(row) {
		row = this.slide(row)
		row = this.combine(row)
		row = this.slide(row)
		return row
	}

	diffGrid(grid) {
		let isDiff = false
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid.length; j++) {
				if (grid[i][j] != this.state.gridData[i][j]) {
					isDiff = true
				}
			}
		}
		return isDiff
	}

	flipGrid(grid) {
		return grid.map(row => row.reverse())
	}

	componentDidMount() {
		this.initGame()
		window.addEventListener('keyup', e => {
			if (e.keyCode === 37 || 38 || 39 || 40) {
				let copyGrid = [...this.state.gridData]
				//slide right
				if (e.keyCode === 39) {
					copyGrid = copyGrid.map(row => this.slideAndCombine(row))
				}
				//slide left
				if (e.keyCode === 37) {
					copyGrid = this.flipGrid(copyGrid).map(row => this.slideAndCombine(row))
					copyGrid = this.flipGrid(copyGrid)
				}
				if (this.diffGrid(copyGrid)) {
					copyGrid = this.addNumber(copyGrid)
					this.setState({
						gridData: copyGrid
					})
				}
			}
		})
	}

	render() {
		return (
			<div className="App">
				<main className="centerGrid" id="game">
					<Grid gridData={this.state.gridData} />
				</main>
			</div>
		)
	}
}

export default App

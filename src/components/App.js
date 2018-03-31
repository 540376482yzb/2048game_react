import React from 'react'
import './App.css'
import Grid from './Grid'
import {HotKeys} from 'react-hotkeys';



  


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gridData: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
			score:0
		}
		this.blankGrid = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
		this.leftOp = this.leftOp.bind(this)
		this.rightOp = this.rightOp.bind(this)
		this.upOp = this.upOp.bind(this)
		this.downOp = this.downOp.bind(this)

		this.map = {
			'moveLeft': 'left',
			'moveRight': 'right',
			'moveUp': 'up',
			'moveDown':'down'
		  };

		  
		this.handlers = {
			'moveLeft': this.leftOp,
			'moveRight': this.rightOp,
			'moveUp': this.upOp,
			'moveDown': this.downOp
			}
	}
	initGame() {
		let grid = this.blankGrid.map(row => row.slice())
		grid = this.addNumber(grid)
		grid = this.addNumber(grid)
		this.setState({
			gridData: grid,
			score:0
		})
		this.forceUpdate()
		

	}

	addNumber(grid) {
		const availableSpot = []
		grid.forEach((rowData, x) =>
			rowData.forEach((data, y) => {
				if (!data) availableSpot.push({ x, y })
			})
		)
		const randomSpot = availableSpot[Math.floor(Math.random() * availableSpot.length)]
		grid[randomSpot.x][randomSpot.y] = Math.random() < 0.2 ? 4 : 2
		return grid
	}
	slide(row) {
		const newRow = row.filter(data => data)
		const zerosArr = Array(4 - newRow.length).fill(0)
		return [...zerosArr, ...newRow]
	}

	combine(row) {
		let a, b
		let score = this.state.score;
		for (let i = 3; i > 0; i--) {
			a = row[i]
			b = row[i - 1]
			if (a === b) {
				score +=2 * a
				row[i] = a + b
				row[i - 1] = 0
			}
		}
		this.setState({score})
		return row
	}

	slideAndCombine(row) {
		row = this.slide(row)
		row = this.combine(row)
		return row
	}

	diffGrid(grid) {
		let isDiff = false
		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid.length; j++) {
				if (grid[i][j] !== this.state.gridData[i][j]) {
					isDiff = true
				}
			}
		}
		if(isDiff){
			grid = this.addNumber(grid)
			this.setState({
				gridData:grid
			})
		}
	}

	flipGrid(grid) {
		return grid.map(row => row.reverse())
	}

	transpose(grid){
		const newGrid = this.blankGrid.map(row => row.slice())
		for(let i = 0; i< grid.length; i++){
			for(let j = 0; j < grid.length; j++){
				newGrid[i][j] = grid[j][i]
			}
		}
		return newGrid
	}

	rightOp(){
		let copyGrid = this.state.gridData.map(row => row.slice())
		copyGrid = copyGrid.map(row => this.slideAndCombine(row))
		this.diffGrid(copyGrid)
	}
	leftOp(){
		let copyGrid = this.state.gridData.map(row => row.slice())
		copyGrid = this.flipGrid(copyGrid).map(row => this.slideAndCombine(row))
		copyGrid = this.flipGrid(copyGrid)
		this.diffGrid(copyGrid)
	}
	upOp(){
		let copyGrid = this.state.gridData.map(row => row.slice())
		copyGrid = this.transpose(copyGrid)
		copyGrid = this.flipGrid(copyGrid)
		copyGrid = copyGrid.map(row => this.slideAndCombine(row))
		copyGrid = this.flipGrid(copyGrid)
		copyGrid = this.transpose(copyGrid)
		this.diffGrid(copyGrid)

	}
	downOp(){
		let copyGrid = this.state.gridData.map(row => row.slice())
		copyGrid = this.transpose(copyGrid)
		copyGrid = copyGrid.map(row => this.slideAndCombine(row))
		copyGrid = this.transpose(copyGrid)
		this.diffGrid(copyGrid)	
	}

	gameOver(){
		let over = true;
		this.state.gridData.forEach(row => {
			row.forEach(data => {
				if(data === 0) over = false;
			})
		})
		return over
	}
	componentDidMount() {
		this.initGame()
	}

	render() {
		let renderOverlay = ''
		if(this.gameOver()){
			renderOverlay = <div className='overlay'>
								<div className= 'overlay-msg'>
									<h4>Game Over</h4>
									<button onClick={()=> this.initGame()}>Restart</button>
								</div>
							</div>
		}
		return (
			<HotKeys keyMap={this.map} handlers = {this.handlers}>
				<div className='container'>
					<div className="centerGrid">
						<header className="header">
							<h4 className="title">2048 in React</h4>
							<div className="score">
								<span className='score-text'>Score: </span>{this.state.score}
							</div>
						</header>
						<main  id="game">
							<Grid gridData={this.state.gridData} />
						</main>
						{renderOverlay}
					</div>
	
				</div>

			</HotKeys>
		)
	}
}

export default App

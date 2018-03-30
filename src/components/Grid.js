import React from 'react'
import Box from './Box'
import './Grid.css'

export default class Grid extends React.Component {
	render() {
		const { gridData } = this.props
		const dimension = {
			height: `${4 * 100 + 4}px`,
			width: `${4 * 100 + 4}px`
		}
		let boxes = []
		gridData.forEach((rowData, rIndex) => {
			boxes.push(
				rowData.map((data, cIndex) => {
					return (
						<div key={`${rIndex}-${cIndex}`}>
							<Box id={`${rIndex}-${cIndex}`} data={data} />
						</div>
					)
				})
			)
		})
		return (
			<div className="Grid" style={dimension}>
				{boxes}
			</div>
		)
	}
}

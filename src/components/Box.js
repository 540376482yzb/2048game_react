import React from 'react'
import './Box.css'
export default class Box extends React.Component {
	render() {
		const { data } = this.props
		return <div className="Box">{data > 0 ? data : ''}</div>
	}
}

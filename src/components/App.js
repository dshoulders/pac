import React from 'react'
import { connect } from 'react-redux'

import { getData } from '../actions/server'

import Room from './Room'

const render = ({ room, fetchData }) => {
	
	return (
		<div>
		{ room ? <Room {...room} /> : null }						
		</div>
	)
}

const mapStateToProps = (state) => {

	return {
		room: state.rooms.find(room => room.active)
	}
}

export default connect(
	mapStateToProps
)(render)
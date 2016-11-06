import React from 'react'
import { connect } from 'react-redux'

const render = ({ position, size, action, execute }) => {

    const style = {
        position: 'absolute',
        cursor: 'pointer',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height
    }
	
	return (
		<div style={style} onClick={ () => execute(action) } />
	)
}

const mapDispatchToProps = (dispatch) => {
	
	return {
        execute: dispatch
	}
}

export default connect(
	null,
	mapDispatchToProps
)(render)
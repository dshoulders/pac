import React from 'react'
import { connect } from 'react-redux'

import { activateRoom } from '../actions/room'

import Article from './Article'
import Navigation from './Navigation'

const render = ({ background, navigation, navigate, articles }) => {

	const style = {
		height: 600,
		width: 800,
		backgroundSize: 'cover',
		position: 'relative',
		backgroundImage: `url(/static/images/${background})`
	}
	
	return (
		<div style={style}>
			{
				navigation.left ?
				<Navigation onClick={navigate(navigation.left)} direction={'left'} />
				: null
			}
			{
				articles ? articles.map((article, index) => {
					return <Article {...article} key={index} />
				}) : null
			}
			{
				navigation.right ?
				<Navigation onClick={navigate(navigation.right)} direction={'right'} />
				: null
			}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	
	return {
		navigate: (id) => () => dispatch(activateRoom(id))
	}
}

export default connect(
	null,
	mapDispatchToProps
)(render)
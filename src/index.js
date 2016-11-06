import React from 'react'
import { render } from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

import { getData } from './actions/server'

import App from './components/App'


const store = createStore(
	reducers,
	applyMiddleware(
		thunkMiddleware // lets us dispatch() functions
	)
)

store.dispatch(getData())

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
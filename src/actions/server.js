import { fetchJSON } from '../utils'

export function getData() {

    return dispatch => {

        fetchJSON('/').then(snapshot => {
            
            dispatch(recieveInitialData(snapshot.val()))
		})
    }
}

export function recieveInitialData (data) {
	return {
        type: 'DATA_RECIEVE_INITIAL',
        data
    }
}
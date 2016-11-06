export const update = (item, prop, value) => {
	return Object.assign({}, item, {
		[prop]: value
	})
}

export const getById = (collection, id) => {
	return collection.reduce((match, item) => {
		let result = match
		
		if(result === null) {
			result = item.id === id ? item : null
		}
		
		return result
	}, null)
}

export const updateById = (collection, id, prop, value) => {
	return collection.map(item => {
		if(item.id === id){
			return update(item, prop, value)
		} else {
			return item
		}
	})
}

export const removeById = (collection, id) => {
	return collection.reduce((itemsToKeep, item) => {
		if(item.id !== id) {
			itemsToKeep.push(item)
		}
		
		return itemsToKeep
	}, [])
}

export const fetchJSON = (url) => {		
	return __DB.ref(url).once('value')
}
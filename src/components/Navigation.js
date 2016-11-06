import React from 'react'

export default ({ onClick, direction }) => {

    const style = {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: 50,
        [direction]: 0,
        cursor: `url(/static/cursors/cursor-${direction}.cur), auto`
    }

    return (
        <div style={style} onClick={onClick} />
    )
}
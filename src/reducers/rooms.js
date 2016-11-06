import R from 'ramda'
import { updateById } from '../utils'

// const seedRooms = [
//     {
//         id: 1,
//         background: 'backgrounds/reception.jpg',
//         active: true,
//         navigation: {
//             left: 2,
//             right: 3
//         },
//         articles: [
//             {
//                 position: {
//                     x: 380,
//                     y: 100
//                 },
//                 size: {
//                     height: 200,
//                     width: 200
//                 },
//                 action: {
//                     type: 'NAVIGATE',
//                     id: 3
//                 }
//             }
//         ]
//     },
//     {
//         id: 2,
//         background: 'backgrounds/stairs.jpg',
//         active: false,
//         navigation: {
//             right: 1
//         }
//     },
//     {
//         id: 3,
//         background: 'backgrounds/bedroom.jpg',
//         active: false,
//         navigation: {
//             left: 1
//         }
//     }
// ]

const rooms = (state = [], action) => {

    switch (action.type) {

        case 'DATA_RECIEVE_INITIAL':

            return action.data.rooms

        case 'NAVIGATE':

            return R.map(
                R.ifElse(
                    R.propEq('id', action.id),
                    R.set(R.lensProp('active'), true),
                    R.set(R.lensProp('active'), false)
                ),
                state
            )

        default:
            return state
    }
}

export default rooms
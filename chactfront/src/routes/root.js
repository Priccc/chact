// /**
//  * | 主界面
//  */

// import Root from 'containers/Root'
// import Init from 'containers/Init'
// export default {
//     path: '/',
//     component: Root,
//     indexRoute: {
//         component: Init
//     },
//     getChildRoutes(partialNextState, callback) {
//         require.ensure([], require => {
//             callback(null, [
//                 require('./trip/index').default
//             ])
//         })
//     }
// }

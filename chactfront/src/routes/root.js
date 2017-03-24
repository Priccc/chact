import Root from 'containers/Root'
import Chart from 'containers/Root/Chart'
 import Help from 'containers/123'
export default {
    path: '/',
    component: Root,
    indexRoute:{
        component: Chart
    },
    childRoutes: [
        {
            path: 'login',
            component: Help
        }
        // ,{
        //     path: 'register',
        //     component: Register
        // }
    ]
}
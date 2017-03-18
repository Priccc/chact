import Auth from 'containers/Auth'
import Login from 'containers/Auth/Login'
import Register from 'containers/Auth/Register'
export default {
    path: 'auth',
    component: Auth,
    indexRoute: {
        component: Auth
    },
    childRoutes: [{
        path: 'login',
        component: Login
    }, {
        path: 'register',
        component: Register
    }]
}
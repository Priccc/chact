import App from 'containers/index'
import auth from './auth'
import root from './root'
export default {
  component: App,
  childRoutes: [
    auth,
    root
  ]
};
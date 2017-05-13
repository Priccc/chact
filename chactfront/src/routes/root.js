import Root from 'containers/Root'
import Main from 'containers/Root/Main'

import Chact0 from '../components/Views/Chact0'
import Chact1 from '../components/Views/Chact1'
import Chact2 from '../components/Views/Chact2'
export default {
    path: '/',
    component: Root,
    indexRoute: {
      component: Main
    },
    childRoutes:[{
      component: Main,
      childRoutes: [{
          path: 'chact0',
          component: Chact0
      }, {
          path: 'chact1',
          component: Chact1
      }]
    }]
}

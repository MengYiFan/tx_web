import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

//
const Index = resolve => {
  require.ensure(['../pages/Index'], () => {
      resolve(require('../pages/Index'))
  })
}

// /patient/center
const Center = resolve => {
  require.ensure(['../pages/Center'], () => {
      resolve(require('../pages/Center'))
  }, 'Center')
}

// /patient/qrcode
const Qrcode = resolve => {
  require.ensure(['../pages/Qrcode'], () => {
      resolve(require('../pages/Qrcode'))
  }, 'Qrcode')
}

// /patient/List
const List = resolve => {
  require.ensure(['../pages/list'], () => {
      resolve(require('../pages/list'))
  })
}

// /patient/choose/add
const AddPatient = resolve => {
  require.ensure(['../pages/AddPatient'], () => {
      resolve(require('../pages/AddPatient'))
  })
}

// /patient/choose/info
const PatientInfo = resolve => {
  require.ensure(['../pages/PatientInfo'], () => {
      resolve(require('../pages/PatientInfo'))
  })
}

// /patient/unbundling
const PatientUnbundling = resolve => {
  require.ensure(['../pages/PatientUnbundling'], () => {
      resolve(require('../pages/PatientUnbundling'))
  })
}

// /patient/health/record
const PatientHealthRecord = resolve => {
  require.ensure(['../pages/PatientHealthRecord'], () => {
      resolve(require('../pages/PatientHealthRecord'))
  })
}

const tplInputChange = resolve => {
  require.ensure(['../pages/tplInputChange'], () => {
      resolve(require('../pages/tplInputChange'))
  })
}

const tplSelectDataChange = resolve => {
  require.ensure(['../pages/tplSelectDataChange'], () => {
      resolve(require('../pages/tplSelectDataChange'))
  })
}

const routes = [{
    path: '/',
    redirect: '/patient'
  }, {
    path: '/patient/',
    component: Index,
    children: [{
      path: '',
      component: Center
    }, {
      path: 'center',
      component: Center,
      children: [{
        path: 'qrcode',
        component: Qrcode
      }]
    }, {
      path: 'qrcode',
      component: Qrcode
    }, {
      path: 'list',
      component: List,
      children: [{
        path: 'add',
        component: AddPatient
      }]
    }, {
      path: 'add',
      component: AddPatient
    }, {
      path: ':openid/info',
      component: PatientInfo
    }, {
      path: ':openid/unbundling',
      component: PatientUnbundling
    }, {
      path: ':openid/health/record',
      component: PatientHealthRecord
    }, {
      path: ':openid/input/change/:type',
      component: tplInputChange
    }, {
      path: ':openid/select/data/change/:type',
      component: tplSelectDataChange
    }]
  }
]

Vue.use(Router)

if (window.localStorage.getItem('userId')) {
  const userId = localStorage.getItem('userId')
  store.dispatch('saveUserId', userId)
}

const router = new Router({
    mode: 'history',
    routes: routes
});

// router.beforeEach((to, from, next) => {

// })

export default router
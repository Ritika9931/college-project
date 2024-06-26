
const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      {
        path: 'employee/:mode?/:id?',
        component: () => import('pages/EmployeePage.vue'),
        props: true,
        children: [
          { path: '', component: () => import('components/modules/employees/form.vue'), props: true }
        ]
      },
      {
        path: 'designation/:mode?/:id?',
        component: () => import('pages/DesignationPage.vue'),
        props: true,
        children: [
          { path: '', component: () => import('components/modules/designations/form.vue'), props: true }
        ]
      },
      {
        path: 'department/:mode?/:id?',
        component: () => import('pages/DepartmentPage.vue'),
        props: true,
        children: [
          { path: '', component: () => import('components/modules/departments/form.vue'), props: true }
        ]
      },
      {
        path: 'leave/:mode?/:id?',
        component: () => import('pages/LeavePage.vue'),
        props: true,
        children: [
          { path: '', component: () => import('components/modules/leaves/form.vue'), props: true }
        ]
      },
      {
        path: 'leavetype/:mode?/:id?',
        component: () => import('pages/LeaveTypePage.vue'),
        props: true,
        children: [
          { path: '', component: () => import('components/modules/leavetypes/form.vue'), props: true }
        ]
      },

      { path: 'salary', component: () => import('pages/SalaryPage.vue') },

      { path: 'attendence', component: () => import('pages/AttendencePage.vue') },



    ]
  },
  {
    path: '/',
    component: () => import('layouts/BlankLayout.vue'),
    children: [

      {
        path: 'login', component: () => import('pages/LoginPage.vue'),
        children: [
          {
            path: '', component: () => import('components/auth/login.vue')
          },
        ]
      },
    ]

  },
 

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
         path: 'employee/:mode?',
       component: () => import('pages/EmployeePage.vue'),
       props:true,
       children: [
        { path: '',component: () => import('components/modules/employees/form.vue'), props:true}
       ]
      },
      { path: 'designation', component: () => import('pages/DesignationPage.vue') },
      {
        path: 'department/:mode?',
        component: () => import('pages/DepartmentPage.vue'),
        props:true,
        children: [
          { path: '', component: () => import('components/modules/departments/form.vue'), props:true}
        ]
      },
      { path: 'leave', component: () => import('pages/LeavePage.vue') },
      { path: 'leavetype', component: () => import('pages/LeaveTypePage.vue') },
      { path: 'attendence', component: () => import('pages/attendencePage.vue') },
      {
         path: 'login/:mode?',
      children: [
        props:true
        { path: '', component: () => import('components/modules/logins/form.vue'),props:true}

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

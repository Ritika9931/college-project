
const routes = [
  
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        
      {
        path: 'login', component: () => import('pages/LoginPage.vue'),
      children: [
        {path: '', component: () => import('components/auth/login.vue')
        },
      ]
      },
    ]
    
  },
  // {
  //   path:'login',component:()=>import('layouts/HomeLayout.vue'),
  //   children: [
  //     { path: '', component: ()=> import('pages/LoginPage.vue'),
  //       children:[
  //         {path: '',component: ()=>('components/auth/login.vue'),}
  //       ]
  //   }
  //   ]
  // },
  
  
  
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
      { 
        path: 'designation/:mode?',
         component: () => import('pages/DesignationPage.vue'),
         props:true,
         children: [
          { path: '', component: () => import('components/modules/designations/form.vue'), props:true}
        ]
         },
      {
        path: 'department/:mode?',
        component: () => import('pages/DepartmentPage.vue'),
        props:true,
        children: [
          { path: '', component: () => import('components/modules/departments/form.vue'), props:true}
        ]
      },
      { 
        path: 'leave/:mode?', 
        component: () => import('pages/LeavePage.vue'),
        props:true,
        children: [
          { path: '', component: () => import('components/modules/leaves/form.vue'), props:true}
        ]
      },
      { path: 'leavetype/:mode?',
       component: () => import('pages/LeaveTypePage.vue'),
       props:true,
       children:[
        { path:  '', component: () => import('components/modules/leavetypes/form.vue'), props:true}
       ]
       },
  
      { path: 'salary', component: () => import('pages/SalaryPage.vue') },
      
      { path: 'attendence', component: () => import('pages/AttendencePage.vue') },
      


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

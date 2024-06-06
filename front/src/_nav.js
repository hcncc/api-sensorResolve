export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: '',
    },
  },

  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavGroup',
    name: 'Cadastros',
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Empresas',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Governos',
        to: '/base/breadcrumbs',
      },


    ],
  },


  {
    component: 'CNavItem',
    name: 'Monitoramento',
    to: '/charts',
    icon: 'cil-chart-pie',
  },
]

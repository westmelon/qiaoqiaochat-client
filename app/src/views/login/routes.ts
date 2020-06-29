const routes: RouteConfig[] = [
  {
    key: 'Login',
    path: '/login',
    windowOptions: {
      title: 'Login',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 600,
      height: 540,
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
    },
  },
]

export default routes

const routes: RouteConfig[] = [
  {
    key: 'Chat',
    path: '/chat',
    windowOptions: {
      title: 'Chat',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 300,
      height: 240,
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
    },
  },
]

export default routes

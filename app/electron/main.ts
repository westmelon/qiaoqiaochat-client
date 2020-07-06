import { app, Tray, ipcMain } from 'electron'
import { IpcChannelInterface } from './ipc/IpcChannelInterface'
import * as Channels from './ipc/SystemInfoChannel'
import * as WebsocketChannels from './ipc/WebsocketChannel'
import { creatAppTray } from './tray'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

app.on('ready', () => {
  tray = creatAppTray()
  $tools.createMainWindow()
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    $tools.createMainWindow()
  }
})

app.on('window-all-closed', function() {
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})

const registerIpcChannels = (ipcChannels: IpcChannelInterface[]) => {
  ipcChannels.forEach(channel =>
    ipcMain.on(channel.getName(), (event, request) => channel.handle(event, request))
  )
}
const channels = []
for (const name in Channels) {
  channels.push(new Channels[name]())
}
for (const name in WebsocketChannels) {
  channels.push(new WebsocketChannels[name]())
}
console.log(channels)
registerIpcChannels(channels)

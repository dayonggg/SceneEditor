import {
	app,
	BrowserWindow,
	ipcMain,
	dialog
} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		title: 'Game Resource Designer',
		height: 563,
		useContentSize: true,
		width: 1000,
		minWidth: 1000,
		minHeight: 540,
		webPreferences: {
			webSecurity: false,
		},
		show: false
	})

	mainWindow.loadURL(winURL)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

const isSecondInstance = app.makeSingleInstance((commandLine, workingDirectory) => {
	// Someone tried to run a second instance, we should focus our window.
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore()
		mainWindow.focus()
	}
})

if (isSecondInstance) {
	app.quit()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow()
	}
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

ipcMain.on('close-win', () => {
	mainWindow.close()
})

ipcMain.on('open-table', (event, title) => {
	dialog.showOpenDialog({
		title: title,
		properties: ['openDirectory']
	}, (files) => {
		if (files) {
			event.sender.send('selected-table', files)
		}
	})
})

ipcMain.on('open-res', (event, title) => {
	dialog.showOpenDialog({
		title: title,
		properties: ['openDirectory']
	}, (files) => {
		if (files) {
			event.sender.send('selected-res', files)
		}
	})
})

ipcMain.on('open-scene', (event) => {
	dialog.showOpenDialog({
		title: "选择场景文件",
		properties: ['openFile'],
		filters: [{
			name: '场景文件',
			extensions: ['ls']
		}]
	}, (files) => {
		if (files) {
			event.sender.send('selected-scene', files)
		}
	})
})

ipcMain.on('open-scene-png', (event) => {
	dialog.showOpenDialog({
		title: "选择场景行走图",
		properties: ['openFile'],
		filters: [{
			name: '行走图',
			extensions: ['png']
		}]
	}, (files) => {
		if (files) {
			event.sender.send('selected-scene-png', files)
		}
	})
})

ipcMain.on('open-model', (event) => {
	dialog.showOpenDialog({
		title: "选择模型文件",
		properties: ['openFile'],
		filters: [{
			name: '模型文件',
			extensions: ['lh']
		}]
	}, (files) => {
		if (files) {
			event.sender.send('selected-model', files)
		}
	})
})

ipcMain.on('open-model-ico', (event) => {
	dialog.showOpenDialog({
		title: "选择模型图标",
		properties: ['openFile'],
		filters: [{
			name: '模型图标',
			extensions: ['png', 'jpg', 'jpeg']
		}]
	}, (files) => {
		if (files) {
			event.sender.send('selected-model-ico', files)
		}
	})
})

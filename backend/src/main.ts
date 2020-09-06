
// Main App process
// Handles Electron container
// Serves requests from client

import { app, BrowserWindow, ipcMain } from 'electron'
import express from 'express'
import path from 'path'
import url from 'url'

import { instanceOfAppError } from 'tinystock-models'

import { configureEvent, addItemEvent, findItemEvent, makeTransactionEvent, editItemEvent, deleteItemEvent, changePasswordEvent, importDataEvent, itemsEvent, transactionsEvent } from './events'

// Prepping Electron
let win: BrowserWindow | null
const createWindow = () => {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.maximize()
  win.show()

  win.title = 'Hold on...'
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../frontend-dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  )
  win.on('closed', () => {
    win = null
  })
}
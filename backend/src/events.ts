// Contains functions directly accessed by main.ts
// References functions from funcs.ts

import { configure, addItem, findItem, addTransaction, editItem, deleteItem, changePassword, importData, items, transactions } from './funcs'
import { AppError, AppErrorCodes, instanceOfItem, instanceOfAdjustment, instanceOfItem
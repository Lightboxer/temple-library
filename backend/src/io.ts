
// Contains functions related to data IO for use in funcs.ts
// References functions from crypto.ts

import fs from 'fs'
import path from 'path'

import { Item, Transaction, AppErrorCodes, AppError, instanceOfEncryptedData, EncryptedData, instanceOfItems, instanceOfTransactions } from 'tinystock-models'

import { encrypt, decrypt, hashPassword } from './crypto'

const markerFileName = 'MarkerFile-DO_NOT_DELETE.json' // Data directory will be treated as empty if this does not exist
const markerFileContent = 'TinyStock' // Content used to test encryption password

export function readEncryptedFile(path: string, password: string) {
    let encryptedJSON: any
    try {
        encryptedJSON = JSON.parse(fs.readFileSync(path).toString())
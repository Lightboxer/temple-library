// Contains functions related to password hashing and encryption for use in io.ts

import { randomBytes, createCipheriv, createDecipheriv, createHmac } from 'crypto'
import { EncryptedData } from 'tinystock-models'

const encryptionAlgorithm = 'a
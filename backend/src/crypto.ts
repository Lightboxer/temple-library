// Contains functions related to password hashing and encryption for use in io.ts

import { randomBytes, createCipheriv, createDecipheriv, createHmac } from 'crypto'
import { EncryptedData } from 'tinystock-models'

const encryptionAlgorithm = 'aes-256-ctr'
const hashingAlgorithm = 'sha256'

export function encrypt(data: string, passwordHash: string) {
    passwordHash = passwordHash.slice(32) // Only the second half of hash is actually used for encryption - this is 
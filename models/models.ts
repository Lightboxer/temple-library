
export class Item {
    code: string
    description: string
    setQuantity: number | null // If this is null, the item is not a set
    quantity: number
    category: string
    price: number
    cost: number

    constructor(code: string, description: string, setQuantity: number | null, quantity: number, category: string, price: number, cost: number) {
        this.code = code.trim()
        this.description = description.trim()
        this.setQuantity = setQuantity
        this.quantity = quantity
        this.category = category.trim()
        this.price = price
        this.cost = cost
    }
}

export function instanceOfItem(object: any): object is Item {
    if (typeof object != 'object') return false
    let hasProps = (
        'code' in object &&
        'description' in object &&
        'setQuantity' in object &&
        'quantity' in object &&
        'category' in object &&
        'price' in object &&
        'cost' in object
    )
    if (!hasProps) return false
    let goodPropTypes = (
        typeof object.code == 'string' &&
        typeof object.description == 'string' &&
        typeof object.quantity == 'number' &&
        typeof object.category == 'string' &&
        typeof object.price == 'number' &&
        typeof object.cost == 'number' &&
        (typeof object.setQuantity == 'number' || object.setQuantity == null)
    )
    if (!goodPropTypes) return false
    let validProps = (
        object.code.trim() != '' &&
        object.description.trim != '' &&
        object.quantity >= 0 &&
        object.category.trim() != '' &&
        object.price >= 0 &&
        object.cost >= 0 &&
        (object.setQuantity > 0 || object.setQuantity == null)
    )
    return validProps
}

export function instanceOfItems(object: any): object is Item[] {
    if (!Array.isArray(object)) return false
    let itemsValid = true
    for (let i = 0; i < object.length && itemsValid; i++) {
        if (!instanceOfItem(object[i])) itemsValid = false
    }
    return itemsValid
}

export class Adjustment { // In case an amount ever needs to be manually adjusted at time of transaction
    note: string
    amount: number

    constructor(note: string, amount: number) {
        this.note = note.trim()
        this.amount = amount
    }
}

export function instanceOfAdjustment(object: any): object is Adjustment {
    if (typeof object != 'object') return false
    let hasProps = (
        'note' in object &&
        'amount' in object
    )
    if (!hasProps) return false
    let goodPropTypes = (
        typeof object.note == 'string' &&
        typeof object.amount == 'number'
    )
    if (!goodPropTypes) return false
    let validProps = (
        object.note.trim() != ''
    )
    return validProps
}

export enum TransactionTypes {
    SALE,
    PURCHASE
}

export class Transaction {
    id: string
    date: Date
    items: Item[]
    adjustments: Adjustment[]
    type: TransactionTypes

    constructor(id: string | null, date: Date, items: Item[], adjustments: Adjustment[], type: TransactionTypes) {
        this.id = id ? id.trim() : Math.round(Math.random() * 10000000000000000).toString(),
            this.date = date,
            this.items = items,
            this.adjustments = adjustments,
            this.type = type
    }
}

export function instanceOfTransaction(object: any): object is Transaction {
    if (typeof object != 'object') return false
    let hasProps = (
        'id' in object &&
        'date' in object &&
        'items' in object &&
        'adjustments' in object &&
        'type' in object
    )
    if (!hasProps) return false
    let goodPropTypes = typeof object.id == 'string'
    if (goodPropTypes && object.id.trim() == '') goodPropTypes = false
    if (goodPropTypes && typeof object.date == 'string') {
        try { new Date(object.date) } catch (err) { goodPropTypes = false }
    } else if (goodPropTypes && !(object.date instanceof Date)) {
        goodPropTypes = false
    }
    if (goodPropTypes && !Array.isArray(object.items)) goodPropTypes = false
    if (goodPropTypes && !Array.isArray(object.adjustments)) goodPropTypes = false
    for (let i = 0; i < object.items.length && goodPropTypes; i++) {
        if (!instanceOfItem(object.items[i])) goodPropTypes = false
    }
    for (let i = 0; i < object.adjustments.length && goodPropTypes; i++) {
        if (!instanceOfAdjustment(object.adjustments[i])) goodPropTypes = false
    }
    if (goodPropTypes && !(object.type in TransactionTypes)) goodPropTypes = false
    return goodPropTypes
}

export function instanceOfTransactions(object: any): object is Transaction[] {
    if (!Array.isArray(object)) return false
    let transactionsValid = true
    for (let i = 0; i < object.length && transactionsValid; i++) {
        if (!instanceOfTransaction(object[i])) transactionsValid = false
    }
    return transactionsValid
}

export enum AppErrorCodes {
    MISSING_DIRECTORY,
    CORRUPT_ENCRYPTED_JSON,
    WRONG_DECRYPTION_PASSWORD,
    CORRUPT_ITEMS_JSON,
    CORRUPT_TRANSACTIONS_JSON,
    MISSING_ITEMS_ARRAY,
    MISSING_TRANSACTIONS_ARRAY,
    CORRUPT_ITEM_IN_JSON,
    CORRUPT_TRANSACTION_IN_JSON,
    ITEM_NOT_FOUND,
    QUANTITY_TOO_LOW,
    ITEM_EXISTS,
    INVALID_ITEM,
    INVALID_ADJUSTMENT,
    INVALID_TRANSACTION,
    INVALID_ENCRYPTED_JSON,
    MISSING_ARGUMENT,
    INVALID_ARGUMENT,
    ELECTRON_TIME_OUT
}

export class AppError {
    code: AppErrorCodes
    data: any

    constructor(code: AppErrorCodes, data: any = null) {
        this.code = code
        this.data = data
    }
}

export function instanceOfAppError(object: any): object is AppError {
    if (typeof object != 'object') return false
    let hasProps = (
        'code' in object &&
        'data' in object
    )
    if (!hasProps) return false
    let goodPropTypes = (
        typeof object.code == 'number' &&
        typeof object.data == 'object'
    )
    if (!goodPropTypes) return false
    let validProps = (
        object.code in AppErrorCodes
    )
    return validProps
}

export class EncryptedData {
    iv: string
    content: string
    date: Date

    constructor(iv: string, content: string) {
        this.iv = iv.trim()
        this.content = content.trim()
        this.date = new Date()
    }
}

export function instanceOfEncryptedData(object: any): object is EncryptedData {
    if (typeof object != 'object') return false
    let hasProps = (
        'iv' in object &&
        'content' in object &&
        'date' in object
    )
    if (!hasProps) return false
    let goodPropTypes = (
        typeof object.iv == 'string' &&
        typeof object.content == 'string'
    )
    if (goodPropTypes && typeof object.date == 'string') {
        try { new Date(object.date) } catch (err) { goodPropTypes = false }
    } else if (goodPropTypes && !(object.date instanceof Date)) {
        goodPropTypes = false
    }
    if (!goodPropTypes) return false
    let validProps = (
        object.iv.trim() != '' &&
        object.content.trim() != ''
    )
    return validProps
}
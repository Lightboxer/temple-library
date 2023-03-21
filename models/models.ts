
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
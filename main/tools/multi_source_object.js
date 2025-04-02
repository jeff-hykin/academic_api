export function MultiSourceObject(sources) {
    const originalThing = { $accordingTo: sources }
    const proxyObject = new Proxy(originalThing, {
        // Object.keys
        ownKeys(original, ...args) {
            return [
                ...new Set([...Object.values(originalThing?.$accordingTo).map(each=>Reflect.ownKeys(each||{})).flat(1)])
            ]
        },
        // Object.keys only does what you think it will if getOwnPropertyDescriptor says the key is enumerable and configurable
        getOwnPropertyDescriptor(original, prop) {
            return {
                enumerable: true,
                configurable: true
            }
        },
        get(original, key, ...args) {
            if (key == "$accordingTo") {
                return originalThing.$accordingTo
            }
            if (key == "$allKeys" || key == "$all") {
                const allKeys = new Set(Object.values(originalThing.$accordingTo).map(each=>Object.keys((each instanceof Object)?each:{})).flat(1))
                if (key == "$allKeys") {
                    return allKeys
                }
                let all = {}
                for (const key of allKeys) {
                    Object.defineProperty(all, key, {
                        get() {
                            const allValues = []
                            for (const [source, value] of Object.entries(originalThing?.$accordingTo||{})) {
                                allValues.push(value?.[key])
                            }
                            return allValues
                        },
                        enumerable: true,
                        configurable: true,
                    })
                }
                return all
            }
            if (typeof key != "string") {
                return originalThing[key]
            }
            for (const [source, value] of Object.entries(originalThing?.$accordingTo||{})) {
                if (value instanceof Object) {
                    if (Reflect.has(value, key) && Reflect.get(value, key) != null) {
                        return Reflect.get(value, key, ...args)
                    }
                }
            }
            return Object.getPrototypeOf(proxyObject)[key]
        },
        set(original, key, ...args) {
            if (key == "$accordingTo" || typeof key != "string") {
                return Reflect.set(original, key, ...args)
            } else {
                throw Error(`setting key ${JSON.stringify(key)} is not allowed, set the value of .$accordingTo[nameOfSource].${key} instead\nIf you're doing this manually, use nameOfSource="manual"`)
            }
        },
        has: Reflect.has,
        deleteProperty: Reflect.deleteProperty,
        isExtensible: Reflect.isExtensible,
        preventExtensions: Reflect.preventExtensions,
        setPrototypeOf: Reflect.setPrototypeOf,
        defineProperty: Reflect.defineProperty,
        getPrototypeOf: Reflect.getPrototypeOf,
    })
    return proxyObject
}
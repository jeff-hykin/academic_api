import { MultiSourceObject } from "./tools/multi_source_object.js"

export function ReferenceSystem({plugins={}}) {
    plugins = {
        "manual": {},
        ...plugins,
    }
    // for (const [key, value] of Object.entries(plugins)) {
    //     // TODO: validate a plugin here
    // }
    
    // I don't like how this is coded, but because MultiSourceObject is a proxy object, I can't really use the class syntax
    function Reference() {
        const output = MultiSourceObject({})
        Object.setPrototypeOf(output, Reference.prototype)
        return output
    }

    Object.assign(Reference.prototype, {
        async fillConnectedPapers() {
            let promises = []
            let warnings = {}
            for (const [pluginName, plugin] of Object.entries(plugins)) {
                if (plugin.getConnectedPapers instanceof Function) {
                    // if haven't gotten them already
                    if (!(this.$accordingTo[pluginName].connectedPapers instanceof Array)) {
                        if (!(this.$accordingTo[pluginName] instanceof Object)) {
                            this.$accordingTo[pluginName] = {}
                        }
                        const promise = Promise.resolve(plugin.getConnectedPapers(this.$accordingTo[pluginName], this)).catch(error=>{
                            warnings[pluginName] = error
                        })
                        promises.push(promise)
                        promise.then(connectedPapers=>{
                            this.$accordingTo[pluginName].connectedPapers = connectedPapers
                        })
                    }
                }
            }
            await Promise.all(promises)
            return {
                connectedPapers: this.$all.connectedPapers.filter(each=>each).flat(1),
                warnings,
            }
        },
        [Symbol.for("Deno.customInspect")](inspect,options) {
            return inspect(
                {
                    ...Object.fromEntries(
                        Reflect.ownKeys(this).map(each=>[each,Reflect.get(this,each)]),
                    ),
                    $accordingTo: this.$accordingTo,
                },
                options
            )
        },
    })
    
    return {
        Reference,
        search(query) {
            throw Error(`Not implemented yet`)
        }
    }
}
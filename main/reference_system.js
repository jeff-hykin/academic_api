import { MultiSourceObject } from "./tools/multi_source_object.js"

export function ReferenceSystem({plugins={}}) {
    plugins = {
        "manual": {},
        ...plugins,
    }
    // for (const [key, value] of Object.entries(plugins)) {
    //     // TODO: validate a plugin here
    // }
    const byDoi = {}
    
    // I don't like this code-layout, but because MultiSourceObject is a proxy object, I can't really use the class syntax
    function Reference() {
        const output = MultiSourceObject({})
        Object.setPrototypeOf(output, Reference.prototype)
        return output
    }

    Object.assign(Reference.prototype, {
        // TODO: getPdf()
        // TODO: getAbstract()
        // TODO: fillData()
        // TODO: refeshData()
        // TODO: relatedWorkIncludes({source, }, refChecker)
        fillConnections: async function() {
            let promises = []
            let warnings = {}
            for (const [pluginName, plugin] of Object.entries(plugins)) {
                if (plugin.getConnectedReferences instanceof Function) {
                    // if haven't gotten them already
                    if (!(this.$accordingTo[pluginName]?.connectedPapers instanceof Array)) {
                        if (!(this.$accordingTo[pluginName] instanceof Object)) {
                            this.$accordingTo[pluginName] = {}
                        }
                        const promise = Promise.resolve(plugin.getConnectedReferences(this.$accordingTo[pluginName], this)).catch(error=>{
                            warnings[pluginName] = error
                        })
                        promises.push(promise)
                        promise.then(connectedPapers=>{
                            const references = []
                            for (let each of connectedPapers) {
                                if (each.doi) {
                                    if (!byDoi[each.doi]) {
                                        byDoi[each.doi] = new Reference()
                                    }
                                    let reference = byDoi[each.doi]
                                    reference.$accordingTo[pluginName] = each
                                    references.push(reference)
                                } else {
                                    const reference = new Reference()
                                    reference.$accordingTo[pluginName] = each
                                    references.push(reference)
                                }
                            }
                            this.$accordingTo[pluginName].connectedPapers = references
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
        toJSON() {
            const basic = {...this}
            for (let each of Object.keys(basic)) {
                if (each.startsWith("$")) {
                    delete basic[each]
                }
            }
            return {
                _: basic,
                $accordingTo: this.$accordingTo,
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
        search: async function(query) {
            const warnings = {}
            let promises = []
            let resultsByTitle = {}
            let resultsByDoi = {}
            let eachSourceResultsFlattened = []
            for (const [pluginName, plugin] of Object.entries(plugins)) {
                if (plugin.search instanceof Function) {
                    const promise = Promise.resolve(plugin.search(query)).catch(error=>{
                        warnings[pluginName] = error
                    })
                    promises.push(promise)
                    promise.then(results=>{
                        if (!(results instanceof Array)) {
                            warnings[pluginName] = "plugin failed search "+pluginName
                            return
                        }
                        // TODO: validate results
                        for (let each of results) {
                            if (!each) {
                                continue
                            }
                            if (!each.doi && !each.title) {
                                continue
                            }
                            eachSourceResultsFlattened.push(each)
                            if (each.title) {
                                if (resultsByTitle[each.title]) {
                                    resultsByTitle[each.title][pluginName] = each
                                } else {
                                    resultsByTitle[each.title] = {
                                        [pluginName]: each,
                                    }
                                }
                            }
                            if (each.doi) {
                                if (resultsByDoi[each.doi]) {
                                    resultsByDoi[each.doi][pluginName] = each
                                } else {
                                    resultsByDoi[each.doi] = {
                                        [pluginName]: each,
                                    }
                                }
                            }
                        }
                    })
                }
            }
            await Promise.all(promises)
            let titleOnlySources = []
            for (let each of eachSourceResultsFlattened) {
                if (!each.doi) {
                    // try to get the DOI from a different source
                    let doi
                    // NOTE: its possible that we get the wrong DOI here
                    // TODO: could add some better checks such as comparing year and other fields
                    for (const [pluginName, dataFromOtherPlugin] of Object.entries(resultsByTitle[each.title])) {
                        doi = doi || dataFromOtherPlugin.doi
                    }
                    if (!doi) {
                        titleOnlySources.push(each)
                    }
                }
            }
            let references = []
            
            const titles = new Set(titleOnlySources.map(each=>each.title))
            for (let eachTitle of titles) {
                const reference = new Reference()
                for (const [pluginName, value] of Object.entries(resultsByTitle[eachTitle])) {
                    reference.$accordingTo[pluginName] = value
                }
                references.push(reference)
            }

            const dois = Object.keys(resultsByDoi)
            for (let each of dois) {
                let reference
                if (byDoi[each] instanceof Reference) {
                    reference = byDoi[each]
                } else {
                    reference = new Reference()
                }
                for (const [pluginName, value] of Object.entries(resultsByDoi[each])) {
                    reference.$accordingTo[pluginName] = value
                }
                references.push(reference)
            }
            
            return { results: references, warnings }
        },
    }
}
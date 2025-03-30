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
        // TODO: convert this:
        // async function relatedWorkIncludes({source, }, refChecker) {
        //     let reference = await autofillDataFor(source)
        //     if (reference.accordingTo?.openAlex?.citedAlexIds instanceof Array) {
        //         const { citedBy, cites } = await getLinkedOpenAlexArticles(reference.accordingTo.openAlex.openAlexId)
        //         for (let each of citedBy.concat(cites)) {
        //             let citedWork = openAlexToSimpleFormat(each)
        //             if (citedWork) {
        //                 if (await refChecker(citedWork)) {
        //                     return true
        //                 }
        //             }
        //         }
        //         return false
        //     }
        // }

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
        toJSON() {
            return {
                $accordingTo: this.$accordingTo,
            },
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
        async search(query) {
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
                        if (!results) {
                            warnings[pluginName] = "plugin returned no results "+pluginName
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
            console.debug(`eachSourceResultsFlattened is:`,eachSourceResultsFlattened)
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
            console.debug(`titles is:`,titles)
            for (let eachTitle of titles) {
                const reference = new Reference()
                for (const [pluginName, value] of Object.entries(resultsByTitle[eachTitle])) {
                    reference.$accordingTo[pluginName] = value
                }
                references.push(reference)
            }

            const dois = Object.keys(resultsByDoi)
            for (let each of dois) {
                const reference = new Reference()
                for (const [pluginName, value] of Object.entries(resultsByDoi[each])) {
                    reference.$accordingTo[pluginName] = value
                }
                references.push(reference)
            }
            
            return { results: references, warnings }
        },      
    }
}
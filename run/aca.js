#!/usr/bin/env -S deno run --allow-all

import { ReferenceSystem } from '../main/main.js'
import Yaml from 'https://esm.sh/yaml@2.4.3'
import plugins from "../main/all_plugins.js"
import { crushTitle } from "../main/reference_tools.js"


import { FileSystem } from "https://deno.land/x/quickr@0.8.4/main/file_system.js"
import { parseArgs, flag, required, initialValue } from "https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/parse_args.js"
import { toCamelCase } from "https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/to_camel_case.js"
import { didYouMean } from "https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/did_you_mean.js"

// 
// check for help/version
// 
    const { help: showHelp, version: showVersion, } = parseArgs({
        rawArgs: Deno.args,
        fields: [
            [["--help", ], flag, ],
            [["--version"], flag, ],
        ],
    }).simplifiedNames
    import { Console, cyan, green, magenta, yellow } from "https://deno.land/x/quickr@0.8.4/main/console.js"
    const highlightHelp = (string)=>string.replace(
            // the [value]
            /(?<=\n    --(?:\w|-)+\s+)\[.+?\]/g, (match)=>`${magenta(match)}`
        ).replace(
            // the Notes:
            /\n\w+:/g, (match)=>`\n${yellow.bold(match)}`
        ).replace(
            // the --arg
            /\n    (--(?:\w|-)+)/g, (match)=>`    ${green(match)}`
        )
    if (showVersion) {
        console.log(`v0.0.0.1`)
        Deno.exit(0)
    }
    if (showHelp) {
        console.log(highlightHelp(`
            Usage: 
                aca
                
                aca --help
                aca --file ./refs.yaml --abstract-of "Simultaneous Localization and"
                aca --file ./refs.yaml --fill-basics --filter-in-names "Simultaneous Localization and"
                
                # example refs.yaml:
                    # start of yaml file
                        - notes:
                              nickname: NeoSLAM
                          $accordingTo:
                              openAlex:
                                  doi: '10.3390/s24041143'
                                  title: 'NeoSLAM: Long-Term SLAM Using Computational Models of the Brain'
                        - notes:
                              nickname: KeySLAM
                          $accordingTo:
                              crossref:
                                  doi: 10.1109/isas61044.2024.10552602
                                  title: A Brain-inspired SLAM System Based on Keyframe Template Matching
                    # end of yaml file
            
            Options:
                # one-item actions
                --abstract-of <partial title or note.nickname>
                --basics-of <partial title or note.nickname>
                --bibtex-of <partial title or note.nickname>

                #
                # multi-item actions
                #

                # (get from the internet)
                --fill-dois
                --fill-basics
                --fill-abstracts
                --fill-bibtex
                --fill-connections
                
                # print out
                --all-bibtex
                --all-urls
                --all-abstracts 
                
                # filtering (works for multi-item actions)
                # note: not case sensitive
                --filter-in-names <name1|name2|...>
                    ex: --filter-in-names "jeff|jeffrey"
                    Matches partial titles and .notes.nicknames

                --filter-in <term1|term2|...>
                    if your references have ".notes.filterTerms"
                    you can mention terms here, and the rest of 
                    program will pretend they are the only works
                    in the file

                --filter-out <term1|term2|...>
                    opposite of --filter-in (see above)
                

        `.replace(/\n            /g,"\n")))
        Deno.exit(0)
    }

// 
// normal usage
// 
    const output = parseArgs({
        rawArgs: Deno.args,
        fields: [
            [[ "--recursive", "-r"], flag, ],
            [[ "--inplace", "-i"], flag, ],
            [[ "--file", 0], required, ],
            [[ "--abstract-of", ], initialValue(""), ],
            [[ "--basics-of", ], initialValue(""), ],
            [[ "--bibtex-of", ], initialValue(""), ],
            [[ "--fill-dois", ], flag, ],
            [[ "--fill-basics", ], flag, ],
            [[ "--fill-abstracts", ], flag, ],
            [[ "--fill-bibtex", ], flag, ],
            [[ "--fill-connections", ], flag, ],
            [[ "--all-bibtex", ], flag, ],
            [[ "--all-urls", ], flag, ],
            [[ "--all-abstracts", ], flag, ],
            [[ "--filter-in-names", ], initialValue(null), (str)=>str.split("|").map(crushTitle).filter(each=>each.length>0), ],
            [[ "--filter-in", ], initialValue(null), ],
            [[ "--filter-out", ], initialValue(null), ],
            // [[ "--extensions-to-convert",], initialValue(`.js,.ts,.tsx,.jsx`) ],
            // [[1, "--deno-version"], initialValue(`${Deno.version.deno}`), ],
            // [["--no-default-args"], flag, ],
            // [["--add-arg"], initialValue([]), ],
            // [["--add-unix-arg"], initialValue([]), ],
            // [["--add-windows-arg"], initialValue([]), ],
        ],
        nameTransformer: toCamelCase,
        namedArgsStopper: "--",
        nameRepeats: "useLast",
        valueTransformer: JSON.parse,
        isolateArgsAfterStopper: false,
        argsByNameSatisfiesNumberedArg: true,
        implicitNamePattern: /^(--|-)[a-zA-Z0-9\-_]+$/,
        implictFlagPattern: null,
    })
    didYouMean({
        givenWords: Object.keys(output.implicitArgsByName).filter(each=>each.startsWith(`-`)),
        possibleWords: Object.keys(output.explicitArgsByName).filter(each=>each.startsWith(`-`)),
        autoThrow: true,
    })
    
    // console.debug(`output is:`,output)
    const {
        file,
        abstractOf,
        basicsOf,
        bibtexOf,
        fillDois,
        fillBasics,
        fillAbstracts,
        fillBibtex,
        fillConnections,
        allBibtex,
        allUrls,
        allAbstracts,
        filterInNames,
        filterIn,
        filterOut,
    } = output.simplifiedNames



const data = Yaml.parse(Deno.readTextFileSync(file), { defaultStringType: 'QUOTE_DOUBLE',})
// 
// handle filters
// 
    const refSys1 = ReferenceSystem({
        plugins,
    })

    refSys1.loadReferences(data)
    let allReferences = refSys1.getReferences()

    let indicesToKeep = []
    // convert to only letters separated by spaces
    if (filterInNames) {
        indicesToKeep.push(...allReferences.map((each,index)=>{
            if (filterInNames.some(partialName=>crushTitle(each.title).includes(partialName)||(each.notes?.nickname||"").includes(partialName))) {
                return index
            }
        }).filter(each=>each!=null))
    }
    if (filterIn) {
        indicesToKeep.push(...allReferences.map((eachRef,index)=>{
            if (!indicesToKeep.includes(index)) {
                return null
            }
            if (filterIn.some(term=>crushTitle(eachRef.notes.filterTerms||[]).includes(term))) {
                return index
            }
        }).filter(each=>each!=null))
    }
    if (!filterInNames && !filterIn) {
        indicesToKeep.push(...allReferences.map((eachRef,index)=>index))
    }
    if (filterOut) {
        indicesToKeep.push(...allReferences.map((eachRef,index)=>{
            if (!indicesToKeep.includes(index)) {
                return null
            }
            if (filterOut.some(term=>crushTitle(eachRef.notes.filterTerms||[]).includes(term))) {
                return index
            }
        }).filter(each=>each!=null))
    }



    indicesToKeep = new Set(indicesToKeep) 
    const filteredData = data.filter((each, index)=>indicesToKeep.has(index))
    const refSys = ReferenceSystem({
        plugins,
    })
    refSys.loadReferences(filteredData)
    const references = refSys.getReferences()

// 
// helpers
// 
    const getByPartialTitle = (partialTitle)=>{
        return references.filter(each=>{
            return crushTitle(each.title).includes(crushTitle(partialTitle)) || (each.notes?.nickname||"").includes(crushTitle(partialTitle))
        })
    }

// 
// pick action
// 
    // abstractOf,
    // basicsOf,
    // bibtexOf,
    // fillBasics,
    // fillAbstracts,
    // fillBibtex,
    // fillConnections,
    // allBibtex,
    // allUrls,
    // allAbstracts,

if (bibtexOf) {
    let results = getByPartialTitle(bibtexOf)
    if (results.length == 0) {
        console.log(`No results found for ${bibtexOf}`)
    } else {
        for (let each of results) {
            if (each.bibtex) {
                console.log(each.bibtex)
                console.log()
            }
        }
    }
} else if (fillDois) {
    let promises = []
    for (let each of references) {
        if (each.doi) {
            promises.push(each.fillDoi().then(({success})=>console.log(`success? ${success} filling doi for: `,each.title)))
        }
    }
    await Promise.all(promises)
} else if (fillBasics) {
    let promises = []
    for (let each of references) {
        if (each.doi) {
            promises.push(each.fillCoreData().then(_=>console.log("filled core data for: ",each.title)))
        }
    }
    await Promise.all(promises)
} else if (fillBasics) {
    let promises = []
    for (let each of references) {
        if (each.doi && !each.title) {
            promises.push(each.fillCoreData().then(_=>console.log("filled core data for: ",each.title)))
        }
    }
    await Promise.all(promises)
} else if (fillBibtex) {
    const promises = []
    for (let each of references) {
        if (each.doi && !each.bibtex) {
            promises.push(each.fillBibtex().then(_=>console.log("filled bibtex for: ",each.title)))
        }
    }
    await Promise.all(promises)
}

Deno.writeTextFileSync(
    "references.yaml",
    yaml.stringify(
        getReferences()
    )
)
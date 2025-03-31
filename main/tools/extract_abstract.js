import { DOMParser } from "../imports/deno_dom.js"
import { createCachedTextFetcher, getRedirectedUrl } from "./fetch_tools.js"

const htmlFetcher = createCachedTextFetcher({
    cache: {},
    rateLimitMilliseconds: 500, // google is picky and defensive
    onUpdateCache(url) {
        
    },
    urlNormalizer(url) {
        return new URL(url)
    }
})

export const defaultCustomParsingRules = {
    // 
    // IEEE
    // 
    "https://ieeexplore.ieee.org/document/": ()=>{
        const abstractElement = [...document.querySelectorAll("div.u-mb-1")].filter(each=>each.innerText.trim().startsWith("Abstract"))[0]
        if (abstractElement) {
            abstract = abstractElement[0].innerText
        }
        return abstract
    },
    // 
    // Frontiers
    // 
    "https://www.frontiersin.org/articles/": ()=>{
        document.querySelectorAll(".JournalAbstract p")[0].innerText 
        const abstractElement = document.querySelector(".JournalAbstract p")
        // .filter(each=>each.innerText.trim().startsWith("Abstract"))[0]
        if (abstractElement) {
            abstract = abstractElement.innerText
        } else {
            const abstractElements = [...document.querySelectorAll(".JournalAbstract")].filter(each=>each.innerText.match(/\..+\./))
            // first element is often the title for some reason, the period check is to avoid grabbing the title
            if (abstractElements.length > 0) {
                // remove junk
                for (let each of abstractElements) {
                    const elms = [
                        each.querySelector(".authors"),
                        each.querySelector(".notes"),
                        each.querySelector(".clear"),
                    ].filter(each=>each)
                    for (let each of elms) {
                        each.innerText = ""
                    }
                }
                abstract = abstractElements.map(each=>each.innerText).join("\n")
            } else {
                const abstractElements = [...document.querySelectorAll(".JournalAbstract")]
                if (abstractElements.length > 0) {
                    abstract = abstractElements.map(each=>each.innerText).join("\n")
                }
            }
        }
        return abstract
    },
    // 
    // Sensors
    // 
    "https://www.mdpi.com/": ()=>{
        abstract = document.querySelector("#html-abstract div")?.innerText 
        return abstract
    },
    // 
    // Springer Nature
    // 
    "https://link.springer.com/": ()=>{
        abstract = document.querySelector("#Abs1-content")?.innerText
        return abstract
    },
    // 
    // Springer Nature
    // 
    "https://www.sciencedirect.com/": ()=>{
        abstract = document.querySelector("#aep-abstract-sec-id5")?.innerText 
        return abstract
    },
}

export async function extractAbstract(url, {fetchOptions=null, cleanupWhitespace=true, customParsingRules={}, timeout=5000}={}) {
    customParsingRules = {
        ...customParsingRules,
        ...defaultCustomParsingRules,
        ...customParsingRules, // this is intenionally here twice. We want the user to both have the first order, and overwrite exact matches
    }
    if (typeof url != "string") {
        throw Error(`url must be a string, got ${url}`)
    }

    let abstract
    let result
    try {
        result = await htmlFetcher(url, fetchOptions||{
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:133.0) Gecko/20100101 Firefox/133.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Sec-GPC": "1",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "none",
                "Sec-Fetch-User": "?1",
                "Priority": "u=0, i",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "method": "GET",
            "mode": "cors"
        })
    } catch (error) {
        warnings[pluginName] = error
        continue
    }
    let document
    try {
        document = new DOMParser().parseFromString(
            result,
            "text/html",
        )
    } catch (error) {
        throw Error(`unable to parse html from ${JSON.stringify(url)}`)
    }
    
    const redirectedUrls = []
    try {
        let prevUrl = url
        while (1) {
            const nextUrl = await getRedirectedUrl(url, {timeout})
            if (!nextUrl) {
                break
            }
            if (nextUrl == prevUrl) {
                break
            }
            redirectedUrls.push(nextUrl)
            prevUrl = url
        }
    } catch (error) {
        
    }

    // 
    // custom parsing rules first
    // 
    for (const [key, value] of Object.entries(customParsingRules)) {
        if (url.startsWith(key) || redirectedUrls.some(each=>each.startsWith(key))) {
            abstract = value(document)
        }
        if (abstract) {
            break
        }
    }
    
    // fallback case:
    if (!abstract) {
        let abstractElement
        if (
            (abstractElement=document.querySelector("#abstract")) ||
            (abstractElement=document.querySelector("#Abstract")) ||
            (abstractElement=document.querySelector("#abstracts")) ||
            (abstractElement=document.querySelector("#Abstracts")) ||
            (abstractElement=document.querySelector("#abs"))
        ) {
            abstract = abstractElement.innerText
        } else {
            // try to remove irrelevent content
            const headers = [...document.querySelectorAll("header")]
            for (let each of headers) {
                each.innerText = ""
            }
            // try main element
            let mains = [...document.querySelectorAll("main")]
            if (mains.length == 1) {
                abstract = mains[0].innerText
            // absolute fallback
            } else {
                abstract = document.body.innerText
                // if the body does not contain the word "abstract", then fail
                if (!abstract.match(/abstract/i)) {
                    throw Error(`unable to get abstract, body text did not contain "abstract"\n${abstract}`)
                }
            }
        }
    }
    
    if (cleanupWhitespace) {
        abstract = abstract.replace(/[ \t]+/g," ").replace(/[\n\r]+[ \t]+$/gm,"\n").replace(/[\n\r]+/g,"\n").trim()
    }
    return abstract
}
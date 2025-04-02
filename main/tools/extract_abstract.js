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

const hasTwoPeriods = (str)=>{
    return !!str.replace(/\s+/g," ").match(/\..+\./)
}

export const defaultCustomParsingRules = {
    // 
    // IEEE
    // 
    "https://ieeexplore.ieee.org/": (document)=>{
        let match
        // IEEE doesn't render the abstract in the HTML elements, its inside a script tag
        // if (match = document.body.innerHTML.match(new RegExp(`, *("abstract":"(\\\\(?:[\\"\\\\\\\/bfnrt]|u[0-9a-fA-F]{4})|[^"])*")`))) {
        if (match = document.body.innerHTML.match(/, *("abstract":"(\\(?:[\"\\\\/bfnrt]|u[0-9a-fA-F]{4})|[^"])*")/)) {
            // any string matching that regex is guarenteed valid json
            return JSON.parse(`{${match[1]}}`).abstract
        }
        return Error(`Failed to extract abstract from ${document.body.innerHTML}`)
        
        // // FIXME
        // var abstract
        // for (let each of document.querySelectorAll("*")) {
        //     if (each.tagName == "SCRIPT") {
        //         each.innerHTML = ""
        //     }
        // }
        // const abstractElement = [...document.querySelectorAll("*")].filter(each=>each.innerText.trim().startsWith("Abstract"))
        // const abstractElement = [...document.querySelectorAll("div.u-mb-1")].filter(each=>each.innerText.trim().startsWith("Abstract"))[0]
        // if (abstractElement) {
        //     abstract = abstractElement[0].innerText
        // }
        // return abstract
    },
    // 
    // Frontiers
    // 
    "https://www.frontiersin.org/articles/": (document)=>{
        var abstract
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
        // dont use fallback for frontiers
        if (!abstract) {
            return Error(`Failed to extract abstract from ${document.body.innerHTML}`)
        }
        return abstract
    },
    // 
    // Sensors
    // 
    "https://www.mdpi.com/": (document)=>{
        var abstract
        abstract = document.querySelector("#html-abstract div")?.innerText
        return abstract
    },
    // 
    // Springer Nature
    // 
    "https://link.springer.com/": (document)=>{
        var abstract
        abstract = document.querySelector("#Abs1-content")?.innerText
        return abstract
    },
    // 
    // Science Direct
    // 
    "https://www.sciencedirect.com/": (document)=>{
        var abstract
        abstract = document.querySelector("#aep-abstract-sec-id5")?.innerText 
        if (!abstract) {
            abstract = document.querySelector("#aep-abstract-id4")?.innerText 
            if (!abstract) {
                abstract = document.querySelector("#abstracts")?.innerText 
                if (!abstract) {
                    abstract = document.querySelector("#preview-section-abstract")?.innerText 
                }
            }
        }
        return abstract
    },
    // 
    // Nature
    // 
    "https://www.nature.com/": (document)=>{
        var abstract
        abstract = document.querySelector("#Abs1-content")?.innerText 
        if (!abstract) {
            abstract = document.querySelector("#Abs1-section")?.innerText 
        }
        return abstract
    },
    // 
    // Arxiv
    // 
    "https://arxiv.org/": (document)=>{
        var abstract
        abstract = document.querySelector("blockquote.abstract")?.innerText 
        if (!abstract) {
            abstract = document.querySelector("#abs blockquote")?.innerText 
            if (!abstract) {
                abstract = document.querySelector("#abs")?.innerText
            }
        }
        return abstract
    },

    // UNABLE (no abstract)
    // https://search.proquest.com/

    // 
    // Wiley (likely unable because of is-human check)
    // 
    "https://onlinelibrary.wiley.com/": (document)=>{
        var abstract
        abstract = document.querySelector(".abstract-group p")?.innerText 
        if (!abstract) {
            abstract = document.querySelector(".article-section__content.en.main")?.innerText 
        }
        return abstract
    },
    "https://advanced.onlinelibrary.wiley.com/": (document)=>{
        var abstract
        abstract = document.querySelector(".abstract-group p")?.innerText 
        if (!abstract) {
            abstract = document.querySelector(".article-section__content.en.main")?.innerText 
        }
        return abstract
    },
    
    // UNABLE (no abstract)
    // https://books.google.com

    // 
    // sagepub (likely unable because of is-human check)
    // 
    "https://journals.sagepub.com/": (document)=>{
        return document.querySelector("#abstract")?.innerText 
    },
    // 
    // ACM (likely unable because of is-human check)
    // 
    "https://dl.acm.org/": (document)=>{
        return document.querySelector("#abstract")?.innerText 
    },
    // 
    // biorxiv
    // 
    "https://www.biorxiv.org/": (document)=>{
        return document.querySelector("#abstract-1")?.innerText 
    },
    // 
    // academic group
    // 
    "https://academic.oup.com/": (document)=>{
        return document.querySelector(".abstract")?.innerText 
    },


    "https://www.tandfonline.com/": (document)=>{
        return document.querySelector("#abstract")?.parentElement?.innerText
    },
    "https://www.cell.com/": (document)=>{
        return document.querySelector("#author-abstract")?.innerText
    },

    "https://www.science.org": (document)=>document.querySelector("#abstract")?.innerText,
    "https://journals.plos.org": (document)=>document.querySelector(".abstract-content")?.innerText,
    // "https://www.researchgate.net": (document)=>document.querySelector("#abstract")?.innerText, // they're all PDF's
    "https://direct.mit.edu": (document)=>document.querySelector(".abstract")?.innerText,
    "https://elifesciences.org": (document)=>document.querySelector("#abstract")?.innerText,
    "https://proceedings.neurips.cc": (document)=>{
        return document.querySelector("#container-fluid")?.innerText?.replace?.(/Abstract\b.+/,"")
    },
    "https://www.cambridge.org": (document)=>document.querySelector(".abstract")?.innerText,
    "https://www.jneurosci.org": (document)=>document.querySelector("#abstract-1")?.innerText,
}

export async function extractAbstract(url, {useFallback=false, fetchOptions=null, cleanupWhitespace=true, customParsingRules={}, timeout=5000, warnOnCustomParseError=true, attemptFallbackExtract=true}={}) {
    customParsingRules = {
        ...customParsingRules,
        ...defaultCustomParsingRules,
        ...customParsingRules, // this is intenionally here twice. We want the user to both have the first order, and overwrite exact matches
    }
    if (typeof url != "string") {
        throw Error(`url must be a string, got ${url}`)
    }
    fetchOptions = fetchOptions||{
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
    }
    let abstract
    let result = await htmlFetcher(url, fetchOptions)
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
            const nextUrl = await getRedirectedUrl(prevUrl, {timeout, ...fetchOptions})
            if (!nextUrl) {
                break
            }
            // otherwise some urls are redirected to randomly generated stuff
            if (new URL(nextUrl).origin == new URL(prevUrl).origin) {
                break
            }
            redirectedUrls.push(nextUrl)
            prevUrl = nextUrl
        }
    } catch (error) {
        
    }

    // 
    // custom parsing rules first
    // 
    for (const [key, value] of Object.entries(customParsingRules)) {
        if (url.startsWith(key) || redirectedUrls.some(each=>each.startsWith(key))) {
            try {
                abstract = value(document)
            } catch (error) {
                // go to next if error
                if (warnOnCustomParseError) {
                    console.warn(`Custom parsing rule ${key} failed to extract abstract for ${url}`)
                }
            }
        }
        if (abstract) {
            break
        }
    }

    // if one returned an error, that means we need to bail (dont use fallback)
    if (abstract instanceof Error) {
        throw abstract
    }
    
    if (!useFallback && !abstract) {
        throw Error(`Unable to extract abstract from ${url}`)
    }
    
    // fallback case:
    if (!abstract) {
        for (let each of [
            "#abstract",
            "#Abstract",
            "#abstracts",
            "#Abstracts",
            "#abs",
            ".abstract",
        ]) {
            let abstractElement = document.querySelector("#abstract")
            if (abstractElement) {
                if (hasTwoPeriods(abstractElement.innerText)) {
                    abstract = abstractElement.innerText
                    break
                } else {
                    if (hasTwoPeriods(abstractElement.parentElement.innerText) && abstractElement.parentElement.innerText.trim().startsWith("Abstract")) {
                        abstract = abstractElement.innerText
                        break
                    }
                }
            }
        }

        if (!abstract) {
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
    
    // 
    // suspicious checks
    // 
    if (!hasTwoPeriods(abstract)){
        console.warn(`${JSON.stringify(url)} abstract doesn't contain two periods, which is suspicious: ${abstract}`)
    } else if ((abstract.match(/\b\w+\b/g)||[]).length > 3000) {
        console.warn(`${JSON.stringify(url)} abstract contains over 3,000 words, which is suspiciously long for an abstract`)
        if (attemptFallbackExtract) {
            let match
            // grab out section
            if (match = abstract.match(/\bAbstract\b([\w\W]+)(?:Introduction|INTRODUCTION|References|REFERENCES|Keywords|KEYWORDS)/)) {
                abstract = match[1]
            }
        }
    }

    return abstract
}
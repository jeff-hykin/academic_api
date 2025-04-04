import { DOMParser } from "../imports/deno_dom.js"
import { createCachedFetcher, getRedirectedUrl } from "./fetch_tools.js"
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.15.0.0/source/flattened/indent.js'
import { toRepresentation } from 'https://esm.sh/gh/jeff-hykin/good-js@1.15.0.0/source/flattened/to_representation.js'
const htmlFetcher = createCachedFetcher({
    cache: {},
    rateLimitMilliseconds: 500, // google is picky and defensive
    onUpdateCache(url) {
        
    },
    outputModifyer: async (response)=>{
        return ({
            result: await response.text(),
            redirectedUrl: response.redirected ? response.url : null,
        })
    },
    urlNormalizer(url) {
        return new URL(url).href
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
    },
    // 
    // Frontiers
    // 
    "https://www.frontiersin.org/": (document)=>{
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
    "https://linkinghub.elsevier.com/": (document)=>{
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
    "https://ietresearch.onlinelibrary.wiley.com/": (document)=>{
        var abstract
        abstract = document.querySelector(".abstract-group p")?.innerText 
        if (!abstract) {
            abstract = document.querySelector(".article-section__content.en.main")?.innerText 
        }
        return abstract
    },
    // 
    // google books
    // 
    "https://books.google.com/": (document)=>{
        return Error(`No abstract for books.google.com`)
    },

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
        if (document.body.innerText.match(/needs to review the security of your connection before proceeding/i)) {
            return Error(`is-human check failed`)
        }
        return document.querySelector("#author-abstract")?.innerText
    },

    "https://www.science.org": (document)=>document.querySelector("#abstract")?.innerText,
    "https://journals.plos.org": (document)=>document.querySelector(".abstract-content")?.innerText,
    "https://www.researchgate.net": (document, {matchingUrl})=>{ // they're all PDF's (afaik)
        if (matchingUrl.endsWith(".pdf")) {
            return new Error(`PDF from www.researchgate.net (can't extract abstract)`)
        }
    },
    "https://search.proquest.com/": (document, {matchingUrl})=>{ // they're all PDF's (afaik)
        return new Error(`PDF from search.proquest.com (can't extract abstract)`)
    },
    "https://direct.mit.edu": (document)=>document.querySelector(".abstract")?.innerText,
    "https://elifesciences.org": (document)=>document.querySelector("#abstract")?.innerText,
    "https://proceedings.neurips.cc": (document)=>{
        return document.querySelector(".container-fluid")?.innerText?.replace?.(/Abstract\b.+/,"")
    },
    "https://www.cambridge.org": (document)=>document.querySelector(".abstract")?.innerText,
    "https://www.jneurosci.org": (document)=>document.querySelector("#abstract-1")?.innerText,
    "https://iopscience.iop.org/": (document)=>{
        if (document.body.innerText.match(/please can you confirm you are a human by ticking the box below/i)) {
            return Error(`is-human check failed`)
        }
        return document.querySelector(".article-abstract")?.innerText
    },
    "https://eprints.qut.edu.au/": (document)=>document.querySelector("#ep_abstract p")?.innerText,
    "https://www.science.org/": (document)=>document.querySelector("#abstract")?.innerText,
    "https://dspace.mit.edu/": (document)=>document.querySelector(".simple-item-view-description")?.innerText,
    "https://pmc.ncbi.nlm.nih.gov/": (document)=>document.querySelector("#abstract1")?.innerText,
    "https://spj.science.org/": (document)=>document.querySelector("#abstract")?.innerText,
    "https://journals.physiology.org/": (document)=>document.querySelector(".abstractInFull")?.innerText,
    "https://openaccess.thecvf.com/": (document)=>document.querySelector("#abstract")?.innerText,
    "http://openaccess.thecvf.com/": (document)=>document.querySelector("#abstract")?.innerText,
    "https://proceedings.mlr.press/": (document)=>document.querySelector("#abstract")?.innerText,
    "https://web.p.ebscohost.com/": (document)=>document.querySelector(".abstract")?.innerText,
    "https://www.emerald.com/": (document)=>document.querySelector(".abstract")?.innerText, // usually fails with is-human check
    "https://www.taylorfrancis.com/": (document)=>document.querySelector(".book-content")?.innerText,
    "https://www.annualreviews.org/": (document)=>document.querySelector(".description")?.innerText,
}

export async function extractAbstract(url, {useFallback=false, fetchOptions=null, cleanupWhitespace=true, cleanupStartWithAbstract=true, customParsingRules={}, timeout=5000, warnOnCustomParseError=true, attemptFallbackExtract=true, astralBrowser, errorCharacterOutputLimit = 2000, preferBrowser=false, browserWaitTime=100}={}) {
    if (typeof url != "string") {
        throw Error(`url must be a string, got ${url}`)
    }
    customParsingRules = {
        ...customParsingRules,
        ...defaultCustomParsingRules,
        ...customParsingRules, // this is intenionally here twice. We want the user to both have the first order, and overwrite exact matches
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
    var result, redirectedUrl
    if (preferBrowser && astralBrowser) {
        const page = await astralBrowser.newPage(url)
        // to get past a lot of is-human checks
        await new Promise(r=>setTimeout(r,browserWaitTime))
        result = await page.evaluate(() => document?.body?.innerHTML)
        Promise.resolve(page.close()).catch(error=>{})
    }
    try {
        if (!result) {
            var {result, redirectedUrl} = await htmlFetcher(url, fetchOptions)
        }
    } catch (error) {
        if (astralBrowser) {
            const page = await astralBrowser.newPage(url)
            // to get past a lot of is-human checks
            await new Promise(r=>setTimeout(r,browserWaitTime))
            result = await page.evaluate(() => document?.body?.innerHTML)
            Promise.resolve(page.close()).catch(error=>{})
        } else {
            throw error
        }
    }
    let document
    try {
        document = new DOMParser().parseFromString(
            result,
            "text/html",
        )
    } catch (error) {
        throw Error(`unable to parse html from ${JSON.stringify(url)},\n\n${toRepresentation(result,{indent:8}).slice(0,errorCharacterOutputLimit)}`)
    }
    
    // 
    // resistance to js-only pages
    // 
    if (astralBrowser && (document?.body?.innerText||"").trim().length==0 || (document?.title||"").trim().match(/Redirecting/i)) {
        const page = await astralBrowser.newPage(url)
        result = await page.evaluate(() => document?.body?.innerHTML)
        Promise.resolve(page.close()).catch(error=>{})
        try {
            document = new DOMParser().parseFromString(
                result,
                "text/html",
            )
        } catch (error) {
            throw Error(`unable to parse html from ${JSON.stringify(url)},\n\n${toRepresentation(result,{indent:8}).slice(0,errorCharacterOutputLimit)}`)
        }
    }
    
    const urls = [...new Set([url, redirectedUrl])].filter(each=>each)
    
    
    // 
    // custom parsing rules first
    // 
    const matched = []
    for (const [key, value] of Object.entries(customParsingRules)) {
        if (urls.some(each=>each.startsWith(key))) {
            matched.push(key)
            const matchingUrl = urls.find(each=>each.startsWith(key))
            try {
                abstract = value(document, {matchingUrl, urls})
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
    
    if (!useFallback && typeof abstract != "string") {
        if (document?.body?.innerText.match(/Verify you are human by completing the action below|Verifying you are human\. This may take a few seconds/i)) {
            if (!preferBrowser && astralBrowser) {
                return extractAbstract(url, {fetchOptions, cleanupWhitespace, cleanupStartWithAbstract, customParsingRules, timeout, warnOnCustomParseError, attemptFallbackExtract, astralBrowser, errorCharacterOutputLimit, preferBrowser: true, browserWaitTime: 8000})
            }
            throw Error(`is-human check failed`)
        }
        if (matched.length == 0) {
            throw Error(`Unable to extract abstract from ${url}, no custom parsing rules matched ${JSON.stringify(urls)}`)
        } else {
            if (!preferBrowser && astralBrowser) {
                return extractAbstract(url, {fetchOptions, cleanupWhitespace, cleanupStartWithAbstract, customParsingRules, timeout, warnOnCustomParseError, attemptFallbackExtract, astralBrowser, errorCharacterOutputLimit, preferBrowser: true, browserWaitTime: 8000})
            }
            throw Error(`Unable to extract abstract from ${url}, rules matched ${JSON.stringify(matched)}, but they didn't error or extract the abstract.\n\n${toRepresentation(result,{indent:8}).slice(0,errorCharacterOutputLimit)}`)
        }
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
    
    if (typeof abstract != "string") {
        throw Error(`Internal error, was unable to get abstract as a string for ${url}`)
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
    
    if (cleanupStartWithAbstract) {
        abstract = abstract.replace(/^Abstract\s*/i,"")
    }

    return abstract
}
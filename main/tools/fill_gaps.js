import { urlToDoiMaybe, normalizeDoiString } from "./doi_tools.js"
import { getRedirectedUrl } from "./fetch_tools.js"
import { extractAbstract } from "./extract_abstract.js"

export async function fillGaps(ref, {extractAbstractOptions={}}={}) {
    const warnings = {}
    // coerce doi's
    for (const [key, value] of Object.entries(ref.$accordingTo)) {
        if (typeof value.doi == "string") {
            value.doi = normalizeDoiString(value.doi)
        }
    }

    //
    // try to fill DOI from links
    //
    for (const [key, value] of Object.entries(ref.$accordingTo)) {
        if (value.url) {
            const doi = urlToDoiMaybe(value.url)
            if (doi) {
                value.doi = doi
            }
        }
    }
    
    //
    // try to fill links from DOI
    //
    for (const [key, value] of Object.entries(ref.$accordingTo)) {
        if (value.doi && !value.url) {
            try {
                // todo: use a promise list to do this in parallel
                value.url = await getRedirectedUrl(`https://doi.org/${value.doi}`)
            } catch (error) {
                
            }
        }
    }

    // 
    // replace DOI links with redirects (which has more information)
    // 
    for (const [key, value] of Object.entries(ref.$accordingTo)) {
        if (typeof value.url == "string" && value.url.startsWith("https://doi.org/")) {
            try {
                value.url = await getRedirectedUrl(value.url)
            } catch (error) {
                
            }
        }
    }

    // 
    // try to get abstracts
    //
    let urls = {}
    for (const [key, value] of Object.entries(ref.$accordingTo)) {
        if (!value.abstract && value.url) {
            urls[value.url] = urls[value.url]||[]
            urls[value.url].push([key, value])
        }
    }
    for (const [url, sources] of Object.entries(urls)) {
        try {
            const abstract = await extractAbstract(url, extractAbstractOptions)
            for (const [key, value] of sources) {
                value.abstract = abstract
            }
        } catch (error) {
            warnings[`getting abstract from ${url}`] = error
        }
    }
    return warnings
}
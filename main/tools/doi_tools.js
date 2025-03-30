// these are based on https://www.crossref.org/blog/dois-and-matching-regular-expressions/
    // which is based on 74.9M DOIs
    // while there is a modern standard, there is no universal pattern guarenteed to match OLD DOIs

export function matchValidDoiSubstring(doi) {
    return doi.match(/10\.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i)
}

export function isModernDoi(doi) {
    return doi.match(/^10\.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i)
}

export function couldBeValidDoi(doi) {
    return doi.match(/^10\.(\d{4,9}\/[-._;()\/:A-Z0-9]+|1002\/[^\s]+|1021\/\w\w\d+|1207\/[\w\d]+\&\d+_\d+|\d{4}\/\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d)$/i)
    // the above is the combination of the following:
        // /^10\.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i
        // /^10\.1002\/[^\s]+$/i
        // /^10\.1021\/\w\w\d++$/i
        // /^10\.1207\/[\w\d]+\&\d+_\d+$/i
        // /^10\.\d{4}\/\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d$/i
}

export function urlToDoiMaybe(url) {
    const doi = normalizeDoiString(url)
    if (couldBeValidDoi(doi)) {
        return doi
    }
}

export function normalizeDoiString(doi) {
    // remove most common url prefix
    if (doi.startsWith("https://doi.org/")) {
        return doi.replace("https://doi.org/","")
    }
    // remove less common url prefixes 
    // note: to avoid basically any chance of false-positive
    //       this is an intentionally high-false-negative pattern
    let match
    if (match = doi.match(/(https?:\/\/(?:\w+\.)+\w{1,4}\/(?:\w+\/+)+)(10\.\d{4,9}\/[-._;()\/:A-Z0-9]+)$/i)) {
        return match[2]
    }
    return doi
}
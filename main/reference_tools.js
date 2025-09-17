import { isValidUrl } from "./tools/is_valid_url.js"
import { toRepresentation } from './imports/good.js'
import { MultiSourceObject } from "./tools/multi_source_object.js"
import { isModernDoi, couldBeValidDoi, matchValidDoiSubstring, normalizeDoiString } from "./tools/doi_tools.js"

export const crushTitle = (title)=>title.toLowerCase().replace(/\W/," ").replace(/\s+/g," ").trim()

export function defaultReferencesAreEqualCheck(a, b) {
    const titlesMatch = crushTitle(a.title) == crushTitle(b.title)
    for (let each of ["doi","year"]) {
        if (a[each] && b[each] && a[each] != b[each]) {
            return false
        }
    }
    return titlesMatch
}
// common reference structure summary:
//    {string} paper.title - The title of the paper. THE ONLY REQUIRED FIELD.
//    {string} paper.doi - The DOI (Digital Object Identifier) of the paper.
//    {string} paper.abstract - A brief abstract or summary of the paper.
//    {Array<string>} paper.concepts - A list of concepts or keywords associated with the paper.
//    {number} paper.year - The year the paper was published.
//    {Array<string>} paper.authorNames - A list of the authors' names.
//    {string} paper.url - The URL to the paper's webpage.
//    {string} paper.pdfUrl - The URL to the PDF version of the paper.
//    {number} paper.citationCount - The number of times the paper has been cited.
//    {string} paper.id - A unique identifier for the paper.
//    {Array<Object>} paper.cites
//    {Array<Object>} paper.citedBy

export function coerceInsignificantEdgeCases(obj) {
    if (!(obj instanceof Object)) {
        return
    }
    if (obj instanceof Array) {
        return
    }

    // title
    if (typeof obj.title == "string") {
        // remove newlines, tabs, and carriage returns
        // remove leading and trailing whitespace
        obj.title = obj.title.replace(/\s+/g," ").trim()
    }
    
    // year
    if (typeof obj.year == "string") {
        obj.year = parseInt(obj.year)
    }
    
    // citationCount
    if (typeof obj.citationCount == "string") {
        obj.citationCount = parseInt(obj.citationCount)
    }

    // DOI
    if (typeof obj.doi == "string") {
        obj.doi = normalizeDoiString(obj.doi)
    }

    // authorNames
    if (obj.authorNames instanceof Array) {
        try {
            let index = -1
            for (let each of obj.authorNames) {
                index++
                obj.authorNames[index] = each.replace(/\s+/g," ").replace(/,\s*/g," ").trim()
            }
        } catch (error) {
            
        }
    }
    for (let each of ["url", "pdfUrl"]) {
        if (typeof obj[each] == "string") {
            // spaces are technically not allowed in URLs
            obj[each] = obj[each].replace(/ /g, encodeURIComponent(" "))
        }
    }

    if (obj.cites instanceof Array) {
        // remove any nulls or references with no title (does happen occasionally)
        // note1: this loop is complicated because I don't want to create a replacement array
        // this method should only mutate existing objects
        // note2: there's a more sophisticated way to do this loop, but this is simpler to validate
        while (obj.cites.some(each=>!each?.title)) {
            let index = -1
            for (let each of obj.cites) {
                index++
                if (!each?.title) {
                    obj.cites.splice(index,1)
                    break
                }
            }
        }
        for (let each of obj.cites) {
            coerceInsignificantEdgeCases(each)
        }
    }
}

export function reasonValueIsInvalidReferenceStructure(obj, {rejectNonModernDois=false, rejectCommasInAuthorNames=true}={}) {
    if (!obj instanceof Object) {
        return "Reference was not an object"
    }
    
    // wrong capitalization
    const commonAttributes = new Set(["title","abstract","doi","url","pdfUrl","authorNames","concepts","year","citationCount","id"])
    const commonAttributesLowercased = new Set([...commonAttributes].map(each=>each.toLowerCase()))
    for (const each of Object.keys(obj)) {
        if (!commonAttributes.has(each) && commonAttributesLowercased.has(each.toLowerCase())) {
            return `Wrong capitalization of attribute ${each} should be camelCase`
        }
    }

    // year is a number
    if (obj.year != null && typeof obj.year != "number") {
        return ".year needs to null or a number, but instead it was " + toRepresentation(obj.year)
    }
    // citationCount is a number
    if (obj.citationCount != null && typeof obj.citationCount != "number") {
        return ".citationCount needs to null or a number, but instead it was " + toRepresentation(obj.citationCount)
    }
    // id is a string
    if (obj.id != null && typeof obj.id != "string") {
        return ".id needs to null or a string, but instead it was " + toRepresentation(obj.id)
    }
    
    // title
    if (!(typeof obj.title == "string" && obj.title.length > 0)) {
        return ".title is not a non-empty string"
    }
    if (obj.title.replace(/\s/g," ") != obj.title) {
        return ".title is a string but contains newlines, tabs, or carriage returns (only spaces are allowed for whitespace)\n" + JSON.stringify(obj.title)
    }
    if (obj.title.match(/^\s+\S|\S\s+$/)) {
        return ".title is a string but has leading or trailing whitespace\n" + JSON.stringify(title)
    }

    // doi
    if (obj.doi != null && typeof obj.doi != "string") {
        return ".doi must be null or a string, instead it was\n" + toRepresentation(obj.doi)
    }
    if (typeof obj.doi == "string") {
        if (!couldBeValidDoi(obj.doi)) {
            let match
            if (match = matchValidDoiSubstring(obj.doi)) {
                return `.doi needs to be exactly a DOI, not a URL to a DOI. For example, its possible you meant ${JSON.stringify(match[0])} instead of ${JSON.stringify(obj.doi)}`
            }
            return ".doi was not a valid DOI, instead it was\n" + toRepresentation(obj.doi)
        }
        if (rejectNonModernDois && !isModernDoi(obj.doi)) {
            return ".doi matched an older style of DOI, but does not match the current standard of /10\\.\\d{4,9}\\/[-._;()\\/:A-Z0-9]+$/i, instead the DOI was\n" + toRepresentation(obj.doi)
        }
    }

    // url && pdfUrl
    for (let eachAttr of ["url", "pdfUrl"]) {
        if (obj[eachAttr] != null) {
            if (typeof obj[eachAttr] != "string" || obj[eachAttr].length == 0) {
                return `.${eachAttr} must be null or a non-empty string, instead it was\n${toRepresentation(obj[eachAttr])}`
            }
            if (!isValidUrl(obj[eachAttr])) {
                return `.${eachAttr} is not a valid URL, instead it was\n${toRepresentation(obj[eachAttr])}`
            }
        }
    }
    
    // authorNames 
    if (obj.authorNames) {
        if (!(obj.authorNames instanceof Array) || !obj.authorNames.every(each=>(typeof each == "string"||each.length==0))) {
            return ".authorNames must be an array of non-empty strings, should begin with their firstName (if available) with spaces between all subsequent names (no commas)\nInstead that we received" + toRepresentation(obj.authorNames)
        }
        if (rejectCommasInAuthorNames) {
            if (obj.authorNames.some(each=>each.match(/\t|,|\n|\r|\v/))) {
                return ".authorNames cannot contain commas or whitespace other than space (like tab or newline). Please use spaces to separate names. All other non-whitespace characters will be assumed to be part of the name"
            }
        }
    }

    // concepts not empty and not an array of strings
    if (obj.concepts != null && !(obj.concepts instanceof Array)) {
        return ".concepts is not an array, it is " + (typeof obj.concepts)
    }
    if (obj.concepts instanceof Array) {
        if (obj.concepts.length > 0 && !obj.concepts.every(each=>typeof each == "string")) {
            return ".concepts is not an array of strings"
        }
    }
    
    // JSONifyable
    try {
        JSON.stringify(obj)
    } catch (error) {
        return "Not JSONifiable"
    }

    for (let each of ["citedBy", "cites"]) {
        if (obj[each] == null) {
            continue
        }
        if (!(obj[each] instanceof Array)) {
            return `.${each} must be null or an array of objects that also follow the reference structure, instead it was\n${toRepresentation(obj[each])}`
        }
        let index = -1
        for (const eachRef of obj[each]) {
            index++
            let reason = reasonValueIsInvalidReferenceStructure(eachRef, {rejectNonModernDois, rejectCommasInAuthorNames})
            if (reason) {
                return `.${each} at index ${index} did not a valid reference structure because of ${reason}`
            }
        }
        
    }
    // all good
    return null
}
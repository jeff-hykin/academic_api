import { Cite } from "./cite_bundle.js"
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/indent.js'
import { escapeBibtexString } from "./from_bibtex.js"
import { toCamelCase } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/to_camel_case.js'

/**
 * Formats BibTeX citations with annotations in IEEE style.
 *
 * @param {string[]} bibtexList - Array of BibTeX entry strings.
 * @param {string[]} annotations - Array of annotation strings, same length as bibtexList.
 * @returns {string} - HTML string with formatted IEEE citations and annotations.
 */
function _formatCitationsWithAnnotations(bibtexList, annotations) {
    if (bibtexList.length !== annotations.length) {
        throw new Error("BibTeX list and annotation list must be of the same length.")
    }

    const formattedEntries = bibtexList.map((bibtex, index) => {
        const annotation = annotations[index]

        // Parse BibTeX and format in IEEE style as HTML
        const citation = new Cite(bibtex)

        // Extract the raw data to find the URL (if present)
        const entryData = citation.get({ type: "json" })[0]
        console.debug(`entryData is:`,entryData)
        const url = entryData.URL || entryData.url
        let doiMaybeAsUrl = entryData.DOI || entryData.doi
        console.debug(`doiMaybeAsUrl is:`,doiMaybeAsUrl)

        let formattedCitation = citation.format("bibliography", {
            format: "html",
            template: "ieee",
            lang: "en-US",
        })
        // fix DOI prefix duplication
        formattedCitation = formattedCitation.replace(/(https?:\/\/doi.org\/)(https:\/\/doi.org\/?)+/g,"$1")
        if (doiMaybeAsUrl) {
            if (!doiMaybeAsUrl.match(/^https?:/)) {
                doiMaybeAsUrl = `https://doi.org/${doiMaybeAsUrl}`
            }
        }

        // If there's a URL and it's not already in the citation string, add it
        if (url && !(formattedCitation.includes(url) || formattedCitation.includes(doiMaybeAsUrl))) {
            formattedCitation += ` <a href="${url}" target="_blank" rel="noopener noreferrer">[Link]</a>`
        } else {
            formattedCitation = formattedCitation.replace(url,`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`)
        }
        
        // If there's a URL and it's not already in the citation string, add it
        if (doiMaybeAsUrl && formattedCitation.includes(doiMaybeAsUrl)) {
            formattedCitation = formattedCitation.replace(doiMaybeAsUrl,`<a href="${doiMaybeAsUrl}" target="_blank" rel="noopener noreferrer">${doiMaybeAsUrl}</a>`)
        }

        return `
            <div class="citation-entry" style="margin-bottom: 1em;">
                <div class="citation">\n${indent({string: formattedCitation, by: "                    "})}
                </div>
                <div class="annotation" style="margin-top: 0.5em; font-style: italic;">\n${indent({string:annotation, by: "                    "})}
                </div>
            </div>
        `
    })

    return formattedEntries.join("\n")
}



/**
 * Wraps formatted citations and annotations in a full HTML document with styling.
 *
 * @param {string[]} bibtexList - Array of BibTeX entry strings.
 * @param {string[]} annotations - Array of annotation strings, same length as bibtexList.
 * @returns {string} - Full HTML document string.
 */
export function _generateCitationHtmlPage(bibtexList, annotations) {
    const contentHtml = _formatCitationsWithAnnotations(bibtexList, annotations)

    const html = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Citations with Annotations</title>
        <style>
            body {
                font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                margin: 2rem;
                padding: 0;
                background-color: #fdfdfd;
                color: #333;
                line-height: 1.6;
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
            }

            .citation-entry {
                border-bottom: 1px solid #ddd;
                padding-bottom: 1em;
                margin-bottom: 1.5em;
            }

            .citation {
                font-size: 1rem;
            }

            .annotation {
                margin-top: 0.5em;
                font-style: italic;
                color: #555;
            }

            @media (max-width: 600px) {
                body {
                    margin: 1rem;
                    font-size: 0.95rem;
                }
            }
        </style>
    </head>
    <body>
        <h1>Citations with Annotations</h1>
        ${contentHtml}
    </body>
</html>
`

    return html
}

export function referencesToAnnotatedBib(references) {
    const annotatedRefs = referencesToAnnotatedBib.filter(each=>each.notes.annotation)
    const annotations = []
    const bibtexList = []
    for (let each of annotatedRefs) {
        // 
        // makeshift bibtex
        // 
        if (!each.bibtex) {
            console.warn(`No bibtex for ${each.title}, creating a makeshift one`)
            let authorLastName = ""
            let author
            if (each.authorNames instanceof Array) {
                authorLastName = each.authorNames[0].replace(/\W/," ").replace(/\s+/g," ").trim().split(/\s+/g).at(-1) + "_"
                author = escapeBibtexString(each.authorNames.join(" and "))
            }
            let yearString
            if (each.year) {
                yearString = `_${year}`
            }

            const id = authorLastName+toCamelCase(each.title.split(/\s+/g).slice(0,4).join("_"))+`_id${Math.random().toString().slice(2).slice(0,5)}`+yearString
            let stringChunks = [
                `@article {${id}\n    title = {${escapeBibtexString(each.title)}\n`,
            ]
            if (each.doi) {
                stringChunks.push(`    doi = {${each.doi}}\n`)
            }
            if (author) {
                stringChunks.push(`    author = {${author}}\n`)
            }
            if (each.year) {
                stringChunks.push(`    year = {${each.year}}\n`)
            }
            if (each.url) {
                stringChunks.push(`    url = {${each.url}}\n`)
            }
            if (each.keywords) {
                if (each.keywords instanceof Array) {
                    stringChunks.push(`    keywords = {${escapeBibtexString(each.keywords.join(", "))}}\n`)
                // shouldn't happen, but just in case
                } else if (typeof each.keywords == "string") {
                    stringChunks.push(`    keywords = {${escapeBibtexString(each.keywords)}}\n`)
                }
            }
            stringChunks.push("}\n")

            bibtexList.push(stringChunks.join(""))
            continue
        }
        annotations.push(each.notes.annotation)
    }
    return _generateCitationHtmlPage(bibtexList, annotations)
}
import { coerceInsignificantEdgeCases } from "../../reference_tools.js"
import { normalizeDoiString, couldBeValidDoi } from "../../tools/doi_tools.js"
import { urlToDoiMaybe } from "../../tools/doi_tools.js"

export function toReferenceStructure(openAlexObject) {
    const url = openAlexObject.primary_location?.landing_page_url || (openAlexObject.locations||[]).map(openAlexObject=>openAlexObject.landing_page_url).filter(openAlexObject=>openAlexObject)[0]
    const pdfUrl = openAlexObject.primary_location?.pdf_url || (openAlexObject.locations||[]).map(openAlexObject=>openAlexObject.pdf_url).filter(openAlexObject=>openAlexObject)[0]
    
    let doi = openAlexObject.doi
    if (!doi) {
        if (openAlexObject?.external_id) {
            const doiFromUrl = normalizeDoiString(openAlexObject.external_id)
            if (couldBeValidDoi(doiFromUrl)) {
                doi = doiFromUrl
            }
        }
        // sometimes the doi can be derived from the url
        doi = doi || urlToDoiMaybe(url) || urlToDoiMaybe(pdfUrl)
    }

    const output = {
        doi,
        title: openAlexObject.title || openAlexObject.display_name,
        abstract: openAlexObject.abstract&&openAlexObject.abstract.replace(/<\/?jats:\w+>/g,"").trim().replace(/^Abstract\b/i,"").trim(),
        concepts: [
            ...new Set([ 
                ...(openAlexObject.topics||[]).map(openAlexObject=>openAlexObject.display_name),
                ...(openAlexObject.topics||[]).map(openAlexObject=>openAlexObject.subfield?.display_name),
                ...(openAlexObject.keywords||[]).map(openAlexObject=>openAlexObject.display_name),
                ...(openAlexObject.concepts||[]).map(openAlexObject=>openAlexObject.display_name) 
            ].filter(openAlexObject=>openAlexObject).map(openAlexObject=>openAlexObject.toLowerCase()))
        ],
        year: openAlexObject.publication_year || openAlexObject.created_date,
        authorNames: (openAlexObject.authorships||[]).map(openAlexObject=>openAlexObject.author.display_name),
        url,
        pdfUrl: openAlexObject.primary_location?.pdf_url || (openAlexObject.locations||[]).map(openAlexObject=>openAlexObject.pdf_url).filter(openAlexObject=>openAlexObject)[0],
        citationCount: openAlexObject?.cited_by_count || (openAlexObject.counts_by_year||[]).map(openAlexObject=>openAlexObject.cited_by_count).reduce((a,b)=>(a-0)+(b-0),0),
        // citedAlexIds: openAlexObject.referenced_works,
        // relatedAlexIds: openAlexObject.related_works,
        id: openAlexObject.id.replace(/^https:\/\/openalex\.org\//,""),
    }
    coerceInsignificantEdgeCases(output)
    return output
}
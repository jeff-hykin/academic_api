import { coerceInsignificantEdgeCases } from "../../reference.js"

export function toReferenceStructure(openAlexObject) {
    return coerceInsignificantEdgeCases({
        doi: openAlexObject.doi,
        title: openAlexObject.title,
        abstract: openAlexObject.abstract,
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
        url: openAlexObject.primary_location?.landing_page_url || (openAlexObject.locations||[]).map(openAlexObject=>openAlexObject.landing_page_url).filter(openAlexObject=>openAlexObject)[0],
        pdfUrl: openAlexObject.primary_location?.pdf_url || (openAlexObject.locations||[]).map(openAlexObject=>openAlexObject.pdf_url).filter(openAlexObject=>openAlexObject)[0],
        citationCount: (openAlexObject.counts_by_year||[]).map(openAlexObject=>openAlexObject.cited_by_count).reduce((a,b)=>(a-0)+(b-0),0),
        // citedAlexIds: openAlexObject.referenced_works,
        // relatedAlexIds: openAlexObject.related_works,
        id: openAlexObject.id.replace(/^https:\/\/openalex\.org\//,""),
    })
}
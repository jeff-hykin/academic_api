import { coerceInsignificantEdgeCases } from "../../reference.js"

export function toReferenceStructure(crossrefData) {
    return coerceInsignificantEdgeCases({
        "doi": crossrefData.DOI,
        "title": (crossrefData.title||[]).at(-1) || (crossrefData["short-title"]||[]).at(-1),
        "abstract": (crossrefData.abstract||"")?.replace(/<\/?jats:\w+>/g,"").trim().replace(/^Abstract\b/i,"").trim(),
        "year": crossrefData?.published?.["date-parts"]?.[0]?.[0] || crossrefData?.issued?.["date-parts"]?.[0]?.[0] || crossrefData?.indexed?.["date-parts"]?.[0]?.[0],
        "authorNames": crossrefData.author.map(author => author.given + " " + author.family),
        "url": crossrefData.URL,
        "pdfUrl": (crossrefData.link||[])?.filter(each=>each.contentType=="application/pdf").map(each=>each.URL)[0],
        "citationCount": crossrefData["is-referenced-by-count"]-0,
        "citedDois": (crossrefData.reference||[]).map(each=>each.DOI).filter(each=>each),
    })
}
import { coerceInsignificantEdgeCases } from "../../reference.js"
import { urlToDoiMaybe } from "../../tools/doi_tools.js"

export function toReferenceStructure(crossrefData) {
    const url = crossrefData.URL
    const pdfUrl = (crossrefData.link||[])?.filter(each=>each.contentType=="application/pdf").map(each=>each.URL)[0]
    const output = {
        "doi": crossrefData.DOI || urlToDoiMaybe(url) || urlToDoiMaybe(pdfUrl),
        "title": (crossrefData.title||[]).at(-1) || (crossrefData["short-title"]||[]).at(-1),
        "abstract": (crossrefData.abstract||"")?.replace(/<\/?jats:\w+>/g,"").trim().replace(/^Abstract\b/i,"").trim(),
        "year": crossrefData?.published?.["date-parts"]?.[0]?.[0] || crossrefData?.issued?.["date-parts"]?.[0]?.[0] || crossrefData?.indexed?.["date-parts"]?.[0]?.[0],
        "authorNames": crossrefData.author.map(author => author.given + " " + author.family),
        url,
        pdfUrl,
        "citationCount": crossrefData["is-referenced-by-count"]-0,
        "citedDois": (crossrefData.reference||[]).map(each=>each.DOI).filter(each=>each),
    }
    coerceInsignificantEdgeCases(output)
    return output
}
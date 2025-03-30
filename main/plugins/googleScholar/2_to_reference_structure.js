import { coerceInsignificantEdgeCases } from "../../reference.js"
import { urlToDoiMaybe } from "../../tools/doi_tools.js"

export function toReferenceStructure(obj) {
    // the search output is already converted for google scholar in particular
    coerceInsignificantEdgeCases(obj)
    const { doi, title, authorNames, url, pdfUrl } = obj
    // backfill doi in some cases
    obj.doi = doi || urlToDoiMaybe(url) || urlToDoiMaybe(pdfUrl)
    return obj
}
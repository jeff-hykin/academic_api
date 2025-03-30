import { openAlexDataFromDoi, getLinkedOpenAlexArticles, openAlexFetch } from "./1_fetchers.js"
import { toReferenceStructure } from "./2_to_reference_structure.js"

// FIXME:
export async function search(query) {
    throw Error(`not implemented`)
    // TODO: implement
    return []
}

export async function getConnectedPapers(refDataAccordingToOpenAlex, reference) {
    // if we don't have the openAlexId, try to get it based on the doi
    let openAlexId = refDataAccordingToOpenAlex.id
    if (!openAlexId) {
        if (reference.doi) {
            refDataAccordingToOpenAlex = {...await openAlexDataFromDoi(reference.doi)}
        }
    }

    // get conntected papers
    openAlexId = refDataAccordingToOpenAlex.id
    if (openAlexId) {
        const {cites, citedBy} = await getLinkedOpenAlexArticles(openAlexId)
        refDataAccordingToOpenAlex.cites = cites.map(toReferenceStructure)
        refDataAccordingToOpenAlex.citedBy = citedBy.map(toReferenceStructure)
        return [...refDataAccordingToOpenAlex.cites, ...refDataAccordingToOpenAlex.citedBy]
    }
    // on fail, intentionally return null
}

// this is the only required export
export default {
    name: "openAlex",
    search,
    getConnectedPapers,
}
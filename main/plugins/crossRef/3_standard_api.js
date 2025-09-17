import { crossRefDataFromDoi, getLinkedCrossRefArticles, crossRefSearch, dataForDois, crossRefBibtexFromDoi } from "./1_fetchers.js"
import { toReferenceStructure } from "./2_to_reference_structure.js"

export const search = crossRefSearch

export async function getConnectedReferences(refDataAccordingToThisPlugin, reference) {
    let doi = refDataAccordingToThisPlugin.doi || reference.doi
    if (doi) {
        const {cites} = await getLinkedCrossRefArticles(doi)
        return cites.map(toReferenceStructure)
    }
    // on fail, return null
}

export function getDataForDois(dois) {
    return dataForDois(dois).then(results=>results.map(toReferenceStructure))
}

export function getBibtexForDois(dois) {
    // NOTE: sadly I don't think there is a way to get the bibtex for multiple DOIs at once (crossref limitation 2025)
    return Promise.all(dois.map(each=>crossRefBibtexFromDoi(each)))
}

// this is the only required export
export default {
    search,
    getConnectedReferences,
    getDataForDois,
    getBibtexForDois, // optional
}
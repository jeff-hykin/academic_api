import { crossRefDataFromDoi, getLinkedCrossRefArticles } from "./1_fetchers.js"
import { toReferenceStructure } from "./2_to_reference_structure.js"

// no search function
// export async function search(query) {
//     return []
// }

export async function getConnectedPapers(refDataAccordingToThisPlugin, reference) {
    let doi = refDataAccordingToThisPlugin.doi || reference.doi
    if (doi) {
        const {cites} = await getLinkedCrossRefArticles(doi)
        return cites.map(toReferenceStructure)
    }
    // on fail, return null
}

// this is the only required export
export default {
    name: "crossRef",
    getConnectedPapers,
}
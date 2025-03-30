import { queryToListOfResults } from "./1_fetchers.js"
import { toReferenceStructure } from "./2_to_reference_structure.js"

export async function search(query) {
    return queryToListOfResults(query)
}

// export async function getConnectedReferences(refDataAccordingToThisPlugin, reference) {
// }

// this is the only required export
export default {
    name: "googleScholar",
    search,
    // getConnectedReferences,
}
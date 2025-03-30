import { coerceInsignificantEdgeCases } from "../../reference.js"

export function toReferenceStructure(obj) {
    // the search output is already converted for google scholar in particular
    return coerceInsignificantEdgeCases(obj)
}
import { ReferenceSystem } from "./reference_system.js"
import plugins from "./all_plugins.js"

export { ReferenceSystem }
export const { Reference, search, loadReferences, getReferences, } = ReferenceSystem({
    plugins,
})
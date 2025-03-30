import { ReferenceSystem } from "./reference_system.js"
import openAlex from "./plugins/openAlex/3_standard_api.js"
import crossRef from "./plugins/crossRef/3_standard_api.js"

export const { Reference, search } = ReferenceSystem({
    plugins: {
        // NOTE: order matters
        crossRef,
        openAlex,
    },
})
# What is this?

This is an API for getting information about published works.

# How do I use it?


### Basic Search

```js
import { Reference, search, loadReferences, getReferences } from 'https://esm.sh/gh/jeff-hykin/academic_api/main/main.js'

// searches google scholar, crossref, and open alex, and combines the results into 1 object per reference
// (you can also add plugins to search other sources)
const { results, warnings } = await search("graph hashing")
results[0].title

for (const each of results) {
    // each is a Reference object
    console.log(each.title)
    console.log(each.doi)
    console.log(each.authorNames)
    const { connectedPapers, warnings } = await each.fillConnections() // gets citedBy, cites, and other related papers
    //    {string} paper.title - The title of the paper. 
            // ^^^^^^^ THE ONLY GUARENTEED FIELD
    //    {string} paper.doi - The DOI (Digital Object Identifier) of the paper.
    //    {string} paper.url - The URL to the paper's webpage.
    //    {string} paper.pdfUrl - The URL to the PDF version of the paper.
    //    {Array<string>} paper.authorNames - A list of the authors' names (first name, last name space separated).
    //    {Array<string>} paper.concepts - A list of concepts or keywords associated with the paper.
    //    {number} paper.year - The year the paper was published.
    //    {Array<Object>} paper.citedBy - Older references (cited by this paper)
    //    {Array<Object>} paper.cites - Newer references (that cite this paper)
    //    {number} paper.citationCount - The number of times the paper has been cited.
    //    {string} paper.abstract - A brief abstract or summary of the paper.
    //    {string} paper.id - A unique identifier for the paper.(different across openAlex, crossRef, and googleScholar)
    console.log(each.citedBy.length)
    console.log(each.cites.length)
    console.log(each.$accordingTo.openAlex)
    console.log(each.$accordingTo.crossRef)
    console.log(each.$accordingTo.googleScholar)
}
```

### Save and Load

```js
import { Reference, search, loadReferences, getReferences } from 'https://esm.sh/gh/jeff-hyking/academic_api/main/main.js'
import * as yaml from "https://deno.land/std@0.168.0/encoding/yaml.ts"

// 
// load
// 
loadReferences(
    yaml.parse(
        Deno.readTextFileSync("references.yaml")
    )
)

// 
// use/modify
// 
const references = getReferences()
// get the abstract, cited works, etc
await references.fillCoreData()
console.debug(`references[0].title is:`,references[0].title)

// 
// save
// 
Deno.writeTextFileSync(
    "references.yaml",
    yaml.stringify(
        getReferences()
    )
)
```


## Plugins

```js
import { Reference, search } from 'https://esm.sh/gh/jeff-hyking/academic_api/main/reference_system.js'
import openAlex from "./plugins/openAlex/3_standard_api.js"
import crossRef from "./plugins/crossRef/3_standard_api.js"
import googleScholar from "./plugins/googleScholar/3_standard_api.js"

const yourPlugin = {
    // each of these functions is optinal (e.g. googleScholar only implements search)
    search: async (query) => {
        // throwing is fine, it'll get reported in warnings
        const exampleResult = {
            title: "my new title",
            doi: "10.1000/182",
            url: "https://www.google.com",
            pdfUrl: "https://www.google.com",
            authorNames: ["my name"],
            concepts: ["my concept"],
            year: 2022,
            citedBy: [],
            cites: [],
            citationCount: 0,
            abstract: "my abstract",
        }
        return [
            exampleResult,
        ]
    },
    getConnectedReferences: async (dataAccordingToThisPlugin, reference) => {
        // dataAccordingToThisPlugin is a simple/flat object,
        // basically the same object that is returned by search
        
        // reference is more complex
        reference.title // the title from one of the sources, unknown which
        reference.$accordingTo["googleScholar"]?.title // the title from googleScholar
        reference.$accordingTo["openAlex"]?.title 
        reference.$accordingTo["crossRef"]?.title 
        // note: most references will only have data from one source
        // the DOI is used to combine sources
        const exampleResult = {
            title: "my new title",
            doi: "10.1000/182",
            url: "https://www.google.com",
            pdfUrl: "https://www.google.com",
            authorNames: ["my name"],
            concepts: ["my concept"],
            year: 2022,
            citedBy: [],
            cites: [],
            citationCount: 0,
            abstract: "my abstract",
        }
        return [
            exampleResult,
        ]
    },
}

export const { Reference, search } = ReferenceSystem({
    plugins: {
        // NOTE: order matters higher=more reliable data/scraper
        openAlex,
        crossRef,
        googleScholar,
    },
})
```
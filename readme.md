```js
import { Reference, search } from 'https://esm.sh/gh/jeff-hyking/academic_api/main/main.js'

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
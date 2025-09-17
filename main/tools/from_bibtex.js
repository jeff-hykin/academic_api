// import { Cite } from 'https://esm.sh/citation-js@0.7.20'
import { parse } from './cite_bundle.js'
import { indent } from 'https://esm.sh/gh/jeff-hykin/good-js@1.18.2.0/source/flattened/indent.js'

// import * as a from 'https://esm.sh/@citation-js/plugin-bibtex@0.7.18'

/**
 * convert a bibtex string to a reference structure
 *
 * @example
 * ```js
 * // Your BibTeX data
 * var bibtex = `
 * @article{smith2020deep,
 *   title={Deep learning for citation parsing},
 *   author={Smith, John and Doe, Jane},
 *   journal={Journal of Citation Studies},
 *   volume={10},
 *   number={2},
 *   pages={123-145},
 *   year={2020},
 *   publisher={Citation Press}
 * }
 * @article{smith2021deep,
 *   title={Deep learning for citation parsing},
 *   author={Smith, John and Doe, Jane},
 *   journal={Journal of Citation Studies},
 *   volume={10},
 *   number={2},
 *   pages={123-145},
 *   year={2021},
 *   publisher={Citation Press}
 * }
 * `
 * const refStructure = bibtexToRefs(bibtex)
 * import Yaml from 'https://esm.sh/yaml@2.4.3'
 * Deno.writeTextFileSync(
 *     "references.yaml",
 *     Yaml.stringify(
 *         refStructure
 *     )
 * )
 * ```
 */
export function bibtexToRefStructure(bibtex, { source="unknown" } = {}) {
    const array = parse.bibtex.text(bibtex)
    const texts = bibtex.split(/^\s*(?=@)/gm).filter(each=>each.startsWith("@"))
    if (texts.length != array.length) {
        throw new Error(`bibtex content:${indent({string: bibtex})}\n\nThis is a problem with academic api library: when importing a bibtex file I try to match the parsed-data with the bibtex entry, but I got ${texts.length} entries, but the parsed data has ${array.length} entries. Bibtex data above`)
    }
    // [
    //     {
    //         type: "article",
    //         label: "smith2020deep",
    //         properties: {
    //         title: "Deep learning for citation parsing",
    //         author: "Smith, John and Doe, Jane",
    //         journal: "Journal of Citation Studies",
    //         volume: "10",
    //         number: "2",
    //         pages: "123-145",
    //         year: "2020",
    //         publisher: "Citation Press"
    //         }
    //     },
    //     {
    //         type: "article",
    //         label: "smith2021deep",
    //         properties: {
    //         title: "Deep learning for citation parsing",
    //         author: "Smith, John and Doe, Jane",
    //         journal: "Journal of Citation Studies",
    //         volume: "10",
    //         number: "2",
    //         pages: "123-145",
    //         year: "2021",
    //         publisher: "Citation Press"
    //         }
    //     }
    // ]
    return array.map(each=>{
        each.properties.type = each.type
        each.properties.label = each.label
        each = each.properties
        if (typeof each.year == "string" && each.year.match(/^\d{4}$/)) {
            each.year = parseInt(each.year)
        }
        if (each.author) {
            each.authorNames = each.author.split(" and ")
        }
        return {
            $accordingTo: {
                [source]: each,
            },
        }
    })
}


// import { parseBibFile } from "https://esm.sh/bibtex@0.9.0"


// export function fromBibtex(bibtex) {
//     const bibFile = parseBibFile(bibtex)
//     return bibFile
// }

// import { parseBibFile } from "https://esm.sh/@citation-js/plugin-bibtex"



// const bibFile = parseBibFile(`
 
// @InProceedings{mut2011,
//   author    = {Pradeep Muthukrishnan and Dragomir Radev and Qiaozhu Mei},
//   title     = {Simultaneous Similarity Learning and Feature-Weight Learning for Document Clustering},
//   booktitle = {Proceedings of TextGraphs-6: Graph-based Methods for Natural Language Processing},
//   month     = {June},
//   year      = {2011},
//   address   = {Portland, Oregon},
//   publisher = {Association for Computational Linguistics},
//   url       = {http://www.aclweb.org/anthology/W11-1107},
//   pages = {42--50}
// }
// `);

// for (let e of k) {
//     console.log(e)
// }
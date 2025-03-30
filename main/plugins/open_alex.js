import { createCachedJsonFetcher } from "../tools/fetch_tools.js"
import { normalizeDoiString } from "../tools/doi_tools.js"
import { toRepresentation } from '../imports/good.js'


export const openAlexFetch = createCachedJsonFetcher({
    rateLimit: 1000, // according to their website openAlex rate limit is once per second, and 1000 per day
    urlNormalizer: url=>url.replace("https://openalex.org","https://api.openalex.org"),
}) 

export function openAlexDataFromDoi(doi) {
    if (typeof doi != "string") {
        throw Error(`openAlexDataFromDoi(doi), doi arg was not a string: ${toRepresentation(doi)}`)
    }
    doi = normalizeDoiString(doi)
    // {
    //     id: "https://openalex.org/W4383108856",
    //     doi: "https://doi.org/10.1109/icra48891.2023.10161288",
    //     title: "Visual Affordance Prediction for Guiding Robot Exploration",
    //     display_name: "Visual Affordance Prediction for Guiding Robot Exploration",
    //     publication_year: 2023,
    //     publication_date: "2023-05-29",
    //     ids: { openalex: "https://openalex.org/W4383108856", doi: "https://doi.org/10.1109/icra48891.2023.10161288" },
    //     language: "en",
    //     primary_location: { is_oa: false, landing_page_url: "https://doi.org/10.1109/icra48891.2023.10161288", pdf_url: null, source: null, license: null, license_id: null, version: null, is_accepted: false, is_published: false },
    //     type: "article",
    //     type_crossref: "proceedings-article",
    //     indexed_in: ["crossref"],
    //     open_access: { is_oa: true, oa_status: "green", oa_url: "https://arxiv.org/pdf/2305.17783", any_repository_has_fulltext: true },
    //     authorships: [
    //         { author_position: "first", author: { id: "https://openalex.org/A5064794691", display_name: "Homanga Bharadhwaj", orcid: "https://orcid.org/0000-0001-5056-8516" }, institutions: [{ id: "https://openalex.org/I74973139", display_name: "Carnegie Mellon University", ror: "https://ror.org/05x2bcf33", country_code: "US", type: "education", lineage: [Array] }], countries: ["US"], is_corresponding: false, raw_author_name: "Homanga Bharadhwaj", raw_affiliation_strings: ["Robotics Institute, Carnegie Mellon University"], affiliations: [{ raw_affiliation_string: "Robotics Institute, Carnegie Mellon University", institution_ids: [Array] }] },
    //         { author_position: "middle", author: { id: "https://openalex.org/A5101761266", display_name: "Abhinav Gupta", orcid: "https://orcid.org/0000-0002-3646-2421" }, institutions: [{ id: "https://openalex.org/I74973139", display_name: "Carnegie Mellon University", ror: "https://ror.org/05x2bcf33", country_code: "US", type: "education", lineage: [Array] }], countries: ["US"], is_corresponding: false, raw_author_name: "Abhinav Gupta", raw_affiliation_strings: ["Robotics Institute, Carnegie Mellon University"], affiliations: [{ raw_affiliation_string: "Robotics Institute, Carnegie Mellon University", institution_ids: [Array] }] },
    //         { author_position: "last", author: { id: "https://openalex.org/A5029932788", display_name: "Shubham Tulsiani", orcid: "https://orcid.org/0000-0001-5651-9424" }, institutions: [{ id: "https://openalex.org/I74973139", display_name: "Carnegie Mellon University", ror: "https://ror.org/05x2bcf33", country_code: "US", type: "education", lineage: [Array] }], countries: ["US"], is_corresponding: false, raw_author_name: "Shubham Tulsiani", raw_affiliation_strings: ["Robotics Institute, Carnegie Mellon University"], affiliations: [{ raw_affiliation_string: "Robotics Institute, Carnegie Mellon University", institution_ids: [Array] }] },
    //     ],
    //     institution_assertions: [],
    //     countries_distinct_count: 1,
    //     institutions_distinct_count: 1,
    //     corresponding_author_ids: [],
    //     corresponding_institution_ids: [],
    //     apc_list: null,
    //     apc_paid: null,
    //     fwci: 3.366,
    //     has_fulltext: false,
    //     cited_by_count: 8,
    //     citation_normalized_percentile: { value: 0.620722, is_in_top_1_percent: false, is_in_top_10_percent: false },
    //     cited_by_percentile_year: { min: 94, max: 95 },
    //     biblio: { volume: null, issue: null, first_page: "3029", last_page: "3036" },
    //     is_retracted: false,
    //     is_paratext: false,
    //     primary_topic: { id: "https://openalex.org/T10653", display_name: "Robot Manipulation and Learning", score: 0.9985, subfield: { id: "https://openalex.org/subfields/2207", display_name: "Control and Systems Engineering" }, field: { id: "https://openalex.org/fields/22", display_name: "Engineering" }, domain: { id: "https://openalex.org/domains/3", display_name: "Physical Sciences" } },
    //     topics: [
    //         { id: "https://openalex.org/T10653", display_name: "Robot Manipulation and Learning", score: 0.9985, subfield: { id: "https://openalex.org/subfields/2207", display_name: "Control and Systems Engineering" }, field: { id: "https://openalex.org/fields/22", display_name: "Engineering" }, domain: { id: "https://openalex.org/domains/3", display_name: "Physical Sciences" } },
    //         { id: "https://openalex.org/T10531", display_name: "Advanced Vision and Imaging", score: 0.9978, subfield: { id: "https://openalex.org/subfields/1707", display_name: "Computer Vision and Pattern Recognition" }, field: { id: "https://openalex.org/fields/17", display_name: "Computer Science" }, domain: { id: "https://openalex.org/domains/3", display_name: "Physical Sciences" } },
    //         { id: "https://openalex.org/T12549", display_name: "Image and Object Detection Techniques", score: 0.9897, subfield: { id: "https://openalex.org/subfields/1707", display_name: "Computer Vision and Pattern Recognition" }, field: { id: "https://openalex.org/fields/17", display_name: "Computer Science" }, domain: { id: "https://openalex.org/domains/3", display_name: "Physical Sciences" } },
    //     ],
    //     keywords: [{ id: "https://openalex.org/keywords/affordance", display_name: "Affordance", score: 0.94692224 }],
    //     concepts: [
    //         { id: "https://openalex.org/C194995250", wikidata: "https://www.wikidata.org/wiki/Q531136", display_name: "Affordance", level: 2, score: 0.94692224 },
    //         { id: "https://openalex.org/C41008148", wikidata: "https://www.wikidata.org/wiki/Q21198", display_name: "Computer science", level: 0, score: 0.6867339 },
    //         { id: "https://openalex.org/C90509273", wikidata: "https://www.wikidata.org/wiki/Q11012", display_name: "Robot", level: 2, score: 0.6247663 },
    //         { id: "https://openalex.org/C107457646", wikidata: "https://www.wikidata.org/wiki/Q207434", display_name: "Human–computer interaction", level: 1, score: 0.59470433 },
    //         { id: "https://openalex.org/C154945302", wikidata: "https://www.wikidata.org/wiki/Q11660", display_name: "Artificial intelligence", level: 1, score: 0.49061385 },
    //     ],
    //     mesh: [],
    //     locations_count: 2,
    //     locations: [
    //         { is_oa: false, landing_page_url: "https://doi.org/10.1109/icra48891.2023.10161288", pdf_url: null, source: null, license: null, license_id: null, version: null, is_accepted: false, is_published: false },
    //         { is_oa: true, landing_page_url: "https://arxiv.org/abs/2305.17783", pdf_url: "https://arxiv.org/pdf/2305.17783", source: { id: "https://openalex.org/S4306400194", display_name: "arXiv (Cornell University)", issn_l: null, issn: null, is_oa: true, is_in_doaj: false, is_core: false, host_organization: "https://openalex.org/I205783295", host_organization_name: "Cornell University", host_organization_lineage: ["https://openalex.org/I205783295"], host_organization_lineage_names: ["Cornell University"], type: "repository" }, license: null, license_id: null, version: "submittedVersion", is_accepted: false, is_published: false },
    //     ],
    //     best_oa_location: { is_oa: true, landing_page_url: "https://arxiv.org/abs/2305.17783", pdf_url: "https://arxiv.org/pdf/2305.17783", source: { id: "https://openalex.org/S4306400194", display_name: "arXiv (Cornell University)", issn_l: null, issn: null, is_oa: true, is_in_doaj: false, is_core: false, host_organization: "https://openalex.org/I205783295", host_organization_name: "Cornell University", host_organization_lineage: ["https://openalex.org/I205783295"], host_organization_lineage_names: ["Cornell University"], type: "repository" }, license: null, license_id: null, version: "submittedVersion", is_accepted: false, is_published: false },
    //     sustainable_development_goals: [],
    //     grants: [],
    //     datasets: [],
    //     versions: [],
    //     referenced_works_count: 43,
    //     referenced_works: ["https://openalex.org/W1524842461", "https://openalex.org/W1933657216", "https://openalex.org/W1960578971", "https://openalex.org/W2032293070", "https://openalex.org/W2188365844", "https://openalex.org/W2201912979", "https://openalex.org/W2612034718", "https://openalex.org/W2625366777", "https://openalex.org/W2823112946", "https://openalex.org/W2895453875", "https://openalex.org/W2908390575", "https://openalex.org/W2952716587", "https://openalex.org/W2953469440", "https://openalex.org/W2962770929", "https://openalex.org/W2962785568", "https://openalex.org/W2962793481", "https://openalex.org/W2962793652", "https://openalex.org/W2963049618", "https://openalex.org/W2963073614", "https://openalex.org/W2963523627", "https://openalex.org/W2963799213", "https://openalex.org/W2964067469", "https://openalex.org/W2980216391", "https://openalex.org/W2983465317", "https://openalex.org/W3003651690", "https://openalex.org/W3006227479", "https://openalex.org/W3032077725", "https://openalex.org/W3034445277", "https://openalex.org/W3035574324", "https://openalex.org/W3035622854", "https://openalex.org/W3035717769", "https://openalex.org/W3089793705", "https://openalex.org/W3104898494", "https://openalex.org/W3120441392", "https://openalex.org/W3180355996", "https://openalex.org/W3207837114", "https://openalex.org/W3207908209", "https://openalex.org/W4287251598", "https://openalex.org/W4287686848", "https://openalex.org/W4287994983", "https://openalex.org/W4288349972", "https://openalex.org/W4300799055", "https://openalex.org/W4301206121"],
    //     related_works: ["https://openalex.org/W4391375266", "https://openalex.org/W3089455568", "https://openalex.org/W3049116993", "https://openalex.org/W2899084033", "https://openalex.org/W2748952813", "https://openalex.org/W2417026147", "https://openalex.org/W2346831895", "https://openalex.org/W2248634132", "https://openalex.org/W1972718289", "https://openalex.org/W1791514435"],
    //     abstract_inverted_index: { Motivated: [0], by: [1], the: [2, 8, 14, 66, 85, 105, 115, 120, 125, 130], intuitive: [3], understanding: [4, 22], humans: [5], have: [6], about: [7], space: [9, 67], of: [10, 39, 68, 124], possible: [11], "interactions,": [12], and: [13, 74, 99, 103, 122, 127], ease: [15], with: [16, 56, 71], which: [17], they: [18], can: [19, 51, 94, 134], generalize: [20], this: [21], to: [23, 79, 111], previously: [24], unseen: [25], "scenes,": [26], we: [27, 42, 64], develop: [28], an: [29, 36], approach: [30], for: [31, 137], learning: [32, 144], "'visual": [33], "affordances'.": [34], Given: [35], input: [37], image: [38], a: [40, 44, 72, 76, 81], "scene,": [41], infer: [43], distribution: [45, 83], over: [46], plausible: [47, 62], future: [48], states: [49], that: [50, 91, 104], be: [52, 95, 135], achieved: [53], via: [54], interactions: [55], "it.": [57], To: [58], allow: [59], predicting: [60], diverse: [61, 100, 112], "futures,": [63], discretize: [65], continuous: [69], images: [70], "VQ-VAE": [73], use: [75], "Transformer-based": [77], model: [78, 133], learn: [80], conditional: [82], in: [84, 145], latent: [86], embedding: [87], "space.": [88], We: [89, 118], show: [90], these: [92], models: [93, 107], trained: [96, 131], using: [97], "large-scale": [98], passive: [101], "data,": [102], learned: [106], exhibit: [108], compositional: [109], generalization: [110], objects: [113], beyond: [114], training: [116], "distribution.": [117], evaluate: [119], quality: [121], diversity: [123], "generations,": [126], demonstrate: [128], how: [129], affordance: [132], used: [136], guiding: [138], exploration: [139], during: [140], visual: [141], "goal-conditioned": [142], policy: [143], robotic: [146], "manipulation.": [147] },
    //     cited_by_api_url: "https://api.openalex.org/works?filter=cites:W4383108856",
    //     counts_by_year: [{ year: 2024, cited_by_count: 8 }],
    //     updated_date: "2024-12-13T13:55:24.466451",
    //     created_date: "2023-07-05",
    // }
    return openAlexFetch(`https://api.openalex.org/works/https://doi.org/${doi}`)
}

export async function getLinkedOpenAlexArticles(openAlexId) {
    if (typeof openAlexId != "string") {
        throw Error(`getLinkedOpenAlexArticles(openAlexId), openAlexId arg was not a string: ${toRepresentation(openAlexId)}`)
    }
    // {
    //     "meta": {
    //         "count": 83,
    //         "db_response_time_ms": 193,
    //         "page": 1,
    //         "per_page": 25,
    //         "groups_count": null
    //     },
    //     "results": [
    //         {
    //             "id": "https://openalex.org/W1614298861",
    //             "doi": "https://doi.org/10.48550/arxiv.1301.3781",
    //             "title": "Efficient Estimation of Word Representations in Vector Space",
    //             "display_name": "Efficient Estimation of Word Representations in Vector Space",
    //             "publication_year": 2013,
    //             "publication_date": "2013-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W1614298861",
    //                 "doi": "https://doi.org/10.48550/arxiv.1301.3781",
    //                 "mag": "1614298861"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://arxiv.org/abs/1301.3781",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400194",
    //                     "display_name": "arXiv (Cornell University)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I205783295",
    //                     "host_organization_name": "Cornell University",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I205783295"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Cornell University"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": "other-oa",
    //                 "license_id": "https://openalex.org/licenses/other-oa",
    //                 "version": "submittedVersion",
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "preprint",
    //             "type_crossref": "posted-content",
    //             "indexed_in": [
    //                 "datacite"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "green",
    //                 "oa_url": "https://arxiv.org/abs/1301.3781",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5020917394",
    //                         "display_name": "Tom\u00e1\u0161 Mikolov",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I60587646",
    //                             "display_name": "Brno University of Technology",
    //                             "ror": "https://ror.org/03613d656",
    //                             "country_code": "CZ",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I60587646"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CZ"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Tomas Mikolov",
    //                     "raw_affiliation_strings": [
    //                         "Brno University of Technology, Brno, Czechia"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Brno University of Technology, Brno, Czechia",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I60587646"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5078467158",
    //                         "display_name": "Kai Chen",
    //                         "orcid": "https://orcid.org/0000-0001-9520-4273"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I139759216",
    //                             "display_name": "Beijing University of Posts and Telecommunications",
    //                             "ror": "https://ror.org/04w9fbh59",
    //                             "country_code": "CN",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I139759216"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CN"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Kai Chen",
    //                     "raw_affiliation_strings": [
    //                         "Beijing University of Posts and Telecommunications, Beijing, China"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Beijing University of Posts and Telecommunications, Beijing, China",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I139759216"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5068955381",
    //                         "display_name": "Greg S. Corrado",
    //                         "orcid": "https://orcid.org/0000-0001-8817-0992"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1291425158",
    //                             "display_name": "Google (United States)",
    //                             "ror": "https://ror.org/00njsd438",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1291425158",
    //                                 "https://openalex.org/I4210128969"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Greg S. Corrado",
    //                     "raw_affiliation_strings": [
    //                         "Google (United States), Mountain View, United States"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Google (United States), Mountain View, United States",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1291425158"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5043872671",
    //                         "display_name": "Jay B. Dean",
    //                         "orcid": "https://orcid.org/0000-0003-1362-0500"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1291425158",
    //                             "display_name": "Google (United States)",
    //                             "ror": "https://ror.org/00njsd438",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1291425158",
    //                                 "https://openalex.org/I4210128969"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Jeffrey Dean",
    //                     "raw_affiliation_strings": [
    //                         "Google (United States), Mountain View, United States"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Google (United States), Mountain View, United States",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1291425158"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 3,
    //             "institutions_distinct_count": 3,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": null,
    //             "has_fulltext": false,
    //             "cited_by_count": 16095,
    //             "citation_normalized_percentile": {
    //                 "value": 0.99977,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10028",
    //                 "display_name": "Topic Modeling",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10028",
    //                     "display_name": "Topic Modeling",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10181",
    //                     "display_name": "Natural Language Processing Techniques",
    //                     "score": 0.9997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10201",
    //                     "display_name": "Speech Recognition and Synthesis",
    //                     "score": 0.9805,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/similarity",
    //                     "display_name": "Similarity (geometry)",
    //                     "score": 0.6417932
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/vector-space-model",
    //                     "display_name": "Vector space model",
    //                     "score": 0.47854334
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C90805587",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q10944557",
    //                     "display_name": "Word (group theory)",
    //                     "level": 2,
    //                     "score": 0.8514335
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.7163261
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C103278499",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q254465",
    //                     "display_name": "Similarity (geometry)",
    //                     "level": 3,
    //                     "score": 0.6417932
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C177264268",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1514741",
    //                     "display_name": "Set (abstract data type)",
    //                     "level": 2,
    //                     "score": 0.6170614
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C13336665",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q125977",
    //                     "display_name": "Vector space",
    //                     "level": 2,
    //                     "score": 0.5846031
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.58027726
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780451532",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q759676",
    //                     "display_name": "Task (project management)",
    //                     "level": 2,
    //                     "score": 0.5561675
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C204321447",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q30642",
    //                     "display_name": "Natural language processing",
    //                     "level": 1,
    //                     "score": 0.51198065
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C89686163",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1187982",
    //                     "display_name": "Vector space model",
    //                     "level": 2,
    //                     "score": 0.47854334
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169903167",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3985153",
    //                     "display_name": "Test set",
    //                     "level": 2,
    //                     "score": 0.4704199
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C130318100",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2268914",
    //                     "display_name": "Semantic similarity",
    //                     "level": 2,
    //                     "score": 0.46740845
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778572836",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q380933",
    //                     "display_name": "Space (punctuation)",
    //                     "level": 2,
    //                     "score": 0.46348694
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C50644808",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q192776",
    //                     "display_name": "Artificial neural network",
    //                     "level": 2,
    //                     "score": 0.43198335
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.18429723
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2524010",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8087",
    //                     "display_name": "Geometry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C111919701",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9135",
    //                     "display_name": "Operating system",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187736073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2920921",
    //                     "display_name": "Management",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C162324750",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8134",
    //                     "display_name": "Economics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C115961682",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q860623",
    //                     "display_name": "Image (mathematics)",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199360897",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9143",
    //                     "display_name": "Programming language",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://arxiv.org/abs/1301.3781",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400194",
    //                         "display_name": "arXiv (Cornell University)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I205783295",
    //                         "host_organization_name": "Cornell University",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I205783295"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Cornell University"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "other-oa",
    //                     "license_id": "https://openalex.org/licenses/other-oa",
    //                     "version": "submittedVersion",
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://api.datacite.org/dois/10.48550/arxiv.1301.3781",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4393179698",
    //                         "display_name": "DataCite API",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I4210145204",
    //                         "host_organization_name": "DataCite",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I4210145204"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "DataCite"
    //                         ],
    //                         "type": "metadata"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://arxiv.org/abs/1301.3781",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400194",
    //                     "display_name": "arXiv (Cornell University)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I205783295",
    //                     "host_organization_name": "Cornell University",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I205783295"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Cornell University"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": "other-oa",
    //                 "license_id": "https://openalex.org/licenses/other-oa",
    //                 "version": "submittedVersion",
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [
    //                 "https://openalex.org/W4312264180",
    //                 "https://openalex.org/W3161401723",
    //                 "https://openalex.org/W2598939209",
    //                 "https://openalex.org/W2501166272",
    //                 "https://openalex.org/W2349139068",
    //                 "https://openalex.org/W2146812779",
    //                 "https://openalex.org/W2096728994",
    //                 "https://openalex.org/W2053389710",
    //                 "https://openalex.org/W1974406477",
    //                 "https://openalex.org/W1540114765"
    //             ],
    //             "abstract_inverted_index": {
    //                 "We": [
    //                     0,
    //                     48
    //                 ],
    //                 "propose": [
    //                     1
    //                 ],
    //                 "two": [
    //                     2
    //                 ],
    //                 "novel": [
    //                     3
    //                 ],
    //                 "model": [
    //                     4
    //                 ],
    //                 "architectures": [
    //                     5
    //                 ],
    //                 "for": [
    //                     6,
    //                     92
    //                 ],
    //                 "computing": [
    //                     7
    //                 ],
    //                 "continuous": [
    //                     8
    //                 ],
    //                 "vector": [
    //                     9
    //                 ],
    //                 "representations": [
    //                     10,
    //                     22
    //                 ],
    //                 "of": [
    //                     11,
    //                     20,
    //                     45
    //                 ],
    //                 "words": [
    //                     12,
    //                     76
    //                 ],
    //                 "from": [
    //                     13,
    //                     72
    //                 ],
    //                 "very": [
    //                     14
    //                 ],
    //                 "large": [
    //                     15,
    //                     50
    //                 ],
    //                 "data": [
    //                     16,
    //                     77
    //                 ],
    //                 "sets.": [
    //                     17
    //                 ],
    //                 "The": [
    //                     18
    //                 ],
    //                 "quality": [
    //                     19,
    //                     69
    //                 ],
    //                 "these": [
    //                     21,
    //                     83
    //                 ],
    //                 "is": [
    //                     23
    //                 ],
    //                 "measured": [
    //                     24
    //                 ],
    //                 "in": [
    //                     25,
    //                     52
    //                 ],
    //                 "a": [
    //                     26,
    //                     64,
    //                     73
    //                 ],
    //                 "word": [
    //                     27,
    //                     70,
    //                     97
    //                 ],
    //                 "similarity": [
    //                     28
    //                 ],
    //                 "task,": [
    //                     29
    //                 ],
    //                 "and": [
    //                     30,
    //                     95
    //                 ],
    //                 "the": [
    //                     31,
    //                     36
    //                 ],
    //                 "results": [
    //                     32
    //                 ],
    //                 "are": [
    //                     33
    //                 ],
    //                 "compared": [
    //                     34
    //                 ],
    //                 "to": [
    //                     35,
    //                     66
    //                 ],
    //                 "previously": [
    //                     37
    //                 ],
    //                 "best": [
    //                     38
    //                 ],
    //                 "performing": [
    //                     39
    //                 ],
    //                 "techniques": [
    //                     40
    //                 ],
    //                 "based": [
    //                     41
    //                 ],
    //                 "on": [
    //                     42,
    //                     88
    //                 ],
    //                 "different": [
    //                     43
    //                 ],
    //                 "types": [
    //                     44
    //                 ],
    //                 "neural": [
    //                     46
    //                 ],
    //                 "networks.": [
    //                     47
    //                 ],
    //                 "observe": [
    //                     49
    //                 ],
    //                 "improvements": [
    //                     51
    //                 ],
    //                 "accuracy": [
    //                     53
    //                 ],
    //                 "at": [
    //                     54
    //                 ],
    //                 "much": [
    //                     55
    //                 ],
    //                 "lower": [
    //                     56
    //                 ],
    //                 "computational": [
    //                     57
    //                 ],
    //                 "cost,": [
    //                     58
    //                 ],
    //                 "i.e.": [
    //                     59
    //                 ],
    //                 "it": [
    //                     60
    //                 ],
    //                 "takes": [
    //                     61
    //                 ],
    //                 "less": [
    //                     62
    //                 ],
    //                 "than": [
    //                     63
    //                 ],
    //                 "day": [
    //                     65
    //                 ],
    //                 "learn": [
    //                     67
    //                 ],
    //                 "high": [
    //                     68
    //                 ],
    //                 "vectors": [
    //                     71,
    //                     84
    //                 ],
    //                 "1.6": [
    //                     74
    //                 ],
    //                 "billion": [
    //                     75
    //                 ],
    //                 "set.": [
    //                     78
    //                 ],
    //                 "Furthermore,": [
    //                     79
    //                 ],
    //                 "we": [
    //                     80
    //                 ],
    //                 "show": [
    //                     81
    //                 ],
    //                 "that": [
    //                     82
    //                 ],
    //                 "provide": [
    //                     85
    //                 ],
    //                 "state-of-the-art": [
    //                     86
    //                 ],
    //                 "performance": [
    //                     87
    //                 ],
    //                 "our": [
    //                     89
    //                 ],
    //                 "test": [
    //                     90
    //                 ],
    //                 "set": [
    //                     91
    //                 ],
    //                 "measuring": [
    //                     93
    //                 ],
    //                 "syntactic": [
    //                     94
    //                 ],
    //                 "semantic": [
    //                     96
    //                 ],
    //                 "similarities.": [
    //                     98
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W1614298861",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 76
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 1074
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 1906
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 1875
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 2456
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 2122
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 1993
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 1702
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 1250
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 839
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 606
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 185
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 18
    //                 }
    //             ],
    //             "updated_date": "2025-03-02T13:32:07.845103",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2150066425",
    //             "doi": "https://doi.org/10.1109/cvpr.2012.6248074",
    //             "title": "Are we ready for autonomous driving? The KITTI vision benchmark suite",
    //             "display_name": "Are we ready for autonomous driving? The KITTI vision benchmark suite",
    //             "publication_year": 2012,
    //             "publication_date": "2012-06-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2150066425",
    //                 "doi": "https://doi.org/10.1109/cvpr.2012.6248074",
    //                 "mag": "2150066425"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1109/cvpr.2012.6248074",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4363607795",
    //                     "display_name": "2009 IEEE Conference on Computer Vision and Pattern Recognition",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": null,
    //                     "host_organization_name": null,
    //                     "host_organization_lineage": [],
    //                     "host_organization_lineage_names": [],
    //                     "type": "conference"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "proceedings-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5016606943",
    //                         "display_name": "Andreas Geiger",
    //                         "orcid": "https://orcid.org/0000-0002-8151-3726"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I102335020",
    //                             "display_name": "Karlsruhe Institute of Technology",
    //                             "ror": "https://ror.org/04t3en479",
    //                             "country_code": "DE",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I102335020",
    //                                 "https://openalex.org/I1305996414"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "DE"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "A. Geiger",
    //                     "raw_affiliation_strings": [
    //                         "Karlsruhe Institute of Technology, Germany"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Karlsruhe Institute of Technology, Germany",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I102335020"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5111040507",
    //                         "display_name": "P Lenz",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I102335020",
    //                             "display_name": "Karlsruhe Institute of Technology",
    //                             "ror": "https://ror.org/04t3en479",
    //                             "country_code": "DE",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I102335020",
    //                                 "https://openalex.org/I1305996414"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "DE"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "P. Lenz",
    //                     "raw_affiliation_strings": [
    //                         "Karlsruhe Institute of Technology, Germany"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Karlsruhe Institute of Technology, Germany",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I102335020"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5043370575",
    //                         "display_name": "R. Urtasun",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I4210093665",
    //                             "display_name": "Toyota Motor Corporation (United States)",
    //                             "ror": "https://ror.org/0076knn86",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I4210093665",
    //                                 "https://openalex.org/I4210125472",
    //                                 "https://openalex.org/I4210137853"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "R. Urtasun",
    //                     "raw_affiliation_strings": [
    //                         "Toyota Technical Institute, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Toyota Technical Institute, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I4210093665"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 2,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 117.433,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 12232,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999855,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": "3354",
    //                 "last_page": "3361"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10531",
    //                 "display_name": "Advanced Vision and Imaging",
    //                 "score": 0.9999,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1707",
    //                     "display_name": "Computer Vision and Pattern Recognition"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10531",
    //                     "display_name": "Advanced Vision and Imaging",
    //                     "score": 0.9999,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10191",
    //                     "display_name": "Robotics and Sensor-Based Localization",
    //                     "score": 0.9999,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2202",
    //                         "display_name": "Aerospace Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10036",
    //                     "display_name": "Advanced Neural Network Applications",
    //                     "score": 0.9997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/visual-odometry",
    //                     "display_name": "Visual Odometry",
    //                     "score": 0.7626842
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/benchmark",
    //                     "display_name": "Benchmark (surveying)",
    //                     "score": 0.6502144
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/odometry",
    //                     "display_name": "Odometry",
    //                     "score": 0.5671534
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/optical-flow",
    //                     "display_name": "Optical Flow",
    //                     "score": 0.49009952
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.80513215
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C5799516",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4110915",
    //                     "display_name": "Visual odometry",
    //                     "level": 3,
    //                     "score": 0.7626842
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.75596035
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C31972630",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q844240",
    //                     "display_name": "Computer vision",
    //                     "level": 1,
    //                     "score": 0.7555988
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C79581498",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1367530",
    //                     "display_name": "Suite",
    //                     "level": 2,
    //                     "score": 0.69463027
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C185798385",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1161707",
    //                     "display_name": "Benchmark (surveying)",
    //                     "level": 2,
    //                     "score": 0.6502144
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C49441653",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2014717",
    //                     "display_name": "Odometry",
    //                     "level": 4,
    //                     "score": 0.5671534
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C34413123",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q170978",
    //                     "display_name": "Robotics",
    //                     "level": 3,
    //                     "score": 0.5407254
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C155542232",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q736111",
    //                     "display_name": "Optical flow",
    //                     "level": 3,
    //                     "score": 0.49009952
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776151529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3045304",
    //                     "display_name": "Object detection",
    //                     "level": 3,
    //                     "score": 0.4880015
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C36464697",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q451553",
    //                     "display_name": "Visualization",
    //                     "level": 2,
    //                     "score": 0.45721555
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.3028115
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C115961682",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q860623",
    //                     "display_name": "Image (mathematics)",
    //                     "level": 2,
    //                     "score": 0.30138278
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C19966478",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4810574",
    //                     "display_name": "Mobile robot",
    //                     "level": 3,
    //                     "score": 0.22282976
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C153180895",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7148389",
    //                     "display_name": "Pattern recognition (psychology)",
    //                     "level": 2,
    //                     "score": 0.15633205
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C166957645",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q23498",
    //                     "display_name": "Archaeology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C13280743",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q131089",
    //                     "display_name": "Geodesy",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C95457728",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q309",
    //                     "display_name": "History",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C205649164",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1071",
    //                     "display_name": "Geography",
    //                     "level": 0,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1109/cvpr.2012.6248074",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4363607795",
    //                         "display_name": "2009 IEEE Conference on Computer Vision and Pattern Recognition",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": null,
    //                         "host_organization_name": null,
    //                         "host_organization_lineage": [],
    //                         "host_organization_lineage_names": [],
    //                         "type": "conference"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.65,
    //                     "display_name": "Sustainable cities and communities",
    //                     "id": "https://metadata.un.org/sdg/11"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 50,
    //             "referenced_works": [
    //                 "https://openalex.org/W127013308",
    //                 "https://openalex.org/W1501358589",
    //                 "https://openalex.org/W1501749417",
    //                 "https://openalex.org/W1565206031",
    //                 "https://openalex.org/W1578985305",
    //                 "https://openalex.org/W1597928342",
    //                 "https://openalex.org/W1746819321",
    //                 "https://openalex.org/W180521011",
    //                 "https://openalex.org/W1867429401",
    //                 "https://openalex.org/W191001584",
    //                 "https://openalex.org/W1912649600",
    //                 "https://openalex.org/W1964814179",
    //                 "https://openalex.org/W1968799614",
    //                 "https://openalex.org/W1990398405",
    //                 "https://openalex.org/W1995963656",
    //                 "https://openalex.org/W1998910452",
    //                 "https://openalex.org/W2006548260",
    //                 "https://openalex.org/W2027726068",
    //                 "https://openalex.org/W2028652338",
    //                 "https://openalex.org/W2031454541",
    //                 "https://openalex.org/W2033959528",
    //                 "https://openalex.org/W2049479307",
    //                 "https://openalex.org/W2054511520",
    //                 "https://openalex.org/W2087718299",
    //                 "https://openalex.org/W2098699644",
    //                 "https://openalex.org/W2104974755",
    //                 "https://openalex.org/W2107921474",
    //                 "https://openalex.org/W2110764733",
    //                 "https://openalex.org/W2117248802",
    //                 "https://openalex.org/W2119090229",
    //                 "https://openalex.org/W2121781154",
    //                 "https://openalex.org/W2127220039",
    //                 "https://openalex.org/W2128783330",
    //                 "https://openalex.org/W2128942651",
    //                 "https://openalex.org/W2131747574",
    //                 "https://openalex.org/W2147253850",
    //                 "https://openalex.org/W2153635508",
    //                 "https://openalex.org/W2156548949",
    //                 "https://openalex.org/W2161969291",
    //                 "https://openalex.org/W2166049352",
    //                 "https://openalex.org/W2167049458",
    //                 "https://openalex.org/W2167090521",
    //                 "https://openalex.org/W2168356304",
    //                 "https://openalex.org/W2168676389",
    //                 "https://openalex.org/W2171781905",
    //                 "https://openalex.org/W2951271310",
    //                 "https://openalex.org/W3038018492",
    //                 "https://openalex.org/W3120421331",
    //                 "https://openalex.org/W3210232381",
    //                 "https://openalex.org/W4211049957"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W87609089",
    //                 "https://openalex.org/W4312703710",
    //                 "https://openalex.org/W3161199934",
    //                 "https://openalex.org/W3105866016",
    //                 "https://openalex.org/W3024737167",
    //                 "https://openalex.org/W2979950214",
    //                 "https://openalex.org/W2414561716",
    //                 "https://openalex.org/W2412578866",
    //                 "https://openalex.org/W2312326526",
    //                 "https://openalex.org/W2303855011"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Today,": [
    //                     0
    //                 ],
    //                 "visual": [
    //                     1,
    //                     52,
    //                     89
    //                 ],
    //                 "recognition": [
    //                     2
    //                 ],
    //                 "systems": [
    //                     3
    //                 ],
    //                 "are": [
    //                     4,
    //                     114,
    //                     167
    //                 ],
    //                 "still": [
    //                     5
    //                 ],
    //                 "rarely": [
    //                     6
    //                 ],
    //                 "employed": [
    //                     7
    //                 ],
    //                 "in": [
    //                     8,
    //                     104
    //                 ],
    //                 "robotics": [
    //                     9
    //                 ],
    //                 "applications.": [
    //                     10
    //                 ],
    //                 "Perhaps": [
    //                     11
    //                 ],
    //                 "one": [
    //                     12
    //                 ],
    //                 "of": [
    //                     13,
    //                     22,
    //                     35,
    //                     48,
    //                     92
    //                 ],
    //                 "the": [
    //                     14,
    //                     20,
    //                     46,
    //                     140,
    //                     143,
    //                     161
    //                 ],
    //                 "main": [
    //                     15
    //                 ],
    //                 "reasons": [
    //                     16
    //                 ],
    //                 "for": [
    //                     17,
    //                     45
    //                 ],
    //                 "this": [
    //                     18,
    //                     30,
    //                     151
    //                 ],
    //                 "is": [
    //                     19,
    //                     61,
    //                     148
    //                 ],
    //                 "lack": [
    //                     21
    //                 ],
    //                 "demanding": [
    //                     23
    //                 ],
    //                 "benchmarks": [
    //                     24,
    //                     44,
    //                     79,
    //                     156,
    //                     166
    //                 ],
    //                 "that": [
    //                     25,
    //                     123
    //                 ],
    //                 "mimic": [
    //                     26
    //                 ],
    //                 "such": [
    //                     27,
    //                     130
    //                 ],
    //                 "scenarios.": [
    //                     28
    //                 ],
    //                 "In": [
    //                     29
    //                 ],
    //                 "paper,": [
    //                     31
    //                 ],
    //                 "we": [
    //                     32
    //                 ],
    //                 "take": [
    //                     33
    //                 ],
    //                 "advantage": [
    //                     34
    //                 ],
    //                 "our": [
    //                     36
    //                 ],
    //                 "autonomous": [
    //                     37
    //                 ],
    //                 "driving": [
    //                     38
    //                 ],
    //                 "platform": [
    //                     39,
    //                     60
    //                 ],
    //                 "to": [
    //                     40,
    //                     108,
    //                     142,
    //                     149,
    //                     160
    //                 ],
    //                 "develop": [
    //                     41
    //                 ],
    //                 "novel": [
    //                     42,
    //                     158
    //                 ],
    //                 "challenging": [
    //                     43,
    //                     155
    //                 ],
    //                 "tasks": [
    //                     47
    //                 ],
    //                 "stereo,": [
    //                     49
    //                 ],
    //                 "optical": [
    //                     50,
    //                     84
    //                 ],
    //                 "flow,": [
    //                     51
    //                 ],
    //                 "odometry/SLAM": [
    //                     53
    //                 ],
    //                 "and": [
    //                     54,
    //                     73,
    //                     83,
    //                     96,
    //                     111
    //                 ],
    //                 "3D": [
    //                     55,
    //                     100
    //                 ],
    //                 "object": [
    //                     56,
    //                     101
    //                 ],
    //                 "detection.": [
    //                     57
    //                 ],
    //                 "Our": [
    //                     58,
    //                     78,
    //                     146,
    //                     165
    //                 ],
    //                 "recording": [
    //                     59
    //                 ],
    //                 "equipped": [
    //                     62
    //                 ],
    //                 "with": [
    //                     63,
    //                     157
    //                 ],
    //                 "four": [
    //                     64
    //                 ],
    //                 "high": [
    //                     65,
    //                     126
    //                 ],
    //                 "resolution": [
    //                     66
    //                 ],
    //                 "video": [
    //                     67
    //                 ],
    //                 "cameras,": [
    //                     68
    //                 ],
    //                 "a": [
    //                     69,
    //                     74
    //                 ],
    //                 "Velodyne": [
    //                     70
    //                 ],
    //                 "laser": [
    //                     71
    //                 ],
    //                 "scanner": [
    //                     72
    //                 ],
    //                 "state-of-the-art": [
    //                     75,
    //                     120
    //                 ],
    //                 "localization": [
    //                     76
    //                 ],
    //                 "system.": [
    //                     77
    //                 ],
    //                 "comprise": [
    //                     80
    //                 ],
    //                 "389": [
    //                     81
    //                 ],
    //                 "stereo": [
    //                     82,
    //                     88
    //                 ],
    //                 "flow": [
    //                     85
    //                 ],
    //                 "image": [
    //                     86
    //                 ],
    //                 "pairs,": [
    //                     87
    //                 ],
    //                 "odometry": [
    //                     90
    //                 ],
    //                 "sequences": [
    //                     91
    //                 ],
    //                 "39.2": [
    //                     93
    //                 ],
    //                 "km": [
    //                     94
    //                 ],
    //                 "length,": [
    //                     95
    //                 ],
    //                 "more": [
    //                     97
    //                 ],
    //                 "than": [
    //                     98
    //                 ],
    //                 "200k": [
    //                     99
    //                 ],
    //                 "annotations": [
    //                     102
    //                 ],
    //                 "captured": [
    //                     103
    //                 ],
    //                 "cluttered": [
    //                     105
    //                 ],
    //                 "scenarios": [
    //                     106
    //                 ],
    //                 "(up": [
    //                     107
    //                 ],
    //                 "15": [
    //                     109
    //                 ],
    //                 "cars": [
    //                     110
    //                 ],
    //                 "30": [
    //                     112
    //                 ],
    //                 "pedestrians": [
    //                     113
    //                 ],
    //                 "visible": [
    //                     115
    //                 ],
    //                 "per": [
    //                     116
    //                 ],
    //                 "image).": [
    //                     117
    //                 ],
    //                 "Results": [
    //                     118
    //                 ],
    //                 "from": [
    //                     119
    //                 ],
    //                 "algorithms": [
    //                     121
    //                 ],
    //                 "reveal": [
    //                     122
    //                 ],
    //                 "methods": [
    //                     124
    //                 ],
    //                 "ranking": [
    //                     125
    //                 ],
    //                 "on": [
    //                     127
    //                 ],
    //                 "established": [
    //                     128
    //                 ],
    //                 "datasets": [
    //                     129
    //                 ],
    //                 "as": [
    //                     131
    //                 ],
    //                 "Middlebury": [
    //                     132
    //                 ],
    //                 "perform": [
    //                     133
    //                 ],
    //                 "below": [
    //                     134
    //                 ],
    //                 "average": [
    //                     135
    //                 ],
    //                 "when": [
    //                     136
    //                 ],
    //                 "being": [
    //                     137
    //                 ],
    //                 "moved": [
    //                     138
    //                 ],
    //                 "outside": [
    //                     139
    //                 ],
    //                 "laboratory": [
    //                     141
    //                 ],
    //                 "real": [
    //                     144
    //                 ],
    //                 "world.": [
    //                     145
    //                 ],
    //                 "goal": [
    //                     147
    //                 ],
    //                 "reduce": [
    //                     150
    //                 ],
    //                 "bias": [
    //                     152
    //                 ],
    //                 "by": [
    //                     153
    //                 ],
    //                 "providing": [
    //                     154
    //                 ],
    //                 "difficulties": [
    //                     159
    //                 ],
    //                 "computer": [
    //                     162
    //                 ],
    //                 "vision": [
    //                     163
    //                 ],
    //                 "community.": [
    //                     164
    //                 ],
    //                 "available": [
    //                     168
    //                 ],
    //                 "online": [
    //                     169
    //                 ],
    //                 "at:": [
    //                     170
    //                 ],
    //                 "www.cvlibs.net/datasets/kitti.": [
    //                     171
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2150066425",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 40
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 1416
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 1830
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 1562
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 1903
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 1605
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 1399
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 873
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 579
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 383
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 284
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 159
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 135
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 22
    //                 }
    //             ],
    //             "updated_date": "2025-02-23T02:21:25.217298",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2000214310",
    //             "doi": "https://doi.org/10.1037/h0061626",
    //             "title": "Cognitive maps in rats and men.",
    //             "display_name": "Cognitive maps in rats and men.",
    //             "publication_year": 1948,
    //             "publication_date": "1948-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2000214310",
    //                 "doi": "https://doi.org/10.1037/h0061626",
    //                 "mag": "2000214310",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/18870876"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1037/h0061626",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S35223124",
    //                     "display_name": "Psychological Review",
    //                     "issn_l": "0033-295X",
    //                     "issn": [
    //                         "0033-295X",
    //                         "1939-1471"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320262",
    //                     "host_organization_name": "American Psychological Association",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320262"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "American Psychological Association"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5112817871",
    //                         "display_name": "E. C. Tolman",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I95457486",
    //                             "display_name": "University of California, Berkeley",
    //                             "ror": "https://ror.org/01an7q238",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I95457486"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Edward C. Tolman",
    //                     "raw_affiliation_strings": [
    //                         "U. CALIFORNIA, BERKELEY."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "U. CALIFORNIA, BERKELEY.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I95457486"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5112817871"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I95457486"
    //             ],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 30.36,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 6260,
    //             "citation_normalized_percentile": {
    //                 "value": 0.996732,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "55",
    //                 "issue": "4",
    //                 "first_page": "189",
    //                 "last_page": "208"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12805",
    //                 "display_name": "Cognitive Science and Mapping",
    //                 "score": 0.9437,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12805",
    //                     "display_name": "Cognitive Science and Mapping",
    //                     "score": 0.9437,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.57920796
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.45230582
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C180747234",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q23373",
    //                     "display_name": "Cognitive psychology",
    //                     "level": 1,
    //                     "score": 0.42055404
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.3253292
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.15024483
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D001521",
    //                     "descriptor_name": "Behavior Therapy",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D003071",
    //                     "descriptor_name": "Cognition",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D006801",
    //                     "descriptor_name": "Humans",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D008297",
    //                     "descriptor_name": "Male",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D051381",
    //                     "descriptor_name": "Rats",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1037/h0061626",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S35223124",
    //                         "display_name": "Psychological Review",
    //                         "issn_l": "0033-295X",
    //                         "issn": [
    //                             "0033-295X",
    //                             "1939-1471"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320262",
    //                         "host_organization_name": "American Psychological Association",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320262"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "American Psychological Association"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/18870876",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [
    //                 "https://openalex.org/W2899084033",
    //                 "https://openalex.org/W2748952813",
    //                 "https://openalex.org/W2530322880",
    //                 "https://openalex.org/W2390279801",
    //                 "https://openalex.org/W2382290278",
    //                 "https://openalex.org/W2376932109",
    //                 "https://openalex.org/W2358668433",
    //                 "https://openalex.org/W2350741829",
    //                 "https://openalex.org/W2130043461",
    //                 "https://openalex.org/W1596801655"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2000214310",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 11
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 327
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 322
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 345
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 334
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 402
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 314
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 253
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 240
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 238
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 222
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 210
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 221
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 207
    //                 }
    //             ],
    //             "updated_date": "2025-02-26T20:26:34.036771",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2144902422",
    //             "doi": null,
    //             "title": "Random Features for Large-Scale Kernel Machines",
    //             "display_name": "Random Features for Large-Scale Kernel Machines",
    //             "publication_year": 2007,
    //             "publication_date": "2007-12-03",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2144902422",
    //                 "mag": "2144902422"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "http://keysduplicated.com/~ali/papers/rahimi-recht-random-features.pdf",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4306420609",
    //                     "display_name": "Neural Information Processing Systems",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": null,
    //                     "host_organization_name": null,
    //                     "host_organization_lineage": [],
    //                     "host_organization_lineage_names": [],
    //                     "type": "conference"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "proceedings-article",
    //             "indexed_in": [],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5101770454",
    //                         "display_name": "Ali Rahimi",
    //                         "orcid": "https://orcid.org/0000-0002-6777-0435"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Ali Rahimi",
    //                     "raw_affiliation_strings": [
    //                         "Intel Research - Seattle, Seattle, WA#TAB#"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Research - Seattle, Seattle, WA#TAB#",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5012870568",
    //                         "display_name": "Benjamin Recht",
    //                         "orcid": "https://orcid.org/0000-0002-0293-593X"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I122411786",
    //                             "display_name": "California Institute of Technology",
    //                             "ror": "https://ror.org/05dxps055",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I122411786"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Benjamin Recht",
    //                     "raw_affiliation_strings": [
    //                         "Caltech IST, Pasadena, CA#TAB#"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Caltech IST, Pasadena, CA#TAB#",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I122411786"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 8.447,
    //             "has_fulltext": false,
    //             "cited_by_count": 2769,
    //             "citation_normalized_percentile": {
    //                 "value": 0.980521,
    //                 "is_in_top_1_percent": false,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "20",
    //                 "issue": null,
    //                 "first_page": "1177",
    //                 "last_page": "1184"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12676",
    //                 "display_name": "Machine Learning and ELM",
    //                 "score": 0.9997,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12676",
    //                     "display_name": "Machine Learning and ELM",
    //                     "score": 0.9997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12072",
    //                     "display_name": "Machine Learning and Algorithms",
    //                     "score": 0.9992,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T11612",
    //                     "display_name": "Stochastic Gradient Optimization Techniques",
    //                     "score": 0.9986,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/kernel",
    //                     "display_name": "Kernel (algebra)",
    //                     "score": 0.72512203
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/graph-kernel",
    //                     "display_name": "Graph kernel",
    //                     "score": 0.52084714
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/string-kernel",
    //                     "display_name": "String kernel",
    //                     "score": 0.452828
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/feature",
    //                     "display_name": "Feature (linguistics)",
    //                     "score": 0.43809488
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/tree-kernel",
    //                     "display_name": "Tree kernel",
    //                     "score": 0.43311772
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/feature-vector",
    //                     "display_name": "Feature vector",
    //                     "score": 0.42938077
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C74193536",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q574844",
    //                     "display_name": "Kernel (algebra)",
    //                     "level": 2,
    //                     "score": 0.72512203
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.6815349
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C122280245",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q620622",
    //                     "display_name": "Kernel method",
    //                     "level": 3,
    //                     "score": 0.64229137
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C75866337",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7280263",
    //                     "display_name": "Radial basis function kernel",
    //                     "level": 4,
    //                     "score": 0.58285815
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.5720587
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C134517425",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q16000131",
    //                     "display_name": "Kernel embedding of distributions",
    //                     "level": 4,
    //                     "score": 0.5305306
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C100595998",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11731931",
    //                     "display_name": "Graph kernel",
    //                     "level": 5,
    //                     "score": 0.52084714
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C195699287",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7915722",
    //                     "display_name": "Variable kernel density estimation",
    //                     "level": 4,
    //                     "score": 0.4970086
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778755073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q10858537",
    //                     "display_name": "Scale (ratio)",
    //                     "level": 2,
    //                     "score": 0.47756368
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C153180895",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7148389",
    //                     "display_name": "Pattern recognition (psychology)",
    //                     "level": 2,
    //                     "score": 0.4767859
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C160446489",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7226642",
    //                     "display_name": "Polynomial kernel",
    //                     "level": 4,
    //                     "score": 0.4636942
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55851704",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7623983",
    //                     "display_name": "String kernel",
    //                     "level": 5,
    //                     "score": 0.452828
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776401178",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12050496",
    //                     "display_name": "Feature (linguistics)",
    //                     "level": 2,
    //                     "score": 0.43809488
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C140417398",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q16933942",
    //                     "display_name": "Tree kernel",
    //                     "level": 5,
    //                     "score": 0.43311772
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C83665646",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q42139305",
    //                     "display_name": "Feature vector",
    //                     "level": 2,
    //                     "score": 0.42938077
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C119857082",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2539",
    //                     "display_name": "Machine learning",
    //                     "level": 1,
    //                     "score": 0.41297814
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.32383728
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C12267149",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q282453",
    //                     "display_name": "Support vector machine",
    //                     "level": 2,
    //                     "score": 0.32171488
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.28916016
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41895202",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8162",
    //                     "display_name": "Linguistics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C138885662",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5891",
    //                     "display_name": "Philosophy",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C114614502",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q76592",
    //                     "display_name": "Combinatorics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C62520636",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q944",
    //                     "display_name": "Quantum mechanics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "http://keysduplicated.com/~ali/papers/rahimi-recht-random-features.pdf",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306420609",
    //                         "display_name": "Neural Information Processing Systems",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": null,
    //                         "host_organization_name": null,
    //                         "host_organization_lineage": [],
    //                         "host_organization_lineage_names": [],
    //                         "type": "conference"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 18,
    //             "referenced_works": [
    //                 "https://openalex.org/W1486890033",
    //                 "https://openalex.org/W1818277846",
    //                 "https://openalex.org/W1924225422",
    //                 "https://openalex.org/W1979750072",
    //                 "https://openalex.org/W1992244412",
    //                 "https://openalex.org/W2035720976",
    //                 "https://openalex.org/W2047278710",
    //                 "https://openalex.org/W2065887373",
    //                 "https://openalex.org/W2105038653",
    //                 "https://openalex.org/W2115519811",
    //                 "https://openalex.org/W2120286392",
    //                 "https://openalex.org/W2142623206",
    //                 "https://openalex.org/W2144414190",
    //                 "https://openalex.org/W2153635508",
    //                 "https://openalex.org/W2155120195",
    //                 "https://openalex.org/W2155319834",
    //                 "https://openalex.org/W2160840682",
    //                 "https://openalex.org/W2172039283"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W3120740533",
    //                 "https://openalex.org/W3118608800",
    //                 "https://openalex.org/W2963013450",
    //                 "https://openalex.org/W2809090039",
    //                 "https://openalex.org/W2194775991",
    //                 "https://openalex.org/W2167608136",
    //                 "https://openalex.org/W2160840682",
    //                 "https://openalex.org/W2153635508",
    //                 "https://openalex.org/W2123395972",
    //                 "https://openalex.org/W2119821739",
    //                 "https://openalex.org/W2118585731",
    //                 "https://openalex.org/W2118563516",
    //                 "https://openalex.org/W2112796928",
    //                 "https://openalex.org/W2112545207",
    //                 "https://openalex.org/W2109235804",
    //                 "https://openalex.org/W2107791152",
    //                 "https://openalex.org/W1992244412",
    //                 "https://openalex.org/W1746819321",
    //                 "https://openalex.org/W1560724230",
    //                 "https://openalex.org/W1510073064"
    //             ],
    //             "abstract_inverted_index": {
    //                 "To": [
    //                     0
    //                 ],
    //                 "accelerate": [
    //                     1
    //                 ],
    //                 "the": [
    //                     2,
    //                     11,
    //                     33,
    //                     37,
    //                     46
    //                 ],
    //                 "training": [
    //                     3
    //                 ],
    //                 "of": [
    //                     4,
    //                     36,
    //                     49,
    //                     59
    //                 ],
    //                 "kernel": [
    //                     5,
    //                     94
    //                 ],
    //                 "machines,": [
    //                     6
    //                 ],
    //                 "we": [
    //                     7
    //                 ],
    //                 "propose": [
    //                     8
    //                 ],
    //                 "to": [
    //                     9,
    //                     14,
    //                     43,
    //                     68,
    //                     88
    //                 ],
    //                 "map": [
    //                     10
    //                 ],
    //                 "input": [
    //                     12
    //                 ],
    //                 "data": [
    //                     13,
    //                     39
    //                 ],
    //                 "a": [
    //                     15,
    //                     50
    //                 ],
    //                 "randomized": [
    //                     16
    //                 ],
    //                 "low-dimensional": [
    //                     17
    //                 ],
    //                 "feature": [
    //                     18,
    //                     47
    //                 ],
    //                 "space": [
    //                     19,
    //                     48
    //                 ],
    //                 "and": [
    //                     20,
    //                     74,
    //                     80
    //                 ],
    //                 "then": [
    //                     21
    //                 ],
    //                 "apply": [
    //                     22
    //                 ],
    //                 "existing": [
    //                     23
    //                 ],
    //                 "fast": [
    //                     24
    //                 ],
    //                 "linear": [
    //                     25,
    //                     83
    //                 ],
    //                 "methods.": [
    //                     26
    //                 ],
    //                 "The": [
    //                     27
    //                 ],
    //                 "features": [
    //                     28,
    //                     90
    //                 ],
    //                 "are": [
    //                     29,
    //                     40
    //                 ],
    //                 "designed": [
    //                     30
    //                 ],
    //                 "so": [
    //                     31
    //                 ],
    //                 "that": [
    //                     32,
    //                     76
    //                 ],
    //                 "inner": [
    //                     34
    //                 ],
    //                 "products": [
    //                     35
    //                 ],
    //                 "transformed": [
    //                     38
    //                 ],
    //                 "approximately": [
    //                     41
    //                 ],
    //                 "equal": [
    //                     42
    //                 ],
    //                 "those": [
    //                     44
    //                 ],
    //                 "in": [
    //                     45,
    //                     77
    //                 ],
    //                 "user": [
    //                     51
    //                 ],
    //                 "specified": [
    //                     52
    //                 ],
    //                 "shift-invariant": [
    //                     53
    //                 ],
    //                 "kernel.": [
    //                     54
    //                 ],
    //                 "We": [
    //                     55
    //                 ],
    //                 "explore": [
    //                     56
    //                 ],
    //                 "two": [
    //                     57
    //                 ],
    //                 "sets": [
    //                     58
    //                 ],
    //                 "random": [
    //                     60
    //                 ],
    //                 "features,": [
    //                     61
    //                 ],
    //                 "provide": [
    //                     62
    //                 ],
    //                 "convergence": [
    //                     63
    //                 ],
    //                 "bounds": [
    //                     64
    //                 ],
    //                 "on": [
    //                     65
    //                 ],
    //                 "their": [
    //                     66
    //                 ],
    //                 "ability": [
    //                     67
    //                 ],
    //                 "approximate": [
    //                     69
    //                 ],
    //                 "various": [
    //                     70
    //                 ],
    //                 "radial": [
    //                     71
    //                 ],
    //                 "basis": [
    //                     72
    //                 ],
    //                 "kernels,": [
    //                     73
    //                 ],
    //                 "show": [
    //                     75
    //                 ],
    //                 "large-scale": [
    //                     78,
    //                     93
    //                 ],
    //                 "classification": [
    //                     79
    //                 ],
    //                 "regression": [
    //                     81
    //                 ],
    //                 "tasks": [
    //                     82
    //                 ],
    //                 "machine": [
    //                     84
    //                 ],
    //                 "learning": [
    //                     85
    //                 ],
    //                 "algorithms": [
    //                     86
    //                 ],
    //                 "applied": [
    //                     87
    //                 ],
    //                 "these": [
    //                     89
    //                 ],
    //                 "outperform": [
    //                     91
    //                 ],
    //                 "state-of-the-art": [
    //                     92
    //                 ],
    //                 "machines.": [
    //                     95
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2144902422",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 107
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 139
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 176
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 397
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 437
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 320
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 253
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 223
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 238
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 170
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 93
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 60
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 54
    //                 }
    //             ],
    //             "updated_date": "2025-03-03T09:33:07.664722",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W1511694993",
    //             "doi": "https://doi.org/10.1007/b13794",
    //             "title": "Introduction to Nonparametric Estimation",
    //             "display_name": "Introduction to Nonparametric Estimation",
    //             "publication_year": 2008,
    //             "publication_date": "2008-10-21",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W1511694993",
    //                 "doi": "https://doi.org/10.1007/b13794",
    //                 "mag": "1511694993"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1007/b13794",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4210187552",
    //                     "display_name": "Springer series in statistics",
    //                     "issn_l": "0172-7397",
    //                     "issn": [
    //                         "0172-7397",
    //                         "2197-568X"
    //                     ],
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319900",
    //                     "host_organization_name": "Springer Science+Business Media",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319965",
    //                         "https://openalex.org/P4310319900"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Springer Nature",
    //                         "Springer Science+Business Media"
    //                     ],
    //                     "type": "book series"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "book",
    //             "type_crossref": "book",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5112866084",
    //                         "display_name": "Alexandre B. Tsybakov",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I4210147464",
    //                             "display_name": "Laboratoire de Probabilit\u00e9s et Mod\u00e8les Al\u00e9atoires",
    //                             "ror": "https://ror.org/04hjc7403",
    //                             "country_code": "FR",
    //                             "type": "facility",
    //                             "lineage": [
    //                                 "https://openalex.org/I1294671590",
    //                                 "https://openalex.org/I204730241",
    //                                 "https://openalex.org/I39804081",
    //                                 "https://openalex.org/I4210141950",
    //                                 "https://openalex.org/I4210147464"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I39804081",
    //                             "display_name": "Sorbonne Universit\u00e9",
    //                             "ror": "https://ror.org/02en5vm52",
    //                             "country_code": "FR",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I39804081"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "FR"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Alexandre B. Tsybakov",
    //                     "raw_affiliation_strings": [
    //                         "Labo. Probabilit\u00e9s, Universit\u00e9 Paris VI, Paris CX, France"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Labo. Probabilit\u00e9s, Universit\u00e9 Paris VI, Paris CX, France",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I4210147464",
    //                                 "https://openalex.org/I39804081"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5112866084"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I4210147464",
    //                 "https://openalex.org/I39804081"
    //             ],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 8.05,
    //             "has_fulltext": true,
    //             "fulltext_origin": "pdf",
    //             "cited_by_count": 2539,
    //             "citation_normalized_percentile": {
    //                 "value": 0.983871,
    //                 "is_in_top_1_percent": false,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10136",
    //                 "display_name": "Statistical Methods and Inference",
    //                 "score": 0.0863,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2613",
    //                     "display_name": "Statistics and Probability"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/26",
    //                     "display_name": "Mathematics"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10136",
    //                     "display_name": "Statistical Methods and Inference",
    //                     "score": 0.0863,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2613",
    //                         "display_name": "Statistics and Probability"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/26",
    //                         "display_name": "Mathematics"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C102366305",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1097688",
    //                     "display_name": "Nonparametric statistics",
    //                     "level": 2,
    //                     "score": 0.71905065
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96250715",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q965330",
    //                     "display_name": "Estimation",
    //                     "level": 2,
    //                     "score": 0.5327573
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C149782125",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q160039",
    //                     "display_name": "Econometrics",
    //                     "level": 1,
    //                     "score": 0.40577132
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C105795698",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12483",
    //                     "display_name": "Statistics",
    //                     "level": 1,
    //                     "score": 0.38339734
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.36188763
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.31326178
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C162324750",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8134",
    //                     "display_name": "Economics",
    //                     "level": 0,
    //                     "score": 0.25058615
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187736073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2920921",
    //                     "display_name": "Management",
    //                     "level": 1,
    //                     "score": 0.04542291
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1007/b13794",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4210187552",
    //                         "display_name": "Springer series in statistics",
    //                         "issn_l": "0172-7397",
    //                         "issn": [
    //                             "0172-7397",
    //                             "2197-568X"
    //                         ],
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319900",
    //                         "host_organization_name": "Springer Science+Business Media",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319965",
    //                             "https://openalex.org/P4310319900"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Springer Nature",
    //                             "Springer Science+Business Media"
    //                         ],
    //                         "type": "book series"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 2,
    //             "referenced_works": [
    //                 "https://openalex.org/W196417027",
    //                 "https://openalex.org/W2962877819"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4301368977",
    //                 "https://openalex.org/W4245490552",
    //                 "https://openalex.org/W4243114048",
    //                 "https://openalex.org/W3141138882",
    //                 "https://openalex.org/W2170349014",
    //                 "https://openalex.org/W2126977167",
    //                 "https://openalex.org/W2112690682",
    //                 "https://openalex.org/W2007980826",
    //                 "https://openalex.org/W1979597421",
    //                 "https://openalex.org/W1843324721"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W1511694993",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 4
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 124
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 154
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 167
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 259
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 352
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 247
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 192
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 163
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 169
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 184
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 156
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 149
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 77
    //                 }
    //             ],
    //             "updated_date": "2025-02-25T10:04:35.070898",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2432567885",
    //             "doi": "https://doi.org/10.1007/bf00275687",
    //             "title": "Simplified neuron model as a principal component analyzer",
    //             "display_name": "Simplified neuron model as a principal component analyzer",
    //             "publication_year": 1982,
    //             "publication_date": "1982-11-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2432567885",
    //                 "doi": "https://doi.org/10.1007/bf00275687",
    //                 "mag": "2432567885",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/7153672"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1007/bf00275687",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S171842551",
    //                     "display_name": "Journal of Mathematical Biology",
    //                     "issn_l": "0303-6812",
    //                     "issn": [
    //                         "0303-6812",
    //                         "1432-1416"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319900",
    //                     "host_organization_name": "Springer Science+Business Media",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319965",
    //                         "https://openalex.org/P4310319900"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Springer Nature",
    //                         "Springer Science+Business Media"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5085424325",
    //                         "display_name": "Erkki Oja",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I175532246",
    //                             "display_name": "University of Eastern Finland",
    //                             "ror": "https://ror.org/00cyydd11",
    //                             "country_code": "FI",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I175532246"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "FI"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Erkki Oja",
    //                     "raw_affiliation_strings": [
    //                         "Institute of Mathematics, University of Kuopio, 70100, Kuopio 10, Finland"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Institute of Mathematics, University of Kuopio, 70100, Kuopio 10, Finland",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I175532246"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5085424325"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I175532246"
    //             ],
    //             "apc_list": {
    //                 "value": 2190,
    //                 "currency": "EUR",
    //                 "value_usd": 2790
    //             },
    //             "apc_paid": null,
    //             "fwci": 1.871,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 2274,
    //             "citation_normalized_percentile": {
    //                 "value": 0.985068,
    //                 "is_in_top_1_percent": false,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "15",
    //                 "issue": "3",
    //                 "first_page": "267",
    //                 "last_page": "273"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10320",
    //                 "display_name": "Neural Networks and Applications",
    //                 "score": 0.9995,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10320",
    //                     "display_name": "Neural Networks and Applications",
    //                     "score": 0.9995,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9789,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10820",
    //                     "display_name": "Fuzzy Logic and Control Systems",
    //                     "score": 0.9706,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/hebbian-theory",
    //                     "display_name": "Hebbian theory",
    //                     "score": 0.75844806
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/biological-neuron-model",
    //                     "display_name": "Biological neuron model",
    //                     "score": 0.68447745
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/component",
    //                     "display_name": "Component (thermodynamics)",
    //                     "score": 0.58363515
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/sequence",
    //                     "display_name": "Sequence (biology)",
    //                     "score": 0.5247947
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C27438332",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2873",
    //                     "display_name": "Principal component analysis",
    //                     "level": 2,
    //                     "score": 0.7785648
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C111437709",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1277874",
    //                     "display_name": "Hebbian theory",
    //                     "level": 3,
    //                     "score": 0.75844806
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C186565885",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1651163",
    //                     "display_name": "Biological neuron model",
    //                     "level": 3,
    //                     "score": 0.68447745
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C168167062",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1117970",
    //                     "display_name": "Component (thermodynamics)",
    //                     "level": 2,
    //                     "score": 0.58363515
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778112365",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3511065",
    //                     "display_name": "Sequence (biology)",
    //                     "level": 2,
    //                     "score": 0.5247947
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778794669",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q43054",
    //                     "display_name": "Neuron",
    //                     "level": 2,
    //                     "score": 0.50178504
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2777212361",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5127848",
    //                     "display_name": "Class (philosophy)",
    //                     "level": 2,
    //                     "score": 0.4753123
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.45816523
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.45341596
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C186060115",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q30336093",
    //                     "display_name": "Biological system",
    //                     "level": 1,
    //                     "score": 0.4526907
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780586882",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7520643",
    //                     "display_name": "Simple (philosophy)",
    //                     "level": 2,
    //                     "score": 0.4111139
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C50644808",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q192776",
    //                     "display_name": "Artificial neural network",
    //                     "level": 2,
    //                     "score": 0.3889795
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.34557185
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.32012993
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.12257865
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.107554376
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86803240",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q420",
    //                     "display_name": "Biology",
    //                     "level": 0,
    //                     "score": 0.08664784
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C97355855",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11473",
    //                     "display_name": "Thermodynamics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C138885662",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5891",
    //                     "display_name": "Philosophy",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C54355233",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7162",
    //                     "display_name": "Genetics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C111472728",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9471",
    //                     "display_name": "Epistemology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D013569",
    //                     "descriptor_name": "Synapses",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D008433",
    //                     "descriptor_name": "Mathematics",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D008959",
    //                     "descriptor_name": "Models, Neurological",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D013569",
    //                     "descriptor_name": "Synapses",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1007/bf00275687",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S171842551",
    //                         "display_name": "Journal of Mathematical Biology",
    //                         "issn_l": "0303-6812",
    //                         "issn": [
    //                             "0303-6812",
    //                             "1432-1416"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319900",
    //                         "host_organization_name": "Springer Science+Business Media",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319965",
    //                             "https://openalex.org/P4310319900"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Springer Nature",
    //                             "Springer Science+Business Media"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/7153672",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 17,
    //             "referenced_works": [
    //                 "https://openalex.org/W1981479913",
    //                 "https://openalex.org/W1995341919",
    //                 "https://openalex.org/W2008949495",
    //                 "https://openalex.org/W2009692216",
    //                 "https://openalex.org/W2019203033",
    //                 "https://openalex.org/W2051460512",
    //                 "https://openalex.org/W2063698478",
    //                 "https://openalex.org/W2113653296",
    //                 "https://openalex.org/W2125812768",
    //                 "https://openalex.org/W2235056388",
    //                 "https://openalex.org/W2322190567",
    //                 "https://openalex.org/W2324309783",
    //                 "https://openalex.org/W2596430915",
    //                 "https://openalex.org/W2887242076",
    //                 "https://openalex.org/W4295177628",
    //                 "https://openalex.org/W4300528079",
    //                 "https://openalex.org/W65738273"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4281997648",
    //                 "https://openalex.org/W3184949856",
    //                 "https://openalex.org/W3178259930",
    //                 "https://openalex.org/W3099906890",
    //                 "https://openalex.org/W3035839890",
    //                 "https://openalex.org/W2371090464",
    //                 "https://openalex.org/W2320160082",
    //                 "https://openalex.org/W2088600489",
    //                 "https://openalex.org/W2031806409",
    //                 "https://openalex.org/W1769982787"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2432567885",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 1
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 61
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 68
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 56
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 104
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 97
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 99
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 71
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 67
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 61
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 77
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 89
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 57
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 78
    //                 }
    //             ],
    //             "updated_date": "2025-02-26T19:22:28.712616",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2092580449",
    //             "doi": "https://doi.org/10.1126/science.1125572",
    //             "title": "Conjunctive Representation of Position, Direction, and Velocity in Entorhinal Cortex",
    //             "display_name": "Conjunctive Representation of Position, Direction, and Velocity in Entorhinal Cortex",
    //             "publication_year": 2006,
    //             "publication_date": "2006-05-04",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2092580449",
    //                 "doi": "https://doi.org/10.1126/science.1125572",
    //                 "mag": "2092580449",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/16675704"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1126/science.1125572",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S3880285",
    //                     "display_name": "Science",
    //                     "issn_l": "0036-8075",
    //                     "issn": [
    //                         "0036-8075",
    //                         "1095-9203"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310315823",
    //                     "host_organization_name": "American Association for the Advancement of Science",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310315823"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "American Association for the Advancement of Science"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5026258206",
    //                         "display_name": "Francesca Sargolini",
    //                         "orcid": "https://orcid.org/0000-0002-5038-3746"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Francesca Sargolini",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5011330036",
    //                         "display_name": "Marianne Fyhn",
    //                         "orcid": "https://orcid.org/0000-0003-0808-4555"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Marianne Fyhn",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5055001344",
    //                         "display_name": "Torkel Hafting",
    //                         "orcid": "https://orcid.org/0000-0002-0928-3487"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Torkel Hafting",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5041993733",
    //                         "display_name": "Bruce L. McNaughton",
    //                         "orcid": "https://orcid.org/0000-0002-2080-5258"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Bruce L. McNaughton",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5057031090",
    //                         "display_name": "Menno P. Witter",
    //                         "orcid": "https://orcid.org/0000-0003-0285-1637"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Menno P. Witter",
    //                     "raw_affiliation_strings": [
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5053497962",
    //                         "display_name": "May\u2010Britt Moser",
    //                         "orcid": "https://orcid.org/0000-0001-7884-3049"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "May-Britt Moser",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5086289649",
    //                         "display_name": "Edvard I Moser",
    //                         "orcid": "https://orcid.org/0000-0003-0226-5566"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I204778367",
    //                             "display_name": "Norwegian University of Science and Technology",
    //                             "ror": "https://ror.org/05xg72x27",
    //                             "country_code": "NO",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "NO",
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Edvard I. Moser",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                         "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                         "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for the Biology of Memory, Norwegian University of Science and Technology, 7489 Trondheim, Norway.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I204778367"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory, and Aging, University of Arizona, Tucson, AZ 85724, USA.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Research Institute Neurosciences, Department of Anatomy and Neurosciences, Vrije Universiteit University Medical Center, Amsterdam, Netherlands.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 2,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 20.669,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 1443,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999893,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "312",
    //                 "issue": "5774",
    //                 "first_page": "758",
    //                 "last_page": "762"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10448",
    //                 "display_name": "Memory and Neural Mechanisms",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10448",
    //                     "display_name": "Memory and Neural Mechanisms",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10077",
    //                     "display_name": "Neuroscience and Neuropharmacology Research",
    //                     "score": 0.9956,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10985",
    //                     "display_name": "Sleep and Wakefulness Research",
    //                     "score": 0.9894,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/grid-cell",
    //                     "display_name": "Grid cell",
    //                     "score": 0.7770976
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.61406314
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/entorhinal-cortex",
    //                     "display_name": "Entorhinal cortex",
    //                     "score": 0.5950066
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/position",
    //                     "display_name": "Position (finance)",
    //                     "score": 0.5842471
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/cell-type",
    //                     "display_name": "Cell type",
    //                     "score": 0.4465621
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/border-cells",
    //                     "display_name": "Border cells",
    //                     "score": 0.4318996
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/representation",
    //                     "display_name": "Representation",
    //                     "score": 0.42860028
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C2983008078",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q863495",
    //                     "display_name": "Grid cell",
    //                     "level": 3,
    //                     "score": 0.7770976
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187691185",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2020720",
    //                     "display_name": "Grid",
    //                     "level": 2,
    //                     "score": 0.6794382
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.61406314
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780715579",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2603645",
    //                     "display_name": "Entorhinal cortex",
    //                     "level": 3,
    //                     "score": 0.5950066
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C198082294",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3399648",
    //                     "display_name": "Position (finance)",
    //                     "level": 2,
    //                     "score": 0.5842471
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2779227376",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q6505497",
    //                     "display_name": "Layer (electronics)",
    //                     "level": 2,
    //                     "score": 0.47230032
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780312720",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5689100",
    //                     "display_name": "Head (geology)",
    //                     "level": 2,
    //                     "score": 0.45578024
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.45512316
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C189014844",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q189118",
    //                     "display_name": "Cell type",
    //                     "level": 3,
    //                     "score": 0.4465621
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C102268210",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4944637",
    //                     "display_name": "Border cells",
    //                     "level": 3,
    //                     "score": 0.4318996
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776359362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2145286",
    //                     "display_name": "Representation (politics)",
    //                     "level": 3,
    //                     "score": 0.42860028
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C80551277",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11210",
    //                     "display_name": "Coordinate system",
    //                     "level": 2,
    //                     "score": 0.41263625
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C1491633281",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7868",
    //                     "display_name": "Cell",
    //                     "level": 2,
    //                     "score": 0.3758369
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C186060115",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q30336093",
    //                     "display_name": "Biological system",
    //                     "level": 1,
    //                     "score": 0.32905453
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.32011706
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86803240",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q420",
    //                     "display_name": "Biology",
    //                     "level": 0,
    //                     "score": 0.28120413
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C31972630",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q844240",
    //                     "display_name": "Computer vision",
    //                     "level": 1,
    //                     "score": 0.25419134
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.24346709
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2524010",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8087",
    //                     "display_name": "Geometry",
    //                     "level": 1,
    //                     "score": 0.18853837
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.18409273
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C192562407",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q228736",
    //                     "display_name": "Materials science",
    //                     "level": 0,
    //                     "score": 0.18266857
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781161787",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q48360",
    //                     "display_name": "Hippocampus",
    //                     "level": 2,
    //                     "score": 0.13581184
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C171250308",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11468",
    //                     "display_name": "Nanotechnology",
    //                     "level": 1,
    //                     "score": 0.11204451
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C54355233",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7162",
    //                     "display_name": "Genetics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C151730666",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7205",
    //                     "display_name": "Paleontology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C10138342",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q43015",
    //                     "display_name": "Finance",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C162324750",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8134",
    //                     "display_name": "Economics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199539241",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7748",
    //                     "display_name": "Law",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C94625758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7163",
    //                     "display_name": "Politics",
    //                     "level": 2,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "Q000166",
    //                     "qualifier_name": "cytology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009415",
    //                     "descriptor_name": "Nerve Net",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009949",
    //                     "descriptor_name": "Orientation",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D013028",
    //                     "descriptor_name": "Space Perception",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D004594",
    //                     "descriptor_name": "Electrophysiology",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D005106",
    //                     "descriptor_name": "Exploratory Behavior",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D008124",
    //                     "descriptor_name": "Locomotion",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D008297",
    //                     "descriptor_name": "Male",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009415",
    //                     "descriptor_name": "Nerve Net",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D051381",
    //                     "descriptor_name": "Rats",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D020318",
    //                     "descriptor_name": "Rats, Long-Evans",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1126/science.1125572",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S3880285",
    //                         "display_name": "Science",
    //                         "issn_l": "0036-8075",
    //                         "issn": [
    //                             "0036-8075",
    //                             "1095-9203"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310315823",
    //                         "host_organization_name": "American Association for the Advancement of Science",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310315823"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "American Association for the Advancement of Science"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/16675704",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 35,
    //             "referenced_works": [
    //                 "https://openalex.org/W1563845916",
    //                 "https://openalex.org/W1601948836",
    //                 "https://openalex.org/W1927777346",
    //                 "https://openalex.org/W1970792572",
    //                 "https://openalex.org/W1993428681",
    //                 "https://openalex.org/W1999542375",
    //                 "https://openalex.org/W2007181151",
    //                 "https://openalex.org/W2016867540",
    //                 "https://openalex.org/W2018196751",
    //                 "https://openalex.org/W2023486727",
    //                 "https://openalex.org/W2028223342",
    //                 "https://openalex.org/W2057470835",
    //                 "https://openalex.org/W2058874687",
    //                 "https://openalex.org/W2068621891",
    //                 "https://openalex.org/W2083947963",
    //                 "https://openalex.org/W2089586993",
    //                 "https://openalex.org/W2096297854",
    //                 "https://openalex.org/W2098731130",
    //                 "https://openalex.org/W2103692957",
    //                 "https://openalex.org/W2103853773",
    //                 "https://openalex.org/W2103934527",
    //                 "https://openalex.org/W2107852368",
    //                 "https://openalex.org/W2120127728",
    //                 "https://openalex.org/W2122638812",
    //                 "https://openalex.org/W2138418141",
    //                 "https://openalex.org/W2144309171",
    //                 "https://openalex.org/W2149422514",
    //                 "https://openalex.org/W2157198262",
    //                 "https://openalex.org/W2158356681",
    //                 "https://openalex.org/W2165443127",
    //                 "https://openalex.org/W2167357910",
    //                 "https://openalex.org/W2167403166",
    //                 "https://openalex.org/W2312623844",
    //                 "https://openalex.org/W4250749137",
    //                 "https://openalex.org/W4252767703"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W2782284634",
    //                 "https://openalex.org/W2752705196",
    //                 "https://openalex.org/W2734976771",
    //                 "https://openalex.org/W2588613639",
    //                 "https://openalex.org/W2173156181",
    //                 "https://openalex.org/W2159974730",
    //                 "https://openalex.org/W2099901929",
    //                 "https://openalex.org/W2092580449",
    //                 "https://openalex.org/W2009069136",
    //                 "https://openalex.org/W1725969320"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Grid": [
    //                     0
    //                 ],
    //                 "cells": [
    //                     1,
    //                     55,
    //                     59,
    //                     65
    //                 ],
    //                 "in": [
    //                     2,
    //                     27,
    //                     40,
    //                     66,
    //                     86
    //                 ],
    //                 "the": [
    //                     3,
    //                     28,
    //                     67
    //                 ],
    //                 "medial": [
    //                     4
    //                 ],
    //                 "entorhinal": [
    //                     5
    //                 ],
    //                 "cortex": [
    //                     6
    //                 ],
    //                 "(MEC)": [
    //                     7
    //                 ],
    //                 "are": [
    //                     8
    //                 ],
    //                 "part": [
    //                     9
    //                 ],
    //                 "of": [
    //                     10,
    //                     38,
    //                     80
    //                 ],
    //                 "an": [
    //                     11
    //                 ],
    //                 "environment-independent": [
    //                     12
    //                 ],
    //                 "spatial": [
    //                     13
    //                 ],
    //                 "coordinate": [
    //                     14
    //                 ],
    //                 "system.": [
    //                     15
    //                 ],
    //                 "To": [
    //                     16
    //                 ],
    //                 "determine": [
    //                     17
    //                 ],
    //                 "how": [
    //                     18
    //                 ],
    //                 "information": [
    //                     19,
    //                     85
    //                 ],
    //                 "about": [
    //                     20
    //                 ],
    //                 "location,": [
    //                     21
    //                 ],
    //                 "direction,": [
    //                     22
    //                 ],
    //                 "and": [
    //                     23,
    //                     60,
    //                     83
    //                 ],
    //                 "distance": [
    //                     24
    //                 ],
    //                 "is": [
    //                     25
    //                 ],
    //                 "integrated": [
    //                     26
    //                 ],
    //                 "grid-cell": [
    //                     29
    //                 ],
    //                 "network,": [
    //                     30
    //                 ],
    //                 "we": [
    //                     31
    //                 ],
    //                 "recorded": [
    //                     32
    //                 ],
    //                 "from": [
    //                     33
    //                 ],
    //                 "each": [
    //                     34
    //                 ],
    //                 "principal": [
    //                     35
    //                 ],
    //                 "cell": [
    //                     36,
    //                     71,
    //                     90
    //                 ],
    //                 "layer": [
    //                     37,
    //                     47
    //                 ],
    //                 "MEC": [
    //                     39,
    //                     89
    //                 ],
    //                 "rats": [
    //                     41
    //                 ],
    //                 "that": [
    //                     42
    //                 ],
    //                 "explored": [
    //                     43
    //                 ],
    //                 "two-dimensional": [
    //                     44
    //                 ],
    //                 "environments.": [
    //                     45
    //                 ],
    //                 "Whereas": [
    //                     46
    //                 ],
    //                 "II": [
    //                     48
    //                 ],
    //                 "was": [
    //                     49
    //                 ],
    //                 "predominated": [
    //                     50
    //                 ],
    //                 "by": [
    //                     51,
    //                     75
    //                 ],
    //                 "grid": [
    //                     52,
    //                     54,
    //                     62,
    //                     94
    //                 ],
    //                 "cells,": [
    //                     53
    //                 ],
    //                 "colocalized": [
    //                     56
    //                 ],
    //                 "with": [
    //                     57
    //                 ],
    //                 "head-direction": [
    //                     58,
    //                     64
    //                 ],
    //                 "conjunctive": [
    //                     61
    //                 ],
    //                 "x": [
    //                     63
    //                 ],
    //                 "deeper": [
    //                     68
    //                 ],
    //                 "layers.": [
    //                     69
    //                 ],
    //                 "All": [
    //                     70
    //                 ],
    //                 "types": [
    //                     72
    //                 ],
    //                 "were": [
    //                     73
    //                 ],
    //                 "modulated": [
    //                     74
    //                 ],
    //                 "running": [
    //                     76
    //                 ],
    //                 "speed.": [
    //                     77
    //                 ],
    //                 "The": [
    //                     78
    //                 ],
    //                 "conjunction": [
    //                     79
    //                 ],
    //                 "positional,": [
    //                     81
    //                 ],
    //                 "directional,": [
    //                     82
    //                 ],
    //                 "translational": [
    //                     84
    //                 ],
    //                 "a": [
    //                     87
    //                 ],
    //                 "single": [
    //                     88
    //                 ],
    //                 "type": [
    //                     91
    //                 ],
    //                 "may": [
    //                     92
    //                 ],
    //                 "enable": [
    //                     93
    //                 ],
    //                 "coordinates": [
    //                     95
    //                 ],
    //                 "to": [
    //                     96
    //                 ],
    //                 "be": [
    //                     97
    //                 ],
    //                 "updated": [
    //                     98
    //                 ],
    //                 "during": [
    //                     99
    //                 ],
    //                 "self-motion-based": [
    //                     100
    //                 ],
    //                 "navigation.": [
    //                     101
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2092580449",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 5
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 103
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 112
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 80
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 96
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 87
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 110
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 108
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 99
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 58
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 97
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 89
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 68
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 68
    //                 }
    //             ],
    //             "updated_date": "2025-02-26T09:14:03.831856",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2594908799",
    //             "doi": null,
    //             "title": "Proceedings for the Annual Meeting of the Cognitive Science Society",
    //             "display_name": "Proceedings for the Annual Meeting of the Cognitive Science Society",
    //             "publication_year": 2013,
    //             "publication_date": "2013-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2594908799",
    //                 "mag": "2594908799"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://www.research.ed.ac.uk/portal/en/publications/objectbased-saliency-as-a-predictor-of-attention-in-visual-tasks(8922a674-44f5-4151-8fae-e9039775e5b7).html",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5083564491",
    //                         "display_name": "Michal Dziemianko",
    //                         "orcid": null
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Michal Dziemianko",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5027428093",
    //                         "display_name": "Alasdair D. F. Clarke",
    //                         "orcid": "https://orcid.org/0000-0002-7368-2351"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Alasdair Clarke",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5054936589",
    //                         "display_name": "Frank Keller",
    //                         "orcid": "https://orcid.org/0000-0002-8242-4362"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Frank Keller",
    //                     "raw_affiliation_strings": [
    //                         "School of Informatics"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Informatics",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 0,
    //             "institutions_distinct_count": 0,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 13.608,
    //             "has_fulltext": false,
    //             "cited_by_count": 1298,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999969,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12805",
    //                 "display_name": "Cognitive Science and Mapping",
    //                 "score": 0.2217,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12805",
    //                     "display_name": "Cognitive Science and Mapping",
    //                     "score": 0.2217,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.47835225
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.36744383
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.32399994
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://www.research.ed.ac.uk/portal/en/publications/objectbased-saliency-as-a-predictor-of-attention-in-visual-tasks(8922a674-44f5-4151-8fae-e9039775e5b7).html",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2594908799",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 10
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 293
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 236
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 190
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 174
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 148
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 102
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 58
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 11
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 8
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 12
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 8
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 8
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 4
    //                 }
    //             ],
    //             "updated_date": "2025-02-27T11:32:14.922101",
    //             "created_date": "2017-03-16"
    //         },
    //         {
    //             "id": "https://openalex.org/W2148228392",
    //             "doi": "https://doi.org/10.1007/978-1-4613-8997-2_14",
    //             "title": "Estimating Uncertain Spatial Relationships in Robotics",
    //             "display_name": "Estimating Uncertain Spatial Relationships in Robotics",
    //             "publication_year": 1990,
    //             "publication_date": "1990-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2148228392",
    //                 "doi": "https://doi.org/10.1007/978-1-4613-8997-2_14",
    //                 "mag": "2148228392"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1007/978-1-4613-8997-2_14",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4306463937",
    //                     "display_name": "Springer eBooks",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/P4310319965",
    //                     "host_organization_name": "Springer Nature",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319965"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Springer Nature"
    //                     ],
    //                     "type": "ebook platform"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "book-chapter",
    //             "type_crossref": "book-chapter",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5058353646",
    //                         "display_name": "Randall K. Smith",
    //                         "orcid": "https://orcid.org/0000-0003-4284-4167"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1298353152",
    //                             "display_name": "SRI International",
    //                             "ror": "https://ror.org/05s570m15",
    //                             "country_code": "US",
    //                             "type": "nonprofit",
    //                             "lineage": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Randall Smith",
    //                     "raw_affiliation_strings": [
    //                         "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5064779799",
    //                         "display_name": "Matthew W. Self",
    //                         "orcid": "https://orcid.org/0000-0001-5731-579X"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1298353152",
    //                             "display_name": "SRI International",
    //                             "ror": "https://ror.org/05s570m15",
    //                             "country_code": "US",
    //                             "type": "nonprofit",
    //                             "lineage": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Matthew Self",
    //                     "raw_affiliation_strings": [
    //                         "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5113699846",
    //                         "display_name": "Peter Cheeseman",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1298353152",
    //                             "display_name": "SRI International",
    //                             "ror": "https://ror.org/05s570m15",
    //                             "country_code": "US",
    //                             "type": "nonprofit",
    //                             "lineage": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Peter Cheeseman",
    //                     "raw_affiliation_strings": [
    //                         "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "SRI International, 333 Ravenswood Avenue, Menlo Park, California, 94025, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1298353152"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 3.468,
    //             "has_fulltext": false,
    //             "cited_by_count": 1200,
    //             "citation_normalized_percentile": {
    //                 "value": 0.998158,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": "167",
    //                 "last_page": "193"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T11596",
    //                 "display_name": "Constraint Satisfaction and Optimization",
    //                 "score": 0.9812,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1705",
    //                     "display_name": "Computer Networks and Communications"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T11596",
    //                     "display_name": "Constraint Satisfaction and Optimization",
    //                     "score": 0.9812,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1705",
    //                         "display_name": "Computer Networks and Communications"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10906",
    //                     "display_name": "AI-based Problem Solving and Planning",
    //                     "score": 0.9576,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10142",
    //                     "display_name": "Formal Methods in Verification",
    //                     "score": 0.9508,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1703",
    //                         "display_name": "Computational Theory and Mathematics"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/representation",
    //                     "display_name": "Representation",
    //                     "score": 0.5972301
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/spatial-contextual-awareness",
    //                     "display_name": "Spatial contextual awareness",
    //                     "score": 0.5256699
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/basis",
    //                     "display_name": "Basis (linear algebra)",
    //                     "score": 0.49374875
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C49937458",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2599292",
    //                     "display_name": "Probabilistic logic",
    //                     "level": 2,
    //                     "score": 0.62782574
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776359362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2145286",
    //                     "display_name": "Representation (politics)",
    //                     "level": 3,
    //                     "score": 0.5972301
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.5601246
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.5558115
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2779343474",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3109175",
    //                     "display_name": "Context (archaeology)",
    //                     "level": 2,
    //                     "score": 0.5295535
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C64754055",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7574053",
    //                     "display_name": "Spatial contextual awareness",
    //                     "level": 2,
    //                     "score": 0.5256699
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C159620131",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1938983",
    //                     "display_name": "Spatial analysis",
    //                     "level": 2,
    //                     "score": 0.5031361
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C12426560",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q189569",
    //                     "display_name": "Basis (linear algebra)",
    //                     "level": 2,
    //                     "score": 0.49374875
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C34413123",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q170978",
    //                     "display_name": "Robotics",
    //                     "level": 3,
    //                     "score": 0.49135008
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C48103436",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q599031",
    //                     "display_name": "State (computer science)",
    //                     "level": 2,
    //                     "score": 0.4308282
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C124101348",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q172491",
    //                     "display_name": "Data mining",
    //                     "level": 1,
    //                     "score": 0.39254034
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C119857082",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2539",
    //                     "display_name": "Machine learning",
    //                     "level": 1,
    //                     "score": 0.37825117
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.2757582
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.21223506
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C205649164",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1071",
    //                     "display_name": "Geography",
    //                     "level": 0,
    //                     "score": 0.21199375
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.17538586
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C105795698",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12483",
    //                     "display_name": "Statistics",
    //                     "level": 1,
    //                     "score": 0.11941069
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2524010",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8087",
    //                     "display_name": "Geometry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C166957645",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q23498",
    //                     "display_name": "Archaeology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C94625758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7163",
    //                     "display_name": "Politics",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199539241",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7748",
    //                     "display_name": "Law",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1007/978-1-4613-8997-2_14",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306463937",
    //                         "display_name": "Springer eBooks",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/P4310319965",
    //                         "host_organization_name": "Springer Nature",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319965"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Springer Nature"
    //                         ],
    //                         "type": "ebook platform"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.74,
    //                     "display_name": "Quality education",
    //                     "id": "https://metadata.un.org/sdg/4"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 10,
    //             "referenced_works": [
    //                 "https://openalex.org/W1559007363",
    //                 "https://openalex.org/W1582353822",
    //                 "https://openalex.org/W1586172726",
    //                 "https://openalex.org/W1599888605",
    //                 "https://openalex.org/W1667165204",
    //                 "https://openalex.org/W1990012555",
    //                 "https://openalex.org/W2018778695",
    //                 "https://openalex.org/W2067063617",
    //                 "https://openalex.org/W296177570",
    //                 "https://openalex.org/W304861154"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4322212724",
    //                 "https://openalex.org/W3148227991",
    //                 "https://openalex.org/W3081561710",
    //                 "https://openalex.org/W2771174107",
    //                 "https://openalex.org/W2477413883",
    //                 "https://openalex.org/W2463773089",
    //                 "https://openalex.org/W2344941099",
    //                 "https://openalex.org/W2106788855",
    //                 "https://openalex.org/W1536965844",
    //                 "https://openalex.org/W1486593826"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2148228392",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 1
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 13
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 35
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 40
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 39
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 35
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 44
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 42
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 51
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 39
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 46
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 65
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 73
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 67
    //                 }
    //             ],
    //             "updated_date": "2025-02-16T14:03:01.383641",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2615322227",
    //             "doi": null,
    //             "title": "Proceedings of the 35th Annual Conference of the Cognitive Science Society",
    //             "display_name": "Proceedings of the 35th Annual Conference of the Cognitive Science Society",
    //             "publication_year": 2013,
    //             "publication_date": "2013-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2615322227",
    //                 "mag": "2615322227"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "http://www.research.ed.ac.uk/portal/en/publications/embodied-approaches-to-interpersonal-coordination-infants-adults-robots-and-agents(aec25c9d-db53-4a54-945f-cb518cbb79dc).html",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5084091340",
    //                         "display_name": "Rick Dale",
    //                         "orcid": "https://orcid.org/0000-0001-7865-474X"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Rick Dale",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5065927014",
    //                         "display_name": "Yu Chen",
    //                         "orcid": "https://orcid.org/0000-0002-7694-4441"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Chen Yu",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5067742588",
    //                         "display_name": "Yukie Nagai",
    //                         "orcid": "https://orcid.org/0000-0003-4794-0940"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yukie Nagai",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5048332617",
    //                         "display_name": "Moreno I. Coco",
    //                         "orcid": "https://orcid.org/0000-0002-2825-4200"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Moreno Coco",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5043486945",
    //                         "display_name": "Stefan Kopp",
    //                         "orcid": "https://orcid.org/0000-0002-4047-9277"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Stefan Kopp",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 0,
    //             "institutions_distinct_count": 0,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 166.32,
    //             "has_fulltext": false,
    //             "cited_by_count": 1003,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999969,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12805",
    //                 "display_name": "Cognitive Science and Mapping",
    //                 "score": 0.2462,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12805",
    //                     "display_name": "Cognitive Science and Mapping",
    //                     "score": 0.2462,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.42463216
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.4069444
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55587333",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1133029",
    //                     "display_name": "Engineering ethics",
    //                     "level": 1,
    //                     "score": 0.37706363
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.26590618
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C127413603",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11023",
    //                     "display_name": "Engineering",
    //                     "level": 0,
    //                     "score": 0.19551367
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "http://www.research.ed.ac.uk/portal/en/publications/embodied-approaches-to-interpersonal-coordination-infants-adults-robots-and-agents(aec25c9d-db53-4a54-945f-cb518cbb79dc).html",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2615322227",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 5
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 36
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 33
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 56
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 84
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 97
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 102
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 127
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 149
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 153
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 102
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 36
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 8
    //                 }
    //             ],
    //             "updated_date": "2025-03-02T16:56:49.596985",
    //             "created_date": "2017-05-26"
    //         },
    //         {
    //             "id": "https://openalex.org/W2149422514",
    //             "doi": "https://doi.org/10.1523/jneurosci.17-15-05900.1997",
    //             "title": "Path Integration and Cognitive Mapping in a Continuous Attractor Neural Network Model",
    //             "display_name": "Path Integration and Cognitive Mapping in a Continuous Attractor Neural Network Model",
    //             "publication_year": 1997,
    //             "publication_date": "1997-08-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2149422514",
    //                 "doi": "https://doi.org/10.1523/jneurosci.17-15-05900.1997",
    //                 "mag": "2149422514",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/9221787",
    //                 "pmcid": "https://www.ncbi.nlm.nih.gov/pmc/articles/6573219"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1523/jneurosci.17-15-05900.1997",
    //                 "pdf_url": "https://www.jneurosci.org/content/jneuro/17/15/5900.full.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S5555990",
    //                     "display_name": "Journal of Neuroscience",
    //                     "issn_l": "0270-6474",
    //                     "issn": [
    //                         "0270-6474",
    //                         "1529-2401"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319739",
    //                     "host_organization_name": "Society for Neuroscience",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319739"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Society for Neuroscience"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "cc-by-nc-sa",
    //                 "license_id": "https://openalex.org/licenses/cc-by-nc-sa",
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "hybrid",
    //                 "oa_url": "https://www.jneurosci.org/content/jneuro/17/15/5900.full.pdf",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5043347767",
    //                         "display_name": "Alexei V. Samsonovich",
    //                         "orcid": "https://orcid.org/0000-0003-4788-4408"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Alexei Samsonovich",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory and Aging, The University of Arizona,  Tucson, Arizona 85749"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory and Aging, The University of Arizona,  Tucson, Arizona 85749",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5041993733",
    //                         "display_name": "Bruce L. McNaughton",
    //                         "orcid": "https://orcid.org/0000-0002-2080-5258"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I138006243",
    //                             "display_name": "University of Arizona",
    //                             "ror": "https://ror.org/03m2x1q45",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Bruce L. McNaughton",
    //                     "raw_affiliation_strings": [
    //                         "Arizona Research Laboratories Division of Neural Systems, Memory and Aging, The University of Arizona,  Tucson, Arizona 85749"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Arizona Research Laboratories Division of Neural Systems, Memory and Aging, The University of Arizona,  Tucson, Arizona 85749",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I138006243"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 12.277,
    //             "has_fulltext": true,
    //             "fulltext_origin": "pdf",
    //             "cited_by_count": 984,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999814,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "17",
    //                 "issue": "15",
    //                 "first_page": "5900",
    //                 "last_page": "5920"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10448",
    //                 "display_name": "Memory and Neural Mechanisms",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10448",
    //                     "display_name": "Memory and Neural Mechanisms",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9993,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10077",
    //                     "display_name": "Neuroscience and Neuropharmacology Research",
    //                     "score": 0.9979,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/representation",
    //                     "display_name": "Representation",
    //                     "score": 0.6086579
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/associative-property",
    //                     "display_name": "Associative property",
    //                     "score": 0.5842795
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/cognitive-map",
    //                     "display_name": "Cognitive map",
    //                     "score": 0.5229055
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.5030183
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C164380108",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q507187",
    //                     "display_name": "Attractor",
    //                     "level": 2,
    //                     "score": 0.799898
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.6279465
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776359362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2145286",
    //                     "display_name": "Representation (politics)",
    //                     "level": 3,
    //                     "score": 0.6086579
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C159423971",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q177251",
    //                     "display_name": "Associative property",
    //                     "level": 2,
    //                     "score": 0.5842795
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C170494330",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1778434",
    //                     "display_name": "Cognitive map",
    //                     "level": 3,
    //                     "score": 0.5229055
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.5030183
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C190812933",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q28923",
    //                     "display_name": "Chart",
    //                     "level": 2,
    //                     "score": 0.48373368
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C80444323",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2878974",
    //                     "display_name": "Theoretical computer science",
    //                     "level": 1,
    //                     "score": 0.44584948
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2777735758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q817765",
    //                     "display_name": "Path (computing)",
    //                     "level": 2,
    //                     "score": 0.44162363
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C9652623",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q190109",
    //                     "display_name": "Field (mathematics)",
    //                     "level": 2,
    //                     "score": 0.4174257
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781238097",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q175026",
    //                     "display_name": "Object (grammar)",
    //                     "level": 2,
    //                     "score": 0.41612592
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C177264268",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1514741",
    //                     "display_name": "Set (abstract data type)",
    //                     "level": 2,
    //                     "score": 0.41279367
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.38096404
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C184720557",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7825049",
    //                     "display_name": "Topology (electrical circuits)",
    //                     "level": 2,
    //                     "score": 0.3306738
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.3039194
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.28565463
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.2638507
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.126869
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C134306372",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7754",
    //                     "display_name": "Mathematical analysis",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C105795698",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12483",
    //                     "display_name": "Statistics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C94625758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7163",
    //                     "display_name": "Politics",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C202444582",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q837863",
    //                     "display_name": "Pure mathematics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199539241",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7748",
    //                     "display_name": "Law",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86803240",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q420",
    //                     "display_name": "Biology",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199360897",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9143",
    //                     "display_name": "Programming language",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C114614502",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q76592",
    //                     "display_name": "Combinatorics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D006624",
    //                     "descriptor_name": "Hippocampus",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001931",
    //                     "descriptor_name": "Brain Mapping",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D016571",
    //                     "descriptor_name": "Neural Networks, Computer",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D051381",
    //                     "descriptor_name": "Rats",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 4,
    //             "locations": [
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://doi.org/10.1523/jneurosci.17-15-05900.1997",
    //                     "pdf_url": "https://www.jneurosci.org/content/jneuro/17/15/5900.full.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S5555990",
    //                         "display_name": "Journal of Neuroscience",
    //                         "issn_l": "0270-6474",
    //                         "issn": [
    //                             "0270-6474",
    //                             "1529-2401"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319739",
    //                         "host_organization_name": "Society for Neuroscience",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319739"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Society for Neuroscience"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": "cc-by-nc-sa",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc-sa",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://europepmc.org/articles/pmc6573219",
    //                     "pdf_url": "https://europepmc.org/articles/pmc6573219?pdf=render",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400806",
    //                         "display_name": "Europe PMC (PubMed Central)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1303153112",
    //                         "host_organization_name": "European Bioinformatics Institute",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1303153112"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "European Bioinformatics Institute"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "cc-by-nc-sa",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc-sa",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6573219",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S2764455111",
    //                         "display_name": "PubMed Central",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/9221787",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1523/jneurosci.17-15-05900.1997",
    //                 "pdf_url": "https://www.jneurosci.org/content/jneuro/17/15/5900.full.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S5555990",
    //                     "display_name": "Journal of Neuroscience",
    //                     "issn_l": "0270-6474",
    //                     "issn": [
    //                         "0270-6474",
    //                         "1529-2401"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319739",
    //                     "host_organization_name": "Society for Neuroscience",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319739"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Society for Neuroscience"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "cc-by-nc-sa",
    //                 "license_id": "https://openalex.org/licenses/cc-by-nc-sa",
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.54,
    //                     "display_name": "Sustainable cities and communities",
    //                     "id": "https://metadata.un.org/sdg/11"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 95,
    //             "referenced_works": [
    //                 "https://openalex.org/W146465976",
    //                 "https://openalex.org/W1504615859",
    //                 "https://openalex.org/W1520649049",
    //                 "https://openalex.org/W1540528271",
    //                 "https://openalex.org/W1543297064",
    //                 "https://openalex.org/W1558736138",
    //                 "https://openalex.org/W1563845916",
    //                 "https://openalex.org/W1568903867",
    //                 "https://openalex.org/W1583485127",
    //                 "https://openalex.org/W1585564530",
    //                 "https://openalex.org/W1603106091",
    //                 "https://openalex.org/W1807979745",
    //                 "https://openalex.org/W1809836650",
    //                 "https://openalex.org/W1826201647",
    //                 "https://openalex.org/W184808134",
    //                 "https://openalex.org/W1876456565",
    //                 "https://openalex.org/W1884390770",
    //                 "https://openalex.org/W1898031307",
    //                 "https://openalex.org/W1927777346",
    //                 "https://openalex.org/W1950306692",
    //                 "https://openalex.org/W1969769253",
    //                 "https://openalex.org/W1974719406",
    //                 "https://openalex.org/W1976596954",
    //                 "https://openalex.org/W1978287828",
    //                 "https://openalex.org/W1979533714",
    //                 "https://openalex.org/W1980815238",
    //                 "https://openalex.org/W1983726878",
    //                 "https://openalex.org/W1985638078",
    //                 "https://openalex.org/W1985934255",
    //                 "https://openalex.org/W1988399537",
    //                 "https://openalex.org/W1993848606",
    //                 "https://openalex.org/W1995062437",
    //                 "https://openalex.org/W1996239128",
    //                 "https://openalex.org/W1998338384",
    //                 "https://openalex.org/W1998955447",
    //                 "https://openalex.org/W2000775105",
    //                 "https://openalex.org/W2004725045",
    //                 "https://openalex.org/W2006933602",
    //                 "https://openalex.org/W2007793206",
    //                 "https://openalex.org/W2008579006",
    //                 "https://openalex.org/W2016332821",
    //                 "https://openalex.org/W2017914203",
    //                 "https://openalex.org/W2018502805",
    //                 "https://openalex.org/W2018529924",
    //                 "https://openalex.org/W2023366928",
    //                 "https://openalex.org/W2023486727",
    //                 "https://openalex.org/W2027457149",
    //                 "https://openalex.org/W2028727099",
    //                 "https://openalex.org/W2029374903",
    //                 "https://openalex.org/W2034177094",
    //                 "https://openalex.org/W2037339449",
    //                 "https://openalex.org/W2038371209",
    //                 "https://openalex.org/W2052515926",
    //                 "https://openalex.org/W2053967108",
    //                 "https://openalex.org/W2054807558",
    //                 "https://openalex.org/W2060841481",
    //                 "https://openalex.org/W2061922686",
    //                 "https://openalex.org/W2063379973",
    //                 "https://openalex.org/W2070329896",
    //                 "https://openalex.org/W2073055671",
    //                 "https://openalex.org/W2079390801",
    //                 "https://openalex.org/W2085358606",
    //                 "https://openalex.org/W2088744610",
    //                 "https://openalex.org/W2092873052",
    //                 "https://openalex.org/W2094572233",
    //                 "https://openalex.org/W2096032973",
    //                 "https://openalex.org/W2096297854",
    //                 "https://openalex.org/W2100686511",
    //                 "https://openalex.org/W2102984289",
    //                 "https://openalex.org/W2103692957",
    //                 "https://openalex.org/W2103853773",
    //                 "https://openalex.org/W2107677787",
    //                 "https://openalex.org/W2113273079",
    //                 "https://openalex.org/W2115168690",
    //                 "https://openalex.org/W2119565218",
    //                 "https://openalex.org/W2125647716",
    //                 "https://openalex.org/W2129707824",
    //                 "https://openalex.org/W2136116663",
    //                 "https://openalex.org/W2147502381",
    //                 "https://openalex.org/W2148741637",
    //                 "https://openalex.org/W2149935905",
    //                 "https://openalex.org/W2154914851",
    //                 "https://openalex.org/W2155598451",
    //                 "https://openalex.org/W2165443127",
    //                 "https://openalex.org/W2167403166",
    //                 "https://openalex.org/W2187698490",
    //                 "https://openalex.org/W2308000191",
    //                 "https://openalex.org/W2312623844",
    //                 "https://openalex.org/W2315543751",
    //                 "https://openalex.org/W2322464310",
    //                 "https://openalex.org/W2332437843",
    //                 "https://openalex.org/W30129623",
    //                 "https://openalex.org/W4235952985",
    //                 "https://openalex.org/W4239020410",
    //                 "https://openalex.org/W4285719527"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4388291344",
    //                 "https://openalex.org/W4293192753",
    //                 "https://openalex.org/W4239758463",
    //                 "https://openalex.org/W3210322369",
    //                 "https://openalex.org/W3086812476",
    //                 "https://openalex.org/W2970587290",
    //                 "https://openalex.org/W2794114929",
    //                 "https://openalex.org/W2118686323",
    //                 "https://openalex.org/W2029474926",
    //                 "https://openalex.org/W1888401369"
    //             ],
    //             "abstract_inverted_index": {
    //                 "A": [
    //                     0
    //                 ],
    //                 "minimal": [
    //                     1
    //                 ],
    //                 "synaptic": [
    //                     2
    //                 ],
    //                 "architecture": [
    //                     3
    //                 ],
    //                 "is": [
    //                     4,
    //                     100,
    //                     117,
    //                     132,
    //                     150,
    //                     175,
    //                     198
    //                 ],
    //                 "proposed": [
    //                     5,
    //                     176,
    //                     295
    //                 ],
    //                 "for": [
    //                     6,
    //                     181,
    //                     240
    //                 ],
    //                 "how": [
    //                     7
    //                 ],
    //                 "the": [
    //                     8,
    //                     16,
    //                     23,
    //                     28,
    //                     34,
    //                     90,
    //                     103,
    //                     113,
    //                     125,
    //                     138,
    //                     144,
    //                     193,
    //                     215,
    //                     221,
    //                     283,
    //                     294
    //                 ],
    //                 "brain": [
    //                     9
    //                 ],
    //                 "might": [
    //                     10
    //                 ],
    //                 "perform": [
    //                     11
    //                 ],
    //                 "path": [
    //                     12
    //                 ],
    //                 "integration": [
    //                     13
    //                 ],
    //                 "by": [
    //                     14,
    //                     229
    //                 ],
    //                 "computing": [
    //                     15
    //                 ],
    //                 "next": [
    //                     17
    //                 ],
    //                 "internal": [
    //                     18
    //                 ],
    //                 "representation": [
    //                     19,
    //                     25
    //                 ],
    //                 "of": [
    //                     20,
    //                     31,
    //                     105,
    //                     127,
    //                     137,
    //                     140,
    //                     156,
    //                     168,
    //                     205,
    //                     217,
    //                     220,
    //                     232,
    //                     243,
    //                     286,
    //                     293
    //                 ],
    //                 "self-location": [
    //                     21
    //                 ],
    //                 "from": [
    //                     22,
    //                     27
    //                 ],
    //                 "current": [
    //                     24
    //                 ],
    //                 "and": [
    //                     26,
    //                     70,
    //                     86,
    //                     98,
    //                     208,
    //                     271,
    //                     290
    //                 ],
    //                 "perceived": [
    //                     29
    //                 ],
    //                 "velocity": [
    //                     30
    //                 ],
    //                 "motion.": [
    //                     32
    //                 ],
    //                 "In": [
    //                     33,
    //                     73
    //                 ],
    //                 "model,": [
    //                     35
    //                 ],
    //                 "a": [
    //                     36,
    //                     40,
    //                     43,
    //                     128,
    //                     134,
    //                     178,
    //                     203,
    //                     210,
    //                     225,
    //                     230,
    //                     241,
    //                     261,
    //                     268
    //                 ],
    //                 "place-cell": [
    //                     37
    //                 ],
    //                 "assembly": [
    //                     38
    //                 ],
    //                 "called": [
    //                     39,
    //                     47
    //                 ],
    //                 "\"chart\"": [
    //                     41
    //                 ],
    //                 "contains": [
    //                     42
    //                 ],
    //                 "two-dimensional": [
    //                     44
    //                 ],
    //                 "attractor": [
    //                     45
    //                 ],
    //                 "set": [
    //                     46
    //                 ],
    //                 "an": [
    //                     48,
    //                     238
    //                 ],
    //                 "\"attractor": [
    //                     49
    //                 ],
    //                 "map\"": [
    //                     50
    //                 ],
    //                 "that": [
    //                     51,
    //                     102,
    //                     108
    //                 ],
    //                 "can": [
    //                     52,
    //                     109
    //                 ],
    //                 "be": [
    //                     53,
    //                     110
    //                 ],
    //                 "used": [
    //                     54
    //                 ],
    //                 "to": [
    //                     55,
    //                     122,
    //                     154,
    //                     214
    //                 ],
    //                 "represent": [
    //                     56
    //                 ],
    //                 "coordinates": [
    //                     57
    //                 ],
    //                 "in": [
    //                     58,
    //                     83,
    //                     95,
    //                     112,
    //                     188,
    //                     255,
    //                     260,
    //                     267
    //                 ],
    //                 "any": [
    //                     59,
    //                     161
    //                 ],
    //                 "arbitrary": [
    //                     60
    //                 ],
    //                 "environment,": [
    //                     61,
    //                     270
    //                 ],
    //                 "once": [
    //                     62
    //                 ],
    //                 "associative": [
    //                     63
    //                 ],
    //                 "binding": [
    //                     64
    //                 ],
    //                 "has": [
    //                     65
    //                 ],
    //                 "occurred": [
    //                     66
    //                 ],
    //                 "between": [
    //                     67
    //                 ],
    //                 "chart": [
    //                     68
    //                 ],
    //                 "locations": [
    //                     69
    //                 ],
    //                 "sensory": [
    //                     71
    //                 ],
    //                 "inputs.": [
    //                     72
    //                 ],
    //                 "hippocampus,": [
    //                     74
    //                 ],
    //                 "there": [
    //                     75
    //                 ],
    //                 "are": [
    //                     76
    //                 ],
    //                 "different": [
    //                     77,
    //                     84
    //                 ],
    //                 "spatial": [
    //                     78
    //                 ],
    //                 "relations": [
    //                     79
    //                 ],
    //                 "among": [
    //                     80
    //                 ],
    //                 "place": [
    //                     81,
    //                     130,
    //                     157,
    //                     249,
    //                     288
    //                 ],
    //                 "fields": [
    //                     82
    //                 ],
    //                 "environments": [
    //                     85
    //                 ],
    //                 "behavioral": [
    //                     87
    //                 ],
    //                 "contexts.": [
    //                     88
    //                 ],
    //                 "Thus,": [
    //                     89
    //                 ],
    //                 "same": [
    //                     91,
    //                     114
    //                 ],
    //                 "units": [
    //                     92,
    //                     207
    //                 ],
    //                 "may": [
    //                     93
    //                 ],
    //                 "participate": [
    //                     94
    //                 ],
    //                 "many": [
    //                     96
    //                 ],
    //                 "charts,": [
    //                     97
    //                 ],
    //                 "it": [
    //                     99,
    //                     149
    //                 ],
    //                 "shown": [
    //                     101
    //                 ],
    //                 "number": [
    //                     104,
    //                     242
    //                 ],
    //                 "uncorrelated": [
    //                     106
    //                 ],
    //                 "charts": [
    //                     107
    //                 ],
    //                 "encoded": [
    //                     111
    //                 ],
    //                 "recurrent": [
    //                     115,
    //                     170
    //                 ],
    //                 "network": [
    //                     116,
    //                     204
    //                 ],
    //                 "potentially": [
    //                     118
    //                 ],
    //                 "quite": [
    //                     119
    //                 ],
    //                 "large.": [
    //                     120
    //                 ],
    //                 "According": [
    //                     121
    //                 ],
    //                 "this": [
    //                     123,
    //                     182
    //                 ],
    //                 "theory,": [
    //                     124
    //                 ],
    //                 "firing": [
    //                     126
    //                 ],
    //                 "given": [
    //                     129
    //                 ],
    //                 "cell": [
    //                     131
    //                 ],
    //                 "primarily": [
    //                     133
    //                 ],
    //                 "cooperative": [
    //                     135
    //                 ],
    //                 "effect": [
    //                     136
    //                 ],
    //                 "activity": [
    //                     139
    //                 ],
    //                 "its": [
    //                     141,
    //                     169
    //                 ],
    //                 "neighbors": [
    //                     142
    //                 ],
    //                 "on": [
    //                     143,
    //                     224,
    //                     247
    //                 ],
    //                 "currently": [
    //                     145
    //                 ],
    //                 "active": [
    //                     146
    //                 ],
    //                 "chart.": [
    //                     147
    //                 ],
    //                 "Therefore,": [
    //                     148
    //                 ],
    //                 "not": [
    //                     151,
    //                     191
    //                 ],
    //                 "particularly": [
    //                     152
    //                 ],
    //                 "useful": [
    //                     153
    //                 ],
    //                 "think": [
    //                     155
    //                 ],
    //                 "cells": [
    //                     158,
    //                     289,
    //                     292
    //                 ],
    //                 "as": [
    //                     159,
    //                     177,
    //                     202,
    //                     209
    //                 ],
    //                 "encoding": [
    //                     160
    //                 ],
    //                 "particular": [
    //                     162
    //                 ],
    //                 "external": [
    //                     163
    //                 ],
    //                 "object": [
    //                     164
    //                 ],
    //                 "or": [
    //                     165
    //                 ],
    //                 "event.": [
    //                     166
    //                 ],
    //                 "Because": [
    //                     167
    //                 ],
    //                 "connections,": [
    //                     171
    //                 ],
    //                 "hippocampal": [
    //                     172,
    //                     248,
    //                     287
    //                 ],
    //                 "field": [
    //                     173
    //                 ],
    //                 "CA3": [
    //                     174
    //                 ],
    //                 "possible": [
    //                     179
    //                 ],
    //                 "location": [
    //                     180
    //                 ],
    //                 "\"multichart\"": [
    //                     183
    //                 ],
    //                 "architecture;": [
    //                     184
    //                 ],
    //                 "however,": [
    //                     185
    //                 ],
    //                 "other": [
    //                     186,
    //                     291
    //                 ],
    //                 "implementations": [
    //                     187
    //                 ],
    //                 "anatomy": [
    //                     189
    //                 ],
    //                 "would": [
    //                     190
    //                 ],
    //                 "invalidate": [
    //                     192
    //                 ],
    //                 "main": [
    //                     194
    //                 ],
    //                 "concepts.": [
    //                     195
    //                 ],
    //                 "The": [
    //                     196,
    //                     276
    //                 ],
    //                 "model": [
    //                     197,
    //                     277
    //                 ],
    //                 "implemented": [
    //                     199
    //                 ],
    //                 "numerically": [
    //                     200
    //                 ],
    //                 "both": [
    //                     201
    //                 ],
    //                 "integrate-and-fire": [
    //                     206
    //                 ],
    //                 "\"macroscopic\"": [
    //                     211
    //                 ],
    //                 "(with": [
    //                     212
    //                 ],
    //                 "respect": [
    //                     213
    //                 ],
    //                 "space": [
    //                     216
    //                 ],
    //                 "states)": [
    //                     218
    //                 ],
    //                 "description": [
    //                     219
    //                 ],
    //                 "system,": [
    //                     222
    //                 ],
    //                 "based": [
    //                     223
    //                 ],
    //                 "continuous": [
    //                     226
    //                 ],
    //                 "approximation": [
    //                     227
    //                 ],
    //                 "defined": [
    //                     228
    //                 ],
    //                 "system": [
    //                     231
    //                 ],
    //                 "stochastic": [
    //                     233
    //                 ],
    //                 "differential": [
    //                     234
    //                 ],
    //                 "equations.": [
    //                     235
    //                 ],
    //                 "It": [
    //                     236
    //                 ],
    //                 "provides": [
    //                     237
    //                 ],
    //                 "explanation": [
    //                     239
    //                 ],
    //                 "hitherto": [
    //                     244
    //                 ],
    //                 "perplexing": [
    //                     245
    //                 ],
    //                 "observations": [
    //                     246
    //                 ],
    //                 "fields,": [
    //                     250
    //                 ],
    //                 "including": [
    //                     251
    //                 ],
    //                 "doubling,": [
    //                     252
    //                 ],
    //                 "vanishing,": [
    //                     253
    //                 ],
    //                 "reshaping": [
    //                     254
    //                 ],
    //                 "distorted": [
    //                     256
    //                 ],
    //                 "environments,": [
    //                     257
    //                 ],
    //                 "acquiring": [
    //                     258
    //                 ],
    //                 "directionality": [
    //                     259
    //                 ],
    //                 "two-goal": [
    //                     262
    //                 ],
    //                 "shuttling": [
    //                     263
    //                 ],
    //                 "task,": [
    //                     264
    //                 ],
    //                 "rapid": [
    //                     265
    //                 ],
    //                 "formation": [
    //                     266
    //                 ],
    //                 "novel": [
    //                     269
    //                 ],
    //                 "slow": [
    //                     272
    //                 ],
    //                 "rotation": [
    //                     273
    //                 ],
    //                 "after": [
    //                     274
    //                 ],
    //                 "disorientation.": [
    //                     275
    //                 ],
    //                 "makes": [
    //                     278
    //                 ],
    //                 "several": [
    //                     279
    //                 ],
    //                 "new": [
    //                     280
    //                 ],
    //                 "predictions": [
    //                     281
    //                 ],
    //                 "about": [
    //                     282
    //                 ],
    //                 "expected": [
    //                     284
    //                 ],
    //                 "properties": [
    //                     285
    //                 ],
    //                 "network.": [
    //                     296
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2149422514",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 6
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 49
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 55
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 45
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 40
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 55
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 30
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 43
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 45
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 30
    //                 }
    //             ],
    //             "updated_date": "2025-02-23T03:10:35.185273",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2016708835",
    //             "doi": "https://doi.org/10.1126/science.1225266",
    //             "title": "A Large-Scale Model of the Functioning Brain",
    //             "display_name": "A Large-Scale Model of the Functioning Brain",
    //             "publication_year": 2012,
    //             "publication_date": "2012-11-29",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2016708835",
    //                 "doi": "https://doi.org/10.1126/science.1225266",
    //                 "mag": "2016708835",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/23197532"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1126/science.1225266",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S3880285",
    //                     "display_name": "Science",
    //                     "issn_l": "0036-8075",
    //                     "issn": [
    //                         "0036-8075",
    //                         "1095-9203"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310315823",
    //                     "host_organization_name": "American Association for the Advancement of Science",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310315823"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "American Association for the Advancement of Science"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5055630059",
    //                         "display_name": "Chris Eliasmith",
    //                         "orcid": "https://orcid.org/0000-0003-2933-0209"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Chris Eliasmith",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5069590039",
    //                         "display_name": "Terrence C. Stewart",
    //                         "orcid": "https://orcid.org/0000-0002-1445-7613"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Terrence C. Stewart",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5041744642",
    //                         "display_name": "Xuan Choo",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Xuan Choo",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5039326107",
    //                         "display_name": "Trevor Bekolay",
    //                         "orcid": "https://orcid.org/0000-0001-5215-7999"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Trevor Bekolay",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5030203520",
    //                         "display_name": "Travis DeWolf",
    //                         "orcid": "https://orcid.org/0000-0002-8780-5631"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Travis DeWolf",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5034956679",
    //                         "display_name": "Yichuan Tang",
    //                         "orcid": "https://orcid.org/0000-0003-1681-5944"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yichuan Tang",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5103174759",
    //                         "display_name": "Daniel Rasmussen",
    //                         "orcid": "https://orcid.org/0000-0003-2454-6553"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I151746483",
    //                             "display_name": "University of Waterloo",
    //                             "ror": "https://ror.org/01aff2v68",
    //                             "country_code": "CA",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Daniel Rasmussen",
    //                     "raw_affiliation_strings": [
    //                         "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Centre for Theoretical Neuroscience, University of Waterloo, Waterloo, ON N2J 3G1, Canada.",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I151746483"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 27.794,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 898,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999932,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "338",
    //                 "issue": "6111",
    //                 "first_page": "1202",
    //                 "last_page": "1205"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10581",
    //                 "display_name": "Neural dynamics and brain function",
    //                 "score": 0.9991,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9991,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12859",
    //                     "display_name": "Cell Image Analysis Techniques",
    //                     "score": 0.9958,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1304",
    //                         "display_name": "Biophysics"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/13",
    //                         "display_name": "Biochemistry, Genetics and Molecular Biology"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10241",
    //                     "display_name": "Functional Brain Connectivity Studies",
    //                     "score": 0.9927,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/neuroanatomy",
    //                     "display_name": "Neuroanatomy",
    //                     "score": 0.79561913
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/neurophysiology",
    //                     "display_name": "Neurophysiology",
    //                     "score": 0.69774026
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/brain-function",
    //                     "display_name": "Brain Function",
    //                     "score": 0.46138078
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C103378370",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q948647",
    //                     "display_name": "Neuroanatomy",
    //                     "level": 2,
    //                     "score": 0.79561913
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C152478114",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q660910",
    //                     "display_name": "Neurophysiology",
    //                     "level": 2,
    //                     "score": 0.69774026
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.68304753
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C188147891",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q147638",
    //                     "display_name": "Cognitive science",
    //                     "level": 1,
    //                     "score": 0.5323912
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.49556005
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778755073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q10858537",
    //                     "display_name": "Scale (ratio)",
    //                     "level": 2,
    //                     "score": 0.48922563
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C3018390542",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1073",
    //                     "display_name": "Brain function",
    //                     "level": 2,
    //                     "score": 0.46138078
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.45210665
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.413433
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.35533372
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C180747234",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q23373",
    //                     "display_name": "Cognitive psychology",
    //                     "level": 1,
    //                     "score": 0.35062355
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.08081558
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C62520636",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q944",
    //                     "display_name": "Quantum mechanics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D001519",
    //                     "descriptor_name": "Behavior",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D001921",
    //                     "descriptor_name": "Brain",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D008959",
    //                     "descriptor_name": "Models, Neurological",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D012984",
    //                     "descriptor_name": "Software",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D001921",
    //                     "descriptor_name": "Brain",
    //                     "qualifier_ui": "Q000033",
    //                     "qualifier_name": "anatomy & histology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001921",
    //                     "descriptor_name": "Brain",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D006801",
    //                     "descriptor_name": "Humans",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D016571",
    //                     "descriptor_name": "Neural Networks, Computer",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1126/science.1225266",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S3880285",
    //                         "display_name": "Science",
    //                         "issn_l": "0036-8075",
    //                         "issn": [
    //                             "0036-8075",
    //                             "1095-9203"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310315823",
    //                         "host_organization_name": "American Association for the Advancement of Science",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310315823"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "American Association for the Advancement of Science"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/23197532",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.86,
    //                     "display_name": "Quality education",
    //                     "id": "https://metadata.un.org/sdg/4"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 64,
    //             "referenced_works": [
    //                 "https://openalex.org/W1523650721",
    //                 "https://openalex.org/W1892441582",
    //                 "https://openalex.org/W1898014694",
    //                 "https://openalex.org/W1954638517",
    //                 "https://openalex.org/W1964746899",
    //                 "https://openalex.org/W1973754736",
    //                 "https://openalex.org/W1995021148",
    //                 "https://openalex.org/W1996456984",
    //                 "https://openalex.org/W2005397482",
    //                 "https://openalex.org/W2006819294",
    //                 "https://openalex.org/W2011424018",
    //                 "https://openalex.org/W2017562071",
    //                 "https://openalex.org/W2020925019",
    //                 "https://openalex.org/W2023342037",
    //                 "https://openalex.org/W2034372946",
    //                 "https://openalex.org/W2036495604",
    //                 "https://openalex.org/W2047471489",
    //                 "https://openalex.org/W2047613852",
    //                 "https://openalex.org/W2048721660",
    //                 "https://openalex.org/W2051756412",
    //                 "https://openalex.org/W2054930781",
    //                 "https://openalex.org/W2057318265",
    //                 "https://openalex.org/W2060588252",
    //                 "https://openalex.org/W2063379973",
    //                 "https://openalex.org/W2068106265",
    //                 "https://openalex.org/W2079600283",
    //                 "https://openalex.org/W2085989895",
    //                 "https://openalex.org/W2087058693",
    //                 "https://openalex.org/W2088092325",
    //                 "https://openalex.org/W2089327421",
    //                 "https://openalex.org/W2093072935",
    //                 "https://openalex.org/W2097167689",
    //                 "https://openalex.org/W2098580305",
    //                 "https://openalex.org/W2100495367",
    //                 "https://openalex.org/W2108665656",
    //                 "https://openalex.org/W2119101994",
    //                 "https://openalex.org/W2121102898",
    //                 "https://openalex.org/W2121845153",
    //                 "https://openalex.org/W2122356018",
    //                 "https://openalex.org/W2122925250",
    //                 "https://openalex.org/W2126449078",
    //                 "https://openalex.org/W2128211763",
    //                 "https://openalex.org/W2131171101",
    //                 "https://openalex.org/W2131306336",
    //                 "https://openalex.org/W2133224484",
    //                 "https://openalex.org/W2137333905",
    //                 "https://openalex.org/W2137637872",
    //                 "https://openalex.org/W2137935380",
    //                 "https://openalex.org/W2138128929",
    //                 "https://openalex.org/W2139706883",
    //                 "https://openalex.org/W2146600851",
    //                 "https://openalex.org/W2149158842",
    //                 "https://openalex.org/W2151179877",
    //                 "https://openalex.org/W2152502378",
    //                 "https://openalex.org/W2152829138",
    //                 "https://openalex.org/W2156091557",
    //                 "https://openalex.org/W2157789521",
    //                 "https://openalex.org/W215825141",
    //                 "https://openalex.org/W2159518565",
    //                 "https://openalex.org/W2160079066",
    //                 "https://openalex.org/W2165061373",
    //                 "https://openalex.org/W2168228198",
    //                 "https://openalex.org/W4233030948",
    //                 "https://openalex.org/W4315816479"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W972224482",
    //                 "https://openalex.org/W4245184384",
    //                 "https://openalex.org/W4238749558",
    //                 "https://openalex.org/W4236264822",
    //                 "https://openalex.org/W4230147580",
    //                 "https://openalex.org/W3008913725",
    //                 "https://openalex.org/W2897875923",
    //                 "https://openalex.org/W2774859448",
    //                 "https://openalex.org/W2334996063",
    //                 "https://openalex.org/W1596156213"
    //             ],
    //             "abstract_inverted_index": {
    //                 "A": [
    //                     0
    //                 ],
    //                 "central": [
    //                     1
    //                 ],
    //                 "challenge": [
    //                     2
    //                 ],
    //                 "for": [
    //                     3
    //                 ],
    //                 "cognitive": [
    //                     4
    //                 ],
    //                 "and": [
    //                     5,
    //                     38,
    //                     72,
    //                     94
    //                 ],
    //                 "systems": [
    //                     6
    //                 ],
    //                 "neuroscience": [
    //                     7
    //                 ],
    //                 "is": [
    //                     8,
    //                     65
    //                 ],
    //                 "to": [
    //                     9,
    //                     17
    //                 ],
    //                 "relate": [
    //                     10
    //                 ],
    //                 "the": [
    //                     11,
    //                     18,
    //                     50,
    //                     86
    //                 ],
    //                 "incredibly": [
    //                     12
    //                 ],
    //                 "complex": [
    //                     13,
    //                     20
    //                 ],
    //                 "behavior": [
    //                     14
    //                 ],
    //                 "of": [
    //                     15,
    //                     22,
    //                     49,
    //                     76,
    //                     91
    //                 ],
    //                 "animals": [
    //                     16
    //                 ],
    //                 "equally": [
    //                     19
    //                 ],
    //                 "activity": [
    //                     21,
    //                     37
    //                 ],
    //                 "their": [
    //                     23
    //                 ],
    //                 "brains.": [
    //                     24
    //                 ],
    //                 "Recently": [
    //                     25
    //                 ],
    //                 "described,": [
    //                     26
    //                 ],
    //                 "large-scale": [
    //                     27
    //                 ],
    //                 "neural": [
    //                     28,
    //                     36
    //                 ],
    //                 "models": [
    //                     29
    //                 ],
    //                 "have": [
    //                     30
    //                 ],
    //                 "not": [
    //                     31
    //                 ],
    //                 "bridged": [
    //                     32
    //                 ],
    //                 "this": [
    //                     33,
    //                     42,
    //                     56
    //                 ],
    //                 "gap": [
    //                     34,
    //                     57
    //                 ],
    //                 "between": [
    //                     35
    //                 ],
    //                 "biological": [
    //                     39
    //                 ],
    //                 "function.": [
    //                     40
    //                 ],
    //                 "In": [
    //                     41
    //                 ],
    //                 "work,": [
    //                     43
    //                 ],
    //                 "we": [
    //                     44,
    //                     98
    //                 ],
    //                 "present": [
    //                     45
    //                 ],
    //                 "a": [
    //                     46,
    //                     80
    //                 ],
    //                 "2.5-million-neuron": [
    //                     47
    //                 ],
    //                 "model": [
    //                     48,
    //                     64,
    //                     87
    //                 ],
    //                 "brain": [
    //                     51
    //                 ],
    //                 "(called": [
    //                     52
    //                 ],
    //                 "\"Spaun\")": [
    //                     53
    //                 ],
    //                 "that": [
    //                     54
    //                 ],
    //                 "bridges": [
    //                     55
    //                 ],
    //                 "by": [
    //                     58
    //                 ],
    //                 "exhibiting": [
    //                     59
    //                 ],
    //                 "many": [
    //                     60,
    //                     89
    //                 ],
    //                 "different": [
    //                     61
    //                 ],
    //                 "behaviors.": [
    //                     62
    //                 ],
    //                 "The": [
    //                     63
    //                 ],
    //                 "presented": [
    //                     66
    //                 ],
    //                 "only": [
    //                     67
    //                 ],
    //                 "with": [
    //                     68,
    //                     79
    //                 ],
    //                 "visual": [
    //                     69
    //                 ],
    //                 "image": [
    //                     70
    //                 ],
    //                 "sequences,": [
    //                     71
    //                 ],
    //                 "it": [
    //                     73
    //                 ],
    //                 "draws": [
    //                     74
    //                 ],
    //                 "all": [
    //                     75
    //                 ],
    //                 "its": [
    //                     77
    //                 ],
    //                 "responses": [
    //                     78
    //                 ],
    //                 "physically": [
    //                     81
    //                 ],
    //                 "modeled": [
    //                     82
    //                 ],
    //                 "arm.": [
    //                     83
    //                 ],
    //                 "Although": [
    //                     84
    //                 ],
    //                 "simplified,": [
    //                     85
    //                 ],
    //                 "captures": [
    //                     88
    //                 ],
    //                 "aspects": [
    //                     90
    //                 ],
    //                 "neuroanatomy,": [
    //                     92
    //                 ],
    //                 "neurophysiology,": [
    //                     93
    //                 ],
    //                 "psychological": [
    //                     95
    //                 ],
    //                 "behavior,": [
    //                     96
    //                 ],
    //                 "which": [
    //                     97
    //                 ],
    //                 "demonstrate": [
    //                     99
    //                 ],
    //                 "via": [
    //                     100
    //                 ],
    //                 "eight": [
    //                     101
    //                 ],
    //                 "diverse": [
    //                     102
    //                 ],
    //                 "tasks.": [
    //                     103
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2016708835",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 2
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 33
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 62
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 60
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 58
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 65
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 144
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 82
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 74
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 111
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 64
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 88
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 51
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 4
    //                 }
    //             ],
    //             "updated_date": "2025-03-04T06:05:25.305744",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2734648945",
    //             "doi": null,
    //             "title": "Proceedings of the 39th Annual Conference of the Cognitive Science Society",
    //             "display_name": "Proceedings of the 39th Annual Conference of the Cognitive Science Society",
    //             "publication_year": 2017,
    //             "publication_date": "2017-04-11",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2734648945",
    //                 "mag": "2734648945"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://www.research.ed.ac.uk/portal/files/44665274/paper0522.pdf",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5076235672",
    //                         "display_name": "Yasamin Motamedi-mousavi",
    //                         "orcid": null
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yasamin Motamedi-mousavi",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5057349555",
    //                         "display_name": "Marieke Schouwstra",
    //                         "orcid": "https://orcid.org/0000-0003-2933-0532"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Marieke Schouwstra",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5082048139",
    //                         "display_name": "Jennifer Culbertson",
    //                         "orcid": "https://orcid.org/0000-0002-1737-6296"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Jennifer Culbertson",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5020926211",
    //                         "display_name": "Kenny Smith",
    //                         "orcid": "https://orcid.org/0000-0002-4530-6914"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Kenny Smith",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5074565549",
    //                         "display_name": "Simon Kirby",
    //                         "orcid": "https://orcid.org/0000-0002-6496-1340"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Simon Kirby",
    //                     "raw_affiliation_strings": [
    //                         "School of Philosophy, Psychology, and Language Sciences."
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Philosophy, Psychology, and Language Sciences.",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 0,
    //             "institutions_distinct_count": 0,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 89.237,
    //             "has_fulltext": false,
    //             "cited_by_count": 830,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999969,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12805",
    //                 "display_name": "Cognitive Science and Mapping",
    //                 "score": 0.2477,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12805",
    //                     "display_name": "Cognitive Science and Mapping",
    //                     "score": 0.2477,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.44048735
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.36480123
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.35516638
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C118552586",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7867",
    //                     "display_name": "Psychiatry",
    //                     "level": 1,
    //                     "score": 0.10016939
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://www.research.ed.ac.uk/portal/files/44665274/paper0522.pdf",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [
    //                 "https://openalex.org/W637539374",
    //                 "https://openalex.org/W62775067",
    //                 "https://openalex.org/W613876251",
    //                 "https://openalex.org/W344870023",
    //                 "https://openalex.org/W297196607",
    //                 "https://openalex.org/W2936988518",
    //                 "https://openalex.org/W2617376680",
    //                 "https://openalex.org/W2615719468",
    //                 "https://openalex.org/W2610854546",
    //                 "https://openalex.org/W2599276638",
    //                 "https://openalex.org/W2287153413",
    //                 "https://openalex.org/W217203104",
    //                 "https://openalex.org/W2095951670",
    //                 "https://openalex.org/W2074827501",
    //                 "https://openalex.org/W2017712236",
    //                 "https://openalex.org/W1995385762",
    //                 "https://openalex.org/W180246705",
    //                 "https://openalex.org/W17984478",
    //                 "https://openalex.org/W1512430500",
    //                 "https://openalex.org/W135534048"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2734648945",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 9
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 62
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 93
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 92
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 88
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 154
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 187
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 94
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 14
    //                 }
    //             ],
    //             "updated_date": "2025-03-02T16:16:33.827091",
    //             "created_date": "2017-07-21"
    //         },
    //         {
    //             "id": "https://openalex.org/W2020676607",
    //             "doi": "https://doi.org/10.1007/s11263-014-0788-3",
    //             "title": "Spiking Deep Convolutional Neural Networks for Energy-Efficient Object Recognition",
    //             "display_name": "Spiking Deep Convolutional Neural Networks for Energy-Efficient Object Recognition",
    //             "publication_year": 2014,
    //             "publication_date": "2014-11-23",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2020676607",
    //                 "doi": "https://doi.org/10.1007/s11263-014-0788-3",
    //                 "mag": "2020676607"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1007/s11263-014-0788-3",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S25538012",
    //                     "display_name": "International Journal of Computer Vision",
    //                     "issn_l": "0920-5691",
    //                     "issn": [
    //                         "0920-5691",
    //                         "1573-1405"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319900",
    //                     "host_organization_name": "Springer Science+Business Media",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319965",
    //                         "https://openalex.org/P4310319900"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Springer Nature",
    //                         "Springer Science+Business Media"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5012018117",
    //                         "display_name": "Yongqiang Cao",
    //                         "orcid": "https://orcid.org/0000-0003-1223-7542"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I200576644",
    //                             "display_name": "HRL Laboratories (United States)",
    //                             "ror": "https://ror.org/05p7te762",
    //                             "country_code": "US",
    //                             "type": "company",
    //                             "lineage": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yongqiang Cao",
    //                     "raw_affiliation_strings": [
    //                         "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5100350491",
    //                         "display_name": "Yang Chen",
    //                         "orcid": "https://orcid.org/0000-0003-3400-1661"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I200576644",
    //                             "display_name": "HRL Laboratories (United States)",
    //                             "ror": "https://ror.org/05p7te762",
    //                             "country_code": "US",
    //                             "type": "company",
    //                             "lineage": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yang Chen",
    //                     "raw_affiliation_strings": [
    //                         "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5055893094",
    //                         "display_name": "Deepak Khosla",
    //                         "orcid": "https://orcid.org/0009-0008-4393-458X"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I200576644",
    //                             "display_name": "HRL Laboratories (United States)",
    //                             "ror": "https://ror.org/05p7te762",
    //                             "country_code": "US",
    //                             "type": "company",
    //                             "lineage": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Deepak Khosla",
    //                     "raw_affiliation_strings": [
    //                         "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "HRL Laboratories, LLC, Malibu, USA 90265-4797#TAB#",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I200576644"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": {
    //                 "value": 2890,
    //                 "currency": "EUR",
    //                 "value_usd": 3690
    //             },
    //             "apc_paid": null,
    //             "fwci": 14.243,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 801,
    //             "citation_normalized_percentile": {
    //                 "value": 0.938865,
    //                 "is_in_top_1_percent": false,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "113",
    //                 "issue": "1",
    //                 "first_page": "54",
    //                 "last_page": "66"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10502",
    //                 "display_name": "Advanced Memory and Neural Computing",
    //                 "score": 1.0,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2208",
    //                     "display_name": "Electrical and Electronic Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10502",
    //                     "display_name": "Advanced Memory and Neural Computing",
    //                     "score": 1.0,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2208",
    //                         "display_name": "Electrical and Electronic Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9992,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12808",
    //                     "display_name": "Ferroelectric and Negative Capacitance Devices",
    //                     "score": 0.997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2208",
    //                         "display_name": "Electrical and Electronic Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/neuromorphic-engineering",
    //                     "display_name": "Neuromorphic engineering",
    //                     "score": 0.83021295
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C11731999",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9067355",
    //                     "display_name": "Spiking neural network",
    //                     "level": 3,
    //                     "score": 0.8542066
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C151927369",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1981312",
    //                     "display_name": "Neuromorphic engineering",
    //                     "level": 3,
    //                     "score": 0.83021295
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.82001793
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C81363708",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17084460",
    //                     "display_name": "Convolutional neural network",
    //                     "level": 2,
    //                     "score": 0.7497771
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781390188",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q25203449",
    //                     "display_name": "Spike (software development)",
    //                     "level": 2,
    //                     "score": 0.6878027
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.630297
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C108583219",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q197536",
    //                     "display_name": "Deep learning",
    //                     "level": 2,
    //                     "score": 0.5632346
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C64876066",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5141226",
    //                     "display_name": "Cognitive neuroscience of visual object recognition",
    //                     "level": 3,
    //                     "score": 0.4800233
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C153180895",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7148389",
    //                     "display_name": "Pattern recognition (psychology)",
    //                     "level": 2,
    //                     "score": 0.46881795
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C118524514",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q173212",
    //                     "display_name": "Computer architecture",
    //                     "level": 1,
    //                     "score": 0.4302694
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C9390403",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3966",
    //                     "display_name": "Computer hardware",
    //                     "level": 1,
    //                     "score": 0.4237379
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C42935608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q190411",
    //                     "display_name": "Field-programmable gate array",
    //                     "level": 2,
    //                     "score": 0.41406357
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C50644808",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q192776",
    //                     "display_name": "Artificial neural network",
    //                     "level": 2,
    //                     "score": 0.40561196
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781238097",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q175026",
    //                     "display_name": "Object (grammar)",
    //                     "level": 2,
    //                     "score": 0.36624545
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C115903868",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q80993",
    //                     "display_name": "Software engineering",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1007/s11263-014-0788-3",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S25538012",
    //                         "display_name": "International Journal of Computer Vision",
    //                         "issn_l": "0920-5691",
    //                         "issn": [
    //                             "0920-5691",
    //                             "1573-1405"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319900",
    //                         "host_organization_name": "Springer Science+Business Media",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319965",
    //                             "https://openalex.org/P4310319900"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Springer Nature",
    //                             "Springer Science+Business Media"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.82,
    //                     "display_name": "Affordable and clean energy",
    //                     "id": "https://metadata.un.org/sdg/7"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 38,
    //             "referenced_works": [
    //                 "https://openalex.org/W1498436455",
    //                 "https://openalex.org/W1968422655",
    //                 "https://openalex.org/W1985486978",
    //                 "https://openalex.org/W2007815184",
    //                 "https://openalex.org/W2028541734",
    //                 "https://openalex.org/W2039880767",
    //                 "https://openalex.org/W2053256957",
    //                 "https://openalex.org/W2060956313",
    //                 "https://openalex.org/W2067709814",
    //                 "https://openalex.org/W2068470708",
    //                 "https://openalex.org/W2072128103",
    //                 "https://openalex.org/W2076184423",
    //                 "https://openalex.org/W2100495367",
    //                 "https://openalex.org/W2100884605",
    //                 "https://openalex.org/W2101926813",
    //                 "https://openalex.org/W2103212315",
    //                 "https://openalex.org/W2108581046",
    //                 "https://openalex.org/W2112796928",
    //                 "https://openalex.org/W2116360511",
    //                 "https://openalex.org/W2127852715",
    //                 "https://openalex.org/W2136922672",
    //                 "https://openalex.org/W2138880472",
    //                 "https://openalex.org/W2139427956",
    //                 "https://openalex.org/W2141125852",
    //                 "https://openalex.org/W2144982973",
    //                 "https://openalex.org/W2147800946",
    //                 "https://openalex.org/W2149194912",
    //                 "https://openalex.org/W2150843617",
    //                 "https://openalex.org/W2155377787",
    //                 "https://openalex.org/W2163605009",
    //                 "https://openalex.org/W2165373584",
    //                 "https://openalex.org/W2546302380",
    //                 "https://openalex.org/W2953391683",
    //                 "https://openalex.org/W2963542991",
    //                 "https://openalex.org/W3118608800",
    //                 "https://openalex.org/W4231109964",
    //                 "https://openalex.org/W567531775",
    //                 "https://openalex.org/W753012316"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4386227293",
    //                 "https://openalex.org/W4372267706",
    //                 "https://openalex.org/W4313442939",
    //                 "https://openalex.org/W4297889476",
    //                 "https://openalex.org/W3208975838",
    //                 "https://openalex.org/W3160415743",
    //                 "https://openalex.org/W3089892344",
    //                 "https://openalex.org/W3081559266",
    //                 "https://openalex.org/W3036270242",
    //                 "https://openalex.org/W2542565870"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2020676607",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 11
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 104
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 113
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 102
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 112
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 103
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 109
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 55
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 57
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 4
    //                 }
    //             ],
    //             "updated_date": "2025-03-01T13:26:29.273090",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2117443520",
    //             "doi": "https://doi.org/10.1002/hipo.20327",
    //             "title": "An oscillatory interference model of grid cell firing",
    //             "display_name": "An oscillatory interference model of grid cell firing",
    //             "publication_year": 2007,
    //             "publication_date": "2007-06-27",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2117443520",
    //                 "doi": "https://doi.org/10.1002/hipo.20327",
    //                 "mag": "2117443520",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/17598147",
    //                 "pmcid": "https://www.ncbi.nlm.nih.gov/pmc/articles/2678278"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1002/hipo.20327",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S55111660",
    //                     "display_name": "Hippocampus",
    //                     "issn_l": "1050-9631",
    //                     "issn": [
    //                         "1050-9631",
    //                         "1098-1063"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320595",
    //                     "host_organization_name": "Wiley",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320595"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Wiley"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "review",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "green",
    //                 "oa_url": "https://europepmc.org/articles/pmc2678278?pdf=render",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5031109148",
    //                         "display_name": "Neil Burgess",
    //                         "orcid": "https://orcid.org/0000-0003-0646-6584"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I45129253",
    //                             "display_name": "University College London",
    //                             "ror": "https://ror.org/02jx3x895",
    //                             "country_code": "GB",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I124357947",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "GB"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Neil Burgess",
    //                     "raw_affiliation_strings": [
    //                         "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                         "Institute of Cognitive Neuroscience, University College London, London, United Kingdom"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Institute of Cognitive Neuroscience, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5086282819",
    //                         "display_name": "Caswell Barry",
    //                         "orcid": "https://orcid.org/0000-0001-6718-0649"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I45129253",
    //                             "display_name": "University College London",
    //                             "ror": "https://ror.org/02jx3x895",
    //                             "country_code": "GB",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I124357947",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "GB"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Caswell Barry",
    //                     "raw_affiliation_strings": [
    //                         "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                         "Institute of Behavioural Neuroscience, University College London, London, United Kingdom",
    //                         "Institute of Cognitive Neuroscience, University College London, London, United Kingdom"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Institute of Cognitive Neuroscience, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Institute of Behavioural Neuroscience, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5053583655",
    //                         "display_name": "John O\u2019Keefe",
    //                         "orcid": "https://orcid.org/0000-0001-5697-4881"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I45129253",
    //                             "display_name": "University College London",
    //                             "ror": "https://ror.org/02jx3x895",
    //                             "country_code": "GB",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I124357947",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "GB"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "John O'Keefe",
    //                     "raw_affiliation_strings": [
    //                         "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                         "Institute of Behavioural Neuroscience, University College London, London, United Kingdom"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Institute of Behavioural Neuroscience, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Department of Anatomy and Developmental Biology, University College London, London, United Kingdom",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5031109148"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I45129253"
    //             ],
    //             "apc_list": {
    //                 "value": 4330,
    //                 "currency": "USD",
    //                 "value_usd": 4330
    //             },
    //             "apc_paid": null,
    //             "fwci": 3.595,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 692,
    //             "citation_normalized_percentile": {
    //                 "value": 0.997967,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "17",
    //                 "issue": "9",
    //                 "first_page": "801",
    //                 "last_page": "812"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10448",
    //                 "display_name": "Memory and Neural Mechanisms",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10448",
    //                     "display_name": "Memory and Neural Mechanisms",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10077",
    //                     "display_name": "Neuroscience and Neuropharmacology Research",
    //                     "score": 0.9995,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12236",
    //                     "display_name": "Photoreceptor and optogenetics research",
    //                     "score": 0.9984,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/oscillation",
    //                     "display_name": "Oscillation (cell signaling)",
    //                     "score": 0.5846348
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/place-cell",
    //                     "display_name": "Place cell",
    //                     "score": 0.57062083
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.42006332
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C32022120",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q797225",
    //                     "display_name": "Interference (communication)",
    //                     "level": 3,
    //                     "score": 0.60633504
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778439541",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7106412",
    //                     "display_name": "Oscillation (cell signaling)",
    //                     "level": 2,
    //                     "score": 0.5846348
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781369091",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2303730",
    //                     "display_name": "Place cell",
    //                     "level": 3,
    //                     "score": 0.57062083
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.5137607
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C148762608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3748185",
    //                     "display_name": "Hippocampal formation",
    //                     "level": 2,
    //                     "score": 0.4693376
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.42006332
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C197341189",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q863533",
    //                     "display_name": "Postsynaptic potential",
    //                     "level": 3,
    //                     "score": 0.41099268
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.38639754
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C186060115",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q30336093",
    //                     "display_name": "Biological system",
    //                     "level": 1,
    //                     "score": 0.37887824
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C185592680",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2329",
    //                     "display_name": "Chemistry",
    //                     "level": 0,
    //                     "score": 0.3370514
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.3160447
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C127162648",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q16858953",
    //                     "display_name": "Channel (broadcasting)",
    //                     "level": 2,
    //                     "score": 0.22760949
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.16092336
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86803240",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q420",
    //                     "display_name": "Biology",
    //                     "level": 0,
    //                     "score": 0.13032874
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C76155785",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q418",
    //                     "display_name": "Telecommunications",
    //                     "level": 1,
    //                     "score": 0.11337823
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55493867",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7094",
    //                     "display_name": "Biochemistry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C170493617",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q208467",
    //                     "display_name": "Receptor",
    //                     "level": 2,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D008959",
    //                     "descriptor_name": "Models, Neurological",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D010364",
    //                     "descriptor_name": "Pattern Recognition, Visual",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D013826",
    //                     "descriptor_name": "Theta Rhythm",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001522",
    //                     "descriptor_name": "Behavior, Animal",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D003712",
    //                     "descriptor_name": "Dendrites",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D003712",
    //                     "descriptor_name": "Dendrites",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "Q000166",
    //                     "qualifier_name": "cytology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000166",
    //                     "qualifier_name": "cytology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D010364",
    //                     "descriptor_name": "Pattern Recognition, Visual",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D010775",
    //                     "descriptor_name": "Photic Stimulation",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 6,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1002/hipo.20327",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S55111660",
    //                         "display_name": "Hippocampus",
    //                         "issn_l": "1050-9631",
    //                         "issn": [
    //                             "1050-9631",
    //                             "1098-1063"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320595",
    //                         "host_organization_name": "Wiley",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320595"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Wiley"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://europepmc.org/articles/pmc2678278",
    //                     "pdf_url": "https://europepmc.org/articles/pmc2678278?pdf=render",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400806",
    //                         "display_name": "Europe PMC (PubMed Central)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1303153112",
    //                         "host_organization_name": "European Bioinformatics Institute",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1303153112"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "European Bioinformatics Institute"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2678278",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S2764455111",
    //                         "display_name": "PubMed Central",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://discovery.ucl.ac.uk/id/eprint/2932/",
    //                     "pdf_url": "https://discovery.ucl.ac.uk/2932/1/2932.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400024",
    //                         "display_name": "UCL Discovery (University College London)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I45129253",
    //                         "host_organization_name": "University College London",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I45129253"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "University College London"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "other-oa",
    //                     "license_id": "https://openalex.org/licenses/other-oa",
    //                     "version": "submittedVersion",
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://discovery.ucl.ac.uk/id/eprint/2932/1/2932.pdf",
    //                     "pdf_url": "https://discovery.ucl.ac.uk/id/eprint/2932/1/2932.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400024",
    //                         "display_name": "UCL Discovery (University College London)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I45129253",
    //                         "host_organization_name": "University College London",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I45129253"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "University College London"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "submittedVersion",
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/17598147",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://europepmc.org/articles/pmc2678278",
    //                 "pdf_url": "https://europepmc.org/articles/pmc2678278?pdf=render",
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400806",
    //                     "display_name": "Europe PMC (PubMed Central)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I1303153112",
    //                     "host_organization_name": "European Bioinformatics Institute",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I1303153112"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "European Bioinformatics Institute"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "acceptedVersion",
    //                 "is_accepted": true,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.6,
    //                     "display_name": "Life on land",
    //                     "id": "https://metadata.un.org/sdg/15"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 67,
    //             "referenced_works": [
    //                 "https://openalex.org/W1461834912",
    //                 "https://openalex.org/W1504615859",
    //                 "https://openalex.org/W1572294349",
    //                 "https://openalex.org/W1585564530",
    //                 "https://openalex.org/W1826201647",
    //                 "https://openalex.org/W1968533788",
    //                 "https://openalex.org/W1969255675",
    //                 "https://openalex.org/W1970792572",
    //                 "https://openalex.org/W1973372728",
    //                 "https://openalex.org/W1974719406",
    //                 "https://openalex.org/W1977106703",
    //                 "https://openalex.org/W1988694078",
    //                 "https://openalex.org/W1988751593",
    //                 "https://openalex.org/W1994839334",
    //                 "https://openalex.org/W2002272109",
    //                 "https://openalex.org/W2004725045",
    //                 "https://openalex.org/W2008936540",
    //                 "https://openalex.org/W2012159777",
    //                 "https://openalex.org/W2016776195",
    //                 "https://openalex.org/W2018964056",
    //                 "https://openalex.org/W2022864922",
    //                 "https://openalex.org/W2033218028",
    //                 "https://openalex.org/W2037628926",
    //                 "https://openalex.org/W2037779996",
    //                 "https://openalex.org/W2040613425",
    //                 "https://openalex.org/W2044129724",
    //                 "https://openalex.org/W2049289902",
    //                 "https://openalex.org/W2052515926",
    //                 "https://openalex.org/W2053696585",
    //                 "https://openalex.org/W2056916404",
    //                 "https://openalex.org/W2061922686",
    //                 "https://openalex.org/W2071335965",
    //                 "https://openalex.org/W2071344447",
    //                 "https://openalex.org/W2075682185",
    //                 "https://openalex.org/W2078575897",
    //                 "https://openalex.org/W2079041721",
    //                 "https://openalex.org/W2079310611",
    //                 "https://openalex.org/W2079390801",
    //                 "https://openalex.org/W2080524546",
    //                 "https://openalex.org/W2080994882",
    //                 "https://openalex.org/W2082149624",
    //                 "https://openalex.org/W2084640934",
    //                 "https://openalex.org/W2087298647",
    //                 "https://openalex.org/W2088382964",
    //                 "https://openalex.org/W2092580449",
    //                 "https://openalex.org/W2093565344",
    //                 "https://openalex.org/W2096297854",
    //                 "https://openalex.org/W2103692957",
    //                 "https://openalex.org/W2107852368",
    //                 "https://openalex.org/W2114502694",
    //                 "https://openalex.org/W2115348689",
    //                 "https://openalex.org/W2119565218",
    //                 "https://openalex.org/W2127703352",
    //                 "https://openalex.org/W2128189925",
    //                 "https://openalex.org/W2128595101",
    //                 "https://openalex.org/W2129707824",
    //                 "https://openalex.org/W2144309171",
    //                 "https://openalex.org/W2148741637",
    //                 "https://openalex.org/W2150132077",
    //                 "https://openalex.org/W2151990639",
    //                 "https://openalex.org/W2152982331",
    //                 "https://openalex.org/W2157514959",
    //                 "https://openalex.org/W2167403166",
    //                 "https://openalex.org/W2169790536",
    //                 "https://openalex.org/W2416576494",
    //                 "https://openalex.org/W4236278672",
    //                 "https://openalex.org/W5055497"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W53354751",
    //                 "https://openalex.org/W4311677676",
    //                 "https://openalex.org/W4309949331",
    //                 "https://openalex.org/W3043853885",
    //                 "https://openalex.org/W3006011994",
    //                 "https://openalex.org/W2970587290",
    //                 "https://openalex.org/W2949966526",
    //                 "https://openalex.org/W2170688882",
    //                 "https://openalex.org/W2096876955",
    //                 "https://openalex.org/W1973915385"
    //             ],
    //             "abstract_inverted_index": {
    //                 "We": [
    //                     0,
    //                     187
    //                 ],
    //                 "expand": [
    //                     1
    //                 ],
    //                 "upon": [
    //                     2
    //                 ],
    //                 "our": [
    //                     3
    //                 ],
    //                 "proposal": [
    //                     4
    //                 ],
    //                 "that": [
    //                     5,
    //                     143
    //                 ],
    //                 "the": [
    //                     6,
    //                     12,
    //                     20,
    //                     69,
    //                     72,
    //                     101,
    //                     118,
    //                     124,
    //                     144,
    //                     147,
    //                     154,
    //                     170,
    //                     180,
    //                     193,
    //                     197,
    //                     203,
    //                     216,
    //                     222,
    //                     239,
    //                     246,
    //                     249
    //                 ],
    //                 "oscillatory": [
    //                     7
    //                 ],
    //                 "interference": [
    //                     8,
    //                     38,
    //                     60,
    //                     145,
    //                     217
    //                 ],
    //                 "mechanism": [
    //                     9
    //                 ],
    //                 "proposed": [
    //                     10
    //                 ],
    //                 "for": [
    //                     11,
    //                     221
    //                 ],
    //                 "phase": [
    //                     13,
    //                     128,
    //                     167
    //                 ],
    //                 "precession": [
    //                     14
    //                 ],
    //                 "effect": [
    //                     15
    //                 ],
    //                 "in": [
    //                     16,
    //                     123,
    //                     153,
    //                     163,
    //                     185
    //                 ],
    //                 "place": [
    //                     17,
    //                     174
    //                 ],
    //                 "cells": [
    //                     18,
    //                     28,
    //                     56,
    //                     175,
    //                     207
    //                 ],
    //                 "underlies": [
    //                     19
    //                 ],
    //                 "grid-like": [
    //                     21,
    //                     200
    //                 ],
    //                 "firing": [
    //                     22,
    //                     70,
    //                     94,
    //                     201,
    //                     235
    //                 ],
    //                 "pattern": [
    //                     23,
    //                     160
    //                 ],
    //                 "of": [
    //                     24,
    //                     50,
    //                     71,
    //                     75,
    //                     104,
    //                     121,
    //                     146,
    //                     169,
    //                     199,
    //                     205,
    //                     215,
    //                     225,
    //                     232,
    //                     238,
    //                     243,
    //                     248
    //                 ],
    //                 "dorsomedial": [
    //                     25
    //                 ],
    //                 "entorhinal": [
    //                     26,
    //                     54
    //                 ],
    //                 "grid": [
    //                     27,
    //                     159,
    //                     171,
    //                     233
    //                 ],
    //                 "(O'Keefe": [
    //                     29
    //                 ],
    //                 "and": [
    //                     30,
    //                     78,
    //                     133,
    //                     182,
    //                     229,
    //                     241,
    //                     245
    //                 ],
    //                 "Burgess": [
    //                     31
    //                 ],
    //                 "(2005)": [
    //                     32
    //                 ],
    //                 "Hippocampus": [
    //                     33
    //                 ],
    //                 "15:853-866).": [
    //                     34
    //                 ],
    //                 "The": [
    //                     35,
    //                     127,
    //                     157
    //                 ],
    //                 "original": [
    //                     36
    //                 ],
    //                 "one-dimensional": [
    //                     37
    //                 ],
    //                 "model": [
    //                     39,
    //                     218
    //                 ],
    //                 "is": [
    //                     40,
    //                     161
    //                 ],
    //                 "generalized": [
    //                     41
    //                 ],
    //                 "to": [
    //                     42,
    //                     108,
    //                     117
    //                 ],
    //                 "an": [
    //                     43,
    //                     87,
    //                     114
    //                 ],
    //                 "appropriate": [
    //                     44,
    //                     76
    //                 ],
    //                 "two-dimensional": [
    //                     45
    //                 ],
    //                 "mechanism.": [
    //                     46
    //                 ],
    //                 "Specifically,": [
    //                     47
    //                 ],
    //                 "dendritic": [
    //                     48,
    //                     82,
    //                     212
    //                 ],
    //                 "subunits": [
    //                     49,
    //                     83
    //                 ],
    //                 "layer": [
    //                     51
    //                 ],
    //                 "II": [
    //                     52
    //                 ],
    //                 "medial": [
    //                     53
    //                 ],
    //                 "stellate": [
    //                     55
    //                 ],
    //                 "provide": [
    //                     57
    //                 ],
    //                 "multiple": [
    //                     58,
    //                     206,
    //                     211
    //                 ],
    //                 "linear": [
    //                     59
    //                 ],
    //                 "patterns": [
    //                     61
    //                 ],
    //                 "along": [
    //                     62
    //                 ],
    //                 "different": [
    //                     63
    //                 ],
    //                 "directions,": [
    //                     64
    //                 ],
    //                 "with": [
    //                     65
    //                 ],
    //                 "their": [
    //                     66
    //                 ],
    //                 "product": [
    //                     67
    //                 ],
    //                 "determining": [
    //                     68
    //                 ],
    //                 "cell.": [
    //                     73
    //                 ],
    //                 "Connection": [
    //                     74
    //                 ],
    //                 "speed-": [
    //                     77
    //                 ],
    //                 "direction-dependent": [
    //                     79
    //                 ],
    //                 "inputs": [
    //                     80,
    //                     99
    //                 ],
    //                 "onto": [
    //                     81
    //                 ],
    //                 "could": [
    //                     84
    //                 ],
    //                 "result": [
    //                     85
    //                 ],
    //                 "from": [
    //                     86,
    //                     179
    //                 ],
    //                 "unsupervised": [
    //                     88
    //                 ],
    //                 "learning": [
    //                     89
    //                 ],
    //                 "rule": [
    //                     90
    //                 ],
    //                 "which": [
    //                     91
    //                 ],
    //                 "maximizes": [
    //                     92
    //                 ],
    //                 "postsynaptic": [
    //                     93
    //                 ],
    //                 "(e.g.": [
    //                     95
    //                 ],
    //                 "competitive": [
    //                     96
    //                 ],
    //                 "learning).": [
    //                     97
    //                 ],
    //                 "These": [
    //                     98
    //                 ],
    //                 "cause": [
    //                     100
    //                 ],
    //                 "intrinsic": [
    //                     102
    //                 ],
    //                 "oscillation": [
    //                     103,
    //                     132
    //                 ],
    //                 "subunit": [
    //                     105
    //                 ],
    //                 "membrane": [
    //                     106
    //                 ],
    //                 "potential": [
    //                     107
    //                 ],
    //                 "increase": [
    //                     109
    //                 ],
    //                 "above": [
    //                     110
    //                 ],
    //                 "theta": [
    //                     111
    //                 ],
    //                 "frequency": [
    //                     112,
    //                     223
    //                 ],
    //                 "by": [
    //                     113,
    //                     166,
    //                     173
    //                 ],
    //                 "amount": [
    //                     115
    //                 ],
    //                 "proportional": [
    //                     116
    //                 ],
    //                 "animal's": [
    //                     119
    //                 ],
    //                 "speed": [
    //                     120,
    //                     240
    //                 ],
    //                 "running": [
    //                     122,
    //                     244
    //                 ],
    //                 "\"preferred\"": [
    //                     125
    //                 ],
    //                 "direction.": [
    //                     126,
    //                     156
    //                 ],
    //                 "difference": [
    //                     129
    //                 ],
    //                 "between": [
    //                     130
    //                 ],
    //                 "this": [
    //                     131
    //                 ],
    //                 "a": [
    //                     134
    //                 ],
    //                 "somatic": [
    //                     135
    //                 ],
    //                 "input": [
    //                     136,
    //                     178
    //                 ],
    //                 "at": [
    //                     137
    //                 ],
    //                 "theta-frequency": [
    //                     138
    //                 ],
    //                 "essentially": [
    //                     139
    //                 ],
    //                 "integrates": [
    //                     140
    //                 ],
    //                 "velocity": [
    //                     141
    //                 ],
    //                 "so": [
    //                     142
    //                 ],
    //                 "two": [
    //                     148
    //                 ],
    //                 "oscillations": [
    //                     149
    //                 ],
    //                 "reflects": [
    //                     150
    //                 ],
    //                 "distance": [
    //                     151
    //                 ],
    //                 "traveled": [
    //                     152
    //                 ],
    //                 "preferred": [
    //                     155
    //                 ],
    //                 "overall": [
    //                     158
    //                 ],
    //                 "maintained": [
    //                     162
    //                 ],
    //                 "environmental": [
    //                     164,
    //                     183
    //                 ],
    //                 "location": [
    //                     165
    //                 ],
    //                 "reset": [
    //                     168
    //                 ],
    //                 "cell": [
    //                     172,
    //                     234
    //                 ],
    //                 "receiving": [
    //                     176
    //                 ],
    //                 "sensory": [
    //                     177
    //                 ],
    //                 "environment,": [
    //                     181
    //                 ],
    //                 "boundaries": [
    //                     184
    //                 ],
    //                 "particular.": [
    //                     186
    //                 ],
    //                 "also": [
    //                     188
    //                 ],
    //                 "outline": [
    //                     189
    //                 ],
    //                 "possible": [
    //                     190
    //                 ],
    //                 "variations": [
    //                     191
    //                 ],
    //                 "on": [
    //                     192
    //                 ],
    //                 "basic": [
    //                     194
    //                 ],
    //                 "model,": [
    //                     195
    //                 ],
    //                 "including": [
    //                     196
    //                 ],
    //                 "generation": [
    //                     198
    //                 ],
    //                 "via": [
    //                     202,
    //                     210
    //                 ],
    //                 "interaction": [
    //                     204
    //                 ],
    //                 "rather": [
    //                     208
    //                 ],
    //                 "than": [
    //                     209
    //                 ],
    //                 "subunits.": [
    //                     213
    //                 ],
    //                 "Predictions": [
    //                     214
    //                 ],
    //                 "are": [
    //                     219
    //                 ],
    //                 "given": [
    //                     220
    //                 ],
    //                 "composition": [
    //                     224
    //                 ],
    //                 "EEG": [
    //                     226
    //                 ],
    //                 "power": [
    //                     227
    //                 ],
    //                 "spectra": [
    //                     228
    //                 ],
    //                 "temporal": [
    //                     230
    //                 ],
    //                 "autocorrelograms": [
    //                     231
    //                 ],
    //                 "as": [
    //                     236
    //                 ],
    //                 "functions": [
    //                     237
    //                 ],
    //                 "direction": [
    //                     242
    //                 ],
    //                 "novelty": [
    //                     247
    //                 ],
    //                 "environment.": [
    //                     250
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2117443520",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 1
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 32
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 32
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 25
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 44
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 49
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 46
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 41
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 39
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 45
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 67
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 48
    //                 }
    //             ],
    //             "updated_date": "2025-02-25T15:50:27.912567",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2024908906",
    //             "doi": "https://doi.org/10.1177/0278364906065387",
    //             "title": "The Graph SLAM Algorithm with Applications to Large-Scale Mapping of Urban Structures",
    //             "display_name": "The Graph SLAM Algorithm with Applications to Large-Scale Mapping of Urban Structures",
    //             "publication_year": 2006,
    //             "publication_date": "2006-05-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2024908906",
    //                 "doi": "https://doi.org/10.1177/0278364906065387",
    //                 "mag": "2024908906"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1177/0278364906065387",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S73484101",
    //                     "display_name": "The International Journal of Robotics Research",
    //                     "issn_l": "0278-3649",
    //                     "issn": [
    //                         "0278-3649",
    //                         "1741-3176"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320017",
    //                     "host_organization_name": "SAGE Publishing",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320017"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "SAGE Publishing"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "green",
    //                 "oa_url": "http://robots.stanford.edu/papers/thrun.graphslam.pdf",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5066710774",
    //                         "display_name": "Sebastian Thrun",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I97018004",
    //                             "display_name": "Stanford University",
    //                             "ror": "https://ror.org/00f54p054",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I97018004"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Sebastian Thrun",
    //                     "raw_affiliation_strings": [
    //                         "Stanford AI Lab, Stanford University,"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Stanford AI Lab, Stanford University,",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I97018004"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5112659331",
    //                         "display_name": "Michael Montemerlo",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I97018004",
    //                             "display_name": "Stanford University",
    //                             "ror": "https://ror.org/00f54p054",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I97018004"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Michael Montemerlo",
    //                     "raw_affiliation_strings": [
    //                         "Stanford AI Lab, Stanford University,"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Stanford AI Lab, Stanford University,",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I97018004"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 22.408,
    //             "has_fulltext": false,
    //             "cited_by_count": 645,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999933,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "25",
    //                 "issue": "5-6",
    //                 "first_page": "403",
    //                 "last_page": "429"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10191",
    //                 "display_name": "Robotics and Sensor-Based Localization",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2202",
    //                     "display_name": "Aerospace Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10191",
    //                     "display_name": "Robotics and Sensor-Based Localization",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2202",
    //                         "display_name": "Aerospace Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T11164",
    //                     "display_name": "Remote Sensing and LiDAR Applications",
    //                     "score": 0.9975,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2305",
    //                         "display_name": "Environmental Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/23",
    //                         "display_name": "Environmental Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10586",
    //                     "display_name": "Robotic Path Planning Algorithms",
    //                     "score": 0.9945,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/data-association",
    //                     "display_name": "Data association",
    //                     "score": 0.67773944
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C86369673",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1203659",
    //                     "display_name": "Simultaneous localization and mapping",
    //                     "level": 4,
    //                     "score": 0.8494519
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2983325608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17084606",
    //                     "display_name": "Data association",
    //                     "level": 3,
    //                     "score": 0.67773944
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C132525143",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q141488",
    //                     "display_name": "Graph",
    //                     "level": 2,
    //                     "score": 0.59748656
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.53998214
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C51823790",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q504353",
    //                     "display_name": "Greedy algorithm",
    //                     "level": 2,
    //                     "score": 0.5244444
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778755073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q10858537",
    //                     "display_name": "Scale (ratio)",
    //                     "level": 2,
    //                     "score": 0.5031406
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.47756916
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C60229501",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q18822",
    //                     "display_name": "Global Positioning System",
    //                     "level": 2,
    //                     "score": 0.4186259
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.32482746
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C80444323",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2878974",
    //                     "display_name": "Theoretical computer science",
    //                     "level": 1,
    //                     "score": 0.20712292
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.18476665
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C19966478",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4810574",
    //                     "display_name": "Mobile robot",
    //                     "level": 3,
    //                     "score": 0.14526969
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C76155785",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q418",
    //                     "display_name": "Telecommunications",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C62520636",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q944",
    //                     "display_name": "Quantum mechanics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C49937458",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2599292",
    //                     "display_name": "Probabilistic logic",
    //                     "level": 2,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 2,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1177/0278364906065387",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S73484101",
    //                         "display_name": "The International Journal of Robotics Research",
    //                         "issn_l": "0278-3649",
    //                         "issn": [
    //                             "0278-3649",
    //                             "1741-3176"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320017",
    //                         "host_organization_name": "SAGE Publishing",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320017"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "SAGE Publishing"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.146.5424",
    //                     "pdf_url": "http://robots.stanford.edu/papers/thrun.graphslam.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400349",
    //                         "display_name": "CiteSeer X (The Pennsylvania State University)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I130769515",
    //                         "host_organization_name": "Pennsylvania State University",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I130769515"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Pennsylvania State University"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "submittedVersion",
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.146.5424",
    //                 "pdf_url": "http://robots.stanford.edu/papers/thrun.graphslam.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400349",
    //                     "display_name": "CiteSeer X (The Pennsylvania State University)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I130769515",
    //                     "host_organization_name": "Pennsylvania State University",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I130769515"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Pennsylvania State University"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "submittedVersion",
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.84,
    //                     "display_name": "Sustainable cities and communities",
    //                     "id": "https://metadata.un.org/sdg/11"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 66,
    //             "referenced_works": [
    //                 "https://openalex.org/W126946642",
    //                 "https://openalex.org/W142685375",
    //                 "https://openalex.org/W1494141623",
    //                 "https://openalex.org/W1511332864",
    //                 "https://openalex.org/W1512326116",
    //                 "https://openalex.org/W1513861746",
    //                 "https://openalex.org/W1523989055",
    //                 "https://openalex.org/W1544687065",
    //                 "https://openalex.org/W1547612193",
    //                 "https://openalex.org/W1549613529",
    //                 "https://openalex.org/W1549925885",
    //                 "https://openalex.org/W1551215724",
    //                 "https://openalex.org/W1556694669",
    //                 "https://openalex.org/W1583894665",
    //                 "https://openalex.org/W1584640914",
    //                 "https://openalex.org/W1611476298",
    //                 "https://openalex.org/W1652568224",
    //                 "https://openalex.org/W1656165940",
    //                 "https://openalex.org/W1746662645",
    //                 "https://openalex.org/W1842906629",
    //                 "https://openalex.org/W1890255768",
    //                 "https://openalex.org/W1891947214",
    //                 "https://openalex.org/W1894956925",
    //                 "https://openalex.org/W1937083578",
    //                 "https://openalex.org/W1990012555",
    //                 "https://openalex.org/W1991528596",
    //                 "https://openalex.org/W2060733544",
    //                 "https://openalex.org/W2097012286",
    //                 "https://openalex.org/W2099084210",
    //                 "https://openalex.org/W2099920323",
    //                 "https://openalex.org/W2101914010",
    //                 "https://openalex.org/W2104181141",
    //                 "https://openalex.org/W2105301171",
    //                 "https://openalex.org/W2108975138",
    //                 "https://openalex.org/W2109513571",
    //                 "https://openalex.org/W2109749443",
    //                 "https://openalex.org/W2111916960",
    //                 "https://openalex.org/W2112441941",
    //                 "https://openalex.org/W2118365642",
    //                 "https://openalex.org/W2119851068",
    //                 "https://openalex.org/W2119906889",
    //                 "https://openalex.org/W2121797328",
    //                 "https://openalex.org/W2122310095",
    //                 "https://openalex.org/W2133048394",
    //                 "https://openalex.org/W2138835141",
    //                 "https://openalex.org/W2141498523",
    //                 "https://openalex.org/W2143864104",
    //                 "https://openalex.org/W2144931885",
    //                 "https://openalex.org/W2145265734",
    //                 "https://openalex.org/W2146170760",
    //                 "https://openalex.org/W2147915785",
    //                 "https://openalex.org/W2148820580",
    //                 "https://openalex.org/W2151285962",
    //                 "https://openalex.org/W2155537009",
    //                 "https://openalex.org/W2156561799",
    //                 "https://openalex.org/W2157893028",
    //                 "https://openalex.org/W2158057652",
    //                 "https://openalex.org/W2159080219",
    //                 "https://openalex.org/W2166132431",
    //                 "https://openalex.org/W2168210109",
    //                 "https://openalex.org/W2173782939",
    //                 "https://openalex.org/W2331182131",
    //                 "https://openalex.org/W3039274615",
    //                 "https://openalex.org/W3143919370",
    //                 "https://openalex.org/W4285719527",
    //                 "https://openalex.org/W74453616"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W3045922638",
    //                 "https://openalex.org/W2963091090",
    //                 "https://openalex.org/W2612539105",
    //                 "https://openalex.org/W2564786226",
    //                 "https://openalex.org/W2184314008",
    //                 "https://openalex.org/W2165113654",
    //                 "https://openalex.org/W2141498523",
    //                 "https://openalex.org/W2127578024",
    //                 "https://openalex.org/W1556157276",
    //                 "https://openalex.org/W1510326563"
    //             ],
    //             "abstract_inverted_index": {
    //                 "This": [
    //                     0
    //                 ],
    //                 "article": [
    //                     1
    //                 ],
    //                 "presents": [
    //                     2,
    //                     89
    //                 ],
    //                 "GraphSLAM,": [
    //                     3
    //                 ],
    //                 "a": [
    //                     4,
    //                     17,
    //                     36,
    //                     56,
    //                     68,
    //                     82
    //                 ],
    //                 "unifying": [
    //                     5
    //                 ],
    //                 "algorithm": [
    //                     6,
    //                     84
    //                 ],
    //                 "for": [
    //                     7,
    //                     85,
    //                     91
    //                 ],
    //                 "the": [
    //                     8,
    //                     32,
    //                     40,
    //                     43
    //                 ],
    //                 "offline": [
    //                     9
    //                 ],
    //                 "SLAM": [
    //                     10,
    //                     28,
    //                     33,
    //                     92
    //                 ],
    //                 "problem.": [
    //                     11
    //                 ],
    //                 "GraphSLAM": [
    //                     12,
    //                     70
    //                 ],
    //                 "is": [
    //                     13,
    //                     60
    //                 ],
    //                 "closely": [
    //                     14
    //                 ],
    //                 "related": [
    //                     15
    //                 ],
    //                 "to": [
    //                     16,
    //                     27
    //                 ],
    //                 "recent": [
    //                     18
    //                 ],
    //                 "sequence": [
    //                     19
    //                 ],
    //                 "of": [
    //                     20,
    //                     42
    //                 ],
    //                 "research": [
    //                     21
    //                 ],
    //                 "papers": [
    //                     22
    //                 ],
    //                 "on": [
    //                     23
    //                 ],
    //                 "applying": [
    //                     24
    //                 ],
    //                 "optimization": [
    //                     25,
    //                     65
    //                 ],
    //                 "techniques": [
    //                     26
    //                 ],
    //                 "problems.": [
    //                     29
    //                 ],
    //                 "It": [
    //                     30,
    //                     45
    //                 ],
    //                 "transforms": [
    //                     31
    //                 ],
    //                 "posterior": [
    //                     34
    //                 ],
    //                 "into": [
    //                     35
    //                 ],
    //                 "graphical": [
    //                     37
    //                 ],
    //                 "network,": [
    //                     38
    //                 ],
    //                 "representing": [
    //                     39
    //                 ],
    //                 "log-likelihood": [
    //                     41
    //                 ],
    //                 "data.": [
    //                     44
    //                 ],
    //                 "then": [
    //                     46,
    //                     61
    //                 ],
    //                 "reduces": [
    //                     47
    //                 ],
    //                 "this": [
    //                     48
    //                 ],
    //                 "graph": [
    //                     49
    //                 ],
    //                 "using": [
    //                     50,
    //                     63
    //                 ],
    //                 "variable": [
    //                     51
    //                 ],
    //                 "elimination": [
    //                     52
    //                 ],
    //                 "techniques,": [
    //                     53
    //                 ],
    //                 "arriving": [
    //                     54
    //                 ],
    //                 "at": [
    //                     55
    //                 ],
    //                 "lower-dimensional": [
    //                     57
    //                 ],
    //                 "problems": [
    //                     58
    //                 ],
    //                 "that": [
    //                     59
    //                 ],
    //                 "solved": [
    //                     62
    //                 ],
    //                 "conventional": [
    //                     64
    //                 ],
    //                 "techniques.": [
    //                     66
    //                 ],
    //                 "As": [
    //                     67
    //                 ],
    //                 "result,": [
    //                     69
    //                 ],
    //                 "can": [
    //                     71
    //                 ],
    //                 "generate": [
    //                     72
    //                 ],
    //                 "maps": [
    //                     73
    //                 ],
    //                 "with": [
    //                     74,
    //                     96
    //                 ],
    //                 "108": [
    //                     75
    //                 ],
    //                 "or": [
    //                     76
    //                 ],
    //                 "more": [
    //                     77
    //                 ],
    //                 "features.": [
    //                     78
    //                 ],
    //                 "The": [
    //                     79
    //                 ],
    //                 "paper": [
    //                     80
    //                 ],
    //                 "discusses": [
    //                     81
    //                 ],
    //                 "greedy": [
    //                     83
    //                 ],
    //                 "data": [
    //                     86
    //                 ],
    //                 "association,": [
    //                     87
    //                 ],
    //                 "and": [
    //                     88
    //                 ],
    //                 "results": [
    //                     90
    //                 ],
    //                 "in": [
    //                     93
    //                 ],
    //                 "urban": [
    //                     94
    //                 ],
    //                 "environments": [
    //                     95
    //                 ],
    //                 "occasional": [
    //                     97
    //                 ],
    //                 "GPS": [
    //                     98
    //                 ],
    //                 "measurements.": [
    //                     99
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2024908906",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 5
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 21
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 43
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 44
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 57
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 57
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 45
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 41
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 34
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 48
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 52
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 38
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 31
    //                 }
    //             ],
    //             "updated_date": "2025-02-19T20:09:26.806155",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2157306293",
    //             "doi": "https://doi.org/10.1109/72.377968",
    //             "title": "Holographic reduced representations",
    //             "display_name": "Holographic reduced representations",
    //             "publication_year": 1995,
    //             "publication_date": "1995-05-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2157306293",
    //                 "doi": "https://doi.org/10.1109/72.377968",
    //                 "mag": "2157306293",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/18263348"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1109/72.377968",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S42080949",
    //                     "display_name": "IEEE Transactions on Neural Networks",
    //                     "issn_l": "1045-9227",
    //                     "issn": [
    //                         "1045-9227",
    //                         "1941-0093"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319808",
    //                     "host_organization_name": "Institute of Electrical and Electronics Engineers",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319808"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Institute of Electrical and Electronics Engineers"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": "http://www.cogsci.ucsd.edu/~sereno/170/readings/06-Holographic.pdf",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5054616980",
    //                         "display_name": "Tony Plate",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1289530486",
    //                             "display_name": "BC Cancer Agency",
    //                             "ror": "https://ror.org/03sfybe47",
    //                             "country_code": "CA",
    //                             "type": "healthcare",
    //                             "lineage": [
    //                                 "https://openalex.org/I1289530486"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "CA"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "T.A. Plate",
    //                     "raw_affiliation_strings": [
    //                         "British Columbia Cancer Agency, Vancouver, BC, Canada"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "British Columbia Cancer Agency, Vancouver, BC, Canada",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1289530486"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5054616980"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I1289530486"
    //             ],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 4.253,
    //             "has_fulltext": false,
    //             "cited_by_count": 615,
    //             "citation_normalized_percentile": {
    //                 "value": 0.99988,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "6",
    //                 "issue": "3",
    //                 "first_page": "623",
    //                 "last_page": "641"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10320",
    //                 "display_name": "Neural Networks and Applications",
    //                 "score": 0.9977,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10320",
    //                     "display_name": "Neural Networks and Applications",
    //                     "score": 0.9977,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12611",
    //                     "display_name": "Neural Networks and Reservoir Computing",
    //                     "score": 0.9975,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T11050",
    //                     "display_name": "Photorefractive and Nonlinear Optics",
    //                     "score": 0.9862,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/3107",
    //                         "display_name": "Atomic and Molecular Physics, and Optics"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/31",
    //                         "display_name": "Physics and Astronomy"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/convolution",
    //                     "display_name": "Convolution (computer science)",
    //                     "score": 0.72775894
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/associative-property",
    //                     "display_name": "Associative property",
    //                     "score": 0.5931879
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/content-addressable-storage",
    //                     "display_name": "Content-addressable storage",
    //                     "score": 0.4606912
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C45347329",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5166604",
    //                     "display_name": "Convolution (computer science)",
    //                     "level": 3,
    //                     "score": 0.72775894
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780586882",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7520643",
    //                     "display_name": "Simple (philosophy)",
    //                     "level": 2,
    //                     "score": 0.7008804
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C53442348",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q745101",
    //                     "display_name": "Content-addressable memory",
    //                     "level": 3,
    //                     "score": 0.62599
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.6074294
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C159423971",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q177251",
    //                     "display_name": "Associative property",
    //                     "level": 2,
    //                     "score": 0.5931879
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C126042441",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1324888",
    //                     "display_name": "Frame (networking)",
    //                     "level": 2,
    //                     "score": 0.51860714
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.51370513
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187590223",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q527628",
    //                     "display_name": "Holography",
    //                     "level": 2,
    //                     "score": 0.50451434
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778618852",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1128613",
    //                     "display_name": "Content-addressable storage",
    //                     "level": 4,
    //                     "score": 0.4606912
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C80444323",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2878974",
    //                     "display_name": "Theoretical computer science",
    //                     "level": 1,
    //                     "score": 0.4211212
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.38586724
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C153180895",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7148389",
    //                     "display_name": "Pattern recognition (psychology)",
    //                     "level": 2,
    //                     "score": 0.34485164
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.33100274
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C50644808",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q192776",
    //                     "display_name": "Artificial neural network",
    //                     "level": 2,
    //                     "score": 0.21876177
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C202444582",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q837863",
    //                     "display_name": "Pure mathematics",
    //                     "level": 1,
    //                     "score": 0.17417035
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C76155785",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q418",
    //                     "display_name": "Telecommunications",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C138885662",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5891",
    //                     "display_name": "Philosophy",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C111472728",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9471",
    //                     "display_name": "Epistemology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C120665830",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q14620",
    //                     "display_name": "Optics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 3,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1109/72.377968",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S42080949",
    //                         "display_name": "IEEE Transactions on Neural Networks",
    //                         "issn_l": "1045-9227",
    //                         "issn": [
    //                             "1045-9227",
    //                             "1941-0093"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319808",
    //                         "host_organization_name": "Institute of Electrical and Electronics Engineers",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319808"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Institute of Electrical and Electronics Engineers"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.93.8966",
    //                     "pdf_url": "http://www.cogsci.ucsd.edu/~sereno/170/readings/06-Holographic.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400349",
    //                         "display_name": "CiteSeer X (The Pennsylvania State University)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I130769515",
    //                         "host_organization_name": "Pennsylvania State University",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I130769515"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Pennsylvania State University"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "submittedVersion",
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/18263348",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.93.8966",
    //                 "pdf_url": "http://www.cogsci.ucsd.edu/~sereno/170/readings/06-Holographic.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400349",
    //                     "display_name": "CiteSeer X (The Pennsylvania State University)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I130769515",
    //                     "host_organization_name": "Pennsylvania State University",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I130769515"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Pennsylvania State University"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "submittedVersion",
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.52,
    //                     "display_name": "Sustainable cities and communities",
    //                     "id": "https://metadata.un.org/sdg/11"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 37,
    //             "referenced_works": [
    //                 "https://openalex.org/W116230093",
    //                 "https://openalex.org/W149140744",
    //                 "https://openalex.org/W1545857431",
    //                 "https://openalex.org/W1563200777",
    //                 "https://openalex.org/W1573706465",
    //                 "https://openalex.org/W1969035214",
    //                 "https://openalex.org/W1971844566",
    //                 "https://openalex.org/W1976052206",
    //                 "https://openalex.org/W1977119590",
    //                 "https://openalex.org/W1984594324",
    //                 "https://openalex.org/W2009784500",
    //                 "https://openalex.org/W2013494846",
    //                 "https://openalex.org/W2026628830",
    //                 "https://openalex.org/W2028744261",
    //                 "https://openalex.org/W2031788394",
    //                 "https://openalex.org/W2032927127",
    //                 "https://openalex.org/W2048325563",
    //                 "https://openalex.org/W2048446345",
    //                 "https://openalex.org/W2072769322",
    //                 "https://openalex.org/W2092162073",
    //                 "https://openalex.org/W2104436836",
    //                 "https://openalex.org/W2110377720",
    //                 "https://openalex.org/W2115662644",
    //                 "https://openalex.org/W2118373646",
    //                 "https://openalex.org/W2119216348",
    //                 "https://openalex.org/W2128084896",
    //                 "https://openalex.org/W2151047202",
    //                 "https://openalex.org/W2165957955",
    //                 "https://openalex.org/W2245915937",
    //                 "https://openalex.org/W2322190567",
    //                 "https://openalex.org/W2611565386",
    //                 "https://openalex.org/W2766736793",
    //                 "https://openalex.org/W2889389124",
    //                 "https://openalex.org/W2912225506",
    //                 "https://openalex.org/W333228003",
    //                 "https://openalex.org/W4230203325",
    //                 "https://openalex.org/W4300402905"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W279701215",
    //                 "https://openalex.org/W2357412443",
    //                 "https://openalex.org/W2137740981",
    //                 "https://openalex.org/W2107697999",
    //                 "https://openalex.org/W2049114128",
    //                 "https://openalex.org/W2046912830",
    //                 "https://openalex.org/W1989420504",
    //                 "https://openalex.org/W1984090010",
    //                 "https://openalex.org/W1974468537",
    //                 "https://openalex.org/W1902246517"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Associative": [
    //                     0
    //                 ],
    //                 "memories": [
    //                     1,
    //                     88
    //                 ],
    //                 "are": [
    //                     2,
    //                     40,
    //                     68
    //                 ],
    //                 "conventionally": [
    //                     3
    //                 ],
    //                 "used": [
    //                     4,
    //                     77
    //                 ],
    //                 "to": [
    //                     5,
    //                     36
    //                 ],
    //                 "represent": [
    //                     6
    //                 ],
    //                 "data": [
    //                     7
    //                 ],
    //                 "with": [
    //                     8
    //                 ],
    //                 "very": [
    //                     9
    //                 ],
    //                 "simple": [
    //                     10,
    //                     52
    //                 ],
    //                 "structure:": [
    //                     11
    //                 ],
    //                 "sets": [
    //                     12
    //                 ],
    //                 "of": [
    //                     13,
    //                     15,
    //                     49
    //                 ],
    //                 "pairs": [
    //                     14
    //                 ],
    //                 "vectors.": [
    //                     16,
    //                     43
    //                 ],
    //                 "This": [
    //                     17
    //                 ],
    //                 "paper": [
    //                     18
    //                 ],
    //                 "describes": [
    //                     19
    //                 ],
    //                 "a": [
    //                     20,
    //                     62,
    //                     95
    //                 ],
    //                 "method": [
    //                     21,
    //                     32
    //                 ],
    //                 "for": [
    //                     22
    //                 ],
    //                 "representing": [
    //                     23
    //                 ],
    //                 "more": [
    //                     24
    //                 ],
    //                 "complex": [
    //                     25
    //                 ],
    //                 "compositional": [
    //                     26,
    //                     80
    //                 ],
    //                 "structure": [
    //                     27
    //                 ],
    //                 "in": [
    //                     28,
    //                     61,
    //                     70,
    //                     78
    //                 ],
    //                 "distributed": [
    //                     29
    //                 ],
    //                 "representations.": [
    //                     30
    //                 ],
    //                 "The": [
    //                     31,
    //                     82
    //                 ],
    //                 "uses": [
    //                     33
    //                 ],
    //                 "circular": [
    //                     34
    //                 ],
    //                 "convolution": [
    //                     35,
    //                     87
    //                 ],
    //                 "associate": [
    //                     37
    //                 ],
    //                 "items,": [
    //                     38
    //                 ],
    //                 "which": [
    //                     39
    //                 ],
    //                 "represented": [
    //                     41,
    //                     60
    //                 ],
    //                 "by": [
    //                     42,
    //                     93
    //                 ],
    //                 "Arbitrary": [
    //                     44
    //                 ],
    //                 "variable": [
    //                     45
    //                 ],
    //                 "bindings,": [
    //                     46
    //                 ],
    //                 "short": [
    //                     47
    //                 ],
    //                 "sequences": [
    //                     48
    //                 ],
    //                 "various": [
    //                     50
    //                 ],
    //                 "lengths,": [
    //                     51
    //                 ],
    //                 "frame-like": [
    //                     53
    //                 ],
    //                 "structures,": [
    //                     54
    //                 ],
    //                 "and": [
    //                     55,
    //                     74
    //                 ],
    //                 "reduced": [
    //                     56
    //                 ],
    //                 "representations": [
    //                     57,
    //                     67
    //                 ],
    //                 "can": [
    //                     58,
    //                     75,
    //                     89
    //                 ],
    //                 "be": [
    //                     59,
    //                     76,
    //                     90
    //                 ],
    //                 "fixed": [
    //                     63
    //                 ],
    //                 "width": [
    //                     64
    //                 ],
    //                 "vector.": [
    //                     65
    //                 ],
    //                 "These": [
    //                     66
    //                 ],
    //                 "items": [
    //                     69
    //                 ],
    //                 "their": [
    //                     71
    //                 ],
    //                 "own": [
    //                     72
    //                 ],
    //                 "right": [
    //                     73
    //                 ],
    //                 "constructing": [
    //                     79
    //                 ],
    //                 "structures.": [
    //                     81
    //                 ],
    //                 "noisy": [
    //                     83
    //                 ],
    //                 "reconstructions": [
    //                     84
    //                 ],
    //                 "extracted": [
    //                     85
    //                 ],
    //                 "from": [
    //                     86
    //                 ],
    //                 "cleaned": [
    //                     91
    //                 ],
    //                 "up": [
    //                     92
    //                 ],
    //                 "using": [
    //                     94
    //                 ],
    //                 "separate": [
    //                     96
    //                 ],
    //                 "associative": [
    //                     97
    //                 ],
    //                 "memory": [
    //                     98
    //                 ],
    //                 "that": [
    //                     99
    //                 ],
    //                 "has": [
    //                     100
    //                 ],
    //                 "good": [
    //                     101
    //                 ],
    //                 "reconstructive": [
    //                     102
    //                 ],
    //                 "properties.": [
    //                     103
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2157306293",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 3
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 43
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 46
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 53
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 76
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 35
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 27
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 25
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 17
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 26
    //                 }
    //             ],
    //             "updated_date": "2025-03-02T13:13:06.645830",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2144309171",
    //             "doi": "https://doi.org/10.1002/hipo.20115",
    //             "title": "Dual phase and rate coding in hippocampal place cells: Theoretical significance and relationship to entorhinal grid cells",
    //             "display_name": "Dual phase and rate coding in hippocampal place cells: Theoretical significance and relationship to entorhinal grid cells",
    //             "publication_year": 2005,
    //             "publication_date": "2005-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2144309171",
    //                 "doi": "https://doi.org/10.1002/hipo.20115",
    //                 "mag": "2144309171",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/16145693",
    //                 "pmcid": "https://www.ncbi.nlm.nih.gov/pmc/articles/2677681"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1002/hipo.20115",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S55111660",
    //                     "display_name": "Hippocampus",
    //                     "issn_l": "1050-9631",
    //                     "issn": [
    //                         "1050-9631",
    //                         "1098-1063"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320595",
    //                     "host_organization_name": "Wiley",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320595"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Wiley"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "review",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "green",
    //                 "oa_url": "https://europepmc.org/articles/pmc2677681?pdf=render",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5053583655",
    //                         "display_name": "John O\u2019Keefe",
    //                         "orcid": "https://orcid.org/0000-0001-5697-4881"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "John O'Keefe",
    //                     "raw_affiliation_strings": [
    //                         "Department of Anatomy and Developmental Biology, London"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Department of Anatomy and Developmental Biology, London",
    //                             "institution_ids": []
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5031109148",
    //                         "display_name": "Neil Burgess",
    //                         "orcid": "https://orcid.org/0000-0003-0646-6584"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I45129253",
    //                             "display_name": "University College London",
    //                             "ror": "https://ror.org/02jx3x895",
    //                             "country_code": "GB",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I124357947",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "GB"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Neil Burgess",
    //                     "raw_affiliation_strings": [
    //                         "Department of Anatomy and Developmental Biology, London",
    //                         "Institute of Cognitive Neuroscience, University College London, London"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Department of Anatomy and Developmental Biology, London",
    //                             "institution_ids": []
    //                         },
    //                         {
    //                             "raw_affiliation_string": "Institute of Cognitive Neuroscience, University College London, London",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5053583655"
    //             ],
    //             "corresponding_institution_ids": [],
    //             "apc_list": {
    //                 "value": 4330,
    //                 "currency": "USD",
    //                 "value_usd": 4330
    //             },
    //             "apc_paid": null,
    //             "fwci": 3.115,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 551,
    //             "citation_normalized_percentile": {
    //                 "value": 0.997719,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "15",
    //                 "issue": "7",
    //                 "first_page": "853",
    //                 "last_page": "866"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10448",
    //                 "display_name": "Memory and Neural Mechanisms",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10448",
    //                     "display_name": "Memory and Neural Mechanisms",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10077",
    //                     "display_name": "Neuroscience and Neuropharmacology Research",
    //                     "score": 0.9997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9984,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/entorhinal-cortex",
    //                     "display_name": "Entorhinal cortex",
    //                     "score": 0.74778974
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/encode",
    //                     "display_name": "ENCODE",
    //                     "score": 0.6731394
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/place-cell",
    //                     "display_name": "Place cell",
    //                     "score": 0.6607382
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.57151115
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/grid-cell",
    //                     "display_name": "Grid cell",
    //                     "score": 0.45043162
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/neural-coding",
    //                     "display_name": "Neural coding",
    //                     "score": 0.41025758
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C148762608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3748185",
    //                     "display_name": "Hippocampal formation",
    //                     "level": 2,
    //                     "score": 0.82420135
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780715579",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2603645",
    //                     "display_name": "Entorhinal cortex",
    //                     "level": 3,
    //                     "score": 0.74778974
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.7429921
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C66746571",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1134833",
    //                     "display_name": "ENCODE",
    //                     "level": 3,
    //                     "score": 0.6731394
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781369091",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2303730",
    //                     "display_name": "Place cell",
    //                     "level": 3,
    //                     "score": 0.6607382
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.57151115
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781161787",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q48360",
    //                     "display_name": "Hippocampus",
    //                     "level": 2,
    //                     "score": 0.51594883
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C179518139",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5140297",
    //                     "display_name": "Coding (social sciences)",
    //                     "level": 2,
    //                     "score": 0.46638298
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C84644016",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2370623",
    //                     "display_name": "Theta rhythm",
    //                     "level": 3,
    //                     "score": 0.45222503
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2983008078",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q863495",
    //                     "display_name": "Grid cell",
    //                     "level": 3,
    //                     "score": 0.45043162
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.42119327
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C77637269",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7002051",
    //                     "display_name": "Neural coding",
    //                     "level": 2,
    //                     "score": 0.41025758
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187691185",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2020720",
    //                     "display_name": "Grid",
    //                     "level": 2,
    //                     "score": 0.36885673
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C185592680",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2329",
    //                     "display_name": "Chemistry",
    //                     "level": 0,
    //                     "score": 0.30533695
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C33923547",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q395",
    //                     "display_name": "Mathematics",
    //                     "level": 0,
    //                     "score": 0.1348511
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55493867",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7094",
    //                     "display_name": "Biochemistry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C105795698",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12483",
    //                     "display_name": "Statistics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2524010",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8087",
    //                     "display_name": "Geometry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C104317684",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7187",
    //                     "display_name": "Gene",
    //                     "level": 2,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D006624",
    //                     "descriptor_name": "Hippocampus",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D013826",
    //                     "descriptor_name": "Theta Rhythm",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001683",
    //                     "descriptor_name": "Biological Clocks",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001683",
    //                     "descriptor_name": "Biological Clocks",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D006624",
    //                     "descriptor_name": "Hippocampus",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D006801",
    //                     "descriptor_name": "Humans",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009949",
    //                     "descriptor_name": "Orientation",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009949",
    //                     "descriptor_name": "Orientation",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D013028",
    //                     "descriptor_name": "Space Perception",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D013028",
    //                     "descriptor_name": "Space Perception",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009435",
    //                     "descriptor_name": "Synaptic Transmission",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009435",
    //                     "descriptor_name": "Synaptic Transmission",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 4,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1002/hipo.20115",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S55111660",
    //                         "display_name": "Hippocampus",
    //                         "issn_l": "1050-9631",
    //                         "issn": [
    //                             "1050-9631",
    //                             "1098-1063"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320595",
    //                         "host_organization_name": "Wiley",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320595"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Wiley"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://europepmc.org/articles/pmc2677681",
    //                     "pdf_url": "https://europepmc.org/articles/pmc2677681?pdf=render",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400806",
    //                         "display_name": "Europe PMC (PubMed Central)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1303153112",
    //                         "host_organization_name": "European Bioinformatics Institute",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1303153112"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "European Bioinformatics Institute"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2677681",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S2764455111",
    //                         "display_name": "PubMed Central",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/16145693",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://europepmc.org/articles/pmc2677681",
    //                 "pdf_url": "https://europepmc.org/articles/pmc2677681?pdf=render",
    //                 "source": {
    //                     "id": "https://openalex.org/S4306400806",
    //                     "display_name": "Europe PMC (PubMed Central)",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": true,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": "https://openalex.org/I1303153112",
    //                     "host_organization_name": "European Bioinformatics Institute",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/I1303153112"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "European Bioinformatics Institute"
    //                     ],
    //                     "type": "repository"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "acceptedVersion",
    //                 "is_accepted": true,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 72,
    //             "referenced_works": [
    //                 "https://openalex.org/W146900863",
    //                 "https://openalex.org/W1504615859",
    //                 "https://openalex.org/W1585564530",
    //                 "https://openalex.org/W1605797652",
    //                 "https://openalex.org/W1658884838",
    //                 "https://openalex.org/W1659775087",
    //                 "https://openalex.org/W1917541791",
    //                 "https://openalex.org/W1965476659",
    //                 "https://openalex.org/W1968520062",
    //                 "https://openalex.org/W1969255675",
    //                 "https://openalex.org/W1969769253",
    //                 "https://openalex.org/W1970146739",
    //                 "https://openalex.org/W1970792572",
    //                 "https://openalex.org/W1973372728",
    //                 "https://openalex.org/W1974719406",
    //                 "https://openalex.org/W1988694078",
    //                 "https://openalex.org/W1988751593",
    //                 "https://openalex.org/W1991417588",
    //                 "https://openalex.org/W1992364208",
    //                 "https://openalex.org/W1998581719",
    //                 "https://openalex.org/W2001186755",
    //                 "https://openalex.org/W2002272109",
    //                 "https://openalex.org/W2004725045",
    //                 "https://openalex.org/W2018196751",
    //                 "https://openalex.org/W2018529924",
    //                 "https://openalex.org/W2023382980",
    //                 "https://openalex.org/W2023699349",
    //                 "https://openalex.org/W2027579198",
    //                 "https://openalex.org/W2032438999",
    //                 "https://openalex.org/W2033218028",
    //                 "https://openalex.org/W2047403459",
    //                 "https://openalex.org/W2047750300",
    //                 "https://openalex.org/W2049289902",
    //                 "https://openalex.org/W2052515926",
    //                 "https://openalex.org/W2055715294",
    //                 "https://openalex.org/W2056336718",
    //                 "https://openalex.org/W2056916404",
    //                 "https://openalex.org/W2057629466",
    //                 "https://openalex.org/W2058242738",
    //                 "https://openalex.org/W2059981865",
    //                 "https://openalex.org/W2071344447",
    //                 "https://openalex.org/W2071668347",
    //                 "https://openalex.org/W2078575897",
    //                 "https://openalex.org/W2079390801",
    //                 "https://openalex.org/W2082149624",
    //                 "https://openalex.org/W2083547018",
    //                 "https://openalex.org/W2084640934",
    //                 "https://openalex.org/W2087298647",
    //                 "https://openalex.org/W2087310621",
    //                 "https://openalex.org/W2088382964",
    //                 "https://openalex.org/W2091354315",
    //                 "https://openalex.org/W2091697313",
    //                 "https://openalex.org/W2096297854",
    //                 "https://openalex.org/W2103692957",
    //                 "https://openalex.org/W2103853773",
    //                 "https://openalex.org/W2110161683",
    //                 "https://openalex.org/W2112601177",
    //                 "https://openalex.org/W2119565218",
    //                 "https://openalex.org/W2120127728",
    //                 "https://openalex.org/W2128595101",
    //                 "https://openalex.org/W2136308298",
    //                 "https://openalex.org/W2138418141",
    //                 "https://openalex.org/W2146600851",
    //                 "https://openalex.org/W2149422514",
    //                 "https://openalex.org/W2151990639",
    //                 "https://openalex.org/W2155547196",
    //                 "https://openalex.org/W2164524833",
    //                 "https://openalex.org/W2165443127",
    //                 "https://openalex.org/W2167403166",
    //                 "https://openalex.org/W2990693854",
    //                 "https://openalex.org/W4388291344",
    //                 "https://openalex.org/W5055497"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4386537348",
    //                 "https://openalex.org/W4384693483",
    //                 "https://openalex.org/W4311677676",
    //                 "https://openalex.org/W2945054186",
    //                 "https://openalex.org/W2900895596",
    //                 "https://openalex.org/W2774672285",
    //                 "https://openalex.org/W2734976771",
    //                 "https://openalex.org/W2060571990",
    //                 "https://openalex.org/W2058736264",
    //                 "https://openalex.org/W1977793635"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Abstract": [
    //                     0
    //                 ],
    //                 "We": [
    //                     1,
    //                     52
    //                 ],
    //                 "review": [
    //                     2
    //                 ],
    //                 "the": [
    //                     3,
    //                     8,
    //                     23,
    //                     27,
    //                     34,
    //                     57,
    //                     70,
    //                     76,
    //                     95,
    //                     98
    //                 ],
    //                 "ideas": [
    //                     4
    //                 ],
    //                 "and": [
    //                     5,
    //                     75,
    //                     117
    //                 ],
    //                 "data": [
    //                     6
    //                 ],
    //                 "behind": [
    //                     7
    //                 ],
    //                 "hypothesis": [
    //                     9,
    //                     36
    //                 ],
    //                 "that": [
    //                     10,
    //                     37,
    //                     47
    //                 ],
    //                 "hippocampal": [
    //                     11
    //                 ],
    //                 "pyramidal": [
    //                     12,
    //                     71
    //                 ],
    //                 "cells": [
    //                     13,
    //                     116
    //                 ],
    //                 "encode": [
    //                     14,
    //                     43
    //                 ],
    //                 "information": [
    //                     15,
    //                     44
    //                 ],
    //                 "by": [
    //                     16,
    //                     49
    //                 ],
    //                 "their": [
    //                     17
    //                 ],
    //                 "phase": [
    //                     18,
    //                     81
    //                 ],
    //                 "of": [
    //                     19,
    //                     26,
    //                     56,
    //                     62,
    //                     94,
    //                     97,
    //                     108
    //                 ],
    //                 "firing": [
    //                     20,
    //                     40,
    //                     50,
    //                     80,
    //                     96
    //                 ],
    //                 "relative": [
    //                     21
    //                 ],
    //                 "to": [
    //                     22,
    //                     33,
    //                     78
    //                 ],
    //                 "theta": [
    //                     24
    //                 ],
    //                 "rhythm": [
    //                     25
    //                 ],
    //                 "EEG.": [
    //                     28
    //                 ],
    //                 "Particular": [
    //                     29
    //                 ],
    //                 "focus": [
    //                     30
    //                 ],
    //                 "is": [
    //                     31
    //                 ],
    //                 "given": [
    //                     32
    //                 ],
    //                 "further": [
    //                     35
    //                 ],
    //                 "variations": [
    //                     38
    //                 ],
    //                 "in": [
    //                     39,
    //                     60,
    //                     103,
    //                     112
    //                 ],
    //                 "rate": [
    //                     41
    //                 ],
    //                 "can": [
    //                     42
    //                 ],
    //                 "independently": [
    //                     45
    //                 ],
    //                 "from": [
    //                     46
    //                 ],
    //                 "encoded": [
    //                     48
    //                 ],
    //                 "phase.": [
    //                     51
    //                 ],
    //                 "discuss": [
    //                     53
    //                 ],
    //                 "possible": [
    //                     54
    //                 ],
    //                 "explanation": [
    //                     55
    //                 ],
    //                 "phase\u2010precession": [
    //                     58
    //                 ],
    //                 "effect": [
    //                     59
    //                 ],
    //                 "terms": [
    //                     61
    //                 ],
    //                 "interference": [
    //                     63
    //                 ],
    //                 "between": [
    //                     64
    //                 ],
    //                 "two": [
    //                     65
    //                 ],
    //                 "independent": [
    //                     66
    //                 ],
    //                 "oscillatory": [
    //                     67
    //                 ],
    //                 "influences": [
    //                     68
    //                 ],
    //                 "on": [
    //                     69
    //                 ],
    //                 "cell": [
    //                     72
    //                 ],
    //                 "membrane": [
    //                     73
    //                 ],
    //                 "potential,": [
    //                     74
    //                 ],
    //                 "extent": [
    //                     77
    //                 ],
    //                 "which": [
    //                     79
    //                 ],
    //                 "reflects": [
    //                     82
    //                 ],
    //                 "internal": [
    //                     83
    //                 ],
    //                 "dynamics": [
    //                     84
    //                 ],
    //                 "or": [
    //                     85
    //                 ],
    //                 "external": [
    //                     86
    //                 ],
    //                 "(environmental)": [
    //                     87
    //                 ],
    //                 "variables.": [
    //                     88
    //                 ],
    //                 "Finally,": [
    //                     89
    //                 ],
    //                 "we": [
    //                     90
    //                 ],
    //                 "propose": [
    //                     91
    //                 ],
    //                 "a": [
    //                     92,
    //                     109
    //                 ],
    //                 "model": [
    //                     93
    //                 ],
    //                 "recently": [
    //                     99
    //                 ],
    //                 "discovered": [
    //                     100
    //                 ],
    //                 "\u201cgrid": [
    //                     101
    //                 ],
    //                 "cells\u201d": [
    //                     102
    //                 ],
    //                 "entorhinal": [
    //                     104
    //                 ],
    //                 "cortex": [
    //                     105
    //                 ],
    //                 "as": [
    //                     106
    //                 ],
    //                 "part": [
    //                     107
    //                 ],
    //                 "path\u2010integration": [
    //                     110
    //                 ],
    //                 "system,": [
    //                     111
    //                 ],
    //                 "combination": [
    //                     113
    //                 ],
    //                 "with": [
    //                     114
    //                 ],
    //                 "place": [
    //                     115
    //                 ],
    //                 "head\u2010direction": [
    //                     118
    //                 ],
    //                 "cells.": [
    //                     119
    //                 ],
    //                 "\u00a9": [
    //                     120
    //                 ],
    //                 "2005": [
    //                     121
    //                 ],
    //                 "Wiley\u2010Liss,": [
    //                     122
    //                 ],
    //                 "Inc.": [
    //                     123
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2144309171",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 4
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 26
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 25
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 34
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 17
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 42
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 33
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 23
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 29
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 24
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 26
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 30
    //                 }
    //             ],
    //             "updated_date": "2025-03-03T00:27:36.781811",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2912327653",
    //             "doi": "https://doi.org/10.1016/j.neucom.2019.02.003",
    //             "title": "Survey on semantic segmentation using deep learning techniques",
    //             "display_name": "Survey on semantic segmentation using deep learning techniques",
    //             "publication_year": 2019,
    //             "publication_date": "2019-02-10",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2912327653",
    //                 "doi": "https://doi.org/10.1016/j.neucom.2019.02.003",
    //                 "mag": "2912327653"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1016/j.neucom.2019.02.003",
    //                 "pdf_url": "https://www.sciencedirect.com/science/article/am/pii/S092523121930181X",
    //                 "source": {
    //                     "id": "https://openalex.org/S45693802",
    //                     "display_name": "Neurocomputing",
    //                     "issn_l": "0925-2312",
    //                     "issn": [
    //                         "0925-2312",
    //                         "1872-8286"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320990",
    //                     "host_organization_name": "Elsevier BV",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320990"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Elsevier BV"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "publisher-specific-oa",
    //                 "license_id": "https://openalex.org/licenses/publisher-specific-oa",
    //                 "version": "acceptedVersion",
    //                 "is_accepted": true,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "bronze",
    //                 "oa_url": "https://www.sciencedirect.com/science/article/am/pii/S092523121930181X",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5070001231",
    //                         "display_name": "Fahad Lateef",
    //                         "orcid": "https://orcid.org/0000-0002-1018-518X"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I177064439",
    //                             "display_name": "Universit\u00e9 de Bourgogne",
    //                             "ror": "https://ror.org/03k1bsr36",
    //                             "country_code": "FR",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I177064439"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I4210136953",
    //                             "display_name": "Laboratoire d\u2019\u00c9lectronique, Informatique et Image",
    //                             "ror": "https://ror.org/04gnd7c94",
    //                             "country_code": "FR",
    //                             "type": "facility",
    //                             "lineage": [
    //                                 "https://openalex.org/I1294671590",
    //                                 "https://openalex.org/I190752583",
    //                                 "https://openalex.org/I190861549",
    //                                 "https://openalex.org/I4210118524",
    //                                 "https://openalex.org/I4210134562",
    //                                 "https://openalex.org/I4210136953",
    //                                 "https://openalex.org/I4210159245"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "FR"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Fahad Lateef",
    //                     "raw_affiliation_strings": [
    //                         "Le2i - Laboratoire Electronique, Informatique et Image [UMR6306] (Universit\u00e9 de Bourgogne - Laboratoire Le2i - UFR Sciences et Techniques - BP 47870 - 21078 DIJON CEDEX - France)"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Le2i - Laboratoire Electronique, Informatique et Image [UMR6306] (Universit\u00e9 de Bourgogne - Laboratoire Le2i - UFR Sciences et Techniques - BP 47870 - 21078 DIJON CEDEX - France)",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I177064439",
    //                                 "https://openalex.org/I4210136953"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5083239938",
    //                         "display_name": "Yassine Ruichek",
    //                         "orcid": "https://orcid.org/0000-0003-4795-8569"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I177064439",
    //                             "display_name": "Universit\u00e9 de Bourgogne",
    //                             "ror": "https://ror.org/03k1bsr36",
    //                             "country_code": "FR",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I177064439"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I4210136953",
    //                             "display_name": "Laboratoire d\u2019\u00c9lectronique, Informatique et Image",
    //                             "ror": "https://ror.org/04gnd7c94",
    //                             "country_code": "FR",
    //                             "type": "facility",
    //                             "lineage": [
    //                                 "https://openalex.org/I1294671590",
    //                                 "https://openalex.org/I190752583",
    //                                 "https://openalex.org/I190861549",
    //                                 "https://openalex.org/I4210118524",
    //                                 "https://openalex.org/I4210134562",
    //                                 "https://openalex.org/I4210136953",
    //                                 "https://openalex.org/I4210159245"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "FR"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yassine Ruichek",
    //                     "raw_affiliation_strings": [
    //                         "Le2i - Laboratoire Electronique, Informatique et Image [UMR6306] (Universit\u00e9 de Bourgogne - Laboratoire Le2i - UFR Sciences et Techniques - BP 47870 - 21078 DIJON CEDEX - France)"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Le2i - Laboratoire Electronique, Informatique et Image [UMR6306] (Universit\u00e9 de Bourgogne - Laboratoire Le2i - UFR Sciences et Techniques - BP 47870 - 21078 DIJON CEDEX - France)",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I177064439",
    //                                 "https://openalex.org/I4210136953"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": {
    //                 "value": 2470,
    //                 "currency": "USD",
    //                 "value_usd": 2470
    //             },
    //             "apc_paid": null,
    //             "fwci": 35.624,
    //             "has_fulltext": true,
    //             "fulltext_origin": "pdf",
    //             "cited_by_count": 485,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999945,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "338",
    //                 "issue": null,
    //                 "first_page": "321",
    //                 "last_page": "348"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10036",
    //                 "display_name": "Advanced Neural Network Applications",
    //                 "score": 0.9999,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1707",
    //                     "display_name": "Computer Vision and Pattern Recognition"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10036",
    //                     "display_name": "Advanced Neural Network Applications",
    //                     "score": 0.9999,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10627",
    //                     "display_name": "Advanced Image and Video Retrieval Techniques",
    //                     "score": 0.9997,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T11307",
    //                     "display_name": "Domain Adaptation and Few-Shot Learning",
    //                     "score": 0.9992,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.8338012
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.75399554
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C89600930",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1423946",
    //                     "display_name": "Segmentation",
    //                     "level": 2,
    //                     "score": 0.6763133
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780719617",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1030752",
    //                     "display_name": "Salient",
    //                     "level": 2,
    //                     "score": 0.67157114
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780451532",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q759676",
    //                     "display_name": "Task (project management)",
    //                     "level": 2,
    //                     "score": 0.64101493
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C119857082",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2539",
    //                     "display_name": "Machine learning",
    //                     "level": 1,
    //                     "score": 0.5752101
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C108583219",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q197536",
    //                     "display_name": "Deep learning",
    //                     "level": 2,
    //                     "score": 0.5751465
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C192209626",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q190909",
    //                     "display_name": "Focus (optics)",
    //                     "level": 2,
    //                     "score": 0.571079
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C34413123",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q170978",
    //                     "display_name": "Robotics",
    //                     "level": 3,
    //                     "score": 0.43163496
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2780009758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q6804172",
    //                     "display_name": "Measure (data warehouse)",
    //                     "level": 2,
    //                     "score": 0.4252558
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.23452649
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C124101348",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q172491",
    //                     "display_name": "Data mining",
    //                     "level": 1,
    //                     "score": 0.1675762
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C120665830",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q14620",
    //                     "display_name": "Optics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C187736073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2920921",
    //                     "display_name": "Management",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C162324750",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8134",
    //                     "display_name": "Economics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 5,
    //             "locations": [
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://doi.org/10.1016/j.neucom.2019.02.003",
    //                     "pdf_url": "https://www.sciencedirect.com/science/article/am/pii/S092523121930181X",
    //                     "source": {
    //                         "id": "https://openalex.org/S45693802",
    //                         "display_name": "Neurocomputing",
    //                         "issn_l": "0925-2312",
    //                         "issn": [
    //                             "0925-2312",
    //                             "1872-8286"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320990",
    //                         "host_organization_name": "Elsevier BV",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320990"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Elsevier BV"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": "publisher-specific-oa",
    //                     "license_id": "https://openalex.org/licenses/publisher-specific-oa",
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://hal.science/hal-03487187",
    //                     "pdf_url": "https://hal.science/hal-03487187/document",
    //                     "source": null,
    //                     "license": "cc-by-nc",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://hal.archives-ouvertes.fr/hal-03487187/file/S092523121930181X.pdf",
    //                     "pdf_url": "https://hal.archives-ouvertes.fr/hal-03487187/file/S092523121930181X.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306402512",
    //                         "display_name": "HAL (Le Centre pour la Communication Scientifique Directe)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1294671590",
    //                         "host_organization_name": "Centre National de la Recherche Scientifique",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1294671590"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Centre National de la Recherche Scientifique"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "cc-by-nc",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://hal.science/hal-03487187/file/S092523121930181X.pdf",
    //                     "pdf_url": "https://hal.science/hal-03487187/file/S092523121930181X.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306402512",
    //                         "display_name": "HAL (Le Centre pour la Communication Scientifique Directe)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1294671590",
    //                         "host_organization_name": "Centre National de la Recherche Scientifique",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1294671590"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Centre National de la Recherche Scientifique"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "cc-by-nc",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://hal.archives-ouvertes.fr/hal-03487187/document",
    //                     "pdf_url": "https://hal.archives-ouvertes.fr/hal-03487187/document",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306402512",
    //                         "display_name": "HAL (Le Centre pour la Communication Scientifique Directe)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1294671590",
    //                         "host_organization_name": "Centre National de la Recherche Scientifique",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1294671590"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Centre National de la Recherche Scientifique"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": "cc-by-nc",
    //                     "license_id": "https://openalex.org/licenses/cc-by-nc",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1016/j.neucom.2019.02.003",
    //                 "pdf_url": "https://www.sciencedirect.com/science/article/am/pii/S092523121930181X",
    //                 "source": {
    //                     "id": "https://openalex.org/S45693802",
    //                     "display_name": "Neurocomputing",
    //                     "issn_l": "0925-2312",
    //                     "issn": [
    //                         "0925-2312",
    //                         "1872-8286"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320990",
    //                     "host_organization_name": "Elsevier BV",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320990"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Elsevier BV"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "publisher-specific-oa",
    //                 "license_id": "https://openalex.org/licenses/publisher-specific-oa",
    //                 "version": "acceptedVersion",
    //                 "is_accepted": true,
    //                 "is_published": false
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.65,
    //                     "display_name": "Zero hunger",
    //                     "id": "https://metadata.un.org/sdg/2"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 251,
    //             "referenced_works": [
    //                 "https://openalex.org/W125693051",
    //                 "https://openalex.org/W1514107797",
    //                 "https://openalex.org/W1522734439",
    //                 "https://openalex.org/W1528789833",
    //                 "https://openalex.org/W1542723449",
    //                 "https://openalex.org/W1546771929",
    //                 "https://openalex.org/W1583837637",
    //                 "https://openalex.org/W1610060839",
    //                 "https://openalex.org/W1664573881",
    //                 "https://openalex.org/W1686810756",
    //                 "https://openalex.org/W1799366690",
    //                 "https://openalex.org/W1808966389",
    //                 "https://openalex.org/W1849277567",
    //                 "https://openalex.org/W1861492603",
    //                 "https://openalex.org/W1903029394",
    //                 "https://openalex.org/W1909234690",
    //                 "https://openalex.org/W1910657905",
    //                 "https://openalex.org/W1923184257",
    //                 "https://openalex.org/W1923697677",
    //                 "https://openalex.org/W1931270512",
    //                 "https://openalex.org/W1938976761",
    //                 "https://openalex.org/W1945608308",
    //                 "https://openalex.org/W1948751323",
    //                 "https://openalex.org/W1958328135",
    //                 "https://openalex.org/W1964772475",
    //                 "https://openalex.org/W1973445088",
    //                 "https://openalex.org/W1985238052",
    //                 "https://openalex.org/W1996901117",
    //                 "https://openalex.org/W2008353316",
    //                 "https://openalex.org/W2019904315",
    //                 "https://openalex.org/W2022508996",
    //                 "https://openalex.org/W2037227137",
    //                 "https://openalex.org/W2064675550",
    //                 "https://openalex.org/W2088049833",
    //                 "https://openalex.org/W2097117768",
    //                 "https://openalex.org/W2099471712",
    //                 "https://openalex.org/W2100588357",
    //                 "https://openalex.org/W2102605133",
    //                 "https://openalex.org/W2103504761",
    //                 "https://openalex.org/W2108598243",
    //                 "https://openalex.org/W2110764733",
    //                 "https://openalex.org/W2111077768",
    //                 "https://openalex.org/W2112796928",
    //                 "https://openalex.org/W2118246710",
    //                 "https://openalex.org/W2124351162",
    //                 "https://openalex.org/W2124592697",
    //                 "https://openalex.org/W2125215748",
    //                 "https://openalex.org/W2127911825",
    //                 "https://openalex.org/W2133515615",
    //                 "https://openalex.org/W2136922672",
    //                 "https://openalex.org/W2138682569",
    //                 "https://openalex.org/W2139427956",
    //                 "https://openalex.org/W2142834259",
    //                 "https://openalex.org/W2143612262",
    //                 "https://openalex.org/W2144794286",
    //                 "https://openalex.org/W2150066425",
    //                 "https://openalex.org/W2153158097",
    //                 "https://openalex.org/W2154318594",
    //                 "https://openalex.org/W2156222070",
    //                 "https://openalex.org/W2158305599",
    //                 "https://openalex.org/W2161236525",
    //                 "https://openalex.org/W2163605009",
    //                 "https://openalex.org/W2165181841",
    //                 "https://openalex.org/W2171943915",
    //                 "https://openalex.org/W2172156083",
    //                 "https://openalex.org/W2177847924",
    //                 "https://openalex.org/W2180092181",
    //                 "https://openalex.org/W2183341477",
    //                 "https://openalex.org/W2186222003",
    //                 "https://openalex.org/W2194775991",
    //                 "https://openalex.org/W2204696980",
    //                 "https://openalex.org/W2221898772",
    //                 "https://openalex.org/W2230170002",
    //                 "https://openalex.org/W2254462240",
    //                 "https://openalex.org/W2264432461",
    //                 "https://openalex.org/W2266390837",
    //                 "https://openalex.org/W2273666108",
    //                 "https://openalex.org/W2274287116",
    //                 "https://openalex.org/W2279098554",
    //                 "https://openalex.org/W2286929393",
    //                 "https://openalex.org/W2295107390",
    //                 "https://openalex.org/W2296319761",
    //                 "https://openalex.org/W2333621733",
    //                 "https://openalex.org/W2339172515",
    //                 "https://openalex.org/W2340017589",
    //                 "https://openalex.org/W2406270520",
    //                 "https://openalex.org/W2412782625",
    //                 "https://openalex.org/W2419448466",
    //                 "https://openalex.org/W2431874326",
    //                 "https://openalex.org/W2438962998",
    //                 "https://openalex.org/W2461677039",
    //                 "https://openalex.org/W2473131906",
    //                 "https://openalex.org/W2473415337",
    //                 "https://openalex.org/W2489780108",
    //                 "https://openalex.org/W2507296351",
    //                 "https://openalex.org/W2515385951",
    //                 "https://openalex.org/W2516803306",
    //                 "https://openalex.org/W2517503862",
    //                 "https://openalex.org/W2526004596",
    //                 "https://openalex.org/W2531409750",
    //                 "https://openalex.org/W2536208356",
    //                 "https://openalex.org/W2541674938",
    //                 "https://openalex.org/W2549139847",
    //                 "https://openalex.org/W2552414813",
    //                 "https://openalex.org/W2557283755",
    //                 "https://openalex.org/W2557406251",
    //                 "https://openalex.org/W2559597482",
    //                 "https://openalex.org/W2560023338",
    //                 "https://openalex.org/W2560474170",
    //                 "https://openalex.org/W2560609797",
    //                 "https://openalex.org/W2561196672",
    //                 "https://openalex.org/W2561585794",
    //                 "https://openalex.org/W2562192638",
    //                 "https://openalex.org/W2563705555",
    //                 "https://openalex.org/W2565639579",
    //                 "https://openalex.org/W2582998992",
    //                 "https://openalex.org/W2583039726",
    //                 "https://openalex.org/W2586114507",
    //                 "https://openalex.org/W2592939477",
    //                 "https://openalex.org/W2593403058",
    //                 "https://openalex.org/W2598666589",
    //                 "https://openalex.org/W2599765304",
    //                 "https://openalex.org/W2600777408",
    //                 "https://openalex.org/W2603089249",
    //                 "https://openalex.org/W2609077090",
    //                 "https://openalex.org/W2612445135",
    //                 "https://openalex.org/W2616891703",
    //                 "https://openalex.org/W2618412219",
    //                 "https://openalex.org/W2619538244",
    //                 "https://openalex.org/W2621285511",
    //                 "https://openalex.org/W2623546809",
    //                 "https://openalex.org/W2624650145",
    //                 "https://openalex.org/W2630837129",
    //                 "https://openalex.org/W2726651278",
    //                 "https://openalex.org/W2736282206",
    //                 "https://openalex.org/W2737312250",
    //                 "https://openalex.org/W2737885667",
    //                 "https://openalex.org/W2739253758",
    //                 "https://openalex.org/W2739759330",
    //                 "https://openalex.org/W2741232386",
    //                 "https://openalex.org/W2745943519",
    //                 "https://openalex.org/W2746274177",
    //                 "https://openalex.org/W2753588254",
    //                 "https://openalex.org/W2760340275",
    //                 "https://openalex.org/W2761129952",
    //                 "https://openalex.org/W2762439315",
    //                 "https://openalex.org/W2763794872",
    //                 "https://openalex.org/W2769586268",
    //                 "https://openalex.org/W2770215646",
    //                 "https://openalex.org/W2770233088",
    //                 "https://openalex.org/W2770764755",
    //                 "https://openalex.org/W2772283977",
    //                 "https://openalex.org/W2774058387",
    //                 "https://openalex.org/W2775906317",
    //                 "https://openalex.org/W2777686015",
    //                 "https://openalex.org/W2777737607",
    //                 "https://openalex.org/W2781228439",
    //                 "https://openalex.org/W2782278879",
    //                 "https://openalex.org/W2784226479",
    //                 "https://openalex.org/W2787091153",
    //                 "https://openalex.org/W2787241931",
    //                 "https://openalex.org/W2788920278",
    //                 "https://openalex.org/W2789385525",
    //                 "https://openalex.org/W2793484370",
    //                 "https://openalex.org/W2793693263",
    //                 "https://openalex.org/W2795889831",
    //                 "https://openalex.org/W2798791840",
    //                 "https://openalex.org/W2798827082",
    //                 "https://openalex.org/W2799124825",
    //                 "https://openalex.org/W2799217622",
    //                 "https://openalex.org/W2799406003",
    //                 "https://openalex.org/W2800306924",
    //                 "https://openalex.org/W2800507189",
    //                 "https://openalex.org/W2803417661",
    //                 "https://openalex.org/W2804860796",
    //                 "https://openalex.org/W2807566656",
    //                 "https://openalex.org/W2837491902",
    //                 "https://openalex.org/W2886664976",
    //                 "https://openalex.org/W2890747436",
    //                 "https://openalex.org/W2894469712",
    //                 "https://openalex.org/W2894567592",
    //                 "https://openalex.org/W2907965334",
    //                 "https://openalex.org/W2911787226",
    //                 "https://openalex.org/W2915043960",
    //                 "https://openalex.org/W2916743882",
    //                 "https://openalex.org/W2949086864",
    //                 "https://openalex.org/W2949117887",
    //                 "https://openalex.org/W2949847866",
    //                 "https://openalex.org/W2949892913",
    //                 "https://openalex.org/W2950373644",
    //                 "https://openalex.org/W2950493473",
    //                 "https://openalex.org/W2950635152",
    //                 "https://openalex.org/W2950967261",
    //                 "https://openalex.org/W2951548327",
    //                 "https://openalex.org/W2951975363",
    //                 "https://openalex.org/W2952147788",
    //                 "https://openalex.org/W2952276042",
    //                 "https://openalex.org/W2952313718",
    //                 "https://openalex.org/W2952594086",
    //                 "https://openalex.org/W2952637581",
    //                 "https://openalex.org/W2952787450",
    //                 "https://openalex.org/W2953106684",
    //                 "https://openalex.org/W2953118818",
    //                 "https://openalex.org/W2962782553",
    //                 "https://openalex.org/W2962835968",
    //                 "https://openalex.org/W2962872526",
    //                 "https://openalex.org/W2962889061",
    //                 "https://openalex.org/W2962891704",
    //                 "https://openalex.org/W2962965870",
    //                 "https://openalex.org/W2962988160",
    //                 "https://openalex.org/W2963038646",
    //                 "https://openalex.org/W2963073398",
    //                 "https://openalex.org/W2963149042",
    //                 "https://openalex.org/W2963166928",
    //                 "https://openalex.org/W2963230283",
    //                 "https://openalex.org/W2963292632",
    //                 "https://openalex.org/W2963318290",
    //                 "https://openalex.org/W2963342403",
    //                 "https://openalex.org/W2963418739",
    //                 "https://openalex.org/W2963424321",
    //                 "https://openalex.org/W2963446712",
    //                 "https://openalex.org/W2963543249",
    //                 "https://openalex.org/W2963563573",
    //                 "https://openalex.org/W2963753570",
    //                 "https://openalex.org/W2963840672",
    //                 "https://openalex.org/W2963866581",
    //                 "https://openalex.org/W2963917006",
    //                 "https://openalex.org/W2963934324",
    //                 "https://openalex.org/W2963974947",
    //                 "https://openalex.org/W2964015131",
    //                 "https://openalex.org/W2964048993",
    //                 "https://openalex.org/W2964217532",
    //                 "https://openalex.org/W3037950864",
    //                 "https://openalex.org/W3092476034",
    //                 "https://openalex.org/W3118608800",
    //                 "https://openalex.org/W3140428646",
    //                 "https://openalex.org/W3143801622",
    //                 "https://openalex.org/W3143835353",
    //                 "https://openalex.org/W4236965008",
    //                 "https://openalex.org/W4245286259",
    //                 "https://openalex.org/W4255430598",
    //                 "https://openalex.org/W4293406525",
    //                 "https://openalex.org/W4294563867",
    //                 "https://openalex.org/W4297683907",
    //                 "https://openalex.org/W4297775537",
    //                 "https://openalex.org/W4299603580",
    //                 "https://openalex.org/W4301329587",
    //                 "https://openalex.org/W4301409532",
    //                 "https://openalex.org/W589665618",
    //                 "https://openalex.org/W634848499",
    //                 "https://openalex.org/W77200240"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4327728159",
    //                 "https://openalex.org/W4315434538",
    //                 "https://openalex.org/W4255837520",
    //                 "https://openalex.org/W2912751582",
    //                 "https://openalex.org/W28991112",
    //                 "https://openalex.org/W2545348020",
    //                 "https://openalex.org/W2370726991",
    //                 "https://openalex.org/W2369710579",
    //                 "https://openalex.org/W2329500892",
    //                 "https://openalex.org/W2130893381"
    //             ],
    //             "abstract_inverted_index": null,
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2912327653",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 8
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 71
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 89
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 120
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 104
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 69
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 24
    //                 }
    //             ],
    //             "updated_date": "2025-03-02T10:47:10.882394",
    //             "created_date": "2019-02-21"
    //         },
    //         {
    //             "id": "https://openalex.org/W2739423245",
    //             "doi": "https://doi.org/10.1109/icra.2017.7989203",
    //             "title": "Probabilistic data association for semantic SLAM",
    //             "display_name": "Probabilistic data association for semantic SLAM",
    //             "publication_year": 2017,
    //             "publication_date": "2017-05-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2739423245",
    //                 "doi": "https://doi.org/10.1109/icra.2017.7989203",
    //                 "mag": "2739423245"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1109/icra.2017.7989203",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "proceedings-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5036169536",
    //                         "display_name": "Sean L. Bowman",
    //                         "orcid": "https://orcid.org/0000-0002-7711-2321"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I79576946",
    //                             "display_name": "University of Pennsylvania",
    //                             "ror": "https://ror.org/00b30xv10",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Sean L. Bowman",
    //                     "raw_affiliation_strings": [
    //                         "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5066400889",
    //                         "display_name": "Nikolay Atanasov",
    //                         "orcid": "https://orcid.org/0000-0003-0272-7580"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I79576946",
    //                             "display_name": "University of Pennsylvania",
    //                             "ror": "https://ror.org/00b30xv10",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Nikolay Atanasov",
    //                     "raw_affiliation_strings": [
    //                         "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5050660826",
    //                         "display_name": "Kostas Daniilidis",
    //                         "orcid": "https://orcid.org/0000-0003-0498-0758"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I79576946",
    //                             "display_name": "University of Pennsylvania",
    //                             "ror": "https://ror.org/00b30xv10",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Kostas Daniilidis",
    //                     "raw_affiliation_strings": [
    //                         "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5029243115",
    //                         "display_name": "George J. Pappas",
    //                         "orcid": "https://orcid.org/0000-0001-9081-0637"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I79576946",
    //                             "display_name": "University of Pennsylvania",
    //                             "ror": "https://ror.org/00b30xv10",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "George J. Pappas",
    //                     "raw_affiliation_strings": [
    //                         "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "GRASP Lab, University of Pennsylvania, Philadelphia, PA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I79576946"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 76.214,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 455,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999826,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": "1722",
    //                 "last_page": "1729"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10191",
    //                 "display_name": "Robotics and Sensor-Based Localization",
    //                 "score": 1.0,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2202",
    //                     "display_name": "Aerospace Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10191",
    //                     "display_name": "Robotics and Sensor-Based Localization",
    //                     "score": 1.0,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2202",
    //                         "display_name": "Aerospace Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10627",
    //                     "display_name": "Advanced Image and Video Retrieval Techniques",
    //                     "score": 0.9977,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10326",
    //                     "display_name": "Indoor and Outdoor Localization Technologies",
    //                     "score": 0.9975,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2208",
    //                         "display_name": "Electrical and Electronic Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/landmark",
    //                     "display_name": "Landmark",
    //                     "score": 0.86903954
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/data-association",
    //                     "display_name": "Data association",
    //                     "score": 0.52673006
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/association",
    //                     "display_name": "Association (psychology)",
    //                     "score": 0.4939497
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C2780297707",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4895393",
    //                     "display_name": "Landmark",
    //                     "level": 2,
    //                     "score": 0.86903954
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86369673",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1203659",
    //                     "display_name": "Simultaneous localization and mapping",
    //                     "level": 4,
    //                     "score": 0.7659204
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C176217482",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q860554",
    //                     "display_name": "Metric (unit)",
    //                     "level": 2,
    //                     "score": 0.6608571
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.6548176
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.62114084
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776214188",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q408386",
    //                     "display_name": "Inference",
    //                     "level": 2,
    //                     "score": 0.58312917
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C49937458",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2599292",
    //                     "display_name": "Probabilistic logic",
    //                     "level": 2,
    //                     "score": 0.5542676
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2983325608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17084606",
    //                     "display_name": "Data association",
    //                     "level": 3,
    //                     "score": 0.52673006
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781238097",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q175026",
    //                     "display_name": "Object (grammar)",
    //                     "level": 2,
    //                     "score": 0.5113008
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C142853389",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q744778",
    //                     "display_name": "Association (psychology)",
    //                     "level": 2,
    //                     "score": 0.4939497
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C153180895",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7148389",
    //                     "display_name": "Pattern recognition (psychology)",
    //                     "level": 2,
    //                     "score": 0.46825323
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2777212361",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5127848",
    //                     "display_name": "Class (philosophy)",
    //                     "level": 2,
    //                     "score": 0.43913868
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C137836250",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q984063",
    //                     "display_name": "Optimization problem",
    //                     "level": 2,
    //                     "score": 0.43844375
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C177264268",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1514741",
    //                     "display_name": "Set (abstract data type)",
    //                     "level": 2,
    //                     "score": 0.42242622
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.40341905
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C31972630",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q844240",
    //                     "display_name": "Computer vision",
    //                     "level": 1,
    //                     "score": 0.3818839
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C124101348",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q172491",
    //                     "display_name": "Data mining",
    //                     "level": 1,
    //                     "score": 0.35712993
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C19966478",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4810574",
    //                     "display_name": "Mobile robot",
    //                     "level": 3,
    //                     "score": 0.24082986
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.16604623
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C138885662",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5891",
    //                     "display_name": "Philosophy",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C21547014",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1423657",
    //                     "display_name": "Operations management",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C111472728",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9471",
    //                     "display_name": "Epistemology",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199360897",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9143",
    //                     "display_name": "Programming language",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C162324750",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8134",
    //                     "display_name": "Economics",
    //                     "level": 0,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1109/icra.2017.7989203",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.63,
    //                     "display_name": "Sustainable cities and communities",
    //                     "id": "https://metadata.un.org/sdg/11"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 48,
    //             "referenced_works": [
    //                 "https://openalex.org/W114421296",
    //                 "https://openalex.org/W1612997784",
    //                 "https://openalex.org/W1656165940",
    //                 "https://openalex.org/W1932624639",
    //                 "https://openalex.org/W1951265541",
    //                 "https://openalex.org/W1968315983",
    //                 "https://openalex.org/W1970504153",
    //                 "https://openalex.org/W1972671602",
    //                 "https://openalex.org/W1990987766",
    //                 "https://openalex.org/W2020762599",
    //                 "https://openalex.org/W2023668040",
    //                 "https://openalex.org/W2024676408",
    //                 "https://openalex.org/W2049207102",
    //                 "https://openalex.org/W2051349034",
    //                 "https://openalex.org/W2056610823",
    //                 "https://openalex.org/W2060772243",
    //                 "https://openalex.org/W2061669523",
    //                 "https://openalex.org/W2088287910",
    //                 "https://openalex.org/W2097696373",
    //                 "https://openalex.org/W2107402720",
    //                 "https://openalex.org/W2117228865",
    //                 "https://openalex.org/W2118223742",
    //                 "https://openalex.org/W2141461755",
    //                 "https://openalex.org/W2144409879",
    //                 "https://openalex.org/W2146881125",
    //                 "https://openalex.org/W2150066425",
    //                 "https://openalex.org/W2153054365",
    //                 "https://openalex.org/W2160921898",
    //                 "https://openalex.org/W2162731263",
    //                 "https://openalex.org/W2167687475",
    //                 "https://openalex.org/W2168356304",
    //                 "https://openalex.org/W2168676389",
    //                 "https://openalex.org/W2182229738",
    //                 "https://openalex.org/W2184393491",
    //                 "https://openalex.org/W2194775991",
    //                 "https://openalex.org/W2214788824",
    //                 "https://openalex.org/W2216550548",
    //                 "https://openalex.org/W2232251213",
    //                 "https://openalex.org/W2265661972",
    //                 "https://openalex.org/W2293098187",
    //                 "https://openalex.org/W2490270993",
    //                 "https://openalex.org/W2963288928",
    //                 "https://openalex.org/W3102327032",
    //                 "https://openalex.org/W3103648783",
    //                 "https://openalex.org/W41755662",
    //                 "https://openalex.org/W4246614213",
    //                 "https://openalex.org/W639708223",
    //                 "https://openalex.org/W801273237"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4322716905",
    //                 "https://openalex.org/W2975125358",
    //                 "https://openalex.org/W2963091090",
    //                 "https://openalex.org/W2564786226",
    //                 "https://openalex.org/W2165326377",
    //                 "https://openalex.org/W2165113654",
    //                 "https://openalex.org/W2141498523",
    //                 "https://openalex.org/W2127578024",
    //                 "https://openalex.org/W1581933381",
    //                 "https://openalex.org/W1510326563"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Traditional": [
    //                     0
    //                 ],
    //                 "approaches": [
    //                     1
    //                 ],
    //                 "to": [
    //                     2,
    //                     22,
    //                     26,
    //                     45
    //                 ],
    //                 "simultaneous": [
    //                     3
    //                 ],
    //                 "localization": [
    //                     4
    //                 ],
    //                 "and": [
    //                     5,
    //                     17,
    //                     43,
    //                     63,
    //                     100,
    //                     130,
    //                     140,
    //                     143,
    //                     156,
    //                     160,
    //                     171,
    //                     177,
    //                     197
    //                 ],
    //                 "mapping": [
    //                     6
    //                 ],
    //                 "(SLAM)": [
    //                     7
    //                 ],
    //                 "rely": [
    //                     8
    //                 ],
    //                 "on": [
    //                     9,
    //                     37,
    //                     195
    //                 ],
    //                 "low-level": [
    //                     10,
    //                     38
    //                 ],
    //                 "geometric": [
    //                     11
    //                 ],
    //                 "features": [
    //                     12,
    //                     39
    //                 ],
    //                 "such": [
    //                     13
    //                 ],
    //                 "as": [
    //                     14
    //                 ],
    //                 "points,": [
    //                     15
    //                 ],
    //                 "lines,": [
    //                     16
    //                 ],
    //                 "planes.": [
    //                     18
    //                 ],
    //                 "They": [
    //                     19
    //                 ],
    //                 "are": [
    //                     20,
    //                     102
    //                 ],
    //                 "unable": [
    //                     21
    //                 ],
    //                 "assign": [
    //                     23
    //                 ],
    //                 "semantic": [
    //                     24,
    //                     131,
    //                     138
    //                 ],
    //                 "labels": [
    //                     25
    //                 ],
    //                 "landmarks": [
    //                     27
    //                 ],
    //                 "observed": [
    //                     28
    //                 ],
    //                 "in": [
    //                     29,
    //                     47,
    //                     66,
    //                     181
    //                 ],
    //                 "the": [
    //                     30,
    //                     53,
    //                     87,
    //                     165,
    //                     175,
    //                     184
    //                 ],
    //                 "environment.": [
    //                     31
    //                 ],
    //                 "Furthermore,": [
    //                     32
    //                 ],
    //                 "loop": [
    //                     33,
    //                     78
    //                 ],
    //                 "closure": [
    //                     34
    //                 ],
    //                 "recognition": [
    //                     35,
    //                     57,
    //                     101
    //                 ],
    //                 "based": [
    //                     36
    //                 ],
    //                 "is": [
    //                     40,
    //                     112,
    //                     193
    //                 ],
    //                 "often": [
    //                     41
    //                 ],
    //                 "viewpoint-dependent": [
    //                     42
    //                 ],
    //                 "subject": [
    //                     44
    //                 ],
    //                 "failure": [
    //                     46
    //                 ],
    //                 "ambiguous": [
    //                     48
    //                 ],
    //                 "or": [
    //                     49
    //                 ],
    //                 "repetitive": [
    //                     50
    //                 ],
    //                 "environments.": [
    //                     51
    //                 ],
    //                 "On": [
    //                     52
    //                 ],
    //                 "other": [
    //                     54
    //                 ],
    //                 "hand,": [
    //                     55
    //                 ],
    //                 "object": [
    //                     56
    //                 ],
    //                 "methods": [
    //                     58
    //                 ],
    //                 "can": [
    //                     59
    //                 ],
    //                 "infer": [
    //                     60
    //                 ],
    //                 "landmark": [
    //                     61,
    //                     132,
    //                     157,
    //                     170
    //                 ],
    //                 "classes": [
    //                     62
    //                 ],
    //                 "scales,": [
    //                     64
    //                 ],
    //                 "resulting": [
    //                     65
    //                 ],
    //                 "a": [
    //                     67,
    //                     81,
    //                     91,
    //                     113,
    //                     161
    //                 ],
    //                 "small": [
    //                     68
    //                 ],
    //                 "set": [
    //                     69
    //                 ],
    //                 "of": [
    //                     70,
    //                     86,
    //                     152,
    //                     190
    //                 ],
    //                 "easily": [
    //                     71
    //                 ],
    //                 "recognizable": [
    //                     72
    //                 ],
    //                 "landmarks,": [
    //                     73
    //                 ],
    //                 "ideal": [
    //                     74
    //                 ],
    //                 "for": [
    //                     75
    //                 ],
    //                 "view-independent": [
    //                     76
    //                 ],
    //                 "unambiguous": [
    //                     77
    //                 ],
    //                 "closure.": [
    //                     79
    //                 ],
    //                 "In": [
    //                     80,
    //                     119
    //                 ],
    //                 "map": [
    //                     82
    //                 ],
    //                 "with": [
    //                     83
    //                 ],
    //                 "several": [
    //                     84
    //                 ],
    //                 "objects": [
    //                     85
    //                 ],
    //                 "same": [
    //                     88
    //                 ],
    //                 "class,": [
    //                     89
    //                 ],
    //                 "however,": [
    //                     90
    //                 ],
    //                 "crucial": [
    //                     92
    //                 ],
    //                 "data": [
    //                     93,
    //                     98,
    //                     141,
    //                     154
    //                 ],
    //                 "association": [
    //                     94,
    //                     99,
    //                     155,
    //                     176
    //                 ],
    //                 "problem": [
    //                     95,
    //                     126
    //                 ],
    //                 "exists.": [
    //                     96
    //                 ],
    //                 "While": [
    //                     97
    //                 ],
    //                 "discrete": [
    //                     103,
    //                     108,
    //                     153
    //                 ],
    //                 "problems": [
    //                     104
    //                 ],
    //                 "usually": [
    //                     105
    //                 ],
    //                 "solved": [
    //                     106
    //                 ],
    //                 "using": [
    //                     107
    //                 ],
    //                 "inference,": [
    //                     109
    //                 ],
    //                 "classical": [
    //                     110
    //                 ],
    //                 "SLAM": [
    //                     111
    //                 ],
    //                 "continuous": [
    //                     114,
    //                     162
    //                 ],
    //                 "optimization": [
    //                     115,
    //                     125,
    //                     163
    //                 ],
    //                 "over": [
    //                     116,
    //                     127,
    //                     164
    //                 ],
    //                 "metric": [
    //                     117,
    //                     136,
    //                     166
    //                 ],
    //                 "information.": [
    //                     118
    //                 ],
    //                 "this": [
    //                     120
    //                 ],
    //                 "paper,": [
    //                     121
    //                 ],
    //                 "we": [
    //                     122
    //                 ],
    //                 "formulate": [
    //                     123
    //                 ],
    //                 "an": [
    //                     124,
    //                     150
    //                 ],
    //                 "sensor": [
    //                     128
    //                 ],
    //                 "states": [
    //                     129
    //                 ],
    //                 "positions": [
    //                     133
    //                 ],
    //                 "that": [
    //                     134
    //                 ],
    //                 "integrates": [
    //                     135
    //                 ],
    //                 "information,": [
    //                     137,
    //                     139
    //                 ],
    //                 "associations,": [
    //                     142
    //                 ],
    //                 "decompose": [
    //                     144
    //                 ],
    //                 "it": [
    //                     145
    //                 ],
    //                 "into": [
    //                     146
    //                 ],
    //                 "two": [
    //                     147
    //                 ],
    //                 "interconnected": [
    //                     148
    //                 ],
    //                 "problems:": [
    //                     149
    //                 ],
    //                 "estimation": [
    //                     151
    //                 ],
    //                 "class": [
    //                     158,
    //                     178
    //                 ],
    //                 "probabilities,": [
    //                     159
    //                 ],
    //                 "states.": [
    //                     167
    //                 ],
    //                 "The": [
    //                     168,
    //                     188
    //                 ],
    //                 "estimated": [
    //                     169
    //                 ],
    //                 "robot": [
    //                     172
    //                 ],
    //                 "poses": [
    //                     173
    //                 ],
    //                 "affect": [
    //                     174,
    //                     183
    //                 ],
    //                 "distributions,": [
    //                     179
    //                 ],
    //                 "which": [
    //                     180
    //                 ],
    //                 "turn": [
    //                     182
    //                 ],
    //                 "robot-landmark": [
    //                     185
    //                 ],
    //                 "pose": [
    //                     186
    //                 ],
    //                 "optimization.": [
    //                     187
    //                 ],
    //                 "performance": [
    //                     189
    //                 ],
    //                 "our": [
    //                     191
    //                 ],
    //                 "algorithm": [
    //                     192
    //                 ],
    //                 "demonstrated": [
    //                     194
    //                 ],
    //                 "indoor": [
    //                     196
    //                 ],
    //                 "outdoor": [
    //                     198
    //                 ],
    //                 "datasets.": [
    //                     199
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2739423245",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 1
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 23
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 61
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 59
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 82
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 90
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 78
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 55
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 6
    //                 }
    //             ],
    //             "updated_date": "2025-02-19T17:26:47.875980",
    //             "created_date": "2017-07-31"
    //         },
    //         {
    //             "id": "https://openalex.org/W3139657805",
    //             "doi": "https://doi.org/10.1109/jproc.2021.3067593",
    //             "title": "Advancing Neuromorphic Computing With Loihi: A Survey of Results and Outlook",
    //             "display_name": "Advancing Neuromorphic Computing With Loihi: A Survey of Results and Outlook",
    //             "publication_year": 2021,
    //             "publication_date": "2021-04-06",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W3139657805",
    //                 "doi": "https://doi.org/10.1109/jproc.2021.3067593",
    //                 "mag": "3139657805"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1109/jproc.2021.3067593",
    //                 "pdf_url": "https://ieeexplore.ieee.org/ielx7/5/9420072/09395703.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S68686220",
    //                     "display_name": "Proceedings of the IEEE",
    //                     "issn_l": "0018-9219",
    //                     "issn": [
    //                         "0018-9219",
    //                         "1558-2256"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319808",
    //                     "host_organization_name": "Institute of Electrical and Electronics Engineers",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319808"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Institute of Electrical and Electronics Engineers"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "cc-by",
    //                 "license_id": "https://openalex.org/licenses/cc-by",
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "hybrid",
    //                 "oa_url": "https://ieeexplore.ieee.org/ielx7/5/9420072/09395703.pdf",
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5009816332",
    //                         "display_name": "Mike Davies",
    //                         "orcid": "https://orcid.org/0000-0002-5459-5957"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Mike Davies",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5090260554",
    //                         "display_name": "Andreas Wild",
    //                         "orcid": "https://orcid.org/0000-0003-0380-5675"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Andreas Wild",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5045833517",
    //                         "display_name": "Garrick Orchard",
    //                         "orcid": "https://orcid.org/0000-0002-1243-2711"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Garrick Orchard",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5000514685",
    //                         "display_name": "Yulia Sandamirskaya",
    //                         "orcid": "https://orcid.org/0000-0003-4684-202X"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Yulia Sandamirskaya",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5009165685",
    //                         "display_name": "G. A. Fonseca Guerra",
    //                         "orcid": "https://orcid.org/0000-0001-5403-4634"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Gabriel A. Fonseca Guerra",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5047348809",
    //                         "display_name": "Prasad Joshi",
    //                         "orcid": "https://orcid.org/0000-0003-0896-4341"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Prasad Joshi",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5102769370",
    //                         "display_name": "Philipp Plank",
    //                         "orcid": "https://orcid.org/0000-0002-2209-9238"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Philipp Plank",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5063618610",
    //                         "display_name": "Sumedh R. Risbud",
    //                         "orcid": "https://orcid.org/0000-0003-4777-1139"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I1343180700",
    //                             "display_name": "Intel (United States)",
    //                             "ror": "https://ror.org/01ek73717",
    //                             "country_code": "US",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "US"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Sumedh R. Risbud",
    //                     "raw_affiliation_strings": [
    //                         "Intel Labs, Intel Corporation, Santa Clara, CA, USA"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Intel Labs, Intel Corporation, Santa Clara, CA, USA",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I1343180700"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 28.48,
    //             "has_fulltext": true,
    //             "fulltext_origin": "pdf",
    //             "cited_by_count": 369,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999985,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "109",
    //                 "issue": "5",
    //                 "first_page": "911",
    //                 "last_page": "934"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10502",
    //                 "display_name": "Advanced Memory and Neural Computing",
    //                 "score": 1.0,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2208",
    //                     "display_name": "Electrical and Electronic Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10502",
    //                     "display_name": "Advanced Memory and Neural Computing",
    //                     "score": 1.0,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2208",
    //                         "display_name": "Electrical and Electronic Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12808",
    //                     "display_name": "Ferroelectric and Negative Capacitance Devices",
    //                     "score": 0.999,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2208",
    //                         "display_name": "Electrical and Electronic Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T12611",
    //                     "display_name": "Neural Networks and Reservoir Computing",
    //                     "score": 0.9982,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/neuromorphic-engineering",
    //                     "display_name": "Neuromorphic engineering",
    //                     "score": 0.9814852
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/mnist-database",
    //                     "display_name": "MNIST database",
    //                     "score": 0.42673728
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C151927369",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1981312",
    //                     "display_name": "Neuromorphic engineering",
    //                     "level": 3,
    //                     "score": 0.9814852
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.71456134
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11731999",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9067355",
    //                     "display_name": "Spiking neural network",
    //                     "level": 3,
    //                     "score": 0.6128703
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.5176687
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C50644808",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q192776",
    //                     "display_name": "Artificial neural network",
    //                     "level": 2,
    //                     "score": 0.513171
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781390188",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q25203449",
    //                     "display_name": "Spike (software development)",
    //                     "level": 2,
    //                     "score": 0.4758294
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C108583219",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q197536",
    //                     "display_name": "Deep learning",
    //                     "level": 2,
    //                     "score": 0.4611528
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C45374587",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q12525525",
    //                     "display_name": "Computation",
    //                     "level": 2,
    //                     "score": 0.45385417
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C190502265",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17069496",
    //                     "display_name": "MNIST database",
    //                     "level": 3,
    //                     "score": 0.42673728
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C119857082",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2539",
    //                     "display_name": "Machine learning",
    //                     "level": 1,
    //                     "score": 0.4084551
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C118524514",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q173212",
    //                     "display_name": "Computer architecture",
    //                     "level": 1,
    //                     "score": 0.38228828
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.105091095
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C115903868",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q80993",
    //                     "display_name": "Software engineering",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://doi.org/10.1109/jproc.2021.3067593",
    //                     "pdf_url": "https://ieeexplore.ieee.org/ielx7/5/9420072/09395703.pdf",
    //                     "source": {
    //                         "id": "https://openalex.org/S68686220",
    //                         "display_name": "Proceedings of the IEEE",
    //                         "issn_l": "0018-9219",
    //                         "issn": [
    //                             "0018-9219",
    //                             "1558-2256"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310319808",
    //                         "host_organization_name": "Institute of Electrical and Electronics Engineers",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310319808"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Institute of Electrical and Electronics Engineers"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": "cc-by",
    //                     "license_id": "https://openalex.org/licenses/cc-by",
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1109/jproc.2021.3067593",
    //                 "pdf_url": "https://ieeexplore.ieee.org/ielx7/5/9420072/09395703.pdf",
    //                 "source": {
    //                     "id": "https://openalex.org/S68686220",
    //                     "display_name": "Proceedings of the IEEE",
    //                     "issn_l": "0018-9219",
    //                     "issn": [
    //                         "0018-9219",
    //                         "1558-2256"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310319808",
    //                     "host_organization_name": "Institute of Electrical and Electronics Engineers",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310319808"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Institute of Electrical and Electronics Engineers"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": "cc-by",
    //                 "license_id": "https://openalex.org/licenses/cc-by",
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "sustainable_development_goals": [],
    //             "grants": [
    //                 {
    //                     "funder": "https://openalex.org/F4320307102",
    //                     "funder_display_name": "Intel Corporation",
    //                     "award_id": null
    //                 }
    //             ],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 158,
    //             "referenced_works": [
    //                 "https://openalex.org/W1026732487",
    //                 "https://openalex.org/W110811143",
    //                 "https://openalex.org/W1525961042",
    //                 "https://openalex.org/W169198699",
    //                 "https://openalex.org/W1966219797",
    //                 "https://openalex.org/W1975398991",
    //                 "https://openalex.org/W1977295328",
    //                 "https://openalex.org/W1977503502",
    //                 "https://openalex.org/W1987794083",
    //                 "https://openalex.org/W1995837155",
    //                 "https://openalex.org/W2010526455",
    //                 "https://openalex.org/W2016708835",
    //                 "https://openalex.org/W2025164836",
    //                 "https://openalex.org/W2051137788",
    //                 "https://openalex.org/W2058390599",
    //                 "https://openalex.org/W2063978378",
    //                 "https://openalex.org/W2065125569",
    //                 "https://openalex.org/W206948248",
    //                 "https://openalex.org/W2069552454",
    //                 "https://openalex.org/W2076661751",
    //                 "https://openalex.org/W2086064090",
    //                 "https://openalex.org/W2089026470",
    //                 "https://openalex.org/W2100543212",
    //                 "https://openalex.org/W2100556411",
    //                 "https://openalex.org/W2102397476",
    //                 "https://openalex.org/W2103570933",
    //                 "https://openalex.org/W2112090702",
    //                 "https://openalex.org/W2118103795",
    //                 "https://openalex.org/W2130360162",
    //                 "https://openalex.org/W2138913040",
    //                 "https://openalex.org/W2140886546",
    //                 "https://openalex.org/W2149176744",
    //                 "https://openalex.org/W2156174987",
    //                 "https://openalex.org/W2160365857",
    //                 "https://openalex.org/W2161338791",
    //                 "https://openalex.org/W2163288878",
    //                 "https://openalex.org/W2177690825",
    //                 "https://openalex.org/W2199246069",
    //                 "https://openalex.org/W2314470091",
    //                 "https://openalex.org/W2321609157",
    //                 "https://openalex.org/W238464747",
    //                 "https://openalex.org/W2409440453",
    //                 "https://openalex.org/W2504024651",
    //                 "https://openalex.org/W2527798464",
    //                 "https://openalex.org/W2547116542",
    //                 "https://openalex.org/W2552737632",
    //                 "https://openalex.org/W2558597819",
    //                 "https://openalex.org/W2581251857",
    //                 "https://openalex.org/W2614698515",
    //                 "https://openalex.org/W2621826044",
    //                 "https://openalex.org/W2735281769",
    //                 "https://openalex.org/W2735562682",
    //                 "https://openalex.org/W2757539224",
    //                 "https://openalex.org/W2775079417",
    //                 "https://openalex.org/W2775855651",
    //                 "https://openalex.org/W2783525259",
    //                 "https://openalex.org/W2792794651",
    //                 "https://openalex.org/W2805000281",
    //                 "https://openalex.org/W2811423283",
    //                 "https://openalex.org/W2884666145",
    //                 "https://openalex.org/W2891530223",
    //                 "https://openalex.org/W2900163261",
    //                 "https://openalex.org/W2904565241",
    //                 "https://openalex.org/W2914117107",
    //                 "https://openalex.org/W291502169",
    //                 "https://openalex.org/W2923216461",
    //                 "https://openalex.org/W2931077460",
    //                 "https://openalex.org/W2958536588",
    //                 "https://openalex.org/W2960052088",
    //                 "https://openalex.org/W2963140169",
    //                 "https://openalex.org/W2963150511",
    //                 "https://openalex.org/W2963416336",
    //                 "https://openalex.org/W2963493474",
    //                 "https://openalex.org/W2963781282",
    //                 "https://openalex.org/W2963809228",
    //                 "https://openalex.org/W2963834742",
    //                 "https://openalex.org/W2963907629",
    //                 "https://openalex.org/W2964000821",
    //                 "https://openalex.org/W2964338223",
    //                 "https://openalex.org/W2969020366",
    //                 "https://openalex.org/W2969331319",
    //                 "https://openalex.org/W2969335882",
    //                 "https://openalex.org/W2969945374",
    //                 "https://openalex.org/W2971783054",
    //                 "https://openalex.org/W2972434175",
    //                 "https://openalex.org/W2972599999",
    //                 "https://openalex.org/W2973017734",
    //                 "https://openalex.org/W2973029862",
    //                 "https://openalex.org/W2973159797",
    //                 "https://openalex.org/W2973204152",
    //                 "https://openalex.org/W2974488061",
    //                 "https://openalex.org/W2977853463",
    //                 "https://openalex.org/W2982651937",
    //                 "https://openalex.org/W2983067551",
    //                 "https://openalex.org/W2984844508",
    //                 "https://openalex.org/W2985853352",
    //                 "https://openalex.org/W2985873131",
    //                 "https://openalex.org/W2991614318",
    //                 "https://openalex.org/W3003876377",
    //                 "https://openalex.org/W3005721546",
    //                 "https://openalex.org/W3009996893",
    //                 "https://openalex.org/W3011489868",
    //                 "https://openalex.org/W3018523095",
    //                 "https://openalex.org/W3021221531",
    //                 "https://openalex.org/W3022582871",
    //                 "https://openalex.org/W3023361272",
    //                 "https://openalex.org/W3023721287",
    //                 "https://openalex.org/W3024338890",
    //                 "https://openalex.org/W3033564916",
    //                 "https://openalex.org/W3035557885",
    //                 "https://openalex.org/W3036016986",
    //                 "https://openalex.org/W3036078768",
    //                 "https://openalex.org/W3036134000",
    //                 "https://openalex.org/W3036180802",
    //                 "https://openalex.org/W3036805013",
    //                 "https://openalex.org/W3038052560",
    //                 "https://openalex.org/W3039829398",
    //                 "https://openalex.org/W3039834782",
    //                 "https://openalex.org/W3040099822",
    //                 "https://openalex.org/W3040828168",
    //                 "https://openalex.org/W3040838455",
    //                 "https://openalex.org/W3043133474",
    //                 "https://openalex.org/W3045505988",
    //                 "https://openalex.org/W3045595568",
    //                 "https://openalex.org/W3046023844",
    //                 "https://openalex.org/W3046127916",
    //                 "https://openalex.org/W3047425638",
    //                 "https://openalex.org/W3085718454",
    //                 "https://openalex.org/W3089363641",
    //                 "https://openalex.org/W3089892344",
    //                 "https://openalex.org/W3090769368",
    //                 "https://openalex.org/W3091431973",
    //                 "https://openalex.org/W3092451347",
    //                 "https://openalex.org/W3093843458",
    //                 "https://openalex.org/W3093947012",
    //                 "https://openalex.org/W3098917398",
    //                 "https://openalex.org/W3100658279",
    //                 "https://openalex.org/W3101210313",
    //                 "https://openalex.org/W3103266921",
    //                 "https://openalex.org/W3104688113",
    //                 "https://openalex.org/W3118540096",
    //                 "https://openalex.org/W3124478039",
    //                 "https://openalex.org/W3130821023",
    //                 "https://openalex.org/W3133213258",
    //                 "https://openalex.org/W3167035550",
    //                 "https://openalex.org/W3186962187",
    //                 "https://openalex.org/W3200729277",
    //                 "https://openalex.org/W3207611614",
    //                 "https://openalex.org/W4225708293",
    //                 "https://openalex.org/W4226051885",
    //                 "https://openalex.org/W4234841423",
    //                 "https://openalex.org/W4236503105",
    //                 "https://openalex.org/W4288409129",
    //                 "https://openalex.org/W4297797035",
    //                 "https://openalex.org/W4298355310",
    //                 "https://openalex.org/W4300971709",
    //                 "https://openalex.org/W4301319368",
    //                 "https://openalex.org/W66442755"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4321472116",
    //                 "https://openalex.org/W4287780255",
    //                 "https://openalex.org/W4281699635",
    //                 "https://openalex.org/W3202619090",
    //                 "https://openalex.org/W3137378424",
    //                 "https://openalex.org/W3089892344",
    //                 "https://openalex.org/W3036270242",
    //                 "https://openalex.org/W3023361272",
    //                 "https://openalex.org/W2809732489",
    //                 "https://openalex.org/W2542565870"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Deep": [
    //                     0
    //                 ],
    //                 "artificial": [
    //                     1
    //                 ],
    //                 "neural": [
    //                     2,
    //                     43,
    //                     106,
    //                     166
    //                 ],
    //                 "networks": [
    //                     3,
    //                     107,
    //                     167,
    //                     177,
    //                     207
    //                 ],
    //                 "apply": [
    //                     4
    //                 ],
    //                 "principles": [
    //                     5
    //                 ],
    //                 "of": [
    //                     6,
    //                     41,
    //                     65,
    //                     91,
    //                     104,
    //                     158,
    //                     193,
    //                     212,
    //                     215
    //                 ],
    //                 "the": [
    //                     7,
    //                     37,
    //                     89,
    //                     136,
    //                     155
    //                 ],
    //                 "brain's": [
    //                     8
    //                 ],
    //                 "information": [
    //                     9
    //                 ],
    //                 "processing": [
    //                     10
    //                 ],
    //                 "that": [
    //                     11,
    //                     75,
    //                     128,
    //                     149
    //                 ],
    //                 "led": [
    //                     12
    //                 ],
    //                 "to": [
    //                     13,
    //                     25,
    //                     31,
    //                     99,
    //                     114,
    //                     119,
    //                     131,
    //                     151,
    //                     200
    //                 ],
    //                 "breakthroughs": [
    //                     14
    //                 ],
    //                 "in": [
    //                     15,
    //                     55
    //                 ],
    //                 "machine": [
    //                     16
    //                 ],
    //                 "learning": [
    //                     17,
    //                     144
    //                 ],
    //                 "spanning": [
    //                     18
    //                 ],
    //                 "many": [
    //                     19
    //                 ],
    //                 "problem": [
    //                     20
    //                 ],
    //                 "domains.": [
    //                     21
    //                 ],
    //                 "Neuromorphic": [
    //                     22
    //                 ],
    //                 "computing": [
    //                     23,
    //                     122
    //                 ],
    //                 "aims": [
    //                     24
    //                 ],
    //                 "take": [
    //                     26
    //                 ],
    //                 "this": [
    //                     27
    //                 ],
    //                 "a": [
    //                     28,
    //                     94,
    //                     101,
    //                     209
    //                 ],
    //                 "step": [
    //                     29
    //                 ],
    //                 "further": [
    //                     30
    //                 ],
    //                 "chips": [
    //                     32,
    //                     78
    //                 ],
    //                 "more": [
    //                     33,
    //                     152,
    //                     175
    //                 ],
    //                 "directly": [
    //                     34,
    //                     153
    //                 ],
    //                 "inspired": [
    //                     35
    //                 ],
    //                 "by": [
    //                     36
    //                 ],
    //                 "form": [
    //                     38
    //                 ],
    //                 "and": [
    //                     39,
    //                     53,
    //                     112,
    //                     146,
    //                     186,
    //                     197,
    //                     230
    //                 ],
    //                 "function": [
    //                     40
    //                 ],
    //                 "biological": [
    //                     42
    //                 ],
    //                 "circuits,": [
    //                     44
    //                 ],
    //                 "so": [
    //                     45
    //                 ],
    //                 "they": [
    //                     46
    //                 ],
    //                 "can": [
    //                     47,
    //                     79
    //                 ],
    //                 "process": [
    //                     48
    //                 ],
    //                 "new": [
    //                     49
    //                 ],
    //                 "knowledge,": [
    //                     50
    //                 ],
    //                 "adapt,": [
    //                     51
    //                 ],
    //                 "behave,": [
    //                     52
    //                 ],
    //                 "learn": [
    //                     54
    //                 ],
    //                 "real": [
    //                     56
    //                 ],
    //                 "time": [
    //                     57
    //                 ],
    //                 "at": [
    //                     58
    //                 ],
    //                 "low": [
    //                     59
    //                 ],
    //                 "power": [
    //                     60
    //                 ],
    //                 "levels.": [
    //                     61
    //                 ],
    //                 "Despite": [
    //                     62
    //                 ],
    //                 "several": [
    //                     63
    //                 ],
    //                 "decades": [
    //                     64
    //                 ],
    //                 "research,": [
    //                     66
    //                 ],
    //                 "until": [
    //                     67
    //                 ],
    //                 "recently,": [
    //                     68
    //                 ],
    //                 "very": [
    //                     69
    //                 ],
    //                 "few": [
    //                     70
    //                 ],
    //                 "published": [
    //                     71
    //                 ],
    //                 "results": [
    //                     72,
    //                     117,
    //                     127
    //                 ],
    //                 "have": [
    //                     73
    //                 ],
    //                 "shown": [
    //                     74
    //                 ],
    //                 "today's": [
    //                     76
    //                 ],
    //                 "neuromorphic": [
    //                     77,
    //                     95,
    //                     160,
    //                     206
    //                 ],
    //                 "demonstrate": [
    //                     80
    //                 ],
    //                 "quantitative": [
    //                     81
    //                 ],
    //                 "computational": [
    //                     82
    //                 ],
    //                 "value.": [
    //                     83
    //                 ],
    //                 "This": [
    //                     84,
    //                     124
    //                 ],
    //                 "is": [
    //                     85
    //                 ],
    //                 "now": [
    //                     86
    //                 ],
    //                 "changing": [
    //                     87
    //                 ],
    //                 "with": [
    //                     88,
    //                     108,
    //                     133,
    //                     191
    //                 ],
    //                 "advent": [
    //                     90
    //                 ],
    //                 "Intel's": [
    //                     92
    //                 ],
    //                 "Loihi,": [
    //                     93,
    //                     174
    //                 ],
    //                 "research": [
    //                     96
    //                 ],
    //                 "processor": [
    //                     97
    //                 ],
    //                 "designed": [
    //                     98
    //                 ],
    //                 "support": [
    //                     100
    //                 ],
    //                 "broad": [
    //                     102
    //                 ],
    //                 "range": [
    //                     103,
    //                     211
    //                 ],
    //                 "spiking": [
    //                     105
    //                 ],
    //                 "sufficient": [
    //                     109
    //                 ],
    //                 "scale,": [
    //                     110
    //                 ],
    //                 "performance,": [
    //                     111
    //                 ],
    //                 "features": [
    //                     113,
    //                     157
    //                 ],
    //                 "deliver": [
    //                     115
    //                 ],
    //                 "competitive": [
    //                     116
    //                 ],
    //                 "compared": [
    //                     118,
    //                     199
    //                 ],
    //                 "state-of-the-art": [
    //                     120,
    //                     201
    //                 ],
    //                 "contemporary": [
    //                     121
    //                 ],
    //                 "architectures.": [
    //                     123
    //                 ],
    //                 "survey": [
    //                     125
    //                 ],
    //                 "reviews": [
    //                     126
    //                 ],
    //                 "are": [
    //                     129
    //                 ],
    //                 "obtained": [
    //                     130
    //                 ],
    //                 "date": [
    //                     132
    //                 ],
    //                 "Loihi": [
    //                     134
    //                 ],
    //                 "across": [
    //                     135
    //                 ],
    //                 "major": [
    //                     137
    //                 ],
    //                 "algorithmic": [
    //                     138
    //                 ],
    //                 "domains": [
    //                     139
    //                 ],
    //                 "under": [
    //                     140
    //                 ],
    //                 "study,": [
    //                     141
    //                 ],
    //                 "including": [
    //                     142
    //                 ],
    //                 "deep": [
    //                     143,
    //                     165
    //                 ],
    //                 "approaches": [
    //                     145,
    //                     148
    //                 ],
    //                 "novel": [
    //                     147
    //                 ],
    //                 "aim": [
    //                     150
    //                 ],
    //                 "harness": [
    //                     154
    //                 ],
    //                 "key": [
    //                     156
    //                 ],
    //                 "spike-based": [
    //                     159
    //                 ],
    //                 "hardware.": [
    //                     161
    //                 ],
    //                 "While": [
    //                     162
    //                 ],
    //                 "conventional": [
    //                     163,
    //                     202
    //                 ],
    //                 "feedforward": [
    //                     164
    //                 ],
    //                 "show": [
    //                     168
    //                 ],
    //                 "modest": [
    //                     169
    //                 ],
    //                 "if": [
    //                     170
    //                 ],
    //                 "any": [
    //                     171
    //                 ],
    //                 "benefit": [
    //                     172
    //                 ],
    //                 "on": [
    //                     173
    //                 ],
    //                 "brain-inspired": [
    //                     176
    //                 ],
    //                 "using": [
    //                     178
    //                 ],
    //                 "recurrence,": [
    //                     179
    //                 ],
    //                 "precise": [
    //                     180
    //                 ],
    //                 "spike-timing": [
    //                     181
    //                 ],
    //                 "relationships,": [
    //                     182
    //                 ],
    //                 "synaptic": [
    //                     183
    //                 ],
    //                 "plasticity,": [
    //                     184
    //                 ],
    //                 "stochasticity,": [
    //                     185
    //                 ],
    //                 "sparsity": [
    //                     187
    //                 ],
    //                 "perform": [
    //                     188
    //                 ],
    //                 "certain": [
    //                     189
    //                 ],
    //                 "computation": [
    //                     190
    //                 ],
    //                 "orders": [
    //                     192
    //                 ],
    //                 "magnitude": [
    //                     194
    //                 ],
    //                 "lower": [
    //                     195
    //                 ],
    //                 "latency": [
    //                     196
    //                 ],
    //                 "energy": [
    //                     198
    //                 ],
    //                 "approaches.": [
    //                     203
    //                 ],
    //                 "These": [
    //                     204
    //                 ],
    //                 "compelling": [
    //                     205
    //                 ],
    //                 "solve": [
    //                     208
    //                 ],
    //                 "diverse": [
    //                     210
    //                 ],
    //                 "problems": [
    //                     213
    //                 ],
    //                 "representative": [
    //                     214
    //                 ],
    //                 "brain-like": [
    //                     216
    //                 ],
    //                 "computation,": [
    //                     217
    //                 ],
    //                 "such": [
    //                     218
    //                 ],
    //                 "as": [
    //                     219
    //                 ],
    //                 "event-based": [
    //                     220
    //                 ],
    //                 "data": [
    //                     221
    //                 ],
    //                 "processing,": [
    //                     222
    //                 ],
    //                 "adaptive": [
    //                     223
    //                 ],
    //                 "control,": [
    //                     224
    //                 ],
    //                 "constrained": [
    //                     225
    //                 ],
    //                 "optimization,": [
    //                     226
    //                 ],
    //                 "sparse": [
    //                     227
    //                 ],
    //                 "feature": [
    //                     228
    //                 ],
    //                 "regression,": [
    //                     229
    //                 ],
    //                 "graph": [
    //                     231
    //                 ],
    //                 "search.": [
    //                     232
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W3139657805",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 4
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 106
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 130
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 89
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 30
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 1
    //                 }
    //             ],
    //             "updated_date": "2025-02-25T11:25:55.200281",
    //             "created_date": "2021-04-13"
    //         },
    //         {
    //             "id": "https://openalex.org/W2161338791",
    //             "doi": "https://doi.org/10.1109/robot.2004.1307183",
    //             "title": "RatSLAM: a hippocampal model for simultaneous localization and mapping",
    //             "display_name": "RatSLAM: a hippocampal model for simultaneous localization and mapping",
    //             "publication_year": 2004,
    //             "publication_date": "2004-01-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2161338791",
    //                 "doi": "https://doi.org/10.1109/robot.2004.1307183",
    //                 "mag": "2161338791"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1109/robot.2004.1307183",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "proceedings-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5078340555",
    //                         "display_name": "Michael Milford",
    //                         "orcid": "https://orcid.org/0000-0002-5162-1793"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I160993911",
    //                             "display_name": "Queensland University of Technology",
    //                             "ror": "https://ror.org/03pnv4752",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I160993911"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I165143802",
    //                             "display_name": "University of Queensland",
    //                             "ror": "https://ror.org/00rqy9422",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "AU"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "M.J. Milford",
    //                     "raw_affiliation_strings": [
    //                         "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I160993911",
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "middle",
    //                     "author": {
    //                         "id": "https://openalex.org/A5027468544",
    //                         "display_name": "Gordon Wyeth",
    //                         "orcid": "https://orcid.org/0000-0002-4996-3612"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I160993911",
    //                             "display_name": "Queensland University of Technology",
    //                             "ror": "https://ror.org/03pnv4752",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I160993911"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I165143802",
    //                             "display_name": "University of Queensland",
    //                             "ror": "https://ror.org/00rqy9422",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "AU"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "G.F. Wyeth",
    //                     "raw_affiliation_strings": [
    //                         "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I160993911",
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5024896321",
    //                         "display_name": "David Prasser",
    //                         "orcid": null
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I160993911",
    //                             "display_name": "Queensland University of Technology",
    //                             "ror": "https://ror.org/03pnv4752",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I160993911"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I165143802",
    //                             "display_name": "University of Queensland",
    //                             "ror": "https://ror.org/00rqy9422",
    //                             "country_code": "AU",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "AU"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "D. Prasser",
    //                     "raw_affiliation_strings": [
    //                         "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "School of Information Technology & Electrical Engineering, University of Queensland, Brisbane, Australia",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I160993911",
    //                                 "https://openalex.org/I165143802"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 7.072,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 354,
    //             "citation_normalized_percentile": {
    //                 "value": 0.993473,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10191",
    //                 "display_name": "Robotics and Sensor-Based Localization",
    //                 "score": 1.0,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2202",
    //                     "display_name": "Aerospace Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10191",
    //                     "display_name": "Robotics and Sensor-Based Localization",
    //                     "score": 1.0,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2202",
    //                         "display_name": "Aerospace Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10627",
    //                     "display_name": "Advanced Image and Video Retrieval Techniques",
    //                     "score": 0.9987,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10586",
    //                     "display_name": "Robotic Path Planning Algorithms",
    //                     "score": 0.9986,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/landmark",
    //                     "display_name": "Landmark",
    //                     "score": 0.9131287
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/representation",
    //                     "display_name": "Representation",
    //                     "score": 0.61318815
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.52988327
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C2780297707",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4895393",
    //                     "display_name": "Landmark",
    //                     "level": 2,
    //                     "score": 0.9131287
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.7315812
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86369673",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1203659",
    //                     "display_name": "Simultaneous localization and mapping",
    //                     "level": 4,
    //                     "score": 0.73131615
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776359362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2145286",
    //                     "display_name": "Representation (politics)",
    //                     "level": 3,
    //                     "score": 0.61318815
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C148762608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q3748185",
    //                     "display_name": "Hippocampal formation",
    //                     "level": 2,
    //                     "score": 0.5578453
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.52988327
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.52601063
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C31972630",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q844240",
    //                     "display_name": "Computer vision",
    //                     "level": 1,
    //                     "score": 0.5114981
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2777735758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q817765",
    //                     "display_name": "Path (computing)",
    //                     "level": 2,
    //                     "score": 0.45787662
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C19966478",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4810574",
    //                     "display_name": "Mobile robot",
    //                     "level": 3,
    //                     "score": 0.43750313
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.42554137
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.11704123
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C31258907",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1301371",
    //                     "display_name": "Computer network",
    //                     "level": 1,
    //                     "score": 0.064570546
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C94625758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7163",
    //                     "display_name": "Politics",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199539241",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7748",
    //                     "display_name": "Law",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86803240",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q420",
    //                     "display_name": "Biology",
    //                     "level": 0,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1109/robot.2004.1307183",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 13,
    //             "referenced_works": [
    //                 "https://openalex.org/W11600868",
    //                 "https://openalex.org/W1497013894",
    //                 "https://openalex.org/W1579593387",
    //                 "https://openalex.org/W2018502805",
    //                 "https://openalex.org/W2067145351",
    //                 "https://openalex.org/W2107677129",
    //                 "https://openalex.org/W2111175068",
    //                 "https://openalex.org/W2131701044",
    //                 "https://openalex.org/W4239191757",
    //                 "https://openalex.org/W4241021473",
    //                 "https://openalex.org/W4251860677",
    //                 "https://openalex.org/W4252767703",
    //                 "https://openalex.org/W4285719527"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W2883168056",
    //                 "https://openalex.org/W2165262265",
    //                 "https://openalex.org/W2142338363",
    //                 "https://openalex.org/W2127121415",
    //                 "https://openalex.org/W2093444121",
    //                 "https://openalex.org/W2057559274",
    //                 "https://openalex.org/W2056853153",
    //                 "https://openalex.org/W2005087563",
    //                 "https://openalex.org/W1750372561",
    //                 "https://openalex.org/W1581933381"
    //             ],
    //             "abstract_inverted_index": {
    //                 "The": [
    //                     0,
    //                     26
    //                 ],
    //                 "work": [
    //                     1
    //                 ],
    //                 "presents": [
    //                     2
    //                 ],
    //                 "a": [
    //                     3,
    //                     45,
    //                     54,
    //                     65,
    //                     70,
    //                     83
    //                 ],
    //                 "new": [
    //                     4
    //                 ],
    //                 "approach": [
    //                     5
    //                 ],
    //                 "to": [
    //                     6,
    //                     35,
    //                     74,
    //                     81
    //                 ],
    //                 "the": [
    //                     7,
    //                     22,
    //                     42,
    //                     87
    //                 ],
    //                 "problem": [
    //                     8
    //                 ],
    //                 "of": [
    //                     9,
    //                     21,
    //                     24,
    //                     41,
    //                     44,
    //                     53,
    //                     86
    //                 ],
    //                 "simultaneous": [
    //                     10
    //                 ],
    //                 "localization": [
    //                     11
    //                 ],
    //                 "and": [
    //                     12,
    //                     38,
    //                     100,
    //                     105
    //                 ],
    //                 "mapping": [
    //                     13
    //                 ],
    //                 "-": [
    //                     14,
    //                     16
    //                 ],
    //                 "SLAM": [
    //                     15,
    //                     47,
    //                     60
    //                 ],
    //                 "inspired": [
    //                     17
    //                 ],
    //                 "by": [
    //                     18
    //                 ],
    //                 "computational": [
    //                     19
    //                 ],
    //                 "models": [
    //                     20
    //                 ],
    //                 "hippocampus": [
    //                     23,
    //                     28
    //                 ],
    //                 "rodents.": [
    //                     25
    //                 ],
    //                 "rodent": [
    //                     27
    //                 ],
    //                 "has": [
    //                     29
    //                 ],
    //                 "been": [
    //                     30
    //                 ],
    //                 "extensively": [
    //                     31
    //                 ],
    //                 "studied": [
    //                     32
    //                 ],
    //                 "with": [
    //                     33,
    //                     78,
    //                     96
    //                 ],
    //                 "respect": [
    //                     34
    //                 ],
    //                 "navigation": [
    //                     36
    //                 ],
    //                 "tasks,": [
    //                     37
    //                 ],
    //                 "displays": [
    //                     39
    //                 ],
    //                 "many": [
    //                     40
    //                 ],
    //                 "properties": [
    //                     43
    //                 ],
    //                 "desirable": [
    //                     46
    //                 ],
    //                 "solution.": [
    //                     48
    //                 ],
    //                 "RatSLAM": [
    //                     49,
    //                     93
    //                 ],
    //                 "is": [
    //                     50
    //                 ],
    //                 "an": [
    //                     51
    //                 ],
    //                 "implementation": [
    //                     52
    //                 ],
    //                 "hippocampal": [
    //                     55
    //                 ],
    //                 "model": [
    //                     56
    //                 ],
    //                 "that": [
    //                     57,
    //                     92
    //                 ],
    //                 "can": [
    //                     58,
    //                     94
    //                 ],
    //                 "perform": [
    //                     59
    //                 ],
    //                 "in": [
    //                     61
    //                 ],
    //                 "real": [
    //                     62,
    //                     66
    //                 ],
    //                 "time": [
    //                     63
    //                 ],
    //                 "on": [
    //                     64
    //                 ],
    //                 "robot.": [
    //                     67
    //                 ],
    //                 "It": [
    //                     68
    //                 ],
    //                 "uses": [
    //                     69
    //                 ],
    //                 "competitive": [
    //                     71
    //                 ],
    //                 "attractor": [
    //                     72
    //                 ],
    //                 "network": [
    //                     73
    //                 ],
    //                 "integrate": [
    //                     75
    //                 ],
    //                 "odometric": [
    //                     76
    //                 ],
    //                 "information": [
    //                     77,
    //                     99
    //                 ],
    //                 "landmark": [
    //                     79,
    //                     98
    //                 ],
    //                 "sensing": [
    //                     80
    //                 ],
    //                 "form": [
    //                     82
    //                 ],
    //                 "consistent": [
    //                     84
    //                 ],
    //                 "representation": [
    //                     85
    //                 ],
    //                 "environment.": [
    //                     88
    //                 ],
    //                 "Experimental": [
    //                     89
    //                 ],
    //                 "results": [
    //                     90
    //                 ],
    //                 "show": [
    //                     91
    //                 ],
    //                 "operate": [
    //                     95
    //                 ],
    //                 "ambiguous": [
    //                     97
    //                 ],
    //                 "recover": [
    //                     101
    //                 ],
    //                 "from": [
    //                     102
    //                 ],
    //                 "both": [
    //                     103
    //                 ],
    //                 "minor": [
    //                     104
    //                 ],
    //                 "major": [
    //                     106
    //                 ],
    //                 "path": [
    //                     107
    //                 ],
    //                 "integration": [
    //                     108
    //                 ],
    //                 "errors.": [
    //                     109
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2161338791",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 16
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 36
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 36
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 35
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 27
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 25
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 21
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 26
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 13
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 12
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 9
    //                 }
    //             ],
    //             "updated_date": "2025-02-23T01:59:57.965481",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W1999399477",
    //             "doi": "https://doi.org/10.1109/iros.2012.6385590",
    //             "title": "Switchable constraints for robust pose graph SLAM",
    //             "display_name": "Switchable constraints for robust pose graph SLAM",
    //             "publication_year": 2012,
    //             "publication_date": "2012-10-01",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W1999399477",
    //                 "doi": "https://doi.org/10.1109/iros.2012.6385590",
    //                 "mag": "1999399477"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1109/iros.2012.6385590",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S4363608614",
    //                     "display_name": "2011 IEEE/RSJ International Conference on Intelligent Robots and Systems",
    //                     "issn_l": null,
    //                     "issn": null,
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": false,
    //                     "is_core": false,
    //                     "host_organization": null,
    //                     "host_organization_name": null,
    //                     "host_organization_lineage": [],
    //                     "host_organization_lineage_names": [],
    //                     "type": "conference"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "article",
    //             "type_crossref": "proceedings-article",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5034957065",
    //                         "display_name": "Niko S\u00fcnderhauf",
    //                         "orcid": "https://orcid.org/0000-0001-5286-3789"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I2610724",
    //                             "display_name": "Chemnitz University of Technology",
    //                             "ror": "https://ror.org/00a208s56",
    //                             "country_code": "DE",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I2610724"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "DE"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Niko Sunderhauf",
    //                     "raw_affiliation_strings": [
    //                         "Department of Electrical Engineering and Information Technology, Chemnitz University of Technology, 09126, Germany"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Department of Electrical Engineering and Information Technology, Chemnitz University of Technology, 09126, Germany",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I2610724"
    //                             ]
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     "author_position": "last",
    //                     "author": {
    //                         "id": "https://openalex.org/A5026465250",
    //                         "display_name": "Peter Protzel",
    //                         "orcid": "https://orcid.org/0000-0002-3870-7429"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I2610724",
    //                             "display_name": "Chemnitz University of Technology",
    //                             "ror": "https://ror.org/00a208s56",
    //                             "country_code": "DE",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I2610724"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "DE"
    //                     ],
    //                     "is_corresponding": false,
    //                     "raw_author_name": "Peter Protzel",
    //                     "raw_affiliation_strings": [
    //                         "Department of Electrical Engineering and Information Technology, Chemnitz University of Technology, 09126, Germany"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Department of Electrical Engineering and Information Technology, Chemnitz University of Technology, 09126, Germany",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I2610724"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 1,
    //             "institutions_distinct_count": 1,
    //             "corresponding_author_ids": [],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 27.791,
    //             "has_fulltext": true,
    //             "fulltext_origin": "ngrams",
    //             "cited_by_count": 308,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999808,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10191",
    //                 "display_name": "Robotics and Sensor-Based Localization",
    //                 "score": 0.9999,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2202",
    //                     "display_name": "Aerospace Engineering"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/22",
    //                     "display_name": "Engineering"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10191",
    //                     "display_name": "Robotics and Sensor-Based Localization",
    //                     "score": 0.9999,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2202",
    //                         "display_name": "Aerospace Engineering"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/22",
    //                         "display_name": "Engineering"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10627",
    //                     "display_name": "Advanced Image and Video Retrieval Techniques",
    //                     "score": 0.9933,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10586",
    //                     "display_name": "Robotic Path Planning Algorithms",
    //                     "score": 0.9906,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1707",
    //                         "display_name": "Computer Vision and Pattern Recognition"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/robustness",
    //                     "display_name": "Robustness",
    //                     "score": 0.78146553
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/factor-graph",
    //                     "display_name": "Factor graph",
    //                     "score": 0.6771038
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/data-association",
    //                     "display_name": "Data association",
    //                     "score": 0.5281565
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/representation",
    //                     "display_name": "Representation",
    //                     "score": 0.49011502
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/constrained-optimization-problem",
    //                     "display_name": "Constrained optimization problem",
    //                     "score": 0.47040373
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/robust-statistics",
    //                     "display_name": "Robust Statistics",
    //                     "score": 0.42501992
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C63479239",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7353546",
    //                     "display_name": "Robustness (evolution)",
    //                     "level": 3,
    //                     "score": 0.78146553
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C86369673",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1203659",
    //                     "display_name": "Simultaneous localization and mapping",
    //                     "level": 4,
    //                     "score": 0.77270544
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C79337645",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q779824",
    //                     "display_name": "Outlier",
    //                     "level": 2,
    //                     "score": 0.7212164
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C159246509",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5428725",
    //                     "display_name": "Factor graph",
    //                     "level": 3,
    //                     "score": 0.6771038
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.61572886
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2983325608",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17084606",
    //                     "display_name": "Data association",
    //                     "level": 3,
    //                     "score": 0.5281565
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C132525143",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q141488",
    //                     "display_name": "Graph",
    //                     "level": 2,
    //                     "score": 0.4941621
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2776359362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2145286",
    //                     "display_name": "Representation (politics)",
    //                     "level": 3,
    //                     "score": 0.49011502
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.4735146
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2989514635",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5164377",
    //                     "display_name": "Constrained optimization problem",
    //                     "level": 3,
    //                     "score": 0.47040373
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C67226441",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1665389",
    //                     "display_name": "Robust statistics",
    //                     "level": 3,
    //                     "score": 0.42501992
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C137836250",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q984063",
    //                     "display_name": "Optimization problem",
    //                     "level": 2,
    //                     "score": 0.42493647
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C124101348",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q172491",
    //                     "display_name": "Data mining",
    //                     "level": 1,
    //                     "score": 0.33201277
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C11413529",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q8366",
    //                     "display_name": "Algorithm",
    //                     "level": 1,
    //                     "score": 0.31220207
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C90509273",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11012",
    //                     "display_name": "Robot",
    //                     "level": 2,
    //                     "score": 0.19192183
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C80444323",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2878974",
    //                     "display_name": "Theoretical computer science",
    //                     "level": 1,
    //                     "score": 0.15877184
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C19966478",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4810574",
    //                     "display_name": "Mobile robot",
    //                     "level": 3,
    //                     "score": 0.13763204
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55493867",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7094",
    //                     "display_name": "Biochemistry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C185592680",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2329",
    //                     "display_name": "Chemistry",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C57273362",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q576722",
    //                     "display_name": "Decoding methods",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C94625758",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7163",
    //                     "display_name": "Politics",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C49937458",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2599292",
    //                     "display_name": "Probabilistic logic",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C17744445",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q36442",
    //                     "display_name": "Political science",
    //                     "level": 0,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199539241",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7748",
    //                     "display_name": "Law",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C104317684",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7187",
    //                     "display_name": "Gene",
    //                     "level": 2,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1109/iros.2012.6385590",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4363608614",
    //                         "display_name": "2011 IEEE/RSJ International Conference on Intelligent Robots and Systems",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": null,
    //                         "host_organization_name": null,
    //                         "host_organization_lineage": [],
    //                         "host_organization_lineage_names": [],
    //                         "type": "conference"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 15,
    //             "referenced_works": [
    //                 "https://openalex.org/W1919421040",
    //                 "https://openalex.org/W1990884907",
    //                 "https://openalex.org/W1991172434",
    //                 "https://openalex.org/W1997645979",
    //                 "https://openalex.org/W2000873173",
    //                 "https://openalex.org/W2049479307",
    //                 "https://openalex.org/W2065742895",
    //                 "https://openalex.org/W2137052305",
    //                 "https://openalex.org/W2137813581",
    //                 "https://openalex.org/W2150252608",
    //                 "https://openalex.org/W2153054365",
    //                 "https://openalex.org/W2154459632",
    //                 "https://openalex.org/W2296360731",
    //                 "https://openalex.org/W4214824230",
    //                 "https://openalex.org/W4243216532"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W73199774",
    //                 "https://openalex.org/W4386597354",
    //                 "https://openalex.org/W4232379160",
    //                 "https://openalex.org/W415204663",
    //                 "https://openalex.org/W3176112670",
    //                 "https://openalex.org/W2921707373",
    //                 "https://openalex.org/W2170905369",
    //                 "https://openalex.org/W2156708579",
    //                 "https://openalex.org/W2153540526",
    //                 "https://openalex.org/W1999399477"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Current": [
    //                     0
    //                 ],
    //                 "SLAM": [
    //                     1,
    //                     36,
    //                     111
    //                 ],
    //                 "back-ends": [
    //                     2
    //                 ],
    //                 "are": [
    //                     3,
    //                     11
    //                 ],
    //                 "based": [
    //                     4
    //                 ],
    //                 "on": [
    //                     5,
    //                     100
    //                 ],
    //                 "least": [
    //                     6
    //                 ],
    //                 "squares": [
    //                     7
    //                 ],
    //                 "optimization": [
    //                     8,
    //                     77
    //                 ],
    //                 "and": [
    //                     9,
    //                     20,
    //                     29,
    //                     55,
    //                     113,
    //                     121
    //                 ],
    //                 "thus": [
    //                     10
    //                 ],
    //                 "not": [
    //                     12
    //                 ],
    //                 "robust": [
    //                     13,
    //                     32
    //                 ],
    //                 "against": [
    //                     14
    //                 ],
    //                 "outliers": [
    //                     15,
    //                     57
    //                 ],
    //                 "like": [
    //                     16
    //                 ],
    //                 "data": [
    //                     17,
    //                     46
    //                 ],
    //                 "association": [
    //                     18,
    //                     47
    //                 ],
    //                 "errors": [
    //                     19
    //                 ],
    //                 "false": [
    //                     21,
    //                     95
    //                 ],
    //                 "positive": [
    //                     22,
    //                     96
    //                 ],
    //                 "loop": [
    //                     23,
    //                     97
    //                 ],
    //                 "closure": [
    //                     24,
    //                     98
    //                 ],
    //                 "detections.": [
    //                     25
    //                 ],
    //                 "Our": [
    //                     26
    //                 ],
    //                 "paper": [
    //                     27
    //                 ],
    //                 "presents": [
    //                     28
    //                 ],
    //                 "evaluates": [
    //                     30
    //                 ],
    //                 "a": [
    //                     31,
    //                     115
    //                 ],
    //                 "back-end": [
    //                     33,
    //                     123
    //                 ],
    //                 "formulation": [
    //                     34
    //                 ],
    //                 "for": [
    //                     35
    //                 ],
    //                 "using": [
    //                     37
    //                 ],
    //                 "switchable": [
    //                     38
    //                 ],
    //                 "constraints.": [
    //                     39
    //                 ],
    //                 "Instead": [
    //                     40
    //                 ],
    //                 "of": [
    //                     41,
    //                     68,
    //                     79,
    //                     108
    //                 ],
    //                 "proposing": [
    //                     42
    //                 ],
    //                 "yet": [
    //                     43
    //                 ],
    //                 "another": [
    //                     44
    //                 ],
    //                 "appearance-based": [
    //                     45
    //                 ],
    //                 "technique,": [
    //                     48
    //                 ],
    //                 "our": [
    //                     49
    //                 ],
    //                 "system": [
    //                     50,
    //                     112
    //                 ],
    //                 "is": [
    //                     51,
    //                     62
    //                 ],
    //                 "able": [
    //                     52
    //                 ],
    //                 "to": [
    //                     53,
    //                     75,
    //                     93
    //                 ],
    //                 "recognize": [
    //                     54
    //                 ],
    //                 "reject": [
    //                     56
    //                 ],
    //                 "during": [
    //                     58
    //                 ],
    //                 "the": [
    //                     59,
    //                     66,
    //                     69,
    //                     76,
    //                     87,
    //                     106,
    //                     109,
    //                     118,
    //                     122
    //                 ],
    //                 "optimization.": [
    //                     60
    //                 ],
    //                 "This": [
    //                     61,
    //                     103
    //                 ],
    //                 "achieved": [
    //                     63
    //                 ],
    //                 "by": [
    //                     64
    //                 ],
    //                 "making": [
    //                     65
    //                 ],
    //                 "topology": [
    //                     67
    //                 ],
    //                 "underlying": [
    //                     70
    //                 ],
    //                 "factor": [
    //                     71
    //                 ],
    //                 "graph": [
    //                     72
    //                 ],
    //                 "representation": [
    //                     73
    //                 ],
    //                 "subject": [
    //                     74
    //                 ],
    //                 "instead": [
    //                     78
    //                 ],
    //                 "keeping": [
    //                     80
    //                 ],
    //                 "it": [
    //                     81
    //                 ],
    //                 "fixed.": [
    //                     82
    //                 ],
    //                 "The": [
    //                     83
    //                 ],
    //                 "evaluation": [
    //                     84
    //                 ],
    //                 "shows": [
    //                     85
    //                 ],
    //                 "that": [
    //                     86
    //                 ],
    //                 "approach": [
    //                     88
    //                 ],
    //                 "can": [
    //                     89
    //                 ],
    //                 "deal": [
    //                     90
    //                 ],
    //                 "with": [
    //                     91
    //                 ],
    //                 "up": [
    //                     92
    //                 ],
    //                 "1000": [
    //                     94
    //                 ],
    //                 "constraints": [
    //                     99
    //                 ],
    //                 "various": [
    //                     101
    //                 ],
    //                 "datasets.": [
    //                     102
    //                 ],
    //                 "largely": [
    //                     104
    //                 ],
    //                 "increases": [
    //                     105
    //                 ],
    //                 "robustness": [
    //                     107
    //                 ],
    //                 "overall": [
    //                     110
    //                 ],
    //                 "closes": [
    //                     114
    //                 ],
    //                 "gap": [
    //                     116
    //                 ],
    //                 "between": [
    //                     117
    //                 ],
    //                 "sensor-driven": [
    //                     119
    //                 ],
    //                 "front-end": [
    //                     120
    //                 ],
    //                 "optimizers.": [
    //                     124
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W1999399477",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2025,
    //                     "cited_by_count": 2
    //                 },
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 37
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 30
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 34
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 27
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 29
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 27
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 27
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 22
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 23
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 21
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 13
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 1
    //                 }
    //             ],
    //             "updated_date": "2025-02-17T02:39:27.803112",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W2045353501",
    //             "doi": "https://doi.org/10.1002/hipo.20518",
    //             "title": "Grid cells and theta as oscillatory interference: Theory and predictions",
    //             "display_name": "Grid cells and theta as oscillatory interference: Theory and predictions",
    //             "publication_year": 2008,
    //             "publication_date": "2008-11-19",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W2045353501",
    //                 "doi": "https://doi.org/10.1002/hipo.20518",
    //                 "mag": "2045353501",
    //                 "pmid": "https://pubmed.ncbi.nlm.nih.gov/19021256",
    //                 "pmcid": "https://www.ncbi.nlm.nih.gov/pmc/articles/3196519"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1002/hipo.20518",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S55111660",
    //                     "display_name": "Hippocampus",
    //                     "issn_l": "1050-9631",
    //                     "issn": [
    //                         "1050-9631",
    //                         "1098-1063"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320595",
    //                     "host_organization_name": "Wiley",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320595"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Wiley"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "type": "article",
    //             "type_crossref": "journal-article",
    //             "indexed_in": [
    //                 "crossref",
    //                 "pubmed"
    //             ],
    //             "open_access": {
    //                 "is_oa": true,
    //                 "oa_status": "bronze",
    //                 "oa_url": "https://doi.org/10.1002/hipo.20518",
    //                 "any_repository_has_fulltext": true
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5031109148",
    //                         "display_name": "Neil Burgess",
    //                         "orcid": "https://orcid.org/0000-0003-0646-6584"
    //                     },
    //                     "institutions": [
    //                         {
    //                             "id": "https://openalex.org/I4210138738",
    //                             "display_name": "Institute of Cognitive Neuroscience and Psychology",
    //                             "ror": "https://ror.org/04q42nz13",
    //                             "country_code": "HU",
    //                             "type": "facility",
    //                             "lineage": [
    //                                 "https://openalex.org/I4210138738",
    //                                 "https://openalex.org/I4387152226",
    //                                 "https://openalex.org/I80251312"
    //                             ]
    //                         },
    //                         {
    //                             "id": "https://openalex.org/I45129253",
    //                             "display_name": "University College London",
    //                             "ror": "https://ror.org/02jx3x895",
    //                             "country_code": "GB",
    //                             "type": "funder",
    //                             "lineage": [
    //                                 "https://openalex.org/I124357947",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ],
    //                     "countries": [
    //                         "GB",
    //                         "HU"
    //                     ],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Neil Burgess",
    //                     "raw_affiliation_strings": [
    //                         "Institute of Cognitive Neuroscience and Institute of Neurology, University College London"
    //                     ],
    //                     "affiliations": [
    //                         {
    //                             "raw_affiliation_string": "Institute of Cognitive Neuroscience and Institute of Neurology, University College London",
    //                             "institution_ids": [
    //                                 "https://openalex.org/I4210138738",
    //                                 "https://openalex.org/I45129253"
    //                             ]
    //                         }
    //                     ]
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 2,
    //             "institutions_distinct_count": 2,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5031109148"
    //             ],
    //             "corresponding_institution_ids": [
    //                 "https://openalex.org/I4210138738",
    //                 "https://openalex.org/I45129253"
    //             ],
    //             "apc_list": {
    //                 "value": 4330,
    //                 "currency": "USD",
    //                 "value_usd": 4330
    //             },
    //             "apc_paid": null,
    //             "fwci": 6.806,
    //             "has_fulltext": false,
    //             "cited_by_count": 290,
    //             "citation_normalized_percentile": {
    //                 "value": 0.999909,
    //                 "is_in_top_1_percent": true,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": "18",
    //                 "issue": "12",
    //                 "first_page": "1157",
    //                 "last_page": "1174"
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T10448",
    //                 "display_name": "Memory and Neural Mechanisms",
    //                 "score": 0.9998,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/2805",
    //                     "display_name": "Cognitive Neuroscience"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/28",
    //                     "display_name": "Neuroscience"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/1",
    //                     "display_name": "Life Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T10448",
    //                     "display_name": "Memory and Neural Mechanisms",
    //                     "score": 0.9998,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10077",
    //                     "display_name": "Neuroscience and Neuropharmacology Research",
    //                     "score": 0.9996,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2804",
    //                         "display_name": "Cellular and Molecular Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10581",
    //                     "display_name": "Neural dynamics and brain function",
    //                     "score": 0.9994,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/2805",
    //                         "display_name": "Cognitive Neuroscience"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/28",
    //                         "display_name": "Neuroscience"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/1",
    //                         "display_name": "Life Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/path-integration",
    //                     "display_name": "Path integration",
    //                     "score": 0.6653398
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/oscillation",
    //                     "display_name": "Oscillation (cell signaling)",
    //                     "score": 0.53550434
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/place-cell",
    //                     "display_name": "Place cell",
    //                     "score": 0.42114305
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C96522737",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q17148345",
    //                     "display_name": "Path integration",
    //                     "level": 2,
    //                     "score": 0.6653398
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C5291336",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q852341",
    //                     "display_name": "Voltage-controlled oscillator",
    //                     "level": 3,
    //                     "score": 0.6422346
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2778439541",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7106412",
    //                     "display_name": "Oscillation (cell signaling)",
    //                     "level": 2,
    //                     "score": 0.53550434
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781369091",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2303730",
    //                     "display_name": "Place cell",
    //                     "level": 3,
    //                     "score": 0.42114305
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121332964",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q413",
    //                     "display_name": "Physics",
    //                     "level": 0,
    //                     "score": 0.41292843
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C47446073",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q5165890",
    //                     "display_name": "Control theory (sociology)",
    //                     "level": 3,
    //                     "score": 0.36018485
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.35471922
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.34140903
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C165801399",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q25428",
    //                     "display_name": "Voltage",
    //                     "level": 2,
    //                     "score": 0.26469475
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.20309761
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2781161787",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q48360",
    //                     "display_name": "Hippocampus",
    //                     "level": 2,
    //                     "score": 0.17443502
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C185592680",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2329",
    //                     "display_name": "Chemistry",
    //                     "level": 0,
    //                     "score": 0.14956135
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.104682684
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C55493867",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7094",
    //                     "display_name": "Biochemistry",
    //                     "level": 1,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C2775924081",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q55608371",
    //                     "display_name": "Control (management)",
    //                     "level": 2,
    //                     "score": 0.0
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C62520636",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q944",
    //                     "display_name": "Quantum mechanics",
    //                     "level": 1,
    //                     "score": 0.0
    //                 }
    //             ],
    //             "mesh": [
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D001683",
    //                     "descriptor_name": "Biological Clocks",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009415",
    //                     "descriptor_name": "Nerve Net",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D013826",
    //                     "descriptor_name": "Theta Rhythm",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": true
    //                 },
    //                 {
    //                     "descriptor_ui": "D000200",
    //                     "descriptor_name": "Action Potentials",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D000818",
    //                     "descriptor_name": "Animals",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D001683",
    //                     "descriptor_name": "Biological Clocks",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D003198",
    //                     "descriptor_name": "Computer Simulation",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D018728",
    //                     "descriptor_name": "Entorhinal Cortex",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009415",
    //                     "descriptor_name": "Nerve Net",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009474",
    //                     "descriptor_name": "Neurons",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D013028",
    //                     "descriptor_name": "Space Perception",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D013028",
    //                     "descriptor_name": "Space Perception",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009435",
    //                     "descriptor_name": "Synaptic Transmission",
    //                     "qualifier_ui": "Q000502",
    //                     "qualifier_name": "physiology",
    //                     "is_major_topic": false
    //                 },
    //                 {
    //                     "descriptor_ui": "D009435",
    //                     "descriptor_name": "Synaptic Transmission",
    //                     "qualifier_ui": "",
    //                     "qualifier_name": null,
    //                     "is_major_topic": false
    //                 }
    //             ],
    //             "locations_count": 4,
    //             "locations": [
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://doi.org/10.1002/hipo.20518",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S55111660",
    //                         "display_name": "Hippocampus",
    //                         "issn_l": "1050-9631",
    //                         "issn": [
    //                             "1050-9631",
    //                             "1098-1063"
    //                         ],
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": true,
    //                         "is_core": true,
    //                         "host_organization": "https://openalex.org/P4310320595",
    //                         "host_organization_name": "Wiley",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/P4310320595"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "Wiley"
    //                         ],
    //                         "type": "journal"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "publishedVersion",
    //                     "is_accepted": true,
    //                     "is_published": true
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://europepmc.org/articles/pmc3196519",
    //                     "pdf_url": "https://europepmc.org/articles/pmc3196519?pdf=render",
    //                     "source": {
    //                         "id": "https://openalex.org/S4306400806",
    //                         "display_name": "Europe PMC (PubMed Central)",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1303153112",
    //                         "host_organization_name": "European Bioinformatics Institute",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1303153112"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "European Bioinformatics Institute"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": true,
    //                     "landing_page_url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3196519",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S2764455111",
    //                         "display_name": "PubMed Central",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": true,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": "acceptedVersion",
    //                     "is_accepted": true,
    //                     "is_published": false
    //                 },
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://pubmed.ncbi.nlm.nih.gov/19021256",
    //                     "pdf_url": null,
    //                     "source": {
    //                         "id": "https://openalex.org/S4306525036",
    //                         "display_name": "PubMed",
    //                         "issn_l": null,
    //                         "issn": null,
    //                         "is_oa": false,
    //                         "is_in_doaj": false,
    //                         "is_indexed_in_scopus": false,
    //                         "is_core": false,
    //                         "host_organization": "https://openalex.org/I1299303238",
    //                         "host_organization_name": "National Institutes of Health",
    //                         "host_organization_lineage": [
    //                             "https://openalex.org/I1299303238"
    //                         ],
    //                         "host_organization_lineage_names": [
    //                             "National Institutes of Health"
    //                         ],
    //                         "type": "repository"
    //                     },
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": {
    //                 "is_oa": true,
    //                 "landing_page_url": "https://doi.org/10.1002/hipo.20518",
    //                 "pdf_url": null,
    //                 "source": {
    //                     "id": "https://openalex.org/S55111660",
    //                     "display_name": "Hippocampus",
    //                     "issn_l": "1050-9631",
    //                     "issn": [
    //                         "1050-9631",
    //                         "1098-1063"
    //                     ],
    //                     "is_oa": false,
    //                     "is_in_doaj": false,
    //                     "is_indexed_in_scopus": true,
    //                     "is_core": true,
    //                     "host_organization": "https://openalex.org/P4310320595",
    //                     "host_organization_name": "Wiley",
    //                     "host_organization_lineage": [
    //                         "https://openalex.org/P4310320595"
    //                     ],
    //                     "host_organization_lineage_names": [
    //                         "Wiley"
    //                     ],
    //                     "type": "journal"
    //                 },
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": "publishedVersion",
    //                 "is_accepted": true,
    //                 "is_published": true
    //             },
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.49,
    //                     "display_name": "Life on land",
    //                     "id": "https://metadata.un.org/sdg/15"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 88,
    //             "referenced_works": [
    //                 "https://openalex.org/W1535656004",
    //                 "https://openalex.org/W1540136915",
    //                 "https://openalex.org/W1568903867",
    //                 "https://openalex.org/W1674944617",
    //                 "https://openalex.org/W1965476659",
    //                 "https://openalex.org/W1965585960",
    //                 "https://openalex.org/W1968520062",
    //                 "https://openalex.org/W1968533788",
    //                 "https://openalex.org/W1969255675",
    //                 "https://openalex.org/W1970792572",
    //                 "https://openalex.org/W1974719406",
    //                 "https://openalex.org/W1977986030",
    //                 "https://openalex.org/W1978287828",
    //                 "https://openalex.org/W1987560912",
    //                 "https://openalex.org/W1988694078",
    //                 "https://openalex.org/W1988751593",
    //                 "https://openalex.org/W1991194182",
    //                 "https://openalex.org/W1998581719",
    //                 "https://openalex.org/W1999542375",
    //                 "https://openalex.org/W2006952639",
    //                 "https://openalex.org/W2008240154",
    //                 "https://openalex.org/W2008936540",
    //                 "https://openalex.org/W2022246269",
    //                 "https://openalex.org/W2023699349",
    //                 "https://openalex.org/W2029650596",
    //                 "https://openalex.org/W2030805642",
    //                 "https://openalex.org/W2032438999",
    //                 "https://openalex.org/W2033218028",
    //                 "https://openalex.org/W2037628926",
    //                 "https://openalex.org/W2045110863",
    //                 "https://openalex.org/W2052515926",
    //                 "https://openalex.org/W2052577369",
    //                 "https://openalex.org/W2052918792",
    //                 "https://openalex.org/W2055667103",
    //                 "https://openalex.org/W2055715294",
    //                 "https://openalex.org/W2056336718",
    //                 "https://openalex.org/W2064117905",
    //                 "https://openalex.org/W2066657385",
    //                 "https://openalex.org/W2071335965",
    //                 "https://openalex.org/W2071344447",
    //                 "https://openalex.org/W2075682185",
    //                 "https://openalex.org/W2079390801",
    //                 "https://openalex.org/W2080994882",
    //                 "https://openalex.org/W2085440277",
    //                 "https://openalex.org/W2087298647",
    //                 "https://openalex.org/W2088382964",
    //                 "https://openalex.org/W2089586993",
    //                 "https://openalex.org/W2091697313",
    //                 "https://openalex.org/W2092580449",
    //                 "https://openalex.org/W2095042656",
    //                 "https://openalex.org/W2097359761",
    //                 "https://openalex.org/W2097723313",
    //                 "https://openalex.org/W2100058016",
    //                 "https://openalex.org/W2103692957",
    //                 "https://openalex.org/W2103786980",
    //                 "https://openalex.org/W2103853773",
    //                 "https://openalex.org/W2107852368",
    //                 "https://openalex.org/W2115348689",
    //                 "https://openalex.org/W2117443520",
    //                 "https://openalex.org/W2119565218",
    //                 "https://openalex.org/W2125928414",
    //                 "https://openalex.org/W2127703352",
    //                 "https://openalex.org/W2128189925",
    //                 "https://openalex.org/W2128595101",
    //                 "https://openalex.org/W2129455353",
    //                 "https://openalex.org/W2131357693",
    //                 "https://openalex.org/W2131720818",
    //                 "https://openalex.org/W2136308298",
    //                 "https://openalex.org/W2138418141",
    //                 "https://openalex.org/W2144309171",
    //                 "https://openalex.org/W2149422514",
    //                 "https://openalex.org/W2151239423",
    //                 "https://openalex.org/W2151990639",
    //                 "https://openalex.org/W2152982331",
    //                 "https://openalex.org/W2155547196",
    //                 "https://openalex.org/W2157514959",
    //                 "https://openalex.org/W2159392694",
    //                 "https://openalex.org/W2165269820",
    //                 "https://openalex.org/W2165443127",
    //                 "https://openalex.org/W2396396793",
    //                 "https://openalex.org/W2416576494",
    //                 "https://openalex.org/W2494894961",
    //                 "https://openalex.org/W3011231791",
    //                 "https://openalex.org/W4245783449",
    //                 "https://openalex.org/W4250749137",
    //                 "https://openalex.org/W4254735874",
    //                 "https://openalex.org/W644076287",
    //                 "https://openalex.org/W755472711"
    //             ],
    //             "related_works": [
    //                 "https://openalex.org/W4311677676",
    //                 "https://openalex.org/W4283837016",
    //                 "https://openalex.org/W3210322369",
    //                 "https://openalex.org/W2998802991",
    //                 "https://openalex.org/W2970587290",
    //                 "https://openalex.org/W2949966526",
    //                 "https://openalex.org/W2811390866",
    //                 "https://openalex.org/W2799504568",
    //                 "https://openalex.org/W2135065060",
    //                 "https://openalex.org/W2058736264"
    //             ],
    //             "abstract_inverted_index": {
    //                 "Abstract": [
    //                     0
    //                 ],
    //                 "The": [
    //                     1,
    //                     159
    //                 ],
    //                 "oscillatory": [
    //                     2
    //                 ],
    //                 "interference": [
    //                     3
    //                 ],
    //                 "model": [
    //                     4,
    //                     47
    //                 ],
    //                 "[Burgess": [
    //                     5
    //                 ],
    //                 "et": [
    //                     6
    //                 ],
    //                 "al.": [
    //                     7
    //                 ],
    //                 "(2007)": [
    //                     8
    //                 ],
    //                 "Hippocampus": [
    //                     9
    //                 ],
    //                 "17:801\u2013802]": [
    //                     10
    //                 ],
    //                 "of": [
    //                     11,
    //                     22,
    //                     31,
    //                     59,
    //                     67,
    //                     94,
    //                     118,
    //                     143,
    //                     157,
    //                     168,
    //                     219,
    //                     226,
    //                     236,
    //                     248
    //                 ],
    //                 "grid": [
    //                     12,
    //                     32,
    //                     60,
    //                     208,
    //                     214,
    //                     250
    //                 ],
    //                 "cell": [
    //                     13,
    //                     129,
    //                     254
    //                 ],
    //                 "firing": [
    //                     14,
    //                     57,
    //                     130,
    //                     211
    //                 ],
    //                 "is": [
    //                     15,
    //                     89,
    //                     104,
    //                     131,
    //                     162,
    //                     175
    //                 ],
    //                 "reviewed": [
    //                     16
    //                 ],
    //                 "as": [
    //                     17,
    //                     26,
    //                     115
    //                 ],
    //                 "an": [
    //                     18,
    //                     27,
    //                     105
    //                 ],
    //                 "algorithmic": [
    //                     19
    //                 ],
    //                 "level": [
    //                     20,
    //                     29
    //                 ],
    //                 "description": [
    //                     21,
    //                     30
    //                 ],
    //                 "path": [
    //                     23
    //                 ],
    //                 "integration": [
    //                     24
    //                 ],
    //                 "and": [
    //                     25,
    //                     34,
    //                     48,
    //                     54,
    //                     183,
    //                     192,
    //                     213,
    //                     222,
    //                     239,
    //                     252
    //                 ],
    //                 "implementation": [
    //                     28,
    //                     66
    //                 ],
    //                 "cells": [
    //                     33,
    //                     153
    //                 ],
    //                 "their": [
    //                     35
    //                 ],
    //                 "inputs.": [
    //                     36
    //                 ],
    //                 "New": [
    //                     37,
    //                     62
    //                 ],
    //                 "analyses": [
    //                     38
    //                 ],
    //                 "concern": [
    //                     39,
    //                     64
    //                 ],
    //                 "the": [
    //                     40,
    //                     43,
    //                     46,
    //                     49,
    //                     55,
    //                     65,
    //                     80,
    //                     82,
    //                     92,
    //                     134,
    //                     140,
    //                     165,
    //                     178,
    //                     187,
    //                     204,
    //                     216,
    //                     223,
    //                     227,
    //                     234,
    //                     237,
    //                     240,
    //                     245
    //                 ],
    //                 "relationships": [
    //                     41
    //                 ],
    //                 "between": [
    //                     42,
    //                     206,
    //                     242
    //                 ],
    //                 "variables": [
    //                     44
    //                 ],
    //                 "in": [
    //                     45,
    //                     75
    //                 ],
    //                 "theta": [
    //                     50,
    //                     173,
    //                     220
    //                 ],
    //                 "rhythm,": [
    //                     51
    //                 ],
    //                 "running": [
    //                     52,
    //                     197,
    //                     224
    //                 ],
    //                 "speed,": [
    //                     53
    //                 ],
    //                 "intrinsic": [
    //                     56,
    //                     106,
    //                     210
    //                 ],
    //                 "frequencies": [
    //                     58
    //                 ],
    //                 "cells.": [
    //                     61,
    //                     127
    //                 ],
    //                 "simulations": [
    //                     63
    //                 ],
    //                 "velocity\u2010controlled": [
    //                     68
    //                 ],
    //                 "oscillators": [
    //                     69
    //                 ],
    //                 "(VCOs)": [
    //                     70
    //                 ],
    //                 "with": [
    //                     71,
    //                     164,
    //                     177
    //                 ],
    //                 "different": [
    //                     72,
    //                     76
    //                 ],
    //                 "preferred": [
    //                     73,
    //                     137
    //                 ],
    //                 "directions": [
    //                     74,
    //                     138
    //                 ],
    //                 "neurons.": [
    //                     77
    //                 ],
    //                 "To": [
    //                     78
    //                 ],
    //                 "summarize": [
    //                     79
    //                 ],
    //                 "model,": [
    //                     81
    //                 ],
    //                 "distance": [
    //                     83
    //                 ],
    //                 "traveled": [
    //                     84
    //                 ],
    //                 "along": [
    //                     85
    //                 ],
    //                 "a": [
    //                     86,
    //                     95,
    //                     99,
    //                     116,
    //                     193,
    //                     207
    //                 ],
    //                 "specific": [
    //                     87
    //                 ],
    //                 "direction": [
    //                     88,
    //                     142
    //                 ],
    //                 "encoded": [
    //                     90
    //                 ],
    //                 "by": [
    //                     91,
    //                     120,
    //                     133,
    //                     148
    //                 ],
    //                 "phase": [
    //                     93
    //                 ],
    //                 "VCO": [
    //                     96,
    //                     103,
    //                     169,
    //                     181
    //                 ],
    //                 "relative": [
    //                     97
    //                 ],
    //                 "to": [
    //                     98,
    //                     154,
    //                     196
    //                 ],
    //                 "baseline": [
    //                     100,
    //                     114,
    //                     160
    //                 ],
    //                 "frequency.": [
    //                     101
    //                 ],
    //                 "Each": [
    //                     102
    //                 ],
    //                 "membrane": [
    //                     107
    //                 ],
    //                 "potential": [
    //                     108
    //                 ],
    //                 "oscillation": [
    //                     109
    //                 ],
    //                 "whose": [
    //                     110,
    //                     136
    //                 ],
    //                 "frequency": [
    //                     111,
    //                     161,
    //                     174,
    //                     182,
    //                     188,
    //                     212
    //                 ],
    //                 "increases": [
    //                     112
    //                 ],
    //                 "from": [
    //                     113,
    //                     123,
    //                     151
    //                 ],
    //                 "result": [
    //                     117
    //                 ],
    //                 "depolarization": [
    //                     119
    //                 ],
    //                 "synaptic": [
    //                     121
    //                 ],
    //                 "input": [
    //                     122,
    //                     150
    //                 ],
    //                 "speed": [
    //                     124,
    //                     191,
    //                     225
    //                 ],
    //                 "modulated": [
    //                     125
    //                 ],
    //                 "head\u2010direction": [
    //                     126
    //                 ],
    //                 "Grid": [
    //                     128
    //                 ],
    //                 "driven": [
    //                     132
    //                 ],
    //                 "VCOs": [
    //                     135,
    //                     145
    //                 ],
    //                 "match": [
    //                     139
    //                 ],
    //                 "current": [
    //                     141
    //                 ],
    //                 "motion.": [
    //                     144
    //                 ],
    //                 "are": [
    //                     146,
    //                     201,
    //                     231
    //                 ],
    //                 "phase\u2010reset": [
    //                     147
    //                 ],
    //                 "location\u2010specific": [
    //                     149
    //                 ],
    //                 "place": [
    //                     152,
    //                     253
    //                 ],
    //                 "prevent": [
    //                     155
    //                 ],
    //                 "accumulation": [
    //                     156
    //                 ],
    //                 "error.": [
    //                     158
    //                 ],
    //                 "identified": [
    //                     163,
    //                     176
    //                 ],
    //                 "local": [
    //                     166
    //                 ],
    //                 "average": [
    //                     167,
    //                     180
    //                 ],
    //                 "frequencies,": [
    //                     170
    //                 ],
    //                 "while": [
    //                     171
    //                 ],
    //                 "EEG": [
    //                     172
    //                 ],
    //                 "global": [
    //                     179
    //                 ],
    //                 "comprises": [
    //                     184
    //                 ],
    //                 "two": [
    //                     185,
    //                     217,
    //                     246
    //                 ],
    //                 "components:": [
    //                     186
    //                 ],
    //                 "at": [
    //                     189
    //                 ],
    //                 "zero": [
    //                     190
    //                 ],
    //                 "linear": [
    //                     194
    //                 ],
    //                 "response": [
    //                     195
    //                 ],
    //                 "speed.": [
    //                     198
    //                 ],
    //                 "Quantitative": [
    //                     199
    //                 ],
    //                 "predictions": [
    //                     200,
    //                     230
    //                 ],
    //                 "given": [
    //                     202,
    //                     232
    //                 ],
    //                 "for": [
    //                     203,
    //                     233
    //                 ],
    //                 "inter\u2010relationships": [
    //                     205
    //                 ],
    //                 "cell's": [
    //                     209
    //                 ],
    //                 "scale,": [
    //                     215
    //                 ],
    //                 "components": [
    //                     218,
    //                     247
    //                 ],
    //                 "frequency,": [
    //                     221
    //                 ],
    //                 "animal.": [
    //                     228
    //                 ],
    //                 "Qualitative": [
    //                     229
    //                 ],
    //                 "properties": [
    //                     235
    //                 ],
    //                 "VCOs,": [
    //                     238
    //                 ],
    //                 "relationship": [
    //                     241
    //                 ],
    //                 "environmental": [
    //                     243
    //                 ],
    //                 "novelty,": [
    //                     244
    //                 ],
    //                 "theta,": [
    //                     249
    //                 ],
    //                 "scale": [
    //                     251
    //                 ],
    //                 "remapping.": [
    //                     255
    //                 ],
    //                 "\u00a9": [
    //                     256
    //                 ],
    //                 "2008": [
    //                     257
    //                 ],
    //                 "Wiley\u2010Liss,": [
    //                     258
    //                 ],
    //                 "Inc.": [
    //                     259
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W2045353501",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 16
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 21
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 18
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 9
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 22
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 16
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 14
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 15
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 16
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 24
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 30
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 21
    //                 }
    //             ],
    //             "updated_date": "2025-02-26T03:38:18.629493",
    //             "created_date": "2016-06-24"
    //         },
    //         {
    //             "id": "https://openalex.org/W4233030948",
    //             "doi": "https://doi.org/10.1093/acprof:oso/9780199794546.001.0001",
    //             "title": "How to Build a Brain",
    //             "display_name": "How to Build a Brain",
    //             "publication_year": 2013,
    //             "publication_date": "2013-06-13",
    //             "ids": {
    //                 "openalex": "https://openalex.org/W4233030948",
    //                 "doi": "https://doi.org/10.1093/acprof:oso/9780199794546.001.0001"
    //             },
    //             "language": "en",
    //             "primary_location": {
    //                 "is_oa": false,
    //                 "landing_page_url": "https://doi.org/10.1093/acprof:oso/9780199794546.001.0001",
    //                 "pdf_url": null,
    //                 "source": null,
    //                 "license": null,
    //                 "license_id": null,
    //                 "version": null,
    //                 "is_accepted": false,
    //                 "is_published": false
    //             },
    //             "type": "book",
    //             "type_crossref": "monograph",
    //             "indexed_in": [
    //                 "crossref"
    //             ],
    //             "open_access": {
    //                 "is_oa": false,
    //                 "oa_status": "closed",
    //                 "oa_url": null,
    //                 "any_repository_has_fulltext": false
    //             },
    //             "authorships": [
    //                 {
    //                     "author_position": "first",
    //                     "author": {
    //                         "id": "https://openalex.org/A5055630059",
    //                         "display_name": "Chris Eliasmith",
    //                         "orcid": "https://orcid.org/0000-0003-2933-0209"
    //                     },
    //                     "institutions": [],
    //                     "countries": [],
    //                     "is_corresponding": true,
    //                     "raw_author_name": "Chris Eliasmith",
    //                     "raw_affiliation_strings": [],
    //                     "affiliations": []
    //                 }
    //             ],
    //             "institution_assertions": [],
    //             "countries_distinct_count": 0,
    //             "institutions_distinct_count": 0,
    //             "corresponding_author_ids": [
    //                 "https://openalex.org/A5055630059"
    //             ],
    //             "corresponding_institution_ids": [],
    //             "apc_list": null,
    //             "apc_paid": null,
    //             "fwci": 5.982,
    //             "has_fulltext": false,
    //             "cited_by_count": 285,
    //             "citation_normalized_percentile": {
    //                 "value": 0.921448,
    //                 "is_in_top_1_percent": false,
    //                 "is_in_top_10_percent": true
    //             },
    //             "cited_by_percentile_year": {
    //                 "min": 99,
    //                 "max": 100
    //             },
    //             "biblio": {
    //                 "volume": null,
    //                 "issue": null,
    //                 "first_page": null,
    //                 "last_page": null
    //             },
    //             "is_retracted": false,
    //             "is_paratext": false,
    //             "primary_topic": {
    //                 "id": "https://openalex.org/T12805",
    //                 "display_name": "Cognitive Science and Mapping",
    //                 "score": 0.6239,
    //                 "subfield": {
    //                     "id": "https://openalex.org/subfields/1702",
    //                     "display_name": "Artificial Intelligence"
    //                 },
    //                 "field": {
    //                     "id": "https://openalex.org/fields/17",
    //                     "display_name": "Computer Science"
    //                 },
    //                 "domain": {
    //                     "id": "https://openalex.org/domains/3",
    //                     "display_name": "Physical Sciences"
    //                 }
    //             },
    //             "topics": [
    //                 {
    //                     "id": "https://openalex.org/T12805",
    //                     "display_name": "Cognitive Science and Mapping",
    //                     "score": 0.6239,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 },
    //                 {
    //                     "id": "https://openalex.org/T10320",
    //                     "display_name": "Neural Networks and Applications",
    //                     "score": 0.6172,
    //                     "subfield": {
    //                         "id": "https://openalex.org/subfields/1702",
    //                         "display_name": "Artificial Intelligence"
    //                     },
    //                     "field": {
    //                         "id": "https://openalex.org/fields/17",
    //                         "display_name": "Computer Science"
    //                     },
    //                     "domain": {
    //                         "id": "https://openalex.org/domains/3",
    //                         "display_name": "Physical Sciences"
    //                     }
    //                 }
    //             ],
    //             "keywords": [
    //                 {
    //                     "id": "https://openalex.org/keywords/principle-of-compositionality",
    //                     "display_name": "Principle of compositionality",
    //                     "score": 0.5025413
    //                 },
    //                 {
    //                     "id": "https://openalex.org/keywords/neural-coding",
    //                     "display_name": "Neural coding",
    //                     "score": 0.43824208
    //                 }
    //             ],
    //             "concepts": [
    //                 {
    //                     "id": "https://openalex.org/C41008148",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q21198",
    //                     "display_name": "Computer science",
    //                     "level": 0,
    //                     "score": 0.7053551
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C20854674",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4386060",
    //                     "display_name": "Cognitive architecture",
    //                     "level": 3,
    //                     "score": 0.55882007
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C188147891",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q147638",
    //                     "display_name": "Cognitive science",
    //                     "level": 1,
    //                     "score": 0.5073654
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C121375916",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q936559",
    //                     "display_name": "Principle of compositionality",
    //                     "level": 2,
    //                     "score": 0.5025413
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C197914299",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q18650",
    //                     "display_name": "Semantic memory",
    //                     "level": 3,
    //                     "score": 0.4890781
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C154945302",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q11660",
    //                     "display_name": "Artificial intelligence",
    //                     "level": 1,
    //                     "score": 0.4879398
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C161407221",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q4382939",
    //                     "display_name": "Cognitive model",
    //                     "level": 3,
    //                     "score": 0.45808095
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C97541855",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q830687",
    //                     "display_name": "Reinforcement learning",
    //                     "level": 2,
    //                     "score": 0.44997084
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C77637269",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q7002051",
    //                     "display_name": "Neural coding",
    //                     "level": 2,
    //                     "score": 0.43824208
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169900460",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q2200417",
    //                     "display_name": "Cognition",
    //                     "level": 2,
    //                     "score": 0.4368374
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C184337299",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q1437428",
    //                     "display_name": "Semantics (computer science)",
    //                     "level": 2,
    //                     "score": 0.41121942
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C15744967",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9418",
    //                     "display_name": "Psychology",
    //                     "level": 0,
    //                     "score": 0.15897879
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C169760540",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q207011",
    //                     "display_name": "Neuroscience",
    //                     "level": 1,
    //                     "score": 0.15128893
    //                 },
    //                 {
    //                     "id": "https://openalex.org/C199360897",
    //                     "wikidata": "https://www.wikidata.org/wiki/Q9143",
    //                     "display_name": "Programming language",
    //                     "level": 1,
    //                     "score": 0.13470685
    //                 }
    //             ],
    //             "mesh": [],
    //             "locations_count": 1,
    //             "locations": [
    //                 {
    //                     "is_oa": false,
    //                     "landing_page_url": "https://doi.org/10.1093/acprof:oso/9780199794546.001.0001",
    //                     "pdf_url": null,
    //                     "source": null,
    //                     "license": null,
    //                     "license_id": null,
    //                     "version": null,
    //                     "is_accepted": false,
    //                     "is_published": false
    //                 }
    //             ],
    //             "best_oa_location": null,
    //             "sustainable_development_goals": [
    //                 {
    //                     "score": 0.48,
    //                     "display_name": "Quality education",
    //                     "id": "https://metadata.un.org/sdg/4"
    //                 }
    //             ],
    //             "grants": [],
    //             "datasets": [],
    //             "versions": [],
    //             "referenced_works_count": 0,
    //             "referenced_works": [],
    //             "related_works": [
    //                 "https://openalex.org/W2946052145",
    //                 "https://openalex.org/W2896490743",
    //                 "https://openalex.org/W2202819223",
    //                 "https://openalex.org/W2107952428",
    //                 "https://openalex.org/W2094121058",
    //                 "https://openalex.org/W2083305473",
    //                 "https://openalex.org/W2061031204",
    //                 "https://openalex.org/W2030860531",
    //                 "https://openalex.org/W1999623379",
    //                 "https://openalex.org/W1570300814"
    //             ],
    //             "abstract_inverted_index": {
    //                 "How": [
    //                     0
    //                 ],
    //                 "to": [
    //                     1,
    //                     67,
    //                     96,
    //                     129,
    //                     132
    //                 ],
    //                 "build": [
    //                     2
    //                 ],
    //                 "a": [
    //                     3,
    //                     6,
    //                     11,
    //                     34,
    //                     40,
    //                     69,
    //                     98
    //                 ],
    //                 "brain": [
    //                     4,
    //                     124,
    //                     140
    //                 ],
    //                 "provides": [
    //                     5,
    //                     33
    //                 ],
    //                 "detailed,": [
    //                     7,
    //                     197
    //                 ],
    //                 "guided": [
    //                     8
    //                 ],
    //                 "exploration": [
    //                     9
    //                 ],
    //                 "of": [
    //                     10,
    //                     36,
    //                     43,
    //                     52,
    //                     58,
    //                     72,
    //                     91,
    //                     101,
    //                     123,
    //                     145,
    //                     159
    //                 ],
    //                 "new": [
    //                     12
    //                 ],
    //                 "cognitive": [
    //                     13,
    //                     22
    //                 ],
    //                 "architecture": [
    //                     14
    //                 ],
    //                 "that": [
    //                     15
    //                 ],
    //                 "takes": [
    //                     16
    //                 ],
    //                 "biological": [
    //                     17,
    //                     102
    //                 ],
    //                 "detail": [
    //                     18
    //                 ],
    //                 "seriously,": [
    //                     19
    //                 ],
    //                 "while": [
    //                     20
    //                 ],
    //                 "addressing": [
    //                     21,
    //                     157
    //                 ],
    //                 "phenomena.": [
    //                     23
    //                 ],
    //                 "The": [
    //                     24,
    //                     142,
    //                     194
    //                 ],
    //                 "Semantic": [
    //                     25,
    //                     150
    //                 ],
    //                 "Pointer": [
    //                     26,
    //                     151
    //                 ],
    //                 "Architecture": [
    //                     27,
    //                     152
    //                 ],
    //                 "(SPA)": [
    //                     28
    //                 ],
    //                 "introduced": [
    //                     29,
    //                     95,
    //                     119
    //                 ],
    //                 "in": [
    //                     30,
    //                     105,
    //                     162
    //                 ],
    //                 "this": [
    //                     31,
    //                     146
    //                 ],
    //                 "book": [
    //                     32,
    //                     147,
    //                     177,
    //                     195
    //                 ],
    //                 "set": [
    //                     35
    //                 ],
    //                 "tools": [
    //                     37
    //                 ],
    //                 "for": [
    //                     38
    //                 ],
    //                 "constructing": [
    //                     39
    //                 ],
    //                 "wide": [
    //                     41,
    //                     70
    //                 ],
    //                 "range": [
    //                     42,
    //                     71
    //                 ],
    //                 "perceptual,": [
    //                     44
    //                 ],
    //                 "cognitive,": [
    //                     45
    //                 ],
    //                 "and": [
    //                     46,
    //                     63,
    //                     87,
    //                     113,
    //                     168,
    //                     190,
    //                     213
    //                 ],
    //                 "motor": [
    //                     47
    //                 ],
    //                 "models": [
    //                     48,
    //                     60,
    //                     93,
    //                     116,
    //                     214
    //                 ],
    //                 "at": [
    //                     49
    //                 ],
    //                 "the": [
    //                     50,
    //                     106,
    //                     136,
    //                     149,
    //                     154,
    //                     163,
    //                     174,
    //                     176,
    //                     201,
    //                     211
    //                 ],
    //                 "level": [
    //                     51
    //                 ],
    //                 "individual": [
    //                     53
    //                 ],
    //                 "spiking": [
    //                     54
    //                 ],
    //                 "neurons.": [
    //                     55
    //                 ],
    //                 "Many": [
    //                     56
    //                 ],
    //                 "examples": [
    //                     57
    //                 ],
    //                 "such": [
    //                     59
    //                 ],
    //                 "are": [
    //                     61,
    //                     65,
    //                     117
    //                 ],
    //                 "provided,": [
    //                     62
    //                 ],
    //                 "they": [
    //                     64
    //                 ],
    //                 "shown": [
    //                     66
    //                 ],
    //                 "explain": [
    //                     68,
    //                     97
    //                 ],
    //                 "data": [
    //                     73
    //                 ],
    //                 "including": [
    //                     74,
    //                     108
    //                 ],
    //                 "single": [
    //                     75
    //                 ],
    //                 "cell": [
    //                     76
    //                 ],
    //                 "recordings,": [
    //                     77
    //                 ],
    //                 "neural": [
    //                     78,
    //                     179,
    //                     183,
    //                     204
    //                 ],
    //                 "population": [
    //                     79
    //                 ],
    //                 "activity,": [
    //                     80
    //                 ],
    //                 "reaction": [
    //                     81
    //                 ],
    //                 "times,": [
    //                     82
    //                 ],
    //                 "error": [
    //                     83
    //                 ],
    //                 "rates,": [
    //                     84
    //                 ],
    //                 "choice": [
    //                     85
    //                 ],
    //                 "behavior,": [
    //                     86
    //                 ],
    //                 "fMRI": [
    //                     88
    //                 ],
    //                 "signals.": [
    //                     89
    //                 ],
    //                 "Each": [
    //                     90
    //                 ],
    //                 "these": [
    //                     92
    //                 ],
    //                 "is": [
    //                     94,
    //                     134
    //                 ],
    //                 "major": [
    //                     99
    //                 ],
    //                 "feature": [
    //                     100
    //                 ],
    //                 "cognition": [
    //                     103
    //                 ],
    //                 "addressed": [
    //                     104
    //                 ],
    //                 "book,": [
    //                     107
    //                 ],
    //                 "semantics,": [
    //                     109
    //                 ],
    //                 "syntax,": [
    //                     110
    //                 ],
    //                 "control,": [
    //                     111
    //                 ],
    //                 "learning,": [
    //                     112,
    //                     189
    //                 ],
    //                 "memory.": [
    //                     114
    //                 ],
    //                 "These": [
    //                     115
    //                 ],
    //                 "not": [
    //                     118
    //                 ],
    //                 "as": [
    //                     120
    //                 ],
    //                 "independent": [
    //                     121
    //                 ],
    //                 "considerations": [
    //                     122
    //                 ],
    //                 "function,": [
    //                     125
    //                 ],
    //                 "but": [
    //                     126
    //                 ],
    //                 "instead": [
    //                     127
    //                 ],
    //                 "integrated": [
    //                     128
    //                 ],
    //                 "give": [
    //                     130
    //                 ],
    //                 "rise": [
    //                     131
    //                 ],
    //                 "what": [
    //                     133
    //                 ],
    //                 "currently": [
    //                     135
    //                 ],
    //                 "world\u2019s": [
    //                     137
    //                 ],
    //                 "largest": [
    //                     138
    //                 ],
    //                 "functional": [
    //                     139
    //                 ],
    //                 "model.": [
    //                     141
    //                 ],
    //                 "last": [
    //                     143
    //                 ],
    //                 "half": [
    //                     144
    //                 ],
    //                 "compares": [
    //                     148
    //                 ],
    //                 "with": [
    //                     153,
    //                     210
    //                 ],
    //                 "current": [
    //                     155
    //                 ],
    //                 "state-of-the-art,": [
    //                     156
    //                 ],
    //                 "issues": [
    //                     158
    //                 ],
    //                 "theory": [
    //                     160
    //                 ],
    //                 "construction": [
    //                     161
    //                 ],
    //                 "behavioral": [
    //                     164
    //                 ],
    //                 "sciences,": [
    //                     165
    //                 ],
    //                 "semantic": [
    //                     166
    //                 ],
    //                 "compositionality,": [
    //                     167
    //                 ],
    //                 "scalability,": [
    //                     169
    //                 ],
    //                 "among": [
    //                     170
    //                 ],
    //                 "other": [
    //                     171
    //                 ],
    //                 "considerations.": [
    //                     172
    //                 ],
    //                 "Along": [
    //                     173
    //                 ],
    //                 "way,": [
    //                     175
    //                 ],
    //                 "considers": [
    //                     178
    //                 ],
    //                 "coding,": [
    //                     180
    //                 ],
    //                 "concept": [
    //                     181
    //                 ],
    //                 "representation,": [
    //                     182
    //                 ],
    //                 "dynamics,": [
    //                     184
    //                 ],
    //                 "working": [
    //                     185
    //                 ],
    //                 "memory,": [
    //                     186
    //                 ],
    //                 "neuroanatomy,": [
    //                     187
    //                 ],
    //                 "reinforcement": [
    //                     188
    //                 ],
    //                 "spike-timing": [
    //                     191
    //                 ],
    //                 "dependent": [
    //                     192
    //                 ],
    //                 "plasticity.": [
    //                     193
    //                 ],
    //                 "includes": [
    //                     196
    //                 ],
    //                 "hands-on": [
    //                     198
    //                 ],
    //                 "tutorials": [
    //                     199
    //                 ],
    //                 "exploiting": [
    //                     200
    //                 ],
    //                 "free": [
    //                     202
    //                 ],
    //                 "Nengo": [
    //                     203
    //                 ],
    //                 "simulation": [
    //                     205
    //                 ],
    //                 "environment,": [
    //                     206
    //                 ],
    //                 "providing": [
    //                     207
    //                 ],
    //                 "practical": [
    //                     208
    //                 ],
    //                 "experience": [
    //                     209
    //                 ],
    //                 "concepts": [
    //                     212
    //                 ],
    //                 "presented": [
    //                     215
    //                 ],
    //                 "throughout.": [
    //                     216
    //                 ]
    //             },
    //             "abstract_inverted_index_v3": null,
    //             "cited_by_api_url": "https://api.openalex.org/works?filter=cites:W4233030948",
    //             "counts_by_year": [
    //                 {
    //                     "year": 2024,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2023,
    //                     "cited_by_count": 29
    //                 },
    //                 {
    //                     "year": 2022,
    //                     "cited_by_count": 31
    //                 },
    //                 {
    //                     "year": 2021,
    //                     "cited_by_count": 23
    //                 },
    //                 {
    //                     "year": 2020,
    //                     "cited_by_count": 29
    //                 },
    //                 {
    //                     "year": 2019,
    //                     "cited_by_count": 33
    //                 },
    //                 {
    //                     "year": 2018,
    //                     "cited_by_count": 18
    //                 },
    //                 {
    //                     "year": 2017,
    //                     "cited_by_count": 22
    //                 },
    //                 {
    //                     "year": 2016,
    //                     "cited_by_count": 30
    //                 },
    //                 {
    //                     "year": 2015,
    //                     "cited_by_count": 17
    //                 },
    //                 {
    //                     "year": 2014,
    //                     "cited_by_count": 11
    //                 },
    //                 {
    //                     "year": 2013,
    //                     "cited_by_count": 5
    //                 },
    //                 {
    //                     "year": 2012,
    //                     "cited_by_count": 4
    //                 }
    //             ],
    //             "updated_date": "2025-02-28T17:54:12.203923",
    //             "created_date": "2022-05-12"
    //         }
    //     ],
    //     "group_by": []
    // }
    const results = (await openAlexFetch(`https://api.openalex.org/works?filter=cited_by:${openAlexId},cites:${openAlexId}`)).results
    
    return {
        citedBy: results.filter(each=>each.referenced_works.includes(`https://openalex.org/${openAlexId}`)),
        cites: results.filter(each=>!each.referenced_works.includes(`https://openalex.org/${openAlexId}`)),
    }
}
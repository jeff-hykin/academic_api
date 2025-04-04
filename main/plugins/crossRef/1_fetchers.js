import { createCachedJsonFetcher, createCachedTextFetcher } from "../../tools/fetch_tools.js"
import { normalizeDoiString, couldBeValidDoi } from "../../tools/doi_tools.js"
import { toRepresentation } from "../../imports/good.js"
import { DOMParser } from "../../imports/deno_dom.js"

// 
// central rate-limiter for crossRef
// 
export const crossRefFetch = createCachedJsonFetcher({
    rateLimitMilliseconds: 100, // not sure what their rate limit is
    urlNormalizer: url=>url,
})
// probbaly would be good to somehow have these share a rate limiter
export const crossRefSearchFetch = createCachedTextFetcher({
    rateLimitMilliseconds: 100, // not sure what their rate limit is
    urlNormalizer: url=>url,
})

// 
// get single
// 
export async function crossRefDataFromDoi(doi) {
    if (typeof doi != "string") {
        throw Error(`crossRefDataFromDoi(doi), doi arg was not a string: ${toRepresentation(doi)}`)
    }
    doi = normalizeDoiString(doi)
    return (await crossRefFetch(`https://api.crossref.org/works/${doi}`)).message
    // result.DOI
    // result.abstract
    // result.author[0].given // first name
    // result.author[0].family // last name
    // result.created["date-time"] // string timestamp
    // result.title[0]
    // result["short-container-title"]
    // result["reference-count"]
    // {
    //     "status": "ok",
    //     "message-type": "work",
    //     "message-version": "1.0.0",
    //     "message": {
    //         "indexed": {
    //             "date-parts": [
    //                 [
    //                     2023,
    //                     9,
    //                     3
    //                 ]
    //             ],
    //             "date-time": "2023-09-03T04:57:00Z",
    //             "timestamp": 1693717020763
    //         },
    //         "reference-count": 60,
    //         "publisher": "Hindawi Limited",
    //         "license": [
    //             {
    //                 "start": {
    //                     "date-parts": [
    //                         [
    //                             2014,
    //                             1,
    //                             1
    //                         ]
    //                     ],
    //                     "date-time": "2014-01-01T00:00:00Z",
    //                     "timestamp": 1388534400000
    //                 },
    //                 "content-version": "unspecified",
    //                 "delay-in-days": 0,
    //                 "URL": "http://creativecommons.org/licenses/by/3.0/"
    //             }
    //         ],
    //         "funder": [
    //             {
    //                 "name": "ITMS 26240120020-Establishment of the Centre for the Research on Composite Materials for Structural Engineering and Medical Applications-CEKOMAT II.",
    //                 "award": [
    //                     "VEGA 2/0084/10",
    //                     "APVV-0523-10"
    //                 ]
    //             }
    //         ],
    //         "content-domain": {
    //             "domain": [],
    //             "crossmark-restriction": false
    //         },
    //         "short-container-title": [
    //             "BioMed Research International"
    //         ],
    //         "published-print": {
    //             "date-parts": [
    //                 [
    //                     2014
    //                 ]
    //             ]
    //         },
    //         "abstract": "<jats:p>This study investigated the influence of chronic crowding stress on nitric oxide (NO) production, vascular function and oxidative status in young Wistar-Kyoto (WKY), borderline hypertensive (BHR) and spontaneously hypertensive (SHR) female rats. Five-week old rats were exposed to crowding for two weeks. Crowding elevated plasma corticosterone<mml:math xmlns:mml=\"http://www.w3.org/1998/Math/MathML\" id=\"M1\"><mml:mo stretchy=\"false\">(</mml:mo><mml:mi>P</mml:mi><mml:mo>&lt;</mml:mo><mml:mn>0.05</mml:mn><mml:mo stretchy=\"false\">)</mml:mo></mml:math>and accelerated BP (<mml:math xmlns:mml=\"http://www.w3.org/1998/Math/MathML\" id=\"M2\"><mml:mi>P</mml:mi><mml:mo>&lt;</mml:mo><mml:mn>0.01</mml:mn></mml:math>versus basal) only in BHR. NO production and superoxide concentration were significantly higher in the aortas of control BHR and SHR versus WKY. Total acetylcholine (ACh)-induced relaxation in the femoral artery was reduced in control SHR versus WKY and BHR, and stress did not affect it significantly in any genotype. The attenuation of ACh-induced relaxation in SHR versus WKY was associated with reduction of its NO-independent component. Crowding elevated NO production in all strains investigated but superoxide concentration was increased only in WKY, which resulted in reduced NO-dependent relaxation in WKY. In crowded BHR and SHR, superoxide concentration was either unchanged or reduced, respectively, but NO-dependent relaxation was unchanged in both BHR and SHR versus their respective control group. This study points to genotype-related differences in stress vulnerability in young female rats. The most pronounced negative influence of stress was observed in BHR despite preserved endothelial function.</jats:p>",
    //         "DOI": "10.1155/2014/413629",
    //         "type": "journal-article",
    //         "created": {
    //             "date-parts": [
    //                 [
    //                     2014,
    //                     3,
    //                     9
    //                 ]
    //             ],
    //             "date-time": "2014-03-09T09:21:03Z",
    //             "timestamp": 1394356863000
    //         },
    //         "page": "1-11",
    //         "source": "Crossref",
    //         "is-referenced-by-count": 17,
    //         "title": [
    //             "Genotype-Related Effect of Crowding Stress on Blood Pressure and Vascular Function in Young Female Rats"
    //         ],
    //         "prefix": "10.1155",
    //         "volume": "2014",
    //         "author": [
    //             {
    //                 "ORCID": "http://orcid.org/0000-0001-9757-3283",
    //                 "authenticated-orcid": true,
    //                 "given": "Peter",
    //                 "family": "Slezak",
    //                 "sequence": "first",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "given": "Angelika",
    //                 "family": "Puzserova",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "given": "Peter",
    //                 "family": "Balis",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "given": "Natalia",
    //                 "family": "Sestakova",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "ORCID": "http://orcid.org/0000-0001-8748-4279",
    //                 "authenticated-orcid": true,
    //                 "given": "Miroslava",
    //                 "family": "Majzunova",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "given": "Ima",
    //                 "family": "Dovinova",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "given": "Michal",
    //                 "family": "Kluknavsky",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             },
    //             {
    //                 "ORCID": "http://orcid.org/0000-0002-6120-706X",
    //                 "authenticated-orcid": true,
    //                 "given": "Iveta",
    //                 "family": "Bernatova",
    //                 "sequence": "additional",
    //                 "affiliation": [
    //                     {
    //                         "name": "Institute of Normal and Pathological Physiology, Centre of Excellence for Examination of Regulatory Role of Nitric Oxide in Civilization Diseases, Slovak Academy of Sciences, Sienkiewiczova 1, 813 71 Bratislava, Slovakia"
    //                     }
    //                 ]
    //             }
    //         ],
    //         "member": "98",
    //         "reference": [
    //             {
    //                 "issue": "4",
    //                 "key": "1",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "141",
    //                 "DOI": "10.1080/08964280209596039",
    //                 "volume": "27",
    //                 "year": "2002",
    //                 "journal-title": "Behavioral Medicine"
    //             },
    //             {
    //                 "key": "2",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.brainresbull.2003.12.001"
    //             },
    //             {
    //                 "key": "3",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/S0140-6736(04)17019-0"
    //             },
    //             {
    //                 "key": "4",
    //                 "first-page": "1",
    //                 "volume-title": "Introduction to cardiovascular disease, stress and adaptation",
    //                 "year": "2012"
    //             },
    //             {
    //                 "key": "5",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1111/j.1440-1681.2008.04904.x"
    //             },
    //             {
    //                 "key": "6",
    //                 "first-page": "273",
    //                 "volume-title": "The causal role of chronic mental stress in the pathogenesis of essential hypertension",
    //                 "year": "2012"
    //             },
    //             {
    //                 "key": "7",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1186/1471-2458-8-357"
    //             },
    //             {
    //                 "key": "8",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1038/jhh.2008.74"
    //             },
    //             {
    //                 "key": "9",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1007/s10571-011-9768-0"
    //             },
    //             {
    //                 "issue": "4",
    //                 "key": "10",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "1227",
    //                 "DOI": "10.1152/physrev.1999.79.4.1227",
    //                 "volume": "79",
    //                 "year": "1999",
    //                 "journal-title": "Physiological Reviews"
    //             },
    //             {
    //                 "key": "11",
    //                 "first-page": "S9",
    //                 "volume": "61",
    //                 "year": "2012",
    //                 "journal-title": "Physiological Research"
    //             },
    //             {
    //                 "key": "12",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1042/CS20050271"
    //             },
    //             {
    //                 "issue": "3",
    //                 "key": "13",
    //                 "first-page": "367",
    //                 "volume": "50",
    //                 "year": "1999",
    //                 "journal-title": "Journal of Physiology and Pharmacology"
    //             },
    //             {
    //                 "issue": "1",
    //                 "key": "14",
    //                 "first-page": "67",
    //                 "volume": "52",
    //                 "year": "2003",
    //                 "journal-title": "Physiological Research"
    //             },
    //             {
    //                 "key": "15",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "331",
    //                 "volume": "16",
    //                 "year": "2013",
    //                 "journal-title": "Stress",
    //                 "DOI": "10.3109/10253890.2012.725116"
    //             },
    //             {
    //                 "key": "16",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1023/A:1016627224865"
    //             },
    //             {
    //                 "key": "17",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1007/s00424-011-1022-6"
    //             },
    //             {
    //                 "issue": "5",
    //                 "key": "18",
    //                 "first-page": "667",
    //                 "volume": "56",
    //                 "year": "2007",
    //                 "journal-title": "Physiological Research"
    //             },
    //             {
    //                 "issue": "6",
    //                 "key": "19",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "854",
    //                 "DOI": "10.1161/01.HYP.26.6.854",
    //                 "volume": "26",
    //                 "year": "1995",
    //                 "journal-title": "Hypertension"
    //             },
    //             {
    //                 "key": "20",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1080/10253890802234168"
    //             },
    //             {
    //                 "issue": "2",
    //                 "key": "21",
    //                 "first-page": "103",
    //                 "volume": "59",
    //                 "year": "2008",
    //                 "journal-title": "Journal of Physiology and Pharmacology"
    //             },
    //             {
    //                 "key": "22",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.physbeh.2009.05.011"
    //             },
    //             {
    //                 "key": "23",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1097/01.hjh.0000358834.18311.fc"
    //             },
    //             {
    //                 "key": "24",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/S0008-6363(01)00508-9"
    //             },
    //             {
    //                 "key": "25",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "897",
    //                 "volume": "2",
    //                 "year": "2010",
    //                 "journal-title": "Health",
    //                 "DOI": "10.4236/health.2010.28133"
    //             },
    //             {
    //                 "key": "26",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.biopsycho.2004.11.009"
    //             },
    //             {
    //                 "key": "27",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1007/s10517-007-0043-9"
    //             },
    //             {
    //                 "key": "29",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.niox.2011.12.008"
    //             },
    //             {
    //                 "key": "30",
    //                 "first-page": "73",
    //                 "volume-title": "Measurement of vascular reactive oxygen species production by chemiluminescence",
    //                 "year": "2005"
    //             },
    //             {
    //                 "issue": "4",
    //                 "key": "31",
    //                 "first-page": "405",
    //                 "volume": "13",
    //                 "year": "1995",
    //                 "journal-title": "Journal of Hypertension"
    //             },
    //             {
    //                 "key": "32",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "2611",
    //                 "volume": "38",
    //                 "year": "2013",
    //                 "journal-title": "Psychoneuroendocrinology",
    //                 "DOI": "10.1016/j.psyneuen.2013.06.014"
    //             },
    //             {
    //                 "key": "33",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.appet.2012.02.046"
    //             },
    //             {
    //                 "key": "34",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "217",
    //                 "volume": "177",
    //                 "year": "2013",
    //                 "journal-title": "Autonomic Neuroscience",
    //                 "DOI": "10.1016/j.autneu.2013.05.001"
    //             },
    //             {
    //                 "key": "35",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "142",
    //                 "volume": "246",
    //                 "year": "2013",
    //                 "journal-title": "Neuroscience",
    //                 "DOI": "10.1016/j.neuroscience.2013.04.052"
    //             },
    //             {
    //                 "key": "36",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1186/1744-9081-7-11"
    //             },
    //             {
    //                 "key": "37",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1113/jphysiol.2007.141580"
    //             },
    //             {
    //                 "key": "38",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.nlm.2008.07.001"
    //             },
    //             {
    //                 "key": "39",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.3109/10253890.2011.586446"
    //             },
    //             {
    //                 "issue": "3",
    //                 "key": "40",
    //                 "first-page": "487",
    //                 "volume": "58",
    //                 "year": "2007",
    //                 "journal-title": "Journal of Physiology and Pharmacology"
    //             },
    //             {
    //                 "key": "41",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1152/ajpregu.00095.2008"
    //             },
    //             {
    //                 "key": "42",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1113/expphysiol.2010.055970"
    //             },
    //             {
    //                 "issue": "5",
    //                 "key": "43",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "R527",
    //                 "DOI": "10.1152/ajpregu.1985.249.5.R527",
    //                 "volume": "249",
    //                 "year": "1985",
    //                 "journal-title": "American Journal of Physiology—Regulatory Integrative and Comparative Physiology"
    //             },
    //             {
    //                 "key": "44",
    //                 "first-page": "111",
    //                 "volume": "116",
    //                 "year": "2002",
    //                 "journal-title": "Indian Journal of Medical Research"
    //             },
    //             {
    //                 "key": "45",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/0031-9384(96)00020-0"
    //             },
    //             {
    //                 "key": "46",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1007/s00467-011-1928-4"
    //             },
    //             {
    //                 "key": "47",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1155/2013/427640"
    //             },
    //             {
    //                 "key": "48",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.jacc.2005.03.068"
    //             },
    //             {
    //                 "key": "49",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1074/jbc.271.39.23928"
    //             },
    //             {
    //                 "key": "50",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1007/s00424-010-0797-1"
    //             },
    //             {
    //                 "key": "51",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1016/j.physbeh.2011.09.017"
    //             },
    //             {
    //                 "key": "52",
    //                 "first-page": "615",
    //                 "volume": "62",
    //                 "year": "2013",
    //                 "journal-title": "Physiological Research"
    //             },
    //             {
    //                 "key": "53",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "233",
    //                 "volume": "16",
    //                 "year": "2013",
    //                 "journal-title": "Stress",
    //                 "DOI": "10.3109/10253890.2012.719052"
    //             },
    //             {
    //                 "issue": "1",
    //                 "key": "54",
    //                 "first-page": "53",
    //                 "volume": "46",
    //                 "year": "2009",
    //                 "journal-title": "Indian Journal of Biochemistry and Biophysics"
    //             },
    //             {
    //                 "key": "61",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1161/01.RES.0000082524.34487.31"
    //             },
    //             {
    //                 "key": "55",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1124/pr.59.3.3"
    //             },
    //             {
    //                 "issue": "6",
    //                 "key": "56",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "R1719",
    //                 "DOI": "10.1152/ajpregu.2001.280.6.R1719",
    //                 "volume": "280",
    //                 "year": "2001",
    //                 "journal-title": "American Journal of Physiology—Regulatory Integrative and Comparative Physiology"
    //             },
    //             {
    //                 "key": "59"
    //             },
    //             {
    //                 "issue": "4",
    //                 "key": "60",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "393",
    //                 "DOI": "10.1161/01.HYP.12.4.393",
    //                 "volume": "12",
    //                 "year": "1988",
    //                 "journal-title": "Hypertension"
    //             },
    //             {
    //                 "key": "57",
    //                 "doi-asserted-by": "crossref",
    //                 "first-page": "341",
    //                 "volume": "78",
    //                 "year": "2013",
    //                 "journal-title": "Steroids",
    //                 "DOI": "10.1016/j.steroids.2012.11.018"
    //             },
    //             {
    //                 "key": "58",
    //                 "doi-asserted-by": "publisher",
    //                 "DOI": "10.1097/00004872-200309000-00019"
    //             }
    //         ],
    //         "container-title": [
    //             "BioMed Research International"
    //         ],
    //         "original-title": [],
    //         "language": "en",
    //         "link": [
    //             {
    //                 "URL": "http://downloads.hindawi.com/journals/bmri/2014/413629.pdf",
    //                 "content-type": "application/pdf",
    //                 "content-version": "vor",
    //                 "intended-application": "text-mining"
    //             },
    //             {
    //                 "URL": "http://downloads.hindawi.com/journals/bmri/2014/413629.xml",
    //                 "content-type": "application/xml",
    //                 "content-version": "vor",
    //                 "intended-application": "text-mining"
    //             },
    //             {
    //                 "URL": "http://downloads.hindawi.com/journals/bmri/2014/413629.pdf",
    //                 "content-type": "unspecified",
    //                 "content-version": "vor",
    //                 "intended-application": "similarity-checking"
    //             }
    //         ],
    //         "deposited": {
    //             "date-parts": [
    //                 [
    //                     2019,
    //                     8,
    //                     8
    //                 ]
    //             ],
    //             "date-time": "2019-08-08T08:38:00Z",
    //             "timestamp": 1565253480000
    //         },
    //         "score": 1,
    //         "resource": {
    //             "primary": {
    //                 "URL": "http://www.hindawi.com/journals/bmri/2014/413629/"
    //             }
    //         },
    //         "subtitle": [],
    //         "short-title": [],
    //         "issued": {
    //             "date-parts": [
    //                 [
    //                     2014
    //                 ]
    //             ]
    //         },
    //         "references-count": 60,
    //         "alternative-id": [
    //             "413629",
    //             "413629"
    //         ],
    //         "URL": "http://dx.doi.org/10.1155/2014/413629",
    //         "relation": {},
    //         "ISSN": [
    //             "2314-6133",
    //             "2314-6141"
    //         ],
    //         "issn-type": [
    //             {
    //                 "value": "2314-6133",
    //                 "type": "print"
    //             },
    //             {
    //                 "value": "2314-6141",
    //                 "type": "electronic"
    //             }
    //         ],
    //         "subject": [
    //             "General Immunology and Microbiology",
    //             "General Biochemistry, Genetics and Molecular Biology",
    //             "General Medicine"
    //         ],
    //         "published": {
    //             "date-parts": [
    //                 [
    //                     2014
    //                 ]
    //             ]
    //         }
    //     }
    // }
}

// 
// get multiple
// 
export function dataForDois(dois) {
    return crossRefFetch(`https://api.crossref.org/works/?filter=${dois.map(eachDoi=>`doi:${eachDoi}`).join(",")}&rows=${dois.length}`).then(result=>result?.message?.items||[])
}
export async function getLinkedCrossRefArticles(doi) {
    if (typeof doi != "string") {
        throw Error(`getLinkedCrossRefArticles(doi), doi arg was not a string: ${toRepresentation(doi)}`)
    }
    const crossRefObject = await crossRefDataFromDoi(doi)
    
    const dois = (crossRefObject?.reference||[]).map(each=>each.DOI).filter(each=>each)
    // crossRefObject?.reference = [
    //     {
    //         "issue": "4",
    //         "key": "1",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "141",
    //         "DOI": "10.1080/08964280209596039",
    //         "volume": "27",
    //         "year": "2002",
    //         "journal-title": "Behavioral Medicine"
    //     },
    //     {
    //         "key": "2",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.brainresbull.2003.12.001"
    //     },
    //     {
    //         "key": "3",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/S0140-6736(04)17019-0"
    //     },
    //     {
    //         "key": "4",
    //         "first-page": "1",
    //         "volume-title": "Introduction to cardiovascular disease, stress and adaptation",
    //         "year": "2012"
    //     },
    //     {
    //         "key": "5",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1111/j.1440-1681.2008.04904.x"
    //     },
    //     {
    //         "key": "6",
    //         "first-page": "273",
    //         "volume-title": "The causal role of chronic mental stress in the pathogenesis of essential hypertension",
    //         "year": "2012"
    //     },
    //     {
    //         "key": "7",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1186/1471-2458-8-357"
    //     },
    //     {
    //         "key": "8",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1038/jhh.2008.74"
    //     },
    //     {
    //         "key": "9",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1007/s10571-011-9768-0"
    //     },
    //     {
    //         "issue": "4",
    //         "key": "10",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "1227",
    //         "DOI": "10.1152/physrev.1999.79.4.1227",
    //         "volume": "79",
    //         "year": "1999",
    //         "journal-title": "Physiological Reviews"
    //     },
    //     {
    //         "key": "11",
    //         "first-page": "S9",
    //         "volume": "61",
    //         "year": "2012",
    //         "journal-title": "Physiological Research"
    //     },
    //     {
    //         "key": "12",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1042/CS20050271"
    //     },
    //     {
    //         "issue": "3",
    //         "key": "13",
    //         "first-page": "367",
    //         "volume": "50",
    //         "year": "1999",
    //         "journal-title": "Journal of Physiology and Pharmacology"
    //     },
    //     {
    //         "issue": "1",
    //         "key": "14",
    //         "first-page": "67",
    //         "volume": "52",
    //         "year": "2003",
    //         "journal-title": "Physiological Research"
    //     },
    //     {
    //         "key": "15",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "331",
    //         "volume": "16",
    //         "year": "2013",
    //         "journal-title": "Stress",
    //         "DOI": "10.3109/10253890.2012.725116"
    //     },
    //     {
    //         "key": "16",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1023/A:1016627224865"
    //     },
    //     {
    //         "key": "17",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1007/s00424-011-1022-6"
    //     },
    //     {
    //         "issue": "5",
    //         "key": "18",
    //         "first-page": "667",
    //         "volume": "56",
    //         "year": "2007",
    //         "journal-title": "Physiological Research"
    //     },
    //     {
    //         "issue": "6",
    //         "key": "19",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "854",
    //         "DOI": "10.1161/01.HYP.26.6.854",
    //         "volume": "26",
    //         "year": "1995",
    //         "journal-title": "Hypertension"
    //     },
    //     {
    //         "key": "20",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1080/10253890802234168"
    //     },
    //     {
    //         "issue": "2",
    //         "key": "21",
    //         "first-page": "103",
    //         "volume": "59",
    //         "year": "2008",
    //         "journal-title": "Journal of Physiology and Pharmacology"
    //     },
    //     {
    //         "key": "22",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.physbeh.2009.05.011"
    //     },
    //     {
    //         "key": "23",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1097/01.hjh.0000358834.18311.fc"
    //     },
    //     {
    //         "key": "24",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/S0008-6363(01)00508-9"
    //     },
    //     {
    //         "key": "25",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "897",
    //         "volume": "2",
    //         "year": "2010",
    //         "journal-title": "Health",
    //         "DOI": "10.4236/health.2010.28133"
    //     },
    //     {
    //         "key": "26",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.biopsycho.2004.11.009"
    //     },
    //     {
    //         "key": "27",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1007/s10517-007-0043-9"
    //     },
    //     {
    //         "key": "29",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.niox.2011.12.008"
    //     },
    //     {
    //         "key": "30",
    //         "first-page": "73",
    //         "volume-title": "Measurement of vascular reactive oxygen species production by chemiluminescence",
    //         "year": "2005"
    //     },
    //     {
    //         "issue": "4",
    //         "key": "31",
    //         "first-page": "405",
    //         "volume": "13",
    //         "year": "1995",
    //         "journal-title": "Journal of Hypertension"
    //     },
    //     {
    //         "key": "32",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "2611",
    //         "volume": "38",
    //         "year": "2013",
    //         "journal-title": "Psychoneuroendocrinology",
    //         "DOI": "10.1016/j.psyneuen.2013.06.014"
    //     },
    //     {
    //         "key": "33",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.appet.2012.02.046"
    //     },
    //     {
    //         "key": "34",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "217",
    //         "volume": "177",
    //         "year": "2013",
    //         "journal-title": "Autonomic Neuroscience",
    //         "DOI": "10.1016/j.autneu.2013.05.001"
    //     },
    //     {
    //         "key": "35",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "142",
    //         "volume": "246",
    //         "year": "2013",
    //         "journal-title": "Neuroscience",
    //         "DOI": "10.1016/j.neuroscience.2013.04.052"
    //     },
    //     {
    //         "key": "36",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1186/1744-9081-7-11"
    //     },
    //     {
    //         "key": "37",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1113/jphysiol.2007.141580"
    //     },
    //     {
    //         "key": "38",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.nlm.2008.07.001"
    //     },
    //     {
    //         "key": "39",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.3109/10253890.2011.586446"
    //     },
    //     {
    //         "issue": "3",
    //         "key": "40",
    //         "first-page": "487",
    //         "volume": "58",
    //         "year": "2007",
    //         "journal-title": "Journal of Physiology and Pharmacology"
    //     },
    //     {
    //         "key": "41",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1152/ajpregu.00095.2008"
    //     },
    //     {
    //         "key": "42",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1113/expphysiol.2010.055970"
    //     },
    //     {
    //         "issue": "5",
    //         "key": "43",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "R527",
    //         "DOI": "10.1152/ajpregu.1985.249.5.R527",
    //         "volume": "249",
    //         "year": "1985",
    //         "journal-title": "American Journal of Physiology—Regulatory Integrative and Comparative Physiology"
    //     },
    //     {
    //         "key": "44",
    //         "first-page": "111",
    //         "volume": "116",
    //         "year": "2002",
    //         "journal-title": "Indian Journal of Medical Research"
    //     },
    //     {
    //         "key": "45",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/0031-9384(96)00020-0"
    //     },
    //     {
    //         "key": "46",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1007/s00467-011-1928-4"
    //     },
    //     {
    //         "key": "47",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1155/2013/427640"
    //     },
    //     {
    //         "key": "48",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.jacc.2005.03.068"
    //     },
    //     {
    //         "key": "49",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1074/jbc.271.39.23928"
    //     },
    //     {
    //         "key": "50",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1007/s00424-010-0797-1"
    //     },
    //     {
    //         "key": "51",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1016/j.physbeh.2011.09.017"
    //     },
    //     {
    //         "key": "52",
    //         "first-page": "615",
    //         "volume": "62",
    //         "year": "2013",
    //         "journal-title": "Physiological Research"
    //     },
    //     {
    //         "key": "53",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "233",
    //         "volume": "16",
    //         "year": "2013",
    //         "journal-title": "Stress",
    //         "DOI": "10.3109/10253890.2012.719052"
    //     },
    //     {
    //         "issue": "1",
    //         "key": "54",
    //         "first-page": "53",
    //         "volume": "46",
    //         "year": "2009",
    //         "journal-title": "Indian Journal of Biochemistry and Biophysics"
    //     },
    //     {
    //         "key": "61",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1161/01.RES.0000082524.34487.31"
    //     },
    //     {
    //         "key": "55",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1124/pr.59.3.3"
    //     },
    //     {
    //         "issue": "6",
    //         "key": "56",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "R1719",
    //         "DOI": "10.1152/ajpregu.2001.280.6.R1719",
    //         "volume": "280",
    //         "year": "2001",
    //         "journal-title": "American Journal of Physiology—Regulatory Integrative and Comparative Physiology"
    //     },
    //     {
    //         "key": "59"
    //     },
    //     {
    //         "issue": "4",
    //         "key": "60",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "393",
    //         "DOI": "10.1161/01.HYP.12.4.393",
    //         "volume": "12",
    //         "year": "1988",
    //         "journal-title": "Hypertension"
    //     },
    //     {
    //         "key": "57",
    //         "doi-asserted-by": "crossref",
    //         "first-page": "341",
    //         "volume": "78",
    //         "year": "2013",
    //         "journal-title": "Steroids",
    //         "DOI": "10.1016/j.steroids.2012.11.018"
    //     },
    //     {
    //         "key": "58",
    //         "doi-asserted-by": "publisher",
    //         "DOI": "10.1097/00004872-200309000-00019"
    //     }
    // ]
    if (dois.length == 0) {
        return { cites: [] }
    } else {
        return { cites: await dataForDois(dois) }
    }
}

// 
// search
// 
export async function crossRefSearch(query) {
    const url = `https://search.crossref.org/search/works?q=${encodeURIComponent(query)}&from_ui=yes`
    const htmlResult = await crossRefSearchFetch(url)
    // 
    // process html
    // 
    const baseUrl = new URL(url).origin
    const getHref = (element)=>element.getAttribute("href").startsWith("/")?`${baseUrl}/${element.getAttribute("href")}`:element.getAttribute("href")
    const document = new DOMParser().parseFromString(
        htmlResult,
        "text/html",
    )
    const results =  [...document.querySelector("tbody").children]
    const titlesAndDois = []
    for (let each of results) {
        let titleElement = each.querySelector("p.lead")
        if (titleElement) {
            const title = titleElement.innerText.trim()
            const linksEl = each.querySelector("div.item-links")
            const dois = [...linksEl.querySelectorAll("a")].map(each=>getHref(each)).map(normalizeDoiString).filter(each=>couldBeValidDoi(each))
            // TODO: could filter this better
            const urls = [...linksEl.querySelectorAll("a")].map(each=>getHref(each))
            titlesAndDois.push({
                title,
                doi: dois[0],
                url: urls[0],
                // TODO: could probably scrape more info from the page here
            })
        }
    }
    return titlesAndDois
}
import { createCachedTextFetcher } from "../../tools/fetch_tools.js"
import { normalizeDoiString } from "../../tools/doi_tools.js"
import { toRepresentation } from "../../imports/good.js"
import { DOMParser } from "../../imports/deno_dom.js"

// 
// central rate-limiter for openAlex
// 
export const googleScholarFetcher = createCachedTextFetcher({
    cache: {},
    rateLimitMilliseconds: 15000, // google is picky and defensive
    onUpdateCache(url) {
       
    },
    urlNormalizer(url) {
        return new URL(url)
    }
})

// example results for for function below:
// [
//         {
//             title: "RAIL: Robot Affordance Imagination with Large Language Models",
//             year: "1936",
//             authorNames: [ "C Zhang", "X Meng", "D Qi", "GS Chirikjian�" ],
//             pdfUrl: "https://scholar.google.com/https://arxiv.org/pdf/2403.19369",
//             url: "https://scholar.google.com/https://arxiv.org/abs/2403.19369",
//             citationId: "8172269612940938567",
//             id: "8172269612940938567",
//             citedByUrl: "https://scholar.google.com//scholar?cites=8172269612940938567&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " arXiv preprint arXiv:2403.19369, 2024 "
//         },
//         {
//             title: "Affordance-Based Goal Imagination for Embodied AI Agents",
//             year: "2024",
//             authorNames: [ "V Aregbede", "SS Abraham", "A Persson…�" ],
//             pdfUrl: "https://scholar.google.com/https://ieeexplore.ieee.org/iel8/10644131/10644157/10644764.pdf",
//             url: "https://scholar.google.com/https://ieeexplore.ieee.org/abstract/document/10644764/",
//             citationId: null,
//             id: null,
//             citedByUrl: null,
//             publisherInfo: " …�on Development and�…, 2024 "
//         },
//         {
//             title: "Affordance-based Generation of Pretend Object Interaction Variants For Human-Computer Improvisational Theater.",
//             year: "2019",
//             authorNames: [ "M Jacob", "P Chawla", "L Douglas", "Z He", "J Lee…�" ],
//             pdfUrl: "https://scholar.google.com/https://computationalcreativity.net/iccc2019/papers/iccc19-paper-53.pdf",
//             url: "https://scholar.google.com/https://computationalcreativity.net/iccc2019/papers/iccc19-paper-53.pdf",
//             citationId: "1507682225119270119",
//             id: "1507682225119270119",
//             citedByUrl: "https://scholar.google.com//scholar?cites=1507682225119270119&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " ICCC, 2019 "
//         },
//         {
//             title: "Learning to anticipate egocentric actions by imagination",
//             year: "2020",
//             authorNames: [ "Y Wu", "L Zhu", "X Wang", "Y Yang…�" ],
//             pdfUrl: "https://scholar.google.com/https://ieeexplore.ieee.org/iel7/83/9263394/09280353.pdf",
//             url: "https://scholar.google.com/https://ieeexplore.ieee.org/abstract/document/9280353/",
//             citationId: "6012752103031775791",
//             id: "6012752103031775791",
//             citedByUrl: "https://scholar.google.com//scholar?cites=6012752103031775791&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " IEEE Transactions on�…, 2020 "
//         },
//         {
//             title: "Imagine that! Leveraging emergent affordances for 3d tool synthesis",
//             year: "2019",
//             authorNames: [ "Y Wu", "S Kasewa", "O Groth", "S Salter", "L Sun…�" ],
//             pdfUrl: "https://scholar.google.com/https://arxiv.org/pdf/1909.13561",
//             url: "https://scholar.google.com/https://arxiv.org/abs/1909.13561",
//             citationId: "1893778644382906900",
//             id: "1893778644382906900",
//             citedByUrl: "https://scholar.google.com//scholar?cites=1893778644382906900&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " arXiv preprint arXiv�…, 2019 "
//         },
//         {
//             title: "Imagine that! leveraging emergent affordances for tool synthesis in reaching tasks",
//             year: "2019",
//             authorNames: [ "Y Wu", "S Kasewa", "O Groth", "S Salter", "L Sun", "OP Jones…" ],
//             pdfUrl: "https://scholar.google.com/https://openreview.net/pdf?id=BkeyOxrYwH",
//             url: "https://scholar.google.com/https://openreview.net/forum?id=BkeyOxrYwH",
//             citationId: "2961549995427504858",
//             id: null,
//             citedByUrl: "https://scholar.google.com//scholar?cites=2961549995427504858&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " 2019 "
//         },
//         {
//             title: "Designing to support reasoned imagination through embodied metaphor",
//             year: "2009",
//             authorNames: [ "AN Antle", "G Corness", "S Bakker", "M Droumeva…�" ],
//             pdfUrl: "https://scholar.google.com/https://dl.acm.org/doi/pdf/10.1145/1640233.1640275",
//             url: "https://scholar.google.com/https://dl.acm.org/doi/abs/10.1145/1640233.1640275",
//             citationId: "2411282799326683271",
//             id: "2411282799326683271",
//             citedByUrl: "https://scholar.google.com//scholar?cites=2411282799326683271&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " Proceedings of the�…, 2009 "
//         },
//         {
//             title: "Is that a chair? imagining affordances using simulations of an articulated human body",
//             year: "2020",
//             authorNames: [ "H Wu", "D Misra", "GS Chirikjian�" ],
//             pdfUrl: "https://scholar.google.com/https://ieeexplore.ieee.org/iel7/9187508/9196508/09197384.pdf",
//             url: "https://scholar.google.com/https://ieeexplore.ieee.org/abstract/document/9197384/",
//             citationId: "17460003043367084993",
//             id: "17460003043367084993",
//             citedByUrl: "https://scholar.google.com//scholar?cites=17460003043367084993&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " 2020 IEEE international�…, 2020 "
//         },
//         {
//             title: "Understanding effects of observing affordance-driven action during motor imagery through EEG analysis",
//             year: "2024",
//             authorNames: [ "S Bordoloi", "CN Gupta", "SM Hazarika�" ],
//             pdfUrl: null,
//             url: "https://scholar.google.com/https://url.springer.com/article/10.1007/s00221-024-06912-w",
//             citationId: null,
//             id: "679006825711270763",
//             citedByUrl: null,
//             publisherInfo: " Experimental Brain Research, 2024 "
//         },
//         {
//             title: "Rethinking affordance",
//             year: "2019",
//             authorNames: [ "A Scarlett", "M Zeilinger�" ],
//             pdfUrl: "https://scholar.google.com/https://rke.abertay.ac.uk/files/17329869/Zeilinger_RethinkingAffordance_Published_2019.pdf",
//             url: "https://scholar.google.com/https://rke.abertay.ac.uk/files/17329869/Zeilinger_RethinkingAffordance_Published_2019.pdf",
//             citationId: "7525425764402934640",
//             id: "7525425764402934640",
//             citedByUrl: "https://scholar.google.com//scholar?cites=7525425764402934640&as_sdt=5,44&sciodt=0,44&hl=en&oe=ASCII",
//             publisherInfo: " Media Theory, 2019 "
//         }
//     ]
export async function queryToListOfResults(query) {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`
    const baseUrl = new URL(url).origin
    const getHref = (element)=>element.getAttribute("href").startsWith("/")?`${baseUrl}/${element.getAttribute("href")}`:element.getAttribute("href")
    
    // 
    // fetch
    // 
    let htmlResult
    try {
        htmlResult = await googleScholarFetcher(url, {
            "credentials": "include",
            "headers": {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:133.0) Gecko/20100101 Firefox/133.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Sec-GPC": "1",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Priority": "u=0, i",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            "referrer": "https://scholar.google.com/",
            "method": "GET",
            "mode": "cors"
        })
    } catch (error) {
        if (error.message.match(/too many requests/i)) {
            console.debug(`detected too many requests error, doubling rate limit`,error)
            googleScholarFetcher.rateLimit = googleScholarFetcher.rateLimit*2
        }
        throw error
    }

    let document
    try {
        document = new DOMParser().parseFromString(
            htmlResult,
            "text/html",
        )
    } catch (error) {
        throw error
    }
    // 
    // pull article info
    // 
    let articles = []
    try {
        let links = [...document.querySelectorAll("h3 a")]
        for (let each of links) {
            const title = each.innerText
            const url = getHref(each)
            const reference = {
                title,
                // discoveryMethod,
                authorNames: null,
                pdfUrl: null,
                url,
                citationId: null,
                id: null,
                citedByUrl: null,
                publisherInfo: null,
            }
            articles.push(reference)
        }
        if (links.length > 0) {
            // try to get main list
            let parent = links[0].parentElement
            while (parent && parent != document.body) {
                // found parent as soon as it captures all children
                if ([...parent.querySelectorAll("h3 a")].length == links.length) {
                    break
                }
                parent = parent.parentElement
            }
            const articlesElements = [...parent.children]
            for (let eachArticleElement of articlesElements) {
                let title
                let articleObject
                try {
                    title = eachArticleElement.querySelector("h3 a")?.innerText
                    articleObject = articles.filter(each=>each.title==title)[0]
                } catch (error) {
                    console.warn(`    error getting article title for a child element`, error)
                }
                // ignore unknown thing
                if (!articleObject) {
                    continue
                }
                
                let articleLinks = [...eachArticleElement.querySelectorAll("a")]
                for (let eachLinkElement of articleLinks) {
                    // 
                    // citationId
                    // 
                    if (eachLinkElement.innerText.startsWith("[PDF]") && eachLinkElement.innerHTML.startsWith("<span")) {
                        articleObject.pdfUrl = getHref(eachLinkElement)
                    }

                    // 
                    // citationId
                    // 
                    if (eachLinkElement.innerText.startsWith("Cited by")) {
                        articleObject.citedByUrl = getHref(eachLinkElement)
                        try {
                            let url = new URL(getHref(eachLinkElement))
                            let citationId
                            if (citationId = url.searchParams.get("cites")) {
                                articleObject.citationId = citationId
                            }
                        } catch (error) {
                            console.warn(error)
                        }
                    }
                    // 
                    // id
                    // 
                    if (eachLinkElement.innerText.match(/\bAll \d+ versions\b/)) {
                        try {
                            let url = new URL(getHref(eachLinkElement))
                            let id
                            if (id = url.searchParams.get("cluster")) {
                                articleObject.id = id
                            }
                        } catch (error) {
                            console.warn(error)
                        }
                    }
                }
                // 
                // year, authors, & publisherInfo
                // 
                try {
                    let titleElement = eachArticleElement.querySelector("h3")
                    if (titleElement) {
                        let probablyAuthorsElement = titleElement.nextElementSibling
                        if (probablyAuthorsElement && probablyAuthorsElement.innerText.match(/.+-.+-/)) {
                            // let probablyAuthorLinks = [...probablyAuthorsElement.querySelectorAll("a")]
                            let pieces = probablyAuthorsElement.innerText.split("-")
                            let source = pieces.at(-1).trim()
                            let publishInstanceInfo = pieces.at(-2)||""
                            let authorInfoString = pieces.slice(0,-2).join("-") // join is just to be defensive, should be 1 item
                            articleObject.authorNames = authorInfoString.split(",").map(each=>each.replace(/…|�/g,"").trim())
                            let year
                            // yep sadly this code will break in the year 2100
                            if (year = publishInstanceInfo.match(/\b((?:20|19)(?:\d\d))$/)) {
                                articleObject.year = year[1]-0
                            } else if (year = publishInstanceInfo.match(/, ?((?:20|19)(?:\d\d))/)) {
                                articleObject.year = year[1]-0
                            }
                            if (publishInstanceInfo) {
                                articleObject.publisherInfo = publishInstanceInfo.trim().replace(/�|…/g,"")
                                if (articleObject.publisherInfo.match(/^(20|19)\d\d$/)) {
                                    articleObject.publisherInfo = null
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.warn(`issue getting year & author`, error)
                }
                
                // 
                // citationLink
                // 
                    // no href for citation url :(
                    // try {
                    //     const citationLinkElement = [...eachArticleElement.querySelectorAll("a")].filter(each=>each.innerText=="Cite"))[0]
                    //     if (citationLinkElement) {
                    //         articleObject.citationLink = getHref(citationLinkElement)
                    //     }
                    // } catch (error) {
                    // }
                
                // 
                // related articles url
                // 
                try {
                    const linkElement = [...eachArticleElement.querySelectorAll("a")].filter(each=>each.innerText=="Related Articles")[0]
                    if (linkElement) {
                        articleObject.linkToRelatedArticles = getHref(linkElement)
                    }
                } catch (error) {
                }
                
                // 
                // citedBy
                // 
                try {
                    const linkElement = [...eachArticleElement.querySelectorAll("a")].filter(each=>each.innerText.match(/cited by (\d+)/i))[0]
                    if (linkElement) {
                        articleObject.linkToCitedBy = getHref(linkElement)
                        articleObject.citedByCount = linkElement.innerText.match(/cited by (\d+)/i)[1]-0
                    }
                } catch (error) {
                }
                
                // 
                // abstract (basically never is avaiable)
                // 
                try {
                    const abstractElement = eachArticleElement.querySelector(".gs_rs.gs_fma_s")
                    if (abstractElement) {
                        articleObject.abstract = abstractElement.innerText.trim()
                    } else {
                        // unable to get abstract cause google detects it as bot (too fast)
                        
                        // // when there is only one result, google tends to show the abstract
                        // try {
                        //     const query = articleObject.title+" "+(articleObject.authorNames||[]).join(" ")
                        //     const url = `${searchOptions.googleScholar.base}${searchOptions.googleScholar.searchStringToParams(query)}`
                        //     let htmlResult
                        //     try {
                        //         htmlResult = await fetch(new URL(url)).then(result=>result.text())
                        //     } catch (error) {
                        //         console.debug(`error when getting ${url} is:`,error)
                        //         return []
                        //     }
                        //     const document = new DOMParser().parseFromString(
                        //         htmlResult,
                        //         "text/html",
                        //     )
                        //     FileSystem.write({
                        //         path: `${debugCount++}.html`,
                        //         data: htmlResult,
                        //     })
                        //     const abstractElement = document.querySelector(".gs_rs.gs_fma_s")
                        //     console.debug(`abstractElement is:`,abstractElement)
                        //     articleObject.abstract = abstractElement.innerText.trim()
                        // } catch (error) {
                        //     console.warn(`issue getting abstract`, error)
                        // }
                    }
                    // /scholar?q=related:e4ZuT8QNQM8J:scholar.google.com/&scioq=Affordance-Based+Goal+Imagination&hl=en&as_sdt=0,44
                    // https://scholar.googleusercontent.com/scholar.bib?q=info:e4ZuT8QNQM8J:scholar.google.com/&output=citation&scisdr=ClEVMutuEMztnOqBQJ0:AFWwaeYAAAAAZ1yHWJ3RbrZHSuLGSUL_1SPMIgs&scisig=AFWwaeYAAAAAZ1yHWCl6VuL-prnamkSUfJ77dHM&scisf=4&ct=citation&cd=-1&hl=en
                } catch (error) {
                    console.warn(`issue getting abstract`, error)
                }
            }
        }
    } catch (error) {
        console.error(`Error while trying to extract links from search ${error}`)
    }
    return articles
}

export async function *chronologicalSearch(
    query, {
        timeDelay=200,
        yearRanges=[
            [1995, 1995,],
            [1996, 1996,],
            [1997, 1997,],
            [1998, 1998,],
            [1999, 1999,],
            [2000, 2000,],
            [2001, 2001,],
            [2002, 2002,],
            [2003, 2003,],
            [2004, 2004,],
            [2005, 2005,],
            [2006, 2006,],
            [2007, 2007,],
            [2008, 2008,],
            [2009, 2009,],
            [2010, 2010,],
            [2011, 2011,],
            [2012, 2012,],
            [2013, 2013,],
            [2014, 2014,],
            [2015, 2015,],
            [2016, 2016,],
            [2017, 2017,],
            [2018, 2018,],
            [2019, 2019,],
            [2020, 2020,],
            [2021, 2021,],
            [2022, 2022,],
            [2023, 2023,],
            [2024, 2024,],
            [2025, 2025,],
        ],
    }={},
) {
    const output = new Map()
    for (let [startYear, endYear] of yearRanges) {
        yield [
            [startYear, endYear],
            await this.queryToListOfResults(`https://scholar.google.com/scholar?q=${encodeURIComponent(query)}&hl=en&as_sdt=0%2C44&as_ylo=${startYear}&as_yhi=${endYear}`),
        ]
    }
}
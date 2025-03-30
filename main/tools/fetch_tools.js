export const jsonFetch = async (url, options)=>{
    const response = await fetch(url, options)
    if (response.ok) {
        const text = await response.text()
        try {
            return JSON.parse(text)
        } catch (error) {
            console.debug(`fetch couldn't parse as JSON:`,text)
        }
    } else {
        throw Error(`when fetching ${url} I got an error response: ${response.statusText}`, response)
    }
}

/**
 * @example
 * ```js
 * let cachedFetcher = createCachedFetcher({
 *     cache: {},
 *     rateLimitMilliseconds: 5000, // google is picky and defensive
 *     onUpdateCache(url) {
 *        
 *     },
 *     urlNormalizer(url) {
 *         return new URL(url)
 *     }
 * })
 * cachedFetcher.cache // Object
 * cachedFetcher.lastFetchTime // number, unix epoch
 * cachedFetcher.rateLimitMilliseconds // number, milliseconds (it can be dynamically changed)
 * ```
 */
export function createCachedFetcher({ cache={}, rateLimitMilliseconds=null, onUpdateCache=_=>0, urlNormalizer=_=>_, lastFetchTime=null, outputModifyer=result=>result.bytes() }={}) {
    async function cachedFetcher(url, options, {onUpdateCache=_=>0,}={}) {
        const cache = cachedFetcher.cache
        url = urlNormalizer(url)
        if (!cache[url]) {
            let needToWait
            if (cachedFetcher.rateLimitMilliseconds!=null) {
                if (lastFetchTime == null) {
                    lastFetchTime = new Date()
                }
                do {
                    // avoid hitting rate limit
                    const thresholdTime = cachedFetcher.lastFetchTime.getTime() + cachedFetcher.rateLimitMilliseconds
                    const now = new Date().getTime()
                    needToWait = thresholdTime - now
                    if (needToWait > 0) {
                        await new Promise(r=>setTimeout(r, needToWait))
                    }
                } while (needToWait > 0)
            }
            cachedFetcher.lastFetchTime = new Date()
            const result = await fetch(url, options)
            if (result.ok) {
                let output = await outputModifyer(result)
                if (output) {
                    cache[url] = output
                    await onUpdateCache(url)
                }
            } else {
                throw Error(`when fetching ${url} I got an error response ${result.statusText}`, result)
            }
        }
        return cache[url]
    }
    Object.assign(cachedFetcher,{
        cache,
        lastFetchTime,
        rateLimitMilliseconds,
    })
    return cachedFetcher
}

export function createCachedJsonFetcher({ cache={}, rateLimitMilliseconds=null, onUpdateCache=_=>0, urlNormalizer=_=>_, lastFetchTime=new Date(), ...args }={}) {
    return createCachedFetcher({
        cache,
        rateLimitMilliseconds,
        onUpdateCache,
        urlNormalizer,
        lastFetchTime,
        outputModifyer: result=>result.json(),
        ...args
    })
}

export function createCachedTextFetcher({ cache={}, rateLimitMilliseconds=null, onUpdateCache=_=>0, urlNormalizer=_=>_, lastFetchTime=new Date(), ...args }={}) {
    return createCachedFetcher({
        cache,
        rateLimitMilliseconds,
        onUpdateCache,
        urlNormalizer,
        lastFetchTime,
        outputModifyer: result=>result.text(),
        ...args
    })
}
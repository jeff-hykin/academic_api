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

export function createCachedJsonFetcher({ cache={}, rateLimit=null, onUpdateCache=_=>0, urlNormalizer=_=>_, lastFetchTime=new Date() }={}) {
    async function cachedFetcher(url, options, {onUpdateCache=_=>0,}={}) {
        const cache = cachedFetcher.cache
        url = urlNormalizer(url)
        if (!cache[url]) {
            let needToWait
            if (cachedFetcher.rateLimit!=null) {
                do {
                    // avoid hitting rate limit
                    const thresholdTime = cachedFetcher.lastFetchTime.getTime() + cachedFetcher.rateLimit
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
                let output = (await result.json())
                if (output instanceof Object) {
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
        rateLimit,
    })
    return cachedFetcher
}
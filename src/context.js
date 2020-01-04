import fetch from 'node-fetch';

import { formatProxy } from './utils';

const ProxyAgent = require('https-proxy-agent');

/**
 * The context for each SupcommunityScraper class.
 */
class SharedContext {
    constructor({ proxy, headers }) {
        this.fetch = fetch;
        this.agent = proxy === undefined ? undefined : new ProxyAgent(formatProxy(proxy));
        this.headers = headers;
    }

    /**
     * Sets the proxy
     * @param {string} proxy The proxy to set
     * @returns {SharedContext}
     */
    setProxy(proxy) {
        this.proxy = proxy;
        return this;
    }
}

export default SharedContext;
import fetch from 'node-fetch';
import * as ProxyAgent from 'https-proxy-agent';

import { formatProxy } from './utils';

class SharedContext {
    constructor({ proxy, headers }){
        this.fetch = fetch;
        this.agent = proxy === undefined ? undefined : new ProxyAgent(formatProxy(proxy));
        this.headers = headers;
    }

    setProxy(proxy){
        this.proxy = proxy;
    }
}

export default SharedContext;
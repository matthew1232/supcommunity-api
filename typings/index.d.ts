
declare module 'supcommunity-api' {
	import { RequestInfo, RequestInit, Response } from 'node-fetch';
	import { Agent } from 'http';

// #region Classes
	export class HttpsProxyAgent extends Agent {
		public constructor(uri: string | { protocol?: string, host?: string, hostname?: string, port?: string });
	}

	export class SharedContext {
		private constructor({ proxy, headers }: { proxy?: string, headers?: Headers })
		public agent?: HttpsProxyAgent;
		public fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
		public headers?: Headers;
		private setProxy(): SharedContext;
	}

	export class SupcommunityScraper {
		public constructor(config?: ScraperConfig);
		protected _context: SharedContext;
		public fetchLatestWeek(): Promise<string>;
		public fetchDroplistItems(url: string): Promise<Item[]>;
	}

// #endregion

// #region Typedefs

	export interface ScraperConfig {
		proxy?: string;
	}

	export interface Item {
		name?: string;
		image?: string;
		price?: string;
		description?: string;
		positiveVotes?: string;
		negativeVotes?: string;
		votePercentage?: string;
	}
}

// #endregion

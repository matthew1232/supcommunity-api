import cheerio from 'cheerio';

import SharedContext from '../context';
import { checkStatus, capitalizeString } from '../utils';

/**
 * The main Supreme Commuinity scraper class
 */
class SupcommunityScraper {
    constructor(options = {}) {
        const { proxy } = options;

        this._context = new SharedContext({
            proxy,
            headers: {
                'Host': 'www.supremecommunity.com',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36',
                'sec-fetch-user': '?1',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'navigate',
                'referer': 'https://www.supremecommunity.com/',
                'accept-language': 'en-US,en;q=0.9'
            }
        });
    }

    /**
     * Fetches the URL for the latest week on Supreme Community
     * @returns {string}
     */
    async fetchLatestWeek() {
        const { fetch } = this._context;
        const res = await fetch('https://www.supremecommunity.com/season/latest/droplists/', {
            ...this._context,
            redirect: 'follow'
        });

        await checkStatus(res);

        const body = await res.text();
        const $ = cheerio.load(body);

        const latestWeekPath = $('#box-latest').find('a[class="block"]').attr("href");

        if (latestWeekPath == "") {
            const error = new Error("No latest week found!");
            error.status = 404;
            error.body = "";

            throw error;
        };

        const latestWeek = new URL(latestWeekPath, "https://www.supremecommunity.com");
        const { href } = latestWeek;

        return href;
    }

    /**
     * Returns the item from the provided droplist URL.
     * @param {string} url The Supreme Community droplist url
     * @returns {Item[]}
     */
    async fetchDroplistItems(url) {
        const { fetch } = this._context;
        const res = await fetch(url, {
            ...this._context
        });

        await checkStatus(res);

        const body = await res.text();
        const $ = cheerio.load(body);
        const droplistArray = [];

        $('.masonry__item').each((_, element) => {
            const category = capitalizeString($(element).attr("data-masonry-filter"));

            if (category === 'Ads') return;

            const name = $(element).find('.card-details').attr('data-itemname');
            const imagePath = $(element).find('.prefill-img').attr("src");
            const price = $(element).find('.label-price').text().trim();
            const imageURL = new URL(imagePath, url).href;
            const positiveVotes = Number($(element).find('.progress-bar-success.droplist-vote-bar').text());
            const negativeVotes = Number($(element).find('.progress-bar-danger.droplist-vote-bar').text());
            const votePercentage = Math.round(100 * (positiveVotes / (positiveVotes + negativeVotes)));
            const description = $(element).find('.prefill-img').attr('alt').split('- ')[1];

            droplistArray.push({
                name,
                image: imageURL,
                price,
                description,
                positiveVotes,
                negativeVotes,
                votePercentage
            });
        });

        return droplistArray;
    }
}

export default SupcommunityScraper;

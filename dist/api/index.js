"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _cheerio = _interopRequireDefault(require("cheerio"));

var _context3 = _interopRequireDefault(require("../context"));

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var SupcommunityScraper = function () {
  function SupcommunityScraper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, SupcommunityScraper);
    var proxy = options.proxy;
    this._context = new _context3["default"]({
      proxy: proxy,
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

  (0, _createClass2["default"])(SupcommunityScraper, [{
    key: "fetchLatestWeek",
    value: function fetchLatestWeek() {
      var fetch, res, body, $, latestWeekPath, error, latestWeek, href;
      return _regenerator["default"].async(function fetchLatestWeek$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fetch = this._context.fetch;
              _context.next = 3;
              return _regenerator["default"].awrap(fetch('https://www.supremecommunity.com/season/latest/droplists/', _objectSpread({}, this._context, {
                redirect: 'follow'
              })));

            case 3:
              res = _context.sent;
              _context.next = 6;
              return _regenerator["default"].awrap((0, _utils.checkStatus)(res));

            case 6:
              _context.next = 8;
              return _regenerator["default"].awrap(res.text());

            case 8:
              body = _context.sent;
              $ = _cheerio["default"].load(body);
              latestWeekPath = $('#box-latest').find('a[class="block"]').attr("href");

              if (!(latestWeekPath == "")) {
                _context.next = 16;
                break;
              }

              error = new Error("No latest week found!");
              error.status = 404;
              error.body = "";
              throw error;

            case 16:
              ;
              latestWeek = new URL(latestWeekPath, "https://www.supremecommunity.com");
              href = latestWeek.href;
              return _context.abrupt("return", href);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "fetchDroplistItems",
    value: function fetchDroplistItems(url) {
      var fetch, res, body, $, droplistArray;
      return _regenerator["default"].async(function fetchDroplistItems$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              fetch = this._context.fetch;
              _context2.next = 3;
              return _regenerator["default"].awrap(fetch(url, _objectSpread({}, this._context)));

            case 3:
              res = _context2.sent;
              _context2.next = 6;
              return _regenerator["default"].awrap((0, _utils.checkStatus)(res));

            case 6:
              _context2.next = 8;
              return _regenerator["default"].awrap(res.text());

            case 8:
              body = _context2.sent;
              $ = _cheerio["default"].load(body);
              droplistArray = [];
              $('.masonry__item').each(function (_, element) {
                var category = (0, _utils.capitalizeString)($(element).attr("data-masonry-filter"));
                if (category === 'Ads') return;
                var name = $(element).find('.card-details').attr('data-itemname');
                var imagePath = $(element).find('.prefill-img').attr("src");
                var price = $(element).find('.label-price').text().trim();
                var imageURL = new URL(imagePath, url).href;
                var positiveVotes = Number($(element).find('.progress-bar-success.droplist-vote-bar').text());
                var negativeVotes = Number($(element).find('.progress-bar-danger.droplist-vote-bar').text());
                var votePercentage = Math.round(100 * (positiveVotes / (positiveVotes + negativeVotes)));
                var description = $(element).find('.prefill-img').attr('alt').split('- ')[1];
                droplistArray.push({
                  name: name,
                  image: imageURL,
                  price: price,
                  description: description,
                  positiveVotes: positiveVotes,
                  negativeVotes: negativeVotes,
                  votePercentage: votePercentage
                });
              });
              return _context2.abrupt("return", droplistArray);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);
  return SupcommunityScraper;
}();

var _default = SupcommunityScraper;
exports["default"] = _default;
/**
 * Backlinks Generator Data & Directory Profiles
 * Merging authoritative high-DA submission targets from WebDigitalMantra and OVDSS
 * Generates 150+ high-DA backlinks across SEO Indexers, Business Directories, Valuation Tools,
 * WHOIS Analyzers, Web Archives, and Indian B2B Platforms.
 */

export interface BacklinkPlatform {
  id: number;
  name: string;
  category: 'SEO Analyzers' | 'Directories' | 'Domain Valuation' | 'WHOIS & DNS' | 'Archives & Social' | 'Indian B2B';
  estimatedDA: number;
  urlTemplate: string;
  dofollow: boolean;
  description: string;
}

export const BACKLINK_PLATFORMS: BacklinkPlatform[] = [
  // 1-30: Top Tier SEO & Traffic Analyzers
  { id: 1, name: 'SEMrush Info', category: 'SEO Analyzers', estimatedDA: 93, urlTemplate: 'https://www.semrush.com/info/{host}', dofollow: true, description: 'Domain overview & organic search competitor profile' },
  { id: 2, name: 'BuiltWith Technology Profile', category: 'SEO Analyzers', estimatedDA: 91, urlTemplate: 'https://builtwith.com/{host}', dofollow: true, description: 'Software stack, CDN, hosting & analytics discovery' },
  { id: 3, name: 'Woorank SEO Audit', category: 'SEO Analyzers', estimatedDA: 88, urlTemplate: 'https://www.woorank.com/en/www/{host}', dofollow: true, description: 'Website review, structured data & mobile audit profile' },
  { id: 4, name: 'SimilarSites Matcher', category: 'SEO Analyzers', estimatedDA: 84, urlTemplate: 'http://www.similarsites.com/site/{host}', dofollow: true, description: 'Audience interest & competitive niche mapping' },
  { id: 5, name: 'W3Techs Web Technology', category: 'SEO Analyzers', estimatedDA: 89, urlTemplate: 'https://w3techs.com/sites/info/{host}', dofollow: true, description: 'Web tech survey & market share indexing' },
  { id: 6, name: 'SpyFu Domain Overview', category: 'SEO Analyzers', estimatedDA: 86, urlTemplate: 'https://www.spyfu.com/overview/domain?query={host}', dofollow: true, description: 'Keyword rank history and competitor research' },
  { id: 7, name: 'SEOptimer Live Audit', category: 'SEO Analyzers', estimatedDA: 82, urlTemplate: 'https://www.seoptimer.com/{host}', dofollow: true, description: 'On-page SEO, social signals and technical health' },
  { id: 8, name: 'Netcraft Site Report', category: 'SEO Analyzers', estimatedDA: 87, urlTemplate: 'http://toolbar.netcraft.com/site_report?url={host}', dofollow: true, description: 'Web server security, netblock & SSL provider index' },
  { id: 9, name: 'SiteDossier Crawler', category: 'SEO Analyzers', estimatedDA: 76, urlTemplate: 'http://www.sitedossier.com/site/{host}', dofollow: true, description: 'Parent domains, subdomains & reverse IP lookups' },
  { id: 10, name: 'Quantcast Audience Profile', category: 'SEO Analyzers', estimatedDA: 88, urlTemplate: 'https://www.quantcast.com/{host}', dofollow: true, description: 'Traffic demographic & reach estimation' },
  { id: 11, name: 'SERPAnalytics Competitor Hub', category: 'SEO Analyzers', estimatedDA: 75, urlTemplate: 'http://www.serpanalytics.com/#competitor/{host}/summary//1', dofollow: true, description: 'SERP tracking & ranking history' },
  { id: 12, name: 'ScamAnalyze Reputation Check', category: 'SEO Analyzers', estimatedDA: 78, urlTemplate: 'http://scamanalyze.com/check/{host}.html', dofollow: true, description: 'Safety verification, trust index & blacklist check' },
  { id: 13, name: 'BE1.ru SEO Metrics', category: 'SEO Analyzers', estimatedDA: 79, urlTemplate: 'https://be1.ru/stat/{host}', dofollow: true, description: 'Multi-engine indexing & site performance diagnostics' },
  { id: 14, name: 'PR-CY Audit Engine', category: 'SEO Analyzers', estimatedDA: 80, urlTemplate: 'https://a.pr-cy.ru/{host}/', dofollow: true, description: 'PageRank assessment, backlink indicators & speed' },
  { id: 15, name: 'MyWOT Security Scorecard', category: 'SEO Analyzers', estimatedDA: 90, urlTemplate: 'https://mywot.com/en/scorecard/{host}', dofollow: true, description: 'Web of Trust safety rating and community consensus' },
  { id: 16, name: 'RBLs Blacklist & IP Checker', category: 'SEO Analyzers', estimatedDA: 74, urlTemplate: 'https://www.rbls.org/{host}', dofollow: true, description: 'Real-time blacklist monitor & MX record checks' },
  { id: 17, name: 'InfoSiteShow Directory', category: 'SEO Analyzers', estimatedDA: 72, urlTemplate: 'http://www.infositeshow.com/sites/{host}', dofollow: true, description: 'SEO profile and backlink overview' },
  { id: 18, name: 'Crawler Web Search', category: 'SEO Analyzers', estimatedDA: 71, urlTemplate: 'http://ranking.crawler.com/SiteInfo.aspx?url={host}/', dofollow: true, description: 'Deep crawl indexer and link tracking' },
  { id: 19, name: 'Ranking WebSearch Info', category: 'SEO Analyzers', estimatedDA: 70, urlTemplate: 'http://ranking.websearch.com/siteinfo.aspx?url={host}', dofollow: true, description: 'Web crawler search visibility record' },
  { id: 20, name: 'WebHorde Index', category: 'SEO Analyzers', estimatedDA: 69, urlTemplate: 'http://web.horde.to/{host}', dofollow: true, description: 'Traffic metrics & metadata archive' },
  { id: 21, name: 'HQIndex Quality Registry', category: 'SEO Analyzers', estimatedDA: 73, urlTemplate: 'https://hqindex.org/{host}', dofollow: true, description: 'Domain quality evaluation and trust index' },
  { id: 22, name: 'SiteRanker Metric Page', category: 'SEO Analyzers', estimatedDA: 74, urlTemplate: 'http://siteranker.com/SiteInfo.aspx?url={host}/&E=1', dofollow: true, description: 'Global traffic rank and backlink volume check' },
  { id: 23, name: '500v Net Indexer', category: 'SEO Analyzers', estimatedDA: 68, urlTemplate: 'http://500v.net/site/{host}/', dofollow: true, description: 'Global website directory & link reference' },
  { id: 24, name: 'SiteCheck Safe Browsing', category: 'SEO Analyzers', estimatedDA: 85, urlTemplate: 'https://sitecheck.sucuri.net/results/{host}', dofollow: true, description: 'Malware and vulnerability scanner profile' },
  { id: 25, name: 'YellowPipe Web Crawler', category: 'SEO Analyzers', estimatedDA: 77, urlTemplate: 'https://www.yellowpipe.com/yis/tools/lynx/lynx_viewer.php?url={url}', dofollow: true, description: 'Text-mode crawler simulation and indexing preview' },

  // 26-55: Domain Valuation, Traffic & Worth Analyzers
  { id: 26, name: 'WorthOfWeb Valuation', category: 'Domain Valuation', estimatedDA: 83, urlTemplate: 'https://www.worthofweb.com/website-value/{host}/', dofollow: true, description: 'Domain market appraisal and estimated advertising revenue' },
  { id: 27, name: 'SitePrice Calculator', category: 'Domain Valuation', estimatedDA: 79, urlTemplate: 'http://www.siteprice.org/website-worth/{host}', dofollow: true, description: 'Commercial asset valuation and traffic multiplier' },
  { id: 28, name: 'SiteWorthTraffic Metric', category: 'Domain Valuation', estimatedDA: 80, urlTemplate: 'http://www.siteworthtraffic.com/report/{host}', dofollow: true, description: 'Daily pageviews, CPM estimate and site worth report' },
  { id: 29, name: 'StatShow Commercial Value', category: 'Domain Valuation', estimatedDA: 77, urlTemplate: 'http://www.statshow.com/www/{host}/', dofollow: true, description: 'Server location, safety rating and value estimate' },
  { id: 30, name: 'HypeStat Comprehensive Audit', category: 'Domain Valuation', estimatedDA: 82, urlTemplate: 'http://{host}.hypestat.com/', dofollow: true, description: 'DNS servers, daily unique visitors and revenue stats' },
  { id: 31, name: 'StatsCrop Web Appraisal', category: 'Domain Valuation', estimatedDA: 78, urlTemplate: 'http://www.statscrop.com/www/{host}', dofollow: true, description: 'Comprehensive SEO score, visitor geography and valuation' },
  { id: 32, name: 'Website Informer', category: 'Domain Valuation', estimatedDA: 86, urlTemplate: 'http://website.informer.com/{host}', dofollow: true, description: 'Subdomain index, main keywords and web technology overview' },
  { id: 33, name: 'WebWiki Community Review', category: 'Domain Valuation', estimatedDA: 81, urlTemplate: 'https://www.webwiki.de/{host}', dofollow: true, description: 'Community review, screenshots and business trust scoring' },
  { id: 34, name: 'SimilarTo.us Discovery', category: 'Domain Valuation', estimatedDA: 71, urlTemplate: 'https://similarto.us/{host}/', dofollow: true, description: 'Niche competitor discovery and traffic cluster profile' },
  { id: 35, name: 'WebsiteDown Uptime Tracker', category: 'Domain Valuation', estimatedDA: 73, urlTemplate: 'http://www.websitedown.info/{host}', dofollow: true, description: 'DNS resolution status and global latency ping log' },
  { id: 36, name: 'URLVoid Safety Scanner', category: 'Domain Valuation', estimatedDA: 85, urlTemplate: 'https://www.urlvoid.com/scan/{host}/', dofollow: true, description: 'Domain reputation analysis with 30+ blacklists' },
  { id: 37, name: 'CuteStat Domain Stats', category: 'Domain Valuation', estimatedDA: 79, urlTemplate: 'https://cutestat.com/{host}', dofollow: true, description: 'Domain ranking, social mentions and estimated traffic' },
  { id: 38, name: 'EasyCounter Web Stats', category: 'Domain Valuation', estimatedDA: 76, urlTemplate: 'https://www.easycounter.com/report/{host}', dofollow: true, description: 'Visitor counter, server metrics and IP network' },
  { id: 39, name: 'SiteIndices Report', category: 'Domain Valuation', estimatedDA: 74, urlTemplate: 'https://siteindices.com/{host}', dofollow: true, description: 'Index ranking, organic search keywords and valuation' },
  { id: 40, name: 'Webstatsdomain Analysis', category: 'Domain Valuation', estimatedDA: 72, urlTemplate: 'https://webstatsdomain.org/{host}', dofollow: true, description: 'Keyword footprint and server IP geographical stats' },

  // 41-75: WHOIS, DNS & Network Intelligence
  { id: 41, name: 'DomainTools WHOIS Lookup', category: 'WHOIS & DNS', estimatedDA: 92, urlTemplate: 'http://whois.domaintools.com/{host}', dofollow: true, description: 'Authoritative registrar records, nameservers & domain history' },
  { id: 42, name: 'Whois.com Profile', category: 'WHOIS & DNS', estimatedDA: 90, urlTemplate: 'https://www.whois.com/whois/{host}', dofollow: true, description: 'Registration records, IP address and DNS details' },
  { id: 43, name: 'Who.is Global Registry', category: 'WHOIS & DNS', estimatedDA: 89, urlTemplate: 'http://www.who.is/whois/{host}/', dofollow: true, description: 'Raw WHOIS query, nameserver resolution and web records' },
  { id: 44, name: 'Robtex DNS Swiss Army Knife', category: 'WHOIS & DNS', estimatedDA: 85, urlTemplate: 'http://www.robtex.com/dns/{host}.html', dofollow: true, description: 'Reverse DNS, IP graphs, routing paths and BGP AS info' },
  { id: 45, name: 'DNSWhois Record Index', category: 'WHOIS & DNS', estimatedDA: 75, urlTemplate: 'https://www.dnswhois.info/{host}', dofollow: true, description: 'A, MX, CNAME and TXT record verification profile' },
  { id: 46, name: 'Whois.de German Registry Hub', category: 'WHOIS & DNS', estimatedDA: 79, urlTemplate: 'https://whois.de/{host}', dofollow: true, description: 'European whois query and DNS route trace' },
  { id: 47, name: 'DomainWhoisInfo', category: 'WHOIS & DNS', estimatedDA: 73, urlTemplate: 'http://www.domainwhoisinfo.com/{host}', dofollow: true, description: 'Domain expiration and nameserver lookup index' },
  { id: 48, name: 'ViewWhois Registry', category: 'WHOIS & DNS', estimatedDA: 71, urlTemplate: 'http://www.viewwhois.com/{host}/', dofollow: true, description: 'Domain ownership history and SSL validity check' },
  { id: 49, name: 'WhoisLookupDB Directory', category: 'WHOIS & DNS', estimatedDA: 70, urlTemplate: 'https://whoislookupdb.com/whois-{host}', dofollow: true, description: 'Nameserver verification and IP geolocation records' },
  { id: 50, name: 'Phurix UK WHOIS', category: 'WHOIS & DNS', estimatedDA: 68, urlTemplate: 'http://whois.phurix.co.uk/{host}/', dofollow: true, description: 'Public DNS record lookup and server route trace' },
  { id: 51, name: 'DNSlytics Domain Audit', category: 'WHOIS & DNS', estimatedDA: 81, urlTemplate: 'https://dnslytics.com/domain/{host}', dofollow: true, description: 'Reverse IP, shared hosting neighbors and mail servers' },
  { id: 52, name: 'SecurityTrails DNS History', category: 'WHOIS & DNS', estimatedDA: 87, urlTemplate: 'https://securitytrails.com/domain/{host}/dns', dofollow: true, description: 'Historical DNS, subdomains and IP changes' },
  { id: 53, name: 'MXToolbox Domain Health', category: 'WHOIS & DNS', estimatedDA: 88, urlTemplate: 'https://mxtoolbox.com/SuperTool.aspx?action=mx%3a{host}&run=toolpage', dofollow: true, description: 'Mail server lookup, SPF, DKIM and DMARC verification' },
  { id: 54, name: 'IPLocation Network Finder', category: 'WHOIS & DNS', estimatedDA: 84, urlTemplate: 'https://www.iplocation.net/ip-lookup?query={host}', dofollow: true, description: 'IP geolocation, ASN and internet service provider details' },
  { id: 55, name: 'IntoDNS Configuration Audit', category: 'WHOIS & DNS', estimatedDA: 83, urlTemplate: 'https://intodns.com/{host}', dofollow: true, description: 'DNS health, parent zone NS records and SOA checks' },

  // 76-105: Web Directories & Business Profiles
  { id: 56, name: 'AboutUs Open Community', category: 'Directories', estimatedDA: 87, urlTemplate: 'https://aboutus.org/{host}', dofollow: true, description: 'Wiki-style business profile, description and contact links' },
  { id: 57, name: 'StartupRanking Directory', category: 'Directories', estimatedDA: 82, urlTemplate: 'https://www.startupranking.com/search/{host}', dofollow: true, description: 'Startup global ranking and SR score benchmark' },
  { id: 58, name: 'Folkd Social Bookmarking', category: 'Directories', estimatedDA: 80, urlTemplate: 'http://www.folkd.com/detail/{host}', dofollow: true, description: 'Social bookmarking link submission and tag curation' },
  { id: 59, name: 'AddToAny Social Aggregator', category: 'Directories', estimatedDA: 90, urlTemplate: 'https://www.addtoany.com/share/?linkname=&linkurl={url}', dofollow: true, description: 'Global sharing network and social ping distribution' },
  { id: 60, name: 'FeedBurner Ping Hub', category: 'Directories', estimatedDA: 92, urlTemplate: 'https://feedburner.google.com/fb/a/ping?url={url}', dofollow: true, description: 'Google RSS and content syndication crawler ping' },
  { id: 61, name: 'Pingler Rapid Indexer', category: 'Directories', estimatedDA: 77, urlTemplate: 'https://pingler.com/?url={url}', dofollow: true, description: 'Multi-service search engine ping and feed notifier' },
  { id: 62, name: 'Ping-o-Matic Indexer', category: 'Directories', estimatedDA: 83, urlTemplate: 'https://pingomatic.com/ping/?title={host}&blogurl={url}', dofollow: true, description: 'Notifies major search engines that your content is updated' },
  { id: 63, name: 'SitesLikely Community', category: 'Directories', estimatedDA: 75, urlTemplate: 'https://siteslikely.com/site/{host}', dofollow: true, description: 'Directory categorisation and user recommendation' },
  { id: 64, name: 'TopAlternative Search', category: 'Directories', estimatedDA: 76, urlTemplate: 'https://topalternative.org/site/{host}', dofollow: true, description: 'Software and business alternative directory profile' },
  { id: 65, name: 'FeedShark Submission', category: 'Directories', estimatedDA: 74, urlTemplate: 'https://feedshark.brainbliss.com/?url={url}', dofollow: true, description: 'Submits URL to 60+ blog and website search engines' },

  // 106-125: Archives, Content Crawlers & Social Anchors
  { id: 66, name: 'Wayback Machine Archive', category: 'Archives & Social', estimatedDA: 99, urlTemplate: 'https://web.archive.org/web/*/{url}', dofollow: true, description: 'Permanent digital preservation by the Internet Archive' },
  { id: 67, name: 'Archive.today Snapshot', category: 'Archives & Social', estimatedDA: 94, urlTemplate: 'https://archive.is/?run=1&url={url}', dofollow: true, description: 'On-demand web page snapshot and historical anchor' },
  { id: 68, name: 'Google Cache Viewer', category: 'Archives & Social', estimatedDA: 98, urlTemplate: 'https://webcache.googleusercontent.com/search?q=cache:{url}', dofollow: true, description: 'Google search crawler indexed text and snapshot view' },
  { id: 69, name: 'Reddit Domain Discussion', category: 'Archives & Social', estimatedDA: 97, urlTemplate: 'https://www.reddit.com/domain/{host}/', dofollow: true, description: 'Subreddit submissions and community conversation tracker' },
  { id: 70, name: 'Hacker News Submission Search', category: 'Archives & Social', estimatedDA: 93, urlTemplate: 'https://news.ycombinator.com/from?site={host}', dofollow: true, description: 'Y Combinator HN domain submissions and discussions' },
  { id: 71, name: 'Pinterest Domain Pinboard', category: 'Archives & Social', estimatedDA: 96, urlTemplate: 'https://www.pinterest.com/source/{host}/', dofollow: true, description: 'Visual bookmarking and rich pin index' },
  { id: 72, name: 'LinkedIn Company Search', category: 'Archives & Social', estimatedDA: 98, urlTemplate: 'https://www.linkedin.com/search/results/companies/?keywords={host}', dofollow: true, description: 'B2B professional corporate presence search' },
  { id: 73, name: 'Twitter/X Domain Tracker', category: 'Archives & Social', estimatedDA: 95, urlTemplate: 'https://twitter.com/search?q={host}', dofollow: true, description: 'Real-time social mentions, links and viral coverage' },
  { id: 74, name: 'Facebook Share Debugger', category: 'Archives & Social', estimatedDA: 97, urlTemplate: 'https://developers.facebook.com/tools/debug/?q={url}', dofollow: true, description: 'Open Graph meta tags and link preview refresher' },
  { id: 75, name: 'Telegram Web Share', category: 'Archives & Social', estimatedDA: 93, urlTemplate: 'https://t.me/share/url?url={url}&text={host}', dofollow: true, description: 'Instant messaging channel share link anchor' },

  // 76-110: Indian B2B, Regional & Commerce Directories
  { id: 76, name: 'IndiaMART Directory Hub', category: 'Indian B2B', estimatedDA: 91, urlTemplate: 'https://dir.indiamart.com/search.mp?ss={host}', dofollow: true, description: 'India’s largest online B2B marketplace and supplier index' },
  { id: 77, name: 'Justdial Business Search', category: 'Indian B2B', estimatedDA: 88, urlTemplate: 'https://www.justdial.com/All-Cities/{host}', dofollow: true, description: 'Local search engine for Indian services, products and stores' },
  { id: 78, name: 'TradeIndia Exporters Hub', category: 'Indian B2B', estimatedDA: 86, urlTemplate: 'https://www.tradeindia.com/search.html?keyword={host}', dofollow: true, description: 'Indian and global manufacturers, suppliers and buyers directory' },
  { id: 79, name: 'Zauba Corp MCA Directory', category: 'Indian B2B', estimatedDA: 83, urlTemplate: 'https://www.zaubacorp.com/companysearchresults/{host}', dofollow: true, description: 'Ministry of Corporate Affairs company registration and CIN lookups' },
  { id: 80, name: 'Tofler Company Insight', category: 'Indian B2B', estimatedDA: 78, urlTemplate: 'https://www.tofler.in/search?q={host}', dofollow: true, description: 'Business intelligence and ROC filing records for Indian companies' },
  { id: 81, name: 'InstaFinancials Corporate Profile', category: 'Indian B2B', estimatedDA: 76, urlTemplate: 'https://www.instafinancials.com/company-search?q={host}', dofollow: true, description: 'Corporate directors, credit ratings and compliance records' },
  { id: 82, name: 'Sulekha Yellow Pages', category: 'Indian B2B', estimatedDA: 84, urlTemplate: 'https://www.sulekha.com/search/{host}', dofollow: true, description: 'Indian local service provider directory and consumer reviews' },
  { id: 83, name: 'Vink Odisha Directory', category: 'Indian B2B', estimatedDA: 71, urlTemplate: 'https://odisha.directory/search?query={host}', dofollow: true, description: 'Bhubaneswar, Cuttack & Odisha local enterprise registry' },
  { id: 84, name: 'Bizzduniya Indian Suppliers', category: 'Indian B2B', estimatedDA: 74, urlTemplate: 'https://bizzduniya.com/search?keyword={host}', dofollow: true, description: 'Indian manufacturers and verified wholesale exporter network' },
  { id: 85, name: 'Connect2India Trade Portal', category: 'Indian B2B', estimatedDA: 77, urlTemplate: 'https://connect2india.com/global/search/{host}', dofollow: true, description: 'Global trade promotion platform for Indian micro and SME businesses' },

  // 86-155: Additional High-Authority Global Directories, Web 2.0 & Ping Targets
  { id: 86, name: 'Bing Webmaster Indexer', category: 'SEO Analyzers', estimatedDA: 96, urlTemplate: 'https://www.bing.com/search?q=site%3A{host}', dofollow: true, description: 'Bing and Yahoo search engine index coverage check' },
  { id: 87, name: 'Yandex Webmaster Search', category: 'SEO Analyzers', estimatedDA: 94, urlTemplate: 'https://yandex.com/search/?text=site%3A{host}', dofollow: true, description: 'Yandex crawler visibility and regional index status' },
  { id: 88, name: 'DuckDuckGo Privacy Index', category: 'SEO Analyzers', estimatedDA: 95, urlTemplate: 'https://duckduckgo.com/?q=site%3A{host}', dofollow: true, description: 'Private tracker-free organic search listing' },
  { id: 89, name: 'Ecosia Green Search', category: 'SEO Analyzers', estimatedDA: 91, urlTemplate: 'https://www.ecosia.org/search?q=site%3A{host}', dofollow: true, description: 'Eco-conscious search engine query verification' },
  { id: 90, name: 'Qwant European Search', category: 'SEO Analyzers', estimatedDA: 88, urlTemplate: 'https://www.qwant.com/?q=site%3A{host}', dofollow: true, description: 'European GDPR-compliant search engine directory' },
  { id: 91, name: 'Google Mobile-Friendly Test', category: 'SEO Analyzers', estimatedDA: 98, urlTemplate: 'https://search.google.com/test/mobile-friendly?url={url}', dofollow: true, description: 'Google search console official mobile responsiveness test' },
  { id: 92, name: 'PageSpeed Insights Live', category: 'SEO Analyzers', estimatedDA: 98, urlTemplate: 'https://pagespeed.web.dev/analysis?url={url}', dofollow: true, description: 'Official Core Web Vitals (LCP, INP, CLS) assessment' },
  { id: 93, name: 'Google Rich Results Test', category: 'SEO Analyzers', estimatedDA: 98, urlTemplate: 'https://search.google.com/test/rich-results?url={url}', dofollow: true, description: 'Schema.org JSON-LD structured data validation' },
  { id: 94, name: 'W3C HTML Markup Validator', category: 'SEO Analyzers', estimatedDA: 97, urlTemplate: 'https://validator.w3.org/nu/?doc={url}', dofollow: true, description: 'Official HTML5 markup and semantic syntax validator' },
  { id: 95, name: 'W3C CSS Style Validator', category: 'SEO Analyzers', estimatedDA: 97, urlTemplate: 'https://jigsaw.w3.org/css-validator/validator?uri={url}', dofollow: true, description: 'Cascading Style Sheets standard compliance checker' },
  { id: 96, name: 'SSL Labs Server Test', category: 'WHOIS & DNS', estimatedDA: 94, urlTemplate: 'https://www.ssllabs.com/ssltest/analyze.html?d={host}', dofollow: true, description: 'Deep analysis of the TLS/SSL web server configuration' },
  { id: 97, name: 'SecurityHeaders.com Audit', category: 'WHOIS & DNS', estimatedDA: 89, urlTemplate: 'https://securityheaders.com/?q={host}&followRedirects=on', dofollow: true, description: 'HTTP response headers security rating (CSP, HSTS)' },
  { id: 98, name: 'Mozilla Observatory', category: 'WHOIS & DNS', estimatedDA: 95, urlTemplate: 'https://observatory.mozilla.org/analyze/{host}', dofollow: true, description: 'Mozilla developer foundation security standards audit' },
  { id: 99, name: 'Shodan Computer Search', category: 'WHOIS & DNS', estimatedDA: 91, urlTemplate: 'https://www.shodan.io/search?query=hostname%3A{host}', dofollow: true, description: 'Internet-connected devices and exposed web port audit' },
  { id: 100, name: 'Censys Attack Surface', category: 'WHOIS & DNS', estimatedDA: 89, urlTemplate: 'https://search.censys.io/hosts?q={host}', dofollow: true, description: 'Public cloud certificate and network perimeter discovery' },
  { id: 101, name: 'Brave Search Engine', category: 'SEO Analyzers', estimatedDA: 92, urlTemplate: 'https://search.brave.com/search?q=site%3A{host}', dofollow: true, description: 'Independent privacy-focused web index' },
  { id: 102, name: 'Startpage Private Search', category: 'SEO Analyzers', estimatedDA: 89, urlTemplate: 'https://www.startpage.com/sp/search?query=site%3A{host}', dofollow: true, description: 'Enhanced Google results with complete privacy protection' },
  { id: 103, name: 'Baidu Chinese Search', category: 'SEO Analyzers', estimatedDA: 96, urlTemplate: 'https://www.baidu.com/s?wd=site%3A{host}', dofollow: true, description: 'China’s primary search engine index query' },
  { id: 104, name: 'Naver Korean Search', category: 'SEO Analyzers', estimatedDA: 94, urlTemplate: 'https://search.naver.com/search.naver?query=site%3A{host}', dofollow: true, description: 'South Korea’s leading web portal and search engine' },
  { id: 105, name: 'Yahoo Web Search', category: 'SEO Analyzers', estimatedDA: 97, urlTemplate: 'https://search.yahoo.com/search?p=site%3A{host}', dofollow: true, description: 'Yahoo directory and search index record' },
  { id: 106, name: 'Ask.com Search Registry', category: 'Directories', estimatedDA: 91, urlTemplate: 'https://www.ask.com/web?q=site%3A{host}', dofollow: true, description: 'Q&A knowledge base and legacy search engine' },
  { id: 107, name: 'AOL Search Hub', category: 'Directories', estimatedDA: 93, urlTemplate: 'https://search.aol.com/aol/search?q=site%3A{host}', dofollow: true, description: 'Global web index and news directory portal' },
  { id: 108, name: 'Lycos Web Search', category: 'Directories', estimatedDA: 87, urlTemplate: 'https://search.lycos.com/web/?q=site%3A{host}', dofollow: true, description: 'Pioneer Internet directory and search portal' },
  { id: 109, name: 'Exalead Search Engine', category: 'Directories', estimatedDA: 81, urlTemplate: 'https://www.exalead.com/search/web/results/?q=site%3A{host}', dofollow: true, description: 'Semantic search engine and enterprise directory' },
  { id: 110, name: 'Gigablast Open Source Index', category: 'Directories', estimatedDA: 79, urlTemplate: 'https://www.gigablast.com/search?q=site%3A{host}', dofollow: true, description: 'Independent real-time web crawler and index' },
  { id: 111, name: 'WebCrawler Discovery', category: 'Directories', estimatedDA: 83, urlTemplate: 'https://www.webcrawler.com/serp?q=site%3A{host}', dofollow: true, description: 'Metasearch engine blending top search indexes' },
  { id: 112, name: 'Metacrawler Query Hub', category: 'Directories', estimatedDA: 80, urlTemplate: 'https://www.metacrawler.com/serp?q=site%3A{host}', dofollow: true, description: 'Aggregated meta-search results across multiple platforms' },
  { id: 113, name: 'Mojeek Alternative Search', category: 'Directories', estimatedDA: 78, urlTemplate: 'https://www.mojeek.com/search?q=site%3A{host}', dofollow: true, description: 'UK-based independent crawler with its own index' },
  { id: 114, name: 'Swisscows Family Search', category: 'Directories', estimatedDA: 82, urlTemplate: 'https://swisscows.com/web?query=site%3A{host}', dofollow: true, description: 'Swiss privacy-centric semantic answer engine' },
  { id: 115, name: 'Search Encrypt Engine', category: 'Directories', estimatedDA: 76, urlTemplate: 'https://www.searchencrypt.com/search/?q=site%3A{host}', dofollow: true, description: 'Encrypted search gateway and query indexer' },
  { id: 116, name: 'SitePing Realtime Notification', category: 'Directories', estimatedDA: 73, urlTemplate: 'https://siteping.com/ping?url={url}', dofollow: true, description: 'Pings 40+ blog directories and syndication bots' },
  { id: 117, name: 'PingMyURL Submission Tool', category: 'Directories', estimatedDA: 72, urlTemplate: 'https://www.pingmyurl.com/index.php?url={url}', dofollow: true, description: 'Automated rapid index submission to web search engines' },
  { id: 118, name: 'TotalPing Broadcast', category: 'Directories', estimatedDA: 70, urlTemplate: 'https://totalping.com/?url={url}', dofollow: true, description: 'Broadcaster sending XML-RPC pingbacks to search portals' },
  { id: 119, name: 'BulkLink Indexer', category: 'Directories', estimatedDA: 69, urlTemplate: 'https://www.bulklink.org/?url={url}', dofollow: true, description: 'Bulk link ping tool notifying global web crawlers' },
  { id: 120, name: 'FreeBacklinkTool Registry', category: 'Directories', estimatedDA: 71, urlTemplate: 'https://freebacklinktool.com/submit?url={url}', dofollow: true, description: 'Directory submission engine for high-traffic sites' },
  { id: 121, name: 'WebLinkDirectory Portal', category: 'Directories', estimatedDA: 74, urlTemplate: 'https://weblinkdirectory.org/search?q={host}', dofollow: true, description: 'Categorized human-edited niche business directory' },
  { id: 122, name: 'OpenDirectoryProject Archive', category: 'Directories', estimatedDA: 86, urlTemplate: 'https://dmoz-odp.org/search?q={host}', dofollow: true, description: 'Curated historical DMOZ open directory mirror' },
  { id: 123, name: 'Jayde B2B Directory', category: 'Directories', estimatedDA: 77, urlTemplate: 'https://www.jayde.com/search?q={host}', dofollow: true, description: 'B2B search engine and manufacturer directory' },
  { id: 124, name: 'BestOfTheWeb BOTW Search', category: 'Directories', estimatedDA: 85, urlTemplate: 'https://botw.org/search/{host}', dofollow: true, description: 'Premium web directory establishing trust & authority' },
  { id: 125, name: 'Spoke Business Registry', category: 'Directories', estimatedDA: 80, urlTemplate: 'https://www.spoke.com/search?q={host}', dofollow: true, description: 'Executive profiles, company contacts and corporate links' },
  { id: 126, name: 'Clutch.co Verified Directory', category: 'Indian B2B', estimatedDA: 90, urlTemplate: 'https://clutch.co/search?query={host}', dofollow: true, description: 'B2B ratings, client case study reviews and agency listings' },
  { id: 127, name: 'GoodFirms Agency Index', category: 'Indian B2B', estimatedDA: 87, urlTemplate: 'https://www.goodfirms.co/search?query={host}', dofollow: true, description: 'Top software and digital marketing agencies registry' },
  { id: 128, name: 'G2 Software Review Hub', category: 'Indian B2B', estimatedDA: 93, urlTemplate: 'https://www.g2.com/search?query={host}', dofollow: true, description: 'Business software, SaaS reviews and market positioning grid' },
  { id: 129, name: 'Capterra Vendor Discovery', category: 'Indian B2B', estimatedDA: 92, urlTemplate: 'https://www.capterra.com/search/?query={host}', dofollow: true, description: 'Buyer reviews, product features and verified vendor profiles' },
  { id: 130, name: 'Trustpilot Business Review', category: 'Indian B2B', estimatedDA: 94, urlTemplate: 'https://www.trustpilot.com/search?query={host}', dofollow: true, description: 'Global consumer feedback, TrustScore and transparency badges' },
  { id: 131, name: 'Sitejabber Consumer Reviews', category: 'Indian B2B', estimatedDA: 86, urlTemplate: 'https://www.sitejabber.com/search?q={host}', dofollow: true, description: 'Customer ratings and business legitimacy assessment' },
  { id: 132, name: 'MouthShut Indian Review Hub', category: 'Indian B2B', estimatedDA: 82, urlTemplate: 'https://www.mouthshut.com/search/prods.php?type=common&s={host}', dofollow: true, description: 'India’s most prominent consumer review and ratings platform' },
  { id: 133, name: 'ProductHunt Tech Launch', category: 'Archives & Social', estimatedDA: 92, urlTemplate: 'https://www.producthunt.com/search?q={host}', dofollow: true, description: 'Product launchpad for technology startups and digital creators' },
  { id: 134, name: 'Crunchbase Enterprise Profile', category: 'Archives & Social', estimatedDA: 93, urlTemplate: 'https://www.crunchbase.com/textsearch?q={host}', dofollow: true, description: 'Funding rounds, founders, leadership and corporate intelligence' },
  { id: 135, name: 'PitchBook Private Capital', category: 'Archives & Social', estimatedDA: 89, urlTemplate: 'https://pitchbook.com/profiles/search?q={host}', dofollow: true, description: 'Private market, venture capital and M&A data profile' },
  { id: 136, name: 'ZoomInfo Enterprise Lookup', category: 'Archives & Social', estimatedDA: 91, urlTemplate: 'https://www.zoominfo.com/companies-search/{host}', dofollow: true, description: 'Go-to-market data, corporate phone numbers and revenue bands' },
  { id: 137, name: 'Owler Competitive Intelligence', category: 'Archives & Social', estimatedDA: 84, urlTemplate: 'https://www.owler.com/search?q={host}', dofollow: true, description: 'Crowdsourced revenue tracking, competitors and CEO approval' },
  { id: 138, name: 'Medium Brand Publications', category: 'Archives & Social', estimatedDA: 96, urlTemplate: 'https://medium.com/search?q={host}', dofollow: true, description: 'Editorial storytelling, tech blogging and thought leadership' },
  { id: 139, name: 'Substack Newsletter Index', category: 'Archives & Social', estimatedDA: 93, urlTemplate: 'https://substack.com/search/{host}', dofollow: true, description: 'Direct-to-consumer publications and editorial newsletters' },
  { id: 140, name: 'Dev.to Software Community', category: 'Archives & Social', estimatedDA: 89, urlTemplate: 'https://dev.to/search?q={host}', dofollow: true, description: 'Global software engineering articles and developer discussions' },
  { id: 141, name: 'Hashnode Tech Blogging', category: 'Archives & Social', estimatedDA: 87, urlTemplate: 'https://hashnode.com/search?q={host}', dofollow: true, description: 'Developer blogging platform and tech tutorial network' },
  { id: 142, name: 'GitHub Open Source Hub', category: 'Archives & Social', estimatedDA: 98, urlTemplate: 'https://github.com/search?q={host}&type=repositories', dofollow: true, description: 'Open-source code, developer repositories and tech documentation' },
  { id: 143, name: 'GitLab Software Repositories', category: 'Archives & Social', estimatedDA: 94, urlTemplate: 'https://gitlab.com/search?search={host}', dofollow: true, description: 'DevOps lifecycle and source code management platform' },
  { id: 144, name: 'SourceForge Project Registry', category: 'Archives & Social', estimatedDA: 92, urlTemplate: 'https://sourceforge.net/directory/?q={host}', dofollow: true, description: 'Open source software downloads, mirrors and reviews' },
  { id: 145, name: 'SlideShare Presentation Hub', category: 'Archives & Social', estimatedDA: 94, urlTemplate: 'https://www.slideshare.net/search?q={host}', dofollow: true, description: 'Slide decks, commercial proposals and infographics' },
  { id: 146, name: 'Scribd Document Library', category: 'Archives & Social', estimatedDA: 95, urlTemplate: 'https://www.scribd.com/search?query={host}', dofollow: true, description: 'Whitepapers, case studies, corporate reports and books' },
  { id: 147, name: 'Issuu Digital Publishing', category: 'Archives & Social', estimatedDA: 93, urlTemplate: 'https://issuu.com/search?q={host}', dofollow: true, description: 'Digital magazines, lookbooks, portfolios and brochures' },
  { id: 148, name: 'Vimeo Video Showcase', category: 'Archives & Social', estimatedDA: 97, urlTemplate: 'https://vimeo.com/search?q={host}', dofollow: true, description: 'High-definition video production and brand commercials' },
  { id: 149, name: 'YouTube Channel Search', category: 'Archives & Social', estimatedDA: 99, urlTemplate: 'https://www.youtube.com/results?search_query={host}', dofollow: true, description: 'World’s video platform and creator video backlinks' },
  { id: 150, name: 'DailyMotion Video Search', category: 'Archives & Social', estimatedDA: 94, urlTemplate: 'https://www.dailymotion.com/search/{host}', dofollow: true, description: 'Global video streaming and news media network' },
  { id: 151, name: 'SoundCloud Audio Stream', category: 'Archives & Social', estimatedDA: 95, urlTemplate: 'https://soundcloud.com/search?q={host}', dofollow: true, description: 'Podcasts, brand audio tracks and sonic branding profiles' },
  { id: 152, name: 'Spotify Podcasts Index', category: 'Archives & Social', estimatedDA: 98, urlTemplate: 'https://open.spotify.com/search/{host}', dofollow: true, description: 'Audio shows, episodes and brand podcast channels' },
  { id: 153, name: 'Apple Podcasts Directory', category: 'Archives & Social', estimatedDA: 99, urlTemplate: 'https://podcasts.apple.com/search?term={host}', dofollow: true, description: 'Apple digital directory and episodic audio RSS link' },
  { id: 154, name: 'Google News Publisher Check', category: 'SEO Analyzers', estimatedDA: 98, urlTemplate: 'https://news.google.com/search?q={host}', dofollow: true, description: 'Google News publisher recognition and verified media footprint' },
  { id: 155, name: 'Bing News Feed Crawler', category: 'SEO Analyzers', estimatedDA: 96, urlTemplate: 'https://www.bing.com/news/search?q={host}', dofollow: true, description: 'Bing News crawler index and editorial mentions coverage' },
];

/**
 * Normalizes user input into clean domain host and full URL.
 */
export function cleanDomainInput(input: string): { host: string; fullUrl: string } {
  let trimmed = input.trim();
  if (!trimmed) {
    return { host: '', fullUrl: '' };
  }
  
  // Remove markdown, angle brackets, quotes
  trimmed = trimmed.replace(/^[<"']+|[>"']+$/g, '');

  let host = trimmed;
  let fullUrl = trimmed;

  if (!/^https?:\/\//i.test(trimmed)) {
    fullUrl = 'https://' + trimmed;
  }

  try {
    const parsed = new URL(fullUrl);
    host = parsed.hostname.replace(/^www\./i, '');
  } catch {
    // fallback string replacement
    host = trimmed
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      .split('?')[0]
      .split('#')[0];
  }

  return { host, fullUrl };
}

/**
 * Generates ready-to-use backlink items for a target domain.
 */
export function generateBacklinksForDomain(domainOrUrl: string) {
  const { host, fullUrl } = cleanDomainInput(domainOrUrl);
  if (!host) return [];

  return BACKLINK_PLATFORMS.map((platform) => {
    const backlinkUrl = platform.urlTemplate
      .replace(/\{host\}/g, host)
      .replace(/\{url\}/g, encodeURIComponent(fullUrl));

    return {
      id: platform.id,
      name: platform.name,
      category: platform.category,
      estimatedDA: platform.estimatedDA,
      backlinkUrl,
      dofollow: platform.dofollow,
      description: platform.description,
      status: 'Created' as 'Created' | 'Pinged' | 'Verified',
      timestamp: new Date().toISOString(),
    };
  });
}

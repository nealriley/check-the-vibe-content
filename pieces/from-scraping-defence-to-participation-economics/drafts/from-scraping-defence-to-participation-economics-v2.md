# From Scraping Defence to Participation Economics — V2

Local Markdown copy of the writer's [Google Doc](https://docs.google.com/document/d/1mxbmlHTtl6ZEmolhgM2wBBoYp7y0GWl1bqamXBvtMNk/edit?usp=drivesdk), read 25 October 2026. The prose below is unchanged; paragraph spacing and this heading were added for the local copy.

There is a lot of chatter right now about AI systems scraping the web, and what content owners ought to do about it. Cloudflare's AI Crawl Control, for one, has already turned this into a platform feature. It gives site owners the tools to monitor, allow, and block AI crawlers. They even offer pay-per-crawl access in private beta.

Most of the conversation, though, is focused on prevention. How do we stop the bots?

The very fact that your content is being scraped tells you something important: there is demand for it. Your data has enough value that someone is willing to acquire and store it. That doesn't mean every scraper is a potential paying customer. Demand, of course, is not the same as willingness to buy.

As automation and agentic systems become more pervasive, the audience for your content splits in two. Humans render pages. Machines would rather skip the rendering entirely. Multimodal models can "see" a webpage, but an agent can simply retrieve the underlying HTML. The modern web is a complex beast; even the raw source code used to express a simple thought may require parsing, inference, and careful extraction. There are many ways to optimize this transfer through a machine interface. Exposing Markdown-formatted content, or providing a structured API, can help immensely.

Once you accept that machines are a real audience, the interface allows for other useful modes of interaction. Specifically, it enables a shift from anonymous scraping to an authenticated and authorized transfer. Once that transfer is authenticated and controlled, the content owner can decide what level of access to provide, to whom, and on what terms.

There is no single model for this relationship. The right one depends on the specific challenge the content owner is trying to solve.

One participation model does not involve payment at all. The machine simply registers an identity and receives gated access. Much like any account you log in with today, authenticating a machine allows the content owner to assign it a specific level of access. These entitlements can determine how quickly a service responds and how many requests per hour are allowed. Those entitlements can also determine how the information is made available, whether as cleaner text, a downloadable file, or through a direct connection the machine can use. In this model, the entitlements set the contract's terms, and a transaction puts them into effect.

Without charging for access, the content owner can place these value-adds behind an authentication wall, offering greater capacity and response formats that are easier for agentic systems to consume. For example, an authenticated machine might receive clean Markdown, connect through an MCP server, or benefit from faster responses and higher rate limits than are available without authentication.

When money changing hands is the right strategy, payment can be introduced as another term in the contract-building process. For example, a content owner might charge per API request, or offer a recurring subscription for fresher information and greater capacity. Per-request pricing can be useful when demand is intermittent and the cost of serving each request can be measured directly.

A subscription can suit ongoing use, particularly when the value comes from remaining connected to a fresh and reliable source rather than any single request. Here, the content owner is not necessarily selling the information itself, but the benefits of remaining connected to its source: freshness, reliability, structure, and continuity. Alternatively, access can remain free while the authenticated relationship is used to cross-sell adjacent products or services.

A content owner can define the default level of access, decide what authentication unlocks, and choose whether value is captured per request, through a maintained connection, or through an adjacent sale. Together, signing in and accepting the terms enable access under the agreed entitlements. Where payment is required, it unlocks the corresponding paid service.

OpenAlex is a useful example of these models in practice: its underlying data remains free, while delivery is offered through free, pay-as-you-go, and annual plans.

Crossref provides a useful comparison: public access remains free, self-identification opens a cooperative pool with different rate limits, and Metadata Plus adds priority service, snapshots, support, and an uptime commitment.

In commerce, Amazon's Creators API demonstrates a different model: eligible affiliates receive structured access to product data, while the commercial return is tied to qualifying sales rather than individual API requests.

The right model depends on the specific challenge: identifying the participant, recovering the cost of each API request, maintaining a fresh and reliable source, or supporting an adjacent sale. These examples show that the mechanisms are available, but that doesn't mean every scraper will become a participant or every exchange will make commercial sense.

Protecting your online assets remains important, but identity, contracts, and, crucially, enhanced value for real demand can turn the threat of IP theft into good business.

More Reading:

AI crawlers criticised by the Linux Foundation’s IT infrastructure director

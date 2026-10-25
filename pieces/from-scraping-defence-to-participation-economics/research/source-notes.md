# Source notes and evidence boundaries

Research note, 25 October 2026. These sources support a working editorial frame; product capabilities and site policies may change before publication.

## Starting sources

- Writer, [*From Scraping Defence to Participation Economics — V2*](https://docs.google.com/document/d/1mxbmlHTtl6ZEmolhgM2wBBoYp7y0GWl1bqamXBvtMNk/edit?usp=drivesdk), modified 2 October 2026. [Local draft copy](../drafts/from-scraping-defence-to-participation-economics-v2.md). This is the writer's argument and source text, not independently verified reporting.
- Emma Roth, [“Websites are closing their doors to AI agents,” *The Verge*](https://www.theverge.com/ai-artificial-intelligence/1013195/ai-agents-blocked-web), 17 October 2026. Reports that outside agents encounter blocks at a range of sites; it also distinguishes explicit restrictions from general anti-bot friction. The original page did not load in the research browser; indexed article text and the publisher's [Bluesky post](https://bsky.app/profile/theverge.com/post/3my3bgy5m672l) established the headline, date, and broad account.
- Sarah Perez, [“The next hurdle for AI agents: getting websites to let them in,” *TechCrunch*](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in/), 6 October 2026. Adds direct statements from Yelp, Delta, Walmart, and Zillow. Yelp said non-human traffic requires its paid data-licensing program. Delta said it had no third-party booking integration and was evaluating outside agents. Walmart said some failures were unintended despite its partnership; Zillow said anti-bot measures can catch agents it otherwise permits. These distinctions matter more than a blanket claim that all four “ban agents.”
- [Cloudflare AI Crawl Control documentation](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/) and [Pay Per Crawl documentation](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/), checked 25 October 2026. Supports the draft's claim that site owners can allow, block, or charge identified AI crawlers; Pay Per Crawl remains in closed beta. This concerns crawler access to content, not authorization for an agent to use a person's account.

## Editorial distinctions

- **Crawler versus personal agent:** A crawler retrieving content for indexing, training, or answering questions is not the same as an agent trying to book a trip or buy something for a person. The draft focuses mainly on the former; the *Verge* case brings in the latter.
- **Identity versus authority:** Identifying an agent or its provider does not prove that a user authorized a specific action. Account access, spending limits, consent, and revocation need their own treatment.
- **Access failure versus explicit ban:** A bot check can block an approved agent. A site can also expressly refuse outside agents. Do not infer policy from a failed run alone.
- **Payment versus permission:** Paying for a content feed does not grant authority to transact in a user's name. The essay can examine a common participation framework without collapsing these separate contracts.
- **Availability versus adoption:** The draft's proposed commercial models and existing service examples show possible mechanisms. They do not establish that publishers broadly earn meaningful revenue from agents or that users want agents in every service.

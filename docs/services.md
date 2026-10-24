# FAASL.org v3: Contact form and donation services

**Status:** comparison for a decision (Oct 2026). Prices and limits change; confirm on each service's own pricing page before signing up. Several sources below are comparison blogs written by competing services, noted where it matters.
Related: [`todo.md`](./todo.md) Phase 4 · [`brief.md`](./brief.md) §5 (budget $0/month, no server)

---

## 1. Contact form

The site is static, so the form needs a service to receive submissions and email them to info@faasl.org. The form on `/contact` is already built and switched off (`src/components/blocks/ContactForm.astro`); connecting a service is a small change.

**What we need:** emails to info@faasl.org, spam protection, free for our volume (realistically a handful of messages a week), no server for us to run, no tracking cookies.

| Option | Free tier | Spam protection | Setup | Fit |
|---|---|---|---|---|
| **Web3Forms** | About **250 submissions/month**, unlimited forms ([agentdeals](https://agentdeals.dev/vendor/web3forms), [DEV](https://dev.to/allenarduino/web3forms-alternatives-in-2026-4cb2)) | Honeypot; optional hCaptcha | An access key sent to info@faasl.org; nothing else to manage | ✅ **Recommended** |
| **Formspree** | **50 submissions/month**, 2 notification emails, 30 days of history ([Formspree help](https://help.formspree.io/articles/account-management/account-limits)) | Built-in filtering; reCAPTCHA option | Account with a dashboard | ✅ Fine for our volume; tighter limit |
| **Google Form** (our Google Workspace) | Unlimited; answers in a Google Sheet | Google's | Build the form in Google; link or embed it | ⚠️ Off-brand embed, but owned by the org and familiar to the board |
| **Our own Cloudflare Worker + Turnstile** | Free at our size | Turnstile (Cloudflare's invisible check) ([Cloudflare example](https://developers.cloudflare.com/workers/examples/turnstile-html-rewriter), [Astro walkthrough](https://www.rhelmer.org/blog/astro-turnstile-cloudflare-workers/)) | Server code we maintain, plus email sending that works best once faasl.org's DNS is on Cloudflare | ❌ Against "no server"; revisit only if we outgrow the others |

**Recommendation: Web3Forms.** The most generous free tier with nothing to maintain, and it works with the form we already have (a plain HTML form post). Formspree is a good fallback; its 50/month would only bite during a big recruiting push.

- **Free tiers:** the Web3Forms numbers come mostly from comparison blogs, some written by competitors ([splitforms](https://splitforms.com/blog/formspree-vs-web3forms)), and paid-plan prices disagree between sources. The free tier is all we need; confirm it on web3forms.com.
- **SEO and privacy:** neutral. The form only sends data when someone submits it; no cookies or tracking scripts.
- **Who owns it:** sign up with info@faasl.org (an organization address), not a personal one, so it can be handed over.

---

## 2. Donations

Online giving is the site's top goal, so this choice matters more. Beyond one-time gifts, FAASL would use:
- **monthly gifts**
- **honor and memorial gifts:** a "who is this gift for" field
- **the annual membership fee:** on the Give page
- **fundraiser dinner tickets and raffles:** currently sold at the door and by board members
- **tax receipts**

**What we need:** low fees, a donor experience that feels trustworthy, money going to the organization's bank account, receipts sent automatically, and something a volunteer can run.

| Option | Cost to FAASL | Donor sees | Beyond donations | Fit |
|---|---|---|---|---|
| **Zeffy** | **$0**: no platform or card fees; funded by an optional tip donors are asked for at checkout ([Zeffy](https://www.zeffy.com/blog/paypal-alternative), [GalaBid](https://www.galabid.com/fundraising-platform/donation-platform-fundraising-2026)) | A suggested tip (reported around 15–20%; donors can lower it to $0) ([dupple](https://dupple.com/reviews/zeffy)) | Event tickets, raffles, memberships, donor list | ✅ **Recommended**, if the board is comfortable with the tip prompt |
| **Givebutter** | $0 platform fee with donor tips on, or **3%** with tips off; plus card processing **2.9% + 30¢** ([GalaBid](https://www.galabid.com/fundraising-platform/donation-platform-fundraising-2026)) | A tip prompt, unless we pay the 3% | Events, tickets, peer-to-peer campaigns, free donor CRM | ✅ Best if we want **no tip prompt** |
| **Every.org** | No platform fees; card processing fees passed on ([Every.org](https://www.every.org/pricing), [support](https://support.every.org/hc/en-us/articles/360058165034-Do-you-charge-any-fees)) | An optional tip prompt we can't turn off | Many ways to give: card, bank, PayPal, Venmo, Apple/Google Pay, stock, donor-advised funds | ⚠️ Good for donations only; no event tickets |
| **PayPal** (donate button / Giving Fund) | About **1.99% + 49¢** at the confirmed-nonprofit rate ([Zeffy](https://www.zeffy.com/blog/paypal-alternative)) | A familiar PayPal checkout | Little donor management | ⚠️ Simple and trusted, few features |
| **Donorbox** | Platform fee from **2.95%**, plus processing ([Donorbox](https://donorbox.org/fr/pricing)) | A polished form | Recurring gifts, events, memberships | ⚠️ Solid, but the fees add up |
| **Stripe Payment Links** | About **2.2% + 30¢** at Stripe's nonprofit rate, for accounts used mainly for donations ([Stripe](https://support.stripe.com/questions/does-stripe-offer-a-fee-discount-for-non-profit-organizations), [Givebutter](https://givebutter.com/blog/stripe-for-nonprofits)) | A Stripe checkout page | We'd handle receipts and donor records ourselves | ❌ More volunteer work |

**Recommendation: Zeffy**, with Givebutter as the alternative.

- **Zeffy:**
  - It costs FAASL nothing.
  - One account covers what the Give page and the events need: donations, monthly gifts, memberships, dinner tickets and raffles.
  - The trade-off is the tip prompt at checkout. Competitors say nonprofits can't turn it off ([Donorbox](https://donorbox.org/explore/donorbox-vs-zeffy)), and some donors have reported being charged more than they meant to ([GalaBid](https://www.galabid.com/fundraising-platform/donation-platform-fundraising-2026)). The board should try a test donation before deciding.
- **Givebutter with tips off:** no prompt, for about 3% plus processing. That costs roughly $6 on a $100 gift, but gives a cleaner experience for donors who'd be put off by a tip request.

Whichever we pick:
- **The organization opens the account** with an faasl.org email and its own bank account, and the board decides who manages it.
- **Gifts of $250 or more** need a written acknowledgment for the donor's taxes. All the full platforms above send receipts; check the wording includes the EIN and "no goods or services were provided" where true.
- **Employer matching** (from the Give page) works with any provider; matching-gift lookup tools are usually a paid add-on.
- **On the site:**
  - Donate buttons link to the provider's donation page, or embed its form on `/give`. Linking is simplest and fastest. An embedded form keeps donors on our page, but loads the provider's scripts.
  - Either way, `donate.faasl.org` and `give.faasl.org` redirect to `/give`.
- **SEO:** neutral either way. Search engines index our `/give` page, not the checkout.

---

## 3. Decisions needed

1. **Contact form:** Web3Forms (recommended), Formspree, or a Google Form?
2. **Donations:** Zeffy (recommended; free, with a tip prompt) or Givebutter (no prompt, about 3%)? This is likely a board conversation; a test donation on each helps.
3. **Account owner:** the faasl.org address the accounts are created under.
4. **On the Give page:** a link to the provider's page, or an embedded form?

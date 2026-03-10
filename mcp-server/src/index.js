import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "Cloudflare MCP Server",
    version: "2.0.0",
  });

  async init() {

    // ─────────────────────────────────────────────
    // Tool 1: Cloudflare Product Info
    // ─────────────────────────────────────────────
    this.server.tool(
      "cloudflare_info",
      "Get detailed information about any Cloudflare product or service. Covers the entire Cloudflare platform including compute, storage, security, networking, AI, and developer tools.",
      {
        service: z.enum([
          // Compute
          "workers", "pages", "durable_objects", "containers", "workflows", "sandbox",
          // Storage
          "kv", "d1", "r2", "r2_data_catalog", "r2_sql", "vectorize", "hyperdrive", "pipelines",
          // AI
          "workers_ai", "ai_gateway", "ai_search", "agents", "vectorize",
          // Security
          "waf", "ddos", "turnstile", "bot_management", "api_shield", "page_shield",
          "rate_limiting", "ssl_tls", "zero_trust", "access", "gateway", "dlp",
          "casb", "email_security", "browser_isolation", "magic_firewall",
          // Networking
          "dns", "cdn", "argo", "load_balancing", "magic_transit", "magic_wan",
          "cloudflare_tunnel", "network_interconnect", "spectrum", "workers_vpc",
          // Developer Platform
          "wrangler", "terraform", "pulumi", "mcp", "workers_for_platforms",
          "cloudflare_for_saas", "secrets_store",
          // Media & Realtime
          "stream", "images", "realtime", "zaraz",
          // Analytics & Observability
          "analytics", "workers_analytics_engine", "log_explorer", "web_analytics",
          "radar", "health_checks",
          // Email
          "email_routing", "dmarc_management",
          // Other
          "registrar", "queues", "waiting_room", "rules", "cache",
          "web3", "version_management", "1_1_1_1"
        ]).describe("The Cloudflare product or service to look up"),
      },
      async ({ service }) => {
        const info = {

          // ── COMPUTE ──────────────────────────────────────────────────────
          workers:
            "Cloudflare Workers is a serverless execution environment that runs JavaScript, TypeScript, Python, Rust, and WebAssembly at Cloudflare's edge — 300+ locations worldwide. Workers have zero cold starts, run in V8 isolates (not containers), and execute within milliseconds of your users. You pay per request with a generous free tier (100,000 req/day). Workers can be bound to KV, D1, R2, Durable Objects, Queues, AI, and more. Use Wrangler CLI to develop locally and deploy globally. Docs: developers.cloudflare.com/workers",

          pages:
            "Cloudflare Pages is a full-stack JAMstack platform for deploying static sites and server-side rendered applications. Connect your GitHub or GitLab repo and Pages auto-deploys on every push. Supports 30+ frameworks including Next.js, Astro, Remix, Nuxt, SvelteKit, Hugo, and more. Includes unlimited bandwidth, automatic HTTPS, global CDN, preview deployments for every PR, and instant rollbacks. Full-stack apps use Pages Functions (powered by Workers) for backend logic. Free tier includes 500 builds/month and unlimited sites. Docs: developers.cloudflare.com/pages",

          durable_objects:
            "Durable Objects combine compute and storage in a single Cloudflare Worker, providing strongly consistent coordination and state. Each Durable Object is a unique instance with its own memory, storage, and execution context. They are ideal for real-time collaboration (like Google Docs), multiplayer games, chat systems, rate limiters, and any use case requiring a single source of truth. Durable Objects run close to where requests originate and use SQLite for persistent storage. They are the backbone of Cloudflare's MCP agent infrastructure. Docs: developers.cloudflare.com/durable-objects",

          containers:
            "Cloudflare Containers enhance Workers with serverless container support, allowing you to run Docker-compatible workloads on Cloudflare's network. Containers are managed, globally distributed, and tightly integrated with Workers bindings. They are ideal for running longer-running tasks, existing containerized workloads, or code that requires a full OS environment. Containers are currently in beta. Docs: developers.cloudflare.com/containers",

          workflows:
            "Cloudflare Workflows lets you build durable, multi-step applications on the Workers platform. Workflows automatically handle retries, state persistence across steps, and long-running processes that can span hours or days. Each step is durable — if a Worker restarts mid-execution, Workflows resumes from the last completed step. Ideal for ETL pipelines, order processing, AI agent orchestration, and any multi-step business logic. Docs: developers.cloudflare.com/workflows",

          sandbox:
            "Cloudflare Sandbox SDK lets you build secure, isolated code execution environments on Workers. Run untrusted code safely inside a Sandbox without risking your main Worker or infrastructure. Useful for user-generated code execution, automated testing environments, and multi-tenant platforms where code isolation is critical. Currently experimental. Docs: developers.cloudflare.com/sandbox",

          // ── STORAGE ──────────────────────────────────────────────────────
          kv:
            "Workers KV is a globally distributed, eventually consistent key-value store. KV excels at read-heavy workloads — values are cached at every Cloudflare edge location meaning reads are extremely fast regardless of where your users are. Writes propagate globally within ~60 seconds. Values can be up to 25MB. Best for: configuration data, feature flags, user sessions, HTML pages, and any data read frequently but updated infrequently. Not ideal for data requiring strong consistency or frequent writes. Docs: developers.cloudflare.com/kv",

          d1:
            "D1 is Cloudflare's native serverless SQLite database built for Workers. Write standard SQL queries directly from your Worker with zero connection overhead. D1 supports read replicas globally for fast reads, automatic backups, and time-travel queries. The free tier includes 5GB storage and 25M row reads/day. D1 uses SQLite semantics, making it familiar to millions of developers. Best for: structured relational data, user records, product catalogs, guestbooks, and anything requiring SQL. Docs: developers.cloudflare.com/d1",

          r2:
            "Cloudflare R2 is S3-compatible object storage with zero egress fees — you never pay to retrieve your data. Store unlimited unstructured data (images, videos, backups, datasets) and serve it directly to users or bind it to Workers. R2 supports S3 API compatibility meaning existing tools like AWS CLI, boto3, and the AWS SDKs work out of the box. Free tier includes 10GB storage, 1M Class A operations, and 10M Class B operations per month. Ideal for: media files, user uploads, static assets, and any large blob storage. Docs: developers.cloudflare.com/r2",

          r2_data_catalog:
            "R2 Data Catalog lets you create, manage, and query Apache Iceberg tables stored in R2. Iceberg is an open table format for huge analytic datasets. R2 Data Catalog integrates with analytics engines like Apache Spark, Trino, and DuckDB. Ideal for data lakes, analytics pipelines, and large-scale data processing workflows. Docs: developers.cloudflare.com/r2/data-catalog",

          r2_sql:
            "R2 SQL is Cloudflare's serverless, distributed query engine for data stored in R2 Data Catalog. Run SQL queries directly against Iceberg tables in R2 without spinning up compute infrastructure. Part of Cloudflare's analytics stack alongside Workers Analytics Engine. Docs: developers.cloudflare.com/r2-sql",

          vectorize:
            "Cloudflare Vectorize is a globally distributed vector database built into the Workers platform. Store and query high-dimensional vector embeddings for semantic search, recommendation systems, and AI applications. Vectorize works natively with Workers AI to embed text and search by similarity. Supports millions of vectors with fast approximate nearest neighbor (ANN) search. Free tier included. Docs: developers.cloudflare.com/vectorize",

          hyperdrive:
            "Cloudflare Hyperdrive accelerates queries to existing databases (PostgreSQL, MySQL) by maintaining a connection pool at the edge. Instead of opening a new database connection on every Worker request (which is slow), Hyperdrive reuses pooled connections globally. Reduces database query latency dramatically for Workers that connect to external databases. Supports Postgres, PgBouncer, Neon, Supabase, and more. Docs: developers.cloudflare.com/hyperdrive",

          pipelines:
            "Cloudflare Pipelines is a managed data ingestion service that accepts real-time event streams from Workers and delivers them to R2 for storage. Acts like a simplified, serverless Kafka — ingest millions of events, batch them efficiently, and load into R2 without managing infrastructure. Ideal for event logging, analytics pipelines, and IoT data collection. Docs: developers.cloudflare.com/pipelines",

          // ── AI ────────────────────────────────────────────────────────────
          workers_ai:
            "Workers AI lets you run machine learning models directly in Cloudflare Workers using serverless GPUs — no ML infrastructure to manage. Supports 50+ models including Llama 3.1, Mistral, Phi, Gemma, Stable Diffusion, Whisper, and text embedding models. Models run on GPUs located across Cloudflare's global network, minimizing latency. Supports text generation, image generation, speech-to-text, translation, classification, and embeddings. Free tier includes 10,000 neurons/day. Docs: developers.cloudflare.com/workers-ai",

          ai_gateway:
            "Cloudflare AI Gateway is an observability and control layer for AI applications. Proxy your AI requests through AI Gateway to get logging, caching, rate limiting, spend analytics, and fallback routing across providers. Supports OpenAI, Anthropic, Hugging Face, Google Gemini, AWS Bedrock, Azure OpenAI, and Workers AI. Caching AI responses can dramatically reduce costs. Docs: developers.cloudflare.com/ai-gateway",

          ai_search:
            "Cloudflare AI Search creates fully managed RAG (Retrieval Augmented Generation) pipelines. Upload documents, and AI Search handles chunking, embedding, storage in Vectorize, and retrieval — so your AI applications can answer questions grounded in your own content. Reduces hallucinations by giving LLMs accurate context. Docs: developers.cloudflare.com/ai-search",

          agents:
            "Cloudflare Agents is a framework for building AI-powered agents that can perform multi-step tasks, persist state, browse the web, call tools, and communicate in real-time. Built on top of Durable Objects and Workers, Agents can run autonomously over long periods, remember context across sessions, and integrate with external services via MCP or HTTP. The agents npm package is what powers this MCP server. Docs: developers.cloudflare.com/agents",

          // ── SECURITY ──────────────────────────────────────────────────────
          waf:
            "Cloudflare WAF (Web Application Firewall) filters and inspects HTTP traffic to protect against web vulnerabilities including OWASP Top 10, SQL injection, XSS, and zero-day exploits. Cloudflare's WAF uses managed rulesets updated by their security team as new threats emerge. Includes custom rules, rate limiting, bot detection, and JSON inspection. Available on all plans with increasing capabilities on higher tiers. Docs: developers.cloudflare.com/waf",

          ddos:
            "Cloudflare DDoS Protection automatically detects and mitigates distributed denial-of-service attacks without impacting legitimate traffic. Cloudflare absorbs some of the largest DDoS attacks ever recorded (multi-Tbps) across its 300+ data centers. Protection is always-on and unmetered — you pay the same regardless of attack size. Covers L3/L4 network attacks and L7 application attacks. Docs: developers.cloudflare.com/ddos-protection",

          turnstile:
            "Cloudflare Turnstile is a privacy-preserving CAPTCHA alternative that verifies users are human without annoying puzzles or tracking. Turnstile runs invisible challenges using browser signals and behavior analysis. Completely free with no usage limits. Drop-in replacement for Google reCAPTCHA and hCaptcha. Integrates via a simple script tag and a server-side token validation call. GDPR-compliant and does not use cookies for tracking. Docs: developers.cloudflare.com/turnstile",

          bot_management:
            "Cloudflare Bot Management identifies and controls automated traffic to your site. Uses machine learning, behavioral analysis, and fingerprinting to distinguish legitimate bots (Googlebot, etc.) from malicious ones (scrapers, credential stuffers, inventory hoarders). Provides a bot score (1-99) on every request for fine-grained rules. Available on Enterprise plans. The free Bots product provides basic protection on all plans. Docs: developers.cloudflare.com/bots",

          api_shield:
            "Cloudflare API Shield protects APIs from abuse, vulnerabilities, and data leakage. Features include API Discovery (automatically finds all your API endpoints), schema validation (reject malformed requests), volumetric abuse detection, JWT validation, and Sensitive Data Detection. Ideal for organizations with many public-facing APIs. Docs: developers.cloudflare.com/api-shield",

          page_shield:
            "Cloudflare Page Shield monitors JavaScript loaded by your website and alerts you to malicious scripts, supply chain attacks, and data exfiltration attempts (like Magecart attacks). Scans all third-party scripts running in your users' browsers and provides a content security policy. Docs: developers.cloudflare.com/page-shield",

          rate_limiting:
            "Cloudflare Rate Limiting controls the number of requests a client can make to your application within a time window. Protects against brute force attacks, credential stuffing, API abuse, and scraping. Rules can match on IP, headers, cookies, or any request attribute. Rate limiting happens at Cloudflare's edge before requests reach your origin. Docs: developers.cloudflare.com/waf/rate-limiting-rules",

          ssl_tls:
            "Cloudflare SSL/TLS encrypts traffic between users and Cloudflare (and optionally between Cloudflare and your origin). Offers Universal SSL (free), Advanced Certificate Manager, custom certificates, and keyless SSL. Supports TLS 1.3, HTTP/2, HTTP/3, QUIC, and automatic certificate renewal. Cloudflare manages certificate provisioning and renewal automatically. Docs: developers.cloudflare.com/ssl",

          zero_trust:
            "Cloudflare Zero Trust (formerly Cloudflare for Teams) replaces legacy VPNs and network perimeters with identity-based access controls. Includes Cloudflare Access (application-level SSO), Gateway (DNS/HTTP/network filtering), WARP client (device agent), Browser Isolation, DLP, CASB, and Email Security. Every request is authenticated and authorized regardless of network location. Free tier supports up to 50 users. Docs: developers.cloudflare.com/cloudflare-one",

          access:
            "Cloudflare Access is a Zero Trust application access proxy. Protect internal tools, staging environments, and admin panels without a VPN. Users authenticate via your identity provider (Okta, Google, GitHub, Azure AD, etc.) and Access issues a short-lived JWT. Supports SAML, OIDC, SSH, RDP, and more. Every request is logged. Docs: developers.cloudflare.com/cloudflare-one/access-controls",

          gateway:
            "Cloudflare Gateway is a Secure Web Gateway that filters DNS, HTTP, and network traffic for your organization. Block malware, phishing, and unauthorized applications. Apply content policies, inspect HTTPS traffic, and log all activity. Replaces traditional on-premise web proxies and DNS filtering appliances. Docs: developers.cloudflare.com/cloudflare-one/traffic-policies",

          dlp:
            "Cloudflare Data Loss Prevention (DLP) scans web traffic and SaaS applications for sensitive data like credit card numbers, SSNs, API keys, and custom patterns. Part of the Cloudflare One platform. DLP policies can block, log, or alert when sensitive data is detected leaving your organization. Docs: developers.cloudflare.com/cloudflare-one/data-loss-prevention",

          casb:
            "Cloudflare CASB (Cloud Access Security Broker) scans SaaS applications and cloud environments for data security misconfigurations. Discovers shadow IT, finds overshared files, detects misconfigured permissions in Google Workspace, Microsoft 365, Salesforce, and more. Part of the Cloudflare One Zero Trust platform. Docs: developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas",

          email_security:
            "Cloudflare Email Security (formerly Area 1) protects against phishing, malware, business email compromise (BEC), and spam. Uses AI to analyze email patterns and block threats before they reach inboxes. Integrates with Microsoft 365, Google Workspace, and other mail providers. Part of the Cloudflare One platform. Docs: developers.cloudflare.com/cloudflare-one/email-security",

          browser_isolation:
            "Cloudflare Browser Isolation executes active webpage content in a secure, remote browser running on Cloudflare's network. Users interact with a pixel stream, so no code from untrusted websites ever runs on their device. Protects against zero-day browser exploits, drive-by downloads, and malicious JavaScript. Part of Cloudflare Zero Trust. Docs: developers.cloudflare.com/cloudflare-one/remote-browser-isolation",

          magic_firewall:
            "Cloudflare Magic Firewall is a network-layer firewall as a service for enterprise networks. Filter traffic at L3/L4 using Wireshark-syntax rules applied across Cloudflare's global network. Blocks attacks before they reach your infrastructure. Works with Magic Transit and Magic WAN. Docs: developers.cloudflare.com/magic-firewall",

          // ── NETWORKING ────────────────────────────────────────────────────
          dns:
            "Cloudflare DNS is the world's fastest authoritative DNS service (1.0ms average response time) with 100% uptime SLA. Free for all Cloudflare customers. Supports standard DNS records (A, AAAA, CNAME, MX, TXT, SRV), DNSSEC, DNS over HTTPS (DoH), DNS over TLS (DoT), and wildcard records. The 1.1.1.1 resolver is Cloudflare's public DNS resolver for consumers. Docs: developers.cloudflare.com/dns",

          cdn:
            "Cloudflare's CDN caches and delivers website content from 300+ data centers worldwide. Static assets (images, CSS, JS), HTML pages, and API responses can be cached at the edge to reduce latency and origin load. Cloudflare's CDN is automatic for all proxied domains — no configuration needed to start caching. Cache rules allow fine-grained control over what gets cached, TTLs, and cache keys. Docs: developers.cloudflare.com/cache",

          argo:
            "Cloudflare Argo Smart Routing optimizes traffic routing across Cloudflare's private backbone network, choosing the fastest, least congested paths instead of standard internet BGP routing. Typically reduces latency by 30% for dynamic content that cannot be cached. Available as a paid add-on per zone. Docs: developers.cloudflare.com/argo-smart-routing",

          load_balancing:
            "Cloudflare Load Balancing distributes traffic across multiple origin servers for high availability and performance. Supports active health checks, geographic steering (route traffic to nearest origin), weighted pools, session affinity, and failover. Operates at Cloudflare's edge so load balancing happens globally before requests hit your network. Docs: developers.cloudflare.com/load-balancing",

          magic_transit:
            "Cloudflare Magic Transit extends Cloudflare's DDoS protection and networking to enterprise on-premise, cloud, and hybrid networks. Advertise your IP prefixes through Cloudflare and all traffic is scrubbed before delivery. Replaces traditional DDoS scrubbing centers with Cloudflare's global network. Docs: developers.cloudflare.com/magic-transit",

          magic_wan:
            "Cloudflare Magic WAN replaces traditional SD-WAN appliances and MPLS links by connecting all your offices, data centers, and cloud environments through Cloudflare's network. Provides secure, reliable connectivity between locations with built-in Zero Trust access controls. Integrates with Magic Transit and the broader Cloudflare One platform. Docs: developers.cloudflare.com/magic-wan",

          cloudflare_tunnel:
            "Cloudflare Tunnel (formerly Argo Tunnel) creates a secure outbound-only connection from your server to Cloudflare without exposing a public IP or opening firewall ports. Run the cloudflared daemon on your server and it establishes encrypted tunnels to Cloudflare's edge. Expose local services to the internet securely. Often used with Cloudflare Access for Zero Trust access to internal apps. Free to use. Docs: developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel",

          network_interconnect:
            "Cloudflare Network Interconnect (CNI) allows enterprises to connect their network infrastructure directly to Cloudflare's network via private peering or MPLS, bypassing the public internet. Provides lower latency, more reliable connections, and higher bandwidth than internet routing. Used by large enterprises needing consistent performance for Magic Transit, Magic WAN, or other Cloudflare services. Docs: developers.cloudflare.com/network-interconnect",

          spectrum:
            "Cloudflare Spectrum extends Cloudflare's DDoS protection and global network to any TCP or UDP application — not just HTTP. Protect game servers, SSH, RDP, custom protocols, IoT devices, and more. Spectrum proxies all traffic through Cloudflare's network providing DDoS mitigation and IP masking for any port and protocol. Docs: developers.cloudflare.com/spectrum",

          workers_vpc:
            "Workers VPC connects Cloudflare Workers to your private Virtual Private Cloud, enabling Workers to access private resources in AWS, GCP, Azure, or your own data center without exposing them to the public internet. Combines the global reach of Workers with the security of private networking. Docs: developers.cloudflare.com/workers-vpc",

          // ── DEVELOPER TOOLS ───────────────────────────────────────────────
          wrangler:
            "Wrangler is Cloudflare's official CLI tool for developing, testing, and deploying Workers, Pages, D1, KV, R2, and other Cloudflare developer platform resources. Key commands: 'wrangler dev' (local development server with live reload), 'wrangler deploy' (deploy to production), 'wrangler tail' (stream live logs), 'wrangler secret put' (store secrets), 'wrangler d1 execute' (run SQL), 'wrangler kv key put' (write KV values). Install: npm install -g wrangler. Requires Node.js 16.13+. Docs: developers.cloudflare.com/workers/wrangler",

          terraform:
            "Cloudflare's official Terraform provider lets you manage all Cloudflare resources as Infrastructure as Code (IaC). Define Workers, KV namespaces, DNS records, Page Rules, firewall rules, and more in HCL configuration files. Use 'terraform plan' to preview changes and 'terraform apply' to deploy. The provider is published at registry.terraform.io/providers/cloudflare/cloudflare. Supports 200+ Cloudflare resources. Ideal for reproducible infrastructure, GitOps workflows, and managing multiple Cloudflare accounts. Docs: developers.cloudflare.com/terraform",

          pulumi:
            "Cloudflare's Pulumi provider lets you manage Cloudflare infrastructure using your preferred programming language — TypeScript, Python, Go, C#, Java, or YAML. Pulumi is an alternative to Terraform with the advantage of using real programming languages instead of HCL. The Cloudflare Pulumi provider supports the same resources as the Terraform provider. Docs: developers.cloudflare.com/pulumi",

          mcp:
            "Model Context Protocol (MCP) is an open standard created by Anthropic for connecting AI models like Claude to external tools, APIs, and data sources. Cloudflare Workers are an ideal host for remote MCP servers — they run globally, scale automatically, and support both SSE and Streamable HTTP transports. The 'agents' npm package provides McpAgent class built on Durable Objects for stateful MCP connections. Connect Claude Desktop to your remote MCP server via the claude_desktop_config.json file. Official Cloudflare MCP servers available at: github.com/cloudflare/mcp-server-cloudflare. Docs: developers.cloudflare.com/agents",

          workers_for_platforms:
            "Cloudflare Workers for Platforms lets SaaS companies deploy custom Workers code on behalf of their customers. Build a multi-tenant platform where each customer can run their own code on Cloudflare's infrastructure. Cloudflare handles isolation, scaling, and security. Used by companies building no-code platforms, edge compute marketplaces, and customizable SaaS products. Docs: developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms",

          cloudflare_for_saas:
            "Cloudflare for SaaS extends Cloudflare's performance and security to your customers' custom domains. Let your SaaS customers use their own domain (e.g., app.theirdomain.com) while routing through Cloudflare. Handles SSL certificate provisioning and renewal for thousands of custom domains automatically. Docs: developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas",

          secrets_store:
            "Cloudflare Secrets Store is a centralized, encrypted secret management service for your Cloudflare account. Store API keys, tokens, and sensitive credentials once and reference them across multiple Workers without hardcoding values. Currently in beta. An alternative to using 'wrangler secret put' per Worker. Docs: developers.cloudflare.com/secrets-store",

          // ── MEDIA & REALTIME ──────────────────────────────────────────────
          stream:
            "Cloudflare Stream is a video hosting, encoding, and delivery platform. Upload videos via API or direct creator upload, and Stream handles transcoding to multiple resolutions and formats. Deliver videos via an embeddable player or HLS/DASH manifests. Supports live streaming, recording, clipping, watermarking, and signed URLs for access control. Storage and delivery pricing per minute of video. Docs: developers.cloudflare.com/stream",

          images:
            "Cloudflare Images stores, transforms, and optimizes images globally. Upload once and serve with on-the-fly resizing, format conversion (WebP, AVIF), quality compression, and cropping via URL parameters. Images are delivered from Cloudflare's CDN. Supports signed URLs, custom domains, and image variants. Pricing per image stored and delivered. Docs: developers.cloudflare.com/images",

          realtime:
            "Cloudflare Realtime is a suite of infrastructure products for building real-time applications. Includes RealtimeKit (SDKs for video/audio/data), Realtime SFU (Selective Forwarding Unit for scalable WebRTC), and TURN Service (relay for WebRTC clients behind NAT). Ideal for video conferencing, live streaming, collaborative tools, and multiplayer applications. Docs: developers.cloudflare.com/realtime",

          zaraz:
            "Cloudflare Zaraz runs third-party marketing tools and analytics (Google Tag Manager, Facebook Pixel, Hotjar, etc.) on Cloudflare's edge instead of in the user's browser. This improves page performance (fewer client-side scripts), enhances privacy (no direct third-party tracking), and allows server-side event processing. Integrates with 100+ tools. Docs: developers.cloudflare.com/zaraz",

          // ── ANALYTICS ────────────────────────────────────────────────────
          analytics:
            "Cloudflare Analytics provides detailed traffic, security, and performance data for all proxied domains. View request volume, bandwidth, cache hit rates, threat counts, and country breakdowns in the dashboard. Data is available via the GraphQL Analytics API for custom queries and integrations. Included free with all Cloudflare plans. Docs: developers.cloudflare.com/analytics",

          workers_analytics_engine:
            "Workers Analytics Engine lets you write custom analytics data from Workers using a SQL API. Supports unlimited-cardinality data (any combination of dimensions) unlike most analytics tools. Write events with 'env.ANALYTICS.writeDataPoint()' and query with SQL via the Analytics Engine API. Ideal for custom application metrics, business events, and real-time dashboards. Docs: developers.cloudflare.com/analytics/analytics-engine",

          log_explorer:
            "Cloudflare Log Explorer lets you store, search, and analyze logs from Cloudflare products directly in the Cloudflare dashboard or via API. Replaces the need to export logs to external SIEM tools for basic analysis. Supports filtering, full-text search, and log retention. Docs: developers.cloudflare.com/log-explorer",

          web_analytics:
            "Cloudflare Web Analytics is a privacy-first, cookieless website analytics product. Add a single script tag to get pageviews, unique visitors, referrers, and top pages — without tracking individual users or using cookies. GDPR-compliant out of the box. Free with no usage limits for Cloudflare customers. Docs: developers.cloudflare.com/web-analytics",

          radar:
            "Cloudflare Radar provides internet traffic insights based on Cloudflare's global network data. View internet traffic trends, attack statistics, BGP routing data, DNS query trends, and connectivity reports by country. A public-facing tool used by researchers, journalists, and network operators. Available at radar.cloudflare.com. Docs: developers.cloudflare.com/radar",

          health_checks:
            "Cloudflare Health Checks monitors the availability of your origin servers and sends alerts when they go down. Configurable HTTP or TCP checks with customizable intervals, thresholds, and notification channels (email, PagerDuty, Slack, webhooks). Integrates with Load Balancing for automatic failover. Docs: developers.cloudflare.com/health-checks",

          // ── EMAIL ─────────────────────────────────────────────────────────
          email_routing:
            "Cloudflare Email Routing creates custom email addresses for your domain and routes them to your preferred inbox — all for free. Create any number of addresses (hello@yourdomain.com → your@gmail.com) with no email hosting required. Supports catch-all rules, Worker email processing (programmatically handle emails with code), and multiple destination addresses. Docs: developers.cloudflare.com/email-routing",

          dmarc_management:
            "Cloudflare DMARC Management helps protect your email domain from spoofing and phishing. Monitor SPF, DKIM, and DMARC records, view reports on who is sending email from your domain, and get guided setup for proper email authentication. Prevents brand impersonation and improves email deliverability. Docs: developers.cloudflare.com/dmarc-management",

          // ── OTHER ─────────────────────────────────────────────────────────
          registrar:
            "Cloudflare Registrar lets you buy and renew domain names at cost — no markup over wholesale prices. Unlike traditional registrars, Cloudflare charges only what ICANN and the registry charge. Includes free WHOIS privacy, two-factor authentication, and automatic DNS configuration when used with Cloudflare. Transfer your existing domains to save on renewals. Docs: developers.cloudflare.com/registrar",

          queues:
            "Cloudflare Queues is a reliable message queue service for Workers with no egress fees. Send messages from one Worker and process them in another, with automatic retries on failure. Supports guaranteed at-least-once delivery, batch processing, and dead-letter queues. Free tier includes 1M message operations/month. Ideal for background job processing, event streaming, and decoupling microservices. Docs: developers.cloudflare.com/queues",

          waiting_room:
            "Cloudflare Waiting Room manages traffic spikes by queuing users in a virtual waiting room before they can access your site. Prevents origin overload during ticket sales, product launches, and other high-demand events. Users see a branded waiting page with an estimated wait time. Available on Pro plans and above. Docs: developers.cloudflare.com/waiting-room",

          rules:
            "Cloudflare Rules is a unified platform for modifying request and response behavior at the edge. Includes Page Rules (legacy), Transform Rules (modify headers/URLs), Redirect Rules, Cache Rules, Configuration Rules, Origin Rules, Compression Rules, and Snippets (lightweight JavaScript at the edge). All rules use Cloudflare's Ruleset Engine with a consistent expression syntax. Docs: developers.cloudflare.com/rules",

          cache:
            "Cloudflare Cache stores copies of static and dynamic content at edge locations worldwide. Reduce origin server load and serve content faster to users. Supports cache TTL configuration, cache keys (vary by headers/cookies/query params), cache purging (single URL, tag-based, or everything), Cache Reserve (persistent storage), and Tiered Cache (reduce origin requests by routing through fewer edge nodes). Docs: developers.cloudflare.com/cache",

          web3:
            "Cloudflare Web3 Gateways provide HTTP access to decentralized networks including IPFS (InterPlanetary File System) and Ethereum. Resolve IPFS content via cloudflare-ipfs.com or your own gateway. Connect to Ethereum nodes for smart contract interaction without running your own node. Makes Web3 content accessible to standard web browsers. Docs: developers.cloudflare.com/web3",

          version_management:
            "Cloudflare Version Management lets you safely test configuration changes on a staging environment before deploying to production. Create versions of your zone configuration, test in staging, and promote to production with confidence. Supports rollbacks to previous configurations. Available on Enterprise plans. Docs: developers.cloudflare.com/version-management",

          "1_1_1_1":
            "1.1.1.1 is Cloudflare's free public DNS resolver — the world's fastest DNS service with an average response time under 11ms. Privacy-first: Cloudflare does not sell your DNS data and purges all logs within 24 hours. Supports DNS over HTTPS (DoH) and DNS over TLS (DoT) for encrypted queries. The 1.1.1.1 app for iOS and Android adds WARP — a VPN-like tunnel for encrypted internet traffic. 1.1.1.2 blocks malware, 1.1.1.3 blocks malware and adult content. Docs: developers.cloudflare.com/1.1.1.1",
        };

        const result = info[service];
        if (!result) {
          return { content: [{ type: "text", text: `No information found for service: ${service}` }] };
        }
        return { content: [{ type: "text", text: result }] };
      }
    );

    // ─────────────────────────────────────────────
    // Tool 2: Calculator
    // ─────────────────────────────────────────────
    this.server.tool(
      "calculate",
      "Perform basic math calculations",
      {
        expression: z.string().describe("A math expression like '2 + 2' or '10 * 5'"),
      },
      async ({ expression }) => {
        try {
          const result = Function(`"use strict"; return (${expression})`)();
          return { content: [{ type: "text", text: `${expression} = ${result}` }] };
        } catch (e) {
          return { content: [{ type: "text", text: `Error: Invalid expression` }] };
        }
      }
    );

    // ─────────────────────────────────────────────
    // Tool 3: Random joke
    // ─────────────────────────────────────────────
    this.server.tool(
      "get_joke",
      "Get a random developer joke",
      {},
      async () => {
        const jokes = [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "Why did the developer go broke? Because he used up all his cache!",
          "What's a programmer's favorite hangout spot? The Foo Bar!",
          "Why do Java developers wear glasses? Because they don't C#!",
          "A SQL query walks into a bar, walks up to two tables and asks... 'Can I join you?'",
          "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!",
          "What do you call a Cloudflare Worker that tells jokes? A stand-up comedian at the edge!",
          "Why did the Terraform engineer break up with their partner? Too many state changes.",
          "What do you call a KV store with no values? An empty promise.",
          "Why did the D1 database go to therapy? Too many joins, not enough relationships.",
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        return { content: [{ type: "text", text: joke }] };
      }
    );

    // ─────────────────────────────────────────────
    // Tool 4: Word counter
    // ─────────────────────────────────────────────
    this.server.tool(
      "count_words",
      "Count the words and characters in a text",
      {
        text: z.string().describe("The text to analyze"),
      },
      async ({ text }) => {
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;
        const sentences = text.split(/[.!?]+/).filter(Boolean).length;
        return {
          content: [{
            type: "text",
            text: `Words: ${words}\nCharacters: ${chars}\nSentences: ${sentences}`
          }]
        };
      }
    );

    // ─────────────────────────────────────────────
    // Tool 5: Compare Cloudflare storage options
    // ─────────────────────────────────────────────
    this.server.tool(
      "compare_storage",
      "Compare Cloudflare storage options (KV, D1, R2, Durable Objects, Vectorize) and get a recommendation for your use case",
      {
        use_case: z.string().describe("Describe what you want to store or what your use case is"),
      },
      async ({ use_case }) => {
        const guide = `Cloudflare Storage Decision Guide
=====================================
Your use case: "${use_case}"

Here's how to choose:

📦 Workers KV
  Best for: Config, feature flags, sessions, HTML pages, user preferences
  Consistency: Eventually consistent (60s propagation)
  Reads: Ultra-fast globally (cached at every edge)
  Writes: Slower, propagate globally
  Limit: 25MB per value
  Free tier: 100K reads/day, 1K writes/day

🗄️  D1 (SQLite)
  Best for: Relational data, user records, products, orders, guestbooks
  Consistency: Strong (per-region)
  Queries: Standard SQL
  Free tier: 5GB storage, 25M row reads/day
  Use when: You need JOINs, transactions, or structured queries

🪣 R2 (Object Storage)
  Best for: Images, videos, files, backups, large blobs
  Consistency: Strong
  Egress: FREE (zero egress fees!)
  S3-compatible: Yes
  Free tier: 10GB storage, 1M Class A ops/month
  Use when: Files larger than 25MB or S3 compatibility needed

🎯 Durable Objects
  Best for: Real-time state, coordination, WebSockets, rate limiters, game state
  Consistency: Strongly consistent (single source of truth)
  Storage: SQLite per object
  Use when: You need a single authoritative instance with compute + storage

🔍 Vectorize
  Best for: Semantic search, AI embeddings, recommendations, similarity search
  Use when: You're building AI features that need vector similarity search

💡 Quick rules:
  • Storing files/media → R2
  • Storing structured records → D1
  • Storing config/sessions → KV
  • Real-time coordination → Durable Objects
  • AI similarity search → Vectorize`;

        return { content: [{ type: "text", text: guide }] };
      }
    );

    // ─────────────────────────────────────────────
    // Tool 6: Wrangler command helper
    // ─────────────────────────────────────────────
    this.server.tool(
      "wrangler_help",
      "Get the correct Wrangler CLI command for a common Cloudflare development task",
      {
        task: z.enum([
          "deploy_worker", "local_dev", "view_logs", "add_secret", "list_secrets",
          "create_kv", "list_kv", "write_kv", "read_kv", "delete_kv",
          "create_d1", "query_d1", "list_d1",
          "create_r2", "list_r2",
          "login", "whoami", "init_project"
        ]).describe("The task you want to accomplish with Wrangler"),
      },
      async ({ task }) => {
        const commands = {
          deploy_worker: "npx wrangler deploy\n\nDeploys your Worker to production. Run from your project folder containing wrangler.toml.",
          local_dev: "npx wrangler dev\n\nStarts a local development server with hot reload. Your Worker runs at http://localhost:8787 by default.",
          view_logs: "npx wrangler tail\n\nStreams real-time logs from your deployed Worker. Shows requests, console.log output, and errors.",
          add_secret: "npx wrangler secret put SECRET_NAME\n\nPrompts for a value and stores it as an encrypted secret. Never put secrets in wrangler.toml!",
          list_secrets: "npx wrangler secret list\n\nLists the names of all secrets stored for your Worker (values are never shown).",
          create_kv: "npx wrangler kv namespace create MY_NAMESPACE\n\nCreates a new KV namespace. Copy the ID into your wrangler.toml bindings.",
          list_kv: "npx wrangler kv key list --namespace-id=<ID>\n\nLists all keys in a KV namespace.",
          write_kv: "npx wrangler kv key put --namespace-id=<ID> mykey 'myvalue'\n\nWrites a key-value pair to KV.",
          read_kv: "npx wrangler kv key get --namespace-id=<ID> mykey\n\nReads a value from KV by key.",
          delete_kv: "npx wrangler kv key delete --namespace-id=<ID> mykey\n\nDeletes a key from KV.",
          create_d1: "npx wrangler d1 create my-database\n\nCreates a new D1 database. Copy the database_id into your wrangler.toml.",
          query_d1: "npx wrangler d1 execute my-database --command='SELECT * FROM users LIMIT 10'\n\nRuns a SQL query against your D1 database directly from CLI.",
          list_d1: "npx wrangler d1 list\n\nLists all D1 databases in your Cloudflare account.",
          create_r2: "npx wrangler r2 bucket create my-bucket\n\nCreates a new R2 bucket.",
          list_r2: "npx wrangler r2 bucket list\n\nLists all R2 buckets in your account.",
          login: "npx wrangler login\n\nOpens browser to authenticate Wrangler with your Cloudflare account via OAuth.",
          whoami: "npx wrangler whoami\n\nShows which Cloudflare account Wrangler is currently authenticated as.",
          init_project: "npm create cloudflare@latest my-project\n\nScaffolds a new Cloudflare Workers project with templates for Workers, Pages, D1, KV, and more.",
        };
        return { content: [{ type: "text", text: commands[task] }] };
      }
    );
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    // Landing page
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="https://build.siliceoroman.xyz/favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MCP Server — Build on Cloudflare</title>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --cf-orange: #F6821F;
      --cf-dark: #0A0A0B;
      --cf-dark-2: #111114;
      --cf-dark-3: #1A1A1F;
      --cf-border: rgba(255,255,255,0.07);
      --cf-text: #E8E8EC;
      --cf-muted: #6B6B7A;
    }
    body { font-family: 'Syne', sans-serif; background: var(--cf-dark); color: var(--cf-text); min-height: 100vh; }
    body::before {
      content: ''; position: fixed; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(246,130,31,0.1) 0%, transparent 60%);
      pointer-events: none;
    }
    header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 2rem; height: 60px;
      background: rgba(10,10,11,0.85); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--cf-border); position: sticky; top: 0; z-index: 100;
    }
    .logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1rem; color: var(--cf-text); text-decoration: none; letter-spacing: -0.02em; }
    .logo span { color: var(--cf-orange); }
    .back-link { font-family: 'Geist Mono', monospace; font-size: 0.72rem; color: var(--cf-muted); text-decoration: none; }
    main { max-width: 780px; margin: 0 auto; padding: 4rem 1.5rem; position: relative; z-index: 1; }
    .page-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      font-family: 'Geist Mono', monospace; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase;
      color: var(--cf-orange); background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.25);
      padding: 0.3rem 0.8rem; border-radius: 100px; margin-bottom: 1.5rem;
    }
    h1 { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.04em; color: #fff; margin-bottom: 0.75rem; }
    .subtitle { color: var(--cf-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 3rem; }
    .endpoint-card { background: var(--cf-dark-2); border: 1px solid var(--cf-border); border-radius: 16px; padding: 2rem; margin-bottom: 2rem; }
    .card-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1.25rem; }
    .endpoint-row { display: flex; align-items: center; gap: 0.75rem; background: var(--cf-dark-3); border: 1px solid var(--cf-border); border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 0.75rem; }
    .method { font-family: 'Geist Mono', monospace; font-size: 0.65rem; font-weight: 700; color: var(--cf-orange); background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.2); padding: 0.2rem 0.5rem; border-radius: 4px; flex-shrink: 0; }
    .endpoint-url { font-family: 'Geist Mono', monospace; font-size: 0.78rem; color: var(--cf-text); flex: 1; }
    .endpoint-desc { font-family: 'Geist Mono', monospace; font-size: 0.65rem; color: var(--cf-muted); }
    .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1px; background: var(--cf-border); border: 1px solid var(--cf-border); border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
    .tool-item { background: var(--cf-dark-2); padding: 1.25rem; }
    .tool-name { font-family: 'Geist Mono', monospace; font-size: 0.78rem; color: var(--cf-orange); margin-bottom: 0.4rem; }
    .tool-desc { font-size: 0.82rem; color: var(--cf-muted); line-height: 1.5; }
    .connect-card { background: var(--cf-dark-2); border: 1px solid rgba(246,130,31,0.2); border-radius: 16px; padding: 2rem; }
    .connect-title { font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 1rem; }
    .connect-step { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
    .step-num { font-family: 'Geist Mono', monospace; font-size: 0.65rem; color: var(--cf-orange); background: rgba(246,130,31,0.1); border: 1px solid rgba(246,130,31,0.2); width: 24px; height: 24px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .step-text { font-size: 0.85rem; color: var(--cf-muted); line-height: 1.6; }
    .step-text strong { color: var(--cf-text); }
    .step-text code { font-family: 'Geist Mono', monospace; font-size: 0.78rem; background: var(--cf-dark-3); padding: 0.1rem 0.4rem; border-radius: 4px; color: var(--cf-orange); }
  </style>
</head>
<body>
  <header>
    <a href="https://build.siliceoroman.xyz" class="logo">Build on <span>Cloudflare</span></a>
    <a href="https://build.siliceoroman.xyz" class="back-link">← Back to projects</a>
  </header>
  <main>
    <div class="page-badge">Project 07 — Workers + MCP · v2.0</div>
    <h1>MCP Server</h1>
    <p class="subtitle">A remote Model Context Protocol server running on Cloudflare Workers. Connect Claude Desktop to access a Cloudflare expert with knowledge of 50+ products, a calculator, word counter, storage advisor, and Wrangler command helper.</p>

    <div class="endpoint-card">
      <div class="card-title">🔌 Endpoints</div>
      <div class="endpoint-row">
        <span class="method">SSE</span>
        <span class="endpoint-url">${url.origin}/sse</span>
        <span class="endpoint-desc">For Claude Desktop</span>
      </div>
      <div class="endpoint-row">
        <span class="method">HTTP</span>
        <span class="endpoint-url">${url.origin}/mcp</span>
        <span class="endpoint-desc">Streamable HTTP transport</span>
      </div>
    </div>

    <div class="card-title" style="margin-bottom:1rem;">🛠️ Available Tools</div>
    <div class="tools-grid">
      <div class="tool-item">
        <div class="tool-name">cloudflare_info</div>
        <div class="tool-desc">Expert info on 50+ Cloudflare products — Workers, D1, R2, KV, AI, Zero Trust, Terraform, and more</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">calculate</div>
        <div class="tool-desc">Evaluate math expressions like "2 + 2" or "10 * 5 / 2"</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">get_joke</div>
        <div class="tool-desc">Returns a random developer joke</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">count_words</div>
        <div class="tool-desc">Count words, characters, and sentences in any text</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">compare_storage</div>
        <div class="tool-desc">Get a storage recommendation: KV vs D1 vs R2 vs Durable Objects vs Vectorize</div>
      </div>
      <div class="tool-item">
        <div class="tool-name">wrangler_help</div>
        <div class="tool-desc">Get the exact Wrangler CLI command for any common Cloudflare dev task</div>
      </div>
    </div>

    <div class="connect-card">
      <div class="connect-title">⚡ Connect Claude to this MCP Server</div>
      <div class="connect-step">
        <div class="step-num">1</div>
        <div class="step-text">Open <strong>Claude Desktop</strong> → <strong>Settings → Developer → Edit Config</strong></div>
      </div>
      <div class="connect-step">
        <div class="step-num">2</div>
        <div class="step-text">Add to <code>claude_desktop_config.json</code>:<br/><br/>
        <code>{ "mcpServers": { "cloudflare": { "command": "npx", "args": ["mcp-remote", "${url.origin}/sse", "--transport", "sse-only"] } } }</code></div>
      </div>
      <div class="connect-step">
        <div class="step-num">3</div>
        <div class="step-text"><strong>Restart Claude Desktop</strong> and look for the cloudflare toggle in the + menu</div>
      </div>
      <div class="connect-step">
        <div class="step-num">4</div>
        <div class="step-text">Ask Claude: <strong>"What's the difference between D1 and KV?"</strong> or <strong>"What Wrangler command do I use to view logs?"</strong></div>
      </div>
    </div>
  </main>
</body>
</html>`, { headers: { "Content-Type": "text/html" } });
  }
};
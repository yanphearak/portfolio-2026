// ============================================================================
//  EDIT THIS FILE — everything on the site reads from here.
//  Replace the placeholder values below with your own. Nothing else to touch.
// ============================================================================

export const site = {
  // --- Basics -------------------------------------------------------------
  name: "Phearak Yan",
  role: "DevOps Engineer",
  // Short line under your name in the hero. Keep it to one sentence.
  tagline:
    "I automate software delivery with Jenkins, Ansible and ArgoCD, on-premise and in the cloud, and I'm building self-hosted AI agents that run tasks with a human in the loop.",
  location: "Phnom Penh, Cambodia",
  // Profile photo. Drop the file in `public/` and point at it with a leading
  // slash. Set to "" and the portrait disappears from the About section.
  photo: "/profile.jpg",
  photoAlt: "Portrait of Phearak Yan",
  // Shown in the browser tab and in link previews.
  seoTitle: "Phearak Yan — DevOps Engineer",
  seoDescription:
    "DevOps Engineer automating CI/CD and deployments with Jenkins, Ansible, ArgoCD and Kubernetes, on-premise and in the cloud, plus self-hosted LLM agents for server operations.",
  // Used for absolute URLs in metadata (OG image, canonical). Update this if
  // you attach a custom domain.
  url: "https://portfolio.rakhall.fun",

  // --- Availability line in the hero --------------------------------------
  // A green dot and this text under your role. Set `available: false` to drop
  // it entirely. Keep the text short — it sits on one line.
  available: true,
  availabilityText: "Exploring new opportunities",

  // --- Links --------------------------------------------------------------
  // Remove any line you don't want; the icon disappears with it.
  links: {
    email: "yanphearak.program@gmail.com",
    github: "https://github.com/yanphearak",
    linkedin: "https://www.linkedin.com/in/yan-phearak-57b5a124b",
    telegram: "https://t.me/yanphearak",
    // Drop `resume.pdf` into `public/` and set this to "/resume.pdf" to bring
    // the Resume button back. Empty until then, so it can't 404 in production.
    resume: "",
  },

  // --- Outcome line (hero) ------------------------------------------------
  // The line under the hero, drawn as stops left to right, so ORDER
  // MATTERS: each entry should follow from the one before it. The default
  // reads as an argument — the experience produced the automation, which
  // bought back time, which cut cost — rather than four unrelated facts.
  //
  // Deliberately no invented numbers on the time and cost entries: a figure
  // nobody can verify reads as marketing, while a plain claim reads as fact.
  // Keep values to two or three words; they're set large and don't wrap well.
  outcomes: [
    { label: "Experience", value: "3+ years" },
    { label: "Automation", value: "100+ pipelines" },
    { label: "Time", value: "Faster releases" },
    { label: "Cost", value: "Lower run cost" },
  ],

  // --- Section order ------------------------------------------------------
  // The single source of truth for what appears on the page and in what order.
  // Reorder or delete a line and the page, the nav and the scroll-spy all
  // follow — the first section starts the line and the last one ends it.
  order: [
    "about",
    "skills",
    "education",
    "experience",
    "contact",
  ],

  // --- Section headings ---------------------------------------------------
  // `label` names the section's stop on the line (in the left margin on wide
  // screens); `nav` is the (usually shorter) word in the top bar; `subtitle`
  // is the big heading.
  sections: {
    about: {
      label: "About",
      nav: "About",
      subtitle: "I make shipping to production a non-event.",
    },
    skills: {
      label: "Toolchain",
      nav: "Toolchain",
      subtitle: "The stack I reach for, day to day.",
    },
    education: {
      label: "Education",
      nav: "Education",
      subtitle: "Where the fundamentals came from.",
    },
    experience: {
      label: "Experience",
      nav: "Experience",
      subtitle: "Where I've been on call.",
    },
    contact: {
      label: "Contact",
      nav: "Contact",
      subtitle: "Let's build something reliable",
    },
  },

  // --- About --------------------------------------------------------------
  about: {
    // Each string is its own paragraph.
    paragraphs: [
      "I'm Phearak, a DevOps Engineer focused on Continuous Integration and Continuous Delivery (CI/CD) — helping teams move code from commit to a reliable, running service.",
      "I use Jenkins to handle CI and Ansible and Argo CD to deliver applications into Kubernetes environments. For smaller projects, I keep things simple with Jenkins and Ansible pipelines. For larger projects, Jenkins handles CI while Argo CD takes care of continuous delivery, ensuring that the cluster state stays aligned with Git and making rollbacks as simple as reverting a change.",
      "Before becoming a DevOps Engineer, I spent time writing code during university and later while working at a ministry. That experience gave me an understanding of how developers think, build, and troubleshoot software, which has shaped the way I approach DevOps today.",
      "More recently, I've been building a DevOps AI agent to help with my day-to-day tasks. It can connect to servers and execute tasks with explicit human approval, integrate with different monitoring tools, and access a knowledge base of internal documentation. The AI runs entirely in-house, keeping internal data within our own network while helping me troubleshoot issues, find information, and manage infrastructure more efficiently.",
    ],
    // Photo in the right-hand column, beside the text. Drop the file in
    // `public/` and point at it with a leading slash, same as `photo` above.
    // Set to "" and the column empties out, leaving the prose full width.
    image: "/about.jpg",
    imageAlt: "\"Rak\" written by hand in wet sand, a wave washing in behind it",
  },

  // --- Toolchain card animations ------------------------------------------
  // Copy for the looping visual inside each skills card. Purely decorative —
  // every number here is illustrative, not measured. Each group below picks
  // one of these by its `vis` key.
  visuals: {
    // `ms` is how long a stage sits on screen; `took` is the number it prints
    // once it clears.
    pipeline: {
      label: "Pipeline",
      run: "#412",
      stages: [
        { name: "checkout", took: "0.4s", ms: 650 },
        { name: "jenkins build", took: "1m12s", ms: 1700 },
        { name: "security scan", took: "48s", ms: 1400 },
        { name: "push to registry", took: "34s", ms: 1300 },
        { name: "argocd sync", took: "11s", ms: 1200 },
        { name: "k8s rollout", took: "19s", ms: 1500 },
      ],
    },
    rollout: {
      label: "Rollout",
      app: "api · v2.4.1",
      // One box per node, each holding `podsPerNode` replicas. Three across is
      // what fits the card — adding a fourth would squeeze the labels.
      nodes: ["node-1", "node-2", "node-3"],
      podsPerNode: 4,
    },
    anomaly: {
      label: "Anomaly",
      model: "machine learning",
      stream: "txn stream",
      // The transaction the model flags, and how long the alert takes to reach
      // Telegram. Fixed values — see the hydration note in the components.
      txn: "#8471",
      latency: "0.8s",
    },
    // The ops agent transcript: a question, a hand-off, a command held for human
    // approval, then the run. Same shape as the real thing.
    //
    // The host is from 203.0.113.0/24 — the block RFC 5737 reserves for
    // documentation. It looks like a public address but can never route to a
    // real machine, which is what you want in a decorative animation.
    agent: {
      label: "Ops agent",
      host: "203.0.113.42",
      ask: "check disk on 203.0.113.42",
      delegate: "delegating to devops_agent",
      command: "df -h",
      result: "/ 62% · /data 66%",
    },
    metrics: {
      label: "Observability",
      host: "app-01",
      chart: "p95 latency",
      stream: "app.log",
      // Tailed on a loop beside the chart. `lvl` picks the line's colour. Keep
      // messages short — this pane is half a card wide in the 3-up grid.
      lines: [
        { t: "12:04", lvl: "info", msg: "GET /health 200" },
        { t: "12:04", lvl: "ok", msg: "argocd sync ok" },
        { t: "12:05", lvl: "dbg", msg: "scrape ok" },
        { t: "12:05", lvl: "info", msg: "POST /jobs 201" },
        { t: "12:05", lvl: "ok", msg: "probe 3/3 ready" },
        { t: "12:06", lvl: "info", msg: "GET /jobs 200" },
        { t: "12:06", lvl: "dbg", msg: "cache 0.94" },
        { t: "12:06", lvl: "info", msg: "GET /metrics 200" },
        { t: "12:07", lvl: "ok", msg: "cert 89d left" },
        { t: "12:07", lvl: "dbg", msg: "gc pause 4ms" },
        { t: "12:07", lvl: "info", msg: "GET /health 200" },
        { t: "12:08", lvl: "ok", msg: "nginx reload ok" },
      ],
    },
    scan: {
      label: "Scan",
      repo: "main",
      checks: [
        { name: "dependencies", result: "0 critical" },
        { name: "jfrog xray", result: "no cves" },
        { name: "secrets", result: "sealed" },
        { name: "code smells", result: "gate passed" },
      ],
    },
  },

  // --- Skills -------------------------------------------------------------
  // Grouped into cards. Add or remove groups freely. `vis` picks which animation
  // plays inside the card — one of the keys in `visuals` above — and with it
  // the card's line colour (`--line-<vis>` in globals.css).
  skills: [
    {
      title: "CI/CD & Automation",
      vis: "pipeline",
      items: [
        "Jenkins",
        "Ansible",
        "ArgoCD",
        "Helm",
        "Groovy",
        "Bash",
        "Python",
        "Git",
      ],
    },
    {
      title: "Containers & Orchestration",
      vis: "rollout",
      items: ["Kubernetes", "Docker", "JFrog"],
    },
    {
      title: "Anomaly Detection",
      vis: "anomaly",
      items: ["Machine Learning", "Java", "Elasticsearch", "Telegram Bot"],
    },
    {
      title: "AI & LLM Platform",
      vis: "agent",
      items: [
        "vLLM",
        "Google ADK",
        "RAG",
        "Vector DB",
        "Embeddings",
        "Python",
        "Next.js",
      ],
    },
    {
      title: "Observability & Logging",
      vis: "metrics",
      items: ["Prometheus", "Grafana", "Elastic Stack"],
    },
    {
      title: "Security & Secrets",
      vis: "scan",
      items: ["Vault", "SonarQube", "JFrog Xray"],
    },
  ],

  // --- Education ----------------------------------------------------------
  // Newest first. Everything except `degree` and `school` is optional:
  //   `credential` — the small tag under the dates (e.g. "Degree", "Certificate")
  //   `description` — one or two sentences, or drop the line entirely
  //   `highlights` — coursework, thesis, awards; rendered as chips
  //   `link` — school or certificate URL; leave "" and the icon disappears
  //   `image` — photo under the heading; file in `public/`, leading slash.
  //     Leave "" and the entry is text only.
  //   `snippet` — set true for exactly one entry to show the runnable
  //     hello-world card under it (see components/HelloWorldSnippet.tsx)
  // Keep the `highlights` key even when empty — omitting it breaks the build.
  education: [
    {
      degree: "Bachelor of Computer Science",
      school: "Royal University of Phnom Penh",
      period: "March 2020 — 2024",
      location: "Phnom Penh, Cambodia",
      credential: "Degree",
      image: "/education-university.jpg",
      imageAlt:
        "A long campus building at sunrise, with the Phnom Penh skyline in the distance",
      description: "",
      highlights: [],
      link: "",
      snippet: true,
    },
    {
      degree: "High School Diploma",
      school: "Beltei International School",
      period: "2017 — 2020",
      location: "Phnom Penh, Cambodia",
      credential: "Diploma",
      image: "/education-highschool.jpg",
      imageAlt:
        "The entrance to BELTEI International School, Campus 7, in Phnom Penh",
      description: "",
      highlights: [],
      link: "",
      snippet: false,
    },
  ],

  // --- Experience ---------------------------------------------------------
  // Newest first. Use "Present" as the end date for your current role.
  //
  // The section renders as a timeline, one stop per role. `type` is the
  // employment type shown beside the company, and `logo` points at a file in
  // `public/logos/`. Set `logo: ""` and that company falls back to a lettered
  // tile, so a missing file never leaves a broken image. The first four
  // `highlights` show; the rest fold behind "Show more". `short` is a compact
  // name kept for any place a full ministry name won't fit.
  experience: [
    {
      role: "DevOps Engineer",
      company: "ABA Bank",
      short: "ABA Bank",
      logo: "/logos/aba-bank.png",
      type: "Full-time",
      period: "April 2024 — Present",
      description:
        "Run application delivery and platform reliability across the primary data centre and the DR site, keeping the two consistent and releases invisible to users.",
      highlights: [
        "Managed application environments in the DR site, keeping them consistent with the primary data centre so a failover is a non-event.",
        "Implemented CI/CD pipelines for application delivery.",
        "Built centralised monitoring across the VM estate.",
        "Built centralised log aggregation for applications.",
        "Implemented zero-downtime deployment so releases land without a maintenance window.",
        "Deployed and maintained server inventory management tooling.",
        "Configured and tuned the web servers fronting the applications.",
        "Administered MongoDB replica sets for high availability and data resilience.",
        "Remediated server vulnerabilities as part of routine patching.",
      ],
    },
    {
      role: "DevOps Engineer",
      company: "Pointer Property",
      short: "Pointer Property",
      logo: "/logos/pointer-property.svg",
      type: "Full-time",
      period: "May 2023 — March 2024",
      description:
        "Stood up the company's self-hosted engineering platform — source control, CI/CD, monitoring and hosting — and ran the databases and cloud services behind it.",
      highlights: [
        "Established self-hosted GitLab alongside project and container management tooling.",
        "Implemented CI/CD pipelines with GitLab CI/CD and Ansible.",
        "Set up file sharing on the local server.",
        "Managed the virtual machines running on the local server.",
        "Implemented monitoring with Grafana, Prometheus, Uptime Kuma and the ELK stack.",
        "Managed AWS RDS, S3 buckets and Google API keys.",
        "Ran database backup and restoration for MySQL and PostgreSQL.",
        "Administered user access controls for secure database management.",
        "Hosted and maintained web applications, APIs and WordPress sites.",
        "Managed the API gateway and routing for a microservices architecture.",
        "Dockerised Nest.js, Nuxt.js and Laravel applications with Docker Compose.",
        "Produced detailed hosting payment reports for financial analysis and planning.",
      ],
    },
    {
      role: "FullStack Developer",
      company: "Ministry of Public Works and Transport",
      short: "Ministry of Transport",
      logo: "/logos/mpwt.png",
      type: "Full-time",
      period: "March 2022 — May 2023",
      description:
        "Built government web applications end to end with Laravel and Angular, then containerised them and put them behind CI/CD.",
      highlights: [
        "Developed the Driver's Licence Point Deduction API in Laravel.",
        "Built the Road Care web admin with Angular and Laravel.",
        "Worked with stakeholders to gather requirements, plan features and deliver on schedule.",
        "Dockerised Laravel, Node.js and Angular applications.",
        "Implemented CI/CD for the development and UAT environments.",
      ],
    },
  ],

  // --- Contact ------------------------------------------------------------
  // The heading above this paragraph is `sections.contact.subtitle`.
  contact: {
    body: "Open to DevOps roles: building CI/CD pipelines, automating infrastructure, and keeping services reliable and observable, whether on-premise, cloud or hybrid. The fastest way to reach me is email.",
  },
} as const;

export type Site = typeof site;

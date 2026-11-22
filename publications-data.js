// Single source of truth for publication cards on index.html and publications.html.
// To add a paper: append an object to `research` (or `other`). Order here does not matter;
// entries are shown newest-first by `year`, then by `order` (higher = newer within a year).
//
// Fields:
//   title, authors (array; "*" suffix marks equal contribution), venue (short label), year,
//   media: { image, video?, fit? ("cover" | "contain") }  (paths relative to site root)
//   links: { project?, paper?, arxiv?, code? }
//   selected: true  -> also shown in "Selected work" on the home page
//   hidden: true    -> not rendered anywhere (use for drafts)

const ME = "Itay Hazan";

const research = [
  {
    title: "FlowMo: Variance-Based Flow Guidance for Coherent Motion in Video Generation",
    authors: ["Ariel Shaulov*", "Itay Hazan*", "Lior Wolf", "Hila Chefer"],
    venue: "NeurIPS 2025",
    year: 2025,
    order: 1,
    media: { image: "assets/img/pubs/flowmo.jpg", video: "assets/img/pubs/flowmo.mp4" },
    links: {
      project: "https://arielshaulov.github.io/FlowMo/",
      arxiv: "https://arxiv.org/abs/2506.01144",
      code: "https://github.com/arielshaulov/FlowMo"
    },
    selected: true
  },
  {
    title: "Inference-Time Pointwise Velocity for Diffusion Acceleration",
    authors: ["Itay Hazan", "Lior Wolf"],
    venue: "SIGGRAPH Asia 2026 · ACM TOG",
    year: 2026,
    order: 1,
    media: { image: "assets/img/pubs/itpv.jpg" },
    links: {
      project: "https://itayhzn.github.io/ITPV/",
      paper: "https://doi.org/10.1145/3842513"
    },
    selected: true
  },
  {
    title: "Remasking in Diffusion Language Models Repairs Self-Conditioning Rather Than Context",
    authors: ["Itay Hazan", "Lior Wolf"],
    venue: "NLDL 2026 · Oral",
    year: 2026,
    order: 2,
    media: { image: "assets/img/pubs/remasking.png", fit: "contain" },
    links: { project: "https://itayhzn.github.io/remasking-nldl/" },
    selected: true
  },
  {
    title: "TokTimer: Per-Token Denoising Time for Enhanced Prompt Alignment in Flow-Matching Diffusion Models",
    authors: ["Itay Hazan", "Lior Wolf"],
    venue: "EACL 2027",
    year: 2027,
    order: 1,
    media: { image: "assets/img/pubs/toktimer.jpg" },
    links: { project: "https://itayhzn.github.io/TokTimer/" },
    selected: true
  },
  {
    title: "Speculative Self-Guidance for Diffusion Language Models",
    authors: ["Itay Hazan", "Lior Wolf"],
    venue: "EACL 2027",
    year: 2027,
    order: 2,
    media: { image: "assets/img/pubs/ssg.png", fit: "contain" },
    links: { project: "https://itayhzn.github.io/SSG/" },
    selected: true
  },
  {
    title: "Mix-and-Match: Generating Globally Coherent Images from Interchangeable Tiles",
    authors: ["Shaham Zilber*", "Itay Hazan*", "Lior Wolf"],
    venue: "Preprint · Under review",
    year: 2027,
    order: 3,
    media: { image: "assets/img/pubs/mixmatch.jpg", video: "assets/img/pubs/mixmatch.mp4" },
    links: {
      project: "https://itayhzn.github.io/mix-and-match/",
      code: "https://github.com/itayhzn/mix-and-match"
    },
    selected: true
  }
];

const other = [
  {
    title: "Two-Party Direct-Sum Questions Through the Lens of Multiparty Communication Complexity",
    authors: ["Itay Hazan", "Eyal Kushilevitz"],
    venue: "DISC 2017",
    year: 2017,
    field: "Communication complexity",
    links: {
      paper: "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.DISC.2017.26",
      pdf: "https://drops.dagstuhl.de/storage/00lipics/lipics-vol091-disc2017/LIPIcs.DISC.2017.26/LIPIcs.DISC.2017.26.pdf"
    }
  },
  {
    title: "Effectiveness of BNT162b2 mRNA COVID-19 Vaccine Against SARS-CoV-2 Variant Beta (B.1.351) Among Persons Identified Through Contact Tracing in Israel: A Prospective Cohort Study",
    authors: ["Shepherd R. Singer", "Frederick J. Angulo", "David L. Swerdlow", "John M. McLaughlin", "Itay Hazan", "Netanel Ginish", "Emilia Anis", "Ella Mendelson", "Orna Mor", "Neta S. Zuckerman", "Oran Erster", "Jo Southern", "Kaijie Pan", "Gabriel Mircus", "Marc Lipsitch", "Eric J. Haas", "Luis Jodar", "Yeheskel Levy", "Sharon Alroy-Preis"],
    venue: "eClinicalMedicine (The Lancet)",
    year: 2021,
    order: 1,
    field: "Epidemiology",
    links: {
      paper: "https://doi.org/10.1016/j.eclinm.2021.101190",
      pdf: "https://www.thelancet.com/pdfs/journals/eclinm/PIIS2589-5370(21)00471-5.pdf"
    }
  },
  {
    title: "BNT162b2 Vaccine Effectiveness Was Marginally Affected by the SARS-CoV-2 Beta Variant in Fully Vaccinated Individuals",
    authors: ["Orna Mor", "Neta S. Zuckerman", "Itay Hazan", "Ronen Fluss", "Nachman Ash", "Netanel Ginish", "Ella Mendelson", "Sharon Alroy-Preis", "Laurence Freedman", "Amit Huppert"],
    venue: "Journal of Clinical Epidemiology",
    year: 2022,
    field: "Epidemiology",
    links: {
      paper: "https://doi.org/10.1016/j.jclinepi.2021.10.011",
      pdf: "https://www.jclinepi.com/article/S0895435621003401/pdf"
    }
  },
  {
    title: "Multisystemic Inflammatory Syndrome in Children and the BNT162b2 Vaccine: A Nationwide Cohort Study",
    authors: ["Naama Schwartz", "Ronit Ratzon", "Itay Hazan", "Deena Rachel Zimmerman", "Shepherd Roee Singer", "Janice Wasser", "Tunie Dweck", "Sharon Alroy-Preis"],
    venue: "European Journal of Pediatrics",
    year: 2024,
    field: "Epidemiology",
    links: {
      paper: "https://doi.org/10.1007/s00431-024-05586-4",
      semanticScholar: "https://www.semanticscholar.org/paper/Multisystemic-inflammatory-syndrome-in-children-and-Schwartz-Ratzon/e723860b4cc481ce78d52916887686b3e7b7535e"
    }
  }
];

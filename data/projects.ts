// data/projects.ts
export type Project = {
  title: string;
  projectName?: string;
  description: string;
  role: string;
  period?: string;
  achievements: string[];
  technologies: string[];
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Digital Apprentice Service",
    projectName: "Digital Apprentice Service",
    description:
      "Maintaining and developing the infrastructure for all services under the Digital Apprentice Service, leveraging Azure Cloud and Infrastructure as Code best practices. Focused on optimizing deployments, modernizing pipelines, and ensuring robust, scalable cloud environments.",
    role: "DevOps Engineer",
    period: "Jul 2023 – Present",
    achievements: [
      "Developed new PowerShell scripts and integrated them into CI/CD pipelines to automate Azure resource deployments",
      "Converted legacy classic pipelines to modern YAML-based pipelines for improved maintainability and transparency",
      "Led the migration from ARM templates to Bicep, streamlining infrastructure-as-code and enabling easier resource management",
    ],
    technologies: ["Azure", "Azure DevOps", "ARM", "Bicep", "PowerShell"],
  },
  {
    title: "Home Office",
    projectName: "Cerberus",
    description:
      "Core engineer for Cerberus, a Spring Boot-based microservice with a React frontend that enabled internal border agents to view, filter, and analyze consignments and air packages entering the UK. Cerberus supports national security by surfacing critical data at the right time for decision-makers.",
    role: "Full-Stack Engineer",
    period: "Nov 2020 – May 2023",
    achievements: [
      "Designed and developed a custom UI library from scratch to standardize and accelerate front-end development",
      "Implemented advanced sorting and filtering mechanisms to streamline user workflows and surface the most relevant consignments",
      "Built an automated reporting system using Jasper Reports, delivering actionable reports to end-users monthly",
      "Transformed third-party vendor data from Kafka topics using complex business logic to ensure clarity and usability within Cerberus",
    ],
    technologies: [
      "TypeScript",
      "Java",
      "SQL",
      "Spring Boot",
      "Redux",
      "React",
      "Kafka",
      "Jasper Reports",
    ],
    href: "https://www.baesystems.com/en/article/bae-systems-partners-with-home-office-to-help-identify-national-security-risks-at-the-uk-border",
  },
  {
    projectName: "EDHMT",
    title: "HM Revenue and Customs — EDHMT",
    description:
      "Engineered EDHMT, an entity matching tool used to analyze HMRC’s monthly data runs for fraud detection. Integrated with BAE's NetReveal software to enhance entity matching and support the MCR team’s advanced data analysis workflows. The system helped HMRC uncover complex tax fraud patterns across vast data sets.",
    role: "Software/Data Engineer",
    period: "Aug 2018 – Sep 2020",
    achievements: [
      "Developed custom algorithms for precise entity matching to support tax fraud investigations",
      "Deployed the solution to distributed clusters, optimizing performance on edge nodes",
      "Integrated monthly HMRC data with NetReveal, automating analysis and reporting for the MCR team",
      "Enabled scalable and high-throughput processing for large-scale government data sets",
    ],
    technologies: ["Java", "Distributed Computing"],
    href: "https://www.baesystems.com/en/story/using-technology-to-help-hmrc-find-more-tax-fraud",
  },
];

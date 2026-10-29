// All copy and imagery for the landing page lives here so it can be swapped
// for real MIVA assets without touching the components.
// Images are Unsplash placeholders — replace with brand photography.

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2000&q=80`;

export const images = {
  roboticLine: unsplash("1647427060118-4911c9821b82"),
  carAssembly: unsplash("1567789884554-0b844b597180"),
  machinery: unsplash("1537462715879-360eeb61a0ad"),
  operator: unsplash("1581092335397-9583eb92d232"),
  engineer: unsplash("1581093804475-577d72e38aa0"),
  warehouse: unsplash("1586528116311-ad8dd3c8310d"),
  warehouseAisle: unsplash("1553413077-190dd305871c"),
  construction: unsplash("1541888946425-d81bb19240f5"),
  agriculture: unsplash("1625246333195-78d9c38ad449"),
  welding: unsplash("1504328345606-18bbc8c9d7d1"),
  humanoid: unsplash("1555255707-c07966088b7b"),
};

export const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Technology", href: "#technology" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
];

export const heroSlides = [images.roboticLine, images.carAssembly];

export const features = [
  {
    icon: "gear",
    title: "Customizable Robotics",
    body: "Flexible robotic systems designed to adapt smoothly across modern and dynamic factory workflows seamlessly.",
  },
  {
    icon: "layers",
    title: "Affordable Intelligence",
    body: "Subscription-based automation solutions that remove heavy upfront costs and simplify adoption.",
  },
  {
    icon: "ring",
    title: "AI-Driven Learning",
    body: "AI and vision intelligence that adapts to new tasks while reducing manual effort and dependency.",
  },
  {
    icon: "hands",
    title: "Hands-On Approach",
    body: "End-to-end deployment covering integration, commissioning, and reliable ongoing operational support.",
  },
] as const;

export const services = [
  { title: ["AI-based automation", "& Robotic system setup"], image: images.machinery },
  { title: ["Fast, easy", "deployment & training"], image: images.operator },
];

// Product taglines from mivarobotics.ai/portfolio/*. The AXIS page had no copy yet — its line is a placeholder.
export const products = [
  { name: "MIVA AXIS", art: "axis", body: "Adaptable industrial robotic arm for flexible, everyday factory automation." },
  { name: "MIVA NAVIS", art: "navis", body: "Smart autonomous mobility for efficient material handling." },
  { name: "MIVA EAGLE", art: "eagle", body: "Autonomous aerial intelligence for monitoring, safety & precision operations." },
  { name: "MIVA EYE", art: "eye", body: "AI-powered vision systems for inspection, monitoring & quality control." },
  { name: "MIVA OS", art: "os", body: "Unified intelligence platform for robotics, vision & automation." },
  { name: "MIVA ASSIST", art: "assist", body: "Collaborative semi-humanoid robot for flexible industrial support. Coming soon." },
] as const;

export type ProductArt = (typeof products)[number]["art"];

export const industries = [
  { name: "Manufacturing", image: images.roboticLine },
  { name: "Automotive", image: images.carAssembly },
  { name: "Logistics", image: images.warehouse },
  { name: "Construction", image: images.construction },
  { name: "Agriculture", image: images.agriculture },
  { name: "Heavy Industry", image: images.welding },
];

export const stats = [
  { value: 75, pad: 0, label: "Large scale projects deployed worldwide" },
  { value: 9, pad: 2, label: "Patents in Automation & Gen-AI" },
  { value: 7, pad: 2, label: "Tech partners around the globe" },
  { value: 100, pad: 0, label: "Years of combined experience" },
];

export const contact = {
  email: "info@mivarobotics.ai",
  phone: "+91-8055507204",
};

// Testimonials as published on mivarobotics.ai.
export const testimonials = [
  {
    quote:
      "Paint inspection has always been a critical and time-consuming process for us. MIVA’s vision-based inspection solution helped us achieve consistent quality checks while significantly reducing manual inspection effort. The system was easy to integrate into our workflow and delivered reliable, repeatable results from day one.",
    name: "Bhavyaraj V., VP Production",
    company: "Rocket Engineering Corporation Pvt. Ltd.",
    image: images.carAssembly,
  },
  {
    quote:
      "Material handling was one of our biggest operational bottlenecks. With MIVA’s automation solution, we were able to streamline internal movement, reduce manual dependency, and improve overall shop-floor efficiency. The flexibility of the system made it well-suited for our casting operations.",
    name: "Jaykumar P., MD",
    company: "Suyash Castings Pvt. Ltd.",
    image: images.welding,
  },
  {
    quote:
      "Managing safety and visibility across large construction sites is always a challenge. MIVA’s autonomous surveillance solution gave us real-time monitoring and improved site oversight without adding operational complexity. It has helped us enhance safety standards and decision-making across projects.",
    name: "Rajiv P.",
    company: "Suraj Estate Developers",
    image: images.construction,
  },
];

export const posts = [
  {
    title: "AI and Robotics: From Industrial Luxury to Everyday Necessity",
    image: images.roboticLine,
    tag: "Blog",
    href: "https://mivarobotics.ai/ai-and-robotics-from-industrial-luxury-to-everyday-necessity/",
  },
  {
    title: "Why MSMEs Are Ready for Automation — and What's Been Holding Them Back",
    image: images.operator,
    tag: "Blog",
    href: "https://mivarobotics.ai/why-msmes-are-ready-for-automation-and-whats-been-holding-them-back/",
  },
  {
    title: "Physical AI: When Intelligence Moves from Code to the Real World",
    image: images.humanoid,
    tag: "Blog",
    href: "https://mivarobotics.ai/physical-ai-when-intelligence-moves-from-code-to-the-real-world/",
  },
];

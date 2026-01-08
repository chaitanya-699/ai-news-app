export interface CardItem {
  id: string;
  source: string;
  title: string;
  time: string;
  imageUrl: string;
  summary: string;
}



export const CATEGORIES: string[] = [
  "For You",
  "Latest",
  "Tech",
  "Entertainment",
  "Sports",
  "Politics",
];

export const newsCardColors: string[] = [
  // Electric Blues
  "rgba(0, 153, 255, 0.7)",
  "rgba(0, 195, 255, 0.7)",
  "rgba(64, 156, 255, 0.7)",
  "rgba(80, 180, 255, 0.7)",
  "rgba(120, 210, 255, 0.7)",

  // Neon Cyan / Aqua
  "rgba(0, 255, 230, 0.7)",
  "rgba(64, 255, 240, 0.7)",
  "rgba(90, 240, 230, 0.7)",
  "rgba(120, 255, 245, 0.7)",

  // Neon Greens
  "rgba(0, 255, 120, 0.7)",
  "rgba(70, 255, 150, 0.7)",
  "rgba(120, 255, 180, 0.7)",

  // Neon Yellows
  "rgba(255, 230, 0, 0.7)",
  "rgba(255, 200, 60, 0.7)",

  // Neon Oranges
  "rgba(255, 140, 0, 0.7)",
  "rgba(255, 170, 60, 0.7)",

  // Neon Reds / Pinks
  "rgba(255, 70, 90, 0.7)",
  "rgba(255, 110, 160, 0.7)",

  // Neon Purples
  "rgba(160, 90, 255, 0.7)",
  "rgba(190, 120, 255, 0.7)",
  "rgba(220, 140, 255, 0.7)",

  // Neon Gradient-friendly Soft Whites
  "rgba(200, 220, 255, 0.7)",
  "rgba(210, 240, 255, 0.7)",
];

export const newsCardColors2: string[] = [
  "rgba(255, 107, 107,0.8)",
  "rgba(78, 205, 196,0.8)",
  "rgba(69, 183, 209,0.8)",
  "rgba(255, 160, 122,0.8)",
  "rgba(152, 216, 200,0.8)",
  "rgba(247, 220, 111,0.8)",
  "rgba(255, 159, 28,0.8)",
  "rgba(46, 196, 182,0.8)",
  "rgba(231, 111, 81,0.8)",
  "rgba(244, 162, 97,0.8)",
  "rgba(42, 157, 143,0.8)",
  "rgba(233, 196, 106,0.8)",
  "rgba(244, 226, 133,0.8)",
  "rgba(168, 218, 220,0.8)",
  "rgba(69, 123, 157,0.8)",
  "rgba(29, 53, 87,0.8)",
  "rgba(243, 114, 44,0.8)",
  "rgba(248, 150, 30,0.8)",
  "rgba(249, 132, 74,0.8)",
  "rgba(67, 170, 139,0.8)",
  "rgba(144, 190, 109,0.8)",
  "rgba(87, 117, 144,0.8)",
  "rgba(230, 57, 70,0.8)",
  "rgba(241, 250, 238,0.8)",
  "rgba(164, 165, 255,0.8)",
  "rgba(179, 136, 235,0.8)",
  "rgba(255, 180, 162,0.8)",
  "rgba(255, 200, 221,0.8)",
  "rgba(189, 224, 254,0.8)",
  "rgba(162, 210, 255,0.8)",
  "rgba(255, 202, 212,0.8)",
  "rgba(205, 180, 219,0.8)",
  "rgba(216, 226, 220,0.8)",
  "rgba(255, 229, 217,0.8)",
  "rgba(254, 200, 154,0.8)",
  "rgba(248, 175, 166,0.8)",
  "rgba(181, 228, 140,0.8)",
  "rgba(153, 217, 140,0.8)",
  "rgba(118, 200, 147,0.8)",
  "rgba(82, 182, 154,0.8)",
  "rgba(52, 160, 164,0.8)",
  "rgba(22, 138, 173,0.8)",
  "rgba(26, 117, 159,0.8)",
  "rgba(24, 78, 119,0.8)",
  "rgba(255, 195, 0,0.8)",
  "rgba(255, 87, 51,0.8)",
  "rgba(199, 0, 57,0.8)",
  "rgba(144, 12, 63,0.8)",
  "rgba(218, 247, 166,0.8)",
];

export const NEWS_DATA: CardItem[] = [
  {
    id: "1",
    source: "TechCrunch",
    title: "Apple unveils its first fully on-device AI model",
    time: "2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Apple introduces a new on-device AI model that performs real-time reasoning and privacy-preserving computation without cloud dependency.",
  },
  {
    id: "2",
    source: "The Verge",
    title: "OpenAI releases next-gen multimodal model",
    time: "3h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    summary:
      "OpenAI unveils its latest multimodal AI capable of advanced reasoning across text, vision, audio, and code generation.",
  },
  {
    id: "3",
    source: "Wired",
    title: "Quantum computing enters consumer space",
    time: "5h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Startups are launching consumer-grade quantum hardware and simulators for developers worldwide.",
  },
  {
    id: "4",
    source: "MIT Tech Review",
    title: "Neural chips promise 100x faster AI inference",
    time: "6h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Next-generation neuromorphic chips reduce power usage while dramatically increasing inference speeds.",
  },
  {
    id: "5",
    source: "Forbes",
    title: "AI copilots are replacing traditional IDE workflows",
    time: "7h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1581091215367-59ab6f4b1c79?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Developers increasingly rely on AI copilots to generate, test, and deploy code autonomously.",
  },
  {
    id: "6",
    source: "Bloomberg",
    title: "NVIDIA’s new GPU breaks performance records",
    time: "8h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1612832021036-0c6aa87f9c85?auto=format&fit=crop&w=1200&q=80",
    summary:
      "NVIDIA launches a new AI-optimized GPU delivering unprecedented training throughput.",
  },
  {
    id: "7",
    source: "Reuters",
    title: "India launches national AI cloud infrastructure",
    time: "10h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    summary:
      "The Indian government announces a sovereign AI cloud platform for startups and research institutes.",
  },
  {
    id: "8",
    source: "ZDNet",
    title: "AI powered cybersecurity detects threats instantly",
    time: "11h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    summary:
      "New AI-based security engines are stopping cyberattacks in under 30 milliseconds.",
  },
  {
    id: "9",
    source: "Fast Company",
    title: "Humanoid robots enter commercial workplaces",
    time: "12h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1581091012184-5c4c9fba6b26?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Companies begin deploying humanoid robots for logistics, customer service, and manufacturing.",
  },
  {
    id: "10",
    source: "Nature",
    title: "AI model predicts diseases years before diagnosis",
    time: "14h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1580281657521-0f6bbefb7c2d?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Researchers develop predictive AI systems capable of detecting diseases long before symptoms appear.",
  },
];


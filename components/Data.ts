export interface CardItem {
  id: string;
  title: string;
  color: string;
  subtitle: string;
}

export const DATA: CardItem[] = [
  { id: "1", title: "Card 1", color: "#FF6B6B", subtitle: "First Item" },
  { id: "2", title: "Card 2", color: "#4ECDC4", subtitle: "Second Item" },
  { id: "3", title: "Card 3", color: "#45B7D1", subtitle: "Third Item" },
  { id: "4", title: "Card 4", color: "#FFA07A", subtitle: "Fourth Item" },
  { id: "5", title: "Card 5", color: "#98D8C8", subtitle: "Fifth Item" },
  { id: "6", title: "Card 6", color: "#F7DC6F", subtitle: "Sixth Item" },
];

export const CATEGORIES: string[] = [
  "For You",
  "Latest",
  "Tech",
  "Entertainment",
  "Sports",
  "Politics",
];

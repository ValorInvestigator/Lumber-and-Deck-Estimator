export enum ProjectType {
  DECK = 'DECK',
  FENCE = 'FENCE',
  CHAT = 'CHAT'
}

export enum CedarGrade {
  CLEAR_HEART = 'Clear Heart',
  A_CLEAR = 'A & Better Clear',
  KNOTTY_STK = 'Select Tight Knot (STK)',
  KNOTTY_APPEARANCE = 'Architectural Knotty'
}

export interface MaterialItem {
  name: string;
  description: string;
  quantity: number;
  unit: string;
}

export interface ProjectEstimate {
  id: string;
  type: ProjectType;
  dimensions: string;
  materials: MaterialItem[];
  wasteFactor: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface LumberProduct {
  id: string;
  name: string;
  grade: CedarGrade;
  dimensions: string;
  imageUrl: string;
  description: string;
  usage: string[];
}
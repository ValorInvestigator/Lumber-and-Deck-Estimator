import { CedarGrade, LumberProduct } from './types';

export const CEDAR_PRODUCTS: LumberProduct[] = [
  // --- Decking (Incense Cedar & Red Grandis) ---
  {
    id: 'deck-ic-patio',
    name: '5/4x6 IC Patio S4S EE Dry',
    grade: CedarGrade.KNOTTY_APPEARANCE,
    dimensions: '1" x 5.5"',
    imageUrl: 'https://picsum.photos/400/300',
    description: 'Premium Incense Cedar patio decking. Sourced from Unity Forest Products. Dried for stability.',
    usage: ['Decks', 'Patios']
  },
  {
    id: 'deck-ic-3btr',
    name: '5/4x6 IC #3 & Better S4S EE Dry',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '1" x 5.5"',
    imageUrl: 'https://picsum.photos/401/300',
    description: 'Standard rustic grade Incense Cedar decking. Cost-effective and durable.',
    usage: ['Decks', 'Walkways']
  },
  {
    id: 'deck-red-grandis',
    name: '5/4 Red Grandis PO FAS S4S EE',
    grade: CedarGrade.CLEAR_HEART,
    dimensions: '1" x 5.5"',
    imageUrl: 'https://picsum.photos/411/300',
    description: 'FSC-certified plantation hardwood from Uruguay. A sustainable, premium alternative to Mahogany.',
    usage: ['High-end Decks', 'Furniture']
  },

  // --- Fencing (Incense Cedar) ---
  {
    id: 'fence-picket-ic-3',
    name: '1x6 IC #3 Fencing',
    grade: CedarGrade.KNOTTY_APPEARANCE,
    dimensions: '0.75" x 5.5"',
    imageUrl: 'https://picsum.photos/403/300',
    description: 'Standard Incense Cedar fence picket. Rot resistant.',
    usage: ['Privacy Fences']
  },
  {
    id: 'fence-rail-ic',
    name: '2x4 IC Std Rails Rgh Dry',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '1.5" x 3.5"',
    imageUrl: 'https://picsum.photos/404/300',
    description: 'Rough sawn Incense Cedar rails. Matches cedar pickets perfectly.',
    usage: ['Fence Rails']
  },
  
  // --- Posts ---
  {
    id: 'post-4x4-wc',
    name: '4x4 WC Outs Posts',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '3.5" x 3.5"',
    imageUrl: 'https://picsum.photos/402/300',
    description: 'Utility grade Western Cedar posts.',
    usage: ['Fence Posts']
  },
  {
    id: 'post-6x6-pt',
    name: "6x6 Pressure Treated",
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '5.5" x 5.5"',
    imageUrl: 'https://picsum.photos/405/300',
    description: 'Ground contact pressure treated post for structural deck support.',
    usage: ['Deck Posts', 'Structural']
  },

  // --- Framing ---
  {
    id: 'framing-2x4-df',
    name: '2x4 Doug Fir "Framing"',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '1.5" x 3.5"',
    imageUrl: 'https://picsum.photos/412/300',
    description: 'Standard Douglas Fir framing lumber.',
    usage: ['Framing', 'Fence Rails']
  },
  {
    id: 'framing-2x6-df',
    name: '2x6 Doug Fir "Framing"',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '1.5" x 5.5"',
    imageUrl: 'https://picsum.photos/406/300',
    description: 'Structural Douglas Fir. Ideal for deck joists.',
    usage: ['Joists', 'Framing']
  },
  
  // --- Beams ---
  {
    id: 'beam-4x10-wrc',
    name: '4x10 WRC Per Ft.',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '3.5" x 9.25"',
    imageUrl: 'https://picsum.photos/408/300',
    description: 'Massive Western Red Cedar timber. The gold standard for appearance.',
    usage: ['Beams', 'Pergolas']
  },

  // --- Siding ---
  {
    id: 'siding-bevel-wrc',
    name: '1x10 Cedar Bevel Siding Per Ft.',
    grade: CedarGrade.KNOTTY_APPEARANCE,
    dimensions: '0.75" x 9.25"',
    imageUrl: 'https://picsum.photos/409/300',
    description: 'Classic WRC Bevel Siding. Sourced from Unity Forest Products.',
    usage: ['Siding']
  },
  {
    id: 'siding-bnb-pp',
    name: '1x12 PP S4S (Board and Batten)',
    grade: CedarGrade.KNOTTY_STK,
    dimensions: '0.75" x 11.25"',
    imageUrl: 'https://picsum.photos/410/300',
    description: 'Ponderosa Pine S4S. Perfect for board and batten siding.',
    usage: ['Siding', 'Trim']
  }
];

export const SYSTEM_INSTRUCTION = `You are an expert carpenter and lumber estimator.
Your goal is to help users understand lumber species (Western Red Cedar, Incense Cedar, Douglas Fir) and plan their deck or fence projects.
Focus on construction advice, material selection, and estimating quantities.
Do not mention "Indian Creek Exchange" or specific store hours unless asked about general lumber yard operations.
Always emphasize that estimates should be verified with local building codes.`;

export const WASTE_FACTOR = 0.10;
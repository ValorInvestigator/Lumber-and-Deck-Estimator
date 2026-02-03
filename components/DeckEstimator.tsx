import React, { useState } from 'react';
import { CEDAR_PRODUCTS, WASTE_FACTOR } from '../constants';
import { MaterialItem, ProjectEstimate, ProjectType } from '../types';
import { Button } from './Button';
import { Calculator, Info, Ruler, Layout, CheckSquare } from 'lucide-react';

export const DeckEstimator: React.FC = () => {
  const [width, setWidth] = useState<number>(12);
  const [depth, setDepth] = useState<number>(10);
  const [postSpacing, setPostSpacing] = useState<number>(8);
  const [includeRailings, setIncludeRailings] = useState<boolean>(true);
  const [includeMidRail, setIncludeMidRail] = useState<boolean>(false);
  const [includeLedger, setIncludeLedger] = useState<boolean>(true);
  const [selectedDeckingId, setSelectedDeckingId] = useState<string>('deck-ic-patio');
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);

  const DECKING_WIDTH = 5.5; 
  const DECKING_GAP = 0.125;
  const JOIST_SPACING = 16;

  const calculate = () => {
    const materials: MaterialItem[] = [];

    // 1. Decking
    const effectiveBoardWidthFt = (DECKING_WIDTH + DECKING_GAP) / 12;
    const numberOfRuns = Math.ceil(depth / effectiveBoardWidthFt);
    const rawDeckingLF = numberOfRuns * width;
    const deckingLF = rawDeckingLF * (1 + WASTE_FACTOR);
    const deckingProduct = CEDAR_PRODUCTS.find(p => p.id === selectedDeckingId) || CEDAR_PRODUCTS[0];
    
    materials.push({
      name: deckingProduct.name,
      description: `Surface decking for ${width * depth} sq ft area.`,
      quantity: Math.ceil(deckingLF),
      unit: 'LF'
    });

    // 2. Joists
    const numberOfJoists = Math.ceil((width * 12) / JOIST_SPACING) + 1;
    const joistLF = numberOfJoists * depth * (1 + WASTE_FACTOR);
    materials.push({
      name: '2x6 Doug Fir Framing',
      description: `Joists: ${numberOfJoists} rows spanning ${depth}ft.`,
      quantity: Math.ceil(joistLF),
      unit: 'LF'
    });

    // 3. Ledger (usually matches width)
    if (includeLedger) {
      materials.push({
        name: '2x8 Doug Fir Ledger',
        description: `House attachment board.`,
        quantity: width,
        unit: 'LF'
      });
    }

    // 4. Beams & Posts
    const beamLF = width;
    materials.push({
      name: '4x10 WRC Beam',
      description: 'Main support beam spanning the deck width.',
      quantity: Math.ceil(beamLF),
      unit: 'LF'
    });

    const numPosts = Math.ceil(width / postSpacing) + 1;
    materials.push({
      name: '6x6 Pressure Treated Posts',
      description: `Support posts spaced every ${postSpacing}ft.`,
      quantity: numPosts,
      unit: 'Posts'
    });

    // 5. Railings
    if (includeRailings) {
      const railingLength = (depth * 2) + width; // Assume 3 sides
      
      // Top Rail: (2) 2x6
      materials.push({
        name: '2x6 WRC Railing (Top)',
        description: `Double 2x6 top rail configuration for ${railingLength}ft of railing.`,
        quantity: Math.ceil(railingLength * 2),
        unit: 'LF'
      });

      // Mid Rail: (1) 2x6
      if (includeMidRail) {
        materials.push({
          name: '2x6 WRC Railing (Mid)',
          description: `Single mid-rail reinforcement.`,
          quantity: Math.ceil(railingLength),
          unit: 'LF'
        });
      }

      // Balusters (approx 3 per foot for 4" spacing)
      const balusterCount = Math.ceil(railingLength * 3);
      materials.push({
        name: '2x2 Cedar Balusters',
        description: `Vertical pickets for safety and aesthetics.`,
        quantity: balusterCount,
        unit: 'Pcs'
      });
    }

    setEstimate({
      id: Date.now().toString(),
      type: ProjectType.DECK,
      dimensions: `${width}' x ${depth}'`,
      materials,
      wasteFactor: WASTE_FACTOR
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-wood-100 h-fit">
          <h3 className="text-xl font-bold text-wood-900 mb-6 flex items-center">
            <Ruler className="w-5 h-5 mr-2 text-wood-600" />
            Basic Dimensions
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Width (ft)</label>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Depth (ft)</label>
              <input type="number" value={depth} onChange={(e) => setDepth(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Post Spacing (ft)</label>
            <input type="number" value={postSpacing} onChange={(e) => setPostSpacing(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-wood-100 h-fit">
          <h3 className="text-xl font-bold text-wood-900 mb-6 flex items-center">
            <Layout className="w-5 h-5 mr-2 text-wood-600" />
            Project Features
          </h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={includeLedger} onChange={() => setIncludeLedger(!includeLedger)} className="h-5 w-5 text-wood-600 rounded border-gray-300 bg-white focus:ring-wood-500" />
              <span className="text-gray-700">Attach with Ledger Board</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" checked={includeRailings} onChange={() => setIncludeRailings(!includeRailings)} className="h-5 w-5 text-wood-600 rounded border-gray-300 bg-white focus:ring-wood-500" />
              <span className="text-gray-700">Include Railings</span>
            </label>
            {includeRailings && (
              <label className="flex items-center space-x-3 cursor-pointer ml-8">
                <input type="checkbox" checked={includeMidRail} onChange={() => setIncludeMidRail(!includeMidRail)} className="h-4 w-4 text-wood-600 rounded border-gray-300 bg-white focus:ring-wood-500" />
                <span className="text-sm text-gray-600">Add 2x6 Mid-Rail</span>
              </label>
            )}
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Surface Material</label>
              <select value={selectedDeckingId} onChange={(e) => setSelectedDeckingId(e.target.value)} className="w-full rounded-md border-gray-200 border p-2 text-sm bg-white focus:ring-wood-500 focus:border-wood-500">
                <option value="deck-ic-patio">Incense Cedar Patio</option>
                <option value="deck-ic-3btr">Incense Cedar #3</option>
                <option value="deck-red-grandis">Red Grandis Hardwood</option>
              </select>
            </div>
          </div>
          <div className="pt-6">
            <Button onClick={calculate} className="w-full">Generate Material List</Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/3">
        {estimate ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-wood-100 animate-fade-in">
            <h3 className="text-2xl font-bold text-wood-900 mb-6 border-b border-wood-100 pb-4">Estimated Material List</h3>
            <div className="space-y-4">
              {estimate.materials.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start p-4 bg-wood-50 rounded-lg border border-wood-100 hover:border-wood-300 transition-colors">
                  <div>
                    <p className="font-bold text-wood-900">{item.name}</p>
                    <p className="text-sm text-gray-500 italic">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-forest-700">{item.quantity} <span className="text-xs font-normal text-gray-400 uppercase tracking-tighter">{item.unit}</span></p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-forest-50 rounded-lg flex items-start space-x-3 border border-forest-100">
              <Info className="w-5 h-5 text-forest-600 mt-0.5" />
              <p className="text-sm text-forest-800">
                All linear footage (LF) estimates include a <strong>{WASTE_FACTOR * 100}% waste factor</strong>. 
                Always verify spans and load requirements with local building codes.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-wood-50 rounded-xl border-2 border-dashed border-wood-200 text-wood-400">
            <CheckSquare className="w-16 h-16 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-wood-600">Material Estimator Ready</h3>
            <p className="max-w-md mt-2">Adjust your deck parameters and railing options to calculate exactly what you'll need from ICE.</p>
          </div>
        )}
      </div>
    </div>
  );
};
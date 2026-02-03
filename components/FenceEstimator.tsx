import React, { useState } from 'react';
import { CEDAR_PRODUCTS } from '../constants';
import { MaterialItem, ProjectEstimate, ProjectType } from '../types';
import { Button } from './Button';
import { Calculator, Hammer, Info } from 'lucide-react';

export const FenceEstimator: React.FC = () => {
  const [length, setLength] = useState<number>(50);
  const [height, setHeight] = useState<number>(6);
  const [postSpacing, setPostSpacing] = useState<number>(8);
  const [estimate, setEstimate] = useState<ProjectEstimate | null>(null);

  const calculate = () => {
    const numSections = Math.ceil(length / postSpacing);
    const numPosts = numSections + 1;
    const postLength = height + 2; 

    const materials: MaterialItem[] = [
      {
        name: '4x4 WC Outs Posts',
        description: `${numPosts} posts buried 2ft deep.`,
        quantity: numPosts,
        unit: 'Posts'
      },
      {
        name: '2x4 IC Cedar Rails',
        description: `${height > 5 ? 3 : 2} rails per section.`,
        quantity: Math.ceil(length * (height > 5 ? 3 : 2)),
        unit: 'LF'
      },
      {
        name: '1x6 IC #3 Fencing Pickets',
        description: `Assuming no-gap privacy layout.`,
        quantity: Math.ceil(length * (12 / 5.5) * height),
        unit: 'LF'
      },
      {
        name: 'Concrete Mix',
        description: 'Approx 1.5 bags per post hole.',
        quantity: Math.ceil(numPosts * 1.5),
        unit: 'Bags'
      }
    ];

    setEstimate({
      id: Date.now().toString(),
      type: ProjectType.FENCE,
      dimensions: `${length}' Length x ${height}' Height`,
      materials,
      wasteFactor: 0
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-wood-100 h-fit">
        <h3 className="text-xl font-bold text-wood-900 mb-6 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-wood-600" />
          Fence Parameters
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Length (ft)</label>
            <input type="number" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Post Spacing (ft)</label>
            <input type="number" value={postSpacing} onChange={(e) => setPostSpacing(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Height (ft)</label>
            <select value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full rounded-md border-gray-200 border p-2 bg-white focus:ring-wood-500 focus:border-wood-500">
              <option value={4}>4 Feet</option>
              <option value={6}>6 Feet</option>
              <option value={8}>8 Feet</option>
            </select>
          </div>
          <div className="pt-4">
            <Button onClick={calculate} className="w-full">Calculate Quantities</Button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/3">
        {estimate ? (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-wood-100 animate-fade-in">
             <h3 className="text-2xl font-bold text-wood-900 mb-6 border-b border-wood-100 pb-4">Required Materials</h3>
             <div className="space-y-4">
                {estimate.materials.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-wood-50 rounded-lg border border-wood-100">
                    <div>
                      <p className="font-bold text-wood-900">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-wood-700">{item.quantity} {item.unit}</p>
                    </div>
                  </div>
                ))}
             </div>
             <div className="mt-8 p-4 bg-blue-50 rounded-lg flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Quantities are based on standard spacing. Specialty gates or terrain changes will require extra lumber.
                </p>
             </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-wood-50 rounded-xl border-2 border-dashed border-wood-200 text-wood-400">
            <Hammer className="w-16 h-16 mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-wood-600">Plan Your Fence</h3>
            <p className="max-w-md mt-2">Enter your fence run and height to see a detailed breakdown of pickets, rails, and posts.</p>
          </div>
        )}
      </div>
    </div>
  );
};
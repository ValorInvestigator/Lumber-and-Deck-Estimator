import React, { useState } from 'react';
import { ProjectType } from './types';
import { DeckEstimator } from './components/DeckEstimator';
import { FenceEstimator } from './components/FenceEstimator';
import { AIAssistant } from './components/AIAssistant';
import { Calculator, Hammer, Ruler } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectType>(ProjectType.DECK);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-wood-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Ruler className="h-8 w-8 text-wood-600 mr-2" />
              <span className="text-2xl font-bold text-wood-900 tracking-tight">Lumber Estimator</span>
            </div>
            
            <nav className="flex space-x-1 sm:space-x-4 items-center overflow-x-auto no-scrollbar">
              {[
                { id: ProjectType.DECK, label: 'Deck Project', icon: Calculator },
                { id: ProjectType.FENCE, label: 'Fence Project', icon: Hammer },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === item.id
                      ? 'bg-wood-100 text-wood-900'
                      : 'text-gray-500 hover:text-wood-700 hover:bg-wood-50'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-wood-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === ProjectType.DECK && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-wood-900">Deck Materials Estimator</h2>
                <p className="mt-2 text-wood-700">Calculate decking, joists, beams, and hardware for your dream deck.</p>
              </div>
              <DeckEstimator />
            </div>
          )}
          {activeTab === ProjectType.FENCE && (
            <div className="animate-fade-in">
               <div className="mb-8">
                <h2 className="text-3xl font-bold text-wood-900">Fence Materials Estimator</h2>
                <p className="mt-2 text-wood-700">Plan your privacy or picket fence with our easy calculator.</p>
              </div>
              <FenceEstimator />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-wood-900 text-wood-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                 <Ruler className="h-6 w-6 text-wood-400 mr-2" />
                 <span className="text-xl font-bold text-white">Lumber Estimator</span>
              </div>
              <p className="text-sm text-wood-300">
                A simple tool for estimating lumber requirements for standard decks and fences. 
                Calculations are estimates only. Always verify with local building codes.
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-wood-400 text-sm">
                &copy; {new Date().getFullYear()} Lumber Project Tools.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
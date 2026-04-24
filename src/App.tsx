import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DiscoverView from './views/DiscoverView';
import {
  ApplicationsView,
  DevelopView,
  WorkView,
  CategoriesView,
  UpdatesView,
  GamesView,
  ArcadeView,
  CreateView,
  PlayView,
} from './views/OtherViews';
import { AppView } from './types';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('discover');

  const renderView = () => {
    switch (activeView) {
      case 'discover': return <DiscoverView />;
      case 'applications': return <ApplicationsView />;
      case 'games': return <GamesView />;
      case 'arcade': return <ArcadeView />;
      case 'create': return <CreateView />;
      case 'work': return <WorkView />;
      case 'play': return <PlayView />;
      case 'develop': return <DevelopView />;
      case 'categories': return <CategoriesView />;
      case 'updates': return <UpdatesView />;
      default: return <DiscoverView />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#242426] overflow-hidden font-sans">
      {/* macOS-like window chrome */}
      <div className="flex flex-1 overflow-hidden rounded-xl shadow-2xl m-0 border border-white/5">
        {/* Sidebar */}
        <Sidebar activeView={activeView} onNavigate={setActiveView} />

        {/* Main content */}
        <main className="flex-1 flex flex-col bg-[#1c1c1e] overflow-hidden relative">
          {/* Titlebar */}
          <div className="h-10 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-white/20 text-xs">Systs-Q</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* View content */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}

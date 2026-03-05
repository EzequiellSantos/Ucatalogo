import { BottomNav } from './BottomNav';

export const CatalogLayout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Main container with mobile-first shadow */}
      <div className="max-w-md mx-auto md:max-w-5xl bg-white min-h-screen shadow-2xl md:shadow-none md:border-x md:border-gray-100">
        {/* Main content */}
        <div className="pb-20 md:pb-8">
          {children}
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};
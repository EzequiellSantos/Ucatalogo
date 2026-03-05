import { BottomNav } from '../catalog/BottomNav';
import { useState } from 'react';

export const CatalogLayout = ({ children, companyName }) => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      {/* Main container with mobile-first shadow */}
      <div className="max-w-md mx-auto md:max-w-5xl bg-white min-h-screen shadow-2xl md:shadow-none md:border-x md:border-gray-100">
        {/* Company header (optional) */}
        {companyName && (
          <div className="px-4 pt-6 pb-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {companyName}
            </h1>
          </div>
        )}

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

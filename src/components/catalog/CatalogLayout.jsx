import { BottomNav } from './BottomNav';
import { PrintCatalog } from './PrintCatalog';

export const CatalogLayout = ({ children, activeTab, setActiveTab, catalogData }) => {
  return (
    <div className="min-h-screen bg-white mb-10 pb-5">
      {/* Main container with mobile-first shadow */}
      <div className="max-w-md mx-auto md:max-w-5xl bg-white min-h-screen shadow-2xl md:shadow-none md:border-x md:border-gray-100 no-print">
        {/* Main content */}
        <div className="md:pb-8">
          {children}
        </div>

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="hidden print:block">
        <PrintCatalog catalogData={catalogData} />
      </div>

    </div>
  );
};
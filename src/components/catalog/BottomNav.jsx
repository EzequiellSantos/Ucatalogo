import { Home, Grid, Tag, User } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'products', icon: Grid, label: 'Produtos' },
    { id: 'categories', icon: Tag, label: 'Categorias' },
    { id: 'profile', icon: User, label: 'Perfil' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 pb-safe md:hidden">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              data-testid={`bottom-nav-${item.id}`}
              className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-black' : 'text-gray-400 hover:text-black'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

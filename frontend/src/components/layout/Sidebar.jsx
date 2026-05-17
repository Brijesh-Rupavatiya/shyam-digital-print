import { LayoutDashboard, Users, Building2 } from "lucide-react";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      page: "dashboard",
    },
    {
      title: "Local Users",
      icon: <Users size={20} />,
      page: "local",
    },
    {
      title: "Regular Users",
      icon: <Building2 size={20} />,
      page: "regular",
    },
  ];

  return (
    <div className="w-[280px] min-h-screen bg-[#0f172a] border-r border-white/10 p-5">
      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-wide">SDP</h1>

        <p className="text-gray-400 text-sm mt-1">Shyam Digital Print</p>
      </div>

      {/* MENUS */}
      <div className="space-y-3">
        {menus.map((menu) => (
          <button
            key={menu.page}
            onClick={() => setCurrentPage(menu.page)}
            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300

            ${
              currentPage === menu.page
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-white/10"
            }
            `}
          >
            {menu.icon}

            <span className="font-medium">{menu.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

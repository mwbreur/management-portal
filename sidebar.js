const SidebarComponent = {
  render: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="p-6 border-b border-slate-800">
        <h3 class="text-xl font-bold tracking-wide text-white">Navigation</h3>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <button data-section="dashboard" class="nav-item w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center gap-3">
          <span>📊</span> Dashboard
        </button>
        <button data-section="settings" class="nav-item w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center gap-3">
          <span>⚙️</span> Settings
        </button>
        <button data-section="users" class="nav-item w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center gap-3">
          <span>👥</span> User Management
        </button>
        <button data-section="analytics" class="nav-item w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center gap-3">
          <span>📈</span> Analytics
        </button>
        <button data-section="reports" class="nav-item w-full text-left px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer flex items-center gap-3">
          <span>📄</span> Reports
        </button>
      </nav>
    `;
  }
};

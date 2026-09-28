  renderUsersTable: function(usersArray) {
    let rowsHtml = '';
    usersArray.forEach(user => {
      rowsHtml += `
        <tr class="border-b border-slate-100 hover:bg-slate-50/50 transition">
          <td class="px-6 py-4 text-sm font-bold text-slate-700">#${user.id}</td>
          <td class="px-6 py-4 text-sm font-medium text-slate-800">${user.name}</td>
          <td class="px-6 py-4 text-sm text-slate-500">${user.email}</td>
          <td class="px-6 py-4 text-sm">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}">
              ${user.status}
            </span>
          </td>
          <td class="px-6 py-4 text-sm">
            <button data-edit-id="${user.id}" class="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer text-xs">Modify Record</button>
          </td>
        </tr>
      `;
    });

    return `
      <div class="space-y-4 relative overflow-hidden">
        <div class="flex items-center justify-between">
          <h2 class="text-2xl font-bold text-slate-800">User Directory Records</h2>
          <button id="openCreateUserBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow transition cursor-pointer flex items-center gap-2">
            <span>➕</span> Add User
          </button>
        </div>
        
        <div class="bg-white rounded-xl shadow border border-slate-100 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold text-xs tracking-wider uppercase">
                <th class="px-6 py-3">UID</th><th class="px-6 py-3">Full Identity</th><th class="px-6 py-3">Email Access</th><th class="px-6 py-3">Status</th><th class="px-6 py-3">Operations</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>

        <!-- Sliding Panel Backdrop Overlay -->
        <div id="panelBackdrop" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs opacity-0 pointer-events-none transition-opacity duration-300 z-40"></div>

        <!-- Dynamic Slide-Over Panel Container -->
        <div id="createUserPanel" class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
          <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <h3 class="text-lg font-bold text-slate-800">Create New User Profile</h3>
            <button id="closeCreateUserBtn" class="text-slate-400 hover:text-slate-600 text-2xl font-semibold cursor-pointer p-1">&times;</button>
          </div>
          
          <div class="flex-1 p-6 space-y-4 overflow-y-auto">
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-1">Full Identity Name</label>
              <input type="text" id="newUserName" class="w-full border border-slate-200 p-2.5 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50" placeholder="e.g. Alex Morgan">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-1">Email Access Address</label>
              <input type="email" id="newUserEmail" class="w-full border border-slate-200 p-2.5 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50" placeholder="e.g. alex@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-600 mb-1">Initial Status Account State</label>
              <select id="newUserStatus" class="w-full border border-slate-200 p-2.5 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50">
                <option value="Active">Active Operational</option>
                <option value="Inactive">Inactive Suspended</option>
              </select>
            </div>
          </div>

          <div class="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
            <button id="cancelCreateUserBtn" class="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition cursor-pointer">Cancel</button>
            <button id="submitCreateUserBtn" class="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-lg shadow transition cursor-pointer">Save Account Record</button>
          </div>
        </div>
      </div>
    `;
  }
};

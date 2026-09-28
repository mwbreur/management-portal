const PORTAL_VIEWS = {
  dashboard: `
    <div class="space-y-6">
      <h2 class="text-3xl font-bold tracking-tight text-slate-800">Dashboard Insights</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow border border-slate-100 flex items-center justify-between">
          <div><p class="text-slate-400 text-sm font-medium">Active Subscriptions</p><h3 class="text-2xl font-bold text-slate-800 mt-1">1,248</h3></div>
          <span class="text-2xl bg-blue-50 p-3 rounded-lg">📈</span>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border border-slate-100 flex items-center justify-between">
          <div><p class="text-slate-400 text-sm font-medium">Monthly Recurrent Revenue</p><h3 class="text-2xl font-bold text-slate-800 mt-1">$42,350</h3></div>
          <span class="text-2xl bg-emerald-50 p-3 rounded-lg">💳</span>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border border-slate-100 flex items-center justify-between">
          <div><p class="text-slate-400 text-sm font-medium">Server Status Load</p><h3 class="text-2xl font-bold text-slate-800 mt-1">14.2%</h3></div>
          <span class="text-2xl bg-amber-50 p-3 rounded-lg">⚡</span>
        </div>
      </div>
    </div>
  `,

  settings: `
    <div class="space-y-6 max-w-2xl bg-white p-6 rounded-xl shadow border border-slate-100">
      <h2 class="text-2xl font-bold text-slate-800 border-b pb-3 border-slate-100">Portal Configurations</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1">Application Identifier Name</label>
          <input type="text" id="appName" class="w-full border border-slate-200 p-2 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1">Default View Palette Theme</label>
          <select id="theme" class="w-full border border-slate-200 p-2 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50">
            <option value="dark">Charcoal Slate Dark</option>
            <option value="light">Minimalist Pearl Light</option>
          </select>
        </div>
        <div class="flex items-center gap-3 py-2">
          <input type="checkbox" id="notifications" class="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500">
          <label class="text-sm font-medium text-slate-600">Enable automated real-time dispatch alerts</label>
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-600 mb-1">Database Cloud Backup Interval (Hours)</label>
          <input type="number" id="backupInterval" class="w-full border border-slate-200 p-2 rounded-lg text-slate-800 focus:outline-blue-500 bg-slate-50">
        </div>
        <button id="saveSettingsBtn" class="bg-blue-600 hover:bg-blue-700 transition px-5 py-2.5 rounded-lg text-white font-medium text-sm shadow cursor-pointer mt-2">
          Save Configuration Changes
        </button>
      </div>
    </div>
  `,

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
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-slate-800">User Directory Records</h2>
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
      </div>
    `;
  },

  analytics: `
    <div class="bg-white p-6 rounded-xl shadow border border-slate-100 space-y-3">
      <h2 class="text-2xl font-bold text-slate-800">System Metrics</h2>
      <p class="text-slate-500 text-sm">Real-time performance graphs and pipeline data analytics indicators.</p>
      <div class="h-32 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-dashed border-slate-200 text-sm font-medium">
        [Data Chart Interface Module Area]
      </div>
    </div>
  `,

  reports: `
    <div class="bg-white p-6 rounded-xl shadow border border-slate-100 space-y-4">
      <h2 class="text-2xl font-bold text-slate-800">Export Management Records</h2>
      <p class="text-slate-500 text-sm">Generate and process system log summaries or administrative spreadsheets.</p>
      <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg shadow cursor-pointer transition">
        Compile PDF Statement
      </button>
    </div>
  `
};

const HeaderComponent = {
  render: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 shadow-md">
        <h1 class="text-2xl font-bold tracking-tight">Management Portal</h1>
        <p class="text-indigo-100 text-sm mt-1">Configure your application settings and manage resources</p>
      </div>
    `;
  }
};

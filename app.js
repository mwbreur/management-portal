const AppRouter = {
  userDataStore: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", status: "Inactive" }
  ],

  init: function() {
    if (typeof SidebarComponent !== 'undefined') SidebarComponent.render('sidebar-container');
    if (typeof HeaderComponent !== 'undefined') HeaderComponent.render('header-container');

    const sidebar = document.getElementById('sidebar-container');
    if (sidebar) {
      sidebar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-section]');
        if (button) this.navigateTo(button.getAttribute('data-section'));
      });
    }

    this.navigateTo('dashboard');
  },

  navigateTo: function(sectionId) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent || typeof PORTAL_VIEWS === 'undefined') return;

    if (sectionId === 'users') {
      mainContent.innerHTML = PORTAL_VIEWS.renderUsersTable(this.userDataStore);
    } else if (PORTAL_VIEWS[sectionId]) {
      mainContent.innerHTML = PORTAL_VIEWS[sectionId];
    }

    this.updateActiveNav(sectionId);
    this.bindViewEvents(sectionId);
  },

  updateActiveNav: function(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const isTarget = item.getAttribute('data-section') === sectionId;
      item.classList.toggle('bg-blue-600', isTarget);
      item.classList.toggle('text-white', isTarget);
      item.classList.toggle('text-slate-300', !isTarget);
      item.classList.toggle('hover:bg-slate-800', !isTarget);
    });
  },

  bindViewEvents: function(sectionId) {
    if (sectionId === 'settings') {
      const appNameInput = document.getElementById('appName');
      const themeInput = document.getElementById('theme');
      const notifInput = document.getElementById('notifications');
      const backupInput = document.getElementById('backupInterval');

      if (appNameInput) appNameInput.value = localStorage.getItem('portal_appName') || 'My Application';
      if (themeInput) themeInput.value = localStorage.getItem('portal_theme') || 'dark';
      if (notifInput) notifInput.checked = localStorage.getItem('portal_notifications') === 'true';
      if (backupInput) backupInput.value = localStorage.getItem('portal_backupInterval') || '24';

      const saveBtn = document.getElementById('saveSettingsBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => {
          localStorage.setItem('portal_appName', appNameInput?.value || '');
          localStorage.setItem('portal_theme', themeInput?.value || '');
          localStorage.setItem('portal_notifications', notifInput?.checked || false);
          localStorage.setItem('portal_backupInterval', backupInput?.value || '');
          alert(`Configuration changes written to LocalStorage!`);
          // Old: alert(`Configuration changes written to LocalStorage!`);
        Toast.show("Configuration parameters saved securely to localStorage!", "success");

        });
      }
    }

    if (sectionId === 'users') {
      document.getElementById('main-content').onclick = (e) => {
        const editBtn = e.target.closest('[data-edit-id]');
        if (editBtn) {
          //alert(`Opening prompt workflow sequence map for record ID: ${editBtn.getAttribute('data-edit-id')}`);
          const userId = editBtn.getAttribute('data-edit-id');
Toast.show(`Opened edit console panel context layout for user ID: ${userId}`, "info");
        }
      };
    }
  }
};

document.addEventListener('DOMContentLoaded', () => AppRouter.init());

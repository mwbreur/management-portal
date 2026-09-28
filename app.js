/**
 * Modern Management Portal - Core Router & State Manager
 */
const AppRouter = {
  // 1. Data Store State Model
  userDataStore: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", status: "Inactive" }
  ],

  // 2. Centralized DOM Cache
  dom: {
    sidebar: null,
    header: null,
    mainContent: null,
    navItems: null
  },

  init: function() {
    if (typeof SidebarComponent !== 'undefined') SidebarComponent.render('sidebar-container');
    if (typeof HeaderComponent !== 'undefined') HeaderComponent.render('header-container');

    this.dom.sidebar = document.getElementById('sidebar-container');
    this.dom.header = document.getElementById('header-container');
    this.dom.mainContent = document.getElementById('main-content');
    
    if (this.dom.sidebar) {
      this.dom.navItems = this.dom.sidebar.querySelectorAll('.nav-item');
    }

    this.bindGlobalListeners();
    this.navigateTo('dashboard');
  },

  bindGlobalListeners: function() {
    if (this.dom.sidebar) {
      this.dom.sidebar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-section]');
        if (button) this.navigateTo(button.getAttribute('data-section'));
      });
    }

    if (this.dom.mainContent) {
      this.dom.mainContent.addEventListener('click', (event) => {
        const target = event.target;

        if (target.id === 'saveSettingsBtn') {
          this.handleSaveSettings();
          return;
        }

        const editBtn = target.closest('[data-edit-id]');
        if (editBtn) {
          const userId = editBtn.getAttribute('data-edit-id');
          if (typeof Toast !== 'undefined') Toast.show(`Modifying context parameters for ID: ${userId}`, "info");
          return;
        }

        if (target.id === 'openCreateUserBtn') {
          this.toggleSlidingPanel(true);
          return;
        }
        if (target.id === 'closeCreateUserBtn' || target.id === 'cancelCreateUserBtn' || target.id === 'panelBackdrop') {
          this.toggleSlidingPanel(false);
          return;
        }
        if (target.id === 'submitCreateUserBtn') {
          this.handleCreateUserSubmit();
          return;
        }
      });
    }
  },

  toggleSlidingPanel: function(shouldOpen) {
    const panel = document.getElementById('createUserPanel');
    const backdrop = document.getElementById('panelBackdrop');
    if (!panel || !backdrop) return;

    if (shouldOpen) {
      panel.classList.remove('translate-x-full');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      panel.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }
  },

  handleCreateUserSubmit: function() {
    const nameInput = document.getElementById('newUserName');
    const emailInput = document.getElementById('newUserEmail');
    const statusInput = document.getElementById('newUserStatus');

    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const status = statusInput?.value || 'Active';

    if (!name || !email) {
      if (typeof Toast !== 'undefined') Toast.show("Please populate all text criteria fields!", "error");
      return;
    }

    const nextId = this.userDataStore.length > 0 ? Math.max(...this.userDataStore.map(u => u.id)) + 1 : 1;
    this.userDataStore.push({ id: nextId, name: name, email: email, status: status });

    this.toggleSlidingPanel(false);
    this.dom.mainContent.innerHTML = PORTAL_VIEWS.renderUsersTable(this.userDataStore);

    if (typeof Toast !== 'undefined') {
      Toast.show(`Successfully appended configuration account record for ${name}!`, "success");
    }
  },

  navigateTo: function(sectionId) {
    if (!this.dom.mainContent || typeof PORTAL_VIEWS === 'undefined') return;

    if (sectionId === 'users') {
      this.dom.mainContent.innerHTML = PORTAL_VIEWS.renderUsersTable(this.userDataStore);
    } else if (PORTAL_VIEWS[sectionId]) {
      this.dom.mainContent.innerHTML = PORTAL_VIEWS[sectionId];
    }

    this.updateActiveNav(sectionId);
    this.hydrateViewFields(sectionId);
  },

  updateActiveNav: function(sectionId) {
    if (!this.dom.navItems) return;
    this.dom.navItems.forEach(item => {
      const isTarget = item.getAttribute('data-section') === sectionId;
      item.classList.toggle('bg-blue-600', isTarget);
      item.classList.toggle('text-white', isTarget);
      item.classList.toggle('text-slate-300', !isTarget);
      item.classList.toggle('hover:bg-slate-800', !isTarget);
    });
  },

  hydrateViewFields: function(sectionId) {
    if (sectionId === 'settings') {
      const appNameInput = document.getElementById('appName');
      const themeInput = document.getElementById('theme');
      const notifInput = document.getElementById('notifications');
      const backupInput = document.getElementById('backupInterval');

      if (appNameInput) appNameInput.value = localStorage.getItem('portal_appName') || 'My Application';
      if (themeInput) themeInput.value = localStorage.getItem('portal_theme') || 'dark';
      if (notifInput) notifInput.checked = localStorage.getItem('portal_notifications') === 'true';
      if (backupInput) backupInput.value = localStorage.getItem('portal_backupInterval') || '24';
    }
  },

  handleSaveSettings: function() {
    const appName = document.getElementById('appName')?.value || '';
    const theme = document.getElementById('theme')?.value || '';
    const notifications = document.getElementById('notifications')?.checked || false;
    const backupInterval = document.getElementById('backupInterval')?.value || '';

    localStorage.setItem('portal_appName', appName);
    localStorage.setItem('portal_theme', theme);
    localStorage.setItem('portal_notifications', notifications);
    localStorage.setItem('portal_backupInterval', backupInterval);

    if (typeof Toast !== 'undefined') {
      Toast.show("Configuration parameters saved securely to localStorage!", "success");
    }
  }
};

document.addEventListener('DOMContentLoaded', () => AppRouter.init());

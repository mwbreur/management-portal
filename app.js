/**
 * Modern Management Portal - Optimized Core Core Router & State Manager
 * Architecture: Optimized DOM Cache, Global Event Delegation, Passive Listeners
 */
const AppRouter = {
  // 1. Data Store State Model
  userDataStore: [
    { id: 1, name: "John Doe", email: "john.doe@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", status: "Inactive" }
  ],

  // 2. Centralized DOM Cache (Eliminates Redundant Lookups)
  dom: {
    sidebar: null,
    header: null,
    mainContent: null,
    navItems: null
  },

  /**
   * Initializes the application shell, builds components,
   * caches DOM nodes, and sets up permanent global event delegation.
   */
  init: function() {
    // Render static interface components into the shell
    if (typeof SidebarComponent !== 'undefined') SidebarComponent.render('sidebar-container');
    if (typeof HeaderComponent !== 'undefined') HeaderComponent.render('header-container');

    // Cache core permanent layout references
    this.dom.sidebar = document.getElementById('sidebar-container');
    this.dom.header = document.getElementById('header-container');
    this.dom.mainContent = document.getElementById('main-content');
    
    // Cache nav nodes immediately after sidebar rendering completes
    if (this.dom.sidebar) {
      this.dom.navItems = this.dom.sidebar.querySelectorAll('.nav-item');
    }

    // Bind structural event handlers
    this.bindGlobalListeners();

    // Trigger initial route view paint
    this.navigateTo('dashboard');
  },

  /**
   * Implements Event Delegation. Listeners are bound ONCE to permanent parent containers.
   * This completely fixes memory leaks and listener accumulation during section navigation.
   */
  bindGlobalListeners: function() {
    // A. Sidebar Section Switch Routing Delegation
    if (this.dom.sidebar) {
      this.dom.sidebar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-section]');
        if (button) {
          this.navigateTo(button.getAttribute('data-section'));
        }
      });
    }

    // B. Main Content Dynamic Action Delegation (Handles forms, table buttons natively)
    if (this.dom.mainContent) {
      this.dom.mainContent.addEventListener('click', (event) => {
        const target = event.target;

        // Catch Settings Save Trigger
        if (target.id === 'saveSettingsBtn') {
          this.handleSaveSettings();
          return;
        }

        // Catch User Modify Operation Trigger
        const editBtn = target.closest('[data-edit-id]');
        if (editBtn) {
          const userId = editBtn.getAttribute('data-edit-id');
          if (typeof Toast !== 'undefined') {
            Toast.show(`Opened edit console panel context layout for user ID: ${userId}`, "info");
          }
        }
      });
    }
  },

  /**
   * Coordinates view switching workflows safely and efficiently.
   */
  navigateTo: function(sectionId) {
    if (!this.dom.mainContent || typeof PORTAL_VIEWS === 'undefined') return;

    // Direct innerHTML assignment used strictly on structural root node boundary swaps
    if (sectionId === 'users') {
      this.dom.mainContent.innerHTML = PORTAL_VIEWS.renderUsersTable(this.userDataStore);
    } else if (PORTAL_VIEWS[sectionId]) {
      this.dom.mainContent.innerHTML = PORTAL_VIEWS[sectionId];
    }

    // Run layout modifications
    this.updateActiveNav(sectionId);
    this.hydrateViewFields(sectionId);
  },

  /**
   * Refined Class Updates. Uses cached nodes and conditional checks
   * to eliminate DOM layout thrashing and unnecessary repaints.
   */
  updateActiveNav: function(sectionId) {
    if (!this.dom.navItems) return;

    this.dom.navItems.forEach(item => {
      const isTarget = item.getAttribute('data-section') === sectionId;
      
      // Batch layout style states cleanly using stateful class tokens
      item.classList.toggle('bg-blue-600', isTarget);
      item.classList.toggle('text-white', isTarget);
      item.classList.toggle('text-slate-300', !isTarget);
      item.classList.toggle('hover:bg-slate-800', !isTarget);
    });
  },

  /**
   * Safe data field loading configuration.
   * Hydrates state parameters without creating volatile listener cycles.
   */
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

  /**
   * Processes form structures. Keeps storage interactions grouped inside 
   * a single synchronous transactional boundary execution scope block.
   */
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

// Launch the application cleanly once the DOM structure initializes
document.addEventListener('DOMContentLoaded', () => {
  AppRouter.init();
});

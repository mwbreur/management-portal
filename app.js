  bindGlobalListeners: function() {
    // A. Sidebar Navigation Switching Delegation
    if (this.dom.sidebar) {
      this.dom.sidebar.addEventListener('click', (event) => {
        const button = event.target.closest('[data-section]');
        if (button) this.navigateTo(button.getAttribute('data-section'));
      });
    }

    // B. Main Content Dynamic Action Delegation
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
          if (typeof Toast !== 'undefined') Toast.show(`Modifying context parameters for ID: ${userId}`, "info");
          return;
        }

        // --- NEW DELETE USER WORKFLOW DELEGATION ---
        const deleteBtn = target.closest('[data-delete-id]');
        if (deleteBtn) {
          const userId = parseInt(deleteBtn.getAttribute('data-delete-id'), 10);
          const userName = deleteBtn.getAttribute('data-user-name');
          
          // Verify intent safely with a clean confirm wrapper hook
          if (confirm(`Are you absolutely sure you want to permanently remove ${userName} (#${userId})?`)) {
            // Splice/filter targeted element out of the main runtime data array matching the ID
            this.userDataStore = this.userDataStore.filter(user => user.id !== userId);
            
            // Re-draw grid templates instantly with the newly updated array data stack 
            this.dom.mainContent.innerHTML = PORTAL_VIEWS.renderUsersTable(this.userDataStore);
            
            // Dispatch success toast message confirmation element overlay
            if (typeof Toast !== 'undefined') {
              Toast.show(`Successfully deleted account profile for ${userName}`, "error");
            }
          }
          return;
        }

        // Sliding Panel Management Delegation
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

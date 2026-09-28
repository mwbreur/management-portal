const Toast = {
  // Setup standard status palette configurations
  types: {
    success: { bg: 'bg-emerald-600', icon: '✅' },
    error: { bg: 'bg-rose-600', icon: '❌' },
    info: { bg: 'bg-blue-600', icon: 'ℹ️' }
  },

  // Generates or targets a persistent notification container stack on screen
  getContainer: function() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none';
      document.body.appendChild(container);
    }
    return container;
  },

  // Spawns a structured dynamic toast notice message frame
  show: function(message, type = 'success', duration = 3500) {
    const container = this.getContainer();
    const config = this.types[type] || this.types.success;

    // Create the toast node
    const toast = document.createElement('div');
    toast.className = `${config.bg} text-white px-4 py-3 rounded-lg shadow-xl flex items-center justify-between gap-3 transform transition-all duration-300 translate-y-2 opacity-0 scale-95 pointer-events-auto`;
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-lg">${config.icon}</span>
        <p class="text-sm font-medium tracking-wide">${message}</p>
      </div>
      <button class="text-white opacity-70 hover:opacity-100 transition cursor-pointer text-xs font-bold px-1">&times;</button>
    `;

    // Append to screen container layout
    container.appendChild(toast);

    // Trigger visual entry transition smoothly after browser cycle paint
    setTimeout(() => {
      toast.classList.remove('translate-y-2', 'opacity-0', 'scale-95');
    }, 10);

    // Setup clear dismissal closures
    const dismiss = () => {
      toast.classList.add('animate-toast-fade');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    };

    // Bind manually click close action cross button
    toast.querySelector('button').addEventListener('click', dismiss);

    // Setup structural auto decay timer loop sequence
    setTimeout(dismiss, duration);
  }
};

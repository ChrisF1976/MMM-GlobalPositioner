Module.register("MMM-GlobalPositioner", {
  defaults: {
    modules: [], // { name: "exact_name", position: { top, left, right, bottom } }
    delay: 1000,
    maxAttempts: 5,
    debug: false
  },

  start() {
    this.attemptCount = 0;
    this.moduleContainers = new Map();
    this.beginPositioning();
  },

  beginPositioning() {
    setTimeout(() => {
      const unpositioned = this.positionAllModules();
      
      if (unpositioned > 0 && this.attemptCount < this.config.maxAttempts) {
        this.attemptCount++;
        this.beginPositioning();
      }
    }, this.attemptCount === 0 ? this.config.delay : 300);
  },

  positionAllModules() {
    let unpositioned = 0;
    
    this.config.modules.forEach(mod => {
      const element = document.querySelector(`.module.${mod.name}`);
      if (!element) {
        unpositioned++;
        Log.warn(`Module "${mod.name}" not found (attempt ${this.attemptCount + 1})`);
        return;
      }

      this.createPositionedContainer(element, mod);
    });

    return unpositioned;
  },

  createPositionedContainer(element, mod) {
    const containerId = `mm-global-container-${mod.name}`;
    let container = document.getElementById(containerId);
    
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
      this.moduleContainers.set(mod.name, container);
    }

    // Positionierungslogik
    const style = {
      position: "fixed",
      zIndex: 9999,
      pointerEvents: "none",
      [mod.position.left !== undefined ? "left" : "right"]: 
        `${mod.position.left !== undefined ? mod.position.left : mod.position.right}px`,
      [mod.position.top !== undefined ? "top" : "bottom"]: 
        `${mod.position.top !== undefined ? mod.position.top : mod.position.bottom}px`,
      ...(this.config.debug && {
        border: "2px solid lime",
        boxSizing: "border-box"
      })
    };

    // Styles anwenden
    Object.assign(container.style, style);

    // Modul einfügen
    if (!element.parentNode.isSameNode(container)) {
      Object.assign(element.style, {
        position: "relative",
        pointerEvents: "auto"
      });
      container.appendChild(element);
    }
  },

  getDom() {
    return document.createElement("div");
  },

  stop() {
    this.moduleContainers.forEach(container => container.remove());
    this.moduleContainers.clear();
  }
});
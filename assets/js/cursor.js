// Cursor effect with enhanced performance and smoother animations
class Cursor {
    constructor() {
        this.initCursor();
        this.initHovers();
        this.initEvents();
        this.render();
    }

    initCursor() {
        // Create cursor elements
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);

        this.cursorOutline = document.createElement('div');
        this.cursorOutline.className = 'cursor-outline';
        document.body.appendChild(this.cursorOutline);

        // Initialize coordinates
        this.pos = { x: 0, y: 0 };
    }

    initHovers() {
        // Interactive elements
        document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => this.enterInteractive());
            el.addEventListener('mouseleave', () => this.leaveInteractive());
        });
    }

    initEvents() {
        // Mouse move with smooth interpolation
        document.addEventListener('mousemove', e => {
            this.pos = { x: e.clientX, y: e.clientY };
        });

        // Handle cursor leaving/entering window
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('mouseenter', () => this.showCursor());

        // Handle page visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) this.hideCursor();
            else this.showCursor();
        });
    }

    enterInteractive() {
        document.body.classList.add('cursor-hover');
    }

    leaveInteractive() {
        document.body.classList.remove('cursor-hover');
    }

    hideCursor() {
        document.body.classList.add('cursor-hidden');
    }

    showCursor() {
        document.body.classList.remove('cursor-hidden');
    }

    render() {
        // Update cursor elements
        this.cursorDot.style.left = `${this.pos.x - 2.5}px`;
        this.cursorDot.style.top = `${this.pos.y - 2.5}px`;

        this.cursorOutline.style.left = `${this.pos.x - 10}px`;
        this.cursorOutline.style.top = `${this.pos.y - 10}px`;

        // Continue animation loop
        requestAnimationFrame(() => this.render());
    }
}

// Initialize cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Cursor();
});

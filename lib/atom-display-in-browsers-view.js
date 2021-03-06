'use babel';

/**
 * Atom Custom display (modal panel)
 */
export default class AtomDisplayInBrowsersView {
  /**
   * Default constructor
   *
   * @param {string} serializedState
   */
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-display-in-browsers');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The AtomDisplayInBrowsers package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
  }

  /**
   * Returns an object that can be retrieved when package is activated
   */
  serialize() {}

  /**
   * Tear down any state and detach
   */
  destroy() {
    this.element.remove();
  }

  /**
   * Return the DOM element
   *
   * @return {object}
   */
  getElement() {
    return this.element;
  }
}

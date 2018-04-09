'use babel';

import AtomDisplayInBrowsersView from './atom-display-in-browsers-view';
import {CompositeDisposable} from 'atom';
import {findCached} from 'atom-linter';
import os from 'os';
// import opn from 'opn';

export default {

  atomDisplayInBrowsersView: null,
  modalPanel: null,
  subscriptions: null,
  platform: null,
  config: {},

  activate(state) {
    this.atomDisplayInBrowsersView = new AtomDisplayInBrowsersView(state.atomDisplayInBrowsersViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDisplayInBrowsersView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-display-in-browsers:toggle': () => this.toggle(),
    }));

    this.platform = os.platform();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDisplayInBrowsersView.destroy();
    this.platform = null;
  },

  serialize() {
    return {
      atomDisplayInBrowsersViewState: this.atomDisplayInBrowsersView.serialize(),
    };
  },

  toggle() {
    const currentFile = atom.workspace.getActiveTextEditor().getPath();
    alert(currentFile);
    alert(this.getConfigPath(currentFile));

    // console.log('AtomDisplayInBrowsers was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

  /**
   * Source: https://github.com/AtomLinter/linter-eslint/blob/0eb16c4dd0eae7778ef73980fcbeb7d7ca2ea5e7/src/worker-helpers.js
   *
   * @param {string} fileDir
   *
   * @return {string}
   */
  getConfigPath(fileDir) {
    let result = null;

    const configFile = findCached(fileDir, [
      '.display-in-browsers.json', '.dib.json',
    ]);

    if (configFile) {
      let config = null;
      try {
        config = require(configFile);
        if (config.browsers && config.root) {
          result = configFile;
        }
      } catch (err) {
        // Parsing json failed
      }
    }

    return result;
  },
};

'use babel';

import AtomDisplayInBrowsersView from './atom-display-in-browsers-view';
import {CompositeDisposable} from 'atom';
import os from 'os';
// import opn from 'opn';

export default {

  atomDisplayInBrowsersView: null,
  modalPanel: null,
  subscriptions: null,
  platform: null,

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
  },

  serialize() {
    return {
      atomDisplayInBrowsersViewState: this.atomDisplayInBrowsersView.serialize(),
    };
  },

  toggle() {
    // console.log('AtomDisplayInBrowsers was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  },

};

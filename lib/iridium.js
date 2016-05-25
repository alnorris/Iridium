'use babel';

import IridiumView from './iridium-view';
import { CompositeDisposable } from 'atom';

export default {

  iridiumView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.iridiumView = new IridiumView(state.iridiumViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.iridiumView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'iridium:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.iridiumView.destroy();
  },

  serialize() {
    return {
      iridiumViewState: this.iridiumView.serialize()
    };
  },

  toggle() {
    console.log('Iridium was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

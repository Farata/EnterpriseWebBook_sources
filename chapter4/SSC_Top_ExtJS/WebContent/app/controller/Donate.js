Ext.define('SSC.controller.Donate', {
  extend: 'Ext.app.Controller',

  refs: [{
    ref: 'donatePanel',
    selector: '[cls=donate-panel]'
  }],

  init: function () {
    'use strict';

    this.control({
      'button[action=showform]': {
        click: this.showDonateForm
      },

      'button[action=hideform]': {
        click: this.hideDonateForm
      },

      'button[action=donate]': {
        click: this.submitDonateForm
      }
    });
  },

  showDonateForm: function () {
    this.getDonatePanel().getLayout().setActiveItem(1);

  },

  hideDonateForm: function () {
    this.getDonatePanel().getLayout().setActiveItem(0);
  },

  submitDonateForm: function () {
    var form = this.getDonatePanel().down('form');
    form.isValid();
  }
});

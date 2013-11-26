Ext.define("SSC.view.Header", {
  extend: 'Ext.Container',
  xtype: 'appheader',

  cls: 'app-header',
  height: 85,

  layout: {
    type: 'hbox',
    align: 'middle'
  },

  items: [{
    xtype: 'component',
    cls: 'app-header-logo',
    width: 75,
    height: 75
  }, {
    xtype: 'component',
    cls: 'app-header-title',
    html: 'SAVE THE CHILD',
    flex: 1
  }, {
    xtype: 'container',
    defaults: {
      scale: 'medium',
      margin: '0 0 0 5'
    },
    items: [{
      xtype: 'button',
      text: 'Who We Are'
    }, {
      xtype: 'button',
      text: 'What We Do'
    }, {
      xtype: 'button',
      text: 'Where We Work'
    }, {
      xtype: 'button',
      text: 'Way To Give'
    }]
  }]
});
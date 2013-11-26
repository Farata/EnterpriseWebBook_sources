Ext.define('SSC.view.Viewport', {
  extend: 'Ext.container.Viewport',
  requires: [
    'Ext.tab.Panel',
    'Ext.layout.container.Column'
  ],

  cls: 'app-viewport',
  layout: 'column',
  defaults: {
    xtype: 'container'
  },

  items: [{
    columnWidth: 0.5,
    html: '&nbsp;' // Otherwise column collapses
  }, {
    width: 980,
    cls: 'main-content',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },

    items: [{
      xtype: 'appheader'
    }, {
      xtype: 'container',
      minHeight: 350,
      flex: 1,

      cls: 'donate-panel',
      layout: 'card',

      items: [{
        xtype: 'container',
        layout: 'vbox',

        items: [{
          xtype: 'component',
          html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at ligula purus. Aliquam convallis, ipsum non laoreet commodo, ligula lorem auctor quam, at ultricies nunc neque eu nibh. Pellentesque massa erat, vehicula non dictum in, auctor eu turpis. Nam a magna sem, nec pharetra nulla.',

          maxWidth: 550,
          padding: '80 20 0'
        }, {
          xtype: 'button',
          action: 'showform',
          text: 'DONATE NOW',
          scale: 'large',
          margin: '30 230'
        }]
      }, {
        xtype: 'donateform',
        margin: '80 0 0 0'
      }]
    }, {
      xtype: 'container',
      flex: 1
    }]
  }, {
    columnWidth: 0.5,
    html: '&nbsp;' // Otherwise column collapses
  }]

});

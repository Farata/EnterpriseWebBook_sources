Ext.define('SSC.view.DonateForm', {
  extend: 'Ext.form.Panel',
  xtype: 'donateform',
  requires: [
    'Ext.form.RadioGroup',
    'Ext.form.field.*',
    'Ext.form.Label'
  ],

  layout: {
    type: 'hbox',
    align: 'stretch'
  },

  bodyStyle: {
    backgroundColor: 'transparent'
  },

  defaults: {
    margin: '0 50 0 0'
  },

  items:[{
    xtype: 'container',
    layout: 'vbox',

    items: [{
      xtype: 'container',
      width: 200,

      items: [{
        xtype: 'radiogroup',
        fieldLabel: 'Please select or enter donation amount',
        labelAlign: 'top',
        labelSeparator: '',
        labelCls: 'donate-form-label',

        vertical: true,
        columns: 1,

        defaults: {
          name: 'amount'
        },

        items: [
          { boxLabel: '10',  inputValue: '10'  },
          { boxLabel: '20',  inputValue: '20'  },
          { boxLabel: '50',  inputValue: '50'  },
          { boxLabel: '100', inputValue: '100' },
          { boxLabel: '200', inputValue: '200' }
        ]
      }]
    }, {
      xtype: 'textfield',
      fieldLabel: 'Other amount',
      labelAlign: 'top',
      labelSeparator: '',
      labelCls: 'donate-form-label'
    }]
  }, {
    xtype: 'fieldcontainer',
    fieldLabel: 'Donor information',
    labelAlign: 'top',
    labelSeparator: '',
    labelCls: 'donate-form-label',

    defaults: {
      allowBlank: false
    },

    items: [{
      xtype: 'textfield',
      name: 'donor',
      emptyText: 'full name'
    }, {
      xtype: 'textfield',
      emptyText: 'email'
    }, {
      xtype: 'textfield',
      emptyText: 'address'
    }, {
      xtype: 'textfield',
      emptyText: 'city'
    }, {
      xtype: 'textfield',
      emptyText: 'zip/postal code'
    }, {
      xtype: 'combobox',
      emptyText: 'state',
      store: [
          'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
          'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
          'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
          'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }, {
      xtype: 'combobox',
      emptyText: 'country',
      store: ['US', 'Russia']
    }]
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'center'
    },

    items: [{
      xtype: 'label',
      cls: 'donate-form-label',
      text: 'We accept PayPal payments',
      labelSeparator: '',
      width: 220
    }, {
      xtype: 'component',
      width: 220,
      html: [
          'Your payment will processed securely by PayPal.',
          'PayPal employ industry-leading encryption and fraud prevention tools.',
          'Your financial information is never divulged to us.'
      ]
    }, {
      xtype: 'button',
      text: 'DONATE NOW',
      scale: 'large',
      action: 'donate',
      margin: '20 0 0 0'
    }, {
      xtype: 'button',
      action: 'hideform',
      margin: '10 0 0 0',
      text: 'I will donate later'
    }]
  }]

});

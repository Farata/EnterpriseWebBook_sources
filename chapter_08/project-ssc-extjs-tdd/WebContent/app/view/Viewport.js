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
            xtype: 'loginbox',
            margin: '10 0 0 0'
        },{
            xtype: 'appheader'
        }, {
            xtype: 'container',
            flex: 1,
            minHeight: 300,

            cls: 'donate-panel',
            layout: 'card',

            items: [{
                xtype: 'container',
                layout: 'vbox',

                items: [{
                    xtype: 'component',
                    html: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        'Praesent at ligula purus. Aliquam convallis, ipsum non laoreet commodo,',
                        'ligula lorem auctor quam, at ultricies nunc neque eu nibh. Pellentesque massa erat,',
                        'vehicula non dictum in, auctor eu turpis. Nam a magna sem, nec pharetra nulla.'
                    ],

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
                margin: '40 0 0 0'
            }]
        }, {
            xtype: 'container',
            minHeight: 330,
            flex: 1,
            cls: 'bottom-panel centered-text',
            padding: '20 0 10 0',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            items: [{
                xtype: 'container',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'donorspanel',
                    flex: 1
                }, {
                    xtype: 'component',
                    align: 'center',
                    html: [
                        '<h3>Donation Stats</h3>',
                        '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do</p>'
                    ]
                }]
            }, {
                xtype: 'container',

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'campaignsmap'
                }, {
                    xtype: 'component',
                    html: [
                        '<h3>Nationwide Charity Events</h3>',
                        '<p>On 12/15/2012 we ran 5 campaigns.</p>'
                    ]
                }]
            }, {
                xtype: 'container',
                minWidth: 390,

                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                items: [{
                    xtype: 'videopanel'
                }, {
                    xtype: 'component',
                    html: '<h3>Video header goes here</h3>'
                }]
            }]
        }, {
            xtype: 'container',
            padding: '10 0 0 0',

            layout: {
                type: 'hbox',
                align: 'middle'
            },

            defaults: {
                xtype: 'image',
                margin: '0 0 0 10'
            },

            items: [{
                xtype: 'component',
                flex: 1,
                html: '<strong>project 12:</strong> HTML5 Canvas Pie Chart'
            }, {
                src: 'resources/images/facebook.png'
            }, {
                src: 'resources/images/google_plus.png'
            }, {
                src: 'resources/images/twitter.png'
            }, {
                src: 'resources/images/rss.png'
            }, {
                src: 'resources/images/email.png'
            }]
        }]
    }, {
        columnWidth: 0.5,
        html: '&nbsp;' // Otherwise column collapses
    }]

});

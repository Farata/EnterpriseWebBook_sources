Ext.define('SSC.view.Main', {
    extend: 'Ext.Container',
    xtype: 'mainview',
    requires: [
        'Ext.tab.Panel',
        'Ext.Map',
        'Ext.Img'
    ],

    config: {
        layout: 'card',

        items: [
            {
                xtype: 'tabpanel',
                tabBarPosition: 'bottom',

                showAnimation: {
                    type: 'slide',
                    direction: 'down',
                    duration: 200
                },

                items: [
                    {
                        title: 'About',
                        iconCls: 'info',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'aboutview'
                            }
                        ]
                    },
                    {
                        title: 'Donate',
                        iconCls: 'love',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'logintoolbar',
                                title: 'Donate'
                            },
                            {
                                xtype: 'donateform'
                            }
                        ]
                    },
                    {
                        title: 'Stats',
                        iconCls: 'pie',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'logintoolbar',
                                title: 'Stats'
                            },
                            {
                                xtype: 'donorschart'
                            }
                        ]
                    },
                    {
                        title: 'Events',
                        iconCls: 'pin',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'logintoolbar',
                                title: 'Events'
                            },
                            {
                                xtype: 'campaignsmap'
                            }
                        ]
                    },
                    {
                        title: 'Media',
                        iconCls: 'media',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'mediaview'
                            }
                        ]
                    },
                    {
                        title: 'Share',
                        iconCls: 'share',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'logintoolbar',
                                title: 'Share'
                            },
                            {
                                xtype: 'shareview'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'loginform',

                showAnimation: {
                    type: 'slide',
                    direction: 'up',
                    duration: 200
                }
            }
        ]
    }
});

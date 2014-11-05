Ext.define('SSC.view.Share', {
    extend: 'Ext.Container',
    xtype: 'shareview',

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'container',
                layout: 'hbox',
                flex: 1,

                items: [
                    {
                        xtype: 'sharetile',
                        cls: 'sharetile-twitter',
                        flex: 1,
                        data: {
                            iconCls: 'icon-twitter',
                            title: 'Share via Twitter'
                        }
                    },
                    {
                        xtype: 'sharetile',
                        cls: 'sharetile-facebook',
                        flex: 1,
                        data: {
                            iconCls: 'icon-facebook',
                            title: 'Share via Facebook'
                        }
                    }
                ]
            },
            {
                xtype: 'container',
                layout: 'hbox',
                flex: 1,

                items: [
                    {
                        xtype: 'sharetile',
                        cls: 'sharetile-gplus',
                        flex: 1,
                        data: {
                            iconCls: 'icon-google-plus',
                            title: 'Share via Google+'
                        }
                    },
                    {
                        xtype: 'sharetile',
                        cls: 'sharetile-camera',
                        flex: 1,
                        data: {
                            iconCls: 'icon-camera',
                            title: 'PhotoApp'
                        }
                    }
                ]
            }
        ]
    }
});

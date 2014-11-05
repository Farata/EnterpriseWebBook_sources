Ext.define('SSC.view.ShareTile', {
    extend: 'Ext.Component',
    xtype: 'sharetile',

    config: {
        tpl: [
            '<div class="share-tile">',
                '<p><span class="{iconCls}"></span></p>',
                '<p>{title}</p>',
            '</div>'
        ]
    }

});
Ext.define('SSC.view.Media', {
    extend: 'Ext.NavigationView',
    xtype: 'mediaview',
    requires: [
        'Ext.Video'
    ],

    config: {
        control: {
            'list': {
                itemtap: 'showVideo'
            }
        },

        useTitleForBackButtonText: true,
        navigationBar: {
            items: [
                {
                    xtype: 'button',
                    action: 'login',
                    text: 'Login',
                    align: 'right'
                }
            ]
        },

        items: [
            {
                title: 'Media',
                xtype: 'list',
                store: 'Videos',
                cls: 'x-videos',
                variableHeights: true,
                itemTpl: [
                    '<div class="preview" style="background-image:url(resources/media/{thumbnail});"></div>',
                    '{title}',
                    '<span>{description}</span>'
                ]
            }
        ]
    },

    showVideo: function (view, index, target, model) {
        this.push(Ext.create('Ext.Video', {
            title: model.get('title'),
            url: 'resources/media/' + model.get('url'),
            posterUrl: 'resources/media/intro.jpg'
        }));
    }
});
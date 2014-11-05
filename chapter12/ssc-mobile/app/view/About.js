Ext.define('SSC.view.About', {
    extend: 'Ext.NavigationView',
    xtype: 'aboutview',

    config: {
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

        control: {
            'button[action=nav]': {
                tap: 'onButtonTap'
            }
        },

        items: [
            {
                xtype: 'container',
                title: 'Save The Child',

                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },

                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },

                defaults: {
                    margin: '0 10 5',
                    width: 280,
                    action: 'nav'
                },

                items: [
                    {
                        xtype: 'image',
                        src: 'resources/images/child-1.jpg',
                        cls: 'child-img',
                        width: 280,
                        height: 280
                    },
                    {
                        xtype: 'button',
                        text: 'Who We Are'
                    },
                    {
                        xtype: 'button',
                        text: 'What We Do'
                    },
                    {
                        xtype: 'button',
                        text: 'Where We Work'
                    },
                    {
                        xtype: 'button',
                        text: 'Way To Give'
                    }
                ]
            }
        ]
    },

    onButtonTap: function (button) {
        this.push({
            xtype: 'component',
            styleHtmlContent: true,
            title: button.getText(),
            html: '<h3>' + button.getText() + '</h3>'
        })
    }
});
Ext.define('SSC.store.Campaigns', {
    extend: 'Ext.data.Store',

    config: {
        fields: [
            { name: 'title',       type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'location',    type: 'string' }
        ],

        data: [
            {
                title:       'Lawyers for Children',
                description: 'Lawyers offering free services for The Children',
                location:    'New York, NY'
            },
            {
                title:       'Mothers of Asthmatics',
                description: 'Mothers of Asthmatics - nationwide Asthma network',
                location:    'Dallas, TX'
            },
            {
                title:       'Friends of Blind Kids',
                description: 'Semi-annual charity events for blind kids',
                location:    'Miami, FL'
            },
            {
                title:       'A Place Called Home',
                description: 'Adoption of The Children',
                location:    'Miami, FL'
            },
            {
                title:       'Marathon for Survivors',
                description: 'Annual marathon for cancer survivors',
                location:    'Fargo, ND'
            }
        ]
    }

});
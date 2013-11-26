Ext.define('SSC.store.Donors', {
    extend: 'Ext.data.JsonStore',

    fields: [
        { name: 'donors',   type: 'int' },
        { name: 'location', type: 'string' }
    ],

    data: [
        { donors: 48, location: 'Chicago, IL' },
        { donors: 60, location: 'New York, NY' },
        { donors: 90, location: 'Dallas, TX' },
        { donors: 22, location: 'Miami, FL' },
        { donors: 14, location: 'Fargo, ND' },
        { donors: 44, location: 'Long Beach, NY' },
        { donors: 24, location: 'Lynbrook, NY' }
    ]
});

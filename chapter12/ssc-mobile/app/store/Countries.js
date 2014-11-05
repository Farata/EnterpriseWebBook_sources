Ext.define('SSC.store.Countries', {
    extend: 'Ext.data.Store',

    config: {
        fields: [
            { name: 'id',   type: 'string' },
            { name: 'name', type: 'string' }
        ],

        data: [
            { id: 'US', name: 'United States' },
            { id: 'RU', name: 'Russia' }
        ]
    }
});

Ext.define('SSC.store.States', {
    extend: 'Ext.data.Store',

    config: {
        fields: [
            { name: 'id',   type: 'string' },
            { name: 'name', type: 'string' }
        ],

        data: [
            { id: 'NY', name: 'New York' },
            { id: 'NJ', name: 'New Jersey' },
            { id: 'CA', name: 'California' },
            { id: 'IL', name: 'Illinois' }
        ]
    }
});

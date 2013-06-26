Ext.define('SSC.model.Donor', {
    extend: 'Ext.data.Model',
    idProperty: '',
    fields: [
        {
            name: 'donors',
            type: 'int'
        },
        {
            name: 'location',
            type: 'string'
        }
    ]
});
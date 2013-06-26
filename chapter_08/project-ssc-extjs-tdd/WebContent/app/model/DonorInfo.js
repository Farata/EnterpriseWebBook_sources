Ext.define('SSC.model.DonorInfo', {
    extend: 'Ext.data.Model',
    idProperty: '',
    fields: [
        {
            name: 'fullName',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'address',
            type: 'string'
        },
        {
            name: 'city',
            type: 'string'
        },
        {
            name: 'zip',
            type: 'int'
        },
        {
            name: 'state',
            type: 'string'
        },
        {
            name: 'country',
            type: 'string'
        }
    ],
    validations: [
        {
            field: 'email',
            type: 'email'
        }
    ],

    donate: function () {
        console.log(Ext.encode(this));
    }
});

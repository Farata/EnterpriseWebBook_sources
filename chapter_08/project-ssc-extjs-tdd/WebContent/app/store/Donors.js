Ext.define('SSC.store.Donors', {
    extend: 'Ext.data.Store',
    model: 'SSC.model.Donor',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'donors.json',
        reader: {
            type: 'json'
        }
    }
});

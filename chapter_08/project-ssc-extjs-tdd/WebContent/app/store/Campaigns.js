Ext.define('SSC.store.Campaigns', {
    extend: 'Ext.data.Store',
    model: 'SSC.model.Campaign',

    proxy: {
        type: 'ajax',
        url: 'campaigns.json',
        reader: {
            type: 'json'
        }
    }
});
Ext.define("SSC.view.DonorsPanel", {
    extend: 'Ext.tab.Panel',
    xtype: 'donorspanel',
    requires: [
        'Ext.chart.Chart',
        'Ext.chart.series.Pie',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.plugin.CellEditing'
    ],

    maxHeight: 240,
    plain: true,

    items: [{
        title: 'Chart',
        xtype: 'chart',
        store: 'Donors',
        animate: true,
        legend: {
            position: 'right'
        },
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            angleField: 'donors',
            showInLegend: true,
            tips: {
                trackMouse: true,
                renderer: function (storeItem   ) {
                    // calculate and display percentage on hover
                    var store = storeItem.store,
                        total = 0;

                    store.each(function(rec) {
                        total += rec.get('donors');
                    });

                    this.update(Ext.String.format('{0}: {1}%',
                        storeItem.get('location'),
                        Math.round(storeItem.get('donors') / total * 100)));
                }
            },
            highlight: {
                segment: {
                    margin: 20
                }
            },
            label: {
                field: 'location',
                display: 'horizontal',
                contrast: true,
                renderer: function (label, item, storeItem) {
                    return storeItem.get('donors');
                }
            }
        }]
    }, {
        title: 'Table',
        xtype: 'gridpanel',
        store: 'Donors',
        columns: [
            { text: 'State',  dataIndex: 'location', flex: 1},
            { text: 'Donors', dataIndex: 'donors', xtype: 'numbercolumn', format: '0', editor: 'numberfield' }
        ],
        plugins: [{
            ptype: 'cellediting'
        }]
    }]

});
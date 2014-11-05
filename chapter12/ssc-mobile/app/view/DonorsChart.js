Ext.define('SSC.view.DonorsChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'donorschart',
    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate'
    ],

    config: {
        store: 'Donors',
        animate: true,
        interactions: ['rotate'],

        legend: {
            inline: false,
            docked: 'left',
            position: 'bottom'
        },

        series: [
            {
                type: 'pie',
                donut: 20,
                xField: 'donors',
                labelField: 'location',
                showInLegend: true,
                colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#a61187", "#24ad9a", "#7c7474", "#a66111"]
            }
        ]
    }
});
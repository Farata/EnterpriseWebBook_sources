Ext.define('SSC.store.Campaigns', {
    extend: 'Ext.data.JsonStore',

    fields: [
        { name: 'title',       type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'location',    type: 'string' }
    ],

    data: [{
        title:       'Lorem ipsum',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        location:    'Chicago, IL'
    }, {
        title:       'Donors meeting',
        description: 'Morbi mollis ante at ante posuere tempor.',
        location:    'New York, NY'
    }, {
        title:       'Sed tincidunt magna',
        description: 'Donec ac ligula sit amet libero vehicula laoreet',
        location:    'Dallas, TX'
    }, {
        title:       'Fusce tellus dui',
        description: 'Sed accumsan nibh sapien, interdum ullamcorper velit.',
        location:    'Miami, FL'
    }, {
        title:       'Aenean lorem quam',
        description: 'Pellentesque habitant morbi tristique senectus',
        location:    'Fargo, ND'
    }]
});
Ext.define('SSC.store.Videos', {
    extend: 'Ext.data.Store',

    config: {
        fields: [
            { name: 'title',       type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'url',         type: 'string' },
            { name: 'thumbnail',   type: 'string' }
        ],

        data: [
            { title: 'The title of a video-clip 1', description: 'Short video description 1', url: 'intro.mp4', thumbnail: 'thumbnail.jpg' },
            { title: 'The title of a video-clip 2', description: 'Short video description 2', url: 'intro.mp4', thumbnail: 'thumbnail.jpg' },
            { title: 'The title of a video-clip 3', description: 'Short video description 3', url: 'intro.mp4', thumbnail: 'thumbnail.jpg' }
        ]
    }
});

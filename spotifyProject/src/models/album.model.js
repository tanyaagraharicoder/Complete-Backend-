const moongoose = require('mongoose');

const albumSchema = new moongoose.Schema({

    title: {
        type: String,
        required: true
    },
    musics : [{
        type: moongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    artist: {
        type: moongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}
);

const albumModel = moongoose.model('album', albumSchema);
module.exports = albumModel;

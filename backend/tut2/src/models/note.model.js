const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String

})

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;






/*
CRUD operations:
C - Create - POST /notes
R - Read - GET /notes
U - Update - PATCH /notes/:index
D - Delete - DELETE /notes/:index



*/

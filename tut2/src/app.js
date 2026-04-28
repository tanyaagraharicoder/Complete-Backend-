const express = require('express');
const noteModel = require('./models/note.model'); // Import the note model for database operations


const app = express();

/*
POST /notes - Create a new note
GET /notes - Retrieve all notes
PATCH /notes/:index - Update a note at a specific index
DELETE /notes/:index - Delete a note at a specific index


*/
app.use(express.json()); // Middleware to parse JSON bodies in requests


app.post('/notes' , async (req, res)=>{
    const data = req.body; // Get the note data from the request body

     await noteModel.create({
        title: data.title,
        description: data.description
    }) // Create a new note in the database using the note model


    res.status(201).json({
        message:'Note created successfully'

    })
})

app.get('/notes', async (req,res)=>{

    const notes = await noteModel.find() // Retrieve all notes from the database using the note model
    res.status(200).json({
        message:'Notes retrieved successfully',
        notes:notes
    })

})

app.delete('/notes/:id', async(req, res)=>{
    const id = req.params.id; // Get the note ID from the URL parameters
    // Delete the note with the specified ID from the database using the note model

    await noteModel.findOneAndDelete({
        _id:id



    })

    res.status(200).json({
        message:'Note deleted successfully'
    })
})

app.patch('/notes/:id', async (req,res)=>{
    const id = req.params.id; // Get the note ID from the URL parameters
    const description = req.body.description; // Get the new description from the request body

    await noteModel.findOneAndUpdate({
        _id:id
    },{
        description:description
    }) // Update the description of the note with the specified ID in the database using the note model

    res.status(200).json({
        message:'Note updated successfully',
    })


})










module.exports = app;
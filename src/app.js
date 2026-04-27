
//  app.js ka main kam hai server create karna aur routes define karna. Ye file server.js me import hogi aur waha se server start hoga.

const express= require('express'); // Import the Express library

const app = express(); // Create an instance of the Express
//  application

app.use(express.json()); // Middleware to parse JSON bodies in requests

const notes = []

// title and discription 
// POST /notes 

app.post('/notes', (req, res) => {
        notes.push(req.body); // Add the note from the request body to the notes array

        res.status(201).json({ message: 'Note created successfully' }); // Send a response indicating the note was created



})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:'Notes retrieved successfully',
        notes:notes
    })
})

// delete/notes/:12

app.delete('/notes/:index',(req,res)=>{
    const index = parseInt(req.params.index); // Get the index from the URL parameters and convert it to an integer
    delete notes[index]; // Delete the note at the specified index from the notes array

    res.status(200).json({ message: 'Note deleted successfully' }); // Send a response indicating the note was deleted


   

   
})

// update /notes/:index
app.patch('/notes/:index', (req,res)=>{

    const index = req.params.index; // Get the index from the URL parameters
    const description = req.body.description; // Get the new description from the request body

    notes[index].description=  description; // Update the description of the note at the specified index in the notes array
    res.status(200).json({
        message:'Note updated successfully',
       

    })

})



module.exports = app; // Export the app instance so it can be used in other files (like server.js)
import express from 'express'
import cors from 'cors'
import { 
  getVersesInChapter, getAllBooks, getAllChapters, createMember, findUser, 
  getNotes, createNote, deleteNote, updateNote, favoriteNote, getInfo, updateInfo, 
  deleteMember, getFavNotes
} from './database.js'

const app = express()

// Must be below get requests
app.use(express.json())
app.use(cors())

app.post("/createMember", async (req, res) => {
  const fName = req.body.fName
  const lName = req.body.lName
  const uName = req.body.uName
  const pW = req.body.pW
  try {
    let response = await createMember(fName, lName, uName, pW)
    // NEED this to prevent infinite pending after 6 posts
    res.status(201).send(response)
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.post("/verifyLogin", async (req, res) => {
  const uName= req.body.uName
  const pW = req.body.pW

  const user = await findUser(uName, pW)
  res.send({
    user
  })
})

app.get("/getAllBooks", async (req, res) => {
  const books = await getAllBooks()
  res.send({
      books
  })
})

app.get("/:mID/favNotes", async (req, res) => {
  const mID = req.params.mID
  const favNotes = await getFavNotes(mID)
  res.send({
    favNotes
  })
})

app.get("/:bName/getAllChapters", async (req, res) => {
  const bName = req.params.bName
  const chapters = await getAllChapters(bName)
  res.send({
    chapters
  })
})

app.get("/:version/:book/:chapter", async (req, res) => {
  const version = req.params.version
  const book = req.params.book
  const chapter = req.params.chapter
  const verses = await getVersesInChapter(book, chapter, version)
  res.send({
    verses
  })
}) 

app.get("/:mID", async (req, res) => {
  const mID = req.params.mID
  const info = await getInfo(mID)
  res.send({
    info
  })
})

app.get("/:mID/:vID", async (req, res) => {
  const mID = req.params.mID
  const vID = req.params.vID
  const notes = await getNotes(mID, vID)
  res.send({
    notes
  })
})



app.post("/createNote", async (req, res) => {
  const content = req.body.content
  const mID = req.body.mID
  const vID = req.body.vID

  try {
    let response = await createNote(content, mID, vID)
    // NEED this to prevent infinite pending after 6 posts
    res.status(201).send(response)
  }
  catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.post("/deleteNote", async (req, res) => {
  const nID = req.body.nID
  try {
    let response = await deleteNote(nID)
    res.status(201).send(response)
  } 
  catch(e) {
    console.log(e)
    res.status(400).send(e);
  }
})

app.post("/deleteMember", async (req, res) => {
  const mID = req.body.mID
  try {
    let response = await deleteMember(mID)
    res.status(201).send(response)
  } 
  catch(e) {
    console.log(e)
    res.status(400).send(e);
  }
})

app.post("/updateNote", async (req, res) => {
  const content = req.body.content
  const nID = req.body.nID

  try {
    let response = await updateNote(content, nID)
    console.log(response)
    res.status(201).send(response)
  }
  catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.post("/updateInfo", async (req, res) => {
  const Fname = req.body.fName
  const Lname = req.body.lName
  const Uname = req.body.uName
  const PW = req.body.PW
  const mID = req.body.mID
  try {
    let response = await updateInfo(Fname, Lname, Uname, PW, mID)
    console.log(response)
    res.status(201).send(response)
  }
  catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
})

app.post("/favoriteNote", async (req, res) => {
  const isFavorite = req.body.isFavorite
  const nID = req.body.nID
  try {
    let response = await favoriteNote(nID, isFavorite)
    res.status(201).send(response)
  }
  catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
})

const port = 8080
const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

server.keepAliveTimeout = 0
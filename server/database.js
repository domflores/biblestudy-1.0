// All code that connects to mySQL and queries from the database

import mysql from 'mysql2';

// Needs to get info from .env
import dotenv from 'dotenv';
dotenv.config();

const Pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// === Create Functions ========================================================

export async function createMember(Fname, Lname, Uname, PW,) {
    try {
        const curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const result = await Pool.query(`
        INSERT INTO Member (Fname, Lname, Uname, PW, joinDate)
        VALUES (?, ?, ?, ?, ?)
        `, [Fname, Lname, Uname, PW, curDate]);
        return result;
    } catch(err) {
        return err.stack
    }
}

// Insert new note: need mID, vID, and content

export async function createNote(content, mID, vID) {
    const result = await Pool.query(`
    CALL CreateNote(?, ?, ?)
    `, [content, mID, vID])
    return result
}

// ==== Read Functions =========================================================

export async function findUser(Uname, PW) {
    const [rows] = await Pool.query(`
    SELECT * FROM Member WHERE Uname = ? AND PW = ?
    `, [Uname, PW])

    return rows
}

// Get all 66 Books

export async function getAllBooks() {
    const [rows] = await Pool.query("SELECT DISTINCT bookID, bName FROM Verses")
    return rows
}

// Get all chapters for a book

export async function getAllChapters(bName) {
    const [rows] = await Pool.query(`
    SELECT DISTINCT chapter FROM Verses WHERE bName = ?
    `, [bName])
    return rows
}

// Get all verses within a chapter

export async function getVersesInChapter(bName, chapter, version) {
    const [rows] = await Pool.query(`
    SELECT vID, verseNum, verse, bName, chapter FROM Verses 
    WHERE bName = ?  
    AND chapter = ? 
    AND version = ?
    `, [bName, chapter, version]);

    return rows
}

// Query for existing notes

export async function getNotes(mID, vID) {
    const [rows] = await Pool.query(`
    SELECT * FROM Note WHERE mID = ? AND vID = ?
    `, [mID, vID])
    return rows
}

export async function getInfo(mID) {
    const [rows] = await Pool.query(`
    SELECT * FROM Member WHERE mID = ?
    `, [mID])
    return rows
}

export async function getFavNotes(mID) {
    const [rows] = await Pool.query(`SELECT * FROM Note WHERE mID = ? AND isFavorite = 1`, [mID])
    return rows
}

// === Update Functions ==============================================================

export async function updateInfo(fName, lName, uName, PW, mID) {
    const result = await Pool.query(`
    UPDATE Member SET Fname = ?, 
    Lname = ?, 
    Uname = ?,
    PW = ?
    WHERE mID = ?`, [fName, lName, uName, PW, mID])
    return result
}

export async function updateNote(content, nID) {
    const result = await Pool.query(`UPDATE Note SET content = ? WHERE nID = ?`, [content, nID])
    return result
}

export async function favoriteNote(nID, isFavorite) {
    const result = await Pool.query(`UPDATE Note SET isFavorite = ? WHERE nID = ?`, [isFavorite, nID])
    return result
}

// === Delete Functions ==============================================================

export async function deleteNote(nID) {
    try {
        await Pool.query(`
        DELETE FROM Note WHERE nID = ?
        `, [nID])
    } catch(e) {
        console.error("error", e)
        throw e
    }
}

export async function deleteMember(mID) {
    await Pool.query(`DELETE FROM Note WHERE mID = ?`, [mID])
    await Pool.query(`DELETE FROM Member WHERE mID = ?`, [mID]);
}



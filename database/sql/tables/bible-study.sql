DROP TABLE IF EXISTS Verses;

CREATE TABLE Verses (
    vID int(11) NOT NULL AUTO_INCREMENT,
    bookID int(11) NOT NULL,
    bName varchar(15),
    chapter int(11) NOT NULL,
    verseNum int(11) NOT NULL,
    verse varchar(1000) NOT NULL,
    `version` varchar(6),
    PRIMARY KEY (vID)
);

DROP TABLE IF EXISTS Member;

CREATE TABLE Member (
    mID INT NOT NULL AUTO_INCREMENT,
    Fname VARCHAR(30) NOT NULL,
    Lname VARCHAR(30) NOT NULL,
    Uname VARCHAR(30) NOT NULL UNIQUE,
    PW VARCHAR(30) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT 0,
    joinDate DATE,
    PRIMARY KEY (mID)
);

/* Add isFavorite*/
DROP TABLE IF EXISTS Note;

CREATE TABLE Note (
    nID INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(3000),
    createDate DATE,
    mID INT NOT NULL,
    vID int(11) NOT NULL,
    isFavorite BOOLEAN DEFAULT 0,
    PRIMARY KEY (nID),
    FOREIGN KEY (mID) REFERENCES Member(mID),
    FOREIGN KEY (vID) REFERENCES Verses(vID)
);
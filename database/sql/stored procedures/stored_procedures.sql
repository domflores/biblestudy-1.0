-- For sign up
DROP PROCEDURE IF EXISTS CreateMember;
DELIMITER //

CREATE PROCEDURE CreateMember(Fname varchar(30), Lname varchar(30), Uname varchar(30), PW varchar(30), HPW varchar(60))
BEGIN
    SET @date = NOW();
    INSERT INTO Member (Fname, Lname, Uname, PW, HPW, isAdmin, joinDate) VALUES (fN, lN, uN, psW, hpsw, 0, @date);
END
//
DELIMITER ;

-- Create Note
-- Need to add isFavorite default to 0
DROP PROCEDURE IF EXISTS CreateNote;
DELIMITER //

CREATE PROCEDURE CreateNote(cont varchar(3000), memID INT, verID int(11))
BEGIN
    SET @date = NOW();
    INSERT INTO Note (content, createDate, mID, vID, isFavorite) VALUES (cont, @date, memID, verID, 0);
END
//
DELIMITER ;
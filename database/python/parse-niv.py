with open("../csv/NIV_fixed.csv", "r") as file:
    data = file.read()

fout = open("insert-niv.sql", "w")

charCount = len(data)

print("Number of characters in file: " + str(charCount) + "\n")

beginning = True
counter = 0
while counter < charCount:
    if beginning:
        fout.write("INSERT INTO Verses (bookID, chapter, verseNum, verse, `version`) VALUES (")
        beginning = False
    elif data[counter] == '\n':
        fout.write(", 'niv');")
        beginning = True

    if data[counter] == '"':
        fout.write('"')
    if data[counter] == "'":
        fout.write("'")

    if data[counter] != '$':  
        fout.write(data[counter])
    else:
        fout.write('"')
    counter = counter + 1

file.close()
fout.close()
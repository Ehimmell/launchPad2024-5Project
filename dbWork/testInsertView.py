import sqlite3

connection = sqlite3.connect('data.db')

cursor = connection.cursor()

testProfessor = [1, 'Mystery Professor', 'This is a test professor', 1]

testProfessorStr = ','.join([f"'{str(i)}'" if isinstance(i, str) else str(i) for i in testProfessor])

cursor.execute(f"SELECT * FROM professors WHERE id = {testProfessor[0]}")
data = cursor.fetchone()

if data is None:
    cursor.execute(f'INSERT INTO professors VALUES ({testProfessorStr})')

    connection.commit()
else:
    print("Data already exists in the table.")

connection.close()


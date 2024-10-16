import sqlite3
import uuid

def insertClass(classData, professorId):
    connection = sqlite3.connect('data.db')

    cursor = connection.cursor()

    name = f'professor{professorId}classList'
    name = name.replace('-', '')

    cursor.execute(
                   f"SELECT count(name)"
                   f"     FROM sqlite_master"
                   f"            WHERE type='table' AND name='{name}'\n"
                   f"    ")

    data = cursor.fetchone()

    if data[0] == 0:
        cursor.execute('\n'
                       f'CREATE TABLE {name} (\n'
                       f'    id INTEGER PRIMARY KEY,\n'
                       f'    name TEXT,\n'
                       f'    gpa REAL\n'
                       f')\n')

        for c in classData:

            classStr = ','.join([f"'{str(i)}'" if isinstance(i, str) else str(i) for i in c])

            cursor.execute(f"SELECT * FROM {name} WHERE id = {c[0]}")
            data = cursor.fetchone()

            if data is None:
                cursor.execute(f'INSERT INTO {name} VALUES ({classStr})')

                connection.commit()
            else:
                print("Data already exists in the table.")

        connection.close()


def insertProfessor(professorData):
    connection = sqlite3.connect('data.db')

    cursor = connection.cursor()
    def checkIfExists(professorData):
        cursor.execute(f'SELECT * FROM professors WHERE name = "{professorData[1]}"')
        data = cursor.fetchone()
        return data

    if checkIfExists(professorData) is None:

        cursor = connection.cursor()

        professorId = str(uuid.uuid4())

        professorData.append(professorId)

        cursor.execute(f'INSERT INTO professors VALUES (?, ?, ?, ?)', tuple(professorData))

        connection.commit()

        return professorId

    print("Data already exists in the table.")

    return cursor.execute(f'SELECT classListId FROM professors WHERE name = "{professorData[1]}"').fetchone()[0]


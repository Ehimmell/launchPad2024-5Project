import sqlite3

def insertClass(classData, professorId):
    connection = sqlite3.connect('data.db')

    cursor = connection.cursor()

    name = f'professor{professorId}classList'

    cursor.execute(
                   f"SELECT count(name)"
                   f"     FROM sqlite_master"
                   f"            WHERE type='table' AND name='{name}'\n"
                   f"    ")

    data = cursor.fetchone()

    if data[0] == 0:
        print('not found, creating')
        cursor.execute(
            f"CREATE TABLE {name}("
            f"id INTEGER PRIMARY KEY,"
            f"name TEXT,"
            f"gpa REAL)"
        )

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


insertClass([[1, 'CS 101', 3.5], [2, 'CS 102', 3.0]], 1)
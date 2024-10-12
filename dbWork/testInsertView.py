import sqlite3
def test():
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

def get_tables():
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    connection.close()

    tables = [table[0] for table in tables]

    return tables


def print_table(table_name):
    connection = sqlite3.connect('data.db')
    cursor = connection.cursor()

    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()

    for row in rows:
        print(row)

    connection.close()




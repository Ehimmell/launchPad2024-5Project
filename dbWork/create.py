import sqlite3

connection = sqlite3.connect('data.db')

cursor = connection.cursor()

cursor.execute('\n'
               'CREATE TABLE professors (\n'
               '    id TEXT PRIMARY KEY,\n'
               '    name TEXT,\n'
               '    summary TEXT,\n'
               '    classListId TEXT\n'
               ')\n')

connection.close()
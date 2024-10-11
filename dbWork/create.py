import sqlite3

connection = sqlite3.connect('data.db')

cursor = connection.cursor()

cursor.execute('\n'
               'CREATE TABLE professors (\n'
               '    id INTEGER PRIMARY KEY,\n'
               '    name TEXT,\n'
               '    summary TEXT,\n'
               '    classListId INTEGER\n'
               ')\n')

connection.close()
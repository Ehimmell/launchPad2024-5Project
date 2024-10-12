import sqlite3

connection = sqlite3.connect('data.db')
cursor = connection.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

for table_name in tables:
    cursor.execute(f'DROP TABLE {table_name[0]};')

connection.commit()
connection.close()

import sqlite3

from getReviews.scraping import RMP, BoilerGrades
from getReviews.summary import gptCall
from professorClassInsert import insertClass
from professorClassInsert import insertProfessor
import uuid


def get(professorName):
    reviews = RMP.scrape(professorName)

    class2Grade = BoilerGrades.scrape(professorName)

    summary = gptCall.call(reviews)

    return class2Grade, summary

def insert(professorName):

    c2g, summary = get(professorName)

    classes = list(c2g.keys())

    grades = list(c2g.values())

    classGradePairs = []

    id = insertProfessor([str(uuid.uuid4()), professorName, summary])

    print(id)

    for i in range(len(classes)):
        classGradePairs.append([i, classes[i], grades[i]])

    insertClass(classGradePairs, id)


insert('Kenji Matsuki')






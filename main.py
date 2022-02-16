# skrypt który konwertuje plik csv na json
import csv
import json

csvfile = open('./zeszyt2.csv', 'r')
jsonfile = open('./data.json', 'w')

fieldnames = ("Miejscowosc", "Dlugosc", "Szerokosc")
reader = csv.DictReader(csvfile, fieldnames)
out = json.dumps([row for row in reader], separators=(',', ':'))
jsonfile.write(out)

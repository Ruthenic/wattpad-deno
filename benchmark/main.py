from wattpad_scraper import Wattpad
import os

watt = Wattpad()

books = watt.search_books("bendy x reader")

print(books[0].title)
#print(books[0].chapters[0].content)
os.system("rm -rf temp_catch_delete_if_not_needed")
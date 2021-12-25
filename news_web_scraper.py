import datetime
import pandas as pd
import time
 
from datetime import date
from datetime import timedelta

start_date = date(2021, 1, 1)
todays_date = date.today()

no_days = int((todays_date-start_date).days)
print(no_days, " days")
index = pd.date_range(start_date, periods=no_days, freq='D')
 
columns = ['']


from bs4 import BeautifulSoup
import requests

start_index=44197
# end_index=44339

end_index=start_index+no_days

headlies = []

for i in range(start_index, end_index):
    print("day: ", i-start_index)
    path = 'https://economictimes.indiatimes.com/archivelist/year-2021,month-1,starttime-{}.cms'.format(str(i))
    html_text = requests.get(path).text

    soup = BeautifulSoup(html_text, 'lxml')

    container = soup.find('li')
    headlies.append(container.text)
    # time.sleep(0.5)
# df.insert(1, "headlines_text", headlies)

df = pd.DataFrame({"publish_date":index, "headline_text":headlies})
print(df.tail())
df.to_csv('new_headlines.csv')


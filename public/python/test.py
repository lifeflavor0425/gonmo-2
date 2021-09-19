import os
import time
import datetime
start = time.time()

time.sleep(10)
sec = time.time()-start
times = str(datetime.timedelta(seconds=sec)).split(".")
times = times[0]
if(sec>= 13):
  print(sec)

print(times)
 

# os.system ('node ../js/test2.js') # 원하는 콘솔 ㅕ


# os.system('python test2.py')

print(1)
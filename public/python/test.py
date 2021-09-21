import os
import time


start = time.time()
sec = time.time()-start   # 이게 기준 시간
print(sec)
i=0
f = open("test.txt", "w", encoding="UTF8")   # 이게 파일 생성하는것- "경로+파일이름"
while i<5 :  #5번 실행(예시)
  time.sleep(2) 
  sec = time.time()-start  # 이게 기준 시간
  num = str(sec).split(".")  #split는 . 을 기준으로 나눔
  num=num[0]                 #나눈것 중에 앞부분 ex) 4  <- .  42141 초
  f.write( num + "초 : 파일 내용은 이거야. \n")  # 파일안에 내용 쓰는것
  # -------------------------------------------------
  time.sleep(2) 
  sec = time.time()-start  # 이게 기준 시간
  num = str(sec).split(".")
  num=num[0]
  f.write( num + "초 : 머 시발아 \n")
  i+=1



# os.system ('node ../js/test2.js') # 원하는 콘솔 ㅕ


# os.system('python test2.py')

print(1)
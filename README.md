請先確認安裝npm, nodejs和mysql


1. 一開始先安裝需要的js library
     
   
		npm install
     
2. 將sql檔案匯入Mysql裡    

		mysql -u root -p stocks < ./mysql/mysql.sql
	
	匯入失敗的話，請確認一下是否有stocks這個Database在本機的Mysql中    
	         
3. 這專案預設Mysql的使用者是"root"使用密碼是"test"。如果想要修改，請到./server/server.js下的第27-32行修改設定。
4. 利用npm 啟動服務    

		npm start
		
5. 預設服務是開在port 3000，打開瀏覽器(ex. Safari) 網址列輸入localhost:3000

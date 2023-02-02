# RsClone
Clone of steam for final task
Команда для запуска сервера npm run serve (в другом терминале)
https://localhost:8000 запросы для защищенного соединения
чтобы локалхост работал с https запросами в хроме ввести chrome://flags/#allow-insecure-localhost поставить в enabled

http://localhost:8888 запросы для незащищенного соединения

Запросы на сервер :
method post, '/authUser', { userName: 'Vasya', password: '123' }, response : {response:"Wrong name"},
                                                                            {response:'Wrong password'},
                                                                            {id:1,userName:'Vasya',password:123,status:'user',date:'12.10.2000'}
method post, '/registUser', { userName: 'Vasya', password: '123' }, response : {response:'Choose other name'},
                                                                               {id:1,userName:'Vasya',password:123,status:'user'}

/* 编辑这个文件即可增删人物、事件和札记。所有未收录的信息都不应自动推断。 */
window.ARCHIVE_DATA = {
 worlds:['现代','古代','修真','末世'],
 characters:[
 {id:'h-xing',name:'邢怀戎',world:'古代',source:'邢怀戎卡',identity:'北疆将领',color:'#b54850',portrait:'',bio:'永安十六年平定北疆叛乱，永安十七年封将。',personality:'',links:['h-gu'],events:['h-03','h-04','h-05','h-06']},
 {id:'h-gu',name:'辜琳琅',world:'古代',source:'辜琳琅卡',identity:'承梁开国君主',color:'#ad741f',portrait:'',bio:'幼名辜草。永安十五年流浪至长安，改名辜琳琅。后追随邢怀戎从军，承安一年建立承梁。',personality:'',links:['h-xing','h-ashina'],events:['h-01','h-02','h-04','h-06','h-07','h-08','h-09','h-10']},
 {id:'h-ashina',name:'阿史那信',world:'古代',source:'阿史那信卡',identity:'北塞旧部',color:'#8056a5',portrait:'',bio:'承安十五年投降，顺宁四年为其人物卡开场年份。',personality:'',links:['h-gu'],events:['h-09','h-10','h-11']},
 {id:'m-guqi',name:'辜麒',world:'现代',source:'沪城·辜麒卡',identity:'',color:'#9463a9',portrait:'',bio:'人物资料待补充。',personality:'',links:[],events:[]},
 {id:'m-li',name:'黎奖',world:'现代',source:'港城·黎奖卡',identity:'',color:'#997600',portrait:'',bio:'人物资料待补充。',personality:'',links:[],events:[]},
 {id:'x-li',name:'黎奖',world:'修真',source:'黎奖卡',identity:'',color:'#997600',portrait:'',bio:'修真历2847年（21岁）穿越。',personality:'',links:[],events:['x-06']},
 {id:'x-song',name:'宋知世',world:'修真',source:'宋知世卡',identity:'',color:'#a83c4b',portrait:'',bio:'其人物卡开场白为独立时间线，是否沿用原书纪年尚未确定。',personality:'',links:[],events:['x-03','x-05','x-07','x-08','x-09','x-10']},
 {id:'x-lou',name:'楼宴宁',world:'修真',source:'楼宴宁卡',identity:'',color:'#3c73ac',portrait:'',bio:'修真历2829年觉醒灵根，2834年被青云宗宗主温群收徒。',personality:'',links:[],events:['x-01','x-02','x-04','x-08']},
 {id:'x-shui',name:'水俱雅',world:'修真',source:'水俱雅卡',identity:'妖皇',color:'#3e8063',portrait:'',bio:'继承妖皇之位的年份为推算。',personality:'',links:[],events:['x-00','x-06']},
 {id:'x-qiu',name:'求渺',world:'修真',source:'宋知世卡等',identity:'',color:'#577fad',portrait:'',bio:'修真历2850年耗费寿元推演温群的致命时机，因反噬而死。',personality:'',links:[],events:['x-05','x-09']},
 {id:'x-beishuo',name:'北朔',world:'修真',source:'北朔卡',identity:'',color:'#c15b53',portrait:'',bio:'开场白为独立时间线，具体历年未知。',personality:'',links:[],events:[]},
 {id:'p-qiu',name:'求渺',world:'末世',source:'求渺卡',identity:'',color:'#577fad',portrait:'',bio:'人物资料待补充。',personality:'',links:[],events:[]}
 ],
 recurring:[
 {name:'邢怀戎',sources:['古代 · 邢怀戎卡','古代 · 辜琳琅卡']},
 {name:'辜琳琅',sources:['古代 · 辜琳琅卡','古代 · 阿史那信卡','现代 · 沪城 · 辜麒卡','末世 · 求渺卡']},
 {name:'黎奖',sources:['修真 · 黎奖卡','现代 · 港城 · 黎奖卡','古代 · 辜琳琅卡','修真 · 宋知世卡','修真 · 楼宴宁卡','修真 · 水俱雅卡','现代 · 港城 · 贝瑞旻卡','现代 · 港城 · 贝瑞恩卡']}
 ],
 singleNPC:[],
 events:[
 {id:'h-01',world:'古代',year:'永安十二年',text:'大旱。辜草（7）目睹父亲饿死、母亲受辱自尽、乡邻易子而食。',people:['h-gu']},
 {id:'h-02',world:'古代',year:'永安十五年',text:'大旱。辜草（10）流浪至长安乞讨，改名辜琳琅。',people:['h-gu']},
 {id:'h-03',world:'古代',year:'永安十六年',text:'邢怀戎（17）平定北疆叛乱。',people:['h-xing']},
 {id:'h-04',world:'古代',year:'永安十七年',text:'邢怀戎（18）封将；辜琳琅（12）追随其从军，暗中学习兵法权谋。',people:['h-xing','h-gu']},
 {id:'h-05',world:'古代',year:'永安十八年',text:'邢怀戎（19）独掌三万精兵。',people:['h-xing']},
 {id:'h-06',world:'古代',year:'永安二十二年',text:'邢怀戎（23）战死；辜琳琅（17）借复仇旗号起义。',people:['h-xing','h-gu']},
 {id:'h-07',world:'古代',year:'承安一年',text:'大梁灭国。辜琳琅（19）诛杀昏君，建立承梁，追封邢怀戎，清洗功臣。',people:['h-gu']},
 {id:'h-08',world:'古代',year:'承安四年',text:'辜琳琅（21）人物卡开场。',people:['h-gu']},
 {id:'h-09',world:'古代',year:'承安十五年',text:'辜琳琅（33）御驾亲征北塞；阿史那信（14）投降，成为马奴。',people:['h-gu','h-ashina']},
 {id:'h-10',world:'古代',year:'顺宁一年',text:'辜琳琅（36）退位；阿史那信（17）联络旧部与边将，等待内乱。',people:['h-gu','h-ashina']},
 {id:'h-11',world:'古代',year:'顺宁四年',text:'阿史那信（20）人物卡开场；瑞王辜麟（18）将 user 赐婚给阿史那信。',people:['h-ashina']},
 {id:'x-00',world:'修真',year:'修真历2647年',text:'水俱雅继承妖皇之位。',people:['x-shui'],status:'推算'},
 {id:'x-01',world:'修真',year:'修真历2829年',text:'楼宴宁（5）觉醒灵根。',people:['x-lou']},
 {id:'x-02',world:'修真',year:'修真历2834年',text:'楼宴宁（10）在养元堂被青云宗宗主温群收徒，由鹿人甲代为教导。',people:['x-lou']},
 {id:'x-03',world:'修真',year:'修真历2836年',text:'温群杀宋青云，宋知世（7）逃跑。',people:['x-song']},
 {id:'x-04',world:'修真',year:'修真历2839年',text:'楼宴宁（15）从炼气突破到渡劫。',people:['x-lou']},
 {id:'x-05',world:'修真',year:'修真历2842年',text:'宋知世（13）被陆行舟收入长明粥铺，认识沈墨、求渺。',people:['x-song','x-qiu']},
 {id:'x-06',world:'修真',year:'修真历2847年',text:'黎奖（21）穿越；水俱雅（300+）人物卡开场。',people:['x-li','x-shui']},
 {id:'x-07',world:'修真',year:'修真历2848年',text:'沈墨死于情报任务；宋知世（19）判断无法接应而放弃救援，第一枚铜钱上腕。',people:['x-song']},
 {id:'x-08',world:'修真',year:'修真历2849年',text:'陆行舟被俘，传信“来杀我”；宋知世（20）亲手杀死陆行舟并接管铺子，第二枚铜钱上腕；楼宴宁（25）人物卡开场。',people:['x-song','x-lou']},
 {id:'x-09',world:'修真',year:'修真历2850年',text:'求渺耗寿元推演温群的致命时机，反噬而死；宋知世（21）自杀入都，转修鬼身。',people:['x-song','x-qiu']},
 {id:'x-10',world:'修真',year:'第一年春（独立时间线）',text:'宋知世（22）人物卡开场。若沿用原书时间线，推测为修真历2851年。',people:['x-song'],status:'待确认'}
 ],
 essays:[], journals:[]
};

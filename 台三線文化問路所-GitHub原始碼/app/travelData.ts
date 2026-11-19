export type TravelRecord = {
  category: "景點" | "美食" | "交通";
  name: string;
  county: string;
  area: string;
  type: string;
  intro: string;
  recommendation: string;
  note: string;
  source: string;
};

export const travelData: TravelRecord[] = [
  { category:"景點", name:"北埔老街", county:"新竹縣", area:"北埔鄉", type:"歷史街區", intro:"客庄老街保存傳統街屋、廟宇與茶文化，可品嚐擂茶與客家點心。", recommendation:"建議停留 60–120 分鐘", note:"適合步行探索；假日人潮較多", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"內灣老街", county:"新竹縣", area:"橫山鄉", type:"鐵道／老街", intro:"沿內灣支線發展的山城街區，結合鐵道風景、吊橋與客家小吃。", recommendation:"建議停留 90–150 分鐘", note:"可搭臺鐵內灣線抵達", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"峨眉湖", county:"新竹縣", area:"峨眉鄉", type:"湖景／休閒", intro:"大埔水庫周邊湖光山色，適合散步與欣賞山城慢活風景。", recommendation:"建議停留 60–90 分鐘", note:"湖區各步道入口分散，先確認停車點", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"獅頭山風景區", county:"新竹縣／苗栗縣", area:"峨眉鄉／南庄鄉", type:"登山／宗教", intro:"寺廟群與山林步道交織，可體驗客庄宗教文化與自然生態。", recommendation:"建議停留 120–180 分鐘", note:"依步道難度選擇路線", source:"https://www.trimt-nsa.gov.tw/zh-tw/tour/52/" },
  { category:"景點", name:"南庄老街", county:"苗栗縣", area:"南庄鄉", type:"老街／文化", intro:"桂花巷、洗衫坑與老郵局呈現南庄多元族群與礦業聚落記憶。", recommendation:"建議停留 90–150 分鐘", note:"可由竹南搭台灣好行南庄線", source:"https://www.taiwantrip.com.tw/Frontend/Route/Select_p?RouteID=R0004" },
  { category:"景點", name:"獅潭新店老街", county:"苗栗縣", area:"獅潭鄉", type:"老街／客庄", intro:"沿台三線的樸實街區，可體驗客庄米食、聚落生活與慢遊氛圍。", recommendation:"建議停留 45–90 分鐘", note:"適合與鳴鳳古道搭配", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"鳴鳳古道", county:"苗栗縣", area:"獅潭鄉", type:"古道／健行", intro:"樟之細路相關古道，穿越山林並認識早期聚落往來路徑。", recommendation:"建議停留 90–150 分鐘", note:"登山前查詢天氣與步道狀況", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"大湖酒莊與草莓文化館", county:"苗栗縣", area:"大湖鄉", type:"農業／觀光", intro:"以大湖草莓產業為主題，可認識農產加工與地方特色伴手禮。", recommendation:"建議停留 45–90 分鐘", note:"草莓鮮果體驗有季節性", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"東勢客家文化園區", county:"臺中市", area:"東勢區", type:"文化／展館", intro:"以客家文化與地方生活為主題的參訪據點，適合認識東勢客庄。", recommendation:"建議停留 60–90 分鐘", note:"出發前確認展館開放資訊", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"景點", name:"石岡水壩", county:"臺中市", area:"石岡區", type:"水利／景觀", intro:"大甲溪沿線水利設施與周邊景觀，適合結合石岡自行車旅行。", recommendation:"建議停留 30–60 分鐘", note:"部分區域可能有管制，依現場公告", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"美食", name:"金英餐麵館", county:"新竹縣", area:"北埔鄉", type:"客家餐麵", intro:"傳統客家餐麵料理，適合安排北埔老街午餐。", recommendation:"推薦客家麵食與家常料理", note:"店家營業與菜單請事先確認", source:"https://www.google.com/maps/search/?api=1&query=金英餐麵館+北埔" },
  { category:"美食", name:"北埔登富茶坊", county:"新竹縣", area:"北埔鄉", type:"茶食／客家菜", intro:"結合北埔茶文化與地方料理，適合慢食體驗。", recommendation:"推薦茶飲及客庄料理", note:"建議確認當日供餐", source:"https://www.google.com/maps/search/?api=1&query=北埔登富茶坊" },
  { category:"美食", name:"老店客家菜", county:"新竹縣", area:"北埔鄉", type:"客家合菜", intro:"北埔廟前街周邊客家菜餐館，適合老街參訪後用餐。", recommendation:"推薦客家家常合菜", note:"熱門時段先確認座位", source:"https://www.google.com/maps/search/?api=1&query=老店客家菜+北埔" },
  { category:"美食", name:"泥磚屋客家菜餐廳", county:"新竹縣", area:"北埔鄉", type:"客家合菜", intro:"以傳統客家風味與多人共享的合菜形式為特色。", recommendation:"推薦客家經典菜色", note:"用餐前確認營業時間", source:"https://www.google.com/maps/search/?api=1&query=泥磚屋客家菜餐廳" },
  { category:"美食", name:"青青好農食", county:"新竹縣", area:"北埔鄉", type:"在地食材", intro:"結合地方食材與客庄飲食文化，也適合尋找農產伴手禮。", recommendation:"推薦地方食材料理與農產", note:"營業時間以店家公告為準", source:"https://www.google.com/maps/search/?api=1&query=青青好農食+北埔" },
  { category:"美食", name:"耕野月眉 客家菜", county:"新竹縣", area:"峨眉鄉", type:"客家合菜", intro:"峨眉地區客家料理餐館，適合湖區或老街行程搭配。", recommendation:"推薦客家合菜", note:"假日建議事先聯繫", source:"https://www.google.com/maps/search/?api=1&query=耕野月眉+客家菜" },
  { category:"美食", name:"崛起山城客家特色美食餐廳", county:"苗栗縣", area:"大湖鄉", type:"客家料理", intro:"大湖地區客家風味餐廳，可搭配草莓產地旅遊。", recommendation:"推薦客家風味料理", note:"菜單與供餐依現場公告", source:"https://www.google.com/maps/search/?api=1&query=崛起山城客家特色美食餐廳+大湖" },
  { category:"美食", name:"阿戊嫂的店", county:"苗栗縣", area:"三灣鄉", type:"客家熱炒", intro:"曾以客家小炒獲競賽肯定，可認識三灣在地客家料理。", recommendation:"推薦客家小炒", note:"出發前確認營業狀態", source:"https://event.kadokawa.com.tw/hakka/index.html" },
  { category:"美食", name:"賴新魁麵館 三義總店", county:"苗栗縣", area:"三義鄉", type:"客家麵食", intro:"三義地區知名麵食餐館，適合安排三義周邊延伸行程。", recommendation:"推薦客家麵食", note:"三義屬台三線周邊延伸區域", source:"https://www.google.com/maps/search/?api=1&query=賴新魁麵館+三義" },
  { category:"美食", name:"十六份人文茶館", county:"苗栗縣", area:"三義鄉", type:"茶館／地方料理", intro:"結合山城茶館氛圍與餐食，適合鐵道景點周邊休憩。", recommendation:"推薦茶飲與地方餐點", note:"三義屬台三線周邊延伸區域", source:"https://www.google.com/maps/search/?api=1&query=十六份人文茶館" },
  { category:"交通", name:"自駕：台 3 線北段", county:"桃園市／新竹縣", area:"龍潭－關西－竹東", type:"自駕", intro:"沿台 3 線串聯客庄聚落，適合跨區景點彈性停留。", recommendation:"自行規劃導航與停車", note:"假日注意山城車流", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"交通", name:"自駕：台 3 線中段", county:"新竹縣／苗栗縣", area:"北埔－峨眉－三灣－獅潭", type:"自駕", intro:"以台 3 線為主軸，適合老街、湖景與古道主題旅行。", recommendation:"景點間多需短程支線轉入", note:"山區道路請留意天候", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"交通", name:"自駕：台 3 線南段", county:"苗栗縣／臺中市", area:"大湖－卓蘭－東勢－石岡", type:"自駕", intro:"可串聯草莓產區、客庄文化與大甲溪周邊景觀。", recommendation:"跨縣市可規劃一至兩日", note:"勿以景點名稱取代導航地址", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
  { category:"交通", name:"台灣好行 5700 獅山線", county:"新竹縣", area:"高鐵新竹站／竹北－北埔方向", type:"觀光公車", intro:"串聯新竹高鐵與獅頭山周邊觀光據點，適合不開車遊客。", recommendation:"先查站牌與最新班次", note:"路線停靠及班次可能調整", source:"https://www.taiwantrip.com.tw/Frontend" },
  { category:"交通", name:"台灣好行 5805A 南庄線", county:"苗栗縣", area:"臺鐵竹南站－南庄遊客中心", type:"觀光公車", intro:"從竹南車站前往三灣、南庄周邊觀光景點。", recommendation:"於竹南站轉乘", note:"依官方時刻表確認末班車", source:"https://www.taiwantrip.com.tw/Frontend/Route/Select_p?RouteID=R0004" },
  { category:"交通", name:"臺鐵內灣線", county:"新竹縣", area:"竹中－內灣", type:"鐵路", intro:"搭乘支線鐵路抵達內灣，適合鐵道與老街一日遊。", recommendation:"由新竹／六家方向確認轉乘", note:"非所有列車直達內灣", source:"https://www.railway.gov.tw/" },
  { category:"交通", name:"高鐵新竹站轉乘", county:"新竹縣", area:"高鐵新竹站－北埔／獅山周邊", type:"高鐵＋公車", intro:"適合外縣市旅客先搭高鐵，再銜接觀光公車。", recommendation:"轉乘獅山線等交通服務", note:"確認接駁站位與班次", source:"https://www.thsrc.com.tw/" },
  { category:"交通", name:"臺鐵竹南站轉乘", county:"苗栗縣", area:"竹南－南庄", type:"臺鐵＋公車", intro:"由西部幹線轉乘南庄線，適合無車族前往南庄。", recommendation:"竹南站東出口附近轉乘", note:"轉乘時間須留緩衝", source:"https://www.taiwantrip.com.tw/Frontend/Route/Select_p?RouteID=R0004" },
  { category:"交通", name:"臺鐵豐原站轉乘", county:"臺中市", area:"豐原－石岡／東勢", type:"臺鐵＋市區公車", intro:"由豐原轉乘臺中市公車，前往石岡及東勢周邊。", recommendation:"查詢臺中市公車即時資訊", note:"依實際路線與班次安排", source:"https://citybus.taichung.gov.tw/" },
  { category:"交通", name:"自行車：東豐自行車綠廊", county:"臺中市", area:"石岡－東勢", type:"自行車", intro:"利用舊鐵道廊道欣賞山城風景，適合低碳慢遊。", recommendation:"可於周邊租借自行車", note:"自行車道非台 3 線公路本線", source:"https://romantichakka.hakka.gov.tw/zh-TW" },
];

export const databaseUpdatedAt = "2026-11-19";

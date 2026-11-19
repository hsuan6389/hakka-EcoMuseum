"use client";

import { FormEvent, useMemo, useState } from "react";
import { databaseUpdatedAt, travelData } from "./travelData";

type Message = { role: "user" | "assistant"; text: string; source?: string; sourceUrl?: string };

const places = [
  { name: "北埔老街", area: "新竹北埔", theme: "聚落文化", time: "90 分鐘", image: "images/beipu-watercolor.png", note: "走入街屋、古蹟與擂茶日常。" },
  { name: "峨眉湖畔", area: "新竹峨眉", theme: "自然地景", time: "60 分鐘", image: "images/alley-watercolor.png", note: "從水岸看見山林與聚落共生。" },
  { name: "樟之細路", area: "桃竹苗", theme: "歷史步道", time: "半日", image: "images/alley-watercolor.png", note: "沿古道讀懂樟腦產業與移動記憶。" },
];

const quickQuestions = ["附近有什麼？", "幫我安排半日遊", "適合親子嗎？", "有哪些無障礙景點？"];

function answerFor(question: string) {
  const q = question.replace(/\s/g, "");
  const locations = ["北埔", "內灣", "橫山", "峨眉", "獅頭山", "南庄", "獅潭", "鳴鳳", "大湖", "東勢", "石岡", "三灣", "三義", "龍潭", "關西", "竹東", "新竹", "苗栗", "臺中", "台中", "竹南", "豐原"];
  const location = locations.find((item) => q.includes(item));
  const wantedCategory = /吃|美食|餐廳|午餐|晚餐|料理|茶館|麵|菜/.test(q) ? "美食" : /交通|怎麼去|公車|火車|高鐵|臺鐵|台鐵|自駕|自行車|轉乘/.test(q) ? "交通" : /景點|去哪|附近|老街|步道|湖|文化|展館/.test(q) ? "景點" : undefined;

  if (/無障礙/.test(q)) return {
    text: "目前資料庫沒有足以確認無障礙動線的欄位，因此我不會直接判定。建議先選定景點，我可以提供官方資料來源，再請你向場館確認坡度、門檻、無障礙廁所與停車位。",
    source: `台三線旅遊資料庫 · 無障礙資料待補 · ${databaseUpdatedAt} 整理`,
  };

  if (/半日|半天/.test(q)) {
    const beipu = travelData.find((item) => item.name === "北埔老街")!;
    const food = travelData.find((item) => item.name === "北埔登富茶坊")!;
    const lake = travelData.find((item) => item.name === "峨眉湖")!;
    return {
      text: `半日可安排：① ${beipu.name}，${beipu.recommendation}；② ${food.name}，${food.recommendation}；③ ${lake.name}，${lake.recommendation}。北埔到峨眉適合自駕，景點間多需由短程支線轉入。`,
      source: `台三線旅遊資料庫 · 景點、美食、交通共 4 筆 · ${databaseUpdatedAt} 整理`,
      sourceUrl: beipu.source,
    };
  }

  if (/親子/.test(q)) return {
    text: "親子行程可先選北埔老街，認識傳統街屋、廟宇與茶文化，再到大湖酒莊與草莓文化館認識農產加工。若安排戶外活動，可加入峨眉湖散步；出發前請確認天氣與現場開放情況。",
    source: `台三線旅遊資料庫 · 景點 3 筆 · ${databaseUpdatedAt} 整理`,
    sourceUrl: travelData[0].source,
  };

  const nameMatch = travelData.find((item) => q.includes(item.name.replace(/\s/g, "")) || item.name.replace(/[：／\s]/g, "").includes(q));
  if (nameMatch) return {
    text: `${nameMatch.name}位於${nameMatch.county}${nameMatch.area}，屬於${nameMatch.type}。${nameMatch.intro}${nameMatch.recommendation}。提醒：${nameMatch.note}。`,
    source: `台三線旅遊資料庫 · ${nameMatch.category} · ${databaseUpdatedAt} 整理`,
    sourceUrl: nameMatch.source,
  };

  let matches = travelData.filter((item) => (!location || `${item.name}${item.county}${item.area}`.includes(location)) && (!wantedCategory || item.category === wantedCategory));
  if (!matches.length && location) matches = travelData.filter((item) => `${item.name}${item.county}${item.area}`.includes(location));
  if (!matches.length && wantedCategory) matches = travelData.filter((item) => item.category === wantedCategory);
  if (matches.length) {
    const selected = matches.slice(0, 3);
    return {
      text: `${location ? `${location}相關資訊如下：` : "可以先從這幾個選擇開始："}${selected.map((item, index) => `${["①", "②", "③"][index]} ${item.name}：${item.intro}${item.recommendation}。`).join(" ")}`,
      source: `台三線旅遊資料庫 · ${selected.length} 筆資料 · ${databaseUpdatedAt} 整理`,
      sourceUrl: selected[0].source,
    };
  }

  return {
    text: "你可以問我台三線沿線的景點、美食與交通。也可以直接告訴我地點，例如「北埔有什麼好吃的？」或「怎麼搭車去南庄？」",
    source: `台三線旅遊資料庫 · 共 30 筆 · ${databaseUpdatedAt} 整理`,
  };
}

export default function Home() {
  const [view, setView] = useState<"map" | "list">("map");
  const [activeFilter, setActiveFilter] = useState("全部");
  const [liked, setLiked] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "你好，我是台三線文化旅伴。想從哪一段旅程開始？", source: "系統導覽設定 · 今日更新" },
  ]);
  const [tripLength, setTripLength] = useState("半日");
  const [tripStyle, setTripStyle] = useState("文化慢遊");

  const itinerary = useMemo(() => tripLength === "一日"
    ? ["北埔老街", "擂茶午食", "峨眉湖畔", "南庄老街"]
    : ["北埔老街", "擂茶午食", "峨眉湖畔"], [tripLength]);

  function ask(question: string) {
    const clean = question.trim();
    if (!clean) return;
    const answer = answerFor(clean);
    setMessages((current) => [...current, { role: "user", text: clean }, { role: "assistant", ...answer }]);
    setInput("");
    setChatOpen(true);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="回到首頁">
          <span className="brand-mark">三</span>
          <span>台三線<br /><small>文化問路所</small></span>
        </a>
        <nav aria-label="主要導覽">
          <a href="#explore">探索生態博物館</a>
          <a href="#planner">智慧行程規劃</a>
          <a href="#guide">AI 文化導覽</a>
          <a href="#about">關於我</a>
        </nav>
        <button className="nav-ask" onClick={() => setChatOpen(true)}>來問我 <span>↗</span></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span>ROUTE 3</span> 客庄文化旅行</p>
          <h1>沿著台三線，<br />問路，也問故事。</h1>
          <p className="hero-lead">從一個問題出發，遇見山城、聚落與客家生活。<br />讓 AI 成為你的文化旅伴，而不是答案的終點。</p>
          <button className="primary-button" onClick={() => setChatOpen(true)}>來問我 <span>開始對話</span></button>
          <div className="hero-index"><b>01</b><i></i><span>北埔—峨眉<br />文化慢遊提案</span></div>
        </div>
        <div className="hero-collage" aria-label="北埔客庄風景拼貼">
          <div className="organic orange-shape"><span>HAKKA</span></div>
          <figure className="hero-photo-main"><img src="images/beipu-watercolor.png" alt="水彩繪製的北埔老街傳統街屋" /></figure>
          <figure className="hero-photo-side"><img src="images/alley-watercolor.png" alt="水彩繪製的北埔石板巷與傳統建築" /></figure>
          <div className="route-stamp">台 3<br /><small>內山公路</small></div>
          <p className="vertical-note">山・城・人・生活</p>
        </div>
        <div className="scroll-note">SCROLL TO EXPLORE <span>↓</span></div>
      </section>

      <section className="intro" id="about">
        <div className="section-number">01</div>
        <p className="kicker">ABOUT THE PROJECT</p>
        <h2>整條台三線，<br />都是一座沒有圍牆的博物館。</h2>
        <div className="intro-grid">
          <p>生態博物館不只收藏物件，也收藏地方的生活方式。這套系統連結館舍資料、地方故事與旅人提問，讓每一次移動，都能讀懂眼前的土地。</p>
          <div className="principles">
            <span>01<br /><b>地方知識</b></span>
            <span>02<br /><b>可信來源</b></span>
            <span>03<br /><b>共創記憶</b></span>
          </div>
        </div>
      </section>

      <section className="explore" id="explore">
        <div className="section-heading">
          <div><p className="kicker">DISCOVER PLACES</p><h2>探索生態博物館</h2></div>
          <p>依照你此刻的時間與興趣，<br />找到下一個值得停留的地方。</p>
        </div>
        <div className="filter-row" role="group" aria-label="景點篩選">
          {["全部", "聚落文化", "自然地景", "歷史步道", "無障礙"].map((item) => <button key={item} className={activeFilter === item ? "active" : ""} onClick={() => setActiveFilter(item)}>{item}</button>)}
          <div className="view-toggle"><button className={view === "map" ? "active" : ""} onClick={() => setView("map")}>地圖</button><button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>清單</button></div>
        </div>

        <div className={`explore-stage ${view}`}>
          <div className="map-panel" aria-label="台三線景點示意地圖">
            <div className="map-route"></div>
            <div className="map-label label-one">桃園・龍潭</div><div className="map-label label-two">新竹・北埔</div><div className="map-label label-three">苗栗・南庄</div>
            <button className="map-pin pin-one" aria-label="龍潭景點">1</button><button className="map-pin pin-two selected" aria-label="北埔景點">3</button><button className="map-pin pin-three" aria-label="南庄景點">2</button>
            <div className="map-compass">N<br />↑</div>
          </div>
          <div className="place-list">
            {places.filter((place) => activeFilter === "全部" || activeFilter === "無障礙" || place.theme === activeFilter).map((place, index) => (
              <article className="place-card" key={place.name}>
                <div className="place-image"><img src={place.image} alt="" /><span>0{index + 1}</span></div>
                <div className="place-copy"><p>{place.area} · {place.theme}</p><h3>{place.name}</h3><p>{place.note}</p><div className="place-meta"><span>約 {place.time}</span><span>資料已查證</span></div></div>
                <button className={liked.includes(place.name) ? "heart liked" : "heart"} onClick={() => setLiked((items) => items.includes(place.name) ? items.filter((item) => item !== place.name) : [...items, place.name])} aria-label={`收藏${place.name}`}>♡</button>
              </article>
            ))}
          </div>
        </div>
        <div className="source-note"><span>●</span> 景點資訊整合地方館舍與公開資料　·　最後更新 2026.11</div>
      </section>

      <section className="guide" id="guide">
        <div className="guide-copy">
          <p className="kicker light">ASK YOUR CULTURAL COMPANION</p>
          <h2>你問的，<br />不只是路。</h2>
          <p>問交通、問故事、問一段適合你的旅程。每個回答都附上資料來源與更新日期，讓你知道答案從哪裡來。</p>
          <div className="quick-list">
            {quickQuestions.map((question) => <button key={question} onClick={() => ask(question)}><span>↗</span>{question}</button>)}
          </div>
        </div>
        <div className="chat-demo">
          <div className="chat-top"><span><i></i> AI 文化導覽</span><small>資料庫連線中</small></div>
          <div className="chat-body">
            <div className="bubble user-bubble">我有半天，帶著小孩，想認識北埔。</div>
            <div className="avatar">三</div>
            <div className="bubble ai-bubble">可以從老街的生活故事開始，再一起動手做擂茶。步行距離不長，也容易安排休息。<div className="answer-card"><img src="images/beipu-watercolor.png" alt="水彩繪製的北埔老街" /><span><small>第一站 · 09:30</small><b>北埔老街</b><em>停留 90 分鐘　↗</em></span></div><small className="citation">來源 3 筆　·　信心度高　·　2026.11 更新</small></div>
          </div>
          <div className="chat-input-fake">繼續問這段旅程… <button onClick={() => setChatOpen(true)}>↑</button></div>
          <div className="helpful">這個回答有幫助嗎？　<button>有</button><button>需要改進</button></div>
        </div>
      </section>

      <section className="planner" id="planner">
        <div className="planner-heading"><p className="kicker">MAKE IT YOUR JOURNEY</p><h2>把一條路，<br />排成你的樣子。</h2></div>
        <div className="planner-workspace">
          <div className="planner-form">
            <label>旅行時間</label><div className="choice-row">{["半日", "一日"].map((item) => <button className={tripLength === item ? "active" : ""} onClick={() => setTripLength(item)} key={item}>{item}</button>)}</div>
            <label>同行者</label><div className="choice-row"><button className="active">自己</button><button>親子</button><button>長輩</button><button>朋友</button></div>
            <label>旅行偏好</label><div className="choice-row">{["文化慢遊", "自然散步", "在地飲食"].map((item) => <button className={tripStyle === item ? "active" : ""} onClick={() => setTripStyle(item)} key={item}>{item}</button>)}</div>
            <button className="generate-button">重新產生路線 <span>↗</span></button>
          </div>
          <div className="itinerary">
            <div className="itinerary-head"><div><small>YOUR ROUTE · {tripLength}</small><h3>{tripStyle}提案</h3></div><button>分享　↗</button></div>
            <div className="timeline">
              {itinerary.map((place, index) => <div className="timeline-item" key={place}><span className="drag">⋮⋮</span><b>{index === 0 ? "09:30" : index === 1 ? "11:10" : index === 2 ? "13:00" : "15:00"}</b><div><h4>{place}</h4><p>{index === 0 ? "從聚落生活讀懂客家文化" : index === 1 ? "動手做，也把味道留在記憶裡" : index === 2 ? "用一段水岸散步結束旅程" : "走進山城的午後日常"}</p></div><button aria-label={`移除${place}`}>×</button></div>)}
            </div>
            <div className="route-summary"><span>總長 <b>{tripLength === "一日" ? "7 小時" : "4 小時"}</b></span><span>移動 <b>{tripLength === "一日" ? "68 分鐘" : "24 分鐘"}</b></span><button onClick={() => ask("請告訴我這段行程的更多細節")}>帶回對話繼續問　→</button></div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="closing-shape"></div>
        <p className="kicker">START WITH A QUESTION</p>
        <h2>下一段故事，<br />從你的問題開始。</h2>
        <p>想去哪裡？有多少時間？需要怎樣的旅行節奏？<br />不用知道標準問法，像問一位在地朋友那樣就好。</p>
        <button className="primary-button dark" onClick={() => setChatOpen(true)}>來問我 <span>開始對話</span></button>
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark">三</span><span>台三線<br /><small>文化問路所</small></span></div><p>Human-Centered AI for EcoMuseum Experience Enhancement<br /><a href="https://www.trimt-nsa.gov.tw/ja/tour/111/" target="_blank" rel="noreferrer">影像：參山國家風景區</a>　·　<a href="https://www.travelking.com.tw/tourguide/scenery101712.html" target="_blank" rel="noreferrer">TravelKing</a></p><p>計畫成果展示 · Prototype 2026</p></footer>

      <button className="floating-ask" onClick={() => setChatOpen(true)} aria-label="開啟 AI 文化導覽"><span>問</span><small>來問我</small></button>

      {chatOpen && <div className="chat-overlay" role="dialog" aria-modal="true" aria-label="來問我">
        <button className="chat-backdrop" onClick={() => setChatOpen(false)} aria-label="關閉對話"></button>
        <div className="chat-drawer">
          <div className="drawer-head"><div><p>AI CULTURAL GUIDE</p><h2>來問我</h2></div><button onClick={() => setChatOpen(false)} aria-label="關閉">×</button></div>
          <div className="drawer-messages">
            {messages.map((message, index) => <div className={`drawer-message ${message.role}`} key={index}><span>{message.role === "assistant" ? "三" : "你"}</span><div><p>{message.text}</p>{message.source && <small>{message.sourceUrl ? <a href={message.sourceUrl} target="_blank" rel="noreferrer">{message.source}　↗</a> : message.source}</small>}</div></div>)}
          </div>
          <div className="drawer-quick">{quickQuestions.map((question) => <button key={question} onClick={() => ask(question)}>{question}</button>)}</div>
          <form className="drawer-form" onSubmit={submit}><label htmlFor="chat-question">繼續問這段旅程</label><div><input id="chat-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="例如：下雨天也適合嗎？" autoFocus /><button type="submit">↑</button></div><small>AI 回答可能不完整，重要資訊請以場館公告為準。</small></form>
        </div>
      </div>}
    </main>
  );
}

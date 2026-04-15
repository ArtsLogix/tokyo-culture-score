import { useState, useMemo } from "react";

// ============================================================
// 16 AREA DATA
// ============================================================
const RAW_DATA = {
  // ── 開発系 ────────────────────────────────────────────────
  "渋谷・神宮前": {
    type:"開発系",
    食文化:           {創造:7.5,場:9.0,浸透:9.2},
    芸術文化:         {創造:6.5,場:8.0,浸透:7.0},
    音楽舞台:         {創造:7.0,場:9.0,浸透:8.5},
    ファッション:     {創造:9.0,場:9.5,浸透:9.5},
    知的文化:         {創造:6.0,場:7.5,浸透:6.5},
    クラフトデザイン: {創造:6.5,場:7.5,浸透:6.8},
    家賃指数:9.5, 個人店比率:0.38,
    desc:"ファッション発信力は圧倒的。再開発で「場」が巨大化する一方、個人店の消滅が加速中。",
    highlight:"ファッション創造・場が全16エリア中最高値",
  },
  "麻布台・六本木": {
    type:"開発系",
    食文化:           {創造:6.5,場:9.0,浸透:8.5},
    芸術文化:         {創造:7.0,場:9.5,浸透:7.0},
    音楽舞台:         {創造:5.0,場:8.0,浸透:6.0},
    ファッション:     {創造:6.0,場:8.5,浸透:8.0},
    知的文化:         {創造:6.5,場:8.5,浸透:6.5},
    クラフトデザイン: {創造:4.0,場:7.0,浸透:5.0},
    家賃指数:9.8, 個人店比率:0.28,
    desc:"森美術館・麻布台ヒルズで「場」は最高水準。しかし個人店比率0.28が創造の循環を断絶。",
    highlight:"芸術の「場」9.5は全エリアトップ。だが個人店比率は最低",
  },
  "虎ノ門・新橋": {
    type:"開発系",
    食文化:           {創造:5.0,場:7.5,浸透:7.8},
    芸術文化:         {創造:3.5,場:5.5,浸透:4.0},
    音楽舞台:         {創造:3.0,場:5.0,浸透:4.0},
    ファッション:     {創造:4.0,場:5.5,浸透:5.5},
    知的文化:         {創造:5.5,場:7.0,浸透:6.5},
    クラフトデザイン: {創造:3.0,場:4.5,浸透:3.5},
    家賃指数:9.2, 個人店比率:0.32,
    desc:"スタートアップ集積・虎ノ門ヒルズで知的文化の「場」は育ちつつあるが、文化の厚みはまだ浅い。",
    highlight:"全ジャンルで創造スコアが最低水準。ビジネス特化エリアの限界",
  },
  "池袋・東池袋": {
    type:"開発系",
    食文化:           {創造:7.0,場:8.0,浸透:8.5},
    芸術文化:         {創造:6.5,場:7.5,浸透:6.5},
    音楽舞台:         {創造:6.0,場:7.5,浸透:6.5},
    ファッション:     {創造:5.5,場:7.0,浸透:7.0},
    知的文化:         {創造:7.0,場:7.5,浸透:7.0},
    クラフトデザイン: {創造:5.5,場:6.0,浸透:5.5},
    家賃指数:7.2, 個人店比率:0.55,
    desc:"アニメ・マンガ聖地と東アジア文化が融合。ハレザ池袋など再開発で知的・芸術の場が急拡大。",
    highlight:"多文化共存による多様性スコアが開発系エリアで最高",
  },
  "中目黒": {
    type:"開発系",
    食文化:           {創造:7.0,場:8.5,浸透:8.8},
    芸術文化:         {創造:6.0,場:7.0,浸透:6.5},
    音楽舞台:         {創造:4.5,場:5.5,浸透:5.0},
    ファッション:     {創造:8.0,場:8.5,浸透:9.0},
    知的文化:         {創造:5.5,場:6.0,浸透:6.0},
    クラフトデザイン: {創造:6.5,場:7.0,浸透:7.0},
    家賃指数:8.5, 個人店比率:0.52,
    desc:"目黒川沿いの消費空間。高い家賃と低い個人店比率が文化の持続性に影を落とす。",
    highlight:"ファッション浸透度9.0は全エリア屈指。ただし持続性は下位",
  },

  // ── 成熟系 ────────────────────────────────────────────────
  "蔵前": {
    type:"成熟系",
    食文化:           {創造:8.2,場:7.0,浸透:7.5},
    芸術文化:         {創造:8.8,場:7.5,浸透:6.5},
    音楽舞台:         {創造:4.5,場:4.0,浸透:3.5},
    ファッション:     {創造:7.0,場:6.0,浸透:5.5},
    知的文化:         {創造:7.5,場:6.5,浸透:6.0},
    クラフトデザイン: {創造:9.5,場:8.5,浸透:8.0},
    家賃指数:6.2, 個人店比率:0.82,
    desc:"隅田川沿いに工房とギャラリーが集積。独立クリエイターの密度が都内最高水準。",
    highlight:"クラフト・デザイン創造スコア9.5は全エリア最高値",
  },
  "三軒茶屋": {
    type:"成熟系",
    食文化:           {創造:8.0,場:8.5,浸透:9.0},
    芸術文化:         {創造:6.5,場:7.0,浸透:6.0},
    音楽舞台:         {創造:8.5,場:9.0,浸透:8.0},
    ファッション:     {創造:6.0,場:5.5,浸透:6.5},
    知的文化:         {創造:6.0,場:6.5,浸透:6.0},
    クラフトデザイン: {創造:5.5,場:5.0,浸透:5.5},
    家賃指数:6.8, 個人店比率:0.68,
    desc:"キャロットタワーとライブハウス群。夜の音楽シーンと昼の個人飲食が共存する二面性。",
    highlight:"音楽の「場」スコア9.0は下北沢に次ぐ全エリア2位",
  },
  "学芸大学": {
    type:"成熟系",
    食文化:           {創造:8.5,場:8.0,浸透:8.8},
    芸術文化:         {創造:6.0,場:5.5,浸透:5.5},
    音楽舞台:         {創造:5.0,場:5.5,浸透:5.0},
    ファッション:     {創造:6.5,場:6.0,浸透:7.0},
    知的文化:         {創造:7.0,場:6.5,浸透:7.0},
    クラフトデザイン: {創造:6.0,場:5.5,浸透:6.0},
    家賃指数:7.0, 個人店比率:0.72,
    desc:"商店街に独立系カフェ・パン屋が密集。静かに深い食文化が根付く住宅街型文化圏。",
    highlight:"食文化の浸透スコア8.8。生活に溶け込む食文化の深さ",
  },
  "吉祥寺": {
    type:"成熟系",
    食文化:           {創造:8.0,場:8.5,浸透:9.0},
    芸術文化:         {創造:7.0,場:7.0,浸透:6.5},
    音楽舞台:         {創造:7.5,場:8.0,浸透:7.5},
    ファッション:     {創造:7.5,場:7.5,浸透:8.0},
    知的文化:         {創造:7.5,場:7.0,浸透:7.5},
    クラフトデザイン: {創造:6.5,場:6.5,浸透:6.5},
    家賃指数:7.5, 個人店比率:0.62,
    desc:"井の頭公園を核に音楽・食・知的文化がバランス良く共存。全方位に文化が開いた街。",
    highlight:"6ジャンルの分散が最も小さく多様性スコアが全エリアトップ",
  },

  // ── サブカル系 ────────────────────────────────────────────
  "下北沢": {
    type:"サブカル系",
    食文化:           {創造:7.5,場:8.0,浸透:8.5},
    芸術文化:         {創造:7.0,場:7.5,浸透:6.5},
    音楽舞台:         {創造:9.5,場:9.8,浸透:9.0},
    ファッション:     {創造:8.5,場:8.0,浸透:8.5},
    知的文化:         {創造:6.5,場:7.0,浸透:6.5},
    クラフトデザイン: {創造:6.5,場:6.0,浸透:6.5},
    家賃指数:5.8, 個人店比率:0.78,
    desc:"ライブハウス20軒超・古着屋密集。再開発後も個人店文化が残存する稀有な音楽聖地。",
    highlight:"音楽舞台の創造9.5・場9.8は両軸ともに全エリア最高",
  },
  "高円寺": {
    type:"サブカル系",
    食文化:           {創造:7.8,場:7.5,浸透:8.0},
    芸術文化:         {創造:7.5,場:7.0,浸透:6.5},
    音楽舞台:         {創造:8.5,場:8.5,浸透:7.5},
    ファッション:     {創造:8.8,場:8.0,浸透:8.0},
    知的文化:         {創造:7.0,場:6.5,浸透:6.5},
    クラフトデザイン: {創造:7.0,場:6.5,浸透:6.5},
    家賃指数:4.5, 個人店比率:0.85,
    desc:"低家賃×高個人店比率という稀有な土壌。阿波踊りと音楽とパンクが混在する多様性の街。",
    highlight:"持続性スコアが全サブカル系エリアで最高。文化の自律循環が健全",
  },

  // ── ローカル系 ────────────────────────────────────────────
  "西荻窪": {
    type:"ローカル系",
    食文化:           {創造:8.0,場:7.5,浸透:8.0},
    芸術文化:         {創造:7.5,場:7.0,浸透:6.5},
    音楽舞台:         {創造:6.5,場:7.0,浸透:6.0},
    ファッション:     {創造:7.5,場:7.0,浸透:7.0},
    知的文化:         {創造:8.5,場:7.5,浸透:7.5},
    クラフトデザイン: {創造:7.5,場:7.0,浸透:7.0},
    家賃指数:4.8, 個人店比率:0.88,
    desc:"古書店・古道具屋・クラフト店が密集。低家賃が守る「発掘の街」。知的文化密度は都内随一。",
    highlight:"持続性スコアが全16エリア中1位。個人店比率0.88×低家賃の理想形",
  },
  "荻窪": {
    type:"ローカル系",
    食文化:           {創造:7.5,場:7.0,浸透:7.8},
    芸術文化:         {創造:6.0,場:5.5,浸透:5.5},
    音楽舞台:         {創造:6.5,場:6.5,浸透:6.0},
    ファッション:     {創造:5.5,場:5.5,浸透:5.8},
    知的文化:         {創造:7.0,場:6.5,浸透:6.5},
    クラフトデザイン: {創造:6.0,場:5.5,浸透:5.8},
    家賃指数:5.2, 個人店比率:0.78,
    desc:"老舗ジャズ喫茶が象徴する音楽の素養。ロータリー周辺の食の充実と落ち着いた文化圏。",
    highlight:"ジャズ喫茶の聖地として音楽浸透の下地が深い",
  },
  "阿佐ヶ谷": {
    type:"ローカル系",
    食文化:           {創造:7.5,場:7.0,浸透:7.5},
    芸術文化:         {創造:6.5,場:6.5,浸透:6.0},
    音楽舞台:         {創造:7.0,場:7.5,浸透:6.5},
    ファッション:     {創造:6.5,場:6.0,浸透:6.5},
    知的文化:         {創造:7.0,場:6.5,浸透:6.5},
    クラフトデザイン: {創造:6.5,場:6.0,浸透:6.0},
    家賃指数:4.2, 個人店比率:0.80,
    desc:"阿佐ヶ谷ジャズストリートが象徴する音楽文化。静かで地に足ついたローカル文化圏。",
    highlight:"家賃指数4.2は全エリア最低。文化の持続環境として最も安定",
  },
  "鶯谷・入谷": {
    type:"ローカル系",
    食文化:           {創造:6.5,場:6.0,浸透:6.5},
    芸術文化:         {創造:5.5,場:5.5,浸透:5.0},
    音楽舞台:         {創造:6.0,場:6.5,浸透:5.5},
    ファッション:     {創造:5.0,場:5.0,浸透:5.0},
    知的文化:         {創造:6.0,場:5.5,浸透:5.5},
    クラフトデザイン: {創造:5.5,場:5.0,浸透:5.0},
    家賃指数:5.5, 個人店比率:0.75,
    desc:"上野・蔵前に挟まれた静かな文化圏。下町情緒と路地裏の個人店が独自の空気感を生む。",
    highlight:"上野アーツの波及と蔵前クリエイター層の流入で徐々に変容中",
  },
  "小岩・江戸川": {
    type:"ローカル系",
    食文化:           {創造:7.0,場:6.5,浸透:7.5},
    芸術文化:         {創造:4.5,場:4.5,浸透:4.0},
    音楽舞台:         {創造:5.5,場:5.5,浸透:5.0},
    ファッション:     {創造:4.5,場:4.5,浸透:4.8},
    知的文化:         {創造:5.0,場:4.8,浸透:5.0},
    クラフトデザイン: {創造:4.8,場:4.5,浸透:4.5},
    家賃指数:4.0, 個人店比率:0.82,
    desc:"都内最安値圏の家賃に支えられた食文化の厚み。多国籍コミュニティが独自の食文化を生む。",
    highlight:"多国籍食文化の浸透スコアが突出。アジア系料理の密度は都内屈指",
  },
};

const GENRES = ["食文化","芸術文化","音楽舞台","ファッション","知的文化","クラフトデザイン"];
const AREAS  = Object.keys(RAW_DATA);

const TYPE_META = {
  開発系:    {color:"#E06855", bg:"rgba(224,104,85,0.1)"},
  成熟系:    {color:"#5BA3D9", bg:"rgba(91,163,217,0.1)"},
  サブカル系:{color:"#A06CD8", bg:"rgba(160,108,216,0.1)"},
  ローカル系:{color:"#55B87A", bg:"rgba(85,184,122,0.1)"},
};

const GENRE_COLORS = {
  食文化:           "#E8956D",
  芸術文化:         "#7BAE97",
  音楽舞台:         "#9080C8",
  ファッション:     "#D4906A",
  知的文化:         "#6896C0",
  クラフトデザイン: "#C0A855",
};

const GENRE_SHORT = {食文化:"食",芸術文化:"芸",音楽舞台:"音",ファッション:"服",知的文化:"知",クラフトデザイン:"工"};

// ── Scoring ────────────────────────────────────────────────
function score(d, gw, aw) {
  const gs = {};
  GENRES.forEach(g => { gs[g] = d[g].創造*aw.創造 + d[g].場*aw.場 + d[g].浸透*aw.浸透; });
  const vals = GENRES.map(g => gs[g]);
  const tw   = GENRES.reduce((s,g) => s + gw[g], 0);
  const base = vals.reduce((s,v,i) => s + v*(gw[GENRES[i]]/tw), 0);
  const mean = vals.reduce((a,b)=>a+b,0)/vals.length;
  const vari = vals.reduce((a,v)=>a+(v-mean)**2,0)/vals.length;
  const div  = Math.max(0, 10 - vari*3);
  const sus  = Math.min(10, d.個人店比率*(1-d.家賃指数/10*0.5)*10);
  return { final:Math.min(10,base*0.7+div*0.15+sus*0.15), base, div, sus, gs };
}

// ── Mini Radar ─────────────────────────────────────────────
function Radar({ gs, size=110 }) {
  const n=6, cx=size/2, cy=size/2, r=size*0.35;
  const a = i => -Math.PI/2 + i*(2*Math.PI/n);
  const pt = (i,v) => [cx+v/10*r*Math.cos(a(i)), cy+v/10*r*Math.sin(a(i))];
  const gpt= (i,v) => [cx+v*r*Math.cos(a(i)), cy+v*r*Math.sin(a(i))];
  const poly = lv => Array.from({length:n},(_,i)=>gpt(i,lv).join(",")).join(" ");
  const path = GENRES.map((g,i)=>{ const [x,y]=pt(i,gs[g]); return `${i===0?"M":"L"}${x},${y}`; }).join("")+"Z";
  return (
    <svg width={size} height={size} style={{overflow:"visible"}}>
      {[0.4,0.7,1].map(l=><polygon key={l} points={poly(l)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>)}
      {Array.from({length:n},(_,i)=>{ const [x,y]=gpt(i,1); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>; })}
      <path d={path} fill="rgba(232,200,100,0.13)" stroke="#E8C864" strokeWidth="1.5" strokeLinejoin="round"/>
      {GENRES.map((g,i)=>{ const [x,y]=pt(i,gs[g]); return <circle key={g} cx={x} cy={y} r="2.5" fill={GENRE_COLORS[g]} stroke="#080808" strokeWidth="1"/>; })}
    </svg>
  );
}

// ── Type Badge ─────────────────────────────────────────────
function Badge({ type, small }) {
  const m = TYPE_META[type]||{};
  return (
    <span style={{
      fontSize:small?"8px":"9px", fontWeight:"700", letterSpacing:"0.05em",
      color:m.color, border:`1px solid ${m.color}50`, borderRadius:"4px",
      padding:small?"1px 5px":"2px 7px", whiteSpace:"nowrap",
      fontFamily:"'Noto Sans JP',sans-serif", flexShrink:0,
    }}>{type}</span>
  );
}

// ── Area Card ──────────────────────────────────────────────
function Card({ area, res, rank, sel, onClick }) {
  const d = RAW_DATA[area];
  const top  = GENRES.reduce((a,b)=>res.gs[a]>res.gs[b]?a:b);
  const weak = GENRES.reduce((a,b)=>res.gs[a]<res.gs[b]?a:b);
  const tm = TYPE_META[d.type]||{};
  const rk  = ["#E8C864","#B8B8B8","#C8854A"];
  return (
    <div onClick={onClick} style={{
      background: sel ? `${tm.color}08` : "rgba(255,255,255,0.018)",
      border:`1px solid ${sel ? `${tm.color}55` : "rgba(255,255,255,0.06)"}`,
      borderRadius:"13px", padding:"16px", cursor:"pointer",
      transition:"border-color 0.2s, background 0.2s",
    }}>
      {/* header */}
      <div style={{display:"flex",gap:"10px",alignItems:"flex-start",marginBottom:"10px"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"3px",flexWrap:"wrap"}}>
            <span style={{fontSize:"15px",fontWeight:"700",color:"#fff",fontFamily:"'Noto Serif JP',serif"}}>{area}</span>
            <Badge type={d.type}/>
            <span style={{marginLeft:"auto",fontSize:"11px",fontWeight:"700",
              color:rank<=3?rk[rank-1]:"rgba(255,255,255,0.2)",fontFamily:"monospace"}}>#{rank}</span>
          </div>
          <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",lineHeight:1.5,fontFamily:"'Noto Sans JP',sans-serif"}}>{d.desc}</div>
        </div>
        <Radar gs={res.gs} size={76}/>
      </div>
      {/* score */}
      <div style={{display:"flex",alignItems:"baseline",gap:"3px",marginBottom:"10px"}}>
        <span style={{fontSize:"34px",fontWeight:"900",color:sel?tm.color:"#fff",
          fontFamily:"monospace",letterSpacing:"-0.03em",transition:"color 0.2s"}}>{res.final.toFixed(2)}</span>
        <span style={{fontSize:"11px",color:"rgba(255,255,255,0.2)"}}>/10</span>
      </div>
      {/* bars */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"4px",marginBottom:"8px"}}>
        {GENRES.map(g=>(
          <div key={g}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}>
              <span style={{fontSize:"7px",color:"rgba(255,255,255,0.28)",fontFamily:"'Noto Sans JP',sans-serif"}}>{GENRE_SHORT[g]}</span>
              <span style={{fontSize:"7px",color:GENRE_COLORS[g],fontFamily:"monospace"}}>{res.gs[g].toFixed(1)}</span>
            </div>
            <div style={{height:"2px",background:"rgba(255,255,255,0.06)",borderRadius:"1px"}}>
              <div style={{height:"100%",width:`${res.gs[g]*10}%`,background:GENRE_COLORS[g],borderRadius:"1px"}}/>
            </div>
          </div>
        ))}
      </div>
      {/* chips */}
      <div style={{display:"flex",gap:"5px"}}>
        <div style={{flex:1,background:`${GENRE_COLORS[top]}15`,borderRadius:"5px",padding:"3px 7px",
          fontSize:"8px",color:GENRE_COLORS[top],fontFamily:"'Noto Sans JP',sans-serif"}}>
          ▲ {top}
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.03)",borderRadius:"5px",padding:"3px 7px",
          fontSize:"8px",color:"rgba(255,255,255,0.3)",fontFamily:"'Noto Sans JP',sans-serif"}}>
          ▽ {weak}
        </div>
      </div>
    </div>
  );
}

// ── Detail ─────────────────────────────────────────────────
function Detail({ area, res }) {
  const d = RAW_DATA[area];
  const tm = TYPE_META[d.type]||{};
  return (
    <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",
      borderRadius:"16px",padding:"26px"}}>
      {/* top */}
      <div style={{display:"flex",flexWrap:"wrap",gap:"20px",alignItems:"flex-start",marginBottom:"22px"}}>
        <div style={{flex:1,minWidth:"200px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px",flexWrap:"wrap"}}>
            <h2 style={{margin:0,fontSize:"26px",fontWeight:"900",color:"#fff",fontFamily:"'Noto Serif JP',serif"}}>{area}</h2>
            <Badge type={d.type}/>
          </div>
          <p style={{margin:"0 0 8px",fontSize:"12px",color:"rgba(255,255,255,0.38)",lineHeight:1.7,fontFamily:"'Noto Sans JP',sans-serif"}}>{d.desc}</p>
          <div style={{fontSize:"10px",color:tm.color,background:`${tm.color}15`,borderRadius:"6px",
            padding:"5px 10px",display:"inline-block",fontFamily:"'Noto Sans JP',sans-serif"}}>
            💡 {d.highlight}
          </div>
        </div>
        {/* score ring group */}
        <div style={{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"}}>
          {[{v:res.base,l:"ベース"},{v:res.div,l:"多様性"},{v:res.sus,l:"持続性"}].map(({v,l})=>{
            const r=28, circ=2*Math.PI*r, dash=(v/10)*circ;
            return (
              <div key={l} style={{textAlign:"center"}}>
                <svg width="68" height="68">
                  <circle cx="34" cy="34" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4"/>
                  <circle cx="34" cy="34" r={r} fill="none" stroke={tm.color} strokeWidth="4"
                    strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round"
                    transform="rotate(-90 34 34)"/>
                  <text x="34" y="35" textAnchor="middle" dominantBaseline="middle"
                    fontSize="13" fontWeight="800" fill="#fff" fontFamily="monospace">{v.toFixed(1)}</text>
                </svg>
                <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",fontFamily:"'Noto Sans JP',sans-serif"}}>{l}</div>
              </div>
            );
          })}
          <div style={{textAlign:"center",marginLeft:"4px"}}>
            <div style={{fontSize:"48px",fontWeight:"900",color:"#E8C864",fontFamily:"monospace",lineHeight:1}}>{res.final.toFixed(2)}</div>
            <div style={{fontSize:"10px",color:"rgba(255,255,255,0.28)",fontFamily:"'Noto Sans JP',sans-serif"}}>総合スコア</div>
          </div>
        </div>
      </div>

      {/* genre grid */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:"8px",marginBottom:"14px"}}>
        {GENRES.map(g=>{
          const gd=d[g], gs=res.gs[g];
          return (
            <div key={g} style={{background:"rgba(255,255,255,0.03)",borderRadius:"10px",
              padding:"13px",borderTop:`3px solid ${GENRE_COLORS[g]}`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"9px"}}>
                <span style={{fontSize:"11px",fontWeight:"700",color:"#fff",fontFamily:"'Noto Sans JP',sans-serif"}}>{g}</span>
                <span style={{fontSize:"14px",fontWeight:"900",color:GENRE_COLORS[g],fontFamily:"monospace"}}>{gs.toFixed(1)}</span>
              </div>
              {["創造","場","浸透"].map((ax,ai)=>(
                <div key={ax} style={{marginBottom:"5px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}>
                    <span style={{fontSize:"8px",color:"rgba(255,255,255,0.3)",fontFamily:"'Noto Sans JP',sans-serif"}}>{ax}</span>
                    <span style={{fontSize:"8px",color:"rgba(255,255,255,0.5)",fontFamily:"monospace"}}>{gd[ax].toFixed(1)}</span>
                  </div>
                  <div style={{height:"2px",background:"rgba(255,255,255,0.06)",borderRadius:"1px"}}>
                    <div style={{height:"100%",width:`${gd[ax]*10}%`,background:GENRE_COLORS[g],
                      opacity:ai===0?1:ai===1?0.65:0.4,borderRadius:"1px"}}/>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* supplementary */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"10px",padding:"14px",display:"flex",gap:"20px"}}>
          {[{l:"家賃指数",v:d.家賃指数.toFixed(1),u:"/10",
             col:d.家賃指数>8?"#E07070":d.家賃指数>6.5?"#E8C864":"#70C870"},
            {l:"個人店比率",v:(d.個人店比率*100).toFixed(0),u:"%",
             col:d.個人店比率>0.7?"#70C870":d.個人店比率>0.5?"#E8C864":"#E07070"}
          ].map(({l,v,u,col})=>(
            <div key={l}>
              <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",marginBottom:"3px",fontFamily:"'Noto Sans JP',sans-serif"}}>{l}</div>
              <div style={{fontSize:"22px",fontWeight:"900",color:col,fontFamily:"monospace"}}>
                {v}<span style={{fontSize:"11px",color:"rgba(255,255,255,0.25)"}}>{u}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:"10px",padding:"14px"}}>
          <div style={{fontSize:"9px",color:"rgba(255,255,255,0.3)",marginBottom:"6px",fontFamily:"'Noto Sans JP',sans-serif"}}>文化の循環診断</div>
          <div style={{fontSize:"11px",color:"rgba(255,255,255,0.55)",lineHeight:1.7,fontFamily:"'Noto Sans JP',sans-serif"}}>
            {d.家賃指数>9&&d.個人店比率<0.4
              ?"⚠ 高家賃・低個人店：場は機能するが創造の循環が断絶。文化消費地化リスク大。"
              :d.家賃指数<5&&d.個人店比率>0.78
              ?"✓ 低家賃×高個人店：文化の自律的循環が最も健全な状態。次世代の蔵前候補。"
              :res.sus<3.5
              ?"△ 持続性に警戒。家賃上昇が続けば個人店が撤退し文化の厚みが失われる可能性。"
              :res.div>7
              ?"→ 多様性が高くバランス型。特定ジャンルへの依存が少なく安定した文化圏。"
              :"→ ジャンル特化型。強いカテゴリを軸に文化圏が形成されている。"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Rank Chart ─────────────────────────────────────────────
function RankChart({ results, areas }) {
  const [metric, setMet] = useState("final");
  const sorted = [...areas].sort((a,b)=>results[b][metric]-results[a][metric]);
  const max = Math.max(...sorted.map(a=>results[a][metric]));
  const mets = [{id:"final",l:"総合"},{id:"base",l:"ベース"},{id:"div",l:"多様性"},{id:"sus",l:"持続性"}];
  return (
    <div>
      <div style={{display:"flex",gap:"5px",marginBottom:"18px",flexWrap:"wrap"}}>
        {mets.map(m=>(
          <button key={m.id} onClick={()=>setMet(m.id)} style={{
            background:metric===m.id?"rgba(232,200,100,0.1)":"transparent",
            border:`1px solid ${metric===m.id?"rgba(232,200,100,0.4)":"rgba(255,255,255,0.07)"}`,
            color:metric===m.id?"#E8C864":"rgba(255,255,255,0.35)",
            padding:"5px 14px",borderRadius:"7px",cursor:"pointer",
            fontSize:"11px",fontFamily:"'Noto Sans JP',sans-serif",transition:"all 0.2s",
          }}>{m.l}</button>
        ))}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
        {sorted.map((area,i)=>{
          const val = results[area][metric];
          const d   = RAW_DATA[area];
          const tm  = TYPE_META[d.type]||{};
          const rk  = i<3?["#E8C864","#C0C0C0","#C8854A"][i]:null;
          return (
            <div key={area} style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <div style={{width:"20px",fontSize:"11px",fontWeight:"700",fontFamily:"monospace",
                textAlign:"center",color:rk||"rgba(255,255,255,0.18)"}}>{i+1}</div>
              <div style={{width:"76px",fontSize:"12px",color:"#fff",fontFamily:"'Noto Serif JP',serif",flexShrink:0}}>{area}</div>
              <Badge type={d.type} small/>
              <div style={{flex:1,height:"9px",background:"rgba(255,255,255,0.05)",borderRadius:"5px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${(val/max)*100}%`,
                  background: rk||`${tm.color}70`,borderRadius:"5px",
                  transition:"width 0.7s cubic-bezier(0.4,0,0.2,1)"}}/>
              </div>
              <div style={{width:"40px",fontSize:"13px",fontWeight:"700",fontFamily:"monospace",
                textAlign:"right",color:rk||tm.color}}>{val.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Scatter ────────────────────────────────────────────────
function Scatter({ results }) {
  const [hov, setHov] = useState(null);
  const W=520,H=340,PL=44,PR=24,PT=20,PB=40;
  const iw=W-PL-PR, ih=H-PT-PB;
  const sx = v => PL+(v/10)*iw;
  const sy = v => PT+ih-(v/10)*ih;
  return (
    <div>
      <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)",marginBottom:"10px",fontFamily:"'Noto Sans JP',sans-serif"}}>
        X軸：持続性スコア ／ Y軸：多様性スコア ／ 円の大きさ：総合スコア
      </div>
      <div style={{overflowX:"auto"}}>
        <svg width={W} height={H} style={{background:"rgba(255,255,255,0.01)",borderRadius:"12px",
          border:"1px solid rgba(255,255,255,0.05)"}}>
          {[2,4,6,8,10].map(v=>(
            <g key={v}>
              <line x1={sx(v)} y1={PT} x2={sx(v)} y2={PT+ih} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3"/>
              <line x1={PL} y1={sy(v)} x2={PL+iw} y2={sy(v)} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,3"/>
              <text x={sx(v)} y={H-8} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.22)" fontFamily="monospace">{v}</text>
              <text x={PL-5} y={sy(v)+4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.22)" fontFamily="monospace">{v}</text>
            </g>
          ))}
          <text x={PL+iw/2} y={H} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif">持続性</text>
          <text x={8} y={PT+ih/2} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)" fontFamily="sans-serif"
            transform={`rotate(-90 8 ${PT+ih/2})`}>多様性</text>
          {AREAS.map(area=>{
            const r=results[area];
            const cx=sx(r.sus), cy=sy(r.div), sr=r.final*2+3;
            const c=TYPE_META[RAW_DATA[area].type]?.color||"#888";
            const isHov=hov===area;
            return (
              <g key={area} onMouseEnter={()=>setHov(area)} onMouseLeave={()=>setHov(null)}
                style={{cursor:"pointer"}}>
                <circle cx={cx} cy={cy} r={sr+(isHov?2:0)} fill={c} fillOpacity={isHov?0.4:0.2}
                  stroke={c} strokeWidth={isHov?2:1.5} style={{transition:"all 0.15s"}}/>
                <text x={cx} y={cy-sr-(isHov?5:3)} textAnchor="middle" fontSize={isHov?10:8}
                  fill={isHov?"#fff":"rgba(255,255,255,0.6)"}
                  fontFamily="'Noto Sans JP',sans-serif" style={{transition:"all 0.15s"}}>{area}</text>
                <text x={cx} y={cy+4} textAnchor="middle" fontSize="8" fill={c} fontFamily="monospace">{r.final.toFixed(1)}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{marginTop:"14px",padding:"13px",background:"rgba(255,255,255,0.02)",
        borderRadius:"10px",fontSize:"10px",color:"rgba(255,255,255,0.4)",
        lineHeight:1.8,fontFamily:"'Noto Sans JP',sans-serif"}}>
        <strong style={{color:"rgba(255,255,255,0.65)"}}>構造的発見：</strong>
        開発系エリアが左下（持続性低×多様性低）に固まり、ローカル系が右上に分布。
        渋谷・麻布台は「場」の大きさとは裏腹に、持続性が全エリア最低水準。
        西荻窪・高円寺は右上の「理想ゾーン」に位置する。
      </div>
    </div>
  );
}

// ── Genre Heatmap ──────────────────────────────────────────
function Heatmap({ results, ranked }) {
  const [axis, setAxis] = useState("gs");
  const vals = axis==="gs"
    ? (area,g) => results[area].gs[g]
    : (area,g) => { const d=RAW_DATA[area][g]; return axis==="創造"?d.創造:axis==="場"?d.場:d.浸透; };
  const allVals = AREAS.flatMap(a=>GENRES.map(g=>vals(a,g)));
  const mn=Math.min(...allVals), mx=Math.max(...allVals);
  const norm = v => (v-mn)/(mx-mn);
  const heat = v => {
    const t=norm(v);
    const r=Math.round(40+t*180), g_=Math.round(40+t*140), b=Math.round(80-t*60);
    return `rgb(${r},${g_},${b})`;
  };
  const axes = [{id:"gs",l:"ジャンルスコア"},{id:"創造",l:"創造"},{id:"場",l:"場"},{id:"浸透",l:"浸透"}];
  return (
    <div>
      <div style={{display:"flex",gap:"5px",marginBottom:"14px",flexWrap:"wrap"}}>
        {axes.map(ax=>(
          <button key={ax.id} onClick={()=>setAxis(ax.id)} style={{
            background:axis===ax.id?"rgba(232,200,100,0.1)":"transparent",
            border:`1px solid ${axis===ax.id?"rgba(232,200,100,0.4)":"rgba(255,255,255,0.07)"}`,
            color:axis===ax.id?"#E8C864":"rgba(255,255,255,0.35)",
            padding:"5px 12px",borderRadius:"7px",cursor:"pointer",
            fontSize:"11px",fontFamily:"'Noto Sans JP',sans-serif",
          }}>{ax.l}</button>
        ))}
      </div>
      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse",minWidth:"600px",width:"100%"}}>
          <thead>
            <tr>
              <th style={{width:"90px",padding:"6px",fontSize:"10px",color:"rgba(255,255,255,0.3)",
                textAlign:"left",fontFamily:"'Noto Sans JP',sans-serif",fontWeight:"400"}}>エリア</th>
              {GENRES.map(g=>(
                <th key={g} style={{padding:"6px 4px",fontSize:"9px",color:"rgba(255,255,255,0.35)",
                  textAlign:"center",fontFamily:"'Noto Sans JP',sans-serif",fontWeight:"400",
                  borderBottom:"1px solid rgba(255,255,255,0.05)"}}>{g}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map(area=>(
              <tr key={area}>
                <td style={{padding:"5px 6px",fontSize:"11px",color:"#fff",
                  fontFamily:"'Noto Serif JP',serif",whiteSpace:"nowrap"}}>{area}</td>
                {GENRES.map(g=>{
                  const v=vals(area,g);
                  return (
                    <td key={g} style={{padding:"3px",textAlign:"center"}}>
                      <div style={{background:heat(v),borderRadius:"5px",padding:"5px 4px",
                        fontSize:"10px",fontWeight:"700",color:"#fff",fontFamily:"monospace",
                        textShadow:"0 1px 2px rgba(0,0,0,0.5)"}}>
                        {v.toFixed(1)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Weights ────────────────────────────────────────────────
function Weights({ gw, setGw, aw, setAw, results, ranked }) {
  const tw = GENRES.reduce((s,g)=>s+gw[g],0);
  return (
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
      <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",
        borderRadius:"14px",padding:"20px"}}>
        <div style={{fontSize:"10px",color:"rgba(255,255,255,0.28)",letterSpacing:"0.1em",marginBottom:"16px",
          fontFamily:"'Noto Sans JP',sans-serif"}}>ジャンル重み</div>
        {GENRES.map(g=>(
          <div key={g} style={{marginBottom:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
              <span style={{fontSize:"11px",color:"#fff",fontFamily:"'Noto Sans JP',sans-serif"}}>{g}</span>
              <span style={{fontSize:"11px",color:GENRE_COLORS[g],fontFamily:"monospace"}}>
                {((gw[g]/tw)*100).toFixed(0)}%</span>
            </div>
            <input type="range" min="0" max="3" step="0.1" value={gw[g]}
              onChange={e=>setGw(p=>({...p,[g]:parseFloat(e.target.value)}))}/>
          </div>
        ))}
      </div>
      <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",
        borderRadius:"14px",padding:"20px"}}>
        <div style={{fontSize:"10px",color:"rgba(255,255,255,0.28)",letterSpacing:"0.1em",marginBottom:"16px",
          fontFamily:"'Noto Sans JP',sans-serif"}}>評価軸ウェイト</div>
        {[{k:"創造",d:"作り手・工房・ギャラリー密度"},{k:"場",d:"イベント・ライブ・展示数"},{k:"浸透",d:"日常利用・カフェ・口コミ密度"}].map(ax=>(
          <div key={ax.k} style={{marginBottom:"18px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"2px"}}>
              <span style={{fontSize:"11px",color:"#fff",fontFamily:"'Noto Sans JP',sans-serif"}}>{ax.k}</span>
              <span style={{fontSize:"11px",color:"#E8C864",fontFamily:"monospace"}}>{(aw[ax.k]*100).toFixed(0)}%</span>
            </div>
            <div style={{fontSize:"9px",color:"rgba(255,255,255,0.22)",marginBottom:"6px",fontFamily:"'Noto Sans JP',sans-serif"}}>{ax.d}</div>
            <input type="range" min="0.1" max="0.8" step="0.05" value={aw[ax.k]}
              onChange={e=>{
                const v=parseFloat(e.target.value);
                const oth=Object.keys(aw).filter(k=>k!==ax.k);
                const rem=Math.max(0.2,1-v)/oth.length;
                setAw({...aw,[ax.k]:v,...Object.fromEntries(oth.map(k=>[k,rem]))});
              }}/>
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",paddingTop:"14px"}}>
          <div style={{fontSize:"9px",color:"rgba(255,255,255,0.25)",marginBottom:"10px",
            fontFamily:"'Noto Sans JP',sans-serif"}}>変更後 上位6</div>
          {ranked.slice(0,6).map((a,i)=>(
            <div key={a} style={{display:"flex",gap:"8px",alignItems:"center",marginBottom:"5px"}}>
              <span style={{fontSize:"9px",color:"rgba(255,255,255,0.2)",fontFamily:"monospace",width:"16px"}}>{i+1}</span>
              <span style={{fontSize:"11px",color:"#fff",fontFamily:"'Noto Serif JP',serif",flex:1}}>{a}</span>
              <Badge type={RAW_DATA[a].type} small/>
              <span style={{fontSize:"11px",color:"#E8C864",fontFamily:"monospace"}}>{results[a].final.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────
export default function App() {
  const [gw, setGw] = useState(Object.fromEntries(GENRES.map(g=>[g,1])));
  const [aw, setAw] = useState({創造:0.4,場:0.3,浸透:0.3});
  const [tab, setTab]       = useState("rank");
  const [typeF, setTypeF]   = useState("all");
  const [selArea, setSelArea]= useState("蔵前");

  const results = useMemo(()=>{
    const r={};
    AREAS.forEach(a=>{ r[a]=score(RAW_DATA[a],gw,aw); });
    return r;
  },[gw,aw]);

  const ranked  = useMemo(()=>[...AREAS].sort((a,b)=>results[b].final-results[a].final),[results]);
  const filtered= typeF==="all"?ranked:ranked.filter(a=>RAW_DATA[a].type===typeF);

  const tabs=[
    {id:"rank",   l:"ランキング"},
    {id:"scatter",l:"散布図"},
    {id:"heat",   l:"ヒートマップ"},
    {id:"cards",  l:"エリア一覧"},
    {id:"detail", l:"詳細分析"},
    {id:"weights",l:"重み調整"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#060608",color:"#fff",
      fontFamily:"'Noto Sans JP',sans-serif",padding:"26px 18px",
      maxWidth:"1000px",margin:"0 auto"}}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700;900&family=Noto+Sans+JP:wght@400;600;700&display=swap');
        *{box-sizing:border-box}
        input[type=range]{-webkit-appearance:none;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;outline:none;width:100%}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:12px;border-radius:50%;background:#E8C864;cursor:pointer}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px}
        button{outline:none}
      `}</style>

      {/* Header */}
      <div style={{marginBottom:"28px"}}>
        <div style={{fontSize:"9px",letterSpacing:"0.22em",color:"rgba(255,255,255,0.22)",marginBottom:"7px"}}>
          TOKYO CULTURE INDEX — 16 AREAS / 2024
        </div>
        <h1 style={{fontSize:"clamp(20px,3.2vw,34px)",fontWeight:"900",margin:"0 0 6px",
          fontFamily:"'Noto Serif JP',serif",letterSpacing:"0.04em",
          background:"linear-gradient(120deg,#fff 0%,rgba(255,255,255,0.5) 100%)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          東京カルチャースコア
        </h1>
        <p style={{fontSize:"11px",color:"rgba(255,255,255,0.28)",margin:0,lineHeight:1.7}}>
          創造×場×日常浸透の循環モデルで16エリアを横断比較。開発系から下町ローカルまで。
        </p>
        {/* type legend */}
        <div style={{display:"flex",gap:"14px",marginTop:"12px",flexWrap:"wrap"}}>
          {Object.entries(TYPE_META).map(([t,m])=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:"5px"}}>
              <div style={{width:"6px",height:"6px",borderRadius:"50%",background:m.color}}/>
              <span style={{fontSize:"10px",color:"rgba(255,255,255,0.35)",fontFamily:"'Noto Sans JP',sans-serif"}}>{t}</span>
              <span style={{fontSize:"10px",color:"rgba(255,255,255,0.18)",fontFamily:"monospace"}}>
                ({AREAS.filter(a=>RAW_DATA[a].type===t).length})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:"4px",marginBottom:"20px",flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{
            background:tab===t.id?"rgba(232,200,100,0.09)":"transparent",
            border:`1px solid ${tab===t.id?"rgba(232,200,100,0.38)":"rgba(255,255,255,0.07)"}`,
            color:tab===t.id?"#E8C864":"rgba(255,255,255,0.35)",
            padding:"6px 15px",borderRadius:"8px",cursor:"pointer",
            fontSize:"11px",fontFamily:"'Noto Sans JP',sans-serif",
            fontWeight:tab===t.id?"700":"400",transition:"all 0.18s",
          }}>{t.l}</button>
        ))}
      </div>

      {/* Type filter (rank / cards) */}
      {(tab==="rank"||tab==="cards") && (
        <div style={{display:"flex",gap:"5px",marginBottom:"14px",flexWrap:"wrap"}}>
          {["all",...Object.keys(TYPE_META)].map(type=>(
            <button key={type} onClick={()=>setTypeF(type)} style={{
              background:typeF===type?(type==="all"?"rgba(255,255,255,0.07)":`${TYPE_META[type]?.color}18`):"transparent",
              border:`1px solid ${typeF===type?(type==="all"?"rgba(255,255,255,0.22)":`${TYPE_META[type]?.color}55`):"rgba(255,255,255,0.05)"}`,
              color:typeF===type?(type==="all"?"#fff":TYPE_META[type]?.color):"rgba(255,255,255,0.28)",
              padding:"4px 12px",borderRadius:"6px",cursor:"pointer",
              fontSize:"10px",fontFamily:"'Noto Sans JP',sans-serif",transition:"all 0.18s",
            }}>{type==="all" ? `全 ${AREAS.length}エリア` : (TYPE_META[type].label||type)}</button>
          ))}
        </div>
      )}

      {/* Panels */}
      <div style={{background:"rgba(255,255,255,0.018)",border:"1px solid rgba(255,255,255,0.055)",
        borderRadius:"15px",padding:"22px", display: tab==="cards" ? "none" : "block",
        ...(tab==="cards"?{display:"none"}:{})}}>
        {tab==="rank"    && <RankChart results={results} areas={filtered}/>}
        {tab==="scatter" && <Scatter results={results}/>}
        {tab==="heat"    && <Heatmap results={results} ranked={ranked}/>}
        {tab==="detail"  && (
          <>
            <div style={{display:"flex",gap:"5px",marginBottom:"16px",flexWrap:"wrap"}}>
              {ranked.map(a=>(
                <button key={a} onClick={()=>setSelArea(a)} style={{
                  background:selArea===a?`${TYPE_META[RAW_DATA[a].type]?.color}15`:"transparent",
                  border:`1px solid ${selArea===a?`${TYPE_META[RAW_DATA[a].type]?.color}50`:"rgba(255,255,255,0.07)"}`,
                  color:selArea===a?"#fff":"rgba(255,255,255,0.35)",
                  padding:"4px 11px",borderRadius:"6px",cursor:"pointer",
                  fontSize:"11px",fontFamily:"'Noto Serif JP',serif",transition:"all 0.18s",
                }}>{a}</button>
              ))}
            </div>
            <Detail area={selArea} res={results[selArea]}/>
          </>
        )}
        {tab==="weights" && <Weights gw={gw} setGw={setGw} aw={aw} setAw={setAw} results={results} ranked={ranked}/>}
      </div>

      {/* Cards grid (outside panel) */}
      {tab==="cards" && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(272px,1fr))",gap:"11px"}}>
          {filtered.map(area=>(
            <Card key={area} area={area} res={results[area]}
              rank={ranked.indexOf(area)+1}
              sel={selArea===area}
              onClick={()=>{setSelArea(area);setTab("detail");}}/>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{marginTop:"32px",paddingTop:"14px",borderTop:"1px solid rgba(255,255,255,0.04)",
        fontSize:"9px",color:"rgba(255,255,255,0.16)",lineHeight:1.9,fontFamily:"'Noto Sans JP',sans-serif"}}>
        データソース：Google Maps（2024）/ Peatix年次集計（2023-24）/ SUUMO・athome（2024）/
        食べログ（2024）/ 各区商工業実態調査（2022）/ 国勢調査（2020）/ 商店街連合資料・メディア報道より推計。
        スコアは研究・分析目的の推計値です。
      </div>
    </div>
  );
}

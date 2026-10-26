(()=>{'use strict';const D=window.ARCHIVE_DATA,app=document.getElementById('app');let notesAccepted=false;let world='古代',timeWorld='古代',personFilter='',noteMode='essay',repoTab='长repo',relFocus='h-gu',npcMode='main';const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));const appearanceHTML=(c,a)=>{let t=esc(a.text);if(['闵书赫','阴琢'].includes(c.name)){t=t.replace(/(“[^”]+”|趁手的刀，暂时。|脑子被养坏的疯狗。)/g,'<em>$1</em>')}if(c.name==='闻观渡'&&a.source==='现代·闻观渡'){t=t.replace(/\[ 表面 \]/g,'<strong class="wen-section-heading">[ 表面 ]</strong>').replace(/\[ 实则不然 \]/g,'<strong class="wen-section-heading">[ 实则不然 ]</strong>')}return t};const byId=id=>D.characters.find(c=>c.id===id);const href=(id,w)=>'#/character/'+encodeURIComponent(id)+(w?'/'+encodeURIComponent(w):'');const worldColors={'现代':'#e8f0f5','古代':'#f4ede6','修真':'#e8f0eb','末世':'#edeaf2'};const nav=(name)=>document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===name));function layout(section,english,title,desc,content,side){return `<div class="page"><div class="breadcrumb"><a href="#/">HOME</a> / ${esc(english)}</div><div class="page-head"><div class="small-label">${esc(section)} / ${esc(english)}</div><h1>${esc(title)}</h1><p>${esc(desc)}</p></div><div class="page-layout"><div class="content">${content}</div><aside class="sidebar"><h3>ON THIS PAGE</h3>${side}</aside></div></div>`}const sideWorld=(fn)=>D.worlds.map(w=>`<button data-action="${fn}" data-world="${esc(w)}">${esc(w)}</button>`).join('');const tabs=(items,current,action)=>`<div class="tabs">${items.map(x=>`<button class="tab ${x===current?'active':''}" data-action="${action}" data-value="${esc(x)}">${esc(x)}</button>`).join('')}</div>`;function home(){nav('');const cards=[['01','CHARACTER ARCHIVE','人物档案','目前char的登场记录','#e8f0f5','characters'],['02','CONNECTIONS','人际关系','CHAR 之间的联系与 NPC 登场索引。','#f4ede6','connections'],['03','CHRONOLOGY','时间编年','时间线记录','#e8f0eb','chronology']];app.innerHTML=`<div class="home"><div class="mast"><span>TIAOHEQI UNIVERSE ARCHIVE</span><span>VOL. 001 / 2026</span></div><section class="hero"><div class="eyebrow">A COLLECTION OF INTERTWINED STORIES</div><div class="archive-title" style="width:100%;max-width:620px;margin:28px auto 18px;">
  <svg viewBox="0 0 620 390" xmlns="http://www.w3.org/2000/svg"
       role="img" aria-label="调和器宇宙档案馆"
       style="display:block;width:100%;height:auto;overflow:visible;">
    <g fill="none" stroke="#A4B9C5" stroke-width="1.35" stroke-linecap="round" aria-hidden="true">
      <g class="archive-rays archive-rays-left">
        <line x1="203" y1="189" x2="222" y2="202"/>
        <line x1="186" y1="239" x2="211" y2="239"/>
        <line x1="203" y1="289" x2="222" y2="276"/>
      </g>
      <g class="archive-rays archive-rays-right">
        <line x1="398" y1="202" x2="417" y2="189"/>
        <line x1="409" y1="239" x2="434" y2="239"/>
        <line x1="398" y1="276" x2="417" y2="289"/>
      </g>
    </g>
    <g fill="#38536A" font-family="'Noto Serif SC','STZhongsong','Songti SC',serif" text-anchor="middle">
      <text x="310" y="139" font-size="91" font-weight="600" letter-spacing="5">调和器</text>
      <text x="310" y="208" font-size="41" font-weight="600" letter-spacing="9">宇宙</text>
      <text x="310" y="309" font-size="37" letter-spacing="8">档案馆</text>
    </g>
    <g fill="#66899D">
      <path class="archive-star archive-star-main" d="M310 235 L314 247 L326 251 L314 255 L310 267 L306 255 L294 251 L306 247 Z"/>
      <path class="archive-star archive-star-small" d="M310 322 L312 330 L320 332 L312 334 L310 342 L308 334 L300 332 L308 330 Z"/>
      <circle cx="310" cy="374" r="1.8"/>
    </g>
    <text x="310" y="366" fill="#839BA9" font-family="Georgia,serif"
          font-size="11" letter-spacing="6" text-anchor="middle">ARCHIVE</text>
  </svg>
</div><p class="subtitle archive-typing"><span>to be continue...</span></p></section><div class="section-line"><span>CONTENTS / 目录</span><span>01 — 03</span></div><div class="home-grid home-grid-three">${cards.map(c=>`<a class="home-card" href="#/${c[5]}" style="background:${c[4]}"><div class="card-top"><span>${c[0]} / ${c[1]}</span><span>↗</span></div><div><h2>${c[2]}</h2><p>${c[3]}</p></div></a>`).join('')}</div><div class="home-private"><span>PERSONAL / 私人记录</span><a href="#/notes">阅读札记 <span class="home-private-note">（个人感想，可以不看）</span><span aria-hidden="true"> ↗</span></a></div></div>`}const characterOrder={"现代":["黎奖","雷止","贝瑞旻","贝瑞恩","宋潮","辜麒","达一别","乔治","麦见海","纪扬","柊尘","谢满","北向南","荀逸伦","车以弦","西杀","阴琢","Arvid","Luca"],"古代":["辜琳琅","邢怀戎","阿史那信"],"修真":["黎奖","宋知世","楼宴宁","水俱雅","北朔"],"末世":["求渺"]};function characters(){nav('characters');const list=characterOrder[world].map(name=>D.characters.find(c=>c.name===name&&c.kind==='char')).filter(Boolean);const content=tabs(D.worlds,world,'world')+`<div class="small-label">${esc(world)} / CHARACTER INDEX</div>${list.length?list.map((c,i)=>`<a class="index-row" href="${href(c.id,world)}"><span class="number">${String(i+1).padStart(2,'0')}</span><span class="char-row-identity">${(c.portraitsByWorld?.[world]?.[0]||c.portrait||c.portraits?.[0])?`<img class="char-index-thumb" src="${esc(c.portraitsByWorld?.[world]?.[0]||c.portrait||c.portraits?.[0])}" alt="" loading="lazy" onerror="this.remove()">`:''}<span class="name" style="color:${c.color}">${esc(c.name)}</span></span><span class="arrow">↗</span></a>`).join(''):'<p class="empty">这一世界观的人物档案尚待收录。</p>'}`;app.innerHTML=layout('01','CHARACTER ARCHIVE','人物档案','目前出卡char的登场记录（档案内第一条为本人的单人卡主场，其余都是在其他char卡里的出场）',content,sideWorld('world'))}function profile(id,requestedWorld){nav('characters');const c=byId(id);if(!c){notFound();return}const displayWorld=D.worlds.includes(requestedWorld)?requestedWorld:c.world;
 const photos=c.portraitsByWorld?.[displayWorld]?.length?c.portraitsByWorld[displayWorld]:(c.portraitsByWorld?.[c.world]?.length?c.portraitsByWorld[c.world]:(c.portraits?.length?c.portraits:(c.portrait?[c.portrait]:[])));
 const portrait=photos.length>1?`<div class="portrait-gallery">${photos.map((src,i)=>`<img class="portrait" src="${esc(src)}" alt="${esc(c.name)}立绘 ${i+1}" loading="lazy" onerror="this.remove()">`).join('')}</div>`:photos.length===1?`<img class="portrait" src="${esc(photos[0])}" alt="${esc(c.name)}" onerror="this.remove();this.closest('.profile-head')?.classList.add('without-portrait')">`:'';const appearances=c.appearances||[];const content=`<div class="profile-head ${portrait?'has-portrait':'without-portrait'}">${portrait}<div class="profile-info"><div class="small-label">${c.kind==='npc'?'NPC ARCHIVE':'CHARACTER FILE'} / ${esc(displayWorld)}</div><h1 style="color:${c.color}">${esc(c.name)}</h1>${(c.kind==='char'||c.name==='闻观渡')?`<div class="personality-groups" style="--personality-color:${c.color}">${(c.personalityGroups||[{label:'',tags:c.personalityTags||[]}]).map(g=>g.tags?.length?`<div class="personality-group">${g.label?`<span class="personality-group-label">${esc(g.label)}</span>`:''}<div class="personality-tags">${g.tags.map(t=>`<span class="personality-tag">${esc(t)}</span>`).join('')}</div></div>`:'').join('')}</div>`:''}</div></div><div class="appearance-list">${appearances.map((a,i)=>`<section class="appearance-record"><div class="appearance-top"><span class="appearance-number">${String(i+1).padStart(2,'0')}</span><span class="appearance-source world-${a.source.startsWith("现代")?"modern":a.source.startsWith("古代")?"historical":a.source.startsWith("修真")?"cultivation":a.source.startsWith("末世")?"apocalypse":"unknown"}">${esc(a.source)}</span></div>${a.role?`<div class="appearance-role">${esc(a.role)}</div>`:''}${a.text?`<p class="appearance-text">${appearanceHTML(c,a)}</p>`:''}${a.hiddenNote?`<details class="npc-hidden-note"><summary>推测，没有写在麦见海简介里</summary><div class="npc-hidden-note-body">${esc(a.hiddenNote)}</div></details>`:''}</section>`).join('')}</div>${c.profileNote?`<p class="profile-easter-note"><strong>注释：</strong>${esc(c.profileNote)}</p>`:''}`;app.innerHTML=layout('01',c.kind==='npc'?'NPC FILE':'CHARACTER FILE','', '',content,`<a href="#/characters">← 返回人物索引</a><a href="#/connections">人际关系 ↗</a>`);const pageHead=app.querySelector('.page-head');if(pageHead)pageHead.remove()}
let relationWorld='现代',relationQuery='',relationZoom=.78;
function charRelationshipView(){
 const worlds=['现代','修真','古代','末世'];
 const current=worlds.includes(relationWorld)?relationWorld:'现代';
 const graph=window.ARCHIVE_GRAPH?.worlds?.[current];
 if(!graph)return '<p class="empty">这一世界观暂未收录关系。</p>';
 const colors={'现代':'#6b91a6','修真':'#6e9882','古代':'#b18a67','末世':'#8d7da5'};
 const folders={'现代':'modern','修真':'cultivation','古代':'historical','末世':'apocalypse'};
 const pale={'现代':'#e8f0f5','修真':'#e8f0eb','古代':'#f4ede6','末世':'#edeaf2'};
 const charMap=new Map(D.characters.filter(c=>c.kind==='char').map(c=>[c.name,c]));
 const nodeMap=new Map(graph.nodes.map(n=>[n.name,n]));
 const scale=relationZoom;
 const fileImage=name=>{
   const c=charMap.get(name);
   if(!c)return '';
   // Prefer the illustration for this worldview; otherwise show the character's
   // original home-world illustration instead of an empty portrait circle.
   const exact=c.portraitsByWorld?.[current];
   if(exact?.length)return exact[0];
   if(c.portrait?.startsWith('images/'+folders[current]+'/'))return c.portrait;
   const worldGallery=(c.portraits||[]).find(src=>src.startsWith('images/'+folders[current]+'/'));
   if(worldGallery)return worldGallery;
   const home=c.portraitsByWorld?.[c.world];
   if(home?.length)return home[0];
   return c.portrait||c.portraits?.[0]||'';
 };
 const clusterShapes=graph.clusters.map(g=>`<g><rect x="${g.x}" y="${g.y}" width="${g.w}" height="${g.h}" rx="22" fill="#fff" fill-opacity=".42" stroke="${colors[current]}" stroke-opacity=".30" stroke-dasharray="4 8"/><text x="${g.x+26}" y="${g.y+36}" fill="${colors[current]}" font-size="18" letter-spacing="2">${esc(g.label)}</text></g>`).join('');
 const nodeRadius=45;
 const lines=graph.edges.map((e,i)=>{
   const a=nodeMap.get(e.fromName),b=nodeMap.get(e.toName);
   if(!a||!b)return '';
   const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy)||1,ux=dx/length,uy=dy/length;
   const x1=a.x+ux*(nodeRadius+3),y1=a.y+uy*(nodeRadius+3);
   const x2=b.x-ux*(nodeRadius+9),y2=b.y-uy*(nodeRadius+9);
   const arrow=e.direction==='single';
   return `<g class="relationship-edge ${arrow?'one-way':'two-way'}"><title>${esc(e.fromName)} ${arrow?'→':'—'} ${esc(e.toName)}：${esc(e.label)}</title><path d="M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" fill="none" stroke="${arrow?'#9a7b80':'#8a9da6'}" stroke-width="2" ${arrow?'stroke-dasharray="7 6" marker-end="url(#relation-arrow)"':''}/></g>`;
 }).join('');
 const labels=graph.edges.map(e=>{
   const a=nodeMap.get(e.fromName),b=nodeMap.get(e.toName);
   if(!a||!b)return '';
   const x=(a.x+b.x)/2+(e.labelDx||0),y=(a.y+b.y)/2+(e.labelDy||0);
   const width=Math.min(245,Math.max(46,Array.from(e.label).length*13+22));
   return `<g class="relationship-label" transform="translate(${x} ${y})"><rect x="${-width/2}" y="-15" width="${width}" height="30" rx="10" fill="#fcfdfc" stroke="#cddadf" stroke-width="1"/><text y="5" text-anchor="middle" fill="#526a77" font-size="13">${esc(e.label)}</text></g>`;
 }).join('');
 const circles=graph.nodes.map((n,i)=>{
   const c=charMap.get(n.name),color=c?.color||colors[current],src=fileImage(n.name),clipId=`relation-avatar-${current==='现代'?'modern':current==='古代'?'ancient':current==='修真'?'cultivation':'apocalypse'}-${i}`;
   const image=src?`<clipPath id="${clipId}"><circle cx="${n.x}" cy="${n.y}" r="40"/></clipPath><image href="${esc(src)}" x="${n.x-40}" y="${n.y-40}" width="80" height="80" preserveAspectRatio="xMidYMin slice" clip-path="url(#${clipId})"/>`:'';
   const content=`<circle cx="${n.x}" cy="${n.y}" r="46" fill="#f9fbfa" stroke="${color}" stroke-width="2.5"/><text x="${n.x}" y="${n.y+6}" font-size="19" text-anchor="middle" fill="${color}">${esc(n.name.slice(0,2))}</text>${image}<rect x="${n.x-55}" y="${n.y+53}" width="110" height="33" rx="11" fill="#fcfdfc" stroke="#d5e0e2"/><text x="${n.x}" y="${n.y+75}" text-anchor="middle" font-size="17" fill="${color}">${esc(n.name)}</text>`;
   return c?`<a href="${href(c.id,current)}" class="relationship-person" aria-label="查看${esc(n.name)}档案"><title>${esc(n.name)} · ${current}</title>${content}</a>`:`<g class="relationship-person">${content}</g>`;
 }).join('');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" class="relationship-map" viewBox="0 0 ${graph.width} ${graph.height}" width="${Math.round(graph.width*scale)}" height="${Math.round(graph.height*scale)}" role="img" aria-label="${current}世界观人物关系图"><defs><marker id="relation-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0.5 0.5 L7 4 L0.5 7.5" fill="none" stroke="#9a7b80" stroke-width="1.4"/></marker></defs><rect width="${graph.width}" height="${graph.height}" fill="${pale[current]}" fill-opacity=".58"/>${clusterShapes}${lines}${labels}${circles}</svg>`;
 const rows=graph.edges.map(e=>`<div class="relationship-record"><span class="relationship-record-names">${esc(e.fromName)} <span class="relationship-record-symbol">${e.direction==='single'?'→':'—'}</span> ${esc(e.toName)}</span><span class="relationship-record-detail">${esc(e.label)}</span></div>`).join('');
 return `<div class="relation-section"><div class="small-label">CHAR / RELATIONSHIPS</div><h2 class="subheading">CHAR 之间的关系</h2><p class="muted relation-explainer">点击标签切换世界观，点击char头像可进入档案</p><div class="relationship-toolbar">${tabs(worlds,current,'relationworld')}<div class="relationship-zoom"><button type="button" data-action="relationzoom" data-value="out" aria-label="缩小关系图">−</button><span>${Math.round(scale*100)}%</span><button type="button" data-action="relationzoom" data-value="in" aria-label="放大关系图">＋</button></div></div><div class="relationship-scroll" tabindex="0" aria-label="可滚动查看关系图">${svg}</div><div class="relationship-legend"><span><i class="relationship-legend-solid"></i> — 双向关系</span><span><i class="relationship-legend-arrow"></i> → 单方面评价、态度或指向性关系</span></div><details class="relationship-records"><summary>查看${current}关系文字索引（${graph.edges.length} 条）</summary><div>${rows}</div></details></div>`;
}
// WORLD / SETTING NOTES: separate from the CHAR/NPC archive data.
function worldbuildingView(){
 const worlds=window.ARCHIVE_WORLDBUILDING||[];
 const worldClass={'现代':'modern','古代':'historical','修真':'cultivation','末世':'apocalypse'};
 const characterNames=[...new Set(D.characters.map(c=>c.name))].sort((a,b)=>b.length-a.length);
 const fallbackNames=['温群','柳含烟','邓擎天','景帝','尤里安','枭','乔治'];
 const allNames=[...new Set([...characterNames,...fallbackNames])].sort((a,b)=>b.length-a.length);
 const re=allNames.length?new RegExp(allNames.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g'):null;
 const accent=(text)=>{
  const raw=String(text??'');
  // Escape first, then add spans to plain-text fragments; do not create links.
  const parts=[];let cursor=0;
  if(re){for(const match of raw.matchAll(re)){
   parts.push(esc(raw.slice(cursor,match.index)));
   const name=match[0],c=D.characters.find(x=>x.name===name&&x.kind==='char')||D.characters.find(x=>x.name===name);
   const color=c?.color||'#8a6075';
   parts.push(`<span class="worldbuilding-character" style="--wb-name-color:${esc(color)}">${esc(name)}</span>`);
   cursor=match.index+name.length;
  }}
  parts.push(esc(raw.slice(cursor)));
  const highlighted=parts.join('');
  // A label at the start of a paragraph is a keyword, not a person name.
  return highlighted.replace(/^((?:危险等级|生态特征|污染体|威胁评级|boss|主宰者|定位|权限|朝堂|边疆|四科|基础设定|人类活动范围|塔内其他科系对宝宝巴士的态度|动能科\(Kinetic\)|锚定科\(Anchor\)|溯源科\(Trace\)|宝宝巴士|三级贤者\(Tier-3\)|二级贤者\(Tier-2\)|一级贤者\(Tier-1\)|冠位\(Crown\)|如水一中|文都大学|华海大学（OUH）|重门市|汀兰小区|B市|无人岛|海草岛))([：:])/i,'<span class="worldbuilding-keyword">$1$2</span>');
 };
 const paragraphs=items=>(items||[]).map(item=>{
  const isSpec=typeof item==='object'&&item.speculative;
  const text=typeof item==='string'?item:item.text;
  return `<p class="worldbuilding-paragraph${isSpec?' worldbuilding-speculative':''}">${accent(text)}</p>`;
 }).join('');
 return `<div class="worldbuilding-view"><div class="small-label">WORLD ATLAS / 世界观档案</div><h2 class="subheading">世界观设定梳理</h2><p class="worldbuilding-intro">简单整理现代出现过的地点和其他世界观基础设定。</p><div class="worldbuilding-accordions">${worlds.map((w,i)=>`<details class="worldbuilding-world worldbuilding-${worldClass[w.world]||'modern'}" ${i===0?'open':''}><summary><span class="worldbuilding-world-number">${String(i+1).padStart(2,'0')}</span><span class="worldbuilding-world-title">${esc(w.world)}</span><span class="worldbuilding-world-count">${w.entries.length} 个条目</span><span class="worldbuilding-chevron" aria-hidden="true">⌄</span></summary><div class="worldbuilding-world-body">${w.intro?`<div class="worldbuilding-opening">${paragraphs(w.intro)}</div>`:''}${w.entries.map((entry,j)=>`<section class="worldbuilding-entry"><div class="worldbuilding-entry-head"><span class="worldbuilding-entry-number">${String(j+1).padStart(2,'0')}</span><h3>${esc(entry.title)}</h3></div><div class="worldbuilding-entry-body">${paragraphs(entry.paragraphs)}</div></section>`).join('')}</div></details>`).join('')}</div></div>`;
}
function connections(){nav('connections');let content=tabs(['CHAR 之间的关系','重复出现的 NPC','单次出现的 NPC','世界观设定梳理'],npcMode==='main'?'CHAR 之间的关系':npcMode==='recurring'?'重复出现的 NPC':npcMode==='single'?'单次出现的 NPC':'世界观设定梳理','npc');if(npcMode==='main'){content+=charRelationshipView()}else if(npcMode==='recurring'){const recurring=[...D.recurring].sort((a,b)=>b.sources.length-a.sources.length);const zhaoIndex=recurring.findIndex(r=>r.name==='赵飞光');const yemeiIndex=recurring.findIndex(r=>r.name==='耶眉');if(zhaoIndex>=0&&yemeiIndex>=0){const [zhao]=recurring.splice(zhaoIndex,1);recurring.splice(recurring.findIndex(r=>r.name==='耶眉')+1,0,zhao)}const worldClass={'现代':'modern','古代':'historical','修真':'cultivation','末世':'apocalypse'};const worldTags=r=>[...new Set(r.sources.map(src=>{const w=src.split(/[·・／/]/)[0].trim();if(D.worlds.includes(w))return w;const character=D.characters.find(c=>c.kind==='char'&&c.name===src);return character?.world||null}).filter(Boolean))].sort((a,b)=>D.worlds.indexOf(a)-D.worlds.indexOf(b)).map(w=>`<span class="appearance-source world-${worldClass[w]}">${esc(w)}</span>`).join('');content+=`<div class="small-label">RECURRING NPC / 多次登场</div><div class="npc-index">${recurring.map((r,i)=>{const c=D.characters.find(x=>x.kind==='npc'&&x.name===r.name);return `<a class="index-row npc-recurring-row" href="${c?href(c.id):'#/connections'}"><span class="number">${String(i+1).padStart(2,'0')}</span><span class="npc-row-identity">${c?.portrait?`<img class="npc-index-thumb" src="${esc(c.portrait)}" alt="" loading="lazy">`:''}<span class="name">${esc(r.name)}</span></span><span class="npc-world-tags">${worldTags(r)}</span><span class="source">${r.sources.length} 个来源</span><span class="arrow">↗</span></a>`}).join('')}</div>`}else if(npcMode==='worldbuilding'){content+=worldbuildingView()}else{const groups=D.singleNPCGroups||[];const worldClass={'现代':'modern','古代':'historical','修真':'cultivation','末世':'apocalypse'};content+=`<div class="small-label">SINGLE APPEARANCE NPC / 单次登场</div>${groups.map((g,i)=>`<details class="npc-source-group"><summary><span class="number">${String(i+1).padStart(2,'0')}</span><span class="appearance-source world-${worldClass[g.world]||'modern'}">${esc(g.source)}</span><span class="npc-group-count">${g.people.length} 位 NPC</span><span class="npc-group-chevron" aria-hidden="true">⌄</span></summary>${g.people.map(n=>{const c=D.characters.find(x=>x.kind==='npc'&&x.name===n.name);const image=c?.portrait?`<a class="npc-single-photo" href="${href(c.id)}" aria-label="查看${esc(n.name)}档案"><img src="${esc(c.portrait)}" alt="${esc(n.name)}" loading="lazy" onerror="this.closest('.npc-single-record')?.classList.remove('has-image');this.closest('.npc-single-photo')?.remove()"></a>`:'';return `<div class="npc-single-record ${image?'has-image':''}">${image}<div class="npc-single-body"><h3>${c?`<a href="${href(c.id)}">${esc(n.name)}</a>`:esc(n.name)}</h3>${n.text?`<p>${esc(n.text)}</p>`:'<p class="npc-missing-info">暂未补充文字资料。</p>'}</div></div>`}).join('')}</details>`).join('')}`}app.innerHTML=layout('02','CONNECTIONS','人际关系','人物之间的联系，以及他们在不同故事中的登场记录。',content,`<button data-action="npc" data-value="CHAR 之间的关系">CHAR 之间的关系</button><button data-action="npc" data-value="重复出现的 NPC">重复出现的 NPC</button><button data-action="npc" data-value="单次出现的 NPC">单次出现的 NPC</button><button data-action="npc" data-value="世界观设定梳理">世界观设定梳理</button>`);if(npcMode==='main'||npcMode==='worldbuilding')app.querySelector('.page-layout')?.classList.add('relationship-fullwidth')}
// Only convert known Gregorian dates in the birthday index; retain lunar/approximate dates as supplied.
function birthdayDate(date){
 const m=String(date).match(/^(\d{1,2})月(\d{1,2})日$/);
 return m?`${Number(m[1])}.${Number(m[2])}`:date;
}
function birthdaysView(){
 const b=D.birthdays||{noBirthday:[],note:'',seasons:[]};

 const seasons=(b.seasons||[]).map(s=>`<section class="birthday-season birthday-season-${({春:'spring',夏:'summer',秋:'autumn',冬:'winter'})[s.name]||'spring'}"><div class="birthday-season-title"><span class="birthday-season-name">${esc(s.name)}</span><span class="birthday-season-en">${esc(s.english)}</span></div><div class="birthday-season-entries">${s.entries.map(entry=>`<div class="birthday-entry"><span class="birthday-date">${esc(birthdayDate(entry[1]))}</span><span class="birthday-name">${esc(entry[0])}</span><span class="birthday-source">${esc(entry[2])}</span></div>`).join('')}</div></section>`).join('');
 return `<div class="small-label">CHARACTER BIRTHDAYS / 生日索引</div><div class="birthday-seasons">${seasons}</div><section class="birthday-standalone-note"><p>${esc(b.note)}</p></section>`;
}
function chronology(target){nav('chronology');if(timeWorld==='CHAR 生日'){
 const content=tabs([...D.worlds,'CHAR 生日'],timeWorld,'timeworld')+birthdaysView();
 app.innerHTML=layout('03','CHRONOLOGY','时间编年','点击标签切换世界观',content,'<div class="sidebar-hint"></div>');
 return;
 }const events=D.events.filter(e=>e.world===timeWorld);const alias={'辜草':'辜琳琅'};const colors={'辜琳琅':'#ad741f','辜草':'#ad741f','邢怀戎':'#b54850','阿史那信':'#8056a5','辜麒':'#9364a6','黎奖':'#a17c00','楼宴宁':'#3c73ac','求渺':'#577fad','宋知世':'#a83c4b','水俱雅':'#3e8063','北朔':'#c15b53'};function inlineNames(e){const names=[...new Set(e.highlights||[])].sort((a,b)=>b.length-a.length);if(!names.length)return esc(e.text);const re=new RegExp(names.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');let out='',pos=0;for(const m of e.text.matchAll(re)){out+=esc(e.text.slice(pos,m.index));const name=m[0],lookup=alias[name]||name;const c=D.characters.find(x=>x.name===lookup&&x.world===e.world);const color=D.characters.find(x=>x.name===lookup&&x.kind==='char')?.color||colors[name]||'#527b92';out+=`<span class="inline-char" style="color:${color}">${esc(name)}</span>`;pos=m.index+name.length}return out+esc(e.text.slice(pos))}const intro=({"现代":"<p class=\"timeline-note\">主要用来梳理年龄，早期卡基本都没有写年份所以不放。在整理过程中我发现人际里作为npc的char年龄和本人卡里会有点不一样，所以写的谁的卡开场，后面对应char的岁数就是对应开场c卡里的年龄，其实不太能参考</p>","修真":"<p class=\"timeline-note\">时间线（基本是基于黎奖穿越的时间倒推的）：</p>","末世":"<p class=\"timeline-note\">用来做大事年记了（个人认为末世是独立的平行世界观，达一别卡里出现的渺并非末世渺，因为末世渺开场1说明末世的世界一开始就是有异能的，所以不和现代时间线合并）</p>"})[timeWorld]||'';const characterLinks=characterOrder[timeWorld].map(name=>D.characters.find(c=>c.name===name&&c.kind==='char')).filter(Boolean).map(c=>`<a class="chron-character-link" href="${href(c.id,timeWorld)}" style="--character-color:${c.color}">${esc(c.name)} <span aria-hidden="true">↗</span></a>`).join('');const characterNav=characterLinks?`<div class="chron-character-nav" aria-label="当前世界观的人物档案"><span class="chron-character-label">人物档案</span>${characterLinks}</div>`:'';const content=tabs([...D.worlds,'CHAR 生日'],timeWorld,'timeworld')+characterNav+intro+`<div class="small-label">${esc(timeWorld)} / CHRONICLE</div><div class="timeline">${events.length?events.map(e=>e.noteOnly?`<p class="timeline-note">${esc(e.text)}</p>`:`${e.preNote?`<p class="timeline-note">${esc(e.preNote)}</p>`:""}<section class="event" id="${e.id}"><div class="event-year ${timeWorld==='古代'?(e.year.startsWith('永安')?'reign-yongan':e.year.startsWith('承安')?'reign-chengan':e.year.startsWith('顺宁')?'reign-shunning':''):''}">${esc(e.year)}${e.status?`<span class="flag">〔${esc(e.status)}〕</span>`:''}</div><p class="event-text">${inlineNames(e)}</p></section>`).join(''):'<p class="empty">这一世界观的时间事件尚待收录。</p>'}</div>`;app.innerHTML=layout('03','CHRONOLOGY','时间编年','点击标签切换世界观',content,`<div class="sidebar-hint"></div>`);if(target){requestAnimationFrame(()=>document.getElementById(target)?.scrollIntoView({block:'start'}))}}function notesWarning(){nav('notes');app.innerHTML=`<div class="page notes-gate"><div class="breadcrumb"><a href="#/">HOME</a> / PERSONAL NOTES</div><div class="small-label">BEFORE READING / 预警</div><h1>阅前必看</h1><div class="notes-warning-copy"><section><h2>本人玩法</h2><p>只玩女u吃bg，不雷blgb只是爱吃bg，不是纯代更倾向roleplay看小说，开抢话交给ai推剧情，我只引导方向，如果能接受我的玩法再看。</p></section><section><h2>感想风格</h2><p>第三人称上帝视角，用u指代user，专注分析char的个性表现以及与他人的关系，我不磕任何c和c之间的cp请放心。主观性很强，都是从我玩的u出发的理解，所有观点仅代表我个人。</p></section><section><p>没有给全部的c都写，只写了玩得多且想写感想的。有放一部分我的摸鱼，我的画技很一般，随意看看就好。</p></section></div><div class="notes-gate-actions"><button data-action="acceptnotes" class="notes-accept">可以接受，进入阅读札记 ↗</button><a href="#/" class="notes-decline">返回首页</a></div></div>`}
// Highlight only exact character names, keeping every note's original wording.
// Aliases affect colors, not the displayed spelling; no profile links are added.
const repoAliases={'辜草':'辜琳琅'};
const repoCharColors=new Map(D.characters.filter(c=>c.kind==='char').map(c=>[c.name,c.color]));
const repoNames=[...new Set([...repoCharColors.keys(),...Object.keys(repoAliases)])].sort((a,b)=>b.length-a.length);
const repoNamePattern=new RegExp(repoNames.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
function repoColored(text){
 const raw=String(text??'');let html='',at=0;
 repoNamePattern.lastIndex=0;
 for(const match of raw.matchAll(repoNamePattern)){
  const name=match[0];const color=repoCharColors.get(repoAliases[name]||name)||'#547389';
  html+=esc(raw.slice(at,match.index));
  html+=`<span class="repo-char-name" style="color:${esc(color)}">${esc(name)}</span>`;
  at=match.index+name.length;
 }
 return html+esc(raw.slice(at));
}
function notes(){
 nav('notes');
 const repo=window.ARCHIVE_REPOS||{long:[],short:[],ending:[]};
 const paintings=window.ARCHIVE_PAINTINGS||{intro:'',worlds:{},entries:[]};
 const tabsList=['长repo','短repo','最后想说的一些','一些摸鱼'];
 const active=tabsList.includes(repoTab)?repoTab:'长repo';
 const blocks=items=>items.map(([kind,value])=>kind==='quote'
  ?`<blockquote class="repo-quote">${repoColored(value)}</blockquote>`
  :`<p>${repoColored(value)}</p>`).join('');
 let section='';
 if(active==='长repo'){
  const entries=repo.long.map((item,i)=>{
   const firstName=item.name==='古代'?'邢怀戎':item.name.split('&')[0];
   const tint=repoCharColors.get(firstName)||'#a77b65';
   return `<details class="repo-long-entry" style="--repo-pill-color:${esc(tint)}"><summary><span class="repo-ordinal">${String(i+1).padStart(2,'0')}</span><span class="repo-entry-label">${repoColored(item.name)}</span><span class="repo-entry-title repo-title-pill">${repoColored(item.title)}</span><span class="repo-expand" aria-hidden="true"></span></summary><div class="repo-entry-content">${blocks(item.blocks)}</div></details>`;
  }).join('');
  section=`<section class="repo-section repo-current"><div class="repo-section-head"><span class="small-label">01 / LONG REPO</span><h2>长repo</h2><p>点击标题展开阅读</p></div><div class="repo-long-list">${entries}</div></section>`;
 }else if(active==='短repo'){
  const entries=repo.short.map((item,i)=>`<article class="repo-short-entry"><div class="repo-short-head"><span class="repo-ordinal">${String(i+1).padStart(2,'0')}</span><h3>${repoColored(item.name)}</h3></div><div class="repo-entry-content">${blocks(item.blocks)}</div></article>`).join('');
  section=`<section class="repo-section repo-current"><div class="repo-section-head"><span class="small-label">02 / SHORT REPO</span><h2>短repo</h2></div>${entries}</section>`;
 }else if(active==='最后想说的一些'){
  section=`<section class="repo-section repo-current repo-ending"><div class="repo-section-head"><span class="small-label">03 / EPILOGUE</span><h2>最后想说的一些</h2></div><div class="repo-entry-content">${repo.ending.map(t=>`<p>${repoColored(t)}</p>`).join('')}</div></section>`;
 }else{
  const intro=`<div class="painting-intro"><p>${repoColored(paintings.intro)}</p><div class="painting-worlds"><span class="painting-worlds-heading">涉及char</span>${Object.entries(paintings.worlds).map(([w,names])=>`<p><span class="painting-world-label">${esc(w)}：</span>${repoColored(names)}</p>`).join('')}</div></div>`;
  const figures=paintings.entries.map((item,i)=>`<figure class="painting-item"><div class="painting-frame"><img src="images/painting/${encodeURIComponent(item.file)}" alt="一些摸鱼 · 第${i+1}张" loading="lazy" decoding="async" onerror="this.remove();this.parentElement.classList.add('is-missing')"><p class="painting-missing">尚未找到 images/painting/${esc(item.file)}</p></div><figcaption class="painting-caption"><span class="painting-count">${String(i+1).padStart(2,'0')} / ${String(paintings.entries.length).padStart(2,'0')}</span><p>${repoColored(item.caption)}</p></figcaption></figure>`).join('');
  section=`<section class="repo-section repo-current"><div class="repo-section-head"><span class="small-label">04 / SKETCHBOOK</span><h2>一些摸鱼</h2></div>${intro}<div class="painting-gallery">${figures}</div></section>`;
 }
 const content=`<div class="repo-intro"><span class="small-label">PERSONAL REPOSITORY / 个人感想</span></div><div class="repo-tabs" aria-label="阅读札记分类">${tabs(tabsList,active,'repotab')}</div>${section}`;
 app.innerHTML=layout('04','PERSONAL REPO','这里是一些个人感想','',content,'');
 app.querySelector('.page-layout')?.classList.add('repo-page-layout');
}
function notFound(){app.innerHTML='<div class="page"><h1>未找到这份档案</h1><p><a href="#/">返回首页 ↗</a></p></div>'}function route(){const parts=decodeURIComponent(location.hash.slice(2)||'').split('/');const p=parts[0];if(p==='characters')characters();else if(p==='character')profile(parts[1],parts[2]);else if(p==='connections')connections();else if(p==='chronology'){if(D.worlds.includes(parts[1]))timeWorld=parts[1];chronology(parts[2])}else if(p==='notes')notesWarning();else if(p==='notes-read'){if(notesAccepted)notes();else{location.replace('#/notes');notesWarning()}}else home();window.scrollTo({top:0,behavior:'instant'});document.querySelector('nav').classList.remove('open');document.getElementById('menuToggle').setAttribute('aria-expanded','false')}document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(!b)return;const a=b.dataset.action,v=b.dataset.value;if(a==='acceptnotes'){notesAccepted=true;location.hash='#/notes-read';route()}else if(a==='world'){world=v;characters()}else if(a==='timeworld'){timeWorld=v;personFilter='';chronology()}else if(a==='person'){personFilter=v;chronology()}else if(a==='relationworld'){relationWorld=v;relationQuery='';relationZoom=v==='现代'?.78:1;connections()}else if(a==='relationzoom'){const box=app.querySelector('.relationship-scroll');const oldLeft=box?.scrollLeft||0,oldTop=box?.scrollTop||0,oldZoom=relationZoom;relationZoom=Math.max(.55,Math.min(1.65,relationZoom+(v==='in'?.15:-.15)));connections();const next=app.querySelector('.relationship-scroll');if(next){next.scrollLeft=oldLeft*relationZoom/oldZoom;next.scrollTop=oldTop*relationZoom/oldZoom}}else if(a==='focus'){relFocus=v;connections()}else if(a==='npc'){npcMode=v==='CHAR 之间的关系'?'main':v==='重复出现的 NPC'?'recurring':v==='世界观设定梳理'?'worldbuilding':'single';connections()}else if(a==='repotab'){repoTab=v;notes();window.scrollTo({top:0,behavior:'instant'})}else if(a==='note'){noteMode=v==='文学专栏'?'essay':'journal';notes()}});document.addEventListener('input',e=>{if(e.target.id==='relationSearch'){relationQuery=e.target.value;const caret=e.target.selectionStart;connections();const el=document.getElementById('relationSearch');if(el){el.focus();el.setSelectionRange(caret,caret)}}});document.getElementById('menuToggle').onclick=()=>{const n=document.querySelector('nav');n.classList.toggle('open');document.getElementById('menuToggle').setAttribute('aria-expanded',String(n.classList.contains('open')))};document.getElementById('backTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});window.addEventListener('hashchange',route);route()})();

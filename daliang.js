/* 大梁·承梁传：仅展示用户提供的资料，不自动添加内容标签。 */
window.renderDaliangChronicle=function(app,archive,escapeText){
 const E=escapeText,eras=window.DALIAN_CHRONICLE||[];
 const byName=n=>archive.characters.find(c=>c.name===n);
 const imageFor=n=>n==='赵飞光'?'images/historical/zhaofeiguang.jpg':(byName(n)?.portraitsByWorld?.古代?.[0]||byName(n)?.portrait||'');
 const hero=[['邢怀戎','永安','upper-left'],['赵飞光','崇明','lower-left'],['辜琳琅','承安','upper-right'],['阿史那信','顺宁','lower-right']];
 const paragraph=t=>`<p>${E(t)}</p>`;
 const person=(p)=>`<article class="dl-plain-person"><h5>${E(p[0])}</h5>${p[1]?paragraph(p[1]):''}${p[2]?`<p>${E(p[0]==='赵飞光'?'':'简介：')}${E(p[2])}</p>`:''}</article>`;
 const plainGroup=(g,j)=>`<section class="dl-plain-group" id="dl-group-${j}"><h4>${E(g.name)}</h4><div class="dl-plain-people">${g.people.map(person).join('')}</div></section>`;
 const story=s=>`<section class="dl-plain-story"><h4>${E(s.title)}</h4><div class="dl-plain-prose">${s.paragraphs.map(paragraph).join('')}</div></section>`;
 const power=e=>{
  if(e.id!=='chongming')return `<div class="dl-plain-index">${e.groups.map((g,j)=>plainGroup(g,e.id+'-'+j)).join('')}</div>`;
  const layout=[{i:0,cls:'r1',label:'皇宫'},{i:1,cls:'r2a',label:'燕王府'},{i:3,cls:'r2b',label:'晴国公府'},{i:5,cls:'r2c',label:'镇国公府'},{i:4,cls:'r3a',label:'丞相府'},{i:2,cls:'r3b',label:'学府'}];
  return `<div class="dl-map-wrap"><div class="dl-board-map" role="group" aria-label="崇明势力分布">${layout.map(({i,cls,label},k)=>`<button type="button" class="dl-board-spot ${k===0?'selected':''} ${cls}" data-dl-board="${i}" aria-pressed="${k===0?'true':'false'}"><span class="dl-board-dot" aria-hidden="true"></span><strong>${E(label)}</strong></button>`).join('')}</div><div class="dl-board-detail" aria-live="polite"></div></div><div class="dl-plain-index">${e.groups.map((g,j)=>plainGroup(g,e.id+'-'+j)).join('')}</div>`;
 };
 const chapter=(e,i)=>`<details class="dl-era-fold" id="dl-fold-${E(e.id)}" ${i===0?'open':''}><summary class="dl-era-summary"><span class="dl-era-summary-dynasty">${E(i<2?'大梁':'承梁')}</span><strong>${E(e.era)}</strong><span class="dl-era-summary-toggle" aria-hidden="true"></span></summary><section class="dl-chapter" id="dl-${E(e.id)}"><header class="dl-chapter-head"><h2>${E(e.era)}</h2><p>当朝皇帝：${E(e.emperor)}</p>${e.intro?paragraph(e.intro):''}</header><h3 class="dl-plain-part">一、势力分布</h3>${power(e)}<details class="dl-stories-fold"><summary class="dl-stories-summary"><strong>二、浮沉往事</strong><span class="dl-stories-toggle" aria-hidden="true"></span></summary><div class="dl-stories-body">${e.stories.map(story).join('')}</div></details>${e.qa?.length?`<section class="dl-qa"><h3>个人推测</h3><p class="dl-qa-intro">采用QA的方式呈现，Q也是我之前在游玩的时候思考的问题，引导剧情往这方面跑了一下，结合我跑出来的内容写的A，包含很多我的个人理解。</p>${e.qa.map((q,j)=>`<details class="dl-question"><summary><span>Q${j+1}：</span>${E(q.q)}</summary><div class="dl-plain-prose"><p>A：</p>${q.answer.map(paragraph).join('')}</div></details>`).join('')}</section>`:''}${e.footnotes?.length?`<div class="dl-plain-footnotes">${e.footnotes.map(paragraph).join('')}</div>`:''}</section></details>`;
 app.innerHTML=`<div class="page wt-page dl-page"><div class="page-head archive-section-head"><h1>世界树</h1></div><div class="dl-hero" aria-label="大梁·承梁传题头"><div class="dl-hero-center"><h2>大梁<span>·</span>承梁传</h2></div>${hero.map(([n,era,pos])=>`<div class="dl-hero-portrait dl-${pos}">${imageFor(n)?`<img src="${E(imageFor(n))}" alt="${E(n)}头像" loading="lazy">`:`<span class="dl-portrait-placeholder">${E(n.slice(0,1))}</span>`}<div><strong>${E(n)}</strong><small>${E(era)}</small></div></div>`).join('')}</div>${eras.map(chapter).join('')}</div>`;
 const root=app.querySelector('.dl-page');
 const setBoard=i=>{const g=eras[0]?.groups[i],target=root.querySelector('.dl-board-detail');if(!target||!g)return;root.querySelectorAll('.dl-board-spot').forEach(b=>{const selected=Number(b.dataset.dlBoard)===i;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});target.innerHTML=`<h4>${E(g.name)}</h4><div class="dl-plain-people">${g.people.map(person).join('')}</div>`;};
 root.addEventListener('click',event=>{const b=event.target.closest('[data-dl-board]');if(b)setBoard(Number(b.dataset.dlBoard));});
 setBoard(0);
};

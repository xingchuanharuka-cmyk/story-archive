/* 大梁·承梁传：四纪年资料陈列。所有资料来自作者当前整理，推测与剧情分开标识。 */
window.renderDaliangChronicle=function(app,archive,escapeText){
 const E=escapeText, eras=window.DALIAN_CHRONICLE||[];
 const byName=n=>archive.characters.find(c=>c.name===n);
 const imageFor=n=>n==='赵飞光'?'images/historical/zhaofeiguang.jpg':(byName(n)?.portraitsByWorld?.古代?.[0]||byName(n)?.portrait||'');
 const hero=[['邢怀戎','永安','upper-left'],['赵飞光','崇明','lower-left'],['辜琳琅','承安','upper-right'],['阿史那信','顺宁','lower-right']];
 const highlight=(t,words)=>{let out=E(t);for(const w of words)out=out.split(E(w)).join(`<strong class="dl-quote-emphasis">${E(w)}</strong>`);return out;};
 const boldStory=['天折过一个孩子','皇帝对侄儿疼爱更胜亲子','郡主年长他近20岁，也对他颇为纵容'];
 const paragraph=t=>`<p>${E(t)}</p>`;
 const storyParagraph=(t,isChongming)=>`<p>${isChongming?highlight(t,boldStory):E(t)}</p>`;
 const qaParagraph=t=>`<p>${highlight(t,['契阔'])}</p>`;
 const introduction=(s)=>`<p class="dl-person-description"><span class="dl-intro-label">简介</span><span>${E(s)}</span></p>`;
 const personMarkup=(p,era)=>{const special=era==='chongming'&&p[0]==='赵飞光';const princes=era==='shunning'&&['辜麒（瑞王）','辜煜（恒王）','辜珩（宁王）'].includes(p[0]);return `<article class="dl-person"><h5>${E(p[0])}</h5>${p[1]?(princes?introduction(p[1]):paragraph(p[1])):''}${p[2]?(era==='chongming'&&!special?introduction(p[2]):`<p class="dl-person-description">${E(p[2])}</p>`):''}</article>`;};
 const groupIndex=(g,i,era)=>`<section class="dl-group-index" id="dl-index-${i}"><div class="dl-group-index-head"><h4>${E(g.name)}</h4></div><div class="dl-index-people">${g.people.map(p=>personMarkup(p,era)).join('')}</div></section>`;
 const story=(s,era)=>`<article class="dl-story"><div class="dl-story-head"><h4>${E(s.title)}</h4></div><div class="dl-prose">${s.paragraphs.map(t=>storyParagraph(t,era==='chongming')).join('')}</div></article>`;
 const power=e=>{
 if(e.id==='chongming'){const layout=[{i:0,cls:'r1',label:'皇宫'},{i:1,cls:'r2a',label:'燕王府'},{i:3,cls:'r2b',label:'晴国公府'},{i:5,cls:'r2c',label:'镇国公府'},{i:4,cls:'r3a',label:'丞相府'},{i:2,cls:'r3b',label:'学府'}];return `<div class="dl-map-wrap"><div class="dl-board-map" role="group" aria-label="崇明六方势力分布">${layout.map(({i,cls,label},k)=>`<button type="button" class="dl-board-spot ${cls}" data-dl-board="${i}" aria-label="跳转至${E(label)}"><span class="dl-board-dot" aria-hidden="true"></span><strong>${E(label)}</strong></button>`).join('')}</div></div>`;}
 if(e.id==='yongan')return `<div class="dl-court-grid dl-court-three">${e.groups.map((g,i)=>`<div class="dl-court-panel"><h4>${E(g.name)}</h4><div class="dl-court-people">${g.people.map(p=>`<span>${E(p[0])}</span>`).join('')}</div></div>`).join('')}</div>`;
 if(e.id==='chengan')return `<div class="dl-chengan-structure"><div class="dl-court-grid">${e.groups.map(g=>`<div class="dl-court-panel"><h4>${E(g.name)}</h4><div class="dl-court-people">${g.people.map(p=>`<span>${E(p[0])}</span>`).join('')}</div></div>`).join('')}</div></div>`;
 return `<div class="dl-shunning-structure">${e.groups.map(g=>`<section class="dl-court-panel"><h4>${E(g.name)}</h4><div class="dl-court-people">${g.people.map(p=>`<span>${E(p[0])}</span>`).join('')}</div></section>`).join('')}</div>`;
 };
 const chapter=(e,i)=>`<details class="dl-era-fold dl-era-${E(e.id)}" id="dl-fold-${E(e.id)}" ${i===0?"open":""}><summary class="dl-era-summary"><span class="dl-era-summary-dynasty" aria-hidden="true"></span><strong>${E(e.era)}</strong><span class="dl-era-summary-toggle" aria-hidden="true"></span></summary><section class="dl-chapter" id="dl-${E(e.id)}" aria-labelledby="dl-title-${E(e.id)}"><header class="dl-chapter-head"><div class="dl-chapter-title"><h2 id="dl-title-${E(e.id)}">${E(e.era)}</h2></div><p>当朝皇帝：${E(e.emperor)}</p>${e.intro?`<p>${E(e.intro)}</p>`:''}</header><div class="dl-part-head"><h3>势力分布</h3></div>${power(e)}<div class="dl-index-wrap">${e.groups.map((g,j)=>groupIndex(g,`${e.id}-${j}`,e.id)).join('')}</div><details class="dl-stories-fold"><summary class="dl-stories-summary"><strong>浮沉往事</strong><span class="dl-stories-toggle" aria-hidden="true"></span></summary><div class="dl-stories-body">${e.stories.map(s=>story(s,e.id)).join('')}</div></details>${e.qa?.length?`<div class="dl-qa"><div class="dl-qa-head"><h4>个人推测</h4><p>采用QA的方式呈现，Q也是我之前在游玩的时候思考的问题，引导剧情往这方面跑了一下，结合我跑出来的内容写的A，包含很多我的个人理解。</p></div>${e.qa.map((q,j)=>`<details class="dl-question"><summary><span>Q${j+1}</span>${E(q.q)}</summary><div class="dl-prose">${q.answer.map(qaParagraph).join('')}</div></details>`).join('')}</div>`:''}${e.footnotes?.length?`<div class="dl-footnotes">${e.footnotes.map(paragraph).join('')}</div>`:''}</section></details>`;
 app.innerHTML=`<div class="page wt-page dl-page"><div class="breadcrumb"><a href="#/">HOME</a> / WORLD TREE</div><div class="page-head archive-section-head"><div class="small-label">05 / WORLD TREE</div><h1>世界树</h1><p>四个世界中的人物登场与关联脉络。</p></div><div class="dl-hero" aria-label="大梁·承梁传题头"><div class="dl-hero-center"><h2>大梁<span>·</span>承梁</h2><div class="dl-title-ornaments" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 2 12.7 7.3 18 10 12.7 12.7 10 18 7.3 12.7 2 10 7.3 7.3Z"/></svg><svg class="dl-title-ornament-center" viewBox="0 0 28 22"><path d="M14 18c-4-3-8-3-12-2V4c5-1 9 0 12 3 3-3 7-4 12-3v12c-4-1-8-1-12 2ZM14 7v11M4 19c4-.5 7 .1 10 2 3-1.9 6-2.5 10-2"/></svg><svg viewBox="0 0 20 20"><path d="M10 2 12.7 7.3 18 10 12.7 12.7 10 18 7.3 12.7 2 10 7.3 7.3Z"/></svg></div></div>${hero.map(([n,era,pos])=>`<div class="dl-hero-portrait dl-${pos}">${imageFor(n)?`<img src="${E(imageFor(n))}" alt="${E(n)}角色头像" loading="lazy">`:`<span class="dl-portrait-placeholder" aria-label="${E(n)}头像待补">${E(n.slice(0,1))}</span>`}<div><strong>${E(n)}</strong><small>${E(era)}</small></div></div>`).join('')}</div>${eras.map((e,i)=>`${i===0?'<h2 class="dl-dynasty-heading">大梁</h2>':i===2?'<h2 class="dl-dynasty-heading">承梁</h2>':''}${chapter(e,i)}`).join('')}</div>`;
 const root=app.querySelector('.dl-page');
 root.addEventListener('click',event=>{
  const button=event.target.closest('[data-dl-board]');
  if(!button)return;
  const index=Number(button.dataset.dlBoard);
  const target=root.querySelector(`#dl-index-chongming-${index}`);
  if(target){target.scrollIntoView({behavior:'smooth',block:'start'});}
 });
};

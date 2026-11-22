/* 世界树：由现有档案与关系图派生，不修改原始设定。 */
window.renderWorldTree=function(app,D,esc,href,characterOrder){
 const worlds=D.worlds, colors=['#69889b','#ae8d64','#738e7e','#9184a2'];
 const chars=D.characters.filter(c=>c.kind==='char');
 const appearances=c=> (c.appearances||[]).filter(a=>worlds.includes(a.source.split('·')[0]));
 const cross=chars.filter(c=>new Set(appearances(c).map(a=>a.source.split('·')[0])).size>1);
 cross.sort((a,b)=>(a.name==='黎奖'?-1:b.name==='黎奖'?1:0));
 const roleOverrides={'宋知世@修真':'原书男主','宋知世@末世':'七杀','水俱雅@修真':'妖王','乔治@现代':'暮城职员/偶像练习生','乔治@古代':'赵飞光外甥','乔治@修真':'合欢宗修士','赵飞光@现代':'空军少校','赵飞光@古代':'燕世子',
 '邢怀戎@古代':'大梁朝镇北军统帅',
 '阿史那信@古代':'承梁马奴/北塞皇子（下毒哥）',
 '雷止@现代':'赛车手',
 '贝瑞旻@现代':'港城贝家长子（金主哥）',
 '贝瑞恩@现代':'港城贝家二少',
 '宋潮@现代':'港城船王',
 '达一别@现代':'音乐制作人+歌手',
 '麦见海@现代':'港城大学建筑系大二、学生会会长',
 '纪扬@现代':'唱作歌手、乐坛天王',
 '柊尘@现代':'游戏主美',
 '谢满@现代':'一中学生',
 '北向南@现代':'华海大学海洋科学系大三',
 '荀逸伦@现代':'华海大学海洋科学系大三',
 '车以弦@现代':'Lunaris香水公司创始人',
 '西杀@现代':'财阀继承人',
 '阴琢@现代':'大学生/继承人',
 '楼宴宁@修真':'青云宗首席',
 '黎奖@现代':'港城大学土木系大三',
 '求渺@现代':'天体物理专业学生',
 '宋知世@修真':'原书男主、藏鹤楼外门弟子、鬼修',
 '辜麒@现代':'辜家假少爷（奢侈品哥）'};
 const nodes=[], edges=[]; const key=(c,w)=>c.id+'@'+w;
 // 仅依据档案中本人已出的角色卡（主场）标注所属世界；同一 char 可能有多张卡。
 const hasOwnCard=(c,w)=>appearances(c).some(a=>a.source===w+'·'+c.name && a.role?.includes('主场'));
 cross.forEach((c,i)=>{let prev=null;worlds.forEach((w,j)=>{const records=appearances(c).filter(a=>a.source.startsWith(w+'·'));if(!records.length)return;const n={id:key(c,w),c,w,records,x:125+j*250,y:115+i*106};nodes.push(n);if(prev)edges.push({a:prev.id,b:n.id,type:'cross',label:'跨世界登场'});prev=n;});});
 for(const w of worlds){for(const e of window.ARCHIVE_GRAPH?.worlds?.[w]?.edges||[]){const a=nodes.find(n=>n.w===w&&n.c.name===e.fromName),b=nodes.find(n=>n.w===w&&n.c.name===e.toName);if(a&&b)edges.push({a:a.id,b:b.id,type:'local',label:e.label,direction:e.direction});}}
 const single=['古代','现代','修真','末世'].flatMap(w=>(characterOrder[w]||[]).map(name=>chars.find(c=>c.name===name)).filter(c=>c&&!cross.includes(c)).map(c=>({c,w}))).filter((item,i,arr)=>arr.findIndex(x=>x.c.id===item.c.id)===i);
 single.forEach(({c,w},i)=>{const j=worlds.indexOf(w);nodes.push({id:key(c,w),c,w,records:appearances(c).filter(a=>a.source.startsWith(w+'·')),x:125+j*250,y:115+(cross.length+i)*106});});
 const allNodes=chars.flatMap(c=>worlds.filter(w=>w===c.world||appearances(c).some(a=>a.source.startsWith(w+'·'))||(window.ARCHIVE_GRAPH?.worlds?.[w]?.edges||[]).some(e=>e.fromName===c.name||e.toName===c.name)).map(w=>({id:key(c,w),c,w,records:appearances(c).filter(a=>a.source.startsWith(w+'·'))})));
 const get=id=>nodes.find(n=>n.id===id)||allNodes.find(n=>n.id===id);let focus=null;const height=155+(cross.length+single.length)*106;
 const related=n=>{const result=new Map();for(const w of worlds){for(const e of window.ARCHIVE_GRAPH?.worlds?.[w]?.edges||[]){const other=e.fromName===n.c.name?e.toName:e.toName===n.c.name?e.fromName:null;if(!other||other===n.c.name)continue;const c=chars.find(c=>c.name===other);if(!c)continue;let r=result.get(c.id);if(!r){r={c,w,id:key(c,w),links:[]};result.set(c.id,r);}if(w===n.w){r.w=w;r.id=key(c,w);}r.links.push({w,label:e.label});}}return [...result.values()];};
 const zoomBar=(target)=>`<div class="wt-zoom" aria-label="图谱缩放"><button type="button" data-wt-zoom="out" data-wt-target="${target}" aria-label="缩小">−</button><span data-wt-percent="${target}" aria-live="polite"></span><button type="button" data-wt-zoom="in" data-wt-target="${target}" aria-label="放大">＋</button><button type="button" data-wt-zoom="fit" data-wt-target="${target}">适应宽度</button></div>`;
 const zoomState={};
 function resizeZoom(target,action='initial'){
  const viewport=root.querySelector(`[data-wt-viewport="${target}"]`);if(!viewport)return;
  const stage=viewport.firstElementChild,canvas=stage.firstElementChild,W=Number(stage.dataset.width),H=Number(stage.dataset.height),available=viewport.clientWidth;
  if(!available)return;
  const fit=Math.min(1,available/W),old=zoomState[target]?.scale||fit;
  let scale=action==='initial'||action==='fit'?fit:action==='in'?old*1.25:action==='out'?old/1.25:old;
  scale=Math.max(Math.min(fit,.25),Math.min(2.5,scale));zoomState[target]={scale};
  const left=viewport.scrollLeft,top=viewport.scrollTop;
  stage.style.width=`${W*scale}px`;stage.style.height=`${H*scale}px`;canvas.style.width=`${W}px`;canvas.style.height=`${H}px`;canvas.style.transform=`scale(${scale})`;
  const percent=root.querySelector(`[data-wt-percent="${target}"]`);if(percent)percent.textContent=Math.round(scale*100)+'%';
  if(action==='fit'||action==='initial'){viewport.scrollLeft=0;viewport.scrollTop=0;}else{viewport.scrollLeft=left*scale/old;viewport.scrollTop=top*scale/old;}
 }
 const portraitFor=(c,w)=>c.portraitsByWorld?.[w]?.[0]||c.portrait;
 const avatar=(c,w)=>{const src=portraitFor(c,w);return `<span class="wt-avatar" style="--wt-color:${esc(c.color)}">${src?`<img src="${esc(src)}" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${esc(c.name)}</span>`:`<span>${esc(c.name)}</span>`}</span>`;};
 app.innerHTML=`<div class="page wt-page"><div class="breadcrumb"><a href="#/">HOME</a> / WORLD TREE</div><div class="page-head archive-section-head"><div class="small-label">05 / WORLD TREE</div><h1>世界树</h1><p>四个世界中的人物登场与关联脉络。</p></div><div class="wt-toolbar"><span class="wt-legend"><i></i> 跨世界登场</span>${zoomBar('long')}</div><p class="wt-note">点击姓名展开角色关系星图。横向排列仅用于世界分类，不代表时间顺序。带标记的节点表示该角色已发布角色卡的所属世界。</p><div class="wt-scroll" data-wt-viewport="long" tabindex="0" aria-label="四世界角色长卷，可横向滚动"><div class="wt-zoom-stage" data-width="1000" data-height="${height}"><div class="wt-canvas" style="aspect-ratio:1000/${height}"><svg class="wt-lines" viewBox="0 0 1000 ${height}" aria-hidden="true"></svg><div class="wt-nodes"></div></div></div></div><dialog class="wt-dialog" aria-labelledby="wt-title"><div class="wt-modal-head"><div><div class="small-label">CHARACTER / RELATIONS</div><h2 id="wt-title"></h2></div><button class="wt-close" aria-label="关闭关系星图">×</button></div><div class="wt-modal-content"></div></dialog></div>`;
 const root=app.querySelector('.wt-page'),svg=root.querySelector('.wt-lines'),layer=root.querySelector('.wt-nodes'),dialog=root.querySelector('dialog');let previous=null;
 function draw(){svg.innerHTML=worlds.map((w,j)=>`<rect x="${j*250+8}" y="8" width="234" height="${height-16}" rx="5" fill="${colors[j]}" fill-opacity=".055"/><path d="M${j*250+125} 65 V${height-25}" stroke="${colors[j]}" stroke-opacity=".13" stroke-dasharray="2 7"/>`).join('')+edges.filter(e=>e.type==='cross').map(e=>{const a=get(e.a),b=get(e.b),local=e.type==='local';let path=local?`M${a.x} ${a.y} C${a.x+100} ${a.y},${b.x+100} ${b.y},${b.x} ${b.y}`:`M${a.x} ${a.y} C${(a.x+b.x)/2} ${a.y},${(a.x+b.x)/2} ${b.y},${b.x} ${b.y}`;return `<path d="${path}" fill="none" stroke="${local?'#8799a0':a.c.color}" stroke-width="${local?1.1:1.7}" stroke-opacity="${local?.5:.55}" ${local?'stroke-dasharray="4 5"':''}/>`}).join('');
 layer.innerHTML=worlds.map((w,j)=>`<div class="wt-world" style="left:${12.5+j*25}%;color:${colors[j]}">${esc(w)}<small>${['MODERN','HISTORICAL','CULTIVATION','APOCALYPSE'][j]}</small></div>`).join('')+nodes.map(n=>`<button class="wt-node ${hasOwnCard(n.c,n.w)?'wt-own-card':''}" data-wt-node="${esc(n.id)}" style="left:${n.x/10}%;top:${n.y/height*100}%;--wt-color:${esc(n.c.color)}" aria-label="${esc(n.w+'·'+n.c.name)}，查看关联"><strong>${esc(n.c.name)}</strong><small>${esc(roleOverrides[n.c.name+'@'+n.w]||n.records[0]?.role?.replace('（主场）','')||(cross.includes(n.c)&&n.records[0]?n.records[0].source.split('·')[1]+'卡登场':n.c.identity)||'')}</small></button>`).join('');}
 function open(id){focus=id;const n=get(id);if(!n)return;const rs=related(n),dense=rs.length>6,W=dense?760:600,H=dense?660:440,cx=W/2,cy=H/2;
 root.querySelector('#wt-title').textContent=n.w+' · '+n.c.name;
 const positions=rs.map((r,i)=>{let ring=dense&&i>=5?1:0, count=dense?(ring?rs.length-5:5):rs.length, index=ring?i-5:i, angle=-Math.PI/2+2*Math.PI*index/count+(ring?Math.PI/count:0),rx=dense?(ring?300:155):220,ry=dense?(ring?250:135):145;return {r,x:cx+rx*Math.cos(angle),y:cy+ry*Math.sin(angle)};});
 const label=r=>r.links.map(l=>l.w+' · '+l.label).join(' / ');
 root.querySelector('.wt-modal-content').innerHTML=`<div class="wt-star-section">${zoomBar('star')}<div class="wt-star-wrap" data-wt-viewport="star" tabindex="0" aria-label="角色关系星图，可滑动"><div class="wt-zoom-stage" data-width="${W}" data-height="${H}"><div class="wt-star ${dense?'wt-star-dense':''}" style="aspect-ratio:${W}/${H};--wt-star-width:${W}px"><svg viewBox="0 0 ${W} ${H}" aria-hidden="true">${!dense&&rs.length?`<ellipse cx="${cx}" cy="${cy}" rx="220" ry="145" fill="none" stroke="#acbcc0" stroke-dasharray="2 6"/>`:''}${positions.map(p=>`<path d="M${cx} ${cy} L${p.x} ${p.y}" stroke="${esc(p.r.c.color)}" stroke-opacity=".45" stroke-width="1.3"/>`).join('')}</svg><div class="wt-star-center" style="--wt-color:${esc(n.c.color)}">${avatar(n.c,n.w)}</div>${positions.map(p=>`<button class="wt-star-node wt-person-node" data-wt-node="${esc(p.r.id)}" style="left:${p.x/W*100}%;top:${p.y/H*100}%;--wt-color:${esc(p.r.c.color)}" title="${esc(label(p.r))}">${avatar(p.r.c,p.r.w)}<strong>${esc(p.r.c.name)}</strong><small>${esc([...new Set(p.r.links.map(l=>l.label))].join(' / '))}</small></button>`).join('')}${!rs.length?'<p class="wt-empty">暂无已收录的其他角色关联</p>':''}</div></div></div></div><div class="wt-detail"><div class="wt-detail-top"><span class="small-label">APPEARANCES / 登场记录</span><a href="${href(n.c.id,n.w)}">人物档案 ↗</a></div>${n.records.map(a=>`<details><summary>${esc(a.source)}${a.role?' · '+esc(a.role):''}</summary><p>${esc(a.text||'暂无补充文字。')}</p></details>`).join('')}<h3>关联索引</h3>${rs.map(r=>`<div class="wt-relation"><button data-wt-node="${esc(r.id)}" style="color:${esc(r.c.color)}">${esc(r.c.name)} ↗</button><span>${esc(label(r))}</span></div>`).join('')}</div>`;
 if(!dialog.open){previous=document.activeElement;dialog.showModal();}resizeZoom('star');dialog.scrollTop=0;root.querySelector('.wt-close').focus();}
 root.addEventListener('click',e=>{const z=e.target.closest('[data-wt-zoom]');if(z){resizeZoom(z.dataset.wtTarget,z.dataset.wtZoom);return;}const n=e.target.closest('[data-wt-node]');if(n){open(n.dataset.wtNode);return;}if(e.target.closest('.wt-close')||e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>{focus=null;previous?.focus();});draw();resizeZoom('long');const observer=new ResizeObserver(()=>{if(!root.isConnected){observer.disconnect();return;}if(zoomState.long?.scale)resizeZoom('long','keep');if(dialog.open&&zoomState.star?.scale)resizeZoom('star','keep');});observer.observe(root);
};

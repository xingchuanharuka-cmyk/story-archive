/* 状态栏考据：按人物档案世界观及顺序排列，未核实的来源不作确定性断言。 */
window.ARCHIVE_STATUS = (() => {
  const esc = s => String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const groups = [
    {world:'现代',entries:[
      ['黎奖',[['爱上我最刺激吗','引用：出自吴雨霏《狠狠》歌词'],['我拒认 这伟大','引用：出自《借过一下 粤语版》歌词（演唱：Syatanka／心之洛）']]],
      ['雷止',[['加速直至快过上帝'],['砰。']]],
      ['贝瑞旻',[['怎样才算圆满'],['如我所见','可能引用：出自《明日方舟》2021年推出的故事集《如我所见》（Vigilo）。']]],
      ['贝瑞恩',[['惹到user你算踢到铁板了'],['奖励ryan好感归零']]],
      ['宋潮',[['随时能欢喜','引用：出自陈奕迅《失忆蝴蝶》歌词'],['你我山前没相见','引用：出自宋冬野《郭源潮》歌词']]],
      ['辜麒',[['你要放弃我吗'],['我们逃跑吧。']]],
      ['达一别',[['滴朋友卡'],['骨中钉']]],
      ['乔治',[['我一直因你心动'],['维纳斯困境']]],
      ['麦见海',[['因缘际会如露似电','化用：对应佛教经典《金刚经》第三十二品《应化非真分》。\n原文：一切有为法，如梦幻泡影，如露亦如电，应作如是观。'],['然生你我骨朽丝缠']]],
      ['纪扬',[['你要让时间怎么转','引用：出自郑润泽《瞬》歌词']]],
      ['柊尘',[['想要成为你的恋人','引用：歌曲名《貴方の恋人になりたい（想成为你的恋人）》，演唱：チョーキューメイ（ChoQMay）'],['别勾引我老婆']]],
      ['谢满',[['若皆是镜花水月','可能化用：沈以诚《椿》歌词“若皆是一场镜花水月”，状态栏省略了“一场”。'],['我不会放过你']]]
    ]},
    {world:'古代',entries:[
      ['辜琳琅',[['若流芳千古','引用：两句都出自阿兰《千古》歌词'],['爱的人却反目','引用：两句都出自阿兰《千古》歌词']]],
      ['邢怀戎',[['心悦君兮','出处：《越人歌》，见西汉刘向《说苑·善说》。'],['浮生杂记']]],
      ['阿史那信',[['他们养温顺的狼','引用：两句都出自犬儒乐队《皮囊》歌词（主唱：腾龙）'],['庇护吃人的绵羊','引用：两句都出自犬儒乐队《皮囊》歌词（主唱：腾龙）']]]
    ]},
    {world:'修真',entries:[
      ['黎奖',[['情字轻易被分拆','引用：出自任舒瞳《逍遥》歌词'],['我拒认 这伟大','引用：出自《借过一下 粤语版》歌词（演唱：Syatanka／心之洛）']]],
      ['宋知世',[['我们没有来生'],['明朝会','可能来源（？）：“明朝会”是吴语中的日常道别语，上海话中可以直接使用，意思是“明天见”。']]],
      ['楼宴宁',[['是非对错我已无心分辨','引用：出自《虹猫蓝兔七侠传》中虹猫的台词“蓝兔既死，是非对错我已无心分辨”。'],['还给我。']]],
      ['水俱雅',[['都是镜花水月呦','引用：出自鬼卞《佳人》歌词'],['缘起缘灭']]],
      ['北朔',[['当恩怨各一半','引用：出自许嵩《天龙八部之宿敌》歌词'],['何必笑我','引用（可能）：出自言和《冠世一战》歌词']]]
    ]},
    {world:'末世',entries:[
      ['求渺',[['梦里通天塔','引用：出自薛之谦《动物世界》歌词'],['THE DAY IS MINE','引用：出自塞壬唱片-MSR《Operation Blade》歌词'],['都在自寻烦恼','引用：出自林俊杰《新地球》歌词']]]
    ]}
  ];
  const lookup = new Map(window.ARCHIVE_DATA.characters.filter(c=>c.kind==='char').map(c=>[c.name,c]));
  function renderEntry(name, statuses, world){
    const c=lookup.get(name);if(!c)return '';
    const portrait=c.portraitsByWorld?.[world]?.[0] || (world==='修真'&&name==='黎奖'?'images/cultivation/lijiang.jpg':c.portrait);
    return `<article class="status-person" style="--status-color:${esc(c.color||'#547080')}"><div class="status-person-head"><img src="${esc(portrait||'')}" alt="${esc(name)}头像" loading="lazy" onerror="this.style.display='none'"><h3>${esc(name)}</h3></div><div class="status-quote-list">${statuses.map(([line,source])=>`<div class="status-quote"><div class="status-quote-text">${esc(line)}</div>${source?`<p class="status-quote-source">${esc(source).replace(/\n/g,'<br>')}</p>`:''}</div>`).join('')}</div></article>`;
  }
  return {render:()=>`<section class="research-status"><div class="status-heading"><span class="research-topic-eyebrow">05 / STATUS STUDIES</span><h2>状态栏考据</h2></div>${groups.map(g=>`<section class="status-world"><div class="status-world-heading"><span>${esc(g.world)}</span><small>${esc(({现代:'MODERN',古代:'HISTORICAL',修真:'CULTIVATION',末世:'APOCALYPSE'})[g.world])}</small></div><div class="status-people">${g.entries.map(([name,entries])=>renderEntry(name,entries,g.world)).join('')}</div></section>`).join('')}</section>`};
})();

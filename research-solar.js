/* 太阳星：赵飞光典故考据；所载引文与分析来自作者提交的文字。 */
window.ARCHIVE_SOLAR = (() => {
  const E = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const p = s => `<p>${E(s)}</p>`;
  const h = s => `<h3 class="research-subhead">${E(s)}</h3>`;
  // 带数字编号的三级小标题不加任何括号；无编号的标题保留原有【】。
  const h4 = s => {
    const title = /^(?:[【\[(（]\s*)?\d+[.．、]/.test(s)
      ? s.replace(/^[【\[(（]\s*/, '').replace(/\s*[】\])）]$/, '')
      : s;
    return `<h4 class="research-minihead">${E(title)}</h4>`;
  };
  const q = (s,from) => `<blockquote class="research-source-quote"><p>${E(s)}</p>${from?`<cite>${E(from)}</cite>`:''}</blockquote>`;
  const desc = (a,b) => `<p class="research-feature"><strong>${E(a)}</strong>${E(b)}</p>`;
  const source = s => `<p class="research-citation">${E(s)}</p>`;
  const accordion = (num,title,body) => `<details class="research-accordion" ${num==='01'?'open':''}><summary><span class="research-accordion-number">${num}</span><span class="research-accordion-title">${E(title)}</span><span class="research-accordion-icon" aria-hidden="true">＋</span></summary><div class="research-accordion-body">${body}</div></details>`;
  const overview = [
    h('一、太阳：权贵、光明与施予'),
    desc('传统记载：','《紫微斗数全书》称太阳星为“日之精”，五行属火，主贵气、官禄，具有文武皆宜的性质。古籍又以“慈爱量宽大”描述太阳的性情，并根据其所在宫位区分初升、升殿、日丽中天及失辉等不同状态。'),
    desc('后世延伸：','王亭之在《中州派紫微斗数深造讲义》中强调，太阳以发射光和热为主要特性，因此具有声名、贵显及“施而不受”的性质。同时提出太阳“主贵不主富”，并认为太阳的光芒并非越强越好，需要结合宫位、星曜组合及中和原则判断。'),
    h4('主要特征：'),
    desc('权贵与声名：','传统命理以太阳为官禄之主，与地位、名誉、权柄及事业发展有关。后世进一步强调其重名声、重贵显的性质。'),
    desc('慈爱与施予：','古籍记载太阳具有慈爱、宽厚的性质。王亭之则从太阳向外发射光热的特点出发，提出“施而不受”的解释，强调付出与施予。'),
    desc('光明与显晦：','太阳的性质与所处宫位密切相关。初升、日中、西没及失辉等不同状态，在传统命理中有不同评价。'),
    desc('忠直与原则：','古籍以“忠鲠”描述太阳守身命时的性质，涉及忠诚、耿直等特点。但这不等于太阳命格必然正直，也不能脱离具体宫位和星曜组合判断。'),
    desc('外放与耗散：','王亭之认为太阳具有向外发散的性质。当光热过盛时，反而可能出现过度耗散、欠缺沉实等问题，因此强调适度与中和。'),
    p('概括：太阳以权贵、官禄、慈爱为传统核心，后世进一步强调其声名、施予及光热外放的性质。与其他星曜相比，太阳尤其重视庙旺失辉及星曜组合的影响，其光芒并非越强越好。')
  ].join('');
  const originals = [
    p('原文主要出自《紫微斗数全书》卷一《诸星问答论·问太阳所主若何》。'),
    h4('【太阳的基本性质】'),
    p('原文：'),
    q('太阳星属火，日之精也。\n在数主人有贵气，能为文为武。','《紫微斗数全书》卷一《问太阳所主若何》。'),
    desc('“属火”：','太阳的五行属性为火。'),
    desc('“主人有贵气”：','古籍赋予太阳贵显的性质。'),
    desc('“能为文为武”：','太阳并非仅与文职有关，也可以在特定命理条件下涉及武职。'),
    desc('“官禄之枢机”：','古籍将太阳视为与官禄、事业和社会地位密切相关的重要星曜。'),
    p('赵飞光身份显贵，出身宗室，是燕王世子、当朝皇帝的侄子。十六岁时领兵收复南山，凭借军功引起朝野瞩目。'),
    h4('【太阳的性情】'),
    p('原文：'),
    q('守人身命，主人忠鲠，不较是非。','《紫微斗数全书》卷一《问太阳所主若何》，希夷先生曰。'),
    p('原文解释：'),
    desc('“守人身命”：','太阳位于命宫或身宫。'),
    desc('“忠鲠”：','忠诚耿直。“鲠”有刚直、不阿附的含义。'),
    desc('“不较是非”：','这里不宜直接理解为没有是非观念，更接近不斤斤计较、不过分争竞的意思。'),
    h4('【太阳的庙旺与失辉】'),
    source('原文出处：《紫微斗数全书》卷一《问太阳所主若何》，玉蟾先生曰。'),
    p('原文根据太阳所在宫位，将其划分为不同状态：'),
    desc('“初升”：','寅、卯宫。'),
    desc('“升殿”：','辰、巳宫。'),
    desc('“日丽中天”：','午宫。'),
    desc('“偏垣”：','未、申宫。'),
    desc('“西没”：','酉宫。'),
    desc('“失辉”：','戌、亥、子宫。'),
    p('原文解释：'),
    desc('初升：','太阳刚刚升起，光芒逐渐增强。'),
    desc('升殿：','太阳进一步升高，在传统命理中属于较有利的状态。'),
    desc('日丽中天：','太阳运行至正午，光芒强盛。古籍对此有较高评价。'),
    desc('偏垣：','太阳已经偏离正中位置。古籍将其与做事先勤后惰等判断联系起来。'),
    desc('西没：','太阳逐渐落下。古籍以贵而不显、才能难以充分发挥等情况加以描述。'),
    desc('失辉：','太阳失去光辉。古籍认为这一状态较为不利，尤其在遇到巨门等星曜时，另有劳碌、困顿等判断。'),
    q('巨门不相犯，升殿承君恩。','《紫微斗数全书》卷一《问太阳所主若何》。'),
    p('皇帝对赵飞光的疼爱甚至超过亲子，并曾亲自教他射箭。'),
    h4('【太阳与其他星曜的关系】'),
    source('原文出处：《紫微斗数全书》卷一《问太阳所主若何》。'),
    p('古籍特别重视太阳与以下星曜的关系：'),
    desc('太阴：','古籍对太阳与太阴形成有利组合给予正面评价，涉及富贵、贵显等判断。'),
    desc('巨门：','古籍称巨门为“巨暗”，并将其列为太阳需要注意的星曜。尤其在太阳失辉等条件下，可能产生不利判断。'),
    desc('左辅、右弼：','古籍认为太阳得到辅弼等吉曜相助时，有利于其贵显性质的发挥。'),
    desc('禄存：','与财禄有关，但古籍也指出，即使太阳与禄存同宫，仍可能需要付出较多辛劳。')
  ].join('');
  const nameSword = [
    h('赵飞光的佩剑：“蔽日”'),
    h4('1. 战争意象'),
    q('旌蔽日兮敌若云，矢交坠兮士争先。','屈原《楚辞·九歌·国殇》。'),
    p('原文描绘了旌旗蔽日、敌军密集、将士争先奋战的战场景象。'),
    p('赵飞光的小传《南山月》中，他十六岁领兵收复失地，将战旗重新插回故土。'),
    h4('2. 政治遮蔽意象'),
    q('总为浮云能蔽日，长安不见使人愁。','李白《登金陵凤凰台》。'),
    q('故邪臣之蔽贤，犹浮云之鄣日月也。','《新语·慎微》。'),
    p('古典文学与政治论述中，浮云遮日可以被用于表现贤才受到阻隔、政治上的蒙蔽等主题。'),
    p('赵飞光出身皇室，又因军功获得声望，逐渐成为可能威胁皇权的人物。'),
    h('赵飞光的“飞光”'),
    q('飞光，飞光，劝尔一杯酒。唯见月寒日暖，来煎人寿。','李贺《苦昼短》。'),
    p('“飞光”在诗中指飞逝的时光，与日月运行、生命短暂有关。')
  ].join('');
  const hero = `<div class="research-topic-hero research-solar-hero"><div class="research-topic-eyebrow">CLASSICAL ALLUSIONS / 紫微斗数</div><div class="research-topic-decoration" aria-hidden="true">✧　✦　✧</div><h2>太阳星</h2><div class="research-portrait-row"><div class="research-portrait-person" style="--person-color:#368268"><div class="research-portrait-ring"><img src="images/historical/zhaofeiguang.jpg" alt="赵飞光头像" loading="lazy" onerror="this.style.opacity=0"></div><span class="research-person-name">赵飞光</span><span class="research-cross-star" aria-hidden="true">✦</span><div class="research-star-name">太阳</div></div></div></div>`;
  return {render:()=>`<section class="research-solar">${hero}<div class="research-accordion-list">${accordion('01','太阳星·设定概览',overview)}${accordion('02','原文参考',originals)}${accordion('03','蔽日与飞光',nameSword)}</div></section>`};
})();

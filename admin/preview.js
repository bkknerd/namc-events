/* Live previews for the NAMC-WI content manager. Loads after Decap CMS. */
(function(){
 if(!window.CMS||!window.h||!window.createClass)return;
 var h=window.h,make=window.createClass;
 CMS.registerPreviewStyle('/admin/preview.css');
 var TOK={},subs=[];
 function money(n){return '$'+Number(n).toLocaleString('en-US')}
 function cd(ms,o){return new Date(ms).toLocaleDateString('en-US',Object.assign({timeZone:'America/Chicago'},o))}
 function loadTokens(){
  if(!window.fetch)return;
  Promise.all(['tickets','sponsors','pricing','speakers'].map(function(n){return fetch('/content/'+n+'.json',{cache:'no-cache'}).then(function(r){return r.json()})})).then(function(a){
   var tk=a[0].tickets,tr=a[1].tiers,pr=a[2],kn=a[3].keynote,t={};
   tk.forEach(function(x){t['tk.'+x.id]=money(x.price)});tr.forEach(function(x){t['p.'+x.id]=money(x.price)});
   var sp=tr.filter(function(x){return x.kind==='Sponsor'}).map(function(x){return +x.price});t.tmin=money(Math.min.apply(0,sp));t.tmax=money(Math.max.apply(0,sp));
   var eb=tk.filter(function(x){return x.id==='eb'})[0],sd=tk.filter(function(x){return x.id==='std'})[0];
   if(eb){var s=Date.parse(eb.opens),e=Date.parse(eb.closes);t.ebStart=cd(s,{month:'long',day:'numeric'});t.ebStartS=cd(s,{month:'short',day:'numeric'});t.ebEnd=cd(e,{month:'long',day:'numeric',year:'numeric'});t.ebOpen=cd(s,{month:'long',day:'numeric',year:'numeric'})}
   if(sd){t.stdStart=cd(Date.parse(sd.opens),{month:'long',day:'numeric'});t.stdEnd=cd(Date.parse(sd.closes),{month:'long',day:'numeric',year:'numeric'})}
   t.hotel='$'+pr.hotel_rate;var ap=pr.ads.map(function(x){return +String(x.price).replace(/[^0-9.]/g,'')}).filter(Boolean);t.adFrom=money(Math.min.apply(0,ap));
   t['k.name']=kn.name;t['k.NAME']=kn.name.toUpperCase();t['k.title']=kn.title;t['k.org']=kn.org;t['k.short']=kn.short_org;
   TOK=t;subs.forEach(function(f){f()})}).catch(function(){})}
 loadTokens();
 function T(x){return String(x==null?'':x).replace(/\{\{([^}]+)\}\}/g,function(m,k){return TOK[k]!==undefined?TOK[k]:m})}
 function img(props,p){if(!p)return '';var a=props.getAsset&&props.getAsset(p),s=a&&a.toString?a.toString():'';return s||p}
 function data(props){var d=props.entry.get('data');return d&&d.toJS?d.toJS():{}}
 function lines(a){var out=[];(a||[]).forEach(function(x,i){if(i)out.push(h('br',{key:'b'+i}));out.push(x)});return out}
 function Page(extra){return make({getInitialState:function(){return{}},componentDidMount:function(){var me=this;subs.push(function(){me.forceUpdate&&me.forceUpdate()})},render:function(){return h('div',{className:'pv'},extra.call(this,data(this.props),this.props))}})}
 var list=function(a,f){return (a||[]).map(function(x,i){return f(x,i)})};

 CMS.registerPreviewTemplate('home',Page(function(d,p){
  var hero=d.hero||{},side=d.side||{},wm=d.why_milwaukee||{},nums=d.numbers||{},wp=d.why_partner||{},q=d.quote||{},fm=d.forum||{},cta=d.cta||{},im=d.images||{};
  return [
   h('p',{className:'note',key:'n'},'Preview: a simplified view of the home page. Photos and exact spacing are on the live site.'),
   h('div',{className:'tile',key:'hero'},h('p',{className:'kick'},T(hero.kicker)),h('h1',null,lines(hero.title_lines)),h('div',{className:'theme'},h('b',null,T(hero.theme_label)),h('b',null,T(hero.theme_title)),h('span',null,T(hero.theme_line_1)),h('span',null,T(hero.theme_line_2)))),
   h('div',{className:'red',key:'side'},h('p',{className:'lab',style:{color:'#f3eee4'}},T(side.badge)),h('h2',null,T(side.heading)),list(side.paths,function(x,i){return h('div',{className:'path',key:i},h('b',null,T(x.name)),h('small',null,T(x.desc)),h('em',null,T(x.detail||'(Early Bird price and dates appear here automatically)')))})),
   im.hotel?h('img',{className:'photo',key:'ph',src:img(p,im.hotel),alt:T(im.hotel_alt),style:{maxHeight:'180px',objectFit:'cover',width:'100%'}}):null,
   h('div',{className:'gold',key:'wm'},h('p',{className:'lab',style:{color:'#0e2238'}},T(wm.label)),h('h2',null,lines(wm.heading_lines)),list(wm.items,function(x,i){return h('div',{className:'row',key:i},h('b',null,T(x.title)),T(x.text))})),
   h('div',{className:'card',key:'nums'},h('p',{className:'lab'},T(nums.label)),h('div',{className:'grid'},list(nums.items,function(x,i){return h('div',{key:i},h('div',{className:'stat'},T(x.value)),h('div',null,T(x.label)))}))),
   h('div',{key:'wp'},h('h2',{style:{fontSize:'2.2rem',marginBottom:'6px'}},T(wp.heading)),h('p',null,T(wp.intro)),h('div',{className:'grid'},list(wp.cards,function(x,i){return h('div',{className:'card',key:i,style:{borderTop:'3px solid #8c181c'}},h('h3',null,T(x.title)),h('p',{style:{margin:'6px 0 0'}},T(x.text)))}))),
   h('div',{className:'quote',key:'q'},h('p',null,T(q.text)),h('b',null,T(q.attribution))),
   h('div',{className:'band',key:'fm'},h('p',{className:'kick'},T(fm.label)),h('h3',null,T(fm.heading)),h('p',{style:{margin:'8px 0 0'}},'Button: ',h('b',null,T(fm.button)))),
   h('div',{className:'band',key:'cta',style:{background:'#0e2238'}},h('p',{className:'kick'},T(cta.label)),h('h3',null,lines(cta.heading_lines)))]}));

 CMS.registerPreviewTemplate('tickets',Page(function(d){return list(d.tickets,function(t,i){return h('div',{className:'card',key:i},h('p',{className:'lab'},T(t.label)),h('h3',null,T(t.name)),h('div',{className:'price'},money(t.price||0)),h('p',null,T(t.includes)))})}));

 CMS.registerPreviewTemplate('sponsors',Page(function(d){return h('div',{className:'grid'},list(d.tiers,function(t,i){return h('div',{className:'card tier t-'+t.id,key:i},h('p',{className:'lab',style:{color:'inherit',opacity:.8}},t.kind),h('h3',null,T(t.name)+' '+money(t.price||0)),h('p',null,T(t.highlight)),h('ul',null,list(t.benefits,function(b,j){return h('li',{key:j},T(b))})))}))}));

 CMS.registerPreviewTemplate('speakers',Page(function(d,p){var k=d.keynote||{};return [
  h('div',{className:'kn',key:'k'},k.photo?h('img',{className:'ring',src:img(p,k.photo),alt:''}):null,h('div',null,h('p',{className:'lab'},'2027 keynote speaker'),h('h2',null,T(k.name).toUpperCase()),h('p',{style:{margin:'8px 0 0'}},T(k.title)),h('p',{className:'note',style:{margin:'8px 0 0'}},(k.bio||[]).length+' bio paragraph(s)'))),
  h('div',{className:'grid',key:'f'},list(d.featured,function(f,i){return h('div',{className:'card',key:i,style:{textAlign:'center'}},f.photo?h('img',{className:'ring',style:{margin:'0 auto 10px'},src:img(p,f.photo),alt:''}):null,h('h3',null,T(f.name)))}))]}));

 CMS.registerPreviewTemplate('partners',Page(function(d,p){
  function strip(title,link,items,k){return h('div',{className:'strip',key:k},h('p',{className:'lab'},T(title)+(link?'  ·  link: '+T(link):'')),h('div',{className:'tiles'},list(items,function(x,i){return h('div',{className:'tilelogo'+(x.open_slot?' slot':''),key:i},x.logo?h('img',{src:img(p,x.logo),alt:T(x.name)}):h('b',null,T(x.name)),h('small',null,T(x.caption)))})))}
  return [strip(d.top_title,d.top_link_label,d.top,'t'),strip(d.regular_title,d.regular_link_label,d.regular,'r')]}));

 CMS.registerPreviewTemplate('faq',Page(function(d){return list(d.items,function(q,i){return h('div',{className:'card',key:i},h('h3',{style:{fontSize:'1.5rem'}},T(q.question)),h('p',{style:{margin:'6px 0 0'}},T(q.answer)))})}));

 CMS.registerPreviewTemplate('program',Page(function(d){return list(d.items,function(x,i){return h('div',{className:'card',key:i},h('h3',null,T(x.title)),h('p',{style:{margin:'4px 0',fontWeight:600}},T(x.summary)),h('p',{style:{margin:'0 0 6px'}},T(x.detail)),list(x.audience,function(a,j){return h('span',{className:'tag',key:j},a)}),h('p',{className:'note',style:{margin:'8px 0 0'}},'Link: '+T(x.link_label)+' (goes to '+x.page+')'))})}));
})();

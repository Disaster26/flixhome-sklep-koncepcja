(function(){
'use strict';
var P=[
 {id:'brink-flair-g4',marka:'Brink',nazwa:'Brink Flair - komplet filtrów G4 + G4',klasa:'G4',typ:['G4'],cena:89,pop:9,modele:['Brink Flair 300','Brink Flair 325','Brink Flair 400','Brink Flair 450'],sztuk:'2 filtry (nawiew i wywiew)'},
 {id:'brink-flair-f7',marka:'Brink',nazwa:'Brink Flair - komplet filtrów G4 + F7',klasa:'F7',typ:['G4','F7'],cena:119,pop:10,modele:['Brink Flair 300','Brink Flair 325','Brink Flair 400','Brink Flair 450'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'brink-flair-epm1',marka:'Brink',nazwa:'Brink Flair - filtr antysmogowy ePM1',klasa:'ePM1',typ:['ePM1'],cena:79,pop:7,modele:['Brink Flair 300','Brink Flair 325','Brink Flair 400','Brink Flair 450'],sztuk:'1 filtr (nawiew)'},
 {id:'brink-renovent',marka:'Brink',nazwa:'Brink Renovent Excellent - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:109,pop:6,modele:['Brink Renovent Excellent 300','Brink Renovent Excellent 400'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'zehnder-q',marka:'Zehnder',nazwa:'Zehnder ComfoAir Q - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:189,pop:8,modele:['Zehnder ComfoAir Q350','Zehnder ComfoAir Q450','Zehnder ComfoAir Q600'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'zehnder-luxe',marka:'Zehnder',nazwa:'Zehnder ComfoAir 350/550 Luxe - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:129,pop:5,modele:['Zehnder ComfoAir 350 Luxe','Zehnder ComfoAir 550 Luxe'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'komfovent-r400',marka:'Komfovent',nazwa:'Komfovent Domekt R 400 V - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:119,pop:6,modele:['Komfovent Domekt R 400 V'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'vasco-d',marka:'Vasco',nazwa:'Vasco D350 / D400 - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:109,pop:5,modele:['Vasco D350','Vasco D400'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'provent-mistral',marka:'Pro-Vent',nazwa:'Pro-Vent Mistral 400 - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:99,pop:4,modele:['Pro-Vent Mistral 400'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'thessla-airpack',marka:'Thessla Green',nazwa:'Thessla Green AirPack Home - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:129,pop:5,modele:['Thessla Green AirPack Home 300v','Thessla Green AirPack Home 400v'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'systemair-vtr',marka:'Systemair',nazwa:'Systemair SAVE VTR 250/B - komplet G4 + F7',klasa:'F7',typ:['G4','F7'],cena:139,pop:3,modele:['Systemair SAVE VTR 250/B'],sztuk:'2 filtry (G4 wywiew, F7 nawiew)'},
 {id:'brink-flair-rok',marka:'Brink',nazwa:'Brink Flair - zestaw na rok, 4 komplety G4 + F7',klasa:'Zestaw',typ:['Zestaw','G4','F7'],cena:429,pop:8,modele:['Brink Flair 300','Brink Flair 325','Brink Flair 400','Brink Flair 450'],sztuk:'8 filtrów (4 x G4, 4 x F7)'}
];
var MARKI=['Wszystkie'].concat(P.map(function(p){return p.marka}).filter(function(v,i,a){return a.indexOf(v)===i}));
var KLASY=['G4','F7','ePM1','Zestaw'];
var stan={marka:'Wszystkie',klasy:[],q:'',sort:'pop'};
var kosz={};
try{kosz=JSON.parse(localStorage.getItem('flix-kosz')||'{}')||{}}catch(e){kosz={}}
var $=function(s){return document.querySelector(s)};
function zl(n){return n.toFixed(2).replace('.',',')+' zł'}
function norm(s){return (s||'').toLowerCase().replace(/[\s\-\/_.]+/g,'')}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

/* rysunek kasety filtra z plisa - motyw strony */
function kaseta(x,y,w,h,ram,plisa){
  var n=Math.round(w/9),d='',st=(w-12)/n;
  for(var i=0;i<=n;i++){var px=x+6+i*st;d+=(i?'L':'M')+px.toFixed(1)+' '+(i%2?y+h-8:y+8)}
  return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="5" fill="#fff" stroke="'+ram+'" stroke-width="5"/>'+
    '<path d="'+d+'" fill="none" stroke="'+plisa+'" stroke-width="2.2" stroke-linejoin="round"/>';
}
function rys(p){
  var kol={G4:'#2c4a5c',F7:'#CC123D',ePM1:'#0d6b5e',Zestaw:'#002F47'};
  var s='<svg viewBox="0 0 300 220" aria-hidden="true">';
  if(p.klasa==='Zestaw'){
    s+=kaseta(70,24,180,110,'#2c4a5c','#9fb3c0')+kaseta(52,46,180,110,'#CC123D','#e6a3b2')+kaseta(34,68,180,110,'#2c4a5c','#9fb3c0')+kaseta(16,90,180,110,'#CC123D','#e6a3b2');
  }else if(p.typ.length>1){
    s+=kaseta(92,26,190,120,kol.G4,'#9fb3c0')+kaseta(20,72,190,120,kol[p.typ[1]],p.typ[1]==='F7'?'#e6a3b2':'#93c7bd');
  }else{
    s+=kaseta(40,44,220,132,kol[p.klasa],p.klasa==='ePM1'?'#93c7bd':'#9fb3c0');
  }
  return s+'</svg>';
}
function etykieta(p){
  var c=p.klasa==='F7'?'f7':p.klasa==='ePM1'?'epm1':p.klasa==='Zestaw'?'zestaw':'';
  var t=p.klasa==='Zestaw'?'Zestaw roczny':(p.typ.join(' + '));
  return '<span class="klasa '+c+'">'+t+'</span>';
}

function chipy(){
  $('#marki').innerHTML=MARKI.map(function(m){return '<button class="chip" type="button" data-m="'+esc(m)+'" aria-pressed="'+(stan.marka===m)+'">'+esc(m)+'</button>'}).join('');
  $('#klasyMob').innerHTML=KLASY.map(function(k){return '<button class="chip" type="button" data-k="'+k+'" aria-pressed="'+(stan.klasy.indexOf(k)>-1)+'">'+(k==='Zestaw'?'Zestawy roczne':k)+'</button>'}).join('');
  document.querySelectorAll('#klasy input').forEach(function(i){i.checked=stan.klasy.indexOf(i.value)>-1});
}
function lista(){
  var q=norm(stan.q);
  var w=P.filter(function(p){
    if(stan.marka!=='Wszystkie'&&p.marka!==stan.marka)return false;
    if(stan.klasy.length&&!stan.klasy.some(function(k){return p.typ.indexOf(k)>-1}))return false;
    if(q){var hay=norm(p.nazwa+' '+p.modele.join(' ')+' '+p.marka),tk=stan.q.toLowerCase().split(/\s+/).map(norm).filter(Boolean);if(hay.indexOf(q)<0&&!tk.every(function(t){return hay.indexOf(t)>-1}))return false}
    return true;
  });
  w.sort(function(a,b){return stan.sort==='tanio'?a.cena-b.cena:stan.sort==='drogo'?b.cena-a.cena:b.pop-a.pop});
  return w;
}
function render(){
  var w=lista(),s=$('#siatka');
  var opis=w.length+' '+(w.length===1?'produkt':(w.length%10>=2&&w.length%10<=4&&(w.length%100<10||w.length%100>=20))?'produkty':'produktów');
  if(stan.q)opis+=' dla "'+stan.q+'"';
  $('#wynik').textContent=opis;
  if(!w.length){
    s.innerHTML='<div class="brak"><h3>Nie mamy jeszcze filtrów do tego modelu w sklepie</h3><p>Wyślij nam zdjęcie tabliczki centrali, sprawdzimy, jakie filtry pasują.</p><a class="btn ciemny" href="#model">Zapytaj o filtry</a> <button class="btn obrys" type="button" id="wyczysc">Pokaż wszystkie</button></div>';
    return;
  }
  s.innerHTML=w.map(function(p){
    var mod=p.modele.map(function(m){return m.replace(p.marka+' ','')}).join(', ');
    return '<article class="karta"><button class="fot" type="button" data-p="'+p.id+'" aria-label="Szczegóły: '+esc(p.nazwa)+'">'+etykieta(p)+rys(p)+'</button>'+
      '<div class="tresc"><h3><button type="button" data-p="'+p.id+'">'+esc(p.nazwa)+'</button></h3><p class="pasuje">Pasuje do: '+esc(p.marka)+' '+esc(mod)+'</p>'+
      '<div class="dol"><span class="cena">'+zl(p.cena)+'</span><button class="btn dodaj" type="button" data-dodaj="'+p.id+'">Do koszyka</button></div></div></article>';
  }).join('');
}
function znajdz(id){for(var i=0;i<P.length;i++)if(P[i].id===id)return P[i]}

/* okno produktu */
var okno=$('#okno'),ilosc=1,ostatni=null;
function pokaz(id){
  var p=znajdz(id);if(!p)return;ilosc=1;ostatni=document.activeElement;
  var klasy={G4:'G4 (ISO Coarse) - wstępny',F7:'F7 (ISO ePM1 50-65%) - dokładny',ePM1:'ePM1 - antysmogowy'};
  var kl=p.typ.filter(function(t){return klasy[t]}).map(function(t){return klasy[t]}).join('<br>');
  okno.innerHTML='<button class="zamknij" type="button" data-zamknij aria-label="Zamknij">&times;</button><div class="prod"><div class="fot">'+etykieta(p)+rys(p)+'</div><div class="opis">'+
   '<h2 id="pt">'+esc(p.nazwa)+'</h2><span class="cena">'+zl(p.cena)+'<small>cena przykładowa</small></span>'+
   '<table><tr><th>Pasuje do central</th><td><ul class="lista">'+p.modele.map(function(m){return '<li>'+esc(m)+'</li>'}).join('')+'</ul></td></tr>'+
   '<tr><th>Klasa filtracji</th><td>'+kl+'</td></tr><tr><th>W opakowaniu</th><td>'+esc(p.sztuk)+'</td></tr>'+
   '<tr><th>Wymiana</th><td>zwykle co 3-6 miesięcy, wg zaleceń producenta centrali</td></tr><tr><th>Wysyłka</th><td>Paczkomat, kurier albo odbiór w Lesznie</td></tr></table>'+
   '<div class="kup"><div class="ilosc"><button type="button" data-il="-1" aria-label="Mniej">&minus;</button><output id="il">1</output><button type="button" data-il="1" aria-label="Więcej">+</button></div>'+
   '<button class="btn" type="button" data-dodaj="'+p.id+'" data-z-okna>Dodaj do koszyka</button></div>'+
   '<p class="notka">Nie masz pewności, czy pasuje? Napisz model centrali w uwagach do zamówienia, sprawdzimy przed wysyłką.</p></div></div>';
  if(okno.showModal)okno.showModal();else okno.setAttribute('open','');
}
function zamknijOkno(){if(okno.open){okno.close?okno.close():okno.removeAttribute('open')}}
okno.addEventListener('click',function(e){
  if(e.target===okno||e.target.closest('[data-zamknij]'))return zamknijOkno();
  var b=e.target.closest('[data-il]');
  if(b){ilosc=Math.max(1,Math.min(20,ilosc+ +b.dataset.il));$('#il').textContent=ilosc}
});
okno.addEventListener('close',function(){if(ostatni&&ostatni.focus)ostatni.focus()});

/* koszyk */
function zapisz(){try{localStorage.setItem('flix-kosz',JSON.stringify(kosz))}catch(e){}}
function liczba(){var n=0;for(var k in kosz)n+=kosz[k];return n}
function dodaj(id,n){kosz[id]=(kosz[id]||0)+n;zapisz();koszyk();var p=znajdz(id);toast('Dodano do koszyka: '+p.nazwa)}
function koszyk(){
  $('#ile').textContent=liczba();
  var ids=Object.keys(kosz).filter(function(k){return kosz[k]>0&&znajdz(k)}),suma=0;
  if(!ids.length){$('#poz').innerHTML='<div class="pusty"><p>Koszyk jest pusty.</p><button class="btn ciemny" type="button" data-zamknij-k>Wybierz filtry</button></div>';$('#podsum').style.display='none';return}
  $('#podsum').style.display='';
  $('#poz').innerHTML=ids.map(function(id){var p=znajdz(id),w=p.cena*kosz[id];suma+=w;
    return '<div class="el"><div class="m">'+rys(p)+'</div><div><b>'+esc(p.nazwa)+'</b><div class="ilosc"><button type="button" data-k-il="-1" data-id="'+id+'" aria-label="Mniej">&minus;</button><output>'+kosz[id]+'</output><button type="button" data-k-il="1" data-id="'+id+'" aria-label="Więcej">+</button></div></div>'+
      '<div class="kw">'+zl(w)+'<button class="usun" type="button" data-usun="'+id+'">Usuń</button></div></div>'}).join('');
  var d=parseFloat((document.querySelector('#dostawa input:checked')||{value:0}).value);
  $('#razem').textContent=zl(suma+d);
}
var szuf=$('#szuflada'),zas=$('#zaslona');
function otworz(){szuf.classList.add('on');zas.classList.add('on');szuf.setAttribute('aria-hidden','false');$('#zamknijKoszyk').focus()}
function zamknij(){szuf.classList.remove('on');zas.classList.remove('on');szuf.setAttribute('aria-hidden','true')}
$('#otworzKoszyk').addEventListener('click',otworz);
$('#zamknijKoszyk').addEventListener('click',zamknij);
zas.addEventListener('click',zamknij);
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&szuf.classList.contains('on'))zamknij()});
szuf.addEventListener('click',function(e){
  var b=e.target.closest('[data-k-il]');
  if(b){var id=b.dataset.id;kosz[id]=Math.max(0,kosz[id]+ +b.dataset.kIl);if(!kosz[id])delete kosz[id];zapisz();koszyk();return}
  b=e.target.closest('[data-usun]');if(b){delete kosz[b.dataset.usun];zapisz();koszyk();return}
  if(e.target.closest('[data-zamknij-k]')){zamknij();location.hash='katalog'}
});
$('#dostawa').addEventListener('change',koszyk);
$('#zaplac').addEventListener('click',function(){toast('To koszyk pokazowy. W sklepie tu otworzy się płatność BLIK, Przelewy24 lub kartą.')});

var tt;
function toast(t){var el=$('#toast');el.textContent=t;el.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){el.classList.remove('on')},2600)}

/* zdarzenia katalogu */
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-dodaj]');
  if(b){var z=b.hasAttribute('data-z-okna');dodaj(b.dataset.dodaj,z?ilosc:1);
    if(z){zamknijOkno()}else{b.classList.add('ok');b.textContent='Dodano';setTimeout(function(){b.classList.remove('ok');b.textContent='Do koszyka'},1400)}
    return}
  b=e.target.closest('[data-p]');if(b){pokaz(b.dataset.p);return}
  b=e.target.closest('#marki [data-m]');if(b){stan.marka=b.dataset.m;chipy();render();return}
  b=e.target.closest('#klasyMob [data-k]');if(b){var k=b.dataset.k,i=stan.klasy.indexOf(k);i>-1?stan.klasy.splice(i,1):stan.klasy.push(k);chipy();render();return}
  if(e.target.id==='wyczysc'){stan={marka:'Wszystkie',klasy:[],q:'',sort:stan.sort};$('#q').value='';chipy();render()}
});
$('#klasy').addEventListener('change',function(){stan.klasy=[].slice.call(document.querySelectorAll('#klasy input:checked')).map(function(i){return i.value});chipy();render()});
$('#sort').addEventListener('change',function(e){stan.sort=e.target.value;render()});
$('#szukajForm').addEventListener('submit',function(e){e.preventDefault();stan.q=$('#q').value.trim();stan.marka='Wszystkie';chipy();render();document.getElementById('katalog').scrollIntoView({behavior:'smooth'})});
$('#q').addEventListener('input',function(e){if(!e.target.value){stan.q='';render()}});
$('#zapytanie').addEventListener('submit',function(e){e.preventDefault();toast('Formularz pokazowy. W sklepie zapytanie trafi na instalacje.biuro@flixhome.pl.')});

/* menu mobilne */
var bur=$('#burger'),menu=$('#menu');
bur.addEventListener('click',function(){var o=menu.classList.toggle('otwarte');bur.setAttribute('aria-expanded',o)});
menu.addEventListener('click',function(e){if(e.target.closest('a')){menu.classList.remove('otwarte');bur.setAttribute('aria-expanded','false')}});

/* galeria przeciagana mysza */
var g=$('#galeria'),x0=0,s0=0,ciag=false,ruch=false;
g.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=false;x0=e.clientX;s0=g.scrollLeft;g.classList.add('ciag')});
window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;if(Math.abs(dx)>3)ruch=true;g.scrollLeft=s0-dx});
window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;g.classList.remove('ciag')});
document.querySelectorAll('.strz button').forEach(function(b){b.addEventListener('click',function(){var f=g.querySelector('figure');g.scrollBy({left:(f.offsetWidth+16)*+b.dataset.k,behavior:'smooth'})})});

$('#rok').textContent=new Date().getFullYear();
chipy();render();koszyk();
})();

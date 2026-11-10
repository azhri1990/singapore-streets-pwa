class d{constructor(e){this.game=e,this.player=null,this.deviceId=null,this.accessToken=null,this.isPlaying=!1,this.currentTrack=null,this.playlists=[],this.setupUI(),this.loadSpotifySDK()}setupUI(){this.ui=document.createElement("div"),this.ui.id="spotify-ui",this.ui.style.cssText=`
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #1DB954;
            border-radius: 12px;
            padding: 15px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `,document.body.appendChild(this.ui)}loadSpotifySDK(){const e=document.createElement("script");e.src="https://sdk.scdn.co/spotify-player.js",e.async=!0,document.body.appendChild(e),window.onSpotifyWebPlaybackSDKReady=()=>{this.initializePlayer()}}async initializePlayer(){if(this.accessToken=localStorage.getItem("spotify_access_token"),!this.accessToken){this.showLoginPrompt();return}const e=new Spotify.Player({name:"Singapore Streets Radio",getOAuthToken:i=>{i(this.accessToken)},volume:.5});e.addListener("ready",({device_id:i})=>{console.log("Spotify player ready:",i),this.deviceId=i,this.player=e,this.showPlayerUI()}),e.addListener("not_ready",({device_id:i})=>{console.log("Device ID has gone offline:",i)}),e.addListener("player_state_changed",i=>{i&&(this.currentTrack=i.track_window.current_track,this.isPlaying=!i.paused,this.updatePlayerUI())}),await e.connect()}showLoginPrompt(){this.ui.style.display="block",this.ui.innerHTML=`
            <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 10px;">🎵</div>
                <div style="font-weight: bold; margin-bottom: 15px; color: #1DB954;">Spotify Integration</div>
                <div style="margin-bottom: 15px; color: #888;">
                    Connect your Spotify account to play music in-game.
                    <br>Requires Spotify Premium.
                </div>
                <button onclick="window.game.spotify.connect()" style="
                    padding: 10px 20px;
                    background: #1DB954;
                    color: #fff;
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: bold;
                ">Connect Spotify</button>
            </div>
        `}connect(){const e="your_spotify_client_id",i=window.location.origin,t="streaming user-read-email user-read-private user-modify-playback-state";window.location.href=`https://accounts.spotify.com/authorize?client_id=${e}&response_type=token&redirect_uri=${encodeURIComponent(i)}&scope=${encodeURIComponent(t)}`}showPlayerUI(){this.ui.style.display="block",this.updatePlayerUI()}updatePlayerUI(){if(!this.currentTrack)return;const e=this.currentTrack,i=e.artists.map(t=>t.name).join(", ");this.ui.innerHTML=`
            <div style="display: flex; align-items: center; gap: 15px;">
                <img src="${e.album.images[0]?.url||""}" style="width: 60px; height: 60px; border-radius: 4px;">
                <div style="flex: 1;">
                    <div style="font-weight: bold; color: #1DB954;">${e.name}</div>
                    <div style="font-size: 11px; color: #888;">${i}</div>
                    <div style="font-size: 10px; color: #666;">${e.album.name}</div>
                </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 10px; justify-content: center;">
                <button onclick="window.game.spotify.previous()" style="padding: 5px 15px; background: #333; color: #fff; border: none; border-radius: 4px; cursor: pointer;">⏮</button>
                <button onclick="window.game.spotify.togglePlay()" style="padding: 5px 20px; background: #1DB954; color: #fff; border: none; border-radius: 4px; cursor: pointer;">${this.isPlaying?"⏸":"▶"}</button>
                <button onclick="window.game.spotify.next()" style="padding: 5px 15px; background: #333; color: #fff; border: none; border-radius: 4px; cursor: pointer;">⏭</button>
            </div>
            <div style="margin-top: 10px; text-align: center; font-size: 10px; color: #666;">
                Spotify Connected • Press S to toggle
            </div>
        `}togglePlay(){this.player&&this.player.togglePlay()}next(){this.player&&this.player.nextTrack()}previous(){this.player&&this.player.previousTrack()}toggleUI(){this.ui.style.display=this.ui.style.display==="none"?"block":"none"}async playTrack(e){!this.deviceId||!this.accessToken||await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,{method:"PUT",headers:{Authorization:`Bearer ${this.accessToken}`,"Content-Type":"application/json"},body:JSON.stringify({uris:[e]})})}async playPlaylist(e){!this.deviceId||!this.accessToken||await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.deviceId}`,{method:"PUT",headers:{Authorization:`Bearer ${this.accessToken}`,"Content-Type":"application/json"},body:JSON.stringify({context_uri:`spotify:playlist:${e}`})})}update(e){}}typeof window<"u"&&(window.SpotifyIntegration=d);const s={chicken_rice:{name:"Chicken Rice",price:4.5,health:15,energy:20,happiness:10,location:"hawker",description:"Singapore's national dish"},char_kway_teow:{name:"Char Kway Teow",price:5,health:10,energy:25,happiness:15,location:"hawker",description:"Stir-fried flat noodles"},laksa:{name:"Laksa",price:5.5,health:12,energy:22,happiness:12,location:"hawker",description:"Spicy coconut curry noodles"},roti_prata:{name:"Roti Prata",price:2,health:8,energy:15,happiness:8,location:"hawker",description:"Indian flatbread"},satay:{name:"Satay",price:.8,health:5,energy:10,happiness:8,location:"hawker",unit:"stick",description:"Grilled meat skewers"},bak_kut_teh:{name:"Bak Kut Teh",price:7,health:18,energy:20,happiness:12,location:"hawker",description:"Pork rib soup"},chilli_crab:{name:"Chilli Crab",price:45,health:20,energy:25,happiness:20,location:"restaurant",description:"Singapore's famous crab"},hokkien_mee:{name:"Hokkien Mee",price:5,health:12,energy:22,happiness:10,location:"hawker",description:"Prawn noodles"},fish_head_curry:{name:"Fish Head Curry",price:25,health:18,energy:20,happiness:15,location:"restaurant",description:"Indian-Singaporean curry"},nasi_lemak:{name:"Nasi Lemak",price:4,health:12,energy:20,happiness:10,location:"hawker",description:"Coconut rice with sambal"},mee_goreng:{name:"Mee Goreng",price:4.5,health:10,energy:22,happiness:10,location:"hawker",description:"Fried noodles"},kaya_toast:{name:"Kaya Toast",price:2.5,health:5,energy:10,happiness:8,location:"kopitiam",description:"Toast with coconut jam"},soft_boiled_eggs:{name:"Soft Boiled Eggs",price:1.5,health:5,energy:8,happiness:5,location:"kopitiam",description:"Traditional breakfast"},kopi:{name:"Kopi",price:1.5,health:3,energy:15,happiness:5,location:"kopitiam",description:"Singapore coffee"},teh:{name:"Teh",price:1.5,health:3,energy:15,happiness:5,location:"kopitiam",description:"Singapore tea"},milo:{name:"Milo",price:2,health:5,energy:20,happiness:8,location:"kopitiam",description:"Malt drink"},bubble_tea:{name:"Bubble Tea",price:4.5,health:3,energy:15,happiness:12,location:"mall",description:"Milk tea with pearls"},ice_kacang:{name:"Ice Kacang",price:3,health:5,energy:10,happiness:12,location:"hawker",description:"Shaved ice dessert"},cendol:{name:"Cendol",price:3,health:5,energy:10,happiness:12,location:"hawker",description:"Coconut milk dessert"},durian:{name:"Durian",price:15,health:8,energy:15,happiness:15,location:"fruit_stall",description:"King of fruits"}},h={grabfood:{name:"GrabFood",color:45391,deliveryFee:3,minOrder:0},foodpanda:{name:"Foodpanda",color:16722821,deliveryFee:2.5,minOrder:0},deliveroo:{name:"Deliveroo",color:52412,deliveryFee:3.5,minOrder:0}};class y{constructor(e){this.game=e,this.hunger=100,this.thirst=100,this.lastMeal=Date.now(),this.setupUI(),this.startHungerLoop()}setupUI(){this.ui=document.createElement("div"),this.ui.id="food-ui",this.ui.style.cssText=`
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 300px;
            background: rgba(0, 0, 0, 0.85);
            border: 1px solid #ff8800;
            border-radius: 8px;
            padding: 12px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            display: none;
        `,document.body.appendChild(this.ui)}startHungerLoop(){setInterval(()=>{this.hunger=Math.max(0,this.hunger-1),this.thirst=Math.max(0,this.thirst-2),this.hunger<20&&this.game.player&&(this.game.player.health=Math.max(1,this.game.player.health-1))},6e4)}eat(e){const i=s[e];if(!i)return!1;if(this.game.player&&(this.game.player.money||0)<i.price)return this.game.showNotification&&this.game.showNotification("❌ NO MONEY",`Need $${i.price} for ${i.name}`),!1;if(this.game.player&&(this.game.player.money-=i.price,this.game.player.health=Math.min(100,this.game.player.health+i.health),this.game.player.energy=(this.game.player.energy||50)+i.energy,this.game.player.happiness=(this.game.player.happiness||50)+i.happiness),this.hunger=Math.min(100,this.hunger+i.energy),this.thirst=Math.min(100,this.thirst+10),this.lastMeal=Date.now(),this.game.showNotification&&this.game.showNotification("🍜 EATING",`${i.name} - $${i.price}`),window.voiceSynth){const t=["Shiok!","Sedap!","Aroi!","Masarap!","Enak!"];window.voiceSynth.speakSinglish(t[Math.floor(Math.random()*t.length)],"chinese_singaporean")}return!0}drink(e){const i=s[e];return!i||this.game.player&&(this.game.player.money||0)<i.price?!1:(this.game.player&&(this.game.player.money-=i.price,this.game.player.energy=(this.game.player.energy||50)+i.energy),this.thirst=Math.min(100,this.thirst+i.energy),!0)}orderDelivery(e,i){const t=h[e],o=s[i];if(!t||!o)return!1;const n=o.price+t.deliveryFee;return this.game.player&&(this.game.player.money||0)<n?!1:(this.game.player&&(this.game.player.money-=n),setTimeout(()=>{this.eat(i),this.game.showNotification&&this.game.showNotification("🛵 DELIVERED",`${o.name} from ${t.name}`)},3e4+Math.random()*3e4),this.game.showNotification&&this.game.showNotification("🛵 ORDERING",`${o.name} via ${t.name} - $${n.toFixed(2)}`),!0)}openFoodPanel(){this.ui.style.display="block",this.renderUI()}closeFoodPanel(){this.ui.style.display="none"}renderUI(){let e='<h3 style="color: #ff8800; margin-bottom: 10px;">🍜 SINGAPORE FOOD</h3>';e+=`<div style="margin-bottom: 8px;">Hunger: ${this.hunger}% | Thirst: ${this.thirst}%</div>`;const i={Hawker:["chicken_rice","char_kway_teow","laksa","roti_prata","satay","bak_kut_teh","hokkien_mee","nasi_lemak","mee_goreng","ice_kacang","cendol"],Restaurant:["chilli_crab","fish_head_curry"],Kopitiam:["kaya_toast","soft_boiled_eggs","kopi","teh","milo"],Mall:["bubble_tea"],Fruit:["durian"]};for(const[t,o]of Object.entries(i)){e+=`<div style="color: #ffff00; margin: 8px 0 4px; font-weight: bold;">${t}</div>`;for(const n of o){const a=s[n];e+=`<button onclick="window.game.foodSystem.eat('${n}')" style="
                    display: block; width: 100%; padding: 6px; margin-bottom: 3px;
                    background: rgba(255, 136, 0, 0.1); border: 1px solid #ff8800;
                    color: #ff8800; border-radius: 4px; cursor: pointer; text-align: left; font-size: 11px;
                ">${a.name} - $${a.price} (+${a.health}HP +${a.energy}EN)</button>`}}e+='<div style="margin-top: 10px; color: #888; font-size: 10px;">Press F to close</div>',this.ui.innerHTML=e}toggleUI(){this.ui.style.display=this.ui.style.display==="none"?"block":"none",this.ui.style.display==="block"&&this.renderUI()}update(e){}}const m={NSL:{name:"North South Line",color:16711680,operator:"SMRT"},EWL:{name:"East West Line",color:65280,operator:"SMRT"},CCL:{name:"Circle Line",color:16750848,operator:"SMRT"},NEL:{name:"North East Line",color:8388736,operator:"SBS Transit"},DTL:{name:"Downtown Line",color:255,operator:"SBS Transit"},TEL:{name:"Thomson-East Coast Line",color:9127187,operator:"SMRT"}},l=[{name:"Marina Bay",lines:["NSL","CCL","TEL"],x:0,z:50},{name:"Raffles Place",lines:["NSL","EWL"],x:0,z:30},{name:"City Hall",lines:["NSL","EWL"],x:-10,z:25},{name:"Orchard",lines:["NSL","TEL"],x:-50,z:-50},{name:"Somerset",lines:["NSL"],x:-45,z:-45},{name:"Dhoby Ghaut",lines:["NSL","CCL","NEL"],x:-30,z:-20},{name:"Little India",lines:["NEL","DTL"],x:-20,z:0},{name:"Farrer Park",lines:["NEL"],x:-15,z:5},{name:"Chinatown",lines:["NEL","DTL"],x:-30,z:20},{name:"Outram Park",lines:["EWL","NEL","TEL"],x:-25,z:25},{name:"Tiong Bahru",lines:["EWL"],x:-40,z:30},{name:"Redhill",lines:["EWL"],x:-50,z:35},{name:"Queenstown",lines:["EWL"],x:-60,z:35},{name:"Commonwealth",lines:["EWL"],x:-70,z:35},{name:"Buona Vista",lines:["EWL","CCL"],x:-80,z:30},{name:"Clementi",lines:["EWL"],x:-150,z:-50},{name:"Jurong East",lines:["EWL","NSL"],x:-200,z:-100},{name:"Woodlands",lines:["NSL","TEL"],x:-100,z:-200},{name:"Yishun",lines:["NSL"],x:-80,z:-180},{name:"Sembawang",lines:["NSL"],x:-100,z:-220},{name:"Admiralty",lines:["NSL"],x:-95,z:-210},{name:"Tampines",lines:["EWL","DTL"],x:150,z:-50},{name:"Pasir Ris",lines:["EWL"],x:180,z:-40},{name:"Bedok",lines:["EWL"],x:150,z:0},{name:"Kembangan",lines:["EWL"],x:140,z:5},{name:"Eunos",lines:["EWL"],x:120,z:10},{name:"Paya Lebar",lines:["EWL","CCL"],x:100,z:15},{name:"Aljunied",lines:["EWL"],x:90,z:18},{name:"Kallang",lines:["EWL"],x:70,z:20},{name:"Lavender",lines:["EWL"],x:60,z:22},{name:"Bugis",lines:["EWL","DTL"],x:50,z:25},{name:"Promenade",lines:["CCL","DTL"],x:10,z:40},{name:"Bayfront",lines:["CCL","DTL"],x:5,z:50},{name:"Marina South Pier",lines:["NSL"],x:0,z:60}];class g{constructor(e){this.game=e,this.ezLinkBalance=50,this.currentStation=null,this.isTraveling=!1,this.setupUI()}setupUI(){this.ui=document.createElement("div"),this.ui.id="mrt-ui",this.ui.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            max-height: 500px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #ff0000;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            display: none;
        `,document.body.appendChild(this.ui)}openMRT(){this.ui.style.display="block",this.renderUI()}closeMRT(){this.ui.style.display="none"}renderUI(){let e='<h2 style="color: #ff0000; margin-bottom: 15px;">🚇 MRT TRAVEL</h2>';e+=`<div style="margin-bottom: 10px; color: #ffff00;">EZ-Link Balance: $${this.ezLinkBalance.toFixed(2)}</div>`,e+='<div style="margin-bottom: 10px; color: #888;">Select destination station:</div>';const i={};for(const t of l)for(const o of t.lines)i[o]||(i[o]=[]),i[o].push(t);for(const[t,o]of Object.entries(i)){const n=m[t];e+=`<div style="color: #${n.color.toString(16).padStart(6,"0")}; font-weight: bold; margin: 10px 0 5px;">${n.name}</div>`;for(const a of o){const p=this.calculateFare(a);e+=`<button onclick="window.game.mrtSystem.travelTo('${a.name}')" style="
                    display: block; width: 100%; padding: 6px; margin-bottom: 3px;
                    background: rgba(255, 0, 0, 0.1); border: 1px solid #ff0000;
                    color: #ff0000; border-radius: 4px; cursor: pointer; text-align: left; font-size: 11px;
                ">${a.name} - $${p.toFixed(2)}</button>`}}e+='<div style="margin-top: 10px; color: #888; font-size: 10px;">Press T to close</div>',this.ui.innerHTML=e}calculateFare(e){const i=l.find(o=>o.name===e);if(!i||!this.game.player)return 1.5;const t=Math.sqrt((i.x-this.game.player.position.x)**2+(i.z-this.game.player.position.z)**2);return t<5?.99:t<15?1.2:t<30?1.5:t<50?1.8:2.2}travelTo(e){const i=l.find(o=>o.name===e);if(!i)return!1;const t=this.calculateFare(e);return this.ezLinkBalance<t?(this.game.showNotification&&this.game.showNotification("❌ INSUFFICIENT BALANCE",`Need $${t.toFixed(2)} on EZ-Link`),!1):(this.ezLinkBalance-=t,this.isTraveling=!0,this.game.showNotification&&this.game.showNotification("🚇 TRAVELING",`MRT to ${e} - $${t.toFixed(2)}`),setTimeout(()=>{this.game.player&&this.game.player.position.set(i.x,1,i.z),this.isTraveling=!1,this.game.showNotification&&this.game.showNotification("🚇 ARRIVED",`Welcome to ${e} MRT`)},3e3+Math.random()*2e3),this.closeMRT(),!0)}topUpEZLink(e){this.ezLinkBalance+=e,this.game.player&&(this.game.player.money=(this.game.player.money||0)-e),this.game.showNotification&&this.game.showNotification("💳 TOP UP",`EZ-Link topped up by $${e}`)}toggleUI(){this.ui.style.display=this.ui.style.display==="none"?"block":"none",this.ui.style.display==="block"&&this.renderUI()}update(e){}}class f{constructor(e){this.game=e,this.notifications=[],this.enabled=!0,this.setupUI(),this.setupNotificationListener()}setupUI(){this.container=document.createElement("div"),this.container.id="phone-notifications",this.container.style.cssText=`
            position: fixed;
            top: 80px;
            right: 20px;
            width: 320px;
            z-index: 10001;
            pointer-events: none;
        `,document.body.appendChild(this.container)}setupNotificationListener(){"Notification"in window&&Notification.requestPermission().then(e=>{e==="granted"&&console.log("Notification permission granted")}),"serviceWorker"in navigator&&navigator.serviceWorker.addEventListener("message",e=>{e.data&&e.data.type==="notification"&&this.handleNotification(e.data.notification)}),this.setupAndroidListener()}setupAndroidListener(){setInterval(()=>{this.checkForNewNotifications()},1e3)}checkForNewNotifications(){const e=localStorage.getItem("phone_notifications");e&&JSON.parse(e).filter(o=>!this.notifications.find(n=>n.id===o.id)).forEach(o=>{this.handleNotification(o)})}handleNotification(e){if(!this.enabled)return;const i={id:e.id||Date.now().toString(),title:e.title||"Notification",body:e.body||"",icon:e.icon||null,app:e.app||"Unknown",timestamp:Date.now(),read:!1};this.notifications.push(i),this.showNotification(i),this.playNotificationSound(),window.voiceSynth&&e.announce&&window.voiceSynth.speak(`${e.app}: ${e.title}`,"chinese_singaporean",{rate:1.1})}showNotification(e){const i=document.createElement("div");i.id=`notif-${e.id}`,i.style.cssText=`
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ffff;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 8px;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            animation: slideInRight 0.3s ease;
            pointer-events: auto;
            cursor: pointer;
        `,i.innerHTML=`
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                ${e.icon?`<img src="${e.icon}" style="width: 20px; height: 20px; border-radius: 4px;">`:""}
                <strong style="color: #00ffff;">${e.app}</strong>
                <span style="font-size: 10px; color: #888; margin-left: auto;">${new Date(e.timestamp).toLocaleTimeString()}</span>
            </div>
            <div style="font-weight: bold; margin-bottom: 2px;">${e.title}</div>
            <div style="font-size: 11px; color: #ccc;">${e.body}</div>
        `,i.onclick=()=>{i.style.animation="slideOutRight 0.3s ease forwards",setTimeout(()=>i.remove(),300)},this.container.appendChild(i),setTimeout(()=>{i.parentNode&&(i.style.animation="slideOutRight 0.3s ease forwards",setTimeout(()=>i.remove(),300))},1e4)}playNotificationSound(){if(!window.AudioContext)return;const e=new(window.AudioContext||window.webkitAudioContext),i=e.createOscillator(),t=e.createGain();i.connect(t),t.connect(e.destination),i.frequency.value=880,i.type="sine",t.gain.value=.2,i.start(),t.gain.exponentialRampToValueAtTime(.001,e.currentTime+.3),i.stop(e.currentTime+.3)}simulateNotification(e,i,t){this.handleNotification({id:Date.now().toString(),app:e,title:i,body:t,icon:null,announce:!1})}toggle(){this.enabled=!this.enabled,this.game.showNotification&&this.game.showNotification("🔔 NOTIFICATIONS",this.enabled?"Enabled":"Disabled")}getHistory(){return this.notifications}clearAll(){this.notifications=[],this.container.innerHTML=""}update(e){}}typeof window<"u"&&(window.PhoneNotificationMirror=f);const c=document.createElement("style");c.textContent=`
@keyframes slideInRight {
    from { opacity: 0; transform: translateX(100%); }
    to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutRight {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(100%); }
}
`;document.head.appendChild(c);export{g as M,f as P,d as S,y as a};

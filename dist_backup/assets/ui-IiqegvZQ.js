import{V as c,E as p}from"./three-CGeqZeRz.js";class k{constructor(e){this.game=e,this.isMobile="ontouchstart"in window||navigator.maxTouchPoints>0,this.isMobile&&this.setupMobileControls()}setupMobileControls(){this.createJoystick(),this.createDrivingControls(),this.createActionButtons(),this.createWeaponWheel(),this.createCameraControl(),this.setupTouchEvents()}createJoystick(){this.joystick=document.createElement("div"),this.joystick.id="mobile-joystick",this.joystick.style.cssText=`
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 120px;
            height: 120px;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            z-index: 1000;
            touch-action: none;
        `,this.joystickKnob=document.createElement("div"),this.joystickKnob.style.cssText=`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            background: rgba(0, 255, 255, 0.7);
            border-radius: 50%;
            transition: all 0.1s;
        `,this.joystick.appendChild(this.joystickKnob),document.body.appendChild(this.joystick),this.joystickActive=!1,this.joystickInput={x:0,y:0}}createDrivingControls(){this.drivingButtons={};const e=document.createElement("div");e.id="mobile-driving-controls",e.style.cssText="position:fixed;right:26px;bottom:30px;z-index:1002;display:none;grid-template-columns:repeat(2,58px);gap:8px;touch-action:none;";const t=(n,i)=>{const a=document.createElement("button");a.textContent=n,a.style.cssText="width:58px;height:58px;border:2px solid rgba(0,229,255,.55);border-radius:50%;background:rgba(0,0,0,.72);color:#fff;font-size:18px;touch-action:none;";const s=o=>{this.drivingButtons[i]=o,a.style.background=o?"rgba(0,188,212,.75)":"rgba(0,0,0,.72)"};a.addEventListener("touchstart",o=>{o.preventDefault(),s(!0)},{passive:!1}),a.addEventListener("touchend",o=>{o.preventDefault(),s(!1)},{passive:!1}),a.addEventListener("touchcancel",()=>s(!1)),e.appendChild(a)};t("◀","left"),t("▲","throttle"),t("▼","brake"),t("⏹","handbrake"),document.body.appendChild(e),this.drivingPad=e}createCameraControl(){this.cameraArea=document.createElement("div"),this.cameraArea.id="mobile-camera",this.cameraArea.style.cssText=`
            position: fixed;
            top: 0;
            right: 0;
            width: 50%;
            height: 70%;
            z-index: 999;
            touch-action: none;
        `,document.body.appendChild(this.cameraArea);let e=null;this.cameraArea.addEventListener("touchstart",t=>{e=t.touches[0]}),this.cameraArea.addEventListener("touchmove",t=>{if(!e)return;const n=t.touches[0],i=n.clientX-e.clientX,a=n.clientY-e.clientY;this.game.player&&(this.game.player.rotation.y-=i*.005,this.game.player.rotation.x-=a*.005,this.game.player.rotation.x=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.game.player.rotation.x))),e=n}),this.cameraArea.addEventListener("touchend",()=>{e=null})}createActionButtons(){const e=document.createElement("div");e.id="mobile-action-buttons",e.style.cssText=`
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        `;const t=this.createButton("⬆️","jump",()=>{this.game.player&&this.game.player.onGround&&this.game.player.jump()}),n=this.createButton("✋","interact",()=>{this.game.interactionSystem?.interact()}),i=this.createButton("⚔️","attack",()=>{this.game.combatSystem&&this.game.combatSystem.attack()}),a=this.createButton("🏃","sprint",null,!0);a.addEventListener("touchstart",()=>{this.game.player&&(this.game.player.isRunning=!0),a.style.background="rgba(255, 0, 255, 0.8)"}),a.addEventListener("touchend",()=>{this.game.player&&(this.game.player.isRunning=!1),a.style.background="rgba(0, 0, 0, 0.7)"}),e.appendChild(t),n.title="Interact",e.appendChild(n),e.appendChild(i),e.appendChild(a),document.body.appendChild(e)}createButton(e,t,n,i=!1){const a=document.createElement("button");return a.id=`mobile-btn-${t}`,a.textContent=e,a.style.cssText=`
            width: 60px;
            height: 60px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid rgba(0, 255, 255, 0.5);
            border-radius: 50%;
            font-size: 24px;
            color: white;
            cursor: pointer;
            touch-action: manipulation;
            user-select: none;
            -webkit-user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
        `,n&&(a.addEventListener("touchstart",s=>{s.preventDefault(),n(),a.style.background="rgba(0, 255, 255, 0.5)"}),a.addEventListener("touchend",()=>{a.style.background="rgba(0, 0, 0, 0.7)"})),a}createWeaponWheel(){this.weaponWheel=document.createElement("div"),this.weaponWheel.id="mobile-weapon-wheel",this.weaponWheel.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: rgba(0, 0, 0, 0.7);
            border: 2px solid rgba(255, 0, 255, 0.5);
            border-radius: 50%;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            cursor: pointer;
            touch-action: manipulation;
        `,this.weaponWheel.textContent="⚔️",this.weaponWheel.addEventListener("touchstart",e=>{e.preventDefault(),this.game.combatSystem&&this.game.combatSystem.cycleWeapon(1)}),document.body.appendChild(this.weaponWheel)}setupTouchEvents(){let e=null;const t=this.joystick.getBoundingClientRect(),n=t.left+t.width/2,i=t.top+t.height/2,a=40;this.joystick.addEventListener("touchstart",s=>{s.preventDefault(),e=s.touches[0],this.joystickActive=!0}),this.joystick.addEventListener("touchmove",s=>{if(s.preventDefault(),!e)return;const o=s.touches[0],r=o.clientX-n,d=o.clientY-i,g=Math.sqrt(r*r+d*d),l=Math.min(g,a),h=Math.atan2(d,r),m=Math.cos(h)*l,f=Math.sin(h)*l;this.joystickKnob.style.transform=`translate(calc(-50% + ${m}px), calc(-50% + ${f}px))`,this.joystickInput.x=m/a,this.joystickInput.y=f/a}),this.joystick.addEventListener("touchend",s=>{s.preventDefault(),e=null,this.joystickActive=!1,this.joystickInput={x:0,y:0},this.joystickKnob.style.transform="translate(-50%, -50%)"})}update(e){if(!this.isMobile||!this.game.player)return;const t=this.game.player,n=t.isInVehicle;if(this.drivingPad&&(this.drivingPad.style.display=n?"grid":"none"),n){this.game.actionInput?.setTouchDriving({throttle:this.drivingButtons.throttle?1:0,brake:this.drivingButtons.brake?1:0,steer:(this.drivingButtons.right?1:0)-(this.drivingButtons.left?1:0),handbrake:!!this.drivingButtons.handbrake});return}if(this.game.actionInput?.setTouchDriving({throttle:0,brake:0,steer:0,handbrake:!1}),this.joystickActive){const i=new c(0,0,-1).applyEuler(new p(0,t.rotation.y,0)),a=new c(1,0,0).applyEuler(new p(0,t.rotation.y,0)),s=new c;s.addScaledVector(i,-this.joystickInput.y),s.addScaledVector(a,this.joystickInput.x);const o=t.isRunning?t.runSpeed:t.walkSpeed;t.velocity.x=s.x*o,t.velocity.z=s.z*o}}createAIButtons(){const e=document.createElement("div");e.id="mobile-ai-buttons",e.style.cssText=`
            position: fixed;
            top: 20px;
            left: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            z-index: 1000;
        `;const t=this.createSmallButton("🤖","AI Chat",()=>{this.game.aiChatUI&&this.game.aiChatUI.toggle()}),n=this.createSmallButton("🎯","Mission",()=>{this.game.generateQuickMission&&this.game.generateQuickMission()}),i=this.createSmallButton("📻","Radio",()=>{this.game.toggleRadio&&this.game.toggleRadio()}),a=this.createSmallButton("💾","Save",()=>{this.game.saveSystem&&this.game.saveSystem.save()});e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(a),document.body.appendChild(e)}createSmallButton(e,t,n){const i=document.createElement("button");return i.style.cssText=`
            width: 45px;
            height: 45px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 255, 255, 0.5);
            border-radius: 8px;
            font-size: 18px;
            color: white;
            cursor: pointer;
            touch-action: manipulation;
            display: flex;
            align-items: center;
            justify-content: center;
        `,i.textContent=e,i.title=t,i.addEventListener("touchstart",a=>{a.preventDefault(),n(),i.style.background="rgba(0, 255, 255, 0.5)"}),i.addEventListener("touchend",()=>{i.style.background="rgba(0, 0, 0, 0.7)"}),i}createMobileHUD(){const e=document.createElement("div");e.id="mobile-hud",e.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 10px;
            z-index: 1000;
            pointer-events: none;
        `;const t=document.createElement("div");t.id="mobile-health",t.style.cssText=`
            width: 100px;
            height: 12px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #ff0000;
            border-radius: 6px;
            overflow: hidden;
        `,t.innerHTML='<div style="height: 100%; background: #ff0000; width: 100%;"></div>';const n=document.createElement("div");n.id="mobile-armor",n.style.cssText=`
            width: 100px;
            height: 12px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #0000ff;
            border-radius: 6px;
            overflow: hidden;
        `,n.innerHTML='<div style="height: 100%; background: #0000ff; width: 0%;"></div>';const i=document.createElement("div");i.id="mobile-wanted",i.style.cssText=`
            display: flex;
            gap: 2px;
        `,e.appendChild(t),e.appendChild(n),e.appendChild(i),document.body.appendChild(e)}updateHUD(){if(!this.game.player)return;const e=document.querySelector("#mobile-health > div"),t=document.querySelector("#mobile-armor > div");e&&(e.style.width=`${this.game.player.health}%`),t&&(t.style.width=`${this.game.player.armor}%`)}}class b{constructor(e){this.game=e,this.controller=null,this.connected=!1,this.deadzone=.15,this.setupControllerEvents(),this.setupGamepadAPI()}setupControllerEvents(){window.addEventListener("gamepadconnected",e=>{console.log("Gamepad connected:",e.gamepad.id),this.controller=e.gamepad,this.connected=!0,this.showNotification("🎮 CONTROLLER CONNECTED",e.gamepad.id)}),window.addEventListener("gamepaddisconnected",e=>{console.log("Gamepad disconnected:",e.gamepad.id),this.controller=null,this.connected=!1,this.showNotification("🎮 CONTROLLER DISCONNECTED","Switching to touch controls")})}setupGamepadAPI(){setInterval(()=>{if(!this.controller){const e=navigator.getGamepads();for(let t=0;t<e.length;t++)if(e[t]){this.controller=e[t],this.connected=!0;break}}},1e3)}update(e){if(!this.controller)return;const t=navigator.getGamepads();this.controller=t[this.controller.index]||this.controller;const n=this.controller;if(!n)return;const i=this.applyDeadzone(n.axes[0]),a=this.applyDeadzone(n.axes[1]);if(this.game.player?.isInVehicle?this.game.actionInput?.setControllerDriving({steer:i,throttle:Math.max(0,n.buttons[7]?.value||(n.buttons[7]?.pressed?1:0)),brake:Math.max(0,n.buttons[6]?.value||(n.buttons[6]?.pressed?1:0)),handbrake:!!n.buttons[4]?.pressed}):this.game.actionInput?.setControllerDriving({throttle:0,brake:0,steer:0,handbrake:!1}),this.game.player&&!this.game.player.isInVehicle){const r=this.game.player,d=new c(0,0,-1).applyEuler(new p(0,r.rotation.y,0)),g=new c(1,0,0).applyEuler(new p(0,r.rotation.y,0)),l=new c;l.addScaledVector(d,-a),l.addScaledVector(g,i);const h=r.isRunning?r.runSpeed:r.walkSpeed;r.velocity.x=l.x*h,r.velocity.z=l.z*h}const s=this.applyDeadzone(n.axes[2]),o=this.applyDeadzone(n.axes[3]);this.game.player&&(this.game.player.rotation.y-=s*.05,this.game.player.rotation.x-=o*.05,this.game.player.rotation.x=Math.max(-Math.PI/3,Math.min(Math.PI/3,this.game.player.rotation.x))),this.handleButtons(n)}applyDeadzone(e){return Math.abs(e)<this.deadzone?0:e}handleButtons(e){const t=this.game.player;t&&(e.buttons[0]?.pressed&&(t.onGround&&!t.isInVehicle?t.jump():t.isInVehicle||this.game.interactionSystem?.interact()),e.buttons[1]?.pressed&&t.isInVehicle&&t.exitVehicle(),e.buttons[2]?.pressed&&this.game.combatSystem&&this.game.combatSystem.attack(),e.buttons[3]?.pressed&&this.game.generateQuickMission&&this.game.generateQuickMission(),e.buttons[4]?.pressed?this.game.combatSystem&&(this.game.combatSystem.isAiming=!0):this.game.combatSystem&&(this.game.combatSystem.isAiming=!1),e.buttons[5]?.pressed?t.isRunning=!0:t.isRunning=!1,e.buttons[12]?.pressed&&this.game.aiChatUI&&this.game.aiChatUI.toggle(),e.buttons[13]?.pressed&&this.game.toggleRadio&&this.game.toggleRadio(),e.buttons[14]?.pressed&&this.game.charCustom&&this.game.charCustom.openCustomization(),e.buttons[15]?.pressed&&this.game.propertySystem&&this.game.propertySystem.toggleUI(),e.buttons[8]?.pressed,e.buttons[9]?.pressed,e.buttons[10]?.pressed,e.buttons[11]?.pressed&&this.game.player&&(this.game.player.rotation.x=0))}showNotification(e,t){this.game.showNotification&&this.game.showNotification(e,t)}createStatusIndicator(){this.indicator=document.createElement("div"),this.indicator.id="controller-status",this.indicator.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 8px 12px;
            color: #00ff00;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
        `,this.indicator.textContent="🎮 Controller: Disconnected",document.body.appendChild(this.indicator),setInterval(()=>{this.connected?(this.indicator.textContent="🎮 Controller: Connected",this.indicator.style.borderColor="#00ff00",this.indicator.style.color="#00ff00"):(this.indicator.textContent="🎮 Controller: Touch Mode",this.indicator.style.borderColor="#666",this.indicator.style.color="#666")},1e3)}}typeof window<"u"&&(window.ControllerSupport=b);class x{constructor(){this.synth=window.speechSynthesis,this.voices=[],this.currentVoice=null,this.loadVoices(),this.synth.onvoiceschanged!==void 0&&(this.synth.onvoiceschanged=()=>this.loadVoices())}loadVoices(){this.voices=this.synth.getVoices()}findVoice(e){const n={chinese_singaporean:{lang:"zh-SG",fallback:"en-SG"},malay_singaporean:{lang:"ms-SG",fallback:"en-SG"},indian_singaporean:{lang:"ta-SG",fallback:"en-SG"},eurasian_singaporean:{lang:"en-SG",fallback:"en-GB"},filipino:{lang:"fil-PH",fallback:"en-PH"},indonesian:{lang:"id-ID",fallback:"en-SG"},malaysian:{lang:"ms-MY",fallback:"en-MY"},bangladeshi:{lang:"bn-BD",fallback:"en-GB"},thai:{lang:"th-TH",fallback:"en-SG"},myanmar:{lang:"my-MM",fallback:"en-SG"}}[e]||{lang:"en-SG",fallback:"en-GB"};let i=this.voices.find(a=>a.lang===n.lang);return i||(i=this.voices.find(a=>a.lang===n.fallback),i)||(i=this.voices.find(a=>a.lang.startsWith(n.lang.split("-")[0])),i)?i:this.voices[0]||null}speak(e,t="chinese_singaporean",n={}){if(!this.synth)return;this.synth.cancel();const i=new SpeechSynthesisUtterance(e),a=this.findVoice(t);a&&(i.voice=a);const o={chinese_singaporean:{pitch:1.1,rate:1.1},malay_singaporean:{pitch:1,rate:1},indian_singaporean:{pitch:1.05,rate:1.15},eurasian_singaporean:{pitch:1,rate:1},filipino:{pitch:1.15,rate:1.1},indonesian:{pitch:1,rate:1},malaysian:{pitch:1,rate:1.05},bangladeshi:{pitch:.95,rate:.95},thai:{pitch:1.1,rate:.95},myanmar:{pitch:1,rate:.9}}[t]||{pitch:1,rate:1};return i.pitch=n.pitch||o.pitch,i.rate=n.rate||o.rate,i.volume=n.volume||1,this.synth.speak(i),i}speakSinglish(e,t="chinese_singaporean"){const i={chinese_singaporean:["lah","leh","lor","meh","sia"],malay_singaporean:["lah","leh","kan","je"],indian_singaporean:["lah","leh","da","ya"],eurasian_singaporean:["lah","leh","lor"],filipino:["po","opo","ba","naman"],indonesian:["sih","dong","deh","aja"],malaysian:["lah","leh","lor","kan"],bangladeshi:["na","to","ki"],thai:["ka","krub","na","ja"],myanmar:["na","le","de","ba"]}[t]||["lah"],a=i[Math.floor(Math.random()*i.length)];return!e.endsWith(a)&&!e.endsWith("!")&&!e.endsWith("?")&&(e+=" "+a),this.speak(e,t)}stop(){this.synth&&this.synth.cancel()}isSpeaking(){return this.synth?this.synth.speaking:!1}getAvailableVoices(){return this.voices.map(e=>({name:e.name,lang:e.lang}))}}const w=new x;class C{constructor(e){this.gameMaster=e,this.isOpen=!1,this.messages=[],this.createUI()}createUI(){this.container=document.createElement("div"),this.container.id="ai-chat-ui",this.container.style.cssText=`
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 500px;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ffff;
            border-radius: 12px;
            display: none;
            flex-direction: column;
            z-index: 10000;
            font-family: 'Courier New', monospace;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
            overflow: hidden;
        `,this.container.innerHTML=`
            <div style="
                background: linear-gradient(90deg, #00ffff, #ff00ff);
                padding: 12px;
                font-weight: bold;
                color: #000;
                display: flex;
                justify-content: space-between;
                align-items: center;
            ">
                <span>🤖 AI Game Master</span>
                <button id="ai-chat-close" style="
                    background: none; border: none; color: #000;
                    font-size: 20px; cursor: pointer; padding: 0 8px;
                ">×</button>
            </div>
            <div id="ai-chat-messages" style="
                flex: 1; overflow-y: auto; padding: 12px;
                display: flex; flex-direction: column; gap: 8px;
            "></div>
            <div style="padding: 12px; border-top: 1px solid #333; display: flex; gap: 8px;">
                <select id="ai-chat-mode" style="
                    flex: 1; background: #1a1a2e; color: #00ffff;
                    border: 1px solid #00ffff; border-radius: 4px; padding: 8px;
                ">
                    <option value="mission">🎯 Generate Mission</option>
                    <option value="dialogue">💬 NPC Dialogue</option>
                    <option value="radio">📻 Radio Commentary</option>
                    <option value="event">🌍 World Event</option>
                    <option value="chat">💭 Free Chat</option>
                </select>
                <button id="ai-chat-send" style="
                    background: linear-gradient(90deg, #00ffff, #ff00ff);
                    border: none; color: #000; font-weight: bold;
                    padding: 8px 16px; border-radius: 4px; cursor: pointer;
                ">Send</button>
            </div>
            <div style="padding: 0 12px 12px; display: flex; gap: 8px;">
                <input type="text" id="ai-chat-input" placeholder="Ask anything about Singapore Streets..." style="
                    flex: 1; background: #1a1a2e; color: #fff;
                    border: 1px solid #333; border-radius: 4px; padding: 8px;
                    outline: none;
                ">
            </div>
        `,document.body.appendChild(this.container),document.getElementById("ai-chat-close").onclick=()=>this.toggle(),document.getElementById("ai-chat-send").onclick=()=>this.sendMessage(),document.getElementById("ai-chat-input").addEventListener("keypress",e=>{e.key==="Enter"&&this.sendMessage()}),this.addQuickActions()}addQuickActions(){const e=document.createElement("div");e.style.cssText=`
            padding: 0 12px 12px; display: flex; flex-wrap: wrap; gap: 6px;
        `,[{label:"🎯 New Mission",mode:"mission",prompt:"Generate a new mission for me"},{label:"🚕 Taxi Uncle",mode:"dialogue",prompt:"Taxi driver dialogue"},{label:"🍚 Hawker Auntie",mode:"dialogue",prompt:"Hawker centre dialogue"},{label:"📻 Radio DJ",mode:"radio",prompt:"Radio commentary"},{label:"🌧️ Weather Event",mode:"event",prompt:"Random weather event"},{label:"🚨 Police",mode:"dialogue",prompt:"Police checkpoint dialogue"}].forEach(n=>{const i=document.createElement("button");i.textContent=n.label,i.style.cssText=`
                background: rgba(0, 255, 255, 0.1); border: 1px solid #00ffff;
                color: #00ffff; padding: 4px 8px; border-radius: 3px;
                font-size: 11px; cursor: pointer; transition: all 0.2s;
            `,i.onmouseover=()=>i.style.background="rgba(0, 255, 255, 0.3)",i.onmouseout=()=>i.style.background="rgba(0, 255, 255, 0.1)",i.onclick=()=>this.quickAction(n.mode,n.prompt),e.appendChild(i)}),this.container.querySelector("#ai-chat-input").parentElement.parentElement.insertBefore(e,this.container.querySelector("#ai-chat-input").parentElement)}toggle(){this.isOpen=!this.isOpen,this.container.style.display=this.isOpen?"flex":"none",this.isOpen&&document.getElementById("ai-chat-input").focus()}async sendMessage(){const e=document.getElementById("ai-chat-input"),t=document.getElementById("ai-chat-mode").value,n=e.value.trim();if(n){e.value="",this.addMessage("user",n),this.showTyping();try{let i;switch(t){case"mission":const a=await this.gameMaster.generateMission({});i=`🎯 **${a.title}**
${a.description}

📍 ${a.location}
💰 $${a.reward.money} | ⭐ ${a.reward.rep} rep
⏱️ ${a.timeLimit?a.timeLimit+"s":"No limit"}`;break;case"dialogue":i=await this.gameMaster.generateNPCDialogue("hawker",n);break;case"radio":i=await this.gameMaster.generateRadioCommentary({});break;case"event":const s=await this.gameMaster.generateWorldEvent({});i=`🌍 **${s.type.replace("_"," ").toUpperCase()}** at ${s.location}
${s.description}
⏱️ ${s.duration}s
🎮 Effects: ${s.effects.join(", ")}`;break;default:i=await this.gameMaster.callLLM(`You're the AI Game Master for Singapore Streets, a GTA-style open world game set in Singapore. Player asks: ${n}. Respond in character with Singapore flavor, keep it under 100 words.`)}this.hideTyping(),this.addMessage("ai",i)}catch{this.hideTyping(),this.addMessage("ai",`⚠️ AI unavailable. Using local fallback.
`+this.gameMaster.getFallbackDialogue("hawker"))}}}async quickAction(e,t){document.getElementById("ai-chat-mode").value=e,document.getElementById("ai-chat-input").value=t,this.sendMessage()}addMessage(e,t){const n=document.getElementById("ai-chat-messages"),i=document.createElement("div");i.style.cssText=`
            max-width: 85%; padding: 10px 14px; border-radius: 12px;
            font-size: 13px; line-height: 1.5; animation: slideIn 0.3s ease;
            ${e==="user"?"align-self: flex-end; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000;":"align-self: flex-start; background: rgba(0, 255, 255, 0.1); color: #00ffff; border: 1px solid rgba(0, 255, 255, 0.3);"}
        `,i.innerHTML=t.replace(/\n/g,"<br>"),n.appendChild(i),n.scrollTop=n.scrollHeight}showTyping(){const e=document.getElementById("ai-chat-messages");this.typingDiv=document.createElement("div"),this.typingDiv.style.cssText=`
            align-self: flex-start; background: rgba(255, 0, 255, 0.1); color: #ff00ff;
            padding: 10px 14px; border-radius: 12px; font-size: 13px;
            border: 1px solid rgba(255, 0, 255, 0.3);
        `,this.typingDiv.innerHTML='<span class="typing-dots">AI thinking</span>',e.appendChild(this.typingDiv),e.scrollTop=e.scrollHeight;let t="";this.typingInterval=setInterval(()=>{t=t.length>=3?"":t+".",this.typingDiv.querySelector(".typing-dots").textContent="AI thinking"+t},400)}hideTyping(){this.typingDiv&&(this.typingDiv.remove(),clearInterval(this.typingInterval))}}const y=document.createElement("style");y.textContent=`
@keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;document.head.appendChild(y);export{C as A,b as C,k as M,w as v};

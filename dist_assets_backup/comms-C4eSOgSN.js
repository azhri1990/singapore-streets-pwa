class n{constructor(){this.currentChannel="CH1",this.callSign="Alpha-1",this.volume=.8}generatePoliceMessage(t,e,i={}){const s={patrol:[`${this.callSign} to control, patrolling ${e}, all clear.`,`${this.callSign} to control, ${e} quiet, no activity.`,`${this.callSign} to control, traffic flowing smoothly at ${e}.`],crime:[`${this.callSign} to control, crime reported at ${e}. Responding.`,`${this.callSign} to control, suspicious activity at ${e}. Investigating.`,`${this.callSign} to control, assistance required at ${e}.`],chase:[`${this.callSign} to control, in pursuit of suspect vehicle at ${e}.`,`${this.callSign} to control, suspect heading towards ${e}. Requesting backup.`,`${this.callSign} to control, high speed chase on ${e}.`],arrest:[`${this.callSign} to control, suspect apprehended at ${e}.`,`${this.callSign} to control, arrest made at ${e}. Transporting to station.`,`${this.callSign} to control, one in custody at ${e}.`],traffic:[`${this.callSign} to control, traffic accident at ${e}. Requesting tow truck.`,`${this.callSign} to control, road obstruction at ${e}.`,`${this.callSign} to control, ERP gantry malfunction at ${e}.`],erp:[`${this.callSign} to control, ERP check at ${e}. Collecting tolls.`,`${this.callSign} to control, ERP system operational at ${e}.`]},o=s[t]||s.patrol;return o[Math.floor(Math.random()*o.length)]}generateSCDFMessage(t,e,i={}){const s={fire:[`SCDF ${this.callSign} to control, fire reported at ${e}. En route.`,`SCDF ${this.callSign} to control, structure fire at ${e}. Requesting additional units.`,`SCDF ${this.callSign} to control, fire under control at ${e}.`],medical:[`SCDF ${this.callSign} to control, medical emergency at ${e}. En route.`,`SCDF ${this.callSign} to control, patient transported to hospital from ${e}.`,`SCDF ${this.callSign} to control, medical assistance provided at ${e}.`],rescue:[`SCDF ${this.callSign} to control, rescue operation at ${e}.`,`SCDF ${this.callSign} to control, person rescued at ${e}.`,`SCDF ${this.callSign} to control, rescue completed at ${e}.`],hazmat:[`SCDF ${this.callSign} to control, hazmat incident at ${e}. Evacuating area.`,`SCDF ${this.callSign} to control, chemical spill at ${e}. Containing.`]},o=s[t]||s.medical;return o[Math.floor(Math.random()*o.length)]}generateICAMessage(t,e={}){const i=[`ICA ${this.callSign} to control, checkpoint at ${t}. All clear.`,`ICA ${this.callSign} to control, heavy traffic at ${t} checkpoint.`,`ICA ${this.callSign} to control, immigration check completed at ${t}.`,`ICA ${this.callSign} to control, suspicious vehicle at ${t}. Inspecting.`];return i[Math.floor(Math.random()*i.length)]}playMessage(t,e="spf"){if(window.voiceSynth){const i={spf:"chinese_singaporean",scdf:"malay_singaporean",ica:"indian_singaporean"};window.voiceSynth.speak(t,i[e]||"chinese_singaporean",{rate:1.1,pitch:.9})}}setChannel(t){this.currentChannel=t}setCallSign(t){this.callSign=t}}class l{constructor(t){this.game=t,this.walkieTalkie=new n,this.activeChannel="CH1",this.dispatchMessages=[],this.setupUI(),this.startDispatchLoop()}setupUI(){this.walkieUI=document.createElement("div"),this.walkieUI.id="walkie-talkie-ui",this.walkieUI.style.cssText=`
            position: fixed;
            bottom: 100px;
            left: 20px;
            width: 350px;
            background: rgba(0, 0, 0, 0.9);
            border: 2px solid #00ff00;
            border-radius: 8px;
            padding: 12px;
            color: #00ff00;
            font-family: monospace;
            font-size: 11px;
            z-index: 1000;
            display: none;
        `,document.body.appendChild(this.walkieUI),this.dispatchLog=document.createElement("div"),this.dispatchLog.id="dispatch-log",this.dispatchLog.style.cssText=`
            position: fixed;
            top: 100px;
            left: 20px;
            width: 400px;
            max-height: 200px;
            overflow-y: auto;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff00;
            border-radius: 8px;
            padding: 8px;
            color: #00ff00;
            font-family: monospace;
            font-size: 10px;
            z-index: 999;
            display: none;
        `,document.body.appendChild(this.dispatchLog)}toggleWalkieTalkie(){this.walkieUI.style.display=this.walkieUI.style.display==="none"?"block":"none",this.walkieUI.style.display==="block"&&this.updateWalkieUI()}toggleDispatchLog(){this.dispatchLog.style.display=this.dispatchLog.style.display==="none"?"block":"none"}toggleResponsePanel(){this.responsePanel||this.createResponsePanel(),this.responsePanel.style.display=this.responsePanel.style.display==="none"?"block":"none"}createResponsePanel(){this.responsePanel=document.createElement("div"),this.responsePanel.id="response-panel",this.responsePanel.style.cssText=`
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-height: 600px;
            overflow-y: auto;
            background: rgba(10, 10, 30, 0.95);
            border: 2px solid #00ff00;
            border-radius: 12px;
            padding: 20px;
            color: #fff;
            font-family: monospace;
            font-size: 11px;
            z-index: 10000;
        `;let t='<h2 style="color: #00ff00; margin-bottom: 15px;">🚑 SINGAPORE RESPONSE PROTOCOLS</h2>';t+='<div style="margin-bottom: 10px; color: #ffff00;">Press P to close</div>',t+='<h3 style="color: #00ffff; margin: 10px 0 5px;">SCDF Response Times</h3>',t+='<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">',t+='<tr style="background: rgba(0,255,0,0.2);"><th style="padding: 4px; text-align: left;">Type</th><th style="padding: 4px;">Target</th><th style="padding: 4px;">Priority</th></tr>';const e={"Fire Emergency":"8 min","Medical Emergency":"8 min","Rescue Operation":"12 min","Hazmat Incident":"15 min","False Alarm":"15 min"};for(const[s,o]of Object.entries(e))t+=`<tr><td style="padding: 4px;">${s}</td><td style="padding: 4px; text-align: center;">${o}</td><td style="padding: 4px; text-align: center;">P1</td></tr>`;t+="</table>",t+='<h3 style="color: #00ffff; margin: 10px 0 5px;">SPF Response Times</h3>',t+='<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">',t+='<tr style="background: rgba(0,255,0,0.2);"><th style="padding: 4px; text-align: left;">Type</th><th style="padding: 4px;">Target</th><th style="padding: 4px;">Priority</th></tr>';const i={"Emergency (999)":"15 min",Urgent:"30 min",Routine:"60 min",Investigation:"120 min"};for(const[s,o]of Object.entries(i))t+=`<tr><td style="padding: 4px;">${s}</td><td style="padding: 4px; text-align: center;">${o}</td><td style="padding: 4px; text-align: center;">P1-P4</td></tr>`;t+="</table>",t+='<h3 style="color: #00ffff; margin: 10px 0 5px;">Tactical Formations</h3>',t+='<div style="margin-bottom: 8px;">Police: Patrol, Chase, Roadblock, Perimeter, Entry</div>',t+='<div style="margin-bottom: 8px;">SCDF: Fire Attack, Rescue, Medical</div>',t+='<h3 style="color: #00ffff; margin: 10px 0 5px;">Activation Steps</h3>',t+='<div style="font-size: 10px; color: #888;">',t+="1. Receive call (5s) → 2. Verify (15-30s) → 3. Dispatch (20s) → 4. Deploy (60s) → 5. En route → 6. Arrive (target time) → 7. Begin operation",t+="</div>",this.responsePanel.innerHTML=t,document.body.appendChild(this.responsePanel)}updateWalkieUI(){this.walkieUI.innerHTML=`
            <div style="color: #00ff00; font-weight: bold; margin-bottom: 8px;">
                📻 WALKIE-TALKIE
            </div>
            <div style="margin-bottom: 8px;">
                Channel: <span style="color: #ffff00;">${this.activeChannel}</span>
                Call Sign: <span style="color: #ffff00;">${this.walkieTalkie.callSign}</span>
            </div>
            <div style="margin-bottom: 8px;">
                <button onclick="window.game.govComms.setChannel('CH1')" style="padding: 2px 8px; margin-right: 4px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH1</button>
                <button onclick="window.game.govComms.setChannel('CH2')" style="padding: 2px 8px; margin-right: 4px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH2</button>
                <button onclick="window.game.govComms.setChannel('CH3')" style="padding: 2px 8px; background: #003300; color: #00ff00; border: 1px solid #00ff00; border-radius: 3px; cursor: pointer;">CH3</button>
            </div>
            <div style="margin-bottom: 8px;">
                <button onclick="window.game.govComms.sendPoliceMessage('patrol')" style="padding: 4px 8px; margin-right: 4px; background: #000033; color: #00ffff; border: 1px solid #00ffff; border-radius: 3px; cursor: pointer;">Patrol</button>
                <button onclick="window.game.govComms.sendPoliceMessage('crime')" style="padding: 4px 8px; margin-right: 4px; background: #330000; color: #ff0000; border: 1px solid #ff0000; border-radius: 3px; cursor: pointer;">Crime</button>
                <button onclick="window.game.govComms.sendPoliceMessage('chase')" style="padding: 4px 8px; margin-right: 4px; background: #330000; color: #ff0000; border: 1px solid #ff0000; border-radius: 3px; cursor: pointer;">Chase</button>
                <button onclick="window.game.govComms.sendSCDFMessage('medical')" style="padding: 4px 8px; background: #330000; color: #ff8800; border: 1px solid #ff8800; border-radius: 3px; cursor: pointer;">Medical</button>
            </div>
            <div style="font-size: 10px; color: #888;">
                Press W to close | 999 Police | 995 Fire/Ambulance
            </div>
        `}setChannel(t){this.activeChannel=t,this.walkieTalkie.setChannel(t),this.updateWalkieUI()}sendPoliceMessage(t,e=null){const i=e||this.getRandomLocation(),s=this.walkieTalkie.generatePoliceMessage(t,i);this.addDispatchMessage("SPF",s),this.walkieTalkie.playMessage(s,"spf")}sendSCDFMessage(t,e=null){const i=e||this.getRandomLocation(),s=this.walkieTalkie.generateSCDFMessage(t,i);this.addDispatchMessage("SCDF",s),this.walkieTalkie.playMessage(s,"scdf")}sendICAMessage(t=null){const e=t||"Woodlands Checkpoint",i=this.walkieTalkie.generateICAMessage(e);this.addDispatchMessage("ICA",i),this.walkieTalkie.playMessage(i,"ica")}addDispatchMessage(t,e){const i=new Date().toLocaleTimeString();this.dispatchMessages.push({agency:t,message:e,timestamp:i}),this.dispatchMessages.length>50&&this.dispatchMessages.shift(),this.updateDispatchLog()}updateDispatchLog(){let t='<div style="color: #00ff00; font-weight: bold; margin-bottom: 4px;">DISPATCH LOG</div>';this.dispatchMessages.slice(-10).forEach(e=>{const i=e.agency==="SPF"?"#00ffff":e.agency==="SCDF"?"#ff8800":"#00ff00";t+=`<div style="margin-bottom: 2px;"><span style="color: #888;">[${e.timestamp}]</span> <span style="color: ${i};">${e.agency}:</span> ${e.message}</div>`}),this.dispatchLog.innerHTML=t}getRandomLocation(){const t=["Marina Bay","Orchard Road","Chinatown","Little India","Geylang","Toa Payoh","Jurong East","Tampines","Woodlands","Bedok","Ang Mo Kio","Bishan","Clementi","Bukit Batok","Yishun","Sembawang","Pasir Ris","Changi","Sentosa"];return t[Math.floor(Math.random()*t.length)]}startDispatchLoop(){setInterval(()=>{if(Math.random()<.3){const t=["patrol","traffic","crime"],e=t[Math.floor(Math.random()*t.length)];this.sendPoliceMessage(e)}if(Math.random()<.1){const t=["medical","fire"],e=t[Math.floor(Math.random()*t.length)];this.sendSCDFMessage(e)}},15e3)}update(t){this.dispatchLog.style.display!=="none"&&this.updateDispatchLog()}}typeof window<"u"&&(window.SingaporeGovCommsSystem=l);export{l as S};

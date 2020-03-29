import{PolymerElement}from"./node_modules/@polymer/polymer/polymer-element.js";import"./node_modules/@polymer/paper-behaviors/paper-ripple-behavior.js";const $_documentContainer=document.createElement("template");$_documentContainer.setAttribute("style","display: none;");$_documentContainer.innerHTML=`<dom-module id="voice-button">

  <!-- 
  Note: deprecation warning for styling master document doesn't apply within <template> tags
  Read more: https://www.polymer-project.org/blog/2017-10-18-upcoming-changes
   -->

  <template>

    <style>

      /* shadow DOM styles */      
      
      :host {
        /* red active color */
        --active-color: #fe4042;
        /* background color for button */
        --button-color: #FFFFFF;
        /* circle viz color (opacity is at 0.2) */
        --circle-viz-color:#000000;
        /* diameter of button, option can be changed by user */
        --button-diameter:100px;
        /* mic color*/
        --mic-color:#FFFFFF;
        /* text color, used for warning messaging*/
        --text-color:#666;
        
        display: inline-block;
        height: var(--button-diameter);
        width: var(--button-diameter);
      }

      #paper-button{
        outline:none;
        background:var(--button-color);
        border:none;
        width:100%;
        height:100%;
        min-width:0;
        border-radius:50%;
        cursor:pointer;
        transition: all ease 0.25s;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
        z-index:2;
        position:absolute;
        opacity:0.8;
        margin:0;
        left:0;
      }

      #paper-button.flat{
        box-shadow:0px 0px 0px 0px;
      }

      #paper-button:hover{
        box-shadow: 0 4px 7px 0 rgba(0,0,0,.20);
      }

      #paper-button.disabled{
        box-shadow: 0px 0px 0px 0px;
        cursor:not-allowed;
        opacity:0.5;
      }

      #paper-button.listening, #paper-button.user-input{
        box-shadow: 0px 0px 0px 0px;
        opacity:1; 
        background:var(--active-color);
      }

      #paper-button.flat:hover{
        box-shadow:0px 0px 0px 0px; 
      }

      #paper-button.disabled:hover{
        box-shadow: 0px 0px 0px 0px;
      }

      #circle-viz-container{
        position:absolute;
        z-index:0;
        opacity:0;
      }

      .svg-container{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(255, 0, 0, 0);
        z-index:3;
        pointer-events: none;
      }

      #mic-svg, #mic-svg-disabled, #mic-loading{
        height: 64%;
        width:100%;
        display: block;
        position: absolute;
        top: -11%;
        left: 0px;
        transform:translate(0, 50%);
        z-index:3;
        pointer-events:none;
      }

      #mic-loading {
        opacity: 0;
        top: -14%;
        transform: translate(0, 50%) scale(0.8, 0.8);
      }

      #mic-loading circle:nth-child(1) {
        animation: 0.7s micLoading 0s infinite;
      }

      #mic-loading circle:nth-child(2) {
        animation: 0.7s micLoading 0.3s infinite;
      }

      #mic-loading circle:nth-child(3) {
        animation: 0.7s micLoading 0.5s infinite;
      }

      @keyframes micLoading {
        to {
          fill-opacity: 0;
        }
        from {
          fill-opacity: 1;
        }
      }


      /* show the disabled mic when in disabled state */
      .container #mic-svg-disabled{ display:none; }
      .container.disabled #mic-svg-disabled{ display:block; }
      .container.disabled #mic-svg{ display:none; }
      .container.listening #mic-svg, .container.user-input #mic-svg { fill: #FFFFFF !important; }


      .container{
        position:absolute;
        height: var(--button-diameter);
        width: var(--button-diameter);
      }

      .circle{
        width:calc(var(--button-diameter) - 4px);
        height:calc(var(--button-diameter) - 4px);
        background-color:var(--circle-viz-color);
        opacity:0.2;
        border-radius:50%;
        position:absolute;
        transform-origin: center center;
        transform:scale(1);
      }

      #mic-not-allowed{
        font-family: 'Noto Sans', sans-serif;
        font-size: 1.0em;
        -webkit-font-smoothing: antialiased;
        color: var(--text-color);
        width: 210px;
        top: 100%;
        display: none;
        position: absolute;
        margin-left: 0px;
        transform: translateX(-50%);
        left: 50%;
        font-weight: 400;
        text-align: center;
        vertical-align: bottom;
        margin-top: 15px;
      }
      #mic-not-allowed.show{
        display:block;
      }

      paper-ripple{
        position:absolute;
      }

    </style>


    <!-- shadow DOM -->
    <div class\$="container [[state]]">

      <!-- rings that scale out from button with user input (only available with autodetect)  -->
      <div id="circle-viz-container"></div>
      
      <!-- clickable button -->
      <button id="paper-button" class\$="voice-button [[state]] [[flatStr]] [[autoDetectStr]]"><paper-ripple></paper-ripple></button>
      
      <div class="svg-container">
        <!-- mic icon -->
        <svg id="mic-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="#000000">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
        <svg id="mic-svg-disabled" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="#000000">
            <path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"></path>
            <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"></path>
        </svg>
      <svg id="mic-loading" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 727 353" fill="#ffffff">
        <circle cx="136.5" cy="176.5" r="73.5"></circle>
        <circle cx="363.5" cy="176.5" r="73.5"></circle>
        <circle cx="590.5" cy="176.5" r="73.5"></circle>
      </svg>
      </div>

      <div id="mic-not-allowed">Cannot access microphone</div>
    
    </div>

  </template>

  

</dom-module>`;document.head.appendChild($_documentContainer.content);window.AudioContext=window.AudioContext||window.webkitAudioContext;function VoiceRecorder(autodetect,onStopRecordComplete,timeoutval){this.autodetect=autodetect;this.onStopRecordComplete=onStopRecordComplete;this.microphone;this.isRecording=!1;this.isSpeaking=!1;this.audioContext;this.leftChannel=[];this.recordingLength=0;this.processor;this.timeoutval=timeoutval;this.config={sampleRate:44100,bufferLen:4096,numChannels:1,mimeType:"audio/mpeg"};this.analyzer=context=>{let listener=context.createAnalyser();this.microphone.connect(listener);listener.fftSize=256;var bufferLength=listener.frequencyBinCount;new Uint8Array(bufferLength)};this.onAudioProcess=e=>{var left=e.inputBuffer.getChannelData(0);this.recordingLength+=this.config.bufferLen;this.leftChannel.push(new Float32Array(left));var sum=0,i;for(i=0;i<left.length;++i){sum+=left[i]*left[i];if(.99<Math.abs(left[i])){}}var volume=Math.sqrt(sum/left.length);if(volume>.01){this.isSpeaking=!0;clearTimeout(this.speakingTimeout)}else{if(this.isSpeaking){this.isSpeaking=!1;clearTimeout(this.speakingTimeout);console.log("adding timeout of ",this.timeoutval,this.assessmentToken);this.speakingTimeout=setTimeout(()=>{this.stopRecord()},this.timeoutval)}}};this.logError=error=>{console.error(error)};this.startRecord=()=>{this.audioContext=new AudioContext;if(this.audioContext.createJavaScriptNode){this.processor=this.audioContext.createJavaScriptNode(this.config.bufferLen,this.config.numChannels,this.config.numChannels)}else if(this.audioContext.createScriptProcessor){this.processor=this.audioContext.createScriptProcessor(this.config.bufferLen,this.config.numChannels,this.config.numChannels)}else{console.log("WebAudio API has no support on this browser.")}this.processor.connect(this.audioContext.destination);navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(this.gotStreamMethod.bind(this)).catch(this.logError)};this.getBuffers=event=>{for(var buffers=[],ch=0;2>ch;++ch){buffers[ch]=event.inputBuffer.getChannelData(ch)}return buffers};this.gotStreamMethod=stream=>{this.isRecording=!0;this.tracks=stream.getTracks();this.microphone=this.audioContext.createMediaStreamSource(stream);this.microphone.connect(this.processor);if(this.autodetect){this.processor.onaudioprocess=this.onAudioProcess}this.analyzer(this.audioContext)};this.clearRecordedData=()=>{this.recordingLength=0;this.leftChannel=[]};this.stopRecord=()=>{var callback=this.onStopRecordComplete;this.isRecording=!1;this.audioContext.close();this.processor.disconnect();this.tracks.forEach(track=>track.stop());this.mergeLeftRightBuffers({sampleRate:this.config.sampleRate,numberOfAudioChannels:this.config.numChannels,internalInterleavedLength:this.recordingLength,leftBuffers:this.leftChannel,rightBuffers:1===this.config.numChannels?[]:rightChannel},(buffer,view)=>{self.blob=new Blob([view],{type:"audio/wav"});self.buffer=new ArrayBuffer(view.buffer.byteLength);self.view=view;self.sampleRate=this.config.sampleRate;self.bufferSize=this.config.bufferLen;self.length=this.recordingLength;callback&&callback(self.blob);this.clearRecordedData();isAudioProcessStarted=!1})};this.mergeLeftRightBuffers=(config,callback)=>{var webWorker=this.processInWebWorker(function(config,cb){var numberOfAudioChannels=config.numberOfAudioChannels,leftBuffers=config.leftBuffers.slice(0),rightBuffers=config.rightBuffers.slice(0),sampleRate=config.sampleRate,internalInterleavedLength=config.internalInterleavedLength,desiredSampRate=config.desiredSampRate;if(2===numberOfAudioChannels){leftBuffers=mergeBuffers(leftBuffers,internalInterleavedLength);rightBuffers=mergeBuffers(rightBuffers,internalInterleavedLength);if(desiredSampRate){leftBuffers=interpolateArray(leftBuffers,desiredSampRate,sampleRate);rightBuffers=interpolateArray(rightBuffers,desiredSampRate,sampleRate)}}if(1===numberOfAudioChannels){leftBuffers=mergeBuffers(leftBuffers,internalInterleavedLength);if(desiredSampRate){leftBuffers=interpolateArray(leftBuffers,desiredSampRate,sampleRate)}}if(desiredSampRate){sampleRate=desiredSampRate}function interpolateArray(data,newSampleRate,oldSampleRate){var fitCount=Math.round(data.length*(newSampleRate/oldSampleRate)),newData=[],springFactor=+((data.length-1)/(fitCount-1));newData[0]=data[0];for(var i=1;i<fitCount-1;i++){var tmp=i*springFactor,before=(+Math.floor(tmp)).toFixed(),after=(+Math.ceil(tmp)).toFixed();newData[i]=linearInterpolate(data[before],data[after],tmp-before)}newData[fitCount-1]=data[data.length-1];return newData}function linearInterpolate(before,after,atPoint){return before+(after-before)*atPoint}function mergeBuffers(channelBuffer,rLength){for(var result=new Float64Array(rLength),offset=0,lng=channelBuffer.length,i=0,buffer;i<lng;i++){buffer=channelBuffer[i];result.set(buffer,offset);offset+=buffer.length}return result}function interleave(leftChannel,rightChannel){for(var length=leftChannel.length+rightChannel.length,result=new Float64Array(length),inputIndex=0,index=0;index<length;){result[index++]=leftChannel[inputIndex];result[index++]=rightChannel[inputIndex];inputIndex++}return result}function writeUTFBytes(view,offset,string){for(var lng=string.length,i=0;i<lng;i++){view.setUint8(offset+i,string.charCodeAt(i))}}var interleaved;if(2===numberOfAudioChannels){interleaved=interleave(leftBuffers,rightBuffers)}if(1===numberOfAudioChannels){interleaved=leftBuffers}var interleavedLength=interleaved.length,buffer=new ArrayBuffer(44+2*interleavedLength),view=new DataView(buffer);writeUTFBytes(view,0,"RIFF");view.setUint32(4,44+2*interleavedLength,!0);writeUTFBytes(view,8,"WAVE");writeUTFBytes(view,12,"fmt ");view.setUint32(16,16,!0);view.setUint16(20,1,!0);view.setUint16(22,numberOfAudioChannels,!0);view.setUint32(24,sampleRate,!0);view.setUint32(28,2*sampleRate,!0);view.setUint16(32,2*numberOfAudioChannels,!0);view.setUint16(34,16,!0);writeUTFBytes(view,36,"data");view.setUint32(40,2*interleavedLength,!0);for(var index=44,i=0;i<interleavedLength;i++){view.setInt16(index,interleaved[i]*(32767*1),!0);index+=2}if(cb){return cb({buffer:buffer,view:view})}postMessage({buffer:buffer,view:view})});webWorker.onmessage=function(event){callback(event.data.buffer,event.data.view);URL.revokeObjectURL(webWorker.workerURL)};webWorker.postMessage(config)};this.processInWebWorker=_function=>{var workerURL=URL.createObjectURL(new Blob([_function.toString(),";this.onmessage =  function (e) {"+_function.name+"(e.data);}"],{type:"application/javascript"})),worker=new Worker(workerURL);worker.workerURL=workerURL;return worker}}function CircleViz(containerEl,onNoMicAccess){this.containerEl=containerEl;this.stopped=!0;this.circle=document.createElement("div");this.circle.classList.add("circle");this.containerEl.appendChild(this.circle);this.isMobile=window.mobileAndTabletcheck();this.onNoMicAccess=onNoMicAccess;this.attachedUserMediaStream=!1;var AudioContext=window.AudioContext||window.webkitAudioContext;if("undefined"!==typeof AudioContext){this.audioContext=new AudioContext}this.attachUserMediaStream=()=>{if(!this.attachedUserMediaStream||this.audioStream&&!this.audioStream.active){if(this.isMobile){this.doDraw()}else{if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({audio:!0}).then(this.soundAllowed.bind(this)).catch(this.soundNotAllowed.bind(this))}else{navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||null;if(navigator.getUserMedia)navigator.getUserMedia({audio:!0},stream=>this.soundAllowed(stream),e=>this.soundNotAllowed(e))}}this.attachedUserMediaStream=!0}};this.soundNotAllowed=()=>{this.onNoMicAccess()};this.soundAllowed=stream=>{this.audioStream=stream;if(this.audioContext){var audioStream=this.audioContext.createMediaStreamSource(stream);this.analyser=this.audioContext.createAnalyser();audioStream.connect(this.analyser);this.analyser.fftSize=1024;this.frequencyArray=new Uint8Array(this.analyser.frequencyBinCount)}this.doDraw()};this.getCircleScale=()=>{let scale=1;if(this.analyser){this.analyser.getByteFrequencyData(this.frequencyArray);let freqSum=0;for(let i=0;255>i;i++){freqSum+=this.frequencyArray[i]}let freqAvg=freqSum/255;scale=1+1.2*(freqAvg/255)}else{let currScale=this.getCurrentScale();if(currScale){var rand=1+Math.random();scale=currScale+(rand-currScale)/8}}return scale};this.doDraw=()=>{if(!this.stopped){let newScale=this.getCircleScale();this.circle.style.transform="scale("+newScale+") translate(2px, 2px)"}else{let currScale=this.getCurrentScale();if(currScale){if(0<currScale){currScale=Math.max(0,currScale-.05);this.circle.style.transform="scale("+currScale+") translate(2px, 2px)"}}}this.animation=window.requestAnimationFrame(this.doDraw.bind(this))};this.getCurrentScale=()=>{let transformProp=this.circle.style.transform&&""!==this.circle.style.transform?this.circle.style.transform:"scale(1)",splitProperty=transformProp.split(new RegExp(/\(|\)/,"g"));if(2<splitProperty.length){let currScale=parseFloat(splitProperty[1]);return currScale}return null};this.startAnimation=()=>{if(this.stopped){this.containerEl.style.opacity=1;this.stopped=!1;this.attachUserMediaStream()}};this.stopAnimation=()=>{this.stopped=!0;this.containerEl.style.opacity=0;if(this.audioStream&&0<this.audioStream.getAudioTracks().length){this.audioStream.getAudioTracks()[0].stop()}}}window.componentTranslations={micNotAllowed:{af:"Kan nie toegang tot mikrofoon h\xEA nie",sq:"Nuk mund t\xEB hyni n\xEB mikrofon",am:"\u121B\u12ED\u12AD\u122E\u134E\u1295 \u1218\u12F5\u1228\u1235 \u12A0\u120D\u1270\u127B\u1208\u121D",ar:"\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0644\u062F\u062E\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u0645\u064A\u0643\u0631\u0648\u0641\u0648\u0646",hy:"\u0540\u0576\u0561\u0580\u0561\u057E\u0578\u0580 \u0579\u0567 \u0574\u0578\u0582\u057F\u0584 \u0563\u0578\u0580\u056E\u0565\u056C \u056D\u0578\u057D\u0561\u0583\u0578\u0572",az:"Mikrofona daxil ola bilmir",eu:"Ezin da mikrofonoa atzitu",be:"\u041D\u0435 \u045E\u0434\u0430\u0435\u0446\u0446\u0430 \u0430\u0442\u0440\u044B\u043C\u0430\u0446\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u0430 \u043C\u0456\u043A\u0440\u0430\u0444\u043E\u043D\u0443",bs:"Ne mogu pristupiti mikrofonu",bg:"\u041D\u044F\u043C\u0430 \u0434\u043E\u0441\u0442\u044A\u043F \u0434\u043E \u043C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0430",ca:"No es pot accedir al micr\xF2fon",ceb:"Dili maka-access sa mikropono",ny:"Sangathe kulumikiza maikolofoni",zh:"\u65E0\u6CD5\u8BBF\u95EE\u9EA6\u514B\u98CE","zh-TW":"\u7121\u6CD5\u8A2A\u554F\u9EA5\u514B\u98A8",co:"\xD9n pudete micca accede \xE0 u micrufonu",hr:"Nije mogu\u0107e pristupiti mikrofonu",cs:"Nem\xE1 p\u0159\xEDstup k mikrofonu",da:"Kan ikke f\xE5 adgang til mikrofonen",nl:"Kan geen microfoon openen",en:"Cannot access microphone",eo:"Ne povas aliri mikrofonon",et:"Ei saa mikrofoni juurde p\xE4\xE4seda",tl:"Hindi ma-access ang mikropono",fi:"Mikrofonia ei voi k\xE4ytt\xE4\xE4",fr:"Impossible d&#39;acc\xE9der au microphone",fy:"Kin gjin mikrofoan tagong krije",gl:"Non se pode acceder ao micr\xF3fono",ka:"\u10DB\u10D8\u10D9\u10E0\u10DD\u10E4\u10DD\u10DC\u10D8 \u10D5\u10D4\u10E0 \u10EC\u10D5\u10D3\u10DD\u10DB\u10D0",de:"Kann nicht auf Mikrofon zugreifen",el:"\u0394\u03B5\u03BD \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B4\u03C5\u03BD\u03B1\u03C4\u03AE \u03B7 \u03C0\u03C1\u03CC\u03C3\u03B2\u03B1\u03C3\u03B7 \u03C3\u03C4\u03BF \u03BC\u03B9\u03BA\u03C1\u03CC\u03C6\u03C9\u03BD\u03BF",gu:"\u0AAE\u0ABE\u0A87\u0A95\u0ACD\u0AB0\u0ACB\u0AAB\u0ACB\u0AA8\u0AA8\u0AC7 \u0A8D\u0A95\u0ACD\u0AB8\u0AC7\u0AB8 \u0A95\u0AB0\u0AC0 \u0AB6\u0A95\u0AA4\u0ABE \u0AA8\u0AA5\u0AC0",ht:"Pa ka jwenn mikwof\xF2n",ha:"Ba za a iya shiga makirufo ba",haw:"\u02BBA\u02BBole hiki ke ho\u02BBokomo i ka microphone",iw:"\u05DC\u05D0 \u05E0\u05D9\u05EA\u05DF \u05DC\u05D2\u05E9\u05EA \u05DC\u05DE\u05D9\u05E7\u05E8\u05D5\u05E4\u05D5\u05DF",hi:"\u092E\u093E\u0907\u0915\u094D\u0930\u094B\u092B\u093C\u094B\u0928 \u0924\u0915 \u0928\u0939\u0940\u0902 \u092A\u0939\u0941\u0902\u091A \u0938\u0915\u0924\u0947",hmn:"Mus saib tsis tau microphone",hu:"Nem lehet hozz\xE1f\xE9rni a mikrofonhoz",is:"Get ekki fengi\xF0 a\xF0gang a\xF0 hlj\xF3\xF0nemanum",ig:"Enwegh\u1ECB ike \u1ECBnweta igwe okwu",id:"Tidak dapat mengakses mikrofon",ga:"N\xED f\xE9idir rochtain a fh\xE1il ar mhicreaf\xF3n",it:"Impossibile accedere al microfono",ja:"\u30DE\u30A4\u30AF\u306B\u30A2\u30AF\u30BB\u30B9\u3067\u304D\u306A\u3044",jw:"Ora bisa ngakses mikropon",kn:"\u0CAE\u0CC8\u0C95\u0CCD\u0CB0\u0CCA\u0CAB\u0CCB\u0CA8\u0CCD \u0CAA\u0CCD\u0CB0\u0CB5\u0CC7\u0CB6\u0CBF\u0CB8\u0CB2\u0CC1 \u0CB8\u0CBE\u0CA7\u0CCD\u0CAF\u0CB5\u0CBF\u0CB2\u0CCD\u0CB2",kk:"\u041C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0493\u0430 \u043A\u0456\u0440\u0443 \u043C\u04AF\u043C\u043A\u0456\u043D \u0435\u043C\u0435\u0441",km:"\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1785\u17BC\u179B\u178A\u17C6\u178E\u17BE\u179A\u1780\u17B6\u179A\u1798\u17B8\u1780\u17D2\u179A\u17BC\u17A0\u17D2\u179C\u17BC\u1793",ko:"\uB9C8\uC774\uD06C\uC5D0 \uC561\uC138\uC2A4 \uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",ku:"Mirov dikare m\xEEkrofon nikare",ky:"\u043A\u043E\u0435\u043B\u0443 \u043A\u0438\u0440\u0435 \u0430\u043B\u0431\u0430\u0439\u0442",lo:"\u0E9A\u0ECD\u0EC8\u0EAA\u0EB2\u0EA1\u0EB2\u0E94\u0EC0\u0E82\u0EBB\u0EC9\u0EB2\u0EC0\u0E96\u0EB4\u0E87\u0EC4\u0EA1\u0EC2\u0E84\u0EC2\u0E9F\u0E99",la:"Access potest non tortor ligula, facilisis",lv:"Nevar piek\u013C\u016Bt mikrofonam",lt:"Negalite pasiekti mikrofono",lb:"Kann net op den Mikrofon goen",mk:"\u041D\u0435 \u043C\u043E\u0436\u0430\u043C \u0434\u0430 \u043F\u0440\u0438\u0441\u0442\u0430\u043F\u0430\u043C \u043D\u0430 \u043C\u0438\u043A\u0440\u043E\u0444\u043E\u043D",mg:"Tsy afaka mikitika mikr\xF4fo",ms:"Tidak boleh mengakses mikrofon",ml:"\u0D2E\u0D48\u0D15\u0D4D\u0D30\u0D4B\u0D2B\u0D4B\u0D7A \u0D06\u0D15\u0D4D\u0D38\u0D38\u0D4D\u0D38\u0D41\u0D1A\u0D46\u0D2F\u0D4D\u0D2F\u0D3E\u0D28\u0D3E\u0D35\u0D3F\u0D32\u0D4D\u0D32",mt:"Ma tistax ta\u010B\u010Bessa mikrofonu",mi:"Kaore e taea te uru ki te hopuorooro",mn:"\u041C\u0438\u043A\u0440\u043E\u0444\u043E\u043D \u0440\u0443\u0443 \u043D\u044D\u0432\u0442\u044D\u0440\u0447 \u0447\u0430\u0434\u0430\u0445\u0433\u04AF\u0439 \u0431\u0430\u0439\u043D\u0430",my:"\u1019\u102D\u102F\u1000\u103A\u1001\u101B\u102D\u102F\u1016\u102F\u1014\u103A\u1038\u1000\u102D\u102F\u101B\u101A\u1030\u1019\u1014\u102D\u102F\u1004\u103A",no:"Kan ikke f\xE5 tilgang til mikrofonen",ps:"\u0645\u0627\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u062A\u0647 \u0644\u0627\u0633\u0631\u0633\u06CC \u0646\u0634\u064A \u06A9\u0648\u0644\u06CC",fa:"\u0645\u06CC \u062A\u0648\u0627\u0646\u06CC\u062F \u0628\u0647 \u0645\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u062F\u0633\u062A\u0631\u0633\u06CC \u067E\u06CC\u062F\u0627 \u06A9\u0646\u06CC\u062F",pl:"Nie mo\u017Cna uzyska\u0107 dost\u0119pu do mikrofonu",pt:"N\xE3o \xE9 poss\xEDvel acessar o microfone",pa:"\u0A2E\u0A3E\u0A08\u0A15\u0A4D\u0A30\u0A4B\u0A2B\u0A4B\u0A28 \u0A24\u0A71\u0A15 \u0A2A\u0A39\u0A41\u0A70\u0A1A \u0A28\u0A39\u0A40\u0A02 \u0A15\u0A30 \u0A38\u0A15\u0A26\u0A3E",ro:"Nu pute\u021Bi accesa microfonul",ru:"\u041D\u0435 \u0443\u0434\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0443",sm:"E le mafai ona maua le masini faaleotele leo",gd:"Cha ghabh mi lorg air microf\xF2n",sr:"\u041D\u0435 \u043C\u043E\u0433\u0443 \u043F\u0440\u0438\u0441\u0442\u0443\u043F\u0438\u0442\u0438 \u043C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0443",st:"Ha e khone ho finyella microphone",sn:"Haikwanise kuwana maikorofoni",sd:"\u0645\u0627\u0626\u06AA\u0631\u0648\u0641\u0648\u0646 \u062A\u0627\u0626\u064A\u0646 \u0631\u0633\u0627\u0626\u064A \u0646\u0647 \u067F\u064A \u0633\u06AF\u06BE\u064A",si:"\u0DB8\u0DBA\u0DD2\u0D9A\u0DCA\u0DBB\u0DC6\u0DDD\u0DB1\u0DBA \u0DC0\u0DD9\u0DAD \u0DB4\u0DD2\u0DC0\u0DD2\u0DC3\u0DD2\u0DBA \u0DB1\u0DDC\u0DC4\u0DD0\u0D9A",sk:"Nem\xE1te pr\xEDstup k mikrof\xF3nu",sl:"Ne morem dostopati do mikrofona",so:"Ma heli kartid makarafoon",es:"No se puede acceder al micr\xF3fono",su:"moal bisa ngakses mikropon",sw:"Haiwezi kufikia kipaza sauti",sv:"Kan inte komma \xE5t mikrofonen",tg:"\u041C\u0438\u043A\u0440\u043E\u0444\u043E\u043D\u0440\u043E \u0431\u0430 \u043A\u043E\u0440 \u0430\u043D\u0434\u043E\u0445\u0442\u0430 \u043D\u0430\u043C\u0435\u0448\u0430\u0432\u0430\u0434",ta:"\u0BAE\u0BC8\u0B95\u0BCD\u0BB0\u0BCB\u0B83\u0BAA\u0BCB\u0BA9\u0BC8 \u0B85\u0BA3\u0BC1\u0B95 \u0BAE\u0BC1\u0B9F\u0BBF\u0BAF\u0BB5\u0BBF\u0BB2\u0BCD\u0BB2\u0BC8",te:"\u0C2E\u0C48\u0C15\u0C4D\u0C30\u0C4B\u0C2B\u0C4B\u0C28\u0C4D\u0C28\u0C41 \u0C2A\u0C4D\u0C30\u0C3E\u0C2A\u0C4D\u0C2F\u0C24 \u0C1A\u0C47\u0C2F\u0C32\u0C47\u0C30\u0C41",th:"\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E44\u0E21\u0E42\u0E04\u0E23\u0E42\u0E1F\u0E19\u0E44\u0E14\u0E49",tr:"Mikrofona eri\u015Filemiyor",uk:"\u041D\u0435 \u0432\u0434\u0430\u0454\u0442\u044C\u0441\u044F \u043E\u0442\u0440\u0438\u043C\u0430\u0442\u0438 \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043E \u043C\u0456\u043A\u0440\u043E\u0444\u043E\u043D\u0430",ur:"\u0645\u0627\u0626\u06CC\u06A9\u0631\u0648\u0641\u0648\u0646 \u062A\u06A9 \u0631\u0633\u0627\u0626\u06CC \u062D\u0627\u0635\u0644 \u0646\u06C1\u06CC\u06BA",uz:"Mikrofonga kirib bo&#39;lmadi",vi:"Kh\xF4ng th\u1EC3 truy c\u1EADp micr\xF4",cy:"Methu \xE2 chael mynediad i feicroffon",xh:"Ayikwazi ukufikelela kwimakrofoni"}};const ListeningState=Object.freeze({IDLE:"idle",LISTENING:"listening",USER_INPUT:"user-input",DISABLED:"disabled"}),KeyboardTriggers=Object.freeze({ALL_KEYS:"all-keys",SPACE_BAR:"space-bar",NONE:"none"});var audioStream;class VoiceButton extends PolymerElement{static get is(){return"voice-button"}static get properties(){return{flat:{type:Boolean,reflectToAttribute:!0,value:!1},autodetect:{type:Boolean,notify:!1,reflectToAttribute:!0,value:!1},clickForPermission:{type:Boolean,notify:!1,reflectToAttribute:!0,value:!1},hidePermissionText:{type:Boolean,notify:!1,reflectToAttribute:!0,value:!1},language:{type:String,reflectToAttribute:!0,value:"en-US"},disabled:{type:Boolean,notify:!0,reflectToAttribute:!0,value:!1,observer:"_onEnabledStateChange"},keyboardTrigger:{type:String,reflectToAttribute:!0,value:KeyboardTriggers.SPACE_BAR},pressed:{type:Boolean,notify:!1,reflectToAttribute:!0,readOnly:!0,value:!1},cloudSpeechApiKey:{type:String,readOnly:!1,reflectToAttribute:!1,value:null},assessmentToken:{type:String,readOnly:!1,reflectToAttribute:!1,value:null},reassess:{type:String,readOnly:!1,reflectToAttribute:!1,value:"false"},scoreidx:{type:Number,readOnly:!1,reflectToAttribute:!1,value:0},timeoutval:{type:Number,readOnly:!1,reflectToAttribute:!1,value:500},cloudSpeechUrl:{type:String,readOnly:!1,reflectToAttribute:!1,value:null},recordingToken:{type:String,readOnly:!1,reflectToAttribute:!1,value:null},lesson:{type:Number,readOnly:!1,reflectToAttribute:!1,value:null},alternatives:{type:Number,readOnly:!1,reflectToAttribute:!1,value:null},context:{type:String,readOnly:!1,reflectToAttribute:!1,value:null},state:{type:String,notify:!1,readOnly:!0,reflectToAttribute:!0,value:ListeningState.IDLE,observer:"_onStateChange"},supported:{type:Boolean,readOnly:!0,reflectToAttribute:!0,value:!0},flatStr:String,autoDetectStr:String}}constructor(){super();this._setState(ListeningState.IDLE)}ready(){super.ready();this.useCloudSpeech=!1;if("string"!==typeof this.cloudSpeechApiKey){console.warn("For fallback support, it is recommended to provide a cloud-speech-api-key.")}!!window.opr&&!!opr.addons||!!window.opera||0<=navigator.userAgent.indexOf(" OPR/");const SpeechRecognition=window.webkitSpeechRecognition;if("string"!==typeof this.cloudSpeechApiKey){console.error("Need to provide a cloud-speech-api-key.");this._setState(ListeningState.DISABLED);this.set("disabled",!0);return}if(this.checkWebRTC()){this.useCloudSpeech=!0}else{this._setSupported(!1);this._setState(ListeningState.DISABLED);this.set("disabled",!0);console.error("WebRTC is not supported on this browser.");return}this.set("flatStr",this.flat?"flat":"");this.set("autoDetectStr",this.autodetect?"auto-detect":"");var micColor=getComputedStyle(this).getPropertyValue("--mic-color");this.googleMicEl=this.$["mic-svg"];this.googleMicLoaderEl=this.$["mic-loading"];this.googleMicDisabledEl=this.$["mic-svg-disabled"];this.buttonEl=this.$["paper-button"];let circleVizContainer=this.$["circle-viz-container"];this.circleViz=new CircleViz(circleVizContainer,()=>{this.onSpeechError({error:"not-allowed"})});if(!this.clickForPermission){this.circleViz.attachUserMediaStream()}this.googleMicEl.style.fill=this.googleMicDisabledEl.style.fill=micColor;this.buttonEl.addEventListener("mousedown",this.mouseDown.bind(this));this.buttonEl.addEventListener("mouseup",this.mouseUp.bind(this));if(this.keyboardTrigger!==KeyboardTriggers.NONE){document.body.addEventListener("keydown",this.keyDown.bind(this));document.body.addEventListener("keyup",this.keyUp.bind(this))}if(this.hidePermissionText){this.$["mic-not-allowed"].style.display="none"}var translatedCopy=this.getTranslation();if(translatedCopy){this.$["mic-not-allowed"].innerHTML=translatedCopy}if(!this.useCloudSpeech){this.recognition=new SpeechRecognition;if(""!=this.language)this.recognition.lang=this.language;const isMobile=window.mobileAndTabletcheck();this.recognition.interimResults=!isMobile;this.recognition.continuous=isMobile?!1:!this.autodetect;this.recognition.maxAlternatives=0;this.recognition.onresult=this.onSpeechResult.bind(this);this.recognition.onspeechend=this.onSpeechEnd.bind(this);this.recognition.onerror=this.onSpeechError.bind(this)}else{this.voiceRecorder=new VoiceRecorder(this.autodetect,this.onStopRecordingVoiceComplete.bind(this),this.timeoutval)}}getTranslation(){var full=window.componentTranslations.micNotAllowed[this.language];if("undefined"!==typeof full)return full;var half=window.componentTranslations.micNotAllowed[this.language.split("-")[0].toLowerCase()];if("undefined"!==typeof half)return half;return null}keyDown(event){if(this.state===ListeningState.DISABLED)return;this.pressed=!0;if(32==event.keyCode&&this.keyboardTrigger===KeyboardTriggers.SPACE_BAR||this.keyboardTrigger===KeyboardTriggers.ALL_KEYS){if(this.state!==ListeningState.USER_INPUT&&this.state!==ListeningState.LISTENING){this.startListening()}}}keyUp(event){if(this.state===ListeningState.DISABLED)return;this.pressed=!1;if(32==event.keyCode&&this.keyboardTrigger===KeyboardTriggers.SPACE_BAR||this.keyboardTrigger===KeyboardTriggers.ALL_KEYS){if(this.autodetect&&(this.state===ListeningState.IDLE||this.state===ListeningState.USER_INPUT)){this.stopListening()}else if(!this.autodetect){this.stopListening()}}}mouseDown(){if(this.state===ListeningState.DISABLED)return;this.pressed=!0;if(this.state!==ListeningState.USER_INPUT&&this.state!==ListeningState.LISTENING){this.startListening()}else if(this.state===ListeningState.LISTENING){this.stopListening()}}mouseUp(){if(this.state===ListeningState.DISABLED)return;if(this.autodetect&&(this.state===ListeningState.IDLE||this.state===ListeningState.USER_INPUT)){this.stopListening()}else if(!this.autodetect){this.stopListening()}this.buttonEl.blur();this.pressed=!1}startRecordingVoice(){this.isRecording=!0;this.voiceRecorder.startRecord()}blobToBase64(blob,cb){let reader=new FileReader;reader.onloadend=()=>{let dataUrl=reader.result,base64=dataUrl.split(",")[1];cb(base64)};reader.onerror=err=>{console.error("Error in reading blob",err)};reader.readAsDataURL(blob)}onStopRecordingVoiceComplete(blob){if(this.isRecording){this.isRecording=!1;this._setState(ListeningState.IDLE);this.circleViz.stopAnimation();this.postTranscription(blob)}}async postTranscription(blob){var buffer=await blob.arrayBuffer();console.log("got arrayBuffer");this.showLoader();this.dispatchEvent(new CustomEvent("onSpeech",{detail:buffer}));this.hideLoader()}startListening(){if(this.clickForPermission){this.circleViz.attachUserMediaStream()}this._setState(ListeningState.LISTENING);if(!this.useCloudSpeech){this.recognition.start()}else{this.startRecordingVoice()}this.circleViz.startAnimation()}stopListening(){if(!this.useCloudSpeech){this._setState(ListeningState.IDLE);this.circleViz.stopAnimation();this.recognition.stop();this.removeSpeechEventListeners()}else{this.voiceRecorder.stopRecord()}}onSpeechResult(event){var result={speechResult:event.results[0][0].transcript,confidence:event.results[0][0].confidence,isFinal:event.results[0].isFinal,sourceEvent:event};this._setState(ListeningState.USER_INPUT);this.dispatchEvent(new CustomEvent("onSpeech",{detail:result}));if(result.isFinal){this._setState(ListeningState.IDLE);this.circleViz.stopAnimation();if(this.autodetect){this.stopListening()}}}onSpeechEnd(){this._setState(ListeningState.IDLE);this.circleViz.stopAnimation();this.removeSpeechEventListeners()}onSpeechError(event){this._setState(ListeningState.IDLE);this.circleViz.stopAnimation();this.removeSpeechEventListeners();this.dispatchEvent(new CustomEvent("onSpeechError",{detail:event}));if("not-allowed"===event.error){this.$["mic-not-allowed"].classList.add("show");this._setState(ListeningState.DISABLED);this.set("disabled",!0)}}removeSpeechEventListeners(){if(this.recognition){this.recognition.removeEventListener("result",this.onSpeechResult);this.recognition.removeEventListener("end",this.onSpeechEnd);this.recognition.removeEventListener("error",this.onSpeechError)}}_onEnabledStateChange(){if(this.disabled)this._setState(ListeningState.DISABLED);else this._setState(ListeningState.IDLE)}_onStateChange(newValue,oldValue){this.dispatchEvent(new CustomEvent("onStateChange",{detail:{newValue:newValue,oldValue:oldValue}}))}showLoader(){this.googleMicLoaderEl.style.opacity=1;this.googleMicEl.style.display="none"}hideLoader(){this.googleMicLoaderEl.style.opacity=0;this.googleMicEl.style.display="block"}checkWebRTC(){let audioCtx=window.AudioContext||window.webkitAudioContext;if(audioCtx&&(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia||navigator.getUserMedia)&&Worker){return!0}console.error("Need to provide a cloud-speech-api-key for support on this browser.");return!1}}window.mobileAndTabletcheck=function(){var check=!1;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check=!0})(navigator.userAgent||navigator.vendor||window.opera);return check};customElements.define(VoiceButton.is,VoiceButton);
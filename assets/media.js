import '@dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '../elements/web-cam.js';

const userMediaSupported = ('mediaDevices' in navigator) && ('getUserMedia' in navigator.mediaDevices);
const mediaCaptureSupported = 'capture' in document.createElement('input');
const mediaRecorderSupported = 'MediaRecorder' in window;

const supported = !userMediaSupported && mediaCaptureSupported ? `Your device only supports recording of 
audio and video.` : `Your device supports live streaming and recording of audio and video.`;

export const template = `
<div class="view next-screen">
  <material-app-bar>
    <a class="back" slot="left-content">
      <i class="material-icons">keyboard_backspace</i>
    </a>
    <a slot="right-content">
      <i class="material-icons">wifi_off</i>
    </a>
  </material-app-bar>
  <div class="content">
    <h2>Media capture</h2>
    
    <p>
      Media capture allows apps to use the camera and microphone of a device. After recording a video you can play it,
      download it or record another one.
    </p>
    
    ${!mediaRecorderSupported ? `<p id="mediarecorder-support">On iOS you may need to enable MediaRecorder in:<br>
    Settings > Safari > Advanced > Experimental Features > MediaRecorder</p>` : ''}
    
    <p>${supported}</p>
  
    <section>
      <web-cam></web-cam>
    </section>
    
    <section class="documentation">
      <h3>Documentation</h3>
      <p>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" target="_blank" rel="noopener">
          getUserMedia on MDN
        </a>
      </p>
      
      <p>
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture/getUserMedia" target="_blank" rel="noopener">
          Capture attribute on MDN
        </a>
      </p>
      
      
      <h3>Browser support</h3>
      <p>
        <a href="https://caniuse.com/#feat=stream" target="_blank" rel="noopener">
          getUserMedia on caniuse.com
        </a>
      </p>
    </section>

  </div>
</div>
`;

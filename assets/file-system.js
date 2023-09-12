import '@dannymoerkerke/material-webcomponents/src/material-app-bar.js';
import '@dannymoerkerke/material-webcomponents/src/material-button.js';
import '../elements/file-tree.js';

const supported = 'showDirectoryPicker' in window;

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
    <h2>Native File System</h2>
    
    ${!supported ? '<p class="no-support">This feature is not (yet) supported on your device</p>' : ''}
  
    <p>
      The Native File System API allows apps to access the native file system of a user's device after permission has 
      been granted.
    </p>
    
    <p>
      Click the button "Open directory" below to browse the file system of your device and click a file to open it.
    </p>
    <p>
      Text-based files can be edited and saved. Images will be opened and shown as read-only files.
    </p>
    
    <p>
      Desktop only for now.
    </p>
    
    <h3>Demo</h3>
    
    <section id="file-container">
    
      <file-tree>
        <material-button slot="browse" label="Open directory" raised ${!supported ? 'disabled' : ''}></material-button>
      </file-tree>
    
      <div id="file-preview">
        <div class="buttons">
          <material-button id="save-button" label="Save" raised disabled></material-button>
          <material-button id="save-as-button" label="Save as..." raised disabled></material-button>
        </div>
        <div id="file-content"></div>
      </div>
    </section>
    
    <section>
      <h3>Code</h3>
      <p>
        Check the file-tree repo for the source code of the Web Component that was used in this demo: 
      </p>
      <p> 
        <a href="https://github.com/DannyMoerkerke/file-tree" target="_blank" rel="noopener">
          https://github.com/DannyMoerkerke/file-tree
        </a>
      </p>
    </section>
    <section class="documentation">
      <h3>Documentation</h3>
      <a href="https://web.dev/native-file-system/" target="_blank" rel="noopener">
        Native File System API on web.dev
      </a>
      
      <h3>Browser support</h3>
      <p>
        The Native File System API is supported since Chrome 86.
      </p>
    </section>
  </div>
</div>
`;

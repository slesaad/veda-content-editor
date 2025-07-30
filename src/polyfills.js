// Import buffer polyfill
import { Buffer as BufferPolyfill } from 'buffer';

// Make Buffer available globally
window.Buffer = BufferPolyfill;
window.global = window;

// Ensure process is defined
if (typeof window.process === 'undefined') {
  window.process = {
    env: {},
    version: '',
    versions: {},
    platform: 'browser',
    nextTick: function(fn) { setTimeout(fn, 0); }
  };
}
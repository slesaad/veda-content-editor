import { spawn } from 'child_process';
import playwright from 'playwright';

console.log('=== VEDA Content Editor v0.1.16 - Browser Test ===\n');

// Start vite in the background
console.log('Starting Vite dev server...');
const vite = spawn('npm', ['run', 'dev'], {
  cwd: './demo-app',
  stdio: ['ignore', 'pipe', 'pipe']
});

// Wait for server to start
await new Promise(resolve => {
  vite.stdout.on('data', (data) => {
    if (data.toString().includes('ready in')) {
      setTimeout(resolve, 2000); // Give it time to fully start
    }
  });
});

console.log('Server started! Launching browser...\n');

// Launch browser and test
const browser = await playwright.chromium.launch({ 
  headless: true 
});

try {
  const page = await browser.newPage();
  
  // Collect console messages and errors
  const consoleMessages = [];
  const pageErrors = [];
  
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  page.on('pageerror', error => {
    pageErrors.push(error.toString());
  });
  
  // Navigate to the app
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { 
    waitUntil: 'networkidle' 
  });
  
  // Wait a bit for React to render
  await page.waitForTimeout(2000);
  
  // Check page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if app rendered
  const appExists = await page.evaluate(() => {
    return document.querySelector('h1')?.textContent === 'VEDA Content Editor Demo';
  });
  console.log('Demo app rendered:', appExists ? '✅' : '❌');
  
  // Check if editor exists
  const editorExists = await page.evaluate(() => {
    // Look for common editor elements
    const hasEditorDiv = document.querySelector('[data-test-id*="editor"]') !== null;
    const hasContentEditable = document.querySelector('[contenteditable]') !== null;
    const hasTextarea = document.querySelector('textarea') !== null;
    const hasLexical = document.querySelector('.editor-container') !== null;
    
    return {
      hasEditorDiv,
      hasContentEditable,
      hasTextarea,
      hasLexical,
      anyEditor: hasEditorDiv || hasContentEditable || hasTextarea || hasLexical
    };
  });
  
  console.log('\nEditor elements check:');
  console.log('  Editor div:', editorExists.hasEditorDiv ? '✅' : '❌');
  console.log('  ContentEditable:', editorExists.hasContentEditable ? '✅' : '❌');
  console.log('  Textarea:', editorExists.hasTextarea ? '✅' : '❌');
  console.log('  Lexical container:', editorExists.hasLexical ? '✅' : '❌');
  console.log('  Any editor element:', editorExists.anyEditor ? '✅' : '❌');
  
  // Check for error display
  const errorDisplay = await page.evaluate(() => {
    const errorDiv = document.querySelector('div');
    if (!errorDiv) return null;
    
    // Look for error indicators
    const allDivs = Array.from(document.querySelectorAll('div'));
    const errorDiv2 = allDivs.find(div => {
      const text = div.textContent || '';
      return text.includes('Error:') || text.includes('Cannot read properties');
    });
    
    return errorDiv2?.textContent || null;
  });
  
  if (errorDisplay) {
    console.log('\n❌ Error displayed in UI:');
    console.log(errorDisplay);
  }
  
  // Console messages
  console.log('\n=== Console Messages ===');
  if (consoleMessages.length === 0) {
    console.log('No console messages');
  } else {
    consoleMessages.forEach(msg => {
      console.log(`[${msg.type}] ${msg.text}`);
    });
  }
  
  // Page errors
  console.log('\n=== Page Errors ===');
  if (pageErrors.length === 0) {
    console.log('✅ No page errors!');
  } else {
    console.log('❌ Page errors detected:');
    pageErrors.forEach(err => {
      console.log(err);
      
      // Check for our specific errors
      if (err.includes('Cannot read properties of undefined') && 
          err.includes('prototype')) {
        console.log('\n❌ PROTOTYPE CHAIN ERROR CONFIRMED!');
      }
      
      if (err.includes('does not provide an export named')) {
        console.log('\n❌ ESM IMPORT ERROR CONFIRMED!');
      }
    });
  }
  
  // Take a screenshot
  await page.screenshot({ path: 'demo-screenshot.png' });
  console.log('\nScreenshot saved as demo-screenshot.png');
  
  // Final verdict
  console.log('\n=== FINAL VERDICT ===');
  if (pageErrors.length === 0 && editorExists.anyEditor) {
    console.log('✅ VEDA Content Editor v0.1.16 appears to be working!');
  } else if (pageErrors.length > 0) {
    console.log('❌ VEDA Content Editor v0.1.16 has runtime errors');
  } else if (!editorExists.anyEditor) {
    console.log('❌ VEDA Content Editor v0.1.16 did not render');
  }
  
} finally {
  await browser.close();
  vite.kill();
}
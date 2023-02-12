import { Application } from './application';

new Application().gameLoop();

document.querySelector('#version')!.textContent = (window as any).__COMMIT_HASH__ ?? '';
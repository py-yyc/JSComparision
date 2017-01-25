
// Extract config JSON loaded from template (way to transfer state from server to client)
let config = window.__config || {};

// DEBUG: Show what came from the server in the template
console.log('API host: ', config['apiHost']);
console.log('Router Base: ', config['routerBasePath']);

// Defaults
config['routerBasePath'] = config['routerBasePath'] || '/';

export default config;
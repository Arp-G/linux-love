#!/usr/bin/env node

/*
  This script helps to keep alive my demo/hobby projects hosted on Giglixir, heroku, etc.
  It will scale the gigalixir backends and hit the app urls to keep them alive.
  It requires "gigalixir" to be installed.

  This script can be run on cron job every hour

  Install this script:

  * Copy script:                                sudo cp -r my-scripts/keep_alive_sites /usr/local/bin/keep_alive
  * Give executable permission:                 sudo chmod +x /usr/local/bin/keep_alive/keep_alive.js
  * Rename data file:                           mv /usr/local/bin/keep_alive/data.json.sample /usr/local/bin/keep_alive/data.json
  * Edit data file to add proper data:          sudo nano /usr/local/bin/keep_alive/data.json
  * Setup cron job:
    * Open crontab file using vi:               sudo EDITOR=vi crontab -e
    * Add following line at the end:            0 * * * * /usr/local/bin/keep_alive/keep_alive.js | logger -t keep_alive.js

  This runs the script and pipes the output to "logger" which sends it to syslog with a tag "keep_alive.js"
  Find logs from the script and verify if it is working properly my examining the syslog file: cat /var/log/syslog | grep keep_alive.js
*/

console.log(`[${new Date().toUTCString()}] Beginning keep alive script...`);

const https = require('https');
const fs = require('fs');
const path = require('path');

const execSync = require('child_process').execSync;

// Polyfill for fetch
const fetch = url => new Promise((resolve, reject) => {
  https.get(url, (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => resolve(data));
  }).on('error', err => reject(err));
});

const execCommand = command => {
  try {
    execSync(command, { shell: '/bin/bash' });
  } catch (e) { }
}

// Load data from file
const dataFilePath = path.resolve(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

// Scale gigalixir sites
data['gigalixir'].forEach(({ name, email, password }) => {
  console.log('\nGigalixir scaling site: ' + name);
  execCommand('gigalixir logout');

  execCommand(`gigalixir login --email ${email} --password ${password} --yes`);
  execCommand(`gigalixir ps:scale --replicas=1 --app_name=${name}`);
});

// Hit keep-alive urls
const hitPromises = data['hitUrls'].map(url => {
  console.log('\nHit url: ' + url);
  return fetch(url).catch(e => console.error(`Failed to hit url: ${url}, error: ${e}`));
});

Promise.all(hitPromises);

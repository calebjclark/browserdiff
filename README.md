Launch backend server:
```
npm start
```

Then load page (i.e., in Chrome browser):
```
http://localhost:8125/?noautomation
```

Output of frontend and backend surface will be saved to ./dumps/ directory/.  

Or load with Chromium:
```
./node_modules/puppeteer/.local-chromium/mac-706915/chrome-mac/Chromium.app/Contents/MacOS/Chromium \
http://localhost:8125/?automation \
--disable-background-networking
--disable-background-timer-throttling
--disable-client-side-phishing-detection \
--disable-hang-monitor \
--disable-prompt-on-repost \
--disable-sync \
--disable-translate \
--metrics-recording-only \
--no-first-run \
--safebrowsing-disable-auto-update \
--password-store=basic \
--use-mock-keychain \
--remote-debugging-port=0 \
--no-sandbox \
--disable-setuid-sandbox \
--disk-cache-size=0 \
--disable-extensions \
--disable-default-apps \
--enable-automation
```

Alternative:
```
./node_modules/puppeteer/.local-chromium/mac-706915/chrome-mac/Chromium.app/Contents/MacOS/Chromium \
http://localhost:8125/?noautomation \
--disable-background-networking \
--disable-background-timer-throttling \
--disable-client-side-phishing-detection \
--disable-hang-monitor \
--disable-prompt-on-repost \
--disable-sync \
--disable-translate \
--metrics-recording-only \
--no-first-run \
--safebrowsing-disable-auto-update \
--password-store=basic \
--use-mock-keychain \
--remote-debugging-port=0 \
--no-sandbox \
--disable-setuid-sandbox \
--disk-cache-size=0 \
```

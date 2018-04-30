# Google Webmaster Tools Bulk Fetch as Google Extension
## Install from Google Webstore
Coming soon

## Installation
1. Download the extension from and unzip it.
2. Go to **chrome://extensions/** and turn on Develper mode.
3. Click on **Load unpacked extension . . .** and load the extension.

## Usage
1. Create a list of urls to be fetched as googel in a csv file
First column: path
Second column: desktop or mobile
Thrid column: true for `FETCH AND RENDER` and false for `FETCH`

Example:
```
path0,desktop,true
path1,mobile,false
```

2. Go to Google's webmaster toolsmaster tools.
3. Click on Crawl -> Fetch as Google
4. You should now see a new "Choose File" button.
5. Click on the Choose File button.
6. Select the file you created in step 1
7. When captcha shows up, you'll have to prove to google that you are not a bot. Then, click on continue.

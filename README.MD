# PPS Autopay script 自動繳費
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Client-side JS script to help you pay your bill automatically on PPS platform!

## Prerequisites
- Tampermonkey
[Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

## Usage

1. Add the script
2. Set necessary information
```js
let billNumber = '21843851'     // Enter your bill number here
let billTotal = 150.00  // Amount to pay
let billType = '01'     // Bill type if exists
let minPay = 1.00
let maxPay = 1.00
```
3. [Follow this](https://imgur.com/gallery/ZKYIp9a)

## Issue
- Captcha may pop out sometimes. Please manually fill it in and click confirm.
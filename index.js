// ==UserScript==
// @name         PPS Autopay Bill
// @namespace    https://github.com/hkwarriors
// @version      1.0
// @description  Five demands! Not one less!
// @author       You
// @match        https://www.ppshk.com/pps/*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.deleteValue

// ==/UserScript==


(function () {
    'use strict';

    let billNumber = '' // Enter your bill number here
    let billTotal = 116.98 // Amount to pay
    let billType = '01' // Bill type if exists
    let minPay = 1.00
    let maxPay = 1.00

    let url = window.location.href

    if (url == 'https://www.ppshk.com/pps/AppLoadBill' || url == 'https://www.ppshk.com/pps/AppUserLogin') {
        let billLink = Object.values(document.getElementsByTagName('a')).filter(link => link.href.indexOf(billNumber) > 0)
        billLink = billLink[0]

        GM.getValue('billTotal')
            .then(res => {
                if (res === undefined) {
                    GM.setValue('billTotal', billTotal)
                        .then(() => billLink.click())
                    console.log(`PPSAB: Remaining amount to pay: ${billTotal}`);
                } else {
                    console.log(`PPSAB: Remaining amount to pay: ${res}`);
                    if (res >= 1) {
                        billLink.click()
                    }
                }
            })
    } else if (url == 'https://www.ppshk.com/pps/AppPayBill') {
        let amountField = document.querySelector('input[name="AMOUNT"]')
        let billTypeField = document.querySelector('select[name="BILLTYPE"]')

        if (amountField === null) {
            // Result page
            // Get paid amount
            let img = document.querySelector('#Image13')
            let amount = img.closest('a').href.split(',')[1].split('\'')[1]

            GM.getValue('billTotal')
                .then(res => {
                    if (res === undefined) {
                        GM.setValue('billTotal', billTotal)
                    } else {
                        billTotal = res
                    }

                    billTotal = (billTotal - amount).toFixed(2)
                    GM.setValue('billTotal', billTotal)
                        .then(() => {
                            // Go back to bill list
                            eval(`formSubmit('/pps/AppLoadBill',document.ppsForm.PMA.value,'')`)
                        })
                })
        }

        if (amountField.value === '') {
            // Payment page
            // Fill the field with 1.00
            setTimeout(function () {
                // Select bill type
                if (billTypeField != undefined) {
                    billTypeField.value = billType
                }

                // Enter pay amount <= Not Real!
                amountField.value = '2.00'
                eval(`confirmSubmit()`)
            }, 1000);
        } else if (amountField.value !== '') {
            // Confirm page
            // Get the remaining amount to pay

            let payAmount = randomFloat(minPay, maxPay)

            while (payAmount > billTotal) {
                payAmount = randomFloat(minPay, maxPay)
            }

            amountField.value = payAmount
            eval(`confirmSubmit()`)
        }

    } else if (url == 'https://www.ppshk.com/pps/AppPageLocator') {
        GM.deleteValue('billTotal')
            .then(() => {
                console.log(`PPSAB: Local storage reset!`);
            })
    } else {
        GM.getValue('billTotal')
            .then(res => {
                if (res === undefined) {
                    GM.setValue('billTotal', billTotal)
                        .then(() => billLink.click())
                    console.log(`PPSAB: Remaining amount to pay: ${billTotal}`);
                } else {
                    console.log(`PPSAB: Remaining amount to pay: ${res}`);
                }
            })
    }
})();

function randomFloat(min, max) {
    return (Math.random() * (min - max) + max).toFixed(2)
}
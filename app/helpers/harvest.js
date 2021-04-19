const axios = require('axios');
const lodash = require('lodash');
const users = require("../controllers/userController.js");
const res = require("express");

const apikey = "N32IIV7CPUPHJH4ATA83D7IJZ7Y37VJ6II";
const contract = "0xe3ba88c38d2789fe58465020cc0fb60b70c10d32";
const address = "0xd57079d80b57cd18a0fad9c7b5af4d39c016d5f5"
const from = "0x0000000000000000000000000000000000000000";

var newArray = [];
var arrayTime = [];
var arrayGroup = [];
var hashArray = [];
exports.baseArray = baseArray = [];


exports.getTransaction = () => {
    axios.get('https://api.bscscan.com/api', {
        params: {
            apikey:apikey,
            sort:'desc',
            offset:20,
            page:1,
            contractaddress:contract,
            address:address,
            module:'account',
            action:'tokentx'
        }
    })
        .then( (response) => {
            response.data.result.reverse().forEach((data,index) => {
                var d = {};
                d.hash = data.hash;
                d.time  = data.timeStamp;
                d.amount = data.value;
                d.from = data.from;
                d.to = data.to;

                hashArray.push(d.hash);
                newArray.push(d);
            });
            arrayGroup = lodash.groupBy(newArray, 'hash');
            // console.log(arrayGroup);return;
            manageArray(Array.from(new Set(hashArray)),arrayGroup);
        })
}

const manageArray = (arr,arrayGroup) => {
    let datas = JSON.parse(JSON.stringify(arrayGroup));
    arr.forEach((data,index) => {
        // console.log(datas[data]);return;
        setData(datas[data]);
    });
}


const setData = (data) => {
    let dataSend = {};
    // console.log(data);
    // return;
    try {
    if (data.length >= 2){
        if (data[0].from == from){
            if (data[1].to == address){
                console.log({
                    'status': 'SKIPPED bukan hervest',
                    'data' : data
                });
            }else {
                dataSend.hash = data[1].hash;
                dataSend.time = data[1].time;
                dataSend.amount = data[1].amount;
                dataSend.from = data[1].to;

                if (lodash.includes(arrayTime, dataSend.time) == false) {
                    baseArray.push(dataSend);
                    arrayTime.push(dataSend.time);
                }
            }
        }
    }else {
        console.log({
            'status': 'SKIPPED',
            'data' : data
        });
    }

    } catch (error) {
        console.log(error);
    }
}


// setInterval(() => {
//     getTransaction();
// }, 3000);
// getTransaction();
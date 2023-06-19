//const tweet = document.getElementById("#tweetyaz");
var bearerToken = "AAAAAAAAAAAAAAAAAAAAAND9mQEAAAAA9Rh505z97yue8siXE2ip7wF4U0Q%3DgxUMiN5DfpVTwyE7cx0Fk8QCzySJL4C3WMIYB5mTs07F51qbwA";
const api_key = 'ZT1NJFumLU3hEjvcbl7gYgq72';
const api_secret_key = 'HXt6aGInbYgGTCoeFazPnRi2iPUjL71MgjEoe2vD7twtvDUN8t';
const access_token = '1641731854750347264-ygugaTUCo20E4N5i4Zpkc0g6ANqhCx';
const access_token_secret = 'C9GDKoOp7Cs59GmhmJotNU5RljhNEBDMyiTKRveiNsl2Q';
const oauth_signature_method = "HMAC-SHA1";
const oauthVersion = "1.0";
//tweet atma eylemi
const tweetYaz2 = document.getElementById("tweetYaz2");
const oauth_header = `OAuth oauth_consumer_key="${api_key}",oauth_signature_method="${oauth_signature_method}" , oauth_token="${access_token}", oauth_version="${oauthVersion}"`
const bodyy = JSON.stringify({
    "text": "denemeson",
});
    document.getElementById("ekle").click(function () {
        debugger;
        fetch("https://api.twitter.com/2/tweets",{            
            type: "post",
            headers: oauth_header,
            body: bodyy,
            error: function () {
                console.log("veri gönderilemedi");
            }
        }).then(res => res.json()).then(data => console.log(data))
    });
const bodyy2 = JSON.stringify({
    "text": "asghdjjad"
})
const credentials2 = btoa(`${api_key}:${api_secret_key}`);
const credentials = btoa(`consumer_key="${api_key}",consumer_secret="${api_secret_key}",access_token="${access_token}",token_secret="${access_token}"`); 
    document.getElementById("eklemeislemi").click(function () {
        debugger;
        fetch("https://api.twitter.com/2/tweets",{    
            type: "post",
            headers: {
                'Authorization': `${credentials}`,
                'Content-Type': 'application/json',
            },
            body: bodyy2,
            error: function () {
                console.log("veri gönderilemedi");
            }
        }).then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err));
    });
function foo() {
    "use strict";
    console.log(arguments.callee);
}
var foo = function myFunc() {
    console.log(myFunc());
}
/////////////////////////////////////////////////////////////////////////////////////


const nonce = uuidv4().replace(/-/g, "");
const oauth_timestamp = Math.floor(Date.now() / 1000);
const timestamp = Math.floor(Date.now() / 1000).toString(); // Unix zaman damgası
const tweetText = "onurun deneme son";
const oauthSignature = generateOauthSignature(oauth_timestamp, nonce, tweetText);
const headers = {
    Authorization: `OAuth ${oauthSignature}`,
    "Content-Type": "application/json",
};
const body = JSON.stringify({
    text: tweetText,
});
function generateOauthSignature(oauth_timestamp, tweetText) {
    const oauthSignatureMethod = "HMAC-SHA1";
    const oauthVersion = "1.0";
    const parameters = {
        oauth_consumer_key: api_key,
        oauth_nonce: nonce,
        oauth_signature_method: oauthSignatureMethod,
        oauth_timestamp: oauth_timestamp,
        oauth_token: access_token,
        oauth_version: oauthVersion,
        status: tweetText,
    }
}
document.getElementById("eklemeislemi").click(function () {
    debugger;
    fetch("https://api.twitter.com/2/tweets",{
       
        type: "post",
        headers,
        body,
        error: function () {
            console.log("veri gönderilemedi");
        }
    }).then(res => res.json()).then(data => console.log(data));
})
function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

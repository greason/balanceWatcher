const Slack = require("./slack");
const Web3 = require("web3");

const TARGET_Address = [
    "0x60A1b1932BbB7E6cCe543c0630f283f39ACfF21a",
    "0x14cBF542Aa01EFF4e8a869db97aE04ba75C5D9F4",
    "0x4e1fa23140017d34F9904e6A2a8109F9C0b672D9",
    "0x4B8cf000ccd6FefEFf586E7E50406E2845d83080",
    "0x2B979C416BF7D37920b61C4E266d2da72Bd0c772"
];

async function checkBalance() {
    let RPC = "https://testnet-rpc.bitlayer.org";
    let web3 = new Web3(RPC);
    let limitValue = 0.005;

    while (true) {
        for (let i = 0; i < TARGET_Address.length; i++) {
            let address = TARGET_Address[i];
            let result = await web3.eth.getBalance(address);
            let balance = web3.utils.fromWei(result, 'ether');
            if (balance < limitValue) {
                console.log(`warning ${address}, balance: ${balance}, too low, please deposit as soon as possible`);
                Slack.sendObject({
                    type: "oracle-balance",
                    msg: `warning ${address}, balance: ${balance}, too low, please deposit as soon as possible`
                });
            }
        }
        await sleep(1000 * 60 * 10);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log("start checking ...");
    await checkBalance();
}

main().then(() => {
}).catch(error => {
    console.error("error", error);
});

import { WalletGlobal } from './WalletGlobal.js';
import { ethers } from './ethers.min.js';
import { AccountArray } from './Account.js';

const password = WalletGlobal.WalletPassword;
const walletAccounts = WalletGlobal.WalletAccounts;
const walletNetworkEndpoint = WalletGlobal.WalletNetworkEndpoint
const decryptPassword = window.atob(password) ; 
const provider = new ethers.providers.JsonRpcProvider(walletNetworkEndpoint);


const seedPhrase = document.getElementById("seedPhrase");

const wallet = ethers.Wallet.createRandom();
const mnemonic = wallet.mnemonic.phrase;
const accountArray = new AccountArray();
const defaultAccountName='Account1';
const privateKey=wallet.privateKey;

const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, decryptPassword).toString();
accountArray.addAccount(defaultAccountName, wallet.address,encryptedPrivateKey);
const jsonString = JSON.stringify(accountArray);
localStorage.setItem('Accounts', jsonString);

console.log('New wallet created:');
console.log(`Address: ${wallet.address}`);
console.log(`Seed phrase: ${mnemonic}`);
console.log(`privatekey is ${wallet.privateKey}`);

// Encrypt the wallet and store it in local storage

wallet.encrypt(decryptPassword).then((encryptedJson) => {
  localStorage.setItem("EncryptedWallet", encryptedJson);
    console.log("Wallet is successfully encrypted!!!");
});
//accountArray.addAccount(defaultAccountName,wallet.address,encryptedJson);


localStorage.setItem("SeedPhrase", mnemonic);

seedPhrase.textContent = mnemonic;


document.addEventListener('DOMContentLoaded', function() {
    var btnGoTowallet = document.getElementById('btnGoTowallet');
    btnGoTowallet.addEventListener('click', function() {
        GoToWallet();
    });
});

function GoToWallet()
{
    window.location.href = 'Wallet.html';
}

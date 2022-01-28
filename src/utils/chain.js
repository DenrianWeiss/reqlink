/* jshint esversion: 11 */

import { ethers } from 'ethers'

export const RegisterUrlOnChainHTML = `
<html>
<h1>Short Link, now chained.</h1>
<p><a href="https://polygonscan.com/address/0xe6cc5a854452f5c61980f50bc7522beb876644ad#writeContract">This contract</a>'s registerLink function can add url shortener.</p>
<p>Visit me at <a href="https://etherscan.io/address/catball.eth">catball.eth</a></p>
</html>
`

const abi = JSON.parse(`
[
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            }
        ],
        "name": "readLink",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "target",
                "type": "string"
            }
        ],
        "name": "registerLink",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
`)

const PolygonRpc = 'https://polygon-rpc.com'
const ResolverAddress = '0xe6cc5A854452F5C61980F50bc7522Beb876644AD'

export async function getLinkInfo(url) {
  let eth = new ethers.providers.JsonRpcProvider(PolygonRpc)
  await eth.ready
  let contract = new ethers.Contract(ResolverAddress, abi, eth)
  try {
    return await contract.readLink(url)
  } catch (e) {
    return e.toString()
  }
}

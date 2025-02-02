const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const LIST_LENGTH = niceList.length;
  const merkleTree = new MerkleTree(niceList);

  const INDEX = Math.floor(Math.random() * LIST_LENGTH);
  const NAME = niceList[INDEX];

  const proof = merkleTree.getProof(INDEX);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    leaf: NAME,
  });

  console.log({ gift });
}

main();
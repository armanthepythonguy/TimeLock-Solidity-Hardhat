require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
PRIVATE_RINKEBY_KEY = process.env.PRIVATE_RINKEBY_KEY
module.exports = {
  solidity:{
    compilers:[
      {version: "0.8.0"},
      {version: "0.8.1"}
    ]
  },
  networks:{
    hardhat:{
      chainId: 31337,
    },
    rinkeby:{
      chainId:4,
      url: RINKEBY_RPC_URL,
      accounts:[PRIVATE_RINKEBY_KEY]
    }
  },
};

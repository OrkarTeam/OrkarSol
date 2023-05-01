const express = require("express")
const app = express()
const cors = require("cors");
const port = 4000

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

//  EvmChain.ETHEREUM, EvmChain.ROPSTEN, EvmChain.BSC, EvmChain.POLYGON

require("dotenv").config();
const apiKey = process.env.MORALIS_API_KEY;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/nativeBalance", async (req, res) => {
  try {
    const ethResponse = await Moralis.EvmApi.balance.getNativeBalance({
      chain: EvmChain.ETHEREUM,
      address: "0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3",
    });

    const maticResponse = await Moralis.EvmApi.balance.getNativeBalance({
      chain: EvmChain.POLYGON,
      address: "0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3",
    });

    const ethPrice = await Moralis.EvmApi.token.getTokenPrice({
      chain: EvmChain.ETHEREUM,
      exchange: "uniswap-v2",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    });

    const maticPrice = await Moralis.EvmApi.token.getTokenPrice({
      chain: EvmChain.POLYGON,
      exchange: "quickswap",
      address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    });



    const userBalance = ethResponse.result;
    userBalance.ethBalance = (Number(ethResponse.result.balance) / 10 ** 18).toFixed(4)
    userBalance.ethPrice = ethPrice.result.usdPrice
    userBalance.ethActualPrice = (userBalance.ethBalance * ethPrice.result.usdPrice).toFixed(2)
    userBalance.maticBalance = (Number(maticResponse.result.balance) / 10 ** 18).toFixed(4)
    userBalance.maticPrice = maticPrice.result.usdPrice
    userBalance.maticActualPrice = (userBalance.maticBalance * maticPrice.result.usdPrice).toFixed(2)

    // const maticBalance = maticResponse.result
    // maticBalance.usd = maticPrice.result.usdPrice

    // console.log("wallet balance", ethPrice.result.usdPrice);
    // res.send(ethPrice.result);

    console.log("wallet balance", userBalance);
    res.send(userBalance);

  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.get("/tokenBalance", async (req, res) => {
  try {
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: EvmChain.ETHEREUM,
      tokenAddresses: ["0x24cCeDEBF841544C9e6a62Af4E8c2fA6e5a46FdE"],
      address: "0x2fEb1512183545f48f6b9C5b4EbfCaF49CfCa6F3",
    });

    console.log("token balance", response.raw)
    res.send(response.raw)

  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

const startServer = async () => {
  await Moralis.start({
    apiKey: apiKey
  })

  app.listen(port, () => {
    console.log(`Server is live and listening on port ${port}`);
  });
}

startServer()
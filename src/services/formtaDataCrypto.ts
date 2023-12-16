import { ActiveCryptoType } from '@/components/products';

export default function formatDataCrypto(
  activeCrypto: ActiveCryptoType | 'full-data',
  metaData: any
) {
  switch (activeCrypto) {
    case 'currencies': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const doge = { NAME: 'Dogecoin', ...metaData.DOGE.USD };
      const xlm = { NAME: 'Stellar', ...metaData.XLM.USD };
      const ltc = { NAME: 'LiteCoin', ...metaData.LTC.USD };
      return [btc, doge, xlm, ltc];
    }
    case 'smart-contract': {
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const ada = { NAME: 'Cardano', ...metaData.ADA.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const dot = { NAME: 'Polkadot', ...metaData.DOT.USD };
      const avax = { NAME: 'Avalanche', ...metaData.AVAX.USD };
      const algo = { NAME: 'Algorand', ...metaData.ALGO.USD };
      return [eth, ada, sol, dot, avax, algo];
    }
    case 'stablecoin': {
      const usdc = { NAME: 'USD Coin', ...metaData.USDC.USD };
      const usdt = { NAME: 'Tether', ...metaData.USDT.USD };
      return [usdc, usdt];
    }
    case 'scalling': {
      const matic = { NAME: 'Polygon', ...metaData.MATIC.USD };
      const op = { NAME: 'Optimism', ...metaData.OP.USD };
      return [matic, op];
    }
    case 'oracle': {
      const link = { NAME: 'Chainlink', ...metaData.LINK.USD };
      return [link];
    }
    case 'metaverse': {
      const sand = { NAME: 'The sandbox', ...metaData.SAND.USD };
      const mana = { NAME: 'Decentraland', ...metaData.MANA.USD };
      return [sand, mana];
    }
    case 'defi': {
      const crv = { NAME: 'Lido', ...metaData.CRV.USD };
      const ldo = { NAME: 'Decentraland', ...metaData.LDO.USD };
      const aave = { NAME: 'Aave', ...metaData.AAVE.USD };
      const uni = { NAME: 'Uniswap', ...metaData.UNI.USD };
      const mkr = { NAME: 'MakerDAO', ...metaData.MKR.USD };
      const snx = { NAME: 'Synthetix', ...metaData.SNX.USD };
      const comp = { NAME: 'Compound', ...metaData.COMP.USD };
      return [crv, ldo, aave, uni, mkr, snx, comp];
    }
    case 'interoperability': {
      const qnt = { NAME: 'Quant', ...metaData.QNT.USD };
      const atom = { NAME: 'Cosmos', ...metaData.ATOM.USD };
      return [qnt, atom];
    }
    case 'nft': {
      const ape = { NAME: 'ApeCoin', ...metaData.APE.USD };
      return [ape];
    }
    case 'full-data': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const doge = { NAME: 'Dogecoin', ...metaData.DOGE.USD };
      const xlm = { NAME: 'Stellar', ...metaData.XLM.USD };
      const ltc = { NAME: 'LiteCoin', ...metaData.LTC.USD };
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const ada = { NAME: 'Cardano', ...metaData.ADA.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const dot = { NAME: 'Polkadot', ...metaData.DOT.USD };
      const avax = { NAME: 'Avalanche', ...metaData.AVAX.USD };
      const algo = { NAME: 'Algorand', ...metaData.ALGO.USD };
      const usdc = { NAME: 'USD Coin', ...metaData.USDC.USD };
      const usdt = { NAME: 'Tether', ...metaData.USDT.USD };
      const matic = { NAME: 'Polygon', ...metaData.MATIC.USD };
      const op = { NAME: 'Optimism', ...metaData.OP.USD };
      const link = { NAME: 'Chainlink', ...metaData.LINK.USD };
      const sand = { NAME: 'The sandbox', ...metaData.SAND.USD };
      const mana = { NAME: 'Decentraland', ...metaData.MANA.USD };
      const crv = { NAME: 'Lido', ...metaData.CRV.USD };
      const ldo = { NAME: 'Decentraland', ...metaData.LDO.USD };
      const aave = { NAME: 'Aave', ...metaData.AAVE.USD };
      const uni = { NAME: 'Uniswap', ...metaData.UNI.USD };
      const mkr = { NAME: 'MakerDAO', ...metaData.MKR.USD };
      const snx = { NAME: 'Synthetix', ...metaData.SNX.USD };
      const comp = { NAME: 'Compound', ...metaData.COMP.USD };
      const qnt = { NAME: 'Quant', ...metaData.QNT.USD };
      const atom = { NAME: 'Cosmos', ...metaData.ATOM.USD };
      const ape = { NAME: 'ApeCoin', ...metaData.APE.USD };
      return [
        btc,
        doge,
        xlm,
        ltc,
        eth,
        ada,
        sol,
        dot,
        avax,
        algo,
        usdc,
        usdt,
        matic,
        op,
        link,
        sand,
        mana,
        crv,
        ldo,
        aave,
        uni,
        mkr,
        snx,
        comp,
        qnt,
        atom,
        ape,
      ];
    }
    default: {
      return;
    }
  }
}

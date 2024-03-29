import { ActiveCryptoType } from '@/components/products';
import type { CryptoType } from '@/components/header';

export default function formatDataCrypto(
  activeCrypto:
    | ActiveCryptoType
    | 'full-data'
    | 'follow-market'
    | 'layer-1-smart-contracts'
    | 'layer-2-defi'
    | 'layer-5'
    | 'layer-4'
    | 'layer-3',
  metaData: any
): CryptoType[] {
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
      const crv = { NAME: 'Curve', ...metaData.CRV.USD };
      const ldo = { NAME: 'Lido', ...metaData.LDO.USD };
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
    case 'follow-market': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const usdt = { NAME: 'Tether', ...metaData.USDT.USD };
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const xrp = { NAME: 'Ripple', ...metaData.XRP.USD };
      const doge = { NAME: 'Dogecoin', ...metaData.DOGE.USD };
      const ada = { NAME: 'Cardano', ...metaData.ADA.USD };
      const link = { NAME: 'Chainlink', ...metaData.LINK.USD };
      const uni = { NAME: 'Uniswap', ...metaData.UNI.USD };
      const xlm = { NAME: 'Stellar', ...metaData.XLM.USD };
      return [btc, usdt, eth, sol, xrp, doge, ada, link, uni, xlm];
    }
    case 'layer-1-smart-contracts': {
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const matic = { NAME: 'Polygon', ...metaData.MATIC.USD };
      const op = { NAME: 'Optimism', ...metaData.OP.USD };
      const avax = { NAME: 'Avalanche', ...metaData.AVAX.USD };
      return [eth, sol, matic, op, avax];
    }
    case 'layer-2-defi': {
      const ldo = { NAME: 'Lido', ...metaData.LDO.USD };
      const snx = { NAME: 'Synthetix', ...metaData.SNX.USD };
      const mkr = { NAME: 'MakerDAO', ...metaData.MKR.USD };
      const uni = { NAME: 'Uniswap', ...metaData.UNI.USD };
      const aave = { NAME: 'Aave', ...metaData.AAVE.USD };
      return [ldo, snx, mkr, uni, aave];
    }
    case 'layer-3': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const op = { NAME: 'Optimism', ...metaData.OP.USD };
      const uni = { NAME: 'Uniswap', ...metaData.UNI.USD };

      const matic = { NAME: 'Polygon', ...metaData.MATIC.USD };
      const arb = { NAME: 'Arbitrum', ...metaData.ARB.USD };
      const snx = { NAME: 'Synthetix', ...metaData.SNX.USD };
      const ldo = { NAME: 'Lido', ...metaData.LDO.USD };
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const avax = { NAME: 'Avalanche', ...metaData.AVAX.USD };
      return [btc, sol, op, uni, matic, arb, snx, ldo, eth, avax];
    }
    case 'layer-4': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const sol = { NAME: 'Solana', ...metaData.SOL.USD };
      const arb = { NAME: 'Arbitrum', ...metaData.ARB.USD };

      const ldo = { NAME: 'Lido', ...metaData.LDO.USD };
      const op = { NAME: 'Optimism', ...metaData.OP.USD };
      const avax = { NAME: 'Avalanche', ...metaData.AVAX.USD };
      const matic = { NAME: 'Polygon', ...metaData.MATIC.USD };

      return [btc, eth, sol, arb, ldo, op, avax, matic];
    }
    case 'layer-5': {
      const btc = { NAME: 'Bitcoin', ...metaData.BTC.USD };
      const eth = { NAME: 'Ethereum', ...metaData.ETH.USD };
      const usdc = { NAME: 'USD Coin', ...metaData.USDC.USD };
      return [btc, eth, usdc];
    }
    case 'full-data': {
      const btc = {
        NAME: 'Bitcoin',
        DESCRIPTION:
          'Bitcoin is a pioneering digital currency known for its security and decentralization.',
        ...metaData.BTC.USD,
      };
      const doge = {
        NAME: 'Dogecoin',
        DESCRIPTION:
          'Dogecoin is a meme-based digital currency characterized by low-cost transactions.',
        ...metaData.DOGE.USD,
      };
      const xlm = {
        NAME: 'Stellar',
        DESCRIPTION:
          'Stellar is a fast and affordable global payment network, facilitating cross-border transactions.',
        ...metaData.XLM.USD,
      };
      const xrp = {
        NAME: 'Ripple',
        DESCRIPTION:
          'XRP: Fast, low-cost cryptocurrency for global payments by Ripple Labs. Widely used in finance.',
        ...metaData.XRP.USD,
      };
      const ltc = {
        NAME: 'LiteCoin',
        DESCRIPTION:
          'Litecoin is a fast and secure payment cryptocurrency widely used in everyday transactions.',
        ...metaData.LTC.USD,
      };
      const eth = {
        NAME: 'Ethereum',
        DESCRIPTION: `Ether is Ethereum's cryptocurrency, widely used for smart contracts and decentralized applications.`,
        ...metaData.ETH.USD,
      };
      const ada = {
        NAME: 'Cardano',
        DESCRIPTION:
          'Cardano is a scalable blockchain that supports smart contracts and decentralized applications.',
        ...metaData.ADA.USD,
      };
      const sol = {
        NAME: 'Solana',
        DESCRIPTION:
          'Solana is a high-performance network for smart contracts, characterized by its scalability.',
        ...metaData.SOL.USD,
      };
      const matic = {
        NAME: 'Polygon',
        DESCRIPTION:
          'Polygon offers scalability solutions for Ethereum, improving transaction efficiency.',
        ...metaData.MATIC.USD,
      };
      const op = {
        NAME: 'Optimism',
        DESCRIPTION:
          'Optimism is a scaling solution designed for Ethereum to improve network efficiency.',
        ...metaData.OP.USD,
      };
      const dot = {
        NAME: 'Polkadot',
        DESCRIPTION:
          'Polkadot connects multiple blockchains into a single network, promoting interoperability.',
        ...metaData.DOT.USD,
      };
      const avax = {
        NAME: 'Avalanche',
        DESCRIPTION:
          'Avalanche is a highly scalable and secure blockchain platform.',
        ...metaData.AVAX.USD,
      };
      const algo = {
        NAME: 'Algorand',
        DESCRIPTION:
          'Algorand is a high-performance and secure blockchain suitable for a variety of applications.',
        ...metaData.ALGO.USD,
      };
      const usdc = {
        NAME: 'USD Coin',
        DESCRIPTION:
          'USD Coin is a stablecoin pegged to the US dollar, providing stability to the crypto market.',
        ...metaData.USDC.USD,
      };
      const usdt = {
        NAME: 'Tether',
        DESCRIPTION:
          'Tether is a stablecoin pegged to the US dollar, providing value stability and widely used in cryptocurrency transactions.',
        ...metaData.USDT.USD,
      };
      const link = {
        NAME: 'Chainlink',
        DESCRIPTION:
          'Chainlink is a platform that securely connects smart contracts to external data sources.',
        ...metaData.LINK.USD,
      };
      const sand = {
        NAME: 'The sandbox',
        DESCRIPTION:
          'The Sandbox is a blockchain-based platform that focuses on creating virtual games.',
        ...metaData.SAND.USD,
      };
      const mana = {
        NAME: 'Decentraland',
        DESCRIPTION:
          'Decentraland is a virtual world powered by blockchain where users can explore and create content.',
        ...metaData.MANA.USD,
      };
      const crv = {
        NAME: 'Curve',
        DESCRIPTION:
          'Curve is a stablecoin exchange protocol designed to maintain value stability.',
        ...metaData.CRV.USD,
      };
      const ldo = {
        NAME: 'Lido',
        DESCRIPTION:
          'Lido allows staking of Ethereum tokens for passive earnings.',
        ...metaData.LDO.USD,
      };
      const aave = {
        NAME: 'Aave',
        DESCRIPTION:
          'Aave is a DeFi platform that offers decentralized lending and borrowing.',
        ...metaData.AAVE.USD,
      };
      const uni = {
        NAME: 'Uniswap',
        DESCRIPTION:
          'Uniswap is a token exchange platform that eliminates intermediaries, promoting decentralization.',
        ...metaData.UNI.USD,
      };
      const mkr = {
        NAME: 'MakerDAO',
        DESCRIPTION:
          'MakerDAO is a DeFi protocol that enables the creation of stablecoins backed by crypto assets.',
        ...metaData.MKR.USD,
      };
      const snx = {
        NAME: 'Synthetix',
        DESCRIPTION:
          'Synthetix is ​​a DeFi platform that allows trading of synthetic assets on blockchain.',
        ...metaData.SNX.USD,
      };
      const comp = {
        NAME: 'Compound',
        DESCRIPTION:
          'Compound is a DeFi protocol that facilitates decentralized borrowing and borrowing.',
        ...metaData.COMP.USD,
      };
      const qnt = {
        NAME: 'Quant',
        DESCRIPTION:
          'Quant is a platform that allows you to create decentralized applications with ease.',
        ...metaData.QNT.USD,
      };
      const arb = {
        NAME: 'Arbitrum',
        DESCRIPTION:
          'Arbitrum is a second-layer scalability solution for Ethereum, aiming to enable faster and more cost-effective transactions.',
        ...metaData.ARB.USD,
      };
      const atom = {
        NAME: 'Cosmos',
        DESCRIPTION:
          'Cosmos is a network of interconnected blockchains that promotes interoperability.',
        ...metaData.ATOM.USD,
      };
      const ape = {
        NAME: 'ApeCoin',
        DESCRIPTION:
          'Apecoin is a digital currency focused on the Asia-Pacific region, offering innovative payment options.',
        ...metaData.APE.USD,
      };
      return [
        btc,
        doge,
        xlm,
        xrp,
        ltc,
        eth,
        ada,
        sol,
        matic,
        op,
        dot,
        avax,
        algo,
        ldo,
        usdc,
        snx,
        mkr,
        uni,
        aave,
        usdt,
        link,
        sand,
        mana,
        crv,
        comp,
        qnt,
        arb,
        atom,
        ape,
      ];
    }
    default: {
      return [];
    }
  }
}

export const cryptosNames = [
  { symbol: 'USD', name: 'Dollar' },
  { symbol: 'BTC', name: 'Bitcoin' },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
  },
  {
    symbol: 'XLM',
    name: 'Stellar',
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
  },
  {
    symbol: 'LTC',
    name: 'LiteCoin',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
  },
  {
    symbol: 'ALGO',
    name: 'Algorand',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
  },
  {
    symbol: 'OP',
    name: 'Optimism',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
  },
  {
    symbol: 'SAND',
    name: 'The sandbox',
  },
  {
    symbol: 'MANA',
    name: 'Decentraland',
  },
  {
    symbol: 'CRV',
    name: 'Curve',
  },
  {
    symbol: 'LDO',
    name: 'Lido',
  },
  {
    symbol: 'AAVE',
    name: 'Aave',
  },
  {
    symbol: 'UNI',
    name: 'Uniswap',
  },
  {
    symbol: 'MKR',
    name: 'MakerDAO',
  },
  {
    symbol: 'SNX',
    name: 'Synthetix',
  },
  {
    symbol: 'COMP',
    name: 'Compound',
  },
  {
    symbol: 'QNT',
    name: 'Quant',
  },
  {
    symbol: 'ARB',
    name: 'Arbitrum',
  },
  {
    symbol: 'ATOM',
    name: 'Cosmos',
  },
  {
    symbol: 'APE',
    name: 'ApeCoin',
  },
] as const;

'use client';

import { type ReactNode, type ChangeEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import Faqs from './faqs';

export interface FaqsType {
  title: string;
  description?: string;
  children?: ReactNode;
}

type FaqCategorieType =
  | 'security'
  | 'statement-balances'
  | 'wire-transfer'
  | 'operations-custody'
  | 'understanding-crypto';

export default function SearchFaq() {
  const [searchValue, setSearchValue] = useState('');

  const securityFaqs: FaqsType[] = [
    {
      title: 'How to register a bank account?',
      children: <CustomSecurityFaq1 />,
    },
    {
      title: 'How do I change my password?',
      children: <CustomSecurityFaq2 />,
    },
    {
      title: 'How do I block my account?',
      description: `To block your account (block access) you must contact our customer service team via email ${process.env.NEXT_PUBLIC_EMAIL} with the reason for blocking and, on average, our team will block your account within 20 minutes.`,
    },
    {
      title: 'How do I unlock my account?',
      description: `To unlock your account (block access) you must contact our customer service via email ${process.env.NEXT_PUBLIC_EMAIL} with the reason for unlocking and our team will contact you within a few hours requesting some security information.`,
    },
    {
      title: 'I was robbed/lost my cell phone. What to do?',
      description: `For security, we suggest that you request that your account be blocked. To block your account (block access) you must contact our customer service team via email ${process.env.NEXT_PUBLIC_EMAIL} with the reason for blocking and, on average, our team will block your account within 20 minutes.`,
    },
  ];
  const statementBalancesFaqs: FaqsType[] = [
    {
      title: 'What are the costs for operations?',
      description:
        'The costs of buying and selling cryptoactives will always be available at the moment before confirming the operation, and may vary depending on the financial volume transacted. The current rate for buying or selling crypto assets is up to 0.5%.',
    },
    {
      title: 'Are there account maintenance costs?',
      description:
        'Velo account is 100% free! You do not pay anything to create or maintain your account, the only fees charged are for Purchase and Sale operations.',
    },
    {
      title: 'How to access transaction history?',
      description: `Access your "Wallet" > (on the Website: select the currency referring to the transactions you want to see) > Click on "History" > Your entire history will be displayed, with the possibility of searching for a specific asset and inserting filters.`,
    },
    {
      title: 'What is the difference between History and Extract?',
      description: `The "Statement" is a complete document with all the financial transactions in your account and to view it you need to send it by email or download it as a PDF. "History" allows you to filter between: Assets, Purchases, Sales, Withdrawals and Deposits, and you can view it directly on your screen. In addition, it is also possible to filter by the "Status" of transactions between: Requested, processing, carried out or Canceled Both allow you to choose custom date periods for viewing.`,
    },
    {
      title: 'How do I check my Statement?',
      description: `Access "Wallet", Select the Asset, and click on "Statement". Select the desired period and you will have access to a complete document with all the financial transactions in your account and you can view it by sending it to your email or downloading it as a PDF.`,
    },
    {
      title: 'How do I check my balance?',
      description:
        'The asset balance can be viewed in the "Wallet" menu and also in "My Portfolio".',
    },
  ];
  const wireTransferFaqs: FaqsType[] = [
    {
      title: 'How do I make a wire transfer deposit at Velo?',
      description: `Access your "Wallet" upper menu, choose "Real" and then "Deposit". In "Deposit via bank details", you will have all the necessary information to make the wire transfer originating from your preferred financial institution.`,
    },
    {
      title: 'How do I make a (Withdrawal) on Velo?',
      children: <CustomWireTransferFaq1 />,
    },
    {
      title: 'Withdrawals to accounts of Other Holdings.',
      description: `To guarantee your security and that of your account, it is only possible to make transfers between accounts with the same ownership, whether for incoming or outgoing funds.`,
    },
    {
      title: 'Can I withdraw my crypto assets from Velo?',
      children: <CustomWireTransferFaq2 />,
    },
    {
      title: 'What is the deadline for entering and leaving wire transfer?',
      description: `Deposits and Withdrawals are made and settled during business hours (8 am to 4 pm) from Monday to Friday. If carried out outside these hours, it will be settled on the next business day.`,
    },
  ];
  const operationsCustodyFaqs: FaqsType[] = [
    {
      title: 'How to buy crypto assets?',
      // eslint-disable-next-line
      description: `Access the "Trade" section > click on "Trade" again > Click on the "Buy" option > Enter the quantity you want, taking into account the minimum values ​​> "Continue" > Finally, a summary of the transaction will appear, check it and click "Confirm" to complete the purchase.`,
    },
    {
      title: 'How to sell crypto assets?',
      // eslint-disable-next-line
      description: `Access the "Trade" section > click on "Trade" again > Click on the "Sell" option > Enter the quantity you want, taking into account the minimum values ​> "Continue" > Finally, a summary of the transaction will appear, check it and click "Confirm" to complete the purchase.`,
    },
    {
      title: 'Where can I check my transaction history?',
      description: `Access your "Wallet" and click on "History". Your entire history will be displayed, with the possibility of searching for the specific asset and inserting filters.`,
    },
    {
      title: 'Is it possible to buy a crypto with another crypto?',
      description:
        'Currently you can purchase crypto assets from your balance in reais. We are studying ways to guarantee the best possible experience, keeping our investors worry-free. Therefore, at the ideal time, we will make this functionality available to our investors.',
    },
    {
      title: 'Where is custody of cryptoassets carried out?',
      description:
        'The custody of crypto assets is managed by the Velo team, which always seeks to bring the best infrastructure and safest technology solutions for your crypto assets.',
    },
    {
      title: 'How safe is it to trade on Velo?',
      description:
        'Investing in crypto assets on Velo is as safe as investing in assets in the traditional financial world. Our team is the same one that already guarantees the security of your traditional investments with the OP Financial Group standard.',
    },
    {
      title: 'How to view my Cryptos?',
      description: `To view your crypto assets, simply access "My Portfolio"`,
    },
    {
      title: 'Platform opening hours?',
      description: 'Velo operates 24 hours a day, 7 days a week.',
    },
    {
      title: 'How to make a crypto deposit? How to bring your cryptos to Velo?',
      children: <OperationsCustodyFaq1 />,
    },
    {
      title: 'How to make a crypto transfer/withdrawal using Velo?',
      children: <OperationsCustodyFaq2 />,
    },
    {
      title: 'How do I register a wallet address to withdraw my crypto assets?',
      children: <OperationsCustodyFaq3 />,
    },
    {
      title: 'How long does it take for a wallet address to be validated?',
      description:
        'Within 24 hours, the address will be validated and you will be able to use it to transfer your crypto assets.',
    },
    {
      title:
        'How long does it take for a crypto withdrawal to reach the destination wallet?',
      description:
        'Before confirming the transfer, we inform you of the average time for the transfer to occur. This time reflects an estimate based on the network traffic of the currency in question.',
    },
    {
      title:
        'During a crypto deposit, how long does it take for my crypto assets to appear in my portfolio?',
      children: <OperationsCustodyFaq4 />,
    },
  ];
  const understandingCryptoFaqs: FaqsType[] = [
    {
      title: 'What is Bitcoin?',
      description:
        'Bitcoin is a digital asset created in 2008 by Satoshi Nakamoto at a time of global economic recession. That year, the FED (US Central Bank) carried out what became known as the "Bank Rescue", at the same time the population was facing extremely high levels of unemployment. Bitcoin works in a decentralized manner, that is, it does not depend on the economy of a country but on the development and advancement of the use of its technology. Furthermore, it does not depend on financial institutions to record its transactions, everything is saved in an immutable record with free access on its own network (Blockchain). Finally, as it has an issuance limit of 21 million bitcoins and with each issuance it becomes more difficult to issue new ones, it replicates the physical scarcity model (such as that of precious ores) but in a completely virtual environment.',
    },
    {
      title: 'What is Ethereum?',
      description:
        'Ethereum is a decentralized platform capable of running smart contracts and decentralized applications using blockchain technology. These are applications that work exactly as programmed without any possibility of censorship, fraud or interference from third parties, because the contract is immutable. The network has a native circulating medium called ether.',
    },
    {
      title: 'Difference between Bitcoin and Ethereum?',
      description:
        'Assuming “Bitcoin” = network and “bitcoin” = token; "Ethereum" = network and "ether" = token. We have the biggest difference in the spiked scarcity of bitcoin at 21 million units, versus the "unlimited" issuance of ether. Another difference is that bitcoin is solely the representation of money, while ether, in addition to money, can be used for applications within the network, which contains different assets.',
    },
    {
      title: 'Is my profile suitable for cryptocurrencies?',
      description:
        'First, you need to know that cryptocurrencies are volatile assets. They can either have large losses in the short term, or extremely significant gains in the same period. This occurs due to the recent regulation of these assets and recent creation and popularization. They are in the development and credibility phase with increased acceptance by investors and everyday usability, whether as currency or technology. Furthermore, it is important to know that this investment is a decision to believe and invest in the technology that was created together with this asset, Blockchain, and the transformation that it aims to bring, not only to the financial system, having already shown results. Finally, the crypto market tends to become de-correlated with traditional markets, bringing diversification and, consequently, risk mitigation to your portfolio.',
    },
    {
      title: 'Is my profile suitable for cryptocurrencies?',
      description:
        'First, you need to know that cryptocurrencies are volatile assets. They can either have large losses in the short term, or extremely significant gains in the same period. This occurs due to the recent regulation of these assets and recent creation and popularization. They are in the development and credibility phase with increased acceptance by investors and everyday usability, whether as currency or technology. Furthermore, it is important to know that this investment is a decision to believe and invest in the technology that was created together with this asset, Blockchain, and the transformation that it aims to bring, not only to the financial system, having already shown results. Finally, the crypto market tends to become de-correlated with traditional markets, bringing diversification and, consequently, risk mitigation to your portfolio.',
    },
    {
      title: 'Digital Currency or Cryptocurrencies?',
      description:
        'Despite a lot of similarity and proximity, digital currency and cryptocurrency are not the same thing and need attention. First, every cryptocurrency is a digital currency, but not every digital currency is a cryptocurrency. Second, in practice, when using your credit/debit card, you already configure the use of digital currency, which in turn has its pricing defined by the definitions of a Central Bank, while cryptocurrencies will have their value according to the market itself. Finally, cryptocurrencies are protected by cryptography and use blockchain technology to record their operations.',
    },
    {
      title: 'What is Blockchain?',
      description:
        'Blockchain is a technology that allows transfers and negotiations between individuals to be recorded and stored, without the need for a central entity to coordinate and validate information exchanges. Security occurs through the vast data chain, formed by several independent servers that work by consensus, validating the information. Being able to adopt models such as "Proof of Work" and "Proof of Stake", for example. For each block added to the network, there are a number of new operations that are protected by cryptography, making the network increasingly secure, given that once registered, the information is immutable and only new blocks can be added.',
    },
  ];

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchValue(value);
  };

  const handleSearchNoItems = (type: FaqCategorieType, newArr: string[]) => {
    const change = (changeType: FaqCategorieType) => {
      const elSecurity = document.querySelector(
        `#${changeType}`
      ) as HTMLDivElement;
      const arrFilter = newArr.filter(
        val => val.indexOf(searchValue.toLowerCase()) !== -1
      );
      if (!arrFilter.length) {
        elSecurity.style.display = 'none';
      } else {
        elSecurity.style.display = 'flex';
      }
    };

    switch (type) {
      case 'security': {
        change(type);
        break;
      }
      case 'operations-custody': {
        change(type);
        break;
      }
      case 'statement-balances': {
        change(type);
        break;
      }
      case 'understanding-crypto': {
        change(type);
        break;
      }
      case 'wire-transfer': {
        change(type);
        break;
      }

      default:
        break;
    }
  };

  const handleSearchItem = (
    arr: FaqsType[],
    index: number,
    type: FaqCategorieType
  ): 'block' | 'none' => {
    // if (!searchValue) return 'block';
    const newArr = [...arr.map(val => val.title.toLowerCase())];
    handleSearchNoItems(type, newArr);

    return newArr[index].indexOf(searchValue.toLowerCase()) !== -1
      ? 'block'
      : 'none';
  };

  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="h-10 w-full border-1 border-solid border-ffffff33 rounded px-4 flex gap-3 items-center">
        <div className="w-4 h-4 fill-primary flex justify-center items-center">
          <FaSearch />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="w-full bg-transparent text-[15px] font-normal text-primary"
          value={searchValue}
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex flex-col gap-16">
        <div id="security" className="flex flex-col gap-10 items-center">
          <h2 className="text-2xl text-primary font-normal">Security</h2>
          <div className="flex flex-col gap-8 w-full">
            {securityFaqs.map((val, index) => (
              <div
                key={index.toString()}
                style={{
                  display: handleSearchItem(securityFaqs, index, 'security'),
                }}
              >
                <Faqs title={val.title} description={val.description}>
                  {val.children}
                </Faqs>
              </div>
            ))}
          </div>
        </div>
        <div
          id="statement-balances"
          className="flex flex-col gap-10 items-center"
        >
          <h2 className="text-2xl text-primary font-normal">
            Statement, Balances, Costs and Receipts
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {statementBalancesFaqs.map((val, index) => (
              <div
                key={index.toString()}
                style={{
                  display: handleSearchItem(
                    statementBalancesFaqs,
                    index,
                    'statement-balances'
                  ),
                }}
              >
                <Faqs title={val.title} description={val.description}>
                  {val.children}
                </Faqs>
              </div>
            ))}
          </div>
        </div>
        <div id="wire-transfer" className="flex flex-col gap-10 items-center">
          <h2 className="text-2xl text-primary font-normal">
            Transfers – wire transfer
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {wireTransferFaqs.map((val, index) => (
              <div
                key={index.toString()}
                style={{
                  display: handleSearchItem(
                    wireTransferFaqs,
                    index,
                    'wire-transfer'
                  ),
                }}
              >
                <Faqs title={val.title} description={val.description}>
                  {val.children}
                </Faqs>
              </div>
            ))}
          </div>
        </div>
        <div
          id="operations-custody"
          className="flex flex-col gap-10 items-center"
        >
          <h2 className="text-2xl text-primary font-normal">
            Operations and Custody
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {operationsCustodyFaqs.map((val, index) => (
              <div
                key={index.toString()}
                style={{
                  display: handleSearchItem(
                    operationsCustodyFaqs,
                    index,
                    'operations-custody'
                  ),
                }}
              >
                <Faqs title={val.title} description={val.description}>
                  {val.children}
                </Faqs>
              </div>
            ))}
          </div>
        </div>
        <div
          id="understanding-crypto"
          className="flex flex-col gap-10 items-center"
        >
          <h2 className="text-2xl text-primary font-normal">
            Understanding Crypto
          </h2>
          <div className="flex flex-col gap-8 w-full">
            {understandingCryptoFaqs.map((val, index) => (
              <div
                key={index.toString()}
                style={{
                  display: handleSearchItem(
                    understandingCryptoFaqs,
                    index,
                    'understanding-crypto'
                  ),
                }}
              >
                <Faqs title={val.title} description={val.description}>
                  {val.children}
                </Faqs>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomSecurityFaq1() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Register a bank account in:
      </h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">Access your {'"Wallet"'}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">Choose {'"Real"'}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">Select {'"Withdraw"'}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">
            Choose the desired {'amount >'} Click the {'"Continue"'}{' '}
            {'button >'} Then the {'"New Account"'} button.
          </span>
        </div>
      </div>
    </div>
  );
}
function CustomSecurityFaq2() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Register a bank account in:
      </h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">
            Click on the initials of your name in the top menu
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">
            then on {'"Settings" and "Security"'}
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">
            Access the{' '}
            {
              '"Password" option (If you are on the website, access "Change password")'
            }
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">
            Enter the current password in the first field, the new password in
            the second field and confirm the new password in the third field
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">5.</span>
          <span className="text-inherit">
            Finally, click the {'"Continue"'} button.
          </span>
        </div>
      </div>
    </div>
  );
}

function CustomWireTransferFaq1() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-normal text-primary-2">
        {`Access "Wallet" upper menu > Then choose "Real" and click on "Withdraw" > A field will be available to enter the desired redemption value > Click on "Continue" > Choose the desired account to receive the amount or register a new one in "New Account" > Finally, validate the information and click "Confirm".`}
      </p>
      <p className="text-sm font-normal text-primary-2">
        Withdrawals can only be made from accounts with the same ownership.
      </p>
    </div>
  );
}
function CustomWireTransferFaq2() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Today at Velo you can perform crypto transfers of various currencies:
      </h4>
      <h4 className="text-sm text-primary-2 font-normal">
        To make a withdrawal:
      </h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">Access your wallet</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">
            Click on Send and on the crypto asset you want to transfer
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">Click on Withdraw</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">Select the destination address</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">5.</span>
          <span className="text-inherit">
            Check the network, estimated fees and estimated time for the
            transfer
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">6.</span>
          <span className="text-inherit">Click on {'"Withdraw"'}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">7.</span>
          <span className="text-inherit">
            Confirm the transfer details and the amount of crypto that will be
            transferred
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">8.</span>
          <span className="text-inherit">
            Click on {`"Confirm withdrawal"`}
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">9.</span>
          <span className="text-inherit">
            Track your transfer by checking your history
          </span>
        </div>
      </div>
      <h4 className="text-sm text-primary-2 font-normal">
        It is important to remember that the value in reais is approximate and
        we cannot guarantee that that exact amount in reais will arrive in your
        destination wallet. However, we guarantee that the amount of crypto
        transferred will be the amount of crypto sent to the destination wallet.
      </h4>
    </div>
  );
}

function OperationsCustodyFaq1() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Today at Velo you can perform crypto transfers of Bitcoin, Ethereum,
        Solana, Polkadot and Cardano:
      </h4>
      <h4 className="text-sm text-primary-2 font-normal">To make a deposit:</h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">
            Access your wallet and then Receive
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">
            Click on the crypto asset you want to bring to Velo
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">
            Copy the Velo address for deposit
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">{`If you wish to use the QR Code, click "Display QR Code"`}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">5.</span>
          <span className="text-inherit">
            Use this address in your origin wallet to bring your crypto assets
            to Velo
          </span>
        </div>
      </div>
      <h4 className="text-sm text-primary-2 font-normal">
        Reminder: It is important to check the network to be used at the time of
        transfer. If you use a network other than the one informed in this
        section, the transfer will not be reflected in your Velo wallet.
      </h4>
    </div>
  );
}
function OperationsCustodyFaq2() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Today at Velo you can perform crypto transfers of various currencies:
      </h4>
      <h4 className="text-sm text-primary-2 font-normal">
        To make a withdrawal:
      </h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">Access your wallet</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">
            Click on Send and on the crypto asset you want to transfer
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">Click on Withdraw</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">Select the destination address</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">5.</span>
          <span className="text-inherit">
            Check the network, estimated fees and estimated time for the
            transfer
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">6.</span>
          <span className="text-inherit">{`Click on "Withdraw"`}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">7.</span>
          <span className="text-inherit">
            Confirm the transfer details and the amount of crypto that will be
            transferred
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">8.</span>
          <span className="text-inherit">
            {`Click on "Confirm withdrawal"`}
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">9.</span>
          <span className="text-inherit">
            Track your transfer by checking your history
          </span>
        </div>
      </div>
      <h4 className="text-sm text-primary-2 font-normal">
        It is important to remember that the value in reais is approximate and
        we cannot guarantee that that exact amount in reais will arrive in your
        destination wallet. However, we guarantee that the amount of crypto
        transferred will be the amount of crypto sent to the destination wallet.
      </h4>
    </div>
  );
}
function OperationsCustodyFaq3() {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm text-primary-2 font-normal">
        Today at Velo you can perform crypto transfers of Bitcoin, Ethereum,
        Solana, Polkadot and Cardano:
      </h4>
      <h4 className="text-sm text-primary-2 font-normal">
        To register an address to transfer crypto:
      </h4>
      <div className="flex flex-col gap-1">
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">1.</span>
          <span className="text-inherit">Access your wallet</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">2.</span>
          <span className="text-inherit">
            Click on the crypto asset you want to bring to Velo
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">3.</span>
          <span className="text-inherit">{`Click on "Wallet addresses"`}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">4.</span>
          <span className="text-inherit">{`Click on "New address"`}</span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">5.</span>
          <span className="text-inherit">
            Give the wallet a name in question
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">6.</span>
          <span className="text-inherit">
            Enter the address of the destination wallet
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">7.</span>
          <span className="text-inherit">
            {`If you wish to use a QR Code reader, click on "Read QR Code" and check the data`}
          </span>
        </div>
        <div className="flex gap-[6px] text-sm text-primary-2 font-normal">
          <span className="text-inherit">8.</span>
          <span className="text-inherit">{`Click on "Register"`}</span>
        </div>
      </div>
      <h4 className="text-sm text-primary-2 font-normal">
        Within 24 hours the address will be validated and you will be able to
        use it to transfer your cryptoassets.
      </h4>
    </div>
  );
}
function OperationsCustodyFaq4() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-normal text-primary-2">
        It is not possible to accurately guarantee how long it takes for a
        crypto asset to enter Velo as Velo does not have access to the time the
        request was made in the card of origin. In most cases, once the crypto
        asset has been transmitted to the blockchain, within approximately 60 to
        120min the balance should be reflected in your Velo wallet.
      </p>
      <p className="text-sm font-normal text-primary-2">
        {`However, in some cases, in order to guarantee the transaction in its
        entirety and, for security reasons, the transaction may take up to 1
        business day to reflect in your Velo wallet. But don't worry, if
        necessary. our team will get in touch.`}
      </p>
      <p className="text-sm font-normal text-primary-2">
        Reminder: It is important to check the network to be used at the time of
        the transfer. If you use a network other than the one informed in this
        section, the transfer will not be reflected in your Velo wallet.
      </p>
    </div>
  );
}

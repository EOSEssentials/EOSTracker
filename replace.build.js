var replace = require('replace-in-file');
const options = {
  files: 'src/environments/environment.prod.ts',
  from: [
    /{WALLET_URL}/g,
    /{VOTING_URL}/g,
    /{APP_NAME}/g,
    /{LOGO_URL}/g,
    /{BLOCKCHAIN_URL}/g,
    /{CHAIN_ID}/g,
    /{SHOW_ADS}/g,
    /{TOKENS_URL}/g,
    /{TICKER_URL}/g,
    /{TOKEN}/g
  ],
  to: [
    process.env.WALLET_URL,
    process.env.VOTING_URL,
    process.env.APP_NAME,
    process.env.LOGO_URL,
    process.env.BLOCKCHAIN_URL,
    process.env.CHAIN_ID,
    process.env.SHOW_ADS,
    process.env.TOKENS_URL,
    process.env.TICKER_URL,
    process.env.TOKEN
  ],
  allowEmptyPaths: false
};

replace.sync(options);

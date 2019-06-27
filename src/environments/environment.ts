// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  walletUrl: 'https://walleteos.com',
  votingUrl: 'https://dac.liberland.eossweden.org',
  appName: 'Liberland Tracker',
  logoUrl: '/assets/logo.png',
  blockchainUrl: 'https://liberland.eossweden.org',
  chainId: '7f3f5ae1a73d7c14a72f65f257d41397b966ffcd95c588c50d5081eaa354984c',
  showAds: false,
  tokensUrl: 'https://raw.githubusercontent.com/eoscafe/eos-airdrops/master/tokens.json',
  tickerUrl: 'https://api.coinmarketcap.com/v2/ticker/1765/',
  token: 'LLM'
};

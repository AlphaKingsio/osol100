import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { Coin, CoinDetail } from '../types';

// Complete list of all 100 coins
const COIN_LIST = [
  'ai16z', 'fartcoin', 'grass', 'goatseus-maximus', 'io-net',
  'act-i-the-ai-prophecy', 'zerebro', 'nosana', 'griffain', 'tars-protocol',
  'ai-rig-complex', 'eliza', 'alchemist-ai', 'memes-ai', 'degen-spartan-ai',
  'dasha', 'dolos-the-bully', 'kween', 'orbit-2', 'fxn', 'top-hat', 'shoggoth',
  'agenttank', 'deep-worm', 'big-pharmai', 'bongo-cat', 'numogram', 'ava-ai',
  'opus-2', 'obot', 'project89', 'chaos-and-disorder', 'meow-2', 'koala-ai',
  'kitten-haimer', 'pippin', 'max-2', 'aimonica-brands', 'autonomous-virtual-beings',
  'forest', 'solaris-ai', 'synesis-one', 'moe-4', 'universal-basic-compute',
  'mizuki', 'naitzsche', 'slopfather', 'the-lokie-cabal', 'tensor', 'arok-vc',
  'aiwithdaddyissues', 'bloomsperg-terminal', 'omega-2', 'thales-ai',
  'keke-terminal', 'horny', 'quasar-2', 'ropirito', 'kolin', 'kwantxbt',
  'dither', 'duck-ai', 'centience', 'iq6900', 'darksun', 'weird-medieval-memes',
  'yousim', 'sensus', 'ocada-ai', 'singularry', 'naval-ai', 'kira-2',
  'kirakuru', 'brot', 'effective-accelerationism', 'cheshire-grin', 'limbo',
  'size', 'neroboss', 'gmika', 'kira-3', 'convo', 'sqrfund', 'ugly-dog',
  'gemxbt', 'roastmaster9000', 'nova-on-mars', 'sendor', 'flowerai',
  'dojo-protocol', 'internosaur', 'devin', 'lea-ai', 'rex-3', 'aletheia',
  'mona-arcane', 'apicoin', 'cyphomancer', 'lucy-ai', 'agent-rogue'
];

// Create rate-limited API client
const api = rateLimit(axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
}), { 
  maxRequests: 20,
  perMilliseconds: 60000 // 1 minute
});

export const getCoins = async (): Promise<Coin[]> => {
  try {
    const { data } = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        ids: COIN_LIST.join(','),
        order: 'market_cap_desc',
        sparkline: true,
        price_change_percentage: '7d',
        per_page: 100,
        locale: 'en'
      }
    });
    
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price || 0,
      market_cap: coin.market_cap || 0,
      market_cap_rank: coin.market_cap_rank || 0,
      fully_diluted_valuation: coin.fully_diluted_valuation || 0,
      total_volume: coin.total_volume || 0,
      price_change_percentage_24h: coin.price_change_percentage_24h || 0,
      price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency || 0,
      circulating_supply: coin.circulating_supply || 0,
      total_supply: coin.total_supply || 0,
      sparkline_in_7d: {
        price: coin.sparkline_in_7d?.price || []
      }
    }));
  } catch (error) {
    console.error('Error fetching coins:', error);
    return [];
  }
};

export const getCoinDetails = async (coinId: string): Promise<CoinDetail | null> => {
  try {
    const { data } = await api.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true
      }
    });

    return {
      ...data,
      current_price: data.market_data?.current_price?.usd || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
      fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.usd || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      price_change_percentage_7d_in_currency: data.market_data?.price_change_percentage_7d || 0,
      sparkline_in_7d: {
        price: data.market_data?.sparkline_7d?.price || []
      }
    };
  } catch (error) {
    console.error('Error fetching coin details:', error);
    return null;
  }
};
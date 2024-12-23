import { apiClient } from './client';
import { ENDPOINTS, COIN_LIST } from './endpoints';
import type { Coin, CoinDetail } from '../../types';
import { serializeError } from '../../utils/errors';

const DEFAULT_PARAMS = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  sparkline: true,
  price_change_percentage: '7d',
  per_page: 100,
  locale: 'en',
};

export const getCoins = async (): Promise<Coin[]> => {
  try {
    const { data } = await apiClient.get(ENDPOINTS.MARKETS, {
      params: {
        ...DEFAULT_PARAMS,
        ids: COIN_LIST.join(','),
      },
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
        price: coin.sparkline_in_7d?.price || [],
      },
    }));
  } catch (error) {
    console.error('Error fetching coins:', serializeError(error));
    throw error;
  }
};

export const getCoinDetails = async (coinId: string): Promise<CoinDetail> => {
  try {
    const { data } = await apiClient.get(`${ENDPOINTS.COIN_DETAILS}/${coinId}`, {
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
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image?.large || data.image?.small || '',
      current_price: data.market_data?.current_price?.usd || 0,
      market_cap: data.market_data?.market_cap?.usd || 0,
      market_cap_rank: data.market_cap_rank || 0,
      fully_diluted_valuation: data.market_data?.fully_diluted_valuation?.usd || 0,
      total_volume: data.market_data?.total_volume?.usd || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      price_change_percentage_7d_in_currency: data.market_data?.price_change_percentage_7d || 0,
      circulating_supply: data.market_data?.circulating_supply || 0,
      total_supply: data.market_data?.total_supply || 0,
      sparkline_in_7d: {
        price: data.market_data?.sparkline_7d?.price || []
      },
      description: {
        en: data.description?.en || ''
      },
      links: {
        homepage: data.links?.homepage || [],
        blockchain_site: data.links?.blockchain_site || [],
        official_forum_url: data.links?.official_forum_url || [],
        chat_url: data.links?.chat_url || [],
        announcement_url: data.links?.announcement_url || [],
        twitter_screen_name: data.links?.twitter_screen_name || '',
        telegram_channel_identifier: data.links?.telegram_channel_identifier || '',
        subreddit_url: data.links?.subreddit_url || ''
      }
    };
  } catch (error) {
    console.error('Error fetching coin details:', serializeError(error));
    throw error;
  }
};
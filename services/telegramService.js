import axios from 'axios';

import { TELEGRAM_BOT_TOKEN } from '@env'; 
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Send a message to a specific Telegram chat ID
 * @param {string} chatId - Telegram chat ID
 * @param {string} message - Message content
 */
export const sendTelegramMessage = async (chatId, message) => {
  try {
    const response = await axios.post(`${TELEGRAM_API_BASE}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown',
    });
    return response.data;
  } catch (err) {
    console.error('Error sending Telegram message:', err.response?.data || err.message);
    throw err;
  }
};

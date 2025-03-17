import { initClient } from '@ts-rest/core';
import { birthdayContract } from '@birthday-bot-monorepo/contracts';

export const client = initClient(birthdayContract, {
  baseUrl: import.meta.env.VITE_SERVER_URL,
  baseHeaders: {
    'Content-Type': 'application/json',
    'Allow-Control-Allow-Origin': '*',
  },
});

// services/schedulerService.js
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { getUser, getTasks } from './storageService';
import { sendTelegramMessage } from './telegramService';

const TASK_NAME = 'SEND_DAILY_TELEGRAM_MESSAGE';

// Define background task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const user = await getUser();
    const tasks = await getTasks();

    if (user?.telegramId && tasks) {
      const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      const todaysTasks = tasks[today] || [];

      const message = todaysTasks.length
        ? `*Your Tasks for ${today}:*\n` + todaysTasks.map((t, i) => `${i + 1}. ${t}`).join('\n')
        : `No tasks scheduled for *${today}*`;

      await sendTelegramMessage(user.telegramId, message);
    }

    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.Result.Failed;
  }
});

/**
 * Register daily task
 */
export const registerTaskScheduler = async () => {
  try {
    const status = await BackgroundFetch.getStatusAsync();
    if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
      console.warn('Background fetch is disabled');
      return;
    }

    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 60 * 60 * 24, // 24 hours
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log(' Daily Telegram message task registered');
  } catch (error) {
    console.error('Failed to register background task:', error);
  }
};

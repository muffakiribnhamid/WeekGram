import * as TaskManager from 'expo-task-manager';
import * as BackgroundTask from 'expo-background-task';
import { getUser, getTasks } from './storageService';
import { sendTelegramMessage } from './telegramService';

const TASK_NAME = 'SEND_DAILY_TELEGRAM_MESSAGE';

// Took help from AI (GPT 4o)
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
  } catch (error) {
    console.error('Background task error:', error);
  }
});



export const registerTaskScheduler = async () => {
  try {
    await BackgroundTask.registerTaskAsync(TASK_NAME, {
      interval: 60 * 60 * 24,
    });
    console.log('Daily Telegram message task registered');
  } catch (error) {
    console.error('Failed to register background task:', error);
  }
};

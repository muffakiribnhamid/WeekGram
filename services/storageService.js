import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'weekgram_user';
const TASKS_KEY = 'weekgram_tasks';

/**
 * Save user data
 * @param {Object} user
 */
export const saveUser = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

/**
 * Get user data
 */
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error reading user:', error);
    return null;
  }
};

/**
 * Save tasks
 * @param {Object} tasks
 */
export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

/**
 * Get tasks
 */
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {};
  } catch (error) {
    console.error('Error reading tasks:', error);
    return {};
  }
};

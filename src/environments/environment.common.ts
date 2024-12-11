import { BASE_URL } from './environment.const';

export const commonEnvironment = {
  LOGIN: BASE_URL + '/api/auth/login',

  ADD_USER: BASE_URL + '/api/Members',
  UPDATE_USER: BASE_URL + '/api/Members/',
  GET_ALL_USERS: BASE_URL + '/api/Members',
  DELETE_USER: BASE_URL + '/api/Members/',

  GET_ALL_TRAINING_PROGRAMS: BASE_URL + '/api/TrainingPrograms',
  SAVE_TRAINING_PROGRAM: BASE_URL + '/api/TrainingPrograms',
  UPDATE_TRAINING_PROGRAM: BASE_URL + '/api/TrainingPrograms/',
  DELETE_PROGRAM: BASE_URL + '/api/TrainingPrograms/',

  MAKE_PAYMENT: BASE_URL + '/api/Payments',
  GET_ALL_PAYMENTS: BASE_URL + '/api/Payments',

  GET_MEMBER_REPORT: BASE_URL + '/api/Members/report',
  GET_PAYMENT_REPORT: BASE_URL + '/api/Payments/report',
  GET_TRAINING_REPORT: BASE_URL + '/api/TrainingPrograms/report',

  GET_ALL_ALERTS: BASE_URL + '/api/Alerts/reminders',

  GET_CURRENT_USER: BASE_URL + '/api/Members/current',
};

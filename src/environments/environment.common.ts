import { BASE_URL } from './environment.const';

export const commonEnvironment = {
  ADD_USER: BASE_URL + '/api/Members',
  GET_ALL_USERS: BASE_URL + '/api/Members',
  DELETE_USER: BASE_URL + '/api/Members/',

  GET_ALL_TRAINING_PROGRAMS: BASE_URL + '/api/TrainingPrograms',
  SAVE_TRAINING_PROGRAM: BASE_URL + '/api/TrainingPrograms',
};

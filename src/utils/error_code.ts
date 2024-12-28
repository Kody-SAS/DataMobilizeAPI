export const STATUS_CODE = {
  SUCCESS: 201,
  MISSING_PARAMS: 210,
  INVALID_PARAMS: 210,
  INVALID_HEADERS: 211,
  INVALID_TOKEN: 211,
  PERMISSION_MISMATCH: 220,
  NOT_AUTHORIZED: 220,
  APP_NOT_UPDATED: 230,

  // user
  USER_NOT_FOUND: 300,
  USER_INCORRECT_PASSWORD: 300,
  USER_INCORRECT_CODE: 300,

  // not found resource
  NOT_FOUND: 404,

  // unknown error
  SERVER_ERROR: 500,
};

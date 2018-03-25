import moment from 'moment';
const dateFormat = 'DD/MM/YYYY HH:mm';

/* -----------------------------------------
  constants
 ------------------------------------------*/
// non protected views:
const REQUEST_SUBMIT = 'REQUEST_SUBMIT';
const ENTER_LOGIN_VIEW = 'ENTER_LOGIN_VIEW';
const LEAVE_LOGIN_VIEW = 'LEAVE_LOGIN_VIEW';
const ENTER_REGISTER_VIEW = 'ENTER_REGISTER_VIEW';
const LEAVE_REGISTER_VIEW = 'LEAVE_REGISTER_VIEW';
// protected views:
const ENTER_PROTECTED_VIEW = 'ENTER_PROTECTED_VIEW';
const LEAVE_PROTECTED_VIEW = 'LEAVE_PROTECTED_VIEW';

/* -----------------------------------------
  Reducer
 ------------------------------------------*/
const initialState = {
  currentView:  'not set',
  enterTime:    null,
  leaveTime:    null
};

export default function (state = initialState, action) {
  const currentTime = moment().format(dateFormat);

  switch (action.type) {
  // /////////////////////
  // non protected views:
  // /////////////////////
  case ENTER_LOGIN_VIEW:
  case ENTER_REGISTER_VIEW:
    // can't enter if you are already inside
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView: action.currentView,
        enterTime: currentTime
      };
    }
    return state;
  case LEAVE_LOGIN_VIEW:
  case LEAVE_REGISTER_VIEW:
    // can't leave if you aren't already inside
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        leaveTime:    currentTime
      };
    }
    return state;
  // /////////////////////
  // protected views:
  // /////////////////////
  case ENTER_PROTECTED_VIEW:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    currentTime
      };
    }
    return state;
  case LEAVE_PROTECTED_VIEW:
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        leaveTime:    currentTime
      };
    }
    return state;

  default:
    return state;
  }
}


/* -----------------------------------------
  Reducer
 ------------------------------------------*/
export function onSubmit() {
  return {
    type: REQUEST_SUBMIT,
  }
}

export function enterLogin() {
  return {
    type:         ENTER_LOGIN_VIEW,
    currentView:  'login'
  };
}
export function leaveLogin() {
  return {
    type:         LEAVE_LOGIN_VIEW,
    currentView:  'login'
  };
}

export function enterRegister() {
  return {
    type:         ENTER_REGISTER_VIEW,
    currentView:  'register'
  };
}
export function leaveRegister() {
  return {
    type:         LEAVE_REGISTER_VIEW,
    currentView:  'register'
  };
}

export function enterProtected() {
  return {
    type:         ENTER_PROTECTED_VIEW,
    currentView:  'protected'
  };
}
export function leaveProtected() {
  return {
    type:         LEAVE_PROTECTED_VIEW,
    currentView:  'protected'
  };
}

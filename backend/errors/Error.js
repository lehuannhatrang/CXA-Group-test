export const Error = {
    NOT_AUTHENTICATE: 'NOT_AUTHENTICATE',
    WRONG_USER: 'WRONG_USER',
    UN_AUTHORIZATION: 'UN_AUTHORIZATION',
    ITEM_NOT_FOUND: 'ITEM_NOT_FOUND',
    ACCOUNT_DISABLED: 'ACCOUNT_DISABLED',
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    BAD_REQUEST: 'BAD_REQUEST',
}

const ErrorMessage = {
    NOT_AUTHENTICATE: {
        status: 403,
        message: 'Please login',
    },
    WRONG_USER: {
        status: 400,
        message: 'Unauthorized',
    },
    UN_AUTHORIZATION: {
        status: 401,
        message: 'Invalid User Token',
    },
    ITEM_NOT_FOUND: {
        status: 500,
        message: 'Item not found',
    },
    ACCOUNT_DISABLED: {
        status: 403,
        message: 'Account is disabled. Please contact with Admin',
    },
    SESSION_EXPIRED: {
        status: 401,
        message: 'Session Expired',
    }
}

export function createError(code, message) {
    const keys = Object.keys(Error);
    if ( keys.filter(key => key[code] === code) && message) {
        return {
            success: false,
            code,
            message,
            status: ErrorMessage[code].status,
        }
    }
    const errorCode = Error[code] ? Error[code] : 'UNKNOWN';
    const msg = message ? message : ErrorMessage[errorCode].message;
    const status = ErrorMessage[errorCode].status;
    return {
        success: false,
        code: errorCode,
        message: msg,
        status,
    }
}
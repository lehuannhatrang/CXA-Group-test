export const User = {
    user: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['ACTIVE', 'DISABLED']
    },

    role: {
        type: String,
        enum: ['ADMIN', 'USER']
    },

    userInfo: {
        mobilePhone: String,
        displayName: String,
        mail: {
            type: String,
            unique: true
        }
    },

    lastLogin: Date,
}
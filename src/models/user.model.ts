import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { RegisteredUser } from '../interfaces/user.interface';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        isAdmin : {type:Boolean, default : false}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(10));
    }

    next();
});

export const UserModel = model<RegisteredUser & Document>('user', userSchema);

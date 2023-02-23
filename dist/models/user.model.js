"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});
userSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt_1.default.hash(this.password, bcrypt_1.default.genSaltSync(10));
    }
    next();
});
exports.UserModel = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=user.model.js.map
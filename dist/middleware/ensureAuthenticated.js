"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: true, message: 'user is not authenticated.' });
}
exports.ensureAuthenticated = ensureAuthenticated;
//# sourceMappingURL=ensureAuthenticated.js.map
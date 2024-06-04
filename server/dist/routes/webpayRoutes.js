"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webpayController_1 = require("../controllers/webpayController");
const router = (0, express_1.Router)();
router.post('/create', webpayController_1.createTransaction);
exports.default = router;

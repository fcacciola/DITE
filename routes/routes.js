"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * GET home page.
 */
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index', {});
});
router.get('/participant', (req, res) => {
    res.render('participant', {});
});
router.get('/control', (req, res) => {
    res.render('control', {});
});
router.get('/monitor', (req, res) => {
    res.render('monitor', {});
});
exports.default = router;
//# sourceMappingURL=routes.js.map
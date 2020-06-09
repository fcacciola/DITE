"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const express = require("express");
const path = require("path");
//import routes from './routes/routes';
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);
app.get('/', (req, res) => {
    res.render('index', {});
});
app.get('/participant', (req, res) => {
    res.render('participant_standing', { SessionId: app.get("SessionId") });
});
app.get('/control', (req, res) => {
    res.render('control', {});
});
app.get('/monitor', (req, res) => {
    res.render('monitor', {});
});
app.get('/api/link_participant', (req, res) => {
    res.render('participant_linked', { SessionId: app.get("SessionId"), Row: 1, Col: 2 });
});
app.get('/api/participant_picked_white', (req, res) => {
    debug("WHITE");
    res.render('participant_chose', { SessionId: app.get("SessionId"), Row: 1, Col: 2, Color: "White" });
});
app.get('/api/participant_picked_black', (req, res) => {
    debug("BLACK");
    res.render('participant_chose', { SessionId: app.get("SessionId"), Row: 1, Col: 2, Color: "Black" });
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
app.set("SessionId", 1234);
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
//# sourceMappingURL=app.js.map
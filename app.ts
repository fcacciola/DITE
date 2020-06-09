import debug = require('debug');
import express = require('express');
import path = require('path');

//import routes from './routes/routes';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

class Participant {

  constructor(ip, id) {
    this.ip = ip;
    this.id = id;
  }

  setLocation(c, r) {
    this.col = c;
    this.row = r;
  }
}

class Test {
  constructor(image_size) {
    this.image_size = image_size;
  }
}

let gParticipants = new Map();
let gParticipantsCount = 0;
let gCurrentTest = undefined;

gParticipants.set(-1, new Participant(-1, gParticipantsCount++));
gParticipants.set(-2, new Participant(-2, gParticipantsCount++));
gParticipants.set(-3, new Participant(-3, gParticipantsCount++));

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index', {});
});

app.get('/participant', (req: express.Request, res: express.Response) => {
  res.render('participant_standing', { SessionId: app.get("SessionId") });
});

app.get('/control', (req: express.Request, res: express.Response) => {
  res.render('control', {});
});

app.get('/monitor', (req: express.Request, res: express.Response) => {
  res.render('monitor', {});
});

app.get('/api/link_participant', (req: express.Request, res: express.Response) => {
  res.render('participant_linked', { SessionId: app.get("SessionId"), Row:1, Col:2} );
});

app.get('/api/participant_picked_white', (req: express.Request, res: express.Response) => {
  debug("WHITE");
  res.render('participant_chose', { SessionId: app.get("SessionId"), Row: 1, Col: 2, Color: "White" });
});

app.get('/api/participant_picked_black', (req: express.Request, res: express.Response) => {
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
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
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



const _cmdHandler_Time = (_options) => {
  const { term, commandLine, lifecycle } = _options;

  const _today = new Date();
  const _time = _today.getHours() + ":" + _today.getMinutes() + ":" + _today.getSeconds();

  term.addLine( _time );
  lifecycle.end({ result: 'ok' });
};


const _cmdHandler_Hello = (_options) => {
  const { term, commandLine, lifecycle } = _options;
  const _prompt = () => term.addLine({ text: 'Type something... ("bye" for finalize execution)', updateRender: true });

  const _requestHandler = ({userInput}) => {
    term.addLine(`You typed: ${userInput}`)
    const _cmd = userInput.trim();

    if (_cmd !== 'bye') {
      return () => {
        term.request({requestHandler: _requestHandler});
        _prompt();
      }
    } else {
      lifecycle.end({ result: 'ok' });
    }
  };

  _prompt();
  term.request({requestHandler: _requestHandler});

  lifecycle.wait = true;
};


const defineDOMixPlugin = (_options) => {
  const _def = {
    config: {
      name: 'jam',
      provides: {
        commands: ['time', 'hello'],
      },
    },
    metadata: {
      version: '0.0.1',
      author: {
        name: 'Unlevel Team',
      },
    },
    lifecycle: {
      install: _installPlugin,
      uninstall: null,
    },
  };
  return _def;
};

const _installPlugin = ({ deploySystem, ..._options }) => {
  console.log('storage-plugin-jam -> _installPlugin', {deploySystem, _options});  // TODO: REMOVE DEBUG LOG 📏⏳🔍

  deploySystem.addCommand({
    name: 'time',
    description: 'Return current time',
    handler: _cmdHandler_Time,
    extra: {},
  });

  deploySystem.addCommand({
    name: 'hello',
    description: 'Demo of data request',
    handler: _cmdHandler_Hello,
    extra: {},
  });
}


export default {
  defineDOMixPlugin,
};
/**
 * Plugin 'storage' for DOMix
 * includes: 
 *  - module 'storage'
 *  - command 'storage'
 */

const Module_Storage = {
  getStore: () => {
    let _storeDATA = window.sessionStorage.getItem('domixStore');
    if (_storeDATA === null) {
      _storeDATA = {
        _created: Date.now(),
        dataKeyValue: {},
      };
      Module_Storage.saveStore({
        store: _storeDATA,
      })
    } else {
      _storeDATA = JSON.parse(_storeDATA);
    }
    return _storeDATA;
  },

  saveStore: ({ store }) => {
    window.sessionStorage.setItem('domixStore', JSON.stringify(store));
  },

  saveKey: ({ key, value }) => {
    const _storeDATA = Module_Storage.getStore();
    _storeDATA.dataKeyValue[key] = value;
    Module_Storage.saveStore({
      store: _storeDATA,
    });
  },

  getKey: ({ key }) => {
    const _storeDATA = Module_Storage.getStore();
    return _storeDATA.dataKeyValue[key].value;
  },

  deleteKey: ({ key }) => {
    const _storeDATA = Module_Storage.getStore();
    delete _storeDATA.dataKeyValue[key];
    Module_Storage.saveStore({
      store: _storeDATA,
    });
  }
};

const defineDOMixModule = (_options) => {
  const _def = {
    config: {
      name: 'storage',
    },
    metadata: {
      version: '0.0.1',
      description: 'DOMix storage',
      author: {
        name: 'Unlevel Team',
      },
    },
    lifecycle: {
      install: () => Module_Storage,
      uninstall: null,
    },
  };
  return _def;
};


const _cmdHandlerStorage = ({ term, lifecycle, commandLine, ..._options}) => {
  const _modStorage = term.getSystem().library().modules.get({ name: 'storage'});

  term.addLine('Storage');

  if (typeof(Storage) === "undefined") {
    term.addLine('Sorry! No Web Storage support');
    lifecycle.end({ result: 'ok' });
    return; // Exit the function
  }
  
  const _params = commandLine.trim().split(' ');
  
  // Explain how to use;
  const _howToUse = () => {
    term.addLines([ 'How to use:',
      'Save a key: storage save key value',
      'Get a key: storage get key',
      'Delete a key: storage delete key',
    ]);
  };

  if (_params.length === 1) { 
    _howToUse();
    lifecycle.end({ result: 'ok' });
    return; // Exit the function
  }

  const _action = _params[1]; // Check the Action

  switch (_action) {
    case 'list':
      const _store = _modStorage.getStore();
      const _keys = Object.keys(_store.dataKeyValue);
      term.addLine('List of keys:');
      for (const _key of _keys ) {
        term.addLine(`- ${_key} = ${_store.dataKeyValue[_key]}`);
      }
      term.addLine(`Total keys: ${_keys.length}`);
      break;

    case 'save':
      term.addLines([ 'Save key...',
        `key ${_params[2]}...`,
        `value: ${_params[3]}`,
      ]);
      _modStorage.saveKey({ key: _params[2], value: _params[3] });
      break;

    case 'get':
      const _value = _modStorage.getKey({ key: _params[2] });
      if ( _value === undefined ) { term.addLine(`Key ${_params[2]} not found.`);
      } else { term.addLines([ `Get ${_params[2]}...`, _value ]) }
      break;

    case 'delete':
      _modStorage.deleteKey({ key: _params[2] });
      term.addLine(`Key ${_params[2]} deleted! `);
      break;
  
    default:
      break;
  }

  lifecycle.end({ result: 'ok' });
};

const defineDOMixPlugin = (_options) => {
  const _def = {
    config: {
      name: 'storage',
      provides: {
        modules: ['storage'],
        commands: ['storage'],
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

const _installPlugin = ({ deploySystem }) => {
  console.log('storage-plugin-storage -> _installPlugin', deploySystem);  // TODO: REMOVE DEBUG LOG 📏⏳🔍

  deploySystem.modules.define({ moduleDefinition: defineDOMixModule() });
  deploySystem.modules.install({ name: 'storage' });

  deploySystem.addCommand({
    name: 'storage',
    description: 'Manages storage',
    handler: _cmdHandlerStorage,
    extra: {},
  });
};


export default {
  defineDOMixModule,
  defineDOMixPlugin,
};
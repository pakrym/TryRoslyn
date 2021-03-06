import defaults from './handlers/defaults';
import lastUsed from './handlers/last-used';
import url from './handlers/url';

export default {
    save: function(state) {
        lastUsed.saveOptions(state.options);
        url.save(state.code, state.options);        
    },
    
    load: function(state) {
        const fromUrl = url.load() || {};

        const options = fromUrl.options || lastUsed.loadOptions() || {};
        const defaultOptions = defaults.getOptions();
        for (let key of Object.keys(defaultOptions)) {
            if (options[key] == null)
                options[key] = defaultOptions[key];
        }
        const code = fromUrl.code || defaults.getCode(options.language);

        state.options = options;
        state.code = code;
    }
};
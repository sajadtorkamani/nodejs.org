import { createJavaScriptRegexEngine } from '@shikijs/engine-javascript';
import { createOnigurumaEngine } from '@shikijs/engine-oniguruma';
import cLanguage from 'shiki/langs/c.mjs';
import coffeeScriptLanguage from 'shiki/langs/coffeescript.mjs';
import cPlusPlusLanguage from 'shiki/langs/cpp.mjs';
import diffLanguage from 'shiki/langs/diff.mjs';
import dockerLanguage from 'shiki/langs/docker.mjs';
import httpLanguage from 'shiki/langs/http.mjs';
import iniLanguage from 'shiki/langs/ini.mjs';
import javaScriptLanguage from 'shiki/langs/javascript.mjs';
import jsonLanguage from 'shiki/langs/json.mjs';
import powershellLanguage from 'shiki/langs/powershell.mjs';
import shellScriptLanguage from 'shiki/langs/shellscript.mjs';
import shellSessionLanguage from 'shiki/langs/shellsession.mjs';
import typeScriptLanguage from 'shiki/langs/typescript.mjs';
import yamlLanguage from 'shiki/langs/yaml.mjs';

import { createHighlighter } from './highlighter.mjs';

const { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml } =
  createHighlighter({
    // On the server, we use the faster (but less web-optimized) WASM engine
    //
    // TODO(@avivkeller): This engine is not currently supported on OpenNext.
    // If/when OpenNext supports `WebAssembly.instantiate`, we should switch
    // this.
    //
    // See: https://github.com/opennextjs/opennextjs-cloudflare/blob/main/packages/cloudflare/src/cli/build/patches/plugins/wrangler-external.ts#L30
    engine: process?.env.CF
      ? createJavaScriptRegexEngine()
      : await createOnigurumaEngine(import('shiki/wasm')),
    langs: [
      ...cLanguage,
      ...coffeeScriptLanguage,
      ...cPlusPlusLanguage,
      ...diffLanguage,
      ...dockerLanguage,
      ...httpLanguage,
      ...iniLanguage,
      {
        ...javaScriptLanguage[0],
        // We patch the JavaScript language to include the CommonJS and ES Module aliases
        // that are commonly used (non-standard aliases) within our API docs and Blog posts
        aliases: javaScriptLanguage[0].aliases.concat('cjs', 'mjs'),
      },
      ...jsonLanguage,
      ...powershellLanguage,
      ...shellScriptLanguage,
      ...shellSessionLanguage,
      ...typeScriptLanguage,
      ...yamlLanguage,
    ],
  });

export { shiki, getLanguageDisplayName, highlightToHast, highlightToHtml };

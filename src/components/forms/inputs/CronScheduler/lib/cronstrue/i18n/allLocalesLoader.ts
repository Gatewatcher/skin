import * as allLocales from './allLocales';
import type { Locale } from './locale';

export class allLocalesLoader {
  load(availableLocales: { [name: string]: Locale }) {
    for (const [localeName, locale] of Object.entries(allLocales)) {
      availableLocales[localeName] = new locale();
    }
  }
}

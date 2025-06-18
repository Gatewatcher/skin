import type { ThemeColor } from '@/types';

import type { IconName } from '../types';

type Extension = string;

export const ICONS_DEFINITION: Partial<
  Record<IconName, { extensions: Extension[]; color: ThemeColor }>
> = {
  '3D': {
    extensions: ['obj', 'fbx', 'stl', 'dae', '3ds', 'blend'],
    color: 'yellow',
  },
  '3DCurve': { extensions: ['ai', 'eps', 'svg', 'cdr'], color: 'yellow' },
  Image: {
    extensions: [
      'png',
      'jpg',
      'jpeg',
      'gif',
      'bmp',
      'tiff',
      'webp',
      'mp4',
      'avi',
      'mkv',
      'mov',
      'wmv',
      'flv',
      'webm',
      'mpeg',
    ],
    color: 'yellow',
  },
  DocumentWord: {
    extensions: ['doc', 'docx', 'odt'],
    color: 'blue',
  },
  DocumentPdf: {
    extensions: ['pdf'],
    color: 'red',
  },
  Document: {
    extensions: ['txt', 'rtf'],
    color: 'blue',
  },
  Table: {
    extensions: ['xls', 'xlsx', 'ods', 'csv'],
    color: 'green',
  },
  Presentation: {
    extensions: ['ppt', 'pptx', 'odp'],
    color: 'pink',
  },
  Box: {
    extensions: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso', 'dat'],
    color: 'purple',
  },
  Music: {
    extensions: ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma'],
    color: 'red',
  },
  Code: {
    extensions: [
      'html',
      'css',
      'scss',
      'js',
      'ts',
      'jsx',
      'tsx',
      'vue',
      'json',
      'php',
      'py',
      'java',
      'c',
      'cpp',
      'rb',
      'go',
      'swift',
      'xml',
      'yaml',
      'yml',
    ],
    color: 'turquoise',
  },
  Database: {
    extensions: ['sql', 'sqlite', 'db', 'mdb'],
    color: 'orange',
  },
  Settings: {
    extensions: ['exe', 'dll', 'sys', 'bat', 'sh', 'ini', 'cfg', 'reg'],
    color: 'grey',
  },
  TextFont: {
    extensions: ['ttf', 'otf', 'woff', 'woff2'],
    color: 'magenta',
  },
};

export const ICONS: Record<Extension, { icon: IconName; color: ThemeColor }> =
  Object.entries(ICONS_DEFINITION).reduce(
    (acc, [icon, { extensions, color }]) => {
      const itemsAsArray = extensions.map(extension => [
        extension,
        { icon, color },
      ]);
      const items = Object.fromEntries(itemsAsArray);

      return {
        ...acc,
        ...items,
      };
    },
    {},
  );

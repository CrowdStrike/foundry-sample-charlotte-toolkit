// File: rollup.config.js
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { defineConfig } from 'rollup';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import { visualizer } from 'rollup-plugin-visualizer';
import brotli from 'rollup-plugin-brotli';
import tailwindcss from '@tailwindcss/postcss';

// Environment configuration
const isProd = process.env.BUILD === 'production';
const shouldAnalyze = process.env.ANALYZE === 'true';

// Generate cache-busting hash
const generateHash = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `${timestamp}${random}`;
};
const hash = generateHash();

// PostCSS plugins configuration - simplified
const postcssPlugins = [
  // Tailwind v4 handles purging internally, no need for separate PurgeCSS
  tailwindcss()
];

export default defineConfig({
  input: ['src/index.html'],
  output: {
    dir: 'dist',
    format: "esm",
    sourcemap: !isProd,
    entryFileNames: `[name]-${hash}.js`,
    chunkFileNames: `[name]-${hash}.js`,
    assetFileNames: `[name]-${hash}.[ext]`,
    compact: isProd, // Built-in minification for wrapper code
    generatedCode: {
      preset: 'es2015',
      constBindings: true,
      objectShorthand: true,
      arrowFunctions: true
    },
    minifyInternalExports: isProd,
    // Enable automatic code splitting
    manualChunks: (id) => {
      if (id.includes('node_modules')) {
        return 'vendor';
      }
    }
  },
  plugins: [
    // Process JSON files
    json({
      compact: isProd
    }),

    // Replace environment variables
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      'BUILD_NUMBER': JSON.stringify(hash),
      'BUILD_DATE': JSON.stringify(new Date().toISOString().split('T')[0]),
      'IS_PRODUCTION': JSON.stringify(isProd),
      '__DEV__': JSON.stringify(!isProd)
    }),

    // Optimize images in production
    ...(isProd ? [image({
      include: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg'],
      dom: true
    })] : []),

    // Transpile code with Babel
    babel({
      presets: [
        ["@babel/preset-typescript", {
          isTSX: true,
          allExtensions: true
        }],
        ["@babel/preset-react", {
          runtime: 'automatic',
          development: !isProd
        }]
      ],
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
      compact: isProd
    }),

    // Convert CommonJS modules to ES modules
    commonjs({
      transformMixedEsModules: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      include: 'node_modules/**'
    }),

    // Resolve modules
    nodeResolve({
      browser: true,
      exportConditions: ['default', 'module', 'import', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      preferBuiltins: false
    }),

    // Process CSS with PostCSS - simplified
    postcss({
      extract: `styles-${hash}.css`,
      modules: false,
      extensions: [".css"],
      minimize: isProd, // Use built-in CSS minification
      sourceMap: !isProd,
      plugins: postcssPlugins,
      inject: false
    }),

    // Process HTML files
    html({
      minify: isProd,
      transformHtml: (html) => {
        // Add the CSS link
        return html.replace(
          '</head>',
          `<link rel="stylesheet" href="styles-${hash}.css"></head>`
        );
      }
    }),

    // Modern terser minification - much simpler
    ...(isProd ? [terser({
      format: {
        comments: false
      },
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    })] : []),

    // Brotli compression only (better than gzip)
    ...(isProd ? [brotli({
      filter: (file) => file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html'),
      options: {
        quality: 11
      }
    })] : []),

    // Bundle analysis when requested
    ...(shouldAnalyze ? [visualizer({
      filename: 'dist/stats.html',
      title: 'Charlotte Toolkit Bundle Analysis',
      open: true,
      template: 'treemap',
      gzipSize: true,
      brotliSize: true
    })] : [])
  ].filter(Boolean),
  watch: {
    exclude: ['dist/**', 'node_modules/**']
  },

  // Simplified warning handling
  onwarn: (msg, warn) => {
    // Ignore common warnings that don't affect functionality
    if (
      msg.code === 'THIS_IS_UNDEFINED' ||
      msg.code === 'CIRCULAR_DEPENDENCY' ||
      msg.code === 'EVAL'
    ) {
      return;
    }
    warn(msg);
  },

  // Enable tree shaking with modern settings
  treeshake: {
    moduleSideEffects: 'no-external',
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false
  }
});

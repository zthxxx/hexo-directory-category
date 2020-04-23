/* global hexo */

'use strict';

const assign = require('object-assign');

hexo.config.auto_dir_categorize = assign({
  enable: true,
  force: false
}, hexo.config.auto_dir_categorize);

const post_processor = require('./lib/processor/post')(hexo);

hexo.extend.processor.register(post_processor.pattern, post_processor.process);

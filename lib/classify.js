const pathFn = require('path');

module.exports = (config, data, categories) => {
  // Auto classify from path to categories
  const autoDirClassify = config.auto_dir_categorize;
  if (autoDirClassify.enable) {
    
    // Check if in _draft directory and modify the as the _posts
    const dirCategories = pathFn
      .relative('_posts',pathFn.dirname(data.source))
      .replace(['..', '_drafts', ''].join(pathFn.sep), '')
      .split(pathFn.sep);

    if (!categories.length || autoDirClassify.force) return dirCategories;
  }
  return categories;
};

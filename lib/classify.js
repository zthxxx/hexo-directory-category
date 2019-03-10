const pathFn = require('path');

module.exports = (config, data, categories) => {
  // Auto classify from path to categories
  const autoDirClassify = config.auto_dir_categorize;
  if (autoDirClassify.enable) {
    let dirCategories = pathFn.relative('_posts',pathFn.dirname(data.source)).split(pathFn.sep);
    // Check if in _draft directory and modify the result
    if (dirCategories.length >= 2 && dirCategories[0] == '..' && dirCategories[1] == '_drafts') {
      dirCategories = dirCategories.slice(2);
    }
    if (!categories.length || autoDirClassify.force) return dirCategories;
  }
  return categories;
};

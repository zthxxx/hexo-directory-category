const pathFn = require('path');

module.exports = (config, data, categories) => {
  // Auto classify from path to categories
  const autoDirClassify = config.auto_dir_categorize;
  if (autoDirClassify.enable) {
    let dirCategories = pathFn.relative('_posts',pathFn.dirname(data.source)).split(pathFn.sep);
    if (!categories.length || autoDirClassify.force) return dirCategories;
  }
  return categories;
};

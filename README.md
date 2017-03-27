# hexo-directory-category
[![Build Status](https://travis-ci.org/zthxxx/hexo-directory-category.svg)](https://travis-ci.org/zthxxx/hexo-directory-category)
[![Coverage Status](https://coveralls.io/repos/github/zthxxx/hexo-directory-category/badge.svg)](https://coveralls.io/github/zthxxx/hexo-directory-category)
[![NPM Version](https://badge.fury.io/js/hexo-directory-category.svg)](https://badge.fury.io/js/hexo-directory-category)
[![npm downloads](https://img.shields.io/npm/dt/hexo-directory-category.svg)](https://www.npmjs.com/package/hexo-directory-category)
[![GitHub release](https://img.shields.io/github/release/zthxxx/hexo-directory-category.svg)](https://github.com/zthxxx/hexo-directory-category/releases/latest)

Automatically add front-matter `categories` to Hexo article according to the article file directory.

Directory is means relative form article file path to Hexo source `_posts` folder.


## Features
* See the details in [hexo-theme-Wikitten](https://github.com/zthxxx/hexo-theme-Wikitten) **[issues#4](https://github.com/zthxxx/hexo-theme-Wikitten/issues/4)**
* Automatically add category to article according to the file directory, if article front-matter haven't option categories. 
* Easy to categorize articles, or change the categories.





## Install

``` bash
$ cd <your-hexo-site>
$ npm install --save hexo-directory-category
```



## Options

You can configure this plugin in site `_config.yml`.
```
auto_dir_categorize:
	enable: true  # options:true, false; default is true
	force: false # options:true, false; default is false
```

- **enable** - Enable the plugin. Defaults to **true**.
- **force** - Overwrite article front-matter categories, even if it has option categories.Defaults to **false**.





## Example

### 1. enable: true, force: false

```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
categories: [CS, Usage]
tags: [...]

# After hexo generate, it will nothing Conversion. categories: [CS, Usage]
```



```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
# categories: [...]
tags: [...]

# After hexo generate, it will convert to categories: [Linux, Vim, note]
```



### 2. enable: true, force: true

```yaml
# file: ./_posts/Linux/Vim/note/test.md
...
categories: [CS, Usage]
tags: [...]

# After hexo generate, it also will convert to categories: [Linux, Vim, note]
```



## License

[MIT LICENSE](./LICENSE)
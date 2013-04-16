ONLY A TEST
===========

This is for: https://github.com/gruntjs/grunt-contrib-compress/issues/41

Usage
-----

```
git clone git://github.com:davglass/yui3-release.git
cd yui3-release
npm install
//assumming npm -g install grunt-cli
grunt compress:dist
```

On Node 0.8.18+ it will show this:

```
$ grunt compress:dist

>> Local Npm module "grunt-yui-contrib" not found. Is it installed?

Running "compress:dist" (compress) task
$
```

On Node 0.10.x it will show this:

```
$ grunt compress:dist

>> Local Npm module "grunt-yui-contrib" not found. Is it installed?

Running "compress:dist" (compress) task
Created release/3.10.0pr1/archives/yui_3.10.0pr1.zip (35.9 MB)

Done, without errors.

$
```

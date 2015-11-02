// leave at least 2 line with only a star on it below, or doc generation fails
/**
 *
 *
 * Placeholder for custom user javascript
 * mainly to be overridden in profile/static/custom/custom.js
 * This will always be an empty file in IPython
 *
 * User could add any javascript in the `profile/static/custom/custom.js` file.
 * It will be executed by the ipython notebook at load time.
 *
 * Same thing with `profile/static/custom/custom.css` to inject custom css into the notebook.
 *
 *
 * The object available at load time depend on the version of IPython in use.
 * there is no guaranties of API stability.
 *
 * The example below explain the principle, and might not be valid.
 *
 * Instances are created after the loading of this file and might need to be accessed using events:
 *     define([
 *        'base/js/namespace',
 *        'base/js/events'
 *     ], function(IPython, events) {
 *         events.on("app_initialized.NotebookApp", function () {
 *             IPython.keyboard_manager....
 *         });
 *     });
 *
 * __Example 1:__
 *
 * Create a custom button in toolbar that execute `%qtconsole` in kernel
 * and hence open a qtconsole attached to the same kernel as the current notebook
 *
 *    define([
 *        'base/js/namespace',
 *        'base/js/events'
 *    ], function(IPython, events) {
 *        events.on('app_initialized.NotebookApp', function(){
 *            IPython.toolbar.add_buttons_group([
 *                {
 *                    'label'   : 'run qtconsole',
 *                    'icon'    : 'icon-terminal', // select your icon from http://fortawesome.github.io/Font-Awesome/icons
 *                    'callback': function () {
 *                        IPython.notebook.kernel.execute('%qtconsole')
 *                    }
 *                }
 *                // add more button here if needed.
 *                ]);
 *        });
 *    });
 *
 * __Example 2:__
 *
 * At the completion of the dashboard loading, load an unofficial javascript extension
 * that is installed in profile/static/custom/
 *
 *    define([
 *        'base/js/events'
 *    ], function(events) {
 *        events.on('app_initialized.DashboardApp', function(){
 *            require(['custom/unofficial_extension.js'])
 *        });
 *    });
 *
 * __Example 3:__
 *
 *  Use `jQuery.getScript(url [, success(script, textStatus, jqXHR)] );`
 *  to load custom script into the notebook.
 *
 *    // to load the metadata ui extension example.
 *    $.getScript('/static/notebook/js/celltoolbarpresets/example.js');
 *    // or
 *    // to load the metadata ui extension to control slideshow mode / reveal js for nbconvert
 *    $.getScript('/static/notebook/js/celltoolbarpresets/slideshow.js');
 *
 *
 * @module IPython
 * @namespace IPython
 * @class customjs
 * @static
 */

 var utilities = {
     'name': 'Utilities',
     'sub-menu': [
         {
             'name': 'Code hider',
             'snippet': ["import IPython.core.display as di",
                     "",
                     "# This line will hide code by default when the notebook is exported as HTML",
                     "di.display_html('<script>jQuery(function() {if (jQuery(\"body.notebook_app\").length == 0) { jQuery(\".input_area\").toggle(); jQuery(\".prompt\").toggle();}});</script>', raw=True)",
                     "",
                     "# This line will add a button to toggle visibility of code blocks, for use with the HTML export version",
                     "di.display_html('''<button onclick=\"jQuery('.input_area').toggle(); jQuery('.prompt').toggle();\">Toggle code</button>''', raw=True)"],
         },
         {
             'name': 'Open custom.js',
             'snippet': ["!open /Users/bwsprague/.ipython/profile_default/static/custom/custom.js"],
         },
     ],
};

 var my_favorites = {
     'name' : 'Favorite Snippets',
     'sub-menu' : [
         {
             'name' : 'Basic setup',
             'snippet' : ['%matplotlib inline', "",
                        'import numpy as np',
                        'import matplotlib as mpl',
                        'import matplotlib.pyplot as plt',
                        'import seaborn as sns',"",
                        "sns.set_style('white')",
                        "sns.set_context('talk')"],
         },
         {
             'name' : 'Another menu item',
             'snippet' : ['another_new_command(2.78)',],
         },
     ],
 };


 $([IPython.events]).on('app_initialized.NotebookApp', function(){

    require(["nbextensions/boilerplate/boilerplate"], function (boilerplate) {
        console.log('Loading `boilerplate` notebook extension');

        var boilerplate_help = {
            'name': 'Boilerplate Help',
            'external-link': 'https://github.com/moble/jupyter_boilerplate',
        };

        boilerplate.default_menus.splice(1, 0, my_favorites);
        // boilerplate.default_menus[0]['sub-menu'].splice(0, 0, my_favorites);
        boilerplate.default_menus[0]['sub-menu'].push(utilities);
        boilerplate.default_menus[0]['sub-menu'].push(boilerplate_help);
        boilerplate.load_ipython_extension(boilerplate.default_menus);
        console.log('Loaded `boilerplate` notebook extension');
    });

});

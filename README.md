Dig-Knockout
================

Dig-Knockout is a tiny library which trys to show you how the popular library of MVVM works. Maybe you are confused for the mechanism because you have experienced many similar frameworks only by calling API. 

So, I write the same functions just like Konockoutjs, some bingdings instruction(text, html, click, if, foreach) has been implimented in this library, I help this tiny guy could help you understand how to design a framwork of MVVM.

Now let's dig it out together.


Installing Dependencies
=======================

1. Install Javascript Libraries
    * `bower install `
2. Install node_modules

Run
=======================
    * `grunt`

Demo
================
using libraries:
```
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="scripts/myknockout.js"></script>
```

template:
```
<template id="demo">
    <div data-bind="foreach: messages">
        <h4>
            <a data-bind="text: title"></a>
        </h4>
        <p data-bind="text: content"></p>
    </div> 
</template>
```

viewModel:
```
(function() {
    var viewModel = {
        messages: ko.observableArray([
            {
                title: "HTML5 Boilerplate",
                content: "HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites."
            },
            {
                title: "Sass",
                content: "Sass is a mature, stable, and powerful professional grade CSS extension language."
            },
            {
                title: "Bootstrap",
                content: "Sleek, intuitive, and powerful mobile first front-end framework for faster and easier web development."
            },
            {
                title: "Modernizr",
                content: "Modernizr is an open-source JavaScript library that helps you build the next generation of HTML5 and CSS3-powered websites."
            }
        ])
    };
    ko.applyBindings(viewModel, 'demo');
})(this);

```

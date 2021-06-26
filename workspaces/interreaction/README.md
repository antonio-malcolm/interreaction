Spark an interReaction!
=============================
!["NodeJS Version"](https://img.shields.io/badge/NodeJS-%5E14%2E17%2E0-43853d?style=for-the-badge&logo=nodedotjs)
 !["npm Version"](https://img.shields.io/badge/npm-%5E6%2E14%2E3-ea2039?style=for-the-badge&logo=npm)
 !["pnpm Version"](https://img.shields.io/badge/pnpm-%5E6%2E9%2E1-f69220?style=for-the-badge&logo=pnpm)  
!["React Version"](https://img.shields.io/badge/React-%5E17%2E0%2E2-61dafb?style=for-the-badge&logo=react)
 !["React DOM Version"](https://img.shields.io/badge/React%20DOM-%5E17%2E0%2E2-61dafb?style=for-the-badge&logo=react)
 !["Preact Version"](https://img.shields.io/badge/Preact-%5E10%2E5%2E13-673ab8?style=for-the-badge&logo=preact)  
!["Test Code Coverage"](https://img.shields.io/badge/Test%20Coverage-90%25-7eaa69?style=for-the-badge)
 !["Test Status"](https://img.shields.io/badge/Test%20Status-All%20Pass%20(3308)-43c25f?style=for-the-badge)
 !["Build Status"](https://img.shields.io/badge/Build%20Status-Success-43c25f?style=for-the-badge)

__interReaction is a library which enables you to easily use React components in a non-React client application (Angular, GWT, 
jQuery, vanilla JavaScript, et al.), while keeping React library and project build concerns separate from your non-React client application.__

__interReaction is an ideal solution, for modernizing an aging client application, or replacing it, feature-by-feature, in a more sane, prepared, and maintainable way.__

__**NOTE: _There are both React and Preact builds! This README applies to both interReaction (the React build) and interPreaction (the Preact build), and both use the same `interReaction` namespace, for method calls_.__

## Contents
[About](#about)  
[Quickstart](#quickstart)  
[Methods](#methods)  
[Advanced Topics](#advanced-topics)
  * [Building From Source](#building-from-source)
  * [Running Tests](#running-tests)
  * [Smoke Testing](#smoke-testing)
  * [Cleanup](#cleanup)
  * [Project Structure](#project-structure)

[Author And License Info](#author-and-license-info)  
[Support This Project](#support-this-project)

## About

interReaction provides a simple interface, with simple methods, for mounting, passing props to, and otherwise manipulating React components from within a non-React application.

Build your React application as a standard, standalone application. Continue maintaining your current non-React application, without mixing libraries or build concerns.

Your React component tree may be structured according to your own design, just as when building a standard, standalone React app, because it _is_ a standard, standalone React app.

Use Webpack, Babel and file loaders.

Use Redux, middleware, theming, and internationalization providers, with implementation and inheritance, all standard.

interReaction is wholly non-opinionated, about your React application structure, build configuration, loaders, or other third-party libraries.

interReaction is wholly non-opinionated, about your non-React application structure, build configuration, loaders, or other third-party libraries.

interReaction has no knowledge of any application details, React or otherwise, aside from those components assigned to its internal management (and, that knowledge is intentionally very limited).

interReaction is available for both React and Preact applications.

## Quickstart

#### Requirements
The only requirements for interReaction (React) are dependencies: `"react": "^17.0.2"`, `"react-dom": "^17.0.2"`, and `"scheduler": "^0.20.2"` (for `react-dom`).

The only requirement for interPreaction (Preact) is a dependency of: `"preact": "^10.5.13"`.

In either case, these are peer dependencies, which will need, alongside interReaction or interPreaction, to be installed and / or added to your project's `package.json` dependencies:

__If using the React build (interReaction):__  
Install interReaction (React) and / or add as a dependency:
```JSON
"dependencies": {

  "react": "^17.0.2",
  "react-dom": "^17.0.2",
  "scheduler": "^0.20.2",
  "interReaction": "^1.0.0",

}
```

Or:
```shell
$ npm install --save react@17.0.2 react-dom@17.0.2 scheduler@0.20.2 interReaction@1.0.0
```

__If using the Preact build (interPreaction):__  
Install interPreaction (React) and / or add as a dependency:
```JSON
"dependencies": {

  "preact": "^10.5.13",
  "interPreaction": "^1.0.0",

}
```

Or:
```shell
$ npm install --save preact@10.5.13 interPreaction@1.0.0
```

In your React application, initialize the interReaction instance, passing in component name to React component mappings, 
to be managed by interReaction (usually, in `index.js,` for example).

__If using the React build (interReaction):__
```JavaScript
import InterReactionFactory from 'interreaction';
```

__If using the Preact build (interPreaction):__
```JavaScript
import InterReactionFactory from 'interpreaction';
```

```JavaScript
// REACT OR PREACT IMPORT, PROVIDER IMPORTS (REDUX, THEME, INTERNATIONALIZATION, ET AL.):
import React from 'react';
import { Provider } from 'react-redux';

// COMPONENTS TO BE MANAGED BY INTERREACTION:
import ComponentOne from 'component/ComponentOne';
import ComponentToo from 'component/ComponentToo';
import ComponentThree from 'component/ComponentThree';
import ComponentFour from 'component/ComponentFour';
import ComponentFive from 'component/ComponentFive';

// USUAL GLOBAL CSS IMPORTS, ETC:
import 'asset/style/App.scss';

// USUAL APP ROOT COMPONENT,
// WILL BE PASSED TO INTERREACTION:
class AppRootComponent extends React.Component {
  render() {
    return (
      // USUAL PROVIDERS, FOR INHERITANCE:
      <Provider store ={ AppStore }>
        // PASS this.props.children
        // INTERREACTION WILL ASSIGN (AND PROVIDERS WILL BE INHERITED):
        this.props.children
      </Provider>
    );
  }
}

// A MAPPING OF REACT COMPONENT NAMES, TO THEIR RESPECTIVE IMPORTS,
// WILL BE PASSED TO INTERREACTION:
const componentNameToComponentMappings = {
    ComponentOne,
    ComponentToo,
    ComponentThree,
    ComponentFour,
    ComponentFive
  };

// OPTIONAL CONFIG OBJECT:
const interReactionConfig = {
    // IF YOU WANT TO ASSIGN A CUSTOM CLASSNAME TO EACH CUSTOM ELEMENT:
    className: 'some_className',

    // IF YOU WANT TO ASSIGN A CUSTOM TAGNAME TO EACH CUSTOM ELEMENT:
    // (MUST CONFORM TO TAGNAME RULES FOR WEB COMPONENTS CUSTOM ELEMENTS)
    // (IF NOT SET, TAGNAME WILL DEFAULT TO: "inter-reaction")
    tagName: 'some-tagname',

    // IF YOU WANT TO ASSIGN THE DEFAULT,
    // INTERNAL CLASSNAME TO EACH CUSTOM ELEMENT:
    // (WILL ADD CLASSNAME: "interReaction" TO EACH CUSTOM ELEMENT)
    shouldApplyDefaultClassName: true,

    // IF YOU WANT CONSOLE LOG OUTPUT, FOR DEBUGGING:
    shouldEnableDebugging: (process.env.NODE_ENV === 'development')
  };

// THIS IS WHERE THE MAGIC HAPPENS!
InterReactionFactory.init(
  // REQUIRED:
  AppRootComponent,

  // REQUIRED:
  componentNameToComponentMappings,

  // OPTIONAL:
  interReactionConfig
);
```

In your non-React client application, add tags for, or otherwise import your React application `.js` and `.css` bundles.

interReaction will, on initialization, scan the DOM, for any statically-defined / pre-defined interReaction Custom Elements, 
by `tagName`, and assign a React component instance, by `compName`. 

Your defined Custom Element may also have a `compid` and / or `comp-group` 
attribute, if the component should be associated to a group (`comp-group` === `compGroup`), 
or have an action performed upon it, uniquely (`comp-id` === `compId`).
```html
<link href="location/of/your/react-css-bundle.css" rel="stylesheet" />
<script src="location/of/your/react-js-bundle.js" type="text/javascript"></script>

<!-- ON INITIALIZATION, INTERREACTION WILL MOUNT A NEW REACT COMPONENT INSTANCE, BY compName, INSIDE THIS CUSTOM ELEMENT -->
<inter-reaction comp-name="ComponentToo" comp-id="someUniqueId" comp-group="someGroupName"></inter-reaction>
```

In your non-React client application, add logic, for including React components, using interReaction.

```JavaScript

const doInterReactionStuffs = function() {

  // CREATE A NEW INTERREACTION CUSTOM ELEMENT AND APPEND IT TO THE DOM:
  document.body.appendChild(
    interReaction.createElement({
      compName: 'ComponentOne',
      compId: 'compOneId'
    })
  );

  // ASSIGN A NEW REACT COMPONENT INSTANCE, BY compName, TO THE INTERREACTION CUSTOM ELEMENT,
  // BY compId,
  // AND PASS SOME INITIAL PROPS:
  interReaction.assign({
    compName: 'ComponentOne',
    compId: 'compOneId',
    compProps: {
      somePropkey: 'some prop value'
    }
  });

  // ASSIGN A NEW REACT COMPONENT,
  // BY compName,
  // TO EACH DOM ELEMENT FOUND BY PROVIDED QUERY SELECTOR:
  interReaction.createAssignToDomSelector(
    { compName: 'ComponentToo' },
    'document > body .someClassNameSelector'
  );

  // ASSIGN A NEW REACT COMPONENT,
  // BY compName,
  // TO THE PROVIDED DOM ELEMENT:
  interReaction.createAssignToDomElement(
    { compName: 'ComponentThree' },
    document.body.querySelector(.someOtherClassNameSelector)
  );
};


if (typeof interReactionReadyState !== 'undefined') {

  // CHECK THE WINDOW / GLOBAL 'interReactionReadyState' property:
  if (interReactionReadyState === 'ready') {
    doInterReactionStuffs();
  }

} else {

  // WAIT FOR THE 'interReactionInstanceReady' EVENT:
  document.addEventListener('interReactionInstanceReady', doInterReactionStuffs);

}
```

## Methods

#### Common Contract:  

__All methods assigned to the golabl `interReaction` instance (also referred to as "actions") take a details arg, of type `Object<String,String>` or `Object<String,Array<Object>>`.__

This further eases implementation, by creating an environment of general, repeatable familiarity.  
From the details arg, for each method, the following fields are accepted:

### `compName`
__Type:__ `String`: in most cases, the `compName` field is required, in the absence of either `compGroup` or `compList`.  
This field identifies the component, upon which to perform the desired action. It must match a component name existing in the component 
name to component mappings passed to the interReaction instance, via the InterReactionFactory.init method.

__Example:__ 
```JavaScript
{ compName: 'SomeCompName' }
```

### `compId`
__Type:__ `String`: the `compId` field, when assigned to a component being added to the DOM, should be _unique_. When this field is present, 
an action will be performed upon _only_ that singular component instance, to which the `compId` is assigned. Otherwise, 
the action will be performed upon _all_ component instances which share the component name `compName` field value. 

__Example:__
```JavaScript
{ compName: 'SomeCompName', compId: 'someCompId' }
```

### `compGroup`
__Type:__ `String`: a `compGroup` field may be assigned, to several or many components, upon which an action should be performed. 
Components associated to a group do not need to have any relation to each other. They are simply multiple components, 
upon which you want an action executed, with a single method call. Except when being assigned, when `compGroup` is a populated field, 
generally, `compName` is not needed, because interReaction tracks, internally, which component instances are associated to which groups.

__Example:__
```JavaScript
{ compGroup: 'groupName' }
```

### `compProps`
__Type:__ `Object<String,?>`: the `compProps` field is used with methods which pass props to React components, such as `interReaction.update`.

__Example:__
```JavaScript
{ compName: 'SomeComp',
  compProps: { somePropKey: 'some prop value' }
}
```

### `compList`
__Type:__ `Array<Object>`: the `compList` field is used, when an action should be executed on multiple component insances, 
by `compName` (with or without `compId`), or `compGroup`.

__Example:__
```JavaScript
{ compList: [
  { compName: 'SomeCompName' },
  { compGroup: 'groupName' },
  { compName: 'SomeOtherCompName', compId: 'someOtherCompId' },

  { compName: 'AnotherCompName',
    compId: 'anotherCompId',
    compProps: { somePropKey: 'some prop value' }
  }
] }
```

### `compReplacement`
__Type:__ `String`: the `compReplacement` field is a component name, used by method `interReaction.replace`, 
to replace a React component instance with an instance which has a matching component name.

__Examples:__
```JavaScript
{ compName: 'SomeCompName', compReplacement: 'SomeOtherCompName' }
```
```JavaScript
{ compGroup: 'groupName', compReplacement: 'SomeCompName' }
```

#### Methods:

### `.createElement(Object<String,String>{ details })`
Returns a new interReaction Custom Element instance, to be appended to the DOM.

__Args (1):__  
* details (`Object<String,String>`): Key : value pairs, which describe the React component to be mounted inside the Custom Element.
  * Fields:
    * `compName` (`String`, required): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance, of a component. should be actionable.
    * `compGroup` (`String`, optional): if the component instance should be associated to a group.
    * `className` (`String`, optional): a className to add to the Custom Element instance (this will be in addition to any classNames assigned to the interReaction instance config).
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.
__Returns:__  
A new interReaction Custom Element instance, to be appended to the DOM.

__Example:__
```Javascript
// APPENDING A NEW interReaction Custom Element TO DOM document:
document.appednChild(
  interReaction.createElement({
    // REQUIRED:
    compName: 'SomeCompName',

    // OPTIONAL:
    compId: 'someCompID',

    // OPTIONAL:
    compGroup: 'someCompGroupName',
  })
);
```


### `.assign(Object<String,String|Array<Object>>{ details })`
Assigns a new React component instance, to an interReaction Custom Element, by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compList` details field is provided, in place of `compName`, assigns each React component instance, to its respective Custom Element instance, 
per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be mounted inside the Custom Element(s).
  * Fields:
    * `compName` (`String`, required, if no `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance, of a component. should be actionable.
    * `compGroup` (`String`, optional): associates the component to a group.
    * `compList` (`Array<Object>`, required, if no `compName`): if more than one React component should be assigned.
    * `compProps` (`Object<String,?>`, optional): contains key : value pairs, to be passed as props, to the React component instance.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName, compId, compGroup, AND compProps:
interReaction.assign({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID',

  // OPTIONAL:
  compGroup: 'someCompGroupName',

  // OPTIONAL:
  compProps: {
      somePropsKey: 'some props value'
    }
});

// WITH compList:
interReaction.assign({
  compList: [
    { compName: 'SomeCompName' },
    { compName: 'SomeOtherCompName', compId: 'someCompId' },
    { compName: 'AnotherCompName', compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'YetAnotherCompName',
    
      // OPTIONAL:
      compId: 'someOtherCompID',
    
      // OPTIONAL:
      compGroup: 'someOtherCompGroupName'
    }
  ]
});
```


### `.createAssignToDomElement(Object<String,String|Array<Object>>{ details }, Element domElement, String position)`
Creates a new interReaction Custom Element, adds it to the provided DOM Element, with positioning relative to siblings, according to the provided position, 
and assigns a new React component instance, by `compName` details field (and `compId`, if `compId` details field is present).

If `compList` details field is provided, in place of `compName`, creates each interReaction Custom Element, adds each to the provided DOM Element, 
with positioning relative to siblings, according to the provided position, and assigns each React component instance, to its respective Custom Element instance, 
per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (3):__  
* details (`Object<String,String|Array<Object>>`, required): Key : value pairs, 
which describe the React component(s) to be mounted inside the Custom Element(s).
  * Fields:
    * `compName` (`String`, required, if no `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be actionable.
    * `compList` ((`Array<Object<String,String>>`, required, if no `compName`): if more than one intrerReaction Custom Element, by more than one `compName`, should be created and added to the DOM, and React component instances be assigned.
    * `compGroup` (`String`, optional): associates the component instance(s) to a group.
    * `compProps` (`Object<String,?>`, optional): contains key : value pairs, to be passed as props, to the React component instance(s).
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

* domElement (DOM `Element`, required): DOM `Element`, to which the new Custom Element, with assigned React component, should be added.

* positioning (`String`, optional, defaults to: `'append'`): one of: `'append'` (add after DOM Element children), `'prepend'` 
(add before DOM Element children), or `'replace'` (replace DOM Element children).

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName, compId, AND compProps:
interReaction.createAssignToDomElement(
  {
    // REQUIRED:
    compName: 'SomeCompName',
  
    // OPTIONAL:
    compId: 'someCompID',
  
    // OPTIONAL:
    compProps: {
        somePropsKey: 'some props value'
      }
  },
  document.body,
  'append'
);

// WITH compGroup:
interReaction.createAssignToDomElement(
  { compGroup: 'someCompGroupName' },
  document.body,
  'append'
);

// WITH compList:
interReaction.createAssignToDomElement(
  { compList: [
    { compName: 'SomeCompName' },
    { compName: 'SomeOtherCompName', compId: 'someCompId' },
    { compName: 'AnotherCompName', compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'YetAnotherCompName',
    
      // OPTIONAL:
      compId: 'someOtherCompID',
    
      // OPTIONAL:
      compProps: {
          somePropsKey: 'some props value'
        }
    }
  ]},
  document.body,
  'append'
);
```


### `.createAssignToDomSelector(Object<String,String|Array<Object>>{ details }, String selector, String position)`
Creates new interReaction Custom Elements, adds them to the DOM Elements found, by the provided query selector, with positioning relative to siblings, 
according to the provided position, and assigns new React component instances, by `compName` details field (and `compId`, if `compId` details field is present).

If `compList` details field is provided, in place of `compName`, creates each interReaction Custom Element, adds each to the DOM Elements found, 
by the provided query selector, with positioning relative to siblings, according to the provided position, and assigns each React component instance, 
to its respective Custom Element instance, per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (3):__  
* details (`Object<String,String|Array<Object>>`, required): Key : value pairs, 
which describe the React component(s) to be mounted inside the Custom Element(s).
  * Fields:
    * `compName` (`String`, required, if no `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be actionable.
    * `compList` ((`Array<Object<String,String>>`, required, if no `compName`): if more than one intrerReaction Custom Element, by more than one `compName`, should be created and added to the DOM, and React component instances be assigned.
    * `compGroup` (`String`, optional): associates the component instance(s) to a group.
    * `compProps` (`Object<String,?>`, optional): contains key : value pairs, to be passed as props, to the React component instance(s).
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

* querySelector (`String`, required): query selector, used to find DOM `Eleemnt`s, to which new Custom Elements, 
with assigned React components, should be added.

* positioning (`String`, optional, defaults to: `'append'`): one of: `'append'` (add after DOM `Element` children), 
`'prepend'` (add before DOM `Element` children), or `'replace'` (replace DOM `Element` children).

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName, compId, AND compProps:
interReaction.createAssignToDomSelector(
  {
    // REQUIRED:
    compName: 'SomeCompName',
  
    // OPTIONAL:
    compId: 'someCompID',
  
    // OPTIONAL:
    compProps: {
        somePropsKey: 'some props value'
      }
  },
  'document > body .someElementClassName',
  'append'
);

// WITH compGroup:
interReaction.createAssignToDomSelector(
  { compGroup: 'someCompGroupName' },
  'document > body .someElementClassName',
  'append'
);

// WITH compList:
interReaction.createAssignToDomSelector(
  { compList: [
    { compName: 'SomeCompName' },
    { compName: 'SomeOtherCompName', compId: 'someCompId' },
    { compName: 'AnotherCompName', compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'YetAnotherCompName',
    
      // OPTIONAL:
      compId: 'someOtherCompID',
    
      // OPTIONAL:
      compProps: {
          somePropsKey: 'some props value'
        }
    }
  ]},
  'document > body .someElementClassName',
  'append'
);
```


### `.mount(Object<String,String|Array<Object>>{ details })`
Mounts a React component instance, by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, mounts all React component instances associated to the `compGroup`.

If `compList` details field is provided, in place of `compName`, mounts each React component instance, 
per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be mounted.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be mounted.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be mounted.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be mounted.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.mount({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID'
});

// WITH compGroup:
interReaction.mount({ compGroup: 'someCompGroupName' });

// WITH compList:
interReaction.mount({
  compList: [
    { compName: 'SomeCompName' },
    { compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID'
    }
  ]
});
```


### `.unmount(Object<String,String|Array<Object>>{ details })`
Unmounts a React component instance, by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, unmounts all React component instances associated to the `compGroup`.

If `compList` details field is provided, in place of `compName`, unmounts each React component instance, 
per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be unmounted.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be unmounted.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be unmounted.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be unmounted.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.unmount({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID'
});

// WITH compGroup:
interReaction.unmount({ compGroup: 'someCompGroupName' });

// WITH compList:
interReaction.unmount({
  compList: [
    { compName: 'SomeCompName' },
    { compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID'
    }
  ]
});
```


### `.remount(Object<String,String|Array<Object>>{ details })`
Remounts (unmounts, then mounts) a React component instance, by `compName` details field, 
and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, remounts (unmounts, then mounts) 
all React component instances associated to the `compGroup`.

If `compList` details field is provided, in place of `compName`, remounts (unmounts, then mounts) each React component instance, 
per each array member object `compName` details field (and `compId`, if `compId` details field is present).

(In the case that a component instance is already unmounted, `.remount` will mount the component instance.)

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be remounted.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be remounted.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be remounted.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be remounted.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.remount({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID'
});

// WITH compGroup:
interReaction.remount({ compGroup: 'someCompGroupName' });

// WITH compList:
interReaction.remount({
  compList: [
    { compName: 'SomeCompName' },
    { compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID'
    }
  ]
});
```


### `.toggleMount(Object<String,String|Array<Object>>{ details })`
Mounts or unmounts (whichever is opposite to the current mount status) a React component instance, 
by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, mounts or unmounts (whichever is opposite to the current mount status) 
all React component instances associated to the `compGroup`.

If `compList` details field is provided, in place of `compName`, mounts or unmounts (whichever is opposite to the current mount status) 
each React component instance, per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be toggle mounted.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be toggle mounted.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be togle mounted.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be toggle mounted.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.toggleMount({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID'
});

// WITH compGroup:
interReaction.toggleMount({ compGroup: 'someCompGroupName' });

// WITH compList:
interReaction.toggleMount({
  compList: [
    { compName: 'SomeCompName' },
    { compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID'
    }
  ]
});
```


### `.remove(Object<String,String|Array<Object>>{ details })`
Unmounts, then removes, from interReaction component management, a React component instance, 
by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, unmounts then removes, from interReaction component management,
all React component instances associated to the `compGroup`.

If `compList` details field is provided, in place of `compName`, unmounts, then removes, from interReaction component management, 
each React component instance, per each array member object `compName` details field (and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) to be unmounted, 
then removed, from interReaction component management.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be unmounted and removed, from interReaction component management.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be unmounted and removed, from interReaction component management.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be unmounted and removed, from interReaction component management.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.remove({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID'
});

// WITH compGroup:
interReaction.remove({ compGroup: 'someCompGroupName' });

// WITH compList:
interReaction.remove({
  compList: [
    { compName: 'SomeCompName' },
    { compGroup: 'someCompGroupName' },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID'
    }
  ]
});
```


### `.replace(Object<String,String|Array<Object>>{ details })`
Replaces a React component instance, with one named by details field `compReplacement`, 
by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, replaces all React component instances, 
associated to the `compGroup` with those named by details field `compReplacement`.

If `compList` details field is provided, in place of `compName`, replaces each React component instance, 
with those named by details fields `compReplacement`, per each array member object `compName` details field 
(and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s) 
to be mounted inside the Custom Element(s).
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should be replaced.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should be replaced.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should be replaced.
    * `compReplacement` (`String`, required (returns without error, if absent)): the name assigned to the component, which should replace the component named by `compName`.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.replace({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID',

  // REQUIRED (returns without error, if absent):
  compReplacement: 'SomeOtherCompName'
});

// WITH compGroup:
interReaction.replace({
  // REQUIRED:
  compGroup: 'someCompGroupName',

  // REQUIRED (returns without error, if absent):
  compReplacement: 'SomeOtherCompName'
});

// WITH compList:
interReaction.replace({
  compList: [
    {
      compName: 'SomeCompName',
      compReplacement: 'SomeOtherCompName'
    },
    {
      compGroup: 'someCompGroupName',
      compReplacement: 'SomeOtherCompName'
    },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID',

      // REQUIRED (returns without error, if absent):
      compReplacement: 'SomeOtherCompName'
    }
  ]
});
```


### `.update(Object<String,String|Array<Object>>{ details })`
Passes props to a React component instance, properties provided by details field `compProps`, 
by `compName` details field, and `compId` details field, if `compId` details field is present.

If `compGroup` details field is provided, in place of `compName`, passes props to all React component instances, 
associated to the `compGroup`, properties provided by details field `compProps`.

If `compList` details field is provided, in place of `compName`, passes props to each React component instance, 
properties provided by details field `compProps`, per each array member object `compName` details field 
(and `compId`, if `compId` details field is present).

__Args (1):__  
* details (`Object<String,String|Array<Object>>`): Key : value pairs, which describe the React component(s), 
to which props should be passed.
  * Fields:
    * `compName` (`String`, required, if no `compGroup` or `compList`): the name assigned to the component, in the mappings assigned to the interReaction instance.
    * `compId` (`String`, optional): a unique ID, assigned to the the component instance, when only one instance of a component should receive props.
    * `compGroup` (`String`, required, if no `compName` or `compList`): when component instances associated to the same group should receive propps.
    * `compList` (`Array<Object>`, required, if no `compName` or `compGroup`): if more than one React component instance, by more than one `compName` and / or `compGroup`, should receive props.
    * `compProps` (`Object<String,?>`, required (returns without error, if absent)): contains key : value pairs, to be passed as props, to the React component instance.
  * See: [Common Contract](#common-contract:), above, for more information, about details object fields.

__Returns:__  
undefined

__Examples:__
```Javascript
// WITH compName AND compId:
interReaction.update({
  // REQUIRED:
  compName: 'SomeCompName',

  // OPTIONAL:
  compId: 'someCompID',

  // REQUIRED (returns without error, if absent):
  compProps: {
      somePropsKey: 'some props value'
    }
});

// WITH compGroup:
interReaction.update({
  // REQUIRED:
  compGroup: 'someCompGroupName',

  // REQUIRED (returns without error, if absent):
  compProps: {
      somePropsKey: 'some props value'
    }
});

// WITH compList:
interReaction.update({
  compList: [
    {
      compName: 'SomeCompName',
      compProps: {
          somePropsKey: 'some props value'
        }
    },
    {
      compGroup: 'someCompGroupName',
      compProps: {
          somePropsKey: 'some props value'
        }
    },
    {
      // REQUIRED:
      compName: 'SomeOtherComp',
    
      // OPTIONAL:
      compId: 'someOtherCompID',

      // REQUIRED (returns without error, if absent):
      compProps: {
          somePropsKey: 'some props value'
        }
    }
  ]
});
```

## Advanced Topics

#### Building From Source
There are separate builds, for interReaction (React) and interPreaction (Preact).

To begin, clone the github repository:
```shell
$ git clone https://github.com/antonio-malcolm/interreaction.git
```

As of the latest update to this README, this project uses the following versions, of NodeJS, npm, and pnpm:

NodeJS: v14.17.1  
npm: v6.14.13  
pnpm: v6.9.1

To ensure you are using the current, correct versions, refer to the engines block, in [package.json](package.json) 
The author of this project uses [nvm](https://github.com/nvm-sh/nvm), to install and switch between NodeJS and npm versions, and doing so is highly recommended.

This project uses pnpm, to manage dependencies and workspaces, and it is also used to execute tasks, within the task management modules.  
To install pnpm (current project version):
```shell
$ npm install -g pnpm@6.9.1
```

After installing pnpm, install the project dependencies:
```shell
$ pnpm install
```

There are separate builds, for interReaction (React) and interPreaction (Preact).  
After successful installation of the project dependencies, you may build any one or all of the development, production, or release builds.
Each build is isolated, under directory: workspaces/interreaction/build/dist/[dev, prod, release].

interReaction (React) dev build:  
```shell
$ pnpm run build:interreaction:dev
```

interReaction (React) prod build:  
```shell
$ pnpm run build:interreaction:prod
```

interReaction (React) release build:  
```shell
$ pnpm run build:interreaction:release
```

interPreaction (Preact) dev build:  
```shell
$ pnpm run build:interpreaction:dev
```

interPreaction (Preact) prod build:  
```shell
$ pnpm run build:interpreaction:prod
```

interPreaction (Preact) release build:  
```shell
$ pnpm run build:interpreaction:release
```

#### Running Tests
To run all tests (unit + integration tests):
```shell
$ pnpm run test:interreaction
```

Aside from test console output, test reports are generated, for both results and coverage, which are accessible from your web browser.  
After tests have been run, start the projects built-in server, and navigate to the following local URLs, in your web browser:
To clean the interreaction build directory:
```shell
$ pnpm run start
```

[http://localhost:3001/test/report/interreaction/mochawesome/Test_Report_interreaction.html](http://localhost:3001/test/report/interreaction/mochawesome/Test_Report_interreaction.html)  
[http://localhost:3001/test/report/interreaction/nyc/index.html](http://localhost:3001/test/report/interreaction/nyc/index.html)

#### Smoke Testing
There are separate smoke tests, for interReaction (React) and interPreaction (Preact).  
Smoke testing can be done, one at a time, for either the React or Preact builds.

This project comes with React components, Redux state, and REST utilities which are used to test interReaction in a real-world scenario.  
To begin the test, build the release package (used as a smoke test dependency), and start the project's built-in server.  

interReaction (React) smoke test:
```shell
$ pnpm run build:interreaction:release
$ pnpm run start:interreaction
```

interPreaction (Preact) smoke test:
```shell
$ pnpm run build:interpreaction:release
$ pnpm run start:interpreaction
```

After successful build and server start, navigate to the following local URL, using your web browser:  
[http://localhost:3001/mmry/interreaction-test.html](http://localhost:3001/mmry/interreaction-test.html)

If the build and server start were successful, you should see the following test page:
!["Smoke Test Result"](readme-asset/interreaction_smoke-test_visual_result.png)

#### Cleanup
There are several options, for performing project cleanup.

To clean all workspace dependency, build, and test output directories:
```shell
$ pnpm run clean
```

To clean the interReaction (React) dependency, build, and test output directories:
```shell
$ pnpm run clean:interreaction
```

To clean the interReaction (React) dependency directory:
```shell
$ pnpm run clean:interreaction:dependency
```

To clean the interReaction (React) build directory:
```shell
$ pnpm run clean:interreaction:build
```

To clean the interPreaction (Preact) dependency, build, and test output directories:
```shell
$ pnpm run clean:interpreaction
```

To clean the interPreaction (Preact) dependency directory:
```shell
$ pnpm run clean:interpreaction:dependency
```

To clean the interPreaction (Preact) build directory:
```shell
$ pnpm run clean:interpreaction:build
```

To clean the test output directory:
```shell
$ pnpm run clean:test
```

#### Project Structure
There are workspace entries for both interReaction (React) and interPreaction (Preact).  
Below is a general overview of the project structure, i.e., "where to find the relevant things".

interReaction (React) source code:  
[workspaces/interreaction/src/interreaction/](workspaces/interreaction/src/interreaction/)

interReaction (React) build output (after build, you will find child directories dist/[dev, prod, release]):  
[workspaces/interreaction/build/](workspaces/interreaction/build/)

interReaction (React) test modules:
[test/spec/interreaction/]([test/spec/interreaction/])

interPreaction (Preact) source code:  
[workspaces/interpreaction/src/interreaction/](workspaces/interpreaction/src/interreaction/)

interPreaction (Preact) build output (after build, you will find child directories dist/[dev, prod, release]):  
[workspaces/interpreaction/build/](workspaces/interpreaction/build/)

Test output (genrated after running tests)
`test/output/`

## Author And License Info
interReaction is authored by, and copyright 2021 to present, Antonio Malcolm.  
All rights reserved.

interReaction (A.K.A., "interReaction", "InterReaction", "interpreaction", "interPreaction", or "InterPreaction")
 is licensed under the BSD 3-Clause license,
 and is subject to the terms of the BSD 3-Clause license,
 found in the LICENSE file, in the root directory of this project.
 If a copy of the BSD 3-Clause license cannot be found,
 as part of this project, you can obtain one, at:
 [https://opensource.org/licenses/BSD-3-Clause](https://opensource.org/licenses/BSD-3-Clause)

## Support This Project
This software is built with the greatest care and attention to detail, and thoroughly tested.  
Any support is greatly appreciated!

[!["Donate: Buy Me A Coffee"](https://img.shields.io/badge/Donate-Buy%20Me%20A%20Coffee-a1644c?style=for-the-badge&logo=buymeacoffee)](https://buymeacoffee.com/antoniomalcolm)
 [!["Donate: LiberaPay"](https://img.shields.io/badge/Donate-LiberaPay-f6c915?style=for-the-badge&logo=liberapay)](https://www.buymeacoffee.com/antoniomalcolm)
 [!["Donate: PayPal"](https://img.shields.io/badge/Donate-PayPal-0070ba?style=for-the-badge&logo=paypal)](https://paypal.me/antoniomalcolm)
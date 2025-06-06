'use strict';

var React = require('react');

const designTokens = {
    colors: {
        // Dark tones
        dark: {
            100: '#434f64',
            50: '#5f697b',
            25: '#838c9d',
        },
        // Neutrals
        border: '#ced1d7',
        divider: '#f0f1f7',
        background: '#f8f8f9',
        white: '#ffffff',
        // Status colors
        critical: {
            default: '#ff3533',
            dark: '#b80100',
            light: '#ffeaea',
        },
        warning: {
            default: '#ff6c19',
            dark: '#dd6a00',
            light: '#ffebdc',
        },
        positive: {
            default: '#00c638',
            dark: '#00763d',
            light: '#dfffe8',
        },
        neutral: {
            default: '#1890ff',
            dark: '#006ed3',
            light: '#ecf6ff',
        },
    },
    typography: {
        fontFamily: {
            primary: 'Inter',
            secondary: 'Inter',
        },
        fontWeight: {
            regular: '400',
            medium: '500',
            semibold: '600',
        },
        fontSize: {
            // Desktop (>1440px)
            desktop: {
                sm: '14px',
                md: '16px',
                lg: '20px',
                xl: '24px',
                xxl: '28px',
            },
            // Tablet (1440-800px)
            tablet: {
                sm: '12px',
                md: '14px',
                lg: '18px',
                xl: '21px',
                xxl: '26px',
            },
        },
    },
    spacing: {
        // Desktop spacing (>1440px)
        desktop: {
            x0: '0px',
            x1: '4px',
            x2: '8px',
            x3: '12px',
            x4: '16px',
            x5: '20px',
            x6: '24px',
            x7: '28px',
            x8: '32px',
            x9: '36px',
            x10: '40px',
            x11: '44px',
            x12: '48px',
            x13: '52px',
            x14: '56px',
            x15: '60px',
            x16: '64px',
        },
        // Tablet spacing (1440-800px)
        tablet: {
            x0: '0px',
            x1: '0px',
            x2: '4px',
            x3: '8px',
            x4: '12px',
            x5: '16px',
            x6: '20px',
            x7: '24px',
            x8: '28px',
            x9: '32px',
            x10: '36px',
            x11: '40px',
            x12: '44px',
            x13: '48px',
            x14: '52px',
            x15: '56px',
            x16: '60px',
        },
        // Card dimensions
        card: {
            padding: {
                none: '0px',
                default: '20px',
                tablet: '16px',
            },
            border: {
                none: '0px',
                default: '1px',
            },
        },
    },
    borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '100px',
    },
    breakpoints: {
        desktop: {
            margins: '20px',
            gutters: '20px',
        },
        tablet: {
            margins: '16px',
            gutters: '16px',
        },
    },
};
// CSS Custom Properties for global usage
const cssVariables = `
  :root {
    /* Colors */
    --color-dark-100: ${designTokens.colors.dark[100]};
    --color-dark-50: ${designTokens.colors.dark[50]};
    --color-dark-25: ${designTokens.colors.dark[25]};
    --color-border: ${designTokens.colors.border};
    --color-divider: ${designTokens.colors.divider};
    --color-background: ${designTokens.colors.background};
    --color-white: ${designTokens.colors.white};
    
    --color-critical: ${designTokens.colors.critical.default};
    --color-critical-dark: ${designTokens.colors.critical.dark};
    --color-critical-light: ${designTokens.colors.critical.light};
    
    --color-warning: ${designTokens.colors.warning.default};
    --color-warning-dark: ${designTokens.colors.warning.dark};
    --color-warning-light: ${designTokens.colors.warning.light};
    
    --color-positive: ${designTokens.colors.positive.default};
    --color-positive-dark: ${designTokens.colors.positive.dark};
    --color-positive-light: ${designTokens.colors.positive.light};
    
    --color-neutral: ${designTokens.colors.neutral.default};
    --color-neutral-dark: ${designTokens.colors.neutral.dark};
    --color-neutral-light: ${designTokens.colors.neutral.light};
    
    /* Typography */
    --font-family-primary: ${designTokens.typography.fontFamily.primary};
    --font-weight-regular: ${designTokens.typography.fontWeight.regular};
    --font-weight-medium: ${designTokens.typography.fontWeight.medium};
    --font-weight-semibold: ${designTokens.typography.fontWeight.semibold};
    
    /* Border Radius */
    --radius-none: ${designTokens.borderRadius.none};
    --radius-sm: ${designTokens.borderRadius.sm};
    --radius-md: ${designTokens.borderRadius.md};
    --radius-lg: ${designTokens.borderRadius.lg};
    --radius-full: ${designTokens.borderRadius.full};
    
    /* Spacing Desktop */
    --spacing-x0: ${designTokens.spacing.desktop.x0};
    --spacing-x1: ${designTokens.spacing.desktop.x1};
    --spacing-x2: ${designTokens.spacing.desktop.x2};
    --spacing-x3: ${designTokens.spacing.desktop.x3};
    --spacing-x4: ${designTokens.spacing.desktop.x4};
    --spacing-x5: ${designTokens.spacing.desktop.x5};
    --spacing-x6: ${designTokens.spacing.desktop.x6};
    --spacing-x7: ${designTokens.spacing.desktop.x7};
    --spacing-x8: ${designTokens.spacing.desktop.x8};
    --spacing-x9: ${designTokens.spacing.desktop.x9};
    --spacing-x10: ${designTokens.spacing.desktop.x10};
    --spacing-x11: ${designTokens.spacing.desktop.x11};
    --spacing-x12: ${designTokens.spacing.desktop.x12};
    --spacing-x13: ${designTokens.spacing.desktop.x13};
    --spacing-x14: ${designTokens.spacing.desktop.x14};
    --spacing-x15: ${designTokens.spacing.desktop.x15};
    --spacing-x16: ${designTokens.spacing.desktop.x16};
    
    /* Font Sizes Desktop */
    --font-size-sm: ${designTokens.typography.fontSize.desktop.sm};
    --font-size-md: ${designTokens.typography.fontSize.desktop.md};
    --font-size-lg: ${designTokens.typography.fontSize.desktop.lg};
    --font-size-xl: ${designTokens.typography.fontSize.desktop.xl};
    --font-size-xxl: ${designTokens.typography.fontSize.desktop.xxl};
  }
  
  /* Tablet breakpoint */
  @media (max-width: 1440px) {
    :root {
      /* Spacing Tablet */
      --spacing-x1: ${designTokens.spacing.tablet.x1};
      --spacing-x2: ${designTokens.spacing.tablet.x2};
      --spacing-x3: ${designTokens.spacing.tablet.x3};
      --spacing-x4: ${designTokens.spacing.tablet.x4};
      --spacing-x5: ${designTokens.spacing.tablet.x5};
      --spacing-x6: ${designTokens.spacing.tablet.x6};
      --spacing-x7: ${designTokens.spacing.tablet.x7};
      --spacing-x8: ${designTokens.spacing.tablet.x8};
      --spacing-x9: ${designTokens.spacing.tablet.x9};
      --spacing-x10: ${designTokens.spacing.tablet.x10};
      --spacing-x11: ${designTokens.spacing.tablet.x11};
      --spacing-x12: ${designTokens.spacing.tablet.x12};
      --spacing-x13: ${designTokens.spacing.tablet.x13};
      --spacing-x14: ${designTokens.spacing.tablet.x14};
      --spacing-x15: ${designTokens.spacing.tablet.x15};
      --spacing-x16: ${designTokens.spacing.tablet.x16};
      
      /* Font Sizes Tablet */
      --font-size-sm: ${designTokens.typography.fontSize.tablet.sm};
      --font-size-md: ${designTokens.typography.fontSize.tablet.md};
      --font-size-lg: ${designTokens.typography.fontSize.tablet.lg};
      --font-size-xl: ${designTokens.typography.fontSize.tablet.xl};
      --font-size-xxl: ${designTokens.typography.fontSize.tablet.xxl};
    }
  }
`;

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_production_min;

function requireReactJsxRuntime_production_min () {
	if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
	hasRequiredReactJsxRuntime_production_min = 1;
var f=React,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
	function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;
	return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var hasRequiredReactJsxRuntime_development;

function requireReactJsxRuntime_development () {
	if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
	hasRequiredReactJsxRuntime_development = 1;

	if (process.env.NODE_ENV !== "production") {
	  (function() {

	var React$1 = React;

	// ATTENTION
	// When adding new symbols to this file,
	// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
	// The Symbol used to tag the ReactElement-like types.
	var REACT_ELEMENT_TYPE = Symbol.for('react.element');
	var REACT_PORTAL_TYPE = Symbol.for('react.portal');
	var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
	var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
	var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
	var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
	var REACT_CONTEXT_TYPE = Symbol.for('react.context');
	var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
	var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
	var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
	var REACT_MEMO_TYPE = Symbol.for('react.memo');
	var REACT_LAZY_TYPE = Symbol.for('react.lazy');
	var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';
	function getIteratorFn(maybeIterable) {
	  if (maybeIterable === null || typeof maybeIterable !== 'object') {
	    return null;
	  }

	  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

	  if (typeof maybeIterator === 'function') {
	    return maybeIterator;
	  }

	  return null;
	}

	var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

	function error(format) {
	  {
	    {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      printWarning('error', format, args);
	    }
	  }
	}

	function printWarning(level, format, args) {
	  // When changing this logic, you might want to also
	  // update consoleWithStackDev.www.js as well.
	  {
	    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
	    var stack = ReactDebugCurrentFrame.getStackAddendum();

	    if (stack !== '') {
	      format += '%s';
	      args = args.concat([stack]);
	    } // eslint-disable-next-line react-internal/safe-string-coercion


	    var argsWithFormat = args.map(function (item) {
	      return String(item);
	    }); // Careful: RN currently depends on this prefix

	    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
	    // breaks IE9: https://github.com/facebook/react/issues/13610
	    // eslint-disable-next-line react-internal/no-production-logging

	    Function.prototype.apply.call(console[level], console, argsWithFormat);
	  }
	}

	// -----------------------------------------------------------------------------

	var enableScopeAPI = false; // Experimental Create Event Handle API.
	var enableCacheElement = false;
	var enableTransitionTracing = false; // No known bugs, but needs performance testing

	var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
	// stuff. Intended to enable React core members to more easily debug scheduling
	// issues in DEV builds.

	var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

	var REACT_MODULE_REFERENCE;

	{
	  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
	}

	function isValidElementType(type) {
	  if (typeof type === 'string' || typeof type === 'function') {
	    return true;
	  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


	  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
	    return true;
	  }

	  if (typeof type === 'object' && type !== null) {
	    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
	    // types supported by any Flight configuration anywhere since
	    // we don't know which Flight build this will end up being used
	    // with.
	    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
	      return true;
	    }
	  }

	  return false;
	}

	function getWrappedName(outerType, innerType, wrapperName) {
	  var displayName = outerType.displayName;

	  if (displayName) {
	    return displayName;
	  }

	  var functionName = innerType.displayName || innerType.name || '';
	  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
	} // Keep in sync with react-reconciler/getComponentNameFromFiber


	function getContextName(type) {
	  return type.displayName || 'Context';
	} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


	function getComponentNameFromType(type) {
	  if (type == null) {
	    // Host root, text node or just invalid type.
	    return null;
	  }

	  {
	    if (typeof type.tag === 'number') {
	      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
	    }
	  }

	  if (typeof type === 'function') {
	    return type.displayName || type.name || null;
	  }

	  if (typeof type === 'string') {
	    return type;
	  }

	  switch (type) {
	    case REACT_FRAGMENT_TYPE:
	      return 'Fragment';

	    case REACT_PORTAL_TYPE:
	      return 'Portal';

	    case REACT_PROFILER_TYPE:
	      return 'Profiler';

	    case REACT_STRICT_MODE_TYPE:
	      return 'StrictMode';

	    case REACT_SUSPENSE_TYPE:
	      return 'Suspense';

	    case REACT_SUSPENSE_LIST_TYPE:
	      return 'SuspenseList';

	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_CONTEXT_TYPE:
	        var context = type;
	        return getContextName(context) + '.Consumer';

	      case REACT_PROVIDER_TYPE:
	        var provider = type;
	        return getContextName(provider._context) + '.Provider';

	      case REACT_FORWARD_REF_TYPE:
	        return getWrappedName(type, type.render, 'ForwardRef');

	      case REACT_MEMO_TYPE:
	        var outerName = type.displayName || null;

	        if (outerName !== null) {
	          return outerName;
	        }

	        return getComponentNameFromType(type.type) || 'Memo';

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            return getComponentNameFromType(init(payload));
	          } catch (x) {
	            return null;
	          }
	        }

	      // eslint-disable-next-line no-fallthrough
	    }
	  }

	  return null;
	}

	var assign = Object.assign;

	// Helpers to patch console.logs to avoid logging during side-effect free
	// replaying on render function. This currently only patches the object
	// lazily which won't cover if the log function was extracted eagerly.
	// We could also eagerly patch the method.
	var disabledDepth = 0;
	var prevLog;
	var prevInfo;
	var prevWarn;
	var prevError;
	var prevGroup;
	var prevGroupCollapsed;
	var prevGroupEnd;

	function disabledLog() {}

	disabledLog.__reactDisabledLog = true;
	function disableLogs() {
	  {
	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      prevLog = console.log;
	      prevInfo = console.info;
	      prevWarn = console.warn;
	      prevError = console.error;
	      prevGroup = console.group;
	      prevGroupCollapsed = console.groupCollapsed;
	      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

	      var props = {
	        configurable: true,
	        enumerable: true,
	        value: disabledLog,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        info: props,
	        log: props,
	        warn: props,
	        error: props,
	        group: props,
	        groupCollapsed: props,
	        groupEnd: props
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    disabledDepth++;
	  }
	}
	function reenableLogs() {
	  {
	    disabledDepth--;

	    if (disabledDepth === 0) {
	      /* eslint-disable react-internal/no-production-logging */
	      var props = {
	        configurable: true,
	        enumerable: true,
	        writable: true
	      }; // $FlowFixMe Flow thinks console is immutable.

	      Object.defineProperties(console, {
	        log: assign({}, props, {
	          value: prevLog
	        }),
	        info: assign({}, props, {
	          value: prevInfo
	        }),
	        warn: assign({}, props, {
	          value: prevWarn
	        }),
	        error: assign({}, props, {
	          value: prevError
	        }),
	        group: assign({}, props, {
	          value: prevGroup
	        }),
	        groupCollapsed: assign({}, props, {
	          value: prevGroupCollapsed
	        }),
	        groupEnd: assign({}, props, {
	          value: prevGroupEnd
	        })
	      });
	      /* eslint-enable react-internal/no-production-logging */
	    }

	    if (disabledDepth < 0) {
	      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
	    }
	  }
	}

	var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
	var prefix;
	function describeBuiltInComponentFrame(name, source, ownerFn) {
	  {
	    if (prefix === undefined) {
	      // Extract the VM specific prefix used by each line.
	      try {
	        throw Error();
	      } catch (x) {
	        var match = x.stack.trim().match(/\n( *(at )?)/);
	        prefix = match && match[1] || '';
	      }
	    } // We use the prefix to ensure our stacks line up with native stack frames.


	    return '\n' + prefix + name;
	  }
	}
	var reentry = false;
	var componentFrameCache;

	{
	  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
	  componentFrameCache = new PossiblyWeakMap();
	}

	function describeNativeComponentFrame(fn, construct) {
	  // If something asked for a stack inside a fake render, it should get ignored.
	  if ( !fn || reentry) {
	    return '';
	  }

	  {
	    var frame = componentFrameCache.get(fn);

	    if (frame !== undefined) {
	      return frame;
	    }
	  }

	  var control;
	  reentry = true;
	  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

	  Error.prepareStackTrace = undefined;
	  var previousDispatcher;

	  {
	    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
	    // for warnings.

	    ReactCurrentDispatcher.current = null;
	    disableLogs();
	  }

	  try {
	    // This should throw.
	    if (construct) {
	      // Something should be setting the props in the constructor.
	      var Fake = function () {
	        throw Error();
	      }; // $FlowFixMe


	      Object.defineProperty(Fake.prototype, 'props', {
	        set: function () {
	          // We use a throwing setter instead of frozen or non-writable props
	          // because that won't throw in a non-strict mode function.
	          throw Error();
	        }
	      });

	      if (typeof Reflect === 'object' && Reflect.construct) {
	        // We construct a different control for this case to include any extra
	        // frames added by the construct call.
	        try {
	          Reflect.construct(Fake, []);
	        } catch (x) {
	          control = x;
	        }

	        Reflect.construct(fn, [], Fake);
	      } else {
	        try {
	          Fake.call();
	        } catch (x) {
	          control = x;
	        }

	        fn.call(Fake.prototype);
	      }
	    } else {
	      try {
	        throw Error();
	      } catch (x) {
	        control = x;
	      }

	      fn();
	    }
	  } catch (sample) {
	    // This is inlined manually because closure doesn't do it for us.
	    if (sample && control && typeof sample.stack === 'string') {
	      // This extracts the first frame from the sample that isn't also in the control.
	      // Skipping one frame that we assume is the frame that calls the two.
	      var sampleLines = sample.stack.split('\n');
	      var controlLines = control.stack.split('\n');
	      var s = sampleLines.length - 1;
	      var c = controlLines.length - 1;

	      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
	        // We expect at least one stack frame to be shared.
	        // Typically this will be the root most one. However, stack frames may be
	        // cut off due to maximum stack limits. In this case, one maybe cut off
	        // earlier than the other. We assume that the sample is longer or the same
	        // and there for cut off earlier. So we should find the root most frame in
	        // the sample somewhere in the control.
	        c--;
	      }

	      for (; s >= 1 && c >= 0; s--, c--) {
	        // Next we find the first one that isn't the same which should be the
	        // frame that called our sample function and the control.
	        if (sampleLines[s] !== controlLines[c]) {
	          // In V8, the first line is describing the message but other VMs don't.
	          // If we're about to return the first line, and the control is also on the same
	          // line, that's a pretty good indicator that our sample threw at same line as
	          // the control. I.e. before we entered the sample frame. So we ignore this result.
	          // This can happen if you passed a class to function component, or non-function.
	          if (s !== 1 || c !== 1) {
	            do {
	              s--;
	              c--; // We may still have similar intermediate frames from the construct call.
	              // The next one that isn't the same should be our match though.

	              if (c < 0 || sampleLines[s] !== controlLines[c]) {
	                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
	                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
	                // but we have a user-provided "displayName"
	                // splice it in to make the stack more readable.


	                if (fn.displayName && _frame.includes('<anonymous>')) {
	                  _frame = _frame.replace('<anonymous>', fn.displayName);
	                }

	                {
	                  if (typeof fn === 'function') {
	                    componentFrameCache.set(fn, _frame);
	                  }
	                } // Return the line we found.


	                return _frame;
	              }
	            } while (s >= 1 && c >= 0);
	          }

	          break;
	        }
	      }
	    }
	  } finally {
	    reentry = false;

	    {
	      ReactCurrentDispatcher.current = previousDispatcher;
	      reenableLogs();
	    }

	    Error.prepareStackTrace = previousPrepareStackTrace;
	  } // Fallback to just using the name if we couldn't make it throw.


	  var name = fn ? fn.displayName || fn.name : '';
	  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

	  {
	    if (typeof fn === 'function') {
	      componentFrameCache.set(fn, syntheticFrame);
	    }
	  }

	  return syntheticFrame;
	}
	function describeFunctionComponentFrame(fn, source, ownerFn) {
	  {
	    return describeNativeComponentFrame(fn, false);
	  }
	}

	function shouldConstruct(Component) {
	  var prototype = Component.prototype;
	  return !!(prototype && prototype.isReactComponent);
	}

	function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

	  if (type == null) {
	    return '';
	  }

	  if (typeof type === 'function') {
	    {
	      return describeNativeComponentFrame(type, shouldConstruct(type));
	    }
	  }

	  if (typeof type === 'string') {
	    return describeBuiltInComponentFrame(type);
	  }

	  switch (type) {
	    case REACT_SUSPENSE_TYPE:
	      return describeBuiltInComponentFrame('Suspense');

	    case REACT_SUSPENSE_LIST_TYPE:
	      return describeBuiltInComponentFrame('SuspenseList');
	  }

	  if (typeof type === 'object') {
	    switch (type.$$typeof) {
	      case REACT_FORWARD_REF_TYPE:
	        return describeFunctionComponentFrame(type.render);

	      case REACT_MEMO_TYPE:
	        // Memo may contain any component type so we recursively resolve it.
	        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

	      case REACT_LAZY_TYPE:
	        {
	          var lazyComponent = type;
	          var payload = lazyComponent._payload;
	          var init = lazyComponent._init;

	          try {
	            // Lazy may contain any component type so we recursively resolve it.
	            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
	          } catch (x) {}
	        }
	    }
	  }

	  return '';
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var loggedTypeFailures = {};
	var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame.setExtraStackFrame(null);
	    }
	  }
	}

	function checkPropTypes(typeSpecs, values, location, componentName, element) {
	  {
	    // $FlowFixMe This is okay but Flow doesn't know it.
	    var has = Function.call.bind(hasOwnProperty);

	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.

	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            // eslint-disable-next-line react-internal/prod-error-codes
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }

	          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
	        } catch (ex) {
	          error$1 = ex;
	        }

	        if (error$1 && !(error$1 instanceof Error)) {
	          setCurrentlyValidatingElement(element);

	          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

	          setCurrentlyValidatingElement(null);
	        }

	        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error$1.message] = true;
	          setCurrentlyValidatingElement(element);

	          error('Failed %s type: %s', location, error$1.message);

	          setCurrentlyValidatingElement(null);
	        }
	      }
	    }
	  }
	}

	var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

	function isArray(a) {
	  return isArrayImpl(a);
	}

	/*
	 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
	 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
	 *
	 * The functions in this module will throw an easier-to-understand,
	 * easier-to-debug exception with a clear errors message message explaining the
	 * problem. (Instead of a confusing exception thrown inside the implementation
	 * of the `value` object).
	 */
	// $FlowFixMe only called in DEV, so void return is not possible.
	function typeName(value) {
	  {
	    // toStringTag is needed for namespaced types like Temporal.Instant
	    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
	    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
	    return type;
	  }
	} // $FlowFixMe only called in DEV, so void return is not possible.


	function willCoercionThrow(value) {
	  {
	    try {
	      testStringCoercion(value);
	      return false;
	    } catch (e) {
	      return true;
	    }
	  }
	}

	function testStringCoercion(value) {
	  // If you ended up here by following an exception call stack, here's what's
	  // happened: you supplied an object or symbol value to React (as a prop, key,
	  // DOM attribute, CSS property, string ref, etc.) and when React tried to
	  // coerce it to a string using `'' + value`, an exception was thrown.
	  //
	  // The most common types that will cause this exception are `Symbol` instances
	  // and Temporal objects like `Temporal.Instant`. But any object that has a
	  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
	  // exception. (Library authors do this to prevent users from using built-in
	  // numeric operators like `+` or comparison operators like `>=` because custom
	  // methods are needed to perform accurate arithmetic or comparison.)
	  //
	  // To fix the problem, coerce this object or symbol value to a string before
	  // passing it to React. The most reliable way is usually `String(value)`.
	  //
	  // To find which value is throwing, check the browser or debugger console.
	  // Before this exception was thrown, there should be `console.error` output
	  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
	  // problem and how that type was used: key, atrribute, input value prop, etc.
	  // In most cases, this console output also shows the component and its
	  // ancestor components where the exception happened.
	  //
	  // eslint-disable-next-line react-internal/safe-string-coercion
	  return '' + value;
	}
	function checkKeyStringCoercion(value) {
	  {
	    if (willCoercionThrow(value)) {
	      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

	      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
	    }
	  }
	}

	var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
	var RESERVED_PROPS = {
	  key: true,
	  ref: true,
	  __self: true,
	  __source: true
	};
	var specialPropKeyWarningShown;
	var specialPropRefWarningShown;
	var didWarnAboutStringRefs;

	{
	  didWarnAboutStringRefs = {};
	}

	function hasValidRef(config) {
	  {
	    if (hasOwnProperty.call(config, 'ref')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.ref !== undefined;
	}

	function hasValidKey(config) {
	  {
	    if (hasOwnProperty.call(config, 'key')) {
	      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

	      if (getter && getter.isReactWarning) {
	        return false;
	      }
	    }
	  }

	  return config.key !== undefined;
	}

	function warnIfStringRefCannotBeAutoConverted(config, self) {
	  {
	    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
	      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

	      if (!didWarnAboutStringRefs[componentName]) {
	        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

	        didWarnAboutStringRefs[componentName] = true;
	      }
	    }
	  }
	}

	function defineKeyPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingKey = function () {
	      if (!specialPropKeyWarningShown) {
	        specialPropKeyWarningShown = true;

	        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingKey.isReactWarning = true;
	    Object.defineProperty(props, 'key', {
	      get: warnAboutAccessingKey,
	      configurable: true
	    });
	  }
	}

	function defineRefPropWarningGetter(props, displayName) {
	  {
	    var warnAboutAccessingRef = function () {
	      if (!specialPropRefWarningShown) {
	        specialPropRefWarningShown = true;

	        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
	      }
	    };

	    warnAboutAccessingRef.isReactWarning = true;
	    Object.defineProperty(props, 'ref', {
	      get: warnAboutAccessingRef,
	      configurable: true
	    });
	  }
	}
	/**
	 * Factory method to create a new React element. This no longer adheres to
	 * the class pattern, so do not use new to call it. Also, instanceof check
	 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
	 * if something is a React Element.
	 *
	 * @param {*} type
	 * @param {*} props
	 * @param {*} key
	 * @param {string|object} ref
	 * @param {*} owner
	 * @param {*} self A *temporary* helper to detect places where `this` is
	 * different from the `owner` when React.createElement is called, so that we
	 * can warn. We want to get rid of owner and replace string `ref`s with arrow
	 * functions, and as long as `this` and owner are the same, there will be no
	 * change in behavior.
	 * @param {*} source An annotation object (added by a transpiler or otherwise)
	 * indicating filename, line number, and/or other information.
	 * @internal
	 */


	var ReactElement = function (type, key, ref, self, source, owner, props) {
	  var element = {
	    // This tag allows us to uniquely identify this as a React Element
	    $$typeof: REACT_ELEMENT_TYPE,
	    // Built-in properties that belong on the element
	    type: type,
	    key: key,
	    ref: ref,
	    props: props,
	    // Record the component responsible for creating this element.
	    _owner: owner
	  };

	  {
	    // The validation flag is currently mutative. We put it on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.

	    Object.defineProperty(element._store, 'validated', {
	      configurable: false,
	      enumerable: false,
	      writable: true,
	      value: false
	    }); // self and source are DEV only properties.

	    Object.defineProperty(element, '_self', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: self
	    }); // Two elements created in two different places should be considered
	    // equal for testing purposes and therefore we hide it from enumeration.

	    Object.defineProperty(element, '_source', {
	      configurable: false,
	      enumerable: false,
	      writable: false,
	      value: source
	    });

	    if (Object.freeze) {
	      Object.freeze(element.props);
	      Object.freeze(element);
	    }
	  }

	  return element;
	};
	/**
	 * https://github.com/reactjs/rfcs/pull/107
	 * @param {*} type
	 * @param {object} props
	 * @param {string} key
	 */

	function jsxDEV(type, config, maybeKey, source, self) {
	  {
	    var propName; // Reserved names are extracted

	    var props = {};
	    var key = null;
	    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
	    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
	    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
	    // but as an intermediary step, we will use jsxDEV for everything except
	    // <div {...props} key="Hi" />, because we aren't currently able to tell if
	    // key is explicitly declared to be undefined or not.

	    if (maybeKey !== undefined) {
	      {
	        checkKeyStringCoercion(maybeKey);
	      }

	      key = '' + maybeKey;
	    }

	    if (hasValidKey(config)) {
	      {
	        checkKeyStringCoercion(config.key);
	      }

	      key = '' + config.key;
	    }

	    if (hasValidRef(config)) {
	      ref = config.ref;
	      warnIfStringRefCannotBeAutoConverted(config, self);
	    } // Remaining properties are added to a new props object


	    for (propName in config) {
	      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    } // Resolve default props


	    if (type && type.defaultProps) {
	      var defaultProps = type.defaultProps;

	      for (propName in defaultProps) {
	        if (props[propName] === undefined) {
	          props[propName] = defaultProps[propName];
	        }
	      }
	    }

	    if (key || ref) {
	      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

	      if (key) {
	        defineKeyPropWarningGetter(props, displayName);
	      }

	      if (ref) {
	        defineRefPropWarningGetter(props, displayName);
	      }
	    }

	    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
	  }
	}

	var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
	var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

	function setCurrentlyValidatingElement$1(element) {
	  {
	    if (element) {
	      var owner = element._owner;
	      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
	      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
	    } else {
	      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
	    }
	  }
	}

	var propTypesMisspellWarningShown;

	{
	  propTypesMisspellWarningShown = false;
	}
	/**
	 * Verifies the object is a ReactElement.
	 * See https://reactjs.org/docs/react-api.html#isvalidelement
	 * @param {?object} object
	 * @return {boolean} True if `object` is a ReactElement.
	 * @final
	 */


	function isValidElement(object) {
	  {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  }
	}

	function getDeclarationErrorAddendum() {
	  {
	    if (ReactCurrentOwner$1.current) {
	      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

	      if (name) {
	        return '\n\nCheck the render method of `' + name + '`.';
	      }
	    }

	    return '';
	  }
	}

	function getSourceInfoErrorAddendum(source) {
	  {
	    if (source !== undefined) {
	      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
	      var lineNumber = source.lineNumber;
	      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
	    }

	    return '';
	  }
	}
	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */


	var ownerHasKeyUseWarning = {};

	function getCurrentComponentErrorInfo(parentType) {
	  {
	    var info = getDeclarationErrorAddendum();

	    if (!info) {
	      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

	      if (parentName) {
	        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
	      }
	    }

	    return info;
	  }
	}
	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it. Error statuses are cached so a warning
	 * will only be shown once.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */


	function validateExplicitKey(element, parentType) {
	  {
	    if (!element._store || element._store.validated || element.key != null) {
	      return;
	    }

	    element._store.validated = true;
	    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

	    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
	      return;
	    }

	    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
	    // property, it may be the creator of the child that's responsible for
	    // assigning it a key.

	    var childOwner = '';

	    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
	      // Give the component that originally created this child.
	      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
	    }

	    setCurrentlyValidatingElement$1(element);

	    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

	    setCurrentlyValidatingElement$1(null);
	  }
	}
	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */


	function validateChildKeys(node, parentType) {
	  {
	    if (typeof node !== 'object') {
	      return;
	    }

	    if (isArray(node)) {
	      for (var i = 0; i < node.length; i++) {
	        var child = node[i];

	        if (isValidElement(child)) {
	          validateExplicitKey(child, parentType);
	        }
	      }
	    } else if (isValidElement(node)) {
	      // This element was passed in a valid location.
	      if (node._store) {
	        node._store.validated = true;
	      }
	    } else if (node) {
	      var iteratorFn = getIteratorFn(node);

	      if (typeof iteratorFn === 'function') {
	        // Entry iterators used to provide implicit keys,
	        // but now we print a separate warning for them later.
	        if (iteratorFn !== node.entries) {
	          var iterator = iteratorFn.call(node);
	          var step;

	          while (!(step = iterator.next()).done) {
	            if (isValidElement(step.value)) {
	              validateExplicitKey(step.value, parentType);
	            }
	          }
	        }
	      }
	    }
	  }
	}
	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */


	function validatePropTypes(element) {
	  {
	    var type = element.type;

	    if (type === null || type === undefined || typeof type === 'string') {
	      return;
	    }

	    var propTypes;

	    if (typeof type === 'function') {
	      propTypes = type.propTypes;
	    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
	    // Inner props are checked in the reconciler.
	    type.$$typeof === REACT_MEMO_TYPE)) {
	      propTypes = type.propTypes;
	    } else {
	      return;
	    }

	    if (propTypes) {
	      // Intentionally inside to avoid triggering lazy initializers:
	      var name = getComponentNameFromType(type);
	      checkPropTypes(propTypes, element.props, 'prop', name, element);
	    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
	      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

	      var _name = getComponentNameFromType(type);

	      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
	    }

	    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
	      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
	    }
	  }
	}
	/**
	 * Given a fragment, validate that it can only be provided with fragment props
	 * @param {ReactElement} fragment
	 */


	function validateFragmentProps(fragment) {
	  {
	    var keys = Object.keys(fragment.props);

	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];

	      if (key !== 'children' && key !== 'key') {
	        setCurrentlyValidatingElement$1(fragment);

	        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

	        setCurrentlyValidatingElement$1(null);
	        break;
	      }
	    }

	    if (fragment.ref !== null) {
	      setCurrentlyValidatingElement$1(fragment);

	      error('Invalid attribute `ref` supplied to `React.Fragment`.');

	      setCurrentlyValidatingElement$1(null);
	    }
	  }
	}

	var didWarnAboutKeySpread = {};
	function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
	  {
	    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.

	    if (!validType) {
	      var info = '';

	      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
	        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
	      }

	      var sourceInfo = getSourceInfoErrorAddendum(source);

	      if (sourceInfo) {
	        info += sourceInfo;
	      } else {
	        info += getDeclarationErrorAddendum();
	      }

	      var typeString;

	      if (type === null) {
	        typeString = 'null';
	      } else if (isArray(type)) {
	        typeString = 'array';
	      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
	        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
	        info = ' Did you accidentally export a JSX literal instead of a component?';
	      } else {
	        typeString = typeof type;
	      }

	      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
	    }

	    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.

	    if (element == null) {
	      return element;
	    } // Skip key warning if the type isn't valid since our key validation logic
	    // doesn't expect a non-string/function type and can throw confusing errors.
	    // We don't want exception behavior to differ between dev and prod.
	    // (Rendering will throw with a helpful message and as soon as the type is
	    // fixed, the key warnings will appear.)


	    if (validType) {
	      var children = props.children;

	      if (children !== undefined) {
	        if (isStaticChildren) {
	          if (isArray(children)) {
	            for (var i = 0; i < children.length; i++) {
	              validateChildKeys(children[i], type);
	            }

	            if (Object.freeze) {
	              Object.freeze(children);
	            }
	          } else {
	            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
	          }
	        } else {
	          validateChildKeys(children, type);
	        }
	      }
	    }

	    {
	      if (hasOwnProperty.call(props, 'key')) {
	        var componentName = getComponentNameFromType(type);
	        var keys = Object.keys(props).filter(function (k) {
	          return k !== 'key';
	        });
	        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

	        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
	          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

	          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

	          didWarnAboutKeySpread[componentName + beforeExample] = true;
	        }
	      }
	    }

	    if (type === REACT_FRAGMENT_TYPE) {
	      validateFragmentProps(element);
	    } else {
	      validatePropTypes(element);
	    }

	    return element;
	  }
	} // These two functions exist to still get child warnings in dev
	// even with the prod transform. This means that jsxDEV is purely
	// opt-in behavior for better messages but that we won't stop
	// giving you warnings if you use production apis.

	function jsxWithValidationStatic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, true);
	  }
	}
	function jsxWithValidationDynamic(type, props, key) {
	  {
	    return jsxWithValidation(type, props, key, false);
	  }
	}

	var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
	// for now we can ship identical prod functions

	var jsxs =  jsxWithValidationStatic ;

	reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
	reactJsxRuntime_development.jsx = jsx;
	reactJsxRuntime_development.jsxs = jsxs;
	  })();
	}
	return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}

var jsxRuntimeExports = jsxRuntime.exports;

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    prefix
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;
const getPrefixedClassGroupEntries = (classGroupEntries, prefix) => {
  if (!prefix) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map(classDefinition => {
      if (typeof classDefinition === 'string') {
        return prefix + classDefinition;
      }
      if (typeof classDefinition === 'object') {
        return Object.fromEntries(Object.entries(classDefinition).map(([key, value]) => [prefix + key, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
};

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const createParseClassName = config => {
  const {
    separator,
    experimentalParseClassName
  } = config;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  // parseClassName inspired by https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
  const parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index, index + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + separatorLength;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (experimentalParseClassName) {
    return className => experimentalParseClassName({
      className,
      parseClassName
    });
  }
  return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const sortModifiers = modifiers => {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach(modifier => {
    const isArbitraryVariant = modifier[0] === '[';
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
const fractionRegex = /^\d+\/\d+$/;
const stringLengths = /*#__PURE__*/new Set(['px', 'full', 'screen']);
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isLength = value => isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, 'length', isLengthOnly);
const isNumber = value => Boolean(value) && !Number.isNaN(Number(value));
const isArbitraryNumber = value => getIsArbitraryValue(value, 'number', isNumber);
const isInteger = value => Boolean(value) && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isTshirtSize = value => tshirtUnitRegex.test(value);
const sizeLabels = /*#__PURE__*/new Set(['length', 'size', 'percentage']);
const isArbitrarySize = value => getIsArbitraryValue(value, sizeLabels, isNever);
const isArbitraryPosition = value => getIsArbitraryValue(value, 'position', isNever);
const imageLabels = /*#__PURE__*/new Set(['image', 'url']);
const isArbitraryImage = value => getIsArbitraryValue(value, imageLabels, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, '', isShadow);
const isAny = () => true;
const getIsArbitraryValue = (value, label, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === 'string' ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const getDefaultConfig = () => {
  const colors = fromTheme('colors');
  const spacing = fromTheme('spacing');
  const blur = fromTheme('blur');
  const brightness = fromTheme('brightness');
  const borderColor = fromTheme('borderColor');
  const borderRadius = fromTheme('borderRadius');
  const borderSpacing = fromTheme('borderSpacing');
  const borderWidth = fromTheme('borderWidth');
  const contrast = fromTheme('contrast');
  const grayscale = fromTheme('grayscale');
  const hueRotate = fromTheme('hueRotate');
  const invert = fromTheme('invert');
  const gap = fromTheme('gap');
  const gradientColorStops = fromTheme('gradientColorStops');
  const gradientColorStopPositions = fromTheme('gradientColorStopPositions');
  const inset = fromTheme('inset');
  const margin = fromTheme('margin');
  const opacity = fromTheme('opacity');
  const padding = fromTheme('padding');
  const saturate = fromTheme('saturate');
  const scale = fromTheme('scale');
  const sepia = fromTheme('sepia');
  const skew = fromTheme('skew');
  const space = fromTheme('space');
  const translate = fromTheme('translate');
  const getOverscroll = () => ['auto', 'contain', 'none'];
  const getOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const getSpacingWithAutoAndArbitrary = () => ['auto', isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ['', isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ['auto', isNumber, isArbitraryValue];
  const getPositions = () => ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'];
  const getLineStyles = () => ['solid', 'dashed', 'dotted', 'double', 'none'];
  const getBlendModes = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const getAlign = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'];
  const getZeroAndEmpty = () => ['', '0', isArbitraryValue];
  const getBreaks = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ':',
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ['none', '', isTshirtSize, isArbitraryValue],
      brightness: getNumberAndArbitrary(),
      borderColor: [colors],
      borderRadius: ['none', '', 'full', isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumberAndArbitrary(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumberAndArbitrary(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumberAndArbitrary(),
      scale: getNumberAndArbitrary(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', 'video', isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ['auto', isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['wrap', 'wrap-reverse', 'nowrap']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ['1', 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ['first', 'last', 'none', isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: ['auto', {
          span: ['full', isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: ['auto', {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': ['auto', 'min', 'max', 'fr', isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: ['normal', ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': ['start', 'end', 'center', 'stretch']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...getAlign(), 'baseline']
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline']
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': [...getAlign(), 'baseline']
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': ['start', 'end', 'center', 'baseline', 'stretch']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', 'start', 'end', 'center', 'stretch']
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      'space-x': [{
        'space-x': [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      'space-y': [{
        'space-y': [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      'space-y-reverse': ['space-y-reverse'],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ['auto', 'min', 'max', 'fit', 'svw', 'lvw', 'dvw', isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [isArbitraryValue, spacing, 'min', 'max', 'fit']
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [isArbitraryValue, spacing, 'none', 'full', 'min', 'max', 'fit', 'prose', {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': [isArbitraryValue, spacing, 'min', 'max', 'fit', 'svh', 'lvh', 'dvh']
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, 'auto', 'min', 'max', 'fit']
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest', isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': ['none', isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose', isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['none', 'disc', 'decimal', isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      'placeholder-opacity': [{
        'placeholder-opacity': [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      'text-opacity': [{
        'text-opacity': [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...getLineStyles(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: ['auto', 'from-font', isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': ['auto', isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      'bg-opacity': [{
        'bg-opacity': [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: ['no-repeat', {
          repeat: ['', 'x', 'y', 'round', 'space']
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: ['auto', 'cover', 'contain', isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          'gradient-to': ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      'border-opacity': [{
        'border-opacity': [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...getLineStyles(), 'hidden']
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x': [{
        'divide-x': [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y': [{
        'divide-y': [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      'divide-opacity': [{
        'divide-opacity': [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      'divide-style': [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': [borderColor]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': [borderColor]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: ['', ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w': [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      'ring-color': [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      'ring-opacity': [{
        'ring-opacity': [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      'ring-offset-w': [{
        'ring-offset': [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      'ring-offset-color': [{
        'ring-offset': [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ['', 'inner', 'none', isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      'shadow-color': [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...getBlendModes(), 'plus-lighter', 'plus-darker']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ['', 'none']
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': ['', 'none', isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': ['', 'none']
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['none', 'all', '', 'colors', 'opacity', 'shadow', 'transform', isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'in', 'out', 'in-out', isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', 'spin', 'ping', 'pulse', 'bounce', isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ['', 'gpu', 'none']
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left', isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ['auto', colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['none', 'auto']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', 'y', 'x', '']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, 'none']
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, 'none']
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    }
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Add = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8.5 2C8.5 1.72386 8.27614 1.5 8 1.5C7.72386 1.5 7.5 1.72386 7.5 2V7.5H2C1.72386 7.5 1.5 7.72386 1.5 8C1.5 8.27614 1.72386 8.5 2 8.5H7.5V14C7.5 14.2761 7.72386 14.5 8 14.5C8.27614 14.5 8.5 14.2761 8.5 14V8.5H14C14.2761 8.5 14.5 8.27614 14.5 8C14.5 7.72386 14.2761 7.5 14 7.5H8.5V2Z", fill: "currentColor" }) }));

const Aeroplane = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8.25 21L10.5 18.75V16.5L12.75 14.25L17.25 21L19.5 18.75L16.5 10.5L19.5938 7.59375C20.0164 7.17106 20.2539 6.59777 20.2539 6C20.2539 5.40222 20.0164 4.82894 19.5938 4.40625C19.1711 3.98356 18.5978 3.74609 18 3.74609C17.4022 3.74609 16.8289 3.98356 16.4062 4.40625L13.5 7.5L5.25 4.5L3 6.75L9.75 11.25L7.5 13.5H5.25L3 15.75L6.75 17.25L8.25 21Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Airtel = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M9.29124 1.02273C9.20159 1.04296 9.11011 1.05403 9.01822 1.05576C8.30031 1.14813 7.59592 1.32552 6.9199 1.58419L6.65788 1.69208C6.28003 1.84544 5.91232 2.02268 5.55698 2.22271C5.49612 2.26167 5.43018 2.29205 5.36102 2.31299C5.30597 2.3262 5.26193 2.35262 5.26193 2.36803C5.26193 2.38345 5.23111 2.40546 5.19808 2.42088C5.13454 2.44648 5.074 2.47897 5.01753 2.51776C4.954 2.55947 4.8878 2.59698 4.81937 2.63005C4.74471 2.66484 4.67448 2.70845 4.6102 2.75996C4.56632 2.79802 4.51743 2.82988 4.46488 2.85463C3.89358 3.20652 3.34965 3.60103 2.83774 4.0348C2.55173 4.29162 2.28804 4.57226 2.0495 4.87369C2.02974 4.91541 2.00292 4.9534 1.97023 4.98598C1.76538 5.25795 1.58138 5.545 1.41978 5.84469C1.38015 5.93716 1.29648 6.1023 1.24364 6.21459C1.05832 6.60571 0.97645 7.03783 1.00584 7.46962C1.00043 7.663 1.03699 7.85525 1.11301 8.03314C1.18904 8.21103 1.30271 8.37033 1.4462 8.50007C1.60905 8.6643 1.80335 8.79398 2.01748 8.88138C2.23161 8.96877 2.46117 9.01207 2.69243 9.00869C3.04606 9.03133 3.40091 8.99108 3.74049 8.88979C3.86159 8.85456 4.02672 8.81493 4.10599 8.79071C4.17682 8.7755 4.24556 8.75185 4.31075 8.72025C4.39662 8.67621 4.87882 8.45823 4.90084 8.45823C5.44964 8.17069 5.97918 7.84781 6.48614 7.49164C6.96613 7.17018 7.38888 6.89055 7.42631 6.87073C7.46374 6.85091 7.68833 6.7144 7.93052 6.56908C8.17272 6.42376 8.47217 6.25422 8.59107 6.19257L8.98299 5.9856C9.07767 5.94157 9.25161 5.8601 9.37491 5.81386C9.49821 5.76763 9.65234 5.70157 9.71179 5.67515C9.77124 5.64873 9.86592 5.60909 9.91656 5.58708C10.175 5.50552 10.4429 5.45743 10.7136 5.44396C11.0204 5.4033 11.3317 5.47161 11.5932 5.63699C11.8548 5.80238 12.05 6.05433 12.1448 6.3489C12.2159 6.58485 12.2399 6.8325 12.2152 7.0777C12.2401 7.48273 12.177 7.88834 12.0303 8.26668L11.9356 8.48686C11.6639 9.08197 11.324 9.64353 10.9228 10.1602C10.3504 10.8803 9.71047 11.5438 9.01161 12.1419L8.5074 12.5602C8.34887 12.6901 8.16612 12.82 7.96575 12.9565C7.88208 13.0072 7.74557 13.0974 7.66631 13.1569C7.28253 13.3956 6.88309 13.6082 6.47073 13.7932L6.16467 13.9275C6.10361 13.9601 6.03727 13.9818 5.96871 13.9914C5.90415 13.9977 5.84057 14.0117 5.77936 14.0332C5.7255 14.0547 5.66722 14.0627 5.60956 14.0566C5.5519 14.0505 5.4966 14.0304 5.44845 13.9981C5.40031 13.9657 5.36077 13.9222 5.33326 13.8711C5.30574 13.8201 5.29109 13.7631 5.29056 13.7051C5.29056 13.3991 5.43588 13.2031 6.35403 12.2916C7.34705 11.3074 7.45493 11.1599 7.45493 10.7877C7.45493 10.4156 7.27218 10.1404 6.86045 9.93124C6.6885 9.83952 6.49234 9.80337 6.29899 9.82776C6.0018 9.8114 5.70694 9.88838 5.45569 10.0479C5.39624 10.0854 5.30157 10.1338 5.25093 10.1602C5.21122 10.179 5.17359 10.2019 5.13863 10.2285C5.13863 10.2285 5.05276 10.2945 4.96909 10.3584C4.69541 10.5853 4.44668 10.8407 4.22708 11.1202C4.05186 11.3642 3.89791 11.6228 3.76691 11.8931C3.54794 12.343 3.41928 12.8314 3.3882 13.3308C3.3882 14.1345 3.80654 14.7774 4.45387 14.9602C4.872 15.0133 5.29517 15.0133 5.7133 14.9602C6.05886 14.8829 6.39815 14.7798 6.72834 14.6519C6.75436 14.632 6.78586 14.6204 6.81861 14.6189C7.36803 14.3905 7.89881 14.1196 8.40612 13.8086C8.49199 13.7514 8.58887 13.6875 8.6263 13.6655C8.66373 13.6435 8.84648 13.54 9.01822 13.4277C9.18996 13.3154 9.3551 13.2075 9.3661 13.2075C9.45559 13.1343 9.54893 13.066 9.64573 13.0028L10.02 12.7452C10.0839 12.6989 10.2578 12.5646 10.412 12.4413C11.2682 11.7785 12.05 11.0247 12.7437 10.1933C12.8251 10.0942 12.9 9.9995 12.911 9.98849C13.0757 9.77636 13.2292 9.55589 13.3712 9.32795C13.4671 9.18073 13.5553 9.0286 13.6354 8.87217C13.7059 8.73786 13.8049 8.55511 13.8556 8.46044C13.9062 8.36576 14.0075 8.12576 14.089 7.91879C14.1704 7.71182 14.2475 7.51146 14.2607 7.47843C14.4147 7.00989 14.5274 6.5288 14.5976 6.04065C14.6709 5.38395 14.6254 4.71941 14.4633 4.07884C14.4055 3.89234 14.3318 3.71113 14.2431 3.53719C13.9488 2.89642 13.4937 2.3427 12.922 1.92987C12.845 1.88065 12.7714 1.82621 12.7018 1.76694C12.3237 1.53297 11.9166 1.3494 11.4908 1.22089C11.2593 1.15426 11.024 1.10132 10.7863 1.06236C10.5463 1.02493 10.1125 1.00071 9.77124 1.00071H9.59729C9.49479 0.99755 9.39224 1.00493 9.29124 1.02273Z", fill: "currentColor" }) }));

const AlertCriticalFill = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.5 9.5V4.5H8.5V9.5H7.5ZM8.5 11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5C7.5 11.2239 7.72386 11 8 11C8.27614 11 8.5 11.2239 8.5 11.5Z", fill: "currentColor" }) }));

const AlertCritical = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M7.5 9.5V4.5H8.5V9.5H7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.5 11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5C7.5 11.2239 7.72386 11 8 11C8.27614 11 8.5 11.2239 8.5 11.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.99331 1.33398C4.31331 1.33398 1.33331 4.32065 1.33331 8.00065C1.33331 11.6807 4.31331 14.6673 7.99331 14.6673C11.68 14.6673 14.6666 11.6807 14.6666 8.00065C14.6666 4.32065 11.68 1.33398 7.99331 1.33398ZM2.33331 8.00065C2.33331 4.87163 4.8669 2.33398 7.99331 2.33398C11.1283 2.33398 13.6666 4.87359 13.6666 8.00065C13.6666 11.1277 11.1283 13.6673 7.99331 13.6673C4.8669 13.6673 2.33331 11.1297 2.33331 8.00065Z", fill: "currentColor" })] }));

const AlertInformationalFill = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM7.5 5C7.5 4.72386 7.72386 4.5 8 4.5C8.27614 4.5 8.5 4.72386 8.5 5C8.5 5.27614 8.27614 5.5 8 5.5C7.72386 5.5 7.5 5.27614 7.5 5ZM8.5 7L8.5 11H7.5V7H8.5Z", fill: "currentColor" }) }));

const AlertInformational = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M8.5 7V11H7.5L7.5 7H8.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8 4.5C7.72386 4.5 7.5 4.72386 7.5 5C7.5 5.27614 7.72386 5.5 8 5.5C8.27614 5.5 8.5 5.27614 8.5 5C8.5 4.72386 8.27614 4.5 8 4.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.33331 8.00065C1.33331 4.32065 4.31331 1.33398 7.99331 1.33398C11.68 1.33398 14.6666 4.32065 14.6666 8.00065C14.6666 11.6807 11.68 14.6673 7.99331 14.6673C4.31331 14.6673 1.33331 11.6807 1.33331 8.00065ZM7.99331 2.33398C4.8669 2.33398 2.33331 4.87163 2.33331 8.00065C2.33331 11.1297 4.8669 13.6673 7.99331 13.6673C11.1283 13.6673 13.6666 11.1277 13.6666 8.00065C13.6666 4.87359 11.1283 2.33398 7.99331 2.33398Z", fill: "currentColor" })] }));

const ArrowBottomLeft = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.99991 12.4993L3.5 12.4993L3.5 11.9998C3.5 11.9994 3.5 11.9991 3.5 11.9988L3.5 3.99927C3.5 3.72312 3.72386 3.49927 4 3.49927C4.27614 3.49927 4.5 3.72312 4.5 3.99927L4.5 10.7922L11.6464 3.64571C11.8417 3.45045 12.1583 3.45045 12.3536 3.64571C12.5488 3.84098 12.5488 4.15756 12.3536 4.35282L5.20711 11.4993L12 11.4993C12.2761 11.4993 12.5 11.7231 12.5 11.9993C12.5 12.2754 12.2761 12.4993 12 12.4993L4.00009 12.4993C4.00003 12.4993 3.99997 12.4993 3.99991 12.4993Z", fill: "currentColor" }) }));

const ArrowDownRight = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.5 11.9994L12.5 12.4993L12.0005 12.4993C12.0002 12.4993 11.9998 12.4993 11.9995 12.4993L4 12.4993C3.72386 12.4993 3.5 12.2754 3.5 11.9993C3.5 11.7231 3.72386 11.4993 4 11.4993L10.7929 11.4993L3.64645 4.35282C3.45118 4.15756 3.45118 3.84098 3.64645 3.64571C3.84171 3.45045 4.15829 3.45045 4.35355 3.64571L11.5 10.7922L11.5 3.99927C11.5 3.72313 11.7239 3.49927 12 3.49927C12.2761 3.49927 12.5 3.72313 12.5 3.99927L12.5 11.9992C12.5 11.9992 12.5 11.9993 12.5 11.9994Z", fill: "currentColor" }) }));

const ArrowDown = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.35348 14.0097L7.99999 14.3632L7.64678 14.01C7.64655 14.0098 7.64632 14.0096 7.64609 14.0093L1.98958 8.35282C1.79432 8.15756 1.79432 7.84098 1.98958 7.64571C2.18485 7.45045 2.50143 7.45045 2.69669 7.64571L7.49999 12.449L7.49999 2.34241C7.49999 2.06627 7.72385 1.84241 7.99999 1.84241C8.27613 1.84241 8.49999 2.06627 8.49999 2.34241L8.49999 12.449L13.3033 7.64571C13.4986 7.45045 13.8151 7.45045 14.0104 7.64571C14.2057 7.84098 14.2057 8.15756 14.0104 8.35282L8.35361 14.0096C8.35356 14.0097 8.35352 14.0097 8.35348 14.0097Z", fill: "currentColor" }) }));

const ArrowTopLeft = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.5 3.99918L3.5 3.49927L3.99951 3.49927C3.99984 3.49927 4.00016 3.49927 4.00049 3.49927L12 3.49927C12.2761 3.49927 12.5 3.72313 12.5 3.99927C12.5 4.27541 12.2761 4.49927 12 4.49927L5.20711 4.49927L12.3536 11.6457C12.5488 11.841 12.5488 12.1576 12.3536 12.3528C12.1583 12.5481 11.8417 12.5481 11.6464 12.3528L4.5 5.20637L4.5 11.9993C4.5 12.2754 4.27614 12.4993 4 12.4993C3.72386 12.4993 3.5 12.2754 3.5 11.9993L3.5 3.99935C3.5 3.9993 3.5 3.99924 3.5 3.99918Z", fill: "currentColor" }) }));

const ArrowTopRight = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.0001 3.49927H12.5V3.99878C12.5 3.9991 12.5 3.99943 12.5 3.99976L12.5 11.9993C12.5 12.2754 12.2761 12.4993 12 12.4993C11.7239 12.4993 11.5 12.2754 11.5 11.9993L11.5 5.20637L4.35355 12.3528C4.15829 12.5481 3.84171 12.5481 3.64645 12.3528C3.45118 12.1576 3.45118 11.841 3.64645 11.6457L10.7929 4.49927L4 4.49927C3.72386 4.49927 3.5 4.27541 3.5 3.99927C3.5 3.72313 3.72386 3.49927 4 3.49927L11.9999 3.49927C12 3.49927 12 3.49927 12.0001 3.49927Z", fill: "currentColor" }) }));

const ArrowUp = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.64649 1.9888L7.99998 1.63531L8.35318 1.98851C8.35342 1.98874 8.35365 1.98897 8.35388 1.98921L14.0104 7.64571C14.2056 7.84097 14.2056 8.15756 14.0104 8.35282C13.8151 8.54808 13.4985 8.54808 13.3033 8.35282L8.49998 3.54952L8.49998 13.6561C8.49998 13.9323 8.27612 14.1561 7.99998 14.1561C7.72384 14.1561 7.49998 13.9323 7.49998 13.6561L7.49998 3.54952L2.69668 8.35282C2.50141 8.54808 2.18483 8.54808 1.98957 8.35282C1.79431 8.15756 1.79431 7.84098 1.98957 7.64571L7.64636 1.98892C7.6464 1.98888 7.64644 1.98884 7.64649 1.9888Z", fill: "currentColor" }) }));

const Bell = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M10.268 21C10.4435 21.304 10.696 21.5565 11 21.732C11.3041 21.9075 11.6489 21.9999 12 21.9999C12.3511 21.9999 12.6959 21.9075 13 21.732C13.304 21.5565 13.5565 21.304 13.732 21M3.262 15.326C3.13137 15.4692 3.04516 15.6472 3.01386 15.8385C2.98256 16.0298 3.00752 16.226 3.08571 16.4034C3.1639 16.5808 3.29194 16.7316 3.45426 16.8375C3.61658 16.9434 3.80618 16.9999 4 17H20C20.1938 17.0001 20.3834 16.9438 20.5459 16.8381C20.7083 16.7324 20.8365 16.5818 20.9149 16.4045C20.9933 16.2273 21.0185 16.0311 20.9874 15.8398C20.9564 15.6485 20.8704 15.4703 20.74 15.327C19.41 13.956 18 12.499 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 12.499 4.589 13.956 3.262 15.326Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Bsnl = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M14.3475 1.177C14.7696 1.01971 15.2654 0.904229 15.6914 1.11329C15.9443 1.27655 15.9841 1.61104 15.9961 1.8858C16.0359 2.51496 15.7671 3.10629 15.4764 3.64586C14.9183 4.5887 14.2723 5.47666 13.5471 6.2979C12.5635 7.47658 11.578 8.65327 10.5606 9.79612C10.3615 10.0211 10.1624 10.2222 9.97921 10.4611C10.3376 10.8454 10.696 11.2316 11.0364 11.6318C9.84183 11.6318 8.64721 11.6318 7.4526 11.6318C7.42075 10.412 7.4015 9.19151 7.39486 7.97035C7.90058 8.31679 8.2968 8.80857 8.80451 9.13908C9.59373 8.54731 10.352 7.91532 11.0763 7.24562C11.7671 6.60651 12.47 5.97336 13.1011 5.2785C13.8058 4.57899 14.4302 3.803 14.9627 2.96493C15.146 2.68567 15.2518 2.36273 15.2693 2.02915C15.2717 1.9319 15.2367 1.83745 15.1715 1.76523C15.1063 1.69301 15.0159 1.64852 14.9189 1.64091C14.4887 1.64673 14.0625 1.7255 13.6586 1.87385C12.91 2.13012 12.1926 2.47009 11.5203 2.88728C11.6081 2.78272 11.7107 2.69151 11.8249 2.6165C12.6014 2.03179 13.4491 1.54808 14.3475 1.177Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.16292 2.65632C5.84254 2.28774 6.58926 2.05939 7.35878 1.98483C8.12831 1.91028 8.90498 1.99102 9.64271 2.22228C11.0786 2.674 12.2847 3.66256 13.0095 4.98183C13.0533 5.0774 13.129 5.18093 13.1011 5.28845C12.466 5.98331 11.7671 6.61646 11.0762 7.25557C10.3487 7.92554 9.58716 8.55754 8.79454 9.14903C8.28683 8.81852 7.89062 8.32674 7.3849 7.98031C7.3849 9.20146 7.40415 10.422 7.44264 11.6418C8.63725 11.6418 9.83186 11.6418 11.0265 11.6418C10.686 11.2436 10.3276 10.8553 9.96924 10.4711C10.1425 10.2321 10.3674 10.0311 10.5506 9.80607C11.574 8.66322 12.5596 7.48653 13.5371 6.30785C13.7456 7.17377 13.7626 8.07477 13.5869 8.94794C13.2778 10.414 12.4139 11.7039 11.1758 12.5477C10.1579 13.243 8.94317 13.5921 7.71143 13.5432C6.63628 13.5432 5.60294 13.145 4.69105 12.5915L4.67313 12.5756C4.64851 12.5496 4.62188 12.5257 4.59349 12.5039C3.85785 11.9792 3.24619 11.2995 2.80157 10.5129C4.00056 9.18312 5.29124 7.939 6.66415 6.78968C6.83372 6.64355 7.01409 6.51043 7.20372 6.39147C7.28734 6.39147 7.3411 6.4731 7.40282 6.52089C7.74328 6.86135 8.08175 7.2058 8.42222 7.54427C8.48394 6.41935 8.44014 5.29243 8.44611 4.15954L8.37842 4.07393C7.44662 4.04406 6.51283 4.07393 5.59099 4.06198C5.38977 4.03935 5.18603 4.06041 4.99369 4.1237C5.40583 4.48408 5.79009 4.88427 6.16241 5.28447C4.89214 6.61181 3.66966 7.98429 2.49496 9.40189L2.41133 9.42379C2.33363 9.29748 2.2828 9.1565 2.26201 9.00966C1.99494 7.77363 2.13462 6.48439 2.66021 5.33424C3.17974 4.19233 4.05872 3.25182 5.16292 2.65632Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.98573 4.12967C5.17808 4.06638 5.38182 4.04533 5.58304 4.06795C6.51484 4.08189 7.44862 4.05003 8.37047 4.0799L8.43816 4.16551C8.43816 5.29243 8.47599 6.41935 8.41427 7.55024C8.0738 7.21177 7.73533 6.86732 7.39487 6.52686C7.33314 6.47908 7.27939 6.39744 7.19576 6.39744C7.00614 6.51641 6.82577 6.64952 6.6562 6.79565C5.28329 7.94498 3.99261 9.18909 2.79362 10.5189C2.15451 11.2615 1.50743 12.0201 1.08135 12.9081C0.967859 13.1808 0.828488 13.5193 0.999716 13.7941C1.21475 14.0529 1.59702 14.0131 1.89567 13.9494C2.49298 13.7921 3.01662 13.4616 3.55021 13.1669C3.91295 12.9758 4.25866 12.754 4.58355 12.5039C4.61194 12.5257 4.63857 12.5496 4.66319 12.5756C4.36374 12.7537 4.0776 12.9533 3.80705 13.1729C3.12835 13.6814 2.3935 14.1103 1.61693 14.4511C1.25457 14.5925 0.834461 14.694 0.46214 14.5268C0.328565 14.4523 0.216439 14.3446 0.136576 14.2142C0.0567135 14.0838 0.0118103 13.935 0.00619735 13.7821C-0.0415871 13.2525 0.195344 12.7587 0.428293 12.3008C0.961681 11.3506 1.58508 10.4539 2.2899 9.62289C2.34014 9.56652 2.37449 9.49781 2.38945 9.42379L2.47307 9.40189C3.65573 7.99092 4.88419 6.62044 6.15844 5.29044C5.78214 4.89223 5.40186 4.49403 4.98972 4.12967H4.98573Z", fill: "currentColor" })] }));

const BulkActions = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.15385 8.53846H14.0769C14.8416 8.53846 15.4615 9.15838 15.4615 9.92308V16.8462H16.8462V7.15385H7.15385V8.53846ZM15.4615 18.2308V19.6154C15.4615 20.3801 14.8416 21 14.0769 21H4.38462C3.61991 21 3 20.3801 3 19.6154V9.92308C3 9.15838 3.61991 8.53846 4.38462 8.53846H5.76923V7.15385C5.76923 6.38914 6.38914 5.76923 7.15385 5.76923H8.53846V4.38462C8.53846 3.61991 9.15838 3 9.92308 3H19.6154C20.3801 3 21 3.61991 21 4.38462V14.0769C21 14.8416 20.3801 15.4615 19.6154 15.4615H18.2308V16.8462C18.2308 17.6109 17.6109 18.2308 16.8462 18.2308H15.4615ZM18.2308 14.0769H19.6154V4.38462H9.92308V5.76923H16.8462C17.6109 5.76923 18.2308 6.38914 18.2308 7.15385V14.0769ZM7.02659 17.6603C7.20392 17.8204 7.32217 17.944 7.55975 17.944C7.79733 17.944 7.95403 17.8204 8.11869 17.6603C8.22846 17.5535 9.93438 15.8299 13.2364 12.4895C13.5044 12.2188 13.5033 11.7824 13.2314 11.5105C12.961 11.2401 12.5227 11.2401 12.2523 11.5105L7.52496 16.2378L5.56682 14.2797C5.29645 14.0093 4.85811 14.0093 4.58703 14.2797C4.31686 14.5503 4.31718 14.9886 4.58774 15.2588C6.09543 16.753 6.90838 17.5535 7.02659 17.6603Z", fill: "currentColor" }) }));

const CalendarClock = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M21 7.5V6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H8.5M16 2V6M8 2V6M3 10H8M17.5 17.5L16 16.3V14M22 16C22 19.3137 19.3137 22 16 22C12.6863 22 10 19.3137 10 16C10 12.6863 12.6863 10 16 10C19.3137 10 22 12.6863 22 16Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Calendar = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M4.99854 5.5C4.72239 5.5 4.49854 5.72386 4.49854 6C4.49854 6.27614 4.72239 6.5 4.99854 6.5L11.0015 6.5C11.2776 6.5 11.5015 6.27614 11.5015 6C11.5015 5.72386 11.2776 5.5 11.0015 5.5L4.99854 5.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5 1.5C5.27614 1.5 5.5 1.72386 5.5 2V3H10.5V2C10.5 1.72386 10.7239 1.5 11 1.5C11.2761 1.5 11.5 1.72386 11.5 2V3H13C13.5523 3 14 3.44772 14 4V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V4C2 3.44772 2.44772 3 3 3H4.5V2C4.5 1.72386 4.72386 1.5 5 1.5ZM3 4H13V13H3L3 4Z", fill: "currentColor" })] }));

const Cheap = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.85591 10.9283C8.40018 10.2574 9.21591 10 10 10H13C13.7957 10 14.5587 10.3161 15.1213 10.8787C15.6839 11.4413 16 12.2043 16 13C16 13.7957 15.6839 14.5587 15.1213 15.1213C14.5587 15.6839 13.7957 16 13 16H11C10.4477 16 10 15.5523 10 15C10 14.4477 10.4477 14 11 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13C14 12.7348 13.8946 12.4804 13.7071 12.2929C13.5196 12.1054 13.2652 12 13 12H10C9.61142 12 9.45673 12.1244 9.4 12.2C9.36797 12.2427 9.33257 12.2828 9.29414 12.3198L3.69414 17.7198C3.29658 18.1032 2.66352 18.0917 2.28016 17.6941C1.8968 17.2966 1.90831 16.6635 2.30586 16.2802L7.85591 10.9283Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M17.9667 9.7599C18.5449 9.21518 19.3156 8.92184 20.1098 8.94429C20.9057 8.96678 21.66 9.30451 22.2068 9.88316C22.7536 10.4618 23.0482 11.234 23.0257 12.0298C23.0032 12.8246 22.6664 13.578 22.0891 14.1246L17.5213 18.4939C16.6078 19.516 15.3317 20 14 20H10C9.61142 20 9.45673 20.1244 9.4 20.2C9.35827 20.2556 9.31085 20.3068 9.2585 20.3526L7.6585 21.7526C7.24287 22.1163 6.6111 22.0741 6.24742 21.6585C5.88374 21.2429 5.92586 20.6111 6.3415 20.2474L7.87344 18.907C8.4176 18.2519 9.22428 18 10 18H14C14.8531 18 15.563 17.6951 16.0474 17.1415C16.0669 17.1192 16.0874 17.0978 16.1088 17.0774L20.7131 12.6732C20.9063 12.4907 21.019 12.2389 21.0265 11.9733C21.034 11.7077 20.9357 11.45 20.7532 11.2568C20.5707 11.0637 20.3189 10.951 20.0533 10.9435C19.7877 10.936 19.53 11.0343 19.3368 11.2168L19.3305 11.2228L15.1305 15.1228C14.7257 15.4986 14.093 15.4752 13.7172 15.0705C13.3414 14.6657 13.3648 14.033 13.7695 13.6572L17.9667 9.7599Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.29289 15.2929C1.68342 14.9024 2.31658 14.9024 2.70711 15.2929L8.70711 21.2929C9.09763 21.6834 9.09763 22.3166 8.70711 22.7071C8.31658 23.0976 7.68342 23.0976 7.29289 22.7071L1.29289 16.7071C0.902369 16.3166 0.902369 15.6834 1.29289 15.2929Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16 7.1C14.9507 7.1 14.1 7.95066 14.1 9C14.1 10.0493 14.9507 10.9 16 10.9C17.0493 10.9 17.9 10.0493 17.9 9C17.9 7.95066 17.0493 7.1 16 7.1ZM12.1 9C12.1 6.84609 13.8461 5.1 16 5.1C18.1539 5.1 19.9 6.84609 19.9 9C19.9 11.1539 18.1539 12.9 16 12.9C13.8461 12.9 12.1 11.1539 12.1 9Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 3C4.89543 3 4 3.89543 4 5C4 6.10457 4.89543 7 6 7C7.10457 7 8 6.10457 8 5C8 3.89543 7.10457 3 6 3ZM2 5C2 2.79086 3.79086 1 6 1C8.20914 1 10 2.79086 10 5C10 7.20914 8.20914 9 6 9C3.79086 9 2 7.20914 2 5Z", fill: "currentColor" })] }));

const CheckAlt = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.3391 4.6326C13.542 4.8199 13.5547 5.13623 13.3674 5.33914L7.01442 12.2215L3.64645 8.85355C3.45118 8.65829 3.45118 8.3417 3.64645 8.14644C3.84171 7.95118 4.15829 7.95118 4.35355 8.14644L6.98557 10.7785L12.6326 4.66086C12.8199 4.45795 13.1362 4.4453 13.3391 4.6326Z", fill: "currentColor" }) }));

const CheckFill = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 15C11.866 15 15 11.866 15 8C15 4.13403 11.866 1 8 1C4.134 1 1 4.13403 1 8C1 11.866 4.134 15 8 15ZM6.44424 10.556C6.50259 10.577 6.56509 10.5875 6.63174 10.5875C6.67453 10.5875 6.71561 10.5832 6.75494 10.5745C6.77692 10.5697 6.79834 10.5635 6.81924 10.556C6.87759 10.5353 6.93176 10.5 6.98175 10.45L11.5818 5.84998C11.6734 5.75836 11.7192 5.63953 11.7192 5.49353C11.7192 5.34784 11.6734 5.22919 11.5818 5.13751C11.4901 5.04584 11.3714 5 11.2257 5C11.0797 5 10.9609 5.04584 10.8693 5.13751L6.63174 9.375L4.84424 7.58752C4.75259 7.49585 4.63593 7.45001 4.49426 7.45001C4.35257 7.45001 4.23593 7.49585 4.14426 7.58752C4.05258 7.67914 4.00458 7.79785 4.00024 7.94348C3.99625 8.08948 4.04007 8.20831 4.13174 8.29999L6.28174 10.45C6.33176 10.5 6.38593 10.5353 6.44424 10.556Z", fill: "currentColor" }) }));

const Check = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M11.8005 6.26403C11.9463 6.09808 11.93 5.84534 11.7641 5.69951C11.5981 5.55369 11.3454 5.56999 11.1995 5.73593L7.51189 9.93223L5.26726 7.91665C5.10289 7.76905 4.84999 7.78265 4.70239 7.94702C4.55479 8.11139 4.56839 8.36429 4.73276 8.51189L7.57904 11.0677L11.8005 6.26403Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z", fill: "currentColor" })] }));

const ChevronDown = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L8 10.2929L12.6464 5.64645C12.8417 5.45118 13.1583 5.45118 13.3536 5.64645C13.5488 5.84171 13.5488 6.15829 13.3536 6.35355L8 11.7071L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645Z", fill: "currentColor" }) }));

const ChevronLeft = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.9571 3.24996C11.1524 3.44522 11.1524 3.76181 10.9571 3.95707L6.31065 8.60352L10.9571 13.25C11.1524 13.4452 11.1524 13.7618 10.9571 13.9571C10.7618 14.1523 10.4453 14.1523 10.25 13.9571L4.89644 8.60352L10.25 3.24996C10.4453 3.0547 10.7618 3.0547 10.9571 3.24996Z", fill: "currentColor" }) }));

const ChevronRight = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.0429 13.9571C4.84764 13.7618 4.84764 13.4452 5.0429 13.25L9.68935 8.60351L5.0429 3.95707C4.84764 3.76181 4.84764 3.44522 5.0429 3.24996C5.23816 3.0547 5.55474 3.0547 5.75001 3.24996L11.1036 8.60352L5.75001 13.9571C5.55475 14.1523 5.23816 14.1523 5.0429 13.9571Z", fill: "currentColor" }) }));

const ChevronUp = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.3536 11.5605C13.1583 11.7558 12.8417 11.7558 12.6464 11.5605L8 6.91409L3.35355 11.5605C3.15829 11.7558 2.84171 11.7558 2.64645 11.5605C2.45118 11.3653 2.45118 11.0487 2.64645 10.8534L8 5.49988L13.3536 10.8534C13.5488 11.0487 13.5488 11.3653 13.3536 11.5605Z", fill: "currentColor" }) }));

const Clock = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const CloseFilled = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8 8.77645L10.2643 11.0409C10.3664 11.1429 10.4946 11.1951 10.6491 11.1975C10.8035 11.1999 10.9341 11.1477 11.0409 11.0409C11.1477 10.9341 11.201 10.8047 11.201 10.6526C11.201 10.5006 11.1477 10.3712 11.0409 10.2643L8.77645 8L11.0409 5.73568C11.1429 5.63363 11.1951 5.50536 11.1975 5.35087C11.1999 5.1965 11.1477 5.06589 11.0409 4.95905C10.9341 4.85233 10.8047 4.79897 10.6526 4.79897C10.5006 4.79897 10.3712 4.85233 10.2643 4.95905L8 7.22355L5.73568 4.95905C5.63363 4.85712 5.50536 4.80493 5.35087 4.80247C5.1965 4.80014 5.0659 4.85233 4.95905 4.95905C4.85233 5.06589 4.79897 5.19533 4.79897 5.34737C4.79897 5.4994 4.85233 5.62884 4.95905 5.73568L7.22355 8L4.95905 10.2643C4.85712 10.3664 4.80493 10.4946 4.80247 10.6491C4.80014 10.8035 4.85233 10.9341 4.95905 11.0409C5.0659 11.1477 5.19533 11.201 5.34737 11.201C5.4994 11.201 5.62884 11.1477 5.73568 11.0409L8 8.77645ZM8.00129 15C7.03308 15 6.12302 14.8163 5.2711 14.4488C4.41919 14.0814 3.67818 13.5827 3.04805 12.9529C2.41793 12.323 1.91903 11.5823 1.55134 10.7307C1.18378 9.87919 1 8.96938 1 8.00129C1 7.03308 1.18372 6.12302 1.55116 5.2711C1.9186 4.41919 2.41725 3.67818 3.04713 3.04805C3.67701 2.41793 4.41772 1.91903 5.26926 1.55134C6.12081 1.18378 7.03062 1 7.99871 1C8.96692 1 9.87698 1.18372 10.7289 1.55116C11.5808 1.9186 12.3218 2.41725 12.9519 3.04713C13.5821 3.67701 14.081 4.41772 14.4487 5.26926C14.8162 6.12081 15 7.03062 15 7.99871C15 8.96692 14.8163 9.87698 14.4488 10.7289C14.0814 11.5808 13.5827 12.3218 12.9529 12.9519C12.323 13.5821 11.5823 14.081 10.7307 14.4487C9.87919 14.8162 8.96938 15 8.00129 15Z", fill: "currentColor" }) }));

const Comment = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M10.75 8.10001C11.1642 8.10001 11.5 7.76422 11.5 7.35001C11.5 6.93579 11.1642 6.60001 10.75 6.60001C10.3358 6.60001 10 6.93579 10 7.35001C10 7.76422 10.3358 8.10001 10.75 8.10001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.75 7.35001C8.75 7.76422 8.41421 8.10001 8 8.10001C7.58579 8.10001 7.25 7.76422 7.25 7.35001C7.25 6.93579 7.58579 6.60001 8 6.60001C8.41421 6.60001 8.75 6.93579 8.75 7.35001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.25 8.10001C5.66421 8.10001 6 7.76422 6 7.35001C6 6.93579 5.66421 6.60001 5.25 6.60001C4.83579 6.60001 4.5 6.93579 4.5 7.35001C4.5 7.76422 4.83579 8.10001 5.25 8.10001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 4C2 3.44772 2.44772 3 3 3H13C13.5523 3 14 3.44772 14 4V10.6154C14 11.1677 13.5523 11.6154 13 11.6154H10.0524C9.7086 11.6154 9.38893 11.792 9.2059 12.0829L8.84646 12.6543C8.45432 13.2777 7.54568 13.2777 7.15354 12.6543L6.7941 12.0829C6.61107 11.792 6.2914 11.6154 5.94764 11.6154H3C2.44772 11.6154 2 11.1677 2 10.6154V4ZM3 4H13V10.6154H10.0524C9.36484 10.6154 8.72551 10.9685 8.35944 11.5505L8 12.1219L7.64056 11.5505C7.27449 10.9685 6.63516 10.6154 5.94764 10.6154H3V4Z", fill: "currentColor" })] }));

const Copy = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("g", { "clip-path": "url(#clip0_1234_240)", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.83334 2.66659C1.83334 2.20939 2.20949 1.83325 2.66668 1.83325H9.33334C9.79053 1.83325 10.1667 2.20939 10.1667 2.66659C10.1667 2.94273 10.3905 3.16659 10.6667 3.16659C10.9428 3.16659 11.1667 2.94273 11.1667 2.66659C11.1667 1.65711 10.3428 0.833252 9.33334 0.833252H2.66668C1.6572 0.833252 0.833344 1.65711 0.833344 2.66659V9.33325C0.833344 10.3427 1.6572 11.1666 2.66668 11.1666C2.94282 11.1666 3.16668 10.9427 3.16668 10.6666C3.16668 10.3904 2.94282 10.1666 2.66668 10.1666C2.20949 10.1666 1.83334 9.79044 1.83334 9.33325V2.66659ZM5.83334 6.66658C5.83334 6.20635 6.20644 5.83325 6.66668 5.83325H13.3333C13.7936 5.83325 14.1667 6.20635 14.1667 6.66658V13.3333C14.1667 13.7935 13.7936 14.1666 13.3333 14.1666H6.66668C6.20644 14.1666 5.83334 13.7935 5.83334 13.3333V6.66658ZM6.66668 4.83325C5.65415 4.83325 4.83334 5.65406 4.83334 6.66658V13.3333C4.83334 14.3458 5.65415 15.1666 6.66668 15.1666H13.3333C14.3459 15.1666 15.1667 14.3458 15.1667 13.3333V6.66658C15.1667 5.65406 14.3459 4.83325 13.3333 4.83325H6.66668Z", fill: "currentColor" }) }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_1234_240", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const CrossIcon = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M10.3536 6.35368C10.5488 6.15841 10.5488 5.84183 10.3536 5.64657C10.1583 5.45131 9.84171 5.45131 9.64645 5.64657L8 7.29302L6.35355 5.64657C6.15829 5.45131 5.84171 5.45131 5.64645 5.64657C5.45118 5.84183 5.45118 6.15841 5.64645 6.35368L7.29289 8.00012L5.64645 9.64657C5.45118 9.84183 5.45118 10.1584 5.64645 10.3537C5.84171 10.5489 6.15829 10.5489 6.35355 10.3537L8 8.70723L9.64645 10.3537C9.84171 10.5489 10.1583 10.5489 10.3536 10.3537C10.5488 10.1584 10.5488 9.84183 10.3536 9.64657L8.70711 8.00012L10.3536 6.35368Z", fill: "black" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z", fill: "black" })] }));

const Cross = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.3536 4.35355C12.5488 4.15829 12.5488 3.84171 12.3536 3.64645C12.1583 3.45118 11.8417 3.45118 11.6465 3.64645L8 7.29289L4.35355 3.64645C4.15829 3.45118 3.84171 3.45118 3.64645 3.64645C3.45118 3.84171 3.45118 4.15829 3.64645 4.35355L7.2929 8L3.64645 11.6464C3.45119 11.8417 3.45119 12.1583 3.64645 12.3536C3.84171 12.5488 4.15829 12.5488 4.35356 12.3536L8 8.70711L11.6464 12.3536C11.8417 12.5488 12.1583 12.5488 12.3536 12.3536C12.5488 12.1583 12.5488 11.8417 12.3536 11.6464L8.70711 8L12.3536 4.35355Z", fill: "currentColor" }) }));

const CursorPointer = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M7.27866 16.2682C6.99866 15.9082 6.64866 15.1782 6.03866 14.2682C5.68866 13.7682 4.82866 12.8182 4.56866 12.3282C4.38123 12.0304 4.32685 11.6679 4.41866 11.3282C4.57562 10.6824 5.18822 10.254 5.84866 10.3282C6.35946 10.4308 6.82889 10.6812 7.19866 11.0482C7.45684 11.2914 7.69433 11.5556 7.90866 11.8382C8.06866 12.0382 8.10866 12.1182 8.28866 12.3482C8.46866 12.5782 8.58866 12.8082 8.49866 12.4682C8.42866 11.9682 8.30866 11.1282 8.13866 10.3782C8.00866 9.80822 7.97866 9.71822 7.85866 9.28822C7.73866 8.85822 7.66866 8.49822 7.53866 8.00822C7.41983 7.52679 7.32637 7.03945 7.25866 6.54822C7.13262 5.91992 7.22432 5.26743 7.51866 4.69822C7.86806 4.36959 8.38059 4.28285 8.81866 4.47822C9.25926 4.80355 9.58776 5.25787 9.75866 5.77822C10.0207 6.41861 10.1956 7.09128 10.2787 7.77822C10.4387 8.77822 10.7487 10.2382 10.7587 10.5382C10.7587 10.1682 10.6887 9.38822 10.7587 9.03822C10.828 8.67334 11.0816 8.37053 11.4287 8.23822C11.7265 8.14684 12.0415 8.1263 12.3487 8.17822C12.6587 8.24303 12.9333 8.42136 13.1187 8.67822C13.3503 9.26161 13.4789 9.88082 13.4987 10.5082C13.5254 9.9588 13.6195 9.41475 13.7787 8.88822C13.9458 8.65277 14.1898 8.48301 14.4687 8.40822C14.7993 8.34777 15.1381 8.34777 15.4687 8.40822C15.7398 8.49885 15.9769 8.66973 16.1487 8.89822C16.3604 9.42856 16.4886 9.98856 16.5287 10.5582C16.5287 10.6982 16.5987 10.1682 16.8187 9.81822C16.933 9.47882 17.2197 9.22619 17.5708 9.15549C17.9219 9.0848 18.284 9.20678 18.5208 9.47549C18.7576 9.7442 18.833 10.1188 18.7187 10.4582C18.7187 11.1082 18.7187 11.0782 18.7187 11.5182C18.7187 11.9582 18.7187 12.3482 18.7187 12.7182C18.6822 13.3034 18.602 13.885 18.4787 14.4582C18.3046 14.9653 18.0624 15.4464 17.7587 15.8882C17.2731 16.4282 16.8719 17.0384 16.5687 17.6982C16.4934 18.026 16.4598 18.362 16.4687 18.6982C16.4677 19.0089 16.508 19.3182 16.5887 19.6182C16.1798 19.6614 15.7675 19.6614 15.3587 19.6182C14.9687 19.5582 14.4887 18.7782 14.3587 18.5382C14.2943 18.4094 14.1627 18.3279 14.0187 18.3279C13.8746 18.3279 13.743 18.4094 13.6787 18.5382C13.4587 18.9182 12.9687 19.6082 12.6287 19.6482C11.9587 19.7282 10.5787 19.6482 9.48866 19.6482C9.48866 19.6482 9.66866 18.6482 9.25866 18.2882C8.84866 17.9282 8.42866 17.5082 8.11866 17.2282L7.27866 16.2682Z", fill: "white" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.82128 4.93148C7.59036 5.4103 7.52153 5.95203 7.62634 6.47446C7.62784 6.48194 7.62911 6.48946 7.63015 6.49702C7.69592 6.97418 7.78665 7.44757 7.90197 7.91524C7.96344 8.14712 8.01179 8.35062 8.05712 8.54141C8.06051 8.55566 8.06388 8.56984 8.06724 8.58396C8.11596 8.78884 8.162 8.98008 8.21986 9.18742C8.23603 9.24536 8.25061 9.29727 8.26405 9.34514C8.35052 9.65312 8.38992 9.79344 8.50427 10.2948C8.67571 11.0512 8.79667 11.8927 8.86701 12.3946C8.87671 12.4323 8.88496 12.4674 8.89106 12.499C8.89657 12.5276 8.90729 12.586 8.90341 12.6485C8.90189 12.673 8.8959 12.7598 8.83692 12.8472C8.8025 12.8982 8.7479 12.9521 8.66902 12.9854C8.59101 13.0183 8.51665 13.0196 8.46061 13.0107C8.36376 12.9954 8.29942 12.9469 8.28122 12.933C8.25441 12.9125 8.23408 12.892 8.22207 12.8792C8.18288 12.8377 8.13988 12.7782 8.11102 12.7382C8.10938 12.736 8.10779 12.7338 8.10624 12.7316L8.09764 12.7197C8.06396 12.6731 8.02994 12.6261 7.99335 12.5793C7.89988 12.4599 7.84132 12.3776 7.78905 12.3042L7.78566 12.2994C7.73422 12.2272 7.68911 12.1641 7.61584 12.0725L7.60978 12.0649C7.40803 11.7989 7.18458 11.5501 6.94155 11.3212L6.9344 11.3145C6.62076 11.0031 6.22376 10.7895 5.7914 10.6993C5.32449 10.6545 4.8942 10.9595 4.78305 11.4168L4.78079 11.4261C4.7163 11.6647 4.75438 11.9193 4.88603 12.1285C4.89095 12.1363 4.89559 12.1443 4.89992 12.1524C5.00964 12.3592 5.26385 12.6895 5.56185 13.0591C5.62272 13.1346 5.6852 13.2115 5.74762 13.2883C5.97471 13.5677 6.201 13.8462 6.34587 14.0532L6.35022 14.0594C6.66235 14.525 6.9074 14.944 7.10646 15.2857L7.11077 15.2931C7.31009 15.6354 7.44995 15.8755 7.5684 16.0299L8.38652 16.9649C8.51432 17.0809 8.65924 17.2186 8.80965 17.3616C8.84263 17.3929 8.87587 17.4245 8.90926 17.4562C9.10396 17.6409 9.30695 17.8316 9.50609 18.0064C9.68277 18.1616 9.77666 18.3673 9.82845 18.5507C9.88091 18.7364 9.89882 18.9295 9.90233 19.0953C9.90366 19.1582 9.90295 19.2191 9.90092 19.2764C10.1529 19.2799 10.413 19.2858 10.6686 19.2916C10.8574 19.2959 11.0438 19.3001 11.2228 19.3033C11.79 19.3133 12.2745 19.3123 12.5798 19.2764C12.5798 19.2764 12.5798 19.2764 12.5798 19.2764C12.5796 19.2757 12.61 19.2663 12.6738 19.2163C12.7443 19.1609 12.8264 19.079 12.9137 18.9769C13.0853 18.7763 13.2477 18.5331 13.3494 18.3584C13.4794 18.1095 13.7371 17.9529 14.0187 17.9529C14.3023 17.9529 14.5618 18.1119 14.6908 18.364C14.7499 18.4725 14.8892 18.7043 15.0546 18.9122C15.1385 19.0177 15.2215 19.1073 15.2969 19.1704C15.3666 19.2287 15.4055 19.2439 15.414 19.247C15.6536 19.2716 15.8944 19.2803 16.1349 19.2733C16.1071 19.0845 16.0933 18.8937 16.0936 18.7026C16.0845 18.3367 16.1213 17.9711 16.2032 17.6143C16.2089 17.5893 16.2172 17.5649 16.2279 17.5416C16.5435 16.8551 16.9598 16.2196 17.463 15.6562C17.7371 15.2539 17.9569 14.8172 18.1168 14.3574C18.2327 13.8134 18.3085 13.2616 18.3437 12.7065V10.4582C18.3437 10.4175 18.3503 10.3771 18.3633 10.3385C18.4348 10.1261 18.3876 9.8916 18.2394 9.72341C18.0912 9.55522 17.8646 9.47887 17.6448 9.52312C17.4251 9.56736 17.2456 9.72549 17.174 9.93792C17.1646 9.96594 17.1519 9.99275 17.1362 10.0178C17.056 10.1453 16.9951 10.3221 16.9519 10.4742C16.9417 10.5104 16.9329 10.5436 16.9251 10.5731C16.9181 10.5999 16.9102 10.6305 16.904 10.6526C16.901 10.6632 16.896 10.6804 16.8897 10.698C16.8868 10.7062 16.8805 10.7233 16.8708 10.743C16.8706 10.7434 16.8374 10.8201 16.7587 10.8798C16.7097 10.917 16.5979 10.9801 16.4501 10.9473C16.3109 10.9165 16.2393 10.8215 16.2137 10.7812C16.1692 10.7109 16.1599 10.6419 16.1589 10.6339C16.1588 10.6336 16.1589 10.634 16.1589 10.6339C16.1553 10.6107 16.1541 10.5882 16.1538 10.5737C16.1169 10.0641 16.0043 9.56288 15.8198 9.0866C15.702 8.94394 15.5481 8.83532 15.3739 8.77227C15.1018 8.72577 14.8238 8.72643 14.5519 8.77427C14.3814 8.82306 14.2303 8.92299 14.1188 9.06006C13.9799 9.5375 13.8974 10.0297 13.8732 10.5265C13.8634 10.7275 13.6967 10.8849 13.4954 10.8832C13.2942 10.8815 13.1302 10.7212 13.1238 10.52C13.106 9.95264 12.9925 9.39247 12.7883 8.86307C12.6601 8.70245 12.4803 8.59051 12.2788 8.54674C12.0359 8.50683 11.7871 8.52263 11.5513 8.59291C11.3315 8.68098 11.1714 8.87511 11.1271 9.10824L11.1264 9.11176C11.1013 9.23748 11.0982 9.47638 11.1072 9.76921C11.1103 9.87012 11.1149 9.97834 11.1194 10.0842C11.1267 10.2554 11.1337 10.4204 11.1337 10.5382C11.1337 10.7429 10.9696 10.9098 10.7649 10.9132C10.5603 10.9166 10.3907 10.7553 10.3839 10.5507C10.3824 10.5059 10.3663 10.3848 10.3322 10.1836C10.2999 9.99257 10.2557 9.75367 10.2063 9.48972C10.1938 9.42294 10.181 9.35458 10.1679 9.28508C10.0785 8.80883 9.97906 8.27925 9.90837 7.83746L9.90637 7.82322C9.82736 7.16961 9.66095 6.52957 9.4116 5.92025C9.40823 5.91202 9.40516 5.90367 9.40239 5.89523C9.26025 5.46246 8.99105 5.08293 8.63035 4.80583C8.35731 4.69917 8.04823 4.74772 7.82128 4.93148ZM16.0936 18.7026C16.0937 18.7007 16.0937 18.6989 16.0937 18.697L16.4687 18.6982L16.0938 18.7081C16.0937 18.7062 16.0937 18.7044 16.0936 18.7026ZM9.11962 19.5816L9.12055 19.5761L9.12458 19.55C9.12805 19.5264 9.13281 19.491 9.13744 19.4471C9.1468 19.3583 9.15519 19.2385 9.1525 19.1112C9.14976 18.9819 9.13579 18.8575 9.10669 18.7545C9.07692 18.6491 9.03955 18.5949 9.01124 18.57C8.80037 18.3849 8.58837 18.1856 8.39306 18.0003C8.35818 17.9672 8.32393 17.9346 8.29035 17.9027C8.13355 17.7537 7.9913 17.6185 7.86731 17.5065C7.85641 17.4967 7.84611 17.4862 7.83645 17.4752L6.99645 16.5152C6.99169 16.5097 6.98709 16.5041 6.98266 16.4984C6.83123 16.3038 6.66787 16.0231 6.48697 15.7123C6.47749 15.696 6.46795 15.6797 6.45837 15.6632C6.2604 15.3233 6.02617 14.9233 5.72932 14.4802C5.60137 14.2979 5.40111 14.0514 5.17883 13.7777C5.11336 13.6971 5.04598 13.6142 4.97798 13.5298C4.69752 13.182 4.39638 12.7983 4.24391 12.5161C4.00751 12.1334 3.93922 11.6699 4.05541 11.235C4.25876 10.4083 5.04404 9.86048 5.89052 9.95556C5.90125 9.95677 5.91193 9.95844 5.92252 9.96056C6.50369 10.0773 7.03792 10.3617 7.45928 10.7785C7.62613 10.9359 7.78481 11.1016 7.93471 11.275C7.88711 11.0049 7.83321 10.727 7.773 10.4614C7.66274 9.97792 7.62679 9.84992 7.54213 9.54846C7.52865 9.50043 7.51392 9.44799 7.49746 9.38902C7.43532 9.16635 7.38637 8.9626 7.33759 8.75747C7.33431 8.74368 7.33102 8.72987 7.32774 8.71605C7.28198 8.52349 7.23548 8.3278 7.1762 8.10438L7.17453 8.0981C7.05345 7.60753 6.95808 7.11097 6.8887 6.61048C6.74931 5.90217 6.85387 5.1674 7.18556 4.52597C7.20506 4.48826 7.23082 4.45414 7.26174 4.42506C7.72123 3.99287 8.39528 3.8788 8.9714 4.13573C8.99615 4.14677 9.01962 4.16045 9.04142 4.17655C9.54094 4.5454 9.91431 5.05941 10.1107 5.64827C10.3818 6.31384 10.5632 7.01253 10.6501 7.72595C10.6771 7.89476 10.7085 8.07681 10.742 8.26446C10.892 8.09995 11.0803 7.96971 11.2951 7.88782C11.3028 7.88486 11.3107 7.88215 11.3187 7.87971C11.6723 7.7712 12.0464 7.74681 12.4112 7.80846L12.4254 7.81115C12.827 7.89511 13.1827 8.12609 13.4228 8.45879C13.4409 8.48386 13.4558 8.51108 13.4672 8.53981C13.4792 8.57006 13.4909 8.6004 13.5024 8.63083C13.7188 8.34513 14.0245 8.1391 14.3715 8.04602C14.3813 8.04339 14.3912 8.04116 14.4012 8.03933C14.7764 7.97073 15.1609 7.97073 15.5361 8.03933C15.5536 8.04252 15.5707 8.04694 15.5876 8.05257C15.9308 8.1673 16.231 8.38363 16.4484 8.67288C16.4683 8.69937 16.4846 8.72838 16.4969 8.75915C16.5669 8.93429 16.6283 9.11246 16.681 9.29302C16.8806 9.0362 17.1682 8.85404 17.4968 8.78787C17.9792 8.69073 18.4768 8.85835 18.8021 9.22758C19.1129 9.5802 19.2214 10.0655 19.0937 10.5147V12.7182C19.0937 12.726 19.0934 12.7338 19.0929 12.7415C19.0553 13.3454 18.9725 13.9456 18.8453 14.5371C18.8422 14.5516 18.8382 14.5659 18.8334 14.5799C18.6483 15.1192 18.3907 15.6308 18.0677 16.1007C18.0585 16.1141 18.0484 16.1269 18.0375 16.139C17.5859 16.6412 17.2113 17.2075 16.9258 17.8194C16.8635 18.1046 16.8359 18.3964 16.8435 18.6884L16.8438 18.6994C16.8429 18.9768 16.8788 19.253 16.9508 19.5209C16.9793 19.6268 16.9599 19.7399 16.8979 19.8304C16.8358 19.9209 16.7372 19.9796 16.6281 19.9911C16.193 20.0371 15.7543 20.0371 15.3192 19.9911C15.3134 19.9905 15.3075 19.9898 15.3016 19.9889C15.1041 19.9585 14.9371 19.8473 14.8154 19.7454C14.687 19.6379 14.5688 19.5062 14.4677 19.3792C14.2654 19.125 14.1012 18.8502 14.0289 18.7168L14.0229 18.7058C14.0221 18.7041 14.0206 18.7029 14.0187 18.7029C14.0168 18.7029 14.015 18.704 14.0142 18.7057C14.0125 18.7091 14.0107 18.7125 14.0089 18.7159C14.0071 18.7193 14.0052 18.7227 14.0032 18.7261C13.8846 18.9309 13.6943 19.2182 13.4836 19.4645C13.3785 19.5874 13.2605 19.7093 13.1367 19.8064C13.021 19.8972 12.8603 19.9985 12.6728 20.0206C12.3079 20.0641 11.7694 20.0631 11.2095 20.0532C11.022 20.0498 10.831 20.0455 10.6399 20.0411C10.2465 20.0322 9.85274 20.0232 9.48866 20.0232C9.37758 20.0232 9.27222 19.974 9.20097 19.8888C9.12985 19.8037 9.10015 19.6908 9.11962 19.5816C9.11962 19.5816 9.11961 19.5817 9.11962 19.5816C9.11963 19.5816 9.11959 19.5818 9.48866 19.6482L9.11962 19.5816ZM10.3906 8.96643C10.3907 8.96584 10.3908 8.96526 10.3909 8.96467L10.7587 9.03822L10.3903 8.96819C10.3904 8.96761 10.3905 8.96702 10.3906 8.96643Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M15.7587 16.8141V13.3623C15.7587 13.1557 15.5908 12.9882 15.3837 12.9882C15.1766 12.9882 15.0087 13.1557 15.0087 13.3623V16.8141C15.0087 17.0207 15.1766 17.1882 15.3837 17.1882C15.5908 17.1882 15.7587 17.0207 15.7587 16.8141Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M13.7787 16.8128L13.7587 13.3593C13.7575 13.1532 13.5886 12.987 13.3815 12.9882C13.1744 12.9894 13.0075 13.1575 13.0087 13.3636L13.0287 16.8171C13.0299 17.0233 13.1987 17.1894 13.4058 17.1882C13.6129 17.187 13.7799 17.019 13.7787 16.8128Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M11.0087 13.3672L11.0287 16.8136C11.0299 17.0217 11.1987 17.1894 11.4058 17.1882C11.613 17.187 11.7799 17.0173 11.7787 16.8092L11.7587 13.3628C11.7574 13.1547 11.5886 12.987 11.3815 12.9882C11.1744 12.9894 11.0075 13.1591 11.0087 13.3672Z", fill: "black" })] }));

const DataStack = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M1.93333 8C1.93333 4.64947 4.64947 1.93333 8 1.93333C11.3505 1.93333 14.0667 4.64947 14.0667 8C14.0667 8.79813 13.9128 9.55918 13.6335 10.2559C13.5376 10.4951 13.6538 10.7668 13.893 10.8627C14.1323 10.9586 14.4039 10.8424 14.4998 10.6032C14.8226 9.79786 15 8.91907 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C9.35306 15 10.6178 14.6156 11.6893 13.9499C11.9082 13.8139 11.9754 13.5262 11.8394 13.3073C11.7034 13.0884 11.4157 13.0211 11.1967 13.1572C10.2688 13.7337 9.17401 14.0667 8 14.0667C4.64947 14.0667 1.93333 11.3505 1.93333 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.7333 5.48003C11.7333 6.58297 9.85547 7.16006 8 7.16006C6.14453 7.16006 4.26667 6.58297 4.26667 5.48003C4.26667 4.37709 6.14453 3.8 8 3.8C9.85547 3.8 11.7333 4.37709 11.7333 5.48003ZM10.8 5.48003L10.7999 5.47861L10.7989 5.47635C10.7959 5.46968 10.7831 5.4451 10.7444 5.40553C10.6602 5.31969 10.4939 5.20485 10.2142 5.09232C9.65543 4.86757 8.84848 4.73333 8 4.73333C7.15152 4.73333 6.34457 4.86757 5.78585 5.09232C5.50608 5.20485 5.33977 5.31969 5.25564 5.40553C5.21685 5.4451 5.20415 5.46968 5.20113 5.47635C5.19982 5.47924 5.19992 5.47952 5.19992 5.47952V5.48054C5.19992 5.48054 5.19982 5.48081 5.20113 5.48371C5.20415 5.49037 5.21685 5.51496 5.25564 5.55453C5.33977 5.64037 5.50608 5.7552 5.78585 5.86774C6.34457 6.09249 7.15152 6.22673 8 6.22673C8.84848 6.22673 9.65543 6.09249 10.2142 5.86774C10.4939 5.7552 10.6602 5.64037 10.7444 5.55453C10.7831 5.51496 10.7959 5.49037 10.7989 5.48371C10.8002 5.48081 10.8 5.48003 10.8 5.48003Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.26667 7.1602C4.26667 8.26314 6.14453 8.84023 8 8.84023C9.85547 8.84023 11.7333 8.26314 11.7333 7.1602V6.32018C11.7333 7.42312 9.85547 8.00021 8 8.00021C6.14453 8.00021 4.26667 7.42312 4.26667 6.32018V7.1602Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8 10.52C6.14453 10.52 4.26667 9.94295 4.26667 8.84001V8C4.26667 9.10294 6.14453 9.68003 8 9.68003C9.85547 9.68003 11.7333 9.10294 11.7333 8V8.84001C11.7333 9.94295 9.85547 10.52 8 10.52Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.26667 10.5198C4.26667 11.6228 6.14453 12.1999 8 12.1999C9.85547 12.1999 11.7333 11.6228 11.7333 10.5198V9.67982C11.7333 10.7828 9.85547 11.3598 8 11.3598C6.14453 11.3598 4.26667 10.7828 4.26667 9.67982V10.5198Z", fill: "currentColor" })] }));

const Delete = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M8.5 8C8.5 7.72386 8.27614 7.5 8 7.5C7.72386 7.5 7.5 7.72386 7.5 8V12C7.5 12.2761 7.72386 12.5 8 12.5C8.27614 12.5 8.5 12.2761 8.5 12V8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M6 7.5C6.27614 7.5 6.5 7.72386 6.5 8V12C6.5 12.2761 6.27614 12.5 6 12.5C5.72386 12.5 5.5 12.2761 5.5 12V8C5.5 7.72386 5.72386 7.5 6 7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M10.5 8C10.5 7.72386 10.2761 7.5 10 7.5C9.72386 7.5 9.5 7.72386 9.5 8V12C9.5 12.2761 9.72386 12.5 10 12.5C10.2761 12.5 10.5 12.2761 10.5 12V8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.5 2C5.5 1.72386 5.72386 1.5 6 1.5H10C10.2761 1.5 10.5 1.72386 10.5 2V3.5H13C13.2761 3.5 13.5 3.72386 13.5 4V6C13.5 6.27614 13.2761 6.5 13 6.5H12.5V14C12.5 14.2761 12.2761 14.5 12 14.5H4C3.72386 14.5 3.5 14.2761 3.5 14V6.5H3C2.72386 6.5 2.5 6.27614 2.5 6V4C2.5 3.72386 2.72386 3.5 3 3.5H5.5V2ZM9.5 2.5V3.5H6.5V2.5H9.5ZM11.5 6.5H4.5V13.5H11.5V6.5ZM12.5 5.5V4.5H3.5V5.5H12.5Z", fill: "currentColor" })] }));

const Division = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M8 4.30769C8.51547 4.30769 8.93333 3.89442 8.93333 3.38462C8.93333 2.87481 8.51547 2.46154 8 2.46154C7.48453 2.46154 7.06667 2.87481 7.06667 3.38462C7.06667 3.89442 7.48453 4.30769 8 4.30769Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 2.92308C7.74227 2.92308 7.53333 3.12971 7.53333 3.38462C7.53333 3.63952 7.74227 3.84615 8 3.84615C8.25773 3.84615 8.46667 3.63952 8.46667 3.38462C8.46667 3.12971 8.25773 2.92308 8 2.92308ZM6.6 3.38462C6.6 2.61991 7.2268 2 8 2C8.7732 2 9.4 2.61991 9.4 3.38462C9.4 4.14932 8.7732 4.76923 8 4.76923C7.2268 4.76923 6.6 4.14932 6.6 3.38462Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1 8C1 7.7451 1.20893 7.53846 1.46667 7.53846H14.5333C14.7911 7.53846 15 7.7451 15 8C15 8.2549 14.7911 8.46154 14.5333 8.46154H1.46667C1.20893 8.46154 1 8.2549 1 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8 13.5385C8.51547 13.5385 8.93333 13.1252 8.93333 12.6154C8.93333 12.1056 8.51547 11.6923 8 11.6923C7.48453 11.6923 7.06667 12.1056 7.06667 12.6154C7.06667 13.1252 7.48453 13.5385 8 13.5385Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8 12.1538C7.74227 12.1538 7.53333 12.3605 7.53333 12.6154C7.53333 12.8703 7.74227 13.0769 8 13.0769C8.25773 13.0769 8.46667 12.8703 8.46667 12.6154C8.46667 12.3605 8.25773 12.1538 8 12.1538ZM6.6 12.6154C6.6 11.8507 7.2268 11.2308 8 11.2308C8.7732 11.2308 9.4 11.8507 9.4 12.6154C9.4 13.3801 8.7732 14 8 14C7.2268 14 6.6 13.3801 6.6 12.6154Z", fill: "currentColor" })] }));

const DocumentReuse = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("mask", { id: "mask0_1572_68", style: { maskType: 'alpha' }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "currentColor" }) }), jsxRuntimeExports.jsx("g", { mask: "url(#mask0_1572_68)", children: jsxRuntimeExports.jsx("path", { d: "M6.64099 11.1666H9.16666V10.1666H6.64099V11.1666ZM6.64099 8.49992H11.1667V7.49992H6.64099V8.49992ZM4.83333 5.83325H11.1667V4.83325H4.83333V5.83325ZM4.61533 14.3333C3.78466 14.3333 3.07699 14.042 2.49233 13.4596C1.90766 12.877 1.61533 12.1704 1.61533 11.3396C1.61533 10.7191 1.78244 10.1653 2.11666 9.67809C2.45088 9.19097 2.88466 8.83242 3.41799 8.60242H1.66666V7.60259H5.17949V11.1153H4.17949V9.38325C3.7256 9.4807 3.35144 9.71103 3.05699 10.0743C2.76255 10.4375 2.61533 10.8571 2.61533 11.3333C2.61533 11.8914 2.81088 12.3643 3.20199 12.7519C3.59299 13.1395 4.0641 13.3333 4.61533 13.3333V14.3333ZM6.64099 13.6666V12.6666H12.4615C12.5128 12.6666 12.5598 12.6452 12.6025 12.6024C12.6453 12.5598 12.6667 12.5128 12.6667 12.4614V3.53842C12.6667 3.48709 12.6453 3.44008 12.6025 3.39742C12.5598 3.35464 12.5128 3.33325 12.4615 3.33325H3.53849C3.48716 3.33325 3.44016 3.35464 3.39749 3.39742C3.35472 3.44008 3.33333 3.48709 3.33333 3.53842V6.14092H2.33333V3.53842C2.33333 3.20164 2.44999 2.91659 2.68333 2.68325C2.91666 2.44992 3.20171 2.33325 3.53849 2.33325H12.4615C12.7983 2.33325 13.0833 2.44992 13.3167 2.68325C13.55 2.91659 13.6667 3.20164 13.6667 3.53842V12.4614C13.6667 12.7982 13.55 13.0833 13.3167 13.3166C13.0833 13.5499 12.7983 13.6666 12.4615 13.6666H6.64099Z", fill: "currentColor" }) })] }));

const Document = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("mask", { id: "mask0_1572_64", style: { maskType: 'alpha' }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "currentColor" }) }), jsxRuntimeExports.jsx("g", { mask: "url(#mask0_1572_64)", children: jsxRuntimeExports.jsx("path", { d: "M4.83334 11.1666H9.16668V10.1666H4.83334V11.1666ZM4.83334 8.49992H11.1667V7.49992H4.83334V8.49992ZM4.83334 5.83325H11.1667V4.83325H4.83334V5.83325ZM3.53851 13.6666C3.20173 13.6666 2.91668 13.5499 2.68334 13.3166C2.45001 13.0833 2.33334 12.7982 2.33334 12.4614V3.53842C2.33334 3.20164 2.45001 2.91659 2.68334 2.68325C2.91668 2.44992 3.20173 2.33325 3.53851 2.33325H12.4615C12.7983 2.33325 13.0833 2.44992 13.3167 2.68325C13.55 2.91659 13.6667 3.20164 13.6667 3.53842V12.4614C13.6667 12.7982 13.55 13.0833 13.3167 13.3166C13.0833 13.5499 12.7983 13.6666 12.4615 13.6666H3.53851ZM3.53851 12.6666H12.4615C12.5128 12.6666 12.5598 12.6452 12.6025 12.6024C12.6453 12.5598 12.6667 12.5128 12.6667 12.4614V3.53842C12.6667 3.48709 12.6453 3.44008 12.6025 3.39742C12.5598 3.35464 12.5128 3.33325 12.4615 3.33325H3.53851C3.48718 3.33325 3.44018 3.35464 3.39751 3.39742C3.35473 3.44008 3.33334 3.48709 3.33334 3.53842V12.4614C3.33334 12.5128 3.35473 12.5598 3.39751 12.6024C3.44018 12.6452 3.48718 12.6666 3.53851 12.6666Z", fill: "currentColor" }) })] }));

const Download = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8.21314 14L14.2435 7.96968C14.444 7.76916 14.4422 7.44227 14.2395 7.23956C14.0368 7.03686 13.7099 7.03509 13.5094 7.23562L8.57661 12.1684L8.52022 1.73294C8.51867 1.44781 8.28628 1.21542 8.00115 1.21387C7.71603 1.21233 7.48613 1.44223 7.48767 1.72736L7.54407 12.1628L2.55766 7.17643C2.35495 6.97373 2.02807 6.97196 1.82754 7.17249C1.62701 7.37301 1.62878 7.6999 1.83149 7.90261L7.92891 14H1.5C1.22386 14 1 14.2239 1 14.5C1 14.7762 1.22386 15 1.5 15H14.5C14.7761 15 15 14.7762 15 14.5C15 14.2239 14.7761 14 14.5 14H8.21314Z", fill: "currentColor" }) }));

const Drag = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M6.02344 2.5C6.02344 3.32843 5.35186 4 4.52344 4C3.69501 4 3.02344 3.32843 3.02344 2.5C3.02344 1.67157 3.69501 1 4.52344 1C5.35186 1 6.02344 1.67157 6.02344 2.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M6 7.5C6 8.32843 5.32843 9 4.5 9C3.67157 9 3 8.32843 3 7.5C3 6.67157 3.67157 6 4.5 6C5.32843 6 6 6.67157 6 7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M6.02344 12.5C6.02344 13.3284 5.35186 14 4.52344 14C3.69501 14 3.02344 13.3284 3.02344 12.5C3.02344 11.6716 3.69501 11 4.52344 11C5.35186 11 6.02344 11.6716 6.02344 12.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M12.0234 2.5C12.0234 3.32843 11.3519 4 10.5234 4C9.69501 4 9.02344 3.32843 9.02344 2.5C9.02344 1.67157 9.69501 1 10.5234 1C11.3519 1 12.0234 1.67157 12.0234 2.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M12.0234 7.5C12.0234 8.32843 11.3519 9 10.5234 9C9.69501 9 9.02344 8.32843 9.02344 7.5C9.02344 6.67157 9.69501 6 10.5234 6C11.3519 6 12.0234 6.67157 12.0234 7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M12.0234 12.5C12.0234 13.3284 11.3519 14 10.5234 14C9.69501 14 9.02344 13.3284 9.02344 12.5C9.02344 11.6716 9.69501 11 10.5234 11C11.3519 11 12.0234 11.6716 12.0234 12.5Z", fill: "currentColor" })] }));

const Edit = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.6451 13.1435C6.47968 13.3089 6.2615 13.4111 6.02852 13.4323L2.5 13.753L2.82077 10.2245C2.84195 9.99155 2.94414 9.77337 3.10956 9.60795L9.92462 2.79289C10.3151 2.40237 10.9483 2.40237 11.3388 2.79289L13.4602 4.91421C13.8507 5.30474 13.8507 5.9379 13.4602 6.32843L6.6451 13.1435ZM9.21751 4.91422L10.6317 3.5L12.753 5.62132L11.3388 7.03554L9.21751 4.91422ZM8.5104 5.62133L10.6317 7.74265L5.93799 12.4364L3.60454 12.6485L3.81667 10.3151L8.5104 5.62133Z", fill: "black" }) }));

const Excel = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M3.64645 6.64645C3.84171 6.45118 4.15829 6.45118 4.35355 6.64645L5 7.29289L5.64645 6.64645C5.84171 6.45118 6.15829 6.45118 6.35355 6.64645C6.54882 6.84171 6.54882 7.15829 6.35355 7.35355L5.70711 8L6.35355 8.64645C6.54882 8.84171 6.54882 9.15829 6.35355 9.35355C6.15829 9.54882 5.84171 9.54882 5.64645 9.35355L5 8.70711L4.35355 9.35355C4.15829 9.54882 3.84171 9.54882 3.64645 9.35355C3.45118 9.15829 3.45118 8.84171 3.64645 8.64645L4.29289 8L3.64645 7.35355C3.45118 7.15829 3.45118 6.84171 3.64645 6.64645Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 2.5C2 1.67157 2.67157 1 3.5 1H13.5C14.3284 1 15 1.67157 15 2.5V13.5C15 14.3284 14.3284 15 13.5 15H3.5C2.67157 15 2 14.3284 2 13.5V12C1.44772 12 1 11.5523 1 11V5C1 4.44772 1.44772 4 2 4V2.5ZM3 13.5V12H8C8.55228 12 9 11.5523 9 11V10.5H12C12.2761 10.5 12.5 10.2761 12.5 10C12.5 9.72386 12.2761 9.5 12 9.5H9V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H9V6.5H12C12.2761 6.5 12.5 6.27614 12.5 6C12.5 5.72386 12.2761 5.5 12 5.5H9V5C9 4.44772 8.55228 4 8 4H3V2.5C3 2.22386 3.22386 2 3.5 2H13.5C13.7761 2 14 2.22386 14 2.5V13.5C14 13.7761 13.7761 14 13.5 14H3.5C3.22386 14 3 13.7761 3 13.5ZM2 5H8V11H2V5Z", fill: "currentColor" })] }));

const Expand = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M11.5 1C11.3143 1 11.1363 1.07375 11.005 1.20503C10.8737 1.3363 10.8 1.51435 10.8 1.7C10.8 1.88565 10.8737 2.0637 11.005 2.19497C11.1363 2.32625 11.3143 2.4 11.5 2.4H12.6102L9.6051 5.4051C9.47759 5.53712 9.40703 5.71394 9.40863 5.89748C9.41022 6.08102 9.48384 6.25659 9.61363 6.38637C9.74341 6.51616 9.91898 6.58978 10.1025 6.59137C10.2861 6.59297 10.4629 6.52241 10.5949 6.3949L13.6 3.3898V4.5C13.6 4.68565 13.6737 4.8637 13.805 4.99497C13.9363 5.12625 14.1143 5.2 14.3 5.2C14.4857 5.2 14.6637 5.12625 14.795 4.99497C14.9263 4.8637 15 4.68565 15 4.5V1.7C15 1.51435 14.9263 1.3363 14.795 1.20503C14.6637 1.07375 14.4857 1 14.3 1H11.5ZM2.4 12.6102V11.5C2.4 11.3143 2.32625 11.1363 2.19497 11.005C2.0637 10.8737 1.88565 10.8 1.7 10.8C1.51435 10.8 1.3363 10.8737 1.20503 11.005C1.07375 11.1363 1 11.3143 1 11.5V14.3C1 14.4857 1.07375 14.6637 1.20503 14.795C1.3363 14.9263 1.51435 15 1.7 15H4.5C4.68565 15 4.8637 14.9263 4.99497 14.795C5.12625 14.6637 5.2 14.4857 5.2 14.3C5.2 14.1143 5.12625 13.9363 4.99497 13.805C4.8637 13.6737 4.68565 13.6 4.5 13.6H3.3898L6.3949 10.5949C6.52241 10.4629 6.59297 10.2861 6.59137 10.1025C6.58978 9.91898 6.51616 9.74341 6.38637 9.61363C6.25659 9.48384 6.08102 9.41022 5.89748 9.40863C5.71394 9.40703 5.53712 9.47759 5.4051 9.6051L2.4 12.6102Z", fill: "currentColor" }) }));

const ExportFile = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M9.33332 1.33325V3.99992C9.33332 4.35354 9.4738 4.69268 9.72385 4.94273C9.9739 5.19278 10.313 5.33325 10.6667 5.33325H13.3333M7.99999 11.9999V7.99992M7.99999 11.9999L5.99999 9.99992M7.99999 11.9999L9.99999 9.99992M9.99999 1.33325H3.99999C3.64637 1.33325 3.30723 1.47373 3.05718 1.72378C2.80713 1.97382 2.66666 2.31296 2.66666 2.66659V13.3333C2.66666 13.6869 2.80713 14.026 3.05718 14.2761C3.30723 14.5261 3.64637 14.6666 3.99999 14.6666H12C12.3536 14.6666 12.6928 14.5261 12.9428 14.2761C13.1928 14.026 13.3333 13.6869 13.3333 13.3333V4.66659L9.99999 1.33325Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const EyeInvisible = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.99999 13.1696C7.33254 13.1696 6.703 13.0908 6.11137 12.9333C5.84734 12.8631 5.59085 12.7771 5.34192 12.6754C5.25155 12.6385 5.16217 12.5996 5.07379 12.5585L5.83361 11.7945L5.92734 11.7003C6.0221 11.7351 6.11819 11.7673 6.21561 11.797C6.76764 11.9648 7.36243 12.0487 7.99999 12.0487C10.4989 12.0487 12.3274 10.7752 13.6155 8.09438C13.1807 7.19066 12.6848 6.44697 12.1226 5.85754L12.0806 5.81394C12.0309 5.76273 11.9806 5.71272 11.9298 5.66389L12.635 4.95475L12.7175 4.87179C12.7635 4.91637 12.8092 4.96174 12.8544 5.00792C12.8731 5.027 12.8917 5.04622 12.9103 5.06557C13.0753 5.23763 13.2351 5.42047 13.3896 5.61408C13.8623 6.2062 14.2859 6.89908 14.6606 7.69273C14.7195 7.81807 14.75 7.95498 14.75 8.0936C14.75 8.23223 14.7195 8.36913 14.6606 8.49448C13.1959 11.6112 10.9757 13.1696 7.99999 13.1696ZM10.7004 5.86944L5.95203 10.6439L5.41156 11.1873L4.55799 12.0456L3.6218 12.9869L2.65047 13.9636C2.62724 13.9869 2.59575 14 2.56291 14C2.53008 14 2.49858 13.9869 2.47536 13.9636L1.81441 13.2989C1.7912 13.2756 1.77816 13.2439 1.77816 13.2109C1.77816 13.1779 1.7912 13.1462 1.81441 13.1229L2.74686 12.1855L3.45277 11.4759C3.28986 11.3281 3.13162 11.1707 2.97804 11.0037C2.35503 10.3261 1.80882 9.49019 1.3394 8.49604C1.28053 8.37069 1.25 8.23378 1.25 8.09516C1.25 7.95653 1.28053 7.81963 1.3394 7.69428C2.80405 4.57755 5.02425 3.01918 7.99999 3.01918C9.1649 3.01918 10.2141 3.25893 11.1477 3.73843L12.8411 2.03653C12.8526 2.02495 12.8662 2.01576 12.8813 2.00949C12.8963 2.00323 12.9124 2 12.9287 2C12.945 2 12.9611 2.00323 12.9761 2.00949C12.9912 2.01576 13.0048 2.02495 13.0163 2.03653L13.6764 2.70097C13.6879 2.71254 13.697 2.72628 13.7032 2.7414C13.7095 2.75651 13.7127 2.77272 13.7127 2.78909C13.7127 2.80546 13.7095 2.82166 13.7032 2.83678C13.697 2.8519 13.6879 2.86564 13.6764 2.8772L12.9008 3.65702L12.2023 4.35937L11.4145 5.15146L10.7004 5.86944ZM7.99999 4.14009C8.428 4.14009 8.83631 4.17752 9.22565 4.25303C9.60443 4.32648 9.96525 4.43597 10.3087 4.58207L9.5342 5.36089L9.25932 5.6373L9.22033 5.6765C9.07604 5.59909 8.9259 5.53531 8.77181 5.48549C8.37541 5.35731 7.95289 5.32151 7.53676 5.38374L7.50157 5.38924C7.07514 5.45874 6.6731 5.62887 6.32746 5.88343C6.21564 5.96578 6.10972 6.05697 6.01078 6.15645C5.80565 6.36272 5.63595 6.59919 5.50655 6.85615C5.37535 7.1167 5.28558 7.39831 5.24231 7.69086C5.22252 7.82471 5.2127 7.95921 5.21267 8.0933V8.0934C5.21262 8.37641 5.25618 8.65759 5.34163 8.92686C5.39145 9.08386 5.45551 9.23681 5.53347 9.38373L5.49099 9.42644L4.24192 10.6824C4.07274 10.5323 3.90909 10.3695 3.75085 10.1941C3.68276 10.1185 3.61568 10.0407 3.54958 9.96045C3.12021 9.43926 2.7327 8.81815 2.38448 8.09438C3.67417 5.41356 5.50266 4.14009 7.99999 4.14009ZM7.68422 6.3698C7.94664 6.33052 8.21463 6.35224 8.46756 6.43342L8.46405 6.43695L7.78386 7.1209L7.46832 7.43819L7.19662 7.71139L6.81513 8.09499L6.81507 8.09505L6.29331 8.61969L6.28623 8.62681C6.23156 8.45469 6.20382 8.27507 6.20402 8.09438C6.2041 8.00762 6.21062 7.92125 6.22341 7.83597C6.25107 7.65141 6.30809 7.47195 6.39277 7.30461C6.4766 7.13894 6.58595 6.98832 6.71629 6.85808C6.77844 6.79598 6.84537 6.73851 6.91657 6.68626C7.13711 6.52444 7.39249 6.4172 7.66199 6.37327L7.68422 6.3698ZM7.68789 10.8229C7.77086 10.8305 7.85417 10.8343 7.93755 10.8343H7.93809C8.02703 10.8343 8.11606 10.8298 8.20484 10.821C8.30519 10.811 8.40524 10.7954 8.50452 10.7742C8.66937 10.7389 8.82984 10.6884 8.98405 10.6239C9.31174 10.4868 9.61119 10.286 9.86444 10.0314L9.86829 10.0275C10.1215 9.77181 10.321 9.46957 10.4567 9.13894C10.5194 8.98607 10.5686 8.82714 10.6032 8.66393C10.6243 8.5641 10.6398 8.4635 10.6497 8.36259C10.6585 8.27332 10.6629 8.1838 10.663 8.09437V8.09384C10.663 8.01066 10.6593 7.92755 10.6518 7.84478C10.6292 7.59531 10.5727 7.34884 10.4826 7.11249L9.66486 7.93479C9.66966 7.98741 9.67213 8.0405 9.67213 8.09437C9.6722 8.2171 9.65937 8.3392 9.63404 8.45867C9.61211 8.56211 9.5808 8.66358 9.54039 8.76177C9.45329 8.97337 9.32556 9.16564 9.16452 9.32757L9.16065 9.33144C9.00042 9.49155 8.81058 9.61864 8.60182 9.70552C8.50279 9.74673 8.40042 9.77852 8.29604 9.80062C8.17862 9.82547 8.05866 9.83806 7.93809 9.83799C7.88452 9.83799 7.83172 9.8355 7.77939 9.83068L6.9616 10.653C7.19603 10.7433 7.44047 10.8001 7.68789 10.8229Z", fill: "currentColor" }) }));

const FileAlt = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M5 11.5C4.72386 11.5 4.5 11.7239 4.5 12C4.5 12.2761 4.72386 12.5 5 12.5L11 12.5C11.2761 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.2761 11.5 11 11.5L5 11.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.5 10C4.5 9.72386 4.72386 9.5 5 9.5H10C10.2761 9.5 10.5 9.72386 10.5 10C10.5 10.2761 10.2761 10.5 10 10.5H5C4.72386 10.5 4.5 10.2761 4.5 10Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5 7.5C4.72386 7.5 4.5 7.72386 4.5 8C4.5 8.27614 4.72386 8.5 5 8.5L8 8.5C8.27614 8.5 8.5 8.27614 8.5 8C8.5 7.72386 8.27614 7.5 8 7.5L5 7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.12966 2.15356C3.53483 1.73681 4.08741 1.5 4.66667 1.5H8.83333C8.96838 1.5 9.09769 1.55463 9.19183 1.65146L13.3585 5.93717C13.4492 6.03051 13.5 6.15554 13.5 6.28571V12.2857C13.5 12.8685 13.275 13.4302 12.8703 13.8464C12.4652 14.2632 11.9126 14.5 11.3333 14.5H4.66667C4.08741 14.5 3.53483 14.2632 3.12966 13.8464C2.72495 13.4302 2.5 12.8685 2.5 12.2857V3.71429C2.5 3.13149 2.72495 2.56983 3.12966 2.15356ZM4.66667 2.5H7.5V5C7.5 5.66304 7.76339 6.29893 8.23223 6.76777C8.70107 7.23661 9.33696 7.5 10 7.5H12.5V12.2857C12.5 12.6122 12.3738 12.9226 12.1533 13.1494C11.9334 13.3756 11.6381 13.5 11.3333 13.5H4.66667C4.36187 13.5 4.0666 13.3756 3.84665 13.1494C3.62624 12.9226 3.5 12.6122 3.5 12.2857V3.71429C3.5 3.38776 3.62624 3.07735 3.84665 2.85064C4.0666 2.62441 4.36187 2.5 4.66667 2.5ZM10 6.5H12.5V6.48871L8.62209 2.5H8.5V5C8.5 5.39782 8.65804 5.77936 8.93934 6.06066C9.22064 6.34196 9.60218 6.5 10 6.5Z", fill: "currentColor" })] }));

const FileUpload = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("mask", { id: "mask0_1547_20", style: { maskType: 'alpha' }, maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "16", height: "16", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "currentColor" }) }), jsxRuntimeExports.jsx("g", { mask: "url(#mask0_1547_20)", children: jsxRuntimeExports.jsx("path", { d: "M7.58203 11.8845H8.41797V7.82863L9.92279 9.32647L10.5123 8.7398L8 6.24647L5.50192 8.72568L6.09121 9.31235L7.58203 7.82863V11.8845ZM2.06271 14C1.77375 14 1.52439 13.894 1.31463 13.6819C1.10488 13.47 1 13.2235 1 12.9424V4.05765C1 3.77654 1.10488 3.53002 1.31463 3.31808C1.52439 3.10603 1.77375 3 2.06271 3H6.65803L7.86258 4.19882H13.9373C14.2197 4.19882 14.4674 4.30478 14.6804 4.51672C14.8935 4.72877 15 4.97536 15 5.25647V12.9424C15 13.2235 14.8935 13.47 14.6804 13.6819C14.4674 13.894 14.2197 14 13.9373 14H2.06271ZM2.06271 13.1678H13.9373C14.0034 13.1678 14.0576 13.1467 14.1001 13.1044C14.1426 13.0621 14.1639 13.0081 14.1639 12.9424V5.25647C14.1639 5.19059 14.1426 5.13651 14.1001 5.09422C14.0576 5.05193 14.0034 5.03078 13.9373 5.03078H7.52253L6.31797 3.83215H2.06271C1.99664 3.83215 1.94236 3.85329 1.89987 3.89558C1.85738 3.93787 1.83613 3.99189 1.83613 4.05765V12.9424C1.83613 13.0081 1.85738 13.0621 1.89987 13.1044C1.94236 13.1467 1.99664 13.1678 2.06271 13.1678Z", fill: "currentColor" }) })] }));

const FileUploader = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.64645 2.64645L4.46447 5.82843C4.2692 6.02369 4.2692 6.34027 4.46447 6.53553C4.65973 6.7308 4.97631 6.7308 5.17157 6.53553L7.5 4.20711V10C7.5 10.2761 7.72386 10.5 8 10.5C8.27614 10.5 8.5 10.2761 8.5 10V4.20711L10.8284 6.53553C11.0237 6.7308 11.3403 6.7308 11.5355 6.53553C11.7308 6.34027 11.7308 6.02369 11.5355 5.82843L8.35355 2.64645C8.15829 2.45118 7.84171 2.45118 7.64645 2.64645ZM3.5 9C3.5 8.72386 3.27614 8.5 3 8.5C2.72386 8.5 2.5 8.72386 2.5 9V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V9C13.5 8.72386 13.2761 8.5 13 8.5C12.7239 8.5 12.5 8.72386 12.5 9V12.5H3.5V9Z", fill: "currentColor" }) }));

const File = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M6 8.5C5.72386 8.5 5.5 8.72386 5.5 9C5.5 9.27614 5.72386 9.5 6 9.5H10C10.2761 9.5 10.5 9.27614 10.5 9C10.5 8.72386 10.2761 8.5 10 8.5H6Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.5 11C5.5 10.7239 5.72386 10.5 6 10.5H10C10.2761 10.5 10.5 10.7239 10.5 11C10.5 11.2761 10.2761 11.5 10 11.5H6C5.72386 11.5 5.5 11.2761 5.5 11Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M6 6.5C5.72386 6.5 5.5 6.72386 5.5 7C5.5 7.27614 5.72386 7.5 6 7.5L10 7.5C10.2761 7.5 10.5 7.27614 10.5 7C10.5 6.72386 10.2761 6.5 10 6.5L6 6.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13 14.5C13.2761 14.5 13.5 14.2761 13.5 14V2C13.5 1.72386 13.2761 1.5 13 1.5H5.5C5.36739 1.5 5.24021 1.55268 5.14645 1.64645L2.64645 4.14645C2.55268 4.24021 2.5 4.36739 2.5 4.5V14C2.5 14.2761 2.72386 14.5 3 14.5H13ZM3.5 13.5V4.70711L5.70711 2.5H12.5V13.5H3.5Z", fill: "currentColor" })] }));

const FillDetails = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.75 2.25C1.47386 2.25 1.25 2.47386 1.25 2.75C1.25 3.02614 1.47386 3.25 1.75 3.25H11.75C12.0261 3.25 12.25 3.02614 12.25 2.75C12.25 2.47386 12.0261 2.25 11.75 2.25H1.75ZM1.25 5.25C1.25 4.97386 1.47386 4.75 1.75 4.75H8.75C9.02614 4.75 9.25 4.97386 9.25 5.25C9.25 5.52614 9.02614 5.75 8.75 5.75H1.75C1.47386 5.75 1.25 5.52614 1.25 5.25ZM9.06518 13.2625C8.93288 13.3948 8.75838 13.4765 8.57205 13.4935L5.75 13.75L6.00655 10.9279C6.02349 10.7416 6.10522 10.5671 6.23752 10.4348L11.6881 4.98425C12.0004 4.67192 12.5068 4.67192 12.8192 4.98425L14.5157 6.68085C14.8281 6.99318 14.8281 7.49958 14.5157 7.81191L9.06518 13.2625ZM11.1226 6.68085L12.2536 5.54978L13.9502 7.24638L12.8191 8.37745L11.1226 6.68085ZM10.557 7.24638L12.2536 8.94298L8.49965 12.697L6.63339 12.8666L6.80305 11.0004L10.557 7.24638ZM1.25 7.75C1.25 7.47386 1.47386 7.25 1.75 7.25H6.75C7.02614 7.25 7.25 7.47386 7.25 7.75C7.25 8.02614 7.02614 8.25 6.75 8.25H1.75C1.47386 8.25 1.25 8.02614 1.25 7.75ZM1.75 9.75C1.47386 9.75 1.25 9.97386 1.25 10.25C1.25 10.5261 1.47386 10.75 1.75 10.75H4.75C5.02614 10.75 5.25 10.5261 5.25 10.25C5.25 9.97386 5.02614 9.75 4.75 9.75H1.75Z", fill: "currentColor" }) }));

const Filter = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.52506 9.67591V13.0029L8.96672 11.9873V9.46527C8.96672 9.46458 8.96669 9.46418 8.96668 9.46404L8.89181 9.06058L12.9979 3H3.00207L7.52506 9.67591ZM9.94991 9.28168L13.8258 3.5609C14.2757 2.89687 13.8 2 12.9979 2H3.00207C2.19998 2 1.7243 2.89687 2.17418 3.5609L6.52506 9.98277V13.0029C6.52506 13.8133 7.43846 14.2871 8.10096 13.8204L9.54263 12.8048C9.80853 12.6175 9.96672 12.3126 9.96672 11.9873V9.46527C9.96672 9.40256 9.96095 9.3412 9.94991 9.28168Z", fill: "currentColor" }) }));

const FtColour = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M0 8.38811L1.43032 9.81843L8.37188 2.87688L6.94156 1.44656L0 8.38811Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.32107 7.94156L4.75139 9.37188L11.6929 2.43032L10.2626 1L3.32107 7.94156Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M4.30964 12.6946L5.73996 14.1249L12.6815 7.18334L11.2512 5.75302L4.30964 12.6946Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M3.81005 10.3133L5.24037 11.7436L12.1819 4.80206L10.7516 3.37174L3.81005 10.3133Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M7.6259 12.2399L9.05459 13.6686L16 6.72322L14.5572 5.29453L7.6259 12.2399Z", fill: "currentColor" })] }));

const FtGray = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M0 8.38811L1.43032 9.81843L8.37188 2.87688L6.94156 1.44656L0 8.38811Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.32107 7.94156L4.75139 9.37188L11.6929 2.43032L10.2626 1L3.32107 7.94156Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.30964 12.6946L5.73996 14.1249L12.6815 7.18334L11.2512 5.75302L4.30964 12.6946Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.81005 10.3133L5.24037 11.7436L12.1819 4.80206L10.7516 3.37174L3.81005 10.3133Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M7.6259 12.2399L9.05459 13.6686L16 6.72322L14.5572 5.29453L7.6259 12.2399Z", fill: "currentColor" })] }));

const GoogleColour = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_1515_11)", children: [jsxRuntimeExports.jsx("path", { d: "M15.8093 8.14968C15.8093 7.49417 15.7561 7.01582 15.641 6.51976H8.15572V9.47841H12.5494C12.4609 10.2137 11.9825 11.321 10.9195 12.065L10.9046 12.1641L13.2713 13.9976L13.4353 14.0139C14.9412 12.6231 15.8093 10.5769 15.8093 8.14968Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.15572 15.945C10.3083 15.945 12.1153 15.2363 13.4353 14.0139L10.9195 12.065C10.2463 12.5345 9.34271 12.8623 8.15572 12.8623C6.04744 12.8623 4.25807 11.4716 3.6202 9.54931L3.52671 9.55725L1.06576 11.4618L1.03358 11.5513C2.3446 14.1556 5.03755 15.945 8.15572 15.945Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.6202 9.54931C3.4519 9.05325 3.35449 8.52171 3.35449 7.97252C3.35449 7.42327 3.4519 6.89179 3.61135 6.39572L3.60689 6.29008L1.11511 4.35493L1.03358 4.39371C0.493243 5.47444 0.183197 6.68806 0.183197 7.97252C0.183197 9.25698 0.493243 10.4705 1.03358 11.5513L3.6202 9.54931Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.15572 3.08269C9.65275 3.08269 10.6626 3.72934 11.2384 4.26974L13.4884 2.07286C12.1066 0.788397 10.3083 0 8.15572 0C5.03755 0 2.3446 1.78937 1.03358 4.39371L3.61135 6.39572C4.25807 4.47347 6.04744 3.08269 8.15572 3.08269Z", fill: "currentColor" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_1515_11", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const GoogleGray = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_1515_14)", children: [jsxRuntimeExports.jsx("path", { d: "M15.8093 8.14968C15.8093 7.49417 15.7561 7.01582 15.641 6.51976H8.15572V9.47841H12.5494C12.4609 10.2137 11.9825 11.321 10.9195 12.065L10.9046 12.1641L13.2713 13.9976L13.4353 14.0139C14.9412 12.6231 15.8093 10.5769 15.8093 8.14968Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.15572 15.945C10.3083 15.945 12.1153 15.2363 13.4353 14.0139L10.9195 12.065C10.2463 12.5345 9.34271 12.8623 8.15572 12.8623C6.04744 12.8623 4.25807 11.4716 3.6202 9.54931L3.52671 9.55725L1.06576 11.4618L1.03358 11.5513C2.3446 14.1556 5.03755 15.945 8.15572 15.945Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.6202 9.54931C3.4519 9.05325 3.35449 8.52171 3.35449 7.97252C3.35449 7.42327 3.4519 6.89179 3.61135 6.39572L3.60689 6.29008L1.11511 4.35493L1.03358 4.39371C0.493243 5.47444 0.183197 6.68806 0.183197 7.97252C0.183197 9.25698 0.493243 10.4705 1.03358 11.5513L3.6202 9.54931Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.15572 3.08269C9.65275 3.08269 10.6626 3.72934 11.2384 4.26974L13.4884 2.07285C12.1066 0.788397 10.3083 0 8.15572 0C5.03755 0 2.3446 1.78937 1.03358 4.39371L3.61135 6.39572C4.25807 4.47346 6.04744 3.08269 8.15572 3.08269Z", fill: "currentColor" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_1515_14", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const Gps = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M13 3L3 8L7 9.5L8 13L13 3Z", stroke: "currentColor" }) }));

const HamburgerMenu = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M3.5 12C3.5 11.7239 3.72386 11.5 4 11.5H12C12.2761 11.5 12.5 11.7239 12.5 12C12.5 12.2761 12.2761 12.5 12 12.5H4C3.72386 12.5 3.5 12.2761 3.5 12Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.5 8C3.5 7.72386 3.72386 7.5 4 7.5H12C12.2761 7.5 12.5 7.72386 12.5 8C12.5 8.27614 12.2761 8.5 12 8.5H4C3.72386 8.5 3.5 8.27614 3.5 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4 3.5C3.72386 3.5 3.5 3.72386 3.5 4C3.5 4.27614 3.72386 4.5 4 4.5H12C12.2761 4.5 12.5 4.27614 12.5 4C12.5 3.72386 12.2761 3.5 12 3.5H4Z", fill: "currentColor" })] }));

const Inbound = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.98953 8.35342L1.63604 7.99993L1.98925 7.64672C1.98948 7.64649 1.98971 7.64626 1.98994 7.64603L7.64645 1.98952C7.84171 1.79426 8.15829 1.79426 8.35355 1.98952C8.54881 2.18479 8.54881 2.50137 8.35355 2.69663L3.55025 7.49993L13.6569 7.49993C13.933 7.49993 14.1569 7.72379 14.1569 7.99993C14.1569 8.27607 13.933 8.49993 13.6569 8.49993L3.55025 8.49993L8.35355 13.3032C8.54882 13.4985 8.54882 13.8151 8.35355 14.0103C8.15829 14.2056 7.84171 14.2056 7.64645 14.0103L1.98965 8.35355C1.98961 8.3535 1.98957 8.35346 1.98953 8.35342Z", fill: "currentColor" }) }));

const Jio = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_1578_27)", children: [jsxRuntimeExports.jsx("path", { d: "M7.1338 0.050148C7.07909 0.0647365 6.98791 0.0756779 6.93321 0.0775015C6.8785 0.0775015 6.78732 0.0902665 6.73261 0.104855C6.67791 0.119444 6.60861 0.132209 6.57943 0.132209C6.44814 0.132209 5.54729 0.369273 5.35217 0.453157C5.32117 0.467745 5.27923 0.478687 5.25917 0.478687C5.23729 0.478687 5.21723 0.485981 5.20993 0.495099C5.20446 0.504217 5.17346 0.518805 5.14246 0.5261C5.10964 0.53157 5.07134 0.544335 5.05493 0.55163C5.04034 0.558924 4.99475 0.578983 4.95463 0.595395C4.91451 0.613631 4.85798 0.639161 4.83063 0.65375C4.80145 0.668338 4.76316 0.67928 4.74492 0.67928C4.72851 0.67928 4.70298 0.692044 4.69022 0.706633C4.67745 0.721222 4.65374 0.733987 4.63551 0.733987C4.61727 0.733987 4.59357 0.746752 4.5808 0.76134C4.56804 0.775929 4.54251 0.788694 4.52427 0.788694C4.50786 0.788694 4.4805 0.801459 4.46409 0.816047C4.4495 0.830636 4.4258 0.843401 4.40939 0.843401C4.3948 0.843401 4.37838 0.850695 4.37109 0.859813C4.36562 0.870754 4.31821 0.898108 4.26532 0.925461C4.21426 0.950991 4.15773 0.978345 4.14314 0.989286C4.12856 0.998404 4.04285 1.04764 3.95167 1.10052C3.86231 1.15341 3.78572 1.20264 3.78208 1.21176C3.77843 1.21906 3.76749 1.22635 3.75655 1.22635C3.73284 1.22635 3.38636 1.45612 3.32254 1.51265C3.29701 1.53636 3.27148 1.55459 3.26418 1.55459C3.24412 1.55459 3.07818 1.68224 3.07088 1.7023C3.06724 1.71142 3.05265 1.71871 3.03806 1.71871C3.02347 1.71871 3.01253 1.72601 3.01253 1.7333C3.01253 1.74242 2.97606 1.77524 2.93229 1.80625C2.79917 1.90289 2.72623 1.97037 2.36516 2.32961C1.96398 2.73262 1.86368 2.84021 1.86368 2.86392C1.86368 2.87486 1.85821 2.8858 1.84909 2.88945C1.8418 2.89127 1.8035 2.93503 1.76339 2.98609C1.72327 3.03533 1.6795 3.08457 1.66856 3.09186C1.6558 3.09916 1.64485 3.11374 1.64485 3.12469C1.64485 3.1338 1.63574 3.15204 1.62662 3.1648C1.57738 3.22134 1.42603 3.43287 1.42603 3.44199C1.42603 3.44746 1.41144 3.46934 1.3932 3.4894C1.37314 3.50764 1.34761 3.54775 1.33302 3.57511C1.32026 3.60246 1.28743 3.65352 1.2619 3.68817C1.2072 3.76476 1.17802 3.81217 1.15249 3.86141C1.14155 3.88147 1.11784 3.92159 1.09778 3.95259C1.07772 3.98176 1.05402 4.02553 1.0449 4.04741C1.03578 4.06747 1.01755 4.09118 1.00843 4.09847C0.997486 4.10394 0.988369 4.12583 0.988369 4.14589C0.988369 4.16412 0.981074 4.18053 0.970133 4.18053C0.961015 4.18053 0.94825 4.20059 0.940956 4.22612C0.935485 4.24983 0.919073 4.27901 0.904484 4.29177C0.889896 4.30271 0.878954 4.32642 0.878954 4.34465C0.878954 4.36289 0.866189 4.3866 0.851601 4.39936C0.837012 4.41213 0.824247 4.43401 0.824247 4.4486C0.824247 4.46319 0.811482 4.48689 0.796894 4.50148C0.782305 4.51789 0.76954 4.54525 0.76954 4.56166C0.76954 4.57989 0.756775 4.60542 0.742187 4.61819C0.727598 4.63095 0.714833 4.66013 0.714833 4.68384C0.714833 4.70754 0.707539 4.7276 0.696597 4.7276C0.68748 4.7276 0.672891 4.74949 0.66742 4.77684C0.660126 4.80602 0.643714 4.84431 0.630949 4.86437C0.61636 4.88443 0.605419 4.91726 0.605419 4.93914C0.605419 4.96102 0.596301 4.9829 0.58536 4.98655C0.574418 4.9902 0.561653 5.0139 0.55983 5.03761C0.556183 5.06314 0.541594 5.10691 0.525182 5.13791C0.50877 5.16708 0.496005 5.20356 0.496005 5.21632C0.496005 5.22909 0.48871 5.25279 0.479593 5.27103C0.424886 5.37497 0.255294 5.97128 0.195116 6.26852C0.178704 6.34876 0.153174 6.46182 0.138585 6.51835C0.123997 6.5767 0.113055 6.65512 0.113055 6.69159C0.113055 6.72988 0.103937 6.79006 0.0929958 6.82471C0.0820544 6.85936 0.0656423 6.97789 0.058348 7.08913C0.0492302 7.19854 0.0328181 7.34625 0.0237002 7.41737C-6.19143e-06 7.5742 -6.19143e-06 8.43492 0.0237002 8.58445C0.0328181 8.64463 0.0474066 8.78322 0.0565245 8.89446C0.0656423 9.00387 0.0820544 9.11876 0.0929958 9.14611C0.103937 9.17529 0.113055 9.23364 0.113055 9.27923C0.113055 9.32482 0.123997 9.41235 0.138585 9.47436C0.153174 9.53636 0.178704 9.65307 0.195116 9.7333C0.251646 9.9959 0.386591 10.481 0.435827 10.594C0.448592 10.625 0.459533 10.6633 0.459533 10.6779C0.459533 10.6925 0.472298 10.729 0.486887 10.7563C0.501475 10.7855 0.51424 10.8238 0.51424 10.8402C0.51424 10.8584 0.523358 10.873 0.532476 10.873C0.543418 10.873 0.550712 10.8967 0.550712 10.9259C0.550712 10.9551 0.563477 10.9879 0.578065 11.0007C0.592654 11.0134 0.609066 11.0499 0.61636 11.0846C0.621831 11.1192 0.634596 11.1466 0.643714 11.1466C0.652832 11.1466 0.660126 11.1666 0.660126 11.1903C0.660126 11.214 0.672891 11.2432 0.68748 11.256C0.702068 11.2687 0.714833 11.2943 0.714833 11.3125C0.714833 11.3289 0.727598 11.3563 0.742187 11.3727C0.756775 11.3873 0.76954 11.4146 0.76954 11.4347C0.76954 11.4548 0.782305 11.4803 0.796894 11.493C0.811482 11.5058 0.824247 11.5295 0.824247 11.5478C0.824247 11.566 0.837012 11.5897 0.851601 11.6025C0.866189 11.6152 0.878954 11.6408 0.878954 11.6608C0.878954 11.6791 0.891719 11.6991 0.906308 11.7046C0.920896 11.7119 0.933661 11.7301 0.933661 11.7483C0.933661 11.7684 0.942779 11.7885 0.953721 11.7939C0.962839 11.8012 0.981074 11.8249 0.990192 11.845C0.99931 11.8669 1.02302 11.9088 1.04308 11.9398C1.06313 11.969 1.08684 12.0109 1.09596 12.031C1.10508 12.0511 1.13243 12.0966 1.15614 12.1313C1.17984 12.1659 1.20537 12.2079 1.21267 12.2225C1.24184 12.2808 1.44061 12.5854 1.4625 12.6054C1.46797 12.6109 1.50262 12.662 1.54273 12.7185C1.58103 12.7768 1.61932 12.8243 1.62844 12.8243C1.63756 12.8243 1.64485 12.8352 1.64485 12.8461C1.64485 12.8589 1.67221 12.9008 1.70503 12.9373C1.73603 12.9738 1.77615 13.0212 1.79074 13.0431C1.8728 13.1616 2.79006 14.1008 2.8247 14.1008C2.83564 14.1008 2.84841 14.1135 2.8557 14.1281C2.86117 14.1427 2.87759 14.1555 2.89218 14.1555C2.90676 14.1555 2.92135 14.1628 2.925 14.1719C2.93776 14.2065 3.69819 14.7572 3.73466 14.7572C3.73831 14.7572 3.77661 14.7809 3.81855 14.8119C3.85867 14.8411 3.90426 14.8667 3.91884 14.8667C3.93161 14.8667 3.94255 14.8739 3.94255 14.8812C3.94255 14.8885 3.98814 14.9177 4.04285 14.9469C4.09755 14.9742 4.14679 15.0052 4.15226 15.0144C4.15956 15.0235 4.17962 15.0308 4.19967 15.0308C4.21791 15.0308 4.23432 15.0381 4.23432 15.0454C4.23432 15.0545 4.27991 15.08 4.33462 15.1055C4.38933 15.1292 4.43492 15.1548 4.43492 15.1621C4.43492 15.1712 4.44403 15.1767 4.45497 15.1767C4.47503 15.1767 4.70845 15.2824 4.8051 15.3335C4.83245 15.3481 4.86163 15.3572 4.87075 15.3517C4.87987 15.3463 4.89628 15.3535 4.90904 15.3681C4.92181 15.3827 4.94004 15.3955 4.95281 15.3955C4.97104 15.3955 5.0914 15.4393 5.22817 15.4958C5.39958 15.5669 6.08707 15.7657 6.2676 15.7967C6.31866 15.804 6.38249 15.8204 6.40984 15.8313C6.43902 15.8423 6.50102 15.8514 6.54843 15.8514C6.59585 15.8514 6.64326 15.8605 6.6542 15.8714C6.66514 15.8824 6.74173 15.8951 6.82561 15.9006C6.9095 15.9061 6.99521 15.9189 7.01344 15.9298C7.05903 15.9535 7.64622 15.9863 7.99999 15.9845C8.39936 15.9827 8.92454 15.9535 8.97013 15.928C8.99202 15.9152 9.06131 15.9061 9.12514 15.9061C9.18896 15.9043 9.27285 15.8933 9.31296 15.8787C9.35308 15.8641 9.42055 15.8514 9.46432 15.8514C9.50626 15.8514 9.57191 15.8386 9.60838 15.824C9.64303 15.8094 9.69409 15.7967 9.71962 15.7967C9.74515 15.7967 9.80715 15.7857 9.85821 15.7711C9.90927 15.7566 10.0588 15.7146 10.1883 15.6763C10.4873 15.5924 10.739 15.5104 10.8028 15.4757C10.8284 15.4611 10.8648 15.4502 10.8849 15.4502C10.9031 15.4502 10.9341 15.4374 10.9524 15.4228C10.9724 15.4083 11.0052 15.3955 11.0253 15.3955C11.0472 15.3955 11.08 15.3827 11.0982 15.3681C11.1183 15.3535 11.1493 15.3408 11.1675 15.3408C11.1858 15.3408 11.2004 15.3317 11.2004 15.3225C11.2004 15.3116 11.2095 15.3043 11.2204 15.3043C11.2514 15.3043 11.7456 15.0745 11.7657 15.0508C11.7711 15.0454 11.8113 15.0217 11.8568 14.9979C11.9024 14.9742 11.9644 14.9396 11.9936 14.9214C12.0246 14.9013 12.0647 14.8776 12.0848 14.8667C12.1048 14.8557 12.1468 14.832 12.176 14.8119C12.207 14.7919 12.2489 14.7664 12.2726 14.7554C12.2945 14.7426 12.3127 14.7262 12.3127 14.7171C12.3127 14.7098 12.32 14.7025 12.331 14.7025C12.3474 14.7025 12.4422 14.6405 12.6775 14.4746C12.8817 14.3323 12.9783 14.2594 12.9966 14.2375C13.0075 14.2266 13.0513 14.1883 13.0969 14.1536C13.2318 14.0497 13.2701 14.015 13.633 13.6503C14.067 13.2163 14.1363 13.1416 14.1363 13.1197C14.1363 13.1087 14.1418 13.0978 14.1509 13.0941C14.1618 13.0905 14.2074 13.034 14.3241 12.8881C14.3314 12.879 14.3916 12.7951 14.4554 12.7057C14.5193 12.6145 14.5977 12.507 14.6268 12.465C14.6578 12.4231 14.6834 12.3793 14.6834 12.3684C14.6834 12.3592 14.6907 12.3501 14.7016 12.3501C14.7107 12.3501 14.7235 12.3301 14.7308 12.3045C14.7363 12.279 14.749 12.2589 14.7581 12.2589C14.7673 12.2589 14.7837 12.2407 14.7928 12.217C14.8037 12.1951 14.8274 12.1514 14.8475 12.1222C14.8676 12.0912 14.8913 12.0492 14.9004 12.0274C14.9095 12.0073 14.9277 11.9836 14.9369 11.9763C14.9478 11.9708 14.9569 11.9508 14.9569 11.9307C14.9569 11.9125 14.9697 11.8942 14.9843 11.8869C14.9989 11.8815 15.0116 11.8614 15.0116 11.8413C15.0116 11.8231 15.0244 11.8031 15.039 11.7958C15.0536 11.7903 15.0663 11.7702 15.0663 11.752C15.0663 11.7319 15.0791 11.7064 15.0937 11.6936C15.1083 11.6809 15.121 11.6572 15.121 11.6389C15.121 11.6207 15.1338 11.597 15.1484 11.5842C15.163 11.5715 15.1757 11.5532 15.1757 11.5423C15.1757 11.5313 15.2013 11.4693 15.2323 11.4037C15.2906 11.2779 15.2961 11.2669 15.3581 11.1192C15.38 11.0682 15.4037 11.0116 15.4128 10.9916C15.4657 10.8639 15.6225 10.3916 15.6973 10.1345C15.7137 10.0743 15.7392 9.9886 15.752 9.94484C15.7666 9.89925 15.7775 9.84089 15.7775 9.81354C15.7775 9.78801 15.7903 9.73513 15.8049 9.70048C15.8195 9.66401 15.8322 9.59836 15.8322 9.55277C15.8322 9.509 15.845 9.44883 15.8596 9.42147C15.8742 9.39047 15.8869 9.32118 15.8869 9.25735C15.8869 9.19717 15.896 9.13882 15.907 9.12788C15.9179 9.11694 15.9343 9.00205 15.9435 8.87258C15.9526 8.74493 15.9672 8.59357 15.9763 8.53887C16 8.40757 15.9982 7.57237 15.9763 7.44472C15.9653 7.39002 15.9526 7.24595 15.9435 7.1256C15.9362 7.00524 15.9198 6.88853 15.9088 6.86665C15.8961 6.84477 15.8869 6.78094 15.8869 6.72441C15.8869 6.66971 15.8742 6.59312 15.8596 6.55664C15.845 6.522 15.8322 6.46 15.8322 6.41988C15.8322 6.38158 15.8195 6.31958 15.8049 6.28311C15.7903 6.24846 15.7775 6.1974 15.7775 6.17369C15.7775 6.14816 15.7648 6.08981 15.752 6.0424C15.7374 5.99681 15.7119 5.91292 15.6973 5.85822C15.5806 5.44609 15.3818 4.88625 15.2943 4.72396C15.2797 4.69843 15.2669 4.66378 15.2669 4.64737C15.2669 4.63095 15.2596 4.61819 15.2487 4.61819C15.2396 4.61819 15.2304 4.60178 15.2304 4.58354C15.2304 4.56348 15.2195 4.53613 15.2067 4.52336C15.1922 4.5106 15.1757 4.47595 15.1684 4.4486C15.163 4.42124 15.1484 4.39936 15.1393 4.39936C15.1283 4.39936 15.121 4.38295 15.121 4.36471C15.121 4.34465 15.1083 4.3173 15.0937 4.30089C15.0791 4.2863 15.0663 4.26259 15.0663 4.24983C15.0663 4.23524 15.0572 4.21518 15.0463 4.20424C15.0207 4.17871 14.9824 4.11306 14.9551 4.04741C14.9441 4.02006 14.9277 3.99818 14.9186 3.99818C14.9095 3.99818 14.9022 3.98176 14.9022 3.9617C14.9022 3.94165 14.8913 3.91976 14.8767 3.91429C14.8621 3.90882 14.8457 3.89059 14.8402 3.87417C14.8347 3.85776 14.8128 3.81764 14.7928 3.78847C14.7727 3.75746 14.7472 3.71552 14.7363 3.69182C14.7235 3.66993 14.7071 3.6517 14.698 3.6517C14.6907 3.6517 14.6834 3.64076 14.6834 3.62799C14.6834 3.61705 14.6305 3.53134 14.5648 3.44199C14.501 3.35081 14.4372 3.26328 14.4244 3.24504C14.4007 3.21222 14.3588 3.15569 14.3187 3.1101C14.3095 3.09733 14.3004 3.0791 14.3004 3.06998C14.3004 3.05904 14.2895 3.04445 14.2785 3.03715C14.2658 3.02986 14.222 2.98062 14.1819 2.93139C14.1418 2.88033 14.1035 2.83656 14.0962 2.83474C14.0871 2.83109 14.0816 2.82015 14.0816 2.80921C14.0816 2.80009 14.047 2.7545 14.005 2.70891C13.8391 2.53567 13.3394 2.04149 13.2628 1.97766C13.2209 1.94119 13.1425 1.87372 13.0896 1.83178C13.0385 1.78801 12.9747 1.73148 12.9473 1.70777C12.9218 1.68407 12.8945 1.66401 12.889 1.66401C12.8835 1.66401 12.8124 1.61659 12.734 1.55824C12.5316 1.41235 12.382 1.31206 12.2216 1.21176C12.145 1.16435 12.0684 1.11511 12.0483 1.10235C12.0283 1.09141 11.9954 1.07135 11.9754 1.06223C11.9553 1.05129 11.9152 1.02758 11.8842 1.00752C11.855 0.989286 11.7638 0.938226 11.6836 0.898108C11.6034 0.856166 11.525 0.816047 11.5104 0.808753C11.3991 0.748575 11.3645 0.733987 11.3389 0.733987C11.3225 0.733987 11.3098 0.726692 11.3098 0.715751C11.3098 0.706633 11.2879 0.692044 11.2605 0.686574C11.2314 0.67928 11.2022 0.668338 11.1912 0.661044C11.1821 0.65375 11.1493 0.642808 11.1183 0.635514C11.0891 0.628219 11.0581 0.613631 11.0526 0.604513C11.0472 0.593572 11.0198 0.584454 10.9925 0.580807C10.9651 0.578983 10.9341 0.566218 10.9232 0.555277C10.9104 0.542512 10.8904 0.533394 10.8758 0.533394C10.8612 0.533394 10.8247 0.522453 10.7937 0.507864C10.7609 0.493275 10.7189 0.478687 10.6989 0.473216C10.6788 0.467745 10.6059 0.442215 10.5348 0.418509C10.1099 0.268976 9.4242 0.112149 9.04855 0.0756779C8.96284 0.0683836 8.85707 0.0537951 8.81148 0.0428537C8.68019 0.0136766 7.2578 0.0191473 7.1338 0.050148ZM7.95258 3.79941C8.08935 3.84317 8.16776 3.87964 8.25712 3.94529C8.40847 4.05653 8.49236 4.17506 8.54889 4.36107C8.58354 4.47595 8.58171 4.85525 8.54706 4.97014C8.47048 5.22179 8.279 5.42238 8.01823 5.52086C7.93982 5.55003 7.87781 5.5555 7.58057 5.5555H7.23409L7.09733 5.48986C7.0025 5.44609 6.92956 5.39503 6.86391 5.32574C6.76908 5.22909 6.75085 5.20356 6.68885 5.0832C6.57032 4.85708 6.57943 4.44677 6.70891 4.19877C6.76179 4.09665 6.99156 3.87053 7.0408 3.87053C7.05721 3.87053 7.08091 3.86141 7.09003 3.85229C7.10097 3.84135 7.15021 3.82129 7.19945 3.80853C7.31433 3.77752 7.8614 3.77023 7.95258 3.79941ZM5.33211 4.51789C5.5637 4.55436 5.76065 4.65649 5.89742 4.80966C6.00501 4.93002 6.02324 4.95555 6.07066 5.05402L6.12172 5.15614L6.12719 6.94324C6.12901 8.17415 6.12536 8.77046 6.11078 8.85799C6.06519 9.15523 6.01413 9.37224 5.98313 9.40324C5.97401 9.41418 5.96671 9.43788 5.96671 9.45612C5.96671 9.47436 5.95577 9.51265 5.94118 9.53818C5.92842 9.56553 5.88648 9.64942 5.85001 9.72418C5.76612 9.89378 5.76247 9.90289 5.63482 10.0707C5.416 10.3661 5.05493 10.636 4.72669 10.7545C4.36015 10.884 4.19785 10.915 3.76019 10.9387C3.07089 10.977 2.31228 10.7527 1.93115 10.4007C1.55003 10.047 1.44608 9.66401 1.62662 9.27559C1.65944 9.20629 1.69227 9.14611 1.70138 9.14429C1.7105 9.14064 1.7178 9.1297 1.7178 9.11876C1.7178 9.09141 1.9038 8.86528 2.01504 8.75405C2.19375 8.58081 2.22293 8.57716 2.33052 8.72487C2.45634 8.89628 2.70799 9.07135 2.93959 9.14794C2.98518 9.16253 3.08912 9.18441 3.17301 9.19717C3.3043 9.21723 3.34807 9.21723 3.48301 9.1917C3.7219 9.14611 3.77478 9.12241 3.88784 9.01299C4.02826 8.87623 4.06655 8.78505 4.08844 8.52245C4.09756 8.40574 4.1085 7.60155 4.11579 6.73353C4.12673 4.9592 4.11579 5.07591 4.26715 4.88261C4.40756 4.70207 4.64827 4.56895 4.92728 4.51789C5.08958 4.48689 5.14976 4.48689 5.33211 4.51789ZM11.9936 5.89104C12.0647 5.90016 12.1504 5.91657 12.1851 5.92569C12.2197 5.93663 12.2981 5.96034 12.3583 5.97675C13.0075 6.16093 13.6129 6.66424 13.8974 7.25325C13.9321 7.32254 13.9704 7.40278 13.9831 7.43013C13.9977 7.45566 14.0087 7.49396 14.0087 7.5122C14.0087 7.53043 14.016 7.55414 14.0269 7.56508C14.036 7.5742 14.0524 7.61979 14.0615 7.66355C14.0725 7.70914 14.0889 7.78208 14.0998 7.82767C14.1509 8.03009 14.1582 8.08662 14.1673 8.3018C14.1728 8.44404 14.1691 8.57898 14.1545 8.6574C14.1436 8.72669 14.1272 8.82699 14.1181 8.87987C14.1108 8.93093 14.0944 9.00023 14.0834 9.03488C13.9886 9.32847 13.9521 9.4233 13.8774 9.56918C13.7132 9.88831 13.3832 10.2457 13.0258 10.4919C12.9017 10.5776 12.579 10.7454 12.537 10.7454C12.5243 10.7454 12.4878 10.7563 12.455 10.7709C12.3839 10.8019 12.2307 10.842 12.0337 10.8803C11.8404 10.9204 11.3079 10.9204 11.1147 10.8803C10.7773 10.8129 10.5803 10.7472 10.3433 10.6196C9.89651 10.3825 9.4552 9.9339 9.24732 9.50536C9.12878 9.261 9.10325 9.199 9.10325 9.15705C9.10325 9.137 9.09414 9.10235 9.08137 9.08047C9.07043 9.05858 9.05402 8.9984 9.0449 8.94917C9.0376 8.89811 9.02302 8.82152 9.0139 8.77593C8.9829 8.63916 8.99019 8.09391 9.02302 7.93709C9.05766 7.76567 9.09961 7.61796 9.13243 7.53955C9.14702 7.50672 9.15796 7.47208 9.15796 7.46296C9.15796 7.43378 9.28014 7.18395 9.32938 7.11101C9.35491 7.07272 9.37679 7.03624 9.37679 7.03077C9.37679 7.0253 9.43879 6.94324 9.51538 6.85024C9.86915 6.41258 10.305 6.11352 10.7809 5.9804C10.8356 5.96398 10.925 5.93845 10.9797 5.92387C11.0326 5.90745 11.1147 5.89287 11.1621 5.89287C11.2077 5.89104 11.2715 5.88375 11.3007 5.87645C11.3663 5.85822 11.8131 5.86733 11.9936 5.89104ZM7.93617 5.99134C8.22429 6.05699 8.45953 6.27764 8.54889 6.56759C8.56895 6.63688 8.57442 6.94871 8.57442 8.38386C8.57442 10.2348 8.57624 10.2001 8.48324 10.3807C8.43765 10.47 8.26441 10.6597 8.19329 10.6998C7.99635 10.8056 7.87234 10.8256 7.49851 10.8129C7.17574 10.8019 7.11192 10.7837 6.94779 10.6597C6.78914 10.5393 6.67244 10.3588 6.62502 10.1564C6.61043 10.0962 6.60496 9.57101 6.60496 8.39298C6.60496 6.5767 6.60314 6.61865 6.70526 6.41441C6.75632 6.31046 6.85297 6.19922 6.96056 6.12081C7.11739 6.0041 7.25051 5.97128 7.58057 5.97128C7.72099 5.96946 7.88146 5.9804 7.93617 5.99134Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M11.3918 7.39913C11.2624 7.42831 11.1529 7.46661 11.1238 7.49578C11.111 7.50855 11.0909 7.51767 11.0782 7.51767C11.0454 7.51767 10.8046 7.75473 10.7809 7.81126C10.7718 7.83497 10.7554 7.86779 10.7463 7.88238C10.6332 8.06656 10.5949 8.42216 10.6606 8.66651C10.7591 9.03305 10.9706 9.25006 11.3371 9.36312C11.6143 9.447 11.979 9.36312 12.196 9.16253C12.3784 8.99476 12.4769 8.79781 12.517 8.52428C12.5352 8.39663 12.5352 8.34557 12.5097 8.20333C12.4696 7.96626 12.393 7.81491 12.2307 7.65443C12.083 7.50672 11.9426 7.43013 11.7565 7.39731C11.5997 7.36813 11.5322 7.36813 11.3918 7.39913Z", fill: "currentColor" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_1578_27", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const LightBulb = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M15 14C15.2 13 15.7 12.3 16.5 11.5C17.5 10.6 18 9.3 18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 9 6.2 10.2 7.5 11.5C8.2 12.2 8.8 13 9 14M9 18H15M10 22H14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Link = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M4 3.5C3.72386 3.5 3.5 3.72386 3.5 4L3.5 12C3.5 12.2761 3.72386 12.5 4 12.5L12 12.5C12.2761 12.5 12.5 12.2761 12.5 12L12.5 8C12.5 7.72386 12.7239 7.5 13 7.5C13.2761 7.5 13.5 7.72386 13.5 8L13.5 12C13.5 12.8284 12.8284 13.5 12 13.5L4 13.5C3.17157 13.5 2.5 12.8284 2.5 12L2.5 4C2.5 3.17157 3.17157 2.5 4 2.5L8 2.5C8.27614 2.5 8.5 2.72386 8.5 3C8.5 3.27614 8.27614 3.5 8 3.5L4 3.5Z", fill: "black" }), jsxRuntimeExports.jsx("path", { d: "M10.5 3.5C10.2239 3.5 10 3.27614 10 3C10 2.72386 10.2239 2.5 10.5 2.5L12.9995 2.5C13.0005 2.5 13.002 2.50001 13.003 2.50001C13.1388 2.50081 13.2618 2.55575 13.3514 2.64434C13.3528 2.64574 13.3543 2.64715 13.3557 2.64858C13.4026 2.69602 13.438 2.75051 13.4621 2.80861C13.4865 2.86756 13.5 2.93221 13.5 3L13.5 5.5C13.5 5.77615 13.2761 6 13 6C12.7239 6 12.5 5.77615 12.5 5.5L12.5 4.20711L8.35355 8.35356C8.15829 8.54882 7.84171 8.54882 7.64645 8.35356C7.45118 8.15829 7.45118 7.84171 7.64645 7.64645L11.7929 3.5L10.5 3.5Z", fill: "black" })] }));

const Loading = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.134 4.13401 0.999998 8 0.999998C11.866 0.999998 15 4.134 15 8ZM2.33713 8C2.33713 11.1275 4.87248 13.6629 8 13.6629C11.1275 13.6629 13.6629 11.1275 13.6629 8C13.6629 4.87248 11.1275 2.33712 8 2.33712C4.87248 2.33712 2.33713 4.87248 2.33713 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M15 8C15 9.47787 14.5323 10.9178 13.6638 12.1136C12.7953 13.3094 11.5706 14.1996 10.1652 14.6567C8.75984 15.1138 7.24581 15.1144 5.84005 14.6584C4.43429 14.2024 3.20893 13.3132 2.3395 12.1181C1.47006 10.923 1.00118 9.48343 1 8.00556C0.998828 6.52768 1.46543 5.08735 2.33296 3.8909C3.20049 2.69445 4.42444 1.80326 5.82948 1.34501C7.23451 0.886761 8 0.999998 8 0.999998L7.97365 2.33718C7.97365 2.33718 7.38073 2.24552 6.24409 2.61624C5.10744 2.98695 4.11729 3.7079 3.41547 4.67581C2.71365 5.64372 2.33618 6.80892 2.33713 8.0045C2.33808 9.20007 2.7174 10.3647 3.42076 11.3315C4.12411 12.2983 5.11541 13.0176 6.25264 13.3865C7.38988 13.7555 8.61469 13.755 9.75164 13.3852C10.8886 13.0153 11.8793 12.2952 12.5819 11.3278C13.2845 10.3605 13.6629 9.19557 13.6629 8H15Z", fill: "currentColor" })] }));

const Location = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8 0.5C11.0077 0.5 13.5 3.11102 13.5 6.40039C13.4999 6.9777 13.3092 7.67328 12.9668 8.44531C12.6269 9.21169 12.1524 10.0203 11.6191 10.8125C10.8193 12.0006 9.90314 13.1308 9.15039 14.001L8.46191 14.7773C8.28357 14.9737 8.12662 15.1408 8 15.2754L7.53809 14.7773C6.72135 13.8782 5.44738 12.3968 4.38086 10.8125C3.84759 10.0203 3.37312 9.21169 3.0332 8.44531C2.6908 7.67328 2.50009 6.9777 2.5 6.40039C2.5 3.11102 4.99234 0.5 8 0.5ZM8 0.730469C5.08822 0.730469 2.7002 3.2529 2.7002 6.40039C2.7003 7.00917 2.93354 7.78127 3.35742 8.65723L3.55078 9.03906C3.95265 9.80037 4.45962 10.5834 4.99902 11.333L5.54688 12.0693C6.098 12.7888 6.6497 13.449 7.125 13.9932L7.57227 14.4961V14.4971L7.62891 14.5596L8 14.9697L8.37109 14.5596L8.42773 14.4971V14.4961C8.84314 14.0354 9.36116 13.4401 9.9043 12.7666L10.4531 12.0693C11.098 11.2275 11.7327 10.3158 12.2402 9.4209L12.4492 9.03906C12.9948 8.0055 13.2997 7.0961 13.2998 6.40039C13.2998 3.2529 10.9118 0.730469 8 0.730469ZM8 4.19238C9.03748 4.19238 9.90039 5.05896 9.90039 6.1543C9.90015 7.24942 9.03734 8.11523 8 8.11523C6.96266 8.11523 6.09985 7.24942 6.09961 6.1543C6.09961 5.05896 6.96252 4.19238 8 4.19238Z", stroke: "currentColor" }) }));

const Lock = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M4.66667 6.66683V4.66683C4.66667 3.78277 5.01786 2.93493 5.64298 2.30981C6.2681 1.68469 7.11594 1.3335 8 1.3335C8.88406 1.3335 9.7319 1.68469 10.357 2.30981C10.9821 2.93493 11.3333 3.78277 11.3333 4.66683V6.66683M8.66667 10.6668C8.66667 11.035 8.36819 11.3335 8 11.3335C7.63181 11.3335 7.33333 11.035 7.33333 10.6668C7.33333 10.2986 7.63181 10.0002 8 10.0002C8.36819 10.0002 8.66667 10.2986 8.66667 10.6668ZM3.33333 6.66683H12.6667C13.403 6.66683 14 7.26378 14 8.00016V13.3335C14 14.0699 13.403 14.6668 12.6667 14.6668H3.33333C2.59695 14.6668 2 14.0699 2 13.3335V8.00016C2 7.26378 2.59695 6.66683 3.33333 6.66683Z", stroke: "currentColor", strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Logout = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M10.6667 11.3333L14 8M14 8L10.6667 4.66667M14 8H6", stroke: "currentColor", strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Mail = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM12.7144 4L8 8.32187L3.28562 4H12.7144ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z", fill: "currentColor" }) }));

const Map$1 = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.28682 0.00081047C5.61047 -0.00745781 5.96662 0.0468548 6.26898 0.195182L6.27244 0.196879L10.237 2.17541C10.3302 2.22286 10.4901 2.25919 10.6822 2.25358C10.8739 2.24798 11.0339 2.20248 11.126 2.15015L12.8973 1.14013C13.6223 0.724824 14.4116 0.621328 15.0545 0.994616C15.6974 1.36791 16 2.10482 16 2.94358V10.2835C16 10.6502 15.8723 11.0159 15.6976 11.3154C15.5227 11.6151 15.2687 11.9037 14.9568 12.0851L14.9535 12.0871L11.6871 13.9579L11.6856 13.9587C11.3907 14.1264 11.0363 14.1987 10.7132 14.2069C10.3895 14.2152 10.0334 14.1609 9.73102 14.0126L9.72678 14.0105L5.76298 12.0248C5.66983 11.9773 5.50987 11.941 5.31779 11.9466C5.12612 11.9522 4.96615 11.9977 4.87398 12.0501L3.10266 13.0601C2.37773 13.4754 1.58842 13.5789 0.945515 13.2056C0.302617 12.8323 0 12.0954 0 11.2566V3.9167C0 3.55487 0.125136 3.19136 0.299254 2.89202C0.473536 2.59239 0.728605 2.30251 1.04649 2.12071L4.3144 0.249021C4.60925 0.0813575 4.96368 0.00906594 5.28682 0.00081047ZM4.87372 1.23266L1.60887 3.10261C1.50453 3.16223 1.37833 3.28737 1.27736 3.46096C1.17614 3.63498 1.13154 3.80329 1.13154 3.9167V11.2566C1.13154 11.8512 1.33812 12.1251 1.5137 12.2271C1.68912 12.3289 2.02788 12.3719 2.53997 12.0784L2.54106 12.0777L4.31381 11.0669C4.6064 10.9005 4.95987 10.8251 5.28476 10.8156C5.60876 10.8061 5.9685 10.8601 6.27476 11.0156L6.27662 11.0165L10.2294 12.9967L10.2311 12.9975C10.3288 13.0449 10.4923 13.0807 10.6843 13.0758C10.8775 13.0708 11.0358 13.0264 11.1257 12.9754L14.3878 11.1071L14.3891 11.1063C14.4919 11.046 14.6182 10.92 14.7202 10.7453C14.8227 10.5695 14.8685 10.3996 14.8685 10.2835V2.94358C14.8685 2.34905 14.6619 2.07511 14.4863 1.97316C14.3109 1.8713 13.9721 1.82834 13.46 2.12185L13.4589 2.12247L11.6862 3.13332C11.3936 3.29969 11.0401 3.37515 10.7152 3.38464C10.3914 3.39409 10.0319 3.34017 9.7257 3.18485L5.76924 1.21039C5.67162 1.16292 5.50791 1.12707 5.31572 1.13198C5.12257 1.13692 4.9637 1.18171 4.87372 1.23266Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.29563 0.49947C5.6081 0.49947 5.8614 0.752774 5.8614 1.06524V10.8719C5.8614 11.1844 5.6081 11.4377 5.29563 11.4377C4.98316 11.4377 4.72986 11.1844 4.72986 10.8719V1.06524C4.72986 0.752774 4.98316 0.49947 5.29563 0.49947Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.7044 2.47598C11.0169 2.47598 11.2702 2.72929 11.2702 3.04176V13.1351C11.2702 13.4476 11.0169 13.7009 10.7044 13.7009C10.3919 13.7009 10.1386 13.4476 10.1386 13.1351V3.04176C10.1386 2.72929 10.3919 2.47598 10.7044 2.47598Z", fill: "currentColor" })] }));

const More = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.92859 8C8.20473 8 8.42859 7.77614 8.42859 7.5C8.42859 7.22386 8.20473 7 7.92859 7C7.65245 7 7.42859 7.22386 7.42859 7.5C7.42859 7.77614 7.65245 8 7.92859 8ZM7.92859 9C8.75702 9 9.42859 8.32843 9.42859 7.5C9.42859 6.67157 8.75702 6 7.92859 6C7.10016 6 6.42859 6.67157 6.42859 7.5C6.42859 8.32843 7.10016 9 7.92859 9ZM2.5 8.00006C2.77614 8.00006 3 7.7762 3 7.50006C3 7.22392 2.77614 7.00006 2.5 7.00006C2.22386 7.00006 2 7.22392 2 7.50006C2 7.7762 2.22386 8.00006 2.5 8.00006ZM2.5 9.00006C3.32843 9.00006 4 8.32849 4 7.50006C4 6.67163 3.32843 6.00006 2.5 6.00006C1.67157 6.00006 1 6.67163 1 7.50006C1 8.32849 1.67157 9.00006 2.5 9.00006ZM14 7.5C14 7.77614 13.7761 8 13.5 8C13.2239 8 13 7.77614 13 7.5C13 7.22386 13.2239 7 13.5 7C13.7761 7 14 7.22386 14 7.5ZM15 7.5C15 8.32843 14.3284 9 13.5 9C12.6716 9 12 8.32843 12 7.5C12 6.67157 12.6716 6 13.5 6C14.3284 6 15 6.67157 15 7.5Z", fill: "currentColor" }) }));

const Mtnl = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M4.43686 6.98022C4.46496 7.02095 4.46496 7.02095 4.43686 6.98022V6.98022Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M3.21274 2.04019C3.2883 1.99437 3.37244 2.00643 3.45175 2C6.4544 2.00402 9.45704 1.99598 12.4597 2.00402C12.6253 1.96945 12.7191 2.19614 12.8177 2.35369C12.9361 2.57716 13.0819 2.76285 13.2078 2.97587C13.3102 3.16156 13.2571 3.41478 13.2646 3.63342C11.7657 3.63503 10.2673 3.62538 8.76841 3.63101C8.76145 4.08438 8.77377 4.53856 8.75394 4.99193C8.16499 4.99113 7.5755 5.00399 6.98655 4.99032C6.98387 4.53615 6.98655 4.08277 6.98547 3.6294C5.50264 3.62699 4.02034 3.63423 2.53751 3.63503C2.54769 3.40352 2.48767 3.11092 2.63343 2.94854C2.83868 2.66318 3.01124 2.33038 3.21274 2.04019Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M2.5472 3.7628C3.17099 3.76521 3.79424 3.7628 4.41749 3.76199C4.42606 3.97662 4.42606 4.19205 4.41802 4.40748C4.18652 4.4324 3.94107 4.36006 3.72189 4.50314C3.47913 4.65185 3.20903 4.70491 2.98878 4.92838C2.84462 5.04333 2.72404 5.23545 2.55148 5.24751C2.52576 4.75394 2.53219 4.25716 2.5472 3.7628ZM11.382 3.79816C12.0048 3.721 12.6323 3.7837 13.2572 3.76521C13.2657 3.97903 13.2663 4.19285 13.2582 4.40668C12.6366 4.45089 12.0128 4.40668 11.3906 4.40748C11.3767 4.20491 11.3761 4.00073 11.382 3.79816ZM5.00751 5.63898C5.04985 5.434 5.16936 5.2041 5.32745 5.21616C5.84888 5.21214 6.37084 5.21214 6.89281 5.21937C6.89442 5.78689 6.89656 6.3536 6.89067 6.92112C6.26152 6.93157 5.63237 6.92836 5.00323 6.92192C5.00644 6.49428 4.99412 6.06582 5.00751 5.63898ZM6.98445 5.23706C7.57608 5.17677 8.16879 5.26278 8.76096 5.23625C8.76685 5.79814 8.77703 6.36084 8.75399 6.92112C8.16396 6.93077 7.5734 6.93157 6.98284 6.92032C6.97909 6.35923 6.97641 5.79814 6.98445 5.23706ZM8.91369 5.21937C9.43351 5.21535 9.95333 5.21535 10.4726 5.21776C10.6173 5.21133 10.6934 5.44123 10.7861 5.57467C10.8204 6.02081 10.8006 6.47418 10.7904 6.92192C10.165 6.92836 9.53962 6.93237 8.91422 6.91951C8.90779 6.3528 8.91101 5.78609 8.91369 5.21937Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4.00852 5.40768C4.13821 5.31604 4.28237 5.31042 4.42277 5.3064C4.42117 5.86427 4.43242 6.42294 4.42117 6.98082C4.00799 7.57968 3.62428 8.23402 3.19449 8.80957C3.19449 9.92049 3.18967 11.0314 3.19556 12.1423C3.16877 12.4309 3.37241 12.5692 3.47209 12.7701C6.37881 12.7766 9.28499 12.7677 12.1912 12.775C12.3552 12.8168 12.45 12.5836 12.5459 12.4269C12.5706 11.6094 12.5502 10.7878 12.5572 9.96872C12.5497 9.55153 12.5743 9.13192 12.5449 8.71633C12.1789 8.10862 11.7689 7.5628 11.3959 6.96554C11.3611 6.41812 11.3793 5.85945 11.3916 5.308C11.5615 5.31444 11.7651 5.31042 11.8846 5.52344C12.2903 6.14642 12.7051 6.75493 13.1119 7.37551C13.2994 7.71071 13.51 8.01376 13.7314 8.29833C13.815 8.38434 13.7973 8.54752 13.8048 8.67855C13.8058 10.074 13.8021 11.4695 13.8069 12.865C13.8048 12.9896 13.8096 13.1174 13.7887 13.2396C13.6472 13.4606 13.4795 13.6415 13.3455 13.8746C13.2796 14.0233 13.1504 13.9904 13.0486 14C9.53365 13.992 6.01922 14.0105 2.50479 13.9904C2.35098 13.7275 2.17092 13.5008 2.01873 13.2364C1.9914 13.1174 2.00372 12.9888 1.99997 12.8658C2.00265 11.4703 2.00104 10.074 2.00051 8.67855C2.00586 8.54591 1.99193 8.38675 2.07232 8.29672C2.57177 7.54673 3.07391 6.79995 3.57123 6.04674C3.71271 5.82729 3.83382 5.57247 4.00852 5.40768ZM3.89491 6.853C3.92653 6.89882 3.92653 6.89882 3.89491 6.853V6.853Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.01335 7.06665C5.63929 7.07067 6.26629 7.03611 6.89115 7.08595C6.90079 7.6406 6.89329 8.19606 6.89168 8.75152C6.26307 8.8094 5.63232 8.76519 5.00264 8.77805C5.00371 8.20812 4.99245 7.63658 5.01335 7.06665ZM6.98386 7.07791C7.57281 7.05459 8.16391 7.04495 8.75286 7.08273C8.7743 7.64542 8.77537 8.21133 8.75126 8.77403C8.16284 8.77725 7.57388 8.79413 6.986 8.76278C6.97689 8.20088 6.97528 7.63899 6.98386 7.07791ZM8.91524 7.06987C9.53956 7.05299 10.1644 7.06505 10.7893 7.06424C10.8075 7.63497 10.8086 8.20732 10.7898 8.77805C10.1676 8.77564 9.546 8.7877 8.92382 8.76921C8.90131 8.2033 8.91095 7.63578 8.91524 7.06987ZM5.01068 8.91068C5.63768 8.92194 6.26629 8.8713 6.89115 8.93962C6.8949 9.38817 6.89276 9.83592 6.89597 10.2845C6.26468 10.3206 5.63232 10.2901 5.00049 10.3013C5.00746 9.83752 4.99245 9.3737 5.01068 8.91068ZM6.98493 8.92194C7.57388 8.89541 8.16337 8.90747 8.75233 8.91229C8.77912 9.37049 8.75929 9.83029 8.76733 10.2893C8.17302 10.3062 7.57764 10.311 6.98279 10.2845C6.9785 9.83029 6.97743 9.37611 6.98493 8.92194ZM8.91631 8.91631C9.54064 8.90023 10.1655 8.91068 10.7898 8.90747C10.8139 9.36968 10.793 9.8335 10.8075 10.2965C10.1741 10.3158 9.54064 10.274 8.9072 10.3005C8.91524 9.83913 8.90881 9.37692 8.91631 8.91631ZM5.01389 10.52C5.63929 10.5224 6.26468 10.5144 6.89008 10.5264C6.89758 11.0594 6.89222 11.5923 6.8949 12.1253C6.26843 12.1647 5.64036 12.1534 5.01389 12.1237C4.9946 11.5899 4.99674 11.0537 5.01389 10.52ZM6.98493 10.5248C7.57442 10.5192 8.16391 10.516 8.7534 10.5232C8.77644 11.0586 8.76412 11.5947 8.76573 12.1309C8.17248 12.1639 7.57871 12.1406 6.98547 12.1446C6.97796 11.6044 6.97689 11.0642 6.98493 10.5248ZM8.91149 10.5184C9.54117 10.5168 10.1709 10.5168 10.8005 10.5208C10.8 11.057 10.8118 11.5931 10.7914 12.1277C10.1639 12.1397 9.53635 12.159 8.90881 12.1277C8.91471 11.5915 8.91042 11.0546 8.91149 10.5184Z", fill: "currentColor" })] }));

const MultipleLocation = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.8088 10.5555C9.77265 10.5163 9.73615 10.4766 9.69933 10.4363C9.54658 10.6792 9.38039 10.9296 9.20074 11.1874C9.4328 11.437 9.64831 11.6602 9.83444 11.8488L9.87556 11.8904L9.87751 11.8923C10.0329 12.0491 10.166 12.18 10.2688 12.2796C10.415 12.4214 10.4998 12.5 10.4998 12.5C10.4998 12.5 10.5846 12.4214 10.7309 12.2796C10.8336 12.18 10.9667 12.0491 11.1221 11.8923L11.1241 11.8904L11.1646 11.8494C11.582 11.4265 12.1479 10.8285 12.716 10.1517C13.2796 9.48027 13.846 8.73079 14.2737 7.9961C14.7083 7.24965 14.9998 6.51847 14.9998 5.9C14.9998 3.46995 12.9851 1.5 10.4998 1.5C9.35091 1.5 8.30256 1.921 7.50732 2.61382C7.84746 2.69204 8.1729 2.809 8.47881 2.95985C9.05886 2.57128 9.75692 2.34615 10.4998 2.34615C12.4551 2.34615 14.0998 3.90568 14.0998 5.9C14.0998 6.29332 13.9059 6.85783 13.5052 7.55359C13.1169 8.22801 12.588 8.93522 12.0421 9.58852C11.7521 9.93561 11.4614 10.2625 11.1908 10.5555C10.9733 10.791 10.7689 11.0046 10.5883 11.189L10.5422 11.236L10.4998 11.2789L10.4962 11.2753L10.4575 11.236L10.4113 11.189C10.2307 11.0046 10.0263 10.791 9.8088 10.5555ZM12.2998 5.73077C12.2998 6.50886 11.7413 7.1643 10.9806 7.36204C10.9934 7.24604 10.9998 7.13361 10.9998 7.02475C10.9998 6.78081 10.9806 6.54138 10.9437 6.30789C11.172 6.17372 11.2998 5.94326 11.2998 5.73077C11.2998 5.41548 11.0185 5.06064 10.5447 5.03946C10.3834 4.70785 10.183 4.39901 9.94951 4.11901C10.123 4.0667 10.3079 4.03846 10.4998 4.03846C11.4939 4.03846 12.2998 4.79613 12.2998 5.73077ZM3.9577 11.5885C4.24776 11.9356 4.53846 12.2625 4.80898 12.5555C5.02647 12.791 5.23092 13.0046 5.41149 13.189L5.45764 13.236L5.5 13.279L5.54236 13.236L5.58851 13.189C5.76908 13.0046 5.97353 12.791 6.19102 12.5555C6.46154 12.2625 6.75224 11.9356 7.0423 11.5885C7.58823 10.9352 8.11708 10.228 8.50541 9.55359C8.90604 8.85783 9.1 8.29332 9.1 7.9C9.1 5.90568 7.45528 4.34615 5.5 4.34615C3.54472 4.34615 1.9 5.90568 1.9 7.9C1.9 8.29332 2.09396 8.85783 2.49459 9.55359C2.88292 10.228 3.41177 10.9352 3.9577 11.5885ZM5.5 14.5C5.5 14.5 5.41522 14.4214 5.26894 14.2796C5.16618 14.18 5.03308 14.0491 4.87769 13.8923L4.87574 13.8904L4.83526 13.8494C4.41782 13.4265 3.85194 12.8285 3.28382 12.1517C2.72025 11.4803 2.15386 10.7308 1.7261 9.9961C1.29149 9.24965 1 8.51847 1 7.9C1 5.46995 3.01472 3.5 5.5 3.5C7.98528 3.5 10 5.46995 10 7.9C10 8.51847 9.70851 9.24965 9.2739 9.9961C8.84614 10.7308 8.27975 11.4803 7.71618 12.1517C7.14806 12.8285 6.58282 13.4259 6.16537 13.8488L6.12426 13.8904L6.12232 13.8923C5.96693 14.0491 5.83382 14.18 5.73107 14.2796C5.58478 14.4214 5.5 14.5 5.5 14.5ZM6.3 7.73077C6.3 8.0559 6.00084 8.42308 5.5 8.42308C4.99916 8.42308 4.7 8.0559 4.7 7.73077C4.7 7.40564 4.99916 7.03846 5.5 7.03846C6.00084 7.03846 6.3 7.40564 6.3 7.73077ZM5.5 9.42308C6.49411 9.42308 7.3 8.6654 7.3 7.73077C7.3 6.79613 6.49411 6.03846 5.5 6.03846C4.50589 6.03846 3.7 6.79613 3.7 7.73077C3.7 8.6654 4.50589 9.42308 5.5 9.42308Z", fill: "currentColor" }) }));

const MultipleTime = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.2142 8.59104C11.2142 11.3883 9.00023 13.6559 6.26918 13.6559C3.53813 13.6559 1.32417 11.3883 1.32417 8.59104C1.32417 5.79382 3.53813 3.52622 6.26918 3.52622C9.00023 3.52622 11.2142 5.79382 11.2142 8.59104ZM12.0384 8.59104C12.0384 11.8545 9.45541 14.5 6.26918 14.5C3.08295 14.5 0.5 11.8545 0.5 8.59104C0.5 5.32761 3.08295 2.68208 6.26918 2.68208C9.45541 2.68208 12.0384 5.32761 12.0384 8.59104ZM6.68104 5.63633C6.68104 5.40323 6.49655 5.21427 6.26896 5.21427C6.04137 5.21427 5.85687 5.40323 5.85687 5.63633V8.83575L8.9491 10.6455C9.1467 10.7612 9.39842 10.6909 9.51134 10.4885C9.62425 10.2861 9.5556 10.0283 9.358 9.91263L6.68104 8.34588V5.63633Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.5544 11.5675C13.8367 10.6524 14.6758 9.13106 14.6758 7.40896C14.6758 4.61174 12.4619 2.34414 9.73082 2.34414C9.67134 2.34414 9.6121 2.34521 9.55313 2.34735C9.0912 2.09192 8.59769 1.8887 8.08016 1.74541C8.60312 1.58575 9.1572 1.5 9.73082 1.5C12.9171 1.5 15.5 4.14553 15.5 7.40896C15.5 9.9541 13.929 12.1234 11.7259 12.955C12.0512 12.5289 12.33 12.0637 12.5544 11.5675Z", fill: "currentColor" })] }));

const MultipleWeight = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_916_22)", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.53334 3.10494C8.53334 2.21856 9.25396 1.5 10.1429 1.5C11.0318 1.5 11.7524 2.21856 11.7524 3.10494C11.7524 3.58429 11.5417 4.01456 11.2075 4.30864H12.7632C13.1186 4.30864 13.4319 4.54109 13.5341 4.88052L15.4655 11.3003C15.6204 11.8152 15.2338 12.3333 14.6947 12.3333H11.565L11.2647 11.5309H14.6947L12.7632 5.11111H8.14225C8.21358 4.90209 8.2522 4.6785 8.2522 4.44611C8.2522 4.39992 8.25068 4.35409 8.24767 4.30864H9.07824C8.74409 4.01456 8.53334 3.58429 8.53334 3.10494ZM10.1429 2.30247C9.69843 2.30247 9.33811 2.66175 9.33811 3.10494C9.33811 3.54813 9.69843 3.90741 10.1429 3.90741C10.5874 3.90741 10.9477 3.54813 10.9477 3.10494C10.9477 2.66175 10.5874 2.30247 10.1429 2.30247Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.24755 5.27161C4.24755 4.38522 4.96817 3.66667 5.85711 3.66667C6.74604 3.66667 7.46667 4.38522 7.46667 5.27161C7.46667 5.75096 7.25591 6.18123 6.92176 6.47531H8.47744C8.83284 6.47531 9.14616 6.70776 9.24828 7.04719L11.1797 13.4669C11.3347 13.9818 10.948 14.5 10.4089 14.5H1.30531C0.766215 14.5 0.379562 13.9818 0.534468 13.4669L2.46594 7.04719C2.56806 6.70776 2.88138 6.47531 3.23677 6.47531H4.79246C4.45831 6.18123 4.24755 5.75096 4.24755 5.27161ZM5.85711 4.46914C5.41264 4.46914 5.05233 4.82841 5.05233 5.27161C5.05233 5.7148 5.41264 6.07407 5.85711 6.07407C6.30158 6.07407 6.66189 5.7148 6.66189 5.27161C6.66189 4.82841 6.30158 4.46914 5.85711 4.46914ZM3.23677 7.27778L1.30531 13.6975H10.4089L8.47744 7.27778H3.23677Z", fill: "currentColor" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_916_22", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const Navigator = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M12.8627 4.86362C12.7317 4.73449 12.5627 4.65091 12.3806 4.62521C12.1985 4.59951 12.0129 4.63305 11.8513 4.72088L7.99938 6.75995L4.14747 4.72088C3.98584 4.63314 3.8003 4.59964 3.61819 4.62534C3.43609 4.65104 3.26705 4.73457 3.13602 4.86362L3.12448 4.87516C2.99577 5.00149 2.91013 5.16517 2.87975 5.34294C2.84936 5.52071 2.87576 5.70354 2.9552 5.86545L7.21376 15.1424C7.21495 15.1452 7.21636 15.1479 7.218 15.1505C7.28943 15.297 7.40053 15.4204 7.53866 15.5068C7.67679 15.5933 7.83641 15.6392 7.99936 15.6394C8.1623 15.6396 8.32203 15.5941 8.46038 15.508C8.59872 15.4219 8.71013 15.2987 8.78192 15.1524L8.78615 15.1443L13.0436 5.86545C13.1242 5.70101 13.1502 5.51509 13.1176 5.33484C13.0851 5.1546 12.9958 4.98948 12.8627 4.86362Z", fill: "currentColor" }) }));

const Notification = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.90388 2H8.09612C9.93159 2 11.5315 3.24919 11.9767 5.02986L13.7192 12H2.28078L4.02331 5.02986C4.46848 3.24919 6.06841 2 7.90388 2ZM5.17071 13H1L3.05317 4.78732C3.60963 2.56149 5.60954 1 7.90388 1H8.09612C10.3905 1 12.3904 2.56149 12.9468 4.78732L15 13H10.8293C10.4175 14.1652 9.30622 15 8 15C6.69378 15 5.58254 14.1652 5.17071 13ZM9.73244 13H6.26756C6.61337 13.5978 7.25972 14 8 14C8.74028 14 9.38663 13.5978 9.73244 13Z", fill: "currentColor" }) }));

const Organisation = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.5 4.5C9.5 5.15567 9.07932 5.71308 8.49315 5.91705C8.49766 5.94403 8.5 5.97174 8.5 6V7.5H11.5C12.3284 7.5 13 8.17157 13 9V10.0854C13.5826 10.2913 14 10.8469 14 11.5C14 12.3284 13.3284 13 12.5 13C11.6716 13 11 12.3284 11 11.5C11 10.8469 11.4174 10.2913 12 10.0854V9C12 8.72386 11.7761 8.5 11.5 8.5H8.5V10C8.5 10.0283 8.49766 10.056 8.49315 10.083C9.07932 10.2869 9.5 10.8443 9.5 11.5C9.5 12.3284 8.82843 13 8 13C7.17157 13 6.5 12.3284 6.5 11.5C6.5 10.8443 6.92068 10.2869 7.50685 10.083C7.50234 10.056 7.5 10.0283 7.5 10V8.5H4.5C4.22386 8.5 4 8.72386 4 9V10.0854C4.5826 10.2913 5 10.8469 5 11.5C5 12.3284 4.32843 13 3.5 13C2.67157 13 2 12.3284 2 11.5C2 10.8469 2.4174 10.2913 3 10.0854V9C3 8.17157 3.67157 7.5 4.5 7.5H7.5V6C7.5 5.97174 7.50234 5.94403 7.50685 5.91705C6.92068 5.71308 6.5 5.15567 6.5 4.5C6.5 3.67157 7.17157 3 8 3C8.82843 3 9.5 3.67157 9.5 4.5ZM8.5 4.5C8.5 4.77614 8.27614 5 8 5C7.72386 5 7.5 4.77614 7.5 4.5C7.5 4.22386 7.72386 4 8 4C8.27614 4 8.5 4.22386 8.5 4.5ZM3.5 11C3.22386 11 3 11.2239 3 11.5C3 11.7761 3.22386 12 3.5 12C3.77614 12 4 11.7761 4 11.5C4 11.2239 3.77614 11 3.5 11ZM12.5 11C12.2239 11 12 11.2239 12 11.5C12 11.7761 12.2239 12 12.5 12C12.7761 12 13 11.7761 13 11.5C13 11.2239 12.7761 11 12.5 11ZM8 12C8.27614 12 8.5 11.7761 8.5 11.5C8.5 11.2239 8.27614 11 8 11C7.72386 11 7.5 11.2239 7.5 11.5C7.5 11.7761 7.72386 12 8 12Z", fill: "currentColor" }) }));

const Outbound = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14.0105 7.64572L14.364 7.99922L14.0108 8.35242C14.0105 8.35265 14.0103 8.35288 14.0101 8.35312L8.35355 14.0096C8.15829 14.2049 7.84171 14.2049 7.64645 14.0096C7.45118 13.8144 7.45118 13.4978 7.64645 13.3025L12.4497 8.49922L2.34315 8.49922C2.067 8.49922 1.84315 8.27536 1.84315 7.99922C1.84314 7.72307 2.067 7.49922 2.34314 7.49922L12.4497 7.49922L7.64645 2.69591C7.45118 2.50065 7.45118 2.18407 7.64645 1.98881C7.84171 1.79355 8.15829 1.79355 8.35355 1.98881L14.0103 7.6456C14.0104 7.64564 14.0104 7.64568 14.0105 7.64572Z", fill: "currentColor" }) }));

const Password = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M8.00065 8H8.00732M11.334 8H11.3407M4.66732 8H4.67398M2.66732 4H13.334C14.0704 4 14.6673 4.59695 14.6673 5.33333V10.6667C14.6673 11.403 14.0704 12 13.334 12H2.66732C1.93094 12 1.33398 11.403 1.33398 10.6667V5.33333C1.33398 4.59695 1.93094 4 2.66732 4Z", stroke: "currentColor", strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Pen = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.55713 12.9286L4.68137 11.6367C4.37351 11.5341 4.14124 11.2786 4.06826 10.9624L2 2L10.9625 4.06826C11.2787 4.14123 11.5341 4.3735 11.6368 4.68136L12.9287 8.55719L13.7272 9.3557C14.0909 9.71949 14.0909 10.3093 13.7272 10.6731L10.6731 13.7272C10.3093 14.0909 9.71947 14.0909 9.35568 13.7272L8.55713 12.9286ZM3.46139 4.1899L4.97595 10.753L8.28071 11.8546C8.32617 11.7406 8.39505 11.6337 8.48733 11.5414L11.5414 8.48736C11.6337 8.39506 11.7406 8.32617 11.8546 8.28071L10.753 4.97594L4.00837 3.41949L7.43118 6.84228C8.07999 6.45578 8.93198 6.54174 9.49042 7.10017C10.1505 7.76021 10.1505 8.83034 9.49042 9.49037C8.83038 10.1504 7.76025 10.1504 7.10021 9.49037C6.56719 8.95736 6.46461 8.15691 6.79247 7.52097L3.46139 4.1899ZM9.21589 12.27L10.0144 13.0685L13.0685 10.0144L12.27 9.21591L9.21589 12.27ZM8.83172 8.83168C9.12797 8.53543 9.12797 8.05511 8.83172 7.75887C8.53547 7.46262 8.05515 7.46262 7.7589 7.75887C7.46265 8.05512 7.46265 8.53543 7.7589 8.83168C8.05515 9.12793 8.53547 9.12793 8.83172 8.83168Z", fill: "currentColor" }) }));

const PhoneAlt = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5 3H11V13H5V3ZM4 3C4 2.44772 4.44772 2 5 2H11C11.5523 2 12 2.44772 12 3V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V3ZM7.5 11C7.22386 11 7 11.2239 7 11.5C7 11.7761 7.22386 12 7.5 12H8.5C8.77614 12 9 11.7761 9 11.5C9 11.2239 8.77614 11 8.5 11H7.5Z", fill: "currentColor" }) }));

const Phone = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.3362 11.195L9.84492 13.1663C11.1431 13.6771 12.5438 13.9698 14 13.9978V11.6262C13.0754 11.6046 12.1798 11.453 11.3362 11.195ZM9.22014 13.9922C8.96309 13.8847 8.70995 13.7693 8.46105 13.6462C6.25808 12.557 4.38682 10.8704 3.06931 8.80724C1.76207 6.76018 1 4.34248 1 1.77C1 1.18667 1.50556 1 1.92556 1H4.61667C5.03667 1 5.38667 1.35 5.38667 1.77C5.38667 2.72667 5.53444 3.65222 5.82222 4.51556C5.90778 4.78778 5.84556 5.09111 5.63556 5.30889L3.5 7.5C3.62692 7.76374 3.76675 8.02351 3.91823 8.27834C5.07561 10.2255 6.91251 11.8837 8.85889 12.8122L10.6989 10.38C10.9089 10.17 11.2122 10.1 11.4844 10.1933C12.3478 10.4733 13.2733 10.6289 14.23 10.6289C14.65 10.6289 15 10.9789 15 11.3989V14.0822C15 14.51 14.7822 15 14.23 15C12.4645 15 10.7711 14.6407 9.22014 13.9922ZM3.00693 6.57317L4.83118 4.70146C4.55847 3.84066 4.41018 2.93187 4.38925 2H2.00221C2.03318 3.61445 2.3894 5.16006 3.00693 6.57317Z", fill: "currentColor" }) }));

const PlantAlt = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.5 12C4.5 11.7239 4.72386 11.5 5 11.5H6.75C7.02614 11.5 7.25 11.7239 7.25 12C7.25 12.2761 7.02614 12.5 6.75 12.5H5C4.72386 12.5 4.5 12.2761 4.5 12Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.75 12C8.75 11.7239 8.97386 11.5 9.25 11.5H11C11.2761 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.2761 12.5 11 12.5H9.25C8.97386 12.5 8.75 12.2761 8.75 12Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.27639 6.05279C2.44579 5.96809 2.64849 5.98637 2.8 6.1L6 8.5V6.5C6 6.31061 6.107 6.13748 6.27639 6.05279C6.44579 5.96809 6.64849 5.98637 6.8 6.1L10.6667 9H13.5C13.7761 9 14 9.22386 14 9.5C14 9.77614 13.7761 10 13.5 10H10.5C10.3918 10 10.2865 9.96491 10.2 9.9L7 7.5V9.5C7 9.68939 6.893 9.86252 6.72361 9.94721C6.55421 10.0319 6.35151 10.0136 6.2 9.9L3 7.5V14.5C3 14.7761 2.77614 15 2.5 15C2.22386 15 2 14.7761 2 14.5V6.5C2 6.31061 2.107 6.13748 2.27639 6.05279Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.5 14.5C0.5 14.2239 0.723858 14 1 14H15C15.2761 14 15.5 14.2239 15.5 14.5C15.5 14.7761 15.2761 15 15 15H1C0.723858 15 0.5 14.7761 0.5 14.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.9351 2C10.6941 1.99957 10.4612 2.08613 10.279 2.24378C10.0966 2.40158 9.97736 2.61999 9.94329 2.85875L9.10267 8.75189C9.06367 9.02527 9.25367 9.2785 9.52705 9.31749C9.80042 9.35649 10.0536 9.16648 10.0926 8.89311L10.9333 3L10.9345 3H12.067L12.0683 3L13.0008 9.53549V14.5C13.0008 14.7761 13.2246 15 13.5008 15C13.7769 15 14.0008 14.7761 14.0008 14.5L14 9.5C14 9.47637 13.9991 9.45277 13.9958 9.42938L13.0583 2.85875C13.0242 2.61999 12.905 2.40158 12.7226 2.24378C12.5404 2.08613 12.3074 1.99957 12.0665 2C12.0663 2 12.0667 2 12.0665 2", fill: "currentColor" })] }));

const Plant = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 5V14H14V3H11V7L6.5 4.96617V6.96617L2 5ZM7.5 6.51552V8.49438L3 6.52821V13H13V4H12V8.54936L7.5 6.51552Z", fill: "black" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6 10H5V11H6V10ZM4 9V12H7V9H4Z", fill: "black" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10 10H9V11H10V10ZM8 9V12H11V9H8Z", fill: "black" })] }));

const PortableTracking = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.99997 5.5C5.72383 5.5 5.49997 5.72386 5.49997 6L5.49997 10C5.49997 10.2761 5.72383 10.5 5.99997 10.5L9.99997 10.5C10.2761 10.5 10.5 10.2761 10.5 10L10.5 6C10.5 5.72386 10.2761 5.5 9.99997 5.5L5.99997 5.5ZM6.49997 9.5L6.49997 6.5L9.49997 6.5L9.49997 9.5L6.49997 9.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.00488 9.50284C1.72874 9.50323 1.5052 9.7274 1.50559 10.0035C1.50597 10.2797 1.73015 10.5032 2.00629 10.5028L2.99962 10.5014L2.99997 12C2.99997 12.5523 3.44769 13 3.99997 13L5.49997 13L5.49997 14C5.49997 14.2761 5.72383 14.5 5.99997 14.5C6.27611 14.5 6.49997 14.2761 6.49997 14L6.49997 13L7.49997 13L7.49997 14C7.49997 14.2761 7.72383 14.5 7.99997 14.5C8.27611 14.5 8.49997 14.2761 8.49997 14L8.49997 13L9.49997 13L9.49997 14C9.49997 14.2761 9.72383 14.5 9.99997 14.5C10.2761 14.5 10.5 14.2761 10.5 14L10.5 13L12 13C12.5523 13 13 12.5523 13 12L13 10.4981C13.0188 10.5003 13.0379 10.5013 13.0573 10.5013L14.0063 10.5C14.2824 10.4996 14.506 10.2754 14.5056 9.99927C14.5052 9.72313 14.281 9.49959 14.0049 9.49998L13.0559 9.50131C13.037 9.50134 13.0183 9.50242 13 9.50449L13 8.49845C13.0179 8.50037 13.0361 8.50134 13.0545 8.50131L14.0035 8.49998C14.2796 8.49959 14.5032 8.27542 14.5028 7.99927C14.5024 7.72313 14.2782 7.49959 14.0021 7.49998L13.0531 7.50131C13.0352 7.50134 13.0174 7.50231 13 7.50418L13 6.49874C13.017 6.50046 13.0343 6.50134 13.0517 6.50131L14.0007 6.49998C14.2768 6.49959 14.5004 6.27542 14.5 5.99927C14.4996 5.72313 14.2754 5.49959 13.9993 5.49998L13.0503 5.50131C13.0333 5.50134 13.0165 5.50221 13 5.50389L13 4C13 3.44772 12.5523 3 12 3L10.5 3L10.5 2C10.5 1.72386 10.2761 1.5 9.99997 1.5C9.72383 1.5 9.49997 1.72386 9.49997 2L9.49997 3L8.49997 3L8.49997 2C8.49997 1.72386 8.27611 1.5 7.99997 1.5C7.72383 1.5 7.49997 1.72386 7.49997 2L7.49997 3L6.49997 3L6.49997 2C6.49997 1.72386 6.27611 1.5 5.99997 1.5C5.72383 1.5 5.49997 1.72386 5.49997 2L5.49997 3L3.99997 3C3.44769 3 2.99997 3.44772 2.99997 4L2.99997 5.50148C2.99752 5.50145 2.99506 5.50144 2.9926 5.50144L1.99927 5.50284C1.72312 5.50323 1.49958 5.7274 1.49997 6.00354C1.50036 6.27968 1.72453 6.50323 2.00067 6.50284L2.99401 6.50144C2.996 6.50144 2.99799 6.50142 2.99997 6.5014L2.99997 7.50146L2.99541 7.50144L2.00207 7.50284C1.72593 7.50323 1.50239 7.7274 1.50278 8.00354C1.50317 8.27968 1.72734 8.50323 2.00348 8.50284L2.99681 8.50144L2.99997 8.50143L2.99997 9.50144L2.99821 9.50144L2.00488 9.50284ZM3.99997 4L12 4L12 12L3.99997 12L3.99997 4Z", fill: "currentColor" })] }));

const PreviewFill = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.99999 12C11.2364 12 13.0464 9.53483 13.7728 8.22868C13.8543 8.08209 13.8543 7.91791 13.7728 7.77132C13.0464 6.46517 11.2364 4 7.99999 4C4.76362 4 2.95362 6.46517 2.2272 7.77132C2.14568 7.91791 2.14568 8.08209 2.2272 8.22868C2.95362 9.53483 4.76362 12 7.99999 12ZM14.6467 8.71472C14.8963 8.2659 14.8963 7.73409 14.6467 7.28528C13.8782 5.9034 11.8101 3 7.99999 3C4.18987 3 2.1218 5.9034 1.35327 7.28528C1.10366 7.7341 1.10366 8.26591 1.35327 8.71472C2.1218 10.0966 4.18987 13 7.99999 13C11.8101 13 13.8782 10.0966 14.6467 8.71472Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M11 8C11 9.65685 9.65685 11 7.99999 11C6.34314 11 4.99999 9.65685 4.99999 8C4.99999 6.34315 6.34314 5 7.99999 5C9.65685 5 11 6.34315 11 8Z", fill: "currentColor" })] }));

const Preview = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8ZM10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14.6467 7.28528C14.8963 7.73409 14.8963 8.2659 14.6467 8.71472C13.8782 10.0966 11.8101 13 8.00001 13C4.18989 13 2.12181 10.0966 1.35328 8.71472C1.10368 8.26591 1.10367 7.7341 1.35328 7.28528C2.12181 5.9034 4.18989 3 8.00001 3C11.8101 3 13.8782 5.9034 14.6467 7.28528ZM13.7728 8.22868C13.0464 9.53483 11.2364 12 8.00001 12C4.76363 12 2.95363 9.53483 2.22722 8.22868C2.1457 8.08209 2.1457 7.91791 2.22722 7.77132C2.95363 6.46517 4.76363 4 8.00001 4C11.2364 4 13.0464 6.46517 13.7728 7.77132C13.8543 7.91791 13.8543 8.08209 13.7728 8.22868Z", fill: "currentColor" })] }));

const Recommended = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.302 11.9054C15.8458 11.8088 16.365 12.1713 16.4616 12.715L17.9781 21.2493C18.029 21.5505 17.9867 21.8601 17.8569 22.1366C17.7271 22.4131 17.516 22.6434 17.2518 22.7967C16.9876 22.95 16.6829 23.019 16.3784 22.9945C16.083 22.9706 15.8014 22.8599 15.5692 22.6764L12.0035 20.0001L8.43119 22.6759C8.19916 22.8589 7.91805 22.9694 7.62308 22.9933C7.31897 23.0179 7.01461 22.9491 6.75058 22.7963C6.48656 22.6434 6.27543 22.4136 6.14535 22.1377C6.01528 21.8617 5.97246 21.5526 6.0226 21.2517L6.02435 21.2411L7.5384 12.7152C7.63496 12.1714 8.15406 11.8088 8.69784 11.9054C9.24162 12.002 9.60416 12.5211 9.5076 13.0648L8.21603 20.3382L10.8065 18.3979C11.1522 18.1396 11.572 18.0001 12.0035 18.0001C12.435 18.0001 12.8548 18.1396 13.2005 18.3979L13.2023 18.3992L15.7847 20.3375L14.4924 13.065C14.3958 12.5212 14.7583 12.002 15.302 11.9054Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3ZM5 8C5 4.13401 8.13401 1 12 1C15.866 1 19 4.13401 19 8C19 11.866 15.866 15 12 15C8.13401 15 5 11.866 5 8Z", fill: "currentColor" })] }));

const Refresh = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M3.5 7C3.5 4.51472 5.51472 2.5 8 2.5C10.4853 2.5 12.5 4.51472 12.5 7C12.5 9.37847 10.6547 11.3259 8.31772 11.489L9.77518 10.0315C9.97045 9.83623 9.97045 9.51965 9.77518 9.32438C9.57992 9.12912 9.26334 9.12912 9.06808 9.32438L6.5932 11.7993L9.06808 14.2741C9.26334 14.4694 9.57992 14.4694 9.77518 14.2741C9.97045 14.0789 9.97045 13.7623 9.77518 13.567L8.668 12.4598C11.3905 12.1302 13.5 9.81145 13.5 7C13.5 3.96243 11.0376 1.5 8 1.5C4.96243 1.5 2.5 3.96243 2.5 7C2.5 7.27614 2.72386 7.5 3 7.5C3.27614 7.5 3.5 7.27614 3.5 7Z", fill: "currentColor" }) }));

const Remove = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM6 7.5C5.72386 7.5 5.5 7.72386 5.5 8C5.5 8.27614 5.72386 8.5 6 8.5H10C10.2761 8.5 10.5 8.27614 10.5 8C10.5 7.72386 10.2761 7.5 10 7.5H6Z", fill: "currentColor" }) }));

const Road = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.24522 5.0643C6.4859 5.19968 6.57126 5.50454 6.43588 5.74522L1.93588 13.7452C1.80049 13.9859 1.49564 14.0713 1.25496 13.9359C1.01428 13.8005 0.928919 13.4956 1.0643 13.255L5.5643 5.25496C5.69968 5.01428 6.00454 4.92892 6.24522 5.0643Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.75496 5.0643C9.99564 4.92892 10.3005 5.01428 10.4359 5.25496L14.9359 13.255C15.0713 13.4956 14.9859 13.8005 14.7452 13.9359C14.5045 14.0713 14.1997 13.9859 14.0643 13.7452L9.5643 5.74522C9.42892 5.50454 9.51428 5.19968 9.75496 5.0643Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.00009 5.00009C8.27623 5.00009 8.50009 5.22395 8.50009 5.50009V6.50009C8.50009 6.77623 8.27623 7.00009 8.00009 7.00009C7.72395 7.00009 7.50009 6.77623 7.50009 6.50009V5.50009C7.50009 5.22395 7.72395 5.00009 8.00009 5.00009Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.00009 8.50009C8.27623 8.50009 8.50009 8.72395 8.50009 9.00009V10.0001C8.50009 10.2762 8.27623 10.5001 8.00009 10.5001C7.72395 10.5001 7.50009 10.2762 7.50009 10.0001V9.00009C7.50009 8.72395 7.72395 8.50009 8.00009 8.50009Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M8.00009 12.0001C8.27623 12.0001 8.50009 12.2239 8.50009 12.5001V13.5001C8.50009 13.7762 8.27623 14.0001 8.00009 14.0001C7.72395 14.0001 7.50009 13.7762 7.50009 13.5001V12.5001C7.50009 12.2239 7.72395 12.0001 8.00009 12.0001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.00009 5.50009C1.00009 5.22395 1.22395 5.00009 1.50009 5.00009H14.5001C14.7762 5.00009 15.0001 5.22395 15.0001 5.50009C15.0001 5.77623 14.7762 6.00009 14.5001 6.00009H1.50009C1.22395 6.00009 1.00009 5.77623 1.00009 5.50009Z", fill: "currentColor" })] }));

const Rocket = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M12 14.9998L9 11.9998M12 14.9998C13.3968 14.4685 14.7369 13.7985 16 12.9998M12 14.9998V19.9998C12 19.9998 15.03 19.4498 16 17.9998C17.08 16.3798 16 12.9998 16 12.9998M9 11.9998C9.53214 10.6192 10.2022 9.29582 11 8.04976C12.1652 6.18675 13.7876 4.65281 15.713 3.59385C17.6384 2.53489 19.8027 1.98613 22 1.99976C22 4.71976 21.22 9.49976 16 12.9998M9 11.9998H4C4 11.9998 4.55 8.96976 6 7.99976C7.62 6.91976 11 7.99976 11 7.99976M4.5 16.4998C3 17.7598 2.5 21.4998 2.5 21.4998C2.5 21.4998 6.24 20.9998 7.5 19.4998C8.21 18.6598 8.2 17.3698 7.41 16.5898C7.02131 16.2188 6.50929 16.0044 5.97223 15.9878C5.43516 15.9712 4.91088 16.1535 4.5 16.4998Z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const RoundTrip = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.5 3C2.5 2.72386 2.72386 2.5 3 2.5H10C12.4853 2.5 14.5 4.51472 14.5 7C14.5 9.48528 12.4853 11.5 10 11.5H7.5C7.22386 11.5 7 11.2761 7 11C7 10.7239 7.22386 10.5 7.5 10.5H10C11.933 10.5 13.5 8.933 13.5 7C13.5 5.067 11.933 3.5 10 3.5H3C2.72386 3.5 2.5 3.27614 2.5 3Z", fill: "black" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.8505 13.8536C9.65524 14.0489 9.33866 14.0489 9.14339 13.8536L6.29283 11.003L9.14339 8.15247C9.33866 7.95721 9.65524 7.95721 9.8505 8.15247C10.0458 8.34774 10.0458 8.66432 9.8505 8.85958L7.70705 11.003L9.8505 13.1465C10.0458 13.3418 10.0458 13.6583 9.8505 13.8536Z", fill: "black" })] }));

const RupeeCoin = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M5 4.5C5 4.22386 5.22386 4 5.5 4L5.42707 4.99472C5.1855 4.95942 5 4.75137 5 4.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.42707 4.99472L5.5 4H10.5C10.7761 4 11 4.22386 11 4.5C11 4.77614 10.7761 5 10.5 5H9.50018C9.71854 5.29071 9.875 5.63056 9.94999 6H10.5C10.7761 6 11 6.22386 11 6.5C11 6.77614 10.7761 7 10.5 7H9.94999C9.71836 8.14112 8.70948 9 7.5 9H6.70711L9.35355 11.6464C9.54882 11.8417 9.54882 12.1583 9.35355 12.3536C9.15829 12.5488 8.84171 12.5488 8.64645 12.3536L5.14671 8.85382L5.20168 8.09867C5.23521 8.07368 5.27116 8.05343 5.30861 8.03794C5.36756 8.01349 5.43221 8 5.5 8H7.5C8.15311 8 8.70873 7.5826 8.91465 7H5.5C5.4231 7 5.35025 6.98264 5.28516 6.95162L5.35283 6.02201C5.39936 6.0077 5.44878 6 5.5 6H8.91465C8.70873 5.4174 8.15311 5 7.5 5H5.5C5.47541 5 5.45072 4.99815 5.42707 4.99472Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.35174 6.02235L5.42707 4.99472C5.4269 4.9947 5.42725 4.99475 5.42707 4.99472L5.35283 6.02201C5.35246 6.02212 5.3521 6.02224 5.35174 6.02235Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.28366 6.9509C5.28416 6.95114 5.28466 6.95138 5.28516 6.95162L5.20168 8.09867C5.20091 8.09923 5.20015 8.0998 5.19939 8.10038L5.28366 6.9509Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.19939 8.10038C5.18095 8.11429 5.16325 8.12964 5.14645 8.14645C5.09851 8.19439 5.06234 8.24964 5.03794 8.30861C5.01349 8.36756 5 8.43221 5 8.5C5 8.56779 5.01349 8.63244 5.03794 8.69139C5.06198 8.74949 5.09744 8.80398 5.14433 8.85143L5.19939 8.10038Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M5.28366 6.9509C5.11584 6.87024 5 6.69865 5 6.5C5 6.27548 5.14798 6.08552 5.35174 6.02235L5.28366 6.9509Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z", fill: "currentColor" })] }));

const Save = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M17 20.75H7C6.27065 20.75 5.57118 20.4603 5.05546 19.9445C4.53973 19.4288 4.25 18.7293 4.25 18V6C4.25 5.27065 4.53973 4.57118 5.05546 4.05546C5.57118 3.53973 6.27065 3.25 7 3.25H14.5C14.6988 3.25018 14.8895 3.32931 15.03 3.47L19.53 8C19.6707 8.14052 19.7498 8.33115 19.75 8.53V18C19.75 18.7293 19.4603 19.4288 18.9445 19.9445C18.4288 20.4603 17.7293 20.75 17 20.75ZM7 4.75C6.66848 4.75 6.35054 4.8817 6.11612 5.11612C5.8817 5.35054 5.75 5.66848 5.75 6V18C5.75 18.3315 5.8817 18.6495 6.11612 18.8839C6.35054 19.1183 6.66848 19.25 7 19.25H17C17.3315 19.25 17.6495 19.1183 17.8839 18.8839C18.1183 18.6495 18.25 18.3315 18.25 18V8.81L14.19 4.75H7Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M16.75 20H15.25V13.75H8.75001V20H7.25001V13.5C7.25001 13.1685 7.3817 12.8505 7.61613 12.6161C7.85055 12.3817 8.16849 12.25 8.50001 12.25H15.5C15.8315 12.25 16.1495 12.3817 16.3839 12.6161C16.6183 12.8505 16.75 13.1685 16.75 13.5V20ZM12.47 8.75H8.53001C8.3606 8.74869 8.19311 8.71403 8.0371 8.64799C7.88109 8.58195 7.73962 8.48582 7.62076 8.36511C7.5019 8.24439 7.40798 8.10144 7.34437 7.94443C7.28075 7.78741 7.24869 7.61941 7.25001 7.45V4H8.75001V7.25H12.25V4H13.75V7.45C13.7513 7.61941 13.7193 7.78741 13.6557 7.94443C13.592 8.10144 13.4981 8.24439 13.3793 8.36511C13.2604 8.48582 13.1189 8.58195 12.9629 8.64799C12.8069 8.71403 12.6394 8.74869 12.47 8.75Z", fill: "currentColor" })] }));

const Search = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7 1.5C3.96243 1.5 1.5 3.96243 1.5 7C1.5 10.0376 3.96243 12.5 7 12.5C8.27192 12.5 9.44299 12.0683 10.3747 11.3433L13.0597 13.8037C13.2633 13.9903 13.5796 13.9764 13.7661 13.7729C13.9527 13.5693 13.9389 13.253 13.7353 13.0664L11.1071 10.6582C11.9735 9.68612 12.5 8.40455 12.5 7C12.5 3.96243 10.0376 1.5 7 1.5ZM2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5C4.51472 11.5 2.5 9.48528 2.5 7Z", fill: "currentColor" }) }));

const Send = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M2.33334 12.8334V3.16675L13.8077 8.00008L2.33334 12.8334ZM3.33334 11.3334L11.2333 8.00008L3.33334 4.66675V7.12825L6.94868 8.00008L3.33334 8.87191V11.3334Z", fill: "currentColor" }) }));

const Settings = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4 5C4.82843 5 5.5 4.32843 5.5 3.5C5.5 2.67157 4.82843 2 4 2C3.17157 2 2.5 2.67157 2.5 3.5C2.5 4.32843 3.17157 5 4 5ZM4 4C4.27614 4 4.5 3.77614 4.5 3.5C4.5 3.22386 4.27614 3 4 3C3.72386 3 3.5 3.22386 3.5 3.5C3.5 3.77614 3.72386 4 4 4Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M4 5.5C4.27614 5.5 4.5 5.72386 4.5 6L4.5 13.5C4.5 13.7761 4.27614 14 4 14C3.72386 14 3.5 13.7761 3.5 13.5L3.5 6C3.5 5.72386 3.72386 5.5 4 5.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M13.5 2.5C13.5 2.22386 13.2761 2 13 2C12.7239 2 12.5 2.22386 12.5 2.5V10C12.5 10.2761 12.7239 10.5 13 10.5C13.2761 10.5 13.5 10.2761 13.5 10V2.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13 14C13.8284 14 14.5 13.3284 14.5 12.5C14.5 11.6716 13.8284 11 13 11C12.1716 11 11.5 11.6716 11.5 12.5C11.5 13.3284 12.1716 14 13 14ZM13 13C13.2761 13 13.5 12.7761 13.5 12.5C13.5 12.2239 13.2761 12 13 12C12.7239 12 12.5 12.2239 12.5 12.5C12.5 12.7761 12.7239 13 13 13Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M9 2.5C9 2.22386 8.77614 2 8.5 2C8.22386 2 8 2.22386 8 2.5V5.5C8 5.77614 8.22386 6 8.5 6C8.77614 6 9 5.77614 9 5.5V2.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8.5 10C8.77614 10 9 10.2239 9 10.5V13.5C9 13.7761 8.77614 14 8.5 14C8.22386 14 8 13.7761 8 13.5V10.5C8 10.2239 8.22386 10 8.5 10Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10 8C10 8.82843 9.32843 9.5 8.5 9.5C7.67157 9.5 7 8.82843 7 8C7 7.17157 7.67157 6.5 8.5 6.5C9.32843 6.5 10 7.17157 10 8ZM9 8C9 8.27614 8.77614 8.5 8.5 8.5C8.22386 8.5 8 8.27614 8 8C8 7.72386 8.22386 7.5 8.5 7.5C8.77614 7.5 9 7.72386 9 8Z", fill: "currentColor" })] }));

const ShakeHand = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.2929 15.2929C15.6834 14.9024 16.3166 14.9024 16.7071 15.2929C16.997 15.5828 17.2269 15.9268 17.3837 16.3055C17.5406 16.6842 17.6213 17.0901 17.6213 17.5C17.6213 17.9099 17.5406 18.3158 17.3837 18.6945C17.2269 19.0732 16.997 19.4173 16.7071 19.7071C16.4173 19.997 16.0732 20.2269 15.6945 20.3837C15.3158 20.5406 14.9099 20.6213 14.5 20.6213C14.0901 20.6213 13.6842 20.5406 13.3055 20.3837C12.9268 20.2269 12.5827 19.997 12.2929 19.7071L10.2929 17.7071C9.90237 17.3166 9.90237 16.6834 10.2929 16.2929C10.6834 15.9024 11.3166 15.9024 11.7071 16.2929L13.7071 18.2929C13.8112 18.397 13.9348 18.4796 14.0709 18.536C14.2069 18.5923 14.3528 18.6213 14.5 18.6213C14.6473 18.6213 14.7931 18.5923 14.9291 18.536C15.0652 18.4796 15.1888 18.397 15.2929 18.2929C15.397 18.1888 15.4796 18.0652 15.536 17.9291C15.5923 17.7931 15.6213 17.6473 15.6213 17.5C15.6213 17.3528 15.5923 17.207 15.536 17.0709C15.4796 16.9349 15.397 16.8112 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M16.8568 4.67831C15.942 4.13133 14.8708 3.90512 13.813 4.03548C12.7552 4.16583 11.7712 4.64519 11.0165 5.3977L8.20711 8.20712C7.99682 8.41741 7.87868 8.70262 7.87868 9.00002C7.87868 9.29741 7.99682 9.58262 8.20711 9.79291C8.4174 10.0032 8.70261 10.1213 9 10.1213C9.2974 10.1213 9.58261 10.0032 9.7929 9.79291L10.6729 8.91291C11.4229 8.16384 12.44 7.74266 13.5 7.74266C14.56 7.74266 15.5767 8.1634 16.3267 8.91247L20.2071 12.7929C20.7925 13.3783 21.1213 14.1722 21.1213 15C21.1213 15.8278 20.7925 16.6218 20.2071 17.2071C19.6217 17.7925 18.8278 18.1213 18 18.1213C17.1722 18.1213 16.3783 17.7925 15.7929 17.2071L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L17.2071 15.7929C17.4174 16.0032 17.7026 16.1213 18 16.1213C18.2974 16.1213 18.5826 16.0032 18.7929 15.7929C19.0032 15.5826 19.1213 15.2974 19.1213 15C19.1213 14.7026 19.0032 14.4174 18.7929 14.2071L14.9133 10.3276C14.5383 9.95303 14.03 9.74266 13.5 9.74266C12.97 9.74266 12.4617 9.95303 12.0867 10.3276L11.2071 11.2071C10.6218 11.7925 9.82783 12.1213 9 12.1213C8.17218 12.1213 7.37826 11.7925 6.7929 11.2071C6.20754 10.6218 5.87868 9.82784 5.87868 9.00002C5.87868 8.17219 6.20754 7.37827 6.7929 6.79291L9.60382 3.98198C10.6736 2.91499 12.0687 2.23529 13.5683 2.0505C15.0677 1.86573 16.5859 2.18627 17.8826 2.96137L18.3567 3.24386C18.5692 3.37206 18.8216 3.41673 19.0651 3.36919L19.0667 3.36887L20.8028 3.01965C21.3442 2.91074 21.8715 3.26138 21.9804 3.80282C22.0893 4.34426 21.7386 4.87147 21.1972 4.98038L19.4572 5.33038L19.4533 5.33116C18.7224 5.47513 17.9641 5.34202 17.326 4.95781L16.8568 4.67831Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M20.9095 2.00412C21.4595 1.95412 21.9459 2.35946 21.9959 2.90948L22.9959 13.9095C23.0213 14.1893 22.9279 14.4669 22.7384 14.6744C22.549 14.8818 22.281 15 22 15H20C19.4477 15 19 14.5523 19 14C19 13.4477 19.4477 13 20 13H20.905L20.0041 3.09055C19.9541 2.54054 20.3595 2.05413 20.9095 2.00412Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.09054 2.00412C3.64056 2.05413 4.0459 2.54054 3.9959 3.09055L3.0383 13.6241L9.20711 19.7929C9.4174 20.0032 9.70261 20.1213 10 20.1213C10.2974 20.1213 10.5826 20.0032 10.7929 19.7929C11.0032 19.5826 11.1213 19.2974 11.1213 19C11.1213 18.7026 11.0032 18.4174 10.7929 18.2071C10.4024 17.8166 10.4024 17.1834 10.7929 16.7929C11.1834 16.4024 11.8166 16.4024 12.2071 16.7929C12.7925 17.3783 13.1213 18.1722 13.1213 19C13.1213 19.8278 12.7925 20.6218 12.2071 21.2071C11.6218 21.7925 10.8278 22.1213 10 22.1213C9.17218 22.1213 8.37826 21.7925 7.7929 21.2071L1.2929 14.7071C1.08304 14.4973 0.977242 14.205 1.00411 13.9095L2.00411 2.90948C2.05411 2.35946 2.54052 1.95412 3.09054 2.00412Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2 4.00002C2 3.44773 2.44772 3.00002 3 3.00002H11C11.5523 3.00002 12 3.44773 12 4.00002C12 4.5523 11.5523 5.00002 11 5.00002H3C2.44772 5.00002 2 4.5523 2 4.00002Z", fill: "currentColor" })] }));

const Share = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.5 6C12.8807 6 14 4.88071 14 3.5C14 2.11929 12.8807 1 11.5 1C10.1193 1 9 2.11929 9 3.5C9 3.8251 9.06206 4.13571 9.17497 4.42063L6.4001 6.37524C5.94158 5.83952 5.26044 5.5 4.5 5.5C3.11929 5.5 2 6.61929 2 8C2 9.38071 3.11929 10.5 4.5 10.5C5.26088 10.5 5.94238 10.1601 6.40091 9.62382L9.17517 11.5788C9.06211 11.8639 8.99997 12.1747 8.99997 12.5C8.99997 13.8807 10.1193 15 11.5 15C12.8807 15 14 13.8807 14 12.5C14 11.1193 12.8807 10 11.5 10C10.8049 10 10.1761 10.2836 9.72299 10.7415L6.8876 8.74344C6.96065 8.50859 7 8.25889 7 8C7 7.74065 6.96051 7.49052 6.88721 7.2553L9.72259 5.25807C10.1757 5.71618 10.8047 6 11.5 6ZM11.5 5C12.3284 5 13 4.32843 13 3.5C13 2.67157 12.3284 2 11.5 2C10.6716 2 10 2.67157 10 3.5C10 4.32843 10.6716 5 11.5 5ZM4.5 9.5C5.32843 9.5 6 8.82843 6 8C6 7.17157 5.32843 6.5 4.5 6.5C3.67157 6.5 3 7.17157 3 8C3 8.82843 3.67157 9.5 4.5 9.5ZM13 12.5C13 13.3284 12.3284 14 11.5 14C10.6715 14 9.99997 13.3284 9.99997 12.5C9.99997 11.6716 10.6715 11 11.5 11C12.3284 11 13 11.6716 13 12.5Z", fill: "black" }) }));

const Ship = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M12 10.189V14M12 10.189C12.2797 10.189 12.5564 10.2474 12.812 10.361L21 14C21.0158 16.1101 20.4557 18.1846 19.38 20M12 10.189C11.7203 10.189 11.4436 10.2474 11.188 10.361L3 14C2.95371 16.8437 3.95372 19.6053 5.81 21.76M12 2V5M19 13V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V13M2 21C2.6 21.5 3.2 22 4.5 22C7 22 7 20 9.5 20C10.8 20 11.4 20.5 12 21C12.6 21.5 13.2 22 14.5 22C17 22 17 20 19.5 20C20.8 20 21.4 20.5 22 21", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const Sim = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5 12V8H11V12H5ZM6 9H10V11H6V9Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4 1.5C3.17157 1.5 2.5 2.17157 2.5 3V13C2.5 13.8284 3.17157 14.5 4 14.5H12C12.8284 14.5 13.5 13.8284 13.5 13V4.79437C13.5 4.38195 13.3302 3.98773 13.0305 3.7044L11.1326 1.91003C10.8541 1.64672 10.4854 1.5 10.1021 1.5H4ZM3.5 3C3.5 2.72386 3.72386 2.5 4 2.5H10.1021C10.2299 2.5 10.3528 2.54891 10.4456 2.63668L12.3435 4.43104C12.4434 4.52549 12.5 4.65689 12.5 4.79437V13C12.5 13.2761 12.2761 13.5 12 13.5H4C3.72386 13.5 3.5 13.2761 3.5 13V3Z", fill: "currentColor" })] }));

const Sort = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.5 3.5C1.5 3.22386 1.72386 3 2 3H14C14.2761 3 14.5 3.22386 14.5 3.5C14.5 3.77614 14.2761 4 14 4H2C1.72386 4 1.5 3.77614 1.5 3.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.5 7.5C1.5 7.22386 1.72386 7 2 7H11C11.2761 7 11.5 7.22386 11.5 7.5C11.5 7.77614 11.2761 8 11 8H2C1.72386 8 1.5 7.77614 1.5 7.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1.5 11.5C1.5 11.2239 1.72386 11 2 11H8C8.27614 11 8.5 11.2239 8.5 11.5C8.5 11.7761 8.27614 12 8 12H2C1.72386 12 1.5 11.7761 1.5 11.5Z", fill: "currentColor" })] }));

const Star = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M14.9488 6.07866C14.8862 5.88649 14.7683 5.71712 14.6097 5.59189C14.4511 5.46665 14.2589 5.39116 14.0575 5.37491L10.37 5.07741L8.94626 1.63429C8.86926 1.44667 8.73822 1.28619 8.56978 1.17325C8.40134 1.06031 8.20312 1 8.00032 1C7.79752 1 7.59931 1.06031 7.43087 1.17325C7.26243 1.28619 7.13138 1.44667 7.05439 1.63429L5.63189 5.07679L1.94251 5.37491C1.74075 5.39198 1.5485 5.4682 1.38987 5.59404C1.23124 5.71988 1.11326 5.88973 1.05074 6.08232C0.988209 6.27491 0.983905 6.48167 1.03837 6.67669C1.09282 6.87172 1.20363 7.04633 1.35689 7.17866L4.16939 9.60554L3.31251 13.2343C3.26459 13.4314 3.27632 13.6384 3.34622 13.8288C3.41612 14.0193 3.54104 14.1847 3.70511 14.304C3.86918 14.4234 4.06502 14.4913 4.26775 14.4991C4.47048 14.5069 4.67097 14.4544 4.84376 14.348L8.00001 12.4055L11.1581 14.348C11.331 14.4531 11.5311 14.5047 11.7332 14.4962C11.9353 14.4878 12.1304 14.4198 12.2939 14.3007C12.4574 14.1816 12.582 14.0168 12.6521 13.8271C12.7221 13.6373 12.7344 13.431 12.6875 13.2343L11.8275 9.60491L14.64 7.17804C14.7945 7.04593 14.9063 6.87094 14.9613 6.67522C15.0163 6.47951 15.0119 6.27189 14.9488 6.07866ZM13.99 6.42054L10.9463 9.04554C10.8768 9.10537 10.8252 9.18312 10.797 9.27031C10.7688 9.3575 10.7651 9.45076 10.7863 9.53991L11.7163 13.4649C11.7187 13.4703 11.7189 13.4765 11.7169 13.482C11.715 13.4876 11.7109 13.4922 11.7056 13.4949C11.6944 13.5037 11.6913 13.5018 11.6819 13.4949L8.26189 11.3918C8.18312 11.3434 8.09247 11.3177 8.00001 11.3177C7.90755 11.3177 7.8169 11.3434 7.73814 11.3918L4.31814 13.4962C4.30876 13.5018 4.30626 13.5037 4.29439 13.4962C4.28911 13.4935 4.28507 13.4889 4.28309 13.4833C4.28112 13.4777 4.28136 13.4716 4.28376 13.4662L5.21376 9.54116C5.23496 9.45201 5.23124 9.35875 5.20303 9.27156C5.17481 9.18437 5.12317 9.10662 5.05376 9.04679L2.01001 6.42179C2.00251 6.41554 1.99564 6.40991 2.00189 6.39054C2.00814 6.37116 2.01314 6.37366 2.02251 6.37241L6.01751 6.04991C6.10914 6.04205 6.19683 6.00907 6.27093 5.9546C6.34503 5.90013 6.40267 5.82628 6.43751 5.74116L7.97626 2.01554C7.98126 2.00491 7.98314 1.99991 7.99814 1.99991C8.01314 1.99991 8.01501 2.00491 8.02001 2.01554L9.56251 5.74116C9.59768 5.82631 9.65569 5.90008 9.73013 5.95434C9.80458 6.00861 9.89256 6.04125 9.98439 6.04866L13.9794 6.37116C13.9888 6.37116 13.9944 6.37116 14 6.38929C14.0056 6.40741 14 6.41429 13.99 6.42054Z", fill: "currentColor" }) }));

const Subtract = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M1.5 8C1.5 7.72386 1.72386 7.5 2 7.5H14C14.2761 7.5 14.5 7.72386 14.5 8C14.5 8.27614 14.2761 8.5 14 8.5H2C1.72386 8.5 1.5 8.27614 1.5 8Z", fill: "currentColor" }) }));

const Success = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 3.00488C11.4964 3.00488 11.0009 3.13165 10.5592 3.37351C10.1175 3.61536 9.74379 3.96452 9.47251 4.38879C9.2459 4.7432 8.82172 4.9179 8.41124 4.82587C7.91837 4.71537 7.40557 4.73111 6.9204 4.87162C6.43523 5.01213 5.99338 5.27287 5.63584 5.62967C5.2783 5.98646 5.01664 6.42775 4.87511 6.91263C4.73358 7.39751 4.71677 7.91027 4.82624 8.40337C4.91761 8.81496 4.74103 9.23964 4.38478 9.4651C3.95724 9.73567 3.60509 10.11 3.36106 10.5532C3.11704 10.9964 2.98907 11.4941 2.98907 12.0001C2.98907 12.5061 3.11704 13.0038 3.36106 13.447C3.60509 13.8902 3.95724 14.2645 4.38478 14.5351C4.74103 14.7606 4.91761 15.1852 4.82624 15.5968C4.71677 16.0899 4.73358 16.6027 4.87511 17.0876C5.01664 17.5724 5.2783 18.0137 5.63584 18.3705C5.99338 18.7273 6.43523 18.9881 6.9204 19.1286C7.40557 19.2691 7.91837 19.2848 8.41124 19.1743C8.82255 19.0821 9.24752 19.2577 9.47376 19.6134C9.74469 20.0393 10.1187 20.3899 10.5612 20.6329C11.0036 20.8758 11.5002 21.0032 12.005 21.0032C12.5098 21.0032 13.0064 20.8758 13.4489 20.6329C13.8913 20.3899 14.2653 20.0393 14.5363 19.6134C14.7621 19.2584 15.186 19.0827 15.5967 19.1739C16.0898 19.2833 16.6026 19.2665 17.0875 19.125C17.5724 18.9835 18.0137 18.7218 18.3704 18.3643C18.7272 18.0067 18.988 17.5649 19.1285 17.0797C19.269 16.5945 19.2847 16.0817 19.1742 15.5889C19.0822 15.1784 19.2569 14.7542 19.6113 14.5276C20.0356 14.2563 20.3847 13.8826 20.6266 13.4409C20.8685 12.9992 20.9952 12.5037 20.9952 12.0001C20.9952 11.4965 20.8685 11.001 20.6266 10.5593C20.3847 10.1176 20.0356 9.74388 19.6113 9.4726C19.2567 9.24587 19.082 8.82138 19.1744 8.41074C19.2853 7.91712 19.2697 7.40344 19.1288 6.91749C18.988 6.43155 18.7265 5.98912 18.3687 5.63136C18.011 5.2736 17.5686 5.01213 17.0826 4.87128C16.5967 4.73042 16.083 4.71476 15.5894 4.82574C15.1787 4.91807 14.7542 4.74339 14.5275 4.38879C14.2562 3.96452 13.8825 3.61536 13.4408 3.37351C12.9991 3.13165 12.5036 3.00488 12 3.00488ZM9.5987 1.61926C10.3349 1.21617 11.1607 1.00488 12 1.00488C12.8393 1.00488 13.6651 1.21617 14.4013 1.61926C14.9405 1.91445 15.4188 2.30556 15.8138 2.77151C16.4263 2.7182 17.0453 2.77813 17.6394 2.95034C18.4493 3.1851 19.1867 3.62088 19.783 4.21714C20.3792 4.81341 20.815 5.55079 21.0498 6.3607C21.222 6.95483 21.2819 7.57383 21.2286 8.18627C21.6945 8.5813 22.0857 9.05966 22.3808 9.59879C22.7839 10.335 22.9952 11.1608 22.9952 12.0001C22.9952 12.8394 22.7839 13.6652 22.3808 14.4014C22.0856 14.9407 21.6944 15.4191 21.2283 15.8142C21.2812 16.4254 21.2213 17.0431 21.0495 17.6361C20.8154 18.4447 20.3808 19.1811 19.7861 19.777C19.1915 20.3729 18.456 20.809 17.6479 21.0449C17.0553 21.2178 16.4378 21.279 15.8265 21.2275C15.4313 21.6959 14.952 22.0892 14.4114 22.386C13.674 22.7909 12.8463 23.0032 12.005 23.0032C11.1637 23.0032 10.336 22.7909 9.5986 22.386C9.05842 22.0894 8.57947 21.6965 8.1844 21.2285C7.57368 21.2812 6.9565 21.2212 6.36404 21.0496C5.55541 20.8154 4.81901 20.3809 4.22311 19.7862C3.62721 19.1916 3.1911 18.4561 2.95522 17.6479C2.78241 17.0559 2.72117 16.4389 2.77252 15.8281C2.30219 15.4329 1.9072 14.9531 1.60905 14.4116C1.20235 13.6729 0.989075 12.8434 0.989075 12.0001C0.989075 11.1568 1.20235 10.3273 1.60905 9.58858C1.9072 9.04707 2.30219 8.56728 2.77252 8.17207C2.72117 7.56129 2.78241 6.94429 2.95522 6.35224C3.1911 5.54412 3.62721 4.80863 4.22311 4.21397C4.81901 3.61932 5.55541 3.18475 6.36404 2.95056C6.95699 2.77884 7.5747 2.71893 8.18592 2.77181C8.581 2.30573 9.05945 1.91452 9.5987 1.61926Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.7071 9.29299C16.0976 9.68351 16.0976 10.3167 15.7071 10.7072L11.7071 14.7072C11.3166 15.0977 10.6834 15.0977 10.2929 14.7072L8.2929 12.7072C7.90238 12.3167 7.90238 11.6835 8.2929 11.293C8.68343 10.9025 9.31659 10.9025 9.70712 11.293L11 12.5859L14.2929 9.29299C14.6834 8.90247 15.3166 8.90247 15.7071 9.29299Z", fill: "currentColor" })] }));

const Tata = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M0 11.0161H3.8519V12.1883H2.74687V15.0054H1.1418V12.1883H0V11.0161ZM5.80267 12.6279L4.99169 15.0054H3.45027L4.96205 11.0161H6.63606L8.18427 15.0054H6.62389L5.80267 12.6279ZM7.81604 11.0161H11.6678V12.1883H10.5631V15.0054H8.9581V12.1883H7.81604V11.0161ZM13.6192 12.6279L12.808 15.0054H11.2665L12.7788 11.0161H14.4523L16 15.0054H14.4402L13.6192 12.6279Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.6761 3.68868C13.5322 3.40585 13.3428 3.13478 13.1072 2.88057C12.5777 2.30905 11.8306 1.83346 10.9464 1.50545C10.055 1.1749 9.03824 1 8.005 1C6.97177 1 5.95502 1.1749 5.06405 1.50545C4.17945 1.8335 3.4323 2.30909 2.90278 2.88057C2.6673 3.13474 2.47727 3.40619 2.33349 3.68917C3.48454 3.41082 5.45347 3.04331 7.28166 3.00445C7.458 3.00066 7.57942 3.05714 7.65936 3.15847C7.75675 3.28186 7.74943 3.7217 7.74704 3.91847L7.69508 9.00447C7.79803 9.00788 7.90148 9.01008 8.005 9.01008C8.1094 9.01008 8.21342 9.00838 8.31637 9.00496L8.2644 3.91843C8.26171 3.72169 8.25417 3.28182 8.35189 3.15843C8.43203 3.05714 8.55303 3.00066 8.72933 3.00442C10.5568 3.04297 12.5252 3.41055 13.6761 3.68868Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.9218 4.35008C12.2371 3.96923 11.1121 3.8988 10.002 3.8372C9.03441 3.78341 9.02179 4.12893 9.11837 4.78924C9.1247 4.82953 9.13247 4.88033 9.14169 4.93825C9.46625 6.8606 9.87041 8.51486 9.93986 8.79564C12.2988 8.25641 14.0001 6.76139 14.0001 5.00516C14.0001 4.784 13.9733 4.5649 13.9218 4.35008ZM6.89254 4.78924C6.98924 4.12897 6.97685 3.78341 6.00934 3.8372C4.89889 3.8988 3.77358 3.96919 2.08827 4.35031C2.03679 4.56513 2.00972 4.78397 2.00972 5.00512C2.00972 5.76417 2.31851 6.49866 2.90282 7.1297C3.43234 7.70122 4.17949 8.17681 5.06409 8.50505C5.38425 8.62358 5.72212 8.72074 6.07015 8.79845C6.13546 8.53541 6.54891 6.84672 6.877 4.88999C6.88307 4.8525 6.88868 4.81789 6.89254 4.78924Z", fill: "currentColor" })] }));

const TemperatureCold = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_644_35)", children: [jsxRuntimeExports.jsx("path", { d: "M8.01999 13C8.71035 13 9.26999 12.4404 9.26999 11.75C9.26999 11.0596 8.71035 10.5 8.01999 10.5C7.32963 10.5 6.76999 11.0596 6.76999 11.75C6.76999 12.4404 7.32963 13 8.01999 13Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M8.01999 10.5V7.5", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M13.1901 1.16003V2.9286", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M11.51 2.38147L13.1901 2.92862", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M12.1511 4.36002L13.1901 2.92859", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M14.2292 4.36002L13.1901 2.92859", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M14.8703 2.38147L13.1901 2.92862", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M6.01999 9.1875V3C6.01999 2.46957 6.2307 1.96086 6.60578 1.58579C6.98085 1.21071 7.48956 1 8.01999 1C8.55042 1 9.05913 1.21071 9.4342 1.58579C9.80928 1.96086 10.02 2.46957 10.02 3V9.1875C10.5534 9.60396 10.9435 10.1765 11.1359 10.8254C11.3283 11.4742 11.3133 12.1669 11.0931 12.8068C10.8729 13.4467 10.4584 14.0019 9.90751 14.3949C9.35659 14.788 8.69673 14.9992 8.01999 14.9992C7.34325 14.9992 6.68338 14.788 6.13247 14.3949C5.58156 14.0019 5.16708 13.4467 4.94687 12.8068C4.72665 12.1669 4.71169 11.4742 4.90407 10.8254C5.09644 10.1765 5.48656 9.60396 6.01999 9.1875Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_644_35", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const TemperatureDefault = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("g", { "clip-path": "url(#clip0_607_28)", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.95933 1.93934C7.24063 1.65804 7.62216 1.5 8.01999 1.5C8.41781 1.5 8.79934 1.65804 9.08065 1.93934C9.36195 2.22064 9.51999 2.60218 9.51999 3V9.1875C9.51999 9.34147 9.59093 9.48686 9.7123 9.58161C10.1637 9.934 10.4938 10.4185 10.6565 10.9675C10.8193 11.5165 10.8067 12.1026 10.6203 12.6441C10.434 13.1856 10.0833 13.6553 9.61712 13.9879C9.15096 14.3205 8.59262 14.4992 8.01999 14.4992C7.44736 14.4992 6.88902 14.3205 6.42286 13.9879C5.9567 13.6553 5.60599 13.1856 5.41966 12.6441C5.23332 12.1026 5.22066 11.5165 5.38344 10.9675C5.54622 10.4185 5.87632 9.934 6.32768 9.58161C6.44905 9.48686 6.51999 9.34147 6.51999 9.1875V3C6.51999 2.60218 6.67802 2.22064 6.95933 1.93934ZM8.01999 0.5C7.35695 0.5 6.72106 0.763392 6.25222 1.23223C5.78338 1.70107 5.51999 2.33696 5.51999 3V8.95415C5.00285 9.41668 4.62285 10.0149 4.4247 10.6832C4.20272 11.4319 4.21999 12.2311 4.47408 12.9695C4.72817 13.7079 5.20642 14.3485 5.84208 14.802C6.47775 15.2555 7.23913 15.4992 8.01999 15.4992C8.80085 15.4992 9.56223 15.2555 10.1979 14.802C10.8336 14.3485 11.3118 13.7079 11.5659 12.9695C11.82 12.2311 11.8373 11.4319 11.6153 10.6832C11.4171 10.0149 11.0371 9.41668 10.52 8.95415V3C10.52 2.33696 10.2566 1.70107 9.78776 1.23223C9.31891 0.763392 8.68303 0.5 8.01999 0.5ZM12.5 2.76001C12.5 2.3458 12.8358 2.01001 13.25 2.01001C13.6642 2.01001 14 2.3458 14 2.76001C14 3.17422 13.6642 3.51001 13.25 3.51001C12.8358 3.51001 12.5 3.17422 12.5 2.76001ZM13.25 1.01001C12.2835 1.01001 11.5 1.79351 11.5 2.76001C11.5 3.72651 12.2835 4.51001 13.25 4.51001C14.2165 4.51001 15 3.72651 15 2.76001C15 1.79351 14.2165 1.01001 13.25 1.01001ZM8.01999 11C7.60578 11 7.26999 11.3358 7.26999 11.75C7.26999 12.1642 7.60578 12.5 8.01999 12.5C8.4342 12.5 8.76999 12.1642 8.76999 11.75C8.76999 11.3358 8.4342 11 8.01999 11ZM7.51999 10.0725C6.79712 10.2876 6.26999 10.9572 6.26999 11.75C6.26999 12.7165 7.05349 13.5 8.01999 13.5C8.98649 13.5 9.76999 12.7165 9.76999 11.75C9.76999 10.9572 9.24286 10.2876 8.51999 10.0725V5.5C8.51999 5.22386 8.29613 5 8.01999 5C7.74385 5 7.51999 5.22386 7.51999 5.5V10.0725Z", fill: "currentColor" }) }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_607_28", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const TemperatureHot = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_644_36)", children: [jsxRuntimeExports.jsx("path", { d: "M7.94 13C8.63036 13 9.19 12.4404 9.19 11.75C9.19 11.0596 8.63036 10.5 7.94 10.5C7.24965 10.5 6.69 11.0596 6.69 11.75C6.69 12.4404 7.24965 13 7.94 13Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M7.94 10.5V3", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M15.0187 3.07999C14.9026 3.19621 14.7648 3.28841 14.613 3.35131C14.4613 3.41422 14.2986 3.4466 14.1344 3.4466C13.9701 3.4466 13.8074 3.41422 13.6557 3.35131C13.5039 3.28841 13.3661 3.19621 13.25 3.07999C13.1339 2.96377 12.996 2.87157 12.8443 2.80866C12.6925 2.74576 12.5299 2.71338 12.3656 2.71338C12.2013 2.71338 12.0387 2.74576 11.8869 2.80866C11.7352 2.87157 11.5973 2.96377 11.4812 3.07999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M15.0187 5.57999C14.9026 5.69621 14.7648 5.78841 14.613 5.85131C14.4613 5.91422 14.2986 5.9466 14.1344 5.9466C13.9701 5.9466 13.8074 5.91422 13.6557 5.85131C13.5039 5.78841 13.3661 5.69621 13.25 5.57999C13.1339 5.46377 12.996 5.37157 12.8443 5.30866C12.6925 5.24576 12.5299 5.21338 12.3656 5.21338C12.2013 5.21338 12.0387 5.24576 11.8869 5.30866C11.7352 5.37157 11.5973 5.46377 11.4812 5.57999", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }), jsxRuntimeExports.jsx("path", { d: "M5.94 9.1875V3C5.94 2.46957 6.15072 1.96086 6.52579 1.58579C6.90086 1.21071 7.40957 1 7.94 1C8.47044 1 8.97914 1.21071 9.35422 1.58579C9.72929 1.96086 9.94 2.46957 9.94 3V9.1875C10.4734 9.60396 10.8635 10.1765 11.0559 10.8254C11.2483 11.4742 11.2333 12.1669 11.0131 12.8068C10.7929 13.4467 10.3784 14.0019 9.82752 14.3949C9.27661 14.788 8.61675 14.9992 7.94 14.9992C7.26326 14.9992 6.6034 14.788 6.05249 14.3949C5.50157 14.0019 5.08709 13.4467 4.86688 12.8068C4.64667 12.1669 4.63171 11.4742 4.82408 10.8254C5.01646 10.1765 5.40658 9.60396 5.94 9.1875Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_644_36", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const ThreeDotMenu = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M9 4C9 4.55228 8.55229 5 8 5C7.44772 5 7 4.55228 7 4C7 3.44772 7.44772 3 8 3C8.55229 3 9 3.44772 9 4Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M9 8C9 8.55229 8.55229 9 8 9C7.44772 9 7 8.55229 7 8C7 7.44772 7.44772 7 8 7C8.55229 7 9 7.44772 9 8Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { d: "M8 13C8.55229 13 9 12.5523 9 12C9 11.4477 8.55229 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z", fill: "currentColor" })] }));

const Time = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { d: "M8.50385 4.5C8.50385 4.22386 8.27999 4 8.00385 4C7.7277 4 7.50385 4.22386 7.50385 4.5V8.29016L11.2558 10.4341C11.4955 10.5711 11.801 10.4878 11.938 10.2481C12.075 10.0083 11.9917 9.70288 11.7519 9.56588L8.50385 7.70984V4.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z", fill: "currentColor" })] }));

const Train = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { d: "M2 17L17 2M2 14L10 22M5 11L13 19M8 8L16 16M11 5L19 13M14 2L22 10M7 22L22 7", stroke: "currentColor", strokeWidth: "1.33333", strokeLinecap: "round", strokeLinejoin: "round" }) }));

const User = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.5 4C6.5 3.17157 7.17157 2.5 8 2.5C8.82843 2.5 9.5 3.17157 9.5 4C9.5 4.82843 8.82843 5.5 8 5.5C7.17157 5.5 6.5 4.82843 6.5 4ZM8 1.5C6.61929 1.5 5.5 2.61929 5.5 4C5.5 5.38071 6.61929 6.5 8 6.5C9.38071 6.5 10.5 5.38071 10.5 4C10.5 2.61929 9.38071 1.5 8 1.5ZM8 7.5C6.28945 7.5 4.64115 8.12248 3.4195 9.24234C2.19639 10.3635 1.5 11.894 1.5 13.5C1.5 13.7761 1.72386 14 2 14C2.27614 14 2.5 13.7761 2.5 13.5C2.5 12.1887 3.0679 10.9212 4.09522 9.97949C5.124 9.03644 6.52795 8.5 8 8.5C9.47205 8.5 10.876 9.03644 11.9048 9.97949C12.9321 10.9212 13.5 12.1887 13.5 13.5C13.5 13.7761 13.7239 14 14 14C14.2761 14 14.5 13.7761 14.5 13.5C14.5 11.894 13.8036 10.3635 12.5805 9.24234C11.3588 8.12248 9.71055 7.5 8 7.5Z", fill: "currentColor" }) }));

const Vehicle = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.5 6C11.9166 6 13.2359 6.72093 14.001 7.91317L14.5447 8.76056C14.842 9.22375 15 9.76254 15 10.3129L15 11.02C15 11.5613 14.5612 12 14.02 12H13.54C13.2639 12 13.04 11.7761 13.04 11.5C13.04 11.2239 13.2639 11 13.54 11H14L14 10.3129C14 9.95402 13.897 9.60268 13.7031 9.30064L13.1593 8.45326C12.6694 7.6898 11.8803 7.18077 11 7.03976V10.7929L11.3536 11.1464C11.5488 11.3417 11.5488 11.6583 11.3536 11.8536C11.1583 12.0488 10.8417 12.0488 10.6464 11.8536L10 11.2071V6.5H10.5V6Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M1 4.5C1 3.67157 1.67157 3 2.5 3H9.5C10.3284 3 11 3.67157 11 4.5V10.5C11 11.3284 10.3284 12 9.5 12H9C8.72386 12 8.5 11.7761 8.5 11.5C8.5 11.2239 8.72386 11 9 11H9.5C9.77614 11 10 10.7761 10 10.5V4.5C10 4.22386 9.77614 4 9.5 4H2.5C2.22386 4 2 4.22386 2 4.5V10.5C2 10.7761 2.22386 11 2.5 11C2.77614 11 3 11.2239 3 11.5C3 11.7761 2.77614 12 2.5 12C1.67157 12 1 11.3284 1 10.5V4.5ZM4.5 11.5C4.5 11.2239 4.72386 11 5 11H6.5C6.77614 11 7 11.2239 7 11.5C7 11.7761 6.77614 12 6.5 12H5C4.72386 12 4.5 11.7761 4.5 11.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M10.5 9V8H14.0714V9H10.5Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M3.67859 11.8334C3.94815 11.8334 4.16668 11.6148 4.16668 11.3453C4.16668 11.0757 3.94815 10.8572 3.67859 10.8572C3.40902 10.8572 3.19049 11.0757 3.19049 11.3453C3.19049 11.6148 3.40902 11.8334 3.67859 11.8334ZM3.67859 12.8334C4.50044 12.8334 5.16668 12.1671 5.16668 11.3453C5.16668 10.5234 4.50044 9.85718 3.67859 9.85718C2.85673 9.85718 2.19049 10.5234 2.19049 11.3453C2.19049 12.1671 2.85673 12.8334 3.67859 12.8334Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M7.65478 11.8334C7.92435 11.8334 8.14288 11.6148 8.14288 11.3453C8.14288 11.0757 7.92435 10.8572 7.65478 10.8572C7.38521 10.8572 7.16669 11.0757 7.16669 11.3453C7.16669 11.6148 7.38521 11.8334 7.65478 11.8334ZM7.65478 12.8334C8.47663 12.8334 9.14288 12.1671 9.14288 11.3453C9.14288 10.5234 8.47663 9.85718 7.65478 9.85718C6.83293 9.85718 6.16669 10.5234 6.16669 11.3453C6.16669 12.1671 6.83293 12.8334 7.65478 12.8334Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12.4167 11.8333C12.6862 11.8333 12.9048 11.6148 12.9048 11.3452C12.9048 11.0757 12.6862 10.8571 12.4167 10.8571C12.1471 10.8571 11.9286 11.0757 11.9286 11.3452C11.9286 11.6148 12.1471 11.8333 12.4167 11.8333ZM12.4167 12.8333C13.2385 12.8333 13.9048 12.1671 13.9048 11.3452C13.9048 10.5234 13.2385 9.85714 12.4167 9.85714C11.5948 9.85714 10.9286 10.5234 10.9286 11.3452C10.9286 12.1671 11.5948 12.8333 12.4167 12.8333Z", fill: "currentColor" })] }));

const Vodafone = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsxs("g", { "clip-path": "url(#clip0_1617_12)", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M11.917 10.6004H14.9649V0.108058H11.9174V10.6013L11.917 10.6004ZM7.87358 0.108058L5.90012 9.88594L3.92704 0.107666H0.87912L2.99674 10.6009H8.80426L10.9212 0.107666H7.87358V0.108058Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.1004 13.8526C15.1004 14.9752 14.3576 15.885 13.4411 15.885C12.5247 15.885 11.7819 14.9752 11.7819 13.8526C11.7819 12.7305 12.5247 11.8202 13.4411 11.8202C14.3576 11.8202 15.1004 12.73 15.1004 13.8526Z", fill: "currentColor" })] }), jsxRuntimeExports.jsx("defs", { children: jsxRuntimeExports.jsx("clipPath", { id: "clip0_1617_12", children: jsxRuntimeExports.jsx("rect", { width: "16", height: "16", fill: "white" }) }) })] }));

const Warehouse = () => (jsxRuntimeExports.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.500012 12.0001C0.500012 11.724 0.723869 11.5001 1.00001 11.5001H15C15.2762 11.5001 15.5 11.724 15.5 12.0001C15.5 12.2762 15.2762 12.5001 15 12.5001H1.00001C0.723869 12.5001 0.500012 12.2762 0.500012 12.0001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M15.4889 2.89534C15.5468 3.16535 15.3748 3.43114 15.1048 3.489L1.10478 6.489C0.834764 6.54686 0.568971 6.37488 0.511111 6.10487C0.453251 5.83486 0.625235 5.56906 0.895247 5.5112L14.8952 2.5112C15.1653 2.45334 15.4311 2.62533 15.4889 2.89534Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.00001 8.0001C4.00001 7.72396 4.22387 7.5001 4.50001 7.5001H11.5C11.7762 7.5001 12 7.72396 12 8.0001V12.0001C12 12.2762 11.7762 12.5001 11.5 12.5001C11.2239 12.5001 11 12.2762 11 12.0001V8.5001H5.00001V12.0001C5.00001 12.2762 4.77615 12.5001 4.50001 12.5001C4.22387 12.5001 4.00001 12.2762 4.00001 12.0001V8.0001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.00001 10.0001C4.00001 9.72396 4.22387 9.5001 4.50001 9.5001H11.5C11.7762 9.5001 12 9.72396 12 10.0001C12 10.2762 11.7762 10.5001 11.5 10.5001H4.50001C4.22387 10.5001 4.00001 10.2762 4.00001 10.0001Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M2.00001 5.28526C2.27615 5.28526 2.50001 5.50912 2.50001 5.78526V11.9996C2.50001 12.2758 2.27615 12.4996 2.00001 12.4996C1.72387 12.4996 1.50001 12.2758 1.50001 11.9996V5.78526C1.50001 5.50912 1.72387 5.28526 2.00001 5.28526Z", fill: "currentColor" }), jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M14 2.71495C14.2762 2.71495 14.5 2.9388 14.5 3.21495V12.0006C14.5 12.2767 14.2762 12.5006 14 12.5006C13.7239 12.5006 13.5 12.2767 13.5 12.0006V3.21495C13.5 2.9388 13.7239 2.71495 14 2.71495Z", fill: "currentColor" })] }));

const Weight = () => (jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntimeExports.jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.99989 3.5C6.99989 2.94772 7.4476 2.5 7.99989 2.5C8.55217 2.5 8.99989 2.94772 8.99989 3.5C8.99989 4.05228 8.55217 4.5 7.99989 4.5C7.4476 4.5 6.99989 4.05228 6.99989 3.5ZM7.99989 1.5C6.89532 1.5 5.99989 2.39543 5.99989 3.5C5.99989 4.09735 6.26176 4.63353 6.67697 5H4.74392C4.30231 5 3.91299 5.28967 3.78609 5.71265L1.38609 13.7127C1.19361 14.3543 1.67405 15 2.34392 15H13.6559C14.3257 15 14.8062 14.3543 14.6137 13.7127L12.2137 5.71265C12.0868 5.28967 11.6975 5 11.2559 5H9.3228C9.73801 4.63353 9.99989 4.09735 9.99989 3.5C9.99989 2.39543 9.10446 1.5 7.99989 1.5ZM2.34392 14L4.74392 6H11.2559L13.6559 14H2.34392Z", fill: "currentColor" }) }));

const iconMap = {
    'add': Add,
    'aeroplane': Aeroplane,
    'airtel': Airtel,
    'alert-critical-fill': AlertCriticalFill,
    'alert-critical': AlertCritical,
    'alert-informational-fill': AlertInformationalFill,
    'alert-informational': AlertInformational,
    'arrow-bottom-left': ArrowBottomLeft,
    'arrow-down-right': ArrowDownRight,
    'arrow-down': ArrowDown,
    'arrow-top-left': ArrowTopLeft,
    'arrow-top-right': ArrowTopRight,
    'arrow-up': ArrowUp,
    'bell': Bell,
    'bsnl': Bsnl,
    'bulk-actions': BulkActions,
    'calendar-clock': CalendarClock,
    'calendar': Calendar,
    'cheap': Cheap,
    'check-alt': CheckAlt,
    'check-fill': CheckFill,
    'check': Check,
    'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'chevron-up': ChevronUp,
    'clock': Clock,
    'close-filled': CloseFilled,
    'comment': Comment,
    'copy': Copy,
    'cross-icon': CrossIcon,
    'cross': Cross,
    'cursor-pointer': CursorPointer,
    'data-stack': DataStack,
    'delete': Delete,
    'division': Division,
    'document-reuse': DocumentReuse,
    'document': Document,
    'download': Download,
    'drag': Drag,
    'edit': Edit,
    'excel': Excel,
    'expand': Expand,
    'export-file': ExportFile,
    'eye-invisible': EyeInvisible,
    'file-alt': FileAlt,
    'file-upload': FileUpload,
    'file-uploader': FileUploader,
    'file': File,
    'fill-details': FillDetails,
    'filter': Filter,
    'ft-colour': FtColour,
    'ft-gray': FtGray,
    'google-colour': GoogleColour,
    'google-gray': GoogleGray,
    'gps': Gps,
    'hamburger-menu': HamburgerMenu,
    'inbound': Inbound,
    'jio': Jio,
    'light-bulb': LightBulb,
    'link': Link,
    'loading': Loading,
    'location': Location,
    'lock': Lock,
    'logout': Logout,
    'mail': Mail,
    'map': Map$1,
    'more': More,
    'mtnl': Mtnl,
    'multiple-location': MultipleLocation,
    'multiple-time': MultipleTime,
    'multiple-weight': MultipleWeight,
    'navigator': Navigator,
    'notification': Notification,
    'organisation': Organisation,
    'outbound': Outbound,
    'password': Password,
    'pen': Pen,
    'phone-alt': PhoneAlt,
    'phone': Phone,
    'plant-alt': PlantAlt,
    'plant': Plant,
    'portable-tracking': PortableTracking,
    'preview-fill': PreviewFill,
    'preview': Preview,
    'recommended': Recommended,
    'refresh': Refresh,
    'remove': Remove,
    'road': Road,
    'rocket': Rocket,
    'round-trip': RoundTrip,
    'rupee-coin': RupeeCoin,
    'save': Save,
    'search': Search,
    'send': Send,
    'settings': Settings,
    'shake-hand': ShakeHand,
    'share': Share,
    'ship': Ship,
    'sim': Sim,
    'sort': Sort,
    'star': Star,
    'subtract': Subtract,
    'success': Success,
    'tata': Tata,
    'temperature-cold': TemperatureCold,
    'temperature-default': TemperatureDefault,
    'temperature-hot': TemperatureHot,
    'three-dot-menu': ThreeDotMenu,
    'time': Time,
    'train': Train,
    'user': User,
    'vehicle': Vehicle,
    'vodafone': Vodafone,
    'warehouse': Warehouse,
    'weight': Weight,
};

const Icon = ({ name, size = 16, color = 'currentColor', className = '', style = {}, ...props }) => {
    const IconComponent = iconMap[name];
    if (!IconComponent) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }
    const iconStyle = {
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        color: color,
        display: 'inline-block',
        verticalAlign: 'middle',
        ...style,
    };
    return (jsxRuntimeExports.jsx("span", { className: `icon ${className}`, style: iconStyle, ...props, children: jsxRuntimeExports.jsx(IconComponent, {}) }));
};
Icon.displayName = 'Icon';

const Badge = React.forwardRef(({ className, variant = 'normal', size = 'md', icon, children, ...props }, ref) => {
    // Base styles using exact Figma specifications
    const baseStyles = "inline-flex items-center justify-center font-[var(--badge-font-weight)] text-[var(--badge-font-size)] leading-[1.4] border border-transparent transition-colors";
    // Size styles - using exact Figma specifications
    const sizeStyles = {
        sm: "px-[6px] py-[1px] gap-[6px] rounded-[3px] text-[12px]", // Smaller variant
        md: "px-[8px] py-[2px] gap-[8px] rounded-[var(--badge-border-radius)] text-[var(--badge-font-size)]" // Exact Figma specs
    };
    // Variant styles using exact Figma colors
    const variantStyles = {
        normal: "bg-[var(--badge-normal-bg)] text-[var(--badge-normal-text)] hover:bg-[var(--badge-normal-hover-bg)]",
        danger: "bg-[var(--badge-danger-bg)] text-[var(--badge-danger-text)] hover:bg-[var(--badge-danger-hover-bg)] hover:text-[var(--badge-danger-hover-text)]",
        success: "bg-[var(--badge-success-bg)] text-[var(--badge-success-text)] hover:bg-[var(--badge-success-hover-bg)]",
        warning: "bg-[var(--badge-warning-bg)] text-[var(--badge-warning-text)] hover:bg-[var(--badge-warning-hover-bg)]",
        neutral: "bg-[var(--badge-neutral-bg)] text-[var(--badge-neutral-text)]"
    };
    // Interactive variant styles with borders (for interactive badges)
    const interactiveStyles = {
        normal: "border-[var(--badge-normal-border)] hover:border-[var(--badge-normal-hover-border)]",
        danger: "border-[var(--badge-danger-border)] hover:border-[var(--badge-danger-hover-border)]",
        success: "border-[var(--badge-success-border)]",
        warning: "border-[var(--badge-warning-border)]",
        neutral: "border-transparent"
    };
    const iconSize = size === 'sm' ? 12 : 14; // Exact Figma icon sizes
    return (jsxRuntimeExports.jsxs("div", { className: cn(baseStyles, sizeStyles[size], variantStyles[variant], 
        // Apply interactive styles if badge has onClick or other interactive props
        (props.onClick || props.onMouseEnter || props.onFocus) && interactiveStyles[variant], className), ref: ref, ...props, children: [icon && jsxRuntimeExports.jsx(Icon, { name: icon, size: iconSize }), children] }));
});
Badge.displayName = 'Badge';

// Generate unique class name for this button instance
const generateButtonId = () => `btn-${Math.random().toString(36).substr(2, 9)}`;
const Button = ({ variant = 'primary', size = 'md', icon, iconPosition = 'leading', disabled = false, children, className = '', ...props }) => {
    const isIconOnly = iconPosition === 'only' || (!children && icon);
    const isCircular = isIconOnly || className.includes('rounded-full');
    const buttonId = React.useMemo(() => generateButtonId(), []);
    // Base styles that work across all browsers
    const baseStyles = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: 500,
        border: '1px solid',
        borderRadius: isCircular ? '50%' : '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease-in-out',
        textDecoration: 'none',
        outline: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        lineHeight: 1,
        gap: isCircular ? '0' : '8px',
    };
    // Size configurations
    const sizeStyles = {
        sm: {
            height: '36px',
            fontSize: '14px',
            lineHeight: '14px',
            padding: isCircular ? '0' : '0 16px',
            width: isCircular ? '36px' : 'auto',
        },
        md: {
            height: '44px',
            fontSize: '16px',
            lineHeight: '16px',
            padding: isCircular ? '0' : '0 24px',
            width: isCircular ? '44px' : 'auto',
        },
        lg: {
            height: '52px',
            fontSize: '20px',
            lineHeight: '20px',
            padding: isCircular ? '0' : '0 32px',
            width: isCircular ? '52px' : 'auto',
        },
    };
    // Variant configurations
    const variantStyles = {
        primary: {
            backgroundColor: '#434f64',
            borderColor: '#434f64',
            color: '#ffffff',
        },
        secondary: {
            backgroundColor: 'transparent',
            borderColor: '#ced1d7',
            color: '#434f64',
        },
        destructive: {
            backgroundColor: '#ff3533',
            borderColor: '#ff3533',
            color: '#ffffff',
        },
        text: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: '#434f64',
        },
        link: {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: '#434f64',
            textDecoration: 'underline',
        },
    };
    // Disabled styles
    const disabledStyles = disabled
        ? {
            opacity: 0.5,
            cursor: 'not-allowed',
        }
        : {};
    // Combine all styles
    const finalStyles = {
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...disabledStyles,
    };
    // Generate CSS with hover states
    const buttonCSS = `
    .${buttonId} {
      transition: all 0.2s ease-in-out;
    }
    
    .${buttonId}:not(:disabled):hover {
      ${variant === 'primary' ? `
        background-color: #1d2a38 !important;
        border-color: #1d2a38 !important;
      ` : ''}
      ${variant === 'secondary' ? `
        background-color: #f0f1f7 !important;
        border-color: #838c9d !important;
      ` : ''}
      ${variant === 'destructive' ? `
        background-color: #b80100 !important;
        border-color: #b80100 !important;
      ` : ''}
      ${variant === 'text' ? `
        background-color: rgba(67, 79, 100, 0.1) !important;
      ` : ''}
      ${variant === 'link' ? `
        color: #1d2a38 !important;
      ` : ''}
    }
    
    .${buttonId}:not(:disabled):active {
      transform: translateY(1px);
    }
  `;
    // Icon size based on button size
    const getIconSize = () => {
        switch (size) {
            case 'sm': return 16;
            case 'md': return 20;
            case 'lg': return 24;
            default: return 20;
        }
    };
    return (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: { __html: buttonCSS } }), jsxRuntimeExports.jsxs("button", { style: finalStyles, disabled: disabled, className: `${buttonId} ${className}`, ...props, children: [isIconOnly && icon && (jsxRuntimeExports.jsx(Icon, { name: icon, size: getIconSize() })), !isIconOnly && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [icon && iconPosition === 'leading' && (jsxRuntimeExports.jsx(Icon, { name: icon, size: getIconSize() })), children, icon && iconPosition === 'trailing' && (jsxRuntimeExports.jsx(Icon, { name: icon, size: getIconSize() }))] }))] })] }));
};
Button.displayName = 'Button';

const Collapsible = ({ header, children, badges, className, isExpanded: controlledIsExpanded, onToggle, background = 'gray', stage = 'default', }) => {
    const [internalIsExpanded, setInternalIsExpanded] = React.useState(false);
    const isExpanded = controlledIsExpanded ?? internalIsExpanded;
    const handleToggle = () => {
        const newValue = !isExpanded;
        if (onToggle) {
            onToggle(newValue);
        }
        else {
            setInternalIsExpanded(newValue);
        }
    };
    // Background colors based on state and background variant
    const getBackgroundColor = () => {
        if (background === 'white') {
            return 'bg-white';
        }
        return 'bg-[#F8F8F9]';
    };
    // Show badges for submitted stage or when explicitly provided
    const shouldShowBadges = stage === 'submitted' || badges;
    const badgesToShow = badges || (stage === 'submitted' ? { loads: 1, invoices: 1, materials: 1 } : undefined);
    if (isExpanded) {
        // Expanded state: column layout with gap and bottom padding
        return (jsxRuntimeExports.jsxs("div", { className: cn('rounded-lg flex flex-col gap-8 pb-5', getBackgroundColor(), className), children: [jsxRuntimeExports.jsx("div", { className: "flex items-center p-5 border-b border-[#CED1D7]", children: jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", icon: "subtract", iconPosition: "only", onClick: handleToggle, className: cn('!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0', getBackgroundColor()) }), jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-[#434F64]", children: header }), shouldShowBadges && badgesToShow && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [badgesToShow.loads !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Loads: ", badgesToShow.loads] })), badgesToShow.invoices !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Invoices: ", badgesToShow.invoices] })), badgesToShow.materials !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Materials: ", badgesToShow.materials] }))] }))] }) }), children && (jsxRuntimeExports.jsx("div", { className: "flex flex-row self-stretch gap-2.5 px-5", children: children }))] }));
    }
    // Collapsed state: single row layout with padding
    return (jsxRuntimeExports.jsx("div", { className: cn('rounded-lg flex items-center p-5', getBackgroundColor(), className), children: jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [jsxRuntimeExports.jsx(Button, { variant: "secondary", size: "md", icon: "add", iconPosition: "only", onClick: handleToggle, className: cn('!w-10 !h-10 !p-0 !px-0 !py-0 flex items-center justify-center rounded-lg min-w-10 min-h-10 max-w-10 max-h-10 aspect-square shrink-0', getBackgroundColor()) }), jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold text-[#434F64]", children: header }), shouldShowBadges && badgesToShow && (jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [badgesToShow.loads !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Loads: ", badgesToShow.loads] })), badgesToShow.invoices !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Invoices: ", badgesToShow.invoices] })), badgesToShow.materials !== undefined && (jsxRuntimeExports.jsxs(Badge, { variant: "neutral", children: ["Materials: ", badgesToShow.materials] }))] }))] }) }));
};

const Checkbox = React.forwardRef(({ className, label, indeterminate, size = 'md', variant = 'on-light', disabled, ...props }, ref) => {
    const checkboxRef = React.useRef(null);
    React.useImperativeHandle(ref, () => checkboxRef.current);
    React.useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = indeterminate || false;
        }
    }, [indeterminate]);
    // Size styles - exact Figma specifications
    const sizeStyles = {
        sm: {
            checkbox: "w-[16px] h-[16px]",
            icon: 12,
            gap: "gap-[6px]",
            text: "text-[12px]"
        },
        md: {
            checkbox: "w-[20px] h-[20px]", // Fixed 20px from Figma
            icon: 16,
            gap: "gap-[8px]", // Fixed 8px from Figma
            text: "text-[14px]" // Fixed 14px from Figma
        }
    };
    const currentSize = sizeStyles[size];
    // Variant-specific colors from Figma
    const getVariantStyles = () => {
        if (disabled) {
            return variant === 'on-dark'
                ? {
                    bg: "#F8F8F9", // Light gray for disabled on dark
                    border: "#F8F8F9",
                    checkmark: "#434F64", // Dark checkmark
                    label: "#F8F8F9"
                }
                : {
                    bg: "#CED1D7", // Light gray for disabled on light
                    border: "#CED1D7",
                    checkmark: "#FFFFFF", // White checkmark
                    label: "#CED1D7"
                };
        }
        if (props.checked || indeterminate) {
            return variant === 'on-dark'
                ? {
                    bg: "#FFFFFF", // White background for selected on dark
                    border: "#FFFFFF",
                    checkmark: "#434F64", // Dark checkmark on white
                    label: "#FFFFFF",
                    hoverBg: "#F8F8F9",
                    hoverBorder: "#F8F8F9"
                }
                : {
                    bg: "#434F64", // Dark background for selected on light
                    border: "#434F64",
                    checkmark: "#FFFFFF", // White checkmark on dark
                    label: "#434F64",
                    hoverBg: "#1D2A38",
                    hoverBorder: "#1D2A38"
                };
        }
        // Unselected state
        return variant === 'on-dark'
            ? {
                bg: "transparent",
                border: "#FFFFFF", // White border on dark
                checkmark: "#434F64",
                label: "#FFFFFF",
                hoverBg: "#F8F8F9",
                hoverBorder: "#FFFFFF"
            }
            : {
                bg: "transparent",
                border: "#838C9D", // Gray border on light
                checkmark: "#FFFFFF",
                label: "#838C9D",
                hoverBg: "#CED1D7",
                hoverBorder: "#838C9D"
            };
    };
    const variantStyles = getVariantStyles();
    // Base checkbox styles using exact Figma specifications
    const checkboxStyles = cn(
    // Base styles
    "relative shrink-0 rounded-[4px] border-2 transition-all duration-200 cursor-pointer", 
    // Size
    currentSize.checkbox, 
    // Dynamic styles based on state and variant
    disabled
        ? `bg-[${variantStyles.bg}] border-[${variantStyles.border}] cursor-not-allowed`
        : props.checked || indeterminate
            ? `bg-[${variantStyles.bg}] border-[${variantStyles.border}] hover:bg-[${variantStyles.hoverBg}] hover:border-[${variantStyles.hoverBorder}]`
            : `bg-[${variantStyles.bg}] border-[${variantStyles.border}] hover:bg-[${variantStyles.hoverBg}] hover:border-[${variantStyles.hoverBorder}]`, 
    // Focus styles
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${variant === 'on-dark' ? '#FFFFFF' : '#434F64'}] focus-visible:ring-offset-2`, className);
    // Label styles using exact Figma specifications
    const labelStyles = cn("font-medium leading-[1.4] cursor-pointer", // 500 weight from Figma
    currentSize.text, `text-[${variantStyles.label}]`, disabled && "cursor-not-allowed");
    // Container styles
    const containerStyles = cn("inline-flex items-center", currentSize.gap);
    return (jsxRuntimeExports.jsxs("label", { className: containerStyles, children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("input", { type: "checkbox", className: "sr-only", ref: checkboxRef, disabled: disabled, ...props }), jsxRuntimeExports.jsx("div", { className: checkboxStyles, children: (props.checked || indeterminate) && !disabled && (jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: jsxRuntimeExports.jsx(Icon, { name: indeterminate ? "subtract" : "check-alt", size: currentSize.icon, color: variantStyles.checkmark }) })) })] }), label && jsxRuntimeExports.jsx("span", { className: labelStyles, children: label })] }));
});
Checkbox.displayName = 'Checkbox';

const Chicklet = React.forwardRef(({ label, variant = 'rectangular', showClose = true, onClose, onClick, disabled = false, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    // Get current state
    const currentState = isHovered ? 'hover' : 'default';
    // Base styles using exact Figma specifications
    const baseStyles = cn(
    // Layout from Figma: row with center alignment and 8px gap
    "inline-flex items-center justify-center gap-[8px]", 
    // Padding from Figma: 2px 8px
    "px-[8px] py-[2px]", 
    // Font styles from Figma: Inter 500 14px with 1.4 line height
    "text-[14px] font-medium font-inter leading-[1.4]", 
    // Text color from Figma: #434F64
    "text-[#434F64]", 
    // Transitions
    "transition-all duration-200 cursor-pointer", 
    // Disabled state
    disabled && "opacity-50 cursor-not-allowed pointer-events-none", 
    // Border radius based on variant - exact from Figma
    variant === 'rectangular' && "rounded-[4px]", // 4px border radius
    variant === 'rounded' && "rounded-[100px]", // 100px border radius (pill)
    // Background colors based on state - exact from Figma
    currentState === 'default' && "bg-[#F0F1F7]", // Default background
    currentState === 'hover' && "bg-[#CED1D7]", // Hover background
    className);
    const handleClick = (e) => {
        if (disabled)
            return;
        onClick?.();
    };
    const handleCloseClick = (e) => {
        if (disabled)
            return;
        e.stopPropagation(); // Prevent triggering parent onClick
        onClose?.();
    };
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: baseStyles, onMouseEnter: () => !disabled && setIsHovered(true), onMouseLeave: () => !disabled && setIsHovered(false), onClick: handleClick, ...props, children: [jsxRuntimeExports.jsx("span", { className: "leading-[1.4]", children: label }), showClose && (jsxRuntimeExports.jsx("button", { type: "button", className: cn(
                // Size from Figma: 14x14px
                "w-[14px] h-[14px] flex items-center justify-center", 
                // Remove default button styles
                "border-0 bg-transparent p-0 m-0", 
                // Hover and focus states
                "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#434F64] focus:ring-offset-1 rounded-sm", 
                // Disabled state
                disabled && "pointer-events-none"), onClick: handleCloseClick, "aria-label": "Remove", children: jsxRuntimeExports.jsx(Icon, { name: "cross", size: 14, color: "#434F64" // Same as text color from Figma
                 }) }))] }));
});
Chicklet.displayName = "Chicklet";

const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };

// Date picker field variants using design tokens
const datePickerFieldVariants = cva("relative flex items-center gap-[var(--spacing-x1)] rounded-[var(--radius-md)] border transition-colors", {
    variants: {
        size: {
            xl: "h-16 px-[var(--spacing-x3)] text-[var(--font-size-md)]",
            l: "h-13 px-[var(--spacing-x3)] text-[var(--font-size-md)]",
            m: "h-10 px-[var(--spacing-x3)] text-[var(--font-size-md)]"
        },
        state: {
            default: "",
            filled: "",
            disabled: "cursor-not-allowed opacity-60",
            prefilled: "",
            hover: "",
            focused: "",
            typing: ""
        },
        type: {
            normal: "border-[var(--color-border)] bg-[var(--color-white)]",
            error: "border-[var(--color-critical)] bg-[var(--color-white)]",
            warning: "border-[var(--color-warning)] bg-[var(--color-white)]",
            success: "border-[var(--color-positive)] bg-[var(--color-white)]"
        }
    },
    compoundVariants: [
        // Default state variations using design tokens
        {
            state: "default",
            type: "normal",
            className: "hover:border-[var(--color-dark-100)] focus-within:border-[var(--color-dark-100)] focus-within:shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "default",
            type: "error",
            className: "hover:border-[var(--color-critical)] focus-within:border-[var(--color-critical)] focus-within:shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "default",
            type: "warning",
            className: "hover:border-[var(--color-warning)] focus-within:border-[var(--color-warning)] focus-within:shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "default",
            type: "success",
            className: "hover:border-[var(--color-positive)] focus-within:border-[var(--color-positive)] focus-within:shadow-[0_0_0_2px_var(--color-positive-light)]"
        },
        // Disabled state using design tokens
        {
            state: "disabled",
            className: "bg-[var(--color-background)] border-[var(--color-border)]"
        },
        // Pre-filled state using design tokens
        {
            state: "prefilled",
            className: "bg-[var(--color-background)] border-[var(--color-border)]"
        },
        // Hover state using design tokens
        {
            state: "hover",
            type: "normal",
            className: "border-[var(--color-dark-100)]"
        },
        {
            state: "hover",
            type: "error",
            className: "border-[var(--color-critical)]"
        },
        {
            state: "hover",
            type: "warning",
            className: "border-[var(--color-warning)]"
        },
        {
            state: "hover",
            type: "success",
            className: "border-[var(--color-positive)]"
        },
        // Focused state using design tokens
        {
            state: "focused",
            type: "normal",
            className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "focused",
            type: "error",
            className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "focused",
            type: "warning",
            className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "focused",
            type: "success",
            className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
        },
        // Typing state (same as focused) using design tokens
        {
            state: "typing",
            type: "normal",
            className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "typing",
            type: "error",
            className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "typing",
            type: "warning",
            className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "typing",
            type: "success",
            className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
        }
    ],
    defaultVariants: {
        size: "xl",
        state: "default",
        type: "normal"
    }
});
// Text input variants using design tokens
const inputTextVariants = cva("flex-1 border-0 bg-transparent outline-none font-[var(--font-family-primary)]", {
    variants: {
        state: {
            default: "text-[var(--color-dark-50)] placeholder:text-[var(--color-dark-50)]",
            filled: "text-[var(--color-dark-100)]",
            disabled: "text-[var(--color-dark-25)] cursor-not-allowed",
            prefilled: "text-[var(--color-dark-100)]",
            hover: "text-[var(--color-dark-50)]",
            focused: "text-[var(--color-dark-50)]",
            typing: "text-[var(--color-dark-100)]"
        }
    },
    defaultVariants: {
        state: "default"
    }
});
// Calendar icon component
const CalendarIcon = ({ className }) => (jsxRuntimeExports.jsx(Icon, { name: "calendar", size: 16, className: className }));
// Time icon component using our built icon
const TimeIcon = ({ className }) => (jsxRuntimeExports.jsx(Icon, { name: "clock", size: 16, className: className }));
const DatePickerField = React.forwardRef(({ size, state, type, value, placeholder = "Value", disabled, showTime, className, onChange, onFocus, onBlur, ...props }, ref) => {
    const iconColor = state === "disabled" ? "text-gray-400" : "text-gray-800";
    return (jsxRuntimeExports.jsxs("div", { className: cn(datePickerFieldVariants({ size, state, type, className })), children: [jsxRuntimeExports.jsx("input", { ref: ref, type: "text", value: value, placeholder: placeholder, disabled: disabled, className: cn(inputTextVariants({ state })), onChange: (e) => onChange?.(e.target.value), onFocus: onFocus, onBlur: onBlur, ...props }), showTime ? (jsxRuntimeExports.jsx(TimeIcon, { className: cn("w-4 h-4", iconColor) })) : (jsxRuntimeExports.jsx(CalendarIcon, { className: cn("w-4 h-4", iconColor) }))] }));
});
DatePickerField.displayName = "DatePickerField";
const Label$1 = ({ children, required, className }) => (jsxRuntimeExports.jsxs("label", { className: cn("flex items-center gap-1 text-sm font-medium text-gray-700", className), children: [required && jsxRuntimeExports.jsx("span", { className: "text-red-500 text-xs", children: "*" }), children] }));
const DatePicker = React.forwardRef(({ label, labelPosition = "top", required, size = "xl", showTime, className, ...fieldProps }, ref) => {
    const renderLabel = () => {
        if (!label || labelPosition === "none")
            return null;
        return jsxRuntimeExports.jsx(Label$1, { required: required, children: label });
    };
    const renderField = () => (jsxRuntimeExports.jsx(DatePickerField, { ref: ref, size: size, showTime: showTime, ...fieldProps }));
    if (labelPosition === "left") {
        return (jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-4", className), children: [renderLabel(), renderField()] }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-2", className), children: [renderLabel(), renderField()] }));
});
DatePicker.displayName = "DatePicker";

// Dropdown field variants using design tokens
const dropdownFieldVariants = cva("relative flex items-center gap-[var(--spacing-x1)] rounded-[var(--radius-md)] border transition-colors cursor-pointer", {
    variants: {
        size: {
            xl: "h-16 px-[var(--spacing-x3)] text-[var(--font-size-md)]",
            l: "h-13 px-[var(--spacing-x3)] text-[var(--font-size-md)]",
            m: "h-10 px-[var(--spacing-x3)] text-[var(--font-size-md)]"
        },
        state: {
            default: "",
            filled: "",
            disabled: "cursor-not-allowed opacity-60",
            prefilled: "",
            hover: "",
            focused: "",
            typing: ""
        },
        type: {
            normal: "border-[var(--color-border)] bg-[var(--color-white)]",
            error: "border-[var(--color-critical)] bg-[var(--color-white)]",
            warning: "border-[var(--color-warning)] bg-[var(--color-white)]",
            success: "border-[var(--color-positive)] bg-[var(--color-white)]"
        }
    },
    compoundVariants: [
        // Default state variations using design tokens
        {
            state: "default",
            type: "normal",
            className: "hover:border-[var(--color-dark-100)] focus-within:border-[var(--color-dark-100)] focus-within:shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "default",
            type: "error",
            className: "hover:border-[var(--color-critical)] focus-within:border-[var(--color-critical)] focus-within:shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "default",
            type: "warning",
            className: "hover:border-[var(--color-warning)] focus-within:border-[var(--color-warning)] focus-within:shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "default",
            type: "success",
            className: "hover:border-[var(--color-positive)] focus-within:border-[var(--color-positive)] focus-within:shadow-[0_0_0_2px_var(--color-positive-light)]"
        },
        // Disabled state using design tokens
        {
            state: "disabled",
            className: "bg-[var(--color-background)] border-[var(--color-border)]"
        },
        // Pre-filled state using design tokens
        {
            state: "prefilled",
            className: "bg-[var(--color-background)] border-[var(--color-border)]"
        },
        // Hover state using design tokens
        {
            state: "hover",
            type: "normal",
            className: "border-[var(--color-dark-100)]"
        },
        {
            state: "hover",
            type: "error",
            className: "border-[var(--color-critical)]"
        },
        {
            state: "hover",
            type: "warning",
            className: "border-[var(--color-warning)]"
        },
        {
            state: "hover",
            type: "success",
            className: "border-[var(--color-positive)]"
        },
        // Focused state using design tokens
        {
            state: "focused",
            type: "normal",
            className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "focused",
            type: "error",
            className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "focused",
            type: "warning",
            className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "focused",
            type: "success",
            className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
        },
        // Typing state (same as focused) using design tokens
        {
            state: "typing",
            type: "normal",
            className: "border-[var(--color-dark-100)] shadow-[0_0_0_2px_var(--color-neutral-light)]"
        },
        {
            state: "typing",
            type: "error",
            className: "border-[var(--color-critical)] shadow-[0_0_0_2px_var(--color-critical-light)]"
        },
        {
            state: "typing",
            type: "warning",
            className: "border-[var(--color-warning)] shadow-[0_0_0_2px_var(--color-warning-light)]"
        },
        {
            state: "typing",
            type: "success",
            className: "border-[var(--color-positive)] shadow-[0_0_0_2px_var(--color-positive-light)]"
        }
    ],
    defaultVariants: {
        size: "xl",
        state: "default",
        type: "normal"
    }
});
// Text variants using design tokens
const textVariants = cva("flex-1 bg-transparent outline-none font-[var(--font-family-primary)] cursor-pointer", {
    variants: {
        state: {
            default: "text-[var(--color-dark-50)]",
            filled: "text-[var(--color-dark-100)]",
            disabled: "text-[var(--color-dark-25)] cursor-not-allowed",
            prefilled: "text-[var(--color-dark-100)]",
            hover: "text-[var(--color-dark-50)]",
            focused: "text-[var(--color-dark-50)]",
            typing: "text-[var(--color-dark-100)]"
        }
    },
    defaultVariants: {
        state: "default"
    }
});
const ChevronDownIcon = ({ className }) => (jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 16, className: className }));
const ChevronUpIcon = ({ className }) => (jsxRuntimeExports.jsx(Icon, { name: "chevron-up", size: 16, className: className }));
const DropdownField = React.forwardRef(({ size, state, type, value, placeholder = "Value", disabled, open, className, onClick, onFocus, onBlur, ...props }, ref) => {
    const iconColor = state === "disabled" ? "text-gray-400" : "text-gray-800";
    return (jsxRuntimeExports.jsxs("div", { ref: ref, className: cn(dropdownFieldVariants({ size, state, type, className })), onClick: !disabled ? onClick : undefined, onFocus: !disabled ? onFocus : undefined, onBlur: onBlur, tabIndex: disabled ? -1 : 0, role: "combobox", "aria-expanded": open, "aria-haspopup": "listbox", ...props, children: [jsxRuntimeExports.jsx("span", { className: cn(textVariants({ state })), children: value || placeholder }), open ? (jsxRuntimeExports.jsx(ChevronUpIcon, { className: cn("w-4 h-4", iconColor) })) : (jsxRuntimeExports.jsx(ChevronDownIcon, { className: cn("w-4 h-4", iconColor) }))] }));
});
DropdownField.displayName = "DropdownField";
const Label = ({ children, required, className }) => (jsxRuntimeExports.jsxs("label", { className: cn("flex items-center gap-1 text-sm font-medium text-gray-700", className), children: [required && jsxRuntimeExports.jsx("span", { className: "text-red-500 text-xs", children: "*" }), children] }));
const Caption = ({ children, type = "default", className }) => {
    const captionColors = {
        default: "text-gray-600",
        error: "text-red-500",
        warning: "text-orange-500",
        success: "text-green-500"
    };
    return (jsxRuntimeExports.jsx("p", { className: cn("text-sm pl-4", captionColors[type], className), children: children }));
};
const Dropdown = React.forwardRef(({ label, labelPosition = "top", required, size = "xl", caption = "This is caption under text", showCaption = false, className, options = [], onSelect, ...fieldProps }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(fieldProps.value || "");
    const handleClick = () => {
        if (!fieldProps.disabled) {
            setIsOpen(!isOpen);
        }
    };
    const handleSelect = (value) => {
        setSelectedValue(value);
        setIsOpen(false);
        onSelect?.(value);
    };
    const renderLabel = () => {
        if (!label || labelPosition === "none")
            return null;
        return jsxRuntimeExports.jsx(Label, { required: required, children: label });
    };
    const renderField = () => (jsxRuntimeExports.jsx(DropdownField, { ref: ref, size: size, open: isOpen, value: selectedValue, onClick: handleClick, ...fieldProps }));
    const renderCaption = () => {
        if (!showCaption)
            return null;
        const captionType = fieldProps.type === "normal" || !fieldProps.type ? "default" : fieldProps.type;
        return jsxRuntimeExports.jsx(Caption, { type: captionType, children: caption });
    };
    const renderDropdownOptions = () => {
        if (!isOpen || options.length === 0)
            return null;
        return (jsxRuntimeExports.jsx("div", { className: "absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50", children: options.map((option) => (jsxRuntimeExports.jsx("div", { className: "px-3 py-2 hover:bg-gray-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg", onClick: () => handleSelect(option.value), children: option.label }, option.value))) }));
    };
    if (labelPosition === "left") {
        return (jsxRuntimeExports.jsxs("div", { className: cn("flex items-start gap-4", className), children: [renderLabel(), jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 flex-1 relative", children: [renderField(), renderDropdownOptions(), renderCaption()] })] }));
    }
    return (jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-2 relative", className), children: [renderLabel(), renderField(), renderDropdownOptions(), renderCaption()] }));
});
Dropdown.displayName = "Dropdown";

const Input = React.forwardRef(({ className, type = 'text', label, error, helperText, leadingIcon, trailingIcon, size = 'md', variant = 'default', disabled, style, ...props }, ref) => {
    // Size styles - exact Figma specifications
    const sizeStyles = {
        sm: {
            input: "h-[48px] px-[12px] py-[12px] text-[14px]",
            icon: 14,
            gap: "gap-[8px]",
            iconPadding: { left: "pl-[40px]", right: "pr-[40px]" }
        },
        md: {
            input: "h-[var(--input-height)] px-[16px] py-[var(--input-padding-vertical)] text-[16px]", // Fixed font size instead of variable
            icon: 16, // var(--input-icon-size)
            gap: "gap-[var(--input-gap)]", // 4px from Figma
            iconPadding: { left: "pl-[48px]", right: "pr-[48px]" }
        },
        lg: {
            input: "h-[72px] px-[20px] py-[24px] text-[18px]",
            icon: 18,
            gap: "gap-[6px]",
            iconPadding: { left: "pl-[56px]", right: "pr-[56px]" }
        }
    };
    const currentSize = sizeStyles[size];
    // Base input styles using exact Figma specifications
    const inputStyles = cn(
    // Base styles
    "w-full rounded-[var(--input-border-radius)] border-[2px] transition-all duration-200", "font-[var(--font-family-primary)] font-[var(--input-font-weight)]", "placeholder:text-[var(--input-text-color)]", 
    // Size
    currentSize.input, 
    // Variant styles
    variant === 'filled'
        ? "bg-[var(--color-divider)] border-transparent focus:bg-[var(--color-white)] focus:border-[var(--color-dark-25)]"
        : "bg-[var(--input-bg)] border-[var(--color-border)]", 
    // State styles using exact Figma colors
    disabled
        ? "bg-[var(--color-divider)] border-[var(--color-border)] text-[var(--color-dark-25)] cursor-not-allowed"
        : error
            ? "border-[var(--color-critical)] focus:border-[var(--color-critical)] focus:ring-2 focus:ring-[var(--color-critical-light)]"
            : "text-[var(--input-text-color)] focus:border-[var(--color-dark-100)] focus:ring-2 focus:ring-[var(--color-neutral-light)]", 
    // Focus styles
    "focus:outline-none", className);
    // Container styles
    const containerStyles = cn("relative inline-flex items-center w-full", currentSize.gap);
    // Label styles using exact Figma specifications
    const labelStyles = cn("block text-[16px] leading-[1.4] mb-[8px]", // Fixed font size and spacing
    disabled
        ? "text-[var(--color-dark-25)]"
        : error
            ? "text-[var(--color-critical)]"
            : "text-[var(--color-dark-100)]");
    // Helper/error text styles
    const helperStyles = cn("text-[14px] leading-[1.4] mt-[6px]", // Fixed font size
    error
        ? "text-[var(--color-critical)]"
        : "text-[var(--color-dark-25)]");
    // Text color and font styling
    const getTextColor = () => {
        if (disabled)
            return "#838c9d"; // var(--color-dark-25)
        if (error)
            return "#434f64"; // var(--color-dark-100) 
        return "#838c9d"; // var(--input-text-color)
    };
    // Create inline style object for better font control
    const inputStyle = {
        color: getTextColor(),
        fontWeight: "400", // Regular weight for input text
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        ...style
    };
    const labelStyle = {
        fontWeight: "500", // Medium weight for labels
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    };
    const helperStyle = {
        fontWeight: "400", // Regular weight for helper text
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    };
    return (jsxRuntimeExports.jsxs("div", { className: "w-full", children: [label && (jsxRuntimeExports.jsx("label", { className: labelStyles, style: labelStyle, children: label })), jsxRuntimeExports.jsxs("div", { className: containerStyles, children: [leadingIcon && (jsxRuntimeExports.jsx("div", { className: "absolute left-[16px] flex items-center justify-center pointer-events-none", children: jsxRuntimeExports.jsx(Icon, { name: leadingIcon, size: currentSize.icon, color: disabled ? "var(--color-dark-25)" : "var(--input-text-color)" }) })), jsxRuntimeExports.jsx("input", { type: type, className: cn(inputStyles, leadingIcon && currentSize.iconPadding.left, // Use size-specific padding
                        trailingIcon && currentSize.iconPadding.right // Use size-specific padding
                        ), style: inputStyle, ref: ref, disabled: disabled, ...props }), trailingIcon && (jsxRuntimeExports.jsx("div", { className: "absolute right-[16px] flex items-center justify-center pointer-events-none", children: jsxRuntimeExports.jsx(Icon, { name: trailingIcon, size: currentSize.icon, color: disabled ? "var(--color-dark-25)" : "var(--input-text-color)" }) }))] }), (helperText || error) && (jsxRuntimeExports.jsx("p", { className: helperStyles, style: helperStyle, children: error || helperText }))] }));
});
Input.displayName = 'Input';

const RadioGroup = ({ name, value, defaultValue, options = [], onChange, className, size = 'md', orientation = 'vertical', children, }) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '');
    const currentValue = value !== undefined ? value : internalValue;
    const handleChange = (optionValue) => {
        if (value === undefined) {
            setInternalValue(optionValue);
        }
        onChange?.(optionValue);
    };
    // If using legacy children pattern, render children instead
    if (children && (!options || options.length === 0)) {
        return (jsxRuntimeExports.jsx("div", { className: cn("flex flex-col gap-4", className), role: "radiogroup", children: children }));
    }
    // Size styles - exact Figma specifications
    const sizeStyles = {
        sm: {
            radio: "w-[16px] h-[16px]",
            dot: "w-[6px] h-[6px]",
            gap: "gap-[6px]",
            text: "text-[12px]",
            groupGap: "gap-[12px]"
        },
        md: {
            radio: "w-[var(--radio-size)] h-[var(--radio-size)]", // 20px from Figma
            dot: "w-[10px] h-[10px]", // 10px inner dot from Figma
            gap: "gap-[var(--radio-gap)]", // 8px spacing
            text: "text-[14px]", // 14px font size from Figma
            groupGap: "gap-[16px]"
        }
    };
    const currentSize = sizeStyles[size];
    // Container styles
    const groupStyles = cn("flex", orientation === 'horizontal' ? `flex-row ${currentSize.groupGap}` : `flex-col ${currentSize.groupGap}`, className);
    // Font styling for consistent design system
    const getLabelColor = (isSelected, isDisabled) => {
        if (isDisabled)
            return "#ced1d7"; // var(--radio-disabled-label)
        return isSelected ? "#434f64" : "#434f64"; // var(--radio-selected-label) for both states
    };
    const labelStyle = {
        fontWeight: "500", // Medium weight matching checkbox pattern
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    };
    return (jsxRuntimeExports.jsx("div", { className: groupStyles, role: "radiogroup", children: options.map((option) => {
            const isSelected = currentValue === option.value;
            const isDisabled = option.disabled;
            // Radio button styles using exact Figma specifications
            const radioStyles = cn(
            // Base styles
            "relative shrink-0 rounded-full border-2 transition-all duration-200 cursor-pointer", 
            // Size
            currentSize.radio, 
            // State styles using exact Figma colors - direct color values for reliability
            isDisabled
                ? "bg-transparent border-[#ced1d7] cursor-not-allowed"
                : isSelected
                    ? "bg-transparent border-[#434f64] hover:bg-[#ced1d7] hover:border-[#434f64]"
                    : "bg-transparent border-[#838c9d] hover:bg-[#ced1d7] hover:border-[#838c9d]", 
            // Focus styles
            "focus-within:outline-none focus-within:ring-2 focus-within:ring-[#434f64] focus-within:ring-offset-2");
            // Label styles using exact Figma specifications
            const labelStyles = cn("leading-[1.4] cursor-pointer", // Remove font-weight from class, use inline style
            currentSize.text, isDisabled
                ? "cursor-not-allowed"
                : "");
            // Container styles for each radio option
            const optionStyles = cn("inline-flex items-center", currentSize.gap);
            // Individual label style with proper color
            const individualLabelStyle = {
                ...labelStyle,
                color: getLabelColor(isSelected, !!isDisabled),
            };
            return (jsxRuntimeExports.jsxs("label", { className: optionStyles, children: [jsxRuntimeExports.jsxs("div", { className: "relative", children: [jsxRuntimeExports.jsx("input", { type: "radio", name: name, value: option.value, checked: isSelected, disabled: isDisabled, onChange: () => handleChange(option.value), className: "sr-only" }), jsxRuntimeExports.jsx("div", { className: radioStyles, children: isSelected && !isDisabled && (jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: jsxRuntimeExports.jsx("div", { className: cn("rounded-full bg-[#434f64]", // Direct color value
                                        currentSize.dot) }) })) })] }), option.label && (jsxRuntimeExports.jsx("span", { className: labelStyles, style: individualLabelStyle, children: option.label }))] }, option.value));
        }) }));
};
// Legacy compatibility exports
const RadioGroupItem = ({ children, ...props }) => {
    console.warn('RadioGroupItem is deprecated. Use RadioGroup with options prop instead.');
    return jsxRuntimeExports.jsx("div", { ...props, children: children });
};
RadioGroup.displayName = 'RadioGroup';

const Switch = React.forwardRef(({ className, label, size = 'md', disabled, ...props }, ref) => {
    // Size styles - exact Figma specifications
    const sizeStyles = {
        sm: {
            track: "w-[30px] h-[16px]",
            thumb: "w-[14px] h-[14px]",
            gap: "gap-[6px]",
            text: "text-[12px]"
        },
        md: {
            track: "w-[34px] h-[14px]", // Exact Figma dimensions from switch track
            thumb: "w-[20px] h-[20px]", // Exact Figma dimensions from thumb (Ellipse 1347)
            gap: "gap-[8px]",
            text: "text-[14px]"
        }
    };
    const currentSize = sizeStyles[size];
    // Track styles using exact Figma specifications
    const trackStyles = cn(
    // Base styles
    "relative inline-flex shrink-0 rounded-full border-0 transition-all duration-200 cursor-pointer", 
    // Size
    currentSize.track, 
    // State styles using exact Figma colors
    disabled
        ? "bg-[var(--switch-disabled-bg)]" // rgba(139, 139, 139, 0.2) from Figma
        : props.checked
            ? "bg-[var(--switch-on-bg)]" // #CED1D7 from Figma (track when on)
            : "bg-[var(--switch-off-bg)]", // #838C9D from Figma (track when off)
    // Focus styles
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-neutral-light)] focus-within:ring-offset-2", className);
    // Thumb styles using exact Figma specifications
    const thumbStyles = cn(
    // Base styles
    "absolute top-1/2 transform -translate-y-1/2 rounded-full transition-all duration-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.35)]", // Exact shadow from Figma
    // Size
    currentSize.thumb, 
    // Position - exact calculations from Figma layout
    props.checked
        ? "translate-x-[14px]" // When on: thumb moves right (34px track - 20px thumb = 14px)
        : "translate-x-[-3px]", // When off: thumb position (offset to align properly)
    // Colors using exact Figma specifications
    disabled
        ? "bg-[var(--switch-disabled-thumb)]" // #838C9D for disabled state
        : props.checked
            ? "bg-[var(--switch-thumb-on)]" // #434F64 when on from Figma
            : "bg-[var(--switch-thumb-off)]" // #FFFFFF when off from Figma
    );
    // Label styles using exact Figma specifications (similar to checkbox)
    const labelStyles = cn("font-[var(--checkbox-font-weight)] leading-[1.4] cursor-pointer", // 500 weight
    currentSize.text, disabled
        ? "text-[var(--color-dark-25)] cursor-not-allowed"
        : "text-[var(--color-dark-100)]");
    // Container styles
    const containerStyles = cn("inline-flex items-center", currentSize.gap);
    return (jsxRuntimeExports.jsxs("label", { className: containerStyles, children: [jsxRuntimeExports.jsxs("div", { className: trackStyles, children: [jsxRuntimeExports.jsx("input", { type: "checkbox", className: "sr-only", ref: ref, disabled: disabled, ...props }), jsxRuntimeExports.jsx("div", { className: thumbStyles })] }), label && jsxRuntimeExports.jsx("span", { className: labelStyles, children: label })] }));
});
Switch.displayName = 'Switch';

// Tab Item component using exact Figma specifications
const TabContent = ({ label, icon, badge, badgeCount, notification, state, type }) => (jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-2", 
    // Layout based on type
    type === 'primary' ? "justify-start" : "justify-center"), children: [icon && (jsxRuntimeExports.jsx(Icon, { name: "check", size: 16, className: cn(state === 'selected' ? 'text-[#434F64]' : 'text-[#434F64]') })), jsxRuntimeExports.jsx("span", { className: cn("text-base leading-[22.4px]", state === 'selected' ? 'font-semibold text-[#434F64]' : 'font-normal text-[#434F64]'), children: label }), badge && (jsxRuntimeExports.jsx(Badge, { variant: "normal", className: "!text-[#5F697B] !bg-white border border-[#CED1D7] !text-sm !font-medium !px-1 !py-0.5 !h-6", children: badgeCount })), notification && (jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-[#FF3533] rounded-full" }))] }));
const TabItem = React.forwardRef(({ label, badge = false, badgeCount = "56", notification = false, icon = false, active = false, type = 'primary', onSelect, className, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    // Get current state
    const currentState = active ? 'selected' : (isHovered ? 'hover' : 'unselected');
    // Base styles using exact Figma specifications
    const baseStyles = cn("relative flex transition-all cursor-pointer", 
    // Padding based on type - exact from Figma
    type === 'primary'
        ? "px-8 py-3" // 32px horizontal, 12px vertical
        : "px-4 py-2", // 16px horizontal, 8px vertical
    // Border radius based on type - exact from Figma
    type === 'primary' && "rounded-none", // No border radius
    type === 'secondary' && "rounded-lg", // 8px border radius
    type === 'tertiary' && "rounded-full", // 100px border radius (full)
    // Border styles based on state and type
    type === 'primary' && [
        "border-b",
        currentState === 'selected'
            ? "border-b-4 border-[#434F64]"
            : currentState === 'hover'
                ? "border-b border-[#838C9D]"
                : "border-b border-[#CED1D7]"
    ], (type === 'secondary' || type === 'tertiary') && [
        "border",
        currentState === 'selected' || currentState === 'hover'
            ? "border-[#838C9D]"
            : "border-[#838C9D]"
    ], 
    // Background colors based on state and type
    currentState === 'selected' && [
        type === 'primary' && "bg-transparent",
        (type === 'secondary' || type === 'tertiary') && "bg-[#F0F1F7]"
    ], currentState === 'hover' && [
        type === 'primary' && "bg-[#F0F1F7]",
        (type === 'secondary' || type === 'tertiary') && "bg-[#F8F8F9]"
    ], currentState === 'unselected' && "bg-transparent", className);
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: baseStyles, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onClick: onSelect, ...props, children: jsxRuntimeExports.jsx(TabContent, { label: label, icon: icon, badge: badge, badgeCount: badgeCount, notification: notification, state: currentState, type: type }) }));
});
TabItem.displayName = "TabItem";
const Tabs = React.forwardRef(({ showLine = true, tabs, activeTab = 0, onTabChange, type = 'primary', className, ...props }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = React.useState(activeTab);
    const handleTabSelect = (index) => {
        setInternalActiveTab(index);
        onTabChange?.(index);
    };
    // Container styles using exact Figma specifications
    const containerStyles = cn("flex", 
    // Only show underline for primary type when showLine is true
    showLine && type === 'primary' && "border-b border-[#CED1D7]", 
    // Spacing between tabs for secondary and tertiary
    (type === 'secondary' || type === 'tertiary') && "gap-2", className);
    return (jsxRuntimeExports.jsx("div", { ref: ref, className: containerStyles, ...props, children: tabs.map((tab, index) => (jsxRuntimeExports.jsx(TabItem, { label: tab.label, badge: tab.badge, badgeCount: tab.badgeCount, notification: tab.notification, icon: tab.icon, type: type, active: index === internalActiveTab, onSelect: () => handleTabSelect(index) }, index))) }));
});
Tabs.displayName = "Tabs";

const TableCellText = ({ type = 'primary', children, className }) => {
    return (jsxRuntimeExports.jsx("div", { className: cn(
        // Base styles from Figma
        "text-[16px] font-normal font-inter leading-[1.4]", 
        // Type-specific colors from Figma
        type === 'primary' && "text-[#434F64]", // --color-dark-100
        type === 'secondary' && "text-[#5F697B]", // --color-dark-50
        className), children: children }));
};

const TableCell = ({ backgroundColor = 'white', borderStyle = 'single', children, className }) => {
    return (jsxRuntimeExports.jsx("td", { className: cn(
        // Base padding from Figma: 32px 20px 32px 8px for data cells
        "py-[32px] px-[20px] pl-[8px]", 
        // Background colors from Figma - exact hex values
        backgroundColor === 'white' && "bg-[#FFFFFF]", // White background
        backgroundColor === 'bg' && "bg-[#F8F8F9]", // Light gray background
        // Border styles from Figma: #CED1D7 border color
        borderStyle === 'single' && "border-b border-[#CED1D7]", borderStyle === 'double' && "border-b-2 border-[#CED1D7]", 
        // Vertical alignment
        "align-top", className), children: jsxRuntimeExports.jsx("div", { className: "flex flex-col justify-center gap-[8px] min-h-[19px]", children: children }) }));
};

const TableHeaderItem = ({ type = 'text', colorVariant = 'dark25', sortable = false, draggable = false, sortDirection = null, checkboxProps, children, onClick, className }) => {
    // Color mappings from Figma - exact specifications
    const getBackgroundColor = () => {
        switch (colorVariant) {
            case 'dark25': return 'bg-[#838C9D]'; // Primary variant header
            case 'bg': return 'bg-[#F8F8F9]'; // Secondary variant header  
            case 'white': return 'bg-[#FFFFFF]';
            default: return 'bg-[#838C9D]';
        }
    };
    const getTextColor = () => {
        switch (colorVariant) {
            case 'dark25': return 'text-[#FFFFFF]'; // White text on dark header
            case 'bg': return 'text-[#5F697B]'; // Dark text on light header
            case 'white': return 'text-[#5F697B]';
            default: return 'text-[#FFFFFF]';
        }
    };
    const getBorderStyles = () => {
        switch (colorVariant) {
            case 'dark25': return ''; // No border for primary dark header
            case 'bg': return 'border border-[#F0F1F7]'; // Light border for secondary
            case 'white': return 'border border-[#F0F1F7]';
            default: return '';
        }
    };
    const getIconColor = () => {
        return colorVariant === 'dark25' ? '#FFFFFF' : '#5F697B';
    };
    return (jsxRuntimeExports.jsx("th", { className: cn(
        // Base styles from Figma: consistent with data cells
        "h-[50px] text-left", // Fixed height from Figma
        // Match TableCell padding exactly for proper alignment
        type === 'checkbox' ? "py-[32px] px-[20px] pl-[8px]" : "py-[15px] px-[20px] pl-[8px]", getBackgroundColor(), getBorderStyles(), 
        // Cursor for interactive elements
        (sortable || onClick) && "cursor-pointer hover:opacity-80 transition-opacity", className), onClick: onClick, children: jsxRuntimeExports.jsxs("div", { className: cn("flex items-center h-full", 
            // Center checkbox in its column to match data row alignment
            type === 'checkbox' ? "justify-center" : "justify-start"), children: [draggable && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-[2px] w-[8px] h-[8px] mr-[10px]", children: [jsxRuntimeExports.jsx("div", { className: cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]") }), jsxRuntimeExports.jsx("div", { className: cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]") }), jsxRuntimeExports.jsx("div", { className: cn("w-full h-[1px]", colorVariant === 'dark25' ? "bg-[#FFFFFF]" : "bg-[#5F697B]") })] })), type === 'checkbox' && (jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-full", children: jsxRuntimeExports.jsx(Checkbox, { ...checkboxProps, size: "md", variant: colorVariant === 'dark25' ? 'on-dark' : 'on-light' }) })), type === 'text' && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[6px]", children: [jsxRuntimeExports.jsx("span", { className: cn(
                            // Typography from Figma: Inter 600 16px/19.36px
                            "text-[16px] font-semibold font-inter leading-[1.21]", getTextColor()), children: children }), sortable && (jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center w-[10px] h-[14px]", children: [jsxRuntimeExports.jsx(Icon, { name: "chevron-up", size: 8, color: sortDirection === 'asc' ? getIconColor() : `${getIconColor()}40` }), jsxRuntimeExports.jsx(Icon, { name: "chevron-down", size: 8, color: sortDirection === 'desc' ? getIconColor() : `${getIconColor()}40` })] }))] }))] }) }));
};

const TableHeader = ({ columns, variant = 'primary', selectable, selectedRows = [], allRowIds = [], onSelectionChange, onSort, sortColumn, sortDirection }) => {
    const isAllSelected = allRowIds.length > 0 && selectedRows.length === allRowIds.length;
    const isIndeterminate = selectedRows.length > 0 && selectedRows.length < allRowIds.length;
    const handleSelectAll = React.useCallback(() => {
        if (!onSelectionChange)
            return;
        if (isAllSelected) {
            onSelectionChange([]);
        }
        else {
            onSelectionChange(allRowIds);
        }
    }, [isAllSelected, allRowIds, onSelectionChange]);
    const handleSort = React.useCallback((column) => {
        if (!column.sortable || !onSort)
            return;
        let newDirection = 'asc';
        if (sortColumn === column.key) {
            if (sortDirection === 'asc') {
                newDirection = 'desc';
            }
            else if (sortDirection === 'desc') {
                newDirection = null;
            }
        }
        onSort(column.key, newDirection);
    }, [sortColumn, sortDirection, onSort]);
    // Header color variant based on table variant - exact Figma mapping
    const headerColorVariant = variant === 'primary' ? 'dark25' : 'bg';
    return (jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { children: [selectable && (jsxRuntimeExports.jsx(TableHeaderItem, { type: "checkbox", colorVariant: headerColorVariant, checkboxProps: {
                        checked: isAllSelected,
                        indeterminate: isIndeterminate,
                        onChange: handleSelectAll
                    }, className: "w-[92px]" // Exact width from Figma
                 })), columns.map((column) => (jsxRuntimeExports.jsx(TableHeaderItem, { colorVariant: headerColorVariant, sortable: column.sortable, sortDirection: sortColumn === column.key ? sortDirection : null, onClick: () => column.sortable && handleSort(column), className: cn(column.width && `w-[${column.width}]`), children: column.title }, column.key)))] }) }));
};
const TableRowComponent = ({ row, columns, index, variant = 'primary', selectable, selected = false, onSelectionChange }) => {
    const handleSelect = React.useCallback(() => {
        if (!onSelectionChange)
            return;
        onSelectionChange(row.id, !selected);
    }, [row.id, selected, onSelectionChange]);
    const renderCellContent = React.useCallback((column, value) => {
        if (column.render) {
            return column.render(value, row, index);
        }
        switch (column.type) {
            case 'number':
                return (jsxRuntimeExports.jsx(TableCellText, { type: "primary", children: typeof value === 'number' ? value.toLocaleString() : value }));
            case 'date':
                return (jsxRuntimeExports.jsx(TableCellText, { type: "primary", children: value instanceof Date ? value.toLocaleDateString() : value }));
            default:
                return (jsxRuntimeExports.jsx(TableCellText, { type: "primary", children: value }));
        }
    }, [row, index]);
    // Determine cell background based on variant and row position
    const getCellBackground = (columnIndex) => {
        if (variant === 'secondary') {
            return 'white'; // Secondary variant: all white
        }
        // Primary variant: alternating pattern based on row index
        // Even rows (0, 2, 4...) = white, Odd rows (1, 3, 5...) = bg
        return index % 2 === 0 ? 'white' : 'bg';
    };
    return (jsxRuntimeExports.jsxs("tr", { className: cn("hover:bg-gray-50 transition-colors duration-200", selected && "ring-2 ring-blue-500"), children: [selectable && (jsxRuntimeExports.jsx(TableCell, { backgroundColor: getCellBackground(), borderStyle: "single", className: "w-[92px]" // Exact width from Figma
                , children: jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: jsxRuntimeExports.jsx(Checkbox, { checked: selected, onChange: handleSelect, size: "md" }) }) })), columns.map((column, columnIndex) => (jsxRuntimeExports.jsx(TableCell, { backgroundColor: getCellBackground(), borderStyle: "single", children: renderCellContent(column, row[column.key]) }, column.key)))] }));
};
const Pagination = ({ currentPage, totalPages, totalItems, pageSize, onPageChange }) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        }
        else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    const startItem = ((currentPage - 1) * pageSize) + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    return (jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-[var(--spacing-x3)] py-[var(--spacing-x3)] border-t border-[var(--color-divider)] bg-[var(--color-background)]", children: [jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[var(--spacing-x4)]", children: jsxRuntimeExports.jsxs(TableCellText, { type: "secondary", children: ["Showing ", startItem, "-", endItem, " of ", totalItems, " results"] }) }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[var(--spacing-x1)]", children: [jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", disabled: currentPage === 1, onClick: () => onPageChange(currentPage - 1), className: "rounded-full", children: [jsxRuntimeExports.jsx(Icon, { name: "chevron-left", size: 16 }), "Previous"] }), jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[var(--spacing-x1)]", children: getVisiblePages().map((page, index) => (jsxRuntimeExports.jsx(React.Fragment, { children: page === '...' ? (jsxRuntimeExports.jsx(TableCellText, { type: "secondary", className: "px-[var(--spacing-x2)] py-[var(--spacing-x1)]", children: "..." })) : (jsxRuntimeExports.jsx(Button, { variant: currentPage === page ? "primary" : "secondary", size: "sm", onClick: () => onPageChange(page), className: "rounded-full", children: page })) }, index))) }), jsxRuntimeExports.jsxs(Button, { variant: "secondary", size: "sm", disabled: currentPage === totalPages, onClick: () => onPageChange(currentPage + 1), className: "rounded-full", children: ["Next", jsxRuntimeExports.jsx(Icon, { name: "chevron-right", size: 16 })] })] })] }));
};
// Main Table Component
const Table = ({ columns, data, variant = 'primary', selectable = false, selectedRows = [], onSelectionChange, onSort, sortColumn, sortDirection, pagination, loading = false, emptyMessage, className }) => {
    const allRowIds = data.map(row => row.id);
    const handleRowSelectionChange = React.useCallback((rowId, selected) => {
        if (!onSelectionChange)
            return;
        if (selected) {
            onSelectionChange([...selectedRows, rowId]);
        }
        else {
            onSelectionChange(selectedRows.filter(id => id !== rowId));
        }
    }, [selectedRows, onSelectionChange]);
    if (loading) {
        return null;
    }
    return (jsxRuntimeExports.jsxs("div", { className: cn("border border-[var(--color-border)] rounded-[var(--spacing-x2)] overflow-hidden bg-[var(--color-white)]", className), children: [jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse", children: [jsxRuntimeExports.jsx(TableHeader, { columns: columns, variant: variant, selectable: selectable, selectedRows: selectedRows, allRowIds: allRowIds, onSelectionChange: onSelectionChange, onSort: onSort, sortColumn: sortColumn, sortDirection: sortDirection }), jsxRuntimeExports.jsx("tbody", { children: data.length === 0 ? (jsxRuntimeExports.jsx("tr", { children: jsxRuntimeExports.jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "px-[var(--spacing-x3)] py-[var(--spacing-x8)] text-center", children: jsxRuntimeExports.jsx(TableCellText, { type: "secondary", children: emptyMessage }) }) })) : (data.map((row, index) => (jsxRuntimeExports.jsx(TableRowComponent, { row: row, columns: columns, index: index, variant: variant, selectable: selectable, selected: selectedRows.includes(row.id), onSelectionChange: handleRowSelectionChange }, row.id)))) })] }) }), pagination && (jsxRuntimeExports.jsx(Pagination, { ...pagination }))] }));
};
Table.displayName = 'Table';

const TableCellItem = ({ text, textType = 'primary', prefixIcon, suffixIcon, badge, className }) => {
    return (jsxRuntimeExports.jsxs("div", { className: cn(
        // Base layout from Figma: row with center alignment and 8px gap
        "flex items-center gap-[8px]", className), children: [prefixIcon && (jsxRuntimeExports.jsx(Icon, { name: prefixIcon, size: 14, color: "#434F64" // --color-dark-100 from Figma
             })), text && (jsxRuntimeExports.jsx(TableCellText, { type: textType, children: text })), badge, suffixIcon && (jsxRuntimeExports.jsx(Icon, { name: suffixIcon, size: 16, color: "#434F64" // --color-dark-100 from Figma
             }))] }));
};

function TypographyExample({ title, details, usage, token, className, children }) {
    return (jsxRuntimeExports.jsxs("div", { className: cn("grid grid-cols-1 md:grid-cols-4 gap-6 py-6 border-b border-[var(--color-border)]", className), children: [jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: title }), jsxRuntimeExports.jsx("div", { className: "text-[var(--font-size-sm)] text-[var(--color-dark-50)]", children: details }), jsxRuntimeExports.jsx("div", { className: "text-[var(--font-size-sm)] text-[var(--color-dark-50)]", children: usage }), jsxRuntimeExports.jsx("div", { className: "text-[var(--font-size-sm)] text-[var(--color-dark-25)]", children: token }), jsxRuntimeExports.jsx("div", { className: "col-span-full mt-[var(--spacing-x2)]", children: children })] }));
}
function Typography() {
    return (jsxRuntimeExports.jsxs("div", { className: "w-full space-y-[var(--spacing-x10)]", children: [jsxRuntimeExports.jsx("h1", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x8)] text-[var(--color-dark-100)]", children: "Typography" }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Type Face: Inter" }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-xxl)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-lg)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-md)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-md)] font-[var(--font-weight-semibold)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." }), jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-md)] font-[var(--font-weight-medium)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Freight Tiger is building logistics infrastructure to transform commerce in India." })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Title" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]", children: [jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Font" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Details" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Usage" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Token" })] }), jsxRuntimeExports.jsx(TypographyExample, { title: "H1", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-xxl);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-regular);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Page Title", token: "typography.fontSize.xxl", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] text-[var(--color-dark-100)]", children: "H1" }) }), jsxRuntimeExports.jsx(TypographyExample, { title: "H2", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-xl);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-semibold);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Section Title", token: "typography.fontSize.xl", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-xl)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]", children: "H2" }) })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Display" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]", children: [jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Font" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Details" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Usage" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Token" })] }), jsxRuntimeExports.jsx(TypographyExample, { title: "Display-bold", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-lg);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-semibold);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "High level data, summary, dashboard content", token: "typography.fontSize.lg", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-lg)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]", children: "Display-bold" }) })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Button" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]", children: [jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Font" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Details" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Usage" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Token" })] }), jsxRuntimeExports.jsx(TypographyExample, { title: "Button", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-lg);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-medium);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Button Text", token: "typography.fontSize.lg", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-lg)] font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Button" }) })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[var(--font-size-xxl)] font-[var(--font-weight-regular)] mb-[var(--spacing-x6)] text-[var(--color-dark-100)]", children: "Body" }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-4 mb-4 border-b border-[var(--color-border)] py-[var(--spacing-x2)]", children: [jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Font" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Details" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Usage" }), jsxRuntimeExports.jsx("div", { className: "font-[var(--font-weight-medium)] text-[var(--color-dark-100)]", children: "Token" })] }), jsxRuntimeExports.jsx(TypographyExample, { title: "Primary-Semi-bold", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-md);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-semibold);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Page content, display data and information", token: "typography.fontSize.md", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-md)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]", children: "Primary-Semi-bold" }) }), jsxRuntimeExports.jsx(TypographyExample, { title: "Primary-Regular", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-md);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-regular);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Page content, display data and information", token: "typography.fontSize.md", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-md)] font-[var(--font-weight-regular)] text-[var(--color-dark-100)]", children: "Primary-Regular" }) }), jsxRuntimeExports.jsx(TypographyExample, { title: "Secondary-Semibold", details: jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { children: "font-family: var(--font-family-primary);" }), jsxRuntimeExports.jsx("p", { children: "font-size: var(--font-size-sm);" }), jsxRuntimeExports.jsx("p", { children: "font-weight: var(--font-weight-semibold);" }), jsxRuntimeExports.jsx("p", { children: "line-height: 140%;" })] }), usage: "Secondary information", token: "typography.fontSize.sm", children: jsxRuntimeExports.jsx("p", { className: "text-[var(--font-size-sm)] font-[var(--font-weight-semibold)] text-[var(--color-dark-100)]", children: "Secondary-Semibold" }) })] })] }));
}

const ColorSwatch = ({ colorName, colorVar, colorValue, textColor = "text-black" }) => {
    return (jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [jsxRuntimeExports.jsx("div", { className: "h-24 w-24 rounded-md mb-2 border border-gray-200", style: { backgroundColor: colorValue } }), jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: colorName }), jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: colorVar }), jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: colorValue })] })] }));
};
const ColorGroup = ({ title, children }) => {
    return (jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-4", children: title }), jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: children })] }));
};
function Colors() {
    return (jsxRuntimeExports.jsxs("div", { className: "w-full space-y-10", children: [jsxRuntimeExports.jsx("h1", { className: "text-[40px] font-light mb-8", children: "Colors" }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[24px] font-semibold mb-6", children: "Base Colors" }), jsxRuntimeExports.jsx("p", { className: "mb-6", children: "These are the foundational colors used throughout the design system." }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: [jsxRuntimeExports.jsx(ColorSwatch, { colorName: "White", colorVar: "--white", colorValue: "#ffffff" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Dark 100", colorVar: "--dark-100", colorValue: "#434f64", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Dark 50", colorVar: "--dark-50", colorValue: "#5f697b", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Dark 25", colorVar: "--dark-25", colorValue: "#838c9d" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Box Border", colorVar: "--box-border", colorValue: "#ced1d7" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Divider", colorVar: "--divider", colorValue: "#f0f1f7" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Background", colorVar: "--bg", colorValue: "#f8f8f9" })] })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[24px] font-semibold mb-6", children: "Semantic Colors" }), jsxRuntimeExports.jsxs(ColorGroup, { title: "Critical", children: [jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Critical Dark", colorVar: "--critical-dark", colorValue: "#b80100", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Critical", colorVar: "--critical", colorValue: "#ff3533", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Critical Light", colorVar: "--critical-light", colorValue: "#ffeaea" })] }), jsxRuntimeExports.jsxs(ColorGroup, { title: "Warning", children: [jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Warning Dark", colorVar: "--warning-dark", colorValue: "#dd6a00", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Warning", colorVar: "--warning", colorValue: "#ff6c19" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Warning Light", colorVar: "--warning-light", colorValue: "#ffebdc" })] }), jsxRuntimeExports.jsxs(ColorGroup, { title: "Positive", children: [jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Positive Dark", colorVar: "--positive-dark", colorValue: "#00763d", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Positive", colorVar: "--positive", colorValue: "#00c638", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Positive Light", colorVar: "--positive-light", colorValue: "#dfffe8" })] }), jsxRuntimeExports.jsxs(ColorGroup, { title: "Neutral", children: [jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Neutral Dark", colorVar: "--neutral-dark", colorValue: "#006ed3", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Neutral", colorVar: "--neutral", colorValue: "#1890ff", textColor: "text-white" }), jsxRuntimeExports.jsx(ColorSwatch, { colorName: "Neutral Light", colorVar: "--neutral-light", colorValue: "#ecf6ff" })] })] }), jsxRuntimeExports.jsxs("section", { children: [jsxRuntimeExports.jsx("h2", { className: "text-[24px] font-semibold mb-6", children: "Button Colors" }), jsxRuntimeExports.jsx("p", { className: "mb-6", children: "These are the specific colors used for button variants in different states." }), jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Primary Button" }), jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200", children: [jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "State" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Variable" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Value" })] }) }), jsxRuntimeExports.jsxs("tbody", { children: [jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-100) / #434f64" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--white) / #ffffff" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#374151" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#1f2937" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-danger-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical) / #ff3533" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-danger-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--white) / #ffffff" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-danger-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical-dark) / #b80100" })] }), jsxRuntimeExports.jsxs("tr", { children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-primary-danger-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#7f1d1d" })] })] })] }) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Secondary Button" }), jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200", children: [jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "State" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Variable" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Value" })] }) }), jsxRuntimeExports.jsxs("tbody", { children: [jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--bg) / #f8f8f9" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-100) / #434f64" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--divider) / #f0f1f7" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--box-border) / #ced1d7" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-danger-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical-light) / #ffeaea" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-danger-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical) / #ff3533" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-danger-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#fecaca" })] }), jsxRuntimeExports.jsxs("tr", { children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-secondary-danger-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#fca5a5" })] })] })] }) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Text Button" }), jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200", children: [jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "State" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Variable" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Value" })] }) }), jsxRuntimeExports.jsxs("tbody", { children: [jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "transparent" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-100) / #434f64" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--bg) / #f8f8f9" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--divider) / #f0f1f7" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-danger-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "transparent" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-danger-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical) / #ff3533" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-danger-hover-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical-light) / #ffeaea" })] }), jsxRuntimeExports.jsxs("tr", { children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-text-danger-active-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "#fecaca" })] })] })] }) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Link Button" }), jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200", children: [jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "State" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Variable" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Value" })] }) }), jsxRuntimeExports.jsxs("tbody", { children: [jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "transparent" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Normal (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-100) / #434f64" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-hover-decoration" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "underline" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-active-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-50) / #5f697b" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Background)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-danger-bg" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "transparent" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger (Text)" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-danger-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical) / #ff3533" })] }), jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Hover" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-danger-hover-decoration" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "underline" })] }), jsxRuntimeExports.jsxs("tr", { children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Danger Active" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-link-danger-active-text" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--critical-dark) / #b80100" })] })] })] }) })] }), jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-8", children: [jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold mb-4", children: "Button States" }), jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [jsxRuntimeExports.jsx("thead", { children: jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-200", children: [jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "State" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Color Variable" }), jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Value" })] }) }), jsxRuntimeExports.jsxs("tbody", { children: [jsxRuntimeExports.jsxs("tr", { className: "border-b border-gray-100", children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Focus Ring" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-focus-ring" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "var(--dark-100) / #434f64" })] }), jsxRuntimeExports.jsxs("tr", { children: [jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "Disabled Opacity" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-xs", children: "--button-disabled-opacity" }), jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: "0.5" })] })] })] }) })] })] })] }));
}

// Import global styles
// Global styles - consumers should import this manually
const globalStyles = './styles/globals.css';

exports.Badge = Badge;
exports.Button = Button;
exports.Caption = Caption;
exports.Checkbox = Checkbox;
exports.Chicklet = Chicklet;
exports.Collapsible = Collapsible;
exports.Colors = Colors;
exports.DatePicker = DatePicker;
exports.DatePickerField = DatePickerField;
exports.Dropdown = Dropdown;
exports.DropdownField = DropdownField;
exports.Icon = Icon;
exports.Input = Input;
exports.Label = Label$1;
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
exports.Switch = Switch;
exports.Table = Table;
exports.TableCell = TableCell;
exports.TableCellItem = TableCellItem;
exports.TableCellText = TableCellText;
exports.TableHeaderItem = TableHeaderItem;
exports.Tabs = Tabs;
exports.Typography = Typography;
exports.TypographyExample = TypographyExample;
exports.cn = cn;
exports.cssVariables = cssVariables;
exports.designTokens = designTokens;
exports.globalStyles = globalStyles;
//# sourceMappingURL=index.js.map

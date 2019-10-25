
var moveableBlocksApp = {
    //Settings
    //_useFirebugLite: true,
    //_isRightClickPrevented: true,
    //_isAppLogOn: true,
    
    _loopTime: 55,                                                              //If the squares 'flicker' when you rotate them, try adjusting this value
    
    _momentumMoveDecay: 0.95,
    _momentumAngleDecay: 0.95,
    _decayWhenBoucingOfScreenEdge: 0.85,


    //Vars
    _touches: {},                                                               //Remembers the touches of the mobile gesture events
    _prevTouches: {},                                                           //Remembers the touches from the last loop
    _momentum: {},
    
    
    //---------------------------------------- app setup ----------------------------------------

    _initFirebugLite: function(){
        //If it is a mobile device, load Firebug Lite
        if (('ontouchstart' in window)) {
            (function(F,i,r,e,b,u,g,L,I,T,E){
                if(F.getElementById(b))
                    return;
                E=F[i+'NS']&&F.documentElement.namespaceURI;
                E=E?F[i+'NS'](E,'script'):F[i]('script');
                E[r]('id',b);E[r]('src',I+g+T);
                E[r](b,u);
                (F[e]('head')[0]||F[e]('body')[0]).appendChild(E);
                E=new Image;
                E[r]('src',I+L);
            })
            (document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebug-lite.js','releases/lite/latest/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');
            
            //FirebugLite doesn't show errors, so redirect them to console.log() which FirebugLite intercepts.
            window.onerror = function(message, url, lineNumber) {  
                console.log(message, url, lineNumber);
                return true;
            };
        }
    },
    _stopRightClick: function() {
        $('body').attr('oncontextmenu', 'return false;');
    },
    
    
    //---------------------------------------- main app ----------------------------------------
    
    init: function() {
        var mblocks = $('.mblock');

        // Quit if no mblocks
        if (mblocks.length === 0) {
            return;
        }

        //Setup the app
        if (this._useFirebugLite) this._initFirebugLite();
        if (this._isRightClickPrevented) this._stopRightClick();
        this.attachMobileGestures();
        
        //Extend jQuery with moveableBlocks functionality
        this._extendJQuery();
      
        //Loop through boxes setting some props
        for (var i=0, length=mblocks.length; i<length; i++) {
            var mblock = mblocks[i];
            var mblockIdNum = i;
            
            //Give each a unique mblockIdNum (an integer, not a CSS id attribute)
            //This is the key used for arrays like moveableBlocksApp._touches and moveableBlocksApp._momentum
            $(mblock).setIdNum(mblockIdNum);
            
            //Set up default momentum object
            moveableBlocksApp._momentum[mblockIdNum] = {
                element: mblock,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1
            };
            
            //Set zIndex
            var zIndex = $(mblock).getZIndex();
            if (zIndex == 'auto') {                                             //If the z-index is unspecified (i.e. 'auto'), assign it a z-index
                $(mblock).setZIndex(i);
            }
            
            //Rotate each mblock 0degrees
            //This fixes a bug where webkit leaves artifacts when mblocks move
            $(mblock).rotate(0);
        }
        
        //Start the app loop
        this.looper = setInterval(this.loop, this._loopTime);
    },
    
    /* Setup hammer.js and attach mobile gesture event handlers to our mblocks. */
    attachMobileGestures: function() {
        var self = this;
        
        //Find the moveableBlocksWrapper
        var moveableBlocksWrapper = document.getElementById('moveableBlocksWrapper');
        
        //If no moveableBlocksWrapper is present, use the <body>
        if (moveableBlocksWrapper === null) {
            moveableBlocksWrapper = document.body;
            self._isBodyWrapper = true;
            $('body').outerHeight( $(window).innerHeight() ).css('overflow', 'hidden');
        }
        self.moveableBlocksWrapper = moveableBlocksWrapper;
        
        //Use hammer.js
        var hammer = new Hammer( $(self.moveableBlocksWrapper)[0], {
            drag_min_distance: 0,                                               //Lower number increases sensitivity.
            drag_horizontal: true,
            drag_vertical: true,
            transform: true,
            hold: false,
            prevent_default: true
        });
        
        //Set up various events
        hammer.ontap = function(event) { 
            moveableBlocksApp.moveXyzBoxToTop(event);
            moveableBlocksApp.stopXyzBox(event);
        };
        hammer.ondoubletap = function(event) { 
            $(event.originalEvent.target).removeAttr('style');
            // moveableBlocksApp.log(event.type);
        };
        
        hammer.ondrag = function(event) {
            moveableBlocksApp.rememberTouches(event);
        };
        hammer.ondragend = function(event) {
            moveableBlocksApp._touches = {};
            //moveableBlocksApp.log(event.type);
        };
        
        hammer.swipe = function(event) { 
            moveableBlocksApp.log(event.type);
        };
        
        hammer.onrelease = function(event) {
            //moveableBlocksApp.log(event.type);
        };
    },
    
    /* Loop that converts touches into momentum, then executes the momentum. */
    loop: function() {
        //Loop through each mblocks touches
        $.each(moveableBlocksApp._touches, function(mblockIdNum, props){
            var prev = moveableBlocksApp._prevTouches[mblockIdNum] || null;
            var mblock = props.element;
            var momentum = moveableBlocksApp._momentum[mblockIdNum];
            
            //If there is a 2nd touch, get more info
            if (props.p[1]) {
                props.line = {};
                props.line.center = {};
                props.line.center.x = (props.p[1].x + props.p[0].x) /2;
                props.line.center.y = (props.p[1].y + props.p[0].y) /2;
                
                props.line.len = {};
                props.line.len.x = props.p[1].x - props.p[0].x;
                props.line.len.y = props.p[1].y - props.p[0].y;
                props.line.len.h = Math.sqrt(props.line.len.x*props.line.len.x + props.line.len.y*props.line.len.y)
                
                props.line.m = props.line.len.y / props.line.len.x;
            }
                
            if(prev) {
                //Two touches vs one
                if (props.p[1]) {
                    //Rotate
                    momentum.rotate = Math.atan( (props.line.m - prev.line.m)/(1 + props.line.m*prev.line.m) ) * 180 / Math.PI;          //The changed rotation of the 2 touches

                    //Resize
                    momentum.scale = props.line.len.h / prev.line.len.h;

                    //Move
                    momentum.moveCenterTo = { 
                        x:props.line.center.x, 
                        y:props.line.center.y 
                    };
                    momentum.x = props.line.center.x - prev.line.center.x;
                    momentum.y = props.line.center.y - prev.line.center.y;
                    
                    //moveableBlocksApp.log({touches:moveableBlocksApp._touches, moveCenterTo: {x:momentum.moveCenterTo.x, y:momentum.moveCenterTo.y} });
                    
                } else {
                    //Move
                    if (!prev.p[1]) {
                        momentum.x = props.p[0].x - prev.p[0].x;
                        momentum.y = props.p[0].y - prev.p[0].y;
                    }
                    momentum.moveCenterTo = null;
                }
            }
            
        });
        
        //Store the touch info for the next time we run the loop
        moveableBlocksApp._prevTouches = moveableBlocksApp._touches;
        
        //Do the moving, rotating, and/or resizing
        $.each(moveableBlocksApp._momentum, function(mblockIdNum, momentum){
            var element = momentum.element;
            momentum.rotate = momentum.rotate || 0;
            momentum.scale = momentum.scale || 1;
            
            //Move
            if (Math.abs(momentum.x) > 1 || Math.abs(momentum.y) > 1 ) {
                if (momentum.moveCenterTo) {
                    $(element).moveCenterTo( momentum.moveCenterTo.x, momentum.moveCenterTo.y );
                    momentum.moveCenterTo = null;
                } else {
                    $(element).move( momentum.x, momentum.y );
                }
                
                momentum.x *= moveableBlocksApp._momentumMoveDecay;
                momentum.y *= moveableBlocksApp._momentumMoveDecay;
            }
            
            //Scale and rotate
            if (Math.abs(momentum.scale) != 1 || Math.abs(momentum.rotate) > 1) {
                $(element).rotateAndScale(momentum.rotate, momentum.scale);
                momentum.scale = 1;                                             //Scaling works best if it has no momentum. Just do it once and then stop.
                momentum.rotate *= moveableBlocksApp._momentumAngleDecay;
            }
        });
        
        
        //Clear touches
        moveableBlocksApp._touches = {};                                        //Now that you're done with the touches, clear them so they're not used by the loop the next time it runs
    },
    
    /* Store the touch event info we need in the format we need as moveableBlocksApp._touches */
    rememberTouches: function(event) {
        //Remember touch offset from window (Touches are relative to window, but x, y will need to be relative to moveableBlocksWrapper containter even if it is not at top left of screen)
        var offset = $('#moveableBlocksWrapper').offset();
        
        this._touches = {};
        
        //Store touch info we need as moveableBlocksApp._touches[mblockIdNum] = { element, arrayOfTouchesOnThatBox }
        var touches = event.originalEvent.touches || [event.originalEvent];
        for(var t=0; t<touches.length; t++) {
            var element = $(touches[t].target).closest('.mblock');
            var mblockIdNum = $(element).getIdNum();
            
            if (mblockIdNum != undefined) {
                //Get touch info from previous touches that hasn't yet been acted on and cleared by loop()
                var touchInfo = this._touches[mblockIdNum] || [];
                var touchArray = touchInfo['p'] || [];
                
                //Add in new touch info and store it all
                touchArray.push({ 
                    x:touches[t].clientX - offset.left,
                    y:touches[t].clientY - offset.top
                });
                this._touches[mblockIdNum]= {
                    element: element[0],
                    p: touchArray
                }
            }
        }
    }, 
    
    //---------------------------------------- moving mBlocks ----------------------------------------
    
    /* When a mblock bounces off the screen edge, flip it's momentum */
    bounceBoxOffScreen: function(mblockIdNum, xOrY) {
        switch (xOrY) {
            case 'x':
                this._momentum[mblockIdNum].x *= (-1 * this._decayWhenBoucingOfScreenEdge);
                break;
            case 'y':
                this._momentum[mblockIdNum].y *= (-1 * this._decayWhenBoucingOfScreenEdge);
                break;
            default:
                break;
        }
        this._momentum[mblockIdNum].rotate = (Math.random() * 90) -45;
    },
    
    /* Move current mblock to top using z-index */
    moveXyzBoxToTop: function(event) {
        var touches = event.originalEvent.touches || [event.originalEvent];
        var element = $(touches[0].target).closest('.mblock');
        var mblockIdNum = $(element).getIdNum();
        
        var zIndexes = [];
        $('.mblock').not(element).each(function(){                              //Make array of .mblock z-indexes (excluding the one that was tapped)
            zIndexes.push( $(this).getZIndex() );
        });
        var maxZIndex = Math.max.apply(Math, zIndexes)*1;
        $(element).setZIndex(maxZIndex+1);                                      //Increment largest z-index and assign to tapped mblock
        
    },
    
    /* Stop xzyBox's movement and rotation */
    stopXyzBox: function(event) {
        var touches = event.originalEvent.touches || [event.originalEvent];
        var mblock = $(touches[0].target).closest('.mblock');
        if (mblock.length === 0) {
            return;
        }
        
        var mblockIdNum = $(mblock).getIdNum();
        
        //Stop all of the mblock's momentum
        moveableBlocksApp._momentum[mblockIdNum].x = 0;
        moveableBlocksApp._momentum[mblockIdNum].y = 0;
        moveableBlocksApp._momentum[mblockIdNum].rotate = 0;
        moveableBlocksApp._momentum[mblockIdNum].scale = 1;
    },


    //---------------------------------------- logging ----------------------------------------
    
    /* Clear our makeshift console */
    conClear: function() {
        try {
            console.log();
        } catch(error) {
            ;
        }
    },
            
    /* Output a message to the textarea that functions as a console for mobile browsers without a console */
    log: function(mixed) {
        if (this._isAppLogOn) {
            var msg = (typeof mixed == 'object') ? this.vardump(mixed) : mixed;
            $('#log').html('<pre>'+msg+'</pre>');
        }
    },
    
    /* Recursive function to turn variables into text to be sent to the console */
    vardump: function(mixed, depth) {
        var maxDepth = 5;
        depth = (!depth) ? 0 : depth;

        var out = '';
        var property = null;
        var i;
        if (depth < maxDepth) {
            if (typeof mixed != 'object') {
                out += ''+mixed+'\n';
            } else {
                $.each(mixed, function(i, property) {
                    var prop = '';
                    if (property == undefined) {
                        prop = 'undefined';
                    } else if (typeof property == 'function') {
                        prop = 'function';
                    } else if (property.tagName != undefined) {
                        prop = '&lt;' + property.tagName.toLowerCase() + '&gt;';
                        prop = (property.id) ? prop + ' #' + property.id : prop;
                        prop = (property.className) ? prop + ' .' + property.className : prop;
                    } else if (typeof property == 'object') {
                        prop = '\n' + moveableBlocksApp.vardump(property, depth+1);
                    } else {
                        prop = property;
                    }

                    var spacer = '';
                    for (var j=0; j<depth; j++) {
                        spacer += '     ';
                    }
                    out += spacer+'<strong>'+i+':</strong> '+prop+'\n';
                });
            }
        }
        return out;
    },
    
    
    //---------------------------------------- mBlocks code ----------------------------------------
    
    /* Extend jQuery with moveableBlocks functionality */
    _mblockObj: {
        _snapToAngle: 90,                                                   //Snap rotation to multiples of this.
        _snapToAngleTolerance: 2.5,

        getIdNum: function() {
            return $(this).data('mblockIdNum');
        },
        setIdNum: function(idNum) {
            return $(this).data('mblockIdNum', idNum);
        },

        getX: function() { return $(this).css('left').replace('px','')*1; },
        getY: function() { return $(this).css('top').replace('px','')*1; },
        setX: function(x) {
            var xCenter = x + $(this).outerWidth()/2;

            //Don't move the object off the page
            if (xCenter > 0 && xCenter < $(moveableBlocksApp.moveableBlocksWrapper).outerWidth()) {
                $(this).css('left', x +'px');
            } else {
                var mblockIdNum = $(this).data('mblockIdNum');
                moveableBlocksApp.bounceBoxOffScreen(mblockIdNum, 'x');
            }

            return this;
        },
        setY: function(y) {
            var yCenter = y + $(this).outerHeight()/2;

            //Don't move the object off the page
            if (yCenter > 0 && yCenter < $(moveableBlocksApp.moveableBlocksWrapper).outerHeight()) {
                $(this).css('top', y +'px');
            } else {
                var mblockIdNum = $(this).data('mblockIdNum');
                moveableBlocksApp.bounceBoxOffScreen(mblockIdNum, 'y');
            }

            return this;
        },
        move: function(moveX, moveY) {
            var xCurrent = this.getX();
            var yCurrent = this.getY();
            this.setX(xCurrent + moveX);
            this.setY(yCurrent + moveY);

            return this;
        },
        moveCenterTo: function(x, y) {
            var width = $(this).outerWidth();
            var height = $(this).outerHeight();
            var newX = x -width/2;
            var newY = y -height/2;
            this.setX(newX);
            this.setY(newY);
            
            // console.log(newX, newY);
            $('#centerDot').setX(x);
            $('#centerDot').setY(y);

            return this;
        },

        getRotation: function() {
            return $(this).data('rotation') || 0;
        },
        rotate: function(rotateAmount) {

            var angle = this.getRotation() + rotateAmount;

            //If within tolerance, snap to certain angles
            var remainder = angle % this._snapToAngle;
            if (Math.abs(remainder) < this._snapToAngleTolerance) {
                angle += remainder *-1;
            }

            //Rotate
            $(this).css('transform', 'rotate('+angle+'deg)');

            //Remember current rotation
            $(this).data('rotation', angle);

            return this;
        },

        getScale: function() {
            return $(this).data('scale') || 1;
        },

        getZIndex: function() {
            return $(this).css('z-index');
        },
        setZIndex: function(zIndex) {
            $(this).css('z-index', zIndex);
        },

        rotateAndScale: function(rotateAmount, scale) {
            var angle = this.getRotation() + rotateAmount;
            var newScale = this.getScale() * scale;

            //If within tolerance, snap to certain angles
            var remainder = angle % this._snapToAngle;
            if (Math.abs(remainder) < this._snapToAngleTolerance) {
                angle += remainder *-1;
            }

            //Rotate and scale
            $(this).css('transform', 'rotate('+angle+'deg) scale('+newScale+', '+newScale+')');

            //Remember current rotation and scale
            $(this).data('rotation', angle);
            $(this).data('scale', newScale);

            return this;
        }
    },
    _extendJQuery: function() {
    
        $.fn = $.extend($.fn, this._mblockObj);
    }
};

$(document).ready(function(){
    moveableBlocksApp.init();
});
       
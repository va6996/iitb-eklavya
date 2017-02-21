/* Global Variables */
/* the developer should define variables and constants here */
/* We define a room with 3 walls, floor and ceiling */
/* We define a ball which bounces in the xy plane */
/* We define modifiable prameters : gravity, ball size, initial velocity */
/* We support draggable ball */
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */

var cylinder;
/* Vinayak */
var myResistanceX;
var myResistanceY;
var myResistanceZ;
/* Vinayak */
/******************* Interaction functions ***********************/

/**
 * This function implements custom dragging of the ball.
 * <p>
 * It ensures that the ball is not dragged beyond the permissible boundaries.
 * In other applications you can move more than one element as well.
 * <p>
 * @param element    Pointer to ball object
 * @param newpos     New 3D position (THREE.Vector3)
 */
function myBallDrag(element, newpos)
{
    myBallX = newpos.x;
    if (newpos.x < (leftB + myBallRadius)) { myBallX = (leftB + myBallRadius) }
    else if (newpos.x > (rightB - myBallRadius)) { myBallX = (rightB - myBallRadius) }
    myBallY = newpos.y;
    if (newpos.y < (bottomB + myBallRadius)) { myBallY = (bottomB + myBallRadius); }
    else if (newpos.y > (topB - myBallRadius)) { myBallY = (topB  - myBallRadius); }
    myBallZ = newpos.z;

    myBall.position.set(myBallX, myBallY, myBallZ);
}

function resistResistance(element, newpos)
{
    var myResistanceX = newpos.x;
    if (newpos.x < (myCenterX + 5) || newpos.x > myCenterX - 5) { myResistanceX = myCenterX; }
    else { myResistanceX = myCenterX - 30; }
    myResistanceY = newpos.y;
    if (newpos.y < (myCenterY + 5) || newpos.x > myCenterY - 5) { myResistanceY = myCenterY; }
    else { myResistanceY = myCenterY; }
    myResistanceZ = newpos.z;

    myBall.position.set(myResistanceX, myResistanceY, myResistanceZ);
}

/******************* End of Interaction functions ***********************/

/******************* GUI control objects code ***********************/
var PosX;           /* X Position Slider Label */
var PosY;           /* Y Position Slider Label */
var VelX;           /* X Velocity Slider Label */
var VelY;           /* Y Velocity Slider Label */
var AccY;           /* Y Acceleration Slider Label */
var Xdefault;       /* X Position Slider Default Value */
var Ydefault;       /* Y Position Slider Default Value */
var VXdefault;      /* X Velocity Slider Default Value */
var VYdefault;      /* Y Velocity Slider Default Value */
var AYdefault;      /* Y Acceleration Slider Default Value */
var Xmin;           /* X Position Slider Minimum Value */
var Xmax;           /* X Position Slider Maximum Value */
var Ymin;           /* Y Position Slider Minimum Value */
var Ymax;           /* Y Position Slider Maximum Value */
var VXmin;          /* X Velocity Slider Minimum Value */
var VXmax;          /* X Velocity Slider Maximum Value */
var VYmin;          /* Y Velocity Slider Minimum Value */
var VYmax;          /* Y Velocity Slider Maximum Value */
var AYmin;          /* Y Acceleration Slider Minimum Value */
var AYmax;          /* Y Acceleration Slider Maximum Value */
var Xstep;          /* X Position Slider Step */
var Ystep;          /* Y Position Slider Step */
var VXstep;         /* X Velocity Slider Step */
var VYstep;         /* Y Velocity Slider Step */
var AYstep;         /* Y Acceleration Slider Step */

/*
 * This function handles the X position slider change
 * <p>
 * Updates the myBall position variable.
 * Effect is felt immediately.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleX(newValue)
{
    myBallX = newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
    PIErender();
}

/*
 * This function handles the Y position slider change
 * <p>
 * Updates the myBall position variable.
 * Effect is felt immediately.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleY(newValue)
{
    myBallY = newValue;
    myBall.position.set(myBallX, myBallY, myBallZ);
    PIErender();
}

/*
 * This function handles the X Velocity slider change
 * <p>
 * Updates the myBall velocity variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleVX(newValue)
{
    myBallVX = newValue;
}

/*
 * This function handles the Y Velocity slider change
 * <p>
 * Updates the myBall velocity variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleVY(newValue)
{
    myBallVY = newValue;
}

/*
 * This function handles the Y acceleration (gravity) slider change
 * <p>
 * Updates the myBall acceleration variable.
 * Effect is felt from the next animation frame.
 * <p>
 * @param newValue       New Value of the slider
 */
function handleAY(newValue)
{
    myBallAY = newValue;
}

function initialiseControlVariables()
{
    /* Labels */
    PosX="X";                  /* X Position Slider Label */
    PosY="Y";                  /* Y Position Slider Label */
    VelX="VX";                 /* X Velocity Slider Label */
    VelY="VY";                 /* Y Velocity Slider Label */
    AccY="AY";                 /* Y Acceleration Slider Label */

    /* Default (initial) Values */
    Xdefault=myCenterX;        /* X Position Slider Default Value */
    Ydefault=myCenterY;        /* Y Position Slider Default Value */
    VXdefault=0.1;             /* X Velocity Slider Default Value */
    VYdefault=0.1;             /* Y Velocity Slider Default Value */
    AYdefault=-9.8;            /* Y Acceleration Slider Default Value */

    /* Slider Limits */
    Xmin=leftB+myBallRadius;   /* X Position Slider Minimum Value */
    Xmax=rightB-myBallRadius;  /* X Position Slider Maximum Value */
    Ymin=bottomB+myBallRadius; /* Y Position Slider Minimum Value */
    Ymax=topB-myBallRadius;    /* Y Position Slider Maximum Value */
    VXmin=-1.0;                /* X Velocity Slider Minimum Value */
    VXmax= 1.0;                /* X Velocity Slider Maximum Value */
    VYmin=-1.0;                /* Y Velocity Slider Minimum Value */
    VYmax= 1.0;                /* Y Velocity Slider Maximum Value */
    AYmin=-15.0;               /* Y Acceleration Slider Maximum Value */
    AYmax= 0.0;                /* Y Acceleration Slider Minimum Value */

    /* Slider Steps */
    Xstep=0.1;                 /* X Position Slider Step */
    Ystep=0.1;                  /* Y Position Slider Step */
    VXstep=0.1;                 /* X Velocity Slider Step */
    VYstep=0.1;                 /* Y Velocity Slider Step */
    AYstep=-0.1;               /* Y Acceleration Slider Step */
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(PosX, Xdefault, handleX, Xmin, Xmax, Xstep);
    PIEaddInputSlider(PosY, Ydefault, handleY, Ymin, Ymax, Ystep);
    PIEaddInputSlider(VelX, VXdefault, handleVX, VXmin, VXmax, VXstep);
    PIEaddInputSlider(VelY, VYdefault, handleVY, VYmin, VYmax, VYstep);
    PIEaddInputSlider(AccY, AYdefault, handleAY, AYmin, AYmax, AYstep);
    /* Create Display Panel */
    PIEaddDisplayText(PosX, Xdefault);
    PIEaddDisplayText(PosY, Ydefault);
    PIEaddDisplayText(VelX, VXdefault);
    PIEaddDisplayText(VelY, VYdefault);
    PIEaddDisplayText(AccY, AYdefault);
}


/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Bouncing Ball experiment help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
    helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the ball will bounce around obeyng the laws of physics.</p>";
    helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
    helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
    helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
    helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
    helpContent = helpContent + "<h3>The drag and drop</h3>";
    helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Bouncing Ball experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
    infoContent = infoContent + "<h3>Collision</h3>";
    infoContent = infoContent + "<p>When an object collides with a surface, the direction of velocity normal to the surface is reversed.</p>";
    infoContent = infoContent + "<p>At the time of impact, the ball is deformed because of the force of the wall. This deformation can be easily observed with a sponge ball. If you drop a ball of dough on the floor, it does not bounce, it is only deformed.</p>";
    infoContent = infoContent + "<p>The harder balls are also deformed. But because of the hard nature of the meterial, the hard ball tries to regain it's shape. This attempt to reain the shape reverses the velocity by pushing aainst the wall.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the velocity in the X direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the velocity in the Y direction reverses while the velocity in the Y direction reamains the same.</p>";
    infoContent = infoContent + "<h3>The coefficient of restitution</h3>";
    infoContent = infoContent + "<p>When the velocity reverses direction, it is not necessary that it's magnitude remains the same.</p>";
    infoContent = infoContent + "<p>The ball may not retain it's original shape and texture. The cricket ball loses it's shine.</p>";
    infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
    infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
    infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
    infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 9.0;
    mySceneBRX = 12.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myBallZ    = -2.0;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    wallThickness = 0.20;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

/**
 * This function creates the scene of the experiment.
 * It is called by the library during document load. 
 * It is recommended that you do not initialise any variables globally.
 * It is recommended that this function create all the elements first.
 * It should then call a reset function to initialise values.
 * This will allow a reset exepriment functionality to be implemented.
 * <p>
 * It is recommended that the developer first draw a sketch of the experiment on a piece of paper.
 * The sketch should specify the size and initial position of all the elements that comprise the experiment.
 * <p>
 * Once the sketch is ready, the developer should instantiate the elements at the intial location.
 * <p>
 * The (x,y) position of the camera would be set to the center of area of interest.
 * The z position of the camera would be such that the field of vision would cover the height.
 * The aspect ratio of the camera whould cover the width.
 * <p>
 * Two lights would be suitably positioned to light the area of interest.
 * <p>
 * The developer can position the camera and lights if he so chooses.
 * <p>
 * The camera would adjust and cover a wider and taller area depending on the dimensions of the display.
 * hence the background (if any) shoudl extend beyond the area of interest.
 * <p>
 * Finally the developer should call the function PIEsetAreaOfInterest(tlx, tly, brx, bry).
 * The parameters are the top left corner and bottom right corner coordinates.
 * The X axis goes from lef to right of te display and the y axis goes from bottom to up.
 * The area of interst should be wide and tall enough to cover all potential movements.
 * <p>
 * The developer should have a fairly good idea of the controls forthe experiment.
 * Once the scene is setup and is visible, the developer can include the controls and
 * the callback functions needed to update the experiment parameters.
 * The PIE library provides a set of functions to implement common controls.
 * <p>
 * The developer should code and assign proper event handlers to the elements (to control animation).
 */
function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Experiment Name");
    PIEsetDeveloperName("Avinash Awate");
    PIEhideControlElement();

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();
    PIEcamera = new THREE.PerspectiveCamera(30, PIEcanvasAspect, 0.1, 1000);
    PIEturnCamera(myCenterX, myCenterY, 0)
    /* Create Ball and add it to scene */
    // myBall = new THREE.Mesh(new THREE.SphereGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xededed}));
    // myBall.position.set(myBallX, myBallY, myBallZ);
    // myBall.castShadow = true;
    // myBall.receiveShadow = true;
    // PIEaddElement(myBall);
// 

    var wire = new THREE.Geometry();
	wire.vertices.push(new THREE.Vector3(myCenterX - 3.0, myCenterY + 1.5, 0));
	wire.vertices.push(new THREE.Vector3(myCenterX + 3.0, myCenterY + 1.5, 0));
	wire.vertices.push(new THREE.Vector3(myCenterX + 3.0, myCenterY - 1.5, 0));
	wire.vertices.push(new THREE.Vector3(myCenterX - 3.0, myCenterY - 1.5, 0));
	wire.vertices.push(new THREE.Vector3(myCenterX - 3.0, myCenterY + 1.5, 0));
	var wireMaterial = new THREE.LineBasicMaterial({color:0xffffff, linewidth:3 });
	var wireframe = new THREE.Line(wire, wireMaterial);wireframe.position.set(0	,0,0);
	PIEaddElement(wireframe);

	
	var batteryWidth = 5 / 20;
	var batteryHeight = 10 / 20;

    var battery = new THREE.Geometry();
    battery.vertices.push(new THREE.Vector3(myCenterX + 3.0 - batteryWidth, myCenterY + batteryHeight, 0));
    battery.vertices.push(new THREE.Vector3(myCenterX + 3.0 + batteryWidth, myCenterY + batteryHeight, 0));
    battery.vertices.push(new THREE.Vector3(myCenterX + 3.0 + batteryWidth, myCenterY - batteryHeight, 0));
    battery.vertices.push(new THREE.Vector3(myCenterX + 3.0 - batteryWidth, myCenterY - batteryHeight, 0));
    battery.vertices.push(new THREE.Vector3(myCenterX + 3.0 - batteryWidth, myCenterY + batteryHeight, 0));
    battery.faces.push(new THREE.Face3(0, 1, 2));
    battery.faces.push(new THREE.Face3(0, 2, 3));
    var batteryMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide});
    var batteryframe = new THREE.Mesh(battery, batteryMaterial);
    PIEaddElement(batteryframe);
    
    var anode = new THREE.Geometry();
    anode.vertices.push(new THREE.Vector3(myCenterX + 3.0 - .1, myCenterY + batteryHeight + 0.02, 0));
    anode.vertices.push(new THREE.Vector3(myCenterX + 3.0 + .1, myCenterY + batteryHeight + 0.02, 0));
    var anodeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth:3 });
    var anodeframe = new THREE.Line(anode, anodeMaterial);
    PIEaddElement(anodeframe);

    geometry = new THREE.CylinderBufferGeometry(.1,.1, 5, 32, 32, false);
    material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	cylinder = new THREE.Mesh( geometry, material );
	cylinder.position.set(1.0, 1.0, 0);
	cylinder.rotateZ(1.57);
    PIEaddElement(cylinder);
    PIEdragElement(cylinder);
    //PIEsetDrag(cylinder, resistResistance);

    geometry = new THREE.SphereBufferGeometry(.1, 32, 32);
    material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var sphere1 = new THREE.Mesh( geometry, material);
    sphere1.position.set(1.25, 1.0, 0);
    //PIEaddElement(sphere1);

    geometry = new THREE.SphereBufferGeometry(.1, 32, 32);
    material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var sphere2 = new THREE.Mesh( geometry, material);
    sphere2.position.set(.75, 1.0, 0);
    //PIEaddElement(sphere2);

    var resistor = new THREE.Group();
    resistor.add(cylinder);
    resistor.add(sphere1);
    resistor.add(sphere2);
    PIEaddElement(resistor);
    PIEdragElement(resistor);
    /* Allow Dragging of the ball */
  

    /* Initialise Wall variables */
    /* All walls extend beynd the room size in both directions */
    /* Floor */
    // loader = new THREE.TextureLoader();
    // texture = loader.load( '../PIE/images/hardwood2_diffuse.jpg' );
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 25, 25 );
    // texture.anisotropy = 16;
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, backB * 2 );
    // geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    // material = new THREE.MeshLambertMaterial( {color: 0xaaaaaa} );
    // myFloor  = new THREE.Mesh( geometry, material );
    // // myFloor.lookAt(new THREE.Vector3(0,1,0));
    // myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    // myFloor.receiveShadow = true;
    // PIEaddElement(myFloor);
    // /* Ceiling */
    // geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100 );
    // material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    // myCeiling = new THREE.Mesh( geometry, material );
    // myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    // myFloor.receiveShadow = true;
    // PIEaddElement(myCeiling);
    // /* Left */
    // geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    // material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    // myLeft = new THREE.Mesh( geometry, material );
    // myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    // myLeft.receiveShadow = true;
    // PIEaddElement(myLeft);
    // /* Right */
    // geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    // material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    // myRight = new THREE.Mesh( geometry, material );
    // myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    // myRight.receiveShadow = true;
    // PIEaddElement(myRight);
    /* Back */
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );
    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, wallThickness );
    material = new THREE.MeshBasicMaterial();
    material.map = THREE.ImageUtils.loadTexture('bg.png');
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    PIEaddElement(myBack);

    /* Instantiate experiment controls */
    initialiseControls();

    /* Reset all positions */
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
}

/******************* End of Load Experiment objects code ***********************/

/******************* Reset Experiment code ***********************/

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function resetExperiment()
{
    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Initialise Ball variables */
    // myBallX      = myCenterX;
    // myBallY      = myCenterY;
    // myBallVX     = 0.0;
    // myBallVY     = 0.0;
    // myBallAX     = gravityX;
    // myBallAY     = gravityY;

    // /* Reset Ball position */
    // myBall.position.set(myBallX, myBallY, myBallZ);

    /* Reset Wall position */
    /* Floor */
    // myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    // /* Ceiling */
    // myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    // /* Left */
    // myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    // /* Right */
    // myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    // /* Back */
    // myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
}

/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 * This function updates the location of all experiment elements during each animation frame.
 * <p>
 * The function receives both animation time as well as the dt (time difference) from last call.
 * This function is expected to implement the laws of physics to update the position.
 * This function will also update any output variables/graphs
 * <p>
 * Important Note : Boundary Events
 * <p>
 * During any physics simulation you will reach a boundary event.
 * In our case, the boundary even is the ball hitting any of the walls.
 * The boundary event typically changes the sign of velocity/acceleration.
 * The boundary event is most likely to happen in the middle of the two calls.
 * The library allows the experiment to change the simulation time by processing partial time.
 * This function can call a library function with the time remaining to be processed before exiting.
 * <p>
 * @param  t       The time in milliseconds elapsed since the beginning of animation cycle
 * @param  dt      The time in milliseconds elapsed since the last acll to this function
 */
function updateExperimentElements(t, dt)
{
var newX;           /* new X position of ball */
var newY;           /* new Y position of ball */
var newVX;          /* new X velocity of ball */
var newVY;          /* new Y velocity of ball */
var changeX;        /* X boundary hit */
var changeY;        /* Y boundary hit */
var boundaryT;      /* Boundary Event Time */
var tempT;          /* Temporary time */

    /* Load Ball coordinates */
    
}

function PIEmouseMove(b) {
    var a;
    b.defaultPrevented = true;
    PIEmouseP.x = (b.clientX / PIEcanvasW) * 2 - 1;
    PIEmouseP.y = -(b.clientY / PIEcanvasH) * 2 + 1;
    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    if (PIEselectedDrag != null) {
        PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect);
        PIEdefaultDrag(PIEselectedDrag, PIEdragIntersect.sub(PIEdragOffset))
    } else {
        a = PIEraycaster.intersectObjects(PIEdragElements);
        if (a.length > 0) {
            PIEdragPlane.setFromNormalAndCoplanarPoint(PIEcamera.getWorldDirection(PIEdragPlane.normal), a[0].object.position);
            if (PIEselectedHover != a[0].object) {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = a[0].object;
                PIEdefaultHoverON(PIEselectedHover)
            }
            PIEscreenElem.style.cursor = "pointer"
        } else {
            if (PIEselectedHover != null) {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = null;
                PIEscreenElem.style.cursor = "auto"
            }
        }
    }
}

function PIEmouseDown(b) {
    var a;
    b.defaultPrevented = true;
    PIEselectedDrag = null;
    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    a = PIEraycaster.intersectObjects(PIEdragElements);
    if (a.length > 0) {
        PIEselectedDrag = a[0].object;
        if (PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect)) {
            PIEdragOffset.copy(PIEdragIntersect).sub(PIEselectedDrag.position)
        }
        PIEscreenElem.style.cursor = "move";
        PIEdefaultDragStart(PIEselectedDrag)
    }
    console.log(b.clientX);
    console.log(b.clientY);

}

function checkResistorPosition(resistor){
	myResistanceX = resistor.position.x;
    myResistanceY = resistor.position.y;
    myResistanceZ = resistor.position.z;
	
    if (myResistanceX < (myCenterX + 5) && myResistanceX > myCenterX - 5 && 
    	myResistanceY < (myCenterY + 5) && myResistanceY > myCenterY - 5){ 
    	myResistanceX = myCenterX; 
    	myResistanceY = myCenterY;
    }
    else { 
    	myResistanceY = myCenterY - 30; 
    	myResistanceX = myCenterX - 30;
    }

    resistor.position.set(myResistanceX, myResistanceY, myResistanceZ);

}
function PIEmouseUp(b) {
    var a;
    b.defaultPrevented = true;
    if (PIEselectedDrag != null) {
        PIEdefaultDragEnd(PIEselectedDrag);
        PIEselectedDrag = null
    }
    PIEscreenElem.style.cursor = "auto"

    checkResistorPosition(cylinder);
}
/******************* Update (animation changes) code ***********************/

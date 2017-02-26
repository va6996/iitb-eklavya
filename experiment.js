
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


/* Vinayak */
var wireWidth;
var wireHeight;
var myBack;
var level;
var resistance;
var myResistanceX;
var myResistanceY;
var myResistanceZ;
var posHolder;
var posR;
var levelPositions;
var levelAnswers;
var currentLevel;
var resistanceValues;
var answers;
var levelButton;
var placeholders;
var colorBands;
var mySolution;
var tick;
var cross;
/* Vinayak */

var wire;
var wireExtra;
var resistorBox;

function initialise()
{
    wireWidth = 30;
    wireHeight = 15;
    currentLevel = 5;
    mySolution = "";

    posR = [];
    posHolder = [];
    resistance = [];
    levelPositions = [];
    levelButton = [];
    placeholders = [];
    colorBands = [];
    levelAnswers = [];

    posHolder[1] = new THREE.Vector3(myCenterX - 5, myCenterY, 0);
    posHolder[2] = new THREE.Vector3(myCenterX + 5, myCenterY, 0);
    posHolder[3] = new THREE.Vector3(myCenterX, myCenterY + 7, 0);
    posHolder[4] = new THREE.Vector3(myCenterX - 5, myCenterY + 7, 0);
    posHolder[5] = new THREE.Vector3(myCenterX + 5, myCenterY + 7, 0);
    posHolder[6] = new THREE.Vector3(myCenterX, myCenterY, 0);
    posHolder[7] = new THREE.Vector3(myCenterX + 10, myCenterY, 0);
    posHolder[8] = new THREE.Vector3(myCenterX - 10, myCenterY, 0);

    posR[1] = new THREE.Vector3(myCenterX - 7, myCenterY + wireHeight * 2 + 2, 0);
    posR[2] = new THREE.Vector3(myCenterX, myCenterY + wireHeight * 2 + 2, 0);
    posR[3] = new THREE.Vector3(myCenterX + 7, myCenterY + wireHeight * 2 + 2, 0);
    posR[4] = new THREE.Vector3(myCenterX - 7, myCenterY + wireHeight * 2 - 2, 0);
    posR[5] = new THREE.Vector3(myCenterX, myCenterY + wireHeight * 2 - 2, 0);
    posR[6] = new THREE.Vector3(myCenterX + 7, myCenterY + wireHeight * 2 - 2, 0);

    colorBands[1] = [0x000000, 0xff0000, 0x000000, 0x00ff00];
    colorBands[2] = [0x000000, 0xa20000, 0x000000, 0x0000ff];
    colorBands[3] = [0x000000, 0x811004, 0x000000, 0xff0000];
    colorBands[4] = [0x000000, 0x811004, 0x811004, 0x811004];
    colorBands[5] = [0x0000ff, 0x000000, 0xFFDF00, 0xFFDF00];
    colorBands[6] = [0x000000, 0xffff00, 0x811004, 0x811004];

    levelPositions[1] = [1, 2];
    levelPositions[2] = [1, 2, 3];
    levelPositions[3] = [1, 2, 4, 5];
    levelPositions[4] = [6, 7, 8, 3];
    levelPositions[5] = [6, 7, 8, 4, 5];

    levelAnswers[1] = [3, 4];
    levelAnswers[2] = [5, 6, 4];
    levelAnswers[3] = [2, 1, 3, 6];
    levelAnswers[4] = [2, 3, 1, 5];
    levelAnswers[5] = [2, 5, 1, 3, 4];

    resistanceValues = [0, 2, 3, 1, 10, 6, 4];

    answers = [0, 11, 5, 2.5, 3, 5.5];
}

// var helpContent;
// function initialiseHelp()
// {
//     helpContent="";
//     helpContent = helpContent + "<h2>Bouncing Ball experiment help</h2>";
//     helpContent = helpContent + "<h3>About the experiment</h3>";
//     helpContent = helpContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
//     helpContent = helpContent + "<h3>Animation control</h3>";
//     helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
//     helpContent = helpContent + "<h3>The setup stage</h3>";
//     helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to five sliders.</p>";
//     helpContent = helpContent + "<p>You can control the following:</p>";
//     helpContent = helpContent + "<ul>";
//     helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Controls the X position of the ball.</li>";
//     helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Controls the Y position of the ball.</li>";
//     helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Controls the X velocity of the ball.</li>";
//     helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Controls the Y velocity of the ball.</li>";
//     helpContent = helpContent + "<li>AY&nbsp;:&nbsp;Controls the Y acceleration of the ball.</li>";
//     helpContent = helpContent + "</ul>";
//     helpContent = helpContent + "<p>You also have an additional text input to control the coefficient of restitution of the bottom floor.</p>";
//     helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
//     helpContent = helpContent + "<h3>The animation stage</h3>";
//     helpContent = helpContent + "<p>In the animation stage, the ball will bounce around obeyng the laws of physics.</p>";
//     helpContent = helpContent + "<p>The right hand panel now shows the values of the four experiment variables during animation.</p>";
//     helpContent = helpContent + "<ul>";
//     helpContent = helpContent + "<li>X&nbsp;&nbsp;:&nbsp;Shows the X position of the ball.</li>";
//     helpContent = helpContent + "<li>Y&nbsp;&nbsp;:&nbsp;Shows the Y position of the ball.</li>";
//     helpContent = helpContent + "<li>VX&nbsp;:&nbsp;Shows the X velocity of the ball.</li>";
//     helpContent = helpContent + "<li>VY&nbsp;:&nbsp;Shows the Y velocity of the ball.</li>";
//     helpContent = helpContent + "</ul>";
//     helpContent = helpContent + "<p>In addition you will also see two sliders showing potential and kinetic energy.</p>";
//     helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
//     helpContent = helpContent + "<p>You can slow down and speed up the animaion by uing the speed control buttons</p>";
//     helpContent = helpContent + "<h3>The drag and drop</h3>";
//     helpContent = helpContent + "<p>You can also position the ball by dragging and dropping it. You can only do this in the setup stage. This has been prevented in the animation stage.</p>";
//     helpContent = helpContent + "<h2>Happy Experimenting</h2>";
//     PIEupdateHelp(helpContent);
// }

// var infoContent;
// function initialiseInfo()
// {
//     infoContent =  "";
//     infoContent = infoContent + "<h2>Bouncing Ball experiment concepts</h2>";
//     infoContent = infoContent + "<h3>About the experiment</h3>";
//     infoContent = infoContent + "<p>The experiment shws a bouncing ball constrained by left, right, top and bottom walls.</p>";
//     infoContent = infoContent + "<h3>Collision</h3>";
//     infoContent = infoContent + "<p>When an object collides with a surface, the direction of velocity normal to the surface is reversed.</p>";
//     infoContent = infoContent + "<p>At the time of impact, the ball is deformed because of the force of the wall. This deformation can be easily observed with a sponge ball. If you drop a ball of dough on the floor, it does not bounce, it is only deformed.</p>";
//     infoContent = infoContent + "<p>The harder balls are also deformed. But because of the hard nature of the meterial, the hard ball tries to regain it's shape. This attempt to reain the shape reverses the velocity by pushing aainst the wall.</p>";
//     infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the velocity in the X direction reverses while the velocity in the Y direction reamains the same.</p>";
//     infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the velocity in the Y direction reverses while the velocity in the Y direction reamains the same.</p>";
//     infoContent = infoContent + "<h3>The coefficient of restitution</h3>";
//     infoContent = infoContent + "<p>When the velocity reverses direction, it is not necessary that it's magnitude remains the same.</p>";
//     infoContent = infoContent + "<p>The ball may not retain it's original shape and texture. The cricket ball loses it's shine.</p>";
//     infoContent = infoContent + "<p>Some of the energy is lost because of the deformation of the ball. The energy loss means that the kinetic energy of the ball will be reduced after impact.</p>";
//     infoContent = infoContent + "<p>The coefficient of restitution specifies how much of the velocity will be retained after impact.</p>";
//     infoContent = infoContent + "<p>The coefficient of restitution does not affect te velocity in the direction parallel to the impact.</p>";
//     infoContent = infoContent + "<p>When the ball collides with the left or the right wall, the magnitude of the velocity in the X direction will reduce as per the coefficient of restitution. The magnitude and sign in Y direction remains the same.</p>";
//     infoContent = infoContent + "<p>When the ball collides with the top or the bottom wall, the magnitude of the velocity in the Y direction will reduce as per the coefficient of restitution. The magnitude and sign in X direction remains the same.</p>";
//     infoContent = infoContent + "<h2>Happy Experimenting</h2>";
//     PIEupdateInfo(infoContent);
// }

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 90;
    mySceneBRX = 120;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
}

function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Build circuit");
    PIEsetDeveloperName("Vinayak Agarwal");
    
    initialiseScene();
    initialise();

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth, myCenterY + wireHeight, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth, myCenterY, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX - wireWidth, myCenterY, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX - wireWidth, myCenterY + wireHeight, 0));
    material = new THREE.LineBasicMaterial({color:0xC0C0C0, linewidth:3 });
    wire = new THREE.Line( geometry, material );
    PIEaddElement(wire);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 10, myCenterY - 2 * wireHeight, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 13, myCenterY - 2 * wireHeight - 5, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 30, myCenterY - 2 * wireHeight + 5, 0));
    material = new THREE.LineBasicMaterial({color:0xC0C0C0, linewidth:3 });
    tick = new THREE.Line( geometry, material );

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 15, myCenterY - 2 * wireHeight + 5, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 25, myCenterY - 2 * wireHeight - 5, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 20, myCenterY - 2 * wireHeight, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 25, myCenterY - 2 * wireHeight + 5, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + wireWidth + 15, myCenterY - 2 * wireHeight - 5, 0));
    material = new THREE.LineBasicMaterial({color:0xC0C0C0, linewidth:3 });
    cross = new THREE.Line( geometry, material );

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX - 15, myCenterY, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX - 15, myCenterY + 7, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + 15, myCenterY + 7, 0));
    geometry.vertices.push(new THREE.Vector3(myCenterX + 15, myCenterY, 0));
    material = new THREE.LineBasicMaterial({color:0xC0C0C0, linewidth:3 });
    wireExtra = new THREE.Line( geometry, material );

    geometry = new THREE.BoxBufferGeometry( 22 , 10, 0 );
    material = new THREE.MeshBasicMaterial( {color: 0xaa0000} );
    resistorBox = new THREE.Mesh( geometry, material );
    resistorBox.position.set(myCenterX, myCenterY + wireHeight * 2, 0);
    PIEaddElement(resistorBox);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 5, 0));
    geometry.vertices.push(new THREE.Vector3(5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, -5, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    material = new THREE.MeshBasicMaterial( {color: 0x30ff3a, side:THREE.DoubleSide });
    var next= new THREE.Mesh( geometry, material );
    next.position.set(myCenterX + wireWidth + 10, myCenterY + wireHeight / 2, 0);
    next.name = 'next';
    levelButton.push(next);

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 5, 0));
    geometry.vertices.push(new THREE.Vector3(-5, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, -5, 0));
    geometry.faces.push(new THREE.Face3(0, 1, 2));
    material = new THREE.MeshBasicMaterial( {color: 0x30ff3a, side:THREE.DoubleSide });
    var previous = new THREE.Mesh( geometry, material );
    previous.position.set(myCenterX - wireWidth - 10, myCenterY + wireHeight / 2, 0);
    previous.name = 'previous';
    levelButton.push(previous);

    for(var i = 1; i < 7; i++)
        resistance[i] = generateResistance(i);

    for(var i = 1; i < 9; i++){
        placeholders[i] = generateHolder(i);
    }

    geometry = new THREE.BoxGeometry( mySceneW * 2, mySceneH * 2, 0 );
    material = new THREE.MeshLambertMaterial( {color: 0x55fA67} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, backB);
    PIEaddElement(myBack);

    var center = document.createElement('center');
    var text = document.createElement('div');
    text.id = 'question';
    text.style.position = 'absolute';
    text.style.top = PIEcanvasH * .65 + 'px';
    text.style.fontSize = '16px';
    text.style.fontFamily = 'Arial';
    text.style.width = '100%';
    center.appendChild(text);
    document.body.appendChild(center);
    
    var text = document.createElement('div');
    text.id = 'answer';
    text.style.position = 'absolute';
    text.style.top = PIEcanvasH * .7 + 'px';
    text.style.fontSize = '20px';
    text.style.fontFamily = 'Arial';
    text.style.width = '100%';
    center.appendChild(text);
    document.body.appendChild(center);

    text = document.createElement('div');
    text.id = 'solve';
    text.style.cursor = 'pointer';
    text.style.position = 'absolute';
    text.style.top = PIEcanvasH * .85 + 'px';
    text.style.left = PIEcanvasW * .25 + 'px';
    text.style.fontSize = '20px';
    text.style.fontFamily = 'Arial';
    text.innerHTML = "Solve".bold().fontcolor('red');
    text.addEventListener('click', showSolution);
    document.body.appendChild(text);
    
    resetExperiment();

    PIEsetAreaOfInterest(mySceneTLX,mySceneTLY,mySceneBRX,mySceneBRY);
    PIEstartAnimation();
    // showSolution();
}

function resetExperiment()
{
    currentLevel = 2;
    mySolution = "";
    updateElements();
}

function updateExperimentElements(t, dt){

}

function updateElements()
{
    for (var i = 1; i < 9; i++)
        PIEscene.remove(placeholders[i]);

    for (var j in levelPositions[currentLevel]){
        var i = levelPositions[currentLevel][j];
        PIEaddElement(placeholders[i]);
    }

    mySolution = "";
    PIEscene.remove(tick);
    PIEscene.remove(cross);
    PIEaddElement(wireExtra);
    PIEaddElement(levelButton[0]);
    PIEaddElement(levelButton[1]);

    if (currentLevel == 1){
        PIEscene.remove(wireExtra);
        PIEscene.remove(levelButton[1]);
    }

    if (currentLevel == 5){
        PIEscene.remove(levelButton[0]);
    }

    for(var i = 1; i < 7; i++){
        setPosition(new THREE.Vector3(0,0,0), resistance[i]);
    }

    var html = document.getElementById('question');
    html.innerHTML = "Place the resistances in the resistor placeholders such that the effective resistance is " + answers[currentLevel] + "Ω.";

    html = document.getElementById('answer');
    html.innerHTML = "Your Answer: " + mySolution;
}


function checkResistorPosition(resistor){
    var x = resistor.defaultPosition.x + resistor.position.x;
    var y = resistor.defaultPosition.y + resistor.position.y;
    myResistanceX = 0;
    myResistanceY = 0;

    for (var j in levelPositions[currentLevel]){
        var i = levelPositions[currentLevel][j];
        if (x < (posHolder[i].x + 2.5) && x > (posHolder[i].x - 2.5) && 
            y < (posHolder[i].y + 1.25) && y > (posHolder[i].y - 1.25)){ 
            myResistanceX = posHolder[i].x - resistor.defaultPosition.x; 
            myResistanceY = posHolder[i].y - resistor.defaultPosition.y;
            break;
        }
    }

    for (var j in resistance){
        var xx = resistance[j].position.x + resistance[j].defaultPosition.x;
        var yy = resistance[j].position.y + resistance[j].defaultPosition.y;
        if (resistor.value != resistance[j].value && Math.abs(xx - x) < 1 && Math.abs(yy - y) < 1){
            myResistanceX = 0;
            myResistanceY = 0;
        }
    }

    resistor.position.set(myResistanceX, myResistanceY, 0);
 }

function setPosition( position, object){
    object.position.set(position.x, position.y, position.z);
}

function generateResistance(i){
    var group = new THREE.Group();
    geometry = new THREE.CylinderBufferGeometry(1.25,1.25, 5, 32, 32, false);
    var band = new THREE.CylinderBufferGeometry(1.26,1.26, .3, 32, 32, false);
    material = new THREE.MeshBasicMaterial( {color: 0x8b1904} );
    var resistance = new THREE.Mesh( geometry, material );
    setPosition(posR[i], resistance);
    resistance.rotateZ(1.57);
    group.add(resistance);
    for (var j = 0; j < 4; j++){
        var material1 = new THREE.MeshBasicMaterial( {color: colorBands[i][j]} );
        var resistance1 = new THREE.Mesh( band, material1 );
        setPosition(new THREE.Vector3(posR[i].x - 1.5 + j, posR[i].y, 0), resistance1);
        resistance1.rotateZ(1.57);
        group.add(resistance1);
    }
    group.defaultPosition = posR[i];
    group.value = resistanceValues[i];
    PIEaddElement(group);
    PIEdragElement(group);
    return group;
}

function generateHolder(i){
    geometry = new THREE.BoxBufferGeometry(5, 2.5, 0);
    material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
    var holder = new THREE.Mesh( geometry, material );
    setPosition(posHolder[i], holder);
    return holder;
}

function showSolution(){
    for(var i = 1; i < 7; i++){
        setPosition(new THREE.Vector3(0,0,0), resistance[i]);
    }
    for (var j in levelPositions[currentLevel]){
        var i = levelAnswers[currentLevel][j];
        var k = levelPositions[currentLevel][j];
        resistance[i].position.x = posHolder[k].x - resistance[i].defaultPosition.x;
        resistance[i].position.y = posHolder[k].y - resistance[i].defaultPosition.y;
    }
}

function calculateResistance(){

    var value;
    var html = document.getElementById('answer');
    var placedResistors = [];
    for (var j in levelPositions[currentLevel]){
        var i = levelPositions[currentLevel][j];
        var pos = posHolder[i];
        var x = pos.x / mySceneW * 2 - 1;
        var y = pos.y / mySceneH * 2 - 1;
        var raycaster = new THREE.Raycaster();
        var location = new THREE.Vector2(x, y);
        raycaster.setFromCamera(location, PIEcamera);
        var a = raycaster.intersectObjects(PIEscene.children, true);
        if (a[0].object.parent.type != 'Group'){console.log('sdsf');
            PIEscene.remove(tick);
            PIEscene.remove(cross);
            mySolution = "";
            html.innerHTML = "Your Answer: " + mySolution;
            return;
        }
        placedResistors[j] = a[0].object.parent.value;
    }
    switch(currentLevel){
        case 1:
            value = placedResistors[0] + placedResistors[1];
            break;
        case 2:
            value = placedResistors[0] + placedResistors[1];
            value = 1/value + 1/placedResistors[2];
            value = 1/value;
            break;
        case 3:
            value = placedResistors[0] + placedResistors[1];
            var val = placedResistors[2] + placedResistors[3];
            value = 1/value + 1/val;
            value = 1/value;
            break;
        case 4:
            value = placedResistors[0] + placedResistors[1] + placedResistors[2];
            value = 1/value + 1/placedResistors[3];
            value = 1/value;
            break;
        case 5:
            value = placedResistors[0] + placedResistors[1] + placedResistors[2];
            var val = placedResistors[3] + placedResistors[4];
            value = 1/value + 1/val;
            value = 1/value;
    }
    mySolution = value.toFixed(2) + "Ω";
    console.log(mySolution);
    html.innerHTML = "Your Answer: " + mySolution;
    if(value == answers[currentLevel]){
        PIEaddElement(tick);
        setTimeout(levelUp, 1000);
    }
    else
        PIEaddElement(cross);
}

function levelUp(){
    if (currentLevel < 5){
        currentLevel++;
        updateElements();
    }
}

function PIEmouseDown(b) {
    var a;
    b.defaultPrevented = true;
    PIEselectedDrag = null;
    PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    a = PIEraycaster.intersectObjects(PIEdragElements, true);
    if (a.length > 0) {
        PIEselectedDrag = a[0].object.parent;
        PIEselectedDrag.position.z = 2;
        if (PIEraycaster.ray.intersectPlane(PIEdragPlane, PIEdragIntersect)) {
            PIEdragOffset.copy(PIEdragIntersect).sub(PIEselectedDrag.position)
        }
        PIEscreenElem.style.cursor = "move";
        PIEdefaultDragStart(PIEselectedDrag)
    }
    else if ((a = PIEraycaster.intersectObjects(levelButton)).length > 0){
        if(a[0].object.name == 'next'){
            currentLevel = currentLevel > 4 ? currentLevel : currentLevel + 1;
        }
        else{
            currentLevel = currentLevel < 2 ? currentLevel : currentLevel - 1;
        }
        updateElements();
    }
}

function PIEmouseUp(b) {
    var a;
    b.defaultPrevented = true;
    if (PIEselectedDrag != null) {
        checkResistorPosition(PIEselectedDrag);
        PIEselectedDrag.position.z = 0;
        calculateResistance();
        PIEdefaultDragEnd(PIEselectedDrag);
        PIEselectedDrag = null
    }
};

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
        a = PIEraycaster.intersectObjects(PIEdragElements, true);
        if (a.length > 0) {
            PIEdragPlane.setFromNormalAndCoplanarPoint(PIEcamera.getWorldDirection(PIEdragPlane.normal), a[0].object.position);
            if (PIEselectedHover != a[0].object) {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = a[0].object;
                PIEdefaultHoverON(PIEselectedHover)
            }
            PIEscreenElem.style.cursor = "pointer";
        } else if ((a = PIEraycaster.intersectObjects(levelButton)).length > 0){
            PIEscreenElem.style.cursor = "pointer";
        } else {
            if (PIEselectedHover != null) {
                PIEdefaultHoverOFF(PIEselectedHover);
                PIEselectedHover = null;
                PIEscreenElem.style.cursor = "auto"
            }
        }
    }
}

/******************* Update (animation changes) code ***********************/



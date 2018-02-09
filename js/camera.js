/**
 * Camera object
 *
 * @param position Point
 * @param angle Point of angle degrees
 * @param statis - is camera static or movable
 * @constructor
 */
function Camera( position, angle, static ) {

    /// Camera pos/orient
    this.position = position;
    this.angle = angle;
    this.viewer = new Point( position.x, position.y, 1000 );

    // Is camera static;
    this.static = static;

    /// Camera Variables
    this.cameraAngleX = 0;
    this.cameraAngleY = 0;
    this.height = window.innerHeight;

    /// Used for looking up/down
    this.maxCameraAngle = 90;

    /// Key Map state
    this.navi = {
        forward: false,
        backward: false,
        right: false,
        left: false
    };

    /**
     * Change angle of camera
     */
    this.updateCameraOrientation = function() {
        var xRadians = this.cameraAngleY * Math.PI/180;
        var yRadians = this.cameraAngleX * Math.PI/180;
        this.angle = new Point( xRadians, yRadians, 0);
    };

    /**
     * Change position of the camera
     */
    this.updateCameraPosition = function() {
        /// Calculate new location based on camera orientation
        var angle = this.cameraAngleX - 90;

        /// Speed of movement
        var step = 0.1;

        if ( this.navi.forward ) {
            this.position.x -= Math.cos(angle * Math.PI / 180) * step;
            this.position.z += Math.sin(angle * Math.PI / 180) * step;
        } if ( this.navi.backward ) {
            this.position.x += Math.cos(angle * Math.PI / 180) * step;
            this.position.z -= Math.sin(angle * Math.PI / 180) * step;
        } if ( this.navi.right ) {
            angle -= 90;
            this.position.x += Math.cos(angle * Math.PI / 180) * step;
            this.position.z -= Math.sin(angle * Math.PI / 180) * step;
        } if ( this.navi.left ) {
            angle += 90;
            this.position.x += Math.cos(angle * Math.PI / 180) * step;
            this.position.z -= Math.sin(angle * Math.PI / 180) * step;
        }
    };

    /**
     * Update all we need if user move camera
     */
    this.updateCamera = function() {
        if ( !this.static ) {
            this.updateCameraOrientation();
            this.updateCameraPosition();
        }
    };

    var self = this;

    /// Add mouse events
    document.addEventListener('mousemove', function(e){
        self.cameraAngleX += e.movementX/4;
        self.cameraAngleY = e.clientY.map( 0, self.height, self.maxCameraAngle, -self.maxCameraAngle );
    });

    /**
     * Flag button when we want to move camera
     * Will set flag to true /MOVE/
     */
    document.addEventListener( 'keydown', function(e) {
        if ( e.keyCode === 87 ) {
            self.navi.forward = true;
        } if ( e.keyCode === 83 ) {
            self.navi.backward = true;
        } if ( e.keyCode === 68 ) {
            self.navi.right = true;
        } if ( e.keyCode === 65 ) {
            self.navi.left = true;
        }
    });

    /**
     * Flag button when we want to move camera
     * Will set flag to false /DONT MOVE/
     */
    document.addEventListener( 'keyup', function(e) {
        if ( e.keyCode === 87 ) {
            self.navi.forward = false;
        } if ( e.keyCode === 83 ) {
            self.navi.backward = false;
        } if ( e.keyCode === 68 ) {
            self.navi.right = false;
        } if ( e.keyCode === 65 ) {
            self.navi.left = false;
        }
    });

}
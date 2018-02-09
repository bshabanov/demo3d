/**
 * Render objects on canvas context
 *
 * @param ctx
 * @param camera
 * @constructor
 */
function Render( ctx, camera ) {

    /// Camera object
    this.camera = camera;

    /// Canvas context
    this.ctx = ctx;

    /// Calculate 3D to 2D
    this.projection = function( point, camera ) {

        /// If camera is not presented use default
        if ( !camera ) {
            camera = this.camera;
        }

        /// Scene size
        var width = window.innerWidth;
        var height = window.innerHeight;

        /// Update camera
        camera.updateCamera();

        /// Calc deltas
        var X = point.x - camera.position.x;
        var Y = point.y - camera.position.y;
        var Z = point.z - camera.position.z;

        /// Calc all cos
        var Cx = Math.cos(camera.angle.x);
        var Cy = Math.cos(camera.angle.y);
        var Cz = Math.cos(camera.angle.z);

        /// Calc all sin
        var Sx = Math.sin(camera.angle.x);
        var Sy = Math.sin(camera.angle.y);
        var Sz = Math.sin(camera.angle.z);

        //// Do da shit
        var Dx = Cy * (Sz*Y + Cz*X) - Sy*Z;
        var Dy = Sx * (Cy*Z + Sy * (Sz*Y + Cz*X)) + Cx * (Cz*Y - Sz*X);
        var Dz = Cx * (Cy*Z + Sy * (Sz*Y + Cz*X)) - Sx * (Cz*Y - Sz*X);

        /// Prevent from flipping when object is behind the camera
        Dz = Dz >= 0 ? -0.1 : Dz;

        /// Return projected 3d on 2d plane *width/2 - center on screen
        return {
            x : ((camera.viewer.z/Dz) * Dx - camera.viewer.x) + width/2,
            y : ((camera.viewer.z/Dz) * Dy - camera.viewer.y) + height/2
        }
    };

    /**
     * Render object from meshes.js file
     *
     * @param arrayOfPoints - mesh object *see meshes.js
     * @param x - offset
     * @param y - offset
     * @param z - offset
     */
    this.object = function( arrayOfPoints, x, y, z, camera ) {
        /// Begin render
        this.ctx.save();
        this.ctx.beginPath();

        /// Move to first chunk of cube
        var coords = this.projection(new Point( arrayOfPoints[0].x + x, arrayOfPoints[0].y + y, arrayOfPoints[0].z + z ), camera);
        this.ctx.moveTo( coords.x, coords.y );

        //// Loop all vertexes
        for ( var i=1;i<arrayOfPoints.length; i++ ) {
            var coords = this.projection(new Point( arrayOfPoints[i].x + x, arrayOfPoints[i].y + y, arrayOfPoints[i].z + z ), camera);

            this.ctx.lineTo( coords.x, coords.y );
            this.ctx.strokeStyle="#FFFFFF";
            this.ctx.lineWidth=2;
            this.ctx.stroke();
            this.ctx.fillStyle = "rgba(255,255,255,0.05)";
            this.ctx.fill();
        }

        this.ctx.restore();
    }

}
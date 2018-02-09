/**
 * MESHES
 */

/// Cube
var size = 100;
var depth = -100;

var cube = [
    /// Back
    new Point(0, 0, 0),
    new Point(size, 0, 0),
    new Point(size, size, 0),
    new Point(0, size, 0),
    new Point(0, 0, 0),

    /// Front
    new Point(0, 0, depth),
    new Point(size, 0, depth),
    new Point(size, size, depth),
    new Point(0, size, depth),
    new Point(0, 0, depth),

    /// Other
    new Point(size, 0, depth),
    new Point(size, 0, 0),

    new Point(size, size, 0),
    new Point(size, size, depth ),

    new Point(0, size, depth),
    new Point(0, size, 0)
];

/// Plane
var paneHalfSize = 500;
var plane = [
    new Point( -paneHalfSize, 0, -paneHalfSize ),
    new Point( paneHalfSize, 0, -paneHalfSize ),
    new Point( paneHalfSize, 0, paneHalfSize ),
    new Point( -paneHalfSize, 0, paneHalfSize ),
    new Point( -paneHalfSize, 0, -paneHalfSize )
];

var tree = [
    new Point( 0, 0, 0 ),
    new Point( 0, 50, 0 ),
    new Point( 1, 90, 5 ),
    new Point( 70, 98, 5  ),
    new Point( 1, 90, 5 ),
    new Point( -50, 110, -5  ),
    new Point( 1, 90, 5 ),
    new Point( 1, 60, -40 ),
    new Point( 1, 90, 5 ),
    new Point( 10, 80, 60 ),
    new Point( 1, 90, 5 ),
    new Point( 10, 140, 5 )
];
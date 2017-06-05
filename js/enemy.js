var Enemy = function(game, key , health , level) {
  //Call constructor of Phaser.Sprite to initialize this
  //alert(level)
  Phaser.Sprite.call(this, game, 0, 0, key);

  //Set the origin point of the sprite to its center
  this.anchor.set(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  //Record whether sprite is processed by the update() function
  this.exists = false;
  this.maxHealth = health;
  //Enemy Level
  this.eneLevel = level;
}
//Enemy inherited from Phaser.sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

/**
 * @param x - Coordinates x of starting position that enemy will show.
 * @param y - Coordinates y of starting position that enemy will show.
 * @param angle - The moving angle of the enemy.
 * @param xAccel - The acceleration value in x direction.
 * @param yAccel - The acceleration value in y direction.
 */
Enemy.prototype.launch = function(x, y, angle, speed, xAccel, yAccel) {
  //Reset the Enemy, which moves the Enemy to the given x/y corrdinates,
  //sets the 'exists' property to true, and heal the enemy.
  this.reset(x, y, this.maxHealth);

  //Set Enemy's velocity that is calculated from the given angle and speed
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  //Set x and y acceleration value
  this.body.acceleration.set(xAccel, yAccel);
}

/**
 * @param x - Coordinates x of starting position that enemy will show.
 * @param y - Coordinates y of starting position that enemy will show.
 * @param properties - A properties object that has the same format as the one used in Phaser.Tween.to(), see the docs for more information
 * @param duration - The time in miliseconds that this tween should complete executing i.e. enemy moving speed.
 */
Enemy.prototype.launchTween = function(x, y, properties, duration) {
  this.reset(x, y, this.maxHealth);
  var tween = this.game.add.tween(this).to(properties, duration, Phaser.Easing.Sinusoidal.Out, true);
  tween.interpolation(Phaser.Math.catmullRomInterpolation);
}

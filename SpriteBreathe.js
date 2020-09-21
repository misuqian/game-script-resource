// YEP_X_AnimatedSVEnemies
/* @param Breathing Speed
* @desc The default breathing rate for enemies.
* Lower - Faster     Larger - Slower
* @default 20
*
* @param Breathing X Rate
* @desc The default breathing X rate for enemies.
* Lower - Static     Larger - Dynamic
* @default 0.001
*
* @param Breathing Y Rate
* @desc The default breathing Y rate for enemies.
* Lower - Static     Larger - Dynamic
* @default 0.02
*/

Sprite_Enemy.prototype.updateBreathing = function() {
    if (!this._enemy) return;
    if (this._enemy.isBreathing()) {
      var c = Graphics.frameCount + this._svRand;
      var s = this._enemy.breathingSpeed();
      var rateX = this._enemy.breathXRate();
      var rateY = this._enemy.breathYRate();
      if (this._enemy.linkBreathing()) s /= this._enemy.hpRate();
      var scaleX = Math.cos(c / s) * rateX;
      var scaleY = Math.cos(c / s) * rateY;
    } else {
      var scaleX = 0;
      var scaleY = 0;
    }
    var mirror = this.scale.x > 0 ? 1 : -1;
    this.scale.x = this._enemy.spriteScaleX() + scaleX;
    this.scale.x = Math.abs(this.scale.x) * mirror;
    this.scale.y = this._enemy.spriteScaleY() + scaleY;
};

Game_Enemy.prototype.breathingSpeed = function() {
  return this.enemy().sideviewBreathSpeed;
};

Game_Enemy.prototype.breathXRate = function() {
  return this.enemy().sideviewBreathXRate;
};

Game_Enemy.prototype.breathYRate = function() {
  return this.enemy().sideviewBreathYRate;
};

obj.sideviewBreathSpeed = Math.max(1, Yanfly.Param.SVEBreathSpeed);
obj.sideviewBreathXRate = Math.max(0, Yanfly.Param.SVEBreathXRate);
obj.sideviewBreathYRate = Math.max(0, Yanfly.Param.SVEBreathYRate);


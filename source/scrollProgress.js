/**
 * Fallback noop function
 * @method noop
 * @returns {undefined}
 */
function noop() {}

/**
 * ScrollProgress class constructor
 * @constructor ScrollProgress
 * @param {Function} handleUpdate method to call on scroll update
 * @returns {undefined}
 */
var ScrollProgress = function(handleUpdate,pSelector) {
  //get Object
  this.scrollObject = apex.jQuery(pSelector)[0];

  // assign function to call on update
  this._handleUpdate = typeof handleUpdate === 'function'
    ? handleUpdate
    : noop;

  // set initial values
  this._viewportHeight = this._getViewportHeight();
  this._viewportWidth = this._getViewportWidth();

  this._progress = this._getProgress();

  // trigger initial update function
  this._handleUpdate(this._progress.x, this._progress.y);

  // bind event functions
  this._onScroll = this._onScroll.bind(this);
  this._onResize = this._onResize.bind(this);

  // add event listeners
  this.scrollObject.addEventListener('scroll', this._onScroll);
  this.scrollObject.addEventListener('resize', this._onResize);
};

/**
 * The object where the scroll position are going to be calculated from.
 */
ScrollProgress.prototype.scrollObject = null;

/**
 * Get vertical trajectory of the viewport
 * @method _getViewportHeight
 * @returns {Number}
 */
ScrollProgress.prototype._getViewportHeight = function() {
  return this.scrollObject.scrollHeight;
};

/**
 * Get horizontal trajectory of the viewport
 * @method _getViewportWidth
 * @returns {Number}
 */
ScrollProgress.prototype._getViewportWidth = function() {
  return this.scrollObject.scrollWidth;
};

/**
 * Get scroll progress on both axis
 * @method _getProgress
 * @returns {Object}
 */
ScrollProgress.prototype._getProgress = function() {
  var x = this.scrollObject.scrollLeft === 0 ? 0 :
        this.scrollObject.scrollLeft + 
        this.scrollObject.offsetWidth;
  var y = this.scrollObject.scrollTop === 0 ? 0 :
        this.scrollObject.scrollTop + 
        this.scrollObject.offsetHeight;

  return {
    x: this._viewportWidth === 0
      ? 0
      : x / this._viewportWidth,
    y: this._viewportHeight === 0
      ? 0
      : y / this._viewportHeight
  };
};

/**
 * Get scroll progress on both axis
 * @method _getProgress
 * @returns {undefined}
 */
ScrollProgress.prototype._onScroll = function() {
  this._progress = this._getProgress();
  this._handleUpdate(this._progress.x, this._progress.y);
};

/**
 * Update viewport metrics, recalculate progress and call update callback
 * @method _onResize
 * @returns {undefined}
 */
ScrollProgress.prototype._onResize = function() {
  this._viewportHeight = this._getViewportHeight();
  this._viewportWidth = this._getViewportWidth();

  this._progress = this._getProgress();

  // trigger update function
  this._handleUpdate(this._progress.x, this._progress.y);
};

/**
 * Trigger update callback
 * @method trigger
 * @returns {undefined}
 */
ScrollProgress.prototype.trigger = function() {
  this._handleUpdate(this._progress.x, this._progress.y);
};

/**
 * Destroy scroll observer, remove listeners and update callback
 * @method destroy
 * @returns {undefined}
 */
ScrollProgress.prototype.destroy = function() {
  this.scrollObject.removeEventListener('scroll', this._onScroll);
  this.scrollObject.removeEventListener('resize', this._onResize);
  this._handleUpdate = null;
};
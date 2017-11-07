// Input 0
function EngineObject() {
  this.EI = 0;
  this.UniqueID = this._getUniqueID();
  this.Y = this.X = 0;
  this.Type = "Object";
  this.OnTerrain = !1;
}
EngineObject.prototype.Update = function() {
  return !1;
};
EngineObject.prototype.UniqueIDState = 0;
EngineObject.prototype._getUniqueID = function() {
  return EngineObject.prototype.UniqueIDState++;
};
Object.defineProperty(EngineObject.prototype, "Engine", {get:function() {
  return $.EngineArray[this.EI];
}});
function ABO() {
  EngineObject.call(this);
  this.Attributes = {};
  this.Name = "";
  this.Height = this.Width = 0;
}
ABO.prototype = Object.create(EngineObject.prototype);
ABO.prototype.constructor = ABO;
ABO.prototype.Draw = function() {
  return !1;
};
ABO.prototype.ProcessInput = function() {
  return !1;
};
ABO.prototype.GetArea = function(a, b) {
  "undefined" === typeof a && (a = 0);
  if ("undefined" === typeof b || 0 > b) {
    b = 0;
  }
  var c = "circle" !== b ? 0 == b ? {x:this.X - a, y:this.Y - a, width:this.Width + 2 * a, height:this.Height + 2 * a, type:"rect"} : {x:this.X - a, y:this.Y - a, width:this.Width + 2 * a, height:this.Height + 2 * a, rounding:b, type:"rrect"} : {x:this.X, y:this.Y, radius:this.Radius + a, type:"circle"};
  c.background = !1;
  return c;
};
ABO.prototype.Delete = function() {
};
function Alert(a) {
  ABO.call(this);
  this.Y = this.X = 0;
  this.Width;
  this.Height;
  this.ContentWidthQuotient = 0.6;
  this.Text = a;
  this.ImageText = !1;
  this.Rows = [];
  this.RowLengths = [];
  this.Rounding = Alert.prototype.DefaultRounding;
  this.FontHeight = Alert.prototype.DefaultFontHeight;
  this.BoxPadding = Alert.prototype.DefaultBoxPadding;
  this.RowSpace = Alert.prototype.DefaultRowSpace;
  this.FontPadding = this.BoxPadding;
  this.ContentBox = {};
  this.OkBox = {x:0, y:0, width:60, height:40};
  this.IsMouseOverBackground = this.IsMouseOverContent = this.IsMouseOverOk = !1;
  this.Opacity = 0;
  this._ref_mhan = this._ref_upd = this._ref_draw = this._ref_ip = null;
  this._cbo = !1;
  this.Initialize();
}
Alert.prototype = Object.create(ABO.prototype);
Alert.prototype.constructor = Alert;
Alert.prototype.ContentBoxColor = "#999";
Alert.prototype.BoxBorderColor = "black";
Alert.prototype.BoxColor = "#ccc";
Alert.prototype.BoxFontColor = "#fff";
Alert.prototype.OutsideColor = "rgba(0,0,0,0.8)";
Alert.prototype.DefaultRounding = 10;
Alert.prototype.DefaultFontHeight = 18;
Alert.prototype.DefaultBoxPadding = 5;
Alert.prototype.DefaultRowSpace = 4;
Alert.prototype.Initialize = function() {
  this._createTextImage();
  this._recalculateSizes();
};
Alert.prototype._createTextImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Engine.Canvas.width * this.ContentWidthQuotient;
  a.height = 300;
  var b = a.getContext("2d");
  b.font = this.Engine.Context.font;
  b.setFontHeight(this.FontHeight);
  for (var c = [], d = "string" === typeof this.Text ? [this.Text] : this.Text, e, f = 0; f < d.length; f++) {
    e = d[f].split(" ");
    for (var g = 0; g < e.length; g++) {
      c.push(e[g]);
    }
    f < d.length - 1 && c.push("\\n");
  }
  d = b.measureText(" ").width;
  e = [];
  for (f = 0; f < c.length; f++) {
    "\\n" !== c[f] ? e.push(b.measureText(c[f]).width) : e.push(0);
  }
  b = [];
  g = [];
  b.push("");
  g.push(0);
  for (f = 0; f < c.length; f++) {
    "\\n" === c[f] ? (f++, b.push(c[f] + " "), g.push(0 + e[f] + d)) : g[b.length - 1] + e[f] + d < a.width - 2 * this.FontPadding ? (b[b.length - 1] += c[f] + " ", g[b.length - 1] += e[f] + d) : (b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1), g[b.length - 1] -= d, b.push(c[f] + " "), g.push(e[f] + d));
  }
  b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1);
  this.Rows = b;
  this.RowLengths = g;
  for (f = a = 0; f < b.length; f++) {
    g[f] > a && (a = g[f]);
  }
  d = c = this.BoxPadding;
  f = a + 2 * this.BoxPadding;
  e = this.Rows.length * this.FontHeight + (this.Rows.length - 1) * this.RowSpace + 2 * this.FontPadding;
  a = document.createElement("CANVAS");
  a.width = f;
  a.height = e;
  b = a.getContext("2d");
  b.setFontHeight(this.FontHeight);
  b.textAlign = "left";
  b.textBaseline = "top";
  for (f = 0; f < this.Rows.length; f++) {
    b.fillText(this.Rows[f], c, d + this.FontHeight * f + this.RowSpace * f);
  }
  this.ImageText = document.createElement("IMG");
  this.ImageText.width = a.width;
  this.ImageText.height = e;
  this.ImageText.src = a.toDataURL();
};
Alert.prototype._recalculateSizes = function() {
  var a = this.BoxPadding, b = this.Engine.Canvas;
  this.Width = b.width;
  this.Height = b.height;
  this.ContentBox.width = this.ImageText.width;
  this.ContentBox.height = this.ImageText.height + this.OkBox.height + 2 * a;
  this.ContentBox.x = b.width / 2 - this.ContentBox.width / 2;
  this.ContentBox.y = b.height / 2 - this.ContentBox.height / 2;
  this.OkBox.x = this.ContentBox.x + this.ContentBox.width / 2 - this.OkBox.width / 2;
  this.OkBox.y = this.ContentBox.y + this.ContentBox.height - this.OkBox.height - a;
};
Alert.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, "function":function(a) {
    a.save();
    a.globalAlpha = this.Opacity;
    a.fillStyle = this.OutsideColor;
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    var b = this.ContentBox;
    a.beginPath();
    a.variousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.clip();
    a.fillStyle = this.ContentBoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, 0);
    a.drawImage(this.ImageText, this.ContentBox.x, this.ContentBox.y);
    a.restore();
    a.save();
    b = this.OkBox;
    a.setFontHeight(0.5 * b.height);
    a.fillStyle = this.BoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding / 3 * 2);
    a.fillStyle = this.BoxFontColor;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "OK", 0);
    a.restore();
    a.save();
    a.strokeStyle = this.BoxBorderColor;
    a.lineWidth = 5;
    b = this.ContentBox;
    a.strokeVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.restore();
  }, parameter:this.Engine.Context};
};
Alert.prototype._createProcessInputFunctionObject = function() {
  return {that:this, "function":function(a) {
    var b = this.ContentBox;
    a = {"function":function(a) {
      a.moveTo(0, 0);
      a.lineTo(0, a.canvas.height);
      a.lineTo(a.canvas.width, a.canvas.height);
      a.lineTo(a.canvas.width, 0);
      a.lineTo(0, 0);
      a.rect(b.x, b.y, b.width, b.height);
    }, type:"function"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverBackground");
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverContent");
    b = this.OkBox;
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverOk");
  }, parameter:this.Engine};
};
Alert.prototype._createUpdateFunctionObject = function() {
  return {that:this, "function":function(a) {
    this._recalculateSizes();
    this.IsMouseOverOk && this.Engine.Input.Mouse.Cursor.Set("pointer");
  }, parameter:this.Engine};
};
Alert.prototype._createMouseHandlerObject = function() {
  return {that:this, "function":function(a) {
    a.GoThrough = !1;
    this.IsMouseOverOk && this.Stop();
    this.IsMouseOverBackground && this.Stop();
  }, parameter:this.Engine};
};
Alert.prototype.Start = function(a) {
  this.Active = !0;
  (new Flow(this, "Opacity", 1, 600, {that:this, parameter:!0, "function":function(a) {
  }})).Start();
  var b = this._createProcessInputFunctionObject();
  this._ref_ip = this.Engine.AddProcessInputFunction(b);
  b = this._createForegroundDrawFunctionObject();
  this._ref_draw = this.Engine.AddForegroundDrawFunctionObject(b);
  b = this._createUpdateFunctionObject();
  this._ref_upd = this.Engine.AddUpdateFunctionObject(b);
  b = this._createMouseHandlerObject();
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", b);
  this._cbo = a;
};
Alert.prototype.Stop = function() {
  this.Active = !1;
  this.Engine.RemoveForegroundDrawFunctionObject(this._ref_draw);
  this._ref_draw = null;
  this.Engine.RemoveUpdateFunctionObject(this._ref_upd);
  this._ref_upd = null;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mhan);
  this._ref_mhan = null;
  this.Engine.RemoveProcessInputFunction(this._ref_ip);
  this._ref_ip = null;
  Callback.CallObject(this._cbo);
};
function ABOPresenter(a) {
  ABO.call(this);
  this.Y = this.X = 0;
  this.Width;
  this.Height;
  a instanceof ABO ? (this.ABO = a, this._ready = !0) : this._ready = !1;
  this.ContentBox = {x:0, y:0, width:0, height:0};
  this.Rounding = ABOPresenter.prototype.DefaultRounding;
  this.OKBox = {x:0, y:0, width:120, height:40};
  this.StopFunction = this.StartFunction = this.IsMouseOverContent = this.IsMouseOverOK = !1;
  this.Opacity = 0;
  this._ref_mhan = this._ref_upd = this._ref_draw = this._ref_ip = null;
  this.Initialize();
}
ABOPresenter.prototype = Object.create(ABO.prototype);
ABOPresenter.prototype.constructor = ABOPresenter;
ABOPresenter.prototype.ContentBoxColor = "#999";
ABOPresenter.prototype.BoxBorderColor = "black";
ABOPresenter.prototype.OKBoxColor = "#ccc";
ABOPresenter.prototype.OKBoxFontColor = "#fff";
ABOPresenter.prototype.OutsideColor = "rgba(0,0,0,0.8)";
ABOPresenter.prototype.DefaultRounding = 10;
ABOPresenter.prototype.DefaultFontHeight = 18;
ABOPresenter.prototype.Initialize = function() {
  this._ready && this._recalculateSizes();
};
ABOPresenter.prototype._recalculateSizes = function() {
  var a = this.Engine.Canvas;
  this.Width = a.width;
  this.Height = a.height;
  this.ContentBox.width = this.ABO.Width;
  this.ContentBox.height = this.ABO.Height + this.OKBox.height + 10;
  this.ContentBox.x = a.width / 2 - this.ContentBox.width / 2;
  this.ABO.X = this.ContentBox.x;
  this.ContentBox.y = a.height / 2 - this.ContentBox.height / 2;
  this.ABO.Y = this.ContentBox.y;
  this.OKBox.x = this.ContentBox.x + this.ContentBox.width / 2 - this.OKBox.width / 2;
  this.OKBox.y = this.ContentBox.y + this.ContentBox.height - this.OKBox.height - 5;
};
ABOPresenter.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, "function":function(a) {
    a.save();
    a.globalAlpha = this.Opacity;
    a.fillStyle = this.OutsideColor;
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    var b = this.ContentBox;
    a.beginPath();
    a.variousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.clip();
    a.fillStyle = this.ContentBoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, 0);
    this.ABO.Draw(a);
    a.restore();
    a.save();
    b = this.OKBox;
    a.fillStyle = this.OKBoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding / 3 * 2);
    a.setFontHeight(0.5 * b.height);
    a.fillStyle = this.OKBoxFontColor;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "Verstanden", 0);
    a.restore();
    a.save();
    a.strokeStyle = this.BoxBorderColor;
    a.lineWidth = 5;
    b = this.ContentBox;
    a.strokeVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.restore();
  }, parameter:this.Engine.Context};
};
ABOPresenter.prototype._createProcessInputFunctionObject = function() {
  return {that:this, "function":function(a) {
    this.ABO.ProcessInput();
    a = this.ContentBox;
    a = {x:a.x, y:a.y, width:a.width, height:a.height, rounding:0, type:"rrect", background:!0};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverContent");
    a = this.OKBox;
    a = {x:a.x, y:a.y, width:a.width, height:a.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverOK");
  }, parameter:this.Engine};
};
ABOPresenter.prototype._createUpdateFunctionObject = function() {
  return {that:this, "function":function(a) {
    this.ABO.Update();
    this._recalculateSizes();
    this.IsMouseOverOK && this.Engine.Input.Mouse.Cursor.Set("pointer");
  }, parameter:this.Engine};
};
ABOPresenter.prototype._createMouseHandlerObject = function() {
  return {that:this, "function":function(a) {
    a.GoThrough = !1;
    this.IsMouseOverOK && this.Stop();
    this.IsMouseOverContent || this.Stop();
  }, parameter:this.Engine};
};
ABOPresenter.prototype.Start = function(a, b) {
  this.Active = !0;
  var c = !1;
  "undefined" !== typeof a && (this.StartFunction = a, Callback.CallObject(a), c = !0);
  !c && this.StartFunction && Callback.CallObject(this.StartFunction);
  "undefined" !== typeof b && (this.StopFunction = b);
  (new Flow(this, "Opacity", 1, 600, {that:this, parameter:!0, "function":function(a) {
  }})).Start();
  c = this._createProcessInputFunctionObject();
  this._ref_ip = this.Engine.AddProcessInputFunction(c);
  c = this._createForegroundDrawFunctionObject();
  this._ref_draw = this.Engine.AddForegroundDrawFunctionObject(c);
  c = this._createUpdateFunctionObject();
  this._ref_upd = this.Engine.AddUpdateFunctionObject(c);
  c = this._createMouseHandlerObject();
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", c);
};
ABOPresenter.prototype.Stop = function() {
  this.Active = !1;
  this.StopFunction && Callback.CallObject(this.StopFunction);
  this.Engine.RemoveForegroundDrawFunctionObject(this._ref_draw);
  this._ref_draw = null;
  this.Engine.RemoveUpdateFunctionObject(this._ref_upd);
  this._ref_upd = null;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mhan);
  this._ref_mhan = null;
  this.Engine.RemoveProcessInputFunction(this._ref_ip);
  this._ref_ip = null;
};
ABOPresenter.prototype.SetStartFunction = function(a) {
  this.StartFunction = a;
};
ABOPresenter.prototype.SetStopFunction = function(a) {
  this.StopFunction = a;
};
function Animation(a, b, c, d, e, f) {
  ABO.call(this);
  this.Type = "Animation";
  "undefined" === typeof f && (f = !1);
  this.Direction = "left";
  this.ReverseAfter = f;
  this._countingUp = !0;
  this.Active = !1;
  this.X = a;
  this.Y = b;
  this.FullImage;
  this.Height = this.Width = 0;
  this.Images = [];
  this.ImageIndex = 0;
  this.NumberOfPictures = d;
  this.JumpEvery = e;
  this.Scale = 1;
  this.Codename = c;
  this.Active = !1;
  this.Infinite = !0;
  this.Iterations = 0;
  this.CallbackObject = {that:this, "function":function(a) {
  }, parameter:"default"};
  this.MaxIterations = !1;
  this._ref = null;
  this.Initialize();
}
Animation.prototype = Object.create(ABO.prototype);
Animation.prototype.constructor = Animation;
Object.defineProperty(Animation.prototype, "Image", {get:function() {
  return this.Images[this.ImageIndex = 0];
}});
Animation.prototype.Initialize = function() {
  if ((this.FullImage = this.Engine.MediaManager.GetImage(this.Codename)) && "left" == this.Direction) {
    this.Height = this.FullImage.height;
    this.Width = this.FullImage.width / this.NumberOfPictures;
    var a = document.createElement("CANVAS");
    a.width = this.Width;
    a.height = this.Height;
    for (var b = a.getContext("2d"), c, d = 0; d < this.NumberOfPictures; d++) {
      b.clearRect(0, 0, a.width, a.height), b.drawImage(this.FullImage, a.width * d, 0, a.width, a.height, 0, 0, a.width, a.height), c = a.toDataURL(), this.Images[d] = document.createElement("IMG"), this.Images[d].src = c;
    }
  }
};
Animation.prototype.Draw = function(a) {
  this.FullImage && this.Active && a.drawImage(this.Images[this.ImageIndex], this.X, this.Y, this.Width, this.Height);
};
Animation.prototype.Update = function() {
  this.FullImage || this.Initialize();
  !this.Infinite && this.Iterations >= this.MaxIterations && this.Stop();
};
Animation.prototype.Start = function() {
  this.Active = !0;
  this.ImageIndex = 0;
  this.AddCounterFunction();
};
Animation.prototype.Stop = function() {
  this.Active = !1;
  this.RemoveCounterFunction();
  var a = this.CallbackObject;
  a["function"].call(a.that, a.parameter);
};
Animation.prototype.SetCallbackObject = function(a) {
  this.CallbackObject = a;
};
Animation.prototype.AddCounterFunction = function() {
  this._ref = this.Engine.Counter.AddCounterFunction({that:this, parameter:this.Engine, "function":function(a) {
    this._countingUp ? this.ImageIndex++ : this.ImageIndex--;
    this.ImageIndex >= this.NumberOfPictures - 1 && (this.ReverseAfter ? this._countingUp = !1 : (this.Iterations++, this.ImageIndex = 0));
    0 >= this.ImageIndex && !this._countingUp && (this.Iterations++, this.ImageIndex = 0, this._countingUp = !0);
  }, every:this.JumpEvery});
};
Animation.prototype.RemoveCounterFunction = function() {
  this.Engine.Counter.RemoveCounterFunction(this._ref);
};
Animation.prototype.SetMaxIterations = function(a) {
  this.MaxIterations = a;
  this.Infinite = !1;
};
function ImageObject(a, b, c) {
  ABO.call(this);
  this.X = b;
  this.Y = c;
  this.Codename = a;
  this.Image = !1;
  this.Height = this.Width = 0;
  this.Scale = 3 < arguments.length ? arguments[3] : 1;
  this.TerrainImage = !0;
  this.Initialize();
}
ImageObject.prototype = Object.create(ABO.prototype);
ImageObject.prototype.constructor = ImageObject;
ImageObject.prototype.Initialize = function() {
  this.Image = "string" === typeof this.Codename ? this.Engine.MediaManager.GetImage(this.Codename) : this.Codename;
  this.Width = this.Image.width;
  this.Height = this.Image.height;
};
ImageObject.prototype.Draw = function(a) {
  var b = this.Engine.Camera.SelectedCamera;
  this.Image ? a.drawImage(this.Image, this.X - b.X, this.Y - b.Y, this.Image.width * this.Scale, this.Image.height * this.Scale) : a.fillRect(this.X - b.X, this.Y - b.Y, this.Image.width * this.Scale, this.Image.height * this.Scale);
};
ImageObject.prototype.Update = function() {
  if (0 === this.Width || 0 === this.Height) {
    this.Width = this.Image.width, this.Height = this.Image.height;
  }
};
function ABText(a, b, c, d) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Height = this.Width = !1;
  this.Text = c;
  this.TextWidth = 0;
  this.FontHeight = d || 20;
  this.Underline = !1;
  this.Color = ABText.prototype.DefaultFontColor;
  this.Initialize();
}
ABText.prototype = Object.create(ABO.prototype);
ABText.prototype.constructor = ABText;
ABText.prototype.DefaultFontColor = "black";
ABText.prototype.Initialize = function() {
  this.Resize();
};
ABText.prototype.Resize = function() {
  this.Height = this.FontHeight;
  var a = this.Engine.Context;
  a.save();
  a.setFontHeight(this.FontHeight);
  this.Width = this.TextWidth = a.measureText(this.Text).width;
  a.restore();
};
ABText.prototype.Draw = function(a) {
  a.save();
  a.setFontHeight(this.FontHeight);
  a.textAlign = "left";
  a.textBaseline = "top";
  a.fillStyle = this.Color;
  a.fillText(this.Text, this.X, this.Y);
  if (this.Underline) {
    var b = this.FontHeight / 15;
    a.lineWidth = b;
    a.strokeStyle = this.Color;
    a.beginPath();
    a.moveTo(this.X, this.Y + this.Height + b);
    a.lineTo(this.X + this.Width, this.Y + this.Height + b);
    a.stroke();
    a.closePath();
  }
  a.restore();
};
ABText.prototype.Update = function() {
};
ABText.prototype.SetText = function(a) {
  this.Text = a;
  this.Resize();
};
var BezierSpline = {GetCurveControlPoints:function(a) {
  if (1 > arguments.length || 2 > a.length) {
    return !1;
  }
  var b = [], c = [], d = a.length - 1;
  if (1 == d) {
    return b[0] = {x:(2 * a[0].x + a[1].x) / 3, y:(2 * a[0].y + a[1].y) / 3}, c[0] = {x:2 * b[0].x - a[0].x, y:2 * b[0].y - a[0].y}, [b, c];
  }
  for (var e = [], f = 1; f < d - 1; f++) {
    e[f] = 4 * a[f].x + 2 * a[f + 1].x;
  }
  e[0] = a[0].x + 2 * a[1].x;
  e[d - 1] = (8 * a[d - 1].x + a[d].x) / 2;
  var g = BezierSpline.GetFirstControlPoints(e);
  for (f = 1; f < d - 1; f++) {
    e[f] = 4 * a[f].y + 2 * a[f + 1].y;
  }
  e[0] = a[0].y + 2 * a[1].y;
  e[d - 1] = (8 * a[d - 1].y + a[d].y) / 2;
  e = BezierSpline.GetFirstControlPoints(e);
  for (f = 0; f < d; f++) {
    b[f] = {x:g[f], y:e[f]}, c[f] = f < d - 1 ? {x:2 * a[f + 1].x - g[f + 1], y:2 * a[f + 1].y - e[f + 1]} : {x:(a[d].x + g[d - 1]) / 2, y:(a[d].Y + e[d - 1]) / 2};
  }
  return [b, c];
}, GetFirstControlPoints:function(a) {
  var b = a.length, c = [], d = [], e = 2;
  c[0] = a[0] / e;
  for (var f = 1; f < b; f++) {
    d[f] = 1 / e, e = (f < b - 1 ? 4.0 : 3.5) - d[f], c[f] = (a[f] - c[f - 1]) / e;
  }
  for (f = 1; f < b; f++) {
    c[b - f - 1] -= d[b - f] * c[b - f];
  }
  return c;
}};
function BoxMenu(a, b, c, d, e, f) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.Height = d;
  this.TitleHeight = f || 20;
  this.TitleRounding = this.TitleHeight / 4;
  this.DisplayHeight = this.Height - this.TitleHeight;
  this.OffsetY = this.ItemsHeight = 0;
  this.Title = e || "Men{ue}".decodeURI();
  this._minimized = !1;
  this.PreItemUpdateCBO = {that:this, "function":function(a, b, c) {
  }, parameter:{}};
  this.Items = [];
  this.PostItemUpdateCBO = {that:this, "function":function(a, b, c) {
  }, parameter:{}};
  this.HandleWidth = 20;
  this.Fac = 0;
  this.Handle = {x:this.X + this.Width - this.HandleWidth, y:this.Y + this.TitleHeight, width:this.HandleWidth, height:this.Height - this.TitleHeight};
  this.HandleRounding = 4;
  this._framesAfterDragging = 0;
  this.IsMouseOverDisplay = this.IsMouseOverMinimize = this.IsMouseOverClose = this.IsMouseOverHandle = this.IsMouseOverTitle = this.IsMouseOver = this._scrolling = this._dragging = !1;
  this.TrueClosing = !0;
  this.TrulyClosed = this.Closed = !1;
  this.PositionBeforeClosing = {x:0, y:0};
  this._ref_W = this._ref_PIF = this._ref = null;
  this.Initialize();
}
BoxMenu.prototype = Object.create(ABO.prototype);
BoxMenu.prototype.constructor = BoxMenu;
BoxMenu.prototype.TitleColor = "#ddd";
BoxMenu.prototype.Color = "#eee";
BoxMenu.prototype.HandleColor = "#999";
BoxMenu.prototype.Initialize = function() {
  this.AddProcessInputFunction();
  this.AddMouseHandler();
};
BoxMenu.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOverMinimize && (1 < this._framesAfterDragging && this.ClickOnMinimize(), a.GoThrough = !1);
    this.IsMouseOverClose && (1 < this._framesAfterDragging && this.ClickOnClose(), a.GoThrough = !1);
  }}, 100);
  this._ref_W = this.Engine.Input.MouseHandler.AddMouseHandler("wheel", {parameter:this.Engine, that:this, "function":function(a, b) {
    if (this.IsMouseOver) {
      var c = a.Delta;
      this._scrolling = !0;
      this.UpdateHandle(c);
      a.GoThrough = !1;
    }
  }}, 100);
};
BoxMenu.prototype.AddProcessInputFunction = function() {
  this._ref_PIF = this.Engine.AddProcessInputFunction({parameter:this.Engine, that:this, "function":function(a) {
    a = a.Input.Mouse;
    this.IsMouseOverHandle && a.Left.Down && (this._scrolling = !0);
    this.IsMouseOverTitle && a.Left.Down && (this._dragging = !0);
    a.Left.Up && (this._dragging = this._scrolling = !1);
  }}, 5);
};
BoxMenu.prototype.RemoveMouseHandler = function() {
  null != this._ref && (this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref), this._ref = null);
};
BoxMenu.prototype.RemoveProcessInputFunction = function() {
  null != this._ref_PIF && (this.Engine.RemoveProcessInputFunction(this._ref_PIF), this._ref_PIF = null);
};
BoxMenu.prototype.Draw = function(a) {
  a.save();
  a.fillStyle = this.TitleColor;
  a.fillVariousRoundedRect(this.X, this.Y, this.Width, this.TitleHeight, this.TitleRounding, this.TitleRounding, 0, 0);
  this.IsMouseOverTitle && (a.fillStyle = "rgba(0,0,0,0.2)", a.fillVariousRoundedRect(this.X, this.Y, this.Width - 10 - 2 * this.TitleHeight, this.TitleHeight, 5, 0, 0, 0));
  var b = this.TitleHeight / 5, c = this.X + this.Width - 5 - this.TitleHeight + b, d = this.Y + b, e = this.TitleHeight - 2 * b, f = this.TitleHeight - 2 * b;
  a.strokeStyle = "black";
  a.beginPath();
  a.moveTo(c, d);
  a.lineTo(c + e, d + f);
  a.moveTo(c, d + f);
  a.lineTo(c + e, d);
  a.stroke();
  a.closePath();
  this.IsMouseOverClose && (a.fillStyle = "rgba(0,0,0,0.2)", a.fillRect(c - b, d - b, e + 2 * b, f + 2 * b));
  c -= this.TitleHeight + 5;
  this._minimized ? a.strokeRect(c, d, e, f) : (a.beginPath(), a.moveTo(c, d + f - 0.15 * this.TitleHeight), a.lineTo(c + e, d + f - 0.15 * this.TitleHeight), a.stroke(), a.closePath());
  this.IsMouseOverMinimize && (a.fillStyle = "rgba(0,0,0,0.2)", a.fillRect(c - b, d - b, e + 2 * b, f + 2 * b));
  a.textAlign = "left";
  a.textBaseline = "top";
  a.fillStyle = "black";
  a.setFontHeight(this.TitleHeight - b);
  a.fillText(this.Title, this.X + 10, this.Y + b);
  if (!this._minimized) {
    for (a.fillStyle = this.Color, a.fillRect(this.X, this.Y + this.TitleHeight, this.Width, this.Height - this.TitleHeight), a.strokeStyle = "black", a.beginPath(), a.moveTo(this.X + this.Width - this.TitleHeight, this.Y + this.TitleHeight), a.lineTo(this.X + this.Width - this.TitleHeight, this.Y + this.Height), a.stroke(), a.closePath(), a.fillStyle = this.HandleColor, a.fillVariousRoundedRect(this.Handle.x, this.Handle.y, this.Handle.width, this.Handle.height, this.HandleRounding), this.IsMouseOverHandle && 
    (a.fillStyle = "rgba(0,0,0,0.2)", a.fillVariousRoundedRect(this.Handle.x, this.Handle.y, this.Handle.width, this.Handle.height, 4)), a.beginPath(), a.rect(this.X, this.Y + this.TitleHeight, this.Width - this.TitleHeight, this.DisplayHeight), a.clip(), b = 0; b < this.Items.length; b++) {
      this.Items[b].item.Draw(a);
    }
  }
  a.restore();
};
BoxMenu.prototype.GetItemsHeight = function() {
  for (var a = 0, b = 0; b < this.Items.length; b++) {
    a += this.Items[b].item.Height + this.Items[b].offset.y;
  }
  return a > this.DisplayHeight ? a : this.DisplayHeight;
};
BoxMenu.prototype.ProcessInput = function() {
  var a = this.GetArea();
  a.type = "vrrect";
  a.roundings = [this.TitleRounding, this.TitleRounding, 0, 0];
  a.background = !0;
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
  a = {x:this.X, y:this.Y, width:this.Width, height:this.TitleHeight, type:"vrrect", roundings:[this.TitleRounding, this.TitleRounding, 0, 0]};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverTitle");
  a = {x:this.X + this.Width - 5 - this.TitleHeight, y:this.Y, width:this.TitleHeight, height:this.TitleHeight, type:"rect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverClose");
  a = {x:this.X + this.Width - 10 - 2 * this.TitleHeight, y:this.Y, width:this.TitleHeight, height:this.TitleHeight, type:"rect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverMinimize");
  a = {x:this.X, y:this.Y + this.TitleHeight, width:this.Width - this.TitleHeight, height:this.DisplayHeight, type:"rect", background:!0};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverDisplay");
  a = {x:this.Handle.x, y:this.Handle.y, width:this.Handle.width, height:this.Handle.height, rounding:this.HandleRounding, type:"rrect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverHandle");
  if (!this._minimized) {
    for (var b = 0; this.IsMouseOverDisplay && b < this.Items.length; b++) {
      a = this.Items[b].item, a.ProcessInput();
    }
  }
};
BoxMenu.prototype.Update = function() {
  this._framesAfterDragging++;
  if (this._dragging || this._scrolling) {
    this._framesAfterDragging = 0;
  }
  var a = this.Engine.Input.Mouse.Position;
  this.UpdateBox(a.Delta);
  if (!this._minimized) {
    for (var b = 0; this.IsMouseOverDisplay && 1 < this._framesAfterDragging && b < this.Items.length; b++) {
      var c = this.Items[b].item;
      c.Update();
    }
    this.UpdateHandle(a.Delta);
  }
  this.AdjustItemsPosition();
  (this.IsMouseOverTitle || this.IsMouseOverHandle || this.IsMouseOverMinimize || this.IsMouseOverClose) && this.Engine.Input.Mouse.Cursor.Set("pointer");
};
BoxMenu.prototype.UpdateHandle = function(a) {
  var b = !1;
  if (0 >= arguments.length || !a) {
    a = {Y:0}, b = !0;
  }
  this.ItemsHeight = this.GetItemsHeight();
  this.Fac = this.DisplayHeight / this.ItemsHeight;
  this.Handle.height = this.DisplayHeight * this.Fac;
  if (b || this._scrolling && !isNaN(a.Y)) {
    this.Handle.y += a.Y, this.OffsetY -= a.Y / this.Fac, this.AdjustHandle();
  }
};
BoxMenu.prototype.UpdateBox = function(a) {
  if (this._dragging && !isNaN(a.Y)) {
    var b = this.Handle.x - this.X, c = this.Handle.y - this.Y;
    this.X += a.X;
    this.Handle.x += a.X;
    this.Y += a.Y;
    this.Handle.y += a.Y;
    a = this.Engine.Canvas;
    0 > this.X && (this.X = 0);
    this.X + this.Width > a.width && (this.X = a.width - this.Width);
    0 > this.Y && (this.Y = 0);
    this.Y + this.TitleHeight > a.height && (this.Y = a.height - this.TitleHeight);
    this.Handle.x = this.X + b;
    this.Handle.y = this.Y + c;
  }
};
BoxMenu.prototype.AdjustHandle = function() {
  this.Handle.y < this.Y + this.TitleHeight && (this.Handle.y = this.Y + this.TitleHeight);
  this.Handle.y > this.Y + this.TitleHeight + this.DisplayHeight - this.Handle.height && (this.Handle.y = this.Y + this.TitleHeight + this.DisplayHeight - this.Handle.height);
  0 < this.OffsetY && (this.OffsetY = 0);
  this.OffsetY < this.DisplayHeight - this.ItemsHeight && (this.OffsetY = this.DisplayHeight - this.ItemsHeight);
};
BoxMenu.prototype.AddItem = function(a, b, c) {
  1 >= arguments.length && (b = 0);
  2 >= arguments.length && (c = 0);
  a instanceof ABO && (this.Items.push({item:a, offset:{x:b, y:c}}), this.AdjustItemsPosition());
};
BoxMenu.prototype.DeleteItems = function(a) {
  "undefined" === typeof a && (a = function(a, b) {
  });
  for (var b = 0; b < this.Items.length; b++) {
    var c = this.Items[b].item;
    a(c, this.Engine);
  }
  this.Items = [];
};
BoxMenu.prototype.AdjustItemsPosition = function() {
  for (var a, b, c = 0, d = 0; d < this.Items.length; d++) {
    a = this.Items[d].item, b = this.Items[d].offset, a.X = this.X + b.x, a.Y = this.Y + b.y + this.TitleHeight + this.OffsetY + c, c += a.Height + b.y, this._minimized && (a.X += 2 * this.Engine.Canvas.width);
  }
};
BoxMenu.prototype.ClickOnMinimize = function() {
  this.Height = (this._minimized = !this._minimized) ? this.TitleHeight : this.TitleHeight + this.DisplayHeight;
};
BoxMenu.prototype.ClickOnClose = function() {
  console.log("Close Box");
  if (this.TrueClosing) {
    confirm("M{oe}chtest du dieses Men{ue} schlie{ss}en?".decodeURI()) && this.Close();
  } else {
    var a = this.Engine.Canvas;
    this.Closed ? this.MoveTo(this.PositionBeforeClosing.x, this.PositionBeforeClosing.y) : (this.PositionBeforeClosing.x = this.X, this.PositionBeforeClosing.y = this.Y, this.MoveTo(a.width - this.Width - 50, a.height - this.TitleHeight));
  }
};
BoxMenu.prototype.MoveTo = function(a, b) {
  var c = this.Handle.x - this.X, d = this.Handle.y - this.Y;
  (new MultiFlow([this, this], ["X", "Y"], [a, b], 500, {that:this, "function":function(a) {
    this.Closed = !this.Closed;
    this._minimized = !0;
    this.Y + this.TitleHeight < this.Engine.Canvas.height && (this._minimized = !1);
  }, parameter:!0}, {that:this, "function":function(a) {
    this.Handle.x = this.X + c;
    this.Handle.y = this.Y + d;
  }, parameter:!0})).Start();
};
BoxMenu.prototype.Close = function() {
  this.RemoveMouseHandler();
  this.RemoveProcessInputFunction();
  this._minimized = this.TrulyClosed = this.Closed = !0;
};
function Button(a, b, c, d) {
  ABO.call(this);
  this.Type = "Button";
  this.X = a || 0;
  this.Y = b || 0;
  this.Width = c || 0;
  this.Height = d || 0;
  this._inflated;
  this.HoverText = "";
  this.HoverImage = !1;
  this.HoverFramesLimit = 25;
  this.HoverPosition = {x:0, y:0};
  this.HoverFontHeight = Button.prototype.DefaultHoverFontHeight;
  this.HoverFontColor = Button.prototype.DefaultHoverFontColor;
  this.OldState = -1;
  this.State = 0;
  this.CoolDown = 50;
  this.GonnaRefresh = !0;
  this.TriggerCallbackObject = {that:this, "function":function() {
  }, parameter:!1};
  this.IsMouseOver = !1;
  this._mouseOverFrames = 0;
  this._labelWidth = [0, 0, 0];
  this._textStart = [0, 0, 0];
  this.Label = ["", "", ""];
  this.FontHeight = [14, 14, 14];
  this.FontType = ["sans-serif", "sans-serif", "sans-serif"];
  this.DisplayType = ["color", "color", "color"];
  this.Rounding = Button.prototype.DefaultRounding;
  this.ColorCode = [];
  this.ColorCode[0] = Button.prototype.DefaultColorCode[0];
  this.ColorCode[1] = Button.prototype.DefaultColorCode[1];
  this.ColorCode[2] = Button.prototype.DefaultColorCode[2];
  this.Codename = [!1, !1, !1];
  this.HoverShadeColor = Button.prototype.DefaultHoverShadeColor;
  this.Padding = 0;
  this.TextAlign = "center";
  this.SpriteLoaded = !1;
  this.Images = [];
  this.ButtonLayout = !1;
  this.CSSMouseCursor = ["pointer", "default", "wait"];
  this.FontColor = [];
  this.FontColor[0] = Button.prototype.DefaultFontColor[0];
  this.FontColor[1] = Button.prototype.DefaultFontColor[1];
  this.FontColor[2] = Button.prototype.DefaultFontColor[2];
  this.Active = !0;
  this.ActivationFunctionObject = {"function":function(a) {
    return this.Active;
  }, that:this, parameter:{}};
  this._ref_reghov = this._ref = null;
  this._counter = 0;
  this._counterBorderColor = Button.prototype.DefaultCounterBorderColor;
  this._counterBackgroundColor = Button.prototype.DefaultCounterBackgroundColor;
  this._counterFontColor = Button.prototype.DefaultCounterFontColor;
  this._urgency = !1;
  this._urgencyBorderColor = Button.prototype.DefaultUrgencyBorderColor;
  this._urgencyBackgroundColor = Button.prototype.DefaultUrgencyBackgroundColor;
  this._urgencyFontColor = Button.prototype.DefaultUrgencyFontColor;
  for (var e = 0; e < arguments.length; e++) {
    "Object" === this._getClass(arguments[e]) && this._handleObject(arguments[e]);
  }
  this.Initialize();
}
Button.prototype = Object.create(ABO.prototype);
Button.prototype.constructor = Button;
Button.prototype.DefaultMask = null;
Button.prototype.DefaultRounding = 4;
Button.prototype.DefaultHoverRowSpace = 3;
Button.prototype.DefaultHoverPadding = 4;
Button.prototype.DefaultHoverFontHeight = 14;
Button.prototype.DefaultFontColor = ["black", "black", "black"];
Button.prototype.DefaultHoverBackgroundColor = "#eee";
Button.prototype.DefaultHoverFontColor = "black";
Button.prototype.DefaultColorCode = ["#cfcfcf", "#bdbdbd", "#666"];
Button.prototype.DefaultHoverShadeColor = "rgba(0,0,0,0.2)";
Button.prototype.DefaultCounterBorderColor = ["red", "red", "red"];
Button.prototype.DefaultCounterBackgroundColor = ["white", "white", "white"];
Button.prototype.DefaultCounterFontColor = ["red", "red", "red"];
Button.prototype.DefaultUrgencyBorderColor = ["white", "white", "white"];
Button.prototype.DefaultUrgencyBackgroundColor = ["red", "red", "red"];
Button.prototype.DefaultUrgencyFontColor = ["white", "white", "white"];
Button.prototype._handleObject = function(a) {
  if ("undefined" !== typeof a) {
    for (var b in a) {
      if ("undefined" != typeof this[b]) {
        var c = this._getClass(this[b]);
        "Array" === c ? (c = this._getClass(a[b]), "Array" === c ? (this[b][0] = a[b][0], this[b][1] = a[b][1] || a[b][0], this[b][2] = a[b][2] || a[b][0]) : this.Set(b, a[b])) : this[b] = a[b];
      }
    }
  }
};
Button.prototype._getClass = function(a) {
  if ("undefined" === typeof a) {
    return "undefined";
  }
  a = a.constructor.toString();
  var b = a.indexOf("function "), c = a.indexOf("(");
  0 == b && (a = a.substr(9, c - 9));
  return a;
};
Button.prototype.Initialize = function() {
  "center" === this.X && (this.X = (this.Engine.Canvas.width - this.Width) / 2);
  this._inflated = {width:this.Width, height:this.Height};
  this.HoverPosition = {x:this.X + this.Width + 5, y:this.Y - 5};
  this.TriggerCallbackObject && this.AddMouseHandler(5);
  this.Center = {X:this.X + this.Width / 2, Y:this.Y + this.Height / 2};
  this.GetLabelWidth(0);
  null != Button.prototype.DefaultMask && this.ApplyDefaultMask();
  if ("image" === this.DisplayType[0] || "both" === this.DisplayType[0]) {
    this.Images[0] = this.Engine.MediaManager.GetImage(this.Codename[0]);
  }
  if ("image" === this.DisplayType[1] || "both" === this.DisplayType[1]) {
    this.Images[1] = this.Engine.MediaManager.GetImage(this.Codename[1]);
  }
  if ("image" === this.DisplayType[2] || "both" === this.DisplayType[2]) {
    this.Images[2] = this.Engine.MediaManager.GetImage(this.Codename[2]);
  }
  this.SetPadding(this.Padding);
  0 < this.HoverText.length && this.SetHoverText(this.HoverText);
};
Button.prototype.AddMouseHandler = function(a, b) {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.Active && this.IsMouseOver && (a.GoThrough = !1, this.Trigger());
  }}, a, b);
};
Button.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref);
};
Button.prototype._registerHoverImageDrawing = function() {
  null == this._ref_reghov && (this._ref_reghov = this.Engine.AddForegroundDrawFunctionObject({that:this, "function":function(a) {
    this.IsMouseOver && this._mouseOverFrames >= this.HoverFramesLimit && this.HoverImage && (this._findHoverPosition(), a.drawImage(this.HoverImage, this.HoverPosition.x, this.HoverPosition.y));
  }, parameter:this.Engine.Context}));
};
Button.prototype._deregisterHoverImageDrawing = function() {
  null != this._ref_reghov && (this.Engine.RemoveForegroundDrawFunctionObject(this._ref_reghov), this._ref_reghov = null);
};
Button.prototype.ProcessInput = function() {
  var a = this.GetArea(0, this.Rounding);
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
};
Button.prototype.Update = function() {
  var a = this.ActivationFunctionObject;
  if (this.Active = a["function"].call(a.that, a.parameter)) {
    this.HoverImage && this._registerHoverImageDrawing();
    a = this.Engine.Input.Mouse;
    this.IsMouseOver ? this._mouseOverFrames++ : this._mouseOverFrames = 0;
    a.Left.Down && this.IsMouseOver && 0 == this.State && (this.State = 1);
    a.Left.Up && 1 == this.State && (this.State = 0);
    if (this.IsMouseOver) {
      switch(this.State) {
        case 0:
          this.Engine.Input.Mouse.Cursor.Set(this.CSSMouseCursor[this.State]);
          break;
        case 1:
          this.Engine.Input.Mouse.Cursor.Set(this.CSSMouseCursor[this.State]);
          break;
        case 2:
          this.Engine.Input.Mouse.Cursor.Set(this.CSSMouseCursor[this.State]);
      }
    }
    this.State != this.OldState && this.GetLabelWidth();
    this.OldState = this.State;
  } else {
    this._mouseOverFrames = 0;
  }
};
Button.prototype.Draw = function(a) {
  a.save();
  var b = this.Engine.Camera.SelectedCamera;
  a.globalAlpha = this.Active ? 1 : 0.5;
  if ("color" == this.DisplayType[this.State] || "both" == this.DisplayType[this.State]) {
    a.fillStyle = this.ColorCode[this.State], a.fillVariousRoundedRect(this.X - b.X, this.Y - b.Y, this.Width, this.Height, this.Rounding);
  }
  ("image" == this.DisplayType[this.State] || "both" == this.DisplayType[this.State]) && this.Images[this.State] && a.drawRoundedImage(this.Images[this.State], this.X - b.X, this.Y - b.Y, this.Width, this.Height, this.Rounding);
  this.IsMouseOver && this.Active && (a.fillStyle = this.HoverShadeColor, a.fillVariousRoundedRect(this.X - b.X, this.Y - b.Y, this.Width, this.Height, this.Rounding));
  this.ButtonLayout && a.drawRoundedImage(this.ButtonLayout, this.X - b.X, this.Y - b.Y, this.Width, this.Height, this.Rounding);
  a.textBaseline = "middle";
  a.textAlign = "left";
  a.font = this.FontHeight[this.State] + "px " + this.FontType[this.State];
  if ("center" === this.TextAlign || "middle" === this.TextAlign) {
    var c = this.X + this.Width / 2 - this._labelWidth[this.State] / 2 - b.X;
    var d = this.Y + this.Height / 2 - b.Y;
  }
  "left" === this.TextAlign && (c = this.X + this.Padding - b.X, d = this.Y + this.Height / 2 - b.Y);
  a.fillStyle = this.FontColor[this.State];
  a.fillText(this.Label[this.State], c, d);
  if (0 < this._counter && !this._urgency) {
    b = 0.15 * this.Height;
    c = this.X + this.Width - (b + 0.05 * this.Height);
    d = this.Y + this.Height - (b + 0.05 * this.Height);
    var e = 1.5;
    9 < this._counter && (e = 1.1);
    a.fillStyle = this._counterBackgroundColor[this.State];
    a.fillCircle(c, d, b, !0);
    a.lineWidth = 2;
    a.strokeStyle = this._counterBorderColor[this.State];
    a.strokeCircle(c, d, b, !0);
    a.fillStyle = this._counterFontColor[this.State];
    a.setFontHeight(b * e);
    a.font = "bold " + a.font;
    a.fillSpinnedText(c, d, this._counter.toString());
  }
  this._urgency && (b = 0.15 * this.Height, c = this.X + this.Width - (b + 0.05 * this.Height), d = this.Y + this.Height - (b + 0.05 * this.Height), e = 1.5, a.fillStyle = this._urgencyBackgroundColor[this.State], a.fillCircle(c, d, b, !0), a.lineWidth = 2, a.strokeStyle = this._urgencyBorderColor[this.State], a.strokeCircle(c, d, b, !0), a.fillStyle = this._urgencyFontColor[this.State], a.setFontHeight(b * e), a.font = "bold " + a.font, a.fillSpinnedText(c, d, "!"));
  a.restore();
};
Button.prototype.Set = function(a, b, c, d) {
  3 > arguments.length && (c = b);
  4 > arguments.length && (d = b);
  this[a] = [];
  this[a][0] = b;
  this[a][1] = c;
  this[a][2] = d;
  return this[a];
};
Button.prototype.SetCoolDown = function(a) {
  this.CoolDown = a;
};
Button.prototype.Trigger = function(a) {
  a && (this.State = 1);
  1 == this.State && this.TriggerCallbackObject && (this._mouseOverFrames = 0, a = this.TriggerCallbackObject, a.that = "self" === a.that || "undefined" === typeof a.that ? this : a.that, a["function"].call(a.that, a.parameter, this), this.IsMouseOver = !1, this.State = 2, this.GonnaRefresh && 0 <= this.CoolDown && setTimeout(function(a) {
    a.State = 0;
  }, this.CoolDown, this));
};
Button.prototype.GetLabelWidth = function(a) {
  a = 0 >= arguments.length ? this.State : a;
  var b = this.Engine.Context;
  b.save();
  b.textBaseline = "middle";
  b.font = this.FontHeight[a] + "px " + this.FontType[a];
  this._labelWidth[a] = b.measureText(this.Label[a]).width;
  b.restore();
};
Button.prototype.SetTriggerCallbackObject = function(a, b, c) {
  null != this._ref && this.RemoveMouseHandler();
  this.TriggerCallbackObject = a;
  this.AddMouseHandler(b || 5, c);
};
Button.prototype.SetActiveFunctionObject = function(a) {
  "self" === a.that && (a.that = this);
  this.ActivationFunctionObject = a;
};
Button.prototype.GetMask = function() {
  return {State0:{DisplayType:this.DisplayType[0], ColorCode:this.ColorCode[0], Codename:this.Codename[0], Label:this.Label[0], Cursor:this.CSSMouseCursor[0], TextColor:this.FontColor[0], FontHeight:this.FontHeight[0], FontType:this.FontType[0]}, State1:{DisplayType:this.DisplayType[1], ColorCode:this.ColorCode[1], Codename:this.Codename[1], Label:this.Label[1], Cursor:this.CSSMouseCursor[1], TextColor:this.FontColor[1], FontHeight:this.FontHeight[1], FontType:this.FontType[1]}, State2:{DisplayType:this.DisplayType[2], 
  ColorCode:this.ColorCode[2], Codename:this.Codename[2], Label:this.Label[2], Cursor:this.CSSMouseCursor[2], TextColor:this.FontColor[2], FontHeight:this.FontHeight[2], FontType:this.FontType[2]}, SingleValues:{Rounding:this.Rounding, CoolDown:this.CoolDown, HoverFramesLimit:this.HoverFramesLimit, HoverFontHeight:this.HoverFontHeight, Padding:this.Padding}};
};
Button.prototype.SetMask = function(a) {
  this.SetAppearance(a.State0, a.State1, a.State2, a.SingleValues);
};
Button.prototype.SaveMask = function() {
  Button.prototype.DefaultMask = this.GetMask();
};
Button.prototype.ApplyDefaultMask = function() {
  if (null != Button.prototype.DefaultMask) {
    this.SetAppearance(Button.prototype.DefaultMask.State0, Button.prototype.DefaultMask.State1, Button.prototype.DefaultMask.State2, Button.prototype.DefaultMask.SingleValues);
  } else {
    return !1;
  }
};
Button.prototype.SetAppearance = function(a, b, c, d) {
  3 > arguments.length && (c = a);
  2 > arguments.length && (b = a);
  a.DisplayType && (this.DisplayType[0] = a.DisplayType);
  a.ColorCode && (this.ColorCode[0] = a.ColorCode);
  a.Codename && (this.Codename[0] = a.Codename, this.LoadImage(a.Codename, 0));
  a.Label && (this.Label[0] = a.Label);
  a.Cursor && (this.CSSMouseCursor[0] = a.Cursor);
  a.TextColor && (this.FontColor[0] = a.FontColor);
  a.FontHeight && (this.FontHeight[0] = a.FontHeight);
  a.FontType && (this.FontType[0] = a.FontType);
  b.DisplayType && (this.DisplayType[1] = b.DisplayType);
  b.ColorCode && (this.ColorCode[1] = b.ColorCode);
  b.Codename && (this.Codename[1] = b.Codename, this.LoadImage(b.Codename, 1));
  b.Label && (this.Label[1] = b.Label);
  b.Cursor && (this.CSSMouseCursor[1] = b.Cursor);
  b.TextColor && (this.FontColor[1] = b.FontColor);
  b.FontHeight && (this.FontHeight[1] = b.FontHeight);
  b.FontType && (this.FontType[1] = b.FontType);
  c.DisplayType && (this.DisplayType[2] = c.DisplayType);
  c.ColorCode && (this.ColorCode[2] = c.ColorCode);
  c.Codename && (this.Codename[2] = c.Codename, this.LoadImage(c.Codename, 2));
  c.Label && (this.Label[2] = c.Label);
  c.Cursor && (this.CSSMouseCursor[2] = c.Cursor);
  c.TextColor && (this.FontColor[2] = c.FontColor);
  c.FontHeight && (this.FontHeight[2] = c.FontHeight);
  c.FontType && (this.FontType[2] = c.FontType);
  "undefined" !== typeof d && ("undefined" !== typeof d.Rounding && (this.Rounding = d.Rounding), "undefined" !== typeof d.CoolDown && (this.CoolDown = d.CoolDown), "undefined" !== typeof d.HoverFramesLimit && (this.HoverFramesLimit = d.HoverFramesLimit), "undefined" !== typeof d.HoverFontHeight && (this.HoverFontHeight = d.HoverFontHeight), "undefined" !== typeof d.Padding && (this.Padding = d.Padding));
  this.SetPadding(this.Padding);
};
Button.prototype.SetImagesThroughSprite = function(a, b) {
  1 >= arguments.length && (b = !0);
  var c = 0, d = 0, e = this.Width, f = this.Height, g = this.Engine.MediaManager.GetImage(a);
  if (g) {
    this.Images = [];
    var h = document.createElement("CANVAS");
    h.width = e;
    h.height = f;
    for (var k = h.getContext("2d"), m = 0; 3 > m; m++) {
      k.clearRect(0, 0, e, f);
      k.drawImage(g, c, d, e, f, 0, 0, e, f);
      var l = h.toDataURL();
      this.Images.push(document.createElement("IMG"));
      this.Images[m].src = l;
      b ? d += f : c += e;
    }
    this.DisplayType = ["image", "image", "image"];
    this.SpriteLoaded = !0;
  }
};
Button.prototype.SetPadding = function(a, b) {
  0 >= arguments.length && (a = 0);
  1 >= arguments.length && (b = !1);
  this._labelWidth = [0, 0, 0];
  this._textStart = [0, 0, 0];
  var c = this.Engine.Context;
  c.save();
  for (var d = 0, e, f = 0; 3 > f; f++) {
    c.setFontHeight(this.FontHeight[f]), this._labelWidth[f] = c.measureText(this.Label[f]).width, e = 2 * this.Padding + this._labelWidth[f], d < e && (d = e);
  }
  b && (this.Width = d);
};
Button.prototype.LoadImage = function(a, b) {
  if ("undefined" === typeof a) {
    return !1;
  }
  "undefined" !== typeof b ? this.Images[b] = this.Engine.MediaManager.GetImage(a) : (this.Images[0] = this.Engine.MediaManager.GetImage(a), this.Images[1] = this.Engine.MediaManager.GetImage(a), this.Images[2] = this.Engine.MediaManager.GetImage(a));
};
Button.prototype.AddTextAsImage = function(a, b) {
  var c = this.Width, d = this.Height;
  "string" === typeof a && (a = [a]);
  for (var e = this.Engine.Context, f = [], g, h = 0; h < a.length; h++) {
    g = a[h].split(" ");
    for (var k = 0; k < g.length; k++) {
      f.push(g[k]);
    }
    h < a.length - 1 && f.push("\\n");
  }
  h = d + 1;
  for (g = b + 1 || 25; h > d && 0 < g;) {
    g--;
    e.setFontHeight(g);
    k = e.measureText(" ").width;
    var m = [];
    for (h = 0; h < f.length; h++) {
      "\\n" !== f[h] ? m.push(e.measureText(f[h]).width) : m.push(0);
    }
    var l = [], p = 0;
    l.push("");
    for (h = 0; h < f.length; h++) {
      "\\n" === f[h] ? (h++, l.push(f[h] + " "), p = 0 + m[h] + k) : p + m[h] + k < c - 10 ? (l[l.length - 1] += f[h] + " ", p += m[h] + k) : (l[l.length - 1] = l[l.length - 1].substr(0, l[l.length - 1].length - 1), l.push(f[h] + " "), p = 0 + m[h] + k);
    }
    l[l.length - 1] = l[l.length - 1].substr(0, l[l.length - 1].length - 1);
    h = 10 + g * l.length + 3 * l.length - 1;
  }
  h = 5 + (d - h) / 2;
  e = document.createElement("CANVAS");
  e.width = c;
  e.height = d;
  c = e.getContext("2d");
  c.setFontHeight(g);
  c.textAlign = "left";
  c.textBaseline = "top";
  c.fillStyle = this.FontColor[0];
  c.strokeStyle = "white";
  d = h;
  for (h = 0; h < l.length; h++) {
    c.fillText(l[h], 5, d), d += g + 3;
  }
  l = e.toDataURL();
  c = document.createElement("IMG");
  c.src = l;
  "color" === this.DisplayType[0] && (this.DisplayType[0] = "both");
  "color" === this.DisplayType[1] && (this.DisplayType[1] = "both");
  "color" === this.DisplayType[2] && (this.DisplayType[2] = "both");
  this.Label = [" ", " ", " "];
  this.Images = [c, c, c];
};
Button.prototype.SetHoverText = function(a) {
  "string" === typeof a && (a = [a]);
  this.HoverText = a;
  this._createHoverImage();
};
Button.prototype._createHoverImage = function(a) {
  var b = this.HoverText, c = this.HoverFontColor;
  a = a || this.HoverFontHeight;
  for (var d = [], e, f = 0; f < b.length; f++) {
    e = b[f].split(" ");
    for (var g = 0; g < e.length; g++) {
      d.push(e[g]);
    }
    f < b.length - 1 && d.push("\\n");
  }
  var h = this.Engine.Canvas.width / 3;
  b = Button.prototype.DefaultHoverPadding;
  e = Button.prototype.DefaultHoverRowSpace;
  g = this.Engine.Context;
  g.save();
  g.setFontHeight(a);
  var k = g.measureText(" ").width, m = [];
  for (f = 0; f < d.length; f++) {
    "\\n" !== d[f] ? m.push(g.measureText(d[f]).width) : m.push(0);
  }
  var l = [], p = [];
  l.push("");
  p.push(0);
  for (f = 0; f < d.length; f++) {
    "\\n" === d[f] ? (f++, l.push(d[f] + " "), p.push(0 + m[f] + k)) : p[l.length - 1] + m[f] + k < h - 2 * b ? (l[l.length - 1] += d[f] + " ", p[l.length - 1] += m[f] + k) : (l[l.length - 1] = l[l.length - 1].substr(0, l[l.length - 1].length - 1), p[l.length - 1] -= k, l.push(d[f] + " "), p.push(m[f] + k));
  }
  l[l.length - 1] = l[l.length - 1].substr(0, l[l.length - 1].length - 1);
  for (f = d = 0; f < l.length; f++) {
    p[f] > d && (d = p[f]);
  }
  h = Math.ceil(d + 2 * b);
  f = 2 * b + a * l.length + e * l.length - 1;
  d = document.createElement("CANVAS");
  d.width = h;
  d.height = f;
  g.restore();
  g = d.getContext("2d");
  g.setFontHeight(a);
  g.strokeStyle = "black";
  g.fillStyle = this.DefaultHoverBackgroundColor;
  g.fillRect(0, 0, h, f);
  g.strokeRect(0, 0, h, f);
  g.textAlign = "left";
  g.textBaseline = "top";
  g.fillStyle = c;
  c = b;
  for (f = 0; f < l.length; f++) {
    g.fillText(l[f], b, c), c += a + e;
  }
  c = d.toDataURL();
  a = document.createElement("IMG");
  a.src = c;
  this.HoverImage = a;
};
Button.prototype._findHoverPosition = function() {
  var a = this.Engine.Canvas;
  var b = a.width / 2, c = a.height / 2;
  var d = this.X;
  var e = this.Y;
  var f = this.X + this.Width;
  var g = this.Y;
  var h = this.X + this.Width;
  var k = this.Y + this.Height;
  a = this.X;
  var m = this.Y + this.Height;
  b = (d + f + h + a) / 4 - b;
  c = (e + g + k + m) / 4 - c;
  var l = this.HoverImage;
  0 < b && 0 < c && (this.HoverPosition.x = d - l.width - 5, this.HoverPosition.y = e - l.height - 5);
  0 < b && 0 > c && (this.HoverPosition.x = a - l.width - 5, this.HoverPosition.y = m + 5);
  0 >= b && 0 <= c && (this.HoverPosition.x = f + 5, this.HoverPosition.y = g - l.height - 5);
  0 >= b && 0 >= c && (this.HoverPosition.x = h + 5, this.HoverPosition.y = k + 5);
};
Button.prototype.SetHoverFramesLimit = function(a) {
  this.HoverFramesLimit = a;
};
Button.prototype.Inflate = function() {
  this.Width = this._inflated.width;
  this.Height = this._inflated.height;
};
Button.prototype.Deflate = function() {
  this._inflated.width = this.Width;
  this._inflated.height = this.Height;
  this.Height = this.Width = 0;
};
Button.prototype.AddInnerButtonLayout = function(a, b) {
  var c = this.Rounding;
  "undefined" === typeof c && (c = 0);
  var d = this.Width, e = this.Height;
  "undefined" === typeof a && (a = Math.round(e / 4));
  if ("undefined" === typeof b || 0 >= b.length) {
    b = [{stop:0, color:"rgba(0,0,0,0.5)"}, {stop:0.5, color:"rgba(0,0,0,0.25)"}, {stop:1, color:"rgba(0,0,0,0)"}];
  }
  var f = a + c, g = a + c, h = a + c, k = d - 2 * (a + c), m = a, l = h + k, p = a + c, n = a + c, t = a + c, q = a, u = e - 2 * (a + c), r = a + c, v = 0 + m, A = d - 2 * (a + c), H = e - 2 * m, G = d - a, x = a + c, E = a, I = e - 2 * (a + c), y = e - a - c, z = a + c, w = a + c, B = a + c, F = e - a, J = d - 2 * (a + c), K = a, C = B + J, D = e - a - c, N = a + c, O = a + c, L = m / g;
  b = b.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var M = document.createElement("CANVAS");
  M.width = d;
  M.height = e;
  d = M.getContext("2d");
  d.fillStyle = b[b.length - 1].color;
  d.fillRect(r, v, A, H);
  d.fillRect(0 + q, t, a, a);
  d.fillRect(r + A, t, a, a);
  v = d.createLinearGradient(h, 0, h, m);
  for (r = 0; r < b.length; r++) {
    v.addColorStop(b[r].stop, b[r].color);
  }
  d.fillStyle = v;
  d.fillRect(h, 0, k, m);
  v = d.createLinearGradient(B, F + K, B, F);
  for (r = 0; r < b.length; r++) {
    v.addColorStop(b[r].stop, b[r].color);
  }
  d.fillStyle = v;
  d.fillRect(B, F, J, K);
  v = d.createLinearGradient(0, t, 0 + q, t);
  for (r = 0; r < b.length; r++) {
    v.addColorStop(b[r].stop, b[r].color);
  }
  d.fillStyle = v;
  d.fillRect(0, t, q, u);
  v = d.createLinearGradient(G + E, x, G, x);
  for (r = 0; r < b.length; r++) {
    v.addColorStop(b[r].stop, b[r].color);
  }
  d.fillStyle = v;
  d.fillRect(G, x, E, I);
  h = d.createRadialGradient(0 + f, 0 + g, a + c, 0 + f, 0 + g, 0);
  for (r = 0; r < b.length; r++) {
    h.addColorStop(b[r].stop * L, b[r].color);
  }
  d.fillStyle = h;
  d.beginPath();
  d.moveTo(0 + f, 0 + g);
  d.lineTo(0, 0 + g);
  d.arcTo(0, 0, 0 + f, 0, f);
  d.closePath();
  d.fill();
  h = d.createRadialGradient(l, 0 + n, a + c, l, 0 + n, 0);
  for (r = 0; r < b.length; r++) {
    h.addColorStop(b[r].stop * L, b[r].color);
  }
  d.fillStyle = h;
  d.beginPath();
  d.moveTo(l, 0 + n);
  d.lineTo(l + p, 0 + n);
  d.arcTo(l + p, 0, l, 0, p);
  d.closePath();
  d.fill();
  h = d.createRadialGradient(0 + z, y, a + c, 0 + z, y, 0);
  for (r = 0; r < b.length; r++) {
    h.addColorStop(b[r].stop * L, b[r].color);
  }
  d.fillStyle = h;
  d.beginPath();
  d.moveTo(0 + z, y);
  d.lineTo(0, y);
  d.arcTo(0, y + w, 0 + z, y + w, z);
  d.closePath();
  d.fill();
  h = d.createRadialGradient(C, D, a + c, C, D, 0);
  for (r = 0; r < b.length; r++) {
    h.addColorStop(b[r].stop * L, b[r].color);
  }
  d.fillStyle = h;
  d.beginPath();
  d.moveTo(C, D);
  d.lineTo(C + N, D);
  d.arcTo(C + N, D + O, C, D + O, N);
  d.closePath();
  d.fill();
  c = M.toDataURL();
  f = document.createElement("IMG");
  f.src = c;
  this.ButtonLayout = f;
};
Button.prototype.AddButtonEffectOnlyLightning = function(a, b) {
  isNaN(a) && (a = Math.floor(this.Height / 8));
  if ("undefined" === typeof b || 0 >= b.length) {
    b = [{stop:0, color:"rgba(255,255,255,0.5)"}, {stop:0.5, color:"rgba(255,255,255,0.25)"}, {stop:1, color:"rgba(255,255,255,0)"}];
  }
  b = b.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var c = this.Width, d = this.Height, e = this.Rounding, f = a + e, g = a + e, h = a + e, k = c - (a + e), m = a, l = a + e, p = a, n = d - (a + e), t = m / g, q = document.createElement("CANVAS");
  q.width = c;
  q.height = d;
  c = q.getContext("2d");
  var u = c.createLinearGradient(h, 0, h, m);
  for (d = 0; d < b.length; d++) {
    u.addColorStop(b[d].stop, b[d].color);
  }
  c.fillStyle = u;
  c.fillRect(h, 0, k, m);
  u = c.createLinearGradient(0, l, 0 + p, l);
  for (d = 0; d < b.length; d++) {
    u.addColorStop(b[d].stop, b[d].color);
  }
  c.fillStyle = u;
  c.fillRect(0, l, p, n);
  e = c.createRadialGradient(0 + f, 0 + g, a + e, 0 + f, 0 + g, 0);
  for (d = 0; d < b.length; d++) {
    e.addColorStop(b[d].stop * t, b[d].color);
  }
  e.addColorStop(b[b.length - 1].stop, b[b.length - 1].color);
  c.fillStyle = e;
  c.fillRect(0, 0, f, g);
  f = q.toDataURL();
  g = document.createElement("IMG");
  g.src = f;
  this.ButtonLayout = g;
};
Button.prototype.AddButtonEffect = function(a, b) {
  isNaN(a) && (a = Math.floor(this.Height / 8));
  if ("undefined" === typeof b || 0 >= b.length) {
    b = [{stop:0, color:"rgba(255,255,255,0.5)"}, {stop:0.5, color:"rgba(255,255,255,0.25)"}, {stop:1, color:"rgba(255,255,255,0)"}];
  }
  b = b.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var c = [{stop:0, color:"rgba(0,0,0,0.5)"}, {stop:0.5, color:"rgba(0,0,0,0.25)"}, {stop:1, color:"rgba(0,0,0,0)"}];
  c = c.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var d = this.Width, e = this.Height, f = this.Rounding, g = a + f, h = a + f, k = a + f, m = d - (a + f), l = a, p = a + f, n = a, t = e - (a + f), q = e - a, u = d - (a + f), r = a, v = d - a, A = a, H = e - (a + f), G = 0 + u, x = e - a - f, E = a + f, I = a + f, y = l / h, z = document.createElement("CANVAS");
  z.width = d;
  z.height = e;
  d = z.getContext("2d");
  var w = d.createLinearGradient(k, 0, k, l);
  for (e = 0; e < b.length; e++) {
    w.addColorStop(b[e].stop, b[e].color);
  }
  d.fillStyle = w;
  d.fillRect(k, 0, m, l);
  w = d.createLinearGradient(0, p, 0 + n, p);
  for (e = 0; e < b.length; e++) {
    w.addColorStop(b[e].stop, b[e].color);
  }
  d.fillStyle = w;
  d.fillRect(0, p, n, t);
  k = d.createRadialGradient(0 + g, 0 + h, a + f, 0 + g, 0 + h, 0);
  for (e = 0; e < b.length; e++) {
    k.addColorStop(b[e].stop * y, b[e].color);
  }
  k.addColorStop(b[b.length - 1].stop, b[b.length - 1].color);
  d.fillStyle = k;
  d.fillRect(0, 0, g, h);
  d.fillStyle = "black";
  w = d.createLinearGradient(v + A, 0, v, 0);
  for (e = 0; e < c.length; e++) {
    w.addColorStop(c[e].stop, c[e].color);
  }
  d.fillStyle = w;
  d.fillRect(v, 0, A, H);
  w = d.createLinearGradient(0, q + r, 0, q);
  for (e = 0; e < c.length; e++) {
    w.addColorStop(c[e].stop, c[e].color);
  }
  d.fillStyle = w;
  d.fillRect(0, q, u, r);
  k = d.createRadialGradient(G, x, a + f, G, x, 0);
  for (e = 0; e < c.length; e++) {
    k.addColorStop(c[e].stop * y, c[e].color);
  }
  k.addColorStop(c[c.length - 1].stop, c[c.length - 1].color);
  d.fillStyle = k;
  d.fillRect(G, x, E, I);
  c = z.toDataURL();
  f = document.createElement("IMG");
  f.src = c;
  this.ButtonLayout = f;
};
Button.prototype.SetCounter = function(a) {
  if (!isNaN(a) || 0 <= a) {
    this._counter = a;
  }
};
Button.prototype.GetCounter = function() {
  return this._counter;
};
Button.prototype.IncreaseCounter = function() {
  this._counter++;
};
Button.prototype.DecreaseCounter = function() {
  this._counter && this._counter--;
};
Button.prototype.SetUrgency = function(a) {
  this._urgency = "undefined" === typeof a ? !1 : a;
};
Button.prototype.Circlize = function() {
  this.Rounding = Math.min(this.Width, this.Height) / 2;
};
function DefaultCamera() {
  EngineObject.call(this);
  this.Type = "Camera";
  this.Name = "default";
}
DefaultCamera.prototype = Object.create(EngineObject.prototype);
DefaultCamera.prototype.constructor = DefaultCamera;
function ColorPicker(a, b, c, d) {
  ABO.call(this);
  this.ColorPickedCallbackObject = d;
  this.X = a;
  this.Y = b;
  this.Height = this.Width = c;
  this.PickedColor = this.BasicColor = "black";
  this.IsMouseOverPreview = this.IsMouseOverStrip = this.IsMouseOverBox = this.IsMouseOverPicker = !1;
  this.Padding = 10;
  this.Box = {x:a + this.Padding, y:b + this.Padding, width:0.7 * this.Height, height:0.7 * this.Height - this.Padding};
  this.Strip = {x:this.Box.x + this.Box.width + this.Padding, y:b + this.Padding, width:c - this.Box.width - 3 * this.Padding, height:this.Height - 2 * this.Padding};
  this.Preview = {x:a + this.Padding, y:b + this.Padding + 0.7 * this.Height, width:this.Box.width, height:0.3 * this.Height - 2 * this.Padding};
  this.BlackGradient = this.WhiteGradient = this.StripGradient = !1;
  this.Opacity = 0;
  this._ref;
  this.Initialize();
}
ColorPicker.prototype = Object.create(ABO.prototype);
ColorPicker.prototype.constructor = ColorPicker;
ColorPicker.prototype.Initialize = function() {
  var a = this.Engine.Context;
  this.StripGradient = a.createLinearGradient(this.Strip.x, this.Strip.y, this.Strip.x, this.Strip.y + this.Strip.height - 1);
  this.StripGradient.addColorStop(0, "rgba(255, 0, 0, 1)");
  this.StripGradient.addColorStop(0.17, "rgba(255, 255, 0, 1)");
  this.StripGradient.addColorStop(0.34, "rgba(0, 255, 0, 1)");
  this.StripGradient.addColorStop(0.51, "rgba(0, 255, 255, 1)");
  this.StripGradient.addColorStop(0.68, "rgba(0, 0, 255, 1)");
  this.StripGradient.addColorStop(0.85, "rgba(255, 0, 255, 1)");
  this.StripGradient.addColorStop(1, "rgba(255, 0, 0, 1)");
  this.WhiteGradient = a.createLinearGradient(this.Box.x + 1, this.Box.y, this.Box.x + this.Box.width - 2, this.Box.y);
  this.WhiteGradient.addColorStop(0, "rgba(255,255,255,1)");
  this.WhiteGradient.addColorStop(1, "rgba(255,255,255,0)");
  this.BlackGradient = a.createLinearGradient(this.Box.x, this.Box.y + 1, this.Box.x, this.Box.y + this.Box.height - 2);
  this.BlackGradient.addColorStop(0, "rgba(0,0,0,0)");
  this.BlackGradient.addColorStop(1, "rgba(0,0,0,1)");
};
ColorPicker.prototype.Draw = function(a, b) {
  if (0 != this.Opacity) {
    a.save();
    "undefined" === typeof b && (b = !1);
    a.strokeRect(this.X, this.Y, this.Width, this.Height);
    a.fillStyle = "#999";
    a.fillRect(this.X, this.Y, this.Width, this.Height);
    a.fillStyle = this.BasicColor;
    a.fillRect(this.Box.x, this.Box.y, this.Box.width, this.Box.height);
    a.fillStyle = this.WhiteGradient;
    a.fillRect(this.Box.x, this.Box.y, this.Box.width, this.Box.height);
    a.fillStyle = this.BlackGradient;
    a.fillRect(this.Box.x, this.Box.y, this.Box.width, this.Box.height);
    b || (a.strokeStyle = "black", a.strokeRect(this.Box.x, this.Box.y, this.Box.width, this.Box.height));
    a.fillStyle = this.StripGradient;
    a.fillRect(this.Strip.x, this.Strip.y, this.Strip.width, this.Strip.height);
    b || (a.strokeStyle = "black", a.strokeRect(this.Strip.x, this.Strip.y, this.Strip.width, this.Strip.height));
    var c = this.Preview;
    a.fillStyle = this.PickedColor;
    a.fillRect(c.x, c.y, c.width, c.height);
    a.font = "bold " + 2 * c.height / 3 + "px sans-serif";
    a.fillStyle = "white";
    a.fillSpinnedText(c.x + c.width / 2, c.y + c.height / 2, "OK", 0);
    a.strokeStyle = "black";
    a.lineWidth = c.height / 25;
    a.strokeSpinnedText(c.x + c.width / 2, c.y + c.height / 2, "OK", 0);
    a.strokeStyle = "black";
    a.lineWidth = 1;
    a.strokeRect(c.x, c.y, c.width, c.height);
    a.restore();
  }
};
ColorPicker.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOverPicker || this.Hide();
    var c = this.Engine.Input.Mouse.Position.Relative;
    var d = c.X;
    c = c.Y;
    this.IsMouseOverStrip && (a.GoThrough = !1, this.ClickOnStrip(d, c));
    this.IsMouseOverBox && (a.GoThrough = !1, this.ClickOnBox(d, c));
    this.IsMouseOverPreview && (a.GoThrough = !1, this.ClickOnPreview());
  }}, 1001);
};
ColorPicker.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref);
};
ColorPicker.prototype.Update = function() {
  0 != this.Opacity && ((this.IsMouseOverBox || this.IsMouseOverStrip) && this.Engine.Input.Mouse.Cursor.Set("crosshair"), this.IsMouseOverPreview && this.Engine.Input.Mouse.Cursor.Set("pointer"));
};
ColorPicker.prototype.ProcessInput = function() {
  if (0 != this.Opacity) {
    var a = this.GetArea();
    a.background = !0;
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverPicker");
    a = {x:this.Preview.x, y:this.Preview.y, width:this.Preview.width, height:this.Preview.height, type:"rect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverPreview");
    a = {x:this.Box.x + 1, y:this.Box.y + 1, width:this.Box.width - 2, height:this.Box.height - 2, type:"rect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverBox");
    a = {x:this.Strip.x + 1, y:this.Strip.y + 1, width:this.Strip.width - 2, height:this.Strip.height - 2, type:"rect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverStrip");
  }
};
ColorPicker.prototype.Show = function() {
  (new Flow(this, "Opacity", 1, 1000, {that:this, "function":function() {
    this.AddMouseHandler();
  }})).Start();
};
ColorPicker.prototype.Hide = function() {
  this.Opacity = 0;
  this.RemoveMouseHandler();
};
ColorPicker.prototype.ClickOnStrip = function(a, b) {
  var c = this.Engine.Context;
  this.Draw(c, !0);
  c = c.getImageData(a, b, 1, 1).data;
  this.BasicColor = this.PickedColor = c = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
};
ColorPicker.prototype.ClickOnBox = function(a, b) {
  var c = this.Engine.Context;
  this.Draw(c, !0);
  c = c.getImageData(a, b, 1, 1).data;
  this.PickedColor = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
};
ColorPicker.prototype.ClickOnPreview = function() {
  var a = this.ColorPickedCallbackObject;
  this.Hide();
  a && a["function"].call(a.that, this.PickedColor, a.parameter);
};
ColorPicker.prototype.SetColorPickedCallbackObject = function(a) {
  this.ColorPickedCallbackObject = a;
};
function Confirm(a, b) {
  ABO.call(this);
  this.Y = this.X = 0;
  this.Width;
  this.Height;
  this.ContentWidthQuotient = 0.6;
  this.Text = a;
  this.ImageText = !1;
  this.Rows = [];
  this.RowLengths = [];
  this.ConfirmCallback = b;
  this.Rounding = Confirm.prototype.DefaultRounding;
  this.FontHeight = Confirm.prototype.DefaultFontHeight;
  this.BoxPadding = Confirm.prototype.DefaultBoxPadding;
  this.RowSpace = Confirm.prototype.DefaultRowSpace;
  this.FontPadding = this.BoxPadding;
  this.ContentBox = {};
  this.YesBox = {x:0, y:0, width:60, height:40};
  this.NoBox = {x:0, y:0, width:60, height:40};
  this.IsMouseOverBackground = this.IsMouseOverContent = this.IsMouseOverNo = this.IsMouseOverYes = !1;
  this.Opacity = 0;
  this._ref_mhan = this._ref_upd = this._ref_draw = this._ref_ip = null;
  this.Initialize();
}
Confirm.prototype = Object.create(ABO.prototype);
Confirm.prototype.constructor = Confirm;
Confirm.prototype.ContentBoxColor = "#999";
Confirm.prototype.BoxBorderColor = "black";
Confirm.prototype.BoxColor = "#ccc";
Confirm.prototype.BoxFontColor = "#fff";
Confirm.prototype.OutsideColor = "rgba(0,0,0,0.8)";
Confirm.prototype.DefaultRounding = 10;
Confirm.prototype.DefaultFontHeight = 18;
Confirm.prototype.DefaultBoxPadding = 5;
Confirm.prototype.DefaultRowSpace = 4;
Confirm.prototype.Initialize = function() {
  this._createTextImage();
  this._recalculateSizes();
};
Confirm.prototype._createTextImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Engine.Canvas.width * this.ContentWidthQuotient;
  a.height = 300;
  var b = a.getContext("2d");
  b.font = this.Engine.Context.font;
  b.setFontHeight(this.FontHeight);
  for (var c = [], d = "string" === typeof this.Text ? [this.Text] : this.Text, e, f = 0; f < d.length; f++) {
    e = d[f].split(" ");
    for (var g = 0; g < e.length; g++) {
      c.push(e[g]);
    }
    f < d.length - 1 && c.push("\\n");
  }
  d = b.measureText(" ").width;
  e = [];
  for (f = 0; f < c.length; f++) {
    "\\n" !== c[f] ? e.push(b.measureText(c[f]).width) : e.push(0);
  }
  b = [];
  g = [];
  b.push("");
  g.push(0);
  for (f = 0; f < c.length; f++) {
    "\\n" === c[f] ? (f++, b.push(c[f] + " "), g.push(0 + e[f] + d)) : g[b.length - 1] + e[f] + d < a.width - 2 * this.FontPadding ? (b[b.length - 1] += c[f] + " ", g[b.length - 1] += e[f] + d) : (b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1), g[b.length - 1] -= d, b.push(c[f] + " "), g.push(e[f] + d));
  }
  b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1);
  this.Rows = b;
  this.RowLengths = g;
  for (f = a = 0; f < b.length; f++) {
    g[f] > a && (a = g[f]);
  }
  d = c = this.BoxPadding;
  f = a + 2 * this.BoxPadding;
  e = this.Rows.length * this.FontHeight + (this.Rows.length - 1) * this.RowSpace + 2 * this.FontPadding;
  a = document.createElement("CANVAS");
  a.width = f;
  a.height = e;
  b = a.getContext("2d");
  b.setFontHeight(this.FontHeight);
  b.textAlign = "left";
  b.textBaseline = "top";
  for (f = 0; f < this.Rows.length; f++) {
    b.fillText(this.Rows[f], c, d + this.FontHeight * f + this.RowSpace * f);
  }
  this.ImageText = document.createElement("IMG");
  this.ImageText.width = a.width;
  this.ImageText.height = e;
  this.ImageText.src = a.toDataURL();
};
Confirm.prototype._recalculateSizes = function() {
  var a = this.BoxPadding, b = this.Engine.Canvas;
  this.Width = b.width;
  this.Height = b.height;
  this.ContentBox.width = this.ImageText.width;
  this.ContentBox.height = this.ImageText.height + this.YesBox.height + 2 * a;
  this.ContentBox.x = b.width / 2 - this.ContentBox.width / 2;
  this.ContentBox.y = b.height / 2 - this.ContentBox.height / 2;
  this.YesBox.x = this.ContentBox.x + this.ContentBox.width / 3 - this.YesBox.width / 2;
  this.YesBox.y = this.ContentBox.y + this.ContentBox.height - this.YesBox.height - a;
  this.NoBox.x = this.ContentBox.x + 2 * this.ContentBox.width / 3 - this.NoBox.width / 2;
  this.NoBox.y = this.ContentBox.y + this.ContentBox.height - this.NoBox.height - a;
};
Confirm.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, "function":function(a) {
    a.save();
    a.globalAlpha = this.Opacity;
    a.fillStyle = this.OutsideColor;
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    var b = this.ContentBox;
    a.beginPath();
    a.variousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.clip();
    a.fillStyle = this.ContentBoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, 0);
    a.drawImage(this.ImageText, this.ContentBox.x, this.ContentBox.y);
    a.restore();
    a.save();
    b = this.YesBox;
    a.setFontHeight(0.5 * b.height);
    a.fillStyle = this.BoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding / 3 * 2);
    a.fillStyle = this.BoxFontColor;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "Ja", 0);
    b = this.NoBox;
    a.fillStyle = this.BoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding / 3 * 2);
    a.fillStyle = this.BoxFontColor;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "Nein", 0);
    a.restore();
    a.save();
    a.strokeStyle = this.BoxBorderColor;
    a.lineWidth = 5;
    b = this.ContentBox;
    a.strokeVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.restore();
  }, parameter:this.Engine.Context};
};
Confirm.prototype._createProcessInputFunctionObject = function() {
  return {that:this, "function":function(a) {
    var b = this.ContentBox;
    a = {"function":function(a) {
      a.moveTo(0, 0);
      a.lineTo(0, a.canvas.height);
      a.lineTo(a.canvas.width, a.canvas.height);
      a.lineTo(a.canvas.width, 0);
      a.lineTo(0, 0);
      a.rect(b.x, b.y, b.width, b.height);
    }, type:"function"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverBackground");
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverContent");
    b = this.YesBox;
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverYes");
    b = this.NoBox;
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverNo");
  }, parameter:this.Engine};
};
Confirm.prototype._createUpdateFunctionObject = function() {
  return {that:this, "function":function(a) {
    this._recalculateSizes();
    (this.IsMouseOverYes || this.IsMouseOverNo) && this.Engine.Input.Mouse.Cursor.Set("pointer");
  }, parameter:this.Engine};
};
Confirm.prototype._createMouseHandlerObject = function() {
  return {that:this, "function":function(a) {
    a.GoThrough = !1;
    this.IsMouseOverYes && (this.Stop(), Callback.CallObject(this.ConfirmCallback));
    (this.IsMouseOverBackground || this.IsMouseOverNo) && this.Stop();
  }, parameter:this.Engine};
};
Confirm.prototype.Start = function() {
  this.Active = !0;
  (new Flow(this, "Opacity", 1, 600, {that:this, parameter:!0, "function":function(a) {
  }})).Start();
  var a = this._createProcessInputFunctionObject();
  this._ref_ip = this.Engine.AddProcessInputFunction(a);
  a = this._createForegroundDrawFunctionObject();
  this._ref_draw = this.Engine.AddForegroundDrawFunctionObject(a);
  a = this._createUpdateFunctionObject();
  this._ref_upd = this.Engine.AddUpdateFunctionObject(a);
  a = this._createMouseHandlerObject();
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", a);
};
Confirm.prototype.Stop = function() {
  this.Active = !1;
  this.Engine.RemoveForegroundDrawFunctionObject(this._ref_draw);
  this._ref_draw = null;
  this.Engine.RemoveUpdateFunctionObject(this._ref_upd);
  this._ref_upd = null;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mhan);
  this._ref_mhan = null;
  this.Engine.RemoveProcessInputFunction(this._ref_ip);
  this._ref_ip = null;
};
function CoordinateSystem(a, b, c, d, e) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.Height = d;
  this.Options = e;
  this.Nullpoint = {x:20, y:this.Height - 20};
  this.Mouse = {x:0, y:0};
  this.SI = {x:0, y:0};
  this.IsMouseOver = !1;
  this.OnClickCBO = {"function":function() {
  }, parameter:{}, that:this};
  this.PixelPerScale = 15;
  this._drawLimit = {Xpos:500, Xneg:500, Ypos:500, Yneg:500};
  this._markLimit = {Xpos:25, Xneg:25, Ypos:20, Yneg:20};
  this._drawScaleLines = this._drawScaleMarks = this._drawAxis = !0;
  this.BorderColor = "#000000";
  this.BorderThickness = 1;
  this.ScaleMarkLength = [6, 12, 14];
  this.ScaleMarkThickness = [1, 1.25, 1.5];
  this.ScaleMarkColor = ["#666", "#444", "#222"];
  this.ScaleLineColor = "rgba(73,73,73,0.3)";
  this.OldFramesDown = 0;
  this.Initialize();
}
CoordinateSystem.prototype = Object.create(ABO.prototype);
CoordinateSystem.prototype.constructor = CoordinateSystem;
CoordinateSystem.prototype.Initialize = function() {
  this.AddMouseHandler();
  var a = this.Options;
  if ("undefined" != a) {
    for (var b in a) {
      "undefined" != this[b] && (this[b] = a[b]);
    }
  }
};
CoordinateSystem.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    if (this.IsMouseOver) {
      a.GoThrough = !1;
      var c = this.OnClickCBO;
      c["function"].call(c.that, c.parameter);
    }
  }}, 10);
};
CoordinateSystem.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref);
};
CoordinateSystem.prototype.Draw = function(a) {
  a.save();
  0 < this.BorderThickness && (a.strokeStyle = this.BorderColor, a.lineWidth = this.BorderThickness, a.strokeRect(this.X, this.Y, this.Width, this.Height));
  this.Clip(a);
  var b = this.X + this.Nullpoint.x, c = this.Y + this.Nullpoint.y;
  this._drawAxis && (a.beginPath(), a.moveTo(b, c - this._drawLimit.Ypos), a.lineTo(b, c + this._drawLimit.Yneg), a.stroke(), a.closePath(), a.beginPath(), a.moveTo(b - this._drawLimit.Xneg, c), a.lineTo(b + this._drawLimit.Xpos, c), a.stroke(), a.closePath());
  if (this._drawScaleMarks) {
    for (var d, e, f = 1; f <= this._markLimit.Xpos; f++) {
      e = 0, 0 == f % 5 && (e = 1, 0 == f % 10 && (e = 2)), a.lineWidth = this.ScaleMarkThickness[e], a.strokeStyle = this.ScaleMarkColor[e], d = b + f * this.PixelPerScale, a.beginPath(), a.moveTo(d, c), a.lineTo(d, c - this.ScaleMarkLength[e]), a.stroke(), a.closePath();
    }
    for (f = 1; f <= this._markLimit.Xneg; f++) {
      e = 0, 0 == f % 5 && (e = 1, 0 == f % 10 && (e = 2)), a.lineWidth = this.ScaleMarkThickness[e], a.strokeStyle = this.ScaleMarkColor[e], d = b - f * this.PixelPerScale, a.beginPath(), a.moveTo(d, c), a.lineTo(d, c - this.ScaleMarkLength[e]), a.stroke(), a.closePath();
    }
    for (f = 1; f <= this._markLimit.Ypos; f++) {
      e = 0, 0 == f % 5 && (e = 1, 0 == f % 10 && (e = 2)), a.lineWidth = this.ScaleMarkThickness[e], a.strokeStyle = this.ScaleMarkColor[e], d = c - f * this.PixelPerScale, a.beginPath(), a.moveTo(b, d), a.lineTo(b + this.ScaleMarkLength[e], d), a.stroke(), a.closePath();
    }
    for (f = 1; f <= this._markLimit.Yneg; f++) {
      e = 0, 0 == f % 5 && (e = 1, 0 == f % 10 && (e = 2)), a.lineWidth = this.ScaleMarkThickness[e], a.strokeStyle = this.ScaleMarkColor[e], d = c + f * this.PixelPerScale, a.beginPath(), a.moveTo(b, d), a.lineTo(b + this.ScaleMarkLength[e], d), a.stroke(), a.closePath();
    }
  }
  if (this._drawScaleLines) {
    for (f = e = this._drawAxis ? 1 : 0; f <= this._markLimit.Xpos; f++) {
      d = b + f * this.PixelPerScale, a.lineWidth = 1, a.strokeStyle = this.ScaleLineColor, a.beginPath(), a.moveTo(d, c - this._drawLimit.Ypos), a.lineTo(d, c + this._drawLimit.Yneg), a.stroke(), a.closePath();
    }
    for (f = 1; f <= this._markLimit.Xneg; f++) {
      a.lineWidth = 1, a.strokeStyle = this.ScaleLineColor, d = b - f * this.PixelPerScale, a.beginPath(), a.moveTo(d, c - this._drawLimit.Ypos), a.lineTo(d, c + this._drawLimit.Yneg), a.stroke(), a.closePath();
    }
    for (f = e; f <= this._markLimit.Ypos; f++) {
      a.lineWidth = 1, a.strokeStyle = this.ScaleLineColor, d = c - f * this.PixelPerScale, a.beginPath(), a.moveTo(b - this._drawLimit.Xneg, d), a.lineTo(b + this._drawLimit.Xpos, d), a.stroke(), a.closePath();
    }
    for (f = 1; f <= this._markLimit.Yneg; f++) {
      a.lineWidth = 1, a.strokeStyle = this.ScaleLineColor, d = c + f * this.PixelPerScale, a.beginPath(), a.moveTo(b - this._drawLimit.Xneg, d), a.lineTo(b + this._drawLimit.Xpos, d), a.stroke(), a.closePath();
    }
  }
  a.restore();
};
CoordinateSystem.prototype.Update = function() {
  var a = this.Engine.Input.Mouse.Position.Relative, b = this.Nullpoint, c = this.PixelPerScale;
  this.Mouse.x = a.X - (b.x + this.X);
  this.Mouse.y = -1 * (a.Y - (b.y + this.Y));
  this.SI.x = Math.round(this.Mouse.x / c * 100) / 100;
  this.SI.y = Math.round(this.Mouse.y / c * 100) / 100;
};
CoordinateSystem.prototype.ProcessInput = function() {
  var a = this.GetArea();
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
};
CoordinateSystem.prototype.Move = function(a, b) {
  this.Nullpoint.x += a;
  this.Nullpoint.y += b;
  this.UpdateLimit();
};
CoordinateSystem.prototype.Center = function() {
  this.Nullpoint = {x:this.Width / 2, y:this.Height / 2};
  this.UpdateLimit();
};
CoordinateSystem.prototype.GetSI = function() {
  return {x:this.SI.x, y:this.SI.y};
};
CoordinateSystem.prototype.GetCoords = function() {
  return {x:this.Mouse.x, y:this.Mouse.y};
};
CoordinateSystem.prototype.UpdateLimit = function() {
  var a = this.PixelPerScale, b = this.Nullpoint;
  var c = Math.sqrt(Math.pow(this.X + b.x - this.X, 2));
  var d = Math.floor(c / a);
  var e = Math.sqrt(Math.pow(this.Y + b.y - this.Y, 2));
  var f = Math.floor(e / a);
  var g = Math.sqrt(Math.pow(this.X + this.Width - (this.X + b.x), 2));
  var h = Math.floor(g / a);
  b = Math.sqrt(Math.pow(this.Y + this.Height - (this.Y + b.y), 2));
  a = Math.floor(b / a);
  this._drawLimit = {Xpos:g, Xneg:c, Ypos:e, Yneg:b};
  this._markLimit = {Xpos:h, Xneg:d, Ypos:f, Yneg:a};
};
CoordinateSystem.prototype.Clip = function(a) {
  a.beginPath();
  a.rect(this.X, this.Y, this.Width, this.Height);
  a.closePath();
  a.clip();
};
CoordinateSystem.prototype.SetOnClick = function(a, b, c) {
  this.OnClickCBO = 1 < arguments.length ? {that:a, "function":b, parameter:c || !0} : a;
};
CoordinateSystem.prototype.SetNullpoint = function(a, b) {
  this.Nullpoint.x = a;
  this.Nullpoint.y = b;
  this.UpdateLimit();
};
function DebugWindow() {
  this.FontHeight = 14;
  this.Timestamp = Date.now();
  this.Window = null;
  this.Document;
  this.Variables = [];
  this.FormatStrings = [];
  this.Hide = !1;
  this.MaxDepth = 2;
  this.Initialize();
}
DebugWindow.prototype.Initialize = function() {
};
DebugWindow.prototype.Draw = function() {
  if (this.Window) {
    $(this.Body).html("");
    for (var a = "<p>last refresh: " + Date.now() + "</p>", b, c = 0; c < this.Variables.length; c++) {
      b = this.Variables[c], a += this._getHTML(b.object, b.keys, c, b.name);
    }
    $(this.Body).html(a);
  }
};
DebugWindow.prototype.Add = function(a, b, c) {
  if (!b) {
    b = [];
    for (var d in a) {
      b.push(d);
    }
  }
  this.Variables.push({object:a, keys:b, name:c});
};
DebugWindow.prototype.RecursiveAdd = function(a, b, c) {
  this.Add(a, !1, b);
  if (0 >= c) {
    return !0;
  }
  for (var d in a) {
    "object" == typeof a[d] && this.RecursiveAdd(a[d], b + "." + d, --c);
  }
};
DebugWindow.prototype.Open = function() {
  if (this.IsOpen) {
    return !1;
  }
  this.Window = window.open("", "Debug Winow", "width=460,height=650");
  this.Document = this.Window.document;
  this.Body = this.Document.body;
  this.IsOpen = !0;
  this._setCSS();
};
DebugWindow.prototype.Update = function() {
  if (!this.Window) {
    return !1;
  }
  this.IsOpen = !this.Window.closed;
};
DebugWindow.prototype._getHTML = function(a, b, c, d) {
  c = "<div class='objects' id='Object_" + c + "'><p>" + d + "</p>\n                <table width=440>\n                    <tr>\n                        <th>Attr</th><th>Wert</th><th>Class</th>\n                    </tr>";
  for (d = 0; d < b.length; d++) {
    c += "<tr>\n                    <td>" + b[d] + "</td><td>" + this._what(a, b[d]) + "</td><td>" + this._getClass(a, b[d]) + "</td>\n                </tr>";
  }
  return c + "</table></div>";
};
DebugWindow.prototype._setCSS = function() {
  $(this.Document.head).append("<style> body { font-size : 16px }  .objects {margin: 5px; width:440px;}   p {width:100%; text-align: center; font-size : 20px}  table { border-collapse: collapse;  } table, th, td {border: 1px solid black;}  </style>");
};
DebugWindow.prototype._what = function(a, b) {
  var c = !1, d = "";
  "Engine" != b || c || (d += "reference to Engine", c = !0);
  "function" != typeof a[b] || c || (d += "function( )", c = !0);
  "object" != typeof a[b] || c || (d += "object", c = !0);
  "object" == typeof a[b] || c || (d += "" + a[b]);
  return d;
};
DebugWindow.prototype._getClass = function(a, b) {
  var c = a[b];
  if ("undefined" === typeof c) {
    return "undefined";
  }
  if (null === c) {
    return "null";
  }
  c = c.constructor.toString();
  var d = c.indexOf("function "), e = c.indexOf("(");
  if (0 == d) {
    return c = c.substr(9, e - 9), "CLASS::" + c;
  }
};
function Engine(a) {
  this.Info = {Engine:"AniBody", Version:"0.96", Author:"Daniel Meurer", Project:"Developing", LastUpdated:"2017_08_08_h17"};
  if ($ && $.fn) {
    $.EngineArray || ($.EngineArray = []), this.EI = $.EngineArray.length, $.EngineArray.push(this), $.Engine = this;
  } else {
    return this.Info.Error = "jQuery is probably not set up", !1;
  }
  this.Flags = {};
  this.Flags.ConstantLoop = !0;
  this.Flags.PreventKeyboardStrokesToBubbleUp = !0;
  this.Flags.PreventContextClickBubbleToUp = !0;
  this.Flags.MediaManager = !0;
  this.Flags.TouchHandler = !0;
  this.Flags._useFakeMouseClick = !0;
  this.Paused = this.Flags.AntiHoverEffect = !1;
  this.Objects = {Queue:null, SelectedObject:null};
  this.CanvasID = a;
  this.Canvas = {};
  this.Canvas.ScreenRatio = 0;
  this.IsCanvasFitToScreen = this.IsTouchDevice = !1;
  this.Context;
  this.Camera = {SelectedCamera:!1, Cameras:!1};
  this.Counter;
  this.Log = [];
  this.ProcessInputFunctions = new PriorityQueue;
  this.UpdateFunctions = new PriorityQueue;
  this.ForegroundDrawFunctionObjects = new PriorityQueue;
  this.ImageData = null;
  this.FPS = 25;
  this.Timer;
  this.MediaManager = {};
  this.Terrain = {};
  this.DebugWindow = {};
  this.OverlayImages = [];
  this.OutsideElement = [];
  this.TopWindow = window;
  if (window.top !== window.self) {
    try {
      this.TopWindow = window.parent;
    } catch (b) {
      console.log("top window can't be found;");
    }
  }
  this.Initialize();
}
Engine.prototype.GetEngine = function() {
  return this;
};
Object.defineProperty(Engine.prototype, "Engine", {get:function() {
  return $.EngineArray[this.EI];
}});
Engine.prototype.Initialize = function() {
  this.Flags.MediaManager && (this.MediaManager = new MediaManager, this.MediaManager.EI = this.EI);
  var a = $("#" + this.CanvasID)[0], b = $("#" + this.CanvasID).width(), c = $("#" + this.CanvasID).height();
  "DIV" == a.nodeName && ($("#" + this.CanvasID).html("<canvas width='" + b + "' height='" + c + "' id='" + this.CanvasID + "_Canvas'></canvas>"), this.CanvasID += "_Canvas");
  this.Canvas = $("#" + this.CanvasID)[0];
  this.Canvas.PosNew = {x:0, y:0};
  this.Canvas.PosOld = {x:0, y:0};
  this.Canvas.ScreenRatio = parseInt(this.Canvas.width / this.Canvas.height * 1000) / 1000;
  this.Context = this.Canvas.getContext("2d");
  this.Input.Engine = this;
  this.Input.Mouse.Cursor.Engine = this;
  this.Input.Initialize();
  this.Objects.Queue = new PriorityQueue;
  this.Counter = new Counter;
  this.AddUpdateFunctionObject({"function":this.Counter.Update, parameter:this.Counter, that:this.Counter});
  this.Flags.ConstantLoop && (this.Timer = new Timer(this, this.Frame, this.FPS));
  this.Storage.Engine = this;
  this.Storage.InitStorage();
  this.DebugWindow = new DebugWindow;
};
Engine.prototype.Start = function() {
  this.Engine.Terrain.Type || this.Engine.SetTerrain(new DefaultTerrain);
  this.Engine.Camera.SelectedCamera && this.Engine.Camera.SelectedCamera.Type || (this.Engine.Camera.SelectedCamera = this.GetNewCamera("default"));
  this.Engine.Objects.Queue.Sort();
  this.Flags.ConstantLoop && this.Engine.Timer.Start();
};
Engine.prototype.Stop = function() {
  this.Flags.ConstantLoop && this.Timer.Stop();
};
Engine.prototype.Continue = function() {
  this.Paused = !1;
};
Engine.prototype.Pause = function() {
  this.Paused = !0;
};
Engine.prototype.Frame = function(a) {
  a.ProcessInput();
  a.Paused || a.Update();
  a.Draw();
};
Engine.prototype.AddProcessInputFunction = function(a, b) {
  var c = this.ProcessInputFunctions.Enqueue(a, b);
  this.ProcessInputFunctions.Sort();
  return c;
};
Engine.prototype.RemoveProcessInputFunction = function(a) {
  this.ProcessInputFunctions.DeleteByReferenceNumber(a);
};
Engine.prototype.ProcessInput = function() {
  this.Input.Mouse.Cursor["default"]();
  this.Input.Update();
  for (var a = 0; a < this.Objects.Queue.heap.length; a++) {
    (o = this.GetObject(a)) && o.ProcessInput && o.ProcessInput();
  }
  for (a = 0; a < this.ProcessInputFunctions.heap.length; a++) {
    var b = this.ProcessInputFunctions.heap[a].data;
    b["function"].call(b.that, b.parameter);
  }
  this.Input.MouseHandler && this.Input.MouseHandler.ResolveHoverRequest && this.Input.MouseHandler.ResolveHoverRequest();
  this.Input.MouseHandler && this.Input.MouseHandler.MouseClickHandler && this.Input.MouseHandler.MouseClickHandler();
};
Engine.prototype.AddUpdateFunctionObject = function(a, b) {
  return this.UpdateFunctions.Enqueue(a, b);
};
Engine.prototype.RemoveUpdateFunctionObject = function(a) {
  this.UpdateFunctions.DeleteByReferenceNumber(a);
};
Engine.prototype.Update = function() {
  this.Input.CalculateCanvasPosition();
  this.Objects.Queue.Sorted || this.Objects.Queue.Sort();
  this.Terrain && this.Terrain.Update && this.Terrain.Update();
  for (var a, b = 0; b < this.UpdateFunctions.heap.length; b++) {
    a = this.UpdateFunctions.heap[b].data, a["function"].call(a.that, a.parameter);
  }
  for (b = 0; b < this.Objects.Queue.heap.length; b++) {
    (a = this.GetObject(b)) && a.Update && a.Update();
  }
  this.Flags.MediaManager && this.MediaManager.Update();
  this.DebugWindow && this.DebugWindow.Update();
  this.Flags.AntiHoverEffect && (this.Input.Canvas.MouseOn ? this.AHEStart() : "undefined" !== typeof this.AHE.Canvas && this.AHE.Canvas && this.AHEStop());
  this.Camera.SelectedCamera.Update();
};
Engine.prototype.Draw = function() {
  var a = this.Context;
  a.save();
  a.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
  var b;
  this.Terrain.Draw(a);
  for (var c = 0; c < this.Objects.Queue.heap.length; c++) {
    (b = this.GetObject(c)) && b.Draw && b.Draw(a);
  }
  this.Flags.MediaManager && this.MediaManager.Draw(a);
  this.DebugWindow && this.DebugWindow.Draw();
  for (c = 0; c < this.ForegroundDrawFunctionObjects.heap.length; c++) {
    b = this.ForegroundDrawFunctionObjects.heap[c].data, b["function"].call(b.that, a, b.parameter);
  }
  if (0 < this.OverlayImages.length) {
    b = [];
    for (c = 0; c < this.OverlayImages.length; c++) {
      var d = this.OverlayImages[c];
      a.drawImage(d.image, d.pos.x, d.pos.y, d.pos.width, d.pos.height);
      d.frames--;
      0 < d.frames && b.push(d);
    }
    this.OverlayImages = b;
  }
  a.restore();
};
Engine.prototype.AddForegroundDrawFunctionObject = function(a, b) {
  return this.ForegroundDrawFunctionObjects.Enqueue(a, b);
};
Engine.prototype.RemoveForegroundDrawFunctionObject = function(a) {
  this.ForegroundDrawFunctionObjects.DeleteByReferenceNumber(a);
};
Engine.prototype.Download = function(a, b) {
  "undefined" === typeof b && (b = this.Canvas.toDataURL());
  var c = a || "download_" + Date.now() + ".png";
  (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(b, c) {
      a.href = b;
      a.download = c;
      a.click();
      window.URL.revokeObjectURL(b);
    };
  })()(b, c);
};
Engine.prototype.RequestFullscreen = function() {
  var a = this.Canvas, b = !1;
  !b && a.requestFullscreen && (a.requestFullscreen(), b = !0);
  !b && a.webkitRequestFullscreen && (a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT), b = !0);
  !b && a.mozRequestFullScreen && (a.mozRequestFullScreen(), b = !0);
  !b && a.msRequestFullscreen && (a.msRequestFullscreen(), b = !0);
  return b;
};
Engine.prototype.ExitFullscreen = function() {
  var a = !1;
  !a && document.exitFullscreen && (document.exitFullscreen(), a = !0);
  !a && document.webkitExitFullscreen && (document.webkitExitFullscreen(), a = !0);
  !a && document.mozCancelFullScreen && (document.mozCancelFullScreen(), a = !0);
  !a && document.msExitFullscreen && document.msExitFullscreen();
};
Engine.prototype.GetObject = function(a) {
  return a < this.Objects.Queue.heap.length ? this.Objects.Queue.heap[a].data : !1;
};
Engine.prototype.AddObject = function(a, b) {
  a.EI = this.EI;
  return this.Objects.Queue.Enqueue(a, b);
};
Engine.prototype.RemoveObject = function(a) {
  return this.Objects.Queue.DeleteByReferenceNumber(a);
};
Engine.prototype.SetSelectedObject = function(a) {
  this.Objects.SelectedObject = a;
};
Engine.prototype.GetSelectedObject = function() {
  return this.Objects.SelectedObject;
};
Engine.prototype.AddOutsideElement = function(a, b) {
  var c = {element:$("#" + a), id:a, codename:b};
  return 0 < c.element.length ? (this.OutsideElement.push(c), c) : !1;
};
Engine.prototype.GetOutsideElement = function(a) {
  for (var b = 0; b < this.OutsideElement.length; b++) {
    if (this.OutsideElement[b].codename === a) {
      return this.OutsideElement[b].element;
    }
  }
  return !1;
};
Engine.prototype.FlushQueue = function() {
  this.Objects.Queue.Flush();
  this.length = 0;
  this.SelectedObject = "undefined";
};
Engine.prototype.SetTerrain = function(a) {
  a.EI = this.EI;
  this.Terrain = a;
};
Engine.prototype.FlushScene = function() {
  this.Objects.Queue.Flush();
  this.MediaManager.Flush();
};
Engine.prototype.HandleError = function(a) {
  this.Log.push(a);
};
Engine.prototype.GetNewCamera = function(a) {
  var b;
  a && "default" != a || (b = new DefaultCamera);
  "platform" == a && (b = new PlatformCamera);
  "rpg" == a && (b = new RPGCamera);
  b.EI = this.EI;
  return b;
};
Engine.prototype.GetCamera = function() {
  return this.Camera.SelectedCamera;
};
Engine.prototype.SetCamera = function(a) {
  this.Camera.SelectedCamera = a;
};
Engine.prototype.ActivateFullScreen_yetTODO = function() {
  var a = this.Canvas, b = $(window).width(), c = $(window).height();
  a.width = b;
  a.height = c;
  this.Canvas.ScreenRatio = b / c;
  this.IsCanvasFitToScreen = !0;
};
Engine.prototype.AddOverlayImage = function(a, b, c, d, e, f) {
  d = d || a.width;
  e = e || a.height;
  this.OverlayImages.push({image:a, pos:{x:b, y:c, width:d, height:e}, frames:f || 1});
};
Engine.prototype.LockUnload = function(a) {
  var b = function(a) {
    return !1;
  };
  "function" === typeof a && (b = a);
  $(window).bind("beforeunload", b);
  if (window.top != window.self) {
    try {
      $(window.parent.document).bind("beforeunload", b);
    } catch (c) {
    }
  }
};
Engine.prototype.UnlockUnload = function() {
  $(window).unbind("beforeunload");
  if (window.top != window.self) {
    try {
      $(window.parent.document).unbind("beforeunload");
    } catch (a) {
    }
  }
};
Engine.prototype.Input = {Engine:!1, MouseDownEvent:{}, KeyDownEvent:{}, ParentKeyDownEvent:{}, MouseUpEvent:{}, KeyUpEvent:{}, ParentKeyUpEvent:{}, MouseMoveEvent:{}, MouseScrollEvent:{}, ResizeEvent:{}, MouseHandler:{}, TouchHandler:{}, Mouse:{EventObject:0, DownEvent:0, UpEvent:0, Left:{Up:!0, Down:!1, FramesDown:0, FramesUp:0, BusyFrames:0}, Right:{Up:!0, Down:!1, FramesDown:0, FramesUp:0, BusyFrames:0}, Position:{X:0, Y:0, Xold:0, Yold:0, Relative:{X:0, Y:0}, Camera:{X:0, Y:0}, Delta:{X:0, Y:0}}, 
Cursor:{Current:"auto", OnlyCanvas:!0, Update:function() {
  $(this.Engine.Canvas).css("cursor", this.Current);
}, Set:function(a) {
  $(this.Engine.Canvas).css("cursor", a);
}, alias:function() {
  this.Current = "alias";
  this.Set(this.Current);
}, cell:function() {
  this.Current = "cell";
  this.Set(this.Current);
}, col_resize:function() {
  this.Current = "col-resize";
  this.Set(this.Current);
}, copy:function() {
  this.Current = "copy";
  this.Set(this.Current);
}, crosshair:function() {
  this.Current = "crosshair";
  this.Set(this.Current);
}, "default":function() {
  this.Current = "default";
  this.Set(this.Current);
}, ew_resize:function() {
  this.Current = "ew-resize";
  this.Set(this.Current);
}, grab:function() {
  this.Current = "grab";
  this.Set(this.Current);
}, grabbing:function() {
  this.Current = "grabbing";
  this.Set(this.Current);
}, help:function() {
  this.Current = "help";
  this.Set(this.Current);
}, move:function() {
  this.Current = "move";
  this.Set(this.Current);
}, nesw_resize:function() {
  this.Current = "move";
  this.Set(this.Current);
}, ns_resize:function() {
  this.Current = "ns-resize";
  this.Set(this.Current);
}, nwse_resize:function() {
  this.Current = "ns-resize";
}, no_drop:function() {
  this.Current = "no-drop";
  this.Set(this.Current);
}, none:function() {
  this.Current = "none";
  this.Set(this.Current);
}, not_allowed:function() {
  this.Current = "not-allowed";
  this.Set(this.Current);
}, pointer:function() {
  this.Current = "pointer";
  this.Set(this.Current);
}, progress:function() {
  this.Current = "progress";
  this.Set(this.Current);
}, row_resize:function() {
  this.Current = "row-resize";
  this.Set(this.Current);
}, text:function() {
  this.Current = "text";
  this.Set(this.Current);
}, vertical_text:function() {
  this.Current = "vertical-text";
  this.Set(this.Current);
}, wait:function() {
  this.Current = "wait";
  this.Set(this.Current);
}, zoom_in:function() {
  this.Current = "zoom-in";
  this.Set(this.Current);
}, zoom_out:function() {
  this.Current = "zoom-out";
  this.Set(this.Current);
}}}, Key:{Event:{}, Symbol:"", KeyNotFound:{Pressed:!1, FramesPressed:0}, AnyKey:{Pressed:!1, FramesPressed:0}, A:{Pressed:!1, FramesPressed:0}, B:{Pressed:!1, FramesPressed:0}, C:{Pressed:!1, FramesPressed:0}, D:{Pressed:!1, FramesPressed:0}, E:{Pressed:!1, FramesPressed:0}, F:{Pressed:!1, FramesPressed:0}, G:{Pressed:!1, FramesPressed:0}, H:{Pressed:!1, FramesPressed:0}, I:{Pressed:!1, FramesPressed:0}, J:{Pressed:!1, FramesPressed:0}, K:{Pressed:!1, FramesPressed:0}, L:{Pressed:!1, FramesPressed:0}, 
M:{Pressed:!1, FramesPressed:0}, N:{Pressed:!1, FramesPressed:0}, O:{Pressed:!1, FramesPressed:0}, P:{Pressed:!1, FramesPressed:0}, Q:{Pressed:!1, FramesPressed:0}, R:{Pressed:!1, FramesPressed:0}, S:{Pressed:!1, FramesPressed:0}, T:{Pressed:!1, FramesPressed:0}, U:{Pressed:!1, FramesPressed:0}, V:{Pressed:!1, FramesPressed:0}, W:{Pressed:!1, FramesPressed:0}, X:{Pressed:!1, FramesPressed:0}, Y:{Pressed:!1, FramesPressed:0}, Z:{Pressed:!1, FramesPressed:0}, Control:{Pressed:!1, FramesPressed:0}, 
Shift:{Pressed:!1, FramesPressed:0}, Alt:{Pressed:!1, FramesPressed:0}, Tab:{Pressed:!1, FramesPressed:0}, Num0:{Pressed:!1, FramesPressed:0}, Num1:{Pressed:!1, FramesPressed:0}, Num2:{Pressed:!1, FramesPressed:0}, Num3:{Pressed:!1, FramesPressed:0}, Num4:{Pressed:!1, FramesPressed:0}, Num5:{Pressed:!1, FramesPressed:0}, Num6:{Pressed:!1, FramesPressed:0}, Num7:{Pressed:!1, FramesPressed:0}, Num8:{Pressed:!1, FramesPressed:0}, Num9:{Pressed:!1, FramesPressed:0}, Up:{Pressed:!1, FramesPressed:0}, 
Right:{Pressed:!1, FramesPressed:0}, Down:{Pressed:!1, FramesPressed:0}, Left:{Pressed:!1, FramesPressed:0}, Backspace:{Pressed:!1, FramesPressed:0}, Space:{Pressed:!1, FramesPressed:0}, Enter:{Pressed:!1, FramesPressed:0}, Esc:{Pressed:!1, FramesPressed:0}}, Canvas:new function() {
  this.Height = this.Width = this.Y = this.X = 0;
  this.MouseOn = !1;
}, Update:function() {
  var a = this.Engine.Input.Mouse.EventObject, b = this.Engine.Input.Mouse;
  0 < b.Left.BusyFrames && b.Left.BusyFrames--;
  0 < b.Right.BusyFrames && b.Right.BusyFrames--;
  b = b.Position;
  b.Xold = b.X;
  b.Yold = b.Y;
  a && a.pageX ? (b.X = a.pageX, b.Y = a.pageY) : (b.X = 0, b.Y = 0);
  b.Relative.X = b.X - this.Engine.Input.Canvas.X;
  b.Relative.Y = b.Y - this.Engine.Input.Canvas.Y;
  b.Camera.X = b.X - this.Engine.Input.Canvas.X + this.Engine.Camera.SelectedCamera.X;
  b.Camera.Y = b.Y - this.Engine.Input.Canvas.Y + this.Engine.Camera.SelectedCamera.Y;
  b.Delta.X = b.X - b.Xold;
  b.Delta.Y = b.Y - b.Yold;
  a = this.Engine.Input.Mouse.Position.X;
  b = this.Engine.Input.Mouse.Position.Y;
  this.Canvas.MouseOn = this.Canvas.X <= a && a < this.Canvas.X + this.Canvas.Width && this.Canvas.Y <= b && b < this.Canvas.Y + this.Canvas.Height ? !0 : !1;
  this.Mouse.Cursor.Update();
  a = this.Engine.Input;
  a.Key.AnyKey.Pressed && a.Key.AnyKey.FramesPressed++;
  a.Key.A.Pressed && a.Key.A.FramesPressed++;
  a.Key.B.Pressed && a.Key.B.FramesPressed++;
  a.Key.C.Pressed && a.Key.C.FramesPressed++;
  a.Key.D.Pressed && a.Key.D.FramesPressed++;
  a.Key.E.Pressed && a.Key.E.FramesPressed++;
  a.Key.F.Pressed && a.Key.F.FramesPressed++;
  a.Key.G.Pressed && a.Key.G.FramesPressed++;
  a.Key.H.Pressed && a.Key.H.FramesPressed++;
  a.Key.I.Pressed && a.Key.I.FramesPressed++;
  a.Key.J.Pressed && a.Key.J.FramesPressed++;
  a.Key.K.Pressed && a.Key.K.FramesPressed++;
  a.Key.L.Pressed && a.Key.L.FramesPressed++;
  a.Key.M.Pressed && a.Key.M.FramesPressed++;
  a.Key.N.Pressed && a.Key.N.FramesPressed++;
  a.Key.O.Pressed && a.Key.O.FramesPressed++;
  a.Key.P.Pressed && a.Key.P.FramesPressed++;
  a.Key.Q.Pressed && a.Key.Q.FramesPressed++;
  a.Key.R.Pressed && a.Key.R.FramesPressed++;
  a.Key.S.Pressed && a.Key.S.FramesPressed++;
  a.Key.T.Pressed && a.Key.T.FramesPressed++;
  a.Key.U.Pressed && a.Key.U.FramesPressed++;
  a.Key.V.Pressed && a.Key.V.FramesPressed++;
  a.Key.W.Pressed && a.Key.W.FramesPressed++;
  a.Key.X.Pressed && a.Key.X.FramesPressed++;
  a.Key.Y.Pressed && a.Key.Y.FramesPressed++;
  a.Key.Z.Pressed && a.Key.Z.FramesPressed++;
  a.Key.Control.Pressed && a.Key.Control.FramesPressed++;
  a.Key.Shift.Pressed && a.Key.Shift.FramesPressed++;
  a.Key.Alt.Pressed && a.Key.Alt.FramesPressed++;
  a.Key.Tab.Pressed && a.Key.Tab.FramesPressed++;
  a.Key.Num0.Pressed && a.Key.Num0.FramesPressed++;
  a.Key.Num1.Pressed && a.Key.Num1.FramesPressed++;
  a.Key.Num2.Pressed && a.Key.Num2.FramesPressed++;
  a.Key.Num3.Pressed && a.Key.Num3.FramesPressed++;
  a.Key.Num4.Pressed && a.Key.Num4.FramesPressed++;
  a.Key.Num5.Pressed && a.Key.Num5.FramesPressed++;
  a.Key.Num6.Pressed && a.Key.Num6.FramesPressed++;
  a.Key.Num7.Pressed && a.Key.Num7.FramesPressed++;
  a.Key.Num8.Pressed && a.Key.Num8.FramesPressed++;
  a.Key.Num9.Pressed && a.Key.Num9.FramesPressed++;
  a.Key.Up.Pressed && a.Key.Up.FramesPressed++;
  a.Key.Right.Pressed && a.Key.Right.FramesPressed++;
  a.Key.Down.Pressed && a.Key.Down.FramesPressed++;
  a.Key.Left.Pressed && a.Key.Left.FramesPressed++;
  a.Key.Backspace.Pressed && a.Key.Backspace.FramesPressed++;
  a.Key.Space.Pressed && a.Key.Space.FramesPressed++;
  a.Key.Enter.Pressed && a.Key.Enter.FramesPressed++;
  a.Key.Esc.Pressed && a.Key.Esc.FramesPressed++;
  a.Mouse.Left.Down && a.Mouse.Left.FramesDown++;
  a.Mouse.Right.Down && a.Mouse.Right.FramesDown++;
  a.Mouse.Left.Up && a.Mouse.Left.FramesUp++;
  a.Mouse.Right.Up && a.Mouse.Right.FramesUp++;
  this.Engine.Flags.TouchHandler && this.TouchHandler.Update();
}, Initialize:function() {
  this.CalculateCanvasPosition();
  this.RegisterKeyEvents(this.Engine.Flags.PreventKeyboardStrokesToBubbleUp);
  this.RegisterMouseEvents(this.Engine.Flags.PreventContextClickBubbleToUp);
  this.RegisterResizeEvent();
  this.MouseHandler = new MouseHandler;
  this.Engine.Flags.TouchHandler && (this.TouchHandler = new TouchHandler);
}, CalculateCanvasPosition:function() {
  var a = this.Engine.Canvas, b;
  this.Canvas.Width = a.width;
  this.Canvas.Height = a.height;
  var c = 200;
  var d = 0 + a.offsetLeft;
  for (b = 0 + a.offsetTop; a.offsetParent && "BODY" != a.offsetParent.nodeName && 0 < c;) {
    c--, d += a.offsetLeft, b += a.offsetTop, a = a.parentNode;
  }
  this.Canvas.X = d;
  this.Canvas.Y = b;
}, RegisterKeyEvents:function(a) {
  var b = function(b) {
    var c = b.data.Input;
    c.Key.Event = b;
    c.Key.Symbol = b.key ? b.key : String.getKeyByEvent(b);
    c.Key.AnyKey.Pressed = !0;
    switch(b.which) {
      case 65:
        c.Key.A.Pressed = !0;
        break;
      case 66:
        c.Key.B.Pressed = !0;
        break;
      case 67:
        c.Key.C.Pressed = !0;
        break;
      case 68:
        c.Key.D.Pressed = !0;
        break;
      case 69:
        c.Key.E.Pressed = !0;
        break;
      case 70:
        c.Key.F.Pressed = !0;
        break;
      case 71:
        c.Key.G.Pressed = !0;
        break;
      case 72:
        c.Key.H.Pressed = !0;
        break;
      case 73:
        c.Key.I.Pressed = !0;
        break;
      case 74:
        c.Key.J.Pressed = !0;
        break;
      case 75:
        c.Key.K.Pressed = !0;
        break;
      case 76:
        c.Key.L.Pressed = !0;
        break;
      case 77:
        c.Key.M.Pressed = !0;
        break;
      case 78:
        c.Key.N.Pressed = !0;
        break;
      case 79:
        c.Key.O.Pressed = !0;
        break;
      case 80:
        c.Key.P.Pressed = !0;
        break;
      case 81:
        c.Key.Q.Pressed = !0;
        break;
      case 82:
        c.Key.R.Pressed = !0;
        break;
      case 83:
        c.Key.S.Pressed = !0;
        break;
      case 84:
        c.Key.T.Pressed = !0;
        break;
      case 85:
        c.Key.U.Pressed = !0;
        break;
      case 86:
        c.Key.V.Pressed = !0;
        break;
      case 87:
        c.Key.W.Pressed = !0;
        break;
      case 88:
        c.Key.X.Pressed = !0;
        break;
      case 89:
        c.Key.Y.Pressed = !0;
        break;
      case 90:
        c.Key.Z.Pressed = !0;
        break;
      case 17:
        c.Key.Control.Pressed = !0;
        break;
      case 16:
        c.Key.Shift.Pressed = !0;
        break;
      case 18:
        c.Key.Alt.Pressed = !0;
        break;
      case 9:
        c.Key.Tab.Pressed = !0;
        break;
      case 48:
        c.Key.Num0.Pressed = !0;
        break;
      case 49:
        c.Key.Num1.Pressed = !0;
        break;
      case 50:
        c.Key.Num2.Pressed = !0;
        break;
      case 51:
        c.Key.Num3.Pressed = !0;
        break;
      case 52:
        c.Key.Num4.Pressed = !0;
        break;
      case 53:
        c.Key.Num5.Pressed = !0;
        break;
      case 54:
        c.Key.Num6.Pressed = !0;
        break;
      case 55:
        c.Key.Num7.Pressed = !0;
        break;
      case 56:
        c.Key.Num8.Pressed = !0;
        break;
      case 57:
        c.Key.Num9.Pressed = !0;
        break;
      case 38:
        c.Key.Up.Pressed = !0;
        break;
      case 39:
        c.Key.Right.Pressed = !0;
        break;
      case 40:
        c.Key.Down.Pressed = !0;
        break;
      case 37:
        c.Key.Left.Pressed = !0;
        break;
      case 8:
        c.Key.Backspace.Pressed = !0;
        break;
      case 32:
        c.Key.Space.Pressed = !0;
        break;
      case 13:
        c.Key.Enter.Pressed = !0;
        break;
      case 27:
        c.Key.Esc.Pressed = !0;
        break;
      default:
        c.Key.KeyNotFound.Pressed = !0;
    }
    if (!a) {
      return b.preventDefault(), b.stopPropagation(), !1;
    }
  }, c = function(b) {
    var c = b.data.Input;
    c.Key.Event = b;
    c.Key.Symbol = b.key ? b.key : String.fromCharCode(b.which).toLowerCase();
    c.Key.AnyKey.Pressed = !1;
    c.Key.AnyKey.FramesPressed = 0;
    switch(b.which) {
      case 65:
        c.Key.A.Pressed = !1;
        c.Key.A.FramesPressed = 0;
        break;
      case 66:
        c.Key.B.Pressed = !1;
        c.Key.B.FramesPressed = 0;
        break;
      case 67:
        c.Key.C.Pressed = !1;
        c.Key.C.FramesPressed = 0;
        break;
      case 68:
        c.Key.D.Pressed = !1;
        c.Key.D.FramesPressed = 0;
        break;
      case 69:
        c.Key.E.Pressed = !1;
        c.Key.E.FramesPressed = 0;
        break;
      case 70:
        c.Key.F.Pressed = !1;
        c.Key.F.FramesPressed = 0;
        break;
      case 71:
        c.Key.G.Pressed = !1;
        c.Key.G.FramesPressed = 0;
        break;
      case 72:
        c.Key.H.Pressed = !1;
        c.Key.H.FramesPressed = 0;
        break;
      case 73:
        c.Key.I.Pressed = !1;
        c.Key.I.FramesPressed = 0;
        break;
      case 74:
        c.Key.J.Pressed = !1;
        c.Key.J.FramesPressed = 0;
        break;
      case 75:
        c.Key.K.Pressed = !1;
        c.Key.K.FramesPressed = 0;
        break;
      case 76:
        c.Key.L.Pressed = !1;
        c.Key.L.FramesPressed = 0;
        break;
      case 77:
        c.Key.M.Pressed = !1;
        c.Key.M.FramesPressed = 0;
        break;
      case 78:
        c.Key.N.Pressed = !1;
        c.Key.N.FramesPressed = 0;
        break;
      case 79:
        c.Key.O.Pressed = !1;
        c.Key.O.FramesPressed = 0;
        break;
      case 80:
        c.Key.P.Pressed = !1;
        c.Key.P.FramesPressed = 0;
        break;
      case 81:
        c.Key.Q.Pressed = !1;
        c.Key.Q.FramesPressed = 0;
        break;
      case 82:
        c.Key.R.Pressed = !1;
        c.Key.R.FramesPressed = 0;
        break;
      case 83:
        c.Key.S.Pressed = !1;
        c.Key.S.FramesPressed = 0;
        break;
      case 84:
        c.Key.T.Pressed = !1;
        c.Key.T.FramesPressed = 0;
        break;
      case 85:
        c.Key.U.Pressed = !1;
        c.Key.U.FramesPressed = 0;
        break;
      case 86:
        c.Key.V.Pressed = !1;
        c.Key.V.FramesPressed = 0;
        break;
      case 87:
        c.Key.W.Pressed = !1;
        c.Key.W.FramesPressed = 0;
        break;
      case 88:
        c.Key.X.Pressed = !1;
        c.Key.X.FramesPressed = 0;
        break;
      case 89:
        c.Key.Y.Pressed = !1;
        c.Key.Y.FramesPressed = 0;
        break;
      case 90:
        c.Key.Z.Pressed = !1;
        c.Key.Z.FramesPressed = 0;
        break;
      case 48:
        c.Key.Num0.Pressed = !1;
        c.Key.Num0.FramesPressed = 0;
        break;
      case 49:
        c.Key.Num1.Pressed = !1;
        c.Key.Num1.FramesPressed = 0;
        break;
      case 50:
        c.Key.Num2.Pressed = !1;
        c.Key.Num2.FramesPressed = 0;
        break;
      case 51:
        c.Key.Num3.Pressed = !1;
        c.Key.Num3.FramesPressed = 0;
        break;
      case 52:
        c.Key.Num4.Pressed = !1;
        c.Key.Num4.FramesPressed = 0;
        break;
      case 53:
        c.Key.Num5.Pressed = !1;
        c.Key.Num5.FramesPressed = 0;
        break;
      case 54:
        c.Key.Num6.Pressed = !1;
        c.Key.Num6.FramesPressed = 0;
        break;
      case 55:
        c.Key.Num7.Pressed = !1;
        c.Key.Num7.FramesPressed = 0;
        break;
      case 56:
        c.Key.Num8.Pressed = !1;
        c.Key.Num8.FramesPressed = 0;
        break;
      case 57:
        c.Key.Num9.Pressed = !1;
        c.Key.Num9.FramesPressed = 0;
        break;
      case 17:
        c.Key.Control.Pressed = !1;
        c.Key.Control.FramesPressed = 0;
        break;
      case 16:
        c.Key.Shift.Pressed = !1;
        c.Key.Shift.FramesPressed = 0;
        break;
      case 18:
        c.Key.Alt.Pressed = !1;
        c.Key.Alt.FramesPressed = 0;
        break;
      case 9:
        c.Key.Tab.Pressed = !1;
        c.Key.Tab.FramesPressed = 0;
        break;
      case 8:
        c.Key.Backspace.Pressed = !1;
        c.Key.Backspace.FramesPressed = 0;
        break;
      case 38:
        c.Key.Up.Pressed = !1;
        c.Key.Up.FramesPressed = 0;
        break;
      case 39:
        c.Key.Right.Pressed = !1;
        c.Key.Right.FramesPressed = 0;
        break;
      case 40:
        c.Key.Down.Pressed = !1;
        c.Key.Down.FramesPressed = 0;
        break;
      case 37:
        c.Key.Left.Pressed = !1;
        c.Key.Left.FramesPressed = 0;
        break;
      case 32:
        c.Key.Space.Pressed = !1;
        c.Key.Space.FramesPressed = 0;
        break;
      case 13:
        c.Key.Enter.Pressed = !1;
        c.Key.Enter.FramesPressed = 0;
        break;
      case 27:
        c.Key.Esc.Pressed = !1;
        c.Key.Esc.FramesPressed = 0;
        break;
      default:
        c.Key.KeyNotFound.Pressed = !1, c.Key.KeyNotFound.FramesPressed = 0;
    }
    if (!a) {
      return b.preventDefault(), b.stopPropagation(), !1;
    }
  };
  this.KeyDownEvent = $(document).keydown(this.Engine, b);
  this.KeyUpEvent = $(document).keyup(this.Engine, c);
  if (window.top != window.self) {
    try {
      this.ParentKeyDownEvent = $(window.parent.document).keydown(this.Engine, b), this.ParentKeyUpEvent = $(window.parent.document).keyup(this.Engine, c);
    } catch (d) {
    }
  }
}, RegisterMouseEvents:function(a) {
  this.MouseMoveEvent = $(document).mousemove(this.Engine, function(a) {
    a.data.Input.Mouse.EventObject = a;
  });
  this.MouseDownEvent = $(document).mousedown(this.Engine, function(a) {
    a.data.Input.Mouse.DownEvent = a;
    var b = a.data.Input.Mouse;
    1 == a.which && (b.Left.Down = !0, b.Left.Up = !1, b.Left.FramesUp = 0);
    3 == a.which && (b.Right.Down = !0, b.Right.Up = !1, b.Right.FramesUp = 0);
    a.preventDefault();
    a.stopPropagation();
    a.cancelBubble = !0;
  });
  this.MouseUpEvent = $(document).mouseup(this.Engine, function(a) {
    a.data.Input.Mouse.UpEvent = a;
    var b = a.data.Input.Mouse;
    1 == a.which && (b.Left.Down = !1, b.Left.Up = !0, b.Left.FramesDown = 0);
    3 == a.which && (b.Right.Down = !1, b.Right.Up = !0, b.Right.FramesDown = 0);
    a.preventDefault();
    a.stopPropagation();
    a.cancelBubble = !0;
  });
  this.MouseWheelEvent = $(window).bind("wheel", this, function(a) {
    var b = a.data;
    if (b.Canvas.MouseOn) {
      return b.MouseHandler.WheelHandler(a.originalEvent.deltaX, a.originalEvent.deltaY), a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation(), !1;
    }
  });
  a && (this.Engine.Canvas.oncontextmenu = function(a) {
    a.preventDefault();
    a.stopPropagation();
    a.cancelBubble = !0;
    return !1;
  });
}, RegisterResizeEvent:function() {
  this.ResizeEvent = $(window).resize(this.Engine, function(a) {
    a.data.Input.CalculateCanvasPosition();
    a.data.Engine.IsCanvasFitToScreen = !1;
  });
}, UnregisterKeyEvents:function() {
  this.KeyUpEvent && ($(document).unbind(this.KeyUpEvent), this.KeyUpEvent = "undefined");
  this.KeyDownEvent && ($(document).unbind(this.KeyDownEvent), this.KeyDownEvent = "undefined");
}, UnregisterMouseEvents:function() {
  this.MouseUpEvent && ($(document).unbind(this.MouseUpEvent), this.MouseUpEvent = "undefined");
  this.MouseDownEvent && ($(document).unbind(this.MouseDownEvent), this.MouseDownEvent = "undefined");
}, UnregisterResizeEvent:function() {
  this.ResizeEvent && ($(window).unbind(this.ResizeEvent), this.ResizeEvent = "undefined");
}, FakeMouseClick:function(a, b) {
  this.Engine.Input.Mouse.EventObject = {pageX:a, pageY:b, clientX:a, clientY:b, which:1};
  this.Engine.Input.Mouse.Left.Down = !0;
  this.Engine.Input.Mouse.Left.Up = !1;
  this.Engine.Input.Mouse.Left.FramesUp = 0;
  window.setTimeout(function() {
    this.Input.Mouse.EventObject = {pageX:a, pageY:b, clientX:a, clientY:b, which:1};
    this.Input.Mouse.Left.Down = !1;
    this.Input.Mouse.Left.Up = !0;
    this.Input.Mouse.Left.FramesDown = 0;
  }.bind(this.Engine), 300);
}};
Engine.prototype.Storage = {Pre:"AniBody_", BrowserAllowsLocalStorage:!1, Object:{}, ObjectString:"", Engine:!1, InitStorage:function() {
  this.IsLocalStorageAvailable() ? this.BrowserAllowsLocalStorage = !0 : this.BrowserAllowsLocalStorage = !1;
  if (this.BrowserAllowsLocalStorage) {
    var a = localStorage[this.Pre];
    this.ObjectString = a ? a : "{}";
  }
  3 > this.ObjectString.length ? this.Engine.HandleError({code:101, msg:"Storage is empty"}) : (a = this.ObjectString, this.Object = JSON.parse(a));
  $(window).unload(this.Engine, function(a) {
    a.data.Storage.WriteStorageToBrowser();
  });
}, IsLocalStorageAvailable:function() {
  var a = this.Pre + "test" + Date.now();
  try {
    return localStorage.setItem(a, a), localStorage.removeItem(a), !0;
  } catch (b) {
    return !1;
  }
}, Read:function(a) {
  var b = this.Object[a];
  if (b) {
    return b;
  }
  a = {code:404, msg:"Storage has no attribute called " + a};
  this.Engine.HandleError(a);
  return a;
}, Write:function(a, b) {
  this.Object[a] = b;
  this.ObjectString = JSON.stringify(this.Object);
  return b;
}, Delete:function(a) {
  if (0 === arguments.length) {
    this.Object = {}, this.ObjectString = "{}";
  } else {
    try {
      this.Object[a] = "undefined";
    } catch (b) {
      b = {code:403, msg:"Storage has no attribute called " + a}, this.Engine.HandleError(b);
    }
  }
}, WriteStorageToBrowser:function() {
  this.BrowserAllowsLocalStorage && (localStorage[this.Pre] = this.ObjectString);
}};
Engine.prototype.Font = {Default:"10px sans-serif", Type:{Arial:"Arial", Verdana:"Verdana", TimesNewRoman:"Times New Roman", CourierNew:"Courier New", serif:"serif", sans_serif:"sans-serif", BrowserSpecific:{Caption:"caption", Icon:"icon", Menu:"menu", MessageBox:"message-box", SmallCaption:"small-caption", StatusBar:"status-bar"}}, Variant:{normal:"normal", small_caps:"small-caps"}, Style:{normal:"normal", italic:"italic", oblique:"oblique"}, Weight:{normal:"normal", bold:"bold", bolder:"bolder", 
lighter:"lighter"}, getContextFontString:function() {
  if (0 == arguments.length) {
    return this.Default;
  }
  for (var a = "", b = 0; b < arguments.length; b++) {
    a = "number" == typeof arguments[b] ? a + (arguments[b] + "px ") : a + (arguments[b] + " ");
  }
  return a;
}, setContextFontString:function(a) {
  if (0 == arguments.length) {
    return !1;
  }
  1 == arguments.length && (a.font = this.Default);
  for (var b = "", c = 1; c < arguments.length; c++) {
    b = "number" == typeof arguments[c] ? b + (arguments[c] + "px ") : b + (arguments[c] + " ");
  }
  a.font = b;
}};
Engine.prototype.Print = function(a) {
  "undefined" === typeof a && (a = this.Canvas.toDataURL());
  $("body").append("<iframe style='display:none' name='testing__AniBody.Print' id='testing__AniBody__Print'><!DOCTYPE HTML><html><body></body></html></iframe>");
  window.frames.testing__AniBody__Print.contentDocument.write("<body><img src='{0}' onload='window.print()'</body>".format(a));
  window.setTimeout(function() {
    $("#testing__AniBody__Print").remove();
  }, 1000);
};
function HashTable(a) {
  this._lists = [];
  this._maxLists = a || 25;
}
HashTable.prototype._hashFunction = function(a) {
  if ("undefined" === typeof a) {
    throw {Message:"HashTable_Error: undefined key"};
  }
  "string" !== typeof a && (a = a.toString());
  for (var b = 0, c = 0; c < a.length; c++) {
    b += a.charCodeAt(c);
  }
  return b;
};
HashTable.prototype._getListNum = function(a) {
  return this._hashFunction(a) % this._maxLists;
};
HashTable.prototype.Set = function(a, b) {
  var c = this._getListNum(a);
  "undefined" === typeof this._lists[c] && (this._lists[c] = []);
  this._lists[c].push({key:a, value:b});
};
HashTable.prototype.Get = function(a) {
  var b = this._getListNum(a);
  if ("undefined" === typeof this._lists[b]) {
    throw {Message:"HashTable_Error: undefined list for key: " + a};
  }
  for (var c = 0; c < this._lists[b].length; c++) {
    if (a === this._lists[b][c].key) {
      return this._lists[b][c].value;
    }
  }
  throw {Message:"HashTable_Error: cannot find value for key: " + a};
};
HashTable.prototype.DebugGet = function(a) {
  var b = this._getListNum(a), c = {Messages:!1, key:a, value:!1, hashedKey:b};
  "undefined" === typeof this._lists[b] && (c.Messages = "HashTable_Error: undefined list for key: " + a);
  if (!c.Messages) {
    for (var d = 0; d < this._lists[b].length; d++) {
      a === this._lists[b][d].key && (c.value = this._lists[b][d].value);
    }
    !1 === c.value && (c.Messages = "HashTable_Error: cannot find value for key: " + a);
  }
  return c;
};
HashTable.prototype.GetDistribution = function() {
  for (var a = [], b = 0; b < this._lists.length; b++) {
    "undefined" === typeof this._lists[b] ? a.push("List " + b + " is empty") : 1 < this._lists[b].length ? a.push("List " + b + " has " + this._lists[b].length + " key/value-pairs") : a.push("List " + b + " has " + this._lists[b].length + " key/value-pair");
  }
  return a;
};
var Random = {GetNumberOld:function(a, b, c) {
  isNaN(a) && (a = 0);
  isNaN(b) && (b = Number && Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.pow(2, 53) - 1);
  isNaN(c) && (c = 0);
  var d = Math.random() * Math.pow(10, c + 6);
  a *= Math.pow(10, c);
  b *= Math.pow(10, c);
  return Math.round(d % (b - a + 1) + a) / Math.pow(10, c);
}, GetNumber:function(a, b, c) {
  if (window.crypto || window.crypto.getRandomValues) {
    return Random.GetNumberOld(a, b, c);
  }
  isNaN(a) && (a = 0);
  isNaN(b) && (b = Number && Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : Math.pow(2, 53) - 1);
  if ("undefined" === typeof c || isNaN(c)) {
    c = 0;
  }
  var d = new Uint32Array(3);
  window.crypto.getRandomValues(d);
  d = d[0] + d[1] + d[2];
  b *= Math.pow(10, c);
  a *= Math.pow(10, c);
  return d = (d % (b - a + 1) + a) / Math.pow(10, c);
}, GetTimestamp:function(a, b, c) {
  "undefined" === typeof c && (c = "s");
  a = Random.GetNumber(a, b);
  b = Date.now();
  if ("ms" === c || "mil" === c) {
    b -= a;
  }
  "s" === c && (b -= 1000 * a);
  "min" === c && (b -= 6E4 * a);
  "h" === c && (b -= 36E5 * a);
  "d" === c && (b -= 864E5 * a);
  "w" === c && (b -= 6048E5 * a);
  "y" === c && (b -= 31536E6 * a);
  return b;
}, DrawLot:function(a, b) {
  if (1 > arguments.length) {
    throw "ArgumentException: Too less arguments";
  }
  if (isNaN(a.length) || isNaN(b.length)) {
    throw "ArgumentException: Arguments need to be arrays";
  }
  if (a.length !== b.length) {
    throw "ArgumentException: Arrays need to be the same size";
  }
  var c, d = function(a) {
    a = a.toString();
    var b = a.indexOf(".");
    if (0 > b) {
      return 0;
    }
    a = a.substr(b + 1);
    return a.length;
  }, e = 0;
  for (c = 0; c < b.length; c++) {
    e = Math.max(e, d(b[c]));
  }
  for (c = d = 0; c < b.length; c++) {
    d += b[c];
  }
  e = Random.GetNumber(0, d, e);
  var f = d = 0;
  for (c = 0; c < a.length; c++) {
    f += b[c];
    if (e >= d && e < f) {
      return a[c];
    }
    d = f;
  }
  return a[a.length - 1];
}};
function Callback(a, b, c) {
  a["function"] ? (this.that = a.that, this["function"] = a["function"], this.parameters = [a.parameter]) : (this["function"] = b, this.that = a, this.parameters = [c]);
  this.OneParameter = !0;
  if (3 < arguments.length) {
    this.OneParameter = !1;
    for (var d = 3; d < arguments.length; d++) {
      this.parameters.push(arguments[d]);
    }
  }
}
Callback.prototype.Call = function() {
  this.OneParameter ? this["function"].call(this.that, this.parameters[0]) : this["function"].apply(this.that, this.parameters);
};
Callback.CallObject = function(a, b) {
  "object" === typeof a && "function" === typeof a["function"] && a["function"].call(a.that, a.parameter, b);
};
Callback.prototype.ToObject = function() {
  return {that:this.that, "function":this["function"], parameter:this.parameters};
};
function PriorityQueue(a) {
  this.heap = [];
  this._desc = !0;
  this.HighestPriority = 0;
  this.NoPriorityThenZero = a ? a : !1;
  this.Sorted = !1;
  this._refnums = this.length = 0;
}
PriorityQueue.prototype.Enqueue = function(a, b, c) {
  b && b > this.HighestPriority && (this.HighestPriority = b);
  b = this.NoPriorityThenZero ? b ? b : 0 : b || "number" == typeof b ? b : ++this.HighestPriority;
  this.Sorted = !1;
  this.length++;
  a = {data:a, priority:b, origin:"enqueued", refnum:this._refnums++, name:c};
  this.heap.push(a);
  return a.refnum;
};
PriorityQueue.prototype.DeleteByReferenceNumber = function(a) {
  for (var b = [], c = 0, d = 0; d < this.heap.length; d++) {
    this.heap[d].refnum !== a ? b.push(this.heap[d]) : c++;
  }
  this.heap = b;
  return c;
};
PriorityQueue.prototype.DeleteByName = function(a) {
  for (var b = [], c = 0, d = 0; d < this.heap.length; d++) {
    this.heap[d].name !== a ? b.push(this.heap[d]) : c++;
  }
  this.heap = b;
  return c;
};
PriorityQueue.prototype.ElementIsEnqueued = function(a) {
  for (var b = 0; b < this.heap.length; b++) {
    if (this.heap[b] == a) {
      return !0;
    }
  }
  return !1;
};
PriorityQueue.prototype.Dequeue = function() {
  return 0 < this.heap.length ? (this.length--, this.heap.shift().data) : !1;
};
PriorityQueue.prototype.isEmpty = function() {
  return 0 >= this.heap.length ? !0 : !1;
};
PriorityQueue.prototype.Sort = function(a) {
  this._desc = 0 >= arguments.length || a ? !0 : !1;
  this._quicksort(0, this.heap.length - 1);
  this.Sorted = !0;
};
PriorityQueue.prototype._comp = function(a, b) {
  return this._desc ? a.priority > b.priority : a.priority < b.priority;
};
PriorityQueue.prototype._swap = function(a, b) {
  var c = this.heap[a];
  this.heap[a] = this.heap[b];
  this.heap[b] = c;
};
PriorityQueue.prototype._quicksort = function(a, b) {
  if (a < b) {
    var c = this.heap[a + Math.floor((b - b) / 2)], d = a, e = b;
    do {
      for (; this._comp(this.heap[d], c);) {
        d += 1;
      }
      for (; this._comp(c, this.heap[e]);) {
        --e;
      }
      d <= e && (this._swap(d, e), d += 1, --e);
    } while (d <= e);
    this._quicksort(a, e);
    this._quicksort(d, b);
  }
};
PriorityQueue.prototype.FactorArray = function() {
  var a = [];
  this.Sorted || this.Sort(this._desc);
  for (var b = 0; b < this.heap.length; b++) {
    a.push(this.heap[b].data);
  }
  return a;
};
PriorityQueue.prototype.Merge = function(a) {
  this.Sorted = !1;
  for (var b = 0; b < a.heap.length; b++) {
    a.heap[b].origin = "merged", this.heap.push(a.heap[b]);
  }
  this.length = this.heap.length;
  this.HighestPriority < a.HighestPriority && (this.HighestPriority = a.HighestPriority);
};
PriorityQueue.prototype.DeleteMergedElements = function() {
  for (var a = [], b = 0, c = 0; c < this.heap.length; c++) {
    "merged" != this.heap[c].origin && (b < this.heap[c].priority && (b = this.heap[c].priority), a.push(this.heap[c]));
  }
  this.heap = a;
  this.HighestPriority = b;
  this.length = this.heap.length;
};
PriorityQueue.prototype.Flush = function() {
  this.heap = [];
  this.HighestPriority = 0;
  this.Sorted = !1;
  this.length = 0;
};
function Queue() {
  this.vals = [];
}
Queue.prototype.Enqueue = function(a) {
  return this.vals.push(a);
};
Queue.prototype.Dequeue = function() {
  return this.vals.shift();
};
Queue.prototype.isEmpty = function() {
  return 0 >= this.vals.length ? !0 : !1;
};
function Timer(a, b, c, d) {
  this.ref = a;
  this.Active = !1;
  this.internal = null;
  0 >= c && (c = 1);
  this.Milli = 1000 / c;
  this.Counter = 0;
  this.Total = d;
  this.HasLimit = !this.Total || 3 < arguments.length ? !0 : !1;
  this.Function = function(a) {
    a.Counter++;
    a.HasLimit && a.Counter > a.Total ? a.Stop() : b.call(a.ref, a.ref);
  };
}
Timer.prototype.Start = function() {
  this.Reset();
  this.internal = window.setInterval(this.Function, this.Milli, this);
  this.Active = !0;
};
Timer.prototype.Reset = function() {
  this.Counter = 0;
};
Timer.prototype.Stop = function() {
  this.Reset();
  window.clearInterval(this.internal);
  this.Active = !1;
};
Timer.prototype.Continue = function() {
  this.internal = window.setInterval(this.Function, this.Milli, this);
  this.Active = !0;
};
Timer.prototype.Pause = function() {
  window.clearInterval(this.internal);
  this.Active = !1;
};
Timer.prototype.SetTotal = function(a) {
  this.Total = a;
};
function Point(a, b) {
  this.X = a;
  this.Y = b;
}
function Counter() {
  EngineObject.call(this);
  this.Frames = 0;
  this.CounterFunctions = new PriorityQueue;
}
Counter.prototype = Object.create(EngineObject.prototype);
Counter.prototype.constructor = Counter;
Counter.prototype.Update = function() {
  this.Frames++;
  for (var a = this.CounterFunctions.heap, b, c = 0; c < a.length; c++) {
    b = a[c].data, b.that = b.that ? b.that : this.Engine, 0 == this.Frames % b.every && b["function"].call(b.that, b.parameter);
  }
};
Counter.prototype.AddCounterFunction = function(a, b, c) {
  return this.CounterFunctions.Enqueue(a, b, c);
};
Counter.prototype.AddCallbackObject = function(a, b, c, d) {
  a.every = b;
  return this.CounterFunctions.Enqueue(a, c, d);
};
Counter.prototype.RemoveCounterFunction = function(a) {
  this.CounterFunctions.DeleteByReferenceNumber(a);
};
window.ImageData.prototype.getPixel = function(a, b) {
  return {red:this.data[4 * (a + this.width * b) + 0], green:this.data[4 * (a + this.width * b) + 1], blue:this.data[4 * (a + this.width * b) + 2], alpha:this.data[4 * (a + this.width * b) + 3]};
};
window.ImageData.prototype.setPixel = function(a, b, c, d, e, f) {
  a = 4 * (a + this.width * b);
  this.data[a + 0] = c;
  this.data[a + 1] = d;
  this.data[a + 2] = e;
  this.data[a + 3] = f;
};
HTMLImageElement.prototype.ImageData = "undefined";
HTMLImageElement.prototype.getImageData = function() {
  var a = document.createElement("canvas");
  a.width = this.width;
  a.height = this.height;
  var b = a.getContext("2d");
  b.drawImage(this, 0, 0);
  return this.ImageData = b.getImageData(0, 0, a.width, a.height);
};
HTMLImageElement.prototype.getDataURL = function() {
  var a = document.createElement("canvas");
  a.width = this.width;
  a.height = this.height;
  a.getContext("2d").drawImage(this, 0, 0);
  return this.DataURL = a.toDataURL();
};
window.CanvasRenderingContext2D.prototype.circle = function(a, b, c, d, e) {
  if ("undefined" === typeof d || null == d) {
    d = !0;
  }
  if ("undefined" === typeof e || null == e) {
    e = !0;
  }
  d || (a += c, b += c);
  this.moveTo(a + c, b);
  e ? (this.arcTo(a + c, b + c, a, b + c, c), this.arcTo(a - c, b + c, a - c, b, c), this.arcTo(a - c, b - c, a, b - c, c), this.arcTo(a + c, b - c, a + c, b, c)) : (this.arcTo(a + c, b - c, a, b - c, c), this.arcTo(a - c, b - c, a - c, b, c), this.arcTo(a - c, b + c, a, b + c, c), this.arcTo(a + c, b + c, a + c, b, c));
};
window.CanvasRenderingContext2D.prototype.arrow2 = function(a, b, c, d, e, f, g, h) {
  if ("undefined" === typeof f || null === f) {
    f = 0.2;
  }
  if ("undefined" === typeof g || null === g) {
    g = 0.5;
  }
  if ("undefined" === typeof h || null === h) {
    h = !0;
  }
  var k = c - a, m = d - b, l = Math.pow(Math.pow(m, 2) + Math.pow(k, 2), 0.5);
  e = "undefined" === typeof e || null === e ? 0.25 * l : e / 2;
  g *= e;
  f = l * (1 - f);
  m = Math.atan2(m, k);
  0 > m && (m = (m + 2 * Math.PI) % (2 * Math.PI));
  l = m - Math.PI / 2;
  var p = m + Math.PI / 2;
  k = [];
  k[0] = {x:a, y:b};
  k[1] = {x:Math.cos(l) * g + k[0].x, y:Math.sin(l) * g + k[0].y};
  k[2] = {x:k[1].x + Math.cos(m) * f, y:k[1].y + Math.sin(m) * f};
  k[3] = {x:k[2].x + Math.cos(l) * e, y:k[2].y + Math.sin(l) * e};
  k[4] = {x:c, y:d};
  k[7] = {x:Math.cos(p) * g + k[0].x, y:Math.sin(p) * g + k[0].y};
  k[6] = {x:k[7].x + Math.cos(m) * f, y:k[7].y + Math.sin(m) * f};
  k[5] = {x:k[6].x + Math.cos(p) * e, y:k[6].y + Math.sin(p) * e};
  this.moveTo(k[0].x, k[0].y);
  if (h) {
    for (a = 1; a < k.length; a++) {
      this.lineTo(k[a].x, k[a].y);
    }
  } else {
    for (a = k.length - 1; 0 < a; a--) {
      this.lineTo(k[a].x, k[a].y);
    }
  }
  this.lineTo(k[0].x, k[0].y);
};
window.CanvasRenderingContext2D.prototype.arrow3 = function(a, b, c, d, e, f, g, h) {
  if ("undefined" === typeof f || null === f) {
    f = 0.2;
  }
  if ("undefined" === typeof g || null === g) {
    g = 0.5;
  }
  if ("undefined" === typeof h || null === h) {
    h = !0;
  }
  var k = c - a, m = d - b, l = Math.pow(Math.pow(m, 2) + Math.pow(k, 2), 0.5);
  if ("undefined" === typeof e || null === e) {
    e = 0.15 * l;
  }
  g *= e;
  e -= g;
  f = l * (1 - f);
  m = Math.atan2(m, k);
  0 > m && (m = (m + 2 * Math.PI) % (2 * Math.PI));
  l = m - Math.PI / 2;
  var p = m + Math.PI / 2;
  k = [];
  k[0] = {x:a, y:b};
  k[1] = {x:Math.cos(l) * g + k[0].x, y:Math.sin(l) * g + k[0].y};
  k[2] = {x:k[1].x + Math.cos(m) * f, y:k[1].y + Math.sin(m) * f};
  k[3] = {x:k[2].x + Math.cos(l) * e, y:k[2].y + Math.sin(l) * e};
  k[4] = {x:c, y:d};
  k[7] = {x:Math.cos(p) * g + k[0].x, y:Math.sin(p) * g + k[0].y};
  k[6] = {x:k[7].x + Math.cos(m) * f, y:k[7].y + Math.sin(m) * f};
  k[5] = {x:k[6].x + Math.cos(p) * e, y:k[6].y + Math.sin(p) * e};
  this.moveTo(k[0].x, k[0].y);
  if (h) {
    for (a = 1; a < k.length; a++) {
      this.lineTo(k[a].x, k[a].y);
    }
  } else {
    for (a = k.length - 1; 0 < a; a--) {
      this.lineTo(k[a].x, k[a].y);
    }
  }
  this.lineTo(k[0].x, k[0].y);
};
window.CanvasRenderingContext2D.prototype.fillArrow2 = function(a, b, c, d, e, f, g) {
  this.beginPath();
  this.arrow2(a, b, c, d, e, f, g);
  this.fill();
};
window.CanvasRenderingContext2D.prototype.arrow = function(a, b, c, d, e, f, g, h) {
  if ("undefined" === typeof f || null == f) {
    f = 0.2;
  }
  if ("undefined" === typeof g || null == g) {
    g = 0.5;
  }
  if ("undefined" === typeof h || null == h) {
    h = !0;
  }
  e = e * Math.PI / 180;
  g *= c;
  this.save();
  this.translate(a, b);
  this.rotate(e);
  this.moveTo(0, 0);
  h ? (this.lineTo(0, -g / 2), this.lineTo(d - d * f, -g / 2), this.lineTo(d - d * f, -c / 2), this.lineTo(d, 0), this.lineTo(d - d * f, c / 2), this.lineTo(d - d * f, g / 2), this.lineTo(0, g / 2)) : (this.lineTo(0, g / 2), this.lineTo(d - d * f, g / 2), this.lineTo(d - d * f, c / 2), this.lineTo(d, 0), this.lineTo(d - d * f, -c / 2), this.lineTo(d - d * f, -g / 2), this.lineTo(0, -g / 2));
  this.lineTo(0, 0);
  this.restore();
};
window.CanvasRenderingContext2D.prototype.fillArrow = function(a, b, c, d, e, f, g) {
  this.beginPath();
  this.arrow(a, b, c, d, e, f, g);
  this.fill();
};
window.CanvasRenderingContext2D.prototype.strokeArrow = function(a, b, c, d, e, f, g) {
  this.beginPath();
  this.arrow(a, b, c, d, e, f, g);
  this.stroke();
};
window.CanvasRenderingContext2D.prototype.fillCircle = function(a, b, c, d) {
  this.beginPath();
  this.circle(a, b, c, d);
  this.fill();
  this.closePath();
};
window.CanvasRenderingContext2D.prototype.strokeCircle = function(a, b, c, d) {
  this.beginPath();
  this.circle(a, b, c, d);
  this.stroke();
  this.closePath();
};
window.CanvasRenderingContext2D.prototype.variousRoundedRect = function(a, b, c, d, e, f, g, h) {
  6 > arguments.length && (f = e);
  7 > arguments.length && (g = e);
  8 > arguments.length && (h = e);
  this.moveTo(a + e, b);
  this.lineTo(a + c - f, b);
  this.bezierCurveTo(a + c, b, a + c, b + f, a + c, b + f);
  this.lineTo(a + c, b + d - g);
  this.bezierCurveTo(a + c, b + d, a + c - g, b + d, a + c - g, b + d);
  this.lineTo(a + h, b + d);
  this.bezierCurveTo(a, b + d, a, b + d - h, a, b + d - h);
  this.lineTo(a, b + e);
  this.bezierCurveTo(a, b, a + e, b, a + e, b);
};
window.CanvasRenderingContext2D.prototype.fillVariousRoundedRect = function(a, b, c, d, e, f, g, h) {
  6 > arguments.length && (f = e);
  7 > arguments.length && (g = e);
  8 > arguments.length && (h = e);
  this.beginPath();
  this.variousRoundedRect(a, b, c, d, e, f, g, h);
  this.fill();
  this.closePath();
};
window.CanvasRenderingContext2D.prototype.strokeVariousRoundedRect = function(a, b, c, d, e, f, g, h) {
  6 > arguments.length && (f = e);
  7 > arguments.length && (g = e);
  8 > arguments.length && (h = e);
  this.beginPath();
  this.variousRoundedRect(a, b, c, d, e, f, g, h);
  this.stroke();
  this.closePath();
};
window.CanvasRenderingContext2D.prototype.drawRoundedImage = function(a, b, c, d, e, f) {
  this.save();
  this.beginPath();
  this.moveTo(b + f, c);
  this.lineTo(b + a.width - f, c);
  this.bezierCurveTo(b + d, c, b + d, c + f, b + d, c + f);
  this.lineTo(b + d, c + d - f);
  this.bezierCurveTo(b + d, c + e, b + e - f, c + e, b + d - f, c + e);
  this.lineTo(b + f, c + e);
  this.bezierCurveTo(b, c + e, b, c + e - f, b, c + e - f);
  this.lineTo(b, c + f);
  this.bezierCurveTo(b, c, b + f, c, b + f, c);
  this.closePath();
  this.clip();
  this.drawImage(a, b, c, d, e);
  this.restore();
  return {x:b, y:c, width:d, height:e};
};
window.CanvasRenderingContext2D.prototype.fillSpinnedText = function(a, b, c, d) {
  this.save();
  d = d * Math.PI / 180;
  this.textAlign = "center";
  this.textBaseline = "middle";
  this.translate(a, b);
  this.rotate(d);
  this.fillText(c, 0, 0);
  this.restore();
};
window.CanvasRenderingContext2D.prototype.strokeSpinnedText = function(a, b, c, d) {
  this.save();
  d = d * Math.PI / 180;
  this.textAlign = "center";
  this.textBaseline = "middle";
  this.translate(a, b);
  this.rotate(d);
  this.strokeText(c, 0, 0);
  this.restore();
};
window.CanvasRenderingContext2D.prototype.drawCross = function(a, b, c) {
  this.save();
  c /= 2;
  this.beginPath();
  this.moveTo(a - c, b + c);
  this.lineTo(a + c, b - c);
  this.moveTo(a - c, b - c);
  this.lineTo(a + c, b + c);
  this.stroke();
  this.restore();
};
window.CanvasRenderingContext2D.prototype.cross = function(a, b, c, d) {
  this.save();
  "undefined" === typeof d && (d = Math.round(c / 5));
  var e = 45 * Math.PI / 180, f = 270 * Math.PI / 180;
  this.translate(a, b);
  this.rotate(e);
  this.rect(-c / 2, -d / 2, c, d);
  this.rotate(f);
  this.rect(-c / 2, -d / 2, c, d);
  this.restore();
};
window.CanvasRenderingContext2D.prototype.setFontHeight = function(a, b) {
  "string" !== typeof b && (b = "px");
  this.font = this.font.replace(/[0-9]+[a-z]{2}/, a + b);
};
window.CanvasRenderingContext2D.prototype.getColor = function(a, b) {
  if ("string" !== typeof a) {
    return "rgba(0,0,0,0)";
  }
  if ("undefined" === typeof b || 0 > b && 1 < b) {
    b = 1;
  }
  var c = document.createElement("CANVAS");
  c.width = 1;
  c.height = 1;
  c = c.getContext("2d");
  c.fillStyle = a;
  c.fillRect(0, 0, 1, 1);
  c = c.getImageData(0, 0, 1, 1).data;
  return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + b + ")";
};
window.CanvasRenderingContext2D.prototype.setStyle = function(a, b, c, d) {
  "undefined" === typeof c && (c = !0);
  "undefined" === typeof d && (d = !0);
  a && null != a || (a = c ? this.fillStyle : this.strokeStyle);
  a = this.getColor(a, b);
  c && (this.fillStyle = a);
  d && (this.strokeStyle = a);
  return a;
};
String.prototype.format = function() {
  for (var a = this, b, c = 0; c < arguments.length; c++) {
    b = new RegExp("\\{" + c + "\\}", "gm"), a = a.replace(b, arguments[c]);
  }
  return a;
};
String.prototype.decodeURI = function() {
  var a = RegExp("\\{ae\\}", "gm");
  var b = this.replace(a, "%C3%A4");
  a = RegExp("\\{oe\\}", "gm");
  b = b.replace(a, "%C3%B6");
  a = RegExp("\\{ue\\}", "gm");
  b = b.replace(a, "%C3%BC");
  a = RegExp("\\{Ae\\}", "gm");
  b = b.replace(a, "%C3%84");
  a = RegExp("\\{Oe\\}", "gm");
  b = b.replace(a, "%C3%96");
  a = RegExp("\\{Ue\\}", "gm");
  b = b.replace(a, "%C3%9C");
  a = RegExp("\\{ss\\}", "gm");
  b = b.replace(a, "%C3%9F");
  a = RegExp("\\{grad\\}", "gm");
  b = b.replace(a, "%C2%B0");
  return decodeURI(b);
};
String.UTF8 = {Greek:{alpha:decodeURI("%CE%B1"), beta:decodeURI("%CE%B2"), gamma:decodeURI("%CE%B3"), delta:decodeURI("%CE%B4"), epsilon:decodeURI("%CE%B5"), theta:decodeURI("%CE%B8"), lamda:decodeURI("%CE%BB"), mu:decodeURI("%CE%BC"), pi:decodeURI("%CF%80"), rho:decodeURI("%CF%81"), sigma:decodeURI("%CF%83"), phi:decodeURI("%CF%86"), chi:decodeURI("%CF%87"), psi:decodeURI("%CF%88"), omega:decodeURI("%CF%89"), Gamma:decodeURI("%CE%93"), Delta:decodeURI("%CE%94"), Epsilon:decodeURI("%CE%95"), Theta:decodeURI("%CE%98"), 
Lamda:decodeURI("%CE%9B"), Pi:decodeURI("%CE%A0"), Sigma:decodeURI("%CE%A3"), Phi:decodeURI("%CE%A6"), Psi:decodeURI("%CE%A8"), Omega:decodeURI("%CE%A9")}, German:{ae:decodeURI("%C3%A4"), oe:decodeURI("%C3%B6"), ue:decodeURI("%C3%BC"), Ae:decodeURI("%C3%84"), Oe:decodeURI("%C3%96"), Ue:decodeURI("%C3%9C"), ss:decodeURI("%C3%9F")}, Math:{Division:decodeURI("%C3%B7"), PlusMinus:decodeURI("%C2%B1"), Degree:decodeURI("%C2%B0"), Not:decodeURI("%C2%AC")}, Subscript:{Zero:decodeURI("%E2%82%80"), One:decodeURI("%E2%82%81"), 
Two:decodeURI("%E2%82%82"), Three:decodeURI("%E2%82%83"), Four:decodeURI("%E2%82%84"), Five:decodeURI("%E2%82%85"), Six:decodeURI("%E2%82%86"), Seven:decodeURI("%E2%82%87"), Eight:decodeURI("%E2%82%88"), Nine:decodeURI("%E2%82%89")}, List:{CheckedBallot:decodeURI("%E2%98%91"), UncheckedBallot:decodeURI("%E2%98%90"), CancellationX:decodeURI("%F0%9F%97%99")}, Random:{Unicorn:decodeURI("%F0%9F%A6%84")}};
String._downloadUTF8Table = function() {
  var a = 0, b = 0, c;
  for (e in String.UTF8) {
    for (c in a++, String.UTF8[e]) {
      b++;
    }
  }
  b = 16 * b + 2 * b + 18 * a + 4 * a + 20;
  a = document.createElement("CANVAS");
  a.width = 300;
  a.height = b;
  b = a.getContext("2d");
  var d = 0;
  b.textBaseline = "top";
  b.fillStyle = "white";
  b.fillRect(0, 0, b.canvas.width, b.canvas.height);
  b.fillStyle = "black";
  b.font = "18px bold sans-serif";
  b.fillText("(object) String.UTF8", 5, d);
  d += 24;
  for (e in String.UTF8) {
    b.font = "16px sans-serif";
    b.fillText(e, 5, d);
    d += 18;
    b.font = "14px sans-serif";
    for (c in String.UTF8[e]) {
      b.fillText(c + " : " + String.UTF8[e][c], 25, d), d += 18;
    }
    d += 4;
  }
  var e = a.toDataURL();
  (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(b, c) {
      a.href = b;
      a.download = c;
      a.click();
      window.URL.revokeObjectURL(b);
    };
  })()(e, "String_UTF8.png");
};
String.prototype.decodeHTML = function() {
  var a = RegExp("\\{ae\\}", "gm");
  var b = this.replace(a, "&auml;");
  a = RegExp("\\{oe\\}", "gm");
  b = b.replace(a, "&ouml;");
  a = RegExp("\\{ue\\}", "gm");
  b = b.replace(a, "&uuml;");
  a = RegExp("\\{Ae\\}", "gm");
  b = b.replace(a, "&Auml;");
  a = RegExp("\\{Oe\\}", "gm");
  b = b.replace(a, "&Ouml;");
  a = RegExp("\\{Ue\\}", "gm");
  b = b.replace(a, "&Uuml;");
  a = RegExp("\\{ss\\}", "gm");
  return b = b.replace(a, "&szlig;");
};
String.prototype.getKeyByEvent = String.getKeyByEvent = function(a) {
  var b = a.charCode || a.keyCode;
  if (!(16 <= b && 18 >= b)) {
    var c = "", d = a.altKey, e = a.ctrlKey;
    a = a.shiftKey;
    var f = !0, g = !0, h = !1, k = !1;
    48 <= b && 57 >= b && (h = !0, f = k = !1);
    65 <= b && 90 >= b && (h = !1, k = !0, f = !1);
    97 <= b && 122 >= b && (h = !1, g = !0, f = !1, k = !0);
    a || (g = !0, k && (b += 32));
    if (d || e) {
      f = !0;
    }
    f || (c = String.fromCharCode(b));
    console.log("code: " + b, "alt: " + d, "shift: " + a, "control: " + e, "result: '" + c + "'", "letter: " + k, "lowercase: " + g, "number: " + h, "other: " + f);
    return c;
  }
};
Array.prototype.shuffle = function(a) {
  var b;
  a = a || 5 * this.length;
  for (var c = 0; c < a; c++) {
    var d = Math.round(Math.random() * (this.length - 1)) % this.length;
    var e = b = Math.round(Math.random() * (this.length - 1)) % this.length;
    b = this[d];
    this[d] = this[e];
    this[e] = b;
  }
};
Array.prototype["delete"] = function(a) {
  var b;
  if (!(a >= this.length || 0 > a || isNaN(a))) {
    a = Math.floor(a);
    if (a + 1 === this.length) {
      return this.pop();
    }
    for (b = this[a]; a < this.length - 1; a++) {
      this[a] = this[a + 1];
    }
    this.pop();
    return b;
  }
};
Array.prototype.isElement = function(a) {
  for (var b = 0; b < this.length; b++) {
    if (this[b] === a) {
      return !0;
    }
  }
  return !1;
};
Array.prototype.getIndex = function(a) {
  for (var b = 0; b < this.length; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
Function.prototype.getCallbackObject = function(a, b) {
  return {that:a, "function":this, parameter:b};
};
function createImageWithNN(a, b, c, d) {
  b = 0 < b ? b : 2;
  a = a.getImageData(0, 0, c, d);
  var e = document.createElement("CANVAS");
  e.width = c * b;
  e.height = d * b;
  var f = e.getContext("2d"), g = f.getImageData(0, 0, c * b, d * b), h, k, m, l, p = c * b;
  for (h = 0; h < c; ++h) {
    for (m = 0; m < d; ++m) {
      var n = 4 * (m * c + h);
      var t = a.data[n + 0];
      var q = a.data[n + 1];
      var u = a.data[n + 2];
      n = a.data[n + 3];
      for (k = 0; k < b; k++) {
        for (l = 0; l < b; l++) {
          var r = h * b + k;
          var v = m * b + l;
          r = 4 * (v * p + r);
          g.data[r + 0] = t;
          g.data[r + 1] = q;
          g.data[r + 2] = u;
          g.data[r + 3] = n;
        }
      }
    }
  }
  f.putImageData(g, 0, 0);
  b = e.toDataURL();
  c = document.createElement("IMG");
  c.src = b;
  return c;
}
function createImageNN(a, b) {
  b = 0 < b ? parseInt(b) : 2;
  var c = a.getContext("2d"), d = a.width, e = a.height;
  c = c.getImageData(0, 0, d, e);
  var f = document.createElement("CANVAS");
  f.width = d * b;
  f.height = e * b;
  var g = f.getContext("2d"), h = g.getImageData(0, 0, d * b, e * b), k, m, l, p, n = d * b;
  for (k = 0; k < d; ++k) {
    for (l = 0; l < e; ++l) {
      var t = 4 * (l * d + k);
      var q = c.data[t + 0];
      var u = c.data[t + 1];
      var r = c.data[t + 2];
      t = c.data[t + 3];
      for (m = 0; m < b; m++) {
        for (p = 0; p < b; p++) {
          var v = k * b + m;
          var A = l * b + p;
          v = 4 * (A * n + v);
          h.data[v + 0] = q;
          h.data[v + 1] = u;
          h.data[v + 2] = r;
          h.data[v + 3] = t;
        }
      }
    }
  }
  g.putImageData(h, 0, 0);
  d = f.toDataURL();
  e = document.createElement("IMG");
  e.src = d;
  return e;
}
Date.now || (Date.now = function() {
  return (new Date).getTime();
});
function createImageWithFittedText(a, b, c, d, e, f, g, h) {
  "string" === typeof c && (c = [c]);
  g = g || "black";
  d = d + 1 || 25;
  h = h || "10px sans-serif";
  "undefined" === typeof e && (e = 5);
  "undefined" === typeof f && (f = 3);
  var k = document.createElement("CANVAS");
  k.width = a;
  k.height = b;
  var m = k.getContext("2d");
  m.font = h;
  m.setFontHeight(d);
  k = [];
  for (h = 0; h < c.length; h++) {
    var l = c[h].split(" ");
    for (var p = 0; p < l.length; p++) {
      k.push(l[p]);
    }
    h < c.length - 1 && k.push("\\n");
  }
  for (c = b + 1; c > b;) {
    d--;
    m.setFontHeight(d);
    c = m.measureText(" ").width;
    l = [];
    for (h = 0; h < k.length; h++) {
      "\\n" !== k[h] ? l.push(m.measureText(k[h]).width) : l.push(0);
    }
    var n = [], t = [];
    n.push("");
    t.push(0);
    for (h = 0; h < k.length; h++) {
      "\\n" === k[h] ? (h++, n.push(k[h] + " "), t.push(0 + l[h] + c)) : t[n.length - 1] + l[h] + c < a - 2 * e ? (n[n.length - 1] += k[h] + " ", t[n.length - 1] += l[h] + c) : (n[n.length - 1] = n[n.length - 1].substr(0, n[n.length - 1].length - 1), t[n.length - 1] -= c, n.push(k[h] + " "), t.push(l[h] + c));
    }
    n[n.length - 1] = n[n.length - 1].substr(0, n[n.length - 1].length - 1);
    c = 2 * e + d * n.length + f * n.length - 1;
  }
  for (h = m = 0; h < n.length; h++) {
    t[h] > m && (m = t[h]);
  }
  k = document.createElement("CANVAS");
  k.width = m + 2 * e;
  k.height = c;
  m = k.getContext("2d");
  m.setFontHeight(d);
  m.textAlign = "left";
  m.textBaseline = "top";
  m.fillStyle = g;
  g = e;
  for (h = 0; h < n.length; h++) {
    m.fillText(n[h], g, e), e += d + f;
  }
  f = k.toDataURL();
  n = document.createElement("IMG");
  n.src = f;
  return n;
}
function getClass(a) {
  a = a.constructor.toString();
  var b = a.indexOf("function "), c = a.indexOf("(");
  0 == b && (a = a.substr(9, c - 9));
  return "CLASS::" + a;
}
function getRGBA(a, b, c) {
  if ("string" !== typeof a) {
    return !1;
  }
  if ("undefined" === typeof b || 0 > b && 1 < b) {
    b = 1;
  }
  "undefined" === typeof c && isNaN(c) && (c = 0);
  var d = document.createElement("CANVAS");
  d.width = 1;
  d.height = 1;
  d = d.getContext("2d");
  d.fillStyle = a;
  d.fillRect(0, 0, 1, 1);
  a = d.getImageData(0, 0, 1, 1).data;
  a[0] += 255 * c;
  255 < a[0] && (a[0] = 255);
  0 > a[0] && (a[0] = 0);
  a[1] += 255 * c;
  255 < a[1] && (a[1] = 255);
  0 > a[1] && (a[1] = 0);
  a[2] += 255 * c;
  255 < a[2] && (a[2] = 255);
  0 > a[2] && (a[2] = 0);
  return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + b + ")";
}
function buttonLayout(a, b, c) {
  var d = a.rounding;
  "undefined" === typeof d && (d = 0);
  var e = a.width, f = a.height;
  if ("undefined" === typeof c || 0 >= c.length) {
    c = [{stop:1, color:"black"}];
  }
  a = b + d;
  var g = b + d, h = b + d, k = e - 2 * (b + d), m = h + k, l = b + d, p = b + d, n = b + d, t = f - 2 * (b + d), q = b + d, u = 0 + b, r = e - 2 * (b + d), v = f - 2 * b, A = e - b, H = b + d, G = f - 2 * (b + d), x = f - b - d, E = b + d, I = b + d, y = b + d, z = f - b, w = e - 2 * (b + d), B = y + w, F = f - b - d, J = b + d, K = b + d, C = b / g;
  c = c.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var D = document.createElement("CANVAS");
  D.width = e;
  D.height = f;
  e = D.getContext("2d");
  e.fillStyle = c[c.length - 1].color;
  e.fillRect(q, u, r, v);
  e.fillRect(0 + b, n, b, b);
  e.fillRect(q + r, n, b, b);
  u = e.createLinearGradient(h, 0, h, b);
  for (q = 0; q < c.length; q++) {
    u.addColorStop(c[q].stop, c[q].color);
  }
  e.fillStyle = u;
  e.fillRect(h, 0, k, b);
  u = e.createLinearGradient(y, z + b, y, z);
  for (q = 0; q < c.length; q++) {
    u.addColorStop(c[q].stop, c[q].color);
  }
  e.fillStyle = u;
  e.fillRect(y, z, w, b);
  u = e.createLinearGradient(0, n, 0 + b, n);
  for (q = 0; q < c.length; q++) {
    u.addColorStop(c[q].stop, c[q].color);
  }
  e.fillStyle = u;
  e.fillRect(0, n, b, t);
  u = e.createLinearGradient(A + b, H, A, H);
  for (q = 0; q < c.length; q++) {
    u.addColorStop(c[q].stop, c[q].color);
  }
  e.fillStyle = u;
  e.fillRect(A, H, b, G);
  h = e.createRadialGradient(0 + a, 0 + g, b + d, 0 + a, 0 + g, 0);
  for (q = 0; q < c.length; q++) {
    h.addColorStop(c[q].stop * C, c[q].color);
  }
  e.fillStyle = h;
  e.beginPath();
  e.moveTo(0 + a, 0 + g);
  e.lineTo(0, 0 + g);
  e.arcTo(0, 0, 0 + a, 0, a);
  e.closePath();
  e.fill();
  h = e.createRadialGradient(m, 0 + p, b + d, m, 0 + p, 0);
  for (q = 0; q < c.length; q++) {
    h.addColorStop(c[q].stop * C, c[q].color);
  }
  e.fillStyle = h;
  e.beginPath();
  e.moveTo(m, 0 + p);
  e.lineTo(m + l, 0 + p);
  e.arcTo(m + l, 0, m, 0, l);
  e.closePath();
  e.fill();
  h = e.createRadialGradient(0 + E, x, b + d, 0 + E, x, 0);
  for (q = 0; q < c.length; q++) {
    h.addColorStop(c[q].stop * C, c[q].color);
  }
  e.fillStyle = h;
  e.beginPath();
  e.moveTo(0 + E, x);
  e.lineTo(0, x);
  e.arcTo(0, x + I, 0 + E, x + I, E);
  e.closePath();
  e.fill();
  h = e.createRadialGradient(B, F, b + d, B, F, 0);
  for (q = 0; q < c.length; q++) {
    h.addColorStop(c[q].stop * C, c[q].color);
  }
  e.fillStyle = h;
  e.beginPath();
  e.moveTo(B, F);
  e.lineTo(B + J, F);
  e.arcTo(B + J, F + K, B, F + K, J);
  e.closePath();
  e.fill();
  b = D.toDataURL();
  c = document.createElement("IMG");
  c.src = b;
  return c;
}
function forceRange(a, b, c, d) {
  if (2 > arguments.length) {
    throw "No attribute defined as argument";
  }
  isNaN(c) && (c = 0);
  isNaN(d) && (d = 100);
  a[b] < c && (a[b] = c);
  a[b] > d && (a[b] = d);
}
function MultiFlow(a, b, c, d, e, f) {
  this.Object = a;
  this.AttributeString = b;
  this.TargetValue = c;
  this.Duration = d;
  this.CallbackObject = e;
  this.AfterEveryFrameObject = f;
  this.FPS = 25;
  this.Frames = 0;
  this.StartValue = [];
  this.Difference = [];
  this.Step = [];
  this.ref = null;
  this.TargetIsSmaller = [];
  this.TargetReached = [];
}
MultiFlow.prototype.Start = function() {
  for (var a = this.Duration / 1000 * this.FPS, b, c, d = 0; d < this.Object.length; d++) {
    b = this.Object[d], c = this.AttributeString[d], this.StartValue[d] = b[c], this.Difference[d] = this.TargetValue[d] - this.StartValue[d], this.TargetIsSmaller[d] = 0 > this.Difference[d] ? !0 : !1, this.Step[d] = this.Difference[d] / a, this.TargetReached[d] = !1;
  }
  this.ref = setInterval(function(a) {
    for (var b, c, d = a.AfterEveryFrameObject, e = a.CallbackObject, m = 0; m < a.Object.length; m++) {
      b = a.Object[m], c = a.AttributeString[m], b[c] += a.Step[m], d && d["function"].call(d.that, d.parameter), a.TargetIsSmaller[m] ? b[c] <= a.TargetValue[m] && (b[c] = a.TargetValue[m], a.TargetReached[m] = !0) : b[c] >= a.TargetValue[m] && (b[c] = a.TargetValue[m], a.TargetReached[m] = !0);
    }
    a._allReached() && (clearInterval(a.ref), "undefined" !== typeof e && "function" === typeof e["function"] && e["function"].call(e.that, e.parameter));
  }, 1000 / this.FPS, this);
};
MultiFlow.prototype._allReached = function() {
  for (var a = 0; a < this.Object.length; a++) {
    if (!this.TargetReached[a]) {
      return !1;
    }
  }
  return !0;
};
function Flow(a, b, c, d, e, f) {
  this.Object = a;
  this.AttributeString = b;
  this.TargetValue = c;
  this.Duration = d;
  this.CallbackObject = e;
  this.AfterEveryFrameObject = f;
  this.FPS = 25;
  this.Frames = 0;
  this.StartValue;
  this.Difference;
  this.ref = null;
  this.TargetIsSmaller = !1;
}
Flow.prototype.Start = function() {
  this.StartValue = this.Object[this.AttributeString];
  this.Difference = this.TargetValue - this.StartValue;
  0 > this.Difference && (this.TargetIsSmaller = !0);
  this.Step = this.Difference / (this.Duration / 1000 * this.FPS);
  this.ref = setInterval(function(a, b, c, d) {
    a[b] += c;
    (c = d.AfterEveryFrameObject) && c["function"].call(c.that, c.parameter);
    d.TargetIsSmaller ? a[b] <= d.TargetValue && (a[b] = d.TargetValue, clearInterval(d.ref), a = d.CallbackObject, "undefined" !== typeof a && "function" === typeof a["function"] && a["function"].call(a.that, a.parameter)) : a[b] >= d.TargetValue && (a[b] = d.TargetValue, clearInterval(d.ref), a = d.CallbackObject, "undefined" !== typeof a && "function" === typeof a["function"] && a["function"].call(a.that, a.parameter));
  }, 1000 / this.FPS, this.Object, this.AttributeString, this.Step, this);
};
function Gallery(a, b, c, d, e, f) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.Height = d;
  this.TitleHeight = f || 20;
  this.TitleRounding = this.TitleHeight / 4;
  this.DisplayHeight = this.Height - 2 * this.TitleHeight;
  this.OffsetX = this.ItemsWidth = 0;
  this.Title = e || "Galerie";
  this._minimized = !1;
  this.PreItemUpdateCBO = {that:this, "function":function(a, b, c) {
  }, parameter:{}};
  this.Items = [];
  this.PostItemUpdateCBO = {that:this, "function":function(a, b, c) {
  }, parameter:{}};
  this.HandleHeight = 20;
  this.Fac = 0;
  this.Handle = {x:this.X, y:this.Y + this.Height - this.TitleHeight, width:this.Width, height:this.TitleHeight};
  this.HandleRounding = 4;
  this._framesAfterDragging = 0;
  this.Draggable = !0;
  this.IsMouseOverDisplay = this.IsMouseOverMinimize = this.IsMouseOverClose = this.IsMouseOverHandle = this.IsMouseOverTitle = this.IsMouseOver = this._scrolling = this._dragging = !1;
  this.TrueClosing = !0;
  this.TrulyClosed = this.Closed = !1;
  this.PositionBeforeClosing = {x:0, y:0};
  this._ref_W = this._ref_PIF = this._ref = null;
  this.Initialize();
}
Gallery.prototype = Object.create(ABO.prototype);
Gallery.prototype.constructor = Gallery;
Gallery.prototype.TitleColor = "#ddd";
Gallery.prototype.Color = "#eee";
Gallery.prototype.HandleColor = "#999";
Gallery.prototype.Initialize = function() {
  this.AddProcessInputFunction();
  this.AddMouseHandler();
};
Gallery.prototype.SetDraggable = function(a) {
  this.Draggable !== a && (this.Draggable = this.Draggable ? !1 : !0);
};
Gallery.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOverMinimize && (1 < this._framesAfterDragging && this.ClickOnMinimize(), a.GoThrough = !1);
    this.IsMouseOverClose && (1 < this._framesAfterDragging && this.ClickOnClose(), a.GoThrough = !1);
  }}, 100);
  this._ref_W = this.Engine.Input.MouseHandler.AddMouseHandler("wheel", {parameter:this.Engine, that:this, "function":function(a, b) {
    if (this.IsMouseOver) {
      var c = {X:a.Delta.Y, Y:a.Delta.X};
      this._scrolling = !0;
      this.UpdateHandle(c);
      a.GoThrough = !1;
    }
  }}, 100);
};
Gallery.prototype.AddProcessInputFunction = function() {
  this._ref_PIF = this.Engine.AddProcessInputFunction({parameter:this.Engine, that:this, "function":function(a) {
    a = a.Input.Mouse;
    this.IsMouseOverHandle && a.Left.Down && (this._scrolling = !0);
    this.Draggable && this.IsMouseOverTitle && a.Left.Down && (this._dragging = !0);
    a.Left.Up && (this._dragging = this._scrolling = !1);
  }}, 5);
};
Gallery.prototype.RemoveMouseHandler = function() {
  null != this._ref && (this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref), this._ref = null);
};
Gallery.prototype.RemoveProcessInputFunction = function() {
  null != this._ref_PIF && (this.Engine.RemoveProcessInputFunction(this._ref_PIF), this._ref_PIF = null);
};
Gallery.prototype.Draw = function(a) {
  a.save();
  a.fillStyle = this.TitleColor;
  a.fillVariousRoundedRect(this.X, this.Y, this.Width, this.TitleHeight, this.TitleRounding, this.TitleRounding, 0, 0);
  this.Draggable && this.IsMouseOverTitle && (a.fillStyle = "rgba(0,0,0,0.2)", a.fillVariousRoundedRect(this.X, this.Y, this.Width - 10 - 2 * this.TitleHeight, this.TitleHeight, 5, 0, 0, 0));
  var b = this.TitleHeight / 5, c = this.X + this.Width - 5 - this.TitleHeight + b, d = this.Y + b, e = this.TitleHeight - 2 * b, f = this.TitleHeight - 2 * b;
  this.Draggable && (a.strokeStyle = "black", a.beginPath(), a.moveTo(c, d), a.lineTo(c + e, d + f), a.moveTo(c, d + f), a.lineTo(c + e, d), a.stroke(), a.closePath(), this.IsMouseOverClose && (a.fillStyle = "rgba(0,0,0,0.2)", a.fillRect(c - b, d - b, e + 2 * b, f + 2 * b)), c -= this.TitleHeight + 5, this._minimized ? a.strokeRect(c, d, e, f) : (a.beginPath(), a.moveTo(c, d + f - 0.15 * this.TitleHeight), a.lineTo(c + e, d + f - 0.15 * this.TitleHeight), a.stroke(), a.closePath()), this.IsMouseOverMinimize && 
  (a.fillStyle = "rgba(0,0,0,0.2)", a.fillRect(c - b, d - b, e + 2 * b, f + 2 * b)));
  a.textAlign = "left";
  a.textBaseline = "top";
  a.fillStyle = "black";
  a.setFontHeight(this.TitleHeight - b);
  a.fillText(this.Title, this.X + 10, this.Y + b);
  if (!this._minimized) {
    for (a.fillStyle = this.Color, a.fillRect(this.X, this.Y + this.TitleHeight, this.Width, this.Height - this.TitleHeight), a.strokeStyle = "rgba(0,0,0,0.6)", a.beginPath(), a.moveTo(this.X, this.Y + this.TitleHeight + this.DisplayHeight), a.lineTo(this.X + this.Width, this.Y + this.TitleHeight + this.DisplayHeight), a.stroke(), a.closePath(), a.fillStyle = this.HandleColor, a.fillVariousRoundedRect(this.Handle.x, this.Handle.y, this.Handle.width, this.Handle.height, this.HandleRounding), this.IsMouseOverHandle && 
    (a.fillStyle = "rgba(0,0,0,0.2)", a.fillVariousRoundedRect(this.Handle.x, this.Handle.y, this.Handle.width, this.Handle.height, 4)), a.beginPath(), a.rect(this.X, this.Y + this.TitleHeight, this.Width, this.DisplayHeight), a.clip(), b = 0; b < this.Items.length; b++) {
      this.Items[b].item.Draw(a);
    }
  }
  a.restore();
};
Gallery.prototype.GetItemsWidth = function() {
  for (var a = 0, b = 0; b < this.Items.length; b++) {
    a += this.Items[b].item.Width + this.Items[b].offset.x;
  }
  return a > this.Width ? a : this.Width;
};
Gallery.prototype.ProcessInput = function() {
  var a = this.GetArea();
  a.type = "vrrect";
  a.roundings = [this.TitleRounding, this.TitleRounding, 0, 0];
  a.background = !0;
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
  this.Draggable && (a = {x:this.X, y:this.Y, width:this.Width, height:this.TitleHeight, type:"vrrect", roundings:[this.TitleRounding, this.TitleRounding, 0, 0]}, this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverTitle"));
  this.Draggable && (a = {x:this.X + this.Width - 5 - this.TitleHeight, y:this.Y, width:this.TitleHeight, height:this.TitleHeight, type:"rect"}, this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverClose"));
  this.Draggable && (a = {x:this.X + this.Width - 10 - 2 * this.TitleHeight, y:this.Y, width:this.TitleHeight, height:this.TitleHeight, type:"rect"}, this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverMinimize"));
  a = {x:this.X, y:this.Y + this.TitleHeight, width:this.Width, height:this.DisplayHeight, type:"rect", background:!0};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverDisplay");
  a = {x:this.Handle.x, y:this.Handle.y, width:this.Handle.width, height:this.Handle.height, rounding:this.HandleRounding, type:"rrect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverHandle");
  if (!this._minimized) {
    for (var b = 0; this.IsMouseOverDisplay && b < this.Items.length; b++) {
      a = this.Items[b].item, a.ProcessInput();
    }
  }
};
Gallery.prototype.Update = function() {
  this._framesAfterDragging++;
  if (this._dragging || this._scrolling) {
    this._framesAfterDragging = 0;
  }
  var a = this.Engine.Input.Mouse.Position;
  this.UpdateBox(a.Delta);
  if (!this._minimized) {
    for (var b = 0; this.IsMouseOverDisplay && 1 < this._framesAfterDragging && b < this.Items.length; b++) {
      var c = this.Items[b].item;
      c.Update();
    }
    this.UpdateHandle(a.Delta);
  }
  this.AdjustItemsPosition();
  (this.IsMouseOverTitle || this.IsMouseOverHandle || this.IsMouseOverMinimize || this.IsMouseOverClose) && this.Engine.Input.Mouse.Cursor.Set("pointer");
};
Gallery.prototype.UpdateHandle = function(a) {
  var b = !1;
  if (0 >= arguments.length || !a) {
    a = {Y:0}, b = !0;
  }
  this.ItemsWidth = this.GetItemsWidth();
  this.Fac = this.Width / this.ItemsWidth;
  this.Handle.width = this.Width * this.Fac;
  if (b || this._scrolling && !isNaN(a.X)) {
    this.Handle.x += a.X, this.OffsetX -= a.X / this.Fac, this.AdjustHandle();
  }
};
Gallery.prototype.UpdateBox = function(a) {
  if (this._dragging && !isNaN(a.Y)) {
    var b = this.Handle.x - this.X, c = this.Handle.y - this.Y;
    this.X += a.X;
    this.Handle.x += a.X;
    this.Y += a.Y;
    this.Handle.y += a.Y;
    a = this.Engine.Canvas;
    0 > this.X && (this.X = 0);
    this.X + this.Width > a.width && (this.X = a.width - this.Width);
    0 > this.Y && (this.Y = 0);
    this.Y + this.TitleHeight > a.height && (this.Y = a.height - this.TitleHeight);
    this.Handle.x = this.X + b;
    this.Handle.y = this.Y + c;
  }
};
Gallery.prototype.AdjustHandle = function() {
  this.Handle.x < this.X && (this.Handle.x = this.X);
  this.Handle.x > this.X + this.Width - this.Handle.width && (this.Handle.x = this.X + this.Width - this.Handle.width);
  0 < this.OffsetX && (this.OffsetX = 0);
  this.OffsetX < this.Width - this.ItemsWidth && (this.OffsetX = this.Width - this.ItemsWidth);
};
Gallery.prototype.AddItem = function(a, b, c) {
  1 >= arguments.length && (b = 0);
  2 >= arguments.length && (c = b);
  a instanceof ABO && (this.Items.push({item:a, offset:{x:b, y:c}}), this.AdjustItemsPosition());
};
Gallery.prototype.DeleteItems = function(a) {
  "undefined" === typeof a && (a = function(a, b) {
  });
  for (var b = 0; b < this.Items.length; b++) {
    var c = this.Items[b].item;
    a(c, this.Engine);
  }
  this.Items = [];
};
Gallery.prototype.AdjustItemsPosition = function() {
  for (var a, b, c = 0, d = 0; d < this.Items.length; d++) {
    a = this.Items[d].item, b = this.Items[d].offset, a.X = this.X + b.x + c + this.OffsetX, a.Y = this.Y + b.y + this.TitleHeight, c += a.Width + b.x, this._minimized && (a.Y += 2 * this.Engine.Canvas.height);
  }
};
Gallery.prototype.ClickOnMinimize = function() {
  this.Height = (this._minimized = !this._minimized) ? this.TitleHeight : this.TitleHeight + this.DisplayHeight;
};
Gallery.prototype.ClickOnClose = function() {
  console.log("Close Box");
  if (this.TrueClosing) {
    confirm("M{oe}chtest du dieses Men{ue} schlie{ss}en?".decodeURI()) && this.Close();
  } else {
    var a = this.Engine.Canvas;
    this.Closed ? this.MoveTo(this.PositionBeforeClosing.x, this.PositionBeforeClosing.y) : (this.PositionBeforeClosing.x = this.X, this.PositionBeforeClosing.y = this.Y, this.MoveTo(a.width - this.Width - 50, a.height - this.TitleHeight));
  }
};
Gallery.prototype.MoveTo = function(a, b) {
  var c = this.Handle.x - this.X, d = this.Handle.y - this.Y;
  (new MultiFlow([this, this], ["X", "Y"], [a, b], 500, {that:this, "function":function(a) {
    this.Closed = !this.Closed;
    this._minimized = !0;
    this.Y + this.TitleHeight < this.Engine.Canvas.height && (this._minimized = !1);
  }, parameter:!0}, {that:this, "function":function(a) {
    this.Handle.x = this.X + c;
    this.Handle.y = this.Y + d;
  }, parameter:!0})).Start();
};
Gallery.prototype.Close = function(a, b) {
  this.RemoveMouseHandler();
  this.RemoveProcessInputFunction();
  this._minimized = this.TrulyClosed = this.Closed = !0;
};
function Highlighting(a, b, c) {
  ABO.call(this);
  this.X = a.x;
  this.Y = a.y;
  this.Width = a.width || 2 * a.radius;
  this.Height = a.height || 2 * a.radius;
  this.Rounding = a.rounding || 0;
  this.Roundings = a.roundings || [a.rounding, a.rounding, a.rounding, a.rounding];
  this.Radius = a.radius || 0;
  this.CallbackAreaFunction = a["function"];
  this.Type = a.type || "vrrect";
  this.Title = "";
  this.TitleFontHeight = 26;
  this.Opacity = 0;
  this.IsMouseOverCanvas = !1;
  this.Padding = Highlighting.prototype.DefaultPadding;
  this.RowSpace = Highlighting.prototype.DefaultRowSpace;
  this.FontHeight = Highlighting.prototype.DefaultFontHeight;
  this.TextImage = !1;
  this.TextImageBox = {x:0, y:0, width:0, height:0};
  this._text;
  this.CallbackObject = {that:this, "function":function() {
  }, parameter:"default"};
  this.FlowMilliseconds = b;
  this.Milliseconds = c + this.FlowMilliseconds;
  this._ref_pifo = this._ref_timeout = this._ref_mhan = this._ref_dfo = null;
  this._instructionMode = !1;
}
Highlighting.prototype = Object.create(ABO.prototype);
Highlighting.prototype.constructor = Highlighting;
Highlighting.prototype.OutsideColor = "rgba(0,0,0,0.8)";
Highlighting.prototype.TitleColor = "white";
Highlighting.prototype.TextBoxBackgroundColor = "black";
Highlighting.prototype.TextBoxFontColor = "white";
Highlighting.prototype.DefaultPadding = 8;
Highlighting.prototype.DefaultRowSpace = 5;
Highlighting.prototype.DefaultFontHeight = 14;
Highlighting.prototype.Start = function(a) {
  (new Flow(this, "Opacity", 1, this.FlowMilliseconds, {that:this, parameter:!0, "function":function() {
  }})).Start();
  var b = this._createForegroundDrawFunctionObject();
  this._ref_dfo = this.Engine.AddForegroundDrawFunctionObject(b);
  this._ref_pifo = this.Engine.AddProcessInputFunction({that:this, parameter:!0, "function":function() {
    this.Engine.Input.MouseHandler.AddHoverRequest({"function":function(a) {
      a.rect(0, 0, a.canvas.width, a.canvas.height);
    }, type:"function"}, this, "IsMouseOverCanvas");
  }});
  "object" === typeof a && (this.CallbackObject = a);
  var c = function(a) {
    a.Engine.RemoveForegroundDrawFunctionObject(a._ref_dfo);
    a._ref_dfo = null;
    a.Engine.RemoveProcessInputFunction(a._ref_pifo);
    a._ref_pifo = null;
    a.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", a._ref_mhan);
    window.clearTimeout(a._ref_timeout);
    Callback.CallObject(a.CallbackObject);
  };
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {that:this, "function":function() {
    c(this);
  }, parameter:this.Engine});
  this._instructionMode || (this._ref_timeout = window.setTimeout(c, this.Milliseconds, this));
};
Highlighting.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, parameter:this.Engine, "function":function(a) {
    var b = this.Engine.Canvas;
    a.save();
    a.globalAlpha = this.Opacity;
    a.beginPath();
    a.fillStyle = this.OutsideColor;
    a.moveTo(0, 0);
    a.lineTo(0, b.height);
    a.lineTo(b.width, b.height);
    a.lineTo(b.width, 0);
    a.lineTo(0, 0);
    b = !1;
    b || "rect" !== this.Type || (a.rect(this.X, this.Y, this.Width, this.Height), b = !0);
    b || "rrect" !== this.Type || (a.variousRoundedRect(this.X, this.Y, this.Width, this.Height, this.Rounding), b = !0);
    b || "vrrect" !== this.Type || (b = this.Roundings, a.variousRoundedRect(this.X, this.Y, this.Width, this.Height, b[0] || 0, b[1] || 0, b[2] || 0, b[3] || 0), b = !0);
    b || "circle" !== this.Type || (a.circle(this.X, this.Y, this.Radius, !0), b = !0);
    b || "function" !== this.Type || Callback.CallObject(this.CallbackAreaFunction);
    a.fill();
    this.TextImage && (b = this.TextImageBox, a.drawImage(this.TextImage, b.x, b.y));
    a.fillStyle = this.TitleColor;
    a.setFontHeight(this.TitleFontHeight);
    a.textAlign = "left";
    a.textBaseline = "top";
    a.fillText(this.Title, 10, 10);
    a.restore();
  }};
};
Highlighting.prototype.AddText = function(a, b, c) {
  this._text = a;
  "string" === typeof a && (a = [a]);
  var d = this.Engine.Context, e = this.Padding, f = this.RowSpace, g = this.FontHeight;
  this.TextImageBox.width = Math.round(this.Engine.Canvas.width / 3);
  var h = this.TextImageBox.width;
  d.setFontHeight(g);
  for (var k = [], m = [], l = d.measureText(" ").width, p, n = 0; n < a.length; n++) {
    p = a[n].split(" ");
    for (var t = 0; t < p.length; t++) {
      k.push(p[t]), m.push(d.measureText(p[t]).width);
    }
    n < a.length - 1 && (k.push("\\n"), m.push(0));
  }
  a = [];
  d = 0;
  a.push("");
  for (n = 0; n < k.length; n++) {
    "\\n" === k[n] ? (n++, a.push(k[n] + " "), d = 0 + m[n] + l) : d + m[n] + l < h - 2 * e ? (a[a.length - 1] += k[n] + " ", d += m[n] + l) : (a[a.length - 1] = a[a.length - 1].substr(0, a[a.length - 1].length - 1), a.push(k[n] + " "), d = 0 + m[n] + l);
  }
  a[a.length - 1] = a[a.length - 1].substr(0, a[a.length - 1].length - 1);
  this.TextImageBox.height = 2 * e + g * a.length + f * a.length - 1;
  h = document.createElement("CANVAS");
  h.width = this.TextImageBox.width;
  h.height = this.TextImageBox.height;
  k = h.getContext("2d");
  k.setFontHeight(g);
  k.fillStyle = this.TextBoxBackgroundColor;
  k.fillRect(0, 0, h.width, h.height);
  k.textAlign = "left";
  k.textBaseline = "top";
  k.fillStyle = this.TextBoxFontColor;
  k.strokeStyle = this.TextBoxFontColor;
  m = e;
  for (n = 0; n < a.length; n++) {
    k.fillText(a[n], e, m), m += g + f;
  }
  e = h.toDataURL();
  this.TextImage = document.createElement("IMG");
  this.TextImage.src = e;
  this._calculateBestTextPosition(b, c);
};
Highlighting.prototype._calculateBestTextPosition = function(a, b) {
  var c = this.Engine.Canvas, d = c.width / 2, e = c.height / 2;
  if ("circle" === this.Type) {
    var f = this.X - this.Radius;
    var g = this.Y - this.Radius;
    var h = this.X + this.Radius;
    var k = this.Y - this.Radius;
    var m = this.X + this.Radius;
    var l = this.Y + this.Radius;
    var p = this.X - this.Radius;
    var n = this.Y + this.Radius;
  } else {
    f = this.X, g = this.Y, h = this.X + this.Width, k = this.Y, m = this.X + this.Width, l = this.Y + this.Height, p = this.X, n = this.Y + this.Height;
  }
  if (a) {
    switch(b) {
      case 1:
        this.TextImageBox.x = f + a.x;
        this.TextImageBox.y = g + a.y;
        return;
      case 2:
        this.TextImageBox.x = h + a.x;
        this.TextImageBox.y = k + a.y;
        return;
      case 3:
        this.TextImageBox.x = m + a.x;
        this.TextImageBox.y = l + a.y;
        return;
      case 4:
        this.TextImageBox.x = p + a.x;
        this.TextImageBox.y = n + a.y;
        return;
      default:
        this.TextImageBox.x = m + a.x;
        this.TextImageBox.y = l + a.y;
        return;
    }
  }
  d = (f + h + m + p) / 4 - d;
  e = (g + k + l + n) / 4 - e;
  0 < d && 0 < e && (this.TextImageBox.x = f - this.TextImageBox.width - 10, this.TextImageBox.y = g - this.TextImageBox.height - 10);
  0 < d && 0 > e && (this.TextImageBox.x = p - this.TextImageBox.width - 10, this.TextImageBox.y = n + 10);
  0 >= d && 0 <= e && (this.TextImageBox.x = h + 10, this.TextImageBox.y = k - this.TextImageBox.height - 10);
  0 >= d && 0 >= e && (this.TextImageBox.x = m + 10, this.TextImageBox.y = l + 10);
  0 > this.TextImageBox.x && (this.TextImageBox.x = 0);
  0 > this.TextImageBox.y && (this.TextImageBox.y = 0);
  this.TextImageBox.x + this.TextImageBox.width > c.width && (this.TextImageBox.x = c.width - this.TextImageBox.width);
  this.TextImageBox.y + this.TextImageBox.height > c.height && (this.TextImageBox.y = c.height - this.TextImageBox.height);
};
Highlighting.prototype.AddTitle = function(a, b) {
  this.Title = a;
  this.TitleFontHeight = b || 26;
};
Highlighting.prototype.IncreaseArea = function(a) {
  "circle" === this.Type ? this.Radius += a : (this.Width += 2 * a, this.Height += 2 * a, this.X -= a, this.Y -= a);
};
Highlighting.prototype.RoundingArea = function(a) {
  this.Rounding = a;
  this.Type = "rrect";
};
Highlighting.prototype.MoveArea = function(a, b) {
  this.X += a;
  this.Y += b;
};
Highlighting.prototype.AddCallbackObject = function(a) {
  this.CallbackObject = a;
};
Highlighting.prototype.SetInstructionMode = function(a, b) {
  (this._instructionMode = a) && "undefined" !== typeof b && this.AddTitle(b);
};
function InputField(a, b, c, d, e) {
  ABO.call(this);
  this.Active = !0;
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.VariableWidth = !1;
  this.Height = "undefined" !== typeof d && d ? d : 20;
  this.padding = "undefined" !== typeof e && e ? e : 2;
  this.Selected = !1;
  this.FontHeight = this.Height - 2 * this.padding;
  this.Font = this.FontHeight + "px sans-serif";
  this.BindKey = "";
  this.Bound = !1;
  this.MarkedText = this.Text = "";
  this.CharLimiter = function(a) {
    return !0;
  };
  this.LimitationFailCallbackObject = {that:this, "function":function(a, b) {
  }, parameter:{}};
  this.shading = Math.ceil(this.padding / 2);
  this.IsMouseOver = !1;
  this.State = 0;
  this.OldState = -1;
  this.FillStyle = [InputField.prototype.DefaultUnselectedColor, InputField.prototype.DefaultSelectedColor];
  this.CSSMouseCursor = ["text", "default", "wait"];
  this.CursorPos = this.Text.length;
  this.CursorPosChanged = !0;
  this.CursorWidth = 0;
  this.CursorVisible = !0;
  this.off = 0;
  this.step = parseInt(this.Width / 20);
  this.cmin = 2 * this.step;
  this.cmax = this.Width - 2 * this.step;
  this.AlternativeActive = !1;
  this._ref_mhan = this._ref_keyd = null;
  this.Initialize();
}
InputField.prototype = Object.create(ABO.prototype);
InputField.prototype.constructor = InputField;
InputField.prototype.DefaultUnselectedColor = "#eee";
InputField.prototype.DefaultSelectedColor = "#fff";
InputField.prototype.Initialize = function() {
  this.Engine.Counter.AddCounterFunction({parameter:this, "function":function(a) {
    a.CursorVisible = !a.CursorVisible;
  }, every:12});
  var a = function(a) {
    var b = a.data.object;
    if (b.Selected && (a.key ? b.AddLetter(a.key) : b.AddLetter(String.getKeyByEvent(a)), 8 == a.which)) {
      return a.preventDefault(), a.stopPropagation(), !1;
    }
  };
  $(document).on("keydown", {object:this}, a);
  window.top != window.self && (this.ParentKeyDownEvent = $(window.parent.document).on("keydown", {object:this}, a));
};
InputField.prototype.Update = function() {
  var a = this.Engine.Input.Mouse, b = this.Engine.Input.Key;
  1 == a.Left.FramesUp && this.IsMouseOver && (this.Selected = !0, this.Engine.IsTouchDevice && (this.Text = window.prompt("Your input:", this.Text), this.Selected = !1));
  1 == b.Esc.FramesPressed && (this.Selected = !1);
  (this.Selected && 1 == b.Left.FramesPressed || this.Selected && 10 < b.Left.FramesPressed && 0 == b.Left.FramesPressed % 3) && 0 < this.CursorPos && (this.CursorPos--, this.CursorPosChanged = !0);
  (this.Selected && 1 == b.Right.FramesPressed || this.Selected && 10 < b.Right.FramesPressed && 0 == b.Right.FramesPressed % 3) && this.CursorPos < this.Text.length && (this.CursorPos++, this.CursorPosChanged = !0);
  this.IsMouseOver && this.Selected && 1 == a.Left.FramesDown && this.ChangeCursorPosAccordingTo(a.Position);
  (1 == b.Backspace.FramesPressed || 10 < b.Backspace.FramesPressed && 0 == b.Backspace.FramesPressed % 3) && this.RemoveLetter();
  this.IsMouseOver && this.Engine.Input.Mouse.Cursor.Set(this.CSSMouseCursor[this.State]);
  this.Selected && this._checkText();
};
InputField.prototype.ProcessInput = function() {
  this.Engine.Input.MouseHandler.AddHoverRequest(this.GetArea(0, 0), this, "IsMouseOver");
};
InputField.prototype.Draw = function(a) {
  a.save();
  var b = this.Engine.Camera.SelectedCamera;
  a.fillStyle = this.Selected ? this.FillStyle[1] : this.FillStyle[0];
  a.beginPath();
  a.rect(this.X - b.X, this.Y - b.Y, this.Width, this.Height);
  a.fill();
  a.closePath();
  a.clip();
  a.globalCompositeOperation = "source-atop";
  a.textBaseline = "middle";
  a.font = this.Font;
  var c = this.X + this.padding - b.X - this.off, d = this.Y + this.Height / 2 - b.Y;
  a.fillStyle = "black";
  a.fillText(this.Text, c, d);
  a.globalCompositeOperation = "source-over";
  a.beginPath();
  a.moveTo(this.X - b.X, this.Y + this.Height - b.Y);
  a.lineTo(this.X - b.X, this.Y - b.Y);
  a.lineTo(this.X + this.Width - b.X, this.Y - b.Y);
  a.strokeStyle = this.shading + "px grey";
  a.stroke();
  a.closePath();
  this.Selected && this.CursorVisible && (this.CursorWidth = a.measureText(this.Text.substr(0, this.CursorPos)).width, a.beginPath(), a.moveTo(c + this.CursorWidth, this.Y + this.padding - b.Y), a.lineTo(c + this.CursorWidth, this.Y + this.padding + this.FontHeight - b.Y), a.strokeStyle = "black", a.stroke(), a.closePath());
  a.restore();
};
InputField.prototype.BindToStorageEntry = function(a) {
  if ("string" === typeof a && 0 < a.length) {
    var b = this.Engine.Storage.ReadFromStorage(a);
    b.code && (b = this.Engine.Storage.WriteToStorage(a, ""));
    this.Bound = !0;
    this.BindKey = a;
    this.Text = b;
  }
};
InputField.prototype.ChangeCursorPosAccordingTo = function(a) {
  this.CursorPosChanged = !0;
  a = a.Camera;
  if (0 >= this.Text.length) {
    this.CursorPos = 0;
  } else {
    a = a.X - (this.X + this.padding);
    var b = document.createElement("CANVAS").getContext("2d");
    b.font = this.Font;
    var c = b.measureText(this.Text).width - this.off;
    if (a >= c) {
      this.CursorPos = this.Text.length;
    } else {
      c = 0 - this.off;
      for (var d = 0; c < a && d < this.Text.length;) {
        d++, c = b.measureText(this.Text.substr(0, d)).width - this.off;
      }
      this.CursorPos = d;
      this.MarkedText = 0 < this.CursorPos ? this.Text.substr(this.CursorPos - 1, 1) : "n/a";
    }
  }
};
InputField.prototype.SetCursorPosToEnd = function() {
  this.CursorPosChanged = !0;
  this.CursorPos = this.Text.length;
};
InputField.prototype.AddLetter = function(a) {
  if (a && !(1 < a.length)) {
    if (this.CharLimiter(a)) {
      this.Text = this.Text.substr(0, this.CursorPos) + a + this.Text.substr(++this.CursorPos - 1), this.Bound && this.Engine.Storage.WriteToStorage(this.BindKey, this.Text);
    } else {
      var b = this.LimitationFailCallbackObject;
      b["function"].call(b.that, a, b.parameter);
    }
  }
};
InputField.prototype.RemoveLetter = function() {
  if (0 < this.Text.length) {
    var a = 0 < this.CursorPos ? this.Text.substr(0, this.CursorPos - 1) : "";
    var b = this.Text.substr(this.CursorPos);
    this.Text = a + b;
    0 < this.CursorPos && this.CursorPos--;
  }
  this.Bound && this.Engine.Storage.WriteToStorage(this.BindKey, this.Text);
};
InputField.prototype._checkText = function() {
  this.CursorWidth - this.off >= this.cmax && (this.off += this.step);
  this.CursorWidth - this.off <= this.cmin && (this.off -= this.step);
  0 > this.off && (this.off = 0);
};
InputField.prototype.AddCharLimiter = function(a, b) {
  "function" === typeof a && (this.CharLimiter = a);
  "undefined" !== typeof b && (this.LimitationFailCallbackObject = b);
};
function MediaManager() {
  EngineObject.call(this);
  this.Images = new HashTable;
  this.Sounds = new HashTable;
  this.Strings = new HashTable;
  this.Pack = [];
  this.SortedPack = !1;
  this.Unloaded = [];
  this.ProgressStep = this.Progress = 0;
  this.Loading = !1;
}
MediaManager.prototype = Object.create(EngineObject.prototype);
MediaManager.prototype.constructor = MediaManager;
MediaManager.prototype.DefaultBarColor = "green";
MediaManager.prototype.DefaultBarBorderColor = "black";
MediaManager.prototype.DefaultFontColor = "black";
MediaManager.prototype.Flush = function() {
};
MediaManager.prototype.Draw = function(a) {
  a.save();
  if (this.Loading) {
    var b = this.Engine.Canvas.width / 2, c = this.Engine.Canvas.height / 2, d = b / 2, e = c - c / 20;
    c /= 10;
    var f = b / 100;
    a.fillStyle = "white";
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    a.fillStyle = MediaManager.prototype.DefaultBarColor;
    a.fillVariousRoundedRect(d, e, this.Progress * f, c, 5);
    a.strokeStyle = MediaManager.prototype.DefaultBarBorderColor;
    a.strokeVariousRoundedRect(d, e, b, c, 5);
    a.textAlign = "left";
    a.textBaseline = "top";
    a.fillStyle = MediaManager.prototype.DefaultFontColor;
    a.fillText("Loading: {0}%".format(parseInt(this.Progress)), d, e + c + 10);
  }
  a.restore();
};
MediaManager.prototype.Update = function() {
};
MediaManager.prototype.GetImage = function(a) {
  try {
    return this.Images.Get(a).Data;
  } catch (b) {
    return !1;
  }
};
MediaManager.prototype.GetSound = function(a) {
  try {
    return this.Images.Get(a).Data;
  } catch (b) {
    return !1;
  }
};
MediaManager.prototype.LoadMedia = function(a, b) {
  var c = a.length;
  this.Progress = 0;
  this.ProgressStep = 100 / c;
  this.Loading = !0;
  this.Unloaded = a;
  c = function() {
    var a = this.Parameters.co, b = this.Parameters.mm, c = b.Unloaded;
    if (!c || 0 >= c.length) {
      return b.Loading = !1, b.Progress = 100, Callback.CallObject(a), !0;
    }
    var d = this.Parameters.of;
    c = c.pop();
    b.Progress += b.ProgressStep;
    c instanceof Image ? (b.Images.Set(c.Codename, c), c.Load(d, {co:a, of:d, mm:b})) : c instanceof Sound && (b.Sounds.Set(c.Codename, c), c.Load(d, {co:a, of:d, mm:b}));
  };
  if (!a || 0 >= a.length) {
    return this.Loading = !1, this.Progress = 100, Callback.CallObject(b), !0;
  }
  var d = a.pop();
  this.Progress += this.ProgressStep;
  d instanceof Image ? (this.Images.Set(d.Codename, d), d.Load(c, {co:b, of:c, mm:this})) : d instanceof Sound && (this.Sounds.Set(d.Codename, d), d.Load(c, {co:b, of:c, mm:this}));
};
MediaManager.prototype.SetMediaPack = function(a, b) {
  this.Pack = a;
  this.SortPack();
  this.Require("always", b, !0);
};
MediaManager.prototype.ExtendMediaPack = function(a, b) {
  this.Pack = this.Pack.concat(a);
  this.SortPack();
  this.Require("always", b, !0);
};
MediaManager.prototype.SortPack = function() {
  this.Pack = this.Pack.sort(function(a, b) {
    return a < b ? 1 : -1;
  });
  this.SortedPack = !0;
};
MediaManager.prototype.Require = function(a, b, c) {
  var d = [], e = [];
  b || (b = function() {
  }.getCallbackObject(this.Engine, "default"));
  for (var f = 0; f < this.Pack.length; f++) {
    var g = this.Pack[f];
    g.IsGroupOf(a) || c && g.HasNoGroup ? d.push(g) : e.push(g);
  }
  this.Pack = e;
  this.LoadMedia(d, b);
};
function Media(a, b, c) {
  "object" == typeof a && (b = a.codename, c = a.group, a = a.path);
  this.Path = a;
  this.Codename = b;
  this.HasNoGroup = c ? !1 : !0;
  this.Group = [];
  this.Group = "object" == typeof c ? this.Group.concat(c) : [c || "always"];
  this.Data;
  this.DataLoaded = !1;
}
Media.prototype.IsGroupOf = function(a) {
  for (var b = 0; b < this.Group.length; b++) {
    if (this.Group[b] == a) {
      return !0;
    }
  }
  return !1;
};
Media.prototype.AddGroup = function(a) {
  this.Group.push(a);
};
function Image(a, b, c) {
  Media.call(this, a, b, c);
}
Image.prototype = Object.create(Media.prototype);
Image.prototype.constructor = Image;
Image.prototype.Load = function(a, b) {
  this.Data = document.createElement("IMG");
  this.Data.onload = a;
  this.Data.Parameters = b;
  this.Data.src = this.Path;
  this.DataLoaded = !0;
};
Image.prototype.GetDataURL = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Data.width;
  a.height = this.Data.height;
  a.getContext("2d").drawImage(this.Data, 0, 0);
  return a.toDataURL();
};
function Sound(a, b, c) {
  Media.call(this, a, b, c);
}
Sound.prototype = Object.create(Media.prototype);
Sound.prototype.constructor = Sound;
Sound.prototype.Load = function(a, b) {
  this.Data = document.createElement("AUDIO");
  this.Data.oncanplay = a;
  this.Data.preload = !0;
  this.Data.Parameters = b;
  this.Data.src = this.Path;
  this.DataLoaded = !0;
};
function Monitor(a, b, c, d) {
  EngineObject.call(this);
  this.Name = "undefined" !== typeof d && !1 !== d && null !== d ? d : "Monitor " + ++Monitor.Counter;
  this.Object = a;
  this.Attribute = b;
  this.Class = "";
  this.CallbackObject = "undefined" !== typeof c && !1 !== c && null !== c ? c : {that:this, "function":function(a, b, c, d) {
    console.log("'{0}' changed from '{1}' to '{2}' and began with '{3}'".format(this.Name, b, a, c));
  }, parameter:"default"};
  this.StartValue;
  this.OldValue;
  this.CurrentValue;
  this.Initialize();
}
Monitor.prototype = Object.create(EngineObject.prototype);
Monitor.prototype.constructor = Monitor;
Monitor.Counter = 0;
Monitor.prototype.Initialize = function() {
  this.CurrentValue = this.OldValue = this.StartValue = this.Object[this.Attribute];
  this._getClass();
};
Monitor.prototype.Update = function() {
  this.CurrentValue = this.Object[this.Attribute];
  if (this._didAttrChange()) {
    var a = this.CallbackObject;
    a["function"].call(a.that, this.CurrentValue, this.OldValue, this.StartValue, a.para);
  }
  this.OldValue = this.CurrentValue;
};
Monitor.prototype._getClass = function() {
  var a = this.Object.constructor.toString(), b = a.indexOf("function "), c = a.indexOf("(");
  0 == b && (a = a.substr(9, c - 9));
  this.Class = a;
};
Monitor.prototype._didAttrChange = function() {
  return this.CurrentValue !== this.OldValue ? !0 : !1;
};
function MouseHandler() {
  EngineObject.call(this);
  this.LeftMouseClickHandlerCBOs = new PriorityQueue;
  this.RightMouseClickHandlerCBOs = new PriorityQueue;
  this.WheelHandlerCBOs = new PriorityQueue;
  this.WheelLimiter = 0.1;
  this.HoverRequests = [];
  this._yesPool = [];
  this._oldRightFramesDown = this._oldLeftFramesDown = 0;
  this.Initialize();
}
MouseHandler.prototype = Object.create(EngineObject.prototype);
MouseHandler.prototype.constructor = MouseHandler;
MouseHandler.prototype.Initialize = function() {
  -1 < navigator.userAgent.toLowerCase().indexOf("firefox") && (this.WheelLimiter = 1.5);
};
MouseHandler.prototype.WheelHandler = function(a, b) {
  for (var c = this.WheelHandlerCBOs.heap, d, e = {GoThrough:!0, Timestamp:Date.now(), Frame:this.Engine.Counter.Frames, Delta:{X:a * this.WheelLimiter, Y:b * this.WheelLimiter}, Type:"wheel"}, f = 0; e.GoThrough && f < c.length; f++) {
    d = c[f].data, d["function"].call(d.that, e, d.parameter);
  }
};
MouseHandler.prototype.AddMouseHandler = function(a, b, c) {
  if ("leftclick" === a) {
    var d = this.LeftMouseClickHandlerCBOs.Enqueue(b, c);
    this.LeftMouseClickHandlerCBOs.Sort();
  }
  "rightclick" === a && (d = this.RightMouseClickHandlerCBOs.Enqueue(b, c), this.RightMouseClickHandlerCBOs.Sort());
  "wheel" === a && (d = this.WheelHandlerCBOs.Enqueue(b, c), this.WheelHandlerCBOs.Sort());
  return d;
};
MouseHandler.prototype.RemoveMouseHandler = function(a, b) {
  var c;
  "leftclick" === a && (c = this.LeftMouseClickHandlerCBOs.DeleteByReferenceNumber(b));
  "rightclick" === a && (c = this.RightMouseClickHandlerCBOs.DeleteByReferenceNumber(b));
  "wheel" === a && (c = this.WheelHandlerCBOs.DeleteByReferenceNumber(b));
  return c;
};
MouseHandler.prototype.Flush = function() {
  this.LeftMouseClickHandlerCBOs.Flush();
  this.RightMouseClickHandlerCBOs.Flush();
  this.WheelHandlerCBOs.Flush();
};
MouseHandler.prototype.AddHoverRequest = function(a, b, c, d, e) {
  2 >= arguments.length || (a || (a = {type:"rect", x:b.X, y:b.Y, width:b.Width, height:b.Height}), "undefined" === typeof d && (d = !0), "undefined" === typeof e && (e = !1), this.HoverRequests.push({area:a, object:b, attr:c, success:d, failure:e}));
};
MouseHandler.prototype.MouseClickHandler = function() {
  var a = this.Engine.Input.Mouse, b = a.Left.FramesDown;
  if (0 < this._oldLeftFramesDown && 0 == b && 0 >= a.Left.BusyFrames) {
    b = this.LeftMouseClickHandlerCBOs.heap;
    for (var c, d = {GoThrough:!0, Timestamp:Date.now(), Frame:this.Engine.Counter.Frames, Type:"leftclick", Mouse:this.Engine.Input.Mouse}, e = 0; d.GoThrough && e < b.length; e++) {
      c = b[e].data, c["function"].call(c.that, d, c.parameter);
    }
    a.Left.BusyFrames = 5;
  }
  this._oldLeftFramesDown = this.Engine.Input.Mouse.Left.FramesDown;
  b = a.Right.FramesDown;
  if (0 < this._oldRightFramesDown && 0 == b && 0 >= a.Right.BusyFrames) {
    b = this.RightMouseClickHandlerCBOs.heap;
    d = {GoThrough:!0, Timestamp:Date.now(), Frame:this.Engine.Counter.Frames, Type:"rightclick"};
    for (e = 0; d.GoThrough && e < b.length; e++) {
      c = b[e].data, c["function"].call(c.that, d, c.parameter);
    }
    a.Right.BusyFrames = 5;
  }
  this._oldRightFramesDown = this.Engine.Input.Mouse.Right.FramesDown;
};
MouseHandler.prototype.ResolveHoverRequest = function() {
  for (var a = this.Engine.Context, b = [], c, d, e, f = this.Engine.Input.Mouse.Position.Relative, g = 0; g < this.HoverRequests.length; g++) {
    c = this.HoverRequests[g], d = c.area, e = !1, a.save(), a.beginPath(), e || "rect" !== c.area.type || (a.rect(d.x, d.y, d.width, d.height), e = !0), e || "rrect" !== c.area.type || (a.variousRoundedRect(d.x, d.y, d.width, d.height, d.rounding), e = !0), e || "vrrect" !== c.area.type || (e = d.roundings, a.variousRoundedRect(d.x, d.y, d.width, d.height, e[0], e[1] || 0, e[2] || 0, e[3] || 0), e = !0), e || "circle" !== c.area.type || (a.circle(d.x, d.y, d.radius, d.centroid || !0), e = !0), e || 
    "function" !== c.area.type || ("function" === typeof d["function"] && d["function"](a), d["function"] && "function" === typeof d["function"]["function"] && Callback.CallObject(d["function"])), (e = a.isPointInPath(f.X, f.Y)) ? d.background ? c.object[c.attr] = c.success : b.push(c) : c.object[c.attr] = c.failure, a.closePath(), a.restore();
  }
  for (g = 0; g < b.length; g++) {
    c = b[g], c.object[c.attr] = g !== b.length - 1 ? c.failure : c.success;
  }
  this.HoverRequests = [];
};
function MultipleChoice(a, b, c) {
  ABO.call(this);
  this.Y = this.X = 0;
  this.Width;
  this.Height;
  this.ContentWidthQuotient = 0.7;
  this.Text = a;
  this.ImageText = !1;
  this.Rows = [];
  this.RowLengths = [];
  this.CallbackObjects = [];
  for (a = 0; a < c.length; a++) {
    this.CallbackObjects[a] = {that:this, parameter:c[a], "function":function(a) {
      Callback.CallObject(a);
      this.Stop();
    }};
  }
  this.Labels = b;
  this.MustDecide = !0;
  this.OnIllegalStopCBO = function() {
    var a = "Sie m{ue}ssen eine Entscheidung treffen!".decodeURI();
    (new Toaster("error", "Fehler", a, 4000)).Open();
  }.getCallbackObject(this);
  this.Rounding = MultipleChoice.prototype.DefaultRounding;
  this.FontHeight = MultipleChoice.prototype.DefaultFontHeight;
  this.BoxPadding = MultipleChoice.prototype.DefaultBoxPadding;
  this.RowSpace = MultipleChoice.prototype.DefaultRowSpace;
  this.FontPadding = this.BoxPadding;
  this.ContentBox = {};
  this.Buttons = [];
  this.IsMouseOverBackground = this.IsMouseOverContent = !1;
  this.Opacity = 0;
  this._ref_mhan = this._ref_upd = this._ref_draw = this._ref_ip = null;
  this.Initialize();
}
MultipleChoice.prototype = Object.create(ABO.prototype);
MultipleChoice.prototype.constructor = MultipleChoice;
MultipleChoice.prototype.ContentBoxColor = "#999";
MultipleChoice.prototype.BoxBorderColor = "black";
MultipleChoice.prototype.BoxColor = "#ccc";
MultipleChoice.prototype.BoxFontColor = "#fff";
MultipleChoice.prototype.OutsideColor = "rgba(0,0,0,0.8)";
MultipleChoice.prototype.DefaultRounding = 10;
MultipleChoice.prototype.DefaultFontHeight = 18;
MultipleChoice.prototype.DefaultBoxPadding = 5;
MultipleChoice.prototype.DefaultRowSpace = 4;
MultipleChoice.prototype.Initialize = function() {
  this._createTextImage();
  this._initSizes();
  this._recalculateSizes();
};
MultipleChoice.prototype._createTextImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Engine.Canvas.width * this.ContentWidthQuotient;
  a.height = 300;
  var b = a.getContext("2d");
  b.font = this.Engine.Context.font;
  b.setFontHeight(this.FontHeight);
  for (var c = [], d = "string" === typeof this.Text ? [this.Text] : this.Text, e, f = 0; f < d.length; f++) {
    e = d[f].split(" ");
    for (var g = 0; g < e.length; g++) {
      c.push(e[g]);
    }
    f < d.length - 1 && c.push("\\n");
  }
  d = b.measureText(" ").width;
  e = [];
  for (f = 0; f < c.length; f++) {
    "\\n" !== c[f] ? e.push(b.measureText(c[f]).width) : e.push(0);
  }
  b = [];
  g = [];
  b.push("");
  g.push(0);
  for (f = 0; f < c.length; f++) {
    "\\n" === c[f] ? (f++, b.push(c[f] + " "), g.push(0 + e[f] + d)) : g[b.length - 1] + e[f] + d < a.width - 2 * this.FontPadding ? (b[b.length - 1] += c[f] + " ", g[b.length - 1] += e[f] + d) : (b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1), g[b.length - 1] -= d, b.push(c[f] + " "), g.push(e[f] + d));
  }
  b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1);
  this.Rows = b;
  this.RowLengths = g;
  for (f = a = 0; f < b.length; f++) {
    g[f] > a && (a = g[f]);
  }
  d = c = this.BoxPadding;
  f = a + 2 * this.BoxPadding;
  e = this.Rows.length * this.FontHeight + (this.Rows.length - 1) * this.RowSpace + 2 * this.FontPadding;
  a = document.createElement("CANVAS");
  a.width = f;
  a.height = e;
  b = a.getContext("2d");
  b.setFontHeight(this.FontHeight);
  b.textAlign = "left";
  b.textBaseline = "top";
  for (f = 0; f < this.Rows.length; f++) {
    b.fillText(this.Rows[f], c, d + this.FontHeight * f + this.RowSpace * f);
  }
  this.ImageText = document.createElement("IMG");
  this.ImageText.width = a.width;
  this.ImageText.height = e;
  this.ImageText.src = a.toDataURL();
};
MultipleChoice.prototype._initSizes = function() {
  var a = this.BoxPadding, b = this.Engine.Canvas, c = this.Engine.Context;
  this.Width = b.width;
  this.Height = b.height;
  b = 2 * this.FontHeight;
  var d = this.FontHeight;
  this.ContentBox.width = this.ImageText.width;
  this.ContentBox.height = this.ImageText.height + this.Labels.length * b + (this.Labels.length - 1) * this.RowSpace + 2 * a;
  c.save();
  c.setFontHeight(d);
  for (var e, f = 0; f < this.Labels.length; f++) {
    e = c.measureText(this.Labels[f]).width, e = (this.ContentBox.width - e) / 2, this.Buttons[f] = new Button(a, a + this.ImageText.height + f * b + f * this.RowSpace, this.ContentBox.width - 2 * a, b, {DisplayType:"color", TextColor:"white", FontHeight:d, Label:this.Labels[f], Padding:e, TriggerCallbackObject:this.CallbackObjects[f], HoverText:this.Labels[f]});
  }
  c.restore();
};
MultipleChoice.prototype._recalculateSizes = function() {
  var a = this.BoxPadding, b = this.Engine.Canvas;
  this.Width = b.width;
  this.Height = b.height;
  b = 2 * this.FontHeight;
  this.ContentBox.width = this.ImageText.width;
  this.ContentBox.height = this.ImageText.height + this.Labels.length * b + (this.Labels.length - 1) * this.RowSpace + 2 * a;
  this.ContentBox.x = this.Width / 2 - this.ContentBox.width / 2;
  this.ContentBox.y = this.Height / 2 - this.ContentBox.height / 2;
  for (var c = 0; c < this.Labels.length; c++) {
    this.Buttons[c].X = this.ContentBox.x + a, this.Buttons[c].Y = this.ContentBox.y + a + this.ImageText.height + c * b + c * this.RowSpace;
  }
};
MultipleChoice.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, "function":function(a) {
    a.save();
    a.globalAlpha = this.Opacity;
    a.fillStyle = this.OutsideColor;
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    var b = this.ContentBox;
    a.beginPath();
    a.variousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.clip();
    a.fillStyle = this.ContentBoxColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, 0);
    a.drawImage(this.ImageText, this.ContentBox.x, this.ContentBox.y);
    a.restore();
    for (b = 0; b < this.Buttons.length; b++) {
      this.Buttons[b].Draw(a);
    }
    a.save();
    a.strokeStyle = this.BoxBorderColor;
    a.lineWidth = 5;
    b = this.ContentBox;
    a.strokeVariousRoundedRect(b.x, b.y, b.width, b.height, this.Rounding);
    a.restore();
  }, parameter:this.Engine.Context};
};
MultipleChoice.prototype._createProcessInputFunctionObject = function() {
  return {that:this, "function":function(a) {
    var b = this.ContentBox;
    a = {"function":function(a) {
      a.moveTo(0, 0);
      a.lineTo(0, a.canvas.height);
      a.lineTo(a.canvas.width, a.canvas.height);
      a.lineTo(a.canvas.width, 0);
      a.lineTo(0, 0);
      a.rect(b.x, b.y, b.width, b.height);
    }, type:"function"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverBackground");
    a = {x:b.x, y:b.y, width:b.width, height:b.height, rounding:0, type:"rrect"};
    this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverContent");
    for (a = 0; a < this.Buttons.length; a++) {
      this.Buttons[a].ProcessInput();
    }
  }, parameter:this.Engine};
};
MultipleChoice.prototype._createUpdateFunctionObject = function() {
  return {that:this, "function":function(a) {
    this._recalculateSizes();
    for (a = 0; a < this.Buttons.length; a++) {
      this.Buttons[a].Update();
    }
  }, parameter:this.Engine};
};
MultipleChoice.prototype._createMouseHandlerObject = function() {
  return {that:this, "function":function(a) {
    this.IsMouseOverBackground && (this.MustDecide ? this.IllegalStop() : this.Stop(), a.GoThrough = !1);
  }, parameter:this.Engine};
};
MultipleChoice.prototype.Start = function() {
  this.Active = !0;
  (new Flow(this, "Opacity", 1, 600, {that:this, parameter:!0, "function":function(a) {
  }})).Start();
  var a = this._createProcessInputFunctionObject();
  this._ref_ip = this.Engine.AddProcessInputFunction(a);
  a = this._createForegroundDrawFunctionObject();
  this._ref_draw = this.Engine.AddForegroundDrawFunctionObject(a);
  a = this._createUpdateFunctionObject();
  this._ref_upd = this.Engine.AddUpdateFunctionObject(a);
  a = this._createMouseHandlerObject();
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", a);
};
MultipleChoice.prototype.Stop = function() {
  this.Active = !1;
  this.Engine.RemoveForegroundDrawFunctionObject(this._ref_draw);
  this._ref_draw = null;
  this.Engine.RemoveUpdateFunctionObject(this._ref_upd);
  this._ref_upd = null;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mhan);
  this._ref_mhan = null;
  this.Engine.RemoveProcessInputFunction(this._ref_ip);
  this._ref_ip = null;
};
MultipleChoice.prototype.IllegalStop = function() {
  Callback.CallObject(this.OnIllegalStopCBO);
};
function Prompt(a, b, c) {
  EngineObject.call(this);
  "undefined" === typeof c && (c = !1);
  this._numPad = c;
  this.Message = a || "Input:";
  this.CallbackObject = b || {that:this, parameter:{}, "function":function(a, b) {
    console.log("Prompt: " + a);
  }};
  this.Input = "";
  a = this.Engine.Canvas;
  this.Y = this.X = 0;
  this.Width = a.width;
  this.Height = a.height;
  this.Opacity = 1;
  this.FontHeight = 16;
  this.FontPadding = 4;
  this.RowSpace = 3;
  this.Rows = [this.Message];
  this.RowLengths = [];
  this.BoxPadding = 10;
  this.InputField = !1;
  this.BackgroundColor = Prompt.prototype.DefaultBackgroundColor;
  this.BorderColor = Prompt.prototype.DefaultBorderColor;
  this.FontColor = Prompt.prototype.DefaultFontColor;
  this.ButtonColor = Prompt.prototype.DefaultButtonColor;
  this.ButtonFontColor = Prompt.prototype.DefaultButtonFontColor;
  this.OutsideColor = Prompt.prototype.DefaultOutsideColor;
  this.Box = {x:this.Width / 4, y:this.Height / 3, width:this.Width / 2, height:this.Height / 3, rounding:8, type:"rrect"};
  this.MessageBox = {x:this.Box.x + this.BoxPadding, y:this.Box.y + this.BoxPadding, width:this.Box.width - 2 * this.BoxPadding, height:this.Rows.length * this.FontHeight + (this.Rows.length - 1) * this.RowSpace + 2 * this.FontPadding, type:"rect"};
  this.InputBox = {height:this.FontHeight + 2 * this.FontPadding};
  this.NumButtonHeight = this.NumButtonWidth = 40;
  this.NumFontHeight = this.NumButtonWidth < this.NumButtonHeight ? this.NumButtonWidth : this.NumButtonHeight;
  this.NumFontHeight *= 0.8;
  this.NumPad = {height:4 * this.NumButtonHeight + 3 * this.RowSpace};
  this.Numbers = [];
  this.Delete = {};
  this.ButtonBox = {height:30 + 2 * this.BoxPadding};
  this.OKButton = {};
  this.CancelButton = {};
  this.IsMouseOverBackground = this.IsMouseOverCancel = this.IsMouseOverOK = this.IsMouseOverInputBox = this.IsMouseOverBox = !1;
  this.IsMouseOverNumber = [!1, !1, !1, !1, !1, !1, !1, !1, !1, !1];
  this._ref_mhan = this._ref_pi = this._ref_update = this._ref_draw = null;
  this.Initialize();
}
Prompt.prototype = Object.create(EngineObject.prototype);
Prompt.prototype.constructor = Prompt;
Prompt.prototype.DefaultBackgroundColor = "#ccc";
Prompt.prototype.DefaultBorderColor = "#000";
Prompt.prototype.DefaultFontColor = "#222";
Prompt.prototype.DefaultButtonColor = "#aaa";
Prompt.prototype.DefaultButtonFontColor = "#111";
Prompt.prototype.DefaultOutsideColor = "rgba(0,0,0,0.6)";
Prompt.prototype.Initialize = function() {
  this._calculateRows();
  this._recalculateBoxValues();
  this._numPad && (this.DeleteImage = this._getDeleteImage(this.NumButtonWidth, this.NumButtonHeight));
  this.InputField = new InputField(this.InputBox.x, this.InputBox.y, this.InputBox.width, this.InputBox.height);
};
Prompt.prototype._calculateRows = function() {
  var a = document.createElement("CANVAS");
  a.width = this.MessageBox.width;
  a.height = this.MessageBox.height;
  var b = a.getContext("2d");
  b.font = this.Engine.Context.font;
  b.setFontHeight(this.FontHeight);
  var c = [], d = [this.Message];
  for (a = 0; a < d.length; a++) {
    var e = d[a].split(" ");
    for (var f = 0; f < e.length; f++) {
      c.push(e[f]);
    }
    a < d.length - 1 && c.push("\\n");
  }
  d = b.measureText(" ").width;
  e = [];
  for (a = 0; a < c.length; a++) {
    "\\n" !== c[a] ? e.push(b.measureText(c[a]).width) : e.push(0);
  }
  b = [];
  f = [];
  b.push("");
  f.push(0);
  for (a = 0; a < c.length; a++) {
    "\\n" === c[a] ? (a++, b.push(c[a] + " "), f.push(0 + e[a] + d)) : f[b.length - 1] + e[a] + d < this.MessageBox.width - 2 * this.FontPadding ? (b[b.length - 1] += c[a] + " ", f[b.length - 1] += e[a] + d) : (b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1), f[b.length - 1] -= d, b.push(c[a] + " "), f.push(e[a] + d));
  }
  b[b.length - 1] = b[b.length - 1].substr(0, b[b.length - 1].length - 1);
  this.Rows = b;
  this.RowLengths = f;
  for (a = c = 0; a < b.length; a++) {
    f[a] > c && (c = f[a]);
  }
  this.Box = {x:0, y:0, width:c + 2 * this.BoxPadding, height:-1, rounding:8, type:"rrect"};
  this.MessageBox = {x:this.BoxPadding, y:this.BoxPadding, width:this.Box.width - 2 * this.BoxPadding, height:this.Rows.length * this.FontHeight + (this.Rows.length - 1) * this.RowSpace + 2 * this.FontPadding, type:"rect"};
};
Prompt.prototype._recalculateBoxValues = function() {
  this.InputBox = {x:this.MessageBox.x, y:this.MessageBox.y + this.MessageBox.height + this.BoxPadding, width:this.MessageBox.width, height:this.FontHeight + 2 * this.FontPadding, type:"rect"};
  this.NumPad = {x:this.InputBox.x, y:this.InputBox.y + this.BoxPadding, width:this.MessageBox.width, height:0, type:"rect"};
  if (this._numPad) {
    this.NumPad = {x:this.InputBox.x, y:this.InputBox.y + this.InputBox.height + this.BoxPadding, width:this.MessageBox.width, height:4 * this.NumButtonHeight + 3 * this.RowSpace, type:"rect"};
    var a = this.NumPad.y;
    this.Numbers = [];
    this.Numbers[7] = {x:this.NumPad.x, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[8] = {x:this.NumPad.x + this.NumButtonWidth + this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[9] = {x:this.NumPad.x + 2 * this.NumButtonWidth + 2 * this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    a = this.NumPad.y + this.NumButtonHeight + this.RowSpace;
    this.Numbers[4] = {x:this.NumPad.x, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[5] = {x:this.NumPad.x + this.NumButtonWidth + this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[6] = {x:this.NumPad.x + 2 * this.NumButtonWidth + 2 * this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    a = this.NumPad.y + 2 * this.NumButtonHeight + 2 * this.RowSpace;
    this.Numbers[1] = {x:this.NumPad.x, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[2] = {x:this.NumPad.x + this.NumButtonWidth + this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[3] = {x:this.NumPad.x + 2 * this.NumButtonWidth + 2 * this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    this.Delete = {x:this.NumPad.x + 3 * this.NumButtonWidth + 3 * this.RowSpace, y:a, width:2 * this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
    a = this.NumPad.y + 3 * this.NumButtonHeight + 3 * this.RowSpace;
    this.Numbers[0] = {x:this.NumPad.x, y:a, width:(3 * this.NumButtonWidth + this.RowSpace) / 2, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[10] = {x:this.Numbers[0].x + this.Numbers[0].width + this.RowSpace, y:a, width:(3 * this.NumButtonWidth + this.RowSpace) / 2, height:this.NumButtonHeight, type:"rect"};
    this.Numbers[11] = {x:this.Numbers[10].x + this.Numbers[10].width + this.RowSpace, y:a, width:this.NumButtonWidth, height:this.NumButtonHeight, type:"rect"};
  }
  this.ButtonBox = {x:this.NumPad.x, y:this.NumPad.y + this.NumPad.height + this.BoxPadding, width:this.MessageBox.width, height:30 + this.BoxPadding, type:"rect", background:!0};
  a = this.ButtonBox.width / 3 + 10;
  this.OKButton = {x:this.ButtonBox.x + this.ButtonBox.width / 4 - a / 2, y:this.ButtonBox.y + 2 + this.BoxPadding, width:a, height:this.ButtonBox.height - 4, type:"rrect", rounding:4};
  this.CancelButton = {x:this.ButtonBox.x + this.ButtonBox.width / 4 * 3 - a / 2, y:this.ButtonBox.y + 2 + this.BoxPadding, width:a, height:this.ButtonBox.height - 4, type:"rrect", rounding:4};
  a = this.Box.height + this.MessageBox.height + this.InputBox.height + this.NumPad.height + this.ButtonBox.height;
  a = this._numPad ? a + 6 * this.BoxPadding : a + 4 * this.BoxPadding;
  this.Box.height = a;
  this.Move((this.Width - this.Box.width) / 2, (this.Height - this.Box.height) / 2);
};
Prompt.prototype.Move = function(a, b) {
  this.Box.x += a;
  this.Box.y += b;
  this.MessageBox.x += a;
  this.MessageBox.y += b;
  this.InputBox.x += a;
  this.InputBox.y += b;
  this.NumPad.x += a;
  this.NumPad.y += b;
  for (var c = 0; this._numPad && c < this.Numbers.length; c++) {
    this.Numbers[c].x += a, this.Numbers[c].y += b;
  }
  this.Delete.x += a;
  this.Delete.y += b;
  this.ButtonBox.x += a;
  this.ButtonBox.y += b;
  this.OKButton.x += a;
  this.OKButton.y += b;
  this.CancelButton.x += a;
  this.CancelButton.y += b;
};
Prompt.prototype.Start = function() {
  this.InputField.Selected = !0;
  var a = this._createProcessInputFunctionObject();
  this._ref_ip = this.Engine.AddProcessInputFunction(a);
  a = this._createForegroundDrawFunctionObject();
  this._ref_draw = this.Engine.AddForegroundDrawFunctionObject(a);
  a = this._createUpdateFunctionObject();
  this._ref_update = this.Engine.AddUpdateFunctionObject(a);
  a = this._createMouseHandlerObject();
  this._ref_mhan = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", a);
};
Prompt.prototype.Stop = function() {
  this.InputField.Selected = !1;
  this.Engine.RemoveForegroundDrawFunctionObject(this._ref_draw);
  this._ref_draw = null;
  this.Engine.RemoveUpdateFunctionObject(this._ref_update);
  this._ref_update = null;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mhan);
  this._ref_mhan = null;
  this.Engine.RemoveProcessInputFunction(this._ref_ip);
  this._ref_ip = null;
};
Prompt.prototype._createMouseHandlerObject = function() {
  return {that:this, "function":function(a) {
    a.GoThrough = !1;
    this.IsMouseOverOK && this.ClickOnOK();
    (this.IsMouseOverCancel || this.IsMouseOverBackground) && this.ClickOnCancel();
    for (a = 0; a < this.Numbers.length; a++) {
      if (this.IsMouseOverNumber[a]) {
        var b = a.toString();
        10 == a && (b = ",");
        11 == a && (b = "-");
        this.InputField.AddLetter(b);
      }
    }
    this.IsMouseOverDelete && this.InputField.RemoveLetter();
  }, parameter:this.Engine};
};
Prompt.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, "function":function(a) {
    a.save();
    a.globalAlpha = this.Opacity;
    a.fillStyle = this.OutsideColor;
    a.fillRect(0, 0, a.canvas.width, a.canvas.height);
    a.setFontHeight(this.FontHeight);
    var b = this.Box;
    a.fillStyle = this.BackgroundColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, b.rounding);
    a.strokeStyle = this.BorderColor;
    a.strokeVariousRoundedRect(b.x, b.y, b.width, b.height, b.rounding);
    a.textAlign = "left";
    a.textBaseline = "top";
    a.fillStyle = this.FontColor;
    for (var c = b = 0; c < this.Rows.length; c++) {
      a.fillText(this.Rows[c], this.MessageBox.x, this.MessageBox.y + c * this.FontHeight + b), b += this.RowSpace;
    }
    this.InputField && this.InputField.Draw(a);
    a.restore();
    a.save();
    if (this._numPad) {
      a.setFontHeight(this.NumFontHeight);
      for (c = 0; c < this.Numbers.length; c++) {
        b = this.Numbers[c];
        a.fillStyle = this.ButtonColor;
        a.fillRect(b.x, b.y, b.width, b.height);
        a.fillStyle = this.ButtonFontColor;
        var d = c.toString();
        10 == c && (d = ",");
        11 == c && (d = "-");
        a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, d, 0);
      }
      b = this.Delete;
      a.fillStyle = this.ButtonColor;
      a.fillRect(b.x, b.y, b.width, b.height);
      a.fillStyle = this.ButtonFontColor;
      a.fillArrow2(b.x + 0.9 * b.width, b.y + b.height / 2, b.x + 0.1 * b.width, b.y + b.height / 2, b.height / 2);
      a.setFontHeight(this.FontHeight);
    }
    b = this.OKButton;
    a.fillStyle = this.ButtonColor;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, b.rounding);
    b = this.CancelButton;
    a.fillVariousRoundedRect(b.x, b.y, b.width, b.height, b.rounding);
    b = this.OKButton;
    a.fillStyle = this.ButtonFontColor;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "OK", 0);
    b = this.CancelButton;
    a.fillSpinnedText(b.x + b.width / 2, b.y + b.height / 2, "Abbrechen", 0);
    a.restore();
  }, parameter:this.Engine.Context};
};
Prompt.prototype._createProcessInputFunctionObject = function() {
  return {that:this, "function":function(a) {
    a = this.Engine.Input.Key;
    2 == a.Enter.FramesPressed && this.ClickOnOK();
    2 == a.Esc.FramesPressed && this.ClickOnCancel();
    var b = this;
    this.Engine.Input.MouseHandler.AddHoverRequest({type:"function", "function":function(a) {
      a.moveTo(0, 0);
      a.lineTo(0, a.canvas.height);
      a.lineTo(a.canvas.width, a.canvas.height);
      a.lineTo(a.canvas.width, 0);
      a.lineTo(0, 0);
      a.variousRoundedRect(b.Box.x, b.Box.y, b.Box.width, b.Box.height, b.Box.rounding);
    }}, this, "IsMouseOverBackground");
    this.Engine.Input.MouseHandler.AddHoverRequest(this.Box, this, "IsMouseOverBox");
    this.Engine.Input.MouseHandler.AddHoverRequest(this.Delete, this, "IsMouseOverDelete");
    this.Engine.Input.MouseHandler.AddHoverRequest(this.CancelButton, this, "IsMouseOverCancel");
    this.Engine.Input.MouseHandler.AddHoverRequest(this.OKButton, this, "IsMouseOverOK");
    for (a = 0; a < this.Numbers.length; a++) {
      this.Engine.Input.MouseHandler.AddHoverRequest(this.Numbers[a], this.IsMouseOverNumber, a.toString());
    }
    this.InputField && this.InputField.ProcessInput();
  }, parameter:this.Engine};
};
Prompt.prototype._createUpdateFunctionObject = function() {
  return {that:this, "function":function(a) {
    a = !1;
    for (var b = 0; b < this.Numbers.length; b++) {
      a = a || this.IsMouseOverNumber[b];
    }
    (this.IsMouseOverOK || this.IsMouseOverCancel || a || this.IsMouseOverDelete) && this.Engine.Input.Mouse.Cursor.Set("pointer");
    this.InputField && this.InputField.Update();
    this.Input = this._getInput();
  }, parameter:this.Engine};
};
Prompt.prototype._getInput = function() {
  return this.InputField.Text;
};
Prompt.prototype._setInput = function(a) {
  this.InputField.Text = a;
};
Prompt.prototype.AddCharLimiter = function(a, b) {
  this.InputField.AddCharLimiter(a, b);
};
Prompt.prototype.ClickOnOK = function() {
  var a = this.CallbackObject;
  a && a["function"].call(a.that, this.Input, a.parameter);
  this.Stop();
};
Prompt.prototype.ClickOnCancel = function() {
  this.Stop();
};
Prompt.prototype._getDeleteImage = function(a, b) {
  var c = document.createElement("canvas");
  c.width = a;
  c.height = b;
  var d = c.getContext("2d");
  d.beginPath();
  d.arrow(0.9 * a, 0.5 * b, 0.3 * a, 0.8 * a, 180, 0.3, 1, !1);
  d.fill();
  c = c.toDataURL();
  d = document.createElement("IMG");
  d.src = c;
  return d;
};
function SlideMenu(a, b) {
  ABO.call(this);
  this.Tabs = [];
  this.OpenTab = null;
  this.AttachedSide = a;
  this.DistanceToCanvasNullpoint = b;
  this.MarginBetweenTabs = 5;
  this.NeededDepth = 0;
}
SlideMenu.prototype = Object.create(ABO.prototype);
SlideMenu.prototype.constructor = SlideMenu;
SlideMenu.prototype.Draw = function(a) {
  a.save();
  for (var b = 0; b < this.Tabs.length; b++) {
    this.Tabs[b].Draw(a);
  }
  a.restore();
};
SlideMenu.prototype.Update = function() {
  for (var a = this.Engine.Input.Mouse, b = 0; b < this.Tabs.length; b++) {
    this.Tabs[b].Update(a);
  }
};
SlideMenu.prototype.ProcessInput = function() {
  for (var a = 0; a < this.Tabs.length; a++) {
    this.Tabs[a].ProcessInput();
  }
};
SlideMenu.prototype.AddTab = function(a) {
  a = new Tab(a, this);
  var b = 0;
  "left" == this.AttachedSide && (b += this.DistanceToCanvasNullpoint);
  for (var c = 0; c < this.Tabs.length; c++) {
    b += this.Tabs[c].Height + this.MarginBetweenTabs;
  }
  a.Y = b;
  this.Tabs.push(a);
  return a;
};
SlideMenu.prototype.CloseAllTabs = function(a) {
  null !== this.OpenTab && (a ? this.OpenTab.QuickClose() : this.OpenTab.Close());
};
SlideMenu.prototype.GetTabsByName = function(a) {
  for (var b = [], c = 0; c < this.Tabs.length; c++) {
    this.Tabs[c].Label === a && b.push(this.Tabs[c]);
  }
  return b;
};
SlideMenu.prototype.Delete = function() {
  for (var a = 0; a < this.Tabs.length; a++) {
    this.Tabs[a].RemoveMouseHandler();
  }
};
function Slider(a, b, c, d) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.Height = d;
  this.OnValueChangeCBO = !1;
  this.Handle = {x:a, width:10, height:d};
  this._oldValue;
  this.Value = 0;
  this.ValueLimits = [0.2, 2];
  this.DecimalDigits = 1;
  this.IsMouseOver = this.IsMouseOverSliderHandle = this._dragging = !1;
  this._ref_mh = this._ref = null;
  this._noValueChange = !1;
  this.Color = Slider.prototype.DefaultColor;
  this.Initialize();
}
Slider.prototype = Object.create(ABO.prototype);
Slider.prototype.constructor = Slider;
Slider.prototype.DefaultColor = "rgba(100,100,120,1)";
Slider.prototype.Initialize = function() {
  this.AddProcessInputFunction();
  this.AddMouseHandler();
};
Slider.prototype.AddProcessInputFunction = function() {
  this._ref = this.Engine.AddProcessInputFunction({parameter:this.Engine, that:this, "function":function(a) {
    a = a.Input.Mouse;
    this.IsMouseOverSliderHandle && a.Left.Down && (this._dragging = !0);
    a.Left.Up && (this._dragging = !1);
  }}, 2);
};
Slider.prototype.RemoveProcessInputFunction = function() {
  this.Engine.RemoveProcessInputFunction(this._ref);
};
Slider.prototype.AddMouseHandler = function() {
  this._ref_mh = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOver && !this.IsMouseOverSliderHandle && (a.GoThrough = !1, this.SetValue(Math.round((a.Mouse.Position.Camera.X - this.X) / this.Width * 100) / 100 * (this.ValueLimits[1] - this.ValueLimits[0]) + this.ValueLimits[0]));
  }}, 4);
};
Slider.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref_mh);
};
Slider.prototype.Update = function() {
  var a = this.Engine.Input.Mouse.Position;
  this._dragging && (this.Handle.x += a.Delta.X, this.Handle.x < this.X && (this.Handle.x = this.X), this.Handle.x > this.X + this.Width && (this.Handle.x = this.X + this.Width), this.Value = (this.Handle.x - this.X) / this.Width * (this.ValueLimits[1] - this.ValueLimits[0]) + this.ValueLimits[0], this.Value = 0 < this.DecimalDigits ? Math.round(this.Value * Math.pow(10, this.DecimalDigits)) / Math.pow(10, this.DecimalDigits) : Math.round(this.Value), this.OnValueChangeCBO && (this._noValueChange && 
  this.ResetValue(), a = this.OnValueChangeCBO, a["function"].call(a.that, this.Value)));
  this.IsMouseOverSliderHandle && (this._noValueChange ? this.Engine.Input.Mouse.Cursor.not_allowed() : this.Engine.Input.Mouse.Cursor.pointer());
  this._oldValue = this.Value;
};
Slider.prototype.ProcessInput = function() {
  var a = {x:this.X, y:this.Y - this.Handle.height / 2, width:this.Width, height:this.Handle.height, type:"rect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
  a = {x:this.Handle.x - this.Handle.width / 2, y:this.Y - this.Handle.height / 2, width:this.Handle.width, height:this.Handle.height, rounding:2, type:"rrect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverSliderHandle");
};
Slider.prototype.Draw = function(a) {
  a.save();
  a.fillStyle = this.Color;
  a.beginPath();
  a.moveTo(this.X, this.Y);
  a.lineTo(this.X + this.Width, this.Y);
  a.closePath();
  a.stroke();
  var b = this.Handle.x - this.Handle.width / 2, c = this.Y - this.Handle.height / 2;
  a.fillVariousRoundedRect(b, c, this.Handle.width, this.Handle.height, 2);
  a.strokeVariousRoundedRect(b, c, this.Handle.width, this.Handle.height, 2);
  a.restore();
};
Slider.prototype.GetValue = function() {
  return this.Value;
};
Slider.prototype.SetValue = function(a) {
  if (a < this.ValueLimits[0] || a > this.ValueLimits[1]) {
    return !1;
  }
  this.Value = a;
  this.Value = 0 < this.DecimalDigits ? Math.round(this.Value * Math.pow(10, this.DecimalDigits)) / Math.pow(10, this.DecimalDigits) : Math.round(this.Value);
  this.Handle.x = (this.Value - this.ValueLimits[0]) / (this.ValueLimits[1] - this.ValueLimits[0]) * this.Width + this.X;
  this.OnValueChangeCBO && (a = this.OnValueChangeCBO, a["function"].call(a.that, this.Value));
  return !0;
};
Slider.prototype.SetLimits = function(a, b) {
  this.ValueLimits = [a, b];
  this.Value = a;
  this.Handle.x = this.X;
  if (this.OnValueChangeCBO) {
    var c = this.OnValueChangeCBO;
    c["function"].call(c.that, this.Value);
  }
};
Slider.prototype.ResetValue = function() {
  this.SetValue(this._oldValue);
};
function Spline() {
  ABO.call(this);
  this.Canvas = {width:this.Engine.Canvas.width, height:this.Engine.Canvas.height};
  this.Points = [];
  this._pointsStack = [];
  this.SecondControlPoints = this.FirstControlPoints = !1;
  this.Color = "black";
  this.LineWidth = 3;
  this._useDashedLine = !1;
  this._dashedLineValues = [0, 0];
  this.FilteredImage = this.DrawPoints = this._close = !1;
  this.Initialize();
}
Spline.prototype = Object.create(ABO.prototype);
Spline.prototype.constructor = Spline;
Spline.prototype.Initialize = function() {
};
Spline.prototype.AddPoint = function(a, b) {
  var c = "number" === typeof a ? {x:a, y:b} : a;
  this.Points.push(c);
  this._pointsStack.push(c);
  this._updatePoints();
};
Spline.prototype.RemoveLastPoint = function() {
  if (0 !== this.Points.length) {
    var a = this._pointsStack.pop();
    a = this.Points.getIndex(a);
    this.Points["delete"](a);
    this._updatePoints();
  }
};
Spline.prototype.Draw = function(a) {
  a.save();
  if (2 <= this.Points.length) {
    a.lineJoin = "round";
    this._useDashedLine && a.setLineDash(this._dashedLineValues);
    a.strokeStyle = this.Color;
    a.lineWidth = this.LineWidth;
    a.lineCap = "butt";
    for (var b = 0; b < this.Points.length - 1; b++) {
      var c = this.Points[b];
      var d = this.FirstControlPoints[b];
      var e = this.SecondControlPoints[b];
      var f = this.Points[b + 1];
      a.beginPath();
      a.moveTo(c.x, c.y);
      a.bezierCurveTo(d.x, d.y, e.x, e.y, f.x, f.y);
      a.stroke();
    }
  }
  if (this.DrawPoints) {
    for (a.strokeStyle = "black", a.lineWidth = 1.5, b = 0; b < this.Points.length; b++) {
      a.drawCross(this.Points[b].x, this.Points[b].y, 6);
    }
  }
  a.restore();
};
Spline.prototype.Update = function() {
};
Spline.prototype.SetDash = function(a, b, c) {
  "boolean" !== typeof a && (a = !1);
  isNaN(b) && (b = 10);
  isNaN(c) && (c = 6);
  this._useDashedLine = a;
  this._dashedLineValues = [b, c];
};
Spline.prototype._createImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Canvas.width;
  a.height = this.Canvas.height;
  var b = a.getContext("2d");
  b.lineCap = "round";
  b.strokeStyle = getRGBA(this.Color, 1, 0.75);
  b.lineWidth = 8;
  b.filter = "blur(4px)";
  if (2 <= this.Points.length) {
    b.lineJoin = "round";
    this._useDashedLine && b.setLineDash(this._dashedLineValues);
    for (var c = 0; c < this.Points.length - 1; c++) {
      var d = this.Points[c];
      var e = this.FirstControlPoints[c];
      var f = this.SecondControlPoints[c];
      var g = this.Points[c + 1];
      b.beginPath();
      b.moveTo(d.x, d.y);
      b.bezierCurveTo(e.x, e.y, f.x, f.y, g.x, g.y);
      b.stroke();
    }
  }
  a = a.toDataURL();
  this.FilteredImage = document.createElement("IMG");
  this.FilteredImage.src = a;
};
Spline.prototype.SetColor = function(a) {
  this.Color = a;
};
Spline.prototype.CircularSort = function(a, b) {
  "string" !== typeof resultGap && (resultGap = "right");
  for (var c = 0; c < this.Points.length; c++) {
    this.Points[c]._angleRadian = this._getAngle(a, this.Points[c], b), this.Points[c]._angleDegree = 180 * this.Points[c]._angle / Math.PI;
  }
  this.Points.sort(function(a, b) {
    return a._angleRadian > b._angleRadian ? 1 : -1;
  });
  this._updatePoints();
};
Spline.prototype._updatePoints = function() {
  this._calculateCurveControlPoints();
};
Spline.prototype._getAngle = function(a, b, c) {
  "string" !== typeof c && (c = "right");
  if ("top" === c || "bottom" === c) {
    if ("top" === c) {
      var d = a.x - b.x;
      var e = a.y - b.y;
    }
    "bottom" === c && (d = b.x - a.x, e = b.y - a.y);
    var f = Math.atan2(d, e);
  }
  if ("left" === c || "right" === c) {
    "left" === c && (d = a.x - b.x, e = a.y - b.y), "right" === c && (d = b.x - a.x, e = b.y - a.y), f = Math.atan2(e, d);
  }
  return 0 > f ? Math.PI + (Math.PI + f) : f;
};
Spline.prototype._getDistance = function(a, b) {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};
Spline.prototype._calculateCurveControlPoints = function() {
  if (!(1 >= this.Points.length)) {
    var a = [], b = [];
    if (2 === this.Points.length) {
      a.push({x:this.Points[1].x, y:this.Points[1].y}), b.push({x:this.Points[1].x, y:this.Points[1].y});
    } else {
      for (var c = [], d = 0; d < this.Points.length; d++) {
        c.push({x:this.Points[d].x, y:this.Points[d].y});
      }
      var e = c.length - 1, f = [];
      for (d = 1; d < e - 1; d++) {
        f[d] = 4 * c[d].x + 2 * c[d + 1].x;
      }
      f[0] = c[0].x + 2 * c[1].x;
      f[e - 1] = (8 * c[e - 1].x + c[e].x) / 2;
      var g = this._getFirstControlPoints(f);
      for (d = 1; d < e - 1; d++) {
        f[d] = 4 * c[d].y + 2 * c[d + 1].y;
      }
      f[0] = c[0].y + 2 * c[1].y;
      f[e - 1] = (8 * c[e - 1].y + c[e].y) / 2;
      f = this._getFirstControlPoints(f);
      for (d = 0; d < e; d++) {
        a[d] = {x:g[d], y:f[d]}, b[d] = d < e - 1 ? {x:2 * c[d + 1].x - g[d + 1], y:2 * c[d + 1].y - f[d + 1]} : {x:(c[e].x + g[e - 1]) / 2, y:(c[e].y + f[e - 1]) / 2};
      }
    }
    this.FirstControlPoints = a;
    this.SecondControlPoints = b;
  }
};
Spline.prototype._getFirstControlPoints = function(a) {
  var b = a.length, c = [], d = [], e = 2;
  c[0] = a[0] / e;
  for (var f = 1; f < b; f++) {
    d[f] = 1 / e, e = (f < b - 1 ? 4.0 : 3.5) - d[f], c[f] = (a[f] - c[f - 1]) / e;
  }
  for (f = 1; f < b; f++) {
    c[b - f - 1] -= d[b - f] * c[b - f];
  }
  return c;
};
Spline.prototype.SetCloseSpline = function(a) {
  this._close = a;
};
function Spotting(a, b) {
  ABO.call(this);
  this.Area = a;
  this.Height = this.Width = this.Y = this.X = 0;
  this.Following = !1;
  this._attr = this._instance = null;
  this.Radius = [];
  this.MinRadius = 0;
  this.Color = Spotting.prototype.DefaultColor;
  this.Title = "";
  this.TitleFontHeight = 26;
  this.Milliseconds = b;
  this.NumberCircles = 3;
  this._ref_dfo = null;
  this.Initialize();
}
Spotting.prototype = Object.create(ABO.prototype);
Spotting.prototype.constructor = Spotting;
Spotting.prototype.DefaultColor = "red";
Spotting.prototype.Initialize = function() {
  this._getSpot(this.Area);
  for (var a = Math.max(this.X, this.Y, this.Engine.Canvas.width - this.X, this.Engine.Canvas.height - this.Y), b = 0; b < this.NumberCircles; b++) {
    this.Radius[b] = a + 40 * b;
  }
};
Spotting.prototype._getSpot = function(a) {
  "circle" === a.type ? (this.X = a.x, this.Y = a.y, this.MinRadius = a.radius) : (this.X = a.x + a.width / 2, this.Y = a.y + a.height / 2, this.MinRadius = (a.width + a.height) / 4);
};
Spotting.prototype.Start = function(a) {
  var b = this._createForegroundDrawFunctionObject();
  this._ref_dfo = this.Engine.AddForegroundDrawFunctionObject(b);
  (new MultiFlow([this.Radius, this.Radius, this.Radius], ["0", "1", "2"], [this.MinRadius, this.MinRadius, this.MinRadius], this.Milliseconds)).Start();
  window.setTimeout(function(a, b) {
    a.Engine.RemoveForegroundDrawFunctionObject(a._ref_dfo);
    a._ref_dfo = null;
    "undefined" !== typeof b && b["function"].call(b.that, b.parameter);
  }, this.Milliseconds + 100, this, a);
};
Spotting.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, parameter:this.Engine, "function":function(a) {
    a.save();
    a.strokeStyle = this.Color;
    a.lineWidth = 2.5;
    a.beginPath();
    for (var b = 0; b < this.NumberCircles; b++) {
      a.circle(this.X, this.Y, this.Radius[b], !0);
    }
    a.stroke();
    a.restore();
  }};
};
function Sprite() {
  ABO.call(this);
  this.Image;
  this.DrawImage;
  this.Canvas;
  this.Context;
  this.Clippings = [];
  this.FlagList = {};
  this.Index = 0;
  this.Codename;
  this.Speed = 6;
  this.ActiveClipping = "undefined";
  this.Error = !1;
  this.Constructor = function() {
  };
  this.AddClipping = function() {
    for (var a, b = 0; b < arguments.length; b++) {
      a = arguments[b], a.EI = this.EI, this.Clippings.push(a);
    }
  };
  this.GetActiveFlags = function() {
    var a, b = [];
    for (a in this.FlagList) {
      this.FlagList[a] && b.push(a);
    }
    return b;
  };
  this.GetActiveClipping = function() {
    for (var a = this.GetActiveFlags(), b, c = 0; c < this.Clippings.length; c++) {
      if (b = this.Clippings[c].IsCorrectClipping(a)) {
        return this.Clippings[c];
      }
    }
  };
  this.UpdateActiveClipping = function() {
    this.ActiveClipping = this.GetActiveClipping();
    this.ActiveClipping.SpriteIndex = this.Index;
    this.ActiveClipping.CalculateDrawClip();
    this.Canvas = document.createElement("CANVAS");
    this.Canvas.width = this.ActiveClipping.Draw.Width;
    this.Canvas.height = this.ActiveClipping.Draw.Height;
    this.Context = this.Canvas.getContext("2d");
    var a = this.ActiveClipping;
    this.Context.drawImage(this.Image, a.Draw.X, a.Draw.Y, a.Draw.Width, a.Draw.Height, 0, 0, a.Draw.Width, a.Draw.Height);
    this.DrawImage = this.Canvas;
  };
  this.Constructor();
}
Sprite.prototype = Object.create(ABO.prototype);
Sprite.prototype.constructor = Sprite;
Sprite.prototype.SetSprite = function(a, b, c) {
  this.Codename = a;
  this.Speed = c ? c : 6;
  this.Image = this.Engine.MediaManager.GetImage(this.Codename);
  this.Image || (this.Error = !0);
  this.Engine.Counter.AddCounterFunction({parameter:this, "function":function(a) {
    a.Index++;
  }, every:this.Speed});
  this.FlagList = b;
};
Sprite.prototype.Update = function() {
  this.UpdateActiveClipping();
};
function Clipping(a, b, c, d, e, f) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Numbers = e;
  this.FlagNames = f;
  this.SpriteIndex = 0;
  this.Draw = {X:0, Y:0, Width:c, Height:d};
  this.IsCorrectClipping = function(a) {
    var b = !0;
    for (var c = 0; b && c < this.FlagNames.length; c++) {
      b = this.FlagNames[c], b = a.indexOf(b), b = 0 <= b ? !0 : !1;
    }
    return b;
  };
  this.CalculateDrawClip = function() {
    this.Draw.X = this.X + this.SpriteIndex % this.Numbers * this.Draw.Width;
    this.Draw.Y = this.Y;
  };
  this.GetDebugString = function() {
    for (var a = "", b = 0; b < this.FlagNames.length - 1; b++) {
      a += this.FlagNames[b] + ",";
    }
    0 < this.FlagNames.length && (a += this.FlagNames[this.FlagNames.length - 1]);
    return a;
  };
}
Clipping.prototype = Object.create(ABO.prototype);
Clipping.prototype.constructor = Clipping;
function Switch(a, b, c, d, e, f) {
  ABO.call(this);
  this.X = a;
  this.Y = b;
  this.Width = c;
  this.Height = d;
  this._innerRectDepth = Math.ceil(0.1 * Math.min(c, d));
  this.ON = "undefined" !== typeof f && f ? !0 : !1;
  "undefined" !== typeof e && e || (e = {that:this, "function":function() {
  }});
  this.CallbackObject = e;
  this.Cover = {x:this.X, y:this.Y, width:0.6 * this.Width, height:this.Height};
  this.CoverLayer = !1;
  this.CoverX = {Off:this.X, On:this.X + this.Width - this.Cover.width};
  this.BackgroundColor = Switch.prototype.DefaultBackgroundColor;
  this.CoverColor = Switch.prototype.DefaultCoverColor;
  this.IsMouseOver = !1;
  this.TextOn = "An";
  this.TextOff = "Aus";
  this.FontHeight = 0.5 * this.Height;
  this.ColorOn = Switch.prototype.DefaultColorOn;
  this.ColorOff = Switch.prototype.DefaultColorOff;
  this.SwitchFontColor = Switch.prototype.DefaultFontColor;
  this.LabelFontColor = Switch.prototype.DefaultLabelFontColor;
  this.Label = "";
  this.LabelPos = "top";
  this._ref = null;
  this.Initialize();
}
Switch.prototype = Object.create(ABO.prototype);
Switch.prototype.constructor = Switch;
Switch.prototype.DefaultBackgroundColor = "grey";
Switch.prototype.DefaultCoverColor = !1;
Switch.prototype.DefaultLabelFontColor = "black";
Switch.prototype.DefaultFontColor = "white";
Switch.prototype.DefaultColorOn = "green";
Switch.prototype.DefaultColorOff = "red";
Switch.prototype.DefaultRounding = 4;
Switch.prototype.Initialize = function() {
  this.AddMouseHandler();
  this.CoverColor || (this.CoverColor = this._getRGBA(this.BackgroundColor, 1, 0.3));
  this.Cover.x = this.ON ? this.CoverX.On : this.CoverX.Off;
  this._createCoverLayer();
};
Switch.prototype.Switch = function(a) {
  this.ON = !this.ON;
  (new Flow(this.Cover, "x", this.ON ? this.CoverX.On : this.CoverX.Off, 300)).Start();
  "undefined" === typeof a && (a = this.CallbackObject);
  window.setTimeout(function(a) {
    Callback.CallObject(a);
  }, 150, a);
};
Switch.prototype.SetOn = function(a) {
  this.ON = a;
  this.Cover.x = this.ON ? this.CoverX.On : this.CoverX.Off;
};
Switch.prototype.SetCallbackObject = function(a) {
  this.CallbackObject = a;
};
Switch.prototype.Draw = function(a) {
  a.save();
  var b = this._innerRectDepth;
  a.fillStyle = this.BackgroundColor;
  a.fillRect(this.X, this.Y, this.Width, this.Height);
  a.fillStyle = this.ColorOn;
  a.fillRect(this.X + b, this.Y + b, this.Width / 2 - b, this.Height - 2 * b);
  a.fillStyle = this.ColorOff;
  a.fillRect(this.X + this.Width / 2, this.Y + b, this.Width / 2 - b, this.Height - 2 * b);
  a.fillStyle = this.SwitchFontColor;
  a.setFontHeight(this.FontHeight);
  a.textBaseline = "middle";
  a.textAlign = "left";
  a.fillText(this.TextOn, this.X + 2 * b, this.Y + this.Height / 2);
  a.textAlign = "right";
  a.fillText(this.TextOff, this.X + this.Width - 2 * b, this.Y + this.Height / 2);
  a.fillStyle = this.CoverColor;
  a.fillRect(this.Cover.x, this.Cover.y, this.Cover.width, this.Cover.height);
  this.CoverLayer && a.drawImage(this.CoverLayer, this.Cover.x, this.Cover.y);
  if (this.IsMouseOver) {
    var c = this.Cover.x + 0.2 * this.Cover.width, d = this.Cover.x + 0.8 * this.Cover.width, e = this.Y + this.Height / 2;
    a.fillStyle = "white";
    a.beginPath();
    this.ON ? a.arrow2(d, e, c, e, 0.5 * this.Cover.height, 0.5) : a.arrow2(c, e, d, e, 0.5 * this.Cover.height, 0.5);
    a.fill();
    a.fillStyle = "rgba(0,0,0,0.2)";
    a.fillRect(this.Cover.x, this.Cover.y, this.Cover.width, this.Cover.height);
  }
  if (0 < this.Label.length) {
    a.setFontHeight(16);
    a.measureText(this.Label);
    switch(this.LabelPos) {
      case "top":
        a.textAlign = "center";
        var f = this.X + this.Width / 2;
        var g = this.Y - b - 8;
    }
    a.fillStyle = this.LabelFontColor;
    a.fillText(this.Label, f, g);
  }
  a.restore();
};
Switch.prototype.Update = function() {
  this.IsMouseOver && this.Engine.Input.Mouse.Cursor.Set("pointer");
};
Switch.prototype.ProcessInput = function() {
  this.Engine.Input.MouseHandler.AddHoverRequest(this.GetArea(0, this.Rounding), this, "IsMouseOver");
};
Switch.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOver && (a.GoThrough = !1, this.Switch());
  }}, 5);
};
Switch.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref);
  this._ref = null;
};
Switch.prototype._createCoverLayer = function(a, b) {
  isNaN(a) && (a = this._innerRectDepth);
  if ("undefined" === typeof b || 0 >= b.length) {
    b = [{stop:0, color:"rgba(255,255,255,0.5)"}, {stop:0.5, color:"rgba(255,255,255,0.25)"}, {stop:1, color:"rgba(255,255,255,0)"}];
  }
  b = b.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var c = [{stop:0, color:"rgba(0,0,0,0.5)"}, {stop:0.5, color:"rgba(0,0,0,0.25)"}, {stop:1, color:"rgba(0,0,0,0)"}];
  c = c.sort(function(a, b) {
    return a.stop > b.stop ? 1 : -1;
  });
  var d = this.Cover.width, e = this.Cover.height, f = a, g = e - a, h = a, k = document.createElement("CANVAS");
  k.width = d;
  k.height = e;
  e = k.getContext("2d");
  for (var m = e.createLinearGradient(0, 0, 0, f), l = 0; l < b.length; l++) {
    m.addColorStop(b[l].stop, b[l].color);
  }
  e.fillStyle = m;
  e.fillRect(0, 0, d, f);
  m = e.createLinearGradient(0, g + h, 0, g);
  for (l = 0; l < b.length; l++) {
    m.addColorStop(c[l].stop, c[l].color);
  }
  e.fillStyle = m;
  e.fillRect(0, g, d, h);
  c = k.toDataURL();
  d = document.createElement("IMG");
  d.src = c;
  this.CoverLayer = d;
};
Switch.prototype._getRGBA = function(a, b, c) {
  if ("string" !== typeof a) {
    return !1;
  }
  if ("undefined" === typeof b || 0 > b && 1 < b) {
    b = 1;
  }
  "undefined" === typeof c && isNaN(c) && (c = 0);
  var d = document.createElement("CANVAS");
  d.width = 1;
  d.height = 1;
  d = d.getContext("2d");
  d.fillStyle = a;
  d.fillRect(0, 0, 1, 1);
  a = d.getImageData(0, 0, 1, 1).data;
  a[0] += 255 * c;
  255 < a[0] && (a[0] = 255);
  0 > a[0] && (a[0] = 0);
  a[1] += 255 * c;
  255 < a[1] && (a[1] = 255);
  0 > a[1] && (a[1] = 0);
  a[2] += 255 * c;
  255 < a[2] && (a[2] = 255);
  0 > a[2] && (a[2] = 0);
  return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + b + ")";
};
Switch.prototype.SetLabel = function(a, b) {
  "string" === typeof a && (this.Label = a);
  if ("left" === b || "top" === b || "right" === b || "bottom" === b) {
    this.LabelPos = b;
  }
};
function Tab(a, b) {
  ABO.call(this);
  this.TIN = this.UniqueID;
  this.Label = a;
  this.SlideMenu = b;
  this.Items = [];
  this.Y = this.X = 0;
  this.OldX = -1;
  this.Width = 35;
  this.Height = 90;
  this.IsMouseOverMenu = this.IsMouseOver = !1;
  this.FontSize = 18;
  this.LabelPadding = 10;
  this.Rounding = 4;
  this.Selected = !1;
  this.Menu = {Depth:100, X:0, Y:20, Width:0};
  this._stops = [{stop:0, color:"rgba(0,0,0,0.5)"}, {stop:0.5, color:"rgba(0,0,0,0.25)"}, {stop:1, color:"rgba(0,0,0,0)"}];
  this._ling;
  this.IsOpen = !1;
  this._ref = null;
  this.Initialize();
}
Tab.prototype = Object.create(ABO.prototype);
Tab.prototype.constructor = Tab;
Tab.prototype.FontColor = "#000";
Tab.prototype.BackgroundColor = "#aaa";
Tab.prototype.BackgroundColorSelected = "#ccc";
Tab.prototype.BreaklineColor = "#666";
Tab.prototype.Initialize = function() {
  this.AddMouseHandler();
  var a = this.Engine.Context;
  a.save();
  a.setFontHeight(this.FontSize);
  var b = a.measureText(this.Label).width;
  a.restore();
  "left" == this.SlideMenu.AttachedSide && (this.Menu.X = -1 * this.Menu.Depth, this.Menu.Width = this.Engine.Canvas.height - 2 * this.Menu.Y, this.Height = b + 2 * this.LabelPadding);
};
Tab.prototype.AddMouseHandler = function() {
  this._ref = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, b) {
    this.IsMouseOver && (a.GoThrough = !1, this.IsOpen ? this.Close() : this.Open());
    this.IsMouseOverMenu && (a.GoThrough = !1);
  }}, 1000);
};
Tab.prototype.RemoveMouseHandler = function() {
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._ref);
};
Tab.prototype.Draw = function(a) {
  var b = this.X, c = this.Y;
  a.fillStyle = this.Selected ? this.BackgroundColorSelected : this.BackgroundColor;
  a.fillVariousRoundedRect(b, c, this.Width, this.Height, 0, this.Rounding, this.Rounding, 0);
  a.fillStyle = this.FontColor;
  a.setFontHeight(this.FontSize, "px");
  a.fillSpinnedText(b + this.Width / 2, c + this.Height / 2, this.Label, 270);
  if (this.IsOpen) {
    for (a.fillStyle = this.BackgroundColorSelected, a.fillRect(0, this.Menu.Y, this.SlideMenu.NeededDepth, this.Menu.Width), b = 0; b < this.Items.length; b++) {
      if ("break" != this.Items[b].item) {
        this.Items[b].item.Draw(a);
      } else {
        try {
          var d = this.Items[b - 1].item;
          this.Items.length >= b + 1 && (c = d.Y + d.Height + (this.Items[b + 1].item.Y - (d.Y + d.Height)) / 2, a.beginPath(), a.moveTo(this.Menu.X + 10, c), a.lineWidth = 3, a.strokeStyle = Tab.prototype.BreaklineColor, a.lineTo(this.Menu.X + this.Menu.Depth - 10, c), a.stroke());
        } catch (e) {
          console.log("problem with the breakline in a tab");
        }
      }
    }
  } else {
    this._ling = this.Engine.Context.createLinearGradient(this.X, this.Y, this.X + 5, this.Y);
    for (b = 0; b < this._stops.length; b++) {
      this._ling.addColorStop(this._stops[b].stop, this._stops[b].color);
    }
    a.fillStyle = this._ling;
    a.fillRect(this.X, this.Y, 5, this.Height);
  }
};
Tab.prototype.Update = function() {
  this.IsMouseOver && this.Engine.Input.Mouse.Cursor.Set("pointer");
  this.X = this.SlideMenu.NeededDepth;
  this.Menu.X = this.X - this.Menu.Depth;
  this.X !== this.OldX && this.AdjustItemsPosition();
  this.OldX = this.X;
  if (null === this.SlideMenu.OpenTab || this.SlideMenu.OpenTab !== this) {
    this.Selected = this.IsOpen = !1;
  }
  for (var a = 0; a < this.Items.length; a++) {
    "break" != this.Items[a].item && this.Items[a].item.Update();
  }
};
Tab.prototype.ProcessInput = function() {
  var a = {x:this.X, y:this.Y, width:this.Width, height:this.Height, roundings:[0, this.Rounding, this.Rounding, 0], type:"vrrect"};
  this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
  this.IsOpen && (a = {x:this.Menu.X, y:this.Menu.Y, width:this.Menu.X + this.Menu.Depth, height:this.Menu.Y + this.Menu.Width, type:"rect"}, this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverMenu"));
  if (this.IsOpen) {
    for (a = 0; a < this.Items.length; a++) {
      "break" != this.Items[a].item && this.Items[a].item.ProcessInput();
    }
  }
};
Tab.prototype.Open = function() {
  this.Selected = this.IsOpen = !0;
  this.SlideMenu.OpenTab = this;
  (new Flow(this.SlideMenu, "NeededDepth", this.Menu.Depth, 700, {that:this, "function":function() {
  }})).Start();
};
Tab.prototype.Close = function() {
  (new Flow(this.SlideMenu, "NeededDepth", 0, 700, {that:this, "function":function() {
    this.IsMouseOverMenu = this.Selected = this.IsOpen = !1;
    this.SlideMenu.OpenTab = null;
  }})).Start();
};
Tab.prototype.QuickClose = function() {
  this.SlideMenu.NeededDepth = 0;
  this.IsMouseOverMenu = this.Selected = this.IsOpen = !1;
  this.SlideMenu.OpenTab = null;
};
Tab.prototype.SetDepth = function(a) {
  this.Menu.Depth = a;
  this.Menu.X = -1 * this.Menu.Depth;
};
Tab.prototype.SetNeededDepth = function() {
  var a = this.Menu.Depth;
  if ("left" == this.SlideMenu.AttachedSide) {
    for (var b = 0; b < this.Items.length; b++) {
      var c = this.Items[b].item;
      "break" !== c && a < c.Width && (a = c.Width);
    }
  }
  this.SetDepth(a);
};
Tab.prototype.AddItem = function(a, b, c, d) {
  1 >= arguments.length && (b = 0);
  2 >= arguments.length && (c = b);
  "break" === a && 0 < this.Items.length && this.Items.push({item:a, offset:{x:b, y:c}});
  if (a instanceof ABO) {
    if ("break" === a && 0 >= this.Items.length) {
      return;
    }
    this.Items.push({item:a, offset:{x:b, y:c}});
  }
  d && this.SetNeededDepth();
};
Tab.prototype.AdjustItemsPosition = function() {
  var a = 0;
  if ("left" == this.SlideMenu.AttachedSide) {
    for (var b = 0; b < this.Items.length; b++) {
      var c = this.Items[b].item;
      "break" !== c && (c.X = this.Menu.X + this.Items[b].offset.x, c.Y = this.Menu.Y + a + this.Items[b].offset.y + 5, a += 5 + c.Height + this.Items[b].offset.y);
    }
  }
};
Tab.prototype.Delete = function() {
  this.RemoveMouseHandler();
};
Tab.prototype.DeleteItems = function(a, b, c) {
  "undefined" !== typeof a && a || (a = function(a, b) {
  });
  "undefined" === typeof b && (b = 0);
  "undefined" === typeof c && (c = this.Items.length);
  for (var d = [], e = 0; e < b; e++) {
    d.push(this.Items[e]);
  }
  for (e = b; e < c; e++) {
    b = this.Items[e].item, a(b, this.Engine);
  }
  this.Items = d;
};
function Task(a, b) {
  this.Name = a || "task";
  this.Description = b || "";
  this.Steps = [];
  this._stepsDone = [];
  this.CurrentImage = this._createImages = !1;
  this.DoneCallback = {that:this, parameter:"default", "function":function(a) {
    console.log(this.Name + " done: " + a);
  }};
  this.FailedCallback = {that:this, parameter:"default", "function":function(a) {
    console.log(this.Name + " failed: " + a);
  }};
}
Task.prototype.IsDone = function() {
  for (var a = !0, b = 0; a && b < this.Steps.length; b++) {
    a = this.Steps[b].Done || this.Steps[b].Optional ? !0 : !1;
  }
  return a;
};
Task.prototype.SetCallbackWhenDone = function(a) {
  this.DoneCallback = a;
};
Task.prototype.SetCallbackWhenFailed = function(a) {
  this.FailedCallback = a;
};
Task.prototype.GetProgress = function() {
  for (var a = 0, b = 0, c = 0; c < this.Steps.length; c++) {
    this.Steps[c].Optional || (a++, this.Steps[c].Done && b++);
  }
  c = 0;
  0 !== a && (c = b / a);
  return c;
};
Task.prototype.HasFailed = function() {
  for (var a = 0; a < this.Steps.length; a++) {
    if (this.Steps[a].Failed && !this.Steps[a].Optional) {
      return !0;
    }
  }
  return !1;
};
Task.prototype._check = function() {
  if (this.IsDone()) {
    var a = this.DoneCallback;
    a["function"].call(a.that, a.parameter);
  } else {
    this.HasFailed() && (a = this.FailedCallback, a["function"].call(a.that, a.parameter));
  }
};
Task.prototype.AddStep = function(a) {
  var b = 0;
  a.Task = this;
  for (var c = 1; c < arguments.length; c++) {
    arguments[c] instanceof Step && (a.RequiredSteps.push(arguments[c]), b++);
  }
  this.Steps.push(a);
  this._createImages && this._createsImage();
  return {NumRequiredSteps:arguments.length - 1, NumRecognizedSteps:b};
};
Task.prototype.createStep = function(a, b, c, d, e) {
  if (this.GetStepById(a)) {
    return console.log(a + " already exists"), !1;
  }
  a = new Step(a, b, c, d, e);
  a.Task = this;
  return a;
};
Task.prototype.GetStepById = function(a) {
  for (var b = 0; b < this.Steps.length; b++) {
    if (this.Steps[b].Id === a) {
      return this.Steps[b];
    }
  }
  return !1;
};
Task.prototype.DoStep = function(a) {
  a = this.GetStepById(a);
  if (!a) {
    return {step:!1, successful:!1};
  }
  var b = a.GetRequiredUndoneSteps();
  0 === b.length ? a.Done = !0 : a.CanFail && (a.Failed = !0);
  this._check();
  this._createImages && this._createsImage();
  return {step:a, requiredSteps:b, successful:a.Done, failed:a.Failed};
};
Task.prototype._createsImage = function() {
  var a = document.createElement("CANVAS");
  a.width = 400;
  a.height = 200;
  var b = a.getContext("2d");
  b.setFontHeight(14);
  a = decodeURI("%E2%98%91");
  for (var c = decodeURI("%E2%98%90"), d = decodeURI("%F0%9F%97%99"), e = [], f = 0; f < this.Steps.length; f++) {
    e[f] = this.Steps[f].Done ? a + " " + this.Steps[f].Description : this.Steps[f].Failed ? d + " " + this.Steps[f].Description : c + " " + this.Steps[f].Description;
  }
  a = [];
  c = [];
  d = b.measureText(" ").width;
  for (f = 0; f < e.length; f++) {
    var g = e[f].split(" ");
    for (var h = 0; h < g.length; h++) {
      a.push(g[h]), c.push(b.measureText(g[h]).width);
    }
    f < e.length - 1 && (a.push("\\n"), c.push(0));
  }
  e = [];
  b = 0;
  e.push("");
  for (f = 0; f < a.length; f++) {
    "\\n" === a[f] ? (f++, e.push(a[f] + " "), b = 0 + c[f] + d) : 390 > b + c[f] + d ? (e[e.length - 1] += a[f] + " ", b += c[f] + d) : (e[e.length - 1] = e[e.length - 1].substr(0, e[e.length - 1].length - 1), e.push(a[f] + " "), b = 0 + c[f] + d);
  }
  e[e.length - 1] = e[e.length - 1].substr(0, e[e.length - 1].length - 1);
  f = 10 + 14 * e.length + 3 * (e.length - 1);
  a = document.createElement("CANVAS");
  a.width = 400;
  a.height = f;
  b = a.getContext("2d");
  b.setFontHeight(14);
  b.textAlign = "left";
  b.textBaseline = "top";
  b.fillStyle = "black";
  c = 5;
  for (f = 0; f < e.length; f++) {
    b.fillText(e[f], 5, c), c += 17;
  }
  f = a.toDataURL();
  this.CurrentImage = document.createElement("IMG");
  this.CurrentImage.src = f;
  (function() {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function(b, c) {
      a.href = b;
      a.download = c;
      a.click();
      window.URL.revokeObjectURL(b);
    };
  })();
};
function Step(a, b, c, d, e) {
  "undefined" === typeof d && (d = !1);
  this.Failed = this.Done = !1;
  this.FailText = e;
  this.CanFail = d;
  this.Id = a;
  this.Task = null;
  this.Description = b;
  this.RequiredSteps = [];
  this.RequirementNotMetText = c;
  this.Optional = !1;
}
Step.prototype.GetRequiredUndoneSteps = function() {
  for (var a = [], b = 0; b < this.RequiredSteps.length; b++) {
    this.RequiredSteps[b].Done || a.push(this.RequiredSteps[b]);
  }
  return a;
};
function Terrain() {
  ABO.call(this);
}
Terrain.prototype = Object.create(ABO.prototype);
Terrain.prototype.constructor = Terrain;
function DefaultTerrain(a) {
  Terrain.call(this);
  this.Name = "default";
  this.Codename = a;
  this.NoImage = !1;
  this.Type = "Terrain";
  this.Initialize();
}
DefaultTerrain.prototype = Object.create(Terrain.prototype);
DefaultTerrain.prototype.constructor = DefaultTerrain;
DefaultTerrain.prototype.Initialize = function() {
  this.Codename ? (this.Image = this.Engine.MediaManager.GetImage(this.Codename), this.Width = this.Image.width, this.Height = this.Image.height) : (this.NoImage = !0, this.Width = this.Engine.Canvas.width, this.Height = this.Engine.Canvas.height);
};
DefaultTerrain.prototype.Draw = function(a) {
  if (!this.NoImage) {
    var b = this.Engine.Camera.SelectedCamera;
    a.drawImage(this.Image, this.X - b.X, this.Y - b.Y);
  }
};
function Toaster(a, b, c, d) {
  EngineObject.call(this);
  this.Rounding = this.Height = this.Width = this.Y = this.X = 0;
  this._blur = 5;
  this.PositionQutient = 0.55;
  this.Title = b;
  this.Text = "string" === typeof c ? [c] : c;
  this.Padding = Toaster.prototype.DefaultPadding;
  this.RowSpace = Toaster.prototype.DefaultRowSpace;
  this.FontHeight = Toaster.prototype.DefaultFontHeight;
  this.IsMouseOverClose = this.IsMouseOver = this.BackgroundImage = this.Image = this.Rows = !1;
  this.Xbox = {x:0, y:0, width:this.FontHeight, height:this.FontHeight};
  this.BackgroundColor = Toaster.prototype.DefaultDefaultBackgroundColor;
  this.FontColor = Toaster.prototype.DefaultDefaultFontColor;
  this.Type = a;
  switch(a) {
    case "warning":
      this.BackgroundColor = Toaster.prototype.DefaultWarningBackgroundColor;
      this.FontColor = Toaster.prototype.DefaultWarningFontColor;
      break;
    case "success":
      this.BackgroundColor = Toaster.prototype.DefaultSuccessBackgroundColor;
      this.FontColor = Toaster.prototype.DefaultSuccessFontColor;
      break;
    case "error":
      this.BackgroundColor = Toaster.prototype.DefaultErrorBackgroundColor;
      this.FontColor = Toaster.prototype.DefaultErrorFontColor;
      break;
    default:
      console.log("toaster type = " + a), this.Type = "default";
  }
  this.Milliseconds = d;
  this._refPIF = this._refUF = this._refMH = this._refFD = null;
  this._isBlocking = !1;
  this._isOverwriting = !0;
  this._filter = !1;
  document.createElement("CANVAS").getContext("2d").filter && (this._filter = !0);
  this.Initialize();
}
Toaster.prototype = Object.create(EngineObject.prototype);
Toaster.prototype.constructor = Toaster;
Toaster.BlockMode = !1;
Toaster.CurrentInstance = null;
Toaster.prototype.DefaultDefaultBackgroundColor = "black";
Toaster.prototype.DefaultDefaultFontColor = "white";
Toaster.prototype.DefaultWarningBackgroundColor = "orange";
Toaster.prototype.DefaultWarningFontColor = "white";
Toaster.prototype.DefaultSuccessBackgroundColor = "green";
Toaster.prototype.DefaultSuccessFontColor = "white";
Toaster.prototype.DefaultErrorBackgroundColor = "red";
Toaster.prototype.DefaultErrorFontColor = "white";
Toaster.prototype.DefaultFontHeight = 15;
Toaster.prototype.DefaultPadding = 5;
Toaster.prototype.DefaultRowSpace = 3;
Toaster.prototype.Initialize = function() {
  this._calculateValues();
  this._getBackgroundImage();
  this._createImage();
  this._adjustPosition();
};
Toaster.prototype.Open = function() {
  if (!Toaster.BlockMode) {
    this._isBlocking && (Toaster.BlockMode = !0);
    this.CloseCurrentInstance();
    Toaster.CurrentInstance = this;
    (new Flow(this, "Y", this.Engine.Canvas.height - this.Height, 600, {that:this, parameter:!0, "function":function() {
      window.setTimeout(function(a) {
        a.FlowClose();
      }, this.Milliseconds, this);
    }})).Start();
    this.AddMouseHandler(12);
    var a = this._createForegroundDrawFunctionObject();
    this._refFD = this.Engine.AddForegroundDrawFunctionObject(a);
    this._refUF = this.Engine.AddUpdateFunctionObject({that:this, parameter:!0, "function":function() {
      this.Xbox.x = this.X + this.Width - this.RowSpace - this.FontHeight;
      this.Xbox.y = this.Y + this.RowSpace;
      this.IsMouseOverClose && this.Engine.Input.Mouse.Cursor.Set("pointer");
    }});
    this._refPIF = this.Engine.AddProcessInputFunction({that:this, parameter:!0, "function":function() {
      var a = {x:this.X, y:this.Y, width:this.Width, height:this.Height, type:"rect", background:!0};
      this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOver");
      a = {x:this.X + this.Width - this.RowSpace - this.FontHeight, y:this.Y + this.RowSpace, width:this.FontHeight, height:this.FontHeight, type:"rect"};
      this.Engine.Input.MouseHandler.AddHoverRequest(a, this, "IsMouseOverClose");
    }});
  }
};
Toaster.prototype.FlowClose = function() {
  (new Flow(this, "Y", this.Engine.Canvas.height, 600, {that:this, parameter:!0, "function":function() {
    this.Close();
  }})).Start();
};
Toaster.prototype.Close = function() {
  this.Engine.RemoveForegroundDrawFunctionObject(this._refFD);
  this._refFD = null;
  this.Engine.RemoveUpdateFunctionObject(this._refUF);
  this._refUF;
  this.Engine.Input.MouseHandler.RemoveMouseHandler("leftclick", this._refMH);
  this._refMH = null;
  this.Engine.RemoveProcessInputFunction(this._refPIF);
  this._refPIF = null;
  Toaster.CurrentInstance = null;
  Toaster.BlockMode = !1;
};
Toaster.prototype.AddMouseHandler = function(a) {
  this._refMH = this.Engine.Input.MouseHandler.AddMouseHandler("leftclick", {parameter:this.Engine, that:this, "function":function(a, c) {
    this.IsMouseOver && (a.GoThrough = !1);
    this.IsMouseOverClose && (this.Close(), a.GoThrough = !1);
  }}, a);
};
Toaster.prototype._createForegroundDrawFunctionObject = function() {
  return {that:this, parameter:this.Engine, "function":function(a) {
    a.save();
    a.drawImage(this.BackgroundImage, this.X, this.Y);
    a.drawImage(this.Image, this.X, this.Y);
    a.restore();
  }};
};
Toaster.prototype._calculateValues = function() {
  var a = this.Engine.Context;
  this.Width = Math.round(this.Engine.Canvas.width / 2.6);
  a.setFontHeight(this.FontHeight);
  for (var b = [], c = [], d = a.measureText(" ").width, e, f = 0; f < this.Text.length; f++) {
    e = this.Text[f].split(" ");
    for (var g = 0; g < e.length; g++) {
      b.push(e[g]), c.push(a.measureText(e[g]).width);
    }
    f < this.Text.length - 1 && (b.push("\\n"), c.push(0));
  }
  this.Rows = [];
  a = 0;
  this.Rows.push("");
  for (f = 0; f < b.length; f++) {
    "\\n" === b[f] ? (f++, this.Rows.push(b[f] + " "), a = 0 + c[f] + d) : a + c[f] + d < this.Width - 2 * this.Padding ? (this.Rows[this.Rows.length - 1] += b[f] + " ", a += c[f] + d) : (this.Rows[this.Rows.length - 1] = this.Rows[this.Rows.length - 1].substr(0, this.Rows[this.Rows.length - 1].length - 1), this.Rows.push(b[f] + " "), a = 0 + c[f] + d);
  }
  this.Rows[this.Rows.length - 1] = this.Rows[this.Rows.length - 1].substr(0, this.Rows[this.Rows.length - 1].length - 1);
  this.Height = 2 * this.Padding + this.FontHeight * this.Rows.length + this.RowSpace * this.Rows.length - 1;
  this.Height += 2 * this.RowSpace + this.FontHeight;
};
Toaster.prototype._createImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Width + 2 * this._blur;
  a.height = this.Height + this._blur;
  var b = a.getContext("2d");
  b.setFontHeight(this.FontHeight);
  b.fillStyle = this.BackgroundColor;
  b.fillRect(this._blur, this._blur, this.Width, this.Height);
  b.textAlign = "left";
  b.textBaseline = "top";
  b.fillStyle = this.FontColor;
  b.strokeStyle = this.FontColor;
  var c = this.Padding + this._blur, d = this.RowSpace + this._blur;
  b.fillText(this.Title, c, d);
  b.lineWidth = 2;
  b.drawCross(this.Width + this._blur - this.FontHeight / 2 - this.RowSpace, this.RowSpace + this._blur + this.FontHeight / 2, this.FontHeight);
  b.lineWidth = 1;
  d = 2 * this.RowSpace + this.FontHeight + this._blur;
  b.beginPath();
  b.moveTo(c, d);
  b.lineTo(c + this.Width - 2 * this.Padding, d);
  b.stroke();
  b.closePath();
  d = this.Padding + 3 * this.RowSpace + this.FontHeight;
  for (var e = 0; e < this.Rows.length; e++) {
    b.fillText(this.Rows[e], c, d), d += this.FontHeight + this.RowSpace;
  }
  a = a.toDataURL();
  this.Image = document.createElement("IMG");
  this.Image.crossOrigin = "";
  this.Image.src = a;
};
Toaster.prototype._adjustPosition = function() {
  var a = this.Engine.Canvas;
  this.X = a.width * this.PositionQutient;
  this.Y = a.height;
};
Toaster.prototype.SetBlocking = function(a) {
  this._isBlocking = a;
};
Toaster.prototype.SetOverwriting = function(a) {
  this._isOverwriting = a;
};
Toaster.prototype.CloseCurrentInstance = function() {
  this._isOverwriting && null !== Toaster.CurrentInstance && Toaster.CurrentInstance.Close();
};
Toaster.prototype._getBackgroundImage = function() {
  var a = document.createElement("CANVAS");
  a.width = this.Width + 2 * this._blur;
  a.height = this.Height + this._blur;
  var b = a.getContext("2d");
  b.lineWidth = this._blur;
  b.filter = "blur(" + this._blur / 2 + "px)";
  b.strokeStyle = getRGBA(this.BackgroundColor, 0.6);
  b.strokeRect(this._blur, this._blur, a.width - 2 * this._blur, a.height);
  a = a.toDataURL();
  this.BackgroundImage = document.createElement("IMG");
  this.BackgroundImage.src = a;
};
Toaster.prototype.Types = {Default:"default", Warning:"warning", Error:"error", Success:"success"};
function TouchHandler() {
  EngineObject.call(this);
  this.FakeMouseClick = this.PreventScrolling = this.PreventDefault = !0;
  this.DEFINEDVALUES = {TapLimit:300, VarianceLimit:50, SwipeTrackLimit:150, SwipeTimeLimit:600};
  this.EventObjects = {TouchStartEvent:!1, TouchMoveEvent:!1, TouchEndEvent:!1};
  this.EventListener = {TouchStartEvent:!1, TouchMoveEvent:!1, TouchEndEvent:!1};
  this.DeviceIsTouchDevice = !1;
  this.TouchDeviceRecognization = [];
  this.ExpectTouch = !1;
  this.Finger1 = {X:0, Y:0, Detected:!1, TapListener:[], LongTapListener:[], SwipeListener:[]};
  this.Finger2 = {X:0, Y:0, Detected:!1, TapListener:[], LongTapListener:[], SwipeListener:[]};
  this.Initialize();
}
TouchHandler.prototype = Object.create(EngineObject.prototype);
TouchHandler.prototype.constructor = TouchHandler;
TouchHandler.prototype.Initialize = function() {
  this.EventListener.TouchStartEvent = this.Engine.Canvas.addEventListener("touchstart", this.TouchStartHandler.bind(this), !1);
  this.EventListener.TouchMoveEvent = this.Engine.Canvas.addEventListener("touchmove", this.TouchMoveHandler.bind(this), !1);
  this.EventListener.TouchEndEvent = this.Engine.Canvas.addEventListener("touchend", this.TouchEndHandler.bind(this), !1);
};
TouchHandler.prototype.TouchStartHandler = function(a) {
  this.EventObjects.TouchStartEvent = a;
  this.ExpectTouch = !0;
  this.Finger1.Detected = !0;
  this.Finger1.X = a.touches[0].clientX;
  this.Finger1.Y = a.touches[0].clientY;
  this.Finger2.Detected = !1;
  2 <= a.touches.length && (this.Finger2.X = a.touches[1].clientX, this.Finger2.Y = a.touches[1].clientY, this.Finger2.Detected = !0);
  this.PreventDefault && a.preventDefault();
};
TouchHandler.prototype.TouchMoveHandler = function(a) {
  this.EventObjects.TouchMoveEvent = a;
  this.Finger2.Detected = !1;
  this.Finger1.X = a.touches[0].clientX;
  this.Finger1.Y = a.touches[0].clientY;
  2 <= a.touches.length && (this.Finger2.Detected = !0, this.Finger2.X = a.touches[1].clientX, this.Finger2.Y = a.touches[1].clientY);
  this.PreventScrolling && a.preventDefault();
};
TouchHandler.prototype.TouchEndHandler = function(a) {
  this.EventObjects.TouchEndEvent = a;
  var b = this.EventObjects.TouchStartEvent, c = this.EventObjects.TouchMoveEvent || this.EventObjects.TouchStartEvent, d = a.timeStamp - this.EventObjects.TouchStartEvent.timeStamp, e = c.touches[0].clientX - b.touches[0].clientX, f = c.touches[0].clientY - b.touches[0].clientY;
  this.Finger2.Detected = !1;
  2 <= c.touches.length && (this.Finger2.Detected = !0, e = c.touches[1].clientX - b.touches[1].clientX, f = c.touches[1].clientY - b.touches[1].clientY);
  d <= this.DEFINEDVALUES.TapLimit && this._movementWithin(e, f, this.DEFINEDVALUES.VarianceLimit) && (this.ExpectTouch = !1, this.Finger2.Detected ? this.OnTapFinger2() : this.OnTapFinger1());
  this.ExpectTouch && d > this.DEFINEDVALUES.TapLimit && this._movementWithin(e, f, this.DEFINEDVALUES.VarianceLimit) && (this.ExpectTouch = !1, this.Finger2.Detected ? this.OnLongTapFinger2() : this.OnLongTapFinger1());
  this.ExpectTouch && d <= this.DEFINEDVALUES.SwipeTimeLimit && !this._movementWithin(e, f, this.DEFINEDVALUES.SwipeTrackLimit) && (this.ExpectTouch = !1, b = this._getDirectionObject(e, f), this.Finger2.Detected ? this.OnSwipeFinger2(b) : this.OnSwipeFinger1(b));
  this.ExpectTouch && console.log("No guesture matched: timedelta: {0}, xdelta: {1}, ydelta: {2}".format(d, e, f));
  this.EventObjects.TouchMoveEvent = !1;
  this.Finger1.Detected = !1;
  this.ExpectTouch = this.Finger2.Detected = !1;
  this.PreventDefault && a.preventDefault();
};
TouchHandler.prototype.Update = function() {
  if (!this.ExpectTouch) {
    return !1;
  }
};
TouchHandler.prototype._movementWithin = function(a, b, c) {
  if (Math.abs(a) <= c && Math.abs(b) <= c) {
    return !0;
  }
  !1;
};
TouchHandler.prototype._getDirectionObject = function(a, b) {
  var c;
  return 2 <= arguments.length ? c = Math.abs(a) > Math.abs(b) ? 0 < a ? {X:1, Y:0} : {X:-1, Y:0} : 0 < b ? {X:0, Y:1} : {X:0, Y:-1} : !1;
};
TouchHandler.prototype._getSwipeDirection = function(a) {
  return 1 === arguments.length ? 0 === a.Y ? 1 === a.X ? "right" : "left" : 1 === a.Y ? "down" : "up" : !1;
};
TouchHandler.prototype.OnTapFinger1 = function() {
  console.log("Finger1 Tap");
  this.FakeMouseClick && this.Engine.Input.FakeMouseClick(this.Finger1.X, this.Finger1.Y);
  for (var a, b = 0; this.Finger1.TapListener.length; b++) {
    a = this.Finger1.TapListener[b], Callback.CallObject(a);
  }
};
TouchHandler.prototype.OnTapFinger2 = function() {
  console.log("Finger2 Tap");
  for (var a, b = 0; this.Finger2.TapListener.length; b++) {
    a = this.Finger2.TapListener[b], Callback.CallObject(a);
  }
};
TouchHandler.prototype.OnLongTapFinger1 = function() {
  console.log("Finger1 LongTap");
  for (var a, b = 0; this.Finger1.LongTapListener.length; b++) {
    a = this.Finger1.LongTapListener[b], Callback.CallObject(a);
  }
};
TouchHandler.prototype.OnLongTapFinger2 = function() {
  console.log("Finger2 LongTap");
  for (var a, b = 0; this.Finger2.LongTapListener.length; b++) {
    a = this.Finger2.LongTapListener[b], Callback.CallObject(a);
  }
};
TouchHandler.prototype.OnSwipeFinger1 = function(a) {
  console.log("Finger1 " + this._getSwipeDirection(a) + " swipe - " + JSON.stringify(a));
  for (var b, c = 0; this.Finger1.SwipeListener.length; c++) {
    b = this.Finger1.SwipeListener[c], Callback.CallObject(b, a);
  }
};
TouchHandler.prototype.OnSwipeFinger2 = function(a) {
  console.log("Finger2 " + this._getSwipeDirection(a) + " swipe - " + JSON.stringify(a));
  for (var b, c = 0; this.Finger2.SwipeListener.length; c++) {
    b = this.Finger2.SwipeListener[c], Callback.CallObject(b, a);
  }
};
TouchHandler.prototype.AddEventListener = function(a, b) {
  switch(a) {
    case "tapfinger1":
      this.Finger1.TapListener.push(b);
      break;
    case "tapfinger2":
      this.Finger2.TapListener.push(b);
      break;
    case "longtapfinger1":
      this.Finger1.LongTapListener.push(b);
      break;
    case "longtapfinger2":
      this.Finger2.LongTapListener.push(b);
      break;
    case "swipefinger1":
      this.Finger1.SwipeListener.push(b);
      break;
    case "swipefinger2":
      this.Finger2.SwipeListener.push(b);
      break;
    default:
      console.log("could not add event listener with type " + a);
  }
};
TouchHandler.prototype.Types = {TapFinger1:"tapfinger1", TapFinger2:"tapfinger2", LongTapFinger1:"longtapfinger1", LongTapFinger2:"longtapfinger2", SwipeFinger1:"swipefinger1", SwipeFinger2:"swipefinger2"};
function TouchPie() {
  ABO.call(this);
  this.Color = "#bbb";
  this.ColorSelected = "#999";
  this.SelectedPiePiece = -1;
  this.Offset = 2.5;
  this.CenterRepositionValue = this.EndAngles = this.StartAngles = !1;
  this.Value = 2 * this.Offset;
  this.Enabled = !1;
  var a = function(a) {
    return {that:this, parameter:a, "function":function(a) {
      console.log("Trigger: " + a);
    }};
  };
  this.COArray = [a("right"), a("bottom"), a("left"), a("top")];
  this.Labels = ["Right", "Bottom", "Left", "Top"];
  this.CanvasWidth = 800;
  this.CanvasHeight = 600;
  this.Radius = this.CanvasHeight / 6;
  this.BottomMargin = 20;
  this.Initialize();
}
TouchPie.prototype = Object.create(ABO.prototype);
TouchPie.prototype.constructor = TouchPie;
TouchPie.prototype.Initialize = function() {
  var a = this.Offset;
  this.StartAngles = [(315 + a) * Math.PI / 180, (45 + a) * Math.PI / 180, (135 + a) * Math.PI / 180, (225 + a) * Math.PI / 180];
  this.EndAngles = [(45 - a) * Math.PI / 180, (135 - a) * Math.PI / 180, (225 - a) * Math.PI / 180, (315 - a) * Math.PI / 180];
  a = this.Value;
  this.CenterRepositionValue = [{x:1 * a, y:0 * a}, {x:0 * a, y:1 * a}, {x:-1 * a, y:0 * a}, {x:0 * a, y:-1 * a}];
};
TouchPie.prototype.Draw = function(a) {
  if (this.Enabled) {
    var b = 2 * this.Value + 2 * this.Radius, c = this.Engine.Canvas.width / 2 - b / 2, d = this.Engine.Canvas.height - 2 * this.Radius - this.BottomMargin;
    a.save();
    var e = document.createElement("CANVAS");
    e.width = e.height = b;
    b = e.getContext("2d");
    for (var f = this.CenterRepositionValue, g = this.Radius + this.Value, h = 0; 4 > h; h++) {
      b.fillStyle = this.Color, this.SelectedPiePiece == h && (b.fillStyle = this.ColorSelected), b.beginPath(), b.moveTo(g + f[h].x, g + f[h].y), b.arc(g, g, this.Radius, this.StartAngles[h], this.EndAngles[h]), b.lineTo(g + f[h].x, g + f[h].y), b.fill(), b.closePath();
    }
    b.globalCompositeOperation = "destination-out";
    b.beginPath();
    b.moveTo(g, g);
    b.arc(g, g, 0.3 * this.Radius, 0, 2 * Math.PI, !1);
    b.lineTo(g, g);
    b.fill();
    b.closePath();
    b.globalCompositeOperation = "source-over";
    b.textAlign = "center";
    b.textBaseline = "middle";
    b.fillStyle = "black";
    b.fillText(this.Labels[0], g + 2 * this.Radius / 3, g);
    b.fillText(this.Labels[1], g, g + 2 * this.Radius / 3);
    b.fillText(this.Labels[2], g - 2 * this.Radius / 3, g);
    b.fillText(this.Labels[3], g, g - 2 * this.Radius / 3);
    a.drawImage(e, c, d);
    a.restore();
  }
};
TouchPie.prototype.Update = function() {
  var a = this.Engine.Canvas;
  if (a.width != this.CanvasWidth || a.height != this.CanvasHeight) {
    this.CanvasWidth = a.width, this.CanvasHeight = a.height, this.Radius = Math.min(this.CanvasHeight, this.CanvasWidth) / 6;
  }
};
TouchPie.prototype.SelectPiece = function(a) {
  return a != TouchPie.prototype.Pieces.None ? this.SelectedPiePiece = a : this.DeselectPieces();
};
TouchPie.prototype.DeselectPieces = function() {
  return this.SelectedPiePiece = TouchPie.prototype.Pieces.None;
};
TouchPie.prototype.SetPiece = function(a, b, c) {
  if (a == TouchPie.prototype.Pieces.None) {
    return -1;
  }
  this.COArray[a] = c;
  this.Labels[a] = b;
  return a;
};
TouchPie.prototype.GetPiece = function(a) {
  a = a.toLowerCase();
  return "right" === a ? TouchPie.prototype.Pieces.Right : "bottom" === a ? TouchPie.prototype.Pieces.Bottom : "left" === a ? TouchPie.prototype.Pieces.Left : "top" === a ? TouchPie.prototype.Pieces.Top : -1;
};
TouchPie.prototype.Trigger = function() {
  this.SelectedPiePiece != TouchPie.prototype.Pieces.None && (Callback.CallObject(this.COArray[this.SelectedPiePiece]), this.Enabled = !1);
};
TouchPie.prototype.Pieces = {Right:0, Bottom:1, Left:2, Top:3, None:-1};

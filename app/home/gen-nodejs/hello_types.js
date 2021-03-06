//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var ttypes = module.exports = {};
ttypes.Operation = {
'ADD' : 1,
'SUBTRACT' : 2,
'MULTIPLY' : 3,
'DIVIDE' : 4
};
Work = module.exports.Work = function(args) {
  this.num1 = 0;
  this.num2 = null;
  this.op = null;
  this.comment = null;
  if (args) {
    if (args.num1 !== undefined) {
      this.num1 = args.num1;
    }
    if (args.num2 !== undefined) {
      this.num2 = args.num2;
    }
    if (args.op !== undefined) {
      this.op = args.op;
    }
    if (args.comment !== undefined) {
      this.comment = args.comment;
    }
  }
};
Work.prototype = {};
Work.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.num1 = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.num2 = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.op = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.comment = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Work.prototype.write = function(output) {
  output.writeStructBegin('Work');
  if (this.num1 !== null && this.num1 !== undefined) {
    output.writeFieldBegin('num1', Thrift.Type.I32, 1);
    output.writeI32(this.num1);
    output.writeFieldEnd();
  }
  if (this.num2 !== null && this.num2 !== undefined) {
    output.writeFieldBegin('num2', Thrift.Type.I32, 2);
    output.writeI32(this.num2);
    output.writeFieldEnd();
  }
  if (this.op !== null && this.op !== undefined) {
    output.writeFieldBegin('op', Thrift.Type.I32, 3);
    output.writeI32(this.op);
    output.writeFieldEnd();
  }
  if (this.comment !== null && this.comment !== undefined) {
    output.writeFieldBegin('comment', Thrift.Type.STRING, 4);
    output.writeString(this.comment);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};


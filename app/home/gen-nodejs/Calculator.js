//
// Autogenerated by Thrift Compiler (0.9.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./hello_types');
//HELPER FUNCTIONS AND STRUCTURES

Calculator_add_args = function(args) {
  this.word = null;
  if (args) {
    if (args.word !== undefined) {
      this.word = args.word;
    }
  }
};
Calculator_add_args.prototype = {};
Calculator_add_args.prototype.read = function(input) {
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
        if (ftype == Thrift.Type.STRUCT) {
          this.word = new ttypes.Work();
          this.word.read(input);
        } else {
          input.skip(ftype);
        }
        break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Calculator_add_args.prototype.write = function(output) {
  output.writeStructBegin('Calculator_add_args');
  if (this.word !== null && this.word !== undefined) {
    output.writeFieldBegin('word', Thrift.Type.STRUCT, 1);
    this.word.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Calculator_add_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
Calculator_add_result.prototype = {};
Calculator_add_result.prototype.read = function(input) {
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
      case 0:
        if (ftype == Thrift.Type.STRUCT) {
          this.success = new ttypes.Work();
          this.success.read(input);
        } else {
          input.skip(ftype);
        }
        break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Calculator_add_result.prototype.write = function(output) {
  output.writeStructBegin('Calculator_add_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

CalculatorClient = exports.Client = function(output, pClass) {
  this.output = output;
  this.pClass = pClass;
  this.seqid = 0;
  this._reqs = {};
};
CalculatorClient.prototype = {};
CalculatorClient.prototype.add = function(word, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_add(word);
};

CalculatorClient.prototype.send_add = function(word) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('add', Thrift.MessageType.CALL, this.seqid);
  var args = new Calculator_add_args();
  args.word = word;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

CalculatorClient.prototype.recv_add = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Calculator_add_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('add failed: unknown result');
};
CalculatorProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
CalculatorProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

CalculatorProcessor.prototype.process_add = function(seqid, input, output) {
  var args = new Calculator_add_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.add(args.word, function (err, result) {
    var result = new Calculator_add_result((err != null ? err : {success: result}));
    output.writeMessageBegin("add", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}


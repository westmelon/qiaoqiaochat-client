/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Model = (function() {

    /**
     * Properties of a Model.
     * @exports IModel
     * @interface IModel
     * @property {number|null} [cmd] Model cmd
     * @property {number|null} [msgType] Model msgType
     * @property {number|Long|null} [timestamp] Model timestamp
     * @property {string|null} [textContent] Model textContent
     * @property {string|null} [contentType] Model contentType
     * @property {Uint8Array|null} [mediaContent] Model mediaContent
     * @property {string|null} [groupId] Model groupId
     * @property {string|null} [sender] Model sender
     * @property {string|null} [receiver] Model receiver
     * @property {string|null} [token] Model token
     * @property {string|null} [appKey] Model appKey
     * @property {string|null} [sign] Model sign
     * @property {string|null} [requestId] Model requestId
     * @property {string|null} [responseId] Model responseId
     * @property {string|null} [uniqueId] Model uniqueId
     * @property {string|null} [identifier] Model identifier
     * @property {number|null} [clientType] Model clientType
     * @property {string|null} [clientVersion] Model clientVersion
     * @property {number|null} [encryptionType] Model encryptionType
     */

    /**
     * Constructs a new Model.
     * @exports Model
     * @classdesc Represents a Model.
     * @implements IModel
     * @constructor
     * @param {IModel=} [properties] Properties to set
     */
    function Model(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Model cmd.
     * @member {number} cmd
     * @memberof Model
     * @instance
     */
    Model.prototype.cmd = 0;

    /**
     * Model msgType.
     * @member {number} msgType
     * @memberof Model
     * @instance
     */
    Model.prototype.msgType = 0;

    /**
     * Model timestamp.
     * @member {number|Long} timestamp
     * @memberof Model
     * @instance
     */
    Model.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Model textContent.
     * @member {string} textContent
     * @memberof Model
     * @instance
     */
    Model.prototype.textContent = "";

    /**
     * Model contentType.
     * @member {string} contentType
     * @memberof Model
     * @instance
     */
    Model.prototype.contentType = "";

    /**
     * Model mediaContent.
     * @member {Uint8Array} mediaContent
     * @memberof Model
     * @instance
     */
    Model.prototype.mediaContent = $util.newBuffer([]);

    /**
     * Model groupId.
     * @member {string} groupId
     * @memberof Model
     * @instance
     */
    Model.prototype.groupId = "";

    /**
     * Model sender.
     * @member {string} sender
     * @memberof Model
     * @instance
     */
    Model.prototype.sender = "";

    /**
     * Model receiver.
     * @member {string} receiver
     * @memberof Model
     * @instance
     */
    Model.prototype.receiver = "";

    /**
     * Model token.
     * @member {string} token
     * @memberof Model
     * @instance
     */
    Model.prototype.token = "";

    /**
     * Model appKey.
     * @member {string} appKey
     * @memberof Model
     * @instance
     */
    Model.prototype.appKey = "";

    /**
     * Model sign.
     * @member {string} sign
     * @memberof Model
     * @instance
     */
    Model.prototype.sign = "";

    /**
     * Model requestId.
     * @member {string} requestId
     * @memberof Model
     * @instance
     */
    Model.prototype.requestId = "";

    /**
     * Model responseId.
     * @member {string} responseId
     * @memberof Model
     * @instance
     */
    Model.prototype.responseId = "";

    /**
     * Model uniqueId.
     * @member {string} uniqueId
     * @memberof Model
     * @instance
     */
    Model.prototype.uniqueId = "";

    /**
     * Model identifier.
     * @member {string} identifier
     * @memberof Model
     * @instance
     */
    Model.prototype.identifier = "";

    /**
     * Model clientType.
     * @member {number} clientType
     * @memberof Model
     * @instance
     */
    Model.prototype.clientType = 0;

    /**
     * Model clientVersion.
     * @member {string} clientVersion
     * @memberof Model
     * @instance
     */
    Model.prototype.clientVersion = "";

    /**
     * Model encryptionType.
     * @member {number} encryptionType
     * @memberof Model
     * @instance
     */
    Model.prototype.encryptionType = 0;

    /**
     * Creates a new Model instance using the specified properties.
     * @function create
     * @memberof Model
     * @static
     * @param {IModel=} [properties] Properties to set
     * @returns {Model} Model instance
     */
    Model.create = function create(properties) {
        return new Model(properties);
    };

    /**
     * Encodes the specified Model message. Does not implicitly {@link Model.verify|verify} messages.
     * @function encode
     * @memberof Model
     * @static
     * @param {IModel} message Model message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Model.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.cmd != null && Object.hasOwnProperty.call(message, "cmd"))
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.cmd);
        if (message.msgType != null && Object.hasOwnProperty.call(message, "msgType"))
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.msgType);
        if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
            writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.timestamp);
        if (message.textContent != null && Object.hasOwnProperty.call(message, "textContent"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.textContent);
        if (message.contentType != null && Object.hasOwnProperty.call(message, "contentType"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.contentType);
        if (message.mediaContent != null && Object.hasOwnProperty.call(message, "mediaContent"))
            writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.mediaContent);
        if (message.groupId != null && Object.hasOwnProperty.call(message, "groupId"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.groupId);
        if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
            writer.uint32(/* id 8, wireType 2 =*/66).string(message.sender);
        if (message.receiver != null && Object.hasOwnProperty.call(message, "receiver"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.receiver);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.token);
        if (message.appKey != null && Object.hasOwnProperty.call(message, "appKey"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.appKey);
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 12, wireType 2 =*/98).string(message.sign);
        if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.requestId);
        if (message.responseId != null && Object.hasOwnProperty.call(message, "responseId"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.responseId);
        if (message.uniqueId != null && Object.hasOwnProperty.call(message, "uniqueId"))
            writer.uint32(/* id 15, wireType 2 =*/122).string(message.uniqueId);
        if (message.identifier != null && Object.hasOwnProperty.call(message, "identifier"))
            writer.uint32(/* id 16, wireType 2 =*/130).string(message.identifier);
        if (message.clientType != null && Object.hasOwnProperty.call(message, "clientType"))
            writer.uint32(/* id 17, wireType 0 =*/136).uint32(message.clientType);
        if (message.clientVersion != null && Object.hasOwnProperty.call(message, "clientVersion"))
            writer.uint32(/* id 18, wireType 2 =*/146).string(message.clientVersion);
        if (message.encryptionType != null && Object.hasOwnProperty.call(message, "encryptionType"))
            writer.uint32(/* id 19, wireType 0 =*/152).uint32(message.encryptionType);
        return writer;
    };

    /**
     * Encodes the specified Model message, length delimited. Does not implicitly {@link Model.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Model
     * @static
     * @param {IModel} message Model message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Model.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Model message from the specified reader or buffer.
     * @function decode
     * @memberof Model
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Model} Model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Model.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Model();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.cmd = reader.uint32();
                break;
            case 2:
                message.msgType = reader.uint32();
                break;
            case 3:
                message.timestamp = reader.uint64();
                break;
            case 4:
                message.textContent = reader.string();
                break;
            case 5:
                message.contentType = reader.string();
                break;
            case 6:
                message.mediaContent = reader.bytes();
                break;
            case 7:
                message.groupId = reader.string();
                break;
            case 8:
                message.sender = reader.string();
                break;
            case 9:
                message.receiver = reader.string();
                break;
            case 10:
                message.token = reader.string();
                break;
            case 11:
                message.appKey = reader.string();
                break;
            case 12:
                message.sign = reader.string();
                break;
            case 13:
                message.requestId = reader.string();
                break;
            case 14:
                message.responseId = reader.string();
                break;
            case 15:
                message.uniqueId = reader.string();
                break;
            case 16:
                message.identifier = reader.string();
                break;
            case 17:
                message.clientType = reader.uint32();
                break;
            case 18:
                message.clientVersion = reader.string();
                break;
            case 19:
                message.encryptionType = reader.uint32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Model message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Model
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Model} Model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Model.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Model message.
     * @function verify
     * @memberof Model
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Model.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.cmd != null && message.hasOwnProperty("cmd"))
            if (!$util.isInteger(message.cmd))
                return "cmd: integer expected";
        if (message.msgType != null && message.hasOwnProperty("msgType"))
            if (!$util.isInteger(message.msgType))
                return "msgType: integer expected";
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
        if (message.textContent != null && message.hasOwnProperty("textContent"))
            if (!$util.isString(message.textContent))
                return "textContent: string expected";
        if (message.contentType != null && message.hasOwnProperty("contentType"))
            if (!$util.isString(message.contentType))
                return "contentType: string expected";
        if (message.mediaContent != null && message.hasOwnProperty("mediaContent"))
            if (!(message.mediaContent && typeof message.mediaContent.length === "number" || $util.isString(message.mediaContent)))
                return "mediaContent: buffer expected";
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            if (!$util.isString(message.groupId))
                return "groupId: string expected";
        if (message.sender != null && message.hasOwnProperty("sender"))
            if (!$util.isString(message.sender))
                return "sender: string expected";
        if (message.receiver != null && message.hasOwnProperty("receiver"))
            if (!$util.isString(message.receiver))
                return "receiver: string expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.appKey != null && message.hasOwnProperty("appKey"))
            if (!$util.isString(message.appKey))
                return "appKey: string expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isString(message.sign))
                return "sign: string expected";
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            if (!$util.isString(message.requestId))
                return "requestId: string expected";
        if (message.responseId != null && message.hasOwnProperty("responseId"))
            if (!$util.isString(message.responseId))
                return "responseId: string expected";
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId"))
            if (!$util.isString(message.uniqueId))
                return "uniqueId: string expected";
        if (message.identifier != null && message.hasOwnProperty("identifier"))
            if (!$util.isString(message.identifier))
                return "identifier: string expected";
        if (message.clientType != null && message.hasOwnProperty("clientType"))
            if (!$util.isInteger(message.clientType))
                return "clientType: integer expected";
        if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
            if (!$util.isString(message.clientVersion))
                return "clientVersion: string expected";
        if (message.encryptionType != null && message.hasOwnProperty("encryptionType"))
            if (!$util.isInteger(message.encryptionType))
                return "encryptionType: integer expected";
        return null;
    };

    /**
     * Creates a Model message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Model
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Model} Model
     */
    Model.fromObject = function fromObject(object) {
        if (object instanceof $root.Model)
            return object;
        var message = new $root.Model();
        if (object.cmd != null)
            message.cmd = object.cmd >>> 0;
        if (object.msgType != null)
            message.msgType = object.msgType >>> 0;
        if (object.timestamp != null)
            if ($util.Long)
                (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
            else if (typeof object.timestamp === "string")
                message.timestamp = parseInt(object.timestamp, 10);
            else if (typeof object.timestamp === "number")
                message.timestamp = object.timestamp;
            else if (typeof object.timestamp === "object")
                message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
        if (object.textContent != null)
            message.textContent = String(object.textContent);
        if (object.contentType != null)
            message.contentType = String(object.contentType);
        if (object.mediaContent != null)
            if (typeof object.mediaContent === "string")
                $util.base64.decode(object.mediaContent, message.mediaContent = $util.newBuffer($util.base64.length(object.mediaContent)), 0);
            else if (object.mediaContent.length)
                message.mediaContent = object.mediaContent;
        if (object.groupId != null)
            message.groupId = String(object.groupId);
        if (object.sender != null)
            message.sender = String(object.sender);
        if (object.receiver != null)
            message.receiver = String(object.receiver);
        if (object.token != null)
            message.token = String(object.token);
        if (object.appKey != null)
            message.appKey = String(object.appKey);
        if (object.sign != null)
            message.sign = String(object.sign);
        if (object.requestId != null)
            message.requestId = String(object.requestId);
        if (object.responseId != null)
            message.responseId = String(object.responseId);
        if (object.uniqueId != null)
            message.uniqueId = String(object.uniqueId);
        if (object.identifier != null)
            message.identifier = String(object.identifier);
        if (object.clientType != null)
            message.clientType = object.clientType >>> 0;
        if (object.clientVersion != null)
            message.clientVersion = String(object.clientVersion);
        if (object.encryptionType != null)
            message.encryptionType = object.encryptionType >>> 0;
        return message;
    };

    /**
     * Creates a plain object from a Model message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Model
     * @static
     * @param {Model} message Model
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Model.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.cmd = 0;
            object.msgType = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.timestamp = options.longs === String ? "0" : 0;
            object.textContent = "";
            object.contentType = "";
            if (options.bytes === String)
                object.mediaContent = "";
            else {
                object.mediaContent = [];
                if (options.bytes !== Array)
                    object.mediaContent = $util.newBuffer(object.mediaContent);
            }
            object.groupId = "";
            object.sender = "";
            object.receiver = "";
            object.token = "";
            object.appKey = "";
            object.sign = "";
            object.requestId = "";
            object.responseId = "";
            object.uniqueId = "";
            object.identifier = "";
            object.clientType = 0;
            object.clientVersion = "";
            object.encryptionType = 0;
        }
        if (message.cmd != null && message.hasOwnProperty("cmd"))
            object.cmd = message.cmd;
        if (message.msgType != null && message.hasOwnProperty("msgType"))
            object.msgType = message.msgType;
        if (message.timestamp != null && message.hasOwnProperty("timestamp"))
            if (typeof message.timestamp === "number")
                object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
            else
                object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
        if (message.textContent != null && message.hasOwnProperty("textContent"))
            object.textContent = message.textContent;
        if (message.contentType != null && message.hasOwnProperty("contentType"))
            object.contentType = message.contentType;
        if (message.mediaContent != null && message.hasOwnProperty("mediaContent"))
            object.mediaContent = options.bytes === String ? $util.base64.encode(message.mediaContent, 0, message.mediaContent.length) : options.bytes === Array ? Array.prototype.slice.call(message.mediaContent) : message.mediaContent;
        if (message.groupId != null && message.hasOwnProperty("groupId"))
            object.groupId = message.groupId;
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.receiver != null && message.hasOwnProperty("receiver"))
            object.receiver = message.receiver;
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.appKey != null && message.hasOwnProperty("appKey"))
            object.appKey = message.appKey;
        if (message.sign != null && message.hasOwnProperty("sign"))
            object.sign = message.sign;
        if (message.requestId != null && message.hasOwnProperty("requestId"))
            object.requestId = message.requestId;
        if (message.responseId != null && message.hasOwnProperty("responseId"))
            object.responseId = message.responseId;
        if (message.uniqueId != null && message.hasOwnProperty("uniqueId"))
            object.uniqueId = message.uniqueId;
        if (message.identifier != null && message.hasOwnProperty("identifier"))
            object.identifier = message.identifier;
        if (message.clientType != null && message.hasOwnProperty("clientType"))
            object.clientType = message.clientType;
        if (message.clientVersion != null && message.hasOwnProperty("clientVersion"))
            object.clientVersion = message.clientVersion;
        if (message.encryptionType != null && message.hasOwnProperty("encryptionType"))
            object.encryptionType = message.encryptionType;
        return object;
    };

    /**
     * Converts this Model to JSON.
     * @function toJSON
     * @memberof Model
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Model.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Model;
})();

module.exports = $root;

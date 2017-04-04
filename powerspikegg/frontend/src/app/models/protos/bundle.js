/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.game = (function() {

    /**
     * Namespace game.
     * @exports game
     * @namespace
     */
    var game = {};

    game.leagueoflegends = (function() {

        /**
         * Namespace leagueoflegends.
         * @exports game.leagueoflegends
         * @namespace
         */
        var leagueoflegends = {};

        /**
         * Region enum.
         * @name Region
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} BR=0 BR value
         * @property {number} EUNE=1 EUNE value
         * @property {number} EUW=2 EUW value
         * @property {number} KR=3 KR value
         * @property {number} LAN=4 LAN value
         * @property {number} LAS=5 LAS value
         * @property {number} NA=6 NA value
         * @property {number} OCE=7 OCE value
         * @property {number} RU=8 RU value
         * @property {number} TR=9 TR value
         */
        leagueoflegends.Region = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "BR"] = 0;
            values[valuesById[1] = "EUNE"] = 1;
            values[valuesById[2] = "EUW"] = 2;
            values[valuesById[3] = "KR"] = 3;
            values[valuesById[4] = "LAN"] = 4;
            values[valuesById[5] = "LAS"] = 5;
            values[valuesById[6] = "NA"] = 6;
            values[valuesById[7] = "OCE"] = 7;
            values[valuesById[8] = "RU"] = 8;
            values[valuesById[9] = "TR"] = 9;
            return values;
        })();

        /**
         * Map enum.
         * @name Map
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} SUMMONER_RIFT=0 SUMMONER_RIFT value
         */
        leagueoflegends.Map = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SUMMONER_RIFT"] = 0;
            return values;
        })();

        /**
         * QueueType enum.
         * @name QueueType
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} TEAM_BUILDER_RANKED_SOLO=0 TEAM_BUILDER_RANKED_SOLO value
         */
        leagueoflegends.QueueType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "TEAM_BUILDER_RANKED_SOLO"] = 0;
            return values;
        })();

        /**
         * Season enum.
         * @name Season
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} SEASON2017=0 SEASON2017 value
         * @property {number} PRESEASON2017=1 PRESEASON2017 value
         * @property {number} SEASON2016=2 SEASON2016 value
         */
        leagueoflegends.Season = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "SEASON2017"] = 0;
            values[valuesById[1] = "PRESEASON2017"] = 1;
            values[valuesById[2] = "SEASON2016"] = 2;
            return values;
        })();

        /**
         * League enum.
         * @name League
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} UNRANKED=0 UNRANKED value
         * @property {number} BRONZE=1 BRONZE value
         * @property {number} SILVER=2 SILVER value
         * @property {number} GOLD=3 GOLD value
         * @property {number} PLATINUM=4 PLATINUM value
         * @property {number} DIAMOND=5 DIAMOND value
         * @property {number} MASTER=6 MASTER value
         * @property {number} CHALLENGER=7 CHALLENGER value
         */
        leagueoflegends.League = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNRANKED"] = 0;
            values[valuesById[1] = "BRONZE"] = 1;
            values[valuesById[2] = "SILVER"] = 2;
            values[valuesById[3] = "GOLD"] = 3;
            values[valuesById[4] = "PLATINUM"] = 4;
            values[valuesById[5] = "DIAMOND"] = 5;
            values[valuesById[6] = "MASTER"] = 6;
            values[valuesById[7] = "CHALLENGER"] = 7;
            return values;
        })();

        /**
         * Role enum.
         * @name Role
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} UNDEFINED=0 UNDEFINED value
         * @property {number} TOP=1 TOP value
         * @property {number} JUNGLE=2 JUNGLE value
         * @property {number} MIDDLE=3 MIDDLE value
         * @property {number} ADCARRY=4 ADCARRY value
         * @property {number} SUPPORT=5 SUPPORT value
         */
        leagueoflegends.Role = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNDEFINED"] = 0;
            values[valuesById[1] = "TOP"] = 1;
            values[valuesById[2] = "JUNGLE"] = 2;
            values[valuesById[3] = "MIDDLE"] = 3;
            values[valuesById[4] = "ADCARRY"] = 4;
            values[valuesById[5] = "SUPPORT"] = 5;
            return values;
        })();

        leagueoflegends.Summoner = (function() {

            /**
             * Properties of a Summoner.
             * @typedef game.leagueoflegends.Summoner$Properties
             * @type {Object}
             * @property {number} [id] Summoner id.
             * @property {string} [name] Summoner name.
             * @property {game.leagueoflegends.Region} [region] Summoner region.
             * @property {game.leagueoflegends.League} [league] Summoner league.
             */

            /**
             * Constructs a new Summoner.
             * @exports game.leagueoflegends.Summoner
             * @constructor
             * @param {game.leagueoflegends.Summoner$Properties=} [properties] Properties to set
             */
            function Summoner(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Summoner id.
             * @type {number|undefined}
             */
            Summoner.prototype.id = 0;

            /**
             * Summoner name.
             * @type {string|undefined}
             */
            Summoner.prototype.name = "";

            /**
             * Summoner region.
             * @type {game.leagueoflegends.Region|undefined}
             */
            Summoner.prototype.region = 0;

            /**
             * Summoner league.
             * @type {game.leagueoflegends.League|undefined}
             */
            Summoner.prototype.league = 0;

            /**
             * Creates a new Summoner instance using the specified properties.
             * @param {game.leagueoflegends.Summoner$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Summoner} Summoner instance
             */
            Summoner.create = function create(properties) {
                return new Summoner(properties);
            };

            /**
             * Encodes the specified Summoner message. Does not implicitly {@link game.leagueoflegends.Summoner.verify|verify} messages.
             * @param {game.leagueoflegends.Summoner$Properties} message Summoner message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Summoner.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.region != null && message.hasOwnProperty("region"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.region);
                if (message.league != null && message.hasOwnProperty("league"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.league);
                return writer;
            };

            /**
             * Encodes the specified Summoner message, length delimited. Does not implicitly {@link game.leagueoflegends.Summoner.verify|verify} messages.
             * @param {game.leagueoflegends.Summoner$Properties} message Summoner message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Summoner.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Summoner message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Summoner} Summoner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Summoner.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.Summoner();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    case 3:
                        message.region = reader.uint32();
                        break;
                    case 4:
                        message.league = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Summoner message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Summoner} Summoner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Summoner.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Summoner message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Summoner.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null)
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.region != null)
                    switch (message.region) {
                    default:
                        return "region: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
                if (message.league != null)
                    switch (message.league) {
                    default:
                        return "league: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        break;
                    }
                return null;
            };

            /**
             * Creates a Summoner message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Summoner} Summoner
             */
            Summoner.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.Summoner)
                    return object;
                var message = new $root.game.leagueoflegends.Summoner();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                switch (object.region) {
                case "BR":
                case 0:
                    message.region = 0;
                    break;
                case "EUNE":
                case 1:
                    message.region = 1;
                    break;
                case "EUW":
                case 2:
                    message.region = 2;
                    break;
                case "KR":
                case 3:
                    message.region = 3;
                    break;
                case "LAN":
                case 4:
                    message.region = 4;
                    break;
                case "LAS":
                case 5:
                    message.region = 5;
                    break;
                case "NA":
                case 6:
                    message.region = 6;
                    break;
                case "OCE":
                case 7:
                    message.region = 7;
                    break;
                case "RU":
                case 8:
                    message.region = 8;
                    break;
                case "TR":
                case 9:
                    message.region = 9;
                    break;
                }
                switch (object.league) {
                case "UNRANKED":
                case 0:
                    message.league = 0;
                    break;
                case "BRONZE":
                case 1:
                    message.league = 1;
                    break;
                case "SILVER":
                case 2:
                    message.league = 2;
                    break;
                case "GOLD":
                case 3:
                    message.league = 3;
                    break;
                case "PLATINUM":
                case 4:
                    message.league = 4;
                    break;
                case "DIAMOND":
                case 5:
                    message.league = 5;
                    break;
                case "MASTER":
                case 6:
                    message.league = 6;
                    break;
                case "CHALLENGER":
                case 7:
                    message.league = 7;
                    break;
                }
                return message;
            };

            /**
             * Creates a Summoner message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Summoner.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Summoner} Summoner
             */
            Summoner.from = Summoner.fromObject;

            /**
             * Creates a plain object from a Summoner message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Summoner} message Summoner
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Summoner.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                    object.region = options.enums === String ? "BR" : 0;
                    object.league = options.enums === String ? "UNRANKED" : 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.region != null && message.hasOwnProperty("region"))
                    object.region = options.enums === String ? $root.game.leagueoflegends.Region[message.region] : message.region;
                if (message.league != null && message.hasOwnProperty("league"))
                    object.league = options.enums === String ? $root.game.leagueoflegends.League[message.league] : message.league;
                return object;
            };

            /**
             * Creates a plain object from this Summoner message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Summoner.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Summoner to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Summoner.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Summoner;
        })();

        leagueoflegends.SummonerSpell = (function() {

            /**
             * Properties of a SummonerSpell.
             * @typedef game.leagueoflegends.SummonerSpell$Properties
             * @type {Object}
             * @property {number} [id] SummonerSpell id.
             * @property {string} [name] SummonerSpell name.
             */

            /**
             * Constructs a new SummonerSpell.
             * @exports game.leagueoflegends.SummonerSpell
             * @constructor
             * @param {game.leagueoflegends.SummonerSpell$Properties=} [properties] Properties to set
             */
            function SummonerSpell(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * SummonerSpell id.
             * @type {number|undefined}
             */
            SummonerSpell.prototype.id = 0;

            /**
             * SummonerSpell name.
             * @type {string|undefined}
             */
            SummonerSpell.prototype.name = "";

            /**
             * Creates a new SummonerSpell instance using the specified properties.
             * @param {game.leagueoflegends.SummonerSpell$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell instance
             */
            SummonerSpell.create = function create(properties) {
                return new SummonerSpell(properties);
            };

            /**
             * Encodes the specified SummonerSpell message. Does not implicitly {@link game.leagueoflegends.SummonerSpell.verify|verify} messages.
             * @param {game.leagueoflegends.SummonerSpell$Properties} message SummonerSpell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SummonerSpell.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified SummonerSpell message, length delimited. Does not implicitly {@link game.leagueoflegends.SummonerSpell.verify|verify} messages.
             * @param {game.leagueoflegends.SummonerSpell$Properties} message SummonerSpell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SummonerSpell.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SummonerSpell message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SummonerSpell.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.SummonerSpell();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SummonerSpell message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SummonerSpell.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SummonerSpell message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            SummonerSpell.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null)
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a SummonerSpell message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             */
            SummonerSpell.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.SummonerSpell)
                    return object;
                var message = new $root.game.leagueoflegends.SummonerSpell();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a SummonerSpell message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.SummonerSpell.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             */
            SummonerSpell.from = SummonerSpell.fromObject;

            /**
             * Creates a plain object from a SummonerSpell message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.SummonerSpell} message SummonerSpell
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SummonerSpell.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Creates a plain object from this SummonerSpell message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SummonerSpell.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this SummonerSpell to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            SummonerSpell.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SummonerSpell;
        })();

        leagueoflegends.Item = (function() {

            /**
             * Properties of an Item.
             * @typedef game.leagueoflegends.Item$Properties
             * @type {Object}
             * @property {number} [id] Item id.
             * @property {string} [name] Item name.
             */

            /**
             * Constructs a new Item.
             * @exports game.leagueoflegends.Item
             * @constructor
             * @param {game.leagueoflegends.Item$Properties=} [properties] Properties to set
             */
            function Item(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Item id.
             * @type {number|undefined}
             */
            Item.prototype.id = 0;

            /**
             * Item name.
             * @type {string|undefined}
             */
            Item.prototype.name = "";

            /**
             * Creates a new Item instance using the specified properties.
             * @param {game.leagueoflegends.Item$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Item} Item instance
             */
            Item.create = function create(properties) {
                return new Item(properties);
            };

            /**
             * Encodes the specified Item message. Does not implicitly {@link game.leagueoflegends.Item.verify|verify} messages.
             * @param {game.leagueoflegends.Item$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Item.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Item message, length delimited. Does not implicitly {@link game.leagueoflegends.Item.verify|verify} messages.
             * @param {game.leagueoflegends.Item$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Item.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Item message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Item} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Item.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.Item();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Item message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Item} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Item.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Item message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Item.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null)
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Item} Item
             */
            Item.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.Item)
                    return object;
                var message = new $root.game.leagueoflegends.Item();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Item.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Item} Item
             */
            Item.from = Item.fromObject;

            /**
             * Creates a plain object from an Item message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Item} message Item
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Item.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Creates a plain object from this Item message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Item.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Item to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Item.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Item;
        })();

        leagueoflegends.Champion = (function() {

            /**
             * Properties of a Champion.
             * @typedef game.leagueoflegends.Champion$Properties
             * @type {Object}
             * @property {number} [id] Champion id.
             * @property {string} [name] Champion name.
             */

            /**
             * Constructs a new Champion.
             * @exports game.leagueoflegends.Champion
             * @constructor
             * @param {game.leagueoflegends.Champion$Properties=} [properties] Properties to set
             */
            function Champion(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Champion id.
             * @type {number|undefined}
             */
            Champion.prototype.id = 0;

            /**
             * Champion name.
             * @type {string|undefined}
             */
            Champion.prototype.name = "";

            /**
             * Creates a new Champion instance using the specified properties.
             * @param {game.leagueoflegends.Champion$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Champion} Champion instance
             */
            Champion.create = function create(properties) {
                return new Champion(properties);
            };

            /**
             * Encodes the specified Champion message. Does not implicitly {@link game.leagueoflegends.Champion.verify|verify} messages.
             * @param {game.leagueoflegends.Champion$Properties} message Champion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Champion.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified Champion message, length delimited. Does not implicitly {@link game.leagueoflegends.Champion.verify|verify} messages.
             * @param {game.leagueoflegends.Champion$Properties} message Champion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Champion.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Champion message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Champion} Champion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Champion.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.Champion();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.name = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Champion message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Champion} Champion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Champion.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Champion message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Champion.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.name != null)
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates a Champion message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Champion} Champion
             */
            Champion.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.Champion)
                    return object;
                var message = new $root.game.leagueoflegends.Champion();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a Champion message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Champion.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Champion} Champion
             */
            Champion.from = Champion.fromObject;

            /**
             * Creates a plain object from a Champion message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Champion} message Champion
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Champion.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.name = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Creates a plain object from this Champion message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Champion.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Champion to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Champion.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Champion;
        })();

        leagueoflegends.MatchReference = (function() {

            /**
             * Properties of a MatchReference.
             * @typedef game.leagueoflegends.MatchReference$Properties
             * @type {Object}
             * @property {number} [id] MatchReference id.
             * @property {number} [timestamp] MatchReference timestamp.
             * @property {string} [version] MatchReference version.
             * @property {string} [plateformId] MatchReference plateformId.
             * @property {game.leagueoflegends.Region} [region] MatchReference region.
             * @property {game.leagueoflegends.QueueType} [queueType] MatchReference queueType.
             * @property {game.leagueoflegends.Season} [season] MatchReference season.
             * @property {game.leagueoflegends.MatchDetail$Properties} [detail] MatchReference detail.
             */

            /**
             * Constructs a new MatchReference.
             * @exports game.leagueoflegends.MatchReference
             * @constructor
             * @param {game.leagueoflegends.MatchReference$Properties=} [properties] Properties to set
             */
            function MatchReference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * MatchReference id.
             * @type {number|undefined}
             */
            MatchReference.prototype.id = 0;

            /**
             * MatchReference timestamp.
             * @type {number|undefined}
             */
            MatchReference.prototype.timestamp = 0;

            /**
             * MatchReference version.
             * @type {string|undefined}
             */
            MatchReference.prototype.version = "";

            /**
             * MatchReference plateformId.
             * @type {string|undefined}
             */
            MatchReference.prototype.plateformId = "";

            /**
             * MatchReference region.
             * @type {game.leagueoflegends.Region|undefined}
             */
            MatchReference.prototype.region = 0;

            /**
             * MatchReference queueType.
             * @type {game.leagueoflegends.QueueType|undefined}
             */
            MatchReference.prototype.queueType = 0;

            /**
             * MatchReference season.
             * @type {game.leagueoflegends.Season|undefined}
             */
            MatchReference.prototype.season = 0;

            /**
             * MatchReference detail.
             * @type {game.leagueoflegends.MatchDetail$Properties|undefined}
             */
            MatchReference.prototype.detail = null;

            /**
             * Creates a new MatchReference instance using the specified properties.
             * @param {game.leagueoflegends.MatchReference$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.MatchReference} MatchReference instance
             */
            MatchReference.create = function create(properties) {
                return new MatchReference(properties);
            };

            /**
             * Encodes the specified MatchReference message. Does not implicitly {@link game.leagueoflegends.MatchReference.verify|verify} messages.
             * @param {game.leagueoflegends.MatchReference$Properties} message MatchReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchReference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.id);
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.timestamp);
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.version);
                if (message.plateformId != null && message.hasOwnProperty("plateformId"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.plateformId);
                if (message.region != null && message.hasOwnProperty("region"))
                    writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.region);
                if (message.queueType != null && message.hasOwnProperty("queueType"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.queueType);
                if (message.season != null && message.hasOwnProperty("season"))
                    writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.season);
                if (message.detail && message.hasOwnProperty("detail"))
                    $root.game.leagueoflegends.MatchDetail.encode(message.detail, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MatchReference message, length delimited. Does not implicitly {@link game.leagueoflegends.MatchReference.verify|verify} messages.
             * @param {game.leagueoflegends.MatchReference$Properties} message MatchReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchReference.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MatchReference message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchReference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.MatchReference();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.double();
                        break;
                    case 2:
                        message.timestamp = reader.double();
                        break;
                    case 3:
                        message.version = reader.string();
                        break;
                    case 4:
                        message.plateformId = reader.string();
                        break;
                    case 5:
                        message.region = reader.uint32();
                        break;
                    case 6:
                        message.queueType = reader.uint32();
                        break;
                    case 7:
                        message.season = reader.uint32();
                        break;
                    case 8:
                        message.detail = $root.game.leagueoflegends.MatchDetail.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MatchReference message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchReference.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MatchReference message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MatchReference.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (typeof message.id !== "number")
                        return "id: number expected";
                if (message.timestamp != null)
                    if (typeof message.timestamp !== "number")
                        return "timestamp: number expected";
                if (message.version != null)
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.plateformId != null)
                    if (!$util.isString(message.plateformId))
                        return "plateformId: string expected";
                if (message.region != null)
                    switch (message.region) {
                    default:
                        return "region: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
                if (message.queueType != null)
                    switch (message.queueType) {
                    default:
                        return "queueType: enum value expected";
                    case 0:
                        break;
                    }
                if (message.season != null)
                    switch (message.season) {
                    default:
                        return "season: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                        break;
                    }
                if (message.detail != null) {
                    var error = $root.game.leagueoflegends.MatchDetail.verify(message.detail);
                    if (error)
                        return "detail." + error;
                }
                return null;
            };

            /**
             * Creates a MatchReference message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             */
            MatchReference.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.MatchReference)
                    return object;
                var message = new $root.game.leagueoflegends.MatchReference();
                if (object.id != null)
                    message.id = Number(object.id);
                if (object.timestamp != null)
                    message.timestamp = Number(object.timestamp);
                if (object.version != null)
                    message.version = String(object.version);
                if (object.plateformId != null)
                    message.plateformId = String(object.plateformId);
                switch (object.region) {
                case "BR":
                case 0:
                    message.region = 0;
                    break;
                case "EUNE":
                case 1:
                    message.region = 1;
                    break;
                case "EUW":
                case 2:
                    message.region = 2;
                    break;
                case "KR":
                case 3:
                    message.region = 3;
                    break;
                case "LAN":
                case 4:
                    message.region = 4;
                    break;
                case "LAS":
                case 5:
                    message.region = 5;
                    break;
                case "NA":
                case 6:
                    message.region = 6;
                    break;
                case "OCE":
                case 7:
                    message.region = 7;
                    break;
                case "RU":
                case 8:
                    message.region = 8;
                    break;
                case "TR":
                case 9:
                    message.region = 9;
                    break;
                }
                switch (object.queueType) {
                case "TEAM_BUILDER_RANKED_SOLO":
                case 0:
                    message.queueType = 0;
                    break;
                }
                switch (object.season) {
                case "SEASON2017":
                case 0:
                    message.season = 0;
                    break;
                case "PRESEASON2017":
                case 1:
                    message.season = 1;
                    break;
                case "SEASON2016":
                case 2:
                    message.season = 2;
                    break;
                }
                if (object.detail != null) {
                    if (typeof object.detail !== "object")
                        throw TypeError(".game.leagueoflegends.MatchReference.detail: object expected");
                    message.detail = $root.game.leagueoflegends.MatchDetail.fromObject(object.detail);
                }
                return message;
            };

            /**
             * Creates a MatchReference message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.MatchReference.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             */
            MatchReference.from = MatchReference.fromObject;

            /**
             * Creates a plain object from a MatchReference message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.MatchReference} message MatchReference
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchReference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.id = 0;
                    object.timestamp = 0;
                    object.version = "";
                    object.plateformId = "";
                    object.region = options.enums === String ? "BR" : 0;
                    object.queueType = options.enums === String ? "TEAM_BUILDER_RANKED_SOLO" : 0;
                    object.season = options.enums === String ? "SEASON2017" : 0;
                    object.detail = null;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    object.timestamp = message.timestamp;
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.plateformId != null && message.hasOwnProperty("plateformId"))
                    object.plateformId = message.plateformId;
                if (message.region != null && message.hasOwnProperty("region"))
                    object.region = options.enums === String ? $root.game.leagueoflegends.Region[message.region] : message.region;
                if (message.queueType != null && message.hasOwnProperty("queueType"))
                    object.queueType = options.enums === String ? $root.game.leagueoflegends.QueueType[message.queueType] : message.queueType;
                if (message.season != null && message.hasOwnProperty("season"))
                    object.season = options.enums === String ? $root.game.leagueoflegends.Season[message.season] : message.season;
                if (message.detail != null && message.hasOwnProperty("detail"))
                    object.detail = $root.game.leagueoflegends.MatchDetail.toObject(message.detail, options);
                return object;
            };

            /**
             * Creates a plain object from this MatchReference message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchReference.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this MatchReference to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            MatchReference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MatchReference;
        })();

        leagueoflegends.MatchDetail = (function() {

            /**
             * Properties of a MatchDetail.
             * @typedef game.leagueoflegends.MatchDetail$Properties
             * @type {Object}
             * @property {game.leagueoflegends.Map} [map] MatchDetail map.
             * @property {number} [duration] MatchDetail duration.
             * @property {Array.<game.leagueoflegends.TeamDetail$Properties>} [teams] MatchDetail teams.
             */

            /**
             * Constructs a new MatchDetail.
             * @exports game.leagueoflegends.MatchDetail
             * @constructor
             * @param {game.leagueoflegends.MatchDetail$Properties=} [properties] Properties to set
             */
            function MatchDetail(properties) {
                this.teams = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * MatchDetail map.
             * @type {game.leagueoflegends.Map|undefined}
             */
            MatchDetail.prototype.map = 0;

            /**
             * MatchDetail duration.
             * @type {number|undefined}
             */
            MatchDetail.prototype.duration = 0;

            /**
             * MatchDetail teams.
             * @type {Array.<game.leagueoflegends.TeamDetail$Properties>|undefined}
             */
            MatchDetail.prototype.teams = $util.emptyArray;

            /**
             * Creates a new MatchDetail instance using the specified properties.
             * @param {game.leagueoflegends.MatchDetail$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail instance
             */
            MatchDetail.create = function create(properties) {
                return new MatchDetail(properties);
            };

            /**
             * Encodes the specified MatchDetail message. Does not implicitly {@link game.leagueoflegends.MatchDetail.verify|verify} messages.
             * @param {game.leagueoflegends.MatchDetail$Properties} message MatchDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchDetail.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.map != null && message.hasOwnProperty("map"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.map);
                if (message.duration != null && message.hasOwnProperty("duration"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.duration);
                if (message.teams && message.teams.length)
                    for (var i = 0; i < message.teams.length; ++i)
                        $root.game.leagueoflegends.TeamDetail.encode(message.teams[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified MatchDetail message, length delimited. Does not implicitly {@link game.leagueoflegends.MatchDetail.verify|verify} messages.
             * @param {game.leagueoflegends.MatchDetail$Properties} message MatchDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MatchDetail.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MatchDetail message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchDetail.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.MatchDetail();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.map = reader.uint32();
                        break;
                    case 2:
                        message.duration = reader.double();
                        break;
                    case 3:
                        if (!(message.teams && message.teams.length))
                            message.teams = [];
                        message.teams.push($root.game.leagueoflegends.TeamDetail.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MatchDetail message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MatchDetail.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MatchDetail message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            MatchDetail.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.map != null)
                    switch (message.map) {
                    default:
                        return "map: enum value expected";
                    case 0:
                        break;
                    }
                if (message.duration != null)
                    if (typeof message.duration !== "number")
                        return "duration: number expected";
                if (message.teams != null) {
                    if (!Array.isArray(message.teams))
                        return "teams: array expected";
                    for (var i = 0; i < message.teams.length; ++i) {
                        var error = $root.game.leagueoflegends.TeamDetail.verify(message.teams[i]);
                        if (error)
                            return "teams." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a MatchDetail message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             */
            MatchDetail.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.MatchDetail)
                    return object;
                var message = new $root.game.leagueoflegends.MatchDetail();
                switch (object.map) {
                case "SUMMONER_RIFT":
                case 0:
                    message.map = 0;
                    break;
                }
                if (object.duration != null)
                    message.duration = Number(object.duration);
                if (object.teams) {
                    if (!Array.isArray(object.teams))
                        throw TypeError(".game.leagueoflegends.MatchDetail.teams: array expected");
                    message.teams = [];
                    for (var i = 0; i < object.teams.length; ++i) {
                        if (typeof object.teams[i] !== "object")
                            throw TypeError(".game.leagueoflegends.MatchDetail.teams: object expected");
                        message.teams[i] = $root.game.leagueoflegends.TeamDetail.fromObject(object.teams[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a MatchDetail message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.MatchDetail.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             */
            MatchDetail.from = MatchDetail.fromObject;

            /**
             * Creates a plain object from a MatchDetail message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.MatchDetail} message MatchDetail
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchDetail.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.teams = [];
                if (options.defaults) {
                    object.map = options.enums === String ? "SUMMONER_RIFT" : 0;
                    object.duration = 0;
                }
                if (message.map != null && message.hasOwnProperty("map"))
                    object.map = options.enums === String ? $root.game.leagueoflegends.Map[message.map] : message.map;
                if (message.duration != null && message.hasOwnProperty("duration"))
                    object.duration = message.duration;
                if (message.teams && message.teams.length) {
                    object.teams = [];
                    for (var j = 0; j < message.teams.length; ++j)
                        object.teams[j] = $root.game.leagueoflegends.TeamDetail.toObject(message.teams[j], options);
                }
                return object;
            };

            /**
             * Creates a plain object from this MatchDetail message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MatchDetail.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this MatchDetail to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            MatchDetail.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MatchDetail;
        })();

        leagueoflegends.TeamDetail = (function() {

            /**
             * Properties of a TeamDetail.
             * @typedef game.leagueoflegends.TeamDetail$Properties
             * @type {Object}
             * @property {number} [id] TeamDetail id.
             * @property {boolean} [winner] TeamDetail winner.
             * @property {Array.<number>} [bannedChampionIds] TeamDetail bannedChampionIds.
             * @property {number} [baronKills] TeamDetail baronKills.
             * @property {number} [dragonKills] TeamDetail dragonKills.
             * @property {number} [towerKills] TeamDetail towerKills.
             * @property {boolean} [firstBaron] TeamDetail firstBaron.
             * @property {boolean} [firstDragon] TeamDetail firstDragon.
             * @property {boolean} [firstBlood] TeamDetail firstBlood.
             * @property {boolean} [firstTower] TeamDetail firstTower.
             * @property {boolean} [firstInhibitor] TeamDetail firstInhibitor.
             * @property {boolean} [firstRiftHerald] TeamDetail firstRiftHerald.
             * @property {Array.<game.leagueoflegends.Participant$Properties>} [participants] TeamDetail participants.
             */

            /**
             * Constructs a new TeamDetail.
             * @exports game.leagueoflegends.TeamDetail
             * @constructor
             * @param {game.leagueoflegends.TeamDetail$Properties=} [properties] Properties to set
             */
            function TeamDetail(properties) {
                this.bannedChampionIds = [];
                this.participants = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * TeamDetail id.
             * @type {number|undefined}
             */
            TeamDetail.prototype.id = 0;

            /**
             * TeamDetail winner.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.winner = false;

            /**
             * TeamDetail bannedChampionIds.
             * @type {Array.<number>|undefined}
             */
            TeamDetail.prototype.bannedChampionIds = $util.emptyArray;

            /**
             * TeamDetail baronKills.
             * @type {number|undefined}
             */
            TeamDetail.prototype.baronKills = 0;

            /**
             * TeamDetail dragonKills.
             * @type {number|undefined}
             */
            TeamDetail.prototype.dragonKills = 0;

            /**
             * TeamDetail towerKills.
             * @type {number|undefined}
             */
            TeamDetail.prototype.towerKills = 0;

            /**
             * TeamDetail firstBaron.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstBaron = false;

            /**
             * TeamDetail firstDragon.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstDragon = false;

            /**
             * TeamDetail firstBlood.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstBlood = false;

            /**
             * TeamDetail firstTower.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstTower = false;

            /**
             * TeamDetail firstInhibitor.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstInhibitor = false;

            /**
             * TeamDetail firstRiftHerald.
             * @type {boolean|undefined}
             */
            TeamDetail.prototype.firstRiftHerald = false;

            /**
             * TeamDetail participants.
             * @type {Array.<game.leagueoflegends.Participant$Properties>|undefined}
             */
            TeamDetail.prototype.participants = $util.emptyArray;

            /**
             * Creates a new TeamDetail instance using the specified properties.
             * @param {game.leagueoflegends.TeamDetail$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail instance
             */
            TeamDetail.create = function create(properties) {
                return new TeamDetail(properties);
            };

            /**
             * Encodes the specified TeamDetail message. Does not implicitly {@link game.leagueoflegends.TeamDetail.verify|verify} messages.
             * @param {game.leagueoflegends.TeamDetail$Properties} message TeamDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TeamDetail.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.winner != null && message.hasOwnProperty("winner"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.winner);
                if (message.bannedChampionIds && message.bannedChampionIds.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (var i = 0; i < message.bannedChampionIds.length; ++i)
                        writer.int32(message.bannedChampionIds[i]);
                    writer.ldelim();
                }
                if (message.baronKills != null && message.hasOwnProperty("baronKills"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.baronKills);
                if (message.dragonKills != null && message.hasOwnProperty("dragonKills"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.dragonKills);
                if (message.towerKills != null && message.hasOwnProperty("towerKills"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.towerKills);
                if (message.firstBaron != null && message.hasOwnProperty("firstBaron"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.firstBaron);
                if (message.firstDragon != null && message.hasOwnProperty("firstDragon"))
                    writer.uint32(/* id 8, wireType 0 =*/64).bool(message.firstDragon);
                if (message.firstBlood != null && message.hasOwnProperty("firstBlood"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.firstBlood);
                if (message.firstTower != null && message.hasOwnProperty("firstTower"))
                    writer.uint32(/* id 10, wireType 0 =*/80).bool(message.firstTower);
                if (message.firstInhibitor != null && message.hasOwnProperty("firstInhibitor"))
                    writer.uint32(/* id 11, wireType 0 =*/88).bool(message.firstInhibitor);
                if (message.firstRiftHerald != null && message.hasOwnProperty("firstRiftHerald"))
                    writer.uint32(/* id 12, wireType 0 =*/96).bool(message.firstRiftHerald);
                if (message.participants && message.participants.length)
                    for (var i = 0; i < message.participants.length; ++i)
                        $root.game.leagueoflegends.Participant.encode(message.participants[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified TeamDetail message, length delimited. Does not implicitly {@link game.leagueoflegends.TeamDetail.verify|verify} messages.
             * @param {game.leagueoflegends.TeamDetail$Properties} message TeamDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TeamDetail.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TeamDetail message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TeamDetail.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.TeamDetail();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.winner = reader.bool();
                        break;
                    case 3:
                        if (!(message.bannedChampionIds && message.bannedChampionIds.length))
                            message.bannedChampionIds = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bannedChampionIds.push(reader.int32());
                        } else
                            message.bannedChampionIds.push(reader.int32());
                        break;
                    case 4:
                        message.baronKills = reader.int32();
                        break;
                    case 5:
                        message.dragonKills = reader.int32();
                        break;
                    case 6:
                        message.towerKills = reader.int32();
                        break;
                    case 7:
                        message.firstBaron = reader.bool();
                        break;
                    case 8:
                        message.firstDragon = reader.bool();
                        break;
                    case 9:
                        message.firstBlood = reader.bool();
                        break;
                    case 10:
                        message.firstTower = reader.bool();
                        break;
                    case 11:
                        message.firstInhibitor = reader.bool();
                        break;
                    case 12:
                        message.firstRiftHerald = reader.bool();
                        break;
                    case 13:
                        if (!(message.participants && message.participants.length))
                            message.participants = [];
                        message.participants.push($root.game.leagueoflegends.Participant.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TeamDetail message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TeamDetail.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TeamDetail message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            TeamDetail.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.winner != null)
                    if (typeof message.winner !== "boolean")
                        return "winner: boolean expected";
                if (message.bannedChampionIds != null) {
                    if (!Array.isArray(message.bannedChampionIds))
                        return "bannedChampionIds: array expected";
                    for (var i = 0; i < message.bannedChampionIds.length; ++i)
                        if (!$util.isInteger(message.bannedChampionIds[i]))
                            return "bannedChampionIds: integer[] expected";
                }
                if (message.baronKills != null)
                    if (!$util.isInteger(message.baronKills))
                        return "baronKills: integer expected";
                if (message.dragonKills != null)
                    if (!$util.isInteger(message.dragonKills))
                        return "dragonKills: integer expected";
                if (message.towerKills != null)
                    if (!$util.isInteger(message.towerKills))
                        return "towerKills: integer expected";
                if (message.firstBaron != null)
                    if (typeof message.firstBaron !== "boolean")
                        return "firstBaron: boolean expected";
                if (message.firstDragon != null)
                    if (typeof message.firstDragon !== "boolean")
                        return "firstDragon: boolean expected";
                if (message.firstBlood != null)
                    if (typeof message.firstBlood !== "boolean")
                        return "firstBlood: boolean expected";
                if (message.firstTower != null)
                    if (typeof message.firstTower !== "boolean")
                        return "firstTower: boolean expected";
                if (message.firstInhibitor != null)
                    if (typeof message.firstInhibitor !== "boolean")
                        return "firstInhibitor: boolean expected";
                if (message.firstRiftHerald != null)
                    if (typeof message.firstRiftHerald !== "boolean")
                        return "firstRiftHerald: boolean expected";
                if (message.participants != null) {
                    if (!Array.isArray(message.participants))
                        return "participants: array expected";
                    for (var i = 0; i < message.participants.length; ++i) {
                        var error = $root.game.leagueoflegends.Participant.verify(message.participants[i]);
                        if (error)
                            return "participants." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a TeamDetail message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             */
            TeamDetail.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.TeamDetail)
                    return object;
                var message = new $root.game.leagueoflegends.TeamDetail();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.winner != null)
                    message.winner = Boolean(object.winner);
                if (object.bannedChampionIds) {
                    if (!Array.isArray(object.bannedChampionIds))
                        throw TypeError(".game.leagueoflegends.TeamDetail.bannedChampionIds: array expected");
                    message.bannedChampionIds = [];
                    for (var i = 0; i < object.bannedChampionIds.length; ++i)
                        message.bannedChampionIds[i] = object.bannedChampionIds[i] | 0;
                }
                if (object.baronKills != null)
                    message.baronKills = object.baronKills | 0;
                if (object.dragonKills != null)
                    message.dragonKills = object.dragonKills | 0;
                if (object.towerKills != null)
                    message.towerKills = object.towerKills | 0;
                if (object.firstBaron != null)
                    message.firstBaron = Boolean(object.firstBaron);
                if (object.firstDragon != null)
                    message.firstDragon = Boolean(object.firstDragon);
                if (object.firstBlood != null)
                    message.firstBlood = Boolean(object.firstBlood);
                if (object.firstTower != null)
                    message.firstTower = Boolean(object.firstTower);
                if (object.firstInhibitor != null)
                    message.firstInhibitor = Boolean(object.firstInhibitor);
                if (object.firstRiftHerald != null)
                    message.firstRiftHerald = Boolean(object.firstRiftHerald);
                if (object.participants) {
                    if (!Array.isArray(object.participants))
                        throw TypeError(".game.leagueoflegends.TeamDetail.participants: array expected");
                    message.participants = [];
                    for (var i = 0; i < object.participants.length; ++i) {
                        if (typeof object.participants[i] !== "object")
                            throw TypeError(".game.leagueoflegends.TeamDetail.participants: object expected");
                        message.participants[i] = $root.game.leagueoflegends.Participant.fromObject(object.participants[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a TeamDetail message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.TeamDetail.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             */
            TeamDetail.from = TeamDetail.fromObject;

            /**
             * Creates a plain object from a TeamDetail message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.TeamDetail} message TeamDetail
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TeamDetail.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.bannedChampionIds = [];
                    object.participants = [];
                }
                if (options.defaults) {
                    object.id = 0;
                    object.winner = false;
                    object.baronKills = 0;
                    object.dragonKills = 0;
                    object.towerKills = 0;
                    object.firstBaron = false;
                    object.firstDragon = false;
                    object.firstBlood = false;
                    object.firstTower = false;
                    object.firstInhibitor = false;
                    object.firstRiftHerald = false;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.winner != null && message.hasOwnProperty("winner"))
                    object.winner = message.winner;
                if (message.bannedChampionIds && message.bannedChampionIds.length) {
                    object.bannedChampionIds = [];
                    for (var j = 0; j < message.bannedChampionIds.length; ++j)
                        object.bannedChampionIds[j] = message.bannedChampionIds[j];
                }
                if (message.baronKills != null && message.hasOwnProperty("baronKills"))
                    object.baronKills = message.baronKills;
                if (message.dragonKills != null && message.hasOwnProperty("dragonKills"))
                    object.dragonKills = message.dragonKills;
                if (message.towerKills != null && message.hasOwnProperty("towerKills"))
                    object.towerKills = message.towerKills;
                if (message.firstBaron != null && message.hasOwnProperty("firstBaron"))
                    object.firstBaron = message.firstBaron;
                if (message.firstDragon != null && message.hasOwnProperty("firstDragon"))
                    object.firstDragon = message.firstDragon;
                if (message.firstBlood != null && message.hasOwnProperty("firstBlood"))
                    object.firstBlood = message.firstBlood;
                if (message.firstTower != null && message.hasOwnProperty("firstTower"))
                    object.firstTower = message.firstTower;
                if (message.firstInhibitor != null && message.hasOwnProperty("firstInhibitor"))
                    object.firstInhibitor = message.firstInhibitor;
                if (message.firstRiftHerald != null && message.hasOwnProperty("firstRiftHerald"))
                    object.firstRiftHerald = message.firstRiftHerald;
                if (message.participants && message.participants.length) {
                    object.participants = [];
                    for (var j = 0; j < message.participants.length; ++j)
                        object.participants[j] = $root.game.leagueoflegends.Participant.toObject(message.participants[j], options);
                }
                return object;
            };

            /**
             * Creates a plain object from this TeamDetail message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TeamDetail.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this TeamDetail to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            TeamDetail.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return TeamDetail;
        })();

        leagueoflegends.Participant = (function() {

            /**
             * Properties of a Participant.
             * @typedef game.leagueoflegends.Participant$Properties
             * @type {Object}
             * @property {number} [id] Participant id.
             * @property {game.leagueoflegends.Summoner$Properties} [summoner] Participant summoner.
             * @property {game.leagueoflegends.SummonerSpell$Properties} [summonerSpell_1] Participant summonerSpell_1.
             * @property {game.leagueoflegends.SummonerSpell$Properties} [summonerSpell_2] Participant summonerSpell_2.
             * @property {Array.<game.leagueoflegends.Item$Properties>} [items] Participant items.
             * @property {game.leagueoflegends.PlayerStatistics$Properties} [statistics] Participant statistics.
             * @property {game.leagueoflegends.Champion$Properties} [champion] Participant champion.
             * @property {game.leagueoflegends.Role} [role] Participant role.
             */

            /**
             * Constructs a new Participant.
             * @exports game.leagueoflegends.Participant
             * @constructor
             * @param {game.leagueoflegends.Participant$Properties=} [properties] Properties to set
             */
            function Participant(properties) {
                this.items = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * Participant id.
             * @type {number|undefined}
             */
            Participant.prototype.id = 0;

            /**
             * Participant summoner.
             * @type {game.leagueoflegends.Summoner$Properties|undefined}
             */
            Participant.prototype.summoner = null;

            /**
             * Participant summonerSpell_1.
             * @type {game.leagueoflegends.SummonerSpell$Properties|undefined}
             */
            Participant.prototype.summonerSpell_1 = null;

            /**
             * Participant summonerSpell_2.
             * @type {game.leagueoflegends.SummonerSpell$Properties|undefined}
             */
            Participant.prototype.summonerSpell_2 = null;

            /**
             * Participant items.
             * @type {Array.<game.leagueoflegends.Item$Properties>|undefined}
             */
            Participant.prototype.items = $util.emptyArray;

            /**
             * Participant statistics.
             * @type {game.leagueoflegends.PlayerStatistics$Properties|undefined}
             */
            Participant.prototype.statistics = null;

            /**
             * Participant champion.
             * @type {game.leagueoflegends.Champion$Properties|undefined}
             */
            Participant.prototype.champion = null;

            /**
             * Participant role.
             * @type {game.leagueoflegends.Role|undefined}
             */
            Participant.prototype.role = 0;

            /**
             * Creates a new Participant instance using the specified properties.
             * @param {game.leagueoflegends.Participant$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Participant} Participant instance
             */
            Participant.create = function create(properties) {
                return new Participant(properties);
            };

            /**
             * Encodes the specified Participant message. Does not implicitly {@link game.leagueoflegends.Participant.verify|verify} messages.
             * @param {game.leagueoflegends.Participant$Properties} message Participant message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Participant.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && message.hasOwnProperty("id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                if (message.summoner && message.hasOwnProperty("summoner"))
                    $root.game.leagueoflegends.Summoner.encode(message.summoner, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.summonerSpell_1 && message.hasOwnProperty("summonerSpell_1"))
                    $root.game.leagueoflegends.SummonerSpell.encode(message.summonerSpell_1, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.summonerSpell_2 && message.hasOwnProperty("summonerSpell_2"))
                    $root.game.leagueoflegends.SummonerSpell.encode(message.summonerSpell_2, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.items && message.items.length)
                    for (var i = 0; i < message.items.length; ++i)
                        $root.game.leagueoflegends.Item.encode(message.items[i], writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.statistics && message.hasOwnProperty("statistics"))
                    $root.game.leagueoflegends.PlayerStatistics.encode(message.statistics, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.champion && message.hasOwnProperty("champion"))
                    $root.game.leagueoflegends.Champion.encode(message.champion, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                if (message.role != null && message.hasOwnProperty("role"))
                    writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.role);
                return writer;
            };

            /**
             * Encodes the specified Participant message, length delimited. Does not implicitly {@link game.leagueoflegends.Participant.verify|verify} messages.
             * @param {game.leagueoflegends.Participant$Properties} message Participant message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Participant.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Participant message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Participant} Participant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Participant.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.Participant();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.summoner = $root.game.leagueoflegends.Summoner.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.summonerSpell_1 = $root.game.leagueoflegends.SummonerSpell.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.summonerSpell_2 = $root.game.leagueoflegends.SummonerSpell.decode(reader, reader.uint32());
                        break;
                    case 8:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.game.leagueoflegends.Item.decode(reader, reader.uint32()));
                        break;
                    case 9:
                        message.statistics = $root.game.leagueoflegends.PlayerStatistics.decode(reader, reader.uint32());
                        break;
                    case 10:
                        message.champion = $root.game.leagueoflegends.Champion.decode(reader, reader.uint32());
                        break;
                    case 11:
                        message.role = reader.uint32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Participant message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Participant} Participant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Participant.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Participant message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            Participant.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null)
                    if (!$util.isInteger(message.id))
                        return "id: integer expected";
                if (message.summoner != null) {
                    var error = $root.game.leagueoflegends.Summoner.verify(message.summoner);
                    if (error)
                        return "summoner." + error;
                }
                if (message.summonerSpell_1 != null) {
                    var error = $root.game.leagueoflegends.SummonerSpell.verify(message.summonerSpell_1);
                    if (error)
                        return "summonerSpell_1." + error;
                }
                if (message.summonerSpell_2 != null) {
                    var error = $root.game.leagueoflegends.SummonerSpell.verify(message.summonerSpell_2);
                    if (error)
                        return "summonerSpell_2." + error;
                }
                if (message.items != null) {
                    if (!Array.isArray(message.items))
                        return "items: array expected";
                    for (var i = 0; i < message.items.length; ++i) {
                        var error = $root.game.leagueoflegends.Item.verify(message.items[i]);
                        if (error)
                            return "items." + error;
                    }
                }
                if (message.statistics != null) {
                    var error = $root.game.leagueoflegends.PlayerStatistics.verify(message.statistics);
                    if (error)
                        return "statistics." + error;
                }
                if (message.champion != null) {
                    var error = $root.game.leagueoflegends.Champion.verify(message.champion);
                    if (error)
                        return "champion." + error;
                }
                if (message.role != null)
                    switch (message.role) {
                    default:
                        return "role: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                return null;
            };

            /**
             * Creates a Participant message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Participant} Participant
             */
            Participant.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.Participant)
                    return object;
                var message = new $root.game.leagueoflegends.Participant();
                if (object.id != null)
                    message.id = object.id | 0;
                if (object.summoner != null) {
                    if (typeof object.summoner !== "object")
                        throw TypeError(".game.leagueoflegends.Participant.summoner: object expected");
                    message.summoner = $root.game.leagueoflegends.Summoner.fromObject(object.summoner);
                }
                if (object.summonerSpell_1 != null) {
                    if (typeof object.summonerSpell_1 !== "object")
                        throw TypeError(".game.leagueoflegends.Participant.summonerSpell_1: object expected");
                    message.summonerSpell_1 = $root.game.leagueoflegends.SummonerSpell.fromObject(object.summonerSpell_1);
                }
                if (object.summonerSpell_2 != null) {
                    if (typeof object.summonerSpell_2 !== "object")
                        throw TypeError(".game.leagueoflegends.Participant.summonerSpell_2: object expected");
                    message.summonerSpell_2 = $root.game.leagueoflegends.SummonerSpell.fromObject(object.summonerSpell_2);
                }
                if (object.items) {
                    if (!Array.isArray(object.items))
                        throw TypeError(".game.leagueoflegends.Participant.items: array expected");
                    message.items = [];
                    for (var i = 0; i < object.items.length; ++i) {
                        if (typeof object.items[i] !== "object")
                            throw TypeError(".game.leagueoflegends.Participant.items: object expected");
                        message.items[i] = $root.game.leagueoflegends.Item.fromObject(object.items[i]);
                    }
                }
                if (object.statistics != null) {
                    if (typeof object.statistics !== "object")
                        throw TypeError(".game.leagueoflegends.Participant.statistics: object expected");
                    message.statistics = $root.game.leagueoflegends.PlayerStatistics.fromObject(object.statistics);
                }
                if (object.champion != null) {
                    if (typeof object.champion !== "object")
                        throw TypeError(".game.leagueoflegends.Participant.champion: object expected");
                    message.champion = $root.game.leagueoflegends.Champion.fromObject(object.champion);
                }
                switch (object.role) {
                case "UNDEFINED":
                case 0:
                    message.role = 0;
                    break;
                case "TOP":
                case 1:
                    message.role = 1;
                    break;
                case "JUNGLE":
                case 2:
                    message.role = 2;
                    break;
                case "MIDDLE":
                case 3:
                    message.role = 3;
                    break;
                case "ADCARRY":
                case 4:
                    message.role = 4;
                    break;
                case "SUPPORT":
                case 5:
                    message.role = 5;
                    break;
                }
                return message;
            };

            /**
             * Creates a Participant message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Participant.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Participant} Participant
             */
            Participant.from = Participant.fromObject;

            /**
             * Creates a plain object from a Participant message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Participant} message Participant
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Participant.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.items = [];
                if (options.defaults) {
                    object.id = 0;
                    object.summoner = null;
                    object.summonerSpell_1 = null;
                    object.summonerSpell_2 = null;
                    object.statistics = null;
                    object.champion = null;
                    object.role = options.enums === String ? "UNDEFINED" : 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.summoner != null && message.hasOwnProperty("summoner"))
                    object.summoner = $root.game.leagueoflegends.Summoner.toObject(message.summoner, options);
                if (message.summonerSpell_1 != null && message.hasOwnProperty("summonerSpell_1"))
                    object.summonerSpell_1 = $root.game.leagueoflegends.SummonerSpell.toObject(message.summonerSpell_1, options);
                if (message.summonerSpell_2 != null && message.hasOwnProperty("summonerSpell_2"))
                    object.summonerSpell_2 = $root.game.leagueoflegends.SummonerSpell.toObject(message.summonerSpell_2, options);
                if (message.items && message.items.length) {
                    object.items = [];
                    for (var j = 0; j < message.items.length; ++j)
                        object.items[j] = $root.game.leagueoflegends.Item.toObject(message.items[j], options);
                }
                if (message.statistics != null && message.hasOwnProperty("statistics"))
                    object.statistics = $root.game.leagueoflegends.PlayerStatistics.toObject(message.statistics, options);
                if (message.champion != null && message.hasOwnProperty("champion"))
                    object.champion = $root.game.leagueoflegends.Champion.toObject(message.champion, options);
                if (message.role != null && message.hasOwnProperty("role"))
                    object.role = options.enums === String ? $root.game.leagueoflegends.Role[message.role] : message.role;
                return object;
            };

            /**
             * Creates a plain object from this Participant message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Participant.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this Participant to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            Participant.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Participant;
        })();

        leagueoflegends.PlayerStatistics = (function() {

            /**
             * Properties of a PlayerStatistics.
             * @typedef game.leagueoflegends.PlayerStatistics$Properties
             * @type {Object}
             * @property {number} [kills] PlayerStatistics kills.
             * @property {number} [deaths] PlayerStatistics deaths.
             * @property {number} [assists] PlayerStatistics assists.
             * @property {number} [championLevel] PlayerStatistics championLevel.
             * @property {game.leagueoflegends.DamageStatistic$Properties} [magicDamages] PlayerStatistics magicDamages.
             * @property {game.leagueoflegends.DamageStatistic$Properties} [physicalDamages] PlayerStatistics physicalDamages.
             * @property {game.leagueoflegends.DamageStatistic$Properties} [trueDamages] PlayerStatistics trueDamages.
             * @property {game.leagueoflegends.DamageStatistic$Properties} [totalDamages] PlayerStatistics totalDamages.
             * @property {number} [totalHeal] PlayerStatistics totalHeal.
             * @property {number} [largestCriticalStrike] PlayerStatistics largestCriticalStrike.
             * @property {number} [goldEarned] PlayerStatistics goldEarned.
             * @property {number} [goldSpent] PlayerStatistics goldSpent.
             * @property {number} [minionsKilled] PlayerStatistics minionsKilled.
             * @property {number} [neutralMinionsKilled] PlayerStatistics neutralMinionsKilled.
             * @property {number} [neutralMinionsKilledEnnemyJungle] PlayerStatistics neutralMinionsKilledEnnemyJungle.
             * @property {number} [neutralMinionsKilledTeamJungle] PlayerStatistics neutralMinionsKilledTeamJungle.
             * @property {number} [sightWardsBought] PlayerStatistics sightWardsBought.
             * @property {number} [visionWardsBought] PlayerStatistics visionWardsBought.
             * @property {number} [wardsPlaced] PlayerStatistics wardsPlaced.
             * @property {number} [wardsKilled] PlayerStatistics wardsKilled.
             * @property {number} [doubleKills] PlayerStatistics doubleKills.
             * @property {number} [tripleKills] PlayerStatistics tripleKills.
             * @property {number} [quadraKills] PlayerStatistics quadraKills.
             * @property {number} [pentaKills] PlayerStatistics pentaKills.
             * @property {number} [killingSprees] PlayerStatistics killingSprees.
             * @property {number} [largestKillingSpree] PlayerStatistics largestKillingSpree.
             * @property {number} [largestMultiKill] PlayerStatistics largestMultiKill.
             * @property {number} [inhibitorKills] PlayerStatistics inhibitorKills.
             * @property {number} [towerKills] PlayerStatistics towerKills.
             * @property {boolean} [firstBloodAssist] PlayerStatistics firstBloodAssist.
             * @property {boolean} [firstBloodKill] PlayerStatistics firstBloodKill.
             * @property {boolean} [firstInhibitorKill] PlayerStatistics firstInhibitorKill.
             * @property {boolean} [firstTowerAssist] PlayerStatistics firstTowerAssist.
             * @property {boolean} [firstTowerKill] PlayerStatistics firstTowerKill.
             * @property {number} [totalCrowdControl] PlayerStatistics totalCrowdControl.
             * @property {number} [totalUnitsHealed] PlayerStatistics totalUnitsHealed.
             */

            /**
             * Constructs a new PlayerStatistics.
             * @exports game.leagueoflegends.PlayerStatistics
             * @constructor
             * @param {game.leagueoflegends.PlayerStatistics$Properties=} [properties] Properties to set
             */
            function PlayerStatistics(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * PlayerStatistics kills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.kills = 0;

            /**
             * PlayerStatistics deaths.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.deaths = 0;

            /**
             * PlayerStatistics assists.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.assists = 0;

            /**
             * PlayerStatistics championLevel.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.championLevel = 0;

            /**
             * PlayerStatistics magicDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            PlayerStatistics.prototype.magicDamages = null;

            /**
             * PlayerStatistics physicalDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            PlayerStatistics.prototype.physicalDamages = null;

            /**
             * PlayerStatistics trueDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            PlayerStatistics.prototype.trueDamages = null;

            /**
             * PlayerStatistics totalDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            PlayerStatistics.prototype.totalDamages = null;

            /**
             * PlayerStatistics totalHeal.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.totalHeal = 0;

            /**
             * PlayerStatistics largestCriticalStrike.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.largestCriticalStrike = 0;

            /**
             * PlayerStatistics goldEarned.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.goldEarned = 0;

            /**
             * PlayerStatistics goldSpent.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.goldSpent = 0;

            /**
             * PlayerStatistics minionsKilled.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.minionsKilled = 0;

            /**
             * PlayerStatistics neutralMinionsKilled.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.neutralMinionsKilled = 0;

            /**
             * PlayerStatistics neutralMinionsKilledEnnemyJungle.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.neutralMinionsKilledEnnemyJungle = 0;

            /**
             * PlayerStatistics neutralMinionsKilledTeamJungle.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.neutralMinionsKilledTeamJungle = 0;

            /**
             * PlayerStatistics sightWardsBought.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.sightWardsBought = 0;

            /**
             * PlayerStatistics visionWardsBought.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.visionWardsBought = 0;

            /**
             * PlayerStatistics wardsPlaced.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.wardsPlaced = 0;

            /**
             * PlayerStatistics wardsKilled.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.wardsKilled = 0;

            /**
             * PlayerStatistics doubleKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.doubleKills = 0;

            /**
             * PlayerStatistics tripleKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.tripleKills = 0;

            /**
             * PlayerStatistics quadraKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.quadraKills = 0;

            /**
             * PlayerStatistics pentaKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.pentaKills = 0;

            /**
             * PlayerStatistics killingSprees.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.killingSprees = 0;

            /**
             * PlayerStatistics largestKillingSpree.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.largestKillingSpree = 0;

            /**
             * PlayerStatistics largestMultiKill.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.largestMultiKill = 0;

            /**
             * PlayerStatistics inhibitorKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.inhibitorKills = 0;

            /**
             * PlayerStatistics towerKills.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.towerKills = 0;

            /**
             * PlayerStatistics firstBloodAssist.
             * @type {boolean|undefined}
             */
            PlayerStatistics.prototype.firstBloodAssist = false;

            /**
             * PlayerStatistics firstBloodKill.
             * @type {boolean|undefined}
             */
            PlayerStatistics.prototype.firstBloodKill = false;

            /**
             * PlayerStatistics firstInhibitorKill.
             * @type {boolean|undefined}
             */
            PlayerStatistics.prototype.firstInhibitorKill = false;

            /**
             * PlayerStatistics firstTowerAssist.
             * @type {boolean|undefined}
             */
            PlayerStatistics.prototype.firstTowerAssist = false;

            /**
             * PlayerStatistics firstTowerKill.
             * @type {boolean|undefined}
             */
            PlayerStatistics.prototype.firstTowerKill = false;

            /**
             * PlayerStatistics totalCrowdControl.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.totalCrowdControl = 0;

            /**
             * PlayerStatistics totalUnitsHealed.
             * @type {number|undefined}
             */
            PlayerStatistics.prototype.totalUnitsHealed = 0;

            /**
             * Creates a new PlayerStatistics instance using the specified properties.
             * @param {game.leagueoflegends.PlayerStatistics$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics instance
             */
            PlayerStatistics.create = function create(properties) {
                return new PlayerStatistics(properties);
            };

            /**
             * Encodes the specified PlayerStatistics message. Does not implicitly {@link game.leagueoflegends.PlayerStatistics.verify|verify} messages.
             * @param {game.leagueoflegends.PlayerStatistics$Properties} message PlayerStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerStatistics.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.kills != null && message.hasOwnProperty("kills"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.kills);
                if (message.deaths != null && message.hasOwnProperty("deaths"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.deaths);
                if (message.assists != null && message.hasOwnProperty("assists"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.assists);
                if (message.championLevel != null && message.hasOwnProperty("championLevel"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.championLevel);
                if (message.magicDamages && message.hasOwnProperty("magicDamages"))
                    $root.game.leagueoflegends.DamageStatistic.encode(message.magicDamages, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.physicalDamages && message.hasOwnProperty("physicalDamages"))
                    $root.game.leagueoflegends.DamageStatistic.encode(message.physicalDamages, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.trueDamages && message.hasOwnProperty("trueDamages"))
                    $root.game.leagueoflegends.DamageStatistic.encode(message.trueDamages, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.totalDamages && message.hasOwnProperty("totalDamages"))
                    $root.game.leagueoflegends.DamageStatistic.encode(message.totalDamages, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.totalHeal != null && message.hasOwnProperty("totalHeal"))
                    writer.uint32(/* id 9, wireType 0 =*/72).int32(message.totalHeal);
                if (message.largestCriticalStrike != null && message.hasOwnProperty("largestCriticalStrike"))
                    writer.uint32(/* id 10, wireType 0 =*/80).int32(message.largestCriticalStrike);
                if (message.goldEarned != null && message.hasOwnProperty("goldEarned"))
                    writer.uint32(/* id 11, wireType 0 =*/88).int32(message.goldEarned);
                if (message.goldSpent != null && message.hasOwnProperty("goldSpent"))
                    writer.uint32(/* id 12, wireType 0 =*/96).int32(message.goldSpent);
                if (message.minionsKilled != null && message.hasOwnProperty("minionsKilled"))
                    writer.uint32(/* id 13, wireType 0 =*/104).int32(message.minionsKilled);
                if (message.neutralMinionsKilled != null && message.hasOwnProperty("neutralMinionsKilled"))
                    writer.uint32(/* id 14, wireType 0 =*/112).int32(message.neutralMinionsKilled);
                if (message.neutralMinionsKilledEnnemyJungle != null && message.hasOwnProperty("neutralMinionsKilledEnnemyJungle"))
                    writer.uint32(/* id 15, wireType 0 =*/120).int32(message.neutralMinionsKilledEnnemyJungle);
                if (message.neutralMinionsKilledTeamJungle != null && message.hasOwnProperty("neutralMinionsKilledTeamJungle"))
                    writer.uint32(/* id 16, wireType 0 =*/128).int32(message.neutralMinionsKilledTeamJungle);
                if (message.sightWardsBought != null && message.hasOwnProperty("sightWardsBought"))
                    writer.uint32(/* id 17, wireType 0 =*/136).int32(message.sightWardsBought);
                if (message.visionWardsBought != null && message.hasOwnProperty("visionWardsBought"))
                    writer.uint32(/* id 18, wireType 0 =*/144).int32(message.visionWardsBought);
                if (message.wardsPlaced != null && message.hasOwnProperty("wardsPlaced"))
                    writer.uint32(/* id 19, wireType 0 =*/152).int32(message.wardsPlaced);
                if (message.wardsKilled != null && message.hasOwnProperty("wardsKilled"))
                    writer.uint32(/* id 20, wireType 0 =*/160).int32(message.wardsKilled);
                if (message.doubleKills != null && message.hasOwnProperty("doubleKills"))
                    writer.uint32(/* id 21, wireType 0 =*/168).int32(message.doubleKills);
                if (message.tripleKills != null && message.hasOwnProperty("tripleKills"))
                    writer.uint32(/* id 22, wireType 0 =*/176).int32(message.tripleKills);
                if (message.quadraKills != null && message.hasOwnProperty("quadraKills"))
                    writer.uint32(/* id 23, wireType 0 =*/184).int32(message.quadraKills);
                if (message.pentaKills != null && message.hasOwnProperty("pentaKills"))
                    writer.uint32(/* id 24, wireType 0 =*/192).int32(message.pentaKills);
                if (message.killingSprees != null && message.hasOwnProperty("killingSprees"))
                    writer.uint32(/* id 26, wireType 0 =*/208).int32(message.killingSprees);
                if (message.largestKillingSpree != null && message.hasOwnProperty("largestKillingSpree"))
                    writer.uint32(/* id 27, wireType 0 =*/216).int32(message.largestKillingSpree);
                if (message.largestMultiKill != null && message.hasOwnProperty("largestMultiKill"))
                    writer.uint32(/* id 28, wireType 0 =*/224).int32(message.largestMultiKill);
                if (message.inhibitorKills != null && message.hasOwnProperty("inhibitorKills"))
                    writer.uint32(/* id 29, wireType 0 =*/232).int32(message.inhibitorKills);
                if (message.towerKills != null && message.hasOwnProperty("towerKills"))
                    writer.uint32(/* id 30, wireType 0 =*/240).int32(message.towerKills);
                if (message.firstBloodAssist != null && message.hasOwnProperty("firstBloodAssist"))
                    writer.uint32(/* id 31, wireType 0 =*/248).bool(message.firstBloodAssist);
                if (message.firstBloodKill != null && message.hasOwnProperty("firstBloodKill"))
                    writer.uint32(/* id 32, wireType 0 =*/256).bool(message.firstBloodKill);
                if (message.firstInhibitorKill != null && message.hasOwnProperty("firstInhibitorKill"))
                    writer.uint32(/* id 33, wireType 0 =*/264).bool(message.firstInhibitorKill);
                if (message.firstTowerAssist != null && message.hasOwnProperty("firstTowerAssist"))
                    writer.uint32(/* id 34, wireType 0 =*/272).bool(message.firstTowerAssist);
                if (message.firstTowerKill != null && message.hasOwnProperty("firstTowerKill"))
                    writer.uint32(/* id 35, wireType 0 =*/280).bool(message.firstTowerKill);
                if (message.totalCrowdControl != null && message.hasOwnProperty("totalCrowdControl"))
                    writer.uint32(/* id 36, wireType 0 =*/288).int32(message.totalCrowdControl);
                if (message.totalUnitsHealed != null && message.hasOwnProperty("totalUnitsHealed"))
                    writer.uint32(/* id 37, wireType 0 =*/296).int32(message.totalUnitsHealed);
                return writer;
            };

            /**
             * Encodes the specified PlayerStatistics message, length delimited. Does not implicitly {@link game.leagueoflegends.PlayerStatistics.verify|verify} messages.
             * @param {game.leagueoflegends.PlayerStatistics$Properties} message PlayerStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            PlayerStatistics.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a PlayerStatistics message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerStatistics.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.PlayerStatistics();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.kills = reader.int32();
                        break;
                    case 2:
                        message.deaths = reader.int32();
                        break;
                    case 3:
                        message.assists = reader.int32();
                        break;
                    case 4:
                        message.championLevel = reader.int32();
                        break;
                    case 5:
                        message.magicDamages = $root.game.leagueoflegends.DamageStatistic.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.physicalDamages = $root.game.leagueoflegends.DamageStatistic.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.trueDamages = $root.game.leagueoflegends.DamageStatistic.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.totalDamages = $root.game.leagueoflegends.DamageStatistic.decode(reader, reader.uint32());
                        break;
                    case 9:
                        message.totalHeal = reader.int32();
                        break;
                    case 10:
                        message.largestCriticalStrike = reader.int32();
                        break;
                    case 11:
                        message.goldEarned = reader.int32();
                        break;
                    case 12:
                        message.goldSpent = reader.int32();
                        break;
                    case 13:
                        message.minionsKilled = reader.int32();
                        break;
                    case 14:
                        message.neutralMinionsKilled = reader.int32();
                        break;
                    case 15:
                        message.neutralMinionsKilledEnnemyJungle = reader.int32();
                        break;
                    case 16:
                        message.neutralMinionsKilledTeamJungle = reader.int32();
                        break;
                    case 17:
                        message.sightWardsBought = reader.int32();
                        break;
                    case 18:
                        message.visionWardsBought = reader.int32();
                        break;
                    case 19:
                        message.wardsPlaced = reader.int32();
                        break;
                    case 20:
                        message.wardsKilled = reader.int32();
                        break;
                    case 21:
                        message.doubleKills = reader.int32();
                        break;
                    case 22:
                        message.tripleKills = reader.int32();
                        break;
                    case 23:
                        message.quadraKills = reader.int32();
                        break;
                    case 24:
                        message.pentaKills = reader.int32();
                        break;
                    case 26:
                        message.killingSprees = reader.int32();
                        break;
                    case 27:
                        message.largestKillingSpree = reader.int32();
                        break;
                    case 28:
                        message.largestMultiKill = reader.int32();
                        break;
                    case 29:
                        message.inhibitorKills = reader.int32();
                        break;
                    case 30:
                        message.towerKills = reader.int32();
                        break;
                    case 31:
                        message.firstBloodAssist = reader.bool();
                        break;
                    case 32:
                        message.firstBloodKill = reader.bool();
                        break;
                    case 33:
                        message.firstInhibitorKill = reader.bool();
                        break;
                    case 34:
                        message.firstTowerAssist = reader.bool();
                        break;
                    case 35:
                        message.firstTowerKill = reader.bool();
                        break;
                    case 36:
                        message.totalCrowdControl = reader.int32();
                        break;
                    case 37:
                        message.totalUnitsHealed = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a PlayerStatistics message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            PlayerStatistics.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a PlayerStatistics message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            PlayerStatistics.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.kills != null)
                    if (!$util.isInteger(message.kills))
                        return "kills: integer expected";
                if (message.deaths != null)
                    if (!$util.isInteger(message.deaths))
                        return "deaths: integer expected";
                if (message.assists != null)
                    if (!$util.isInteger(message.assists))
                        return "assists: integer expected";
                if (message.championLevel != null)
                    if (!$util.isInteger(message.championLevel))
                        return "championLevel: integer expected";
                if (message.magicDamages != null) {
                    var error = $root.game.leagueoflegends.DamageStatistic.verify(message.magicDamages);
                    if (error)
                        return "magicDamages." + error;
                }
                if (message.physicalDamages != null) {
                    var error = $root.game.leagueoflegends.DamageStatistic.verify(message.physicalDamages);
                    if (error)
                        return "physicalDamages." + error;
                }
                if (message.trueDamages != null) {
                    var error = $root.game.leagueoflegends.DamageStatistic.verify(message.trueDamages);
                    if (error)
                        return "trueDamages." + error;
                }
                if (message.totalDamages != null) {
                    var error = $root.game.leagueoflegends.DamageStatistic.verify(message.totalDamages);
                    if (error)
                        return "totalDamages." + error;
                }
                if (message.totalHeal != null)
                    if (!$util.isInteger(message.totalHeal))
                        return "totalHeal: integer expected";
                if (message.largestCriticalStrike != null)
                    if (!$util.isInteger(message.largestCriticalStrike))
                        return "largestCriticalStrike: integer expected";
                if (message.goldEarned != null)
                    if (!$util.isInteger(message.goldEarned))
                        return "goldEarned: integer expected";
                if (message.goldSpent != null)
                    if (!$util.isInteger(message.goldSpent))
                        return "goldSpent: integer expected";
                if (message.minionsKilled != null)
                    if (!$util.isInteger(message.minionsKilled))
                        return "minionsKilled: integer expected";
                if (message.neutralMinionsKilled != null)
                    if (!$util.isInteger(message.neutralMinionsKilled))
                        return "neutralMinionsKilled: integer expected";
                if (message.neutralMinionsKilledEnnemyJungle != null)
                    if (!$util.isInteger(message.neutralMinionsKilledEnnemyJungle))
                        return "neutralMinionsKilledEnnemyJungle: integer expected";
                if (message.neutralMinionsKilledTeamJungle != null)
                    if (!$util.isInteger(message.neutralMinionsKilledTeamJungle))
                        return "neutralMinionsKilledTeamJungle: integer expected";
                if (message.sightWardsBought != null)
                    if (!$util.isInteger(message.sightWardsBought))
                        return "sightWardsBought: integer expected";
                if (message.visionWardsBought != null)
                    if (!$util.isInteger(message.visionWardsBought))
                        return "visionWardsBought: integer expected";
                if (message.wardsPlaced != null)
                    if (!$util.isInteger(message.wardsPlaced))
                        return "wardsPlaced: integer expected";
                if (message.wardsKilled != null)
                    if (!$util.isInteger(message.wardsKilled))
                        return "wardsKilled: integer expected";
                if (message.doubleKills != null)
                    if (!$util.isInteger(message.doubleKills))
                        return "doubleKills: integer expected";
                if (message.tripleKills != null)
                    if (!$util.isInteger(message.tripleKills))
                        return "tripleKills: integer expected";
                if (message.quadraKills != null)
                    if (!$util.isInteger(message.quadraKills))
                        return "quadraKills: integer expected";
                if (message.pentaKills != null)
                    if (!$util.isInteger(message.pentaKills))
                        return "pentaKills: integer expected";
                if (message.killingSprees != null)
                    if (!$util.isInteger(message.killingSprees))
                        return "killingSprees: integer expected";
                if (message.largestKillingSpree != null)
                    if (!$util.isInteger(message.largestKillingSpree))
                        return "largestKillingSpree: integer expected";
                if (message.largestMultiKill != null)
                    if (!$util.isInteger(message.largestMultiKill))
                        return "largestMultiKill: integer expected";
                if (message.inhibitorKills != null)
                    if (!$util.isInteger(message.inhibitorKills))
                        return "inhibitorKills: integer expected";
                if (message.towerKills != null)
                    if (!$util.isInteger(message.towerKills))
                        return "towerKills: integer expected";
                if (message.firstBloodAssist != null)
                    if (typeof message.firstBloodAssist !== "boolean")
                        return "firstBloodAssist: boolean expected";
                if (message.firstBloodKill != null)
                    if (typeof message.firstBloodKill !== "boolean")
                        return "firstBloodKill: boolean expected";
                if (message.firstInhibitorKill != null)
                    if (typeof message.firstInhibitorKill !== "boolean")
                        return "firstInhibitorKill: boolean expected";
                if (message.firstTowerAssist != null)
                    if (typeof message.firstTowerAssist !== "boolean")
                        return "firstTowerAssist: boolean expected";
                if (message.firstTowerKill != null)
                    if (typeof message.firstTowerKill !== "boolean")
                        return "firstTowerKill: boolean expected";
                if (message.totalCrowdControl != null)
                    if (!$util.isInteger(message.totalCrowdControl))
                        return "totalCrowdControl: integer expected";
                if (message.totalUnitsHealed != null)
                    if (!$util.isInteger(message.totalUnitsHealed))
                        return "totalUnitsHealed: integer expected";
                return null;
            };

            /**
             * Creates a PlayerStatistics message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             */
            PlayerStatistics.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.PlayerStatistics)
                    return object;
                var message = new $root.game.leagueoflegends.PlayerStatistics();
                if (object.kills != null)
                    message.kills = object.kills | 0;
                if (object.deaths != null)
                    message.deaths = object.deaths | 0;
                if (object.assists != null)
                    message.assists = object.assists | 0;
                if (object.championLevel != null)
                    message.championLevel = object.championLevel | 0;
                if (object.magicDamages != null) {
                    if (typeof object.magicDamages !== "object")
                        throw TypeError(".game.leagueoflegends.PlayerStatistics.magicDamages: object expected");
                    message.magicDamages = $root.game.leagueoflegends.DamageStatistic.fromObject(object.magicDamages);
                }
                if (object.physicalDamages != null) {
                    if (typeof object.physicalDamages !== "object")
                        throw TypeError(".game.leagueoflegends.PlayerStatistics.physicalDamages: object expected");
                    message.physicalDamages = $root.game.leagueoflegends.DamageStatistic.fromObject(object.physicalDamages);
                }
                if (object.trueDamages != null) {
                    if (typeof object.trueDamages !== "object")
                        throw TypeError(".game.leagueoflegends.PlayerStatistics.trueDamages: object expected");
                    message.trueDamages = $root.game.leagueoflegends.DamageStatistic.fromObject(object.trueDamages);
                }
                if (object.totalDamages != null) {
                    if (typeof object.totalDamages !== "object")
                        throw TypeError(".game.leagueoflegends.PlayerStatistics.totalDamages: object expected");
                    message.totalDamages = $root.game.leagueoflegends.DamageStatistic.fromObject(object.totalDamages);
                }
                if (object.totalHeal != null)
                    message.totalHeal = object.totalHeal | 0;
                if (object.largestCriticalStrike != null)
                    message.largestCriticalStrike = object.largestCriticalStrike | 0;
                if (object.goldEarned != null)
                    message.goldEarned = object.goldEarned | 0;
                if (object.goldSpent != null)
                    message.goldSpent = object.goldSpent | 0;
                if (object.minionsKilled != null)
                    message.minionsKilled = object.minionsKilled | 0;
                if (object.neutralMinionsKilled != null)
                    message.neutralMinionsKilled = object.neutralMinionsKilled | 0;
                if (object.neutralMinionsKilledEnnemyJungle != null)
                    message.neutralMinionsKilledEnnemyJungle = object.neutralMinionsKilledEnnemyJungle | 0;
                if (object.neutralMinionsKilledTeamJungle != null)
                    message.neutralMinionsKilledTeamJungle = object.neutralMinionsKilledTeamJungle | 0;
                if (object.sightWardsBought != null)
                    message.sightWardsBought = object.sightWardsBought | 0;
                if (object.visionWardsBought != null)
                    message.visionWardsBought = object.visionWardsBought | 0;
                if (object.wardsPlaced != null)
                    message.wardsPlaced = object.wardsPlaced | 0;
                if (object.wardsKilled != null)
                    message.wardsKilled = object.wardsKilled | 0;
                if (object.doubleKills != null)
                    message.doubleKills = object.doubleKills | 0;
                if (object.tripleKills != null)
                    message.tripleKills = object.tripleKills | 0;
                if (object.quadraKills != null)
                    message.quadraKills = object.quadraKills | 0;
                if (object.pentaKills != null)
                    message.pentaKills = object.pentaKills | 0;
                if (object.killingSprees != null)
                    message.killingSprees = object.killingSprees | 0;
                if (object.largestKillingSpree != null)
                    message.largestKillingSpree = object.largestKillingSpree | 0;
                if (object.largestMultiKill != null)
                    message.largestMultiKill = object.largestMultiKill | 0;
                if (object.inhibitorKills != null)
                    message.inhibitorKills = object.inhibitorKills | 0;
                if (object.towerKills != null)
                    message.towerKills = object.towerKills | 0;
                if (object.firstBloodAssist != null)
                    message.firstBloodAssist = Boolean(object.firstBloodAssist);
                if (object.firstBloodKill != null)
                    message.firstBloodKill = Boolean(object.firstBloodKill);
                if (object.firstInhibitorKill != null)
                    message.firstInhibitorKill = Boolean(object.firstInhibitorKill);
                if (object.firstTowerAssist != null)
                    message.firstTowerAssist = Boolean(object.firstTowerAssist);
                if (object.firstTowerKill != null)
                    message.firstTowerKill = Boolean(object.firstTowerKill);
                if (object.totalCrowdControl != null)
                    message.totalCrowdControl = object.totalCrowdControl | 0;
                if (object.totalUnitsHealed != null)
                    message.totalUnitsHealed = object.totalUnitsHealed | 0;
                return message;
            };

            /**
             * Creates a PlayerStatistics message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.PlayerStatistics.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             */
            PlayerStatistics.from = PlayerStatistics.fromObject;

            /**
             * Creates a plain object from a PlayerStatistics message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.PlayerStatistics} message PlayerStatistics
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlayerStatistics.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.kills = 0;
                    object.deaths = 0;
                    object.assists = 0;
                    object.championLevel = 0;
                    object.magicDamages = null;
                    object.physicalDamages = null;
                    object.trueDamages = null;
                    object.totalDamages = null;
                    object.totalHeal = 0;
                    object.largestCriticalStrike = 0;
                    object.goldEarned = 0;
                    object.goldSpent = 0;
                    object.minionsKilled = 0;
                    object.neutralMinionsKilled = 0;
                    object.neutralMinionsKilledEnnemyJungle = 0;
                    object.neutralMinionsKilledTeamJungle = 0;
                    object.sightWardsBought = 0;
                    object.visionWardsBought = 0;
                    object.wardsPlaced = 0;
                    object.wardsKilled = 0;
                    object.doubleKills = 0;
                    object.tripleKills = 0;
                    object.quadraKills = 0;
                    object.pentaKills = 0;
                    object.killingSprees = 0;
                    object.largestKillingSpree = 0;
                    object.largestMultiKill = 0;
                    object.inhibitorKills = 0;
                    object.towerKills = 0;
                    object.firstBloodAssist = false;
                    object.firstBloodKill = false;
                    object.firstInhibitorKill = false;
                    object.firstTowerAssist = false;
                    object.firstTowerKill = false;
                    object.totalCrowdControl = 0;
                    object.totalUnitsHealed = 0;
                }
                if (message.kills != null && message.hasOwnProperty("kills"))
                    object.kills = message.kills;
                if (message.deaths != null && message.hasOwnProperty("deaths"))
                    object.deaths = message.deaths;
                if (message.assists != null && message.hasOwnProperty("assists"))
                    object.assists = message.assists;
                if (message.championLevel != null && message.hasOwnProperty("championLevel"))
                    object.championLevel = message.championLevel;
                if (message.magicDamages != null && message.hasOwnProperty("magicDamages"))
                    object.magicDamages = $root.game.leagueoflegends.DamageStatistic.toObject(message.magicDamages, options);
                if (message.physicalDamages != null && message.hasOwnProperty("physicalDamages"))
                    object.physicalDamages = $root.game.leagueoflegends.DamageStatistic.toObject(message.physicalDamages, options);
                if (message.trueDamages != null && message.hasOwnProperty("trueDamages"))
                    object.trueDamages = $root.game.leagueoflegends.DamageStatistic.toObject(message.trueDamages, options);
                if (message.totalDamages != null && message.hasOwnProperty("totalDamages"))
                    object.totalDamages = $root.game.leagueoflegends.DamageStatistic.toObject(message.totalDamages, options);
                if (message.totalHeal != null && message.hasOwnProperty("totalHeal"))
                    object.totalHeal = message.totalHeal;
                if (message.largestCriticalStrike != null && message.hasOwnProperty("largestCriticalStrike"))
                    object.largestCriticalStrike = message.largestCriticalStrike;
                if (message.goldEarned != null && message.hasOwnProperty("goldEarned"))
                    object.goldEarned = message.goldEarned;
                if (message.goldSpent != null && message.hasOwnProperty("goldSpent"))
                    object.goldSpent = message.goldSpent;
                if (message.minionsKilled != null && message.hasOwnProperty("minionsKilled"))
                    object.minionsKilled = message.minionsKilled;
                if (message.neutralMinionsKilled != null && message.hasOwnProperty("neutralMinionsKilled"))
                    object.neutralMinionsKilled = message.neutralMinionsKilled;
                if (message.neutralMinionsKilledEnnemyJungle != null && message.hasOwnProperty("neutralMinionsKilledEnnemyJungle"))
                    object.neutralMinionsKilledEnnemyJungle = message.neutralMinionsKilledEnnemyJungle;
                if (message.neutralMinionsKilledTeamJungle != null && message.hasOwnProperty("neutralMinionsKilledTeamJungle"))
                    object.neutralMinionsKilledTeamJungle = message.neutralMinionsKilledTeamJungle;
                if (message.sightWardsBought != null && message.hasOwnProperty("sightWardsBought"))
                    object.sightWardsBought = message.sightWardsBought;
                if (message.visionWardsBought != null && message.hasOwnProperty("visionWardsBought"))
                    object.visionWardsBought = message.visionWardsBought;
                if (message.wardsPlaced != null && message.hasOwnProperty("wardsPlaced"))
                    object.wardsPlaced = message.wardsPlaced;
                if (message.wardsKilled != null && message.hasOwnProperty("wardsKilled"))
                    object.wardsKilled = message.wardsKilled;
                if (message.doubleKills != null && message.hasOwnProperty("doubleKills"))
                    object.doubleKills = message.doubleKills;
                if (message.tripleKills != null && message.hasOwnProperty("tripleKills"))
                    object.tripleKills = message.tripleKills;
                if (message.quadraKills != null && message.hasOwnProperty("quadraKills"))
                    object.quadraKills = message.quadraKills;
                if (message.pentaKills != null && message.hasOwnProperty("pentaKills"))
                    object.pentaKills = message.pentaKills;
                if (message.killingSprees != null && message.hasOwnProperty("killingSprees"))
                    object.killingSprees = message.killingSprees;
                if (message.largestKillingSpree != null && message.hasOwnProperty("largestKillingSpree"))
                    object.largestKillingSpree = message.largestKillingSpree;
                if (message.largestMultiKill != null && message.hasOwnProperty("largestMultiKill"))
                    object.largestMultiKill = message.largestMultiKill;
                if (message.inhibitorKills != null && message.hasOwnProperty("inhibitorKills"))
                    object.inhibitorKills = message.inhibitorKills;
                if (message.towerKills != null && message.hasOwnProperty("towerKills"))
                    object.towerKills = message.towerKills;
                if (message.firstBloodAssist != null && message.hasOwnProperty("firstBloodAssist"))
                    object.firstBloodAssist = message.firstBloodAssist;
                if (message.firstBloodKill != null && message.hasOwnProperty("firstBloodKill"))
                    object.firstBloodKill = message.firstBloodKill;
                if (message.firstInhibitorKill != null && message.hasOwnProperty("firstInhibitorKill"))
                    object.firstInhibitorKill = message.firstInhibitorKill;
                if (message.firstTowerAssist != null && message.hasOwnProperty("firstTowerAssist"))
                    object.firstTowerAssist = message.firstTowerAssist;
                if (message.firstTowerKill != null && message.hasOwnProperty("firstTowerKill"))
                    object.firstTowerKill = message.firstTowerKill;
                if (message.totalCrowdControl != null && message.hasOwnProperty("totalCrowdControl"))
                    object.totalCrowdControl = message.totalCrowdControl;
                if (message.totalUnitsHealed != null && message.hasOwnProperty("totalUnitsHealed"))
                    object.totalUnitsHealed = message.totalUnitsHealed;
                return object;
            };

            /**
             * Creates a plain object from this PlayerStatistics message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            PlayerStatistics.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this PlayerStatistics to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            PlayerStatistics.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return PlayerStatistics;
        })();

        leagueoflegends.DamageStatistic = (function() {

            /**
             * Properties of a DamageStatistic.
             * @typedef game.leagueoflegends.DamageStatistic$Properties
             * @type {Object}
             * @property {number} [total] DamageStatistic total.
             * @property {number} [toChampions] DamageStatistic toChampions.
             * @property {number} [taken] DamageStatistic taken.
             */

            /**
             * Constructs a new DamageStatistic.
             * @exports game.leagueoflegends.DamageStatistic
             * @constructor
             * @param {game.leagueoflegends.DamageStatistic$Properties=} [properties] Properties to set
             */
            function DamageStatistic(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        this[keys[i]] = properties[keys[i]];
            }

            /**
             * DamageStatistic total.
             * @type {number|undefined}
             */
            DamageStatistic.prototype.total = 0;

            /**
             * DamageStatistic toChampions.
             * @type {number|undefined}
             */
            DamageStatistic.prototype.toChampions = 0;

            /**
             * DamageStatistic taken.
             * @type {number|undefined}
             */
            DamageStatistic.prototype.taken = 0;

            /**
             * Creates a new DamageStatistic instance using the specified properties.
             * @param {game.leagueoflegends.DamageStatistic$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic instance
             */
            DamageStatistic.create = function create(properties) {
                return new DamageStatistic(properties);
            };

            /**
             * Encodes the specified DamageStatistic message. Does not implicitly {@link game.leagueoflegends.DamageStatistic.verify|verify} messages.
             * @param {game.leagueoflegends.DamageStatistic$Properties} message DamageStatistic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamageStatistic.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.total != null && message.hasOwnProperty("total"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.total);
                if (message.toChampions != null && message.hasOwnProperty("toChampions"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.toChampions);
                if (message.taken != null && message.hasOwnProperty("taken"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int32(message.taken);
                return writer;
            };

            /**
             * Encodes the specified DamageStatistic message, length delimited. Does not implicitly {@link game.leagueoflegends.DamageStatistic.verify|verify} messages.
             * @param {game.leagueoflegends.DamageStatistic$Properties} message DamageStatistic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DamageStatistic.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DamageStatistic message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamageStatistic.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.game.leagueoflegends.DamageStatistic();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.total = reader.int32();
                        break;
                    case 2:
                        message.toChampions = reader.int32();
                        break;
                    case 3:
                        message.taken = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DamageStatistic message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DamageStatistic.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DamageStatistic message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            DamageStatistic.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.total != null)
                    if (!$util.isInteger(message.total))
                        return "total: integer expected";
                if (message.toChampions != null)
                    if (!$util.isInteger(message.toChampions))
                        return "toChampions: integer expected";
                if (message.taken != null)
                    if (!$util.isInteger(message.taken))
                        return "taken: integer expected";
                return null;
            };

            /**
             * Creates a DamageStatistic message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             */
            DamageStatistic.fromObject = function fromObject(object) {
                if (object instanceof $root.game.leagueoflegends.DamageStatistic)
                    return object;
                var message = new $root.game.leagueoflegends.DamageStatistic();
                if (object.total != null)
                    message.total = object.total | 0;
                if (object.toChampions != null)
                    message.toChampions = object.toChampions | 0;
                if (object.taken != null)
                    message.taken = object.taken | 0;
                return message;
            };

            /**
             * Creates a DamageStatistic message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.DamageStatistic.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             */
            DamageStatistic.from = DamageStatistic.fromObject;

            /**
             * Creates a plain object from a DamageStatistic message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.DamageStatistic} message DamageStatistic
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DamageStatistic.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.total = 0;
                    object.toChampions = 0;
                    object.taken = 0;
                }
                if (message.total != null && message.hasOwnProperty("total"))
                    object.total = message.total;
                if (message.toChampions != null && message.hasOwnProperty("toChampions"))
                    object.toChampions = message.toChampions;
                if (message.taken != null && message.hasOwnProperty("taken"))
                    object.taken = message.taken;
                return object;
            };

            /**
             * Creates a plain object from this DamageStatistic message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DamageStatistic.prototype.toObject = function toObject(options) {
                return this.constructor.toObject(this, options);
            };

            /**
             * Converts this DamageStatistic to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            DamageStatistic.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DamageStatistic;
        })();

        return leagueoflegends;
    })();

    return game;
})();

module.exports = $root;

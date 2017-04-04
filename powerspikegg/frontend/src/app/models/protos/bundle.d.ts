/* tslint:disable */
import * as $protobuf from "protobufjs";

/**
 * Namespace game.
 * @exports game
 * @namespace
 */
export namespace game {

    /**
     * Namespace leagueoflegends.
     * @exports game.leagueoflegends
     * @namespace
     */
    namespace leagueoflegends {

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
        enum Region {
            BR = 0,
            EUNE = 1,
            EUW = 2,
            KR = 3,
            LAN = 4,
            LAS = 5,
            NA = 6,
            OCE = 7,
            RU = 8,
            TR = 9
        }

        /**
         * Map enum.
         * @name Map
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} SUMMONER_RIFT=0 SUMMONER_RIFT value
         */
        enum Map {
            SUMMONER_RIFT = 0
        }

        /**
         * QueueType enum.
         * @name QueueType
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} TEAM_BUILDER_RANKED_SOLO=0 TEAM_BUILDER_RANKED_SOLO value
         */
        enum QueueType {
            TEAM_BUILDER_RANKED_SOLO = 0
        }

        /**
         * Season enum.
         * @name Season
         * @memberof game.leagueoflegends
         * @enum {number}
         * @property {number} SEASON2017=0 SEASON2017 value
         * @property {number} PRESEASON2017=1 PRESEASON2017 value
         * @property {number} SEASON2016=2 SEASON2016 value
         */
        enum Season {
            SEASON2017 = 0,
            PRESEASON2017 = 1,
            SEASON2016 = 2
        }

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
        enum League {
            UNRANKED = 0,
            BRONZE = 1,
            SILVER = 2,
            GOLD = 3,
            PLATINUM = 4,
            DIAMOND = 5,
            MASTER = 6,
            CHALLENGER = 7
        }

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
        enum Role {
            UNDEFINED = 0,
            TOP = 1,
            JUNGLE = 2,
            MIDDLE = 3,
            ADCARRY = 4,
            SUPPORT = 5
        }

        type Summoner$Properties = {
            id?: number;
            name?: string;
            region?: game.leagueoflegends.Region;
            league?: game.leagueoflegends.League;
        };

        /**
         * Constructs a new Summoner.
         * @exports game.leagueoflegends.Summoner
         * @constructor
         * @param {game.leagueoflegends.Summoner$Properties=} [properties] Properties to set
         */
        class Summoner {

            /**
             * Constructs a new Summoner.
             * @exports game.leagueoflegends.Summoner
             * @constructor
             * @param {game.leagueoflegends.Summoner$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.Summoner$Properties);

            /**
             * Summoner id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * Summoner name.
             * @type {string|undefined}
             */
            public name?: string;

            /**
             * Summoner region.
             * @type {game.leagueoflegends.Region|undefined}
             */
            public region?: game.leagueoflegends.Region;

            /**
             * Summoner league.
             * @type {game.leagueoflegends.League|undefined}
             */
            public league?: game.leagueoflegends.League;

            /**
             * Creates a new Summoner instance using the specified properties.
             * @param {game.leagueoflegends.Summoner$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Summoner} Summoner instance
             */
            public static create(properties?: game.leagueoflegends.Summoner$Properties): game.leagueoflegends.Summoner;

            /**
             * Encodes the specified Summoner message. Does not implicitly {@link game.leagueoflegends.Summoner.verify|verify} messages.
             * @param {game.leagueoflegends.Summoner$Properties} message Summoner message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.Summoner$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Summoner message, length delimited. Does not implicitly {@link game.leagueoflegends.Summoner.verify|verify} messages.
             * @param {game.leagueoflegends.Summoner$Properties} message Summoner message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.Summoner$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Summoner message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Summoner} Summoner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.Summoner;

            /**
             * Decodes a Summoner message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Summoner} Summoner
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.Summoner;

            /**
             * Verifies a Summoner message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a Summoner message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Summoner} Summoner
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.Summoner;

            /**
             * Creates a Summoner message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Summoner.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Summoner} Summoner
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.Summoner;

            /**
             * Creates a plain object from a Summoner message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Summoner} message Summoner
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.Summoner, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this Summoner message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this Summoner to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type SummonerSpell$Properties = {
            id?: number;
            name?: string;
        };

        /**
         * Constructs a new SummonerSpell.
         * @exports game.leagueoflegends.SummonerSpell
         * @constructor
         * @param {game.leagueoflegends.SummonerSpell$Properties=} [properties] Properties to set
         */
        class SummonerSpell {

            /**
             * Constructs a new SummonerSpell.
             * @exports game.leagueoflegends.SummonerSpell
             * @constructor
             * @param {game.leagueoflegends.SummonerSpell$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.SummonerSpell$Properties);

            /**
             * SummonerSpell id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * SummonerSpell name.
             * @type {string|undefined}
             */
            public name?: string;

            /**
             * Creates a new SummonerSpell instance using the specified properties.
             * @param {game.leagueoflegends.SummonerSpell$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell instance
             */
            public static create(properties?: game.leagueoflegends.SummonerSpell$Properties): game.leagueoflegends.SummonerSpell;

            /**
             * Encodes the specified SummonerSpell message. Does not implicitly {@link game.leagueoflegends.SummonerSpell.verify|verify} messages.
             * @param {game.leagueoflegends.SummonerSpell$Properties} message SummonerSpell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.SummonerSpell$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SummonerSpell message, length delimited. Does not implicitly {@link game.leagueoflegends.SummonerSpell.verify|verify} messages.
             * @param {game.leagueoflegends.SummonerSpell$Properties} message SummonerSpell message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.SummonerSpell$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SummonerSpell message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.SummonerSpell;

            /**
             * Decodes a SummonerSpell message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.SummonerSpell;

            /**
             * Verifies a SummonerSpell message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a SummonerSpell message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.SummonerSpell;

            /**
             * Creates a SummonerSpell message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.SummonerSpell.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.SummonerSpell} SummonerSpell
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.SummonerSpell;

            /**
             * Creates a plain object from a SummonerSpell message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.SummonerSpell} message SummonerSpell
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.SummonerSpell, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this SummonerSpell message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this SummonerSpell to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type Item$Properties = {
            id?: number;
            name?: string;
        };

        /**
         * Constructs a new Item.
         * @exports game.leagueoflegends.Item
         * @constructor
         * @param {game.leagueoflegends.Item$Properties=} [properties] Properties to set
         */
        class Item {

            /**
             * Constructs a new Item.
             * @exports game.leagueoflegends.Item
             * @constructor
             * @param {game.leagueoflegends.Item$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.Item$Properties);

            /**
             * Item id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * Item name.
             * @type {string|undefined}
             */
            public name?: string;

            /**
             * Creates a new Item instance using the specified properties.
             * @param {game.leagueoflegends.Item$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Item} Item instance
             */
            public static create(properties?: game.leagueoflegends.Item$Properties): game.leagueoflegends.Item;

            /**
             * Encodes the specified Item message. Does not implicitly {@link game.leagueoflegends.Item.verify|verify} messages.
             * @param {game.leagueoflegends.Item$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.Item$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Item message, length delimited. Does not implicitly {@link game.leagueoflegends.Item.verify|verify} messages.
             * @param {game.leagueoflegends.Item$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.Item$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Item message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Item} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.Item;

            /**
             * Decodes an Item message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Item} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.Item;

            /**
             * Verifies an Item message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Item} Item
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.Item;

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Item.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Item} Item
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.Item;

            /**
             * Creates a plain object from an Item message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Item} message Item
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.Item, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this Item message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this Item to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type Champion$Properties = {
            id?: number;
            name?: string;
        };

        /**
         * Constructs a new Champion.
         * @exports game.leagueoflegends.Champion
         * @constructor
         * @param {game.leagueoflegends.Champion$Properties=} [properties] Properties to set
         */
        class Champion {

            /**
             * Constructs a new Champion.
             * @exports game.leagueoflegends.Champion
             * @constructor
             * @param {game.leagueoflegends.Champion$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.Champion$Properties);

            /**
             * Champion id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * Champion name.
             * @type {string|undefined}
             */
            public name?: string;

            /**
             * Creates a new Champion instance using the specified properties.
             * @param {game.leagueoflegends.Champion$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Champion} Champion instance
             */
            public static create(properties?: game.leagueoflegends.Champion$Properties): game.leagueoflegends.Champion;

            /**
             * Encodes the specified Champion message. Does not implicitly {@link game.leagueoflegends.Champion.verify|verify} messages.
             * @param {game.leagueoflegends.Champion$Properties} message Champion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.Champion$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Champion message, length delimited. Does not implicitly {@link game.leagueoflegends.Champion.verify|verify} messages.
             * @param {game.leagueoflegends.Champion$Properties} message Champion message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.Champion$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Champion message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Champion} Champion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.Champion;

            /**
             * Decodes a Champion message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Champion} Champion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.Champion;

            /**
             * Verifies a Champion message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a Champion message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Champion} Champion
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.Champion;

            /**
             * Creates a Champion message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Champion.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Champion} Champion
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.Champion;

            /**
             * Creates a plain object from a Champion message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Champion} message Champion
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.Champion, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this Champion message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this Champion to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type MatchReference$Properties = {
            id?: number;
            timestamp?: number;
            version?: string;
            plateformId?: string;
            region?: game.leagueoflegends.Region;
            queueType?: game.leagueoflegends.QueueType;
            season?: game.leagueoflegends.Season;
            detail?: game.leagueoflegends.MatchDetail$Properties;
        };

        /**
         * Constructs a new MatchReference.
         * @exports game.leagueoflegends.MatchReference
         * @constructor
         * @param {game.leagueoflegends.MatchReference$Properties=} [properties] Properties to set
         */
        class MatchReference {

            /**
             * Constructs a new MatchReference.
             * @exports game.leagueoflegends.MatchReference
             * @constructor
             * @param {game.leagueoflegends.MatchReference$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.MatchReference$Properties);

            /**
             * MatchReference id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * MatchReference timestamp.
             * @type {number|undefined}
             */
            public timestamp?: number;

            /**
             * MatchReference version.
             * @type {string|undefined}
             */
            public version?: string;

            /**
             * MatchReference plateformId.
             * @type {string|undefined}
             */
            public plateformId?: string;

            /**
             * MatchReference region.
             * @type {game.leagueoflegends.Region|undefined}
             */
            public region?: game.leagueoflegends.Region;

            /**
             * MatchReference queueType.
             * @type {game.leagueoflegends.QueueType|undefined}
             */
            public queueType?: game.leagueoflegends.QueueType;

            /**
             * MatchReference season.
             * @type {game.leagueoflegends.Season|undefined}
             */
            public season?: game.leagueoflegends.Season;

            /**
             * MatchReference detail.
             * @type {game.leagueoflegends.MatchDetail$Properties|undefined}
             */
            public detail?: game.leagueoflegends.MatchDetail$Properties;

            /**
             * Creates a new MatchReference instance using the specified properties.
             * @param {game.leagueoflegends.MatchReference$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.MatchReference} MatchReference instance
             */
            public static create(properties?: game.leagueoflegends.MatchReference$Properties): game.leagueoflegends.MatchReference;

            /**
             * Encodes the specified MatchReference message. Does not implicitly {@link game.leagueoflegends.MatchReference.verify|verify} messages.
             * @param {game.leagueoflegends.MatchReference$Properties} message MatchReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.MatchReference$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MatchReference message, length delimited. Does not implicitly {@link game.leagueoflegends.MatchReference.verify|verify} messages.
             * @param {game.leagueoflegends.MatchReference$Properties} message MatchReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.MatchReference$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MatchReference message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.MatchReference;

            /**
             * Decodes a MatchReference message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.MatchReference;

            /**
             * Verifies a MatchReference message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a MatchReference message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.MatchReference;

            /**
             * Creates a MatchReference message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.MatchReference.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchReference} MatchReference
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.MatchReference;

            /**
             * Creates a plain object from a MatchReference message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.MatchReference} message MatchReference
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.MatchReference, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this MatchReference message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this MatchReference to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type MatchDetail$Properties = {
            map?: game.leagueoflegends.Map;
            duration?: number;
            teams?: game.leagueoflegends.TeamDetail$Properties[];
        };

        /**
         * Constructs a new MatchDetail.
         * @exports game.leagueoflegends.MatchDetail
         * @constructor
         * @param {game.leagueoflegends.MatchDetail$Properties=} [properties] Properties to set
         */
        class MatchDetail {

            /**
             * Constructs a new MatchDetail.
             * @exports game.leagueoflegends.MatchDetail
             * @constructor
             * @param {game.leagueoflegends.MatchDetail$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.MatchDetail$Properties);

            /**
             * MatchDetail map.
             * @type {game.leagueoflegends.Map|undefined}
             */
            public map?: game.leagueoflegends.Map;

            /**
             * MatchDetail duration.
             * @type {number|undefined}
             */
            public duration?: number;

            /**
             * MatchDetail teams.
             * @type {Array.<game.leagueoflegends.TeamDetail$Properties>|undefined}
             */
            public teams?: game.leagueoflegends.TeamDetail$Properties[];

            /**
             * Creates a new MatchDetail instance using the specified properties.
             * @param {game.leagueoflegends.MatchDetail$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail instance
             */
            public static create(properties?: game.leagueoflegends.MatchDetail$Properties): game.leagueoflegends.MatchDetail;

            /**
             * Encodes the specified MatchDetail message. Does not implicitly {@link game.leagueoflegends.MatchDetail.verify|verify} messages.
             * @param {game.leagueoflegends.MatchDetail$Properties} message MatchDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.MatchDetail$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MatchDetail message, length delimited. Does not implicitly {@link game.leagueoflegends.MatchDetail.verify|verify} messages.
             * @param {game.leagueoflegends.MatchDetail$Properties} message MatchDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.MatchDetail$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MatchDetail message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.MatchDetail;

            /**
             * Decodes a MatchDetail message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.MatchDetail;

            /**
             * Verifies a MatchDetail message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a MatchDetail message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.MatchDetail;

            /**
             * Creates a MatchDetail message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.MatchDetail.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.MatchDetail} MatchDetail
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.MatchDetail;

            /**
             * Creates a plain object from a MatchDetail message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.MatchDetail} message MatchDetail
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.MatchDetail, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this MatchDetail message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this MatchDetail to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type TeamDetail$Properties = {
            id?: number;
            winner?: boolean;
            bannedChampionIds?: number[];
            baronKills?: number;
            dragonKills?: number;
            towerKills?: number;
            firstBaron?: boolean;
            firstDragon?: boolean;
            firstBlood?: boolean;
            firstTower?: boolean;
            firstInhibitor?: boolean;
            firstRiftHerald?: boolean;
            participants?: game.leagueoflegends.Participant$Properties[];
        };

        /**
         * Constructs a new TeamDetail.
         * @exports game.leagueoflegends.TeamDetail
         * @constructor
         * @param {game.leagueoflegends.TeamDetail$Properties=} [properties] Properties to set
         */
        class TeamDetail {

            /**
             * Constructs a new TeamDetail.
             * @exports game.leagueoflegends.TeamDetail
             * @constructor
             * @param {game.leagueoflegends.TeamDetail$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.TeamDetail$Properties);

            /**
             * TeamDetail id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * TeamDetail winner.
             * @type {boolean|undefined}
             */
            public winner?: boolean;

            /**
             * TeamDetail bannedChampionIds.
             * @type {Array.<number>|undefined}
             */
            public bannedChampionIds?: number[];

            /**
             * TeamDetail baronKills.
             * @type {number|undefined}
             */
            public baronKills?: number;

            /**
             * TeamDetail dragonKills.
             * @type {number|undefined}
             */
            public dragonKills?: number;

            /**
             * TeamDetail towerKills.
             * @type {number|undefined}
             */
            public towerKills?: number;

            /**
             * TeamDetail firstBaron.
             * @type {boolean|undefined}
             */
            public firstBaron?: boolean;

            /**
             * TeamDetail firstDragon.
             * @type {boolean|undefined}
             */
            public firstDragon?: boolean;

            /**
             * TeamDetail firstBlood.
             * @type {boolean|undefined}
             */
            public firstBlood?: boolean;

            /**
             * TeamDetail firstTower.
             * @type {boolean|undefined}
             */
            public firstTower?: boolean;

            /**
             * TeamDetail firstInhibitor.
             * @type {boolean|undefined}
             */
            public firstInhibitor?: boolean;

            /**
             * TeamDetail firstRiftHerald.
             * @type {boolean|undefined}
             */
            public firstRiftHerald?: boolean;

            /**
             * TeamDetail participants.
             * @type {Array.<game.leagueoflegends.Participant$Properties>|undefined}
             */
            public participants?: game.leagueoflegends.Participant$Properties[];

            /**
             * Creates a new TeamDetail instance using the specified properties.
             * @param {game.leagueoflegends.TeamDetail$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail instance
             */
            public static create(properties?: game.leagueoflegends.TeamDetail$Properties): game.leagueoflegends.TeamDetail;

            /**
             * Encodes the specified TeamDetail message. Does not implicitly {@link game.leagueoflegends.TeamDetail.verify|verify} messages.
             * @param {game.leagueoflegends.TeamDetail$Properties} message TeamDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.TeamDetail$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TeamDetail message, length delimited. Does not implicitly {@link game.leagueoflegends.TeamDetail.verify|verify} messages.
             * @param {game.leagueoflegends.TeamDetail$Properties} message TeamDetail message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.TeamDetail$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TeamDetail message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.TeamDetail;

            /**
             * Decodes a TeamDetail message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.TeamDetail;

            /**
             * Verifies a TeamDetail message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a TeamDetail message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.TeamDetail;

            /**
             * Creates a TeamDetail message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.TeamDetail.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.TeamDetail} TeamDetail
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.TeamDetail;

            /**
             * Creates a plain object from a TeamDetail message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.TeamDetail} message TeamDetail
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.TeamDetail, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this TeamDetail message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this TeamDetail to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type Participant$Properties = {
            id?: number;
            summoner?: game.leagueoflegends.Summoner$Properties;
            summonerSpell_1?: game.leagueoflegends.SummonerSpell$Properties;
            summonerSpell_2?: game.leagueoflegends.SummonerSpell$Properties;
            items?: game.leagueoflegends.Item$Properties[];
            statistics?: game.leagueoflegends.PlayerStatistics$Properties;
            champion?: game.leagueoflegends.Champion$Properties;
            role?: game.leagueoflegends.Role;
        };

        /**
         * Constructs a new Participant.
         * @exports game.leagueoflegends.Participant
         * @constructor
         * @param {game.leagueoflegends.Participant$Properties=} [properties] Properties to set
         */
        class Participant {

            /**
             * Constructs a new Participant.
             * @exports game.leagueoflegends.Participant
             * @constructor
             * @param {game.leagueoflegends.Participant$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.Participant$Properties);

            /**
             * Participant id.
             * @type {number|undefined}
             */
            public id?: number;

            /**
             * Participant summoner.
             * @type {game.leagueoflegends.Summoner$Properties|undefined}
             */
            public summoner?: game.leagueoflegends.Summoner$Properties;

            /**
             * Participant summonerSpell_1.
             * @type {game.leagueoflegends.SummonerSpell$Properties|undefined}
             */
            public summonerSpell_1?: game.leagueoflegends.SummonerSpell$Properties;

            /**
             * Participant summonerSpell_2.
             * @type {game.leagueoflegends.SummonerSpell$Properties|undefined}
             */
            public summonerSpell_2?: game.leagueoflegends.SummonerSpell$Properties;

            /**
             * Participant items.
             * @type {Array.<game.leagueoflegends.Item$Properties>|undefined}
             */
            public items?: game.leagueoflegends.Item$Properties[];

            /**
             * Participant statistics.
             * @type {game.leagueoflegends.PlayerStatistics$Properties|undefined}
             */
            public statistics?: game.leagueoflegends.PlayerStatistics$Properties;

            /**
             * Participant champion.
             * @type {game.leagueoflegends.Champion$Properties|undefined}
             */
            public champion?: game.leagueoflegends.Champion$Properties;

            /**
             * Participant role.
             * @type {game.leagueoflegends.Role|undefined}
             */
            public role?: game.leagueoflegends.Role;

            /**
             * Creates a new Participant instance using the specified properties.
             * @param {game.leagueoflegends.Participant$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.Participant} Participant instance
             */
            public static create(properties?: game.leagueoflegends.Participant$Properties): game.leagueoflegends.Participant;

            /**
             * Encodes the specified Participant message. Does not implicitly {@link game.leagueoflegends.Participant.verify|verify} messages.
             * @param {game.leagueoflegends.Participant$Properties} message Participant message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.Participant$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Participant message, length delimited. Does not implicitly {@link game.leagueoflegends.Participant.verify|verify} messages.
             * @param {game.leagueoflegends.Participant$Properties} message Participant message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.Participant$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Participant message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.Participant} Participant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.Participant;

            /**
             * Decodes a Participant message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.Participant} Participant
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.Participant;

            /**
             * Verifies a Participant message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a Participant message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Participant} Participant
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.Participant;

            /**
             * Creates a Participant message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.Participant.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.Participant} Participant
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.Participant;

            /**
             * Creates a plain object from a Participant message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.Participant} message Participant
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.Participant, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this Participant message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this Participant to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type PlayerStatistics$Properties = {
            kills?: number;
            deaths?: number;
            assists?: number;
            championLevel?: number;
            magicDamages?: game.leagueoflegends.DamageStatistic$Properties;
            physicalDamages?: game.leagueoflegends.DamageStatistic$Properties;
            trueDamages?: game.leagueoflegends.DamageStatistic$Properties;
            totalDamages?: game.leagueoflegends.DamageStatistic$Properties;
            totalHeal?: number;
            largestCriticalStrike?: number;
            goldEarned?: number;
            goldSpent?: number;
            minionsKilled?: number;
            neutralMinionsKilled?: number;
            neutralMinionsKilledEnnemyJungle?: number;
            neutralMinionsKilledTeamJungle?: number;
            sightWardsBought?: number;
            visionWardsBought?: number;
            wardsPlaced?: number;
            wardsKilled?: number;
            doubleKills?: number;
            tripleKills?: number;
            quadraKills?: number;
            pentaKills?: number;
            killingSprees?: number;
            largestKillingSpree?: number;
            largestMultiKill?: number;
            inhibitorKills?: number;
            towerKills?: number;
            firstBloodAssist?: boolean;
            firstBloodKill?: boolean;
            firstInhibitorKill?: boolean;
            firstTowerAssist?: boolean;
            firstTowerKill?: boolean;
            totalCrowdControl?: number;
            totalUnitsHealed?: number;
        };

        /**
         * Constructs a new PlayerStatistics.
         * @exports game.leagueoflegends.PlayerStatistics
         * @constructor
         * @param {game.leagueoflegends.PlayerStatistics$Properties=} [properties] Properties to set
         */
        class PlayerStatistics {

            /**
             * Constructs a new PlayerStatistics.
             * @exports game.leagueoflegends.PlayerStatistics
             * @constructor
             * @param {game.leagueoflegends.PlayerStatistics$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.PlayerStatistics$Properties);

            /**
             * PlayerStatistics kills.
             * @type {number|undefined}
             */
            public kills?: number;

            /**
             * PlayerStatistics deaths.
             * @type {number|undefined}
             */
            public deaths?: number;

            /**
             * PlayerStatistics assists.
             * @type {number|undefined}
             */
            public assists?: number;

            /**
             * PlayerStatistics championLevel.
             * @type {number|undefined}
             */
            public championLevel?: number;

            /**
             * PlayerStatistics magicDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            public magicDamages?: game.leagueoflegends.DamageStatistic$Properties;

            /**
             * PlayerStatistics physicalDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            public physicalDamages?: game.leagueoflegends.DamageStatistic$Properties;

            /**
             * PlayerStatistics trueDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            public trueDamages?: game.leagueoflegends.DamageStatistic$Properties;

            /**
             * PlayerStatistics totalDamages.
             * @type {game.leagueoflegends.DamageStatistic$Properties|undefined}
             */
            public totalDamages?: game.leagueoflegends.DamageStatistic$Properties;

            /**
             * PlayerStatistics totalHeal.
             * @type {number|undefined}
             */
            public totalHeal?: number;

            /**
             * PlayerStatistics largestCriticalStrike.
             * @type {number|undefined}
             */
            public largestCriticalStrike?: number;

            /**
             * PlayerStatistics goldEarned.
             * @type {number|undefined}
             */
            public goldEarned?: number;

            /**
             * PlayerStatistics goldSpent.
             * @type {number|undefined}
             */
            public goldSpent?: number;

            /**
             * PlayerStatistics minionsKilled.
             * @type {number|undefined}
             */
            public minionsKilled?: number;

            /**
             * PlayerStatistics neutralMinionsKilled.
             * @type {number|undefined}
             */
            public neutralMinionsKilled?: number;

            /**
             * PlayerStatistics neutralMinionsKilledEnnemyJungle.
             * @type {number|undefined}
             */
            public neutralMinionsKilledEnnemyJungle?: number;

            /**
             * PlayerStatistics neutralMinionsKilledTeamJungle.
             * @type {number|undefined}
             */
            public neutralMinionsKilledTeamJungle?: number;

            /**
             * PlayerStatistics sightWardsBought.
             * @type {number|undefined}
             */
            public sightWardsBought?: number;

            /**
             * PlayerStatistics visionWardsBought.
             * @type {number|undefined}
             */
            public visionWardsBought?: number;

            /**
             * PlayerStatistics wardsPlaced.
             * @type {number|undefined}
             */
            public wardsPlaced?: number;

            /**
             * PlayerStatistics wardsKilled.
             * @type {number|undefined}
             */
            public wardsKilled?: number;

            /**
             * PlayerStatistics doubleKills.
             * @type {number|undefined}
             */
            public doubleKills?: number;

            /**
             * PlayerStatistics tripleKills.
             * @type {number|undefined}
             */
            public tripleKills?: number;

            /**
             * PlayerStatistics quadraKills.
             * @type {number|undefined}
             */
            public quadraKills?: number;

            /**
             * PlayerStatistics pentaKills.
             * @type {number|undefined}
             */
            public pentaKills?: number;

            /**
             * PlayerStatistics killingSprees.
             * @type {number|undefined}
             */
            public killingSprees?: number;

            /**
             * PlayerStatistics largestKillingSpree.
             * @type {number|undefined}
             */
            public largestKillingSpree?: number;

            /**
             * PlayerStatistics largestMultiKill.
             * @type {number|undefined}
             */
            public largestMultiKill?: number;

            /**
             * PlayerStatistics inhibitorKills.
             * @type {number|undefined}
             */
            public inhibitorKills?: number;

            /**
             * PlayerStatistics towerKills.
             * @type {number|undefined}
             */
            public towerKills?: number;

            /**
             * PlayerStatistics firstBloodAssist.
             * @type {boolean|undefined}
             */
            public firstBloodAssist?: boolean;

            /**
             * PlayerStatistics firstBloodKill.
             * @type {boolean|undefined}
             */
            public firstBloodKill?: boolean;

            /**
             * PlayerStatistics firstInhibitorKill.
             * @type {boolean|undefined}
             */
            public firstInhibitorKill?: boolean;

            /**
             * PlayerStatistics firstTowerAssist.
             * @type {boolean|undefined}
             */
            public firstTowerAssist?: boolean;

            /**
             * PlayerStatistics firstTowerKill.
             * @type {boolean|undefined}
             */
            public firstTowerKill?: boolean;

            /**
             * PlayerStatistics totalCrowdControl.
             * @type {number|undefined}
             */
            public totalCrowdControl?: number;

            /**
             * PlayerStatistics totalUnitsHealed.
             * @type {number|undefined}
             */
            public totalUnitsHealed?: number;

            /**
             * Creates a new PlayerStatistics instance using the specified properties.
             * @param {game.leagueoflegends.PlayerStatistics$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics instance
             */
            public static create(properties?: game.leagueoflegends.PlayerStatistics$Properties): game.leagueoflegends.PlayerStatistics;

            /**
             * Encodes the specified PlayerStatistics message. Does not implicitly {@link game.leagueoflegends.PlayerStatistics.verify|verify} messages.
             * @param {game.leagueoflegends.PlayerStatistics$Properties} message PlayerStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.PlayerStatistics$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PlayerStatistics message, length delimited. Does not implicitly {@link game.leagueoflegends.PlayerStatistics.verify|verify} messages.
             * @param {game.leagueoflegends.PlayerStatistics$Properties} message PlayerStatistics message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.PlayerStatistics$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PlayerStatistics message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.PlayerStatistics;

            /**
             * Decodes a PlayerStatistics message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.PlayerStatistics;

            /**
             * Verifies a PlayerStatistics message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a PlayerStatistics message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.PlayerStatistics;

            /**
             * Creates a PlayerStatistics message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.PlayerStatistics.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.PlayerStatistics} PlayerStatistics
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.PlayerStatistics;

            /**
             * Creates a plain object from a PlayerStatistics message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.PlayerStatistics} message PlayerStatistics
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.PlayerStatistics, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this PlayerStatistics message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this PlayerStatistics to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        type DamageStatistic$Properties = {
            total?: number;
            toChampions?: number;
            taken?: number;
        };

        /**
         * Constructs a new DamageStatistic.
         * @exports game.leagueoflegends.DamageStatistic
         * @constructor
         * @param {game.leagueoflegends.DamageStatistic$Properties=} [properties] Properties to set
         */
        class DamageStatistic {

            /**
             * Constructs a new DamageStatistic.
             * @exports game.leagueoflegends.DamageStatistic
             * @constructor
             * @param {game.leagueoflegends.DamageStatistic$Properties=} [properties] Properties to set
             */
            constructor(properties?: game.leagueoflegends.DamageStatistic$Properties);

            /**
             * DamageStatistic total.
             * @type {number|undefined}
             */
            public total?: number;

            /**
             * DamageStatistic toChampions.
             * @type {number|undefined}
             */
            public toChampions?: number;

            /**
             * DamageStatistic taken.
             * @type {number|undefined}
             */
            public taken?: number;

            /**
             * Creates a new DamageStatistic instance using the specified properties.
             * @param {game.leagueoflegends.DamageStatistic$Properties=} [properties] Properties to set
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic instance
             */
            public static create(properties?: game.leagueoflegends.DamageStatistic$Properties): game.leagueoflegends.DamageStatistic;

            /**
             * Encodes the specified DamageStatistic message. Does not implicitly {@link game.leagueoflegends.DamageStatistic.verify|verify} messages.
             * @param {game.leagueoflegends.DamageStatistic$Properties} message DamageStatistic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encode(message: game.leagueoflegends.DamageStatistic$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DamageStatistic message, length delimited. Does not implicitly {@link game.leagueoflegends.DamageStatistic.verify|verify} messages.
             * @param {game.leagueoflegends.DamageStatistic$Properties} message DamageStatistic message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            public static encodeDelimited(message: game.leagueoflegends.DamageStatistic$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DamageStatistic message from the specified reader or buffer.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): game.leagueoflegends.DamageStatistic;

            /**
             * Decodes a DamageStatistic message from the specified reader or buffer, length delimited.
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): game.leagueoflegends.DamageStatistic;

            /**
             * Verifies a DamageStatistic message.
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {?string} `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): string;

            /**
             * Creates a DamageStatistic message from a plain object. Also converts values to their respective internal types.
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             */
            public static fromObject(object: { [k: string]: any }): game.leagueoflegends.DamageStatistic;

            /**
             * Creates a DamageStatistic message from a plain object. Also converts values to their respective internal types.
             * This is an alias of {@link game.leagueoflegends.DamageStatistic.fromObject}.
             * @function
             * @param {Object.<string,*>} object Plain object
             * @returns {game.leagueoflegends.DamageStatistic} DamageStatistic
             */
            public static from(object: { [k: string]: any }): game.leagueoflegends.DamageStatistic;

            /**
             * Creates a plain object from a DamageStatistic message. Also converts values to other types if specified.
             * @param {game.leagueoflegends.DamageStatistic} message DamageStatistic
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public static toObject(message: game.leagueoflegends.DamageStatistic, options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Creates a plain object from this DamageStatistic message. Also converts values to other types if specified.
             * @param {$protobuf.ConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

            /**
             * Converts this DamageStatistic to JSON.
             * @returns {Object.<string,*>} JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

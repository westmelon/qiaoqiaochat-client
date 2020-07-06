import * as $protobuf from "protobufjs";
/** Properties of a Model. */
export interface IModel {

    /** Model cmd */
    cmd?: (number|null);

    /** Model msgType */
    msgType?: (number|null);

    /** Model timestamp */
    timestamp?: (number|Long|null);

    /** Model textContent */
    textContent?: (string|null);

    /** Model contentType */
    contentType?: (string|null);

    /** Model mediaContent */
    mediaContent?: (Uint8Array|null);

    /** Model groupId */
    groupId?: (string|null);

    /** Model sender */
    sender?: (string|null);

    /** Model receiver */
    receiver?: (string|null);

    /** Model token */
    token?: (string|null);

    /** Model appKey */
    appKey?: (string|null);

    /** Model sign */
    sign?: (string|null);

    /** Model requestId */
    requestId?: (string|null);

    /** Model responseId */
    responseId?: (string|null);

    /** Model uniqueId */
    uniqueId?: (string|null);

    /** Model clientType */
    clientType?: (number|null);

    /** Model clientVersion */
    clientVersion?: (string|null);

    /** Model encryptionType */
    encryptionType?: (number|null);
}

/** Represents a Model. */
export class Model implements IModel {

    /**
     * Constructs a new Model.
     * @param [properties] Properties to set
     */
    constructor(properties?: IModel);

    /** Model cmd. */
    public cmd: number;

    /** Model msgType. */
    public msgType: number;

    /** Model timestamp. */
    public timestamp: (number|Long);

    /** Model textContent. */
    public textContent: string;

    /** Model contentType. */
    public contentType: string;

    /** Model mediaContent. */
    public mediaContent: Uint8Array;

    /** Model groupId. */
    public groupId: string;

    /** Model sender. */
    public sender: string;

    /** Model receiver. */
    public receiver: string;

    /** Model token. */
    public token: string;

    /** Model appKey. */
    public appKey: string;

    /** Model sign. */
    public sign: string;

    /** Model requestId. */
    public requestId: string;

    /** Model responseId. */
    public responseId: string;

    /** Model uniqueId. */
    public uniqueId: string;

    /** Model clientType. */
    public clientType: number;

    /** Model clientVersion. */
    public clientVersion: string;

    /** Model encryptionType. */
    public encryptionType: number;

    /**
     * Creates a new Model instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Model instance
     */
    public static create(properties?: IModel): Model;

    /**
     * Encodes the specified Model message. Does not implicitly {@link Model.verify|verify} messages.
     * @param message Model message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IModel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified Model message, length delimited. Does not implicitly {@link Model.verify|verify} messages.
     * @param message Model message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IModel, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Model message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Model;

    /**
     * Decodes a Model message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Model
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Model;

    /**
     * Verifies a Model message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a Model message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Model
     */
    public static fromObject(object: { [k: string]: any }): Model;

    /**
     * Creates a plain object from a Model message. Also converts values to other types if specified.
     * @param message Model
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: Model, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this Model to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

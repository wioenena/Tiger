import * as fmt from "https://deno.land/std@0.97.0/fmt/colors.ts";


export enum Emojis {
    info = "⇑⇓",
    warning = "✘",
    succes = "✓",
    unknown = "➤",
    debug = "⚒"
}


export class Tiger {

    private _options: IOptions;
    public constructor(options: IOptions = {
        bold: false,
        italic: false,
        underline: false,
        time: true
    }) {
        this._options = options;
    }

    public write(...args: unknown[]) {
        if (this.options.bold)
            args = args.map((arg) => fmt.bold(arg as string));
        if (this.options.italic)
            args = args.map((arg) => fmt.italic(arg as string));
        if (this.options.underline)
            args = args.map((arg) => fmt.underline(arg as string));
        if (this.options.time) {
            const date = new Date();
            args = [fmt.rgb24(`[ ${date.toLocaleDateString()} ]`, {
                r: 6,
                g: 253,
                b: 154
            })].concat(args as string[]);
        }
        return console.log(...args);

    }

    public info(...args: unknown[]) {
        return this.write(`${fmt.yellow(`${Emojis.info} [ Info ] `)} `, ...args)
    }

    public warn(...args: unknown[]) {
        return this.write(`${fmt.red(`${Emojis.warning} [ Warning ]`)}`, ...args);
    }

    public succes(...args: unknown[]) {
        return this.write(`${fmt.green(`${Emojis.succes}`)} [ Succes ]`, ...args);
    }

    public unknown(...args: unknown[]) {
        return this.write(`${fmt.gray(`${Emojis.unknown} [ Unknown ]`)}`, ...args);
    }

    public debug(...args: unknown[]) {
        return this.write(fmt.rgb24(`${Emojis.debug} [ Debug ]`, {
            r: 252,
            g: 144,
            b: 3
        }), ...args);
    }

    public remixColor(color: Rgb, ...args: unknown[]) {
        return this.write(fmt.rgb24(args.join(" "), color));
    }


    /**
     * Getter options
     * @return {IOptions}
     */
    public get options(): IOptions {
        return this._options;
    }

    /**
     * Setter options
     * @param {IOptions} value
     */
    public set options(value: IOptions) {
        this._options = value;
    }
}

export interface IOptions {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    time?: boolean
}

export interface Rgb {
    r: number;
    g: number;
    b: number;
}
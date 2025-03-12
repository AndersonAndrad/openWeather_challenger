import { getCurrentTime } from "../core/utils/hours.utils.js";

import chalk from 'chalk';

export class Logger {
    private readonly className: string;
    private chalk: any;

    constructor(className: string) {
        this.className = className;

        import('chalk').then((chalk) => {
            this.chalk = chalk.default;
        });
    }

    success(message: string): void {
        console.log(this.chalk?.green(this.prepareMessage(message)));
    }

    error(message: string): void {
        console.log(this.chalk?.bold.red(this.prepareMessage(message)));
    }

    warning(message: string): void {
        console.log(this.chalk?.yellow(this.prepareMessage(message)));
    }

    info(message: string): void {
        console.log(this.chalk?.italic.blue(this.prepareMessage(message)));
    }

    verbose(message: string): void {
        console.log(this.chalk?.white(this.prepareMessage(message)));
    }

    debug(message: string): void {
        console.log(this.chalk?.cyan.red(this.prepareMessage(message)));
    }

    private prepareMessage(message: string): string {
        return `[express] ${new Date().toDateString()}, ${getCurrentTime()} [${this.className}] ${message}`;
    }
}

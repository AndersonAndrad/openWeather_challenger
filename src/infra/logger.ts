import {getCurrentTime} from "../core/utils/hours.utils.ts";

import chalk from 'chalk';

export class Logger {
    private readonly className: string;
    private chalk;

    constructor(className: string) {
        this.className = className;

        import('chalk').then((chalk) => {
            this.chalk = chalk.default;
        });
    }

    success(message: string): void {
        console.log(chalk.green(this.prepareMessage(message, 'SUCCESS')));
    }

    error(message: string): void {
        console.log(chalk.bold.red(this.prepareMessage(message, 'ERROR')));
    }

    warning(message: string): void {
        console.log(chalk.yellow(this.prepareMessage(message, 'WARNING')));
    }

    info(message: string): void {
        console.log(chalk.bold.blue(this.prepareMessage(message, 'INFO')));
    }

    verbose(message: string): void {
        console.log(chalk.white(this.prepareMessage(message, 'VERBOSE')));
    }

    debug(message: string): void {
        console.log(chalk.cyan(this.prepareMessage(message, 'DEBUG')));
    }

    private prepareMessage(message: string, typeError: string): string {
        return `[${typeError}] - [express] ${new Date().toDateString()}, ${getCurrentTime()} [${this.className}] ${message}`;
    }
}

const enum LogLevel {
	Verbose,
	Normal,
	Warning,
	Error,
}

export function verboseLog(message: string): void {
	logMessage(message, LogLevel.Verbose);
}

export function normalLog(message: string): void {
	logMessage(message, LogLevel.Normal);
}

export function warnLog(message: string): void {
	logMessage(message, LogLevel.Warning);
}

export function errorLog(message: string): void {
	logMessage(message, LogLevel.Error);
}

let currentLogLevel = LogLevel.Error;

export function enableVerbose(): void {
	currentLogLevel = LogLevel.Verbose;
	normalLog('Verbose log enabled');
}

export function enableNormalLog(): void {
	currentLogLevel = LogLevel.Normal;
}

let logDepth = 0;

function increaseDepth(): void {
	logDepth += 1;
}

function decreaseDepth(): void {
	if (logDepth === 0) {
		throw new Error('Cannot decrease log depth');
	}

	logDepth -= 1;
}

export function runWithIncreasingDepth<T>(fn: () => T): T {
	increaseDepth();

	try {
		return fn();
	} finally {
		decreaseDepth();
	}
}

function logMessage(message: string, level: LogLevel = LogLevel.Verbose): void {
	if (level < currentLogLevel) {
		return;
	}

	message = `${' '.repeat(2 * logDepth)}${message}`;

	switch (level) {
		case LogLevel.Error:
			console.error(message);
			break;

		case LogLevel.Warning:
			console.warn(message);
			break;

		case LogLevel.Normal:
		case LogLevel.Verbose:
			console.log(message);
	}
}

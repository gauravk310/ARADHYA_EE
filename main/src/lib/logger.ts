// Production-ready logger for server-side and client-side logging
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, any>;
    error?: {
        message: string;
        stack?: string;
        name?: string;
    };
}

class Logger {
    private isDevelopment = process.env.NODE_ENV === 'development';
    private isClient = typeof window !== 'undefined';

    private formatTimestamp(): string {
        return new Date().toISOString();
    }

    private formatLogEntry(entry: LogEntry): string {
        let output = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
        
        if (entry.context && Object.keys(entry.context).length > 0) {
            output += ` | Context: ${JSON.stringify(entry.context)}`;
        }
        
        if (entry.error) {
            output += ` | Error: ${entry.error.name}: ${entry.error.message}`;
            if (entry.error.stack && this.isDevelopment) {
                output += `\n${entry.error.stack}`;
            }
        }
        
        return output;
    }

    private async sendToServer(entry: LogEntry): Promise<void> {
        if (this.isClient) {
            try {
                await fetch('/api/logs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(entry),
                });
            } catch (err) {
                // Silently fail - don't throw errors from logging
                console.error('Failed to send log to server:', err);
            }
        }
    }

    private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
        const entry: LogEntry = {
            timestamp: this.formatTimestamp(),
            level,
            message,
            context,
            error: error ? {
                message: error.message,
                stack: error.stack,
                name: error.name,
            } : undefined,
        };

        const formatted = this.formatLogEntry(entry);

        // Console output
        if (this.isDevelopment) {
            switch (level) {
                case 'error':
                    console.error(formatted);
                    break;
                case 'warn':
                    console.warn(formatted);
                    break;
                case 'info':
                    console.info(formatted);
                    break;
                case 'debug':
                    console.debug(formatted);
                    break;
            }
        } else {
            // Production: only log warn and error to console
            if (level === 'error' || level === 'warn') {
                console.error(formatted);
            }
        }

        // Send to server (for client-side logs)
        if (this.isClient && (level === 'error' || level === 'warn')) {
            this.sendToServer(entry);
        }
    }

    debug(message: string, context?: Record<string, any>): void {
        this.log('debug', message, context);
    }

    info(message: string, context?: Record<string, any>): void {
        this.log('info', message, context);
    }

    warn(message: string, context?: Record<string, any>): void {
        this.log('warn', message, context);
    }

    error(message: string, error?: Error, context?: Record<string, any>): void {
        this.log('error', message, context, error);
    }
}

export const logger = new Logger();

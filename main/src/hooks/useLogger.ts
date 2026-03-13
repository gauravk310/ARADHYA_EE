"use client";

import { logger } from "@/lib/logger";
import { useCallback } from "react";

/**
 * Hook for using the logger in React components
 * @returns Logger methods bound to the component context
 */
export function useLogger() {
    const debug = useCallback(
        (message: string, context?: Record<string, any>) => {
            logger.debug(message, context);
        },
        []
    );

    const info = useCallback(
        (message: string, context?: Record<string, any>) => {
            logger.info(message, context);
        },
        []
    );

    const warn = useCallback(
        (message: string, context?: Record<string, any>) => {
            logger.warn(message, context);
        },
        []
    );

    const error = useCallback(
        (message: string, error?: Error, context?: Record<string, any>) => {
            logger.error(message, error, context);
        },
        []
    );

    return { debug, info, warn, error };
}

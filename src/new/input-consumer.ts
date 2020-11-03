export default interface InputConsumer {
    /**
     * 
     * @param key The pressed key
     * @returns True if the event was handled, false if we want it to propogate.
     */
    onInput(key: string): boolean;
}
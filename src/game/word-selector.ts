import EventEmitter from "../infrastructure/event-emitter";
import InputConsumer from "../infrastructure/input-consumer";

enum TypedEvent {
    TYPED,
    DELETED
}
type TypedEventPayload = {
    event: TypedEvent;
    string: string;
    position: number;
}

type Events = {
    typed: TypedEventPayload;
    finished: string;
}

function isAlphanumCharacter(key: string) {
    return /^[a-z0-9]$/i.test(key)
}

class WordSelector implements InputConsumer{
    emitter = new EventEmitter<Events>();
    public progress: string = "";

    onInput(key: string) {
        // TODO: Figure out how to handle this and the character selector genericly; Only these two, no need to go farther
        if (key === " " || key === "Enter") {
            // TODO: Backspace after space should return the previous word?
            this.emitter.emit('finished', this.progress);
            this.progress = "";
            this.emitter.emit('typed', {event: TypedEvent.DELETED, position: this.progress.length - 1, string: this.progress});
            return true;
        }
        if (key === "Backspace") {
            this.progress = this.progress.substring(0, this.progress.length - 1);
            this.emitter.emit('typed', {event: TypedEvent.DELETED, position: this.progress.length - 1, string: this.progress});
            return true;
        }
        if (isAlphanumCharacter(key)) {
            this.progress += key;
            this.emitter.emit('typed', {event: TypedEvent.TYPED, position: this.progress.length - 1, string: this.progress});
            return true;
        }
        
        return false;
    }
}

const wordSelector = new WordSelector();
export default wordSelector;
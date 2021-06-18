import wordSelector from '../game/word-selector';

const DEFAULT_FONT_COLOR = 0xffffff;
const DEFAULT_WRITTEN_COLOR = 0xff0000;
export default class WordSelectorText extends PIXI.Graphics {
    private TypedText;
    private UntypedText;
    constructor(private text: string, private color = DEFAULT_FONT_COLOR, private written_color = DEFAULT_WRITTEN_COLOR) {
        super();
        this.TypedText = new PIXI.Text('', {fill: written_color});
        this.UntypedText = new PIXI.Text(text, {fill: color});
        this.addChild(this.TypedText);
        this.addChild(this.UntypedText);
        wordSelector.emitter.on('typed', payload => {
            console.log(payload)
            if (text.startsWith(payload.string)) {
                this.updateText(payload.string);
            }
            else {
                this.updateText("");
            }
        });
    }
    updateText(typedText: string) {
        this.TypedText.text = typedText;
        this.UntypedText.text = this.text.substring(typedText.length);
        this.UntypedText.position.x = this.TypedText.text.length > 0 ? this.TypedText.width : 0;
    }
}
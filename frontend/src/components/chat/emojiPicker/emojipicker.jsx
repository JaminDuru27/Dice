import { EmojiPickerMax } from "./emojiPickerMax"
import { EmojiPickerMin } from "./emojiPickerMin"

export function EmojiPicker({setEmojiPicker, emojiPicker, setValue}){
    return (
    <div className="w-full h-full flex flex-col gap-2">
        <EmojiPickerMax setEmojiPicker={setEmojiPicker} emojiPicker={emojiPicker}/>
        <EmojiPickerMin onClickEmoji={(e)=>{
            setValue(v=>v+=e)
        }} setEmojiPicker={setEmojiPicker} setValue={setValue}/>
        
    </div>
    )
}
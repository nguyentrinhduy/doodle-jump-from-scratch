import { View } from "./View";

export class TextView extends View{
    text: string;
    
    setText(text: string){
        this.text = text;
    }
    getText(){
        return this.text;
    }
    display(){
        
    }
}
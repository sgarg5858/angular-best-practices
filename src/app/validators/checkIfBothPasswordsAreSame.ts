import { AbstractControl, ValidationErrors } from "@angular/forms";

export function checkIfBothControlsHaveSameValue(control1:string,control2:string){

    return (control:AbstractControl): ValidationErrors | null => {

        let c1 = control.get(control1);
        let c2 = control.get(control2);
        if(!c1 || !c2)
        {
            throw Error(`Can't find requested controls, check for typos in ${control1} & ${control2}`);
        }
        let value1 = c1.value, value2=c2.value;
        if( value1.length > 0 && value2.length >0 && value1 !== value2)
        {
            return {dontMatch:true}
        }
        return null;

    }

}
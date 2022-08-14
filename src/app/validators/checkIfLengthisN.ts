import { AbstractControl, ValidationErrors } from "@angular/forms";

export function isLength(n:number)
{
    return (control:AbstractControl):ValidationErrors | null =>{

        let value = control.value;
        console.log(value,typeof value);
        if(typeof value === 'string')
        {
            let len = value.length;
            if(len !== n && len >0)
            {
                console.log("HELLO")
                return { lengthNotEqualToN:true };
            }
            else{
                return null;
            }
        }
        return {invalidValue:true};

    }
}
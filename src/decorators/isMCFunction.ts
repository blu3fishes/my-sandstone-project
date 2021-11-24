import { MCFunction } from "sandstone"

export function isMCFunction(dir){
    return (target:any, property:string, descriptor:PropertyDescriptor) => {
        MCFunction(dir, () => {
            descriptor.value();
        }, {onConflict:'append'});
    }
}
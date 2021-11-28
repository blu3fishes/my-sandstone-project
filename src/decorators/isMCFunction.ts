import { MCFunction } from "sandstone";

export function isMCFunction(dir) {
  return function (
    target: any,
    property: string,
    descriptor: PropertyDescriptor
  ) {
    let originMethod = descriptor.value;
    descriptor.value = function (...args) {
      MCFunction(
        dir,
        () => {
          originMethod.apply(this, args);
        },
        { onConflict: "append" }
      );
    };
  };
}

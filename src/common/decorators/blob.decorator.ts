import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsBlob(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBlob',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value instanceof Buffer || value instanceof ArrayBuffer;
        },
        defaultMessage() {
          return 'Invalid BLOB format';
        },
      },
    });
  };
}

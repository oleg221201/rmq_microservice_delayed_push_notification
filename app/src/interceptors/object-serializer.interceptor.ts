import {
  ClassSerializerInterceptor,
  PlainLiteralObject,
  Type,
} from '@nestjs/common';
import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export const ClassSerializer = (
  classToIntercept: Type,
): typeof ClassSerializerInterceptor => {
  return class Interceptor extends ClassSerializerInterceptor {
    private prepareResponse(
      response: PlainLiteralObject | PlainLiteralObject[],
    ) {
      if (Array.isArray(response)) {
        return response.map(plainToInstance.bind(null, classToIntercept));
      }

      return plainToInstance(classToIntercept, response);
    }

    serialize(
      response: PlainLiteralObject | PlainLiteralObject[],
      options: ClassTransformOptions,
    ) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
};

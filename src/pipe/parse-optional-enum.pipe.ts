import { ArgumentMetadata, Injectable, Optional, ParseEnumPipe, ParseEnumPipeOptions } from '@nestjs/common';

@Injectable()
export class ParseOptionalEnumPipe<T = any> extends ParseEnumPipe {
  constructor(protected readonly enumType: T, @Optional() options?: ParseEnumPipeOptions) {
    super(enumType, options);
  }

  async transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (!value) {
      return undefined;
    }
    this.transform(value , metadata)
  }
}

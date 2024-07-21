import { IsNotEmpty } from 'class-validator';
import { IsBlob } from 'src/common/decorators/blob.decorator';

export class ImageDTO {
  @IsNotEmpty()
  @IsBlob()
  image: Buffer | ArrayBuffer;
}

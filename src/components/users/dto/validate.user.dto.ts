import { ApiProperty } from '@nestjs/swagger';
import { apiResponse } from '@app/components/users/constants/api.response.dto';

export class ValidateUserDto {
  @ApiProperty(apiResponse.apiValidateUserEmail)
  email: string;

  @ApiProperty(apiResponse.apiValidateUserPass)
  password: string;
}

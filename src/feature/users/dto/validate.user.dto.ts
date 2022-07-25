import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

import { apiResponse } from '@app/feature/users/constants/api.response.dto';

export class ValidateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty(apiResponse.apiValidateUserEmail)
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and ' +
      'one special character',
  })
  @ApiProperty(apiResponse.apiValidateUserPass)
  password: string;
}

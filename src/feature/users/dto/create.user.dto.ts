import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/feature/users/constants/api.response.dto';

export class CreateUserDto {
  @ApiProperty(apiResponse.apiCreateUserFirstNameProperty)
  firstName: string;

  @ApiProperty(apiResponse.apiCreateUserLastNameProperty)
  lastName: string;

  @ApiProperty(apiResponse.apiValidateUserEmail)
  email: string;

  @ApiProperty(apiResponse.apiValidateUserPass)
  password: string;
}

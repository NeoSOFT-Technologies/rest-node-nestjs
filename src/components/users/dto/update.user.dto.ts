import { ApiProperty } from '@nestjs/swagger';

import { apiResponse } from '@app/components/users/constants/api.response.dto';

export class UpdateUserDto {
  @ApiProperty(apiResponse.apiCreateUserFirstNameProperty)
  firstName: string;

  @ApiProperty(apiResponse.apiCreateUserLastNameProperty)
  lastName: string;

  @ApiProperty(apiResponse.apiUpdateUserBoolProperty)
  isActive: boolean;
}

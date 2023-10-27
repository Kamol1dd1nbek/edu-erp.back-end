import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryParams } from './templates';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '| Create user' })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '| Get all users' })
  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }
  @ApiOperation({ summary: '| Get one user' })
  @Get('optional')
  findUsersWithOptional(@Query() query: QueryParams) {
    // return query
    return this.userService.findUsersWithOptional(query);
  }

  @ApiOperation({ summary: '| Get one user' })
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }


  @ApiOperation({ summary: '| Update user' })
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: '| Delete user' })
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}

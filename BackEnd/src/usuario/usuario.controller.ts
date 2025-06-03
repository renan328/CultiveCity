import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.usuarioService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteMyAccount(@Req() req) {
    const userId = req.user.userId;
    await this.usuarioService.remove(userId);
    return { message: 'Conta excluída com sucesso' };
  }

  @Post()
  create(@Body() dto: CreateUsuarioDto) {
    if (!['starter', 'team', 'premium'].includes(dto.plano)) {
      throw new BadRequestException('Plano inválido');
    }

    return this.usuarioService.create(dto);
  }


  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}

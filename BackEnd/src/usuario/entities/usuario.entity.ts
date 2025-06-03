import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  sobrenome: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true, enum: ['starter', 'team', 'premium'] })
  plano: string;

  @Prop({ required: true })
  cep: string;

  @Prop({ required: true })
  numerocasa: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProdutoDocument = Produto & Document;

@Schema()
export class Produto {
  @Prop({ required: true }) nome: string;
  @Prop() descricao: string;
  @Prop() imagem: string;
  @Prop({ required: true }) preco: number;
  @Prop({ default: true }) disponivel: boolean;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
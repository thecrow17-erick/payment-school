import { Serializer } from "@nestjs/microservices";


export class RawSerializer implements Serializer {
  serialize(value: any) {
    return value.data; // Envía solo el contenido de "data", ignorando el resto
  }
}
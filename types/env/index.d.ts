declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;       // Cambiado a string por comportamiento nativo de Node
      DB_HOST?: string;
      DB_PORT?: string;    // Cambiado a string
      DB_USER?: string;
      DB_PASSWORD?: string;
      DB_NAME?: string;
    }
  }
}
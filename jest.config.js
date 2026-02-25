import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Fornece o caminho para o seu aplicativo Next.js carregar o next.config.js e os arquivos .env no seu ambiente de teste
  dir: "./",
});

// Adicione quaisquer configurações personalizadas a serem passadas para o Jest
const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Faz o alias @/ funcionar nos testes
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

// createJestConfig é exportado dessa forma para garantir que o next/jest possa carregar a configuração assíncrona do Next.js
export default createJestConfig(customJestConfig);
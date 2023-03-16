
import type { ConfigFile } from '@rtk-query/codegen-openapi';

const config: ConfigFile = {
    schemaFile: 'http://localhost:4000/docs-json',
    apiFile: './src/store/api.ts',
    apiImport: 'api',
    outputFile: './src/store/api/endpoints.ts',
    exportName: 'SecretApi',
    hooks: true,
};

export default config;
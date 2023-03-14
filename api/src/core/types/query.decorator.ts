import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

export function DeepQuery(fieldName: string, query: Function) {
    return applyDecorators(
        ApiExtraModels(query),
        ApiQuery({
            required: false,
            name: fieldName,
            style: 'deepObject',
            explode: true,
            type: 'object',
            schema: {
                $ref: getSchemaPath(query),
            },
        })
    );
}
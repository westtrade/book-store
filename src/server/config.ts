import 'dotenv-extended';

export enum eServerMode {
	Production = 'production',
	Development = 'development',
	Test = 'test',
}

export const HTTP_PORT = (process.env.HTTP_PORT as string) || '3030';
export const NODE_ENV: eServerMode =
	(process.env.NODE_ENV as string) === eServerMode.Production
		? eServerMode.Production
		: (process.env.NODE_ENV as string) === eServerMode.Test
		? eServerMode.Test
		: eServerMode.Development;

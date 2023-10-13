import React, { createContext } from 'react';
import { ApiReturnType, AppContext, Props, State } from './app.types';
import { Options } from '../../helps/api/api.types';
import apiHelp from '../../helps/api/api';
import { ZodError, ZodSchema, z } from 'zod';
import { responseSchema } from './app.schema';
import { ApiError, ValidationError } from '../../helps/errors/errors';
import { localesContext } from '../../../localization/localization.provider';
import { loadingContext } from '../loading/loading.provider';

export const appContext = createContext<AppContext>({} as AppContext);

/* export const AppProvider = (props: Props) => {
  const locales = useContext(localesContext);
  const { setLoading } = useContext(loadingContext);
  const [techStore, setTechStoreStore] = useState(props.techStore);
  const [store, setStore] = useState(props.store);

  const getTechStore = <K extends keyof AppContext['techStore']>(key: K) => techStore[key];

  const setTechStore = (key: keyof AppContext['techStore'], value: any) => {
    setTechStoreStore(state => ({ ...state, [key]: value }));
  };

  const makeSchemaStrict = <ObjSchema extends z.ZodObject<z.ZodRawShape>>(
    objSchema: ObjSchema,
  ): z.ZodSchema<any> => (process.env.BUILD_ENV === 'production' ? objSchema : objSchema.strict());

  const api = async (
    url: string,
    options?: Options,
    schema: ZodSchema = z.any(),
  ): Promise<ApiReturnType<any>> => {
    const { language } = props;
    const request = apiHelp<T>(url, language, options);
    const responseDataSchema = makeSchemaStrict(responseSchema.merge(z.object({ data: schema })));
    setLoading(true);
    try {
      const [response, _headers] = await request;
      return responseDataSchema.parse(response, {
        errorMap: (_, ctx) => ({
          message: `${ctx.defaultError} on URL: ${url}`,
        }),
      });
    } catch (error) {
      if (error instanceof ZodError) throw new ValidationError(`Zod error: ${error.message}`);
      if (error instanceof Error) throw error;
      throw new ApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const contextAppProvider = useMemo(
    () =>
      ({
        techStore,
        store,
        api,
        getTechStore,
        setTechStore,
      } as AppContext),
    [store, techStore],
  );

  return <appContext.Provider value={contextAppProvider}>{props.children}</appContext.Provider>;
}; */

export class AppProvider extends React.Component<Props, State> {
  static contextType = localesContext;
  context!: React.ContextType<typeof localesContext>;

  constructor(props: Props) {
    super(props);

    this.state = {
      context: {
        techStore: props.techStore,
        store: props.store,
        api: this.api,
        getTechStore: this.getTechStore,
        setTechStore: this.setTechStore,
      },
    };
  }

  getTechStore = <K extends keyof AppContext['techStore']>(key: K) =>
    this.state.context.techStore?.[key];

  setTechStore = (key: keyof AppContext['techStore'], value: any) => {
    const { techStore } = this.state.context;

    // @ts-ignore
    techStore[key] = value;

    this.setState(prevState => ({
      context: { ...prevState.context, techStore },
    }));
  };

  makeSchemaStrict<ObjSchema extends z.ZodObject<z.ZodRawShape>>(
    objSchema: ObjSchema,
  ): z.ZodSchema<any> {
    return process.env.BUILD_ENV === 'production' ? objSchema : objSchema.strict();
  }

  api = async <T,>(
    url: string,
    options?: Options,
    schema: ZodSchema<T> = z.any(),
  ): Promise<ApiReturnType<T>> => {
    const { language } = this.props;
    const request = apiHelp<T>(url, language, options);
    const responseDataSchema = this.makeSchemaStrict(
      responseSchema.merge(z.object({ data: schema })),
    );
    try {
      const [response, _headers] = await request;
      return responseDataSchema.parse(response, {
        errorMap: (_, ctx) => ({
          message: `${ctx.defaultError} on URL: ${url}`,
        }),
      });
    } catch (error: any) {
      if (error instanceof ZodError) throw new ValidationError(`Zod error: ${error.message}`);
      if (error instanceof Error) throw error;
      throw new ApiError(error);
    }
  };

  render(): JSX.Element {
    const { context } = this.state;
    const { children } = this.props;

    return <appContext.Provider value={context}>{children}</appContext.Provider>;
  }
}

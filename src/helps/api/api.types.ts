export interface Response<T> {
  status: "ok" | "error";
  code: number;
  data: T;
}

export interface Options {
  method: "POST" | "PUT" | "GET" | "DELETE";
  body?: string | number | Record<string, unknown> | ReadableStream<Uint8Array>;
  signal?: AbortSignal;
}

export type Method = "GET" | "POST" | "DELETE" | "PUT";

export type Headers = {
  Accept?: string;
  "Content-Type"?: string;
  "Accept-Language"?: string;
  "Content-Language"?: string;
  api?: "ajax";
  Authorization?: string;
};

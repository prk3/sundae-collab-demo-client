/*
 * Wrappers for fetch sending requests to my API. Assume sending and receiving
 * only json data. Responses with non-2xx codes are rejected. Use third
 * parameter to capture abort function. Aborting rejects fetch and .json(), so
 * you probably want to add .catch(ignoreAbort) to your then/catch chain.
 * Usage:
 *
 * import api from './api'
 * api.post('/resource', { ...data }, a => abort = a).then(data => ...)
 * api.get('/resource/1).then(data => ...)
 */

export class NonSuccessResponse extends Error {
  response: Response;

  constructor(response: Response) {
    super(`Request failed with response code ${response.status}`);
    this.response = response;
  }
}

/**
 * Filters successful responses (200, 201, 202, 204).
 * Extracts json data from responses with content.
 */
function filterSuccessAndParse(response: Response): Promise<any> {
  switch (response.status) {
    case 200:
    case 201:
    case 202:
      return response.json();
    case 204:
      return Promise.resolve(null);
    default:
      return Promise.reject(new NonSuccessResponse(response));
  }
}

/**
 * Converts AbortError into a resolving promise. Other errors are forwarded
 * with Promise.reject(error).
 */
export function ignoreAbort(err: any): Promise<void> {
  if (err instanceof Error && err.name === 'AbortError') {
    return Promise.resolve();
  }
  return Promise.reject(err);
}

/**
 * Parametrized fetch wrapper, handles aborting controller, encodes/decodes
 * json.
 */
function callApi(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD',
  data: any,
  abortController?: AbortController,
): Promise<any> {
  const hasBody = data !== undefined
    && method !== 'GET'
    && method !== 'HEAD';

  return fetch(process.env.REACT_APP_API_URL + path, {
    method,
    signal: abortController?.signal,
    body: hasBody ? JSON.stringify(data) : undefined,
    headers: {
      ...(hasBody
        ? { 'Content-Type': 'application/json' }
        : {}
      ),
    },
  })
    .then(filterSuccessAndParse);
}

function get(path: string, abortController?: AbortController) {
  return callApi(path, 'GET', undefined, abortController);
}

function post(path: string, data: any, abortController?: AbortController) {
  return callApi(path, 'POST', data, abortController);
}

function put(path: string, data: any, abortController?: AbortController) {
  return callApi(path, 'PUT', data, abortController);
}

function del(path: string, data: any, abortController?: AbortController) {
  return callApi(path, 'DELETE', data, abortController);
}

export default {
  get,
  post,
  put,
  del,
};

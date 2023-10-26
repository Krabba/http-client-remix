export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export interface HttpClientRequest {
  id: string
  title: string
  method: Method
  url: string
  headers?: Record<string, string>
}

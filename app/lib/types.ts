export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export interface HttpClientRequest {
  id: string
  url: string
  method: Method
  title: string
}

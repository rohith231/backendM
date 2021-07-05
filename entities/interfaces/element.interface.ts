export interface Element<T>{
 id:string;
 extension:Extension<T>
}

export interface Extension<T>{
  url:string //uri
  value:T
}
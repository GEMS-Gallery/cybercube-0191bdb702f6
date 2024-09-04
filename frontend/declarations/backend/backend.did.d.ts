import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface FileInfo {
  'id' : bigint,
  'name' : string,
  'createdAt' : Time,
  'size' : bigint,
  'updatedAt' : Time,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'createFolder' : ActorMethod<[string, [] | [bigint]], Result>,
  'downloadFile' : ActorMethod<[bigint], [] | [Uint8Array | number[]]>,
  'generateShareLink' : ActorMethod<[bigint], string>,
  'getSharedFile' : ActorMethod<[string], [] | [FileInfo]>,
  'listFiles' : ActorMethod<[[] | [bigint]], Array<FileInfo>>,
  'uploadFile' : ActorMethod<
    [string, Uint8Array | number[], [] | [bigint]],
    Result
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Time = IDL.Int;
  const FileInfo = IDL.Record({
    'id' : IDL.Nat,
    'name' : IDL.Text,
    'createdAt' : Time,
    'size' : IDL.Nat,
    'updatedAt' : Time,
  });
  return IDL.Service({
    'createFolder' : IDL.Func([IDL.Text, IDL.Opt(IDL.Nat)], [Result], []),
    'downloadFile' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'generateShareLink' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'getSharedFile' : IDL.Func([IDL.Text], [IDL.Opt(FileInfo)], ['query']),
    'listFiles' : IDL.Func([IDL.Opt(IDL.Nat)], [IDL.Vec(FileInfo)], ['query']),
    'uploadFile' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8), IDL.Opt(IDL.Nat)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };

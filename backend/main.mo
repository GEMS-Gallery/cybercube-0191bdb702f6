import Char "mo:base/Char";
import Iter "mo:base/Iter";

import Blob "mo:base/Blob";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Int "mo:base/Int";

actor {
  type File = {
    id: Nat;
    name: Text;
    content: Blob;
    size: Nat;
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };

  type Folder = {
    id: Nat;
    name: Text;
    parentId: ?Nat;
    createdAt: Time.Time;
  };

  type FileInfo = {
    id: Nat;
    name: Text;
    size: Nat;
    createdAt: Time.Time;
    updatedAt: Time.Time;
  };

  stable var nextFileId: Nat = 0;
  stable var nextFolderId: Nat = 0;
  stable var fileStorage: [(Nat, File)] = [];
  stable var folderStructure: [(Nat, Folder)] = [];
  stable var shareLinks: [(Text, Nat)] = [];

  var fileStorageMap = HashMap.fromIter<Nat, File>(fileStorage.vals(), 10, Nat.equal, Hash.hash);
  var folderStructureMap = HashMap.fromIter<Nat, Folder>(folderStructure.vals(), 10, Nat.equal, Hash.hash);
  var shareLinkMap = HashMap.fromIter<Text, Nat>(shareLinks.vals(), 10, Text.equal, Text.hash);

  public func uploadFile(name: Text, content: Blob, parentFolderId: ?Nat) : async Result.Result<Nat, Text> {
    let fileId = nextFileId;
    nextFileId += 1;

    let newFile: File = {
      id = fileId;
      name = name;
      content = content;
      size = Blob.toArray(content).size();
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    fileStorageMap.put(fileId, newFile);

    #ok(fileId)
  };

  public query func downloadFile(fileId: Nat) : async ?Blob {
    switch (fileStorageMap.get(fileId)) {
      case (?file) { ?file.content };
      case null { null };
    }
  };

  public func createFolder(name: Text, parentId: ?Nat) : async Result.Result<Nat, Text> {
    let folderId = nextFolderId;
    nextFolderId += 1;

    let newFolder: Folder = {
      id = folderId;
      name = name;
      parentId = parentId;
      createdAt = Time.now();
    };

    folderStructureMap.put(folderId, newFolder);

    #ok(folderId)
  };

  public query func listFiles(folderId: ?Nat) : async [FileInfo] {
    let files = Buffer.Buffer<FileInfo>(0);

    for ((id, file) in fileStorageMap.entries()) {
      if (folderId == null) {
        files.add({
          id = file.id;
          name = file.name;
          size = file.size;
          createdAt = file.createdAt;
          updatedAt = file.updatedAt;
        });
      }
    };

    Buffer.toArray(files)
  };

  public func generateShareLink(fileId: Nat) : async Text {
    let shareId = Text.concat(Nat.toText(fileId), Text.fromChar('_'));
    let shareLink = Text.concat(shareId, Nat.toText(Int.abs(Time.now())));
    shareLinkMap.put(shareLink, fileId);
    shareLink
  };

  public query func getSharedFile(shareId: Text) : async ?FileInfo {
    switch (shareLinkMap.get(shareId)) {
      case (?fileId) {
        switch (fileStorageMap.get(fileId)) {
          case (?file) {
            ?{
              id = file.id;
              name = file.name;
              size = file.size;
              createdAt = file.createdAt;
              updatedAt = file.updatedAt;
            }
          };
          case null { null };
        }
      };
      case null { null };
    }
  };

  system func preupgrade() {
    fileStorage := Iter.toArray(fileStorageMap.entries());
    folderStructure := Iter.toArray(folderStructureMap.entries());
    shareLinks := Iter.toArray(shareLinkMap.entries());
  };

  system func postupgrade() {
    fileStorageMap := HashMap.fromIter<Nat, File>(fileStorage.vals(), 10, Nat.equal, Hash.hash);
    folderStructureMap := HashMap.fromIter<Nat, Folder>(folderStructure.vals(), 10, Nat.equal, Hash.hash);
    shareLinkMap := HashMap.fromIter<Text, Nat>(shareLinks.vals(), 10, Text.equal, Text.hash);
  };
}

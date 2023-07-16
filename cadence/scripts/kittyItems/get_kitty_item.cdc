import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import HouseListings from "../../contracts/HouseListings.cdc"

pub struct KittyItem {
    pub let name: String
    pub let description: String
    pub let thumbnail: String

    pub let itemID: UInt64
    pub let resourceID: UInt64
    pub let kind: HouseListings.Kind
    pub let rarity: HouseListings.Rarity
    pub let owner: Address

    init(
        name: String,
        description: String,
        thumbnail: String,
        itemID: UInt64,
        resourceID: UInt64,
        kind: HouseListings.Kind,
        rarity: HouseListings.Rarity,
        owner: Address,
    ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail

        self.itemID = itemID
        self.resourceID = resourceID
        self.kind = kind
        self.rarity = rarity
        self.owner = owner
    }
}

pub fun dwebURL(_ file: MetadataViews.IPFSFile): String {
    var url = "https://"
        .concat(file.cid)
        .concat(".ipfs.dweb.link/")
    
    if let path = file.path {
        return url.concat(path)
    }
    
    return url
}

pub fun main(address: Address, itemID: UInt64): KittyItem? {
    if let collection = getAccount(address).getCapability<&HouseListings.Collection{NonFungibleToken.CollectionPublic, HouseListings.HouseListingsCollectionPublic}>(HouseListings.CollectionPublicPath).borrow() {
        
        if let item = collection.borrowKittyItem(id: itemID) {

            if let view = item.resolveView(Type<MetadataViews.Display>()) {

                let display = view as! MetadataViews.Display
                
                let owner: Address = item.owner!.address!

                let ipfsThumbnail = display.thumbnail as! MetadataViews.IPFSFile     

                return KittyItem(
                    name: display.name,
                    description: display.description,
                    thumbnail: dwebURL(ipfsThumbnail),
                    itemID: itemID,
                    resourceID: item.uuid,
                    kind: item.kind, 
                    rarity: item.rarity, 
                    owner: address,
                )
            }
        }
    }

    return nil
}

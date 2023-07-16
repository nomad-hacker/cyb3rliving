import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import HouseListings from "../../contracts/HouseListings.cdc"

// This script returns the size of an account's HouseListings collection.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(HouseListings.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}

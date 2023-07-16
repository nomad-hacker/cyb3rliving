import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import HouseListings from "../../contracts/HouseListings.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"

// This transaction configures an account to hold Kitty Items.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&HouseListings.Collection>(from: HouseListings.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- HouseListings.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: HouseListings.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&HouseListings.Collection{NonFungibleToken.CollectionPublic, HouseListings.HouseListingsCollectionPublic, MetadataViews.ResolverCollection}>(HouseListings.CollectionPublicPath, target: HouseListings.CollectionStoragePath)
        }
    }
}

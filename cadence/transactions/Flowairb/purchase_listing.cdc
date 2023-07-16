import FungibleToken from "../../contracts/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import FlowToken from "../../contracts/FlowToken.cdc"
import HouseListings from "../../contracts/HouseListings.cdc"
import FlowairbV2 from "../../contracts/FlowairbV2.cdc"

pub fun getOrCreateCollection(account: AuthAccount): &HouseListings.Collection{NonFungibleToken.Receiver} {
    if let collectionRef = account.borrow<&HouseListings.Collection>(from: HouseListings.CollectionStoragePath) {
        return collectionRef
    }

    // create a new empty collection
    let collection <- HouseListings.createEmptyCollection() as! @HouseListings.Collection

    let collectionRef = &collection as &HouseListings.Collection
    
    // save it to the account
    account.save(<-collection, to: HouseListings.CollectionStoragePath)

    // create a public capability for the collection
    account.link<&HouseListings.Collection{NonFungibleToken.CollectionPublic, HouseListings.HouseListingsCollectionPublic}>(HouseListings.CollectionPublicPath, target: HouseListings.CollectionStoragePath)

    return collectionRef
}

transaction(listingResourceID: UInt64, storefrontAddress: Address) {
    let paymentVault: @FungibleToken.Vault
    let HouseListingsCollection: &HouseListings.Collection{NonFungibleToken.Receiver}
    let storefront: &FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}
    let listing: &FlowairbV2.Listing{FlowairbV2.ListingPublic}

    prepare(account: AuthAccount) {
        // Access the storefront public resource of the seller to purchase the listing.
        self.storefront = getAccount(storefrontAddress)
            .getCapability<&FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}>(
                FlowairbV2.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        // Borrow the listing
        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
                    ?? panic("No Offer with that ID in Storefront")
        let price = self.listing.getDetails().salePrice

        // Access the vault of the buyer to pay the sale price of the listing.
        let mainFlowVault = account.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Cannot borrow FlowToken vault from account storage")
        self.paymentVault <- mainFlowVault.withdraw(amount: price)

        self.HouseListingsCollection = getOrCreateCollection(account: account)
    }

    execute {
        let item <- self.listing.purchase(
            payment: <-self.paymentVault,
            commissionRecipient: nil
        )

        self.HouseListingsCollection.deposit(token: <-item)
        self.storefront.cleanupPurchasedListings(listingResourceID: listingResourceID)
    }
}

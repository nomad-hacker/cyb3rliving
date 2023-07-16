import FungibleToken from "../../contracts/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import FlowToken from "../../contracts/FlowToken.cdc"
import HouseListings from "../../contracts/HouseListings.cdc"
import FlowairbV2 from "../../contracts/FlowairbV2.cdc"

pub fun getOrCreateStorefront(account: AuthAccount): &FlowairbV2.Storefront {
    if let storefrontRef = account.borrow<&FlowairbV2.Storefront>(from: FlowairbV2.StorefrontStoragePath) {
        return storefrontRef
    }

    let storefront <- FlowairbV2.createStorefront()

    let storefrontRef = &storefront as &FlowairbV2.Storefront

    account.save(<-storefront, to: FlowairbV2.StorefrontStoragePath)

    account.link<&FlowairbV2.Storefront{FlowairbV2.StorefrontPublic}>(FlowairbV2.StorefrontPublicPath, target: FlowairbV2.StorefrontStoragePath)

    return storefrontRef
}

transaction(saleItemID: UInt64, saleItemPrice: UFix64) {

    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>
    let HouseListingsProvider: Capability<&HouseListings.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &FlowairbV2.Storefront

    prepare(account: AuthAccount) {
        // We need a provider capability, but one is not provided by default so we create one if needed.
        let HouseListingsCollectionProviderPrivatePath = /private/HouseListingsCollectionProviderV14

        self.flowReceiver = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!

        assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FLOW receiver")

        if !account.getCapability<&HouseListings.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(HouseListingsCollectionProviderPrivatePath)!.check() {
            account.link<&HouseListings.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(HouseListingsCollectionProviderPrivatePath, target: HouseListings.CollectionStoragePath)
        }

        self.HouseListingsProvider = account.getCapability<&HouseListings.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(HouseListingsCollectionProviderPrivatePath)!

        assert(self.HouseListingsProvider.borrow() != nil, message: "Missing or mis-typed HouseListings.Collection provider")

        self.storefront = getOrCreateStorefront(account: account)
    }

    execute {
        let saleCut = FlowairbV2.SaleCut(
            receiver: self.flowReceiver,
            amount: saleItemPrice
        )
        self.storefront.createListing(
            nftProviderCapability: self.HouseListingsProvider,
            nftType: Type<@HouseListings.NFT>(),
            nftID: saleItemID,
            salePaymentVaultType: Type<@FlowToken.Vault>(),
            saleCuts: [saleCut],
            marketplacesCapability: nil, // [Capability<&{FungibleToken.Receiver}>]?
            customID: nil, // String?
            commissionAmount: UFix64(0),
            expiry: UInt64(getCurrentBlock().timestamp) + UInt64(500)
        )
    }
}
